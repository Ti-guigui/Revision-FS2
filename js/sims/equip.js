/* Simulateurs : équipement électrique (démarreur, commande RCO d’un actionneur) */
(function () {
  var F = SIMS.fmt;
  function coil(x1, x2, y, n) {
    var d = 'M' + x1 + ' ' + y, s = (x2 - x1) / n;
    for (var i = 0; i < n; i++) d += ' a' + (s / 2) + ' ' + (s / 2) + ' 0 0 1 ' + s + ' 0';
    return d;
  }
  function gnd(x, y) { return '<path class="ink" d="M' + x + ' ' + y + ' v8 M' + (x - 14) + ' ' + (y + 8) + ' h28 M' + (x - 9) + ' ' + (y + 14) + ' h18 M' + (x - 4) + ' ' + (y + 20) + ' h8"/>'; }

  /* ---------------- 1. Le démarreur : bobine d’appel, bobine de maintien ---------------- */
  var PH = [
    { t: 'Repos', x: 'Clé au repos : pas de courant dans le solénoïde. Le ressort de rappel tient le noyau, le lanceur est dégagé de la couronne.' },
    { t: 'Appel', x: 'Clé sur démarrage : le + arrive à <b>EXC (50)</b>. Les <b>deux bobines</b> sont alimentées. La <b>bobine d’appel</b> (faible résistance, gros courant) est <b>en série avec le moteur</b> : le moteur tourne lentement, ce qui aide le pignon à s’engrener. Le noyau est attiré et pousse la fourchette.' },
    { t: 'Maintien', x: 'Fin de course du noyau : le <b>contacteur de puissance</b> se ferme entre <b>30 (+DEM)</b> et le moteur : plein courant, le moteur lance le moteur thermique. La bobine d’appel a le + des deux côtés : elle est <b>court-circuitée</b>. Seule la <b>bobine de maintien</b> garde le noyau.' },
    { t: 'Retour', x: 'On relâche la clé : le courant de maintien passe un instant <b>à l’envers dans la bobine d’appel</b> : les deux champs s’annulent. Le <b>ressort de rappel</b> ramène le noyau, le contact s’ouvre, le lanceur se dégage, le frein d’induit arrête le moteur.' }
  ];
  SIMS.add({
    id: 'equip-demarreur', subj: 'equip', icon: '🔑', title: 'Le démarreur : bobine d’appel et bobine de maintien',
    desc: 'Le cycle du solénoïde quand on tourne puis relâche la clé : appel, maintien, retour.',
    lessons: ['equip/demarreur', 'equip/qcm-demarreur', 'elec/moto'],
    viewBox: '0 0 820 450',
    legend: [['cur', 'Courant'], ['cur0', 'Pas de courant']],
    note: 'Valeurs du cours : 24 V, au moins 19,2 V au lancement (80 %), 18 V = batteries en cause ; appel ≈ 2 Ω, maintien ≈ 4 Ω. Courant du moteur et tension au lancement avec de bonnes batteries : valeurs d’exemple.',
    svg:
      // voltmètre aux bornes de la batterie
      '<path class="ink" d="M120 250 H180 V243 M180 273 V282 H90" style="stroke-dasharray:4 4"/><circle class="meter" cx="180" cy="258" r="15"/><text x="180" y="263" text-anchor="middle" class="t-b">V</text>' +
      '<text id="tUb" x="202" y="263" class="t-b">24 V</text>' +
      // batterie
      '<path class="ink" d="M60 250 H120" style="stroke-width:3"/><path class="ink" d="M74 264 H106" style="stroke-width:7"/><text x="130" y="258" class="t-s">+</text><text x="40" y="300" class="t-s">Batterie 24 V</text>' +
      '<path class="ink" d="M90 264 V400"/>' + gnd(90, 400) +
      // câble de puissance vers 30
      '<path class="pipe" id="p30" d="M90 250 V60 H600 V128"/>' +
      '<text x="608" y="96" class="t-s">30 (+DEM)</text>' +
      // clé de contact → EXC
      '<path class="pipe thin" id="pK" d="M90 140 H150"/>' +
      '<circle class="solid" cx="150" cy="140" r="4"/><circle class="solid" cx="214" cy="140" r="4"/>' +
      '<g id="key" style="transition:transform .25s;transform-origin:150px 140px"><path class="ink" d="M150 140 L212 140" style="stroke-width:3.5"/></g><text x="182" y="122" text-anchor="middle" class="t-s">Clé</text>' +
      '<path class="pipe thin" id="pExc" d="M214 140 H300 V170"/><text x="232" y="164" class="t-s">EXC (50)</text>' +
      // solénoïde
      '<rect class="ink" x="300" y="150" width="230" height="100" rx="8"/>' +
      '<path class="ink" d="M300 172 H318 M308 172 V232 H318"/>' +
      '<path class="pipe thin" id="cA" d="' + coil(318, 498, 172, 9) + '"/><text x="318" y="146" class="t-s">Bobine d’appel</text>' +
      '<path class="pipe thin" id="cM" d="' + coil(318, 498, 232, 9) + '"/><text x="318" y="270" class="t-s">Bobine de maintien</text>' +
      '<g id="core"><rect class="ink-f" x="330" y="190" width="120" height="24" rx="4"/><text x="390" y="207" text-anchor="middle" class="t-s">noyau</text>' +
        '<path class="ink" d="M450 202 H540 M540 132 V272" style="stroke-width:5"/></g>' +
      '<rect class="solid" x="594" y="128" width="12" height="16"/><rect class="solid" x="594" y="258" width="12" height="16"/>' +
      // appel en série avec le moteur, maintien à la masse
      '<path class="pipe thin" id="pApp" d="M498 172 H520 V296 H600"/>' +
      '<path class="pipe thin" id="pMas" d="M498 232 H510 V420"/>' + gnd(510, 420) +
      '<path class="pipe" id="pC" d="M600 274 V350 H406"/><text x="612" y="300" class="t-s">vers moteur</text>' +
      // moteur et lanceur
      '<circle class="ink-f" cx="370" cy="350" r="36"/><g id="rot"><path class="ink" d="M370 320 V380 M340 350 H400" style="stroke-width:4"/></g><text x="412" y="396" class="t-s">Moteur</text>' +
      '<path class="pipe thin" id="pMg" d="M370 386 V420"/>' + gnd(370, 420) +
      '<path class="ink" d="M334 350 H200" style="stroke-width:5"/>' +
      '<g id="pin"><rect class="ink-f" x="196" y="326" width="28" height="48" rx="3"/><path class="ink" d="M200 332 H220 M200 342 H220 M200 352 H220 M200 362 H220"/></g>' +
      '<path class="ink" d="M150 300 A90 90 0 0 0 150 400" style="stroke-width:10;stroke-dasharray:4 4"/><text x="60" y="440" class="t-s">Couronne du volant</text>' +
      '<g id="fork"><path class="ink" d="M330 202 L270 290 L222 330" style="stroke-width:4"/><circle class="solid" cx="270" cy="290" r="5"/></g><text x="282" y="290" class="t-s">fourchette</text>' +
      '<text id="tPh" x="680" y="200" class="t-b">REPOS</text>',
    init: { cle: false, ph: 0, s: 0, t: 0, auto: true, ang: 0, bat: 'ok' },
    keep: ['bat'],
    controls: [{ key: 'cle', type: 'toggle', label: 'Clé de contact', on: 'Démarrage', off: 'Repos' },
      { key: 'bat', type: 'seg', label: 'État des batteries', options: [['ok', 'Bonnes'], ['faible', 'Faibles']] }],
    compute: function (st) {
      var p = PH[st.ph], ph = st.ph, ok = st.bat === 'ok', k3 = ph === 3 && st.s > 0.95; // retour : courant tant que le contact 30 est encore fermé
      var d = { u: ph === 2 ? (ok ? 21 : 18) : ph === 1 ? (ok ? 23 : 21) : (ok ? 24 : 22.5) };
      d.ia = ph === 1 ? d.u / 2 : k3 ? d.u / 6 : 0;    // bobine d’appel ≈ 2 Ω (au retour : en série avec le maintien, 2 + 4 Ω)
      d.im = ph === 3 ? d.ia : ph ? d.u / 4 : 0;            // bobine de maintien ≈ 4 Ω
      d.imot = ph === 2 ? (ok ? 350 : 250) : ph === 1 ? d.ia : 0; // valeur d’exemple
      var bad = ph === 2 && d.u < 19.2;
      d.text = p.x + (ph === 2 ? (bad ? ' <b style="color:var(--bad)">Au lancement, la tension tombe à 18 V : sous le minimum de 19,2 V (80 % de 24 V), les batteries sont en cause.</b>'
        : ' Au lancement, la tension reste à ' + F(d.u) + ' V : au-dessus du minimum de <b>19,2 V</b> (80 % de 24 V), les batteries sont bonnes.') : '');
      d.readouts = [['Phase', p.t], ['Tension batterie', F(d.u, d.u % 1 ? 1 : 0) + ' V', bad ? 'hot' : ph === 2 ? 'ok' : ''],
        ['Bobine d’appel', d.ia ? F(d.ia, 1) + ' A' + (ph === 3 ? ' (inversé)' : '') : '0 A', d.ia ? 'hot' : ''], ['Bobine de maintien', F(d.im, 1) + ' A'],
        ['Moteur (exemple)', k3 ? 'alimenté jusqu’à l’ouverture du contact' : d.imot ? '≈ ' + F(d.imot, d.imot % 1 ? 1 : 0) + ' A' : '0 A'], ['Contacteur 30 → moteur', ph === 2 || k3 ? 'fermé' : 'ouvert', ph === 2 || k3 ? 'ok' : '']];
      return d;
    },
    tick: function (st, dt) {
      var ch = false;
      if (st.auto) {
        if (st.cle && st.ph === 0) { st.ph = 1; st.t = 0; ch = true; }
        else if (st.cle && st.ph === 1 && (st.t += dt) > 1.2) { st.ph = 2; ch = true; }
        else if (!st.cle && (st.ph === 1 || st.ph === 2)) { st.ph = 3; st.t = 0; ch = true; }
        else if (!st.cle && st.ph === 3 && (st.t += dt) > 1) { st.ph = 0; ch = true; }
      }
      // au retour, le noyau reste un instant en place (contact encore fermé) avant que le ressort le ramène
      var target = st.ph === 1 || st.ph === 2 || (st.ph === 3 && (!st.auto || st.t < 0.5)) ? 1 : 0;
      if (Math.abs(st.s - target) > 0.001) { st.s += Math.sign(target - st.s) * Math.min(Math.abs(target - st.s), dt * (target ? 0.9 : 1.6)); ch = true; }
      var sp = st.ph === 1 ? 120 : st.ph === 2 ? 900 : 0;
      if (sp) { st.ang = (st.ang + sp * dt) % 360; ch = true; }
      return ch;
    },
    draw: function (a, st, d) {
      var ph = st.ph, s = st.s, A = function (i) { return F(i, i % 1 ? 1 : 0) + ' A'; };
      a.text('tUb', F(d.u, d.u % 1 ? 1 : 0) + ' V');
      if (ph === 1 || ph === 2) a.tag('pExc', A(d.ia + d.im), { at: 0.45 });
      if (d.ia) a.tag('pApp', A(d.ia), { at: 0.85 });
      if (d.im) a.tag('pMas', A(d.im), { at: 0.9, dx: -26 });
      if (ph === 2) { a.tag('p30', '≈ ' + d.imot + ' A', { at: 0.5 }); a.tag('pC', '≈ ' + d.imot + ' A', { at: 0.7 }); }
      a.q('key').style.transform = st.cle || ph === 1 || ph === 2 ? '' : 'rotate(-30deg)';
      a.line('pK', ph === 1 || ph === 2 ? 'cur' : 'cur0', ph === 1 || ph === 2 ? 1 : 0);
      a.line('pExc', ph === 1 || ph === 2 ? 'cur' : 'cur0', ph === 1 || ph === 2 ? 1 : 0);
      var k3 = ph === 3 && s > 0.95, m = ph === 1 || ph === 2 || k3; // retour : courant tant que le contact 30 est encore fermé
      a.line('cA', ph === 1 || k3 ? 'cur' : 'cur0', ph === 1 ? 1 : k3 ? -1 : 0);
      a.line('cM', m ? 'cur' : 'cur0', m ? 1 : 0);
      a.line('pMas', m ? 'cur' : 'cur0', m ? 1 : 0);
      a.line('pApp', ph === 1 || k3 ? 'cur' : 'cur0', ph === 1 ? 1 : k3 ? -1 : 0);
      a.line('p30', ph === 2 || k3 ? 'cur' : 'cur0', ph === 2 || k3 ? 1 : 0);
      a.line('pC', m ? 'cur' : 'cur0', m ? 1 : 0);
      a.line('pMg', m ? 'cur' : 'cur0', m ? 1 : 0);
      a.move('core', s * 56, 0);
      a.move('pin', -s * 40, 0);
      a.attr('fork', 'transform', 'rotate(' + (s * 25) + ' 270 290)');
      a.move('rot', 0, 0, st.ang, 370, 350);
      a.text('tPh', PH[ph].t.toUpperCase());
    },
    steps: [
      { title: PH[0].t, text: PH[0].x, set: { auto: false, ph: 0, s: 0 } },
      { title: PH[1].t, text: PH[1].x, set: { auto: false, cle: true, ph: 1, s: 0 } },
      { title: PH[2].t, text: PH[2].x, set: { auto: false, cle: true, ph: 2, s: 1, bat: 'ok' } },
      { title: 'Batteries faibles', text: 'Même phase avec des batteries fatiguées : au lancement la tension tombe à <b>18 V</b>, sous le minimum de <b>19,2 V</b> (80 % de 24 V). Ce n’est pas le démarreur : <b>les batteries sont en cause</b>.', set: { auto: false, cle: true, ph: 2, s: 1, bat: 'faible' } },
      { title: PH[3].t, text: PH[3].x, set: { auto: false, cle: false, ph: 3, s: 1, bat: 'ok' } },
      { title: 'Retour au repos', text: 'Noyau revenu, lanceur dégagé, contacteur ouvert : le démarreur est prêt pour un nouveau démarrage. <b>Contrôles</b> : appel entre EXC et +DEM (la plus faible), maintien entre EXC et masse (≈ 2 × appel).', set: { auto: false, ph: 0, s: 0 } }
    ]
  });

  /* ---------------- 2. Commande RCO (PWM) d’une électrovanne ---------------- */
  SIMS.add({
    id: 'equip-rco', subj: 'equip', icon: '〰️', title: 'Commande RCO (PWM) d’une électrovanne',
    desc: 'Le calculateur hache la masse : le rapport cyclique règle l’ouverture. Le multimètre ne voit que la tension moyenne.',
    lessons: ['equip/actionneurs', 'equip/capteurs', 'moteur/commonrail', 'moteur/capteurs-cr'],
    viewBox: '0 0 820 420',
    legend: [['cur', 'Courant'], ['cur0', 'Pas de courant']],
    svg:
      '<text x="40" y="44">+24 V permanent</text>' +
      '<path class="pipe thin" id="w1" d="M100 56 V110"/>' +
      '<rect class="ink-f" x="70" y="110" width="60" height="80" rx="6"/><path class="ink" d="' + coil(80, 120, 150, 4).replace('M80 150', 'M80 150') + '" transform="rotate(90 100 150)"/>' +
      '<text x="140" y="146" class="t-s">Électrovanne</text><text x="140" y="162" class="t-s">(bobine)</text>' +
      '<path class="pipe thin" id="w2" d="M100 190 V250"/>' +
      '<rect class="ink-f" x="50" y="250" width="100" height="70" rx="6"/><text x="100" y="278" text-anchor="middle" class="t-s">Calculateur</text><text x="100" y="296" text-anchor="middle" class="t-s">(hache la masse)</text>' +
      '<path class="pipe thin" id="w3" d="M100 320 V370"/>' + gnd(100, 370) +
      '<rect class="ink-f" x="230" y="70" width="70" height="120" rx="6"/><rect id="vz" class="zone z-off" x="236" y="76" width="58" height="108"/>' +
      '<g id="valve"><rect class="solid" x="240" y="150" width="50" height="10"/></g><text x="265" y="210" text-anchor="middle" class="t-s">ouverture</text><text id="tOuv" x="265" y="228" text-anchor="middle" class="t-s">0 %</text>' +
      // oscilloscope
      '<rect class="ink-f" x="340" y="40" width="440" height="220" rx="8"/>' +
      '<path class="ink" d="M360 230 H760 M360 60 V230" style="stroke-width:1;opacity:.5"/>' +
      '<path id="wave" class="pipe thin pl-sig" d=""/><path id="avg" class="ink" d="" style="stroke-dasharray:8 6;stroke:var(--sim-hp)"/>' +
      '<text x="366" y="56" class="t-s">Tension aux bornes de la bobine</text><text id="tAvg" x="770" y="250" text-anchor="end" class="t-s" style="fill:var(--sim-hp)">moyenne</text>' +
      '<circle class="ink-f" cx="440" cy="340" r="40"/><text x="440" y="334" text-anchor="middle" class="t-s">Multimètre</text><text id="tV" x="440" y="356" text-anchor="middle" class="t-b">0 V</text>' +
      '<text x="500" y="330" class="t-s">Le multimètre affiche la</text><text x="500" y="348" class="t-s">tension MOYENNE = RCO × U.</text><text x="500" y="366" class="t-s">L’oscilloscope montre le vrai signal.</text>',
    init: { rco: 40, u: 24, ph: 0 },
    keep: ['ph'],
    alwaysDraw: true,
    controls: [
      { key: 'rco', type: 'range', label: 'Rapport cyclique (RCO)', min: 0, max: 100, step: 5, unit: '%' },
      { key: 'u', type: 'seg', label: 'Tension du réseau', options: [[12, '12 V'], [24, '24 V']] }
    ],
    compute: function (st) {
      var um = st.u * st.rco / 100;
      return { um: um, text: 'Le calculateur ferme la masse <b>' + st.rco + ' %</b> du temps (période fixe). La bobine reçoit en moyenne <b>' + F(st.rco) + ' % × ' + st.u + ' V = ' + F(um, 1) + ' V</b> : l’électrovanne s’ouvre à ' + st.rco + ' %. C’est ce que lit un multimètre ; seul l’oscilloscope montre les créneaux.',
        readouts: [['RCO', st.rco + ' %'], ['Tension moyenne', F(um, 1) + ' V'], ['Créneau', '0 V / ' + st.u + ' V'], ['Ouverture', st.rco + ' %']] };
    },
    tick: function (st, dt) { st.ph = (st.ph + dt * 60) % 100; return true; },
    draw: function (a, st, d) {
      var x0 = 360, w = 400, per = 100, top = 70, bot = 230, r = st.rco / 100, path = '', off = st.ph;
      for (var x = -per; x < w + per; x += per) {
        var xs = x0 + x - off, xe = xs + per * r;
        var c = function (v) { return Math.max(x0, Math.min(x0 + w, v)); };
        if (!path) path = 'M' + c(xs) + ' ' + bot;
        if (r > 0) path += ' L' + c(xs) + ' ' + bot + ' L' + c(xs) + ' ' + top + ' L' + c(xe) + ' ' + top + ' L' + c(xe) + ' ' + bot;
        path += ' L' + c(xs + per) + ' ' + bot;
      }
      a.attr('wave', 'd', path);
      var ya = bot - (bot - top) * r;
      a.attr('avg', 'd', 'M' + x0 + ' ' + ya + ' H' + (x0 + w));
      a.text('tAvg', 'moyenne ' + F(d.um, 1) + ' V'); a.attr('tAvg', 'y', ya - 6);
      a.text('tV', F(d.um, 1) + ' V');
      var on = (off % per) < per * r;
      ['w1', 'w2', 'w3'].forEach(function (w) { a.line(w, r > 0 ? 'cur' : 'cur0', r > 0 ? 1 : 0); });
      a.move('valve', 0, -r * 70);
      a.q('vz').setAttribute('class', 'zone ' + (r > 0 ? 'z-cur' : 'z-off')); a.q('vz').style.opacity = r > 0 ? 0.15 + 0.5 * r : '';
      a.text('tOuv', st.rco + ' %');
    },
    steps: [
      { title: 'RCO 25 %', text: 'Le calculateur ferme la masse 25 % du temps : tension moyenne = 25 % × 24 = <b>6 V</b>, électrovanne peu ouverte.', set: { rco: 25 } },
      { title: 'RCO 50 %', text: 'Créneaux moitié-moitié : <b>12 V</b> de moyenne sous 24 V (le multimètre affiche 12 V).', set: { rco: 50 } },
      { title: 'RCO 75 %', text: 'Masse fermée 75 % du temps : <b>18 V</b> de moyenne, électrovanne très ouverte.', set: { rco: 75 } },
      { title: 'Commande par la masse', text: 'Le <b>+24 V est permanent</b> sur la bobine : c’est la <b>masse</b> que le calculateur hache. Au multimètre on ne lit qu’une moyenne ; pour voir le RCO, il faut un oscilloscope.', set: { rco: 60 } }
    ]
  });
})();
