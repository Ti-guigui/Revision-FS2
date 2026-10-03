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
  /* Explications : rôle et fonctionnement séparés, et texte découpé en étapes courtes pour être lu facilement */
  var ABBR = /(?:^|\s)(?:p|pp|ex|cf|env|n|art|réf|fig|M|min|max|etc|vol|chap|ind|cm|mm|kg|t)\.$/i;
  function splitSteps(t) {
    if (!t || /<(ul|ol|table|br|p|div|li)\b/i.test(t)) return null;
    var out = [], cur = '';
    for (var i = 0; i < t.length; i++) {
      var ch = t[i]; cur += ch;
      if ((ch === '.' || ch === '!' || ch === '?') && t[i + 1] === ' ' && /[A-ZÀ-ÖØ-Ý0-9«(“"]/.test(t[i + 2] || '') && !ABBR.test(cur.trim())) { out.push(cur.trim()); cur = ''; }
    }
    if (cur.trim()) out.push(cur.trim());
    var res = [];
    out.forEach(function (x) {
      x.split(/\s;\s/).forEach(function (y) {
        y = y.trim(); if (!y) return;
        if ((y.match(/→/g) || []).length >= 2 && y.length > 50) { y.split(/\s*→\s*/).forEach(function (z, k) { if (z) res.push((k ? '→ ' : '') + z); }); }
        else res.push(y);
      });
    });
    res = res.map(function (x) { return /^[a-zà-öø-ÿ]/.test(x) ? x.charAt(0).toUpperCase() + x.slice(1) : x; });
    res = res.map(function (x) { return x.replace(/^(Rôle|Fonctionnement|Attention|Nota|Remarque|Conséquence|Cause|Exemple)\s*:\s*/i, function (m, w) { return '<b>' + w + ' :</b> '; }); });
    return res.length > 1 ? res : null;
  }
  function expHtml(q, icon) {
    var h = '';
    if (q.role) h += '<p><b>🎯 Rôle :</b> ' + q.role + '</p>';
    if (q.fonct) h += '<p><b>⚙️ Fonctionnement :</b></p><ol class="steps exp-fonct">' + q.fonct.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>';
    if (q.e) {
      var st = splitSteps(q.e);
      h += st ? (icon && !h ? '<p class="exp-h">' + icon + ' Explication</p>' : '') + '<ul class="exp-steps">' + st.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>' + (icon && !h ? icon + ' ' : '') + q.e + '</p>';
    }
    return h;
  }
  REV.expHtml = expHtml;

  function prepQuestion(s, q) {
    if (q.a === undefined) q.a = 0; // par défaut, la bonne réponse est écrite en premier (l'ordre est mélangé à l'affichage)
    q.subject = s.id;
    q.lkey = s.id + '/' + q.l;
    q.good = Array.isArray(q.a) ? q.a : [q.a]; // plusieurs bonnes réponses possibles (« 2 rép. »)
    q.multi = q.good.length > 1 && !q.any; // q.any : une seule case à cocher, plusieurs réponses acceptées
    q.id = s.id + ':' + hash(q.q + '|' + q.good.map(function (i) { return q.c[i]; }).join('+'));
    // q.cimg : une image par proposition (symboles A, B, C…), affichée dans la réponse elle-même
    if (q.cimg) q.c = q.c.map(function (t, i) { return q.cimg[i] ? '<img class="c-img" src="img/' + q.cimg[i] + '" alt="' + t + '"><span class="c-cap">' + t + '</span>' : t; });
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

  // Ajoute des leçons de cours à une matière, insérées après une leçon donnée (renumérotation des leçons de cours).
  REV.addLessons = function (id, afterId, lessons) {
    var s = subj(id);
    if (!s) return console.warn('Matière inconnue', id);
    var at = s.lessons.findIndex(function (l) { return l.id === afterId; });
    lessons.forEach(function (l) { prepLesson(s, l, ''); });
    Array.prototype.splice.apply(s.lessons, [at < 0 ? s.lessons.length : at + 1, 0].concat(lessons));
    s.lessons.filter(function (l) { return !l.exo; }).forEach(function (l, i) { l.num = String(i + 1).padStart(2, '0'); });
  };

  // Complète une leçon de cours existante (schémas du livre, paragraphes, points à retenir).
  REV.extendLesson = function (key, x) {
    var l = REV.lessonById[key];
    if (!l) return console.warn('Leçon inconnue', key);
    if (x.images) l.images = (l.images || []).concat(x.images);
    if (x.html) l.html += x.html;
    if (x.retenir) l.retenir = (l.retenir || []).concat(x.retenir);
    if (x.pieges) l.pieges = (l.pieges || []).concat(x.pieges);
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
  /* Schéma de référence (« votre schéma ») affiché au-dessus de la question pour comparer. */
  function ctxImg(q) {
    return q.ctx ? '<figure class="q-img q-ctx"><figcaption>🗺️ Votre schéma (touche pour agrandir)</figcaption><a href="img/' + q.ctx + '" target="_blank" rel="noopener"><img src="img/' + q.ctx + '" alt="Schéma de référence"></a></figure>' : '';
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
  // Un exercice = les questions d'une même leçon d'exercice ; dans un cahier, celles d'un même « Ex N ».
  function exoGroup(q) { var m = /^Ex (\d+)/.exec(q.q); return q.lkey + (m ? '#' + m[1] : ''); }
  // Dans un QCM mélangé, les questions d'un même exercice restent groupées et dans l'ordre du sujet.
  // complete : on reprend l'exercice en entier (aucune question sautée) ; sinon seulement celles tirées.
  function regroupExo(qs, complete) {
    var out = [], done = {};
    qs.forEach(function (q) {
      if (!isExoQ(q)) { out.push(q); return; }
      var g = exoGroup(q);
      if (done[g]) return;
      done[g] = 1;
      var list = subj(q.subject).questions;
      var full = list.filter(function (o) { return isExoQ(o) && exoGroup(o) === g; });
      // exercice court (≤ 12 questions) : repris en entier ; long (ex. 34 repères d’un schéma) : seulement les questions tirées
      (complete && full.length <= 12 ? full : qs.filter(function (o) { return isExoQ(o) && exoGroup(o) === g; }))
        .sort(function (x, y) { return list.indexOf(x) - list.indexOf(y); })
        .forEach(function (o) { out.push(o); });
    });
    return out;
  }
  // QCM (hors épreuve UV2) : questions précédentes de la session, avec ta réponse et la bonne réponse.
  // Pour un exercice : seulement celles du même exercice (ouvert) ; sinon toutes (replié).
  function sessionPrevBox(q) {
    if (!session) return '';
    var exo = isExoQ(q), items = [];
    for (var j = 0; j < session.i; j++) {
      var o = REV.qById[session.qids[j]], a = session.answers[j];
      if (!o || (exo && (!isExoQ(o) || exoGroup(o) !== exoGroup(q)))) continue;
      var mine = !a ? '⚪ pas de réponse' : a.chosen === -1 ? '⏱️ temps écoulé' :
        (a.ok ? '✅ ' : '❌ ') + [].concat(a.chosen).map(function (g) { return o.c[g]; }).join(' / ');
      items.push('<li><span class="qp-q">' + o.q + '</span><br>' + mine +
        (a && a.ok ? '' : '<br>✔️ Bonne réponse : <b>' + o.good.map(function (g) { return o.c[g]; }).join(' / ') + '</b>') + '</li>');
    }
    if (!items.length) return '';
    return '<details class="q-prev"' + (exo ? ' open' : '') + '><summary>📝 ' + (exo ? 'Questions précédentes de l’exercice' : 'Réponses précédentes') + ' (' + items.length + ')</summary><ol>' + items.join('') + '</ol></details>';
  }
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
    var qs = regroupExo(opts.questions.slice(0, opts.count || opts.questions.length), opts.mode !== 'revision');
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

  // Onglet(s) à allumer pour chaque route : barre du bas (home, cours, qcm = S’entraîner, resultats, plus) et barre latérale
  function setActiveNav(route, parts) {
    var map = { '': ['home'], cours: ['cours'], matiere: ['cours'], lecon: ['cours'], verif: ['cours'],
      memos: ['memos', 'plus'], fiche: ['plus'], fiches: ['plus'], formules: ['formules', 'plus'], 'a-revoir': ['a-revoir', 'plus'], exercices: ['exercices', 'plus'], plus: ['plus'],
      qcm: ['qcm'], uv2: ['qcm'], session: ['qcm'], bilan: ['qcm'], quiz: ['quiz', 'qcm'], revision: ['revision', 'qcm'], resultats: ['resultats'], recherche: [] };
    var keys = map[route] || ['home'];
    if ((route === 'session' || route === 'bilan') && session && session.mode === 'quiz') keys = ['quiz', 'qcm'];
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('active', keys.indexOf(a.getAttribute('data-nav')) >= 0);
    });
    var sid = /^(matiere|qcm|memos|fiche|formules)$/.test(route) ? parts[1] : route === 'lecon' ? parts[1] : null;
    document.querySelectorAll('#side-subjects a').forEach(function (a) { a.classList.toggle('active', !!sid && a.getAttribute('href') === '#/matiere/' + sid); });
  }

  function render() {
    clearInterval(timerId);
    var parts = location.hash.replace(/^#\/?/, '').replace(/#.*$/, '').split('/').map(decodeURIComponent);
    var route = parts[0] || '';
    setActiveNav(route, parts);
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
      case 'fiches': html = viewFiches(); break;
      case 'fiche': html = viewFiche(parts[1]); break;
      case 'verif': html = viewVerif(); break;
      case 'exercices': html = viewExercices(parts[1]); break;
      case 'uv2': html = parts[1] === 'fiche' ? viewUV2Fiche(parts[2]) : viewUV2(); break;
      case 'a-revoir': html = viewARevoir(); break;
      case 'formules': html = viewFormules(parts[1]); break;
      case 'recherche': html = viewRecherche(parts.slice(1).join('/')); break;
      case 'plus': html = viewPlus(); break;
      default: html = viewHome();
    }
    main.innerHTML = html;
    setDecor(route, parts);
    if (route !== 'session') window.scrollTo(0, 0);
    if (route === 'lecon') setTimeout(scrollToPart, 30);
    var si = document.querySelector('form.top-search input');
    if (si && route !== 'recherche' && document.activeElement !== si) si.value = '';
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
  function shownLessons(s) { return s.lessons.filter(function (l) { return !l.hidden; }); }
  function totalLessons() { return REV.subjects.reduce(function (n, s) { return n + shownLessons(s).length; }, 0); }
  function allQuestions() { return REV.subjects.reduce(function (a, s) { return a.concat(s.questions); }, []); }

  // Raccourcis vers les outils : accueil (grille compacte) et page « Plus » (liste)
  var TOOLS = [['#/a-revoir', '📌', 'Leçons à revoir'], ['#/formules', '📐', 'Formules et conversions'], ['#/exercices', '✍️', 'Exercices corrigés'],
    ['#/fiches', '📄', 'Fiches de révision'], ['#/memos', '💡', 'Aides-mémoires'], ['#/uv2', '📝', 'Test UV2'], ['#/fiche/uv2', '🎯', 'Fiche spéciale UV2'],
    ['mdf.html', '🏗️', 'Calcul manœuvre de force'], ['diagnostic.html', '🔧', 'Coin diagnostic']];

  // Bloc « Aujourd’hui » : ce qu’il y a de plus utile à faire maintenant (session en cours, lecture, erreurs, matière faible)
  function todayHtml(all) {
    var items = [];
    if (session && session.answers.length < session.qids.length) {
      items.push('<a class="today-main" href="#/session">▶️ <span><b>Reprendre le QCM</b><small>' + esc(session.title) + ' — question ' +
        Math.min(session.answers.length + 1, session.qids.length) + ' / ' + session.qids.length + '</small></span><span class="chev">›</span></a>');
    }
    var lastKey = null, lastT = 0;
    Object.keys(store.lessonsSeen || {}).forEach(function (k) { if (REV.lessonById[k] && store.lessonsSeen[k] > lastT) { lastT = store.lessonsSeen[k]; lastKey = k; } });
    if (lastKey) {
      var l = REV.lessonById[lastKey], ls = subj(l.subject);
      var group = ls.lessons.filter(function (x) { return !!x.exo === !!l.exo && !!x.hidden === !!l.hidden; });
      var nxt = group.slice(group.indexOf(l) + 1).filter(function (x) { return !store.lessonsSeen[x.key]; })[0];
      items.push('<a class="today-item" href="#/lecon/' + lastKey + '">📖 <span><b>Continuer la lecture</b><small>' + ls.icon + ' ' + l.num + ' — ' + esc(l.title) + '</small></span><span class="chev">›</span></a>');
      if (nxt) items.push('<a class="today-item" href="#/lecon/' + nxt.key + '">⏭️ <span><b>Leçon suivante non lue</b><small>' + nxt.num + ' — ' + esc(nxt.title) + '</small></span><span class="chev">›</span></a>');
    }
    var toReview = all.filter(needsReview).length;
    if (toReview) items.push('<a class="today-item" href="#/revision">🔁 <span><b>Refaire mes ' + toReview + ' erreur' + (toReview > 1 ? 's' : '') + '</b><small>Elles reviennent jusqu’à 2 réussites de suite</small></span><span class="chev">›</span></a>');
    var weak = REV.subjects.map(function (x) { return { s: x, sc: scoreOf(x.questions) }; })
      .filter(function (o) { return o.sc.pct !== null && o.sc.seen >= 5 && o.sc.pct < 80; })
      .sort(function (p, q) { return p.sc.pct - q.sc.pct; })[0];
    if (weak) items.push('<a class="today-item" href="#/qcm/' + weak.s.id + '">🎯 <span><b>Renforcer ' + esc(weak.s.name) + '</b><small>Ta matière la plus faible : ' + weak.sc.pct + ' %</small></span><span class="chev">›</span></a>');
    if (!items.length) {
      var first = REV.subjects[0];
      return '<section class="today"><h2 class="today-h">👋 Bienvenue</h2><ol class="today-steps">' +
        '<li><b>Lis une leçon</b> dans une matière.</li><li><b>Fais son QCM</b> : correction et explication à chaque question.</li>' +
        '<li><b>Tes erreurs reviennent</b> dans « Mes erreurs » jusqu’à ce que tu les maîtrises.</li></ol>' +
        '<a class="btn primary big" href="#/matiere/' + first.id + '">' + first.icon + ' Commencer par ' + esc(first.name) + '</a></section>';
    }
    return '<section class="today"><h2 class="today-h">' + calIcon() + '<span>Aujourd’hui<small>' + esc(new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })) + '</small></span></h2>' + items.slice(0, 4).join('') + '</section>';
  }

  // Petit calendrier avec la date du jour (mois abrégé + jour)
  function calIcon() {
    var d = new Date();
    return '<span class="cal-ic" aria-hidden="true"><span class="cal-m">' + d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase() + '</span><span class="cal-d">' + d.getDate() + '</span></span>';
  }

  function viewHome() {
    var all = allQuestions();
    var sc = scoreOf(all);
    return '' +
      todayHtml(all) +
      '<section class="atelier">' +
        '<div class="atelier-wall">' +
          '<div class="atelier-plaque"><span class="rivet"></span><span class="rivet"></span><span class="rivet"></span><span class="rivet"></span>' +
            '<small>ATELIER DE MAINTENANCE · FS2 / MOBTER</small><strong>RÉVISIONS 2026</strong></div>' +
          '<p class="atelier-sub">Bienvenue à l’atelier : choisis ton poste de travail.</p>' +
        '</div>' +
        '<div class="atelier-outils" aria-hidden="true"></div>' +
        '<div class="servante" role="navigation" aria-label="Accès rapide">' +
          tile('#/cours', '📖', 'COURS', totalLessons() + ' leçons') +
          tile('#/qcm', '🎯', 'S’ENTRAÎNER', 'QCM, quiz, examen') +
          tile('#/quiz', '⚡', 'QUIZ', 'éclair chronométré') +
          tile('#/resultats', '📊', 'MES RÉSULTATS', sc.pct === null ? 'pas encore de score' : 'niveau global ' + sc.pct + ' %') +
        '</div>' +
        '<div class="hazard" aria-hidden="true"></div>' +
      '</section>' +
      '<h2 class="h2 h2-atelier">🧰 Les postes de l’atelier</h2>' +
      '<div class="subject-grid">' + REV.subjects.map(subjectCard).join('') + '</div>' +
      '<h2 class="h2">🧭 Outils</h2>' +
      '<div class="tool-grid">' + TOOLS.map(function (t) { return '<a class="card tool" href="' + t[0] + '"><span>' + t[1] + '</span>' + t[2] + '</a>'; }).join('') + '</div>' +
      '<p class="muted small center">' + totalQuestions() + ' questions · ' + totalLessons() +
        ' leçons · ' + REV.subjects.length + ' matières — progression enregistrée sur cet appareil, sans compte.</p>';
  }

  // Page « Plus » (onglet du bas sur téléphone) : tous les outils et pages annexes
  function viewPlus() {
    var toReview = allQuestions().filter(needsReview).length;
    return '<h1 class="h1">☰ Plus</h1><p class="muted">Tous les outils de révision et les pages annexes.</p>' +
      '<ul class="nav-list">' + TOOLS.concat([['#/verif', '✅', 'Vérification des corrigés']]).map(function (t) {
        return '<li><a href="' + t[0] + '"><span class="nl-ic">' + t[1] + '</span><span>' + t[2] +
          (t[0] === '#/a-revoir' && toReview ? ' <span class="badge-n">' + toReview + '</span>' : '') + '</span><span class="chev">›</span></a></li>';
      }).join('') + '</ul>';
  }
  function tile(href, icon, label, sub) {
    return '<a class="tile" href="' + href + '"><span class="tile-ic">' + icon + '</span><span class="tile-l">' +
      label + '</span><span class="tile-s">' + esc(sub) + '</span><span class="tile-handle" aria-hidden="true"></span></a>';
  }
  function subjectCard(s) {
    var sc = scoreOf(s.questions), lv = level(sc.pct);
    return '<a class="card subj" href="#/matiere/' + s.id + '" style="--c:' + s.color + ';--deco:' + decoUrl(s.id).replace(/"/g, '&quot;') + '">' +
      '<span class="subj-ic">' + s.icon + '</span>' +
      '<span class="subj-body"><b>' + esc(s.name) + '</b><span class="muted small">' + shownLessons(s).length +
      ' leçons · ' + s.questions.length + ' questions</span>' + bar(sc.pct) + '</span>' +
      '<span class="subj-score ' + lv.cls + '">' + (sc.pct === null ? '<span class="untested">Non testé</span>' : sc.pct + ' %') + '</span></a>';
  }

  function viewCours() {
    return '<h1 class="h1">📖 Cours</h1><p class="muted">Choisis une matière, puis une leçon : explication, schémas, à retenir, pièges et aide-mémoire.</p>' +
      '<div class="subject-grid">' + REV.subjects.map(subjectCard).join('') + '</div>' +
      '<a class="card review-cta exo-cta" href="#/exercices"><span class="big">✍️</span><span><b>Tous les exercices corrigés</b><br>Toutes matières, avec schéma et correction</span><span class="chev">›</span></a>' +
      '<div class="home-foot"><a class="card mini" href="#/fiche/uv2">🎯 Fiche spéciale UV2</a>' +
      '<a class="card mini" href="#/fiches">📄 Fiches de révision complètes</a>' +
      '<a class="card mini" href="#/memos">🧠 Tous les aides-mémoires</a>' + '<a class="card mini" href="#/verif">✅ Vérification des corrigés</a>' + '</div>';
  }

  function viewMatiere(id, tab) {
    var s = subj(id);
    if (!s) return viewCours();
    var sc = scoreOf(s.questions);
    var exos = s.lessons.filter(function (l) { return l.exo; });
    var showExos = tab === 'exercices' && exos.length;
    var shown = shownLessons(s).filter(function (l) { return !!l.exo === !!showExos; });
    return crumbs([['#/cours', 'Cours'], [null, s.name]]) +
      '<header class="subj-head" style="--c:' + s.color + '"><span class="subj-ic xl">' + s.icon + '</span><div><h1 class="h1">' +
        esc(s.name) + '</h1><p class="muted">' + esc(s.desc || '') + '</p></div></header>' +
      '<div class="row-actions subj-actions">' +
        '<a class="btn primary" href="#/qcm/' + s.id + '">🧠 QCM ' + esc(s.name) + '</a>' +
        '<a class="btn" href="#/fiche/' + s.id + '">📄 Fiche de révision</a>' +
        '<a class="btn" href="#/memos/' + s.id + '">💡 Aides-mémoires</a>' +
        (REV.formulaires && REV.formulaires[s.id] ? '<a class="btn" href="#/formules/' + s.id + '">📐 Formules et conversions</a>' : '') +
        (sc.pct !== null ? '<span class="pill ' + level(sc.pct).cls + '">' + level(sc.pct).dot + ' ' + sc.pct + ' %</span>' : '') +
      '</div>' +
      (exos.length ? '<nav class="tabs seg-tabs">' +
        '<a href="#/matiere/' + s.id + '"' + (showExos ? '' : ' class="on"') + '>📖 Leçons (' + (shownLessons(s).length - exos.length) + ')</a>' +
        '<a href="#/matiere/' + s.id + '/exercices"' + (showExos ? ' class="on"' : '') + '>📝 Exercices corrigés (' + exos.length + ')</a></nav>' : '') +
      (showExos ? '<p class="muted small">Chaque exercice se travaille seul : ouvre-le pour le schéma et la correction détaillée, ou lance directement son QCM.</p>' : '') +
      (showExos ? '<div class="exo-grid">' + shown.map(function (l) { return exoCard(l, s); }).join('') + '</div>' : '<ol class="lesson-list">' + shown.map(function (l) {
        var lq = lessonQuestions(l.key), ls = scoreOf(lq), lv = level(ls.pct);
        return '<li><a href="#/lecon/' + l.key + '"><span class="num">' + l.num + '</span><span class="lt">' + esc(l.title) +
          '<span class="muted small">' + lq.length + ' questions' + (store.lessonsSeen[l.key] ? ' · ✔ lue' : '') + '</span></span>' +
          '<span class="lscore ' + lv.cls + '">' + (ls.pct === null ? '' : ls.pct + ' % ' + lv.dot) + '</span></a>' +
          (l.exo && lq.length ? '<div class="exo-actions"><a class="btn" href="#/lecon/' + l.key + '">📖 Schéma + corrigé</a>' +
            '<button class="btn primary" data-action="lesson-qcm" data-key="' + l.key + '">🧠 S’entraîner (' + lq.length + ')</button></div>' : '') +
          '</li>';
      }).join('') + '</ol>');
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

  // Recherche globale : matières, leçons (partie par partie), à retenir, schémas, questions, formules, fiches,
  // Coin diagnostic (index js/search-diag.js) et calcul MDF. Texte normalisé caractère par caractère (même longueur)
  // pour retrouver la position exacte du mot dans l'extrait.
  var searchIdx = null;
  function fold(s) {
    return String(s || '').replace(/[\s\S]/g, function (c) {
      var d = c.toLowerCase().normalize('NFD').charAt(0);
      return /[a-z0-9]/.test(d) ? d : ' ';
    });
  }
  function plain(h) {
    return String(h || '').replace(/<(br|\/p|\/li|\/tr|\/td|\/th|\/h\d)[^>]*>/gi, ' · ').replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, '’').replace(/&quot;/g, '"')
      .replace(/(\s*·\s*)+/g, ' · ').replace(/\s+/g, ' ').replace(/^ · | · $/g, '').trim();
  }
  function buildSearch() {
    var idx = [];
    function add(href, ico, t, c, x, w) { t = plain(t); x = plain(x); idx.push({ h: href, i: ico, t: t, c: c, x: x, w: w, nt: fold(t), nx: fold(x) }); }
    [['#/cours', '📚', 'Cours', 'Toutes les matières'], ['#/exercices', '📝', 'Exercices corrigés', ''], ['#/qcm', '🎯', 'S’entraîner (QCM)', 'QCM par matière, quiz, mes erreurs, examen blanc'], ['#/plus', '☰', 'Plus', 'Tous les outils'],
      ['#/quiz', '⚡', 'Quiz', 'Questions au hasard'], ['#/resultats', '📊', 'Résultats', 'Scores et progression'], ['#/a-revoir', '🔁', 'À revoir', 'Questions ratées'],
      ['#/formules', '📐', 'Formules, valeurs et conversions', 'Formulaire'], ['#/fiches', '📄', 'Fiches de révision', 'Imprimables'], ['#/uv2', '🎯', 'UV2', 'Dossier d’évaluation'],
      ['diagnostic.html', '🔧', 'Coin diagnostic', 'Diagnostic guidé, capteurs, actionneurs, marques, véhicules'],
      ['mdf.html', '🏗️', 'Calcul manœuvre de force', 'MDF : mouflage, ancrage, effort, poulies, manilles, élingues, Holmes, pente, sol']
    ].forEach(function (p) { add(p[0], p[1], p[2], 'Page', p[3], 6); });
    REV.subjects.forEach(function (s) {
      add('#/matiere/' + s.id, s.icon, s.name, 'Matière', s.desc || '', 5);
      s.lessons.forEach(function (l) {
        if (l.hidden && !/^sym/.test(l.id)) return;
        var where = s.name + (l.exo ? ' › Exercices' : '');
        var parts = String(l.html || '').split(/<h3[^>]*>/i);
        add('#/lecon/' + l.key, s.icon, l.num + ' — ' + l.title, where, parts[0] + ' ' + (l.retenir || []).join(' · ') + ' ' + (l.pieges || []).join(' · '), 4);
        parts.slice(1).forEach(function (p, n) {
          var k = p.search(/<\/h3>/i);
          add('#/lecon/' + l.key + '#p-' + (n + 1), '§', k > 0 ? p.slice(0, k) : l.title, where + ' › ' + l.title, k > 0 ? p.slice(k) : p, 3);
        });
        (l.images || []).forEach(function (im) { add('#/lecon/' + l.key + '#schemas', '🖼️', im.cap, where + ' › ' + l.title, '', 2); });
      });
    });
    var F = REV.formulaires || {};
    Object.keys(F).forEach(function (id) { var s = subj(id); (F[id] || []).forEach(function (b) { add('#/formules/' + id, '📐', b.t, 'Formules › ' + (s ? s.name : id), b.html, 3); }); });
    Object.keys(REV.fiches || {}).forEach(function (id) { var s = subj(id); add('#/fiche/' + id, '📄', 'Fiche de révision — ' + (s ? s.name : id.toUpperCase()), 'Fiches', REV.fiches[id].html, 2); });
    Object.keys(REV.qById).forEach(function (id) {
      var q = REV.qById[id], l = REV.lessonById[q.lkey];
      if (!l || (l.hidden && !/^sym/.test(l.id))) return;
      var good = (q.good || []).map(function (i) { return q.c[i]; }).join(' · ');
      add('#/lecon/' + q.lkey, '❓', q.q, 'Question › ' + subj(l.subject).name + ' › ' + l.title, 'Réponse : ' + good + ' · ' + (q.e || ''), 1);
    });
    (window.SEARCH_DIAG || []).forEach(function (e) { add('diagnostic.html#/' + e[0], '🔧', e[1], e[2], e[3], 3); });
    return idx;
  }
  function searchFind(query, max) {
    if (!searchIdx) searchIdx = buildSearch();
    var nq = fold(query).replace(/\s+/g, ' ').trim();
    if (!nq) return [];
    var toks = nq.split(' ').filter(function (t, i, a) { return a.indexOf(t) === i; });
    var res = [];
    searchIdx.forEach(function (e) {
      var sc = e.w * 4, all = ' ' + e.nt + ' ' + e.nx + ' ';
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (all.indexOf(t) < 0) return;
        if ((' ' + e.nt + ' ').indexOf(' ' + t + ' ') >= 0) sc += 30;
        else if ((' ' + e.nt).indexOf(' ' + t) >= 0) sc += 20;
        else if (e.nt.indexOf(t) >= 0) sc += 10;
        else if ((' ' + e.nx).indexOf(' ' + t) >= 0) sc += 3;
      }
      if (e.nt.indexOf(nq) >= 0) sc += 40 + (e.nt.trim() === nq ? 40 : 0);
      else if (toks.length > 1 && e.nx.indexOf(nq) >= 0) sc += 15;
      res.push({ e: e, s: (sc - e.w * 4) * (e.w === 1 ? 0.5 : 1) + e.w * 12 - Math.min(e.t.length, 120) / 30 }); // les questions passent après les parties de cours
    });
    res.sort(function (a, b) { return b.s - a.s; });
    return max ? res.slice(0, max) : res;
  }
  // Met en gras les mots cherchés ; texte long → extrait centré sur le premier mot trouvé
  function searchMark(text, nt, toks, len) {
    var start = 0;
    if (len && text.length > len) {
      var p = -1;
      toks.forEach(function (t) { var k = nt.indexOf(t); if (k >= 0 && (p < 0 || k < p)) p = k; });
      start = Math.max(0, p - Math.round(len / 3));
      if (start) { var sp = text.indexOf(' ', start); if (sp > 0 && sp - start < 15) start = sp + 1; }
      text = text.slice(start, start + len); nt = nt.slice(start, start + len);
    }
    var on = new Array(text.length + 1).join('0').split('');
    toks.forEach(function (t) { if (!t) return; var k = nt.indexOf(t); while (k >= 0) { for (var j = k; j < k + t.length; j++) on[j] = '1'; k = nt.indexOf(t, k + t.length); } });
    var out = '', open = false;
    for (var i = 0; i < text.length; i++) {
      if (on[i] === '1' && !open) { out += '<mark>'; open = true; }
      if (on[i] !== '1' && open) { out += '</mark>'; open = false; }
      out += esc(text.charAt(i));
    }
    if (open) out += '</mark>';
    return (start ? '… ' : '') + out + (len && text.length >= len ? ' …' : '');
  }
  function searchToks(query) { return fold(query).replace(/\s+/g, ' ').trim().split(' ').filter(Boolean); }
  function searchItem(r, toks, full) {
    var e = r.e;
    return '<a class="search-res" href="' + esc(e.h) + '"><span class="sr-ic">' + e.i + '</span><span class="sr-body"><b>' + searchMark(e.t, e.nt, toks, full ? 0 : 90) + '</b>' +
      '<span class="sr-ctx">' + esc(e.c) + '</span>' + (full && e.x ? '<span class="sr-x">' + searchMark(e.x, e.nx, toks, 180) + '</span>' : '') + '</span></a>';
  }
  function viewRecherche(query) {
    query = query || '';
    var res = query ? searchFind(query) : [], toks = searchToks(query);
    var groups = [['Pages et matières', function (e) { return e.w >= 5; }], ['Cours', function (e) { return e.w >= 2 && e.w <= 4 && e.h.charAt(0) === '#'; }],
      ['Coin diagnostic', function (e) { return /^diagnostic/.test(e.h) && e.w < 5; }], ['Questions', function (e) { return e.w === 1; }]];
    var html = '<h1 class="h1">🔎 Recherche</h1>' +
      '<form class="search-page" role="search" data-search-page><input type="search" name="q" value="' + esc(query) + '" placeholder="Un mot, un élément, une valeur… (ex. : RSQ 240, thermostat, 60 Ω)" autocomplete="off" aria-label="Rechercher"><button class="btn primary">Rechercher</button></form>';
    if (!query) return html + '<p class="muted">Tape un mot : le nom d’un élément, d’un capteur, d’une leçon, une valeur… Les résultats t’envoient directement sur la bonne partie.</p>';
    if (!res.length) return html + '<p class="muted">Aucun résultat pour « ' + esc(query) + ' ». Essaie un autre mot ou une orthographe plus courte.</p>';
    html += '<p class="muted">' + res.length + ' résultat' + (res.length > 1 ? 's' : '') + ' pour « ' + esc(query) + ' ».</p>';
    groups.map(function (g) { return [g[0], res.filter(function (r) { return g[1](r.e); })]; })
      .filter(function (g) { return g[1].length; })
      .sort(function (a, b) { return b[1][0].s - a[1][0].s; }) // la catégorie qui contient le meilleur résultat d'abord
      .forEach(function (g) {
      var list = g[1];
      var shown = list.slice(0, 60);
      html += '<h2 class="h2">' + g[0] + ' <span class="muted small">(' + list.length + ')</span></h2><div class="search-list">' +
        shown.map(function (r) { return searchItem(r, toks, true); }).join('') + '</div>' +
        (list.length > shown.length ? '<p class="muted small">… et ' + (list.length - shown.length) + ' autres : précise ta recherche.</p>' : '');
    });
    return html;
  }
  // Barre du haut : propositions en direct (flèches + Entrée), Entrée sans choix → page de résultats
  function initSearchBar() {
    var form = document.querySelector('form.top-search');
    if (!form) return;
    var input = form.querySelector('input'), pop = form.querySelector('.search-pop'), sel = -1, items = [];
    function close() { pop.hidden = true; sel = -1; input.setAttribute('aria-expanded', 'false'); }
    function show() {
      var q = input.value.trim();
      if (q.length < 2) { close(); return; }
      var res = searchFind(q, 8), toks = searchToks(q);
      pop.innerHTML = (res.length ? res.map(function (r) { return searchItem(r, toks, false); }).join('') : '<p class="sr-none">Aucun résultat</p>') +
        '<a class="search-all" href="#/recherche/' + encodeURIComponent(q) + '">Voir tous les résultats ›</a>';
      items = pop.querySelectorAll('a'); sel = -1; pop.hidden = false; input.setAttribute('aria-expanded', 'true');
    }
    function hilite() { Array.prototype.forEach.call(items, function (a, i) { a.classList.toggle('on', i === sel); }); if (items[sel]) items[sel].scrollIntoView({ block: 'nearest' }); }
    var t;
    input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(show, 120); });
    input.addEventListener('focus', function () { if (input.value.trim().length >= 2) show(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && !pop.hidden) { sel = Math.min(items.length - 1, sel + 1); hilite(); e.preventDefault(); }
      else if (e.key === 'ArrowUp' && !pop.hidden) { sel = Math.max(-1, sel - 1); hilite(); e.preventDefault(); }
      else if (e.key === 'Escape') { close(); input.blur(); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      var href = items[sel] ? items[sel].getAttribute('href') : '#/recherche/' + encodeURIComponent(q);
      close(); input.blur();
      if (href.charAt(0) === '#') location.hash = href; else location.href = href;
    });
    pop.addEventListener('click', function (e) { if (e.target.closest('a')) { close(); input.blur(); } });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) close(); });
    document.addEventListener('submit', function (e) {
      var f = e.target.closest('form[data-search-page]'); if (!f) return;
      e.preventDefault(); var q = f.querySelector('input').value.trim(); if (q) location.hash = '#/recherche/' + encodeURIComponent(q);
    });
  }
  // Après navigation vers une partie de leçon (#p-3) ou les schémas : on y va et on la fait clignoter
  function scrollToPart() {
    var m = location.hash.match(/#\/[^#]*#([\w-]+)$/);
    if (!m) return;
    var el = document.getElementById(m[1]);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.classList.remove('flash-part'); void el.offsetWidth; el.classList.add('flash-part');
  }

  // Sommaire repliable d’une leçon : ses parties (titres h3, ancres p-1, p-2…) et ses schémas
  function tocHtml(l, key) {
    var t = [], re = /<h3[^>]*>([\s\S]*?)<\/h3>/gi, m;
    while ((m = re.exec(l.html))) t.push(m[1].replace(/<[^>]+>/g, '').trim());
    var ni = (l.images || []).length;
    if (t.length < 3 && !(t.length && ni > 2)) return '';
    return '<details class="toc"><summary>📑 Sommaire <span class="muted small">(' + t.length + ' parties' + (ni ? ' · ' + ni + ' schéma' + (ni > 1 ? 's' : '') : '') + ')</span></summary><ol>' +
      t.map(function (x, i) { return '<li><a href="#/lecon/' + key + '#p-' + (i + 1) + '">' + esc(x) + '</a></li>'; }).join('') +
      (ni ? '<li class="toc-sch"><a href="#/lecon/' + key + '#schemas">🖼️ Schémas</a></li>' : '') + '</ol></details>';
  }

  function viewLecon(key) {
    var l = REV.lessonById[key];
    if (!l) return viewCours();
    var s = subj(l.subject);
    store.lessonsSeen[key] = Date.now(); save();
    var group = s.lessons.filter(function (x) { return !!x.exo === !!l.exo && !!x.hidden === !!l.hidden; }); // les exercices ne s'enchaînent qu'entre eux
    var idx = group.indexOf(l);
    var prev = group[idx - 1], next = group[idx + 1];
    var qn = lessonQuestions(key).length;
    var ls = scoreOf(lessonQuestions(key));
    var readN = group.filter(function (x) { return store.lessonsSeen[x.key]; }).length;
    return crumbs([['#/cours', 'Cours'], ['#/matiere/' + s.id, s.name]].concat(l.exo ? [['#/matiere/' + s.id + '/exercices', 'Exercices corrigés']] : []).concat([[null, l.num + ' — ' + l.title]])) +
      '<article class="lesson" style="--c:' + s.color + '">' +
      '<h1 class="h1"><span class="num">' + l.num + '</span> ' + esc(l.title) + '</h1>' +
      (group.length > 1 ? '<p class="lesson-pos muted small">' + (l.exo ? 'Exercice ' : 'Leçon ') + (idx + 1) + ' / ' + group.length + ' · ✔ ' + readN + ' lue' + (readN > 1 ? 's' : '') + ' dans ' + esc(s.name) + '</p>' : '') +
      (ls.pct !== null ? '<p><span class="pill ' + level(ls.pct).cls + '">' + level(ls.pct).dot + ' Ton score : ' + ls.pct + ' %</span></p>' : '') +
      tocHtml(l, key) +
      '<div class="lesson-body">' + (function (n) { return l.html.replace(/<h3(?=[\s>])/gi, function () { return '<h3 id="p-' + (++n) + '"'; }); })(0) + '</div>' +
      (l.images ? '<span id="schemas"></span>' + l.images.map(function (im) {
        return '<figure><a href="img/' + im.src + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + im.src + '" alt="' + esc(im.cap) + '"></a><figcaption>🖼️ ' + esc(im.cap) + ' <span class="muted">(toucher pour agrandir)</span></figcaption></figure>';
      }).join('') : '') +
      (l.retenir ? '<div class="box retenir"><b>★ À retenir</b><ul>' + l.retenir.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
      (l.pieges ? '<div class="box piege"><b>⚠️ Pièges</b><ul>' + l.pieges.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
      '<h2 class="h2">🧠 Aide-mémoire</h2>' + memoHtml(l, s, false) +
      '</article>' +
      '<div class="row-actions sticky-actions">' +
        (qn ? '<button class="btn primary" data-action="lesson-qcm" data-key="' + key + '">🧠 <span class="lbl-long">QCM sur cette leçon</span><span class="lbl-short">QCM</span> (' + qn + ')</button>' : '') +
        (next ? '<a class="btn next-mobile" href="#/lecon/' + next.key + '">Suivante ›</a>' : '') +
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
    return '<h1 class="h1">🎯 S’entraîner</h1>' +
      '<div class="train-grid">' +
        '<a class="card train" href="#/quiz"><span class="big">⚡</span><b>Quiz éclair</b><span class="muted small">10 questions, toutes matières</span></a>' +
        '<a class="card train' + (toReview ? ' hot' : '') + '" href="#/revision"><span class="big">🔁</span><b>Mes erreurs</b><span class="muted small">' + (toReview ? toReview + ' question' + (toReview > 1 ? 's' : '') + ' à refaire' : 'Aucune pour l’instant') + '</span></a>' +
        '<button class="card train" data-action="exam"><span class="big">🎓</span><b>Examen blanc</b><span class="muted small">40 questions toutes matières</span></button>' +
        '<a class="card train" href="#/uv2"><span class="big">📝</span><b>Test UV2</b><span class="muted small">60 questions, 2 h</span></a>' +
      '</div>' +
      '<h2 class="h2">🧠 QCM par matière</h2><p class="muted">Correction immédiate et explication après chaque question.</p>' +
      '<div class="subject-grid">' + REV.subjects.map(function (s) {
        var sc = scoreOf(s.questions), lv = level(sc.pct);
        return '<a class="card subj" href="#/qcm/' + s.id + '" style="--c:' + s.color + '"><span class="subj-ic">' + s.icon +
          '</span><span class="subj-body"><b>' + esc(s.name) + '</b><span class="muted small">' + s.questions.length + ' questions</span>' + bar(sc.pct) +
          '</span><span class="subj-score ' + lv.cls + '">' + (sc.pct === null ? '<span class="untested">Non testé</span>' : sc.pct + ' %') + '</span></a>';
      }).join('') + '</div>';
  }

  function viewQcmSetup(id) {
    var s = subj(id);
    if (!s) return viewQcmChoice();
    var n = s.questions.length;
    var counts = [10, 20].filter(function (c) { return c < n; });
    return crumbs([['#/qcm', 'S’entraîner'], [null, s.name]]) +
      '<header class="subj-head" style="--c:' + s.color + '"><span class="subj-ic xl">' + s.icon + '</span><div><h1 class="h1">' + esc(s.name) + ' → QCM</h1>' +
      '<p class="muted">' + n + ' questions disponibles</p></div></header>' +
      '<form class="setup" data-subject="' + s.id + '">' +
        '<fieldset><legend>Nombre de questions</legend><div class="seg">' +
          counts.map(function (c, i) { return '<label><input type="radio" name="count" value="' + c + '"' + (i === counts.length - 1 ? ' checked' : '') + '><span>' + c + '</span></label>'; }).join('') +
          '<label><input type="radio" name="count" value="' + n + '"' + (counts.length ? '' : ' checked') + '><span>Toutes (' + n + ')</span></label>' +
        '</div></fieldset>' +
        '<button class="btn primary big" type="submit">▶️ Commencer</button>' +
        '<details class="setup-more"><summary>⚙️ Choisir les leçons' + (s.questions.some(function (q) { return q.fixed; }) ? ' et le type de questions' : '') + ' <span class="muted small">(toutes par défaut)</span></summary>' +
        '<fieldset><legend>Leçons</legend><label class="chk"><input type="checkbox" name="all" checked data-action="toggle-all"> <b>Toutes les leçons</b></label>' +
          '<div class="lesson-checks">' + s.lessons.map(function (l) {
            var c = lessonQuestions(l.key).length;
            if (!c) return '';
            return '<label class="chk"><input type="checkbox" name="lesson" value="' + l.key + '" checked> ' + l.num + ' — ' + esc(l.title) + ' <span class="muted small">(' + c + ')</span></label>';
          }).join('') + '</div></fieldset>' +
        (s.questions.some(function (q) { return q.fixed; }) ? '<fieldset><legend>Type de questions</legend><label class="chk"><input type="checkbox" name="tests"> 📝 Seulement les questions des tests (recopiées de tes copies)</label></fieldset>' : '') +
        '</details>' +
      '</form>';
  }

  function viewQuiz() {
    return '<h1 class="h1">⚡ Quiz éclair</h1>' +
      '<div class="card pad"><p><b>10 questions</b> tirées au hasard dans <b>toutes les matières</b>.</p>' +
      '<p>⏱️ <b>' + QUIZ_SECONDS + ' secondes</b> par question : si le temps est écoulé, la question compte comme ratée — et la correction s’affiche quand même. Les questions d’exercice (qui s’enchaînent) ne sont pas chronométrées.</p>' +
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

  /* ----- Leçons à revoir : les erreurs regroupées par leçon, avec l'explication pour comprendre ----- */
  function viewARevoir() {
    var list = allQuestions().filter(needsReview);
    var head = '<h1 class="h1">📌 Leçons à revoir</h1>';
    if (!list.length) {
      return head + '<div class="card pad center"><p class="big">🎉</p><p>Aucune erreur à retravailler pour l’instant.</p>' +
        '<p class="muted">Dès que tu te trompes dans un QCM, un quiz ou l’épreuve UV2, la leçon concernée apparaît ici avec la bonne réponse et l’explication.</p>' +
        '<a class="btn primary" href="#/qcm">🧠 Faire un QCM</a></div>';
    }
    var groups = {}, order = [];
    list.forEach(function (q) { if (!groups[q.lkey]) { groups[q.lkey] = []; order.push(q.lkey); } groups[q.lkey].push(q); });
    order.sort(function (a, b) { return groups[b].length - groups[a].length; });
    var clean = function (t) { return t.replace(/^\d+\)\s*/, '').replace(/^Q\d+ (\(\d\) )?—\s*/, '').replace(/^Question N°\d+\s*:\s*/, ''); };
    return head + '<div class="card pad"><p><b>' + list.length + '</b> question' + (list.length > 1 ? 's' : '') + ' à retravailler dans <b>' + order.length + '</b> leçon' + (order.length > 1 ? 's' : '') +
      '. Pour chaque leçon : relis ce qu’il faut comprendre, la bonne réponse et son explication, puis refais les questions.</p>' +
      '<p class="muted small">Une question sort de cette liste quand tu la réussis 2 fois de suite.</p>' +
      '<div class="row-actions"><button class="btn primary" data-action="revision">🔁 Refaire toutes mes erreurs</button><a class="btn" href="#/formules">📐 Formules et conversions</a></div></div>' +
      order.map(function (k) {
        var l = REV.lessonById[k], s = subj(l.subject), qs = groups[k];
        return '<section class="card pad rev-lesson" style="--c:' + s.color + '"><h2 class="h2">' + s.icon + ' ' + esc(l.title) +
          ' <span class="pill bad">' + qs.length + ' erreur' + (qs.length > 1 ? 's' : '') + '</span></h2>' +
          '<p class="muted small">' + esc(s.name) + '</p>' +
          (l.retenir && l.retenir.length ? '<div class="box retenir"><b>🎯 Ce qu’il faut comprendre</b><ul>' + l.retenir.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
          qs.map(function (q) {
            var r = store.q[q.id] || { ko: 0 };
            return '<details class="rev-q"><summary>❌ ' + clean(q.q) + ' <span class="muted small">(ratée ' + r.ko + ' fois)</span></summary>' +
              ctxImg(q) + (q.img ? '<figure class="q-img"><img loading="lazy" src="img/' + q.img + '" alt=""></figure>' : '') +
              '<p class="fb-good">' + (q.good.length > 1 ? (q.any ? 'Réponses acceptées : ' : 'Bonnes réponses : ') : 'Bonne réponse : ') + q.good.map(function (g) { return '<b>' + q.c[g] + '</b>'; }).join(' / ') + '</p>' +
              (q.e || q.role ? expHtml(q, '💡') : '') + (q.r ? '<p>🧠 ' + q.r + '</p>' : '') + (q.w ? '<p>⚠️ ' + q.w + '</p>' : '') + '</details>';
          }).join('') +
          '<div class="row-actions"><a class="btn" href="#/lecon/' + k + '">📖 Revoir la leçon</a>' +
          (l.hidden ? '' : '<a class="btn" href="#/memos/' + s.id + '#m-' + l.id + '">🧠 Aide-mémoire</a>') +
          (REV.formulaires && REV.formulaires[s.id] ? '<a class="btn" href="#/formules/' + s.id + '">📐 Formules</a>' : '') +
          '<button class="btn primary" data-action="redo-lesson-errors" data-key="' + k + '">🔁 Refaire ces ' + qs.length + ' question' + (qs.length > 1 ? 's' : '') + '</button></div></section>';
      }).join('');
  }

  /* ----- Formules, valeurs, conversions et méthodes par matière ----- */
  /* Sur téléphone, chaque ligne de tableau devient une fiche : nom en titre, formule encadrée,
     les autres colonnes avec leur intitulé. Les règles de conversion (.ruler) ne sont pas touchées. */
  function stackTables(html) {
    return html.replace(/<table>([\s\S]*?)<\/table>/g, function (all, inner) {
      var rows = inner.match(/<tr>[\s\S]*?<\/tr>/g) || [];
      if (!rows.length || !/^<tr><th>/.test(rows[0]) || /rul-step/.test(rows[0])) return all;
      var heads = (rows[0].match(/<th>([\s\S]*?)<\/th>/g) || []).map(function (h) { return h.replace(/<[^>]+>/g, ''); });
      var main = -1;
      heads.forEach(function (h, i) { if (main < 0 && i > 0 && /formule|à retenir|valeur|méthode/i.test(h)) main = i; });
      if (main < 0) main = heads.length > 1 ? 1 : -1;
      return '<table class="ftab">' + rows[0] + rows.slice(1).map(function (r) {
        var i = 0;
        return r.replace(/<td>([\s\S]*?)<\/td>/g, function (m, txt) {
          var k = i++, cls = k === 0 ? 'f-name' : k === main ? 'f-main' + (/formule|à retenir|valeur|méthode/i.test(heads[k]) ? '' : ' f-lab') : 'f-more';
          if (k === main) txt = txt.replace(/ · /g, '<span class="f-sep"> · </span>');
          return '<td class="' + cls + '" data-l="' + esc(heads[k] || '') + '">' + txt + '</td>';
        });
      }).join('') + '</table>';
    });
  }

  function viewFormules(id) {
    var F = REV.formulaires || {};
    var subs = REV.subjects.filter(function (s) { return F[s.id]; });
    var list = id && F[id] ? subs.filter(function (s) { return s.id === id; }) : subs;
    return '<h1 class="h1">📐 Formules, valeurs et conversions</h1><p class="muted">Les valeurs à connaître, les formules, les tableaux de conversion et les méthodes de calcul pas à pas, matière par matière.</p>' +
      '<nav class="chips exo-filter"><a class="chip' + (id && F[id] ? '' : ' on') + '" href="#/formules">Toutes</a>' +
      subs.map(function (s) { return '<a class="chip' + (id === s.id ? ' on' : '') + '" href="#/formules/' + s.id + '">' + s.icon + ' ' + esc(s.name) + '</a>'; }).join('') + '</nav>' +
      list.map(function (s) {
        return '<h2 class="h2 sec-title">' + s.icon + ' ' + esc(s.name) + '</h2>' + F[s.id].map(function (b) {
          return '<section class="card pad lesson formule" style="--c:' + s.color + '"><h3>' + b.t + '</h3>' + stackTables(b.html) + '</section>';
        }).join('') + '<div class="row-actions"><a class="btn" href="#/matiere/' + s.id + '">📖 Cours ' + esc(s.name) + '</a><a class="btn primary" href="#/qcm/' + s.id + '">🧠 QCM</a></div>';
      }).join('') +
      '<div class="row-actions sticky-actions"><button class="btn" data-action="print">🖨️ Imprimer / PDF</button></div>';
  }

  /* ----- Question en cours ----- */
  function viewSession() {
    if (!session) {
      return '<div class="card pad center"><p>Aucun QCM en cours.</p><a class="btn primary" href="#/qcm">🧠 Choisir un QCM</a></div>';
    }
    if (session.exam && !session.done) return viewExam();
    if (session.i >= session.qids.length) return viewBilan();
    var q = REV.qById[session.qids[session.i]];
    var s = subj(q.subject), l = REV.lessonById[q.lkey];
    var perm = session.perm[session.i];
    var ans = session.answers[session.i];
    var n = session.qids.length;
    var nOk = session.answers.filter(function (a) { return a && a.ok; }).length, nKo = session.answers.filter(function (a) { return a && !a.ok; }).length;
    var head = '<div class="q-head" style="--c:' + s.color + '">' +
      '<div class="q-meta"><span>' + s.icon + ' ' + esc(s.name) + '</span><span class="muted">📖 ' + esc(l.title) + '</span></div>' +
      '<div class="q-count"><b>Question ' + (session.i + 1) + ' / ' + n + '</b>' + (nOk + nKo ? '<span class="live-score">✅ ' + nOk + ' · ❌ ' + nKo + '</span>' : '') + '<span class="muted small">' + esc(session.title) + '</span></div>' +
      '<div class="progress"><span style="width:' + Math.round(session.i * 100 / n) + '%"></span></div>' +
      (session.timer && !ans && !isExoQ(q) ? '<div class="timer"><span id="timer-bar"></span><b id="timer-txt">' + QUIZ_SECONDS + ' s</b></div>' : '') +
      '</div>';
    var enonce = l.exo && (l.html.match(/<h3>Énoncé<\/h3>([\s\S]*?)<h3>/) || [])[1];
    var body = '<div class="q-card">' +
      (enonce ? '<details class="q-enonce"><summary>📋 Énoncé de l’exercice</summary>' + enonce + '</details>' : '') +
      sessionPrevBox(q) + ctxImg(q) + '<h1 class="q-text">' + q.q + '</h1>' +
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
          (ans.ok ? '' : '<p class="fb-good">' + (q.multi ? 'Les bonnes réponses sont :<br>' : q.any ? 'Réponses acceptées :<br>' : 'La bonne réponse est : ') + goodTxt + '</p>') + '</div>' +
        (dev ? '<div class="fb-sec dev"><b>🧮 Développement de la réponse</b><p>' + dev + '</p></div>' : '') +
        '<div class="fb-sec' + (l.exo && !dev ? ' dev' : '') + '"><b>' + (l.exo && !dev ? '🧮 Développement de la réponse' : '💡 Explication') + '</b>' + expHtml(q) + '</div>' +
        (q.eimg ? '<figure class="fb-img"><a href="img/' + q.eimg[0] + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + q.eimg[0] + '" alt="' + esc(q.eimg[1]) + '"></a><figcaption>🖼️ ' + esc(q.eimg[1]) + '</figcaption></figure>' : '') +
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
    if (session && session.exam && !session.done) {
      window.scrollTo(0, 0);
      var tEl = document.getElementById('exam-timer');
      var tick = function () {
        var left = session.deadline - Date.now();
        if (tEl) { tEl.textContent = '⏱️ ' + fmtLeft(left); tEl.classList.toggle('low', left < 10 * 60000); }
        if (left <= 0) { clearInterval(timerId); toast('⏱️ Temps écoulé : l’épreuve est terminée.'); finishExam(); }
      };
      tick(); timerId = setInterval(tick, 1000);
      return;
    }
    var ans = session && session.answers[session.i];
    if (ans) {
      var fb = document.getElementById('feedback');
      if (fb) fb.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo(0, 0);
    var qpl = document.querySelector('.q-prev ol'); if (qpl) qpl.scrollTop = qpl.scrollHeight;
    // pas de chrono sur une question d’exercice : on a besoin des réponses précédentes
    if (session && session.timer && !isExoQ(REV.qById[session.qids[session.i]])) {
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
    if (session && session.exam && !session.done) { if (k >= 0) examPick(k); return; }
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
    if (session.exam) return viewBilanUV2();
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
          expHtml(w.q, '💡') + (w.q.r ? '<p>🧠 ' + w.q.r + '</p>' : '') + '</details>';
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
      (toReview ? '<a class="card review-cta" href="#/a-revoir"><span class="big">📌</span><span><b>Leçons à revoir</b><br>' + toReview + ' erreur(s) expliquée(s) leçon par leçon</span><span class="chev">›</span></a>' : '') +

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


  /* ----- Tous les exercices corrigés, toutes matières ----- */
  function exoType(l) {
    var id = l.id;
    if (/^uv2-(banque|var)/.test(id)) return ['Entraînement', 'b-uv2'];
    if (/^uv2-/.test(id)) return ['Dossier d’évaluation', 'b-uv2'];
    if (/^tf-/.test(id)) return ['Test final', 'b-tf'];
    if (/^(cah|cahier)/.test(id)) return ['Cahier officiel', 'b-cah'];
    if (/^sym/.test(id)) return ['Symboles', 'b-sym'];
    if (/^(test-|qcm-|controle)/.test(id)) return ['Test', 'b-test'];
    if (/^(aga03-|livre-)/.test(id)) return ['Exercices du livre', 'b-livre'];
    return ['Exercice corrigé', 'b-exo'];
  }
  function exoCard(l, s) {
    var lq = lessonQuestions(l.key), ls = scoreOf(lq), lv = level(ls.pct), t = exoType(l);
    return '<div class="exo-card" style="--c:' + s.color + '"><div class="exo-top"><span class="badge ' + t[1] + '">' + t[0] + '</span>' +
      '<span class="lscore ' + lv.cls + '">' + (ls.pct === null ? '' : ls.pct + ' % ' + lv.dot) + '</span></div>' +
      '<a class="exo-title" href="#/lecon/' + l.key + '">' + esc(l.title) + '</a>' +
      '<span class="muted small">' + s.icon + ' ' + esc(s.name) + ' · ' + lq.length + ' questions' + (store.lessonsSeen[l.key] ? ' · ✔ lu' : '') + '</span>' +
      '<div class="exo-actions"><a class="btn" href="#/lecon/' + l.key + '">📖 Schéma + corrigé</a>' +
      (lq.length ? '<button class="btn primary" data-action="lesson-qcm" data-key="' + l.key + '">🧠 S’entraîner</button>' : '') + '</div></div>';
  }
  function countExos(s) { return s.lessons.filter(function (l) { return l.exo; }).length; }
  function viewExercices(id) {
    var subs = REV.subjects.filter(function (s) { return countExos(s); });
    var list = id ? subs.filter(function (s) { return s.id === id; }) : subs;
    var total = subs.reduce(function (n, s) { return n + countExos(s); }, 0);
    return '<h1 class="h1">📝 Exercices corrigés</h1><p class="muted">Exercices des livres et des cahiers d’exercices, dossier d’évaluation et test final : ' + total + ' exercices avec leur correction détaillée. Les autres tests sont dans les QCM de chaque matière.</p>' +
      '<nav class="chips exo-filter"><a class="chip' + (id ? '' : ' on') + '" href="#/exercices">Tout (' + total + ')</a>' +
      subs.map(function (s) { return '<a class="chip' + (id === s.id ? ' on' : '') + '" href="#/exercices/' + s.id + '">' + s.icon + ' ' + esc(s.name) + ' (' + countExos(s) + ')</a>'; }).join('') + '</nav>' +
      list.map(function (s) {
        return '<h2 class="h2 sec-title">' + s.icon + ' ' + esc(s.name) + '</h2><div class="exo-grid">' +
          s.lessons.filter(function (l) { return l.exo; }).map(function (l) { return exoCard(l, s); }).join('') + '</div>';
      }).join('');
  }

  /* ----- Vérification des corrigés : chaque test, question par question ----- */
  var VERIF_TESTS = [
    ['uv2-', 'UV2 — dossier d’évaluation n°1', 'Corrigé du formateur (quiz Socrative, qui peut contenir des erreurs, et ses précisions).', 'off'],
    ['tf-', 'Test final UV1 (sujet de préparation)', 'Correction officielle, vérifiée avec le cours.', 'off'],
    ['cah', 'Cahiers d’exercices (hydraulique, électricité)', 'Corrigés officiels des cahiers EMB.', 'off'],
    ['test-eee', 'Test équipement électrique et électronique embarquée', 'Pas de corrigé officiel : chaque réponse est tirée du cours (AGA 01, capteurs, LIN, CAN).', 'ok'],
    ['qcm-demarreur', 'QCM démarreur et batterie', 'Réponses du cours AGA 01.', 'ok'],
    ['microtracteur', 'Exercice microtracteur tondeuse', 'Copie corrigée avec le cours d’électricité.', 'ok'],
    ['moto', 'Exercice moto', 'Copie corrigée avec le cours d’électricité.', 'ok'],
    ['controle-rdc', 'Contrôle des connaissances RDC n°1', 'Corrigé du formateur (quiz RDC Socrative) et ta fiche.', 'off'],
    ['quiz-rdc', 'Quiz RDC', 'Corrigé du formateur (Socrative).', 'off'],
    ['qcm-epms', 'EPMS – QCM FS2', 'Cases cochées sur la copie, vérifiées dans le cours EPMS.', 'ok'],
    ['test-sst', 'Test SST', 'Copie corrigée ; CCHPA : AQA 03 retenue.', 'ok'],
    ['compo-b', 'Composante B (IA – B commune ECOMAT)', 'Cases cochées sur la copie ; hors des cours fournis.', 'ded'],
    ['questions', 'PPLD — questions posées', 'Réponses surlignées sur ta feuille, vérifiées dans le cours AGE 12 ; Test n°1 sans case cochée : réponses déduites du cours.', 'ok']];
  // Questions dont la réponse du site n'est pas celle du corrigé, ou non confirmée
  var VERIF_FLAGS = [
    [/^(dsft\/uv2-dsft|hydro\/uv2-hydro|elec\/uv2-elec)$/, /^(1[2348]|21|5[3-9]|6[0-4])\)/, 'ok', 'Question absente du quiz Socrative : réponse vérifiée dans le cours.'],
    [/^equip\/uv2-equip$/, /^46\)/, 'off', 'Confirmé par le formateur : la lampe n’a pas d’influence sur la charge (le Socrative coche A par erreur).'],
    [/^dsft\/uv2-dsft$/, /^13\)/, 'off', 'Confirmé par le formateur : l’élément 13 est la VNAE.'],
    [/^moteur\/uv2-moteur$/, /^38\)/, 'off', 'Question mal posée, 2 réponses possibles (précision du formateur) : A (Socrative) et C (cours GD 22).'],
    [/^ppld\/questions$/, /(règle la pression maxi du circuit|je règle la pression de stand-by|Donner la bonne réponse|En sortie terrain)/, 'ded', 'Aucune case cochée sur ta feuille : réponse déduite du cours AGE 12.'],
    [/^epms\/qcm-epms$/, /^1[12]- /, 'conf', 'Réception « 4 membres » / 3 tentatives au gué : réponses de la copie, non détaillées dans le cours.'],
    [/^tact\/compo-b$/, /^(1|10|14|16|17)\. /, 'conf', 'Non vérifiable dans les documents fournis : à confirmer avec le formateur.'],
    [/^ppld\/questions$/, /composant 6/, 'conf', 'Deux réponses marquées sur ta feuille (B et C) : à confirmer.']];
  var VERIF_LBL = { off: ['✅', 'Corrigé officiel'], ok: ['📘', 'Vérifié dans le cours'], ded: ['🟠', 'Déduit du cours'], ecart: ['⚠️', 'Écart avec le corrigé'], conf: ['❓', 'À confirmer'] };
  function viewVerif() {
    var all = allQuestions(), html = '', tot = { off: 0, ok: 0, ded: 0, ecart: 0, conf: 0 };
    VERIF_TESTS.forEach(function (t) {
      var qs = all.filter(function (q) { var l = q.lkey.split('/')[1]; return l.indexOf(t[0]) === 0 && !/uv2-(banque|var)/.test(q.lkey); });
      if (!qs.length) return;
      var groups = {};
      qs.forEach(function (q) { (groups[q.lkey] = groups[q.lkey] || []).push(q); });
      html += '<section class="verif-sec"><h2 class="h2 sec-title">' + t[1] + '</h2><p class="muted small">' + t[2] + '</p>';
      Object.keys(groups).forEach(function (k) {
        var l = REV.lessonById[k];
        html += '<h3 class="verif-l"><a href="#/lecon/' + k + '">' + esc(l.title) + '</a> <span class="muted small">(' + groups[k].length + ' questions)</span></h3><div class="tw"><table class="verif"><tr><th></th><th>Question</th><th>Réponse retenue</th><th>Justification</th></tr>';
        groups[k].forEach(function (q) {
          var st = t[3], note = '';
          VERIF_FLAGS.forEach(function (f) { if (f[0].test(k) && f[1].test(q.q)) { st = f[2]; note = f[3]; } });
          tot[st]++;
          var L = VERIF_LBL[st];
          html += '<tr class="v-' + st + '"><td title="' + L[1] + '">' + L[0] + '</td><td>' + q.q + '</td><td><b>' + q.good.map(function (g) { return q.c[g]; }).join('<br>') + '</b></td><td>' +
            (note ? '<b class="v-note">' + note + '</b><br>' : '') + (q.e || '') + (q.src ? '<br><span class="muted small">Source : ' + esc(q.src) + '</span>' : '') + '</td></tr>';
        });
        html += '</table></div>';
      });
      html += '</section>';
    });
    var n = tot.off + tot.ok + tot.ded + tot.ecart + tot.conf;
    return crumbs([['#/cours', 'Cours'], [null, 'Vérification des corrigés']]) +
      '<h1 class="h1">✅ Vérification des corrigés</h1><p class="muted">Tous les tests du site, question par question : la réponse retenue, sa justification et d’où elle vient.</p>' +
      '<div class="verif-sum">' + ['off', 'ok', 'ded', 'ecart', 'conf'].map(function (k) {
        return '<div class="v-' + k + '"><span>' + VERIF_LBL[k][0] + '</span><b>' + tot[k] + '</b><small>' + VERIF_LBL[k][1] + '</small></div>';
      }).join('') + '</div><p class="small muted">' + n + ' questions de tests. Les banques d’entraînement UV2 (questions types, autres valeurs) ne sont pas des tests : elles reprennent les leçons.</p>' + html;
  }

  /* ----- Aides-mémoires : systèmes (phases, pannes) et symboles ----- */
  var ACT = { R: 'Remplacer', P: 'Réparer', G: 'Régler', N: 'Recharger / nettoyer', C: 'Contrôler' };
  function sysHtml(x, s) {
    return '<section class="sys" style="--c:' + s.color + '">' +
      '<header class="sys-h"><h3>' + x.t + '</h3><p>' + x.role + '</p></header>' +
      (x.img && x.img.length ? '<div class="sys-figs">' + x.img.map(function (i) {
        return '<figure><a href="img/' + i[0] + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + i[0] + '" alt=""></a><figcaption>' + i[1] + '</figcaption></figure>';
      }).join('') + '</div>' : '') +
      '<h4 class="sys-sub">Fonctionnement, étape par étape</h4><ol class="steps">' + x.phases.map(function (p) {
        return '<li><b>' + p[0] + '</b><span>' + p[1] + '</span></li>';
      }).join('') + '</ol>' +
      (x.methode ? '<h4 class="sys-sub">Méthode</h4><div class="flow flow-h">' + x.methode.map(function (m, i) { return '<span>' + (i + 1) + '. ' + m + '</span>'; }).join('<i>›</i>') + '</div>' : '') +
      (x.pannes.length ? '<h4 class="sys-sub">Pannes : symptôme → diagnostic → action</h4><div class="pannes">' + x.pannes.map(function (p) {
        return '<div class="panne"><div class="pn-s"><small>Symptôme</small>' + p[0] + '</div><div class="pn-d"><small>Diagnostic</small>' + p[1] + '</div>' +
          '<div class="pn-a"><small><span class="act act-' + p[3] + '">' + ACT[p[3]] + '</span></small>' + p[2] + '</div></div>';
      }).join('') + '</div>' : '') + '</section>';
  }
  function symbolesOf(s) {
    var by = {}, order = [];
    s.questions.forEach(function (q) {
      if (!q.img || !/^sym/.test(q.l)) return;
      if (!by[q.img]) { by[q.img] = { img: q.img }; order.push(q.img); }
      var a = q.c[q.good[0]], o = by[q.img];
      if (/rôle/i.test(q.q)) { if (!o.role) o.role = a; } else if (!o.des) o.des = a;
    });
    return order.map(function (k) { return by[k]; }).filter(function (o) { return o.des; });
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
      var sy = id ? (REV.systemes || {})[s.id] || [] : [];
      var sb = id ? symbolesOf(s) : [];
      if (id && (sy.length || sb.length)) {
        html += '<nav class="chips memo-nav">' + (sy.length ? '<a class="chip" href="#/memos/' + s.id + '#m-systemes">⚙️ Systèmes : fonctionnement et pannes</a>' : '') +
          (sb.length ? '<a class="chip" href="#/memos/' + s.id + '#m-symboles">🔣 Symboles : désignation et rôle</a>' : '') +
          '<a class="chip" href="#/memos/' + s.id + '#m-lecons">🧠 Aide-mémoire par leçon</a></nav>';
      }
      if (sy.length) {
        html += '<h2 class="h2 sec-title" id="m-systemes">⚙️ Les systèmes : fonctionnement, pannes, diagnostic</h2>' +
          '<p class="muted small legend-acts">Actions : <span class="act act-R">Remplacer</span> <span class="act act-P">Réparer</span> <span class="act act-G">Régler</span> <span class="act act-N">Recharger / nettoyer / purger</span> <span class="act act-C">Contrôler plus loin</span></p>' +
          sy.map(function (x) { return sysHtml(x, s); }).join('');
      }
      if (sb.length) {
        html += '<h2 class="h2 sec-title" id="m-symboles">🔣 Symboles : désignation et rôle</h2><div class="sym-grid">' +
          sb.map(function (x) {
            return '<figure class="sym-card"><a href="img/' + x.img + '" target="_blank" rel="noopener"><img loading="lazy" src="img/' + x.img + '" alt=""></a>' +
              '<figcaption><b>' + x.des + '</b>' + (x.role ? '<span>' + x.role + '</span>' : '') + '</figcaption></figure>';
          }).join('') + '</div>';
      }
      html += '<h2 class="h2 sec-title" id="m-lecons">' + s.icon + ' ' + esc(s.name) + (id ? ' — aide-mémoire par leçon' : '') + '</h2><div class="memo-grid">' +
        shownLessons(s).map(function (l) { return '<div id="m-' + l.id + '">' + memoHtml(l, s, true) + '</div>'; }).join('') + '</div>';
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
    var cours = shownLessons(s).filter(function (l) { return !l.exo; });
    var exos = s.lessons.filter(function (l) { return l.exo || (l.hidden && /^sym/.test(l.id)); });
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


  /* ---------- Test UV2 : épreuve de 60 questions (10 par matière), 2 h, barème + 1 / − 0,5 / 0 ---------- */
  var UV2_MIN = 120, UV2_BLANCS = 6;
  function qnum(q) { return parseInt(q.q, 10) || 0; }
  var UV2_MATS = [
    { id: 'dsft', nom: 'DSFT', subj: 'dsft', orig: function (q) { return q.lkey === 'dsft/uv2-dsft' && qnum(q) <= 11; }, autres: ['dsft/uv2-var-dsft', 'dsft/uv2-banque'] },
    { id: 'pneu', nom: 'Freinage pneumatique', subj: 'pneu', orig: function (q) { return q.lkey === 'dsft/uv2-dsft' && qnum(q) >= 12; }, autres: ['pneu/uv2-banque'] },
    { id: 'hydro', nom: 'Hydraulique', subj: 'hydro', orig: function (q) { return q.lkey === 'hydro/uv2-hydro'; }, autres: ['hydro/uv2-var-hydro', 'hydro/uv2-banque'] },
    { id: 'moteur', nom: 'Motorisation', subj: 'moteur', orig: function (q) { return q.lkey === 'moteur/uv2-moteur'; }, autres: ['moteur/uv2-banque'] },
    { id: 'equip', nom: 'Équipement électrique', subj: 'equip', orig: function (q) { return q.lkey === 'equip/uv2-equip'; }, autres: ['equip/uv2-var-equip', 'equip/uv2-banque'] },
    { id: 'elec', nom: 'Électricité générale', subj: 'elec', orig: function (q) { return q.lkey === 'elec/uv2-elec'; }, autres: ['elec/uv2-var-elec', 'elec/uv2-banque'] }
  ];
  function uv2Mat(id) { return UV2_MATS.find(function (m) { return m.id === id; }); }
  function uv2Orig(m) { return allQuestions().filter(m.orig).sort(function (a, b) { return qnum(a) - qnum(b); }); }
  function uv2Autres(m) { return allQuestions().filter(function (q) { return m.autres.indexOf(q.lkey) >= 0; }); }
  function seeded(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function sshuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // Sujet : k = 0 → dossier transmis ; 1..n → UV2 blanc n°k (toujours le même) ; -1 → aléatoire
  function uv2Sujet(k) {
    var qs = [], mats = [];
    UV2_MATS.forEach(function (m, mi) {
      var O = uv2Orig(m), X = uv2Autres(m), pick;
      if (k === 0) pick = O;
      else {
        var rnd = k > 0 ? seeded(k * 7919 + mi * 104729) : Math.random;
        // les questions du dossier reviennent souvent : 6 du dossier + 4 variantes (ou plus si le dossier en a moins)
        var nO = Math.min(6, O.length);
        pick = sshuffle(sshuffle(O, rnd).slice(0, nO).concat(sshuffle(X, rnd).slice(0, 10 - nO)), rnd);
      }
      pick.forEach(function (q) { qs.push(q); mats.push(m.id); });
    });
    return { qs: qs, mats: mats };
  }
  function uv2Title(k) { return k === 0 ? 'UV2 — Dossier d’évaluation n°1' : k > 0 ? 'UV2 blanc n°' + k : 'UV2 aléatoire'; }
  function startExam(k, train, qs, mats, title) {
    if (!qs) { var sj = uv2Sujet(k); qs = sj.qs; mats = sj.mats; title = uv2Title(k); }
    if (train) {
      startSession({ mode: 'uv2', title: title + ' (entraînement)', questions: qs });
      session.mats = mats; saveSession(); return;
    }
    var now = Date.now();
    session = {
      mode: 'uv2', exam: true, k: k, title: title, qids: qs.map(function (q) { return q.id; }), mats: mats,
      perm: qs.map(function (q) { var p = q.c.map(function (_, i) { return i; }); return q.fixed ? p : shuffle(p); }),
      sel: [], answers: [], i: 0, started: now, deadline: now + UV2_MIN * 60000
    };
    saveSession();
    go('#/session');
  }
  function fmtLeft(ms) {
    ms = Math.max(0, ms); var m = Math.floor(ms / 60000), s = Math.floor(ms % 60000 / 1000);
    return (m >= 60 ? Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0') : String(m)) + ' min ' + String(s).padStart(2, '0') + ' s';
  }
  function fr(n) { return String(Math.round(n * 100) / 100).replace('.', ','); }
  function uv2Note(sess) {
    var ok = 0, ko = 0, bl = 0;
    sess.answers.forEach(function (a) { if (!a || a.blank) bl++; else if (a.ok) ok++; else ko++; });
    return { ok: ok, ko: ko, bl: bl, note: ok - 0.5 * ko };
  }
  function exText(q) { return session.k === 0 ? q.q : q.q.replace(/^\d+\)\s*/, '').replace(/^Q\d+ (\(\d\) )?—\s*/, ''); }
  function viewExam() {
    var i = session.i, n = session.qids.length, q = REV.qById[session.qids[i]], l = REV.lessonById[q.lkey];
    var m = uv2Mat(session.mats[i]), s = subj(m.subj), sel = session.sel[i];
    var nb = session.sel.filter(function (v) { return v != null; }).length;
    var enonce = l.exo && (l.html.match(/<h3>Énoncé<\/h3>([\s\S]*?)<h3>/) || [])[1];
    var grid = UV2_MATS.map(function (mm) {
      var cells = session.mats.map(function (id, j) {
        if (id !== mm.id) return '';
        return '<button class="eg' + (session.sel[j] != null ? ' done' : '') + (j === i ? ' cur' : '') + '" data-action="exam-go" data-i="' + j + '" aria-label="Question ' + (j + 1) + '">' + (j + 1) + '</button>';
      }).join('');
      return cells ? '<div class="eg-m"><span class="small">' + subj(mm.subj).icon + ' ' + esc(mm.nom) + '</span><div class="eg-row">' + cells + '</div></div>' : '';
    }).join('');
    return '<div class="q-head exam-head" style="--c:' + s.color + '">' +
        '<div class="q-meta"><span>' + s.icon + ' ' + esc(m.nom) + '</span><b class="exam-timer" id="exam-timer">⏱️ ' + fmtLeft(session.deadline - Date.now()) + '</b></div>' +
        '<div class="q-count"><b>Question ' + (i + 1) + ' / ' + n + '</b><span class="muted small">' + esc(session.title) + ' · ' + nb + ' réponse' + (nb > 1 ? 's' : '') + ' donnée' + (nb > 1 ? 's' : '') + '</span></div>' +
        '<div class="progress"><span style="width:' + Math.round(nb * 100 / n) + '%"></span></div></div>' +
      '<div class="q-card">' +
        (enonce ? '<details class="q-enonce"><summary>📋 Énoncé de l’exercice</summary>' + enonce + '</details>' : '') +
        ctxImg(q) + '<h1 class="q-text">' + exText(q) + '</h1>' +
        (q.img ? '<figure class="q-img"><a href="img/' + q.img + '" target="_blank" rel="noopener"><img src="img/' + q.img + '" alt="Schéma de la question"></a></figure>' : '') +
        '<div class="choices" role="group" aria-label="Réponses">' + session.perm[i].map(function (orig, k) {
          return '<button class="choice' + (sel === orig ? ' picked' : '') + '" data-action="answer" data-k="' + k + '" aria-pressed="' + (sel === orig) + '">' +
            '<span class="letter">' + LETTERS[k] + '</span><span class="ct">' + q.c[orig] + '</span></button>';
        }).join('') + '</div>' +
        '<div class="exam-nav"><button class="btn" data-action="exam-prev"' + (i ? '' : ' disabled') + '>⬅️ Précédente</button>' +
          (sel != null ? '<button class="btn ghost small" data-action="exam-clear">✖ Effacer ma réponse</button>' : '<span class="muted small">Sans réponse = 0 point</span>') +
          (i + 1 < n ? '<button class="btn primary" data-action="exam-next">Suivante ➡️</button>' : '<button class="btn primary" data-action="exam-finish">🧾 Terminer</button>') + '</div>' +
      '</div>' +
      '<details class="card pad exam-grid"' + (i === 0 ? ' open' : '') + '><summary><b>🗂️ Toutes les questions</b> <span class="muted small">(vert = répondue)</span></summary>' + grid + '</details>' +
      '<div class="q-foot row-actions center"><button class="btn primary" data-action="exam-finish">🧾 Terminer l’épreuve et voir ma note</button>' +
      '<button class="btn ghost small" data-action="exam-quit">Abandonner</button></div>';
  }
  function examPick(k) {
    var orig = session.perm[session.i][k];
    session.sel[session.i] = session.sel[session.i] === orig ? null : orig;
    saveSession(); render();
  }
  function finishExam() {
    if (!session || !session.exam || session.done) return;
    clearInterval(timerId);
    session.qids.forEach(function (id, i) {
      var q = REV.qById[id], v = session.sel[i];
      if (v == null) session.answers[i] = { chosen: -1, ok: false, blank: true };
      else { var ok = q.good.indexOf(v) >= 0; session.answers[i] = { chosen: v, ok: ok }; record(id, ok); }
    });
    session.done = true; session.ended = Math.min(Date.now(), session.deadline); session.i = session.qids.length;
    finishSession();
    store.sessions[0].note = uv2Note(session).note; save();
    saveSession();
    go('#/bilan');
  }
  function viewBilanUV2() {
    var r = uv2Note(session), n = session.qids.length, sur20 = r.note * 20 / n;
    var lv = level(Math.max(0, Math.round(r.note * 100 / n)));
    var per = UV2_MATS.map(function (m) {
      var o = { m: m, ok: 0, ko: 0, bl: 0 };
      session.mats.forEach(function (id, j) { if (id !== m.id) return; var a = session.answers[j]; if (!a || a.blank) o.bl++; else if (a.ok) o.ok++; else o.ko++; });
      o.pts = o.ok - 0.5 * o.ko; o.n = o.ok + o.ko + o.bl; return o;
    }).filter(function (o) { return o.n; });
    var faible = per.slice().sort(function (a, b) { return a.pts / a.n - b.pts / b.n; })[0];
    var dur = Math.round(((session.ended || Date.now()) - session.started) / 60000);
    var corr = per.map(function (o) {
      var items = session.qids.map(function (id, j) {
        if (session.mats[j] !== o.m.id) return '';
        var q = REV.qById[id], a = session.answers[j] || { blank: true }, perm = session.perm[j];
        var st = a.blank ? '⚪' : a.ok ? '✅' : '❌';
        var good = q.good.map(function (g) { return '<b>' + LETTERS[perm.indexOf(g)] + '</b> — ' + q.c[g]; }).join('<br>');
        return '<details class="card err' + (a.ok ? ' ok' : '') + '"><summary>' + st + ' <b>Q' + (j + 1) + '</b> — ' + exText(q) + '</summary>' +
          ctxImg(q) + (q.img ? '<figure class="q-img"><img loading="lazy" src="img/' + q.img + '" alt=""></figure>' : '') +
          (a.blank ? '<p class="muted">Pas de réponse (0 point)</p>' : '<p>Ta réponse : <b>' + LETTERS[perm.indexOf(a.chosen)] + '</b> — ' + q.c[a.chosen] + (a.ok ? ' ✅ (+ 1)' : ' ❌ (− 0,5)') + '</p>') +
          (a.ok ? '' : '<p class="fb-good">' + (q.good.length > 1 ? (q.any ? 'Réponses acceptées : ' : 'Bonnes réponses : ') : 'Bonne réponse : ') + good + '</p>') +
          expHtml(q, '💡') + (q.r ? '<p>🧠 ' + q.r + '</p>' : '') +
          '<a class="small" href="#/lecon/' + q.lkey + '">📖 Revoir la leçon</a></details>';
      }).join('');
      return '<h3 class="h3">' + subj(o.m.subj).icon + ' ' + esc(o.m.nom) + ' — ' + fr(o.pts) + ' / ' + o.n + '</h3>' + items;
    }).join('');
    return '<section class="result">' +
      '<div class="res-head"><div class="res-title">📝 RÉSULTAT UV2</div><div class="res-subj">' + esc(session.title.toUpperCase()) + '</div>' +
      '<div class="res-score">' + fr(r.note) + ' / ' + n + '</div>' +
      '<div class="res-pct ' + lv.cls + '">' + fr(sur20) + ' / 20</div>' +
      '<p>✅ ' + r.ok + ' bonne' + (r.ok > 1 ? 's' : '') + ' (+ ' + r.ok + ') &nbsp; ❌ ' + r.ko + ' fausse' + (r.ko > 1 ? 's' : '') + ' (− ' + fr(r.ko * 0.5) + ') &nbsp; ⚪ ' + r.bl + ' sans réponse</p>' +
      '<p class="muted small">Temps utilisé : ' + dur + ' min sur ' + UV2_MIN + '</p></div>' +
      '<h2 class="h2">📚 Note par matière</h2><div class="card"><table class="tbl"><tr><th>Matière</th><th>✅</th><th>❌</th><th>⚪</th><th>Points</th></tr>' + per.map(function (o) {
        return '<tr><td>' + subj(o.m.subj).icon + ' ' + esc(o.m.nom) + '</td><td class="num-c">' + o.ok + '</td><td class="num-c">' + o.ko + '</td><td class="num-c">' + o.bl + '</td><td class="num-c"><b>' + fr(o.pts) + '</b> / ' + o.n + '</td></tr>';
      }).join('') + '</table></div>' +
      (faible ? '<a class="card review-cta" href="#/uv2/fiche/' + faible.m.id + '"><span class="big">🧠</span><span><b>À revoir en priorité : ' + esc(faible.m.nom) + '</b><br>Ouvre la fiche mémoire UV2 de cette matière</span><span class="chev">›</span></a>' : '') +
      '<h2 class="h2">🧾 Correction complète</h2>' + corr +
      '<div class="row-actions center">' +
        (r.ko + r.bl ? '<button class="btn primary" data-action="redo-wrong">🔁 Refaire mes erreurs et oublis (' + (r.ko + r.bl) + ')</button>' : '') +
        '<button class="btn" data-action="uv2-redo">↻ Refaire la même épreuve</button>' +
        '<a class="btn ghost" href="#/uv2">📝 Autres épreuves UV2</a>' +
      '</div></section>';
  }
  function viewUV2() {
    var hist = function (t) {
      var h = store.sessions.filter(function (x) { return x.title === t && x.note !== undefined; });
      return h.length ? '<span class="muted small">Dernière note : <b>' + fr(h[0].note) + ' / ' + h[0].total + '</b> (' + fmtDate(h[0].d) + ')</span>' : '<span class="muted small">Pas encore passé</span>';
    };
    var card = function (k, ic, sub) {
      return '<button class="card subj uv2-ep" data-action="uv2-start" data-k="' + k + '"><span class="subj-ic">' + ic + '</span><span class="subj-body"><b>' + esc(uv2Title(k)) + '</b><span class="muted small">' + sub + '</span>' + (k >= 0 ? hist(uv2Title(k)) : '') + '</span><span class="chev">›</span></button>';
    };
    var blancs = [];
    for (var k = 1; k <= UV2_BLANCS; k++) blancs.push(card(k, '🎯', '60 questions : celles qui tombent le plus + variantes'));
    return '<h1 class="h1">📝 Test UV2</h1>' +
      '<div class="card pad uv2-consignes"><h2 class="h2">📋 Comme le jour de l’épreuve</h2><ul>' +
        '<li><b>60 questions</b> : DSFT, freinage pneumatique, hydraulique, motorisation, équipement électrique, électricité générale (10 par matière).</li>' +
        '<li><b>2 heures</b> ; une seule bonne réponse par question (A, B ou C).</li>' +
        '<li>Barème : bonne réponse <b>+ 1</b> · mauvaise <b>− 0,5</b> · pas de réponse <b>0</b>. Si tu hésites vraiment, laisse vide.</li>' +
        '<li>Tu peux passer une question et y revenir, et changer ta réponse tant que tu n’as pas terminé. La correction complète s’affiche à la fin.</li></ul>' +
        '<label class="chk"><input type="checkbox" id="uv2-train"> Mode entraînement : correction après chaque question, sans chrono</label></div>' +
      '<h2 class="h2">🗂️ Choisis ton épreuve</h2><div class="subject-grid">' +
        card(0, '📄', 'Le sujet transmis, question par question, dans l’ordre') + blancs.join('') + card(-1, '🎲', 'Un nouveau tirage à chaque fois') + '</div>' +
      '<h2 class="h2">🧠 Fiches mémoire UV2</h2><p class="muted">Une fiche par matière, avec les schémas à connaître et les questions qui reviennent.</p>' +
      '<div class="subject-grid">' + UV2_MATS.map(function (m) {
        var s = subj(m.subj);
        return '<a class="card subj" href="#/uv2/fiche/' + m.id + '" style="--c:' + s.color + '"><span class="subj-ic">' + s.icon + '</span><span class="subj-body"><b>' + esc(m.nom) + '</b><span class="muted small">Fiche mémoire illustrée</span></span><span class="chev">›</span></a>';
      }).join('') + '</div>' +
      '<h2 class="h2">🎯 Entraînement par matière</h2><div class="home-foot">' + UV2_MATS.map(function (m) {
        return '<button class="card mini" data-action="uv2-mat" data-m="' + m.id + '">' + subj(m.subj).icon + ' ' + esc(m.nom) + ' (' + (uv2Orig(m).length + uv2Autres(m).length) + ')</button>';
      }).join('') + '</div>' +
      '<div class="home-foot"><a class="card mini" href="#/fiche/uv2">🎯 Fiche spéciale UV2 (corrigé du dossier)</a></div>';
  }
  function viewUV2Fiche(id) {
    var m = uv2Mat(id), F = (REV.uv2Fiches || {})[id];
    if (!m || !F) return viewUV2();
    var s = subj(m.subj);
    return crumbs([['#/uv2', 'Test UV2'], [null, 'Fiche mémoire : ' + m.nom]]) +
      '<article class="lesson fiche uv2-fiche" style="--c:' + s.color + '"><h1 class="h1">' + s.icon + ' Fiche mémoire UV2 — ' + esc(m.nom) + '</h1>' +
      (F.intro ? '<p class="muted">' + F.intro + '</p>' : '') +
      '<nav class="chips">' + F.blocs.map(function (b, j) { return '<a class="chip" href="#/uv2/fiche/' + id + '#u-' + j + '">' + esc(b.t) + '</a>'; }).join('') + '</nav>' +
      F.blocs.map(function (b, j) {
        return '<section id="u-' + j + '" class="fiche-sec uv2-bloc"><h2 class="h2">' + esc(b.t) + '</h2>' +
          (b.img ? '<div class="fiche-figs">' + b.img.map(function (im) { return fig({ src: im[0], cap: im[1] }); }).join('') + '</div>' : '') +
          (b.html || '') +
          (b.pts ? '<div class="box retenir"><b>★ À retenir</b><ul>' + b.pts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul></div>' : '') +
          (b.qr ? '<div class="box methode"><b>❓ La question qui tombe</b><ul>' + b.qr.map(function (p) { return '<li>' + p[0] + ' → <b>' + p[1] + '</b></li>'; }).join('') + '</ul></div>' : '') +
          '</section>';
      }).join('') +
      '</article><div class="row-actions sticky-actions"><button class="btn primary" data-action="uv2-mat" data-m="' + id + '">🎯 Questions UV2 ' + esc(m.nom) + '</button><button class="btn" data-action="print">🖨️ Imprimer / PDF</button></div>';
  }

  /* ---------- Actions ---------- */
  // Exercices de calcul à compléter (cases data-v = valeur attendue) : vérifier, montrer la correction, recommencer
  function calcEx(box, a) {
    if (!box) return;
    var ins = box.querySelectorAll('input.cx-in'), ok = 0, filled = 0;
    Array.prototype.forEach.call(ins, function (inp) {
      var want = +inp.getAttribute('data-v'), tol = Math.max(+(inp.getAttribute('data-tol') || 0), Math.abs(want) * 0.01, 0.006);
      inp.classList.remove('good', 'bad');
      if (a === 'calc-reset') { inp.value = ''; return; }
      if (a === 'calc-show') { inp.value = String(inp.getAttribute('data-show') || want).replace('.', ','); inp.classList.add('good'); return; }
      var v = parseFloat(inp.value.replace(/\s/g, '').replace(',', '.'));
      if (inp.value.trim() === '' || isNaN(v)) return;
      filled++;
      var good = Math.abs(v - want) <= tol; if (good) ok++;
      inp.classList.add(good ? 'good' : 'bad');
    });
    var res = box.querySelector('.cx-res'), sol = box.querySelector('.cx-sol');
    if (a === 'calc-reset') { res.textContent = ''; sol.hidden = true; return; }
    if (a === 'calc-show') { res.textContent = '📖 Correction affichée : lis le pourquoi de chaque calcul ci-dessous.'; sol.hidden = false; return; }
    res.textContent = filled < ins.length ? ok + ' / ' + filled + ' cases justes — il reste ' + (ins.length - filled) + ' case' + (ins.length - filled > 1 ? 's' : '') + ' vide' + (ins.length - filled > 1 ? 's' : '') + '.'
      : ok === ins.length ? '✅ Tout est juste ! Lis quand même les explications.' : '❌ ' + (ins.length - ok) + ' erreur' + (ins.length - ok > 1 ? 's' : '') + ' (en rouge). Corrige, ou affiche la correction.';
    if (filled === ins.length) sol.hidden = false;
  }

  function onClick(e) {
    var el = e.target.closest('[data-action]');
    if (!el || el.tagName === 'INPUT') return;
    var a = el.getAttribute('data-action');
    if (a === 'calc-check' || a === 'calc-show' || a === 'calc-reset') return calcEx(el.closest('.calc-ex'), a);
    if (a === 'answer') answer(+el.getAttribute('data-k'));
    else if (a === 'validate') answer(-1);
    else if (a === 'next') next();
    else if (a === 'quit') {
      if (confirm('Arrêter ce QCM ? Les réponses déjà données restent comptées.')) {
        if (session.answers.filter(Boolean).length) { session.qids = session.qids.slice(0, session.answers.length); session.perm = session.perm.slice(0, session.answers.length); session.i = session.qids.length; finishSession(); saveSession(); go('#/bilan'); }
        else { session = null; saveSession(); go('#/'); }
      }
    }
    else if (a === 'redo-lesson-errors') {
      var rk = el.getAttribute('data-key'), rl = REV.lessonById[rk];
      startSession({ mode: 'revision', title: 'À revoir : ' + rl.title, subject: rl.subject, questions: arrange(lessonQuestions(rk).filter(needsReview)) });
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
    else if (a === 'uv2-start') { var tr = document.getElementById('uv2-train'); startExam(+el.getAttribute('data-k'), tr && tr.checked); }
    else if (a === 'uv2-redo') { startExam(session.k, false, session.qids.map(function (id) { return REV.qById[id]; }), session.mats, session.title); }
    else if (a === 'uv2-mat') {
      var mm = uv2Mat(el.getAttribute('data-m'));
      var list2 = uv2Orig(mm).concat(shuffle(uv2Autres(mm)));
      startSession({ mode: 'uv2', title: 'UV2 — ' + mm.nom, questions: list2 });
    }
    else if (a === 'exam-next') { if (session.i + 1 < session.qids.length) { session.i++; saveSession(); render(); } }
    else if (a === 'exam-prev') { if (session.i > 0) { session.i--; saveSession(); render(); } }
    else if (a === 'exam-go') { session.i = +el.getAttribute('data-i'); saveSession(); render(); }
    else if (a === 'exam-clear') { session.sel[session.i] = null; saveSession(); render(); }
    else if (a === 'exam-finish') {
      var vides = session.qids.length - session.sel.filter(function (v) { return v != null; }).length;
      if (confirm(vides ? 'Il reste ' + vides + ' question' + (vides > 1 ? 's' : '') + ' sans réponse (0 point). Terminer l’épreuve ?' : 'Terminer l’épreuve et voir ta note ?')) finishExam();
    }
    else if (a === 'exam-quit') { if (confirm('Abandonner cette épreuve ? Elle ne sera pas notée.')) { session = null; saveSession(); go('#/uv2'); } }
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
    initSearchBar();
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
