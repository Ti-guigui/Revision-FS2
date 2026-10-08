/* Simulateurs : électricité générale (diode / DEL, Zéner, transistor NPN, portes logiques) */
(function () {
  var F = SIMS.fmt;
  function bat(x, y, label) {
    return '<path class="ink" d="M' + (x - 30) + ' ' + y + ' H' + (x + 30) + '" style="stroke-width:3"/><path class="ink" d="M' + (x - 16) + ' ' + (y + 14) + ' H' + (x + 16) + '" style="stroke-width:7"/>' +
      '<text x="' + (x + 40) + '" y="' + (y + 4) + '" class="t-s">+</text><text x="' + (x + 40) + '" y="' + (y + 24) + '" class="t-s">−</text>' +
      '<text x="' + (x - 44) + '" y="' + (y + 12) + '" text-anchor="end">' + label + '</text>';
  }
  function res(x, y, w, h, label, vertical) {
    return vertical ? '<rect class="ink-f" x="' + (x - h / 2) + '" y="' + y + '" width="' + h + '" height="' + w + '"/><text x="' + (x + h / 2 + 8) + '" y="' + (y + w / 2 + 5) + '">' + label + '</text>'
      : '<rect class="ink-f" x="' + x + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '"/><text x="' + (x + w / 2) + '" y="' + (y - h / 2 - 8) + '" text-anchor="middle">' + label + '</text>';
  }
  function meter(x, y, l) { // appareil de mesure : A = ampèremètre (en série), V = voltmètre (en parallèle)
    return '<circle class="meter" cx="' + x + '" cy="' + y + '" r="15"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" class="t-b">' + l + '</text>';
  }
  function sw(id, x, y) { // interrupteur : pivot en (x, y), longueur 70
    return '<circle class="solid" cx="' + x + '" cy="' + y + '" r="4"/><circle class="solid" cx="' + (x + 70) + '" cy="' + y + '" r="4"/>' +
      '<g id="' + id + '" style="transition:transform .25s;transform-origin:' + x + 'px ' + y + 'px"><path class="ink" d="M' + x + ' ' + y + ' L' + (x + 68) + ' ' + y + '" style="stroke-width:3.5"/></g>';
  }

  /* ---------------- 1. Diode et DEL ---------------- */
  SIMS.add({
    id: 'elec-diode', subj: 'elec', icon: '💡', title: 'Diode et DEL : sens passant, sens bloqué, résistance de protection',
    desc: 'Seuil 0,6 V pour une diode, 2 V pour une DEL. I = (U − Useuil) / R. En sens inverse, plus rien ne passe.',
    lessons: ['elec/composants', 'elec/aga03-diodes', 'elec/cah-e-diodes'],
    falstad: '$ 1 0.000005 10.2 50 5 50\nv 112 320 112 96 0 0 40 12 0 0 0.5\ns 112 96 224 96 0 0 false\nr 224 96 400 96 0 1000\n162 400 96 400 320 0 1 0 0\nw 400 320 112 320 0',
    viewBox: '0 0 820 400',
    legend: [['cur', 'Courant (sens conventionnel + → −)'], ['cur0', 'Pas de courant']],
    svg:
      '<path class="pipe thin" id="w1" d="M140 190 V80 H250"/>' +
      '<path class="pipe thin" id="w2" d="M320 80 H400"/>' +
      '<path class="pipe thin" id="w3" d="M500 80 H640 V150"/>' +
      '<path class="pipe thin" id="w4" d="M640 240 V330 H140 V210"/>' +
      bat(140, 190, '12 V') + sw('sw', 250, 80) + '<text x="285" y="62" text-anchor="middle" class="t-s">K</text>' +
      res(400, 80, 100, 28, '') + '<text id="tR" x="450" y="56" text-anchor="middle">R = 1 000 Ω</text>' +
      '<circle id="glow" cx="640" cy="195" r="34" class="zone z-off" style="opacity:0"/>' +
      '<g id="dio" style="transition:transform .3s;transform-origin:640px 195px"><path class="ink-f" d="M616 172 H664 L640 212 Z"/><path class="ink" d="M614 214 H666" style="stroke-width:3"/>' +
        '<g id="ledar"><path class="ink" d="M672 180 l18 -14 M680 194 l18 -14" marker-end="url(#sim-ar)"/></g>' +
        '<path class="ink" d="M640 150 V172 M640 214 V240"/></g>' +
      '<text id="tD" x="700" y="230" class="t-s">DEL</text>' +
      '<text x="660" y="160" class="t-s t-m">anode</text><text x="660" y="262" class="t-s t-m">cathode</text>' +
      '<text id="tUR" x="450" y="128" text-anchor="middle" class="t-s">UR = 0 V</text><text id="tUD" x="770" y="290" text-anchor="middle" class="t-s">UD = 0 V</text>' +
      '<path class="ink" d="M640 136 H770 V180 M770 210 V252 H640" style="stroke-dasharray:4 4"/>' + meter(770, 195, 'V') +
      meter(390, 330, 'A') + '<text id="tI" x="390" y="372" text-anchor="middle" class="t-b">I = 0 mA</text>',
    init: { k: true, typ: 'led', sens: 'direct', r: 1000 },
    controls: [
      { key: 'k', type: 'toggle', label: 'Interrupteur K', on: 'Fermé', off: 'Ouvert' },
      { key: 'typ', type: 'seg', label: 'Composant', options: [['led', 'DEL (2 V)'], ['diode', 'Diode (0,6 V)']] },
      { key: 'sens', type: 'seg', label: 'Sens de branchement', options: [['direct', 'Sens passant'], ['inverse', 'Sens bloqué']] },
      { key: 'r', type: 'range', label: 'Résistance R', min: 100, max: 2200, step: 50, unit: 'Ω' }
    ],
    compute: function (st) {
      var us = st.typ === 'led' ? 2 : 0.6, d = { i: 0, ur: 0, ud: 0 };
      if (st.k && st.sens === 'direct') { d.i = (12 - us) / st.r; d.ur = st.r * d.i; d.ud = us; }
      else if (st.k) { d.ud = 12; }
      d.ma = d.i * 1000; d.burn = st.typ === 'led' && d.ma > 30;
      d.text = !st.k ? 'Interrupteur ouvert : le circuit est coupé, aucun courant.'
        : st.sens === 'inverse' ? 'Diode en <b>sens bloqué</b> (cathode vers le +) : elle ne laisse pas passer le courant. Toute la tension de la batterie se retrouve à ses bornes (12 V), 0 V sur R.'
        : 'Sens passant : la diode prend sa tension de seuil (<b>' + F(us, 1) + ' V</b>), la résistance prend le reste : UR = 12 − ' + F(us, 1) + ' = ' + F(d.ur, 1) + ' V. <b>I = UR / R = ' + F(d.ma, 1) + ' mA</b>.' +
          (d.burn ? ' <b style="color:var(--bad)">Trop de courant pour une DEL (≈ 10 à 20 mA) : elle grille ! Il faut augmenter R.</b>' : st.typ === 'led' ? ' Pour 10 mA : R = (12 − 2) / 0,01 = 1 000 Ω.' : '');
      d.readouts = [['Courant I', F(d.ma, 1) + ' mA', d.burn ? 'hot' : ''], ['Tension sur R (UR)', F(d.ur, 2) + ' V'], ['Tension sur la diode (UD)', F(d.ud, 1) + ' V'], ['Loi des mailles', '12 = UR + UD']];
      return d;
    },
    draw: function (a, st, d) {
      var on = d.i > 0;
      ['w1', 'w2', 'w3', 'w4'].forEach(function (w) { a.line(w, on ? 'cur' : 'cur0', on ? 1 : 0); });
      a.q('sw').style.transform = st.k ? '' : 'rotate(-28deg)';
      a.q('dio').style.transform = st.sens === 'direct' ? '' : 'rotate(180deg)';
      a.show('ledar', st.typ === 'led');
      a.text('tD', st.typ === 'led' ? 'DEL' : 'Diode');
      var g = a.q('glow');
      g.setAttribute('class', 'zone ' + (on && st.typ === 'led' ? 'z-led' : 'z-off'));
      g.style.opacity = on && st.typ === 'led' ? Math.min(1, 0.35 + d.ma / 15) : 0;
      a.text('tR', 'R = ' + st.r + ' Ω'); a.text('tUR', 'UR = ' + F(d.ur, 2) + ' V'); a.text('tUD', 'UD = ' + F(d.ud, 1) + ' V');
      a.text('tI', d.burn ? 'I = ' + F(d.ma, 0) + ' mA : DEL grillée !' : 'I = ' + F(d.ma, 1) + ' mA');
    },
    steps: [
      { title: 'Circuit ouvert', text: 'Interrupteur K ouvert : pas de boucle fermée, donc pas de courant. La DEL est éteinte.', set: { k: false } },
      { title: 'Sens passant', text: 'On ferme K : la DEL est branchée <b>anode vers le +</b>. Elle prend 2 V, la résistance 10 V : I = 10 / 1 000 = <b>10 mA</b>, la DEL s’allume.', set: { k: true } },
      { title: 'Rôle de la résistance', text: 'R plus faible (220 Ω) : I = 10 / 220 ≈ 45 mA. C’est trop pour une DEL (≈ 10 à 20 mA) : <b>la résistance protège la DEL</b> en limitant le courant.', set: { k: true, r: 220 } },
      { title: 'Sens bloqué', text: 'DEL retournée (cathode vers le +) : elle bloque le courant. On mesure 12 V à ses bornes et 0 V sur R.', set: { k: true, sens: 'inverse' } },
      { title: 'Diode classique', text: 'Avec une diode de redressement, le seuil est de <b>0,6 V</b> : UR = 12 − 0,6 = 11,4 V et I = 11,4 mA avec 1 kΩ.', set: { k: true, typ: 'diode' } }
    ]
  });

  /* ---------------- 2. Diode Zéner (stabilisation) ---------------- */
  var UZ = 5.6, RS = 220;
  SIMS.add({
    id: 'elec-zener', subj: 'elec', icon: '🔒', title: 'Diode Zéner : stabiliser une tension',
    desc: 'Branchée en inverse avec une résistance série, la Zéner garde sa tension Uz quand la tension d’entrée monte.',
    lessons: ['elec/composants', 'elec/aga03-diodes', 'elec/cah-e-diodes', 'elec/cah-e-alimentation'],
    falstad: 'zenerref.txt',
    viewBox: '0 0 820 400',
    legend: [['cur', 'Courant'], ['cur0', 'Pas de courant']],
    svg:
      '<path class="pipe thin" id="w1" d="M140 180 V80 H300"/>' +
      '<path class="pipe thin" id="w2" d="M400 80 H520 V160"/>' +
      '<path class="pipe thin" id="w3" d="M520 240 V320 H140 V200"/>' +
      '<path class="ink" d="M520 80 H700 V170 M520 320 H700 V230"/>' +
      bat(140, 180, '') + '<text id="tUe" x="96" y="192" text-anchor="end">Ue</text>' +
      res(300, 80, 100, 28, 'Rs = 220 Ω') +
      '<path class="ink-f" d="M496 222 H544 L520 182 Z"/><path class="ink" d="M496 180 H544 M496 180 l-8 -8 M544 180 l8 8" style="stroke-width:3"/>' +
      '<path class="ink" d="M520 160 V180 M520 222 V240"/>' +
      '<text x="556" y="210" class="t-s">Zéner</text><text x="556" y="226" class="t-s">Uz = 5,6 V</text>' +
      '<circle class="ink-f" cx="700" cy="200" r="30"/><text x="700" y="206" text-anchor="middle">V</text>' +
      '<text id="tUs" x="640" y="140" text-anchor="middle" class="t-b">Us = 0 V</text>' +
      meter(330, 320, 'A') + '<text id="tI" x="330" y="360" text-anchor="middle" class="t-s">I = 0 mA</text>' +
      '<text id="tUrs" x="350" y="130" text-anchor="middle" class="t-s">URs = 0 V</text>',
    init: { ue: 9 },
    controls: [{ key: 'ue', type: 'range', label: 'Tension d’entrée Ue', min: 0, max: 20, step: 0.5, unit: 'V', dec: 1 }],
    compute: function (st) {
      var d = {};
      if (st.ue <= UZ) { d.us = st.ue; d.i = 0; } else { d.us = UZ; d.i = (st.ue - UZ) / RS; }
      d.urs = st.ue - d.us; d.ma = d.i * 1000;
      d.text = st.ue <= UZ ? 'Ue (' + F(st.ue, 1) + ' V) est sous la tension Zéner : la Zéner ne conduit pas, <b>Us = Ue</b>.'
        : 'Ue dépasse 5,6 V : la Zéner conduit en inverse et <b>garde 5,6 V</b> à ses bornes. Le surplus (' + F(d.urs, 1) + ' V) est pris par la résistance série : I = ' + F(d.urs, 1) + ' / 220 = ' + F(d.ma, 1) + ' mA.';
      d.readouts = [['Tension d’entrée Ue', F(st.ue, 1) + ' V'], ['Tension de sortie Us', F(d.us, 1) + ' V', st.ue > UZ ? 'ok' : ''], ['Tension sur Rs', F(d.urs, 1) + ' V'], ['Courant Zéner', F(d.ma, 1) + ' mA']];
      return d;
    },
    draw: function (a, st, d) {
      var on = d.i > 0;
      ['w1', 'w2', 'w3'].forEach(function (w) { a.line(w, on ? 'cur' : 'cur0', on ? 1 : 0); });
      a.text('tUe', 'Ue = ' + F(st.ue, 1) + ' V'); a.text('tUs', 'Us = ' + F(d.us, 1) + ' V'); a.text('tI', 'I = ' + F(d.ma, 1) + ' mA'); a.text('tUrs', 'URs = ' + F(d.urs, 1) + ' V');
    },
    steps: [
      { title: 'Ue = 4 V', text: 'Sous la tension Zéner, la diode ne conduit pas : la sortie suit l’entrée, <b>Us = 4 V</b>.', set: { ue: 4 } },
      { title: 'Ue = 9 V', text: 'La Zéner conduit en inverse : <b>Us reste à 5,6 V</b>. Rs prend 3,4 V (I ≈ 15 mA).', set: { ue: 9 } },
      { title: 'Ue = 16 V', text: 'Ue monte encore : Us reste à <b>5,6 V</b>. Seuls le courant et la tension sur Rs augmentent : c’est la <b>stabilisation</b>.', set: { ue: 16 } }
    ]
  });

  /* ---------------- 3. Transistor NPN en commutation ---------------- */
  var VCC = 12, RC = 120, VBE = 0.6, VCMD = 5;
  SIMS.add({
    id: 'elec-npn', subj: 'elec', icon: '🔀', title: 'Transistor NPN en commutation (bloqué / saturé)',
    desc: 'Un petit courant de base commande un gros courant de collecteur : Ic = β × Ib. Saturé, le transistor est un interrupteur fermé.',
    lessons: ['elec/composants', 'elec/aga03-transistor', 'elec/cah-e-transistors', 'elec/microtracteur'],
    falstad: 'transswitch.txt',
    viewBox: '0 0 820 430',
    legend: [['cur', 'Courant'], ['cur0', 'Pas de courant']],
    svg:
      // circuit de puissance
      '<path class="pipe thin" id="wc1" d="M600 60 V110"/>' +
      '<path class="pipe thin" id="wc2" d="M600 190 V240"/>' +
      '<path class="pipe thin" id="we" d="M600 300 V380"/>' +
      '<path class="ink" d="M560 60 H640 M560 380 H640"/><text x="650" y="66">+12 V</text><text x="650" y="386">masse</text>' +
      '<rect class="ink-f" id="lampbox" x="570" y="110" width="60" height="80" rx="6"/><circle id="lamp" cx="600" cy="150" r="22" class="zone z-off"/>' +
      '<path class="ink" d="M584 134 L616 166 M616 134 L584 166"/><text x="644" y="146" class="t-s">Charge</text><text x="644" y="162" class="t-s">120 Ω</text>' +
      // transistor
      '<circle class="ink-f" cx="580" cy="270" r="34"/><path class="ink" d="M560 248 V292" style="stroke-width:4"/>' +
      '<path class="ink" d="M560 258 L600 240 M560 282 L600 300"/><path class="ink" d="M586 292 L600 300 L588 304" />' +
      '<text x="530" y="236" class="t-s">C</text><text x="530" y="318" class="t-s">E</text><text x="506" y="268" class="t-s">B</text>' +
      // circuit de commande
      '<path class="pipe thin" id="wb1" d="M140 190 V110 H230"/>' +
      '<path class="pipe thin" id="wb2" d="M300 110 H340 V270 H360"/>' +
      '<path class="pipe thin" id="wb3" d="M460 270 H560"/>' +
      '<path class="pipe thin" id="wb4" d="M140 210 V380 H600"/>' +
      bat(140, 190, '5 V') + sw('sw', 230, 110) + '<text x="265" y="92" text-anchor="middle" class="t-s">Commande</text>' +
      res(360, 270, 100, 26, '') + '<text id="tRb" x="410" y="250" text-anchor="middle">Rb = 8,6 kΩ</text>' +
      '<text id="tIb" x="490" y="306" text-anchor="middle" class="t-s">Ib = 0</text><text id="tIc" x="624" y="92" class="t-s">Ic = 0</text>' +
      meter(600, 85, 'A') + meter(490, 270, 'A') +
      '<text id="tEt" x="300" y="410" text-anchor="middle" class="t-b">BLOQUÉ</text><text id="tVce" x="640" y="276" class="t-s">VCE = 12 V</text>',
    init: { k: false, rb: 8.6, beta: 200 },
    controls: [
      { key: 'k', type: 'toggle', label: 'Commande de base', on: 'Activée (5 V)', off: 'Coupée (0 V)' },
      { key: 'rb', type: 'range', label: 'Résistance de base Rb', min: 2, max: 100, step: 0.2, unit: 'kΩ', dec: 1 },
      { key: 'beta', type: 'seg', label: 'Gain β', options: [[100, 'β = 100'], [200, 'β = 200']] }
    ],
    compute: function (st) {
      var d = { icsat: (VCC - 0) / RC };
      if (!st.k) { d.ib = 0; d.ic = 0; d.vce = VCC; d.et = 'BLOQUÉ'; }
      else {
        d.ib = (VCMD - VBE) / (st.rb * 1000);
        var ic = st.beta * d.ib;
        if (ic >= d.icsat) { d.ic = d.icsat; d.vce = 0; d.et = 'SATURÉ'; }
        else { d.ic = ic; d.vce = VCC - RC * ic; d.et = 'PAS ASSEZ SATURÉ'; }
      }
      d.ibmin = d.icsat / st.beta;
      d.text = !st.k ? 'Pas de courant de base : le transistor est <b>bloqué</b> (interrupteur ouvert). Ic = 0, on mesure <b>VCE = 12 V</b> : la charge ne fonctionne pas.'
        : d.et === 'SATURÉ' ? 'Ib = (5 − 0,6) / Rb = ' + F(d.ib * 1e6, 0) + ' µA. β × Ib dépasse le courant maxi de la charge (' + F(d.icsat * 1000, 0) + ' mA) : le transistor est <b>saturé</b> (interrupteur fermé), <b>VCE ≈ 0 V</b>, la charge a toute la tension.'
        : 'Ib est trop faible : β × Ib = ' + F(d.ic * 1000, 0) + ' mA, moins que les ' + F(d.icsat * 1000, 0) + ' mA demandés. Le transistor n’est <b>pas saturé</b> : il chauffe et la charge est mal alimentée. Il faut <b>Ib ≥ Ic / β = ' + F(d.ibmin * 1e6, 0) + ' µA</b> : diminuer Rb.';
      d.readouts = [['Courant de base Ib', F(d.ib * 1e6, 0) + ' µA'], ['Courant collecteur Ic', F(d.ic * 1000, 0) + ' mA'], ['VCE', F(d.vce, 1) + ' V'],
        ['État', d.et, d.et === 'SATURÉ' ? 'ok' : d.et === 'BLOQUÉ' ? '' : 'hot']];
      return d;
    },
    draw: function (a, st, d) {
      var b = d.ib > 0, c = d.ic > 0;
      ['wb1', 'wb2', 'wb3'].forEach(function (w) { a.line(w, b ? 'cur' : 'cur0', b ? 1 : 0); });
      a.line('wb4', b || c ? 'cur' : 'cur0', b || c ? -1 : 0);
      ['wc1', 'wc2', 'we'].forEach(function (w) { a.line(w, c ? 'cur' : 'cur0', c ? 1 : 0); });
      a.q('sw').style.transform = st.k ? '' : 'rotate(-28deg)';
      var L = a.q('lamp'); L.setAttribute('class', 'zone ' + (c ? 'z-cur glow' : 'z-off')); L.style.opacity = c ? 0.3 + 0.7 * d.ic / d.icsat : '';
      a.text('tRb', 'Rb = ' + F(st.rb, 1) + ' kΩ'); a.text('tIb', 'Ib = ' + F(d.ib * 1e6, 0) + ' µA'); a.text('tIc', 'Ic = ' + F(d.ic * 1000, 0) + ' mA');
      a.text('tEt', d.et); a.text('tVce', 'VCE = ' + F(d.vce, 1) + ' V');
    },
    steps: [
      { title: 'Bloqué', text: 'Pas de courant de base (commande à 0 V) : le transistor est un <b>interrupteur ouvert</b>. Ic = 0, VCE = 12 V.', set: { k: false } },
      { title: 'Saturé', text: 'Commande à 5 V : Ib = (5 − 0,6) / 8,6 kΩ ≈ <b>500 µA</b>. Avec β = 200 : β × Ib = 100 mA, juste ce que demande la charge (12 / 120 = 100 mA). Le transistor est <b>saturé</b> : VCE ≈ 0.', set: { k: true } },
      { title: 'Rb trop grande', text: 'Avec Rb = 40 kΩ, Ib ≈ 110 µA : β × Ib = 22 mA seulement. Le transistor n’est <b>pas saturé</b>, la charge est mal alimentée et le transistor chauffe.', set: { k: true, rb: 40 } },
      { title: 'Gain plus faible', text: 'Avec β = 100, il faut deux fois plus de courant de base : Ib ≥ 100 mA / 100 = <b>1 mA</b>, donc Rb ≤ 4,4 kΩ.', set: { k: true, beta: 100, rb: 4.4 } }
    ]
  });

  /* ---------------- 4. Portes logiques ---------------- */
  var GATES = { oui: 'OUI', non: 'NON', et: 'ET', ou: 'OU', 'non-et': 'NON-ET', 'non-ou': 'NON-OU' };
  function gateOut(g, A, B) {
    return { oui: A, non: !A, et: A && B, ou: A || B, 'non-et': !(A && B), 'non-ou': !(A || B) }[g] ? 1 : 0;
  }
  SIMS.add({
    id: 'elec-logique', subj: 'elec', icon: '🔣', title: 'Portes logiques : tester les 6 portes',
    desc: 'OUI, NON, ET, OU, NON-ET, NON-OU en normes OTAN et AFNOR, avec la table de vérité qui suit tes entrées.',
    lessons: ['elec/logique', 'elec/microtracteur', 'elec/moto'],
    viewBox: '0 0 820 380',
    legend: [['cur', 'État 1 (tension)'], ['cur0', 'État 0']],
    svg:
      '<path class="pipe thin" id="inA" d="M120 120 H300"/><path class="pipe thin" id="inB" d="M120 220 H300"/><path class="pipe thin" id="out" d="M470 170 H600"/>' +
      '<circle id="bA" class="ink-f" cx="100" cy="120" r="18"/><text id="tA" x="100" y="126" text-anchor="middle" class="t-b">0</text><text x="60" y="126" text-anchor="end">A</text>' +
      '<circle id="bB" class="ink-f" cx="100" cy="220" r="18"/><text id="tB" x="100" y="226" text-anchor="middle" class="t-b">0</text><text x="60" y="226" text-anchor="end">B</text>' +
      '<g id="gate"></g>' +
      '<circle id="lamp" cx="630" cy="170" r="26" class="zone z-off"/><circle class="ink" cx="630" cy="170" r="26"/><text id="tS" x="630" y="177" text-anchor="middle" class="t-b">0</text><text x="668" y="176">S</text>' +
      '<g id="tt"></g>',
    init: { g: 'et', n: 'otan', A: false, B: false },
    controls: [
      { key: 'g', type: 'seg', label: 'Porte', options: Object.keys(GATES).map(function (k) { return [k, GATES[k]]; }) },
      { key: 'n', type: 'seg', label: 'Norme du symbole', options: [['otan', 'OTAN'], ['afnor', 'AFNOR']] },
      { key: 'A', type: 'toggle', label: 'Entrée A', on: '1', off: '0' },
      { key: 'B', type: 'toggle', label: 'Entrée B', on: '1', off: '0' }
    ],
    compute: function (st) {
      var one = st.g === 'oui' || st.g === 'non', s = gateOut(st.g, st.A, st.B);
      var expl = { oui: 'S recopie A.', non: 'S est l’inverse de A.', et: 'S = 1 seulement si A <b>ET</b> B sont à 1.', ou: 'S = 1 si A <b>OU</b> B (ou les deux) est à 1.',
        'non-et': 'C’est l’inverse du ET : S = 0 seulement quand A et B sont à 1.', 'non-ou': 'C’est l’inverse du OU : S = 1 seulement quand A et B sont à 0.' }[st.g];
      return { one: one, s: s, text: 'Porte <b>' + GATES[st.g] + '</b> : ' + expl + ' Ici A = ' + (+st.A) + (one ? '' : ', B = ' + (+st.B)) + ' → <b>S = ' + s + '</b>.',
        readouts: [['A', +st.A], ['B', one ? '—' : +st.B], ['Sortie S', s, s ? 'ok' : '']] };
    },
    draw: function (a, st, d) {
      // symbole de la porte (agrandi ×2,2 depuis le dessin du cours)
      var t = st.g, inv = t === 'non' || t.indexOf('non-') === 0, one = d.one, body, end;
      var sz = 'transform="translate(250 104) scale(2.2)"';
      if (st.n === 'afnor') {
        var sign = one ? '1' : (t.indexOf('et') >= 0 && t !== 'non-ou' && t !== 'ou' ? '&amp;' : '≥1');
        if (t === 'non-et') sign = '&amp;';
        body = '<rect class="ink-f" x="34" y="8" width="42" height="44" style="stroke-width:1.2"/><text x="55" y="36" text-anchor="middle" style="font-size:14px">' + sign + '</text>'; end = 76;
      } else if (one) { body = '<path class="ink-f" d="M34 10L34 50L76 30Z" style="stroke-width:1.2"/>'; end = 76; }
      else if (t === 'et' || t === 'non-et') { body = '<path class="ink-f" d="M34 8H56A22 22 0 0 1 56 52H34Z" style="stroke-width:1.2"/>'; end = 78; }
      else { body = '<path class="ink-f" d="M28 8Q62 8 84 30Q62 52 28 52Q42 30 28 8Z" style="stroke-width:1.2"/>'; end = 84; }
      var ins = one ? '<path class="ink" d="M23 30H34" style="stroke-width:1.2"/>' : '<path class="ink" d="M23 7H36M23 53H36" style="stroke-width:1.2"/>';
      var outp = (inv ? '<circle class="ink-f" cx="' + (end + 5) + '" cy="30" r="5" style="stroke-width:1.2"/>' : '') ;
      var key = t + st.n;
      if (a.q('gate')._k !== key) { a.q('gate').innerHTML = '<g ' + sz + '>' + ins + body + outp + '</g>'; a.q('gate')._k = key; }
      a.attr('inA', 'd', one ? 'M120 170 H300' : 'M120 120 H300');
      a.show('inB', !one); a.show('bB', !one); a.show('tB', !one);
      a.attr('bA', 'cy', one ? 170 : 120); a.attr('tA', 'y', one ? 176 : 126);
      a.line('inA', st.A ? 'cur' : 'cur0', st.A ? 1 : 0); a.line('inB', st.B ? 'cur' : 'cur0', st.B ? 1 : 0);
      a.line('out', d.s ? 'cur' : 'cur0', d.s ? 1 : 0);
      a.attr('out', 'd', 'M' + (250 + (end + (inv ? 10 : 0)) * 2.2) + ' 170 H604');
      a.text('tA', +st.A); a.text('tB', +st.B); a.text('tS', d.s);
      a.q('lamp').setAttribute('class', 'zone ' + (d.s ? 'z-cur glow' : 'z-off'));
      // table de vérité
      var rows = one ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]], x0 = 700, y0 = 70, h = 34;
      var cur = one ? [+st.A] : [+st.A, +st.B];
      var html = '<text x="' + (x0 + 40) + '" y="' + (y0 - 14) + '" text-anchor="middle" class="t-s">Table de vérité</text>';
      rows.forEach(function (r, i) {
        var s = gateOut(t, !!r[0], !!r[1]), on = r.join() === cur.join(), y = y0 + i * h;
        html += '<rect x="' + (x0 - 20) + '" y="' + y + '" width="110" height="' + h + '" class="' + (on ? 'zone z-cur' : 'ink-f') + '" style="' + (on ? 'opacity:.35' : 'stroke-width:1') + '"/>' +
          '<text x="' + x0 + '" y="' + (y + 22) + '" class="t-s">' + r.join('   ') + '</text><text x="' + (x0 + 70) + '" y="' + (y + 22) + '" class="t-s"><tspan font-weight="800">' + s + '</tspan></text>';
      });
      html += '<text x="' + x0 + '" y="' + (y0 + rows.length * h + 20) + '" class="t-s t-m">' + (one ? 'A' : 'A   B') + '</text><text x="' + (x0 + 70) + '" y="' + (y0 + rows.length * h + 20) + '" class="t-s t-m">S</text>';
      if (a.q('tt')._h !== html) { a.q('tt').innerHTML = html; a.q('tt')._h = html; }
    },
    steps: [
      { title: 'Porte ET', text: 'ET : la sortie ne passe à 1 que si <b>A et B</b> sont à 1 (comme deux interrupteurs en série).', set: { g: 'et', A: true, B: false } },
      { title: 'Porte ET, A = B = 1', text: 'Les deux entrées sont à 1 : <b>S = 1</b>.', set: { g: 'et', A: true, B: true } },
      { title: 'Porte OU', text: 'OU : il suffit d’une entrée à 1 (comme deux interrupteurs en parallèle).', set: { g: 'ou', A: false, B: true } },
      { title: 'Porte NON', text: 'NON (inverseur) : S est l’inverse de A. Le petit rond en sortie = inversion.', set: { g: 'non', A: true } },
      { title: 'Porte NON-ET', text: 'NON-ET = ET suivi d’un NON : S = 0 seulement quand A et B sont à 1.', set: { g: 'non-et', A: true, B: true } },
      { title: 'Norme AFNOR', text: 'Même porte en norme <b>AFNOR</b> : un rectangle avec « & » (ET) ou « ≥1 » (OU), et le rond d’inversion.', set: { g: 'non-et', n: 'afnor', A: true, B: true } }
    ]
  });
})();
