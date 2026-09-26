/* ==========================================================================
   RÉVISIONS 2026 — moteur du site (100 % statique, sans compte, sans serveur)
   Les données (matières, leçons, questions) sont dans js/data/*.js
   La progression est sauvegardée dans le navigateur (localStorage).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Registre des matières ---------- */
  var REV = window.REV = window.REV || {};
  REV.subjects = REV.subjects || [];
  REV.qById = {};
  REV.lessonById = {};

  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }

  function prepLesson(s, l, num) {
    l.subject = s.id;
    l.num = num;
    l.key = s.id + '/' + l.id;
    REV.lessonById[l.key] = l;
  }
  function prepQuestion(s, q) {
    if (q.a === undefined) q.a = 0; // par défaut, la bonne réponse est écrite en premier (l'ordre est mélangé à l'affichage)
    q.subject = s.id;
    q.lkey = s.id + '/' + q.l;
    q.good = Array.isArray(q.a) ? q.a : [q.a]; // plusieurs bonnes réponses possibles (« 2 rép. »)
    q.multi = q.good.length > 1;
    q.id = s.id + ':' + hash(q.q + '|' + q.good.map(function (i) { return q.c[i]; }).join('+'));
    if (!REV.lessonById[q.lkey]) console.warn('Leçon inconnue pour la question', q);
    REV.qById[q.id] = q;
    return q;
  }

  REV.add = function (s) {
    s.lessons.forEach(function (l, i) { prepLesson(s, l, String(i + 1).padStart(2, '0')); });
    s.questions = (s.questions || []).map(function (q) { return prepQuestion(s, q); });
    REV.subjects.push(s);
  };

  // Ajoute des exercices corrigés (onglet « Exercices ») à une matière existante.
  REV.addExercises = function (id, x) {
    var s = subj(id);
    if (!s) return console.warn('Matière inconnue pour les exercices', id);
    var n = s.lessons.filter(function (l) { return l.exo; }).length;
    x.lessons.forEach(function (l) { l.exo = true; prepLesson(s, l, 'E' + (++n)); s.lessons.push(l); });
    (x.questions || []).forEach(function (q) { s.questions.push(prepQuestion(s, q)); });
  };

  function subj(id) { return REV.subjects.find(function (s) { return s.id === id; }); }
  function lessonQuestions(lkey) {
    var s = subj(lkey.split('/')[0]);
    return s ? s.questions.filter(function (q) { return q.lkey === lkey; }) : [];
  }

  /* ---------- Sauvegarde locale ---------- */
  var KEY = 'revisions2026.progress.v1';
  var CUR = 'revisions2026.current.v1';
  var store = { q: {}, sessions: [], lessonsSeen: {} };

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }
  function safeDel(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }

  function load() {
    var raw = safeGet(KEY);
    if (!raw) return;
    try {
      var d = JSON.parse(raw);
      store.q = d.q || {};
      // les exercices corrigés sont passés de la matière « exos » à l'onglet Exercices de l'électricité
      Object.keys(store.q).forEach(function (k) {
        if (k.indexOf('exos:') === 0) { if (!store.q['elec:' + k.slice(5)]) store.q['elec:' + k.slice(5)] = store.q[k]; delete store.q[k]; }
      });
      store.sessions = d.sessions || [];
      store.lessonsSeen = d.lessonsSeen || {};
      Object.keys(store.lessonsSeen).forEach(function (k) {
        if (k.indexOf('exos/') === 0) { store.lessonsSeen['elec/' + k.slice(5)] = store.lessonsSeen[k]; delete store.lessonsSeen[k]; }
      });
    } catch (e) { /* données corrompues : on repart de zéro */ }
  }
  function save() { safeSet(KEY, JSON.stringify(store)); }

  function record(qid, ok) {
    var r = store.q[qid] || (store.q[qid] = { n: 0, ok: 0, ko: 0, h: [] });
    r.n++; if (ok) r.ok++; else r.ko++;
    r.h.push(ok ? 1 : 0);
    if (r.h.length > 5) r.h.shift();
    r.t = Date.now();
    save();
  }

  /* Score d'un ensemble de questions : moyenne des 3 dernières réponses de chaque question vue */
  function scoreOf(questions) {
    var got = 0, tot = 0, seen = 0;
    questions.forEach(function (q) {
      var r = store.q[q.id];
      if (!r || !r.h.length) return;
      seen++;
      var last = r.h.slice(-3);
      last.forEach(function (v) { got += v; tot++; });
    });
    return { pct: tot ? Math.round(got * 100 / tot) : null, seen: seen, total: questions.length };
  }

  function needsReview(q) {
    var r = store.q[q.id];
    if (!r || !r.h.length) return false;
    var h = r.h;
    if (h[h.length - 1] === 0) return true;
    // ratée au moins 2 fois et pas encore réussie 2 fois de suite
    return r.ko >= 2 && !(h.length >= 2 && h[h.length - 1] === 1 && h[h.length - 2] === 1);
  }

  /* ---------- Outils ---------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function level(p) {
    if (p === null || p === undefined) return { cls: 'none', dot: '⚪', label: 'Pas encore testé' };
    if (p >= 80) return { cls: 'good', dot: '🟢', label: 'Maîtrisé' };
    if (p >= 60) return { cls: 'mid', dot: '🟠', label: 'À consolider' };
    return { cls: 'bad', dot: '🔴', label: 'À revoir' };
  }
  function bar(p) {
    var v = p === null ? 0 : p;
    return '<div class="bar ' + level(p).cls + '"><span style="width:' + v + '%"></span></div>';
  }
  function asciiBar(p) {
    var n = Math.round((p || 0) / 5);
    return '█'.repeat(n) + '░'.repeat(20 - n);
  }
  function fmtDate(t) {
    var d = new Date(t);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) + ' ' +
      d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  function lab(q, k) { return q.num ? String(k + 1) : LETTERS[k]; } // copies numérotées 1, 2, 3, 4

  /* ---------- Session de QCM en cours ---------- */
  var session = null;
  var timerId = null;
  var QUIZ_SECONDS = 30;

  function saveSession() { if (session) safeSet(CUR, JSON.stringify(session)); else safeDel(CUR); }
  function loadSession() {
    var raw = safeGet(CUR);
    if (!raw) return;
    try {
      var s = JSON.parse(raw);
      if (s && s.qids && s.qids.every(function (id) { return REV.qById[id]; })) session = s;
    } catch (e) { /* ignore */ }
  }

  // Exercices corrigés : les questions suivent l'ordre du sujet (Q01, Q02…) ; ailleurs elles sont mélangées.
  function isExoQ(q) { var l = REV.lessonById[q.lkey]; return !!(l && l.exo); }
  function arrange(qs, count) {
    qs = shuffle(qs);
    if (!qs.length) return qs;
    // matière « dans l'ordre » (ex. manœuvre de force : étapes S-E-N-S-E-S-R-D) : ordre des leçons, puis ordre du fichier
    if (qs.every(function (q) { return subj(q.subject).ordered; })) {
      var rank = function (q) { var s = subj(q.subject); return s.lessons.indexOf(REV.lessonById[q.lkey]) * 1000 + s.questions.indexOf(q); };
      return qs.slice(0, count || qs.length).sort(function (x, y) { return rank(x) - rank(y); });
    }
    if (!qs.every(isExoQ)) return qs;
    var order = function (q) { return subj(q.subject).questions.indexOf(q); };
    return qs.slice(0, count || qs.length).sort(function (x, y) { return order(x) - order(y); });
  }

  function startSession(opts) {
    var qs = opts.questions.slice(0, opts.count || opts.questions.length);
    if (!qs.length) { toast('Aucune question disponible pour ce choix.'); return; }
    session = {
      mode: opts.mode, title: opts.title, subject: opts.subject || null, lesson: opts.lesson || null,
      timer: !!opts.timer, qids: qs.map(function (q) { return q.id; }),
      // q.fixed : propositions dans l'ordre exact de la copie (A, B, C…) ; sinon mélangées
      perm: qs.map(function (q) { var p = q.c.map(function (_, i) { return i; }); return q.fixed ? p : shuffle(p); }),
      answers: [], i: 0, started: Date.now()
    };
    saveSession();
    go('#/session');
  }

  /* ---------- Navigation ---------- */
  function go(h) { if (location.hash === h) render(); else location.hash = h; }

  var main, toastEl;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function setActiveNav(route) {
    var map = { '': 'home', cours: 'cours', matiere: 'cours', lecon: 'cours', memos: 'cours', trancher: 'cours', fiche: 'cours', fiches: 'cours',
      qcm: 'qcm', session: 'qcm', bilan: 'qcm', quiz: 'quiz', revision: 'qcm', resultats: 'resultats' };
    var key = map[route] || 'home';
    if ((route === 'session' || route === 'bilan') && session && session.mode === 'quiz') key = 'quiz';
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === key);
    });
  }

  function render() {
    clearInterval(timerId);
    var parts = location.hash.replace(/^#\/?/, '').replace(/#.*$/, '').split('/').map(decodeURIComponent);
    var route = parts[0] || '';
    setActiveNav(route);
    var html;
    switch (route) {
      case '': html = viewHome(); break;
      case 'cours': html = viewCours(); break;
      case 'matiere': html = viewMatiere(parts[1], parts[2]); break;
      case 'lecon': html = viewLecon(parts[1] + '/' + parts[2]); break;
      case 'qcm': html = parts[1] ? viewQcmSetup(parts[1]) : viewQcmChoice(); break;
      case 'quiz': html = viewQuiz(); break;
      case 'revision': html = viewRevision(); break;
      case 'session': html = viewSession(); break;
      case 'bilan': html = viewBilan(); break;
      case 'resultats': html = viewResultats(); break;
      case 'memos': html = viewMemos(parts[1]); break;
      case 'trancher': html = viewTrancher(); break;
      case 'fiches': html = viewFiches(); break;
      case 'fiche': html = viewFiche(parts[1]); break;
      default: html = viewHome();
    }
    main.innerHTML = html;
    setDecor(route, parts);
    if (route !== 'session') window.scrollTo(0, 0);
    if (route === 'session') afterSessionRender();
    main.focus({ preventScroll: true });
  }

  // Décor de fond : motif propre à chaque matière (img/deco/<id>.svg) ; atelier de mécanique sur l'accueil
  function decoUrl(id) { return 'url("' + new URL('img/deco/' + id + '.svg', document.baseURI).href + '")'; }
  function setDecor(route, parts) {
    var id = null;
    if (/^(matiere|lecon|qcm|memos|fiche)$/.test(route)) id = parts[1];
    else if ((route === 'session' || route === 'bilan') && session) {
      var q = REV.qById[session.qids[Math.min(session.i, session.qids.length - 1)]];
      id = session.subject || (q && q.subject);
    }
    var s = id && subj(id);
    var b = document.body;
    b.setAttribute('data-route', route || 'home');
    if (s) {
      b.setAttribute('data-subj', s.id);
      b.style.setProperty('--deco', decoUrl(s.id));
      b.style.setProperty('--sc', s.color);
    } else {
      b.removeAttribute('data-subj');
      b.style.removeProperty('--deco');
      b.style.removeProperty('--sc');
    }
  }

  /* ---------- Vues ---------- */
  function totalQuestions() { return REV.subjects.reduce(function (n, s) { return n + s.questions.length; }, 0); }
  function totalLessons() { return REV.subjects.reduce(function (n, s) { return n + s.lessons.length; }, 0); }
  function allQuestions() { return REV.subjects.reduce(function (a, s) { return a.concat(s.questions); }, []); }

  function viewHome() {
    var all = allQuestions();
    var sc = scoreOf(all);
    var toReview = all.filter(needsReview).length;
    var resume = session && session.answers.length < session.qids.length
      ? '<a class="resume" href="#/session">▶️ Reprendre : <b>' + esc(session.title) + '</b> — question ' +
        (Math.min(session.answers.length + 1, session.qids.length)) + ' / ' + session.qids.length + '</a>' : '';

    return '' +
      '<section class="atelier">' +
        '<div class="atelier-wall">' +
          '<div class="atelier-plaque"><span class="rivet"></span><span class="rivet"></span><span class="rivet"></span><span class="rivet"></span>' +
            '<small>ATELIER DE MAINTENANCE · FS2 / MOBTER</small><strong>RÉVISIONS 2026</strong></div>' +
          '<p class="atelier-sub">Bienvenue à l’atelier : choisis ton poste de travail.</p>' +
        '</div>' +
        '<div class="atelier-outils" aria-hidden="true"></div>' +
        '<div class="servante" role="navigation" aria-label="Accès rapide">' +
          tile('#/cours', '📖', 'COURS', totalLessons() + ' leçons') +
          tile('#/qcm', '🧠', 'QCM', 'par matière') +
          tile('#/quiz', '⚡', 'QUIZ', 'éclair chronométré') +
          tile('#/resultats', '📊', 'MES RÉSULTATS', sc.pct === null ? 'pas encore de score' : 'niveau global ' + sc.pct + ' %') +
        '</div>' +
        '<div class="hazard" aria-hidden="true"></div>' +
      '</section>' +
      resume +
      (toReview ? '<a class="card review-cta" href="#/revision"><span class="big">🔁</span><span><b>QCM de révision</b><br>' +
        toReview + ' question' + (toReview > 1 ? 's' : '') + ' ratée' + (toReview > 1 ? 's' : '') + ' à retravailler</span><span class="chev">›</span></a>' : '') +
      '<h2 class="h2 h2-atelier">🧰 Les postes de l’atelier</h2>' +
      '<div class="subject-grid">' + REV.subjects.map(subjectCard).join('') + '</div>' +
      '<div class="home-foot">' +
        '<a class="card mini" href="#/fiche/uv2">🎯 Fiche spéciale UV2</a>' +
        '<a class="card mini" href="#/fiches">📄 Fiches de révision complètes</a>' +
        '<a class="card mini" href="#/memos">🧠 Tous les aides-mémoires</a>' +
        '<a class="card mini" href="#/trancher">⚖️ Points à trancher avec le formateur</a>' +
      '</div>' +
      '<p class="muted small center">' + totalQuestions() + ' questions · ' + totalLessons() +
        ' leçons · ' + REV.subjects.length + ' matières — progression enregistrée sur cet appareil, sans compte.</p>';
  }
  function tile(href, icon, label, sub) {
    return '<a class="tile" href="' + href + '"><span class="tile-ic">' + icon + '</span><span class="tile-l">' +
      label + '</span><span class="tile-s">' + esc(sub) + '</span><span class="tile-handle" aria-hidden="true"></span></a>';
  }
  function subjectCard(s) {
    var sc = scoreOf(s.questions), lv = level(sc.pct);
    return '<a class="card subj" href="#/matiere/' + s.id + '" style="--c:' + s.color + ';--deco:' + decoUrl(s.id).replace(/"/g, '&quot;') + '">' +
      '<span class="subj-ic">' + s.icon + '</span>' +
      '<span class="subj-body"><b>' + esc(s.name) + '</b><span class="muted small">' + s.lessons.length +
      ' leçons · ' + s.questions.length + ' questions</span>' + bar(sc.pct) + '</span>' +
      '<span class="subj-score ' + lv.cls + '">' + (sc.pct === null ? '—' : sc.pct + ' %') + '</span></a>';
  }

  function viewCours() {
    return '<h1 class="h1">📖 Cours</h1><p class="muted">Choisis une matière, puis une leçon : explication, schémas, à retenir, pièges et aide-mémoire.</p>' +
      '<div class="subject-grid">' + REV.subjects.map(subjectCard).join('') + '</div>' +
      '<div class="home-foot"><a class="card mini" href="#/fiche/uv2">🎯 Fiche spéciale UV2</a>' +
      '<a class="card mini" href="#/fiches">📄 Fiches de révision complètes</a>' +
      '<a class="card mini" href="#/memos">🧠 Tous les aides-mémoires</a>' +
      '<a class="card mini" href="#/trancher">⚖️ Points à trancher avec le formateur</a></div>';
  }

  function viewMatiere(id, tab) {
    var s = subj(id);
    if (!s) return viewCours();
    var sc = scoreOf(s.questions);
    var exos = s.lessons.filter(function (l) { return l.exo; });
    var showExos = tab === 'exercices' && exos.length;
    var shown = s.lessons.filter(function (l) { return !!l.exo === !!showExos; });
    return crumbs([['#/cours', 'Cours'], [null, s.name]]) +
      '<header class="subj-head" style="--c:' + s.color + '"><span class="subj-ic xl">' + s.icon + '</span><div><h1 class="h1">' +
        esc(s.name) + '</h1><p class="muted">' + esc(s.desc || '') + '</p></div></header>' +
      '<div class="row-actions">' +
        '<a class="btn primary" href="#/qcm/' + s.id + '">🧠 QCM ' + esc(s.name) + '</a>' +
        '<a class="btn" href="#/fiche/' + s.id + '">📄 Fiche de révision</a>' +
        '<a class="btn" href="#/memos/' + s.id + '">🧠 Aides-mémoires</a>' +
        (sc.pct !== null ? '<span class="pill ' + level(sc.pct).cls + '">' + level(sc.pct).dot + ' ' + sc.pct + ' %</span>' : '') +
      '</div>' +
      (exos.length ? '<nav class="tabs">' +
        '<a href="#/matiere/' + s.id + '"' + (showExos ? '' : ' class="on"') + '>📖 Leçons (' + (s.lessons.length - exos.length) + ')</a>' +
        '<a href="#/matiere/' + s.id + '/exercices"' + (showExos ? ' class="on"' : '') + '>📝 Exercices corrigés (' + exos.length + ')</a></nav>' : '') +
      (showExos ? '<p class="muted small">Chaque exercice se travaille seul : ouvre-le pour le schéma et la correction détaillée, ou lance directement son QCM.</p>' : '') +
      '<ol class="lesson-list">' + shown.map(function (l) {
        var lq = lessonQuestions(l.key), ls = scoreOf(lq), lv = level(ls.pct);
        return '<li><a href="#/lecon/' + l.key + '"><span class="num">' + l.num + '</span><span class="lt">' + esc(l.title) +
          '<span class="muted small">' + lq.length + ' questions' + (store.lessonsSeen[l.key] ? ' · ✔ lue' : '') + '</span></span>' +
          '<span class="lscore ' + lv.cls + '">' + (ls.pct === null ? '—' : ls.pct + ' % ' + lv.dot) + '</span></a>' +
          (l.exo && lq.length ? '<div class="exo-actions"><a class="btn" href="#/lecon/' + l.key + '">📖 Schéma + corrigé</a>' +
            '<button class="btn primary" data-action="lesson-qcm" data-key="' + l.key + '">🧠 S’entraîner (' + lq.length + ')</button></div>' : '') +
          '</li>';
      }).join('') + '</ol>';
  }

  function crumbs(items) {
    return '<nav class="crumbs">' + items.map(function (it) {
      return it[0] ? '<a href="' + it[0] + '">' + esc(it[1]) + '</a>' : '<span>' + esc(it[1]) + '</span>';
    }).join(' › ') + '</nav>';
  }

  function memoHtml(l, s, withLink) {
    var m = l.memo;
    if (!m) return '';
    return '<div class="memo" style="--c:' + s.color + '">' +
      '<div class="memo-h">' + s.icon + ' ' + esc(l.title.toUpperCase()) + '</div>' +
      (m.cle ? '<div class="memo-key">🧠 ' + m.cle + '</div>' : '') +
      (m.flow ? '<div class="flow">' + m.flow.map(function (f) { return '<span>' + f + '</span>'; }).join('<i>↓</i>') + '</div>' : '') +
      (m.points ? '<ul class="memo-pts">' + m.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' : '') +
      (m.astuce ? '<div class="memo-tip">🎯 <b>Astuce mémoire</b><br>« ' + m.astuce + ' »</div>' : '') +
      (withLink ? '<a class="memo-link" href="#/lecon/' + l.key + '">📖 Revoir la leçon ›</a>' : '') +
      '</div>';
  }

  function viewLecon(key) {
    var l = REV.lessonById[key];
    if (!l) return viewCours();
    var s = subj(l.subject);
    store.lessonsSeen[key] = Date.now(); save();
    var group = s.lessons.filter(function (x) { return !!x.exo === !!l.exo; }); // les exercices ne s'enchaînent qu'entre eux
    var idx = group.indexOf(l);
    var prev = group[idx - 1], next = group[idx + 1];
    var qn = lessonQuestions(key).length;
    var ls = scoreOf(lessonQuestions(key));
    return crumbs([['#/cours', 'Cours'], ['#/matiere/' + s.id, s.name]].concat(l.exo ? [['#/matiere/' + s.id + '/exercices', 'Exercices corrigés']] : []).concat([[null, l.num + ' — ' + l.title]])) +
      '<article class="lesson" style="--c:' + s.color + '">' +
      '<h1 class="h1"><span class="num">' + l.num + '</span> ' + esc(l.title) + '</h1>' +
      (ls.pct !== null ? '<p><span class="pill ' + level(ls.pct).cls + '">' + level(ls.pct).dot + ' Ton score : ' + ls.pct + ' %</span></p>' : '') +
      '<div class="lesson-body">' + l.html + '</div>' +
      (l.images ? l.images.map(function (im) {
        return '<figure><a href="img/' + im.src + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + im.src + '" alt="' + esc(im.cap) + '"></a><figcaption>🖼️ ' + esc(im.cap) + ' <span class="muted">(toucher pour agrandir)</span></figcaption></figure>';
      }).join('') : '') +
      (l.retenir ? '<div class="box retenir"><b>★ À retenir</b><ul>' + l.retenir.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
      (l.pieges ? '<div class="box piege"><b>⚠️ Pièges</b><ul>' + l.pieges.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
      '<h2 class="h2">🧠 Aide-mémoire</h2>' + memoHtml(l, s, false) +
      '</article>' +
      '<div class="row-actions sticky-actions">' +
        (qn ? '<button class="btn primary" data-action="lesson-qcm" data-key="' + key + '">🧠 QCM sur cette leçon (' + qn + ')</button>' : '') +
        '<button class="btn" data-action="print">🖨️ Imprimer</button>' +
      '</div>' +
      '<div class="pager">' +
        (prev ? '<a class="btn ghost" href="#/lecon/' + prev.key + '">‹ ' + prev.num + ' ' + esc(prev.title) + '</a>' : '<span></span>') +
        (next ? '<a class="btn ghost" href="#/lecon/' + next.key + '">' + next.num + ' ' + esc(next.title) + ' ›</a>' : '<span></span>') +
      '</div>';
  }

  function viewQcmChoice() {
    var all = allQuestions();
    var toReview = all.filter(needsReview).length;
    return '<h1 class="h1">🧠 QCM</h1><p class="muted">Choisis une matière. Correction immédiate et explication après chaque question.</p>' +
      '<div class="subject-grid">' + REV.subjects.map(function (s) {
        var sc = scoreOf(s.questions), lv = level(sc.pct);
        return '<a class="card subj" href="#/qcm/' + s.id + '" style="--c:' + s.color + '"><span class="subj-ic">' + s.icon +
          '</span><span class="subj-body"><b>' + esc(s.name) + '</b><span class="muted small">' + s.questions.length + ' questions</span>' + bar(sc.pct) +
          '</span><span class="subj-score ' + lv.cls + '">' + (sc.pct === null ? '—' : sc.pct + ' %') + '</span></a>';
      }).join('') + '</div>' +
      '<div class="home-foot">' +
        '<button class="card mini" data-action="exam">🎓 Examen blanc — 40 questions toutes matières</button>' +
        '<a class="card mini" href="#/revision">🔁 QCM de révision' + (toReview ? ' (' + toReview + ')' : '') + '</a>' +
      '</div>';
  }

  function viewQcmSetup(id) {
    var s = subj(id);
    if (!s) return viewQcmChoice();
    var n = s.questions.length;
    var counts = [10, 20].filter(function (c) { return c < n; });
    return crumbs([['#/qcm', 'QCM'], [null, s.name]]) +
      '<header class="subj-head" style="--c:' + s.color + '"><span class="subj-ic xl">' + s.icon + '</span><div><h1 class="h1">' + esc(s.name) + ' → QCM</h1>' +
      '<p class="muted">' + n + ' questions disponibles</p></div></header>' +
      '<form class="setup" data-subject="' + s.id + '">' +
        '<fieldset><legend>Nombre de questions</legend><div class="seg">' +
          counts.map(function (c, i) { return '<label><input type="radio" name="count" value="' + c + '"' + (i === counts.length - 1 ? ' checked' : '') + '><span>' + c + '</span></label>'; }).join('') +
          '<label><input type="radio" name="count" value="' + n + '"' + (counts.length ? '' : ' checked') + '><span>Toutes (' + n + ')</span></label>' +
        '</div></fieldset>' +
        '<fieldset><legend>Leçons</legend><label class="chk"><input type="checkbox" name="all" checked data-action="toggle-all"> <b>Toutes les leçons</b></label>' +
          '<div class="lesson-checks">' + s.lessons.map(function (l) {
            var c = lessonQuestions(l.key).length;
            if (!c) return '';
            return '<label class="chk"><input type="checkbox" name="lesson" value="' + l.key + '" checked> ' + l.num + ' — ' + esc(l.title) + ' <span class="muted small">(' + c + ')</span></label>';
          }).join('') + '</div></fieldset>' +
        (s.questions.some(function (q) { return q.fixed; }) ? '<fieldset><legend>Type de questions</legend><label class="chk"><input type="checkbox" name="tests"> 📝 Seulement les questions des tests (recopiées de tes copies)</label></fieldset>' : '') +
        '<button class="btn primary big" type="submit">▶️ Commencer</button>' +
      '</form>';
  }

  function viewQuiz() {
    return '<h1 class="h1">⚡ Quiz éclair</h1>' +
      '<div class="card pad"><p><b>10 questions</b> tirées au hasard dans <b>toutes les matières</b>.</p>' +
      '<p>⏱️ <b>' + QUIZ_SECONDS + ' secondes</b> par question : si le temps est écoulé, la question compte comme ratée — et la correction s’affiche quand même.</p>' +
      '<p class="muted">Idéal pour 5 minutes de révision dans les transports ou en pause.</p>' +
      '<div class="row-actions"><button class="btn primary big" data-action="quiz" data-timer="1">⚡ Lancer le quiz chronométré</button>' +
      '<button class="btn" data-action="quiz" data-timer="0">Sans chrono</button></div></div>';
  }

  function viewRevision() {
    var list = allQuestions().filter(needsReview);
    if (!list.length) {
      return '<h1 class="h1">🔁 QCM de révision</h1><div class="card pad center"><p class="big">🎉</p><p>Aucune question ratée à retravailler pour l’instant.</p>' +
        '<p class="muted">Les questions que tu rates reviennent ici automatiquement, jusqu’à ce que tu les réussisses 2 fois de suite.</p>' +
        '<a class="btn primary" href="#/qcm">🧠 Faire un QCM</a></div>';
    }
    var bySubj = {};
    list.forEach(function (q) { bySubj[q.subject] = (bySubj[q.subject] || 0) + 1; });
    return '<h1 class="h1">🔁 QCM de révision</h1>' +
      '<div class="card pad"><p><b>' + list.length + '</b> question' + (list.length > 1 ? 's' : '') + ' ratée' + (list.length > 1 ? 's' : '') +
      ' à retravailler. Les plus souvent ratées passent en premier.</p>' +
      '<ul class="plain">' + Object.keys(bySubj).map(function (k) { var s = subj(k); return '<li>' + s.icon + ' ' + esc(s.name) + ' : <b>' + bySubj[k] + '</b></li>'; }).join('') + '</ul>' +
      '<p class="muted small">Une question sort de cette liste quand tu la réussis 2 fois de suite.</p>' +
      '<button class="btn primary big" data-action="revision">▶️ Lancer la révision (' + Math.min(20, list.length) + ' questions)</button></div>';
  }

  /* ----- Question en cours ----- */
  function viewSession() {
    if (!session) {
      return '<div class="card pad center"><p>Aucun QCM en cours.</p><a class="btn primary" href="#/qcm">🧠 Choisir un QCM</a></div>';
    }
    if (session.i >= session.qids.length) return viewBilan();
    var q = REV.qById[session.qids[session.i]];
    var s = subj(q.subject), l = REV.lessonById[q.lkey];
    var perm = session.perm[session.i];
    var ans = session.answers[session.i];
    var n = session.qids.length;
    var head = '<div class="q-head" style="--c:' + s.color + '">' +
      '<div class="q-meta"><span>' + s.icon + ' ' + esc(s.name) + '</span><span class="muted">📖 ' + esc(l.title) + '</span></div>' +
      '<div class="q-count"><b>Question ' + (session.i + 1) + ' / ' + n + '</b><span class="muted small">' + esc(session.title) + '</span></div>' +
      '<div class="progress"><span style="width:' + Math.round(session.i * 100 / n) + '%"></span></div>' +
      (session.timer && !ans ? '<div class="timer"><span id="timer-bar"></span><b id="timer-txt">' + QUIZ_SECONDS + ' s</b></div>' : '') +
      '</div>';
    var enonce = l.exo && (l.html.match(/<h3>Énoncé<\/h3>([\s\S]*?)<h3>/) || [])[1];
    var body = '<div class="q-card">' +
      (enonce ? '<details class="q-enonce"><summary>📋 Énoncé de l’exercice</summary>' + enonce + '</details>' : '') +
      '<h1 class="q-text">' + q.q + '</h1>' +
      (q.img ? '<figure class="q-img"><a href="img/' + q.img + '" target="_blank" rel="noopener"><img src="img/' + q.img + '" alt="Schéma de la question"></a></figure>' : '') +
      (q.multi && !ans ? '<p class="muted small">☑️ ' + q.good.length + ' réponses à cocher, puis « Valider ».</p>' : '') +
      '<div class="choices" role="group" aria-label="Réponses">' + perm.map(function (orig, k) {
        var cls = 'choice';
        if (ans) {
          if (q.good.indexOf(orig) >= 0) cls += ' correct';
          else if (chosenList(ans).indexOf(orig) >= 0) cls += ' wrong';
          else cls += ' dim';
        } else if (q.multi && (session.pick || []).indexOf(orig) >= 0) cls += ' picked';
        return '<button class="' + cls + '" data-action="answer" data-k="' + k + '"' + (ans ? ' disabled' : '') + '>' +
          '<span class="letter">' + lab(q, k) + '</span><span class="ct">' + q.c[orig] + '</span></button>';
      }).join('') + '</div>' +
      (q.multi && !ans ? '<button class="btn primary big" data-action="validate"' + ((session.pick || []).length ? '' : ' disabled') + '>✔ Valider (' + (session.pick || []).length + ' / ' + q.good.length + ')</button>' : '') +
      '</div>';
    var fb = '';
    if (ans) {
      var goodTxt = q.good.map(function (g) { return '<b>' + lab(q, perm.indexOf(g)) + '</b> — ' + q.c[g]; }).join('<br>');
      var mine = chosenList(ans);
      // exercices : on reprend le développement complet de la correction détaillée de la leçon
      var qn = l.exo && (q.q.match(/^Q\d+/) || [])[0];
      var dev = qn && (l.html.match(new RegExp('<li><b>' + qn + ' — [^<]*</b>\\s*([\\s\\S]*?)</li>')) || [])[1];
      if (dev && dev.trim() === q.e.trim()) dev = null; // déjà l'explication complète
      fb = '<div class="feedback ' + (ans.ok ? 'ok' : 'ko') + '" id="feedback" tabindex="-1">' +
        '<div class="fb-title">' + (ans.ok ? '✅ Bonne réponse !' : (ans.chosen === -1 ? '⏱️ Temps écoulé' : '❌ Mauvaise réponse')) + '</div>' +
        '<div class="fb-recap"><p class="fb-q">❓ ' + q.q + '</p>' +
          (mine.length ? '<p>Ta réponse : ' + mine.map(function (c) { return '<b>' + lab(q, perm.indexOf(c)) + '</b> — ' + q.c[c]; }).join(' · ') + (ans.ok ? ' ✅' : ' ❌') + '</p>' : '') +
          (ans.ok ? '' : '<p class="fb-good">' + (q.multi ? 'Les bonnes réponses sont :<br>' : 'La bonne réponse est : ') + goodTxt + '</p>') + '</div>' +
        (dev ? '<div class="fb-sec dev"><b>🧮 Développement de la réponse</b><p>' + dev + '</p></div>' : '') +
        '<div class="fb-sec' + (l.exo && !dev ? ' dev' : '') + '"><b>' + (l.exo && !dev ? '🧮 Développement de la réponse' : '💡 Explication') + '</b><p>' + q.e + '</p></div>' +
        (q.r ? '<div class="fb-sec retenir"><b>🧠 À retenir</b><p>' + q.r + '</p></div>' : '') +
        (q.w ? '<div class="fb-sec attention"><b>⚠️ Attention</b><p>' + q.w + '</p></div>' : '') +
        (q.src ? '<p class="muted small">Source : ' + esc(q.src) + '</p>' : '') +
        '<a class="fb-lesson" href="#/lecon/' + q.lkey + '">📖 Leçon : ' + esc(l.title) + ' ›</a>' +
        '<button class="btn primary big" data-action="next">' + (session.i + 1 < n ? '➡️ Question suivante' : '📊 Voir mon résultat') + '</button>' +
        '</div>';
    }
    return head + body + fb +
      '<div class="q-foot"><button class="btn ghost small" data-action="quit">✖ Arrêter le QCM</button></div>';
  }

  function afterSessionRender() {
    var ans = session && session.answers[session.i];
    if (ans) {
      var fb = document.getElementById('feedback');
      if (fb) fb.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo(0, 0);
    if (session && session.timer) {
      var left = QUIZ_SECONDS, t0 = Date.now();
      var barEl = document.getElementById('timer-bar'), txt = document.getElementById('timer-txt');
      timerId = setInterval(function () {
        left = QUIZ_SECONDS - (Date.now() - t0) / 1000;
        if (barEl) barEl.style.width = Math.max(0, left * 100 / QUIZ_SECONDS) + '%';
        if (txt) txt.textContent = Math.max(0, Math.ceil(left)) + ' s';
        if (barEl) barEl.className = left < 8 ? 'low' : '';
        if (left <= 0) { clearInterval(timerId); answer(-1); }
      }, 200);
    }
  }

  function chosenList(ans) { return Array.isArray(ans.chosen) ? ans.chosen : (ans.chosen >= 0 ? [ans.chosen] : []); }

  function answer(k) {
    if (!session || session.answers[session.i]) return;
    var q = REV.qById[session.qids[session.i]];
    if (q.multi && k !== -1) { // questions à plusieurs réponses : on coche / décoche, puis on valide
      var orig = session.perm[session.i][k];
      session.pick = session.pick || [];
      var at = session.pick.indexOf(orig);
      if (at >= 0) session.pick.splice(at, 1); else session.pick.push(orig);
      saveSession(); render(); return;
    }
    clearInterval(timerId);
    var chosen = k === -1 ? (q.multi ? (session.pick || []) : -1) : session.perm[session.i][k];
    var ok = q.multi
      ? chosen.length === q.good.length && q.good.every(function (g) { return chosen.indexOf(g) >= 0; })
      : q.good.indexOf(chosen) >= 0;
    session.answers[session.i] = { chosen: chosen, ok: ok };
    session.pick = [];
    record(q.id, ok);
    saveSession();
    render();
  }

  function next() {
    if (!session) return;
    session.i++;
    if (session.i >= session.qids.length) finishSession();
    saveSession();
    go(session && session.i >= session.qids.length ? '#/bilan' : '#/session');
  }

  function finishSession() {
    if (session.saved) return;
    var ok = session.answers.filter(function (a) { return a && a.ok; }).length;
    store.sessions.unshift({ d: Date.now(), mode: session.mode, title: session.title, total: session.qids.length, ok: ok });
    store.sessions = store.sessions.slice(0, 50);
    session.saved = true;
    save();
  }

  /* ----- Résultat d'un QCM ----- */
  function viewBilan() {
    if (!session || !session.answers.length) return viewResultats();
    var answered = session.answers.filter(Boolean).length;
    var ok = session.answers.filter(function (a) { return a && a.ok; }).length;
    var pct = answered ? Math.round(ok * 100 / answered) : 0;
    var lv = level(pct);
    var subjTitle = session.subject ? subj(session.subject) : null;

    // détail par leçon
    var per = {};
    session.qids.forEach(function (id, i) {
      var a = session.answers[i]; if (!a) return;
      var q = REV.qById[id];
      var p = per[q.lkey] || (per[q.lkey] = { ok: 0, n: 0 });
      p.n++; if (a.ok) p.ok++;
    });
    var rows = Object.keys(per).map(function (k) {
      var p = per[k]; return { key: k, l: REV.lessonById[k], pct: Math.round(p.ok * 100 / p.n), ok: p.ok, n: p.n };
    }).sort(function (a, b) { return b.pct - a.pct; });

    var weak = rows.filter(function (r) { return r.pct < 80; }).sort(function (a, b) { return a.pct - b.pct; });
    var strong = rows.filter(function (r) { return r.pct >= 80; });

    var wrong = [];
    session.qids.forEach(function (id, i) { var a = session.answers[i]; if (a && !a.ok) wrong.push({ q: REV.qById[id], a: a, perm: session.perm[i] }); });

    return '<section class="result">' +
      '<div class="res-head"><div class="res-title">📊 RÉSULTAT</div>' +
      '<div class="res-subj">' + (subjTitle ? subjTitle.icon + ' ' + esc(subjTitle.name.toUpperCase()) : esc(session.title.toUpperCase())) + '</div>' +
      '<div class="res-score">' + ok + ' / ' + answered + '</div>' +
      '<div class="res-pct ' + lv.cls + '">' + pct + ' %</div>' +
      '<div class="res-ascii ' + lv.cls + '" aria-hidden="true">' + asciiBar(pct) + '</div>' +
      '<p>✅ ' + ok + ' bonne' + (ok > 1 ? 's' : '') + ' réponse' + (ok > 1 ? 's' : '') + ' &nbsp; ❌ ' + (answered - ok) + ' mauvaise' + (answered - ok > 1 ? 's' : '') + ' réponse' + (answered - ok > 1 ? 's' : '') + '</p></div>' +

      '<h2 class="h2">📚 Détail des leçons</h2><div class="card"><table class="tbl">' + rows.map(function (r) {
        var lv2 = level(r.pct);
        return '<tr><td><a href="#/lecon/' + r.key + '">' + esc(r.l.title) + '</a></td><td class="muted small">' + r.ok + '/' + r.n + '</td><td class="num-c">' + r.pct + ' %</td><td>' + lv2.dot + '</td></tr>';
      }).join('') + '</table></div>' +

      '<h2 class="h2">🎯 Tes priorités de révision</h2>' +
      (weak.length ? weak.map(function (r, i) {
        var lv2 = level(r.pct);
        return '<div class="prio ' + lv2.cls + '"><div class="prio-h">' + lv2.dot + ' Priorité ' + (i + 1) + '</div><div class="prio-t">' + esc(r.l.title) +
          '</div><div class="muted">Score : ' + r.pct + ' %</div><div class="row-actions"><a class="btn small" href="#/lecon/' + r.key + '">➡️ Revoir la leçon</a>' +
          '<a class="btn small ghost" href="#/memos/' + r.l.subject + '#m-' + r.l.id + '">🧠 Revoir la fiche</a></div></div>';
      }).join('') : '<div class="card pad">🎉 Aucune leçon sous 80 % sur ce QCM. Bravo !</div>') +
      (strong.length ? '<div class="prio good"><div class="prio-h">🟢 Maîtrisé</div>' + strong.map(function (r) {
        return '<div>' + esc(r.l.title) + ' — ' + r.pct + ' %</div>';
      }).join('') + '</div>' : '') +

      (weak.length ? '<h2 class="h2">🧠 Aides-mémoires associés</h2>' + weak.map(function (r) {
        return memoHtml(r.l, subj(r.l.subject), true);
      }).join('') : '') +

      (wrong.length ? '<h2 class="h2">❌ Tes erreurs</h2>' + wrong.map(function (w) {
        return '<details class="card err"><summary>' + w.q.q + '</summary><p>✅ <b>' + w.q.good.map(function (g) { return w.q.c[g]; }).join(' + ') + '</b></p>' +
          (chosenList(w.a).length ? '<p class="muted">Ta réponse : ' + chosenList(w.a).map(function (c) { return w.q.c[c]; }).join(' + ') + '</p>' : '<p class="muted">Temps écoulé</p>') +
          '<p>💡 ' + w.q.e + '</p>' + (w.q.r ? '<p>🧠 ' + w.q.r + '</p>' : '') + '</details>';
      }).join('') : '') +

      '<div class="row-actions center">' +
        (wrong.length ? '<button class="btn primary" data-action="redo-wrong">🔁 Refaire mes erreurs (' + wrong.length + ')</button>' : '') +
        '<button class="btn" data-action="redo">↻ Refaire un QCM identique</button>' +
        '<a class="btn ghost" href="#/resultats">📈 Mon niveau général</a>' +
      '</div></section>';
  }

  /* ----- Mon niveau ----- */
  function viewResultats() {
    var all = allQuestions();
    var gs = scoreOf(all);
    var rows = REV.subjects.map(function (s) { return { s: s, sc: scoreOf(s.questions) }; });
    var lessons = [];
    REV.subjects.forEach(function (s) {
      s.lessons.forEach(function (l) {
        var sc = scoreOf(lessonQuestions(l.key));
        if (sc.pct !== null) lessons.push({ l: l, s: s, pct: sc.pct, seen: sc.seen });
      });
    });
    var weak = lessons.filter(function (x) { return x.pct < 80; }).sort(function (a, b) { return a.pct - b.pct; });
    var toReview = all.filter(needsReview).length;

    if (gs.pct === null) {
      return '<h1 class="h1">📊 Mon niveau</h1><div class="card pad center"><p class="big">📈</p><p>Pas encore de résultats.</p>' +
        '<p class="muted">Fais un premier QCM : ton niveau par matière, tes points faibles et tes aides-mémoires apparaîtront ici.</p>' +
        '<a class="btn primary" href="#/qcm">🧠 Commencer un QCM</a></div>' + dataTools();
    }

    return '<h1 class="h1">📊 Mon niveau</h1>' +
      '<div class="card pad center"><div class="muted">Niveau global</div><div class="res-pct ' + level(gs.pct).cls + '">' + gs.pct + ' %</div>' +
      '<div class="muted small">' + gs.seen + ' / ' + gs.total + ' questions déjà travaillées</div></div>' +
      '<h2 class="h2">📚 Par matière</h2><div class="card"><table class="tbl">' + rows.map(function (r) {
        var lv = level(r.sc.pct);
        return '<tr><td><a href="#/matiere/' + r.s.id + '">' + r.s.icon + ' ' + esc(r.s.name) + '</a><div class="muted small">' + r.sc.seen + '/' + r.sc.total + ' vues</div></td>' +
          '<td class="bar-c">' + bar(r.sc.pct) + '</td><td class="num-c">' + (r.sc.pct === null ? '—' : r.sc.pct + ' %') + '</td><td>' + lv.dot + '</td></tr>';
      }).join('') + '</table></div>' +

      '<h2 class="h2">🔥 À réviser en priorité</h2>' +
      (weak.length ? '<ol class="card prio-list">' + weak.slice(0, 10).map(function (x) {
        var lv = level(x.pct);
        return '<li><a href="#/lecon/' + x.l.key + '">' + lv.dot + ' <b>' + esc(x.l.title) + '</b> <span class="muted small">' + x.s.icon + ' ' + esc(x.s.name) + '</span></a><span class="num-c">' + x.pct + ' %</span></li>';
      }).join('') + '</ol>' : '<div class="card pad">🎉 Toutes les leçons travaillées sont au-dessus de 80 %.</div>') +
      (toReview ? '<a class="card review-cta" href="#/revision"><span class="big">🔁</span><span><b>QCM de révision</b><br>' + toReview + ' question(s) ratée(s) à retravailler</span><span class="chev">›</span></a>' : '') +

      (weak.length ? '<h2 class="h2">🧠 Tes aides-mémoires</h2><ul class="card memo-links">' + weak.slice(0, 10).map(function (x) {
        return '<li><a href="#/memos/' + x.s.id + '#m-' + x.l.id + '">→ Mémo ' + esc(x.l.title) + '</a></li>';
      }).join('') + '</ul>' : '') +

      (store.sessions.length ? '<h2 class="h2">🕑 Historique</h2><div class="card"><table class="tbl">' + store.sessions.slice(0, 15).map(function (h) {
        var p = Math.round(h.ok * 100 / h.total);
        return '<tr><td class="muted small">' + fmtDate(h.d) + '</td><td>' + esc(h.title) + '</td><td class="num-c">' + h.ok + '/' + h.total + '</td><td>' + level(p).dot + '</td></tr>';
      }).join('') + '</table></div>' : '') +
      dataTools();
  }

  function dataTools() {
    return '<h2 class="h2">💾 Ma progression</h2><div class="card pad"><p class="muted small">Tout est enregistré sur cet appareil uniquement (aucun compte, aucun serveur). ' +
      'Pour passer du PC au téléphone : exporte le fichier puis importe-le sur l’autre appareil.</p><div class="row-actions">' +
      '<button class="btn" data-action="export">⬇️ Exporter</button>' +
      '<label class="btn">⬆️ Importer<input type="file" accept="application/json,.json" data-action="import" hidden></label>' +
      '<button class="btn danger" data-action="reset">🗑️ Tout effacer</button></div></div>';
  }

  /* ----- Aides-mémoires ----- */
  function viewMemos(id) {
    var list = id ? [subj(id)].filter(Boolean) : REV.subjects;
    var html = crumbs([['#/cours', 'Cours'], [null, 'Aides-mémoires' + (id && list[0] ? ' — ' + list[0].name : '')]]) +
      '<h1 class="h1">🧠 Aides-mémoires</h1>' +
      (id ? '<p><a href="#/memos">Voir toutes les matières</a></p>' : '<div class="chips">' + REV.subjects.map(function (s) {
        return '<a class="chip" href="#/memos/' + s.id + '">' + s.icon + ' ' + esc(s.name) + '</a>';
      }).join('') + '</div>') +
      '<div class="row-actions"><button class="btn" data-action="print">🖨️ Imprimer / PDF</button></div>';
    list.forEach(function (s) {
      html += '<h2 class="h2">' + s.icon + ' ' + esc(s.name) + '</h2><div class="memo-grid">' +
        s.lessons.map(function (l) { return '<div id="m-' + l.id + '">' + memoHtml(l, s, true) + '</div>'; }).join('') + '</div>';
    });
    setTimeout(function () {
      var m = location.hash.match(/#m-([\w-]+)$/);
      if (m) { var el = document.getElementById('m-' + m[1]); if (el) { el.scrollIntoView({ block: 'start' }); el.classList.add('flash'); } }
    }, 50);
    return html;
  }

  // Fiches de révision complètes : l'essentiel de la matière (REV.fiches) + toutes les leçons résumées + schémas + symboles
  function viewFiches() {
    return crumbs([['#/cours', 'Cours'], [null, 'Fiches de révision']]) +
      '<h1 class="h1">📄 Fiches de révision complètes</h1><p class="muted">Une fiche par matière : l’essentiel, les formules, les schémas, les symboles, les pièges. Imprimable en PDF.</p>' +
      '<a class="card review-cta" href="#/fiche/uv2"><span class="big">🎯</span><span><b>Fiche spéciale UV2</b><br>Tous les points à connaître pour le dossier d’évaluation</span><span class="chev">›</span></a>' +
      '<div class="subject-grid">' + REV.subjects.map(function (s) {
        return '<a class="card subj" href="#/fiche/' + s.id + '" style="--c:' + s.color + ';--deco:' + decoUrl(s.id).replace(/"/g, '&quot;') + '"><span class="subj-ic">' + s.icon + '</span><span class="subj-body"><b>' + esc(s.name) + '</b><span class="muted small">Fiche complète</span></span><span class="chev">›</span></a>';
      }).join('') + '</div>';
  }
  function list(cls, title, arr) {
    return arr && arr.length ? '<div class="box ' + cls + '"><b>' + title + '</b><ul>' + arr.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '';
  }
  function fig(im) {
    return '<figure><a href="img/' + im.src + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + im.src + '" alt="' + esc(im.cap) + '"></a><figcaption>' + esc(im.cap) + '</figcaption></figure>';
  }
  function viewFiche(id) {
    var F = (REV.fiches || {})[id];
    if (id === 'uv2') {
      return crumbs([['#/cours', 'Cours'], ['#/fiches', 'Fiches de révision'], [null, 'UV2']]) +
        '<article class="lesson fiche"><h1 class="h1">🎯 Fiche spéciale UV2</h1>' + (F ? F.html : '') + '</article>' +
        '<div class="row-actions sticky-actions"><button class="btn" data-action="print">🖨️ Imprimer / PDF</button></div>';
    }
    var s = subj(id);
    if (!s) return viewFiches();
    var cours = s.lessons.filter(function (l) { return !l.exo; });
    var exos = s.lessons.filter(function (l) { return l.exo; });
    var syms = exos.filter(function (l) { return /^sym/.test(l.id); });
    var autres = exos.filter(function (l) { return !/^sym/.test(l.id); });
    var html = crumbs([['#/cours', 'Cours'], ['#/fiches', 'Fiches de révision'], [null, s.name]]) +
      '<article class="lesson fiche" style="--c:' + s.color + '">' +
      '<h1 class="h1">' + s.icon + ' Fiche de révision — ' + esc(s.name) + '</h1>' +
      '<p class="muted">' + esc(s.desc || '') + '</p>' +
      '<nav class="chips">' + (F ? '<a class="chip" href="#/fiche/' + id + '#f-essentiel">⭐ L’essentiel</a>' : '') +
        cours.map(function (l) { return '<a class="chip" href="#/fiche/' + id + '#f-' + l.id + '">' + l.num + ' ' + esc(l.title) + '</a>'; }).join('') +
        (syms.length ? '<a class="chip" href="#/fiche/' + id + '#f-symboles">🔣 Symboles</a>' : '') +
        (autres.length ? '<a class="chip" href="#/fiche/' + id + '#f-exos">📝 Exercices types</a>' : '') + '</nav>' +
      (F ? '<section id="f-essentiel" class="fiche-sec"><h2 class="h2">⭐ L’essentiel à connaître</h2>' + F.html + '</section>' : '');
    cours.forEach(function (l) {
      html += '<section id="f-' + l.id + '" class="fiche-sec"><h2 class="h2">' + l.num + ' — ' + esc(l.title) + ' <a class="small" href="#/lecon/' + l.key + '">📖 leçon</a></h2>' +
        list('retenir', '★ À retenir', l.retenir) + list('piege', '⚠️ Pièges', l.pieges) +
        (l.memo && l.memo.points ? list('methode', '🧠 ' + (l.memo.cle || 'Aide-mémoire'), l.memo.points) : '') +
        (l.images ? '<div class="fiche-figs">' + l.images.map(fig).join('') + '</div>' : '') + '</section>';
    });
    if (syms.length) {
      html += '<section id="f-symboles" class="fiche-sec"><h2 class="h2">🔣 Symboles : désignation</h2>';
      syms.forEach(function (l) {
        var seen = {}, cards = [];
        lessonQuestions(l.key).forEach(function (q) {
          if (!q.img || seen[q.img] || !/désignation de ce symbole|Quel est ce symbole|Quelle est cette porte/.test(q.q)) return;
          seen[q.img] = 1;
          cards.push('<figure><img loading="lazy" src="img/' + q.img + '" alt=""><figcaption><b>' + q.good.map(function (g) { return q.c[g]; }).join(' / ') + '</b><br><span class="small">' + q.e.replace(/^[^:]*: /, '') + '</span></figcaption></figure>');
        });
        html += '<h3>' + esc(l.title) + '</h3><div class="fiche-sym">' + cards.join('') + '</div>';
      });
      html += '</section>';
    }
    if (autres.length) {
      html += '<section id="f-exos" class="fiche-sec"><h2 class="h2">📝 Exercices types (corrigés)</h2><ul class="fiche-exos">' + autres.map(function (l) {
        return '<li><a href="#/lecon/' + l.key + '"><b>' + l.num + '</b> ' + esc(l.title) + '</a>' + (l.retenir ? '<ul>' + l.retenir.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' : '') + '</li>';
      }).join('') + '</ul></section>';
    }
    setTimeout(function () {
      var m = location.hash.match(/#(f-[\w-]+)$/);
      if (m) { var el = document.getElementById(m[1]); if (el) el.scrollIntoView({ block: 'start' }); }
    }, 50);
    return html + '</article><div class="row-actions sticky-actions"><a class="btn primary" href="#/qcm/' + s.id + '">🧠 QCM ' + esc(s.name) + '</a><button class="btn" data-action="print">🖨️ Imprimer / PDF</button></div>';
  }

  function viewTrancher() {
    var t = REV.trancher || [];
    return crumbs([['#/cours', 'Cours'], [null, 'Points à trancher']]) +
      '<h1 class="h1">⚖️ Points à trancher avec le formateur</h1>' +
      '<p class="muted">Ce sont les points où tes documents se contredisent. Le site retient la réponse indiquée en vert — mais c’est ton formateur qui fait le barème : fais-les valider.</p>' +
      t.map(function (x) {
        return '<div class="card pad trancher"><h3>' + esc(x.sujet) + '</h3><div class="tr-grid"><div><span class="muted small">Version A</span><p>' + x.a +
          '</p></div><div><span class="muted small">Version B</span><p>' + x.b + '</p></div></div><p class="tr-keep">✅ Retenu : ' + x.keep + '</p></div>';
      }).join('');
  }

  /* ---------- Actions ---------- */
  function onClick(e) {
    var el = e.target.closest('[data-action]');
    if (!el || el.tagName === 'INPUT') return;
    var a = el.getAttribute('data-action');
    if (a === 'answer') answer(+el.getAttribute('data-k'));
    else if (a === 'validate') answer(-1);
    else if (a === 'next') next();
    else if (a === 'quit') {
      if (confirm('Arrêter ce QCM ? Les réponses déjà données restent comptées.')) {
        if (session.answers.filter(Boolean).length) { session.qids = session.qids.slice(0, session.answers.length); session.perm = session.perm.slice(0, session.answers.length); session.i = session.qids.length; finishSession(); saveSession(); go('#/bilan'); }
        else { session = null; saveSession(); go('#/'); }
      }
    }
    else if (a === 'lesson-qcm') {
      var key = el.getAttribute('data-key'), l = REV.lessonById[key];
      startSession({ mode: 'lecon', title: 'Leçon ' + l.title, subject: l.subject, lesson: key, questions: arrange(lessonQuestions(key)) });
    }
    else if (a === 'quiz') {
      startSession({ mode: 'quiz', title: 'Quiz éclair', timer: el.getAttribute('data-timer') === '1', questions: shuffle(allQuestions()), count: 10 });
    }
    else if (a === 'exam') {
      // 40 questions réparties au prorata du nombre de questions par matière
      var pool = [];
      var total = totalQuestions();
      REV.subjects.forEach(function (s) {
        var k = Math.max(1, Math.round(40 * s.questions.length / total));
        pool = pool.concat(shuffle(s.questions).slice(0, k));
      });
      startSession({ mode: 'examen', title: 'Examen blanc', questions: shuffle(pool).slice(0, 40) });
    }
    else if (a === 'revision') {
      var list = allQuestions().filter(needsReview);
      list = shuffle(list).sort(function (x, y) { return (store.q[y.id].ko || 0) - (store.q[x.id].ko || 0); });
      startSession({ mode: 'revision', title: 'QCM de révision', questions: list, count: 20 });
    }
    else if (a === 'redo-wrong') {
      var qs = [];
      session.qids.forEach(function (id, i) { var an = session.answers[i]; if (an && !an.ok) qs.push(REV.qById[id]); });
      startSession({ mode: 'revision', title: session.title + ' — erreurs', subject: session.subject, questions: arrange(qs) });
    }
    else if (a === 'redo') {
      var ids = session.qids.map(function (id) { return REV.qById[id]; });
      startSession({ mode: session.mode, title: session.title, subject: session.subject, timer: session.timer, questions: arrange(ids) });
    }
    else if (a === 'print') window.print();
    else if (a === 'export') {
      var blob = new Blob([JSON.stringify(store)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url; link.download = 'revisions2026-progression.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
    else if (a === 'reset') {
      if (confirm('Effacer toute ta progression sur cet appareil ?')) {
        store = { q: {}, sessions: [], lessonsSeen: {} }; save(); session = null; saveSession(); toast('Progression effacée.'); render();
      }
    }
  }

  function onChange(e) {
    var el = e.target;
    if (el.getAttribute('data-action') === 'import' && el.files && el.files[0]) {
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var d = JSON.parse(fr.result);
          if (!d || typeof d.q !== 'object') throw new Error('format');
          store = { q: d.q, sessions: d.sessions || [], lessonsSeen: d.lessonsSeen || {} };
          save(); toast('Progression importée ✔'); render();
        } catch (err) { toast('Fichier invalide.'); }
      };
      fr.readAsText(el.files[0]);
    }
    if (el.getAttribute('data-action') === 'toggle-all') {
      el.form.querySelectorAll('input[name=lesson]').forEach(function (c) { c.checked = el.checked; });
    }
    if (el.name === 'lesson') {
      var boxes = el.form.querySelectorAll('input[name=lesson]');
      el.form.querySelector('input[name=all]').checked = Array.prototype.every.call(boxes, function (c) { return c.checked; });
    }
  }

  function onSubmit(e) {
    var f = e.target.closest('form.setup');
    if (!f) return;
    e.preventDefault();
    var s = subj(f.getAttribute('data-subject'));
    var keys = Array.prototype.map.call(f.querySelectorAll('input[name=lesson]:checked'), function (c) { return c.value; });
    if (!keys.length) { toast('Coche au moins une leçon.'); return; }
    var count = +f.querySelector('input[name=count]:checked').value;
    var onlyTests = f.querySelector('input[name=tests]:checked');
    var qs = arrange(s.questions.filter(function (q) { return keys.indexOf(q.lkey) >= 0 && (!onlyTests || q.fixed); }), count);
    var all = keys.length === f.querySelectorAll('input[name=lesson]').length;
    startSession({ mode: 'qcm', title: s.name + (all ? '' : ' (' + keys.length + ' leçon' + (keys.length > 1 ? 's' : '') + ')'), subject: s.id, questions: qs, count: count });
  }

  function onKey(e) {
    if (!session || !/^#\/session/.test(location.hash)) return;
    if (e.target.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
    var ans = session.answers[session.i];
    var k = e.key.toUpperCase();
    if (!ans) {
      var idx = LETTERS.indexOf(k);
      if (idx < 0 && /^[1-6]$/.test(k)) idx = +k - 1;
      if (idx >= 0 && idx < session.perm[session.i].length) { e.preventDefault(); answer(idx); }
    } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault(); next();
    }
  }

  /* ---------- Démarrage ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    main = document.getElementById('main');
    toastEl = document.getElementById('toast');
    load();
    loadSession();
    document.getElementById('side-subjects').innerHTML = REV.subjects.map(function (s) {
      return '<a href="#/matiere/' + s.id + '"><span>' + s.icon + '</span>' + esc(s.name) + '</a>';
    }).join('');
    document.addEventListener('click', onClick);
    document.addEventListener('change', onChange);
    document.addEventListener('submit', onSubmit);
    document.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', render);
    render();
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('sw.js').catch(function () { /* hors ligne indisponible */ });
    }
  });
})();
