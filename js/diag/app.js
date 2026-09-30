/* Coin diagnostic : fiches véhicules (valeurs constructeur, réseau multiplexé), diagnostic guidé pas à pas, historique.
   Les données restent dans le navigateur (localStorage), avec export / import JSON. */
(function () {
  var D = window.DIAG;
  var KEY = 'diag-v1';
  var main = document.getElementById('main');
  var store = load();
  var run = null; // diagnostic en cours

  function load() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.vehicles) return s; } catch (e) { /* stockage indisponible */ } return { vehicles: [] }; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { toast('Enregistrement impossible dans ce navigateur'); } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(t) { var el = document.getElementById('toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('show'); }, 2500); }
  function veh(id) { return store.vehicles.find(function (v) { return v.id === id; }); }
  function vname(v) { return v.nom || ((v.marque || '') + ' ' + (v.modele || '')).trim() || 'Véhicule'; }
  function num(n) { if (n === Infinity || n === null) return '∞'; var r = Math.round(n * 1000) / 1000; return String(r).replace('.', ','); }
  function range(r, u) { if (r.max === Infinity) return '≥ ' + num(r.min) + ' ' + u; if (r.min === 0) return '≤ ' + num(r.max) + ' ' + u; return num(r.min) + ' à ' + num(r.max) + ' ' + u; }
  function parse(s) { s = String(s || '').trim().toLowerCase().replace(',', '.').replace(/\s/g, ''); if (!s) return NaN; if (/^(ol|∞|inf|infini)$/.test(s)) return Infinity; if (/k$/.test(s)) return parseFloat(s) * 1000; if (/m$/.test(s)) return parseFloat(s) * 1e6; return parseFloat(s); }
  function statusOf(v, r) {
    if (v >= r.min && v <= r.max) return { st: 'ok', dir: null };
    var low = v < r.min, ref = low ? r.min : r.max, tol = Math.abs(ref) * 0.1;
    return { st: Math.abs(v - ref) <= tol ? 'warn' : 'bad', dir: low ? 'low' : 'high' };
  }
  function badge(st) { return { ok: '✅ Bon', warn: '⚠️ Limite', bad: '❌ Hors tolérance' }[st] || ''; }

  /* Plage attendue : saisie ponctuelle > valeur constructeur de la fiche > référence */
  function expected(mid) {
    var M = D.MEASURES[mid], v = run && run.vid ? veh(run.vid) : null;
    if (run && run.over[mid]) return { min: run.over[mid].min, max: run.over[mid].max == null ? Infinity : run.over[mid].max, src: 'cons' };
    if (v && v.cons && v.cons[mid]) return { min: v.cons[mid].min, max: v.cons[mid].max == null ? Infinity : v.cons[mid].max, src: 'cons' };
    return { min: M.min, max: M.max, src: 'ref' };
  }
  function noCons(mid) { var v = run && run.vid ? veh(run.vid) : null; return (run && run.nocons[mid]) || (v && v.nocons && v.nocons[mid]); }

  /* ---------- Vues ---------- */
  function viewHome() {
    var mods = Object.keys(D.MODULES).map(function (k) { var m = D.MODULES[k]; return '<a class="card review-cta" href="#/mod/' + k + '"><span class="big">' + m.icon + '</span><span><b>' + esc(m.titre) + '</b><br>' + esc(m.sous) + '</span><span class="chev">›</span></a>'; }).join('');
    var soon = ['⛽ Moteur diesel common rail', '🌫️ Antipollution (EGR, FAP, SCR)', '📐 DSFT : géométrie et usure des pneus', '🛑 Freinage et banc de freinage'].map(function (t) { return '<div class="card pad diag-soon">' + t + ' <span class="muted small">— bientôt</span></div>'; }).join('');
    var vs = store.vehicles.length ? store.vehicles.map(function (v) { return '<a class="card review-cta" href="#/veh/' + v.id + '"><span class="big">🚗</span><span><b>' + esc(vname(v)) + '</b><br><span class="muted small">' + esc([v.moteur, v.annee, v.km ? v.km + ' km' : ''].filter(Boolean).join(' · ')) + ' · ' + (v.hist || []).length + ' diagnostic(s)</span></span><span class="chev">›</span></a>'; }).join('') : '<p class="muted">Aucun véhicule pour l’instant.</p>';
    return '<h1 class="h1">🔧 Coin diagnostic</h1>' +
      '<div class="card pad"><p>Diagnostic guidé pas à pas : à chaque étape, <b>ce qu’on contrôle et pourquoi</b>, <b>comment mesurer</b>, puis tu <b>entres tes mesures</b> et le site te donne le verdict et l’étape suivante.</p><p class="small muted">Les valeurs de référence sont des valeurs types (cours, documentation constructeur publique) : si tu as la <b>valeur constructeur</b> de ton véhicule, saisis-la, elle prime. Tout reste dans ton navigateur.</p></div>' +
      '<a class="card review-cta" href="#/marques"><span class="big">🏷️</span><span><b>Marques et architectures</b><br>' + D.MARQUES.length + ' marques : groupe, boîtier passerelle, réseaux, passerelle sécurisée, pièces partagées</span><span class="chev">›</span></a>' +
      '<h2 class="h2">Modules</h2>' + mods + soon +
      '<h2 class="h2">Mes véhicules</h2>' + vs +
      '<div class="row-actions"><a class="btn primary" href="#/veh/new">➕ Ajouter un véhicule</a><button class="btn" data-a="export">⬇️ Exporter</button><label class="btn">⬆️ Importer<input type="file" accept=".json,application/json" data-a="import" hidden></label></div>';
  }

  function viewNew() {
    var opts = D.CATALOGUE.map(function (c) { return '<option value="' + c.id + '">' + esc(c.marque + ' ' + c.modele + ' (' + c.annees + ')') + '</option>'; }).join('');
    var pre = marque(location.hash.split('?m=')[1]);
    var mq = D.MARQUES.map(function (m) { return '<option value="' + m.id + '"' + (pre && pre.id === m.id ? ' selected' : '') + '>' + esc(m.nom) + '</option>'; }).join('');
    var arch = '<option value="">Automatique (selon la marque)</option>' + Object.keys(D.ARCHI).map(function (k) { return '<option value="' + k + '">' + esc(D.ARCHI[k].nom) + '</option>'; }).join('');
    return crumbs([['Diagnostic', '#/'], ['Nouveau véhicule']]) + '<h1 class="h1">➕ Nouveau véhicule</h1>' +
      '<form class="card pad diag-form" data-a="create">' +
      '<label>Modèle (liste des véhicules les plus courants en France)<select name="cat"><option value="">— Autre véhicule (saisie libre) —</option>' + opts + '</select></label>' +
      '<label>Marque (si autre véhicule)<select name="mq"><option value="">—</option>' + mq + '</select></label>' +
      '<label>Architecture multiplexée (si autre véhicule)<select name="archi">' + arch + '</select></label>' +
      '<label>Nom de la fiche (ex. « Clio de Paul »)<input name="nom" maxlength="60"></label>' +
      '<div class="diag-2"><label>Marque<input name="marque" maxlength="30"></label><label>Modèle<input name="modele" maxlength="40"></label></div>' +
      '<div class="diag-2"><label>Moteur (ex. 1.5 dCi K9K)<input name="moteur" maxlength="60"></label><label>Année<input name="annee" inputmode="numeric" maxlength="4"></label></div>' +
      '<label>Kilométrage<input name="km" inputmode="numeric" maxlength="7"></label>' +
      '<p class="small muted">Si tu choisis un modèle de la liste, l’architecture et les calculateurs probables sont pré-remplis (à vérifier et corriger dans la fiche).</p>' +
      '<button class="btn primary big">Créer la fiche</button></form>';
  }

  function viewVeh(id) {
    var v = veh(id); if (!v) return '<p>Véhicule introuvable.</p><a class="btn" href="#/">Retour</a>';
    var A = D.ARCHI[v.archi] || {};
    var nets = v.reseaux.map(function (r, i) {
      return '<tr><td><input type="checkbox" data-a="net-on" data-i="' + i + '"' + (r.on ? ' checked' : '') + '></td><td>' + esc(r.nom) + '</td><td>' + esc((D.NET_TYPES[r.type] || {}).court || r.type) + '</td></tr>';
    }).join('');
    var ecus = v.ecus.map(function (e, i) {
      return '<tr><td><input type="checkbox" data-a="ecu-on" data-i="' + i + '"' + (e.on ? ' checked' : '') + '></td><td>' + esc(e.nom) + '</td><td>' + esc(e.bus) + '</td><td class="num-c"><input type="checkbox" data-a="ecu-term" data-i="' + i + '"' + (e.term ? ' checked' : '') + ' title="Résistance de terminaison 120 Ω"></td></tr>';
    }).join('');
    var cons = Object.keys(v.cons || {}).map(function (k) { var M = D.MEASURES[k]; return M ? '<tr><td>' + esc(M.label) + '</td><td>' + range({ min: v.cons[k].min, max: v.cons[k].max == null ? Infinity : v.cons[k].max }, M.unit) + '</td><td><button class="btn ghost small" data-a="cons-del" data-k="' + k + '">Retirer</button></td></tr>' : ''; }).join('');
    var hist = (v.hist || []).slice().reverse().map(function (h, j) { var i = v.hist.length - 1 - j; return '<a class="card review-cta" href="#/hist/' + v.id + '/' + i + '"><span class="big">' + (h.v === 'ok' ? '✅' : h.v === 'bad' ? '❌' : '⚠️') + '</span><span><b>' + esc(h.titre) + '</b><br><span class="muted small">' + esc(new Date(h.date).toLocaleString('fr-FR')) + ' · ' + esc(D.MODULES[h.module] ? D.MODULES[h.module].titre : h.module) + '</span></span><span class="chev">›</span></a>'; }).join('');
    return crumbs([['Diagnostic', '#/'], [vname(v)]]) + '<h1 class="h1">🚗 ' + esc(vname(v)) + '</h1>' +
      '<div class="card pad"><p><b>' + esc([v.marque, v.modele].filter(Boolean).join(' ')) + '</b> ' + esc([v.moteur, v.annee, v.km ? v.km + ' km' : ''].filter(Boolean).join(' · ')) + '</p>' +
      (v.moteurs ? '<p class="small">Motorisations fréquentes sur ce modèle (à vérifier) : ' + esc(v.moteurs) + '</p>' : '') +
      '<div class="row-actions">' + Object.keys(D.MODULES).map(function (k) { return '<a class="btn primary" href="#/run/' + k + '/' + v.id + '">' + D.MODULES[k].icon + ' Diagnostic ' + esc(D.MODULES[k].titre.toLowerCase()) + '</a>'; }).join('') + '</div></div>' +
      brandBox(marqueDe(v.marque)) +
      '<h2 class="h2">🔌 Réseau multiplexé</h2><div class="card pad"><p><b>' + esc(A.nom || 'Architecture personnalisée') + '</b>' + (A.passerelle ? ' · passerelle : ' + esc(A.passerelle) : '') + '</p>' + (A.note ? '<p class="small">' + esc(A.note) + '</p>' : '') +
      '<p class="small muted">Pré-rempli d’après l’architecture habituelle du modèle : <b>à vérifier</b> sur le schéma du véhicule. Décoche ce qui n’existe pas, ajoute ce qui manque.</p>' +
      '<h3>Réseaux</h3><div class="tw"><table><tr><th></th><th>Réseau</th><th>Type</th></tr>' + nets + '</table></div>' +
      '<form class="row-actions" data-a="net-add"><input name="nom" placeholder="Nouveau réseau" maxlength="40"><select name="type">' + Object.keys(D.NET_TYPES).map(function (k) { return '<option value="' + k + '">' + esc(D.NET_TYPES[k].court) + '</option>'; }).join('') + '</select><button class="btn small">Ajouter</button></form>' +
      '<h3>Calculateurs</h3><div class="tw"><table><tr><th></th><th>Calculateur</th><th>Réseau</th><th>120 Ω</th></tr>' + ecus + '</table></div>' +
      '<form class="row-actions" data-a="ecu-add"><input name="nom" placeholder="Nouveau calculateur" maxlength="50"><select name="bus">' + v.reseaux.map(function (r) { return '<option>' + esc(r.nom) + '</option>'; }).join('') + '</select><button class="btn small">Ajouter</button></form></div>' +
      '<h2 class="h2">📏 Valeurs constructeur enregistrées</h2><div class="card pad">' + (cons ? '<div class="tw"><table><tr><th>Mesure</th><th>Valeur constructeur</th><th></th></tr>' + cons + '</table></div>' : '<p class="muted">Aucune pour l’instant : pendant un diagnostic, clique sur « J’ai la valeur constructeur » et coche « Enregistrer dans la fiche ».</p>') + '</div>' +
      '<h2 class="h2">🗂️ Historique des diagnostics</h2>' + (hist || '<p class="muted">Aucun diagnostic enregistré.</p>') +
      '<div class="row-actions"><button class="btn danger" data-a="veh-del" data-id="' + v.id + '">Supprimer ce véhicule</button></div>';
  }

  function marque(id) { return D.MARQUES.find(function (m) { return m.id === id; }); }
  function marqueDe(nom) { var n = String(nom || '').toLowerCase(); if (!n) return null; return D.MARQUES.find(function (m) { return m.nom.toLowerCase().split(/[\s/()-]+/).some(function (w) { return w.length > 2 && n.indexOf(w) >= 0; }); }); }
  function brandBox(m) {
    if (!m) return '';
    return '<h2 class="h2">🏷️ ' + esc(m.nom) + ' : à savoir pour le diagnostic</h2><div class="card pad">' +
      '<p><b>Boîtier passerelle / servitude :</b> ' + esc(m.boitier) + '</p>' +
      '<p><b>🔒 Passerelle sécurisée :</b> ' + esc(m.sgw) + '</p>' +
      '<p><b>🔁 Pièces et moteurs partagés :</b> ' + esc(m.partages) + '</p>' +
      '<p class="small muted"><a href="#/marque/' + m.id + '">Voir la fiche de la marque</a></p></div>';
  }
  function viewMarques() {
    var groups = {};
    D.MARQUES.forEach(function (m) { (groups[m.groupe] = groups[m.groupe] || []).push(m); });
    return crumbs([['Diagnostic', '#/'], ['Marques']]) + '<h1 class="h1">🏷️ Marques et architectures</h1>' +
      '<div class="card pad"><p>Les marques rencontrées en atelier en France : groupe, boîtier passerelle, architecture multiplexée probable, passerelle de diagnostic sécurisée et <b>pièces ou moteurs partagés</b> avec d’autres marques. Informations indicatives, <b>à vérifier</b> sur la documentation du véhicule.</p>' +
      '<input class="diag-search" type="search" placeholder="🔎 Rechercher une marque, un modèle…" data-a="filter"></div>' +
      Object.keys(groups).map(function (g) {
        return '<div class="diag-group"><h2 class="h2">' + esc(g) + '</h2>' + groups[g].map(function (m) {
          return '<a class="card review-cta diag-brand" data-s="' + esc((m.nom + ' ' + m.groupe + ' ' + m.modeles + ' ' + m.pays).toLowerCase()) + '" href="#/marque/' + m.id + '"><span><b>' + esc(m.nom) + '</b> <span class="muted small">' + esc(m.pays) + '</span><br><span class="small">' + esc(m.modeles) + '</span></span><span class="chev">›</span></a>';
        }).join('') + '</div>';
      }).join('');
  }
  function viewMarque(id) {
    var m = marque(id); if (!m) return '<p>Marque introuvable.</p>';
    var A = D.ARCHI[m.archi] || {};
    return crumbs([['Diagnostic', '#/'], ['Marques', '#/marques'], [m.nom]]) + '<h1 class="h1">🏷️ ' + esc(m.nom) + '</h1>' +
      '<div class="card pad"><p><b>Pays :</b> ' + esc(m.pays) + ' · <b>Groupe :</b> ' + esc(m.groupe) + '</p><p><b>Modèles courants :</b> ' + esc(m.modeles) + '</p>' +
      '<p><b>Boîtier passerelle / servitude :</b> ' + esc(m.boitier) + '</p><p><b>🔒 Passerelle de diagnostic sécurisée :</b> ' + esc(m.sgw) + '</p>' +
      '<p><b>🔁 Pièces et moteurs partagés :</b> ' + esc(m.partages) + '</p></div>' +
      '<h2 class="h2">🔌 Architecture multiplexée probable</h2><div class="card pad"><p><b>' + esc(A.nom || '') + '</b> · passerelle : ' + esc(A.passerelle || '') + '</p>' +
      '<div class="tw"><table><tr><th>Réseau</th><th>Type</th></tr>' + (A.reseaux || []).map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc((D.NET_TYPES[r[1]] || {}).court || r[1]) + '</td></tr>'; }).join('') + '</table></div>' +
      '<div class="tw"><table><tr><th>Calculateur</th><th>Réseau</th><th>120 Ω</th></tr>' + (A.ecus || []).map(function (e) { return '<tr><td>' + esc(e[0]) + '</td><td>' + esc(e[1]) + '</td><td class="num-c">' + (e[2] ? '✔' : '') + '</td></tr>'; }).join('') + '</table></div>' +
      (A.note ? '<p class="small">' + esc(A.note) + '</p>' : '') + '<p class="small muted">À vérifier sur le schéma du véhicule.</p></div>' +
      (/⚡|électrique|hybride/i.test(m.partages + m.sgw + (A.note || '')) ? '<div class="box piege"><b>⚡ Haute tension</b><p>Sur les véhicules hybrides et électriques, toute intervention sur ou à proximité du circuit haute tension demande une <b>habilitation électrique</b> adaptée (B0L, B1VL, B2VL, BCL…) et la consignation du véhicule.</p></div>' : '') +
      '<div class="row-actions"><a class="btn primary" href="#/veh/new?m=' + m.id + '">➕ Créer un véhicule ' + esc(m.nom) + '</a></div>';
  }

  function viewMod(k) {
    var m = D.MODULES[k]; if (!m) return '<p>Module inconnu.</p>';
    var vs = store.vehicles.map(function (v) { return '<option value="' + v.id + '">' + esc(vname(v)) + '</option>'; }).join('');
    return crumbs([['Diagnostic', '#/'], [m.titre]]) + '<h1 class="h1">' + m.icon + ' ' + esc(m.titre) + '</h1>' +
      '<div class="card pad"><form class="row-actions" data-a="start" data-m="' + k + '"><select name="vid"><option value="">Sans véhicule (valeurs de référence)</option>' + vs + '</select><button class="btn primary">▶️ Commencer le diagnostic</button></form></div>' +
      '<h2 class="h2">📖 Comprendre</h2><div class="card pad lesson">' + m.comprendre + '</div>';
  }

  function viewHist(vid, i) {
    var v = veh(vid), h = v && v.hist[i]; if (!h) return '<p>Introuvable.</p>';
    return crumbs([['Diagnostic', '#/'], [vname(v), '#/veh/' + vid], ['Diagnostic du ' + new Date(h.date).toLocaleDateString('fr-FR')]]) +
      '<h1 class="h1">' + esc(h.titre) + '</h1><p class="muted">' + esc(new Date(h.date).toLocaleString('fr-FR')) + '</p>' + traceHtml(h.trace) +
      '<div class="row-actions"><button class="btn danger" data-a="hist-del" data-v="' + vid + '" data-i="' + i + '">Supprimer</button><a class="btn" href="#/veh/' + vid + '">Retour à la fiche</a></div>';
  }
  function traceHtml(tr) {
    return tr.map(function (t, n) {
      return '<div class="card pad diag-trace ' + (t.v || '') + '"><b>' + (n + 1) + '. ' + esc(t.title) + '</b>' + (t.choice ? '<p>→ ' + esc(t.choice) + '</p>' : '') +
        (t.meas || []).map(function (x) { return '<p class="small">' + esc(x.label) + ' : <b>' + num(x.val) + ' ' + esc(x.unit) + '</b> (attendu ' + esc(x.exp) + ', ' + (x.src === 'cons' ? 'constructeur' : 'référence') + ') ' + badge(x.st) + '</p>'; }).join('') +
        (t.msg ? '<p>' + badge(t.v) + ' ' + esc(t.msg) + '</p>' : '') + '</div>';
    }).join('');
  }

  /* ---------- Diagnostic guidé ---------- */
  function startRun(k, vid) { run = { module: k, vid: vid || '', cur: D.MODULES[k].start, trace: [], over: {}, nocons: {}, res: null, editing: {} }; saveRun(); }
  function saveRun() { try { sessionStorage.setItem('diag-run', JSON.stringify(run)); } catch (e) { /* ignore */ } }
  function loadRun() { try { run = JSON.parse(sessionStorage.getItem('diag-run')); } catch (e) { run = null; } }

  function viewRun() {
    if (!run) return '<p>Aucun diagnostic en cours.</p><a class="btn" href="#/">Retour</a>';
    var m = D.MODULES[run.module], s = m.steps[run.cur], v = run.vid ? veh(run.vid) : null;
    var head = crumbs([['Diagnostic', '#/'], [m.titre, '#/mod/' + run.module], ['Étape ' + (run.trace.length + 1)]]) +
      '<div class="diag-head"><span>' + m.icon + ' ' + esc(m.titre) + (v ? ' · 🚗 ' + esc(vname(v)) : ' · sans véhicule') + '</span>' +
      (run.trace.length ? '<button class="btn ghost small" data-a="back">⬅️ Étape précédente</button>' : '') + '</div>';
    var body = '<div class="q-card"><h1 class="q-text">' + esc(s.title) + '</h1>';
    if (s.type === 'end') {
      body += '<div class="box ' + (s.v === 'ok' ? 'retenir' : 'piege') + '">' + s.html + '</div>' +
        '<h2 class="h2">Récapitulatif</h2>' + traceHtml(run.trace) +
        '<div class="row-actions">' + (v ? '<button class="btn primary" data-a="save-hist">💾 Enregistrer dans l’historique de ' + esc(vname(v)) + '</button>' : '') +
        '<button class="btn" data-a="restart">↻ Nouveau diagnostic</button><a class="btn ghost" href="#/">Accueil diagnostic</a></div></div>';
      return head + body;
    }
    if (s.why) body += '<details class="diag-why" open><summary>💡 Pourquoi et fonctionnement</summary>' + s.why + '</details>';
    if (s.type === 'choice' || s.type === 'network') {
      body += '<div class="choices">' + s.choices.map(function (c, i) {
        var extra = '';
        if (s.type === 'network' && v) {
          var nets = v.reseaux.filter(function (r) { return r.on && r.type === c[2]; });
          extra = nets.length ? '<span class="small muted">Sur ton véhicule : ' + nets.map(function (r) { return esc(r.nom) + ' (' + v.ecus.filter(function (e) { return e.on && e.bus === r.nom; }).map(function (e) { return esc(e.nom); }).join(', ') + ')'; }).join(' ; ') + '</span>' : '<span class="small muted">Aucun réseau de ce type coché sur ta fiche.</span>';
        }
        return '<button class="choice" data-a="choose" data-i="' + i + '"><span class="letter">' + 'ABCDEFGH'[i] + '</span><span class="ct">' + esc(c[0]) + (extra ? '<br>' + extra : '') + '</span></button>';
      }).join('') + '</div></div>';
      return head + body;
    }
    /* mesure */
    if (s.ecusTerm && v) {
      var t = v.ecus.filter(function (e) { return e.on && e.term; });
      body += '<div class="box explic"><b>Calculateurs à terminaison 120 Ω sur ta fiche :</b> ' + (t.length ? t.map(function (e) { return esc(e.nom) + ' (' + esc(e.bus) + ')'; }).join(', ') : 'aucun indiqué — consulte le schéma du véhicule') + '</div>';
    }
    if (s.how) body += '<div class="diag-how"><b>🛠️ Comment mesurer</b>' + s.how + '</div>';
    body += '<form data-a="measure">' + s.measures.map(function (mid) { return measureBlock(mid); }).join('') +
      (run.res ? '' : '<button class="btn primary big">✔️ Valider mes mesures</button>') + '</form>';
    if (run.res) {
      body += '<div class="box ' + (run.res.v === 'ok' ? 'retenir' : run.res.v === 'bad' ? 'piege' : 'explic') + '"><b>' + badge(run.res.v) + '</b><p>' + esc(run.res.msg) + '</p></div>' +
        '<div class="row-actions"><button class="btn primary" data-a="next">➡️ Étape suivante</button><button class="btn ghost" data-a="redo">✏️ Corriger mes mesures</button></div>';
    }
    return head + body + '</div>';
  }

  function measureBlock(mid) {
    var M = D.MEASURES[mid], e = expected(mid), val = run.vals && run.vals[mid];
    var src = e.src === 'cons' ? '<span class="diag-tag cons">Valeur constructeur</span>' : '<span class="diag-tag ref">Valeur de référence</span>';
    var consUi = '';
    if (run.editing[mid]) {
      consUi = '<div class="diag-cons"><b>Valeur constructeur</b><div class="diag-2"><label>Mini<input name="cmin-' + mid + '" inputmode="decimal" value="' + (e.src === 'cons' ? num(e.min) : '') + '"></label><label>Maxi (vide = pas de maxi)<input name="cmax-' + mid + '" inputmode="decimal" value="' + (e.src === 'cons' && e.max !== Infinity ? num(e.max) : '') + '"></label></div>' +
        (run.vid ? '<label class="diag-check"><input type="checkbox" name="csave-' + mid + '" checked> Enregistrer dans la fiche du véhicule</label>' : '') +
        '<div class="row-actions"><button type="button" class="btn small primary" data-a="cons-ok" data-k="' + mid + '">Utiliser cette valeur</button><button type="button" class="btn small ghost" data-a="cons-cancel" data-k="' + mid + '">Annuler</button></div></div>';
    } else if (e.src === 'ref' && !noCons(mid)) {
      consUi = '<div class="row-actions"><button type="button" class="btn small" data-a="cons-edit" data-k="' + mid + '">✏️ J’ai la valeur constructeur</button><button type="button" class="btn small ghost" data-a="cons-no" data-k="' + mid + '">Je n’ai pas la valeur constructeur</button></div>';
    } else if (e.src === 'cons') {
      consUi = '<div class="row-actions"><button type="button" class="btn small ghost" data-a="cons-edit" data-k="' + mid + '">Modifier la valeur constructeur</button></div>';
    } else {
      consUi = '<div class="row-actions"><button type="button" class="btn small ghost" data-a="cons-edit" data-k="' + mid + '">✏️ Finalement, j’ai la valeur constructeur</button></div>';
    }
    var st = val != null && !isNaN(val) ? statusOf(val, e) : null;
    return '<div class="diag-meas' + (st ? ' ' + st.st : '') + '"><label><b>' + esc(M.label) + '</b>' +
      '<span class="diag-exp">Attendu : <b>' + range(e, M.unit) + '</b> ' + src + '</span>' +
      (e.src === 'ref' ? '<span class="small muted">' + esc(M.note) + '</span>' : '') +
      '<span class="diag-in"><input name="v-' + mid + '" inputmode="decimal" autocomplete="off" placeholder="Ta mesure" value="' + (val != null && !isNaN(val) ? num(val) : '') + '"' + (run.res ? ' disabled' : '') + '> ' + esc(M.unit) + (st ? ' <b>' + badge(st.st) + '</b>' : '') + '</span></label>' + consUi + '</div>';
  }

  function crumbs(items) { return '<nav class="crumbs">' + items.map(function (it) { return it[1] ? '<a href="' + it[1] + '">' + esc(it[0]) + '</a>' : '<span>' + esc(it[0]) + '</span>'; }).join(' › ') + '</nav>'; }

  /* ---------- Actions ---------- */
  function createVeh(f) {
    var c = D.CATALOGUE.find(function (x) { return x.id === f.cat.value; });
    var mq = marque(f.mq.value);
    var ak = c ? c.archi : (f.archi.value || (mq ? mq.archi : 'generique')), A = D.ARCHI[ak];
    var v = { id: 'v' + Date.now().toString(36), nom: f.nom.value.trim(), marque: f.marque.value.trim() || (c ? c.marque : (mq ? mq.nom : '')), modele: f.modele.value.trim() || (c ? c.modele : ''),
      moteur: f.moteur.value.trim(), annee: f.annee.value.trim(), km: f.km.value.trim(), archi: ak, moteurs: c ? c.moteurs : '',
      reseaux: A.reseaux.map(function (r) { return { nom: r[0], type: r[1], on: true }; }), ecus: A.ecus.map(function (e) { return { nom: e[0], bus: e[1], term: !!e[2], on: true }; }),
      cons: {}, nocons: {}, hist: [] };
    store.vehicles.push(v); save(); location.hash = '#/veh/' + v.id;
  }
  function decideNow() {
    var s = D.MODULES[run.module].steps[run.cur];
    var res = s.decide(function (mid) { var e = expected(mid), v = run.vals[mid], st = statusOf(v, e); return { v: v, st: st.st, dir: st.dir, min: e.min, max: e.max }; });
    run.res = res; saveRun();
  }

  main.addEventListener('submit', function (ev) {
    var f = ev.target, a = f.getAttribute('data-a'); if (!a) return; ev.preventDefault();
    if (a === 'create') return createVeh(f);
    if (a === 'start') { startRun(f.getAttribute('data-m'), f.vid.value); location.hash = '#/run'; return render(); }
    var v = veh(currentVid());
    if (a === 'net-add' && v && f.nom.value.trim()) { v.reseaux.push({ nom: f.nom.value.trim(), type: f.type.value, on: true }); save(); return render(); }
    if (a === 'ecu-add' && v && f.nom.value.trim()) { v.ecus.push({ nom: f.nom.value.trim(), bus: f.bus.value, term: false, on: true }); save(); return render(); }
    if (a === 'measure') {
      var s = D.MODULES[run.module].steps[run.cur], vals = {}, miss = [];
      s.measures.forEach(function (mid) { var x = parse(f['v-' + mid].value); if (isNaN(x)) miss.push(D.MEASURES[mid].label); vals[mid] = x; });
      if (miss.length) return toast('Entre toutes les mesures (OL = circuit ouvert)');
      run.vals = vals; decideNow(); render();
    }
  });

  main.addEventListener('input', function (ev) {
    if (ev.target.getAttribute('data-a') !== 'filter') return;
    var q = ev.target.value.toLowerCase().trim();
    main.querySelectorAll('.diag-brand').forEach(function (a) { a.style.display = !q || a.getAttribute('data-s').indexOf(q) >= 0 ? '' : 'none'; });
    main.querySelectorAll('.diag-group').forEach(function (g) { g.style.display = g.querySelector('.diag-brand:not([style*="none"])') ? '' : 'none'; });
  });

  main.addEventListener('change', function (ev) {
    var t = ev.target, a = t.getAttribute('data-a'), v = veh(currentVid());
    if (a === 'import') return importFile(t.files[0]);
    if (!v) return;
    var i = +t.getAttribute('data-i');
    if (a === 'net-on') v.reseaux[i].on = t.checked;
    if (a === 'ecu-on') v.ecus[i].on = t.checked;
    if (a === 'ecu-term') v.ecus[i].term = t.checked;
    save();
  });

  main.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-a]'); if (!b || b.tagName === 'FORM' || b.tagName === 'INPUT') return;
    var a = b.getAttribute('data-a'), k = b.getAttribute('data-k');
    if (a === 'export') return exportData();
    if (a === 'choose') {
      var s = D.MODULES[run.module].steps[run.cur], c = s.choices[+b.getAttribute('data-i')];
      run.trace.push({ step: run.cur, title: s.title, choice: c[0] }); run.cur = c[1]; run.res = null; run.vals = null; saveRun(); window.scrollTo(0, 0); return render();
    }
    if (a === 'next') {
      var st = D.MODULES[run.module].steps[run.cur];
      run.trace.push({ step: run.cur, title: st.title, v: run.res.v, msg: run.res.msg, meas: st.measures.map(function (mid) { var e = expected(mid), M = D.MEASURES[mid], x = run.vals[mid]; return { id: mid, label: M.label, unit: M.unit, val: x, exp: range(e, M.unit), src: e.src, st: statusOf(x, e).st }; }) });
      run.cur = run.res.next; run.res = null; run.vals = null; saveRun(); window.scrollTo(0, 0); return render();
    }
    if (a === 'redo') { run.res = null; saveRun(); return render(); }
    if (a === 'back') { var last = run.trace.pop(); run.cur = last.step; run.res = null; run.vals = null; saveRun(); return render(); }
    if (a === 'restart') { startRun(run.module, run.vid); return render(); }
    if (a === 'cons-edit') { keepVals(); run.editing[k] = true; saveRun(); return render(); }
    if (a === 'cons-cancel') { keepVals(); delete run.editing[k]; saveRun(); return render(); }
    if (a === 'cons-no') { keepVals(); var vn = veh(run.vid); if (vn) { vn.nocons = vn.nocons || {}; vn.nocons[k] = true; save(); } else run.nocons[k] = true; saveRun(); toast('Valeur de référence utilisée'); return render(); }
    if (a === 'cons-ok') {
      keepVals();
      var f = b.closest('form'), mn = parse(f['cmin-' + k].value), mxs = f['cmax-' + k].value.trim(), mx = mxs ? parse(mxs) : Infinity;
      if (isNaN(mn) || isNaN(mx) || mx < mn) return toast('Valeur constructeur incorrecte');
      var r = { min: mn, max: mx }, vc = veh(run.vid);
      if (vc && f['csave-' + k] && f['csave-' + k].checked) { vc.cons = vc.cons || {}; vc.cons[k] = r; if (vc.nocons) delete vc.nocons[k]; save(); delete run.over[k]; toast('Enregistrée dans la fiche'); } else run.over[k] = r;
      delete run.editing[k]; if (run.res) decideNow(); saveRun(); return render();
    }
    if (a === 'save-hist') {
      var v = veh(run.vid), end = D.MODULES[run.module].steps[run.cur];
      v.hist = v.hist || []; v.hist.push({ date: Date.now(), module: run.module, titre: end.title, v: end.v, trace: run.trace }); save(); toast('Diagnostic enregistré'); location.hash = '#/veh/' + v.id; return;
    }
    var vv = veh(currentVid());
    if (a === 'cons-del' && vv) { delete vv.cons[k]; save(); return render(); }
    if (a === 'veh-del' && confirm('Supprimer ce véhicule et son historique ?')) { store.vehicles = store.vehicles.filter(function (x) { return x.id !== b.getAttribute('data-id'); }); save(); location.hash = '#/'; return; }
    if (a === 'hist-del' && confirm('Supprimer ce diagnostic ?')) { var hv = veh(b.getAttribute('data-v')); hv.hist.splice(+b.getAttribute('data-i'), 1); save(); location.hash = '#/veh/' + hv.id; }
  });
  function keepVals() { var f = main.querySelector('form[data-a="measure"]'); if (!f || run.res) return; run.vals = run.vals || {}; D.MODULES[run.module].steps[run.cur].measures.forEach(function (mid) { var x = parse(f['v-' + mid].value); if (!isNaN(x)) run.vals[mid] = x; }); }
  function currentVid() { var p = location.hash.split('/'); return p[1] === 'veh' ? p[2] : ''; }

  function exportData() {
    var blob = new Blob([JSON.stringify(store, null, 1)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'diagnostic-vehicules.json'; document.body.appendChild(a); a.click(); a.remove();
  }
  function importFile(file) {
    if (!file) return; var r = new FileReader();
    r.onload = function () { try { var d = JSON.parse(r.result); if (!d.vehicles) throw 0; d.vehicles.forEach(function (v) { if (!veh(v.id)) store.vehicles.push(v); }); save(); toast('Import réussi'); render(); } catch (e) { toast('Fichier invalide'); } };
    r.readAsText(file);
  }

  function render() {
    var p = location.hash.replace(/^#\/?/, '').split('/'), html;
    if (p[0] === 'veh' && /^new/.test(p[1])) html = viewNew();
    else if (p[0] === 'marques') html = viewMarques();
    else if (p[0] === 'marque') html = viewMarque(p[1]);
    else if (p[0] === 'veh') html = viewVeh(p[1]);
    else if (p[0] === 'mod') html = viewMod(p[1]);
    else if (p[0] === 'run' && p[1]) { if (!run || run.module !== p[1] || run.vid !== (p[2] || '')) startRun(p[1], p[2]); history.replaceState(null, '', '#/run'); html = viewRun(); }
    else if (p[0] === 'run') html = viewRun();
    else if (p[0] === 'hist') html = viewHist(p[1], +p[2]);
    else html = viewHome();
    main.innerHTML = html;
  }
  loadRun();
  window.addEventListener('hashchange', function () { render(); window.scrollTo(0, 0); });
  render();
})();
