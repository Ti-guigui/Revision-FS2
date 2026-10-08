/* Simulateur : régulation Load Sensing de la pompe du PPLD — dessiné d’après le schéma « DAD / stand-by » (tiroir LS, ressort de stand-by,
   DAD, gicleur anti-pompage, gicleur LS, vérin de commande et vérin de rappel du plateau) */
(function () {
  var F = SIMS.fmt;
  var SB = 30, QAP = 1, QDAD = 0.5, QMAX = 100;

  function bache(x, y) { return '<path class="ink" d="M' + (x - 12) + ' ' + y + ' V' + (y + 10) + ' H' + (x + 12) + ' V' + y + '"/>'; }
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
  function gicleur(x, y1, y2) { // étranglement (gicleur) sur une ligne verticale
    var m = (y1 + y2) / 2;
    return '<path class="ink" d="M' + (x - 7) + ' ' + y1 + ' V' + (m - 5) + ' L' + (x - 2) + ' ' + m + ' V' + y2 + ' M' + (x + 7) + ' ' + y1 + ' V' + (m - 5) + ' L' + (x + 2) + ' ' + m + ' V' + y2 + '" style="stroke-width:2"/>';
  }
  function gauge(id, x, y) {
    return '<circle class="ink-f" cx="' + x + '" cy="' + y + '" r="16"/><line id="' + id + '" class="ink" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y - 12) + '" style="stroke-width:2.6"/><circle class="solid" cx="' + x + '" cy="' + y + '" r="2.5"/>';
  }
  var gAng = function (p, max) { return -120 + Math.max(0, Math.min(1, p / max)) * 240; };
  function dot(x, y) { return '<circle class="solid" cx="' + x + '" cy="' + y + '" r="3.2"/>'; }

  SIMS.add({
    id: 'ppld-ls', subj: 'ppld', icon: '🚛', title: 'Régulation Load Sensing de la pompe (PPLD) : stand-by et DAD',
    desc: 'D’après ton schéma : la pression LS s’ajoute au ressort de stand-by (30 b) → pression de service (full flow) = LS + 30 b. Le DAD plafonne la LS (low flow) : pression maxi = DAD + 30 b.',
    lessons: ['ppld/generation', 'ppld/rsq240', 'ppld/energie', 'hydro/ls'],
    viewBox: '0 0 1000 600', minWidth: 900,
    levels: true, hpLabel: 'Pression de service (full flow)', pilLabel: 'Pression LS (low flow)', bpLabel: '0 b (retour bâche)',
    note: 'Valeurs du cours et de tes fiches : stand-by 30 b, DAD 320 b (réglable ici), gicleur anti-pompage 1 L/min, gicleur LS 0,5 L/min, DAD ouvert : il ne laisse passer que les 0,5 L/min du gicleur LS, pompe 100 L/min. Débits et pressions des étapes : tes fiches de phases (treuil, RMU, stabilisateurs).',
    svg:
      // ---- conduites ----
      '<path class="pipe" id="pP" d="M140 560 H775 V462"/>' +
      '<path class="pipe thin" id="pPS" d="M170 560 V300 H110 V201 H142"/>' +
      '<path class="pipe thin" id="pVC" d="M230 232 V415 H300"/>' +
      '<path class="pipe thin" id="pAP" d="M230 168 V112"/>' +
      '<path class="pipe" id="pR" d="M790 398 V360 H900 V322"/>' +
      '<path class="pipe thin" id="pLS" d="M840 360 V350 H420 V332"/>' +
      '<path class="pipe thin" id="pDAD" d="M420 48 V24"/>' +
      '<path class="pipe" id="pRet" d="M805 462 V480 H960 V520"/>' +
      '<path class="pipe thin" id="pSuc" d="M60 584 V560 H80"/>' +
      // ---- moteur + pompe à cylindrée variable ----
      '<rect id="mBox" class="ink-f" x="4" y="508" width="28" height="28"/><text x="18" y="527" text-anchor="middle" class="t-b">M</text><path class="ink" d="M32 518 H80 M32 526 H80"/>' +
      '<path id="arbre" d="M34 522 H80" style="stroke:#f59e0b;stroke-width:5;stroke-dasharray:6 6;fill:none;opacity:0"/>' +
      '<text id="tMot" x="4" y="500" class="t-s t-b">moteur en marche</text>' +
      '<circle class="ink-f" cx="110" cy="560" r="30"/><g id="rotP"><path d="M110 534 V586 M84 560 H136" style="stroke:#f59e0b;stroke-width:3;opacity:.8"/></g><path class="solid" d="M140 560 l-12 -7 v14z"/><path class="ink" d="M86 586 L136 532" marker-end="url(#sim-ar)"/>' +
      bache(60, 584) + '<text x="110" y="528" text-anchor="middle" class="t-s">Pompe</text>' +
      // ---- tiroir LS (corps : petit alésage + grande chambre) ----
      '<rect id="zPS" class="zone z-off" x="142" y="172" width="8" height="58" style="transition:transform .45s ease;transform-origin:142px 200px"/>' +
      '<rect id="zA1" class="zone z-off" x="190" y="172" width="70" height="58" style="transition:transform .45s ease;transform-origin:260px 200px"/><rect id="zA2" class="zone z-off" x="262" y="102" width="38" height="196" style="transition:transform .45s ease;transform-origin:262px 200px"/>' +
      '<rect id="zLS" class="zone z-off" x="318" y="102" width="150" height="196" style="transition:transform .45s ease;transform-origin:468px 200px"/>' +
      '<path class="ink" d="M142 170 H260 V100 H470 V300 H260 V232 H142" style="fill:none;stroke-width:3"/>' +
      '<g id="spool" style="transition:transform .45s ease"><rect class="solid" x="150" y="174" width="40" height="54" rx="3"/><rect class="ink-f" x="190" y="192" width="112" height="18"/><rect class="solid" x="300" y="104" width="18" height="192"/></g>' +
      '<path id="lsSpr" class="ink" d="' + zig(318, 200, 468, 150, 5) + '" style="stroke-width:2.6;transition:transform .45s ease;transform-origin:468px 200px"/>' +
      '<text x="120" y="152" class="t-b">Tiroir LS</text>' +
      '<text x="480" y="210" class="t-b" style="fill:#dc2626">Stand-by</text><text x="480" y="228" class="t-b" style="fill:#dc2626">30 b</text>' +
      '<text x="96" y="196" text-anchor="end" class="t-b" style="fill:#dc2626">PS</text>' +
      // gicleur anti-pompage (retour bâche)
      gicleur(230, 170, 140) + '<path class="ink" d="M230 112 V100"/>' + bache(230, 88) +
      '<text x="150" y="70" class="t-s" style="fill:#2563eb">Gicleur anti-pompage</text><text x="150" y="86" class="t-s" style="fill:#2563eb">1 L/min → retour bâche</text>' +
      // DAD : bille + siège + ressort sur la chambre LS
      '<path class="ink" d="M406 100 L420 114 L434 100" style="fill:none;stroke-width:2.6"/>' +
      '<g id="dadB" style="transition:transform .3s"><circle class="solid" cx="420" cy="96" r="9"/></g>' +
      '<path class="ink" d="M402 88 V48 M438 88 V48 H402"/><path id="dadSpr" class="ink" d="' + zigV(420, 86, 50, 22, 3) + '"/>' +
      '<g id="dadOut" style="opacity:.2"><path class="ink" d="M404 92 L390 80 M436 92 L450 80" marker-end="url(#sim-ar)"/></g>' +
      bache(420, 12) + '<text x="448" y="40" class="t-b">DAD</text><text id="tDAD" x="448" y="58" class="t-b">320 b</text><text id="tDADq" x="448" y="76" class="t-s"></text>' +
      // gicleur LS 0,5 L/min (arrivée LS sous la chambre)
      gicleur(420, 300, 330) + '<text x="434" y="322" class="t-s" style="fill:#7c3aed">Gicleur 0,5 L/min</text>' +
      
      // vérin de commande, vérin de rappel, plateau
      '<rect class="ink-f" x="300" y="400" width="120" height="30"/>' +
      '<rect id="zVC" class="zone z-off" x="302" y="402" width="70" height="26" style="transition:transform .6s ease;transform-origin:302px 415px"/>' +
      '<g id="vcP" style="transition:transform .6s ease"><rect class="solid" x="372" y="402" width="8" height="26"/><path class="ink" d="M380 415 H456" style="stroke-width:3"/></g>' +
      '<rect class="ink-f" x="300" y="490" width="120" height="30"/><g id="vrP" style="transition:transform .6s ease"><rect class="solid" x="372" y="492" width="8" height="26"/><path class="ink" d="M380 505 H456" style="stroke-width:3"/></g>' +
      '<path class="ink" d="' + zig(270, 505, 300, 12, 3) + '"/>' +
      '<g id="plat" style="transition:transform .6s ease;transform-origin:460px 460px"><rect class="ink-f" x="456" y="380" width="8" height="160"/></g><circle class="solid" cx="460" cy="460" r="5"/>' +
      '<path class="ink" d="M426 387 L494 533 M460 372 V548" style="stroke-dasharray:8 3 2 3;stroke-width:1.2"/>' +
      '<text x="416" y="378" text-anchor="middle" class="t-s t-b">Max</text><text x="466" y="366" text-anchor="middle" class="t-s t-b">Min</text>' +
      '<text x="300" y="393" class="t-s">Vérin de commande</text>' +
      '<text x="300" y="483" class="t-s">Vérin de rappel</text><text x="476" y="430" class="t-s">Plateau</text><text x="476" y="446" class="t-s">pompe</text>' +
      '<text id="tCyl" x="476" y="466" class="t-s t-b">cylindrée 1 %</text>' +
      // distributeur proportionnel (élément) et récepteur
      '<g id="dist" style="transition:transform .3s ease">' +
        '<rect class="ink-f" x="700" y="398" width="180" height="64"/><path class="ink" d="M760 398 V462 M820 398 V462 M700 390 H880 M700 470 H880"/>' +
        '<path class="ink" d="M715 460 L730 404" marker-end="url(#sim-ar)"/><path class="ink" d="M745 462 V452 M739 452 H751"/>' +
        '<path class="ink" d="M775 462 V452 M769 452 H781 M805 462 V452 M799 452 H811 M790 398 V408 M784 408 H796"/>' +
        '<path class="ink" d="M850 404 L865 460" marker-end="url(#sim-ar)"/><path class="ink" d="M835 462 V452 M829 452 H841"/>' +
        '<path class="ink" d="' + zig(672, 430, 700, 22, 3) + '"/><path class="ink" d="' + zig(880, 430, 900, 22, 3) + '"/>' +
        '<path class="ink" d="M672 424 H660 M672 436 H660 M660 436 V404"/><circle class="ink-f" cx="660" cy="399" r="5"/>' +
      '</g>' + bache(960, 520) +
      '<text x="700" y="500" class="t-s">Élément de distributeur</text><text id="ouv" x="700" y="518" class="t-b">0 L/min</text>' +
      '<rect class="zone z-off" id="ch" x="862" y="312" width="76" height="8"/>' +
      '<g id="rod"><rect class="solid" x="862" y="302" width="76" height="10"/><rect class="ink-f" x="892" y="202" width="16" height="100"/>' +
        '<rect class="ink-f" x="860" y="172" width="80" height="30" rx="5"/><text id="chg" x="900" y="192" text-anchor="middle" class="t-s">0 b</text></g>' +
      '<path class="ink" d="M860 212 V322 H940 V212"/><text x="852" y="262" text-anchor="end" class="t-s">Récepteur</text>' +
      // manomètres
      gauge('nP', 560, 520) + '<path class="ink" d="M560 560 V536"/><text id="tP" x="582" y="525" class="t-b">30 b</text><text x="510" y="494" class="t-s">Pression de service</text>' +
      gauge('nLS', 660, 314) + '<path class="ink" d="M660 350 V330"/><text id="tLS" x="682" y="319" class="t-b">0 b</text><text x="620" y="288" class="t-s">Manomètre LS</text>' +
      [[170, 560], [560, 560], [840, 360], [660, 350]].map(function (q) { return dot(q[0], q[1]); }).join(''),
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
      // le ressort de stand-by retient le tiroir, le vérin de commande n’est pas alimenté : cylindrée maximum
      d.plein = d.mode === 'run' && st.ouv >= QMAX - QAP;
      d.ps = d.plein ? d.ls : d.ls + SB;
      d.Q = d.plein ? QMAX : d.q + QAP + (d.dadOpen ? QDAD : 0);
      d.cyl = Math.max(1, Math.round(d.Q / QMAX * 100));
      if (!st.moteur) { d.mode = 'arret'; d.plein = false; d.ps = 0; d.ls = 0; d.q = 0; d.Q = 0; d.cyl = 100; d.dadOpen = d.secOpen = false; }
      d.kw = d.ps * d.Q / 600;
      d.text = d.mode === 'arret' ? '<b>Au repos (moteur à l’arrêt)</b> : aucune pression. Le <b>vérin de rappel</b> (ressort) pousse le plateau : la pompe est en <b>cylindrée maximum</b>. Dès le démarrage, la pression monte et la régulation ramène le plateau au débit dont le circuit a besoin.'
        : d.mode === 'sb'
        ? '<b>Stand-by</b> : éléments au neutre, la ligne LS est à la bâche (<b>LS = 0 b</b>). Seul le ressort de stand-by retient le tiroir : dès que la <b>PS dépasse 30 b</b>, le tiroir se déplace, envoie la pression au <b>vérin de commande</b> qui ramène le <b>plateau vers le mini</b>. La pompe garde <b>30 b</b> et ne débite que ce que consomme le <b>gicleur anti-pompage (1 L/min)</b>.'
        : d.dadOpen
          ? '<b>Butée : le DAD s’ouvre</b>. La LS (low flow) monte jusqu’au tarage du ressort du DAD (<b>' + dad + ' b</b>) : la bille se soulève et laisse passer vers la bâche <b>seulement les 0,5 L/min</b> qui arrivent par le <b>gicleur LS</b> (ligne LS → gicleur → chambre → DAD). Tant que le DAD est fermé, rien ne circule dans le gicleur LS. Pour déplacer le tiroir, la <b>pression de service (full flow)</b> doit vaincre <b>LS + ressort de stand-by = ' + dad + ' + 30 = ' + d.ps + ' b</b> : le tiroir comprime le ressort, alimente le vérin de commande, le plateau revient au mini → <b>annulation de débit</b>, pression maxi maintenue.'
          : d.secOpen
            ? '<b>Butée</b> : le <b>limiteur secondaire de l’élément (' + sec + ' b)</b> plafonne la pression LS avant le DAD (' + dad + ' b, resté fermé). La pompe maintient <b>PS = ' + sec + ' + 30 = ' + d.ps + ' b</b>, plateau au mini.'
            : d.plein ? '<b>Plein débit</b> : le distributeur est <b>ouvert au maximum</b>. La pression dans la ligne LS est <b>identique</b> à la pression de service (' + d.ps + ' b). Le tiroir LS reçoit la même pression de chaque côté, mais le <b>ressort de stand-by</b> ne permet pas son déplacement : le <b>vérin de commande n’est pas alimenté</b>, la pompe est en <b>cylindrée maximum</b> (100 L/min).'
            : '<b>Contrôle du débit</b> : le distributeur est ouvert partiellement. La pression LS (' + d.ls + ' b, la charge) <b>s’ajoute au ressort de stand-by (30 b)</b> derrière le tiroir. Le tiroir s’équilibre quand <b>PS = LS + 30 = ' + d.ps + ' b</b> : il dose l’huile envoyée au vérin de commande et le plateau prend la cylindrée qu’il faut pour donner <b>' + F(d.q) + ' L/min</b> à l’élément (+ 1 L/min du gicleur anti-pompage). ΔP de l’élément = 30 b : la vitesse ne dépend pas de la charge.';
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
      var run = d.mode === 'run', sb = d.mode === 'sb';
      // tiroir : repoussé vers le ressort (stand-by, butée) → PS vers le vérin de commande ; en travail il est en équilibre
      // le tiroir comprime le ressort de stand-by d’autant plus que la pression de service l’emporte sur LS + ressort
      var dx = d.plein || d.mode === 'arret' ? 0 : run ? Math.round(8 + 30 * (1 - d.q / 99)) : 40;
      a.q('spool').style.transform = 'translateX(' + dx + 'px)';
      // ressort de stand-by comprimé et chambres qui suivent le tiroir (même animation)
      var sx = function (id, k) { a.q(id).style.transform = 'scaleX(' + k.toFixed(3) + ')'; };
      sx('lsSpr', (150 - dx) / 150); sx('zLS', (150 - dx) / 150); sx('zPS', (8 + dx) / 8); sx('zA1', (70 - dx) / 70); sx('zA2', (38 + dx) / 38);
      a.fillP('zPS', d.ps);
      var pvc = d.plein || d.mode === 'arret' ? 0 : d.ps * Math.min(1, dx / 40); // pression envoyée au vérin de commande (ordre de grandeur)
      a.fillP('zA1', pvc > 1 ? pvc : 0, { op: 0.6 }); a.fillP('zA2', pvc > 1 ? pvc : 0, { op: 0.6 });
      a.fillP('zLS', d.ls > 0 ? d.ls : 0, { pil: d.ls > 0, op: 0.55 });
      a.fillP('zVC', pvc > 1 ? pvc : 0, { op: 0.7 });
      a.lineP('pP', d.ps, d.Q > 1 ? 1 : 0, { at: 0.42 });
      a.lineP('pPS', d.ps, 0, { tag: false });
      a.lineP('pVC', pvc > 1 ? pvc : 0, 0, { tag: false });
      a.lineP('pAP', 0, 1, { tag: false });
      a.lineP('pR', run || d.mode === 'butee' ? d.ls : null, run && d.q ? 1 : 0, { at: 0.3, pil: d.ls > 0 }); // ligne du récepteur = pression LS (même couleur que la ligne LS)
      a.lineP('pLS', d.ls, d.dadOpen ? 1 : 0, { pil: d.ls > 0, at: 0.62 }); // DAD fermé : rien ne circule dans le gicleur LS ; ouvert : LS → gicleur 0,5 L/min → DAD → bâche
      a.lineP('pDAD', 0, d.dadOpen ? 1 : 0, { tag: false });
      a.lineP('pRet', 0, 0, { tag: false }); a.lineP('pSuc', 0, d.Q > 0 ? 1 : 0, { tag: false });
      var on = d.mode !== 'arret';
      a.q('arbre').style.opacity = on ? 1 : 0; a.q('arbre').style.strokeDashoffset = -(st.sh || 0); a.q('rotP').style.display = on ? '' : 'none';
      a.q('mBox').style.fill = on ? 'rgba(245,158,11,.35)' : ''; a.text('tMot', on ? 'moteur en marche' : 'moteur à l’arrêt');
      a.move('rotP', 0, 0, st.rot || 0, 110, 560);
      // DAD
      a.q('dadB').style.transform = d.dadOpen ? 'translateY(-7px)' : '';
      a.attr('dadSpr', 'd', zigV(420, d.dadOpen ? 79 : 86, 50, 22, 3));
      a.q('dadOut').style.opacity = d.dadOpen ? 1 : 0.2;
      a.text('tDAD', st.dad + ' b'); a.text('tDADq', d.dadOpen ? 'ouvert : 0,5 L/min' : 'fermé');
      // plateau, vérin de commande, vérin de rappel
      var c = d.cyl / 100, ang = -25 * c;
      // plateau et vérins liés : les tiges restent en appui sur le plateau (vérin de commande à 125 px du pivot, vérin de rappel à 35 px)
      // pivot au milieu : le haut (vérin de commande) part à gauche, le bas (vérin de rappel) part à droite vers Max
      var sn = Math.sin(-ang * Math.PI / 180), dxC = -45 * sn, dxR = 45 * sn;
      a.q('plat').style.transform = 'rotate(' + ang + 'deg)';
      a.q('vcP').style.transform = 'translateX(' + dxC.toFixed(1) + 'px)';
      a.q('vrP').style.transform = 'translateX(' + dxR.toFixed(1) + 'px)';
      a.q('zVC').style.transform = 'scaleX(' + ((70 + dxC) / 70).toFixed(3) + ')';
      a.text('tCyl', 'cylindrée ' + d.cyl + ' %');
      // élément de distributeur et récepteur
      a.q('dist').style.transform = 'translateX(' + (Math.min(1, st.ouv / 60) * 60) + 'px)';
      a.text('ouv', F(st.ouv) + ' L/min demandés');
      a.text('chg', st.butee ? 'butée' : st.charge + ' b');
      var py = d.mode === 'butee' ? 1 : st.pos; a.move('rod', 0, -py * 70);
      a.attr('ch', 'y', 312 - py * 70); a.attr('ch', 'height', 8 + py * 70);
      a.fillP('ch', sb ? null : d.ls, { pil: d.ls > 0 });
      a.move('nP', 0, 0, gAng(d.ps, 400), 560, 520); a.text('tP', F(d.ps) + ' b');
      a.move('nLS', 0, 0, gAng(d.ls, 400), 660, 314); a.text('tLS', F(d.ls) + ' b');
    },
    steps: [
      { title: 'Au repos (moteur arrêté)', text: 'Pas de pression : le <b>vérin de rappel</b> pousse le plateau, la pompe est en <b>cylindrée maximum</b>. Au démarrage, la régulation ajuste ensuite le débit au besoin du circuit.', set: { moteur: false } },
      { title: '1. Débit nul (stand-by)', text: 'Cours : distributeur <b>fermé</b>. Éléments au neutre : <b>LS = 0 b</b>, la pompe garde <b>30 b</b> (ressort de stand-by). Le tiroir alimente le vérin de commande : plateau au mini, la pompe ne débite que le gicleur anti-pompage (<b>1 L/min</b>).', set: { ouv: 0, charge: 100 } },
      { title: '2. Contrôle du débit', text: 'Cours : distributeur <b>ouvert partiellement</b>. La pression de la ligne LS est l’effort demandé par le récepteur (100 b). La pression de service s’oppose à LS + ressort (30 b) : le tiroir et le vérin de commande se déplacent <b>partiellement</b>, le plateau s’incline juste ce qu’il faut : <b>le débit fourni est adapté aux besoins</b> (50 L/min).', set: { ouv: 50, charge: 100 } },
      { title: '3. Plein débit', text: 'Cours : distributeur <b>ouvert au maximum</b>. La pression LS est <b>identique</b> à la pression de service ; le tiroir reçoit la même pression des deux côtés, le ressort de stand-by l’empêche de bouger : le <b>vérin de commande n’est pas alimenté</b>, la pompe est en <b>cylindrée maximum</b>.', set: { ouv: 100, charge: 100 } },
      { title: '4. Débit nul (pression maxi)', text: 'Cours : distributeur ouvert mais <b>récepteur en butée</b>. La pression monte jusqu’au tarage du <b>DAD (320 b)</b>, qui s’ouvre et relie la ligne LS au drain. Sous l’effet de la pression de service, le tiroir LS se déplace et le vérin de commande pousse le plateau en position verticale : <b>pas de débit mais maintien de la pression maximum</b> (350 b).', set: { ouv: 28, butee: true } },
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
