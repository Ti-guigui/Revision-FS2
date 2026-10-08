/* Simulateur : régulation Load Sensing de la pompe du PPLD — dessiné comme la figure du cours « les 4 phases de la régulation LS » :
   pompe à pistons axiaux en coupe (barillet, plateau, piston de commande et piston de rappel intégrés au corps de pompe),
   régulateur fixé sur la pompe (tiroir LS, ressort de stand-by, DAD, gicleurs), distributeur, réservoir et récepteur. */
(function () {
  var F = SIMS.fmt;
  var SB = 30, QAP = 1, QDAD = 0.5, QMAX = 100;
  // couleurs de la figure du cours
  var RED = '#dc2626', BOR = '#9f1239', BLU = '#1e3a8a', ORA = '#f59e0b';
  var PX = 800, PY = 550; // pivot du plateau

  function zig(x1, y, x2, h, n) {
    var d = 'M' + x1 + ' ' + y, s = (x2 - x1) / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x1 + s * (i + 1)) + ' ' + (y + (i % 2 ? h / 2 : -h / 2));
    return d + ' L' + x2 + ' ' + y;
  }
  function zigV(x, y1, y2, w, n) {
    var d = 'M' + x + ' ' + y1, s = (y2 - y1) / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x + (i % 2 ? w / 2 : -w / 2)) + ' ' + (y1 + s * (i + 1));
    return d + ' L' + x + ' ' + y2;
  }
  function gicleur(x, y1, y2) {
    var m = (y1 + y2) / 2;
    return '<path class="ink" d="M' + (x - 7) + ' ' + y1 + ' V' + (m - 5) + ' L' + (x - 2) + ' ' + m + ' V' + y2 + ' M' + (x + 7) + ' ' + y1 + ' V' + (m - 5) + ' L' + (x + 2) + ' ' + m + ' V' + y2 + '" style="stroke-width:2"/>';
  }
  function gauge(id, x, y) {
    return '<circle class="ink-f" cx="' + x + '" cy="' + y + '" r="15"/><line id="' + id + '" class="ink" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y - 11) + '" style="stroke-width:2.6"/><circle class="solid" cx="' + x + '" cy="' + y + '" r="2.5"/>';
  }
  var gAng = function (p, max) { return -120 + Math.max(0, Math.min(1, p / max)) * 240; };
  function dot(x, y) { return '<circle class="solid" cx="' + x + '" cy="' + y + '" r="3.2"/>'; }
  var G = 'fill:#9ca3af;stroke:#374151;stroke-width:2'; // corps gris (comme le cours)
  var LG = 'fill:#e5e7eb;stroke:#374151;stroke-width:1.6';

  var svg =
    // ---------- conduites ----------
    '<path class="pipe" id="pP" d="M640 510 H530 V570 H150 V460"/>' +
    '<path class="pipe thin" id="pPS" d="M530 510 V221 H619"/>' +
    '<path class="pipe thin" id="pCmd" d="M687 239 V330 H580 V475 H604"/>' +
    '<path class="pipe thin" id="pAP" d="M687 183 V50"/>' +
    '<path class="pipe thin" id="pLS" d="M100 330 H192 A8 8 0 0 1 208 330 H230 V22 H988 V355 H858 V300 M230 150 H285"/>' +
    '<path class="pipe thin" id="pDad" d="M858 73 V50 H687"/>' +
    '<path class="pipe thin" id="pDr" d="M687 50 H470 V300"/>' +
    '<path class="pipe" id="pA" d="M100 370 V250"/>' +
    '<path class="pipe thin" id="pB" d="M200 370 V75 H152"/>' +
    '<path class="pipe thin" id="pT" d="M250 460 V500 H327"/>' +
    '<path class="pipe thin" id="pT2" d="M363 500 H420 V300"/>' +
    '<path class="pipe" id="pSuc" d="M450 402 V670 H620 V590 H640"/>' +
    // ---------- récepteur (vérin) ----------
    '<rect x="80" y="60" width="70" height="190" style="' + G + '"/><rect x="88" y="66" width="54" height="178" style="fill:#f8fafc"/>' +
    '<rect id="chT" x="88" y="66" width="54" height="80"/><rect id="chB" x="88" y="160" width="54" height="84"/>' +
    '<g id="rod"><rect x="88" y="146" width="54" height="14" style="fill:#374151"/><rect x="108" y="10" width="14" height="136" style="fill:#f8fafc;stroke:#374151;stroke-width:1.6"/></g>' +
    '<text x="160" y="40" class="t-s">Récepteur</text><text id="chg" x="160" y="58" class="t-s t-b">100 b</text>' +
    // ---------- distributeur à tiroir en coupe (comme la figure du cours) ----------
    // orifices : A (vers le récepteur, prise LS), P (pression de service), B (retour du récepteur), T (retour réservoir par le filtre)
    '<rect x="50" y="370" width="240" height="90" style="' + G + '"/>' +
    '<rect x="50" y="404" width="240" height="24" style="fill:#f8fafc"/>' +
    '<rect id="zR" x="206" y="404" width="84" height="24"/>' +                                   // chambre de retour (côté T)
    '<rect id="gA" x="94" y="370" width="12" height="64"/><rect id="gP" x="144" y="398" width="12" height="62"/>' +
    '<rect id="gB" x="194" y="370" width="12" height="64"/><rect id="gT" x="244" y="398" width="12" height="62"/>' +
    '<g id="spoolD" style="transition:transform .4s ease">' +
      '<rect id="zN" x="114" y="404" width="72" height="24"/>' +                                 // gorge du tiroir (P)
      '<rect x="36" y="411" width="278" height="10" style="' + LG + '"/>' +
      '<rect x="40" y="404" width="74" height="24" style="' + LG + '"/><rect x="186" y="404" width="28" height="24" style="' + LG + '"/><rect x="280" y="404" width="30" height="24" style="' + LG + '"/>' +
      '<path d="M38 416 L28 352" style="stroke:#374151;stroke-width:4"/><circle cx="28" cy="346" r="8" style="fill:#111827"/></g>' +
    '<text x="82" y="392" class="t-s t-b" style="fill:#fff">A</text><text x="160" y="452" class="t-s t-b" style="fill:#fff">P</text>' +
    '<text x="210" y="392" class="t-s t-b" style="fill:#fff">B</text><text x="260" y="452" class="t-s t-b" style="fill:#fff">T</text>' +
    '<text x="108" y="324" class="t-s t-b">LS</text>' +
    '<text x="8" y="480" class="t-s">Distributeur</text><text id="ouv" x="8" y="498" class="t-s t-b">fermé</text>' +
    // ---------- filtre et réservoir ----------
    '<path d="M345 482 L363 500 L345 518 L327 500 Z" style="fill:' + BLU + ';stroke:#111827;stroke-width:2"/><text x="318" y="540" class="t-s">Filtre</text>' +
    '<rect x="400" y="300" width="100" height="102" style="fill:#f8fafc;stroke:#111827;stroke-width:2"/><rect x="402" y="330" width="96" height="70" style="fill:' + BLU + '"/>' +
    '<text x="402" y="292" class="t-s">Réservoir</text>' +
    // ---------- pompe à pistons axiaux (coupe) ----------
    '<path d="M560 440 H860 L900 480 V620 L860 660 H560 Z" style="' + G + '"/>' +
    '<rect x="640" y="490" width="120" height="120" rx="6" style="' + LG + '"/>' +              // barillet
    '<rect x="760" y="545" width="190" height="10" style="fill:#e5e7eb;stroke:#374151;stroke-width:1.4"/>' + // arbre
    // rotation de l’arbre (entraînement mécanique par le moteur : pas de circulation d’huile)
    '<g id="rotA" style="display:none"><path d="M872 534 A9 16 0 1 0 872 566" style="fill:none;stroke:#f59e0b;stroke-width:2.6"/><path d="M866 531 L874 534 L868 541" style="fill:none;stroke:#f59e0b;stroke-width:2.6"/></g>' +
    '<rect x="900" y="525" width="30" height="50" style="' + LG + '"/>' +
    // pistons du barillet (haut : refoulement ; bas : aspiration)
    '<rect id="bpU" x="700" y="503" width="60" height="18"/><rect id="bpL" x="700" y="579" width="60" height="18"/>' +
    '<rect id="ppU" x="740" y="506" width="40" height="12" style="fill:#f8fafc;stroke:#374151;stroke-width:1.4"/><rect id="ppL" x="740" y="582" width="40" height="12" style="fill:#f8fafc;stroke:#374151;stroke-width:1.4"/>' +
    // piston de commande (haut) et piston de rappel (bas), intégrés au corps de pompe
    '<rect x="604" y="463" width="100" height="24" style="' + LG + '"/><rect id="chC" x="606" y="465" width="40" height="20"/>' +
    '<g id="pistC" style="transition:transform .6s ease"><rect x="646" y="465" width="10" height="20" style="fill:#374151"/><rect x="656" y="471" width="144" height="8" style="fill:#f8fafc;stroke:#374151;stroke-width:1.2"/></g>' +
    '<rect x="604" y="613" width="100" height="24" style="' + LG + '"/>' +
    '<g id="pistR" style="transition:transform .6s ease"><rect x="646" y="615" width="10" height="20" style="fill:#374151"/><rect x="656" y="621" width="144" height="8" style="fill:#f8fafc;stroke:#374151;stroke-width:1.2"/></g>' +
    '<path id="sprR" d="' + zig(606, 625, 646, 14, 4) + '" style="stroke:' + RED + ';stroke-width:2.4;fill:none;transition:transform .6s ease;transform-origin:606px 625px"/>' +
    // plateau (pivot au milieu)
    '<g id="plat" style="transition:transform .6s ease;transform-origin:' + PX + 'px ' + PY + 'px"><rect x="' + (PX - 6) + '" y="' + (PY - 92) + '" width="12" height="184" rx="3" style="fill:#d1d5db;stroke:#111827;stroke-width:2"/></g>' +
    '<circle cx="' + PX + '" cy="' + PY + '" r="5" style="fill:#111827"/>' +
    '<text x="566" y="432" class="t-s">Pompe à pistons axiaux (coupe)</text>' +
    '<text x="606" y="458" class="t-s">Piston de commande</text><text x="606" y="654" class="t-s">Piston de rappel</text>' +
    '<text x="838" y="470" class="t-s">Plateau</text><text id="tCyl" x="838" y="488" class="t-s t-b">cylindrée 1 %</text>' +
    '<text x="646" y="545" class="t-s">Barillet</text>' +
    // moteur d’entraînement
    '<rect id="mBox" x="940" y="530" width="40" height="40" class="ink-f"/><text x="960" y="557" text-anchor="middle" class="t-b">M</text>' +
    '<g id="rotP"><path d="M915 532 V568 M902 550 H928" style="stroke:#f59e0b;stroke-width:3"/></g>' +
    '<text id="tMot" x="958" y="592" text-anchor="middle" class="t-s" style="font-weight:700">en marche</text>' +
    // ---------- régulateur (ton dessin à la main : tiroir LS, grande chambre du ressort de stand-by, DAD, gicleurs) ----------
    '<g transform="translate(480 30) scale(0.9)">' +
      '<rect x="142" y="170" width="118" height="62" style="fill:#f8fafc"/><rect x="260" y="100" width="210" height="200" style="fill:#f8fafc"/>' +
      '<rect id="zPS" class="zone z-off" x="142" y="172" width="8" height="58" style="transition:transform .45s ease;transform-origin:142px 200px"/>' +
      '<rect id="zA1" class="zone z-off" x="190" y="172" width="70" height="58" style="transition:transform .45s ease;transform-origin:260px 200px"/><rect id="zA2" class="zone z-off" x="262" y="102" width="38" height="196" style="transition:transform .45s ease;transform-origin:262px 200px"/>' +
      '<rect id="zLS" class="zone z-off" x="318" y="102" width="150" height="196" style="transition:transform .45s ease;transform-origin:468px 200px"/>' +
      '<path class="ink" d="M142 170 H260 V100 H470 V300 H260 V232 H142" style="fill:none;stroke-width:3"/>' +
      '<g id="spool" style="transition:transform .45s ease"><rect class="solid" x="150" y="174" width="40" height="54" rx="3"/><rect class="ink-f" x="190" y="192" width="112" height="18"/><rect class="solid" x="300" y="104" width="18" height="192"/></g>' +
      '<path id="lsSpr" class="ink" d="' + zig(318, 200, 468, 150, 5) + '" style="fill:none;stroke-width:2.6;transition:transform .45s ease;transform-origin:468px 200px"/>' +
      '<text x="120" y="152" class="t-b">Tiroir LS</text>' +
      '<text x="480" y="210" class="t-b" style="fill:' + RED + '">Stand-by</text><text x="480" y="228" class="t-b" style="fill:' + RED + '">30 b</text>' +
      // gicleur anti-pompage (haut du petit alésage → retour réservoir)
      gicleur(230, 170, 140) +
      '<text x="218" y="100" text-anchor="end" class="t-s" style="fill:' + BLU + '">Gicleur anti-pompage</text><text x="218" y="116" text-anchor="end" class="t-s" style="fill:' + BLU + '">1 L/min → réservoir</text>' +
      // DAD : bille + siège + ressort sur la chambre du ressort de stand-by
      '<path d="M402 100 L420 116 L438 100" style="fill:#f8fafc;stroke:#111827;stroke-width:2.6"/>' +
      '<g id="dadB" style="transition:transform .3s"><circle class="solid" cx="420" cy="96" r="9"/></g>' +
      '<path class="ink" d="M402 88 V48 H438 V88" style="fill:none"/><path id="dadSpr" class="ink" d="' + zigV(420, 86, 50, 22, 3) + '" style="fill:none"/>' +
      '<text x="448" y="62" class="t-b">DAD</text><text id="tDAD" x="448" y="80" class="t-b">320 b</text><text id="tDADq" x="448" y="96" class="t-s"></text>' +
      // gicleur LS 0,5 L/min (arrivée de la ligne LS sous la chambre)
      gicleur(420, 300, 330) + '<text x="434" y="322" class="t-s" style="fill:' + BOR + '">Gicleur 0,5 L/min</text>' +
    '</g>' +
    '<text x="566" y="212" text-anchor="end" class="t-b" style="fill:' + RED + '">PS</text>' +
    // manomètres
    gauge('nP', 490, 570) + '<text id="tP" x="470" y="606" class="t-b">30 b</text><text x="470" y="626" class="t-s">Pression de service</text>' +
    gauge('nLS', 300, 150) + '<text id="tLS" x="322" y="140" class="t-b">0 b</text><text x="322" y="176" class="t-s">LS</text>' +
    [[530, 510], [530, 570], [687, 50], [230, 150], [490, 570], [100, 330]].map(function (q) { return dot(q[0], q[1]); }).join('');

  SIMS.add({
    id: 'ppld-ls', subj: 'ppld', icon: '🚛', title: 'Régulation Load Sensing de la pompe (PPLD) : les 4 phases du cours',
    desc: 'Comme la figure du cours : pompe à pistons axiaux en coupe avec piston de commande et piston de rappel intégrés, régulateur (tiroir LS, ressort de stand-by 30 b, DAD 320 b), distributeur et récepteur.',
    lessons: ['ppld/generation', 'ppld/rsq240', 'ppld/energie', 'hydro/ls'],
    viewBox: '0 0 1000 690', minWidth: 900,
    levels: true, legendHtml: '<span><i class="lg" style="background:#dc2626"></i>Pression de service</span><span><i class="lg" style="background:#9f1239"></i>Pression de la charge (LS)</span><span><i class="lg" style="background:#f59e0b"></i>Commande (piston de commande)</span><span><i class="lg" style="background:#1e3a8a"></i>Bâche / 0 b</span>',
    note: 'Valeurs du cours et de tes fiches : stand-by 30 b, DAD 320 b (réglable), gicleur anti-pompage 1 L/min, gicleur LS 0,5 L/min (ne débite que si le DAD est ouvert), pompe 100 L/min.',
    svg: svg,
    init: { moteur: true, ouv: 0, charge: 100, butee: false, dad: 320, sec: 0, pos: 0.3 },
    keep: ['pos'],
    controls: [
      { key: 'moteur', type: 'toggle', label: 'Moteur (entraînement de la pompe)', on: 'En marche', off: 'À l’arrêt' },
      { key: 'ouv', type: 'range', label: 'Débit demandé par l’élément (ouverture du tiroir)', min: 0, max: 100, step: 1, unit: 'L/min' },
      { key: 'charge', type: 'range', label: 'Pression demandée par la charge (LS)', min: 0, max: 340, step: 5, unit: 'b' },
      { key: 'butee', type: 'toggle', label: 'Récepteur en butée', on: 'Oui', off: 'Non' },
      { key: 'dad', type: 'range', label: 'Tarage du ressort du DAD', min: 100, max: 320, step: 10, unit: 'b' },
      { key: 'sec', type: 'select', label: 'Limiteur secondaire de l’élément', options: [['0', 'Aucun'], ['150', '150 b (treuil)'], ['190', '190 b (dévidage)'], ['220', '220 b (stabilisateurs, limiteur piloté)'], ['300', '300 b (RMU)'], ['310', '310 b (RMU)']] }
    ],
    compute: function (st) {
      var dad = +st.dad, sec = +st.sec || 1e9, d = { dadOpen: false, secOpen: false };
      var lim = Math.min(dad, sec);
      if (!st.ouv && !st.butee) { d.mode = 'sb'; d.ls = 0; d.q = 0; }
      else {
        var dem = st.butee ? 1e9 : st.charge;
        d.ls = Math.min(dem, lim);
        d.stall = dem >= lim;            // la charge (ou la butée) dépasse ce que la LS peut atteindre
        d.mode = d.stall ? 'butee' : 'run';
        d.dadOpen = d.stall && dad <= sec; d.secOpen = d.stall && sec < dad;
        d.q = d.stall ? 0 : Math.min(QMAX - QAP, st.ouv);
      }
      // plein débit (cours) : le distributeur demande plus que la pompe ne peut donner → plus de ΔP, LS = pression de service,
      // le ressort de stand-by retient le tiroir, le piston de commande n’est pas alimenté : cylindrée maximum
      d.plein = d.mode === 'run' && st.ouv >= QMAX - QAP;
      d.ps = d.plein ? d.ls : d.ls + SB;
      d.Q = d.plein ? QMAX : d.q + QAP + (d.dadOpen ? QDAD : 0);
      d.cyl = Math.max(1, Math.round(d.Q / QMAX * 100));
      if (!st.moteur) { d.mode = 'arret'; d.plein = false; d.ps = 0; d.ls = 0; d.q = 0; d.Q = 0; d.cyl = 100; d.dadOpen = d.secOpen = false; }
      d.kw = d.ps * d.Q / 600;
      d.text = d.mode === 'arret' ? '<b>Au repos (moteur à l’arrêt)</b> : aucune pression. Le <b>piston de rappel</b> (ressort) pousse le plateau : la pompe est en <b>cylindrée maximum</b>. Dès le démarrage, la pression monte et la régulation ramène le plateau au débit dont le circuit a besoin.'
        : d.mode === 'sb'
        ? '<b>Stand-by</b> : éléments au neutre, la ligne LS est à la bâche (<b>LS = 0 b</b>). Seul le ressort de stand-by retient le tiroir : dès que la <b>PS dépasse 30 b</b>, le tiroir se déplace, envoie la pression au <b>piston de commande</b> qui ramène le <b>plateau vers le mini</b>. La pompe garde <b>30 b</b> et ne débite que ce que consomme le <b>gicleur anti-pompage (1 L/min)</b>.'
        : d.dadOpen
          ? '<b>Butée : le DAD s’ouvre</b>. La LS (low flow) monte jusqu’au tarage du ressort du DAD (<b>' + dad + ' b</b>) : la bille se soulève et laisse passer vers la bâche <b>seulement les 0,5 L/min</b> qui arrivent par le <b>gicleur LS</b> (ligne LS → gicleur → chambre → DAD). Tant que le DAD est fermé, rien ne circule dans le gicleur LS. Pour déplacer le tiroir, la <b>pression de service (full flow)</b> doit vaincre <b>LS + ressort de stand-by = ' + dad + ' + 30 = ' + d.ps + ' b</b> : le tiroir comprime le ressort, alimente le piston de commande, le plateau revient au mini → <b>annulation de débit</b>, pression maxi maintenue.'
          : d.secOpen
            ? '<b>Butée</b> : le <b>limiteur secondaire de l’élément (' + sec + ' b)</b> plafonne la pression LS avant le DAD (' + dad + ' b, resté fermé). La pompe maintient <b>PS = ' + sec + ' + 30 = ' + d.ps + ' b</b>, plateau au mini.'
            : d.plein ? '<b>Plein débit</b> : le distributeur est <b>ouvert au maximum</b>. La pression dans la ligne LS est <b>identique</b> à la pression de service (' + d.ps + ' b). Le tiroir LS reçoit la même pression de chaque côté, mais le <b>ressort de stand-by</b> ne permet pas son déplacement : le <b>piston de commande n’est pas alimenté</b>, la pompe est en <b>cylindrée maximum</b> (100 L/min).'
            : '<b>Contrôle du débit</b> : le distributeur est ouvert partiellement. La pression LS (' + d.ls + ' b, la charge) <b>s’ajoute au ressort de stand-by (30 b)</b> derrière le tiroir. Le tiroir s’équilibre quand <b>PS = LS + 30 = ' + d.ps + ' b</b> : il dose l’huile envoyée au piston de commande et le plateau prend la cylindrée qu’il faut pour donner <b>' + F(d.q) + ' L/min</b> à l’élément (+ 1 L/min du gicleur anti-pompage). ΔP de l’élément = 30 b : la vitesse ne dépend pas de la charge.';
      d.readouts = [['Pression de service (full flow)', F(d.ps) + ' b', d.dadOpen ? 'hot' : ''], ['Pression LS (low flow)', F(d.ls) + ' b'], ['ΔP = PS − LS', (d.plein ? 0 : SB) + ' b'],
        ['Débit pompe', F(d.Q, d.Q % 1 ? 1 : 0) + ' L/min'], ['DAD', d.dadOpen ? 'ouvert (0,5 L/min)' : 'fermé', d.dadOpen ? 'hot' : ''], ['Puissance', F(d.kw, 1) + ' kW']];
      return d;
    },
    tick: function (st, dt, d) {
      if (d.mode === 'arret') return false;
      st.rot = ((st.rot || 0) + dt * 360) % 360; st.sh = ((st.sh || 0) + dt * 40) % 12;
      if (d.mode === 'run' && d.q) { st.pos += dt * d.q / 250; if (st.pos > 1) st.pos = 0; }
      return true;
    },
    draw: function (a, st, d) {
      var off = d.mode === 'arret', run = d.mode === 'run', sb = d.mode === 'sb';
      var P = off ? null : d.ps, LS = off ? null : d.ls;
      var cLS = d.plein || d.dadOpen ? RED : BOR;
      var Z = off ? null : 0;
      function L(id, p, dir, col, o) { o = o || {}; o.col = p == null ? null : (p > 0.05 ? col : BLU); if (o.tag === undefined) o.tag = false; a.lineP(id, p, dir, o); }
      function Fz(id, p, col) { a.fillP(id, p, { col: p == null ? null : (p > 0.05 ? col : BLU), op: 0.85 }); }
      // tiroir LS : déplacement (le ressort de stand-by se comprime)
      var dx = d.plein || off ? 0 : run ? Math.round(8 + 30 * (1 - d.q / 99)) : 40;
      a.q('spool').style.transform = 'translateX(' + dx + 'px)';
      var sx = function (id, k) { a.q(id).style.transform = 'scaleX(' + k.toFixed(3) + ')'; };
      sx('lsSpr', (150 - dx) / 150); sx('zLS', (150 - dx) / 150); sx('zPS', (8 + dx) / 8); sx('zA1', (70 - dx) / 70); sx('zA2', (38 + dx) / 38);
      var feed = !off && !d.plein && dx > 0; // le tiroir laisse passer la pression vers le piston de commande
      // conduites
      L('pP', P, d.Q > 1 ? 1 : 0, RED, { tag: true, at: 0.55 });
      L('pPS', P, 0, RED);
      L('pCmd', off ? null : (feed ? d.ps : 0), feed && !sb ? 1 : 0, ORA, { tag: feed, at: 0.9 });
      L('pAP', Z, off ? 0 : 1, BLU);
      L('pLS', LS, d.dadOpen ? 1 : 0, cLS, { tag: true, at: 0.12 });
      L('pDad', Z, d.dadOpen ? 1 : 0, BLU); L('pDr', Z, off ? 0 : 1, BLU);
      L('pA', off ? null : (sb ? 0 : LS), run && d.q ? 1 : 0, cLS);
      L('pB', Z, run && d.q ? -1 : 0, BLU);
      L('pT', Z, run && d.q ? 1 : 0, BLU); L('pT2', Z, run && d.q ? 1 : 0, BLU);
      L('pSuc', 0, d.Q > 0 ? 1 : 0, BLU);
      Fz('zPS', P, RED); Fz('zA1', off ? null : (feed ? d.ps : 0), ORA); Fz('zA2', off ? null : (feed ? d.ps : 0), ORA); Fz('zLS', off ? null : (sb ? 0 : LS), cLS);
      Fz('chC', off ? null : (feed ? d.ps : 0), ORA);
      Fz('bpU', P, RED); Fz('bpL', Z, BLU);
      Fz('chB', off ? null : (sb ? 0 : LS), cLS); Fz('chT', Z, BLU);
      // DAD
      a.q('dadB').style.transform = d.dadOpen ? 'translateY(-7px)' : '';
      a.attr('dadSpr', 'd', zigV(420, d.dadOpen ? 79 : 86, 50, 22, 3));
      a.text('tDAD', st.dad + ' b'); a.text('tDADq', off ? '' : d.dadOpen ? 'ouvert' : 'fermé');
      // plateau (pivot au milieu) : piston de commande en haut, piston de rappel + ressort en bas, pistons du barillet
      var c = d.cyl / 100, th = -18 * c, sn = Math.sin(th * Math.PI / 180);
      a.q('plat').style.transform = 'rotate(' + th + 'deg)';
      var tipC = PX + 75 * sn, tipR = PX - 75 * sn;
      a.q('pistC').style.transform = 'translateX(' + (tipC - PX).toFixed(1) + 'px)';
      a.q('pistR').style.transform = 'translateX(' + (tipR - PX).toFixed(1) + 'px)';
      a.attr('chC', 'width', Math.max(2, 40 + tipC - PX).toFixed(1));
      a.q('sprR').style.transform = 'scaleX(' + ((40 + tipR - PX) / 40).toFixed(3) + ')';
      var tU = PX + 40 * sn - 6, tL = PX - 38 * sn - 6;
      a.attr('ppU', 'width', Math.max(4, tU - 740).toFixed(1)); a.attr('ppL', 'width', Math.max(4, tL - 740).toFixed(1));
      a.text('tCyl', 'cylindrée ' + d.cyl + ' %');
      // distributeur et récepteur
      var open = !off && (st.ouv > 0 || st.butee);
      a.q('spoolD').style.transform = 'translateX(' + (open ? -(10 + 12 * Math.min(1, st.ouv / 100)) : 0) + 'px)';
      Fz('zN', P, RED); Fz('gP', P, RED); Fz('gA', off ? null : (sb ? 0 : LS), cLS); Fz('gB', Z, BLU); Fz('gT', Z, BLU); Fz('zR', Z, BLU);
      a.text('ouv', !open ? 'fermé' : d.plein ? 'ouvert maxi' : st.butee ? 'ouvert (butée)' : 'ouvert ' + st.ouv + ' %');
      a.text('chg', st.butee ? 'butée' : st.charge + ' b');
      var py = 230 - (d.mode === 'butee' ? 1 : st.pos) * 150;
      a.move('rod', 0, py - 146);
      a.attr('chT', 'height', Math.max(0, py - 66)); a.attr('chB', 'y', py + 14); a.attr('chB', 'height', Math.max(0, 230 - py));
      // moteur
      a.q('rotA').style.display = off ? 'none' : '';
      a.q('rotP').style.display = off ? 'none' : ''; a.move('rotP', 0, 0, st.rot || 0, 915, 550);
      a.q('mBox').style.fill = off ? '' : 'rgba(245,158,11,.35)'; a.text('tMot', off ? 'à l’arrêt' : 'en marche');
      a.move('nP', 0, 0, gAng(d.ps, 400), 490, 570); a.text('tP', F(d.ps) + ' b');
      a.move('nLS', 0, 0, gAng(d.ls, 400), 300, 150); a.text('tLS', F(d.ls) + ' b');
    },
    steps: [
      { title: 'Au repos (moteur arrêté)', text: 'Pas de pression : le <b>piston de rappel</b> pousse le plateau, la pompe est en <b>cylindrée maximum</b>. Au démarrage, la régulation ajuste ensuite le débit au besoin du circuit.', set: { moteur: false } },
      { title: '1. Débit nul (stand-by)', text: 'Cours : distributeur <b>fermé</b>. Éléments au neutre : <b>LS = 0 b</b>, la pompe garde <b>30 b</b> (ressort de stand-by). Le tiroir alimente le piston de commande : plateau au mini, la pompe ne débite que le gicleur anti-pompage (<b>1 L/min</b>).', set: { ouv: 0, charge: 100 } },
      { title: '2. Plein débit', text: 'Cours : distributeur <b>ouvert au maximum</b>. La pression LS est <b>identique</b> à la pression de service ; le tiroir reçoit la même pression des deux côtés, le ressort de stand-by l’empêche de bouger : le <b>piston de commande n’est pas alimenté</b>, la pompe est en <b>cylindrée maximum</b>.', set: { ouv: 100, charge: 100 } },
      { title: '3. Contrôle du débit', text: 'Cours : distributeur <b>ouvert partiellement</b>. La pression de la ligne LS est l’effort demandé par le récepteur (100 b). La pression de service s’oppose à LS + ressort (30 b) : le tiroir et le piston de commande se déplacent <b>partiellement</b>, le plateau s’incline juste ce qu’il faut : <b>le débit fourni est adapté aux besoins</b> (50 L/min).', set: { ouv: 50, charge: 100 } },
      { title: '4. Débit nul (pression maxi)', text: 'Cours : distributeur ouvert mais <b>récepteur en butée</b>. La pression monte jusqu’au tarage du <b>DAD (320 b)</b>, qui s’ouvre et relie la ligne LS au drain. Sous l’effet de la pression de service, le tiroir LS se déplace et le piston de commande pousse le plateau en position verticale : <b>pas de débit mais maintien de la pression maximum</b> (350 b).', set: { ouv: 28, butee: true } },
      { title: 'Treuil : halage à 180 b', text: 'Ta fiche « treuils » : la charge demande <b>180 b</b> dans la LS ; elle s’ajoute aux 30 b du ressort : <b>PS = 210 b</b>. ΔP de l’élément = 30 b, débit <b>28 L/min</b>.', set: { ouv: 28, charge: 180 } },
      { title: 'RMU : corps de flèche à 270 b', text: 'Ta fiche « RMU » : LS = <b>270 b</b> → <b>PS = 300 b</b>, débit <b>38 L/min</b>.', set: { ouv: 38, charge: 270 } },
      { title: 'RMU en butée', text: 'Ta fiche « RMU en butée » : le <b>limiteur secondaire 300 b</b> de l’élément plafonne la LS à 300 b → <b>PS = 330 b</b>. Le DAD (320 b) reste fermé.', set: { ouv: 38, butee: true, sec: '300' } },
      { title: 'Stabilisateurs : extension à 85 b', text: 'Ta fiche « stabilisateurs » : LS = <b>85 b</b> → <b>PS = 115 b</b>, débit <b>40 L/min</b> (balance d’entrée : ΔP 30 b, 40 L/min).', set: { ouv: 40, charge: 85 } },
      { title: 'Stabilisateurs en butée', text: 'Ta fiche : le <b>limiteur de pression à commande pilotée 220 b</b> plafonne la LS → <b>PS = 250 b</b> (tête pilote 200 b).', set: { ouv: 40, butee: true, sec: '220' } },
      { title: 'Treuil en butée : DAD 320 b', text: 'Sans limiteur secondaire, la LS monte jusqu’au <b>DAD (320 b)</b> : la bille se soulève, il laisse passer les <b>0,5 L/min</b> du gicleur LS vers la bâche ; la PS doit vaincre <b>320 + 30 = 350 b</b> : annulation de débit, 350 b maintenus.', set: { ouv: 28, butee: true } },
      { title: 'DAD réglé à 150 b', text: 'Ton exemple : ressort du DAD à <b>150 b</b>. Quand la <b>pression de service atteint 180 b</b> (150 b du DAD dans le low flow + 30 b du stand-by), le tiroir se déplace et comprime le ressort, le DAD s’ouvre et laisse passer les <b>0,5 L/min</b> du gicleur LS : la pompe s’annule à 180 b.', set: { ouv: 28, butee: true, dad: 150 } }
    ],
    stepMs: 7000
  });
})();
