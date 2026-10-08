/* Simulateur PPLD : treuils + push-pull — la fiche du cours (non coloriée) sert de fond ; les conduites sont colorées par-dessus
   selon la phase (rouge = pression de service, violet = LS, vert = pilotage 25 b, bleu = 0 b). Coordonnées relevées sur la fiche. */
(function () {
  var F = SIMS.fmt;
  var SB = 30, DAD = 320, PIL = 25, QMAX = 100;
  // éléments : clé, titre, régulateur (L/min), LPS ; c = régulateur, k = clapet anti-dérive, s = tiroir (gauche, droite), A / B = conduites, p = pilotage, l = colonne LPS
  var EL = [
    { k: 'pv', t: 'Push-pull vérin', q: 15, lps: {}, c: 497, kk: 518, s: [534, 574], A: 596, B: 614, p: 565, l: 656, rA: 'M596 578 V210 H555', rB: 'M614 595 V172 H555' },
    { k: 'pm', t: 'Push-pull moteur', q: 30, lps: { A: 150, B: 150 }, c: 715, kk: 735, s: [752, 792], A: 814, B: 831, p: 783, l: 872, rA: 'M814 578 V101 H555', rB: 'M831 595 V64 H555' },
    { k: 'dv', t: 'Dévidage', q: 15, lps: { A: 190 }, c: 931, kk: 951, s: [968, 1008], A: 1029, B: 1046, p: 998, l: 1087, rA: 'M1029 578 V310 H988 V150', rB: 'M1046 595 V310 H1090 V150' },
    { k: 'hl', t: 'Halage', q: 28, lps: {}, c: 1147, kk: 1167, s: [1180, 1220], A: 1245, B: 1263, p: 1214, l: 1305, rA: 'M1245 577 V310 H1204 V142', rB: 'M1263 595 V309 H1314 V142' }
  ];
  var BY = {}; EL.forEach(function (e) { BY[e.k] = e; });
  function hit(key, x, y, w, h, rep) { return '<g ' + (rep ? 'data-rep' : 'data-info') + '="' + key + '"><rect class="hit" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8"/></g>'; }

  var REPS = {
    '9': ['Électrovanne de fin de course', 'Couper le mouvement quand une limite est atteinte : le CEC surveille (5 spires mini sur le tambour, secteur de travail, abaques) et coupe l’électrovanne ; le récepteur n’est plus alimenté. Mode dégradé : on peut la forcer.'],
    '10': ['Limiteur de pression à commande pilotée principal', 'Protéger le système : étage principal (30 b) + étage pilote (350 b) = 380 b. Si la régulation de la pompe est défaillante en butée, il laisse passer le débit à la bâche.'],
    '11': ['Électrovanne by-pass RSQ 240', 'Autoriser l’alimentation du distributeur RSQ 240 (grue, treuils, RMU). Elle est pilotée à chaque utilisation (sélecteur sur MANU ou RADIO) : la case passante est alignée sur le circuit, l’huile arrive au RSQ 240. Non pilotée : la case du clapet reste sur la conduite, le RSQ 240 n’est plus alimenté, aucune fonction ne bouge.'],
    '12': ['Distributeur 4/3 LS centre fermé, à action progressive, commande électro-hydraulique proportionnelle et commande manuelle, rappel par ressort', 'Diriger l’huile vers A ou B et doser la vitesse du récepteur ; il renvoie la pression de la charge sur la ligne LS (vers la pompe). Au neutre (centre fermé) le récepteur est isolé.'],
    'x12': ['Élément de distributeur 4/3 LS centre fermé (RSQ 240)', 'Même élément que le repère 12 : diriger l’huile vers A ou B et doser la vitesse ; renvoyer la pression de la charge sur la ligne LS.'],
    red: ['Réducteur de pression 3 voies (25 b)', 'Fournir la pression de pilotage des tiroirs (25 b) et amortir leurs déplacements (pas de pics de pression).'],
    gic: ['Gicleur low flow (section d’entrée)', 'Permettre le passage d’un flux secondaire issu de la pompe (low flow) par la canalisation Load Sensing. La ΔP à ses bornes = tarage du tiroir LS de la pompe (30 b).'],
    comp: ['Régulateur de débit 2 voies réglable avec clapet anti-dérive (full flow)', 'Fixer le débit maxi de l’élément (15, 30 ou 15 L/min) : ΔP régulateur + ΔP distributeur = 30 b, donc le débit (la vitesse) reste constant quelle que soit la charge. Le clapet empêche le retour de l’huile (dérive de la charge).'],
    cad: ['Clapet anti-dérive (low flow)', 'Le low flow le décolle pour transmettre la pression de la charge à la ligne LS ; il empêche l’huile de la ligne LS de revenir dans le récepteur.'],
    lps: ['Limiteur de pression secondaire (LPS)', 'Limiter la pression d’une sortie (A ou B) d’un récepteur. Récepteur en butée : pression de service = LPS + 30 b (le DAD de la pompe n’est pas atteint).'],
    gls: ['Gicleur LS (section de sortie)', 'Vider la ligne LS vers la bâche au neutre : la pompe revient au stand-by (30 b). Bouché : la pression LS reste au neutre, la pompe ne revient pas au stand-by.'],
    pompe: ['Pompe à pistons à cylindrée variable avec régulation LS', 'Stand-by 30 b (ressort du tiroir LS), DAD 320 b : pression de service = LS + 30 b, pression maxi 350 b ; débit maxi 100 L/min.'],
    sel: ['Sélecteur de circuit', 'Transmettre à la pompe la pression LS la plus importante des 2 blocs (RSQ 240 et CETOP).'],
    filt: ['Filtre haute pression', 'Protéger le circuit en sortie de pompe (70 % des pannes = pollution).'],
    ech: ['Échangeur (refroidisseur)', 'Refroidir l’huile de retour avant la bâche.'],
    res: ['Réservoir hydraulique (380 L)', 'Stocker l’huile ; filtre et robinet de vidange en dessous.']
  };

  var PANNES = {
    aucune: 'Aucune panne',
    ev11: 'Électrovanne by-pass RSQ 240 (11) non pilotée',
    fdc: 'Électrovanne de fin de course (9) coupée',
    solB: 'Halage : solénoïde B du distributeur ne commande plus',
    lps: 'LPS 150 b du push-pull moteur (sortie A) détaré à 50 b',
    gls: 'Gicleur LS de la section de sortie bouché',
    red: 'Réducteur de pression 25 b défaillant'
  };


  var svg =
    // fond : la fiche du cours
    '<rect x="0" y="0" width="1625" height="1210" fill="#ffffff"/><image href="img/ppld/vierge-treuil.jpg" x="0" y="0" width="1625" height="1210"/>' +
    '<g transform="translate(-2 3)">' +
    // ---- génération ----
    '<path class="pipe" id="pPump" d="M320 1000 V890"/>' +
    '<path class="pipe" id="pUp1" d="M300 890 H202"/>' +
    '<path class="pipe" id="pUp" d="M168 890 H140 V284 H331 V488 H434 V412"/>' +
    '<path class="pipe thin" id="pCE" d="M345 890 H458"/>' +
    '<path class="pipe thin" id="tRet" d="M296 380 V300 H69 V1119 H537 V1100"/>' +
    '<path class="pipe thin" id="tSuc" d="M320 1066 V1078 H480"/>' +
    // LS : port LS → sélecteur → régulation de la pompe ; LS du bloc CETOP
    '<path class="pipe thin" id="lsExt" d="M456 324 V270 H215 V790 H238" style="stroke-dasharray:14 8"/>' +
    '<path class="pipe thin" id="lsPmp" d="M248 798 V1010 H286" style="stroke-dasharray:14 8"/>' +
    // ---- RSQ 240 : galeries ----
    '<path class="pipe" id="gP" d="M434 412 H1347"/>' +
    '<path class="pipe thin" id="gLS" d="M456 324 V427 H1346"/>' +
    '<path class="pipe thin" id="gLS2" d="M456 427 V584 H1511"/>' +
    '<path class="pipe thin" id="gT" d="M293 380 H1393"/>' +
    '<path class="pipe thin" id="gT2" d="M296 380 V729 H1389 V352"/>' +
    '<path class="pipe thin" id="gT3" d="M1511 584 V300 H1573 V372"/>' +
    '<path class="pipe thin" id="gLSo" d="M456 584 V670 H426 V729"/>' +
    '<path class="pipe thin" id="gPil" d="M376 405 V366 H1475" style="stroke-dasharray:12 8"/>' +
    '<path class="pipe thin" id="gPil2" d="M470 752 H1470" style="stroke-dasharray:12 8"/>' +
    // section d’entrée : réducteur 25 b et limiteur piloté (30 b + 350 b)
    '<path class="pipe thin" id="rIn" d="M377 489 V412"/>' +
    '<path class="pipe thin" id="lim" d="M377 489 V595"/>' +
    // ---- éléments ----
    EL.map(function (e, i) {
      var c = e.c, k = e.kk, l = e.l, s = '';
      s += '<path class="pipe thin" id="cP' + i + '" d="M' + c + ' 412 V458"/>';
      s += '<path class="pipe thin" id="cF' + i + '" d="M' + c + ' 468 V578 H' + e.s[0] + '"/>';
      s += '<path class="pipe thin" id="cK' + i + '" d="M' + k + ' 427 V487"/>';
      s += '<path class="pipe thin" id="cA' + i + '" d="M' + e.s[1] + ' 575 H' + e.A + '"/>';
      s += '<path class="pipe thin" id="cB' + i + '" d="M' + e.s[1] + ' 591 H' + e.B + '"/>';
      s += '<path class="pipe thin" id="rA' + i + '" d="' + e.rA + '"/>';
      s += '<path class="pipe thin" id="rB' + i + '" d="' + e.rB + '"/>';
      s += '<path class="pipe thin" id="pA' + i + '" d="M' + e.p + ' 366 V502" style="stroke-dasharray:12 8"/>';
      s += '<path class="pipe thin" id="pB' + i + '" d="M' + e.p + ' 654 V752" style="stroke-dasharray:12 8"/>';
      if (e.lps.A) s += '<path class="pipe thin" id="lAi' + i + '" d="M' + e.A + ' 575 H' + l + ' V517"/><path class="pipe thin" id="lAo' + i + '" d="M' + l + ' 491 V380"/>';
      if (e.lps.B) s += '<path class="pipe thin" id="lBi' + i + '" d="M' + e.B + ' 591 H' + l + ' V654"/><path class="pipe thin" id="lBo' + i + '" d="M' + l + ' 679 V729"/>';
      // repérage du tiroir actif
      s += '<rect id="hs' + i + '" x="' + (e.s[0] - 8) + '" y="496" width="' + (e.s[1] - e.s[0] + 16) + '" height="164" rx="6" style="fill:rgba(250,204,21,.18);stroke:#f59e0b;stroke-width:3;display:none"/>';
      s += '<text id="ts' + i + '" x="' + ((e.s[0] + e.s[1]) / 2) + '" y="690" text-anchor="middle" class="t-b" style="fill:#b45309;display:none"></text>';
      return s;
    }).join('') +
    // électrovannes de fin de course (9) et by-pass RSQ 240 (11) : état
    '<rect id="hEV9a" x="1146" y="216" width="80" height="44" rx="5" style="fill:rgba(220,38,38,.18);stroke:#dc2626;stroke-width:3;display:none"/>' +
    '<rect id="hEV9b" x="1292" y="216" width="80" height="44" rx="5" style="fill:rgba(220,38,38,.18);stroke:#dc2626;stroke-width:3;display:none"/>' +
    '<text id="tEV9" x="1330" y="290" text-anchor="middle" class="t-b" style="fill:#dc2626;display:none">EV coupées</text>' +
    '<rect id="hEV11" x="158" y="806" width="66" height="138" rx="6" style="fill:rgba(22,163,74,.14);stroke:#16a34a;stroke-width:3"/>' +
    '<text id="tEV11" x="80" y="962" class="t-b" style="fill:#16a34a">pilotée</text>' +
    '</g><rect x="163" y="812" width="44" height="122" fill="#ffffff"/>' +
    '<g id="ev11" style="transition:transform .4s ease">' +
      '<path d="M178 818 H190 M184 818 V827" style="stroke:#111;stroke-width:3;fill:none"/><rect x="170" y="827" width="15" height="18" style="fill:#fff;stroke:#111;stroke-width:2.6"/><path d="M171 828 L184 844" style="stroke:#111;stroke-width:2"/>' +
      '<rect x="170" y="845" width="29" height="32" style="fill:#fff;stroke:#111;stroke-width:2.6"/><path d="M174 861 H195" style="stroke:#111;stroke-width:2.4" marker-start="url(#sim-ar)" marker-end="url(#sim-ar)"/>' +
      '<rect x="170" y="877" width="29" height="32" style="fill:#fff;stroke:#111;stroke-width:2.6"/><circle cx="181" cy="893" r="5" style="fill:#fff;stroke:#111;stroke-width:2.4"/><path d="M186 886 L192 893 L186 900" style="fill:none;stroke:#111;stroke-width:2.4"/>' +
      '<path d="M184 909 L178 913 L190 917 L178 921 L190 925 L184 929" style="fill:none;stroke:#111;stroke-width:2.4"/>' +
    '</g><g transform="translate(-2 3)">' +
    // valeurs
    '<rect x="150" y="530" width="92" height="40" rx="8" style="fill:#fff;stroke:#111827;stroke-width:2"/><text id="tP" x="196" y="558" text-anchor="middle" class="t-b" style="fill:#111827">30 b</text>' +
    '<rect x="1010" y="770" width="200" height="40" rx="8" style="fill:#fff;stroke:#7c3aed;stroke-width:2"/><text id="tLS" x="1110" y="798" text-anchor="middle" class="t-b" style="fill:#7c3aed">LS 0 b</text>' +
    '<rect x="1240" y="770" width="190" height="40" rx="8" style="fill:#fff;stroke:#16a34a;stroke-width:2"/><text id="tPil" x="1335" y="798" text-anchor="middle" class="t-b" style="fill:#16a34a">pilotage 25 b</text>' +
    // zones cliquables (repères de la fiche et appareils)
    hit('9', 1286, 160, 240, 108, true) + hit('9', 1146, 216, 80, 44, true) + hit('10', 272, 545, 172, 230, true) + hit('10', 325, 795, 60, 60, true) + hit('11', 150, 800, 80, 120, true) + hit('11', 140, 985, 80, 60, true) +
    hit('12', 940, 480, 90, 200, true) + hit('12', 950, 795, 70, 70, true) +
    hit('red', 355, 380, 60, 50) + hit('gic', 410, 680, 34, 40) + hit('gls', 1400, 400, 60, 60) + hit('pompe', 270, 990, 110, 90) + hit('filt', 298, 920, 46, 46) + hit('sel', 226, 774, 50, 34) +
    hit('ech', 32, 840, 76, 74) + hit('res', 440, 1020, 140, 60) +
    EL.map(function (e) { return hit('comp', e.c - 18, 436, 36, 50) + hit('cad', e.kk - 14, 478, 28, 30) + (e.k !== 'dv' ? hit('x12', e.s[0] - 6, 500, e.s[1] - e.s[0] + 12, 160) : '') + (e.lps.A || e.lps.B ? hit('lps', e.l - 20, 480, 56, 50) : ''); }).join('') +
    hit('lps', 852, 640, 56, 50) +
    // numéros de repère (comme sur la fiche « rôle et désignation »)
    [['9', 1440, 168, 1372, 236], ['10', 355, 830, 355, 770], ['11', 180, 1015, 190, 915], ['12', 985, 830, 985, 690]].map(function (b) {
      return '<g data-rep="' + b[0] + '" style="cursor:pointer"><path d="M' + b[1] + ' ' + b[2] + ' L' + b[3] + ' ' + b[4] + '" style="stroke:#1f2937;stroke-width:2"/><rect x="' + (b[1] - 28) + '" y="' + (b[2] - 22) + '" width="56" height="44" style="fill:#fff;stroke:#1f2937;stroke-width:2.5"/><text x="' + b[1] + '" y="' + (b[2] + 10) + '" text-anchor="middle" class="t-b" style="fill:#1f2937">' + b[0] + '</text></g>';
    }).join('') + '</g>';

  SIMS.add({
    id: 'ppld-treuils', subj: 'ppld', icon: '🪝', title: 'Treuils + push-pull (RSQ 240) : schéma du cours',
    desc: 'Distributeur RSQ 240 à 4 éléments (push-pull vérin, push-pull moteur, dévidage, halage) : pression de service = LS + 30 b, limiteurs secondaires, DAD, électrovannes by-pass et de fin de course, pannes et mode dégradé.',
    lessons: ['ppld/phases', 'ppld/rsq240', 'ppld/fonctions', 'ppld/diagnostic'],
    viewBox: '0 0 1625 1210', minWidth: 1100, offHide: true, big: true,
    levels: true, hpLabel: 'Pression de service', lsLabel: 'Pression LS (charge)', pilLabel: 'Pilotage 25 b', bpLabel: '0 b (retour bâche)',
    note: 'Valeurs du cours et de tes fiches : stand-by 30 b, DAD 320 b → 350 b, pilotage 25 b, limiteur piloté 30 b + 350 b, LPS 150 b (push-pull moteur) et 190 b (dévidage), régulateurs 15 / 30 / 15 L/min, halage 28 L/min.',
    reps: REPS,
    svg: svg,
    init: { sel: 'N', sens: 'B', charge: 180, ouv: 100, butee: false, manu: false, force: false, panne: 'aucune', lsMem: 0, ang: 0 },
    keep: ['ang'],
    controls: [
      { key: 'sel', type: 'seg', label: 'Fonction commandée', options: [['N', 'Neutre'], ['pv', 'Push-pull vérin'], ['pm', 'Push-pull moteur'], ['dv', 'Dévidage'], ['hl', 'Halage']] },
      { key: 'sens', type: 'seg', label: 'Sens (sortie du distributeur)', options: [['A', 'Sortie A'], ['B', 'Sortie B']] },
      { key: 'ouv', type: 'range', label: 'Manipulateur (ouverture)', min: 0, max: 100, step: 5, unit: '%' },
      { key: 'charge', type: 'range', label: 'Pression demandée par la charge (LS)', min: 0, max: 340, step: 5, unit: 'b' },
      { key: 'butee', type: 'toggle', label: 'Récepteur en butée / bloqué', on: 'Oui', off: 'Non' },
      { key: 'panne', type: 'select', label: 'Créer une panne', options: Object.keys(PANNES).map(function (k) { return [k, PANNES[k]]; }) },
      { key: 'manu', type: 'toggle', label: 'Mode dégradé : commande manuelle des tiroirs', on: 'Oui', off: 'Non' },
      { key: 'force', type: 'toggle', label: 'Mode dégradé : forcer l’EV by-pass et les EV de coupure', on: 'Forcées', off: 'Non' }
    ],
    compute: function (st) {
      var pan = st.panne, d = { pan: pan };
      d.ev11 = pan !== 'ev11' || st.force;
      d.fdc = pan === 'fdc' && !st.force;
      d.pil = d.ev11 && pan !== 'red' ? PIL : 0;
      var e = BY[st.sel];
      var cmd = !!e && st.ouv > 0;
      var solOk = !(pan === 'solB' && st.sel === 'hl' && st.sens === 'B');
      d.move = cmd && (st.manu || (d.pil > 0 && solOk));
      d.e = e; d.sens = st.sens;
      if (!d.ev11) {
        d.ps = SB; d.ls = 0; d.q = 0; d.Q = 1; d.mode = 'ev11';
      } else if (!d.move) {
        d.ls = pan === 'gls' ? st.lsMem : 0; d.ps = d.ls + SB; d.q = 0; d.Q = 1; d.mode = 'n';
      } else {
        var lp = e.lps[st.sens] || 1e9;
        if (pan === 'lps' && st.sel === 'pm' && st.sens === 'A') lp = 50;
        var blk = st.butee || (d.fdc && st.sel === 'hl');
        var dem = blk ? 1e9 : st.charge, lim = Math.min(lp, DAD);
        d.ls = Math.min(dem, lim); d.stall = dem >= lim;
        d.dad = d.stall && lp > DAD; d.lpsOpen = d.stall && lp <= DAD;
        d.ps = d.ls + SB; d.q = d.stall ? 0 : Math.round(e.q * st.ouv / 100);
        d.Q = d.q + 1 + (d.dad ? 0.5 : 0); d.mode = 'w';
      }
      d.kw = d.ps * d.Q / 600;
      var nom = e ? e.t.toLowerCase() : '';
      d.etat = d.mode === 'ev11' ? 'Aucune fonction' : d.mode === 'n' ? (cmd ? 'Ne bouge pas' : 'Neutre (stand-by)') : d.stall ? (d.dad ? 'Butée : DAD' : 'Butée : LPS') : e.t + ' ' + st.sens;
      d.text =
        d.mode === 'ev11' ? '<b>Électrovanne by-pass RSQ 240 (11) non pilotée</b> : la case du clapet reste sur la conduite, l’huile n’arrive plus au RSQ 240 : pas de pression, pas de pilotage 25 b, <b>aucune fonction du RSQ 240 ne bouge</b> (grue, treuils, RMU). La pompe reste au stand-by (30 b). En utilisation normale, l’électrovanne est <b>pilotée à chaque utilisation</b> (sélecteur sur MANU ou RADIO) : la case passante est alignée sur le circuit. Mode dégradé : forcer l’électrovanne by-pass.'
        : d.mode === 'n' && cmd && pan === 'red' && !st.manu ? '<b>Réducteur 25 b défaillant</b> : plus de pression de pilotage, les solénoïdes ne peuvent plus déplacer les tiroirs. On reste au stand-by (30 b). Mode dégradé : <b>commande manuelle</b> des tiroirs sur le distributeur.'
        : d.mode === 'n' && cmd && !solOk ? '<b>Le halage déroule mais n’enroule pas</b> : en enroulement (sortie B), le tiroir ne bouge pas, on relève <b>30 b</b> (stand-by). La pompe, le distributeur et le récepteur ne sont pas en cause : contrôler la <b>commande du solénoïde B</b> (connectique, alimentation). Mode dégradé : commande manuelle.'
        : d.mode === 'n' ? (pan === 'gls' && d.ls > 0 ? '<b>Gicleur LS de sortie bouché</b> : au neutre, la ligne LS ne se vide plus : elle garde ' + d.ls + ' b, la pompe reste à <b>' + d.ps + ' b</b> au lieu du stand-by (30 b) : échauffement, mouvements brusques au démarrage suivant.' : '<b>Neutre (stand-by)</b> : électrovanne by-pass pilotée, tiroirs au centre (centre fermé). La ligne LS est vidée à la bâche par le gicleur LS de la section de sortie : <b>LS = 0 b</b>, la pompe garde <b>30 b</b> (ressort du tiroir LS), cylindrée mini. Le réducteur donne <b>25 b</b> en attente de pilotage.')
        : d.stall ? (d.dad ? '<b>' + e.t + ' en butée</b> : aucun limiteur secondaire sur cette sortie, la pression LS monte jusqu’au <b>DAD (320 b)</b> de la pompe : <b>pression de service = 320 + 30 = 350 b</b>, annulation de débit (la pompe ne débite plus que ses fuites).' + (d.fdc && st.sel === 'hl' ? ' Ici c’est l’<b>électrovanne de fin de course (9)</b> coupée qui bloque le récepteur.' : '')
          : '<b>' + e.t + ' en butée</b> : le <b>LPS de la sortie ' + st.sens + ' (' + d.ls + ' b)</b> s’ouvre et plafonne la pression LS : <b>pression de service = ' + d.ls + ' + 30 = ' + d.ps + ' b</b> ; le DAD (320 b) n’est pas atteint.' + (pan === 'lps' && st.sel === 'pm' ? ' <b>LPS détaré</b> : le push-pull moteur manque de force sur la sortie A (problème de force = pression, un seul sens → la ligne de cette sortie).' : ''))
        : '<b>' + e.t + ', sortie ' + st.sens + '</b> : le tiroir se déplace (pilotage 25 b). Le débit se sépare : <b>full flow</b> (régulateur de débit → récepteur, ' + d.q + ' L/min) et <b>low flow</b> (gicleur → ligne LS, clapet anti-dérive décollé). La pression de la charge (' + d.ls + ' b) remonte à la pompe : <b>pression de service = LS + 30 = ' + d.ps + ' b</b>. ΔP régulateur + ΔP distributeur = 30 b : la vitesse ne dépend pas de la charge.';
      d.readouts = [['État', d.etat, d.mode === 'ev11' || (d.mode === 'n' && cmd) ? 'hot' : d.mode === 'w' && !d.stall ? 'ok' : ''], ['Pression de service', F(d.ps) + ' b', d.ps >= 300 ? 'hot' : ''], ['Pression LS', F(d.ls) + ' b'],
        ['Pilotage', F(d.pil) + ' b'], ['Débit récepteur', F(d.q) + ' L/min'], ['Débit pompe', F(d.Q, d.Q % 1 ? 1 : 0) + ' L/min'], ['Puissance', F(d.kw, 1) + ' kW']];
      return d;
    },
    tick: function (st, dt, d) {
      var ch = false;
      if (d.mode === 'w' && st.lsMem !== d.ls) { st.lsMem = d.ls; ch = true; }
      if (d.mode === 'w' && d.q && (st.sel === 'dv' || st.sel === 'hl')) { st.ang = (st.ang + (st.sens === 'A' ? 1 : -1) * d.q * dt * 12) % 360; ch = true; }
      return ch;
    },
    draw: function (a, st, d) {
      var e = d.e, w = d.mode === 'w', ev = d.mode === 'ev11';
      var P = ev ? 0 : d.ps, LS = d.ls, Pil = d.pil, flow = w && d.q > 0;
      a.lineP('pPump', d.ps, d.Q > 1 ? 1 : 0, { tag: false });
      a.lineP('pUp1', d.ps, flow ? 1 : 0, { tag: false });
      a.q('ev11').style.transform = ev ? '' : 'translateY(32px)';
      a.lineP('pUp', ev ? null : P, flow ? 1 : 0, { at: 0.25 });
      a.lineP('pCE', d.ps, 0, { tag: false });
      a.lineP('tRet', 0, ev || flow ? 1 : 0, { tag: false });
      a.lineP('tSuc', 0, -1, { tag: false }); // aspiration : du réservoir vers la pompe
      a.lineP('lsExt', LS, 0, { ls: true, tag: false }); a.lineP('lsPmp', LS, 0, { ls: true, tag: false });
      a.lineP('gP', ev ? null : P, flow ? 1 : 0, { tag: false });
      a.lineP('gLS', ev ? null : LS, w ? 1 : 0, { ls: true, tag: false });
      a.lineP('gLS2', ev ? null : LS, 0, { ls: true, tag: false });
      a.lineP('gLSo', ev ? null : 0, w || LS > 0 ? 1 : 0, { tag: false });
      a.lineP('gT', 0, 0, { tag: false }); a.lineP('gT2', 0, flow ? 1 : 0, { tag: false }); a.lineP('gT3', 0, 0, { tag: false });
      a.lineP('gPil', Pil > 0 ? Pil : null, 0, { pil: true, tag: false });
      a.lineP('gPil2', Pil > 0 ? Pil : null, 0, { pil: true, tag: false });
      a.lineP('rIn', ev ? null : P, 0, { tag: false }); a.lineP('lim', ev ? null : P, 0, { tag: false });
      EL.forEach(function (x, i) {
        var on = w && e === x, sA = on && d.sens === 'A', sB = on && d.sens === 'B', fl = on && d.q > 0 ? 1 : 0;
        a.lineP('cP' + i, ev ? null : P, fl, { tag: false });
        a.lineP('cF' + i, on ? P : null, fl, { tag: false });
        a.lineP('cK' + i, on ? LS : null, 0, { ls: true, tag: false });
        a.lineP('cA' + i, on ? (sA ? LS : 0) : null, sA ? fl : sB ? -fl : 0, { ls: true, tag: false });
        a.lineP('cB' + i, on ? (sB ? LS : 0) : null, sB ? fl : sA ? -fl : 0, { ls: true, tag: false });
        a.lineP('rA' + i, on ? (sA ? LS : 0) : null, sA ? fl : sB ? -fl : 0, { ls: true, tag: on && sA, at: 0.35 });
        a.lineP('rB' + i, on ? (sB ? LS : 0) : null, sB ? fl : sA ? -fl : 0, { ls: true, tag: on && sB, at: 0.35 });
        a.lineP('pA' + i, sA ? Pil : null, 0, { pil: true, tag: false });
        a.lineP('pB' + i, sB ? Pil : null, 0, { pil: true, tag: false });
        if (x.lps.A) { a.lineP('lAi' + i, sA ? LS : null, 0, { ls: true, tag: false }); a.lineP('lAo' + i, sA && d.lpsOpen ? 0 : null, sA && d.lpsOpen ? 1 : 0, { tag: false }); }
        if (x.lps.B) { a.lineP('lBi' + i, sB ? LS : null, 0, { ls: true, tag: false }); a.lineP('lBo' + i, sB && d.lpsOpen ? 0 : null, sB && d.lpsOpen ? 1 : 0, { tag: false }); }
        a.show('hs' + i, on); a.show('ts' + i, on); if (on) a.text('ts' + i, '→ ' + d.sens);
      });
      a.show('hEV9a', d.fdc); a.show('hEV9b', d.fdc); a.show('tEV9', d.fdc);
      var r = a.q('hEV11'), t = a.q('tEV11');
      r.style.fill = ev ? 'rgba(220,38,38,.18)' : 'rgba(22,163,74,.14)'; r.style.stroke = ev ? '#dc2626' : '#16a34a';
      t.style.fill = ev ? '#dc2626' : '#16a34a'; a.text('tEV11', ev ? 'non pilotée' : (st.force && st.panne === 'ev11' ? 'forcée' : 'pilotée'));
      a.text('tP', F(P) + ' b'); a.text('tLS', 'LS ' + F(LS) + ' b'); a.text('tPil', 'pilotage ' + F(Pil) + ' b');
    },
    steps: [
      { title: 'Neutre (stand-by)', text: 'Électrovanne by-pass (11) pilotée, tiroirs au centre : <b>30 b</b> à l’entrée, <b>LS = 0 b</b> (vidée par le gicleur LS de sortie), pilotage <b>25 b</b>, pompe en cylindrée mini.', set: { sel: 'N' } },
      { title: 'Halage : enroulement à 180 b', text: 'Ta fiche « treuils » : la charge demande <b>180 b</b> (violet, LS) ; <b>pression de service = 180 + 30 = 210 b</b> (rouge), pilotage 25 b (vert), <b>28 L/min</b>.', set: { sel: 'hl', sens: 'B', charge: 180, ouv: 100 } },
      { title: 'Treuil en butée : 350 b', text: 'Ta fiche « treuils en butée » : pas de LPS sur le halage, la LS monte au <b>DAD (320 b)</b> : <b>350 b</b> partout en amont, annulation de débit.', set: { sel: 'hl', sens: 'B', butee: true } },
      { title: 'Push-pull moteur en butée', text: 'Le <b>LPS 150 b</b> de la sortie s’ouvre : LS plafonnée à 150 b, <b>pression de service = 180 b</b>. Le DAD n’est pas atteint.', set: { sel: 'pm', sens: 'A', butee: true } },
      { title: 'Dévidage en butée', text: 'Le <b>LPS 190 b</b> plafonne la LS : <b>pression de service = 220 b</b>.', set: { sel: 'dv', sens: 'A', butee: true } },
      { title: 'Panne : EV by-pass non pilotée', text: 'L’électrovanne by-pass (11) n’est pas pilotée : la case du clapet reste sur la conduite, l’huile n’arrive plus au RSQ 240 : <b>aucune fonction</b> ne bouge, 0 b dans le distributeur, la pompe reste au stand-by (30 b).', set: { sel: 'hl', sens: 'B', panne: 'ev11' } },
      { title: 'Panne : le halage n’enroule pas', text: 'Cas du cours : le treuil de halage déroule mais <b>n’enroule pas</b> ; <b>30 b</b> en enroulement. Le tiroir ne bouge pas : <b>commande du solénoïde B</b>.', set: { sel: 'hl', sens: 'B', panne: 'solB' } },
      { title: 'Mode dégradé', text: 'Même panne : on utilise la <b>commande manuelle</b> du distributeur (et on force l’EV by-pass et les EV de coupure si besoin) : le halage enroule de nouveau, 210 b.', set: { sel: 'hl', sens: 'B', panne: 'solB', manu: true, force: true } }
    ],
    stepMs: 7000
  });
})();
