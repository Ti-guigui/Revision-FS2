/* Simulateurs : hydraulique (circuit ouvert, Load Sensing PPLD, transmission hydrostatique) */
(function () {
  var F = SIMS.fmt;
  function bache(x, y) { return '<path class="ink" d="M' + (x - 14) + ' ' + y + ' V' + (y + 12) + ' H' + (x + 14) + ' V' + y + '"/>'; }
  function spring(x, y, w, h, n) {
    var d = 'M' + x + ' ' + (y + h / 2), s = w / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x + s * (i + 1)) + ' ' + (i % 2 ? y + h : y);
    return '<path class="ink" d="' + d + ' L' + (x + w) + ' ' + (y + h / 2) + '"/>';
  }
  function gauge(id, x, y) {
    return '<circle class="ink-f" cx="' + x + '" cy="' + y + '" r="17"/><line id="' + id + '" class="ink" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y - 13) + '" style="stroke-width:2.6"/>' +
      '<circle class="solid" cx="' + x + '" cy="' + y + '" r="2.5"/>';
  }
  // limiteur / soupape (symbole du cahier) : entrée en (x, y), case 24 × 40 ; sens 1 = entrée en haut, -1 = entrée en bas
  // flèche décalée côté pilotage (à droite), pilotage en pointillés pris à l’entrée, ressort réglable à gauche
  function relief(x, y, sens, arId) {
    var top = sens > 0 ? y : y - 40, inY = sens > 0 ? y : y, mid = top + 20;
    var ar = sens > 0 ? 'M' + (x + 6) + ' ' + (top + 4) + ' V' + (top + 36) : 'M' + (x + 6) + ' ' + (top + 36) + ' V' + (top + 4);
    var pil = sens > 0 ? 'M' + x + ' ' + (top - 14) + ' H' + (x + 22) + ' V' + (mid + 6) + ' H' + (x + 12)
      : 'M' + x + ' ' + (top + 54) + ' H' + (x + 22) + ' V' + (mid - 6) + ' H' + (x + 12);
    return '<rect class="ink-f" x="' + (x - 12) + '" y="' + top + '" width="24" height="40"/>' + (arId ? '<g id="' + arId + '" style="transition:transform .3s">' : '') + '<path class="ink" d="' + ar + '" marker-end="url(#sim-ar)"/>' + (arId ? '</g>' : '') +
      '<path class="ink" d="' + pil + '" style="stroke-dasharray:4 3"/>' + spring(x - 26, mid - 7, 14, 14, 2) +
      '<path class="ink" d="M' + (x - 30) + ' ' + (mid + 12) + ' L' + (x - 10) + ' ' + (mid - 12) + '" marker-end="url(#sim-ar)"/>';
  }
  // clapet anti-retour vertical (bille + siège) : passage libre du sommet du V vers la bille ; sens -1 = vers le haut, 1 = vers le bas
  function ckv(x, y, sens) {
    var v = sens < 0 ? 'M' + (x - 9) + ' ' + (y - 6) + ' L' + x + ' ' + (y + 8) + ' L' + (x + 9) + ' ' + (y - 6) : 'M' + (x - 9) + ' ' + (y + 6) + ' L' + x + ' ' + (y - 8) + ' L' + (x + 9) + ' ' + (y + 6);
    return '<circle class="ink-f" cx="' + x + '" cy="' + (y + (sens < 0 ? -7 : 7)) + '" r="7"/><path class="ink" d="' + v + '" style="fill:none;stroke-width:2.4"/>';
  }
  var gAng = function (p, max) { return -120 + Math.max(0, Math.min(1, p / max)) * 240; };

  /* ---------------- 1. Pompe, limiteur, distributeur 4/3, vérin double effet ---------------- */
  var TAR = 150, QP = 20, SA = Math.PI * 6.3 * 6.3 / 4; // section du piston Ø 63 mm en cm²
  SIMS.add({
    id: 'hydro-verin', subj: 'hydro', icon: '🛢️', title: 'Distributeur 4/3, vérin double effet et limiteur de pression',
    desc: 'Règle le poids de la charge : la pression vaut P = F / S. La vitesse dépend du débit. En butée, le limiteur s’ouvre.',
    lessons: ['hydro/bases', 'hydro/distributeurs', 'hydro/pression', 'hydro/recepteurs'],
    viewBox: '0 0 820 500',
    levels: true, note: 'Valeurs d’exemple : vérin Ø 63 mm (S = 31,2 cm²), tige Ø 36 mm, limiteur taré à 150 b, pompe 20 L/min, pertes de charge ≈ 5 b. 1 t ≈ 1 000 daN.',
    legend: [],
    svg:
      // vérin
      '<rect class="zone z-off" id="chA" x="203" y="43" width="10" height="74"/>' +
      '<rect class="zone z-off" id="chB" x="220" y="43" width="10" height="74"/>' +
      '<g id="piston"><rect class="solid" x="0" y="43" width="18" height="74"/><rect class="ink-f" x="18" y="69" width="300" height="22"/>' +
        '<rect class="ink-f" x="318" y="50" width="62" height="60" rx="6"/><text x="349" y="76" text-anchor="middle" class="t-s">Charge</text>' +
        '<text id="chg" x="349" y="96" text-anchor="middle" class="t-s">0 b</text>' +
        '<path class="ink" d="M420 80 H386" marker-end="url(#sim-ar)"/></g>' +
      '<rect class="ink" x="200" y="40" width="380" height="80"/>' +
      '<text x="390" y="28" text-anchor="middle">Vérin double effet</text>' +
      '<text x="248" y="142" class="t-s">A (fond)</text><text x="548" y="142" class="t-s">B (tige)</text>' +
      // conduites
      '<path class="pipe" id="pA" d="M330 300 V230 H240 V120"/>' +
      '<path class="pipe" id="pB" d="M370 300 V250 H540 V120"/>' +
      '<path class="pipe" id="pP" d="M110 428 V400 H330 V380"/>' +
      '<path class="pipe" id="pT" d="M370 380 V482"/>' +
      '<path class="pipe" id="pL1" d="M220 400 V420"/>' +
      '<path class="pipe" id="pL2" d="M220 460 V482"/>' +
      // distributeur (tiroir mobile)
      '<g id="spool" style="transition:transform .45s ease">' +
        '<rect class="ink-f" x="0" y="300" width="240" height="80"/><path class="ink" d="M80 300 V380 M160 300 V380"/>' +
        '<path class="ink" d="M20 372 V306" marker-end="url(#sim-ar)"/><path class="ink" d="M60 308 V374" marker-end="url(#sim-ar)"/>' +
        '<path class="ink" d="M100 380 V340 H140 V378" marker-end="url(#sim-ar)"/><path class="ink" d="M100 300 V314 M92 314 H108 M140 300 V314 M132 314 H148"/>' +
        '<path class="ink" d="M180 374 L218 308" marker-end="url(#sim-ar)"/><path class="ink" d="M180 308 L218 372" marker-end="url(#sim-ar)"/>' +
        spring(-34, 326, 34, 28, 3) + spring(240, 326, 34, 28, 3) +
        '<path class="ink" d="M-34 334 H-50 M-34 346 H-50 M-50 346 V312"/><circle class="ink-f" cx="-50" cy="307" r="5"/>' +
      '</g>' +
      '<text x="318" y="294" text-anchor="middle" class="t-s t-m">A</text><text x="382" y="294" text-anchor="middle" class="t-s t-m">B</text>' +
      '<text x="318" y="396" text-anchor="middle" class="t-s t-m">P</text><text x="382" y="396" text-anchor="middle" class="t-s t-m">T</text>' +
      '<text x="600" y="330" class="t-s">Distributeur 4/3</text><text x="600" y="348" class="t-s">centre ouvert</text>' +
      // pompe
      '<rect class="ink-f" x="30" y="436" width="28" height="28"/><text x="44" y="455" text-anchor="middle" class="t-b">M</text><path class="ink" d="M58 446 H88 M58 454 H88"/>' +
      '<circle class="ink-f" cx="110" cy="450" r="22"/><path class="solid" d="M110 428 l-8 13 h16z"/>' +
      '<path class="ink" d="M110 472 V482"/>' + bache(110, 482) + '<text x="138" y="478" class="t-s">Pompe</text><text x="138" y="494" class="t-s">20 L/min</text>' +
      // limiteur de pression
      relief(220, 420, 1, 'limAr') +
      bache(220, 482) + bache(370, 482) +
      '<text x="252" y="488" class="t-s">Limiteur ' + TAR + ' b</text>' +
      gauge('needle', 285, 428) + '<path class="ink" d="M285 400 V411"/>' + '<circle class="solid" cx="220" cy="400" r="3.5"/><circle class="solid" cx="285" cy="400" r="3.5"/>' +
      '<text id="mtxt" x="306" y="433" class="t-b">0 b</text>' +
      '<text id="tEtat" x="680" y="200" text-anchor="middle" class="t-b">BLOQUÉ (neutre)</text><text id="tEtat2" x="680" y="220" text-anchor="middle" class="t-s"></text>',
    init: { man: 'N', charge: 1.5, pos: 0.2 },
    keep: ['pos'],
    controls: [
      { key: 'man', type: 'seg', label: 'Manette du distributeur', options: [['R', '◀ Rentrée'], ['N', 'Neutre'], ['S', 'Sortie ▶']] },
      { key: 'charge', type: 'range', label: 'Poids de la charge (au-delà de 4,6 t, la pression dépasse 150 b : le vérin ne peut plus sortir)', min: 0, max: 6.5, step: 0.1, unit: 't', dec: 1 }
    ],
    compute: function (st) {
      var d = { p: 5, qv: 0, ql: 0, moving: false, butee: false }, T = F(st.charge, 1) + ' t';
      var pc = d.pc = Math.round(st.charge * 1000 / SA); // P (bar) = F (daN) / S (cm²)
      if (st.man === 'S') {
        d.butee = st.pos >= 1; var trop = pc >= TAR;
        d.moving = !d.butee && !trop;
        d.p = d.moving ? pc + 5 : TAR; d.qv = d.moving ? QP : 0; d.ql = d.moving ? 0 : QP;
        d.text = d.moving ? 'Le tiroir relie <b>P → A</b> et <b>B → T</b> : le vérin sort. La pression monte juste à ce qu’il faut pour vaincre la charge : P = F / S = ' + F(st.charge * 1000) + ' daN / 31,2 cm² ≈ <b>' + pc + ' b</b> (+ 5 b de pertes). La <b>vitesse</b> dépend du <b>débit</b> (20 L/min), pas de la charge.'
          : d.butee ? 'Le vérin est <b>en butée</b> : l’huile ne peut plus aller nulle part, la pression monte jusqu’au tarage du <b>limiteur (150 b)</b> qui s’ouvre et renvoie tout le débit à la bâche : l’énergie part en chaleur.'
          : 'La charge de ' + T + ' demande ' + pc + ' b (P = F / S), plus que le tarage du limiteur : la pression plafonne à <b>150 b</b>, le limiteur s’ouvre et le vérin <b>ne peut pas sortir</b>. Baisse le poids sous 4,6 t pour qu’il sorte. (En rentrée, la charge pousse dans le même sens : il rentre quand même.)';
      } else if (st.man === 'R') {
        d.butee = st.pos <= 0; d.moving = !d.butee;
        d.p = d.moving ? 10 : TAR; d.qv = d.moving ? QP : 0; d.ql = d.moving ? 0 : QP;
        d.text = d.moving ? 'Le tiroir croise les voies : <b>P → B</b> et <b>A → T</b>. Le vérin rentre ; ici la charge pousse dans le même sens, la pression reste faible. Côté tige, la section est plus petite : il rentre <b>plus vite</b>.'
          : 'Vérin rentré en butée : la pression monte au tarage du limiteur (150 b), tout le débit passe par le limiteur.';
      } else {
        d.text = 'Au <b>neutre</b>, le distributeur à centre ouvert relie <b>P → T</b> : la pompe débite à la bâche presque sans pression (pertes de charge). A et B sont fermés : le vérin est bloqué. L’huile <b>enfermée côté A</b> retient la charge : sa pression vaut F / S = ' + pc + ' b pour ' + T + ' ; côté B, l’huile enfermée n’est pas chargée.';
      }
      d.trop = st.man === 'S' && pc >= TAR && !d.butee;
      d.etat = st.man === 'N' ? 'BLOQUÉ (neutre)' : d.moving ? (st.man === 'S' ? 'SORT' : 'RENTRE') : d.butee ? 'EN BUTÉE' : 'NE PEUT PAS SORTIR';
      d.readouts = [['État du vérin', d.etat, d.trop ? 'hot' : d.moving ? 'ok' : ''], ['Charge', T + ' → ' + pc + ' b'], ['Pression (manomètre)', F(d.p) + ' b', d.p >= TAR ? 'hot' : ''], ['Débit vers le vérin', F(d.qv) + ' L/min'],
        ['Débit par le limiteur', F(d.ql) + ' L/min', d.ql ? 'hot' : ''], ['Sortie de la tige', F(st.pos * 100) + ' %']];
      return d;
    },
    tick: function (st, dt, d) {
      if (!d.moving) return false;
      st.pos = Math.max(0, Math.min(1, st.pos + (st.man === 'S' ? dt / 3 : -dt / 2)));
      return true;
    },
    draw: function (a, st, d) {
      var px = 205 + st.pos * 235;
      a.move('piston', px, 0);
      a.attr('chA', 'width', Math.max(0, px - 203)); a.attr('chB', 'x', px + 18); a.attr('chB', 'width', Math.max(0, 577 - px - 18));
      a.text('chg', F(st.charge, 1) + ' t');
      a.q('spool').style.transform = 'translateX(' + ({ N: 230, S: 310, R: 150 }[st.man]) + 'px)';
      var lim = d.ql > 0, mv = d.moving ? 1 : 0;
      a.q('limAr').style.transform = lim ? 'translateX(-6px)' : ''; // ouvert : la flèche vient dans l’axe de la conduite
      a.lineP('pP', d.p, 1, { at: 0.35 });
      a.lineP('pL1', d.p, lim ? 1 : 0, { tag: false });
      a.lineP('pL2', lim ? 0 : null, lim ? 1 : 0, { tag: false });
      if (st.man === 'N') {
        a.lineP('pT', 0, 1, { dx: 30 }); var pk = d.pc > 0 ? d.pc : null; // huile enfermée : la charge appuie sur le fond
        a.lineP('pA', pk, 0, { at: 0.35 }); a.lineP('pB', null, 0); a.fillP('chA', pk); a.fillP('chB', null);
      } else if (st.man === 'S') {
        a.lineP('pA', d.p, mv, { at: 0.35 }); a.lineP('pB', 0, -mv, { at: 0.5 }); a.lineP('pT', 0, mv, { dx: 30 });
        a.fillP('chA', d.p); a.fillP('chB', 0);
      } else {
        a.lineP('pB', d.p, mv, { at: 0.5 }); a.lineP('pA', 0, -mv, { at: 0.35 }); a.lineP('pT', 0, mv, { dx: 30 });
        a.fillP('chB', d.p); a.fillP('chA', 0);
      }
      a.text('tEtat', d.etat); a.text('tEtat2', d.trop ? F(st.charge, 1) + ' t → ' + d.pc + ' b > limiteur 150 b' : '');
      a.q('tEtat').style.fill = d.trop ? 'var(--bad)' : '';
      a.move('needle', 0, 0, gAng(d.p, 200), 285, 428);
      a.text('mtxt', F(d.p) + ' b');
    },
    steps: [
      { title: 'Neutre', text: 'Distributeur au neutre (centre ouvert) : <b>P → T</b>. La pompe tourne mais l’huile retourne à la bâche sans pression. A et B fermés : le vérin est bloqué, l’huile enfermée côté A retient la charge (1,5 t ≈ 48 b).', set: { man: 'N', charge: 1.5, pos: 0.15 } },
      { title: 'Sortie, charge 1,5 t', text: 'On pousse la manette : <b>P → A</b>, <b>B → T</b>. La pression s’établit à ce que demande la charge : P = F / S = 1 500 daN / 31,2 cm² ≈ 48 b, + 5 b de pertes ≈ <b>53 b</b>.', set: { man: 'S', charge: 1.5 } },
      { title: 'Sortie, charge 3,8 t', text: 'Charge plus lourde : 3 800 daN / 31,2 cm² ≈ 122 b, la pression monte à ≈ <b>127 b</b>, mais la <b>vitesse ne change pas</b> : c’est le débit (20 L/min) qui fait la vitesse.', set: { man: 'S', charge: 3.8 } },
      { title: 'Butée', text: 'Le piston arrive en fin de course : la pression monte au tarage du <b>limiteur (150 b)</b>, qui renvoie tout le débit à la bâche (perte d’énergie en chaleur).', set: { man: 'S', charge: 3.8, pos: 1 } },
      { title: 'Charge trop lourde', text: 'Charge de 5,5 t : il faudrait 5 500 / 31,2 ≈ 176 b. Le limiteur s’ouvre à 150 b avant que le vérin puisse bouger. La pression dépend de la charge, mais elle est <b>plafonnée par le limiteur</b>.', set: { man: 'S', charge: 5.5, pos: 0.4 } },
      { title: 'Rentrée', text: 'Manette tirée : les voies se croisent, <b>P → B</b> et <b>A → T</b>. Côté tige la section est plus petite : même débit, vitesse plus grande.', set: { man: 'R', charge: 1.5, pos: 1 } }
    ]
  });

  /* ---------------- 2. Régulation Load Sensing (pompe du PPLD) ---------------- */
  var SB = 30, DAD = 320;
  SIMS.add({
    id: 'ppld-ls', subj: 'ppld', icon: '🚛', title: 'Régulation Load Sensing de la pompe (PPLD)',
    desc: 'Stand-by 30 b, pression de service = LS + 30 b, débit selon l’ouverture du tiroir, DAD 320 b en butée.',
    lessons: ['ppld/generation', 'ppld/rsq240', 'ppld/energie', 'hydro/ls'],
    viewBox: '0 0 820 470',
    levels: true, hpLabel: 'Pression (service / récepteur)', pilLabel: 'Signal LS (pilotage de la pompe)', note: 'Valeurs du cours : stand-by 30 b, DAD 320 b → 350 b, pompe 100 L/min.',
    legend: [],
    svg:
      // moteur d’entraînement + pompe à cylindrée variable (symbole du cahier)
      '<rect class="ink-f" x="14" y="236" width="28" height="28"/><text x="28" y="255" text-anchor="middle" class="t-b">M</text><path class="ink" d="M42 246 H80 M42 254 H80"/>' +
      '<circle class="ink-f" cx="120" cy="250" r="40"/><path class="solid" d="M160 250 l-14 -8 v16z"/>' +
      '<path class="ink" d="M90 290 L152 206" marker-end="url(#sim-ar)"/>' +
      '<path class="ink" d="M120 290 V420"/>' + bache(120, 420) +
      '<text x="58" y="318" class="t-s">Pompe à cylindrée</text><text x="58" y="334" class="t-s">variable</text><text id="tCyl" x="58" y="352" class="t-s">cylindrée 0 %</text>' +
      // régulateur LS, dessiné comme dans le livre : tiroir LS + ressort (stand-by 30 b), DAD (bille + ressort 320 b)
      '<path class="pipe thin" id="pPS" d="M190 250 V190 H44 V100 H70"/>' +
      '<path class="ink" d="M70 82 H150 V62 H250 V138 H150 V118 H70 Z" style="fill:var(--sim-bg)"/>' +
      '<g id="spool"><rect class="ink-f" x="74" y="88" width="78" height="24"/><rect class="solid" x="152" y="66" width="8" height="68"/></g>' +
      '<path id="lsSpr" class="ink" d=""/>' +
      '<g id="dadBall" style="transition:transform .3s"><circle class="ink-f" cx="215" cy="54" r="7"/></g><path class="ink" d="M203 62 L210 52 M227 62 L220 52"/>' +
      '<path class="ink" d="M215 46 L209 40 L221 34 L209 28 L221 22 L215 18"/>' +
      '<path id="dadOut" class="ink" d="M226 50 l14 -10" marker-end="url(#sim-ar)" style="opacity:.25"/><text x="244" y="40" class="t-s">→ bâche</text>' +
      '<text x="232" y="22" class="t-s">DAD 320 b</text><text x="190" y="156" class="t-s">ressort 30 b</text>' +
      '<text x="66" y="74" class="t-s">Tiroir LS</text><text x="20" y="96" class="t-s">PS</text>' +
      '<path class="ink" d="M110 118 V176 H124 V212" style="stroke-dasharray:6 4"/><text x="130" y="178" class="t-s">vérin de commande du plateau</text>' +
      // conduites
      '<path class="pipe" id="pP" d="M160 250 H400 V320 H455 V292"/>' +
      '<path class="pipe" id="pR" d="M470 208 V170 H640 V236 H660"/>' +
      '<path class="pipe" id="pRet" d="M485 292 V420"/>' + bache(485, 420) +
      '<path class="pipe thin" id="pLS" d="M640 170 V24 H290 V100 H250"/>' +
      // distributeur proportionnel 3 positions (centre fermé), commandé par manipulateur
      '<g id="dist" style="transition:transform .3s ease">' +
        '<rect class="ink-f" x="380" y="208" width="180" height="84"/><path class="ink" d="M440 208 V292 M500 208 V292 M380 200 H560 M380 300 H560"/>' +
        '<path class="ink" d="M395 288 L410 214" marker-end="url(#sim-ar)"/><path class="ink" d="M425 292 V280 M419 280 H431"/>' +
        '<path class="ink" d="M455 292 V280 M449 280 H461 M485 292 V280 M479 280 H491 M470 208 V220 M464 220 H476"/>' +
        '<path class="ink" d="M530 214 L545 288" marker-end="url(#sim-ar)"/><path class="ink" d="M515 292 V280 M509 280 H521"/>' +
        spring(346, 236, 34, 28, 3) + spring(560, 236, 22, 28, 3) +
        '<path class="ink" d="M346 244 H330 M346 256 H330 M330 256 V222"/><circle class="ink-f" cx="330" cy="217" r="5"/>' +
      '</g>' +
      '<text x="560" y="350" class="t-s">Distributeur proportionnel</text><text id="ouv" x="560" y="370" class="t-b">0 %</text>' +
      '<text x="448" y="204" class="t-s t-m">A</text><text x="440" y="306" class="t-s t-m">P</text><text x="492" y="306" class="t-s t-m">T</text>' +
      // récepteur (vérin simple effet, tige vers le haut)
      '<rect class="zone z-off" id="ch" x="662" y="240" width="76" height="8"/>' +
      '<g id="rod"><rect class="solid" x="662" y="230" width="76" height="10"/><rect class="ink-f" x="692" y="130" width="16" height="100"/>' +
        '<rect class="ink-f" x="660" y="100" width="80" height="30" rx="5"/><text id="chg" x="700" y="120" text-anchor="middle" class="t-s">0 b</text></g>' +
      '<path class="ink" d="M660 140 V250 H740 V140"/>' +
      '<text x="750" y="200" class="t-s">Récepteur</text><text x="750" y="216" class="t-s">(vérin)</text>' +
      '<text x="300" y="14" class="t-s" style="fill:var(--sim-pil)">Ligne LS : pression de la charge renvoyée au tiroir LS</text>' +
      gauge('nLS', 400, 62) + '<path class="ink" d="M400 24 V45"/><text id="tLS" x="422" y="67" class="t-b">0 b</text><text x="372" y="98" class="t-s">Manomètre LS</text>' +
      gauge('nP', 300, 292) + '<path class="ink" d="M300 250 V275"/><text id="tP" x="322" y="298" class="t-b">30 b</text>' +
      '<text x="250" y="334" class="t-s">Pression de service</text>' +
      [[190, 250], [300, 250], [640, 170], [400, 24]].map(function (q) { return '<circle class="solid" cx="' + q[0] + '" cy="' + q[1] + '" r="3.5"/>'; }).join(''),
    init: { ouv: 0, charge: 100, butee: false, pos: 0.3 },
    keep: ['pos'],
    controls: [
      { key: 'ouv', type: 'range', label: 'Ouverture du tiroir (manipulateur)', min: 0, max: 100, step: 5, unit: '%' },
      { key: 'charge', type: 'range', label: 'Pression demandée par la charge', min: 0, max: 300, step: 10, unit: 'b' },
      { key: 'butee', type: 'toggle', label: 'Récepteur en butée', on: 'Oui', off: 'Non' }
    ],
    compute: function (st) {
      var d = {};
      if (!st.ouv) { d.ls = 0; d.p = SB; d.q = 2; d.mode = 'sb'; }
      else if (st.butee) { d.ls = DAD; d.p = DAD + SB; d.q = 1; d.mode = 'dad'; }
      else { d.ls = st.charge; d.p = st.charge + SB; d.q = st.ouv; d.mode = 'run'; }
      d.kw = d.p * d.q / 600;
      d.text = d.mode === 'sb' ? '<b>Stand-by</b> : tiroir au neutre, la ligne LS est à la bâche (0 b). La pompe se met presque à cylindrée nulle et garde <b>30 b</b> (tarage du tiroir LS). Elle ne donne que le petit débit des gicleurs.'
        : d.mode === 'dad' ? 'Récepteur <b>en butée</b> : la pression LS monte au tarage du <b>DAD (320 b)</b>. La pompe annule son débit et garde la pression maxi : <b>320 + 30 = 350 b</b>, presque sans débit (pas de chaleur inutile).'
        : 'En travail : la ligne LS renvoie la pression de la charge (' + d.ls + ' b). La pompe règle <b>P service = LS + 30 b = ' + d.p + ' b</b>. Le débit suit l’ouverture du tiroir (' + d.q + ' L/min), quelle que soit la charge.';
      d.readouts = [['Pression de service', F(d.p) + ' b', d.mode === 'dad' ? 'hot' : ''], ['Pression LS', F(d.ls) + ' b'], ['Écart P − LS', SB + ' b'],
        ['Débit pompe', F(d.q) + ' L/min'], ['Puissance', F(d.kw, 1) + ' kW']];
      return d;
    },
    tick: function (st, dt, d) {
      if (d.mode !== 'run') return false;
      st.pos += dt * d.q / 250; if (st.pos > 1) st.pos = 0;
      return true;
    },
    draw: function (a, st, d) {
      var run = d.mode === 'run';
      // tiroir LS : en stand-by et en DAD il est repoussé (vérin de commande alimenté → plateau vers le mini) ; en travail il est en équilibre
      var sx = run ? 3 : 10;
      a.move('spool', sx, 0);
      a.attr('lsSpr', 'd', 'M' + (160 + sx) + ' 100 L' + (172 + sx * 0.8) + ' 76 L' + (186 + sx * 0.6) + ' 124 L' + (200 + sx * 0.4) + ' 76 L' + (214 + sx * 0.3) + ' 124 L' + (228 + sx * 0.2) + ' 76 L250 100');
      a.q('dadBall').style.transform = d.mode === 'dad' ? 'translateY(-6px)' : '';
      a.q('dadOut').style.opacity = d.mode === 'dad' ? 1 : 0.25;
      a.text('tCyl', 'cylindrée ' + F(d.mode === 'run' ? d.q : d.mode === 'sb' ? 2 : 1) + ' %');
      a.q('dist').style.transform = 'translateX(' + (st.ouv * 0.6) + 'px)';
      a.text('ouv', st.ouv + ' %'); a.text('chg', (st.butee ? 'butée' : st.charge + ' b'));
      var py = d.mode === 'dad' ? 1 : st.pos; a.move('rod', 0, -py * 70);
      a.attr('ch', 'y', 240 - py * 70); a.attr('ch', 'height', 8 + py * 70);
      a.lineP('pP', d.p, run || d.mode === 'sb' ? 1 : 0, { at: 0.3 });
      a.lineP('pPS', d.p, 0, { tag: false });
      a.lineP('pR', run || d.mode === 'dad' ? d.ls : null, run ? 1 : 0, { at: 0.3 });
      a.lineP('pRet', 0, 0, { dx: 30 });
      a.lineP('pLS', d.ls, 0, { at: 0.55, pil: true }); // signal LS = pilotage de la pompe
      a.fillP('ch', d.mode === 'sb' ? null : d.ls);
      a.move('nLS', 0, 0, gAng(d.ls, 400), 400, 62); a.text('tLS', F(d.ls) + ' b');
      a.move('nP', 0, 0, gAng(d.p, 400), 300, 292); a.text('tP', F(d.p) + ' b');
    },
    steps: [
      { title: 'Stand-by', text: 'Tiroir au neutre : <b>LS = 0 b</b>, la pompe garde <b>30 b</b> (tarage du tiroir LS) avec un débit presque nul. Très peu de puissance perdue.', set: { ouv: 0, charge: 100 } },
      { title: 'Travail, 100 b de charge', text: 'Tiroir ouvert à 50 % : la ligne LS renvoie 100 b ; la pompe donne <b>100 + 30 = 130 b</b> et 50 L/min.', set: { ouv: 50, charge: 100 } },
      { title: 'Charge plus lourde', text: 'Même ouverture, charge à 200 b : <b>P = 230 b</b>, mais le débit reste 50 L/min : la vitesse ne dépend pas de la charge.', set: { ouv: 50, charge: 200 } },
      { title: 'Ouverture maxi', text: 'Tiroir grand ouvert : le débit monte à <b>100 L/min</b> (débit maxi de la pompe), la pression reste LS + 30 b.', set: { ouv: 100, charge: 200 } },
      { title: 'Butée : DAD', text: 'Le récepteur arrive en butée : LS monte au <b>DAD 320 b</b>. La pompe annule son débit et maintient <b>350 b</b>.', set: { ouv: 100, charge: 200, butee: true } }
    ]
  });

})();
