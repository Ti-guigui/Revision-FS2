/* Espace de calcul — manœuvres de force (interface). */
(function () {
  var MDF = window.MDF, main = document.getElementById('main'), KEY = 'mdf-v1';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var fr = function (s) { return esc(s).replace(/(\d)\.(\d)/g, '$1,$2'); };
  var nf = function (x) { return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
  var DEF = function () { return { fardeau: { poids: '', mode: 'roule', sol: 'route', sens: 'plat', pente: '', trou: false, deplacement: '', vol: '', dens: '1' },
    tracteur: { type: 'treuil', poids: '', sol: 'route', ft: '', beches: false, lc: '', ls: '', cmuCable: '', pm: '', pmUnit: 'kW', v: '5', ponts: 'tous', sensT: 'plat', penteT: '', renverse: false, lg: '5', lbm: '5' },
    stock: { pf: [], cables: [], poulies: [], manilles: [], elingues: [] } }; };
  var st; try { st = JSON.parse(localStorage.getItem(KEY)) || DEF(); } catch (e) { st = DEF(); }
  var out = null; if (!st.stock.elingues) st.stock.elingues = [];
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } }

  function opt(v, list, cur) { return list.map(function (o) { return '<option value="' + o[0] + '"' + (String(cur) === String(o[0]) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join(''); }
  var SOLS = Object.keys(MDF.SOLS).map(function (k) { var s = MDF.SOLS[k]; return [k, s.nom + (k === 'enlise' ? '' : ' (fa ' + s.fa + ' · fr ' + s.fr + ')')]; });
  function inp(path, label, o) {
    o = o || {}; var v = get(path);
    if (o.check) return '<label class="mdf-check"><input type="checkbox" data-p="' + path + '"' + (v ? ' checked' : '') + '> ' + label + '</label>';
    if (o.sel) return '<label class="mdf-f"><span>' + label + '</span><select data-p="' + path + '">' + opt(0, o.sel, v) + '</select></label>';
    return '<label class="mdf-f"><span>' + label + '</span><span class="mdf-in"><input data-p="' + path + '" inputmode="decimal" value="' + esc(v) + '" placeholder="' + (o.ph || '') + '">' + (o.u ? ' <em>' + o.u + '</em>' : '') + '</span>' + (o.h ? '<small>' + o.h + '</small>' : '') + '</label>';
  }
  function get(path) { return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, st); }
  function set(path, v) { var ks = path.split('.'), o = st; ks.slice(0, -1).forEach(function (k) { o = o[k]; }); o[ks[ks.length - 1]] = v; }

  function stockRows(kind) {
    var rows = st.stock[kind];
    var head = { pf: '<tr><th>Point fixe</th><th>Détail</th><th>Résistance</th><th></th></tr>', cables: '<tr><th>Nom</th><th>Longueur (m)</th><th>CMU (daN)</th><th>Qté</th><th></th></tr>', poulies: '<tr><th>Nom</th><th>CMU (daN)</th><th>Qté</th><th></th></tr>', manilles: '<tr><th>Nom</th><th>CMU (daN)</th><th>Qté</th><th></th></tr>', elingues: '<tr><th>Nom</th><th>CMU (daN)</th><th>Qté</th><th></th></tr>' }[kind];
    var body = rows.map(function (r, i) {
      var p = 'stock.' + kind + '.' + i + '.', del = '<td><button type="button" class="btn ghost small" data-a="del" data-k="' + kind + '" data-i="' + i + '">✕</button></td>';
      if (kind === 'pf') {
        var types = [['arbre', 'Arbre']].concat(Object.keys(MDF.PF_TYPES).map(function (k) { return [k, MDF.PF_TYPES[k][0]]; })).concat([['autre', 'Autre (résistance connue)']]);
        var det = r.type === 'arbre' ? '<select data-p="' + p + 'essence">' + opt(0, Object.keys(MDF.ARBRES).map(function (k) { return [k, MDF.ARBRES[k][0] + ' (' + MDF.ARBRES[k][1] + ' daN/dm²)']; }), r.essence) + '</select> Ø <input data-p="' + p + 'd" inputmode="decimal" value="' + esc(r.d || '') + '" style="width:5em"> cm'
          : r.type === 'autre' ? '<input data-p="' + p + 'nom" value="' + esc(r.nom || '') + '" placeholder="Nom"> <input data-p="' + p + 'r" inputmode="decimal" value="' + esc(r.r || '') + '" placeholder="daN" style="width:6em"> daN'
          : (MDF.PF_TYPES[r.type][1] !== MDF.PF_TYPES[r.type][2] ? '<label class="mdf-check"><input type="checkbox" data-p="' + p + 'solDur"' + (r.solDur ? ' checked' : '') + '> sol dur (valeur maxi)</label>' : '');
        return '<tr><td><select data-p="' + p + 'type" data-re="1">' + opt(0, types, r.type) + '</select></td><td>' + det + '</td><td class="num-c"><b>' + nf(MDF.pfResistance(r).r) + ' daN</b></td>' + del + '</tr>';
      }
      var cells = '<td><input data-p="' + p + 'nom" value="' + esc(r.nom || '') + '" placeholder="facultatif"></td>' + (kind === 'cables' ? '<td><input data-p="' + p + 'lc" inputmode="decimal" value="' + esc(r.lc || '') + '" style="width:5em"></td>' : '') + '<td><input data-p="' + p + 'cmu" inputmode="decimal" value="' + esc(r.cmu || '') + '" style="width:6em"></td><td><input data-p="' + p + 'n" inputmode="numeric" value="' + esc(r.n || 1) + '" style="width:3.5em"></td>';
      return '<tr>' + cells + del + '</tr>';
    }).join('');
    return '<div class="tw"><table class="mdf-tab">' + head + body + '</table></div><button type="button" class="btn small" data-a="add" data-k="' + kind + '">➕ Ajouter</button>';
  }

  function form() {
    var f = st.fardeau, t = st.tracteur;
    return '<h1 class="h1">🏗️ Calcul de manœuvre de force</h1>' +
      '<div class="card pad"><p>Entre les données dans l’ordre de la méthode <b>S E N S E S R D</b> du cours <b>AGB 08</b>. Le site calcule R, EMD, le nombre de brins, l’EMT, la sécurité, les efforts sur chaque point fixe, poulie, manille et câble, choisit le matériel dans ton stock, calcule les distances et <b>dessine le mouflage</b>.</p><div class="row-actions"><button type="button" class="btn small" data-a="ex">📘 Charger un exemple</button><button type="button" class="btn small ghost" data-a="reset">🗑️ Tout effacer</button></div></div>' +
      '<h2 class="h2">S — Le fardeau</h2><div class="card pad mdf-grid">' +
      inp('fardeau.poids', 'Poids du fardeau', { u: 'daN', h: 'Documentation du véhicule. 1 t ≈ 1 000 daN.' }) +
      '<div class="mdf-f"><span>Ou estimer (obstacle naturel)</span><span class="mdf-in"><input data-p="fardeau.vol" inputmode="decimal" value="' + esc(f.vol) + '" placeholder="volume" style="width:6em"> m³ × <select data-p="fardeau.dens">' + opt(0, [['1', 'bois 1 t/m³'], ['2.5', 'roche 2,5 t/m³'], ['8', 'métal 8 t/m³']], f.dens) + '</select> <button type="button" class="btn small" data-a="estim">= poids</button></span></div>' +
      inp('fardeau.mode', 'Le fardeau', { sel: [['roule', 'roule (roues ou chenilles)'], ['glisse', 'glisse sur le sol'], ['retournement', 'retournement (R = 2/3 P)'], ['enlise', 'enlisé jusqu’aux essieux (R = 2 P)']] }) +
      inp('fardeau.sol', 'Nature du sol sous le fardeau', { sel: SOLS }) +
      inp('fardeau.sens', 'Terrain', { sel: [['plat', 'horizontal'], ['monte', 'on tire en montée'], ['descend', 'on retient en descente']] }) +
      (f.sens !== 'plat' ? inp('fardeau.pente', 'Pente', { u: '%' }) : '') +
      inp('fardeau.deplacement', 'Déplacement à réaliser', { u: 'm', h: 'Facultatif : pour savoir s’il faudra plusieurs reprises.' }) +
      inp('fardeau.trou', 'Frottement des brins en sommet de pente (fardeau dans un trou) : EMT − 10 %', { check: 1 }) +
      inp('fardeau.longueur', 'Longueur du véhicule / fardeau', { u: 'm', h: 'Pour la zone à évacuer et le schéma.' }) + '</div>' +
      '<h2 class="h2">Ambiance locale</h2><div class="card pad mdf-grid">' +
      inp('fardeau.meteo', 'Météo', { sel: [['sec', 'temps sec'], ['pluie', 'pluie / sol mouillé'], ['gel', 'gel / verglas'], ['neige', 'neige'], ['vent', 'vent fort']] }) +
      inp('fardeau.nuit', 'De nuit', { check: 1 }) + inp('fardeau.blesses', 'Présence de blessés', { check: 1 }) + inp('fardeau.bulle', 'Contexte opérationnel (bulle de sécurité)', { check: 1 }) + '</div>' +
      '<h2 class="h2">E — Le tracteur</h2><div class="card pad mdf-grid">' +
      inp('tracteur.type', 'Effort fourni par', { sel: [['treuil', 'le treuil'], ['crochet', 'la traction au crochet (pas de treuil)']] }) +
      inp('tracteur.poids', 'Poids du tracteur', { u: 'daN' }) + inp('tracteur.sol', 'Sol sous le tracteur', { sel: SOLS.filter(function (s) { return s[0] !== 'enlise'; }) }) +
      (t.type === 'treuil' ? inp('tracteur.ft', 'Force du treuil (valeur MINI constructeur)', { u: 'daN' }) + inp('tracteur.beches', 'Bêches / socs d’ancrage en place', { check: 1 }) + inp('tracteur.lc', 'Longueur du câble de treuil', { u: 'm' }) + inp('tracteur.ls', 'Ls : longueur de sécurité (reste sur le tambour + sur le châssis)', { u: 'm' }) + inp('tracteur.cmuCable', 'CMU du câble de treuil', { u: 'daN' })
        : inp('tracteur.pm', 'Puissance moteur', { u: '<select data-p="tracteur.pmUnit">' + opt(0, [['kW', 'kW'], ['ch', 'ch']], t.pmUnit) + '</select>' }) + inp('tracteur.v', 'Vitesse au plus petit rapport', { u: 'km/h', h: 'Environ 5 km/h.' }) + inp('tracteur.ponts', 'Ponts moteurs', { sel: [['tous', 'tous les ponts moteurs (4×4, 6×6…)'], ['un', 'un seul pont moteur']] }) + inp('tracteur.sensT', 'Terrain du tracteur', { sel: [['plat', 'horizontal'], ['monte', 'en montée'], ['descend', 'en descente']] }) + (t.sensT !== 'plat' ? inp('tracteur.penteT', 'Pente sous le tracteur', { u: '%' }) : '')) +
      inp('tracteur.renverse', 'Traction renversée (à éviter : on perd la force du brin de manœuvre)', { check: 1 }) +
      inp('tracteur.lg', 'Lg : longueur de garant', { u: 'm', h: '5 m, ou adapter au terrain (fardeau en bas d’une pente).' }) +
      (t.renverse ? inp('tracteur.lbm', 'Longueur du brin de manœuvre', { u: 'm' }) : '') + '</div>' +
      '<h2 class="h2">R — Le matériel disponible</h2>' +
      '<div class="card pad"><h3>Points fixes</h3>' + stockRows('pf') + '<p class="small muted">Arbre : R = coefficient × Ø² (en dm). Holmès : valeur mini si le sol est meuble ou douteux. Protéger l’arbre, se fixer au plus près du sol.</p></div>' +
      '<div class="card pad"><h3>Câbles (hors câble du treuil)</h3>' + stockRows('cables') + '</div>' +
      '<div class="card pad"><h3>Poulies</h3>' + stockRows('poulies') + '</div>' +
      '<div class="card pad"><h3>Manilles</h3>' + stockRows('manilles') + '</div>' +
      '<div class="card pad"><h3>Élingues / sangles</h3>' + stockRows('elingues') + '<p class="small muted">Autour d’un arbre ou de la roue de secours, et pour accrocher les poulies / le dormant sur le fardeau (sinon anneau de remorquage de CMU suffisante).</p></div>' +
      '<div class="row-actions"><button type="button" class="btn primary big" data-a="calc">🧮 Calculer la manœuvre</button></div><div id="mdf-out"></div>';
  }

  function card(letter, title, steps, verdict) {
    return '<div class="card pad mdf-step"><h3><span class="mdf-l">' + letter + '</span> ' + title + '</h3><ul>' + steps.map(function (s) { return '<li>' + fr(s) + '</li>'; }).join('') + '</ul>' + (verdict || '') + '</div>';
  }
  function tab(rows, cols) { return '<div class="tw"><table><tr>' + cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '<th>Matériel retenu</th></tr>' + rows.map(function (r) { return '<tr class="' + (r.ok === false ? 'mdf-ko' : '') + '"><td><b>' + esc(r.id) + '</b></td><td>' + esc(r.lieu || r.detail || '') + '</td><td class="num-c">≥ ' + nf(r.load) + ' daN</td><td>' + (r.ok === false ? '❌ ' : r.ok === null ? '⚠️ ' : '✅ ') + esc(r.item) + '</td></tr>'; }).join('') + '</table></div>'; }

  function results() {
    var o = document.getElementById('mdf-out'); if (!o) return;
    if (!out) { o.innerHTML = ''; return; }
    if (out.err) { o.innerHTML = '<div class="box piege"><b>⚠️ ' + esc(out.err) + '</b></div>'; return; }
    var res = out.res, t = st.tracteur, ag = out.ag, mf = res.mouflage;
    var schema = res.factors.length === 1 ? 'Mouflage simple ' + res.n + ' brins' : 'Mouflage composé ' + res.n + ' brins (' + res.factors.join(' × ') + ', le ' + res.factors[0] + ' côté fardeau)';
    var svg = MDF.svg(out, Object.assign({ longueur: st.fardeau.longueur }, t));
    o.innerHTML = '<h2 class="h2">Résultat</h2>' +
      '<div class="box ' + (out.ok ? 'retenir' : 'piege') + '"><b>' + (out.ok ? '✅ Manœuvre réalisable avec ton matériel' : '❌ Manœuvre à revoir : voir les lignes en rouge') + '</b><p>' + schema + (t.renverse ? ', traction renversée' : ', traction droite') + ' · EMT ' + nf(mf.EMT) + ' daN pour R = ' + nf(out.R.R) + ' daN · sécurité ' + String(res.S).replace('.', ',') + ' %.</p></div>' +
      '<div class="card pad mdf-svg"><div class="mdf-scroll">' + svg + '</div><p class="small muted">Fais glisser le schéma sur téléphone, ou télécharge-le pour l’agrandir.</p><div class="row-actions"><button type="button" class="btn small" data-a="dl">⬇️ Télécharger le schéma</button><button type="button" class="btn small ghost" data-a="print">🖨️ Imprimer</button></div></div>' +
      ((out.amb.a.length || out.amb.w.length) ? '<div class="card pad mdf-step"><h3>🌦️ Ambiance locale et terrain</h3><ul>' + out.amb.w.map(function (x) { return '<li class="mdf-warn">⚠️ ' + fr(x) + '</li>'; }).join('') + out.amb.a.map(function (x) { return '<li>' + fr(x) + '</li>'; }).join('') + '</ul></div>' : '') +
      card('S', 'Somme des résistances du fardeau', out.R.steps, '<p><b>R = ' + nf(out.R.R) + ' daN</b></p>') +
      card('E', 'Effort moteur disponible', out.E.steps, '<p><b>EMD = ' + nf(out.E.EMD) + ' daN</b></p>') +
      card('N', 'Nombre de brins', res.nb.steps) +
      card('S', 'Schéma', [res.factors.length === 1 ? (res.n <= 5 ? res.n + ' brins ≤ 5 en liaison directe avec le fardeau : mouflage simple.' : '') : res.n + ' brins > 5 : mouflage composé (on multiplie les brins des mouflages) : ' + res.factors.join(' × ') + '.', t.renverse ? 'Traction renversée : le brin de manœuvre ne compte pas dans le nombre de brins.' : 'Traction droite : le fardeau se déplace dans le même sens que le tracteur.']) +
      card('E', 'Effort moteur total (perte de 10 % par poulie)', mf.steps, '<p><b>EMT = ' + nf(mf.EMT) + ' daN</b></p>') +
      card('S', 'Sécurité (15 % ≤ S ≤ 70 %)', res.steps.slice(res.nb.steps.length)) +
      '<div class="card pad mdf-step"><h3><span class="mdf-l">R</span> Résistance des points fixes et agrès</h3><p class="small">Chaque point fixe, poulie et manille doit résister à la somme des efforts qui passent par lui ; le câble doit avoir une CMU ≥ l’effort du brin le plus chargé.</p>' +
      '<h4>Points fixes</h4>' + tab(ag.pfs, ['PF', 'Détail', 'Effort']) + '<h4>Poulies</h4>' + tab(ag.poulies, ['Poulie', 'Emplacement', 'Effort']) + '<h4>Manilles</h4>' + tab(ag.manilles, ['Manille', 'Emplacement', 'Effort']) + '<h4>Élingues / accrochages</h4>' + tab(ag.elingues, ['Élingue', 'Emplacement', 'Effort']) + '<h4>Câbles</h4>' + tab(ag.cables.map(function (c) { return { id: c.id, lieu: c.treuil ? 'câble du treuil' : 'mouflage ' + c.stage, load: c.load, ok: c.ok, item: c.item }; }), ['Câble', 'Emploi', 'Effort maxi']) + '</div>' +
      card('D', 'Distances', out.D.steps, out.D.err ? '<div class="box piege">' + esc(out.D.err) + '</div>' : '') +
      '<div class="card pad mdf-step"><h3>🦺 Avant de tirer</h3><ul><li>Faire évacuer le polygone défini par les câbles, les points fixes, les tracteurs et le fardeau.</li><li>Mettre le dispositif en légère tension et contrôler chaque agrès avant l’effort.</li><li>Ne pas franchir les câbles en tension ni stationner dans leur prolongement ; se tenir éloigné des points fixes.</li><li>Ne pas frapper à plus de trois sur le même piquet d’un point fixe.</li><li>Gants, lunettes, pas de bagues ni de montres ; ne pas guider un câble en le laissant glisser dans la main.</li><li>Commandements convenus avant la manœuvre (voix, sifflet, geste) ; le chef de manœuvre voit et est vu.</li></ul><p class="small muted">Calcul fait avec la méthode et les coefficients du cours AGB 08 ind. e. La décision finale appartient au chef de manœuvre, après reconnaissance du terrain et contrôle du matériel (état, CMU marquée).</p></div>';
  }

  function render() { main.innerHTML = form(); results(); }
  function num(x) { return String(x).replace(',', '.'); }

  main.addEventListener('input', function (e) {
    var p = e.target.getAttribute('data-p'); if (!p) return;
    set(p, e.target.type === 'checkbox' ? e.target.checked : num(e.target.value)); save();
  });
  main.addEventListener('change', function (e) {
    var p = e.target.getAttribute('data-p'); if (!p) return;
    set(p, e.target.type === 'checkbox' ? e.target.checked : num(e.target.value)); save();
    if (e.target.tagName === 'SELECT' || e.target.type === 'checkbox' || /stock\.pf/.test(p)) { var y = window.scrollY; render(); window.scrollTo(0, y); }
  });
  main.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]'); if (!b) return; var a = b.getAttribute('data-a'), k = b.getAttribute('data-k'), y = window.scrollY;
    if (a === 'add') { st.stock[k].push(k === 'pf' ? { type: 'arbre', essence: 'chene', d: '' } : { nom: '', cmu: '', n: 1, lc: '' }); save(); render(); window.scrollTo(0, y); }
    if (a === 'del') { st.stock[k].splice(+b.getAttribute('data-i'), 1); save(); render(); window.scrollTo(0, y); }
    if (a === 'estim') { var v = +num(st.fardeau.vol), d = +num(st.fardeau.dens); if (v > 0) { st.fardeau.poids = String(Math.round(v * d * 1000)); save(); render(); window.scrollTo(0, y); } }
    if (a === 'reset' && confirm('Effacer toutes les données saisies ?')) { st = DEF(); out = null; save(); render(); }
    if (a === 'ex') { st = example(); out = null; save(); render(); }
    if (a === 'calc') { out = MDF.calculer(clean(st)); results(); var o = document.getElementById('mdf-out'); if (o) o.scrollIntoView({ behavior: 'smooth' }); }
    if (a === 'dl') { var svg = document.querySelector('.mdf-svg svg'); if (svg) { var blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' }), u = URL.createObjectURL(blob), l = document.createElement('a'); l.href = u; l.download = 'mouflage.svg'; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000); } }
    if (a === 'print') window.print();
  });
  function clean(s) { return JSON.parse(JSON.stringify(s)); }
  function example() {
    var d = DEF();
    d.fardeau = { poids: '12000', mode: 'roule', sol: 'meuble', sens: 'monte', pente: '20', trou: false, deplacement: '20', vol: '', dens: '1', longueur: '7', meteo: 'pluie', nuit: false };
    d.tracteur = { type: 'treuil', poids: '14000', sol: 'route', ft: '3500', beches: false, lc: '60', ls: '5', cmuCable: '8000', pm: '', pmUnit: 'kW', v: '5', ponts: 'tous', sensT: 'plat', penteT: '', renverse: false, lg: '5', lbm: '5' };
    d.stock = { pf: [{ type: 'arbre', essence: 'chene', d: '50' }, { type: 'holmes3', solDur: false }, { type: 'arbre', essence: 'sapin', d: '40' }], cables: [{ nom: 'Câble Ø 16', lc: '40', cmu: '5000', n: 2 }], poulies: [{ nom: '', cmu: '8000', n: 4 }, { nom: '', cmu: '12000', n: 2 }], manilles: [{ nom: '', cmu: '8500', n: 6 }, { nom: '', cmu: '12000', n: 3 }], elingues: [{ nom: 'Élingue ronde', cmu: '10000', n: 4 }] };
    return d;
  }
  render();
})();
