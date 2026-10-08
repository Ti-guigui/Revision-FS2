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
  var gAng = function (p, max) { return -120 + Math.max(0, Math.min(1, p / max)) * 240; };

  /* ---------------- 1. Pompe, limiteur, distributeur 4/3, vérin double effet ---------------- */
  var TAR = 150, QP = 20;
  SIMS.add({
    id: 'hydro-verin', subj: 'hydro', icon: '🛢️', title: 'Distributeur 4/3, vérin double effet et limiteur de pression',
    desc: 'La pression dépend de la charge, la vitesse dépend du débit. En butée, le limiteur s’ouvre.',
    lessons: ['hydro/bases', 'hydro/distributeurs', 'hydro/pression', 'hydro/recepteurs'],
    viewBox: '0 0 820 500',
    levels: true, note: 'Valeurs d’exemple : limiteur taré à 150 b, pompe 20 L/min, pertes de charge ≈ 5 b.',
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
      '<path class="pipe" id="pL2" d="M220 462 V482"/>' +
      // distributeur (tiroir mobile)
      '<g id="spool" style="transition:transform .45s ease">' +
        '<rect class="ink-f" x="0" y="300" width="240" height="80"/><path class="ink" d="M80 300 V380 M160 300 V380"/>' +
        '<path class="ink" d="M20 372 V306" marker-end="url(#sim-ar)"/><path class="ink" d="M60 308 V374" marker-end="url(#sim-ar)"/>' +
        '<path class="ink" d="M100 380 V340 H140 V378" marker-end="url(#sim-ar)"/><path class="ink" d="M100 300 V314 M92 314 H108 M140 300 V314 M132 314 H148"/>' +
        '<path class="ink" d="M180 374 L218 308" marker-end="url(#sim-ar)"/><path class="ink" d="M180 308 L218 372" marker-end="url(#sim-ar)"/>' +
        spring(-34, 326, 34, 28, 3) + spring(240, 326, 34, 28, 3) +
        '<path class="ink" d="M-34 340 H-48 M-48 322 V358"/>' +
      '</g>' +
      '<text x="318" y="294" text-anchor="middle" class="t-s t-m">A</text><text x="382" y="294" text-anchor="middle" class="t-s t-m">B</text>' +
      '<text x="318" y="396" text-anchor="middle" class="t-s t-m">P</text><text x="382" y="396" text-anchor="middle" class="t-s t-m">T</text>' +
      '<text x="600" y="330" class="t-s">Distributeur 4/3</text><text x="600" y="348" class="t-s">centre ouvert</text>' +
      // pompe
      '<circle class="ink-f" cx="110" cy="450" r="22"/><path class="solid" d="M110 432 l9 14 h-18z"/>' +
      '<path class="ink" d="M110 472 V482"/>' + bache(110, 482) + '<text x="30" y="455" class="t-s">Pompe</text><text x="30" y="472" class="t-s">20 L/min</text>' +
      // limiteur de pression
      '<rect class="ink-f" x="204" y="420" width="32" height="42"/><g id="limAr" style="transition:transform .3s"><path class="ink" d="M226 426 V458" marker-end="url(#sim-ar)"/></g>' +
      spring(236, 432, 22, 16, 2) + '<path class="ink" d="M204 446 H196 V414 H220" style="stroke-dasharray:4 4"/>' +
      bache(220, 482) + bache(370, 482) +
      '<text x="262" y="474" class="t-s">Limiteur ' + TAR + ' b</text>' +
      gauge('needle', 285, 428) + '<path class="ink" d="M285 400 V411"/>' +
      '<text id="mtxt" x="306" y="433" class="t-b">0 b</text>',
    init: { man: 'N', charge: 50, pos: 0.2 },
    keep: ['pos'],
    controls: [
      { key: 'man', type: 'seg', label: 'Manette du distributeur', options: [['R', '◀ Rentrée'], ['N', 'Neutre'], ['S', 'Sortie ▶']] },
      { key: 'charge', type: 'range', label: 'Charge sur la tige (pression nécessaire)', min: 0, max: 200, step: 5, unit: 'b' }
    ],
    compute: function (st) {
      var d = { p: 5, qv: 0, ql: 0, moving: false, butee: false };
      if (st.man === 'S') {
        d.butee = st.pos >= 1; var trop = st.charge >= TAR;
        d.moving = !d.butee && !trop;
        d.p = d.moving ? st.charge + 5 : TAR; d.qv = d.moving ? QP : 0; d.ql = d.moving ? 0 : QP;
        d.text = d.moving ? 'Le tiroir relie <b>P → A</b> et <b>B → T</b> : le vérin sort. La pression monte juste à ce qu’il faut pour vaincre la charge (' + st.charge + ' b + pertes). La <b>vitesse</b> dépend du <b>débit</b> (20 L/min), pas de la charge.'
          : d.butee ? 'Le vérin est <b>en butée</b> : l’huile ne peut plus aller nulle part, la pression monte jusqu’au tarage du <b>limiteur (150 b)</b> qui s’ouvre et renvoie tout le débit à la bâche : l’énergie part en chaleur.'
          : 'La charge demande plus que le tarage du limiteur : la pression plafonne à <b>150 b</b>, le limiteur s’ouvre et le vérin <b>ne bouge pas</b>.';
      } else if (st.man === 'R') {
        d.butee = st.pos <= 0; d.moving = !d.butee;
        d.p = d.moving ? 10 : TAR; d.qv = d.moving ? QP : 0; d.ql = d.moving ? 0 : QP;
        d.text = d.moving ? 'Le tiroir croise les voies : <b>P → B</b> et <b>A → T</b>. Le vérin rentre ; ici la charge pousse dans le même sens, la pression reste faible. Côté tige, la section est plus petite : il rentre <b>plus vite</b>.'
          : 'Vérin rentré en butée : la pression monte au tarage du limiteur (150 b), tout le débit passe par le limiteur.';
      } else {
        d.text = 'Au <b>neutre</b>, le distributeur à centre ouvert relie <b>P → T</b> : la pompe débite à la bâche presque sans pression (pertes de charge). A et B sont fermés : le vérin est bloqué.';
      }
      d.readouts = [['Pression (manomètre)', F(d.p) + ' b', d.p >= TAR ? 'hot' : ''], ['Débit vers le vérin', F(d.qv) + ' L/min'],
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
      a.text('chg', st.charge + ' b');
      a.q('spool').style.transform = 'translateX(' + ({ N: 230, S: 310, R: 150 }[st.man]) + 'px)';
      var lim = d.ql > 0, mv = d.moving ? 1 : 0;
      a.lineP('pP', d.p, 1, { at: 0.35 });
      a.lineP('pL1', d.p, lim ? 1 : 0, { tag: false });
      a.lineP('pL2', lim ? 0 : null, lim ? 1 : 0, { tag: false });
      if (st.man === 'N') {
        a.lineP('pT', 0, 1, { dx: 30 }); a.lineP('pA', null, 0); a.lineP('pB', null, 0); a.fillP('chA', null); a.fillP('chB', null);
      } else if (st.man === 'S') {
        a.lineP('pA', d.p, mv, { at: 0.35 }); a.lineP('pB', 0, -mv, { at: 0.5 }); a.lineP('pT', 0, mv, { dx: 30 });
        a.fillP('chA', d.p); a.fillP('chB', 0);
      } else {
        a.lineP('pB', d.p, mv, { at: 0.5 }); a.lineP('pA', 0, -mv, { at: 0.35 }); a.lineP('pT', 0, mv, { dx: 30 });
        a.fillP('chB', d.p); a.fillP('chA', 0);
      }
      a.move('needle', 0, 0, gAng(d.p, 200), 285, 428);
      a.text('mtxt', F(d.p) + ' b');
    },
    steps: [
      { title: 'Neutre', text: 'Distributeur au neutre (centre ouvert) : <b>P → T</b>. La pompe tourne mais l’huile retourne à la bâche sans pression. A et B fermés : le vérin est bloqué.', set: { man: 'N', charge: 50, pos: 0.15 } },
      { title: 'Sortie, charge 50 b', text: 'On pousse la manette : <b>P → A</b>, <b>B → T</b>. La pression s’établit à ce que demande la charge : ≈ 55 b.', set: { man: 'S', charge: 50 } },
      { title: 'Sortie, charge 120 b', text: 'Charge plus lourde : la pression monte à ≈ 125 b, mais la <b>vitesse ne change pas</b> : c’est le débit (20 L/min) qui fait la vitesse.', set: { man: 'S', charge: 120 } },
      { title: 'Butée', text: 'Le piston arrive en fin de course : la pression monte au tarage du <b>limiteur (150 b)</b>, qui renvoie tout le débit à la bâche (perte d’énergie en chaleur).', set: { man: 'S', charge: 120, pos: 1 } },
      { title: 'Charge trop lourde', text: 'Charge qui demande 180 b : le limiteur s’ouvre à 150 b avant que le vérin puisse bouger. <b>Pression = charge</b>, plafonnée par le limiteur.', set: { man: 'S', charge: 180, pos: 0.4 } },
      { title: 'Rentrée', text: 'Manette tirée : les voies se croisent, <b>P → B</b> et <b>A → T</b>. Côté tige la section est plus petite : même débit, vitesse plus grande.', set: { man: 'R', charge: 50, pos: 1 } }
    ]
  });

  /* ---------------- 2. Régulation Load Sensing (pompe du PPLD) ---------------- */
  var SB = 30, DAD = 320;
  SIMS.add({
    id: 'ppld-ls', subj: 'ppld', icon: '🚛', title: 'Régulation Load Sensing de la pompe (PPLD)',
    desc: 'Stand-by 30 b, pression de service = LS + 30 b, débit selon l’ouverture du tiroir, DAD 320 b en butée.',
    lessons: ['ppld/generation', 'ppld/rsq240', 'ppld/energie', 'hydro/ls'],
    viewBox: '0 0 820 470',
    levels: true, note: 'Valeurs du cours : stand-by 30 b, DAD 320 b → 350 b, pompe 100 L/min.',
    legend: [],
    svg:
      // pompe à cylindrée variable
      '<circle class="ink-f" cx="120" cy="250" r="46"/><g id="plat"><line class="ink" x1="120" y1="212" x2="120" y2="288" style="stroke-width:5"/></g>' +
      '<path class="ink" d="M86 296 L154 204" marker-end="url(#sim-ar)"/>' +
      '<text x="120" y="320" text-anchor="middle" class="t-s">Pompe à cylindrée</text><text x="120" y="336" text-anchor="middle" class="t-s">variable (plateau)</text>' +
      '<path class="ink" d="M120 296 V420"/>' + bache(120, 420) +
      // régulateur (tiroir LS + DAD)
      '<rect class="ink-f" x="70" y="100" width="100" height="66" rx="6"/><text x="120" y="126" text-anchor="middle" class="t-s">Tiroir LS 30 b</text><text x="120" y="148" text-anchor="middle" class="t-s">DAD 320 b</text>' +
      '<path class="ink" d="M120 166 V204" style="stroke-dasharray:5 4"/>' +
      // conduites
      '<path class="pipe" id="pP" d="M166 250 H420"/>' +
      '<path class="pipe" id="pR" d="M520 250 H600"/>' +
      '<path class="pipe" id="pRet" d="M470 290 V420"/>' + bache(470, 420) +
      '<path class="pipe thin" id="pLS" d="M640 236 H690 V24 H120 V100"/>' +
      // distributeur proportionnel
      '<rect class="ink-f" x="420" y="210" width="100" height="80" rx="4"/><text x="470" y="236" text-anchor="middle" class="t-s">Distributeur</text>' +
      '<text x="470" y="254" text-anchor="middle" class="t-s">proportionnel</text><text id="ouv" x="470" y="276" text-anchor="middle" class="t-b">0 %</text>' +
      // récepteur (vérin vertical, tige vers le haut)
      '<rect class="zone z-off" id="ch" x="562" y="240" width="76" height="8"/>' +
      '<g id="rod"><rect class="solid" x="562" y="230" width="76" height="10"/><rect class="ink-f" x="592" y="130" width="16" height="100"/>' +
        '<rect class="ink-f" x="560" y="100" width="80" height="30" rx="5"/><text id="chg" x="600" y="120" text-anchor="middle" class="t-s">0 b</text></g>' +
      '<path class="ink" d="M560 140 V250 H640 V140"/>' +
      '<text x="700" y="200" class="t-s">Récepteur</text><text x="700" y="216" class="t-s">(vérin)</text>' +
      '<text x="200" y="14" class="t-s" style="fill:var(--sim-ls)">Ligne LS : pression de la charge renvoyée à la pompe</text>' +
      gauge('nLS', 330, 62) + '<path class="ink" d="M330 24 V45"/><text id="tLS" x="352" y="67" class="t-b">0 b</text><text x="300" y="98" class="t-s">Manomètre LS</text>' +
      gauge('nP', 290, 300) + '<path class="ink" d="M290 250 V283"/><text id="tP" x="312" y="306" class="t-b">30 b</text>' +
      '<text x="250" y="342" class="t-s">Pression de service</text>',
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
      var ang = -8 - 22 * Math.min(1, d.q / 100);
      a.move('plat', 0, 0, ang, 120, 250);
      a.text('ouv', st.ouv + ' %'); a.text('chg', (st.butee ? 'butée' : st.charge + ' b'));
      var py = d.mode === 'dad' ? 1 : st.pos; a.move('rod', 0, -py * 70);
      a.attr('ch', 'y', 240 - py * 70); a.attr('ch', 'height', 8 + py * 70);
      var run = d.mode === 'run';
      a.lineP('pP', d.p, run || d.mode === 'sb' ? 1 : 0, { at: 0.75 });
      a.lineP('pR', run || d.mode === 'dad' ? d.ls : null, run ? 1 : 0);
      a.lineP('pRet', run || d.mode === 'sb' ? 0 : null, run || d.mode === 'sb' ? 1 : 0, { dx: 30 });
      a.lineP('pLS', d.ls, 0, { at: 0.55 });
      a.fillP('ch', d.mode === 'sb' ? null : d.ls);
      a.move('nLS', 0, 0, gAng(d.ls, 400), 330, 62); a.text('tLS', F(d.ls) + ' b');
      a.move('nP', 0, 0, gAng(d.p, 400), 290, 300); a.text('tP', F(d.p) + ' b');
    },
    steps: [
      { title: 'Stand-by', text: 'Tiroir au neutre : <b>LS = 0 b</b>, la pompe garde <b>30 b</b> (tarage du tiroir LS) avec un débit presque nul. Très peu de puissance perdue.', set: { ouv: 0, charge: 100 } },
      { title: 'Travail, 100 b de charge', text: 'Tiroir ouvert à 50 % : la ligne LS renvoie 100 b ; la pompe donne <b>100 + 30 = 130 b</b> et 50 L/min.', set: { ouv: 50, charge: 100 } },
      { title: 'Charge plus lourde', text: 'Même ouverture, charge à 200 b : <b>P = 230 b</b>, mais le débit reste 50 L/min : la vitesse ne dépend pas de la charge.', set: { ouv: 50, charge: 200 } },
      { title: 'Ouverture maxi', text: 'Tiroir grand ouvert : le débit monte à <b>100 L/min</b> (débit maxi de la pompe), la pression reste LS + 30 b.', set: { ouv: 100, charge: 200 } },
      { title: 'Butée : DAD', text: 'Le récepteur arrive en butée : LS monte au <b>DAD 320 b</b>. La pompe annule son débit et maintient <b>350 b</b>.', set: { ouv: 100, charge: 200, butee: true } }
    ]
  });

  /* ---------------- 3. Transmission hydrostatique (circuit fermé) ---------------- */
  var GAV = 20, ECH = 18, ANN = 280;
  SIMS.add({
    id: 'hydro-ferme', subj: 'hydro', icon: '🔁', title: 'Transmission hydrostatique en circuit fermé',
    desc: 'Pompe réversible et moteur hydraulique : HP / BP, gavage 20 b, échange 18 b, annulation de débit 280 b.',
    lessons: ['hydro/hydrostatique', 'hydro/circuit-ferme'],
    viewBox: '0 0 820 470',
    levels: true, pilLabel: 'Gavage 20 b', note: 'Valeurs du cours : gavage 20 b, échange 18 b, annulation 280 b, soupapes HP 320 b. Vitesse du moteur : valeur d’exemple.',
    legend: [],
    svg:
      '<path class="pipe" id="bH" d="M150 196 V90 H670 V196"/>' +
      '<path class="pipe" id="bL" d="M150 284 V370 H670 V284"/>' +
      // pompe principale réversible
      '<circle class="ink-f" cx="150" cy="240" r="44"/><path class="solid" d="M150 200 l9 13 h-18z"/><path class="solid" d="M150 280 l9 -13 h-18z"/>' +
      '<path class="ink" d="M118 274 L184 206" marker-end="url(#sim-ar)"/>' +
      '<text x="40" y="236" class="t-s">Pompe</text><text x="40" y="252" class="t-s">réversible</text>' +
      // moteur hydraulique
      '<circle class="ink-f" cx="670" cy="240" r="44"/><g id="rotor"><path class="ink" d="M670 206 V274 M636 240 H704" style="stroke-width:4"/></g>' +
      '<text x="726" y="236" class="t-s">Moteur</text><text x="726" y="252" class="t-s">hydraulique</text><text id="tN" x="726" y="272" class="t-s">0 tr/min</text>' +
      // gavage (au centre de la boucle)
      '<path class="pipe thin" id="gvH" d="M300 218 V90"/><path class="pipe thin" id="gvL" d="M300 262 V370"/>' +
      '<path class="pipe thin" id="gvLim" d="M322 240 H360"/>' +
      '<circle class="ink-f" cx="300" cy="240" r="22"/><path class="solid" d="M300 224 l8 12 h-16z"/>' +
      '<path class="ink-f" d="M292 132 l8 -12 l8 12 z"/><path class="ink-f" d="M292 328 l8 12 l8 -12 z"/>' +
      '<text x="312" y="130" class="t-s">clapet</text><text x="312" y="340" class="t-s">clapet</text>' +
      '<text x="238" y="280" class="t-s">Pompe de</text><text x="238" y="296" class="t-s">gavage</text>' +
      '<rect class="ink-f" x="360" y="226" width="30" height="28"/>' + spring(390, 233, 16, 14, 2) + '<path class="ink" d="M375 254 V266"/>' + bache(375, 266) +
      '<text x="352" y="300" class="t-s">Limiteur de</text><text x="352" y="316" class="t-s">gavage 20 b</text>' +
      // tiroir d'échange
      '<path class="pipe thin" id="exH" d="M505 90 V200"/><path class="pipe thin" id="exL" d="M505 370 V280"/>' +
      '<rect class="ink-f" id="tir" x="470" y="200" width="70" height="80" rx="4"/><text x="505" y="236" text-anchor="middle" class="t-s">Tiroir</text><text x="505" y="252" text-anchor="middle" class="t-s">d’échange</text>' +
      '<path class="pipe thin" id="exO" d="M540 240 H580"/><rect class="ink-f" x="580" y="226" width="26" height="28"/>' + spring(590, 254, 12, 12, 2) +
      gauge('nH', 90, 130) + '<path class="ink" d="M107 130 H150"/><text id="tH" x="90" y="168" text-anchor="middle" class="t-b">20 b</text>' +
      gauge('nL', 90, 336) + '<path class="ink" d="M107 336 H150"/><text id="tL" x="90" y="374" text-anchor="middle" class="t-b">20 b</text>' +
      '<text x="548" y="296" class="t-s">Limiteur</text><text x="548" y="312" class="t-s">d’échange 18 b</text><text x="548" y="328" class="t-s">→ refroidisseur</text>' +
      '',
    init: { man: 0, charge: 150, ang: 0 },
    keep: ['ang'],
    controls: [
      { key: 'man', type: 'range', label: 'Manette (cylindrée de la pompe) : arrière ← → avant', min: -100, max: 100, step: 10, unit: '%' },
      { key: 'charge', type: 'range', label: 'Effort à vaincre (pression demandée)', min: 0, max: 320, step: 10, unit: 'b' }
    ],
    compute: function (st) {
      var d = { dir: st.man > 0 ? 1 : st.man < 0 ? -1 : 0 };
      d.ann = d.dir && st.charge >= ANN;
      if (!d.dir) { d.hp = GAV; d.bp = GAV; d.n = 0; }
      else if (d.ann) { d.hp = ANN; d.bp = ECH; d.n = 0; }
      else { d.hp = Math.max(ECH + 5, st.charge); d.bp = ECH; d.n = Math.abs(st.man) * 25; }
      d.text = !d.dir ? '<b>Neutre</b> : plateau de la pompe à zéro, pas de débit dans la boucle. La pompe de gavage remplit les <b>deux branches à 20 b</b> par les clapets ; le surplus part par le <b>limiteur de gavage</b>.'
        : d.ann ? 'Effort trop grand : la HP atteint <b>280 b</b>, l’<b>annulation de débit</b> ramène la pompe vers la cylindrée nulle : le moteur s’arrête sans faire caler le moteur thermique (les soupapes HP 320 b protègent des pics).'
        : 'Marche ' + (d.dir > 0 ? 'avant' : 'arrière') + ' : la branche ' + (d.dir > 0 ? 'du haut' : 'du bas') + ' est en <b>HP (' + d.hp + ' b)</b>, l’autre en <b>BP</b>. Le tiroir d’échange, piloté par la HP, envoie la BP au <b>limiteur d’échange 18 b</b> (huile chaude au refroidisseur) ; le gavage la remplace à 20 b.';
      d.readouts = [['Branche HP', F(d.hp) + ' b', d.ann ? 'hot' : ''], ['Branche BP', F(d.bp) + ' b'], ['Gavage', GAV + ' b'], ['Moteur', F(d.n) + ' tr/min']];
      return d;
    },
    tick: function (st, dt, d) { if (!d.n) return false; st.ang = (st.ang + d.dir * d.n * dt * 0.6) % 360; return true; },
    draw: function (a, st, d) {
      var up = d.dir > 0, run = d.dir !== 0 && !d.ann;
      var pH = up ? d.hp : d.bp, pL = up ? d.bp : d.hp, G = { pil: true };
      if (!d.dir) { a.lineP('bH', GAV, 0, { pil: true, at: 0.75 }); a.lineP('bL', GAV, 0, { pil: true, at: 0.75 }); }
      else { a.lineP('bH', pH, run ? (up ? 1 : -1) : 0, { at: 0.75 }); a.lineP('bL', pL, run ? (up ? -1 : 1) : 0, { at: 0.75 }); }
      a.lineP('gvH', GAV, !d.dir || !up ? 1 : 0, { pil: true, at: 0.55, dx: -34 });
      a.lineP('gvL', GAV, !d.dir || up ? 1 : 0, { pil: true, at: 0.55, dx: -34 });
      a.lineP('gvLim', GAV, !d.dir ? 1 : 0, { pil: true, tag: false });
      a.lineP('exH', d.dir ? pH : null, !up && run ? 1 : 0, { tag: false });
      a.lineP('exL', d.dir ? pL : null, up && run ? 1 : 0, { tag: false });
      a.lineP('exO', run ? ECH : null, run ? 1 : 0, { tag: false });
      var gH = d.dir ? pH : GAV, gL = d.dir ? pL : GAV;
      a.move('nH', 0, 0, gAng(gH, 400), 90, 130); a.text('tH', F(gH) + ' b');
      a.move('nL', 0, 0, gAng(gL, 400), 90, 336); a.text('tL', F(gL) + ' b');
      a.move('rotor', 0, 0, st.ang, 670, 240);
      a.text('tN', F(d.n) + ' tr/min');
    },
    steps: [
      { title: 'Neutre', text: 'Pompe à cylindrée nulle : la boucle est immobile. Le <b>gavage</b> remplit les deux branches à <b>20 b</b> (compense les fuites, plaque les pistons).', set: { man: 0, charge: 150 } },
      { title: 'Marche avant, mi-course', text: 'La manette incline le plateau : la branche du haut passe en <b>HP</b> (pression = effort à vaincre), celle du bas en <b>BP</b>. Le moteur tourne.', set: { man: 50, charge: 150 } },
      { title: 'Marche avant, plein débit', text: 'Plus de cylindrée = plus de débit = <b>moteur plus rapide</b>. La HP ne change pas : elle ne dépend que de l’effort.', set: { man: 100, charge: 150 } },
      { title: 'Échange et refroidissement', text: 'Piloté par la HP, le <b>tiroir d’échange</b> ouvre la BP vers le limiteur d’échange (<b>18 b</b>, taré plus bas que le gavage) : l’huile chaude part au refroidisseur, le gavage injecte de l’huile fraîche.', set: { man: 100, charge: 200 } },
      { title: 'Marche arrière', text: 'On passe la manette de l’autre côté : le plateau s’incline à l’envers, <b>les branches HP et BP s’inversent</b>, le moteur tourne dans l’autre sens.', set: { man: -60, charge: 150 } },
      { title: 'Surcharge : annulation de débit', text: 'L’effort demande 300 b : à <b>280 b</b> l’annulation de débit ramène la pompe à cylindrée nulle, le moteur s’arrête sans caler le moteur thermique.', set: { man: 80, charge: 300 } }
    ]
  });
})();
