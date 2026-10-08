/* Simulateur : transmission hydrostatique en circuit fermé — schéma du cahier (chargeuse compacte, repères 1 à 14) */
(function () {
  var F = SIMS.fmt;
  var GAV = 20, ECH = 18, SHP = 320, ANN = 280, QG = 28, QP = 70, FUP = 2, FUM = 2, VM = 32;

  function bache(x, y) { return '<path class="ink" d="M' + (x - 12) + ' ' + y + ' V' + (y + 10) + ' H' + (x + 12) + ' V' + y + '"/>'; }
  function zig(x1, y, x2, h, n) { // ressort horizontal
    var d = 'M' + x1 + ' ' + y, s = (x2 - x1) / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x1 + s * (i + 1)) + ' ' + (y + (i % 2 ? h / 2 : -h / 2));
    return '<path class="ink" d="' + d + ' L' + x2 + ' ' + y + '"/>';
  }
  function zigV(x, y1, y2, w, n) { // ressort vertical
    var d = 'M' + x + ' ' + y1, s = (y2 - y1) / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x + (i % 2 ? w / 2 : -w / 2)) + ' ' + (y1 + s * (i + 1));
    return '<path class="ink" d="' + d + ' L' + x + ' ' + y2 + '"/>';
  }
  // limiteur / soupape (symbole du cahier) : case 24 × 40, flèche décalée côté pilotage, ressort réglable ; sens 1 = entrée en haut
  function relief(x, y, sens, lbl, pos, arId) {
    var top = sens > 0 ? y : y - 40, mid = top + 20;
    var ar = sens > 0 ? 'M' + (x + 6) + ' ' + (top + 4) + ' V' + (top + 36) : 'M' + (x + 6) + ' ' + (top + 36) + ' V' + (top + 4);
    var pil = sens > 0 ? 'M' + x + ' ' + (top - 8) + ' H' + (x + 20) + ' V' + (mid + 6) + ' H' + (x + 12)
      : 'M' + x + ' ' + (top + 48) + ' H' + (x + 20) + ' V' + (mid - 6) + ' H' + (x + 12);
    return '<rect class="ink-f" x="' + (x - 12) + '" y="' + top + '" width="24" height="40"/><g id="' + arId + '" style="transition:transform .3s"><path class="ink" d="' + ar + '" marker-end="url(#sim-ar)"/></g>' +
      '<path class="ink" d="' + pil + '" style="stroke-dasharray:4 3"/>' + zig(x - 26, mid, x - 12, 12, 2) +
      '<path class="ink" d="M' + (x - 30) + ' ' + (mid + 11) + ' L' + (x - 10) + ' ' + (mid - 11) + '" marker-end="url(#sim-ar)"/>' +
      (lbl ? '<text x="' + (pos === 'l' ? x - 34 : pos === 'lb' ? x - 18 : x + 28) + '" y="' + (pos === 'lb' ? top + 52 : mid + 4) + '" text-anchor="' + (pos === 'l' || pos === 'lb' ? 'end' : 'start') + '" class="t-s">' + lbl + '</text>' : '');
  }
  // clapet anti-retour vertical (bille + siège) : passage libre du sommet du V vers la bille ; sens -1 = vers le haut
  function ckv(x, y, sens, id) {
    var v = sens < 0 ? 'M' + (x - 8) + ' ' + (y - 5) + ' L' + x + ' ' + (y + 7) + ' L' + (x + 8) + ' ' + (y - 5) : 'M' + (x - 8) + ' ' + (y + 5) + ' L' + x + ' ' + (y - 7) + ' L' + (x + 8) + ' ' + (y + 5);
    return '<g' + (id ? ' id="' + id + '" style="transition:transform .3s"' : '') + '><circle class="ink-f" cx="' + x + '" cy="' + (y + (sens < 0 ? -6 : 6)) + '" r="6"/></g><path class="ink" d="' + v + '" style="fill:none;stroke-width:2.2"/>';
  }
  function prise(id, x, y, lbl, ax, ay) { // prise de pression (croix) + valeur mesurée
    return '<path class="ink" d="M' + (x - 5) + ' ' + (y - 5) + ' L' + (x + 5) + ' ' + (y + 5) + ' M' + (x + 5) + ' ' + (y - 5) + ' L' + (x - 5) + ' ' + (y + 5) + '" style="stroke-width:2.2"/>' +
      '<text x="' + (x + (ax || 0)) + '" y="' + (y + (ay || 0)) + '" class="t-s t-b" text-anchor="middle">' + lbl + '</text>' +
      '<text id="tv' + id + '" x="' + (x + (ax || 0)) + '" y="' + (y + (ay || 0) + ((ay || 0) < 0 ? -14 : 15)) + '" class="t-s sim-mval" text-anchor="middle"></text>';
  }
  function debit(id, x, y, ax) { // débitmètre
    return '<circle class="ink-f" cx="' + x + '" cy="' + y + '" r="6"/><path class="ink" d="M' + (x - 4) + ' ' + (y - 4) + ' L' + (x + 4) + ' ' + (y + 4) + ' M' + (x + 4) + ' ' + (y - 4) + ' L' + (x - 4) + ' ' + (y + 4) + '"/>' +
      '<text x="' + (x + (ax || 10)) + '" y="' + (y + 4) + '" class="t-s t-b"' + (ax < 0 ? ' text-anchor="end"' : '') + '>' + id + '</text>' +
      '<text id="tv' + id + '" x="' + (x + (ax || 10)) + '" y="' + (y + 18) + '" class="t-s sim-mval"' + (ax < 0 ? ' text-anchor="end"' : '') + '></text>';
  }
  function bulle(n, x, y) {
    return '<g data-rep="' + n + '"><circle cx="' + x + '" cy="' + y + '" r="' + (n.length > 2 ? 13 : 11) + '"/><text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle">' + n + '</text></g>';
  }
  function dot(x, y) { return '<circle class="solid" cx="' + x + '" cy="' + y + '" r="3.2"/>'; }

  var REPS = {
    '1': ['Pompe principale : cylindrée variable, 2 sens de flux, drainage externe', 'Créer le débit du système → alimenter la boucle de puissance. Le servopiston (6) règle sa cylindrée et son sens de flux.'],
    '2': ['Pompe de gavage : cylindrée fixe, 1 sens de flux', 'Compenser les fuites, lubrifier, plaquer les pistons, alimenter la servocommande, régénérer l’huile. Ici 10 cm³/tr × 2 800 tr/min = 28 L/min.'],
    '3.1': ['Clapet anti-retour (de gavage)', 'Interdire à la HP de passer dans la BP (isoler HP et BP) et laisser le gavage réalimenter la branche en basse pression.'],
    '3.2': ['Clapet anti-retour (de gavage)', 'Interdire à la HP de passer dans la BP (isoler HP et BP) et laisser le gavage réalimenter la branche en basse pression.'],
    '4': ['Limiteur de pression de gavage (20 b, réglable)', 'Définir la pression maxi du gavage au neutre ; participe à la régénération. En marche, c’est le limiteur d’échange (18 b), taré plus bas, qui tient la BP : le 4 est fermé (Q1 = 0).'],
    '5': ['Servodistributeur 4/3 progressif, centre fermé (A et B en Y vers T), commande mécanique, rappel par ressort', 'Orienter le flux selon le conducteur → commander le servopiston (marche AV / AR / neutre). Alimenté par la pression de gavage (à travers la soupape d’annulation 11).'],
    '6': ['Servopiston', 'Commander la cylindrée de la pompe principale (et son sens de flux). Rappel au neutre par ressorts ; rétroaction mécanique vers le servodistributeur.'],
    '7': ['Moteur hydraulique : cylindrée fixe, 2 sens de rotation, drainage externe', 'Transformer l’énergie hydraulique en énergie mécanique de rotation → faire tourner les roues (32 cm³/tr).'],
    '8.1': ['Soupape HP (320 b)', 'Protéger le circuit en cas de choc (blocage des roues) → évacuer les surpressions vers l’autre branche de la boucle.'],
    '8.2': ['Soupape HP (320 b)', 'Protéger le circuit en cas de choc (blocage des roues) → évacuer les surpressions vers l’autre branche de la boucle.'],
    '9': ['Tiroir d’échange : distributeur 3/3 centre fermé, commande hydraulique, rappel par ressort', 'Piloté par la HP, il ouvre la BP vers le limiteur d’échange → régénération de l’huile en fonctionnement.'],
    '10': ['Limiteur d’échange (18 b, réglable)', 'Limiter et maintenir la BP en fonctionnement (taré plus bas que le gavage pour que l’huile de la boucle soit renouvelée).'],
    '11': ['Soupape d’annulation de débit (280 b)', 'Définir la pression maxi du circuit et annuler le débit de la pompe en butée : elle coupe l’alimentation du servodistributeur → le servopiston revient au neutre → neutraliser la puissance de coin.'],
    '12': ['Sélecteur de circuit', 'Choisir la boucle où la pression est la plus forte pour piloter la soupape d’annulation de débit (11).'],
    '13': ['Flexibles (dont le flexible de retour de fuite)', 'Relier les deux blocs ; le flexible de retour de fuite ramène l’huile de fuite et d’échange entre les deux blocs vers la bâche (débitmètre Q3).'],
    '14': ['Filtre avec by-pass', 'Retenir les impuretés (régénération) ; colmaté, l’huile passe par le by-pass.']
  };

  var PANNES = {
    aucune: 'Aucune panne',
    shpDet: 'Soupape HP marche avant (8.2) détarée à 50 b',
    shpFuy: 'Soupape HP marche avant (8.2) fuyarde',
    annBloq: 'Soupape d’annulation de débit (11) bloquée',
    gavDet: 'Limiteur de pression de gavage (4) détaré à 5 b',
    echDet: 'Limiteur d’échange (10) détaré à 4 b',
    filtre: 'Filtre (14) colmaté'
  };

  var ROWS = [['MA', 'Pp1', 'Q1'], ['MB', 'Pp2', 'Q2'], ['M', 'Pp3', 'Q3'], ['MG', '', 'Q4']];
  function fmtV(k, v) { return k.charAt(0) === 'Q' ? F(v) + ' L/min' : F(v) + ' b'; }
  function cls(k, v) { return k.charAt(0) === 'Q' ? '' : v > 25 ? 'mv-hp' : v > 0.5 ? 'mv-gv' : 'mv-0'; }

  SIMS.add({
    id: 'hydro-ferme', subj: 'hydro', icon: '🔁', title: 'Transmission hydrostatique en circuit fermé (schéma du cahier)',
    desc: 'Chargeuse compacte : pompe 70 L/min, gavage 28 L/min (20 b), échange 18 b, annulation 280 b, soupapes HP 320 b. Touche les numéros pour voir chaque appareil.',
    lessons: ['hydro/hydrostatique', 'hydro/circuit-ferme'],
    viewBox: '0 0 1000 600', minWidth: 900,
    levels: true, hpLabel: 'Haute pression (HP)', pilLabel: 'Gavage / basse pression (circuit fermé)', bpLabel: '0 b (retour bâche)',
    note: 'Valeurs du cours : gavage 28 L/min et 20 b, échange 18 b, annulation de débit 280 b, soupapes HP 320 b, fuites pompe 2 + moteur 2 L/min. Vitesse moteur et débits en résistance maxi : calculés. Soupape fuyarde : valeurs d’exemple.',
    reps: REPS,
    svg:
      // blocs (traits mixtes)
      '<path class="ink" d="M36 182 H486 V490 H36 Z M40 4 H330 V210 H40 Z M574 182 H996 V490 H574 Z" style="stroke-width:1.2;stroke-dasharray:10 4 2 4;fill:none"/>' +
      // ---- conduites (colorées selon la pression) ----
      '<path class="pipe" id="bH" d="M162 315 V250 H491 Q530 272 569 250 H959 V303"/>' +
      '<path class="pipe" id="bL" d="M162 371 V437 H491 Q530 415 569 437 H959 V359"/>' +
      '<path class="pipe thin" id="gvP" d="M110 325 V226 H394 V300 H355"/>' +
      '<path class="pipe thin" id="gvS" d="M110 226 H78 V109 H104"/>' +
      '<path class="pipe thin" id="pMG" d="M78 186 H58"/>' +
      '<path class="pipe thin" id="cv32" d="M355 300 V250"/><path class="pipe thin" id="cv31" d="M355 300 V437"/>' +
      '<path class="pipe thin" id="l4" d="M394 300 V315"/><path class="pipe thin" id="q1" d="M394 355 V390"/>' +
      '<path class="pipe thin" id="tpT" d="M433 250 V41 H170 V72 H139"/><path class="pipe thin" id="tpB" d="M456 437 V13 H60 V72 H95"/>' +
      '<path class="pipe thin" id="p12" d="M117 78 V96"/><path class="pipe thin" id="pPp1" d="M117 88 H86"/>' +
      '<path class="pipe thin" id="sv0" d="M130 109 H236 V139"/><path class="pipe thin" id="svT" d="M253 139 V131 H300 V145"/>' +
      '<path class="pipe thin" id="svA" d="M236 168 V300 H222 V328"/><path class="pipe thin" id="svB" d="M253 168 V310 H255 V328"/>' +
      '<path class="pipe thin" id="pPp2" d="M236 192 H186"/><path class="pipe thin" id="pPp3" d="M253 206 H290"/>' +
      '<path class="pipe thin" id="s82i" d="M612 250 V270"/><path class="pipe thin" id="s82o" d="M612 310 V437"/>' +
      '<path class="pipe thin" id="s81i" d="M668 437 V412"/><path class="pipe thin" id="s81o" d="M668 372 V250"/>' +
      '<path class="pipe thin" id="x9T" d="M870 304 H900 V250"/><path class="pipe thin" id="x9B" d="M870 364 H900 V437"/>' +
      '<path class="pipe thin" id="x9O" d="M846 334 H764 V346"/><path class="pipe thin" id="q2" d="M764 386 V412"/>' +
      '<path class="pipe thin" id="pM" d="M800 334 V472"/>' +
      '<path class="pipe thin" id="pMB" d="M920 250 V206"/><path class="pipe thin" id="pMA" d="M920 437 V468"/>' +
      '<path class="pipe thin" id="dr13" d="M604 470 Q530 504 456 470"/>' +
      '<path class="pipe thin" id="sc" d="M110 562 V361"/>' +
      '<path class="pipe thin" id="rt1" d="M150 482 V502"/><path class="pipe thin" id="rt2" d="M150 534 V562"/><path class="pipe thin" id="byp" d="M150 494 H182 V542 H150"/>' +
      '<path class="pipe thin" id="dr1" d="M184 362 L204 378 V392"/><path class="pipe thin" id="dr7" d="M979 350 L988 362 V382"/>' +
      // ---- appareils ----
      // moteur thermique, pompe de gavage (2), pompe principale (1)
      '<rect class="ink-f" x="4" y="325" width="46" height="36"/><text x="27" y="349" text-anchor="middle" class="t-b">M</text>' +
      '<path class="ink" d="M50 339 H92 M50 347 H92 M128 339 H134 M128 347 H134"/>' +
      '<circle class="ink-f" cx="110" cy="343" r="18"/><path class="solid" d="M110 325 l-7 11 h14z"/>' +
      '<circle class="ink-f" cx="162" cy="343" r="28"/><path class="solid" d="M162 315 l-8 13 h16z"/><path class="solid" d="M162 371 l-8 -13 h16z"/>' +
      '<g id="va1" style="transition:transform .45s ease;transform-origin:162px 343px"><path class="ink" d="M162 381 V305" marker-end="url(#sim-ar)"/></g><text x="176" y="308" class="t-s t-b">AV</text><text x="176" y="388" class="t-s t-b">AR</text>' +
      bache(204, 392) +
      // aspiration directe de la pompe de gavage ; filtre (14) avec by-pass et débitmètre Q4 sur le retour bâche (comme au cahier)
      bache(110, 562) + '<text x="150" y="476" text-anchor="middle" class="t-s t-m">retour</text>' +
      '<path class="ink-f" d="M150 502 L166 518 L150 534 L134 518 Z"/><path class="ink" d="M136 518 H164" style="stroke-dasharray:3 3"/>' +
      ckv(182, 515, 1, 'bpB') + zigV(182, 528, 540, 8, 2) +
      debit('Q4', 150, 550, 12) + bache(150, 562) +
      // servopiston (6) + rétroaction
      '<rect class="ink-f" x="211" y="328" width="54" height="26"/>' +
      '<g id="sp6"><rect class="solid" x="235" y="330" width="6" height="22"/><path class="ink" d="M190 341 H211 M265 341 H284" style="stroke-width:3"/></g>' +
      zig(213, 341, 233, 14, 2) + zig(243, 341, 263, 14, 2) +
      '<path class="ink" d="M284 341 H334 V146 H322" style="stroke-width:1.4"/><path class="ink" d="M284 345 H338 V150 H322" style="stroke-width:1.4"/>' +
      // servodistributeur (5)
      '<g id="svd" style="transition:transform .4s ease">' +
        '<rect class="ink-f" x="195" y="139" width="99" height="29"/><path class="ink" d="M228 139 V168 M261 139 V168"/>' +
        '<path class="ink" d="M203 141 V165" marker-end="url(#sim-ar)"/><path class="ink" d="M220 166 V142" marker-end="url(#sim-ar)"/>' +
        '<path class="ink" d="M236 139 V146 M231 146 H241 M236 168 V158 H253 M253 168 V139"/>' +
        '<path class="ink" d="M269 141 L285 165" marker-end="url(#sim-ar)"/><path class="ink" d="M269 166 L285 142" marker-end="url(#sim-ar)"/>' +
        zig(175, 153, 195, 14, 2) + zig(294, 153, 314, 14, 2) + '<path class="ink" d="M314 153 H320 V128"/><circle class="ink-f" cx="320" cy="124" r="4"/>' +
      '</g>' + bache(300, 145) +
      '<text x="250" y="92" text-anchor="middle" class="t-s t-b">AR · N · AV</text>' +
      // soupape d’annulation de débit (11) et sélecteur (12)
      '<rect class="ink-f" x="104" y="96" width="26" height="26"/><g id="an11"><path class="ink" d="M107 109 H127" marker-end="url(#sim-ar)"/></g><g id="an11b" style="display:none"><path class="ink" d="M127 105 L118 119" marker-end="url(#sim-ar)"/><path class="ink" d="M104 109 H110 M110 103 V115" style="stroke-width:2"/></g>' +
      '<path class="ink" d="M117 122 V128"/>' + bache(117, 128) + zigV(134, 116, 134, 8, 2) + '<path class="ink" d="M128 136 L142 114" marker-end="url(#sim-ar)"/><text x="136" y="98" class="t-s">280 b</text>' +
      '<path class="ink" d="M103 64 L110 72 L103 80 M131 64 L124 72 L131 80" style="fill:none;stroke-width:2"/><g id="sel12" style="transition:transform .3s"><circle class="ink-f" cx="117" cy="72" r="6"/></g>' +
      // clapets (3.1, 3.2) et limiteur de gavage (4)
      ckv(355, 275, -1, 'b32') + ckv(355, 372, 1, 'b31') + relief(394, 315, 1, '20 b', 'r', 'a4') + debit('Q1', 394, 372, 12) + bache(394, 390) +
      // soupapes HP (8.1, 8.2)
      relief(612, 270, 1, '320 b', 'l', 'a82') + relief(668, 412, -1, '320 b', 'lb', 'a81') +
      // tiroir d’échange (9) + pilotages + limiteur d’échange (10)
      '<path id="x9pT" class="ink" d="" style="stroke-dasharray:3 4"/><path id="x9pB" class="ink" d="" style="stroke-dasharray:3 4"/>' +
      '<g id="tir9" style="transition:transform .45s ease">' +
        '<rect class="ink-f" x="846" y="289" width="24" height="90"/><path class="ink" d="M846 319 H870 M846 349 H870"/>' +
        '<path class="ink" d="M868 304 L850 300" marker-end="url(#sim-ar)"/><path class="ink" d="M870 334 H864 M864 329 V339 M846 334 H852 M852 329 V339 M870 364 H864 M864 359 V369"/>' +
        '<path class="ink" d="M868 364 L850 368" marker-end="url(#sim-ar)"/><path class="ink" d="M870 274 H864 M864 269 V279"/><path class="ink" d="M870 394 H864 M864 389 V399"/>' +
        zigV(858, 276, 289, 10, 2) + zigV(858, 379, 392, 10, 2) +
        '<path class="solid" d="M852 268 h12 l-6 8z"/><path class="solid" d="M852 400 h12 l-6 -8z"/>' +
      '</g>' +
      relief(764, 346, 1, '18 b', 'l', 'a10') + debit('Q2', 764, 398, -12) + bache(764, 412) +
      // moteur hydraulique (7)
      '<circle class="ink-f" cx="959" cy="331" r="28"/><path class="solid" d="M959 316 l-8 -12 h16z"/><path class="solid" d="M959 346 l-8 12 h16z"/>' +
      '<g id="rot7"><path class="ink" d="M959 323 V339 M951 331 H967" style="stroke-width:3"/></g><path class="ink" d="M987 327 H998 M987 335 H998"/>' + bache(988, 382) +
      // flexible de fuite (13) + Q3
      debit('Q3', 530, 498, 12) +
      // prises de pression
      prise('MB', 920, 202, 'MB', 0, -10) + prise('MA', 920, 472, 'MA', 0, 22) + prise('M', 800, 476, 'M', 0, 22) + prise('MG', 54, 186, 'MG', -24, 4) +
      prise('Pp1', 82, 88, 'Pp1', -26, 4) + prise('Pp2', 182, 192, 'Pp2', -26, 4) + prise('Pp3', 294, 206, 'Pp3', 20, 4) +
      // jonctions
      [[110, 226], [78, 186], [355, 300], [394, 300], [355, 250], [355, 437], [433, 250], [456, 437], [117, 88], [236, 192], [253, 206], [612, 250], [612, 437], [668, 437], [668, 250], [900, 250], [900, 437], [920, 250], [920, 437], [800, 334], [880, 250], [880, 437]].map(function (q) { return dot(q[0], q[1]); }).join('') +
      // repères
      bulle('1', 196, 398) + bulle('2', 76, 380) + bulle('3.2', 326, 270) + bulle('3.1', 326, 380) + bulle('4', 432, 288) + bulle('5', 352, 176) + bulle('6', 238, 378) +
      bulle('7', 959, 395) + bulle('8.2', 592, 222) + bulle('8.1', 700, 462) + bulle('9', 836, 420) + bulle('10', 730, 428) + bulle('11', 86, 132) + bulle('12', 96, 50) +
      bulle('13', 530, 530) + bulle('14', 212, 512) +
      '<text x="250" y="230" text-anchor="middle" class="t-s t-m" style="opacity:0"></text>',
    panelHtml: '<div class="seg sim-seg"><button type="button" data-x="live" class="on">Tableau en direct</button><button type="button" data-x="exo">Exercice : remplis le tableau</button></div>' +
      '<div class="tw"><table class="sim-mt">' + ROWS.map(function (r) {
        return '<tr>' + r.map(function (k) { return k ? '<th>' + k + '</th><td data-m="' + k + '"></td>' : '<th class="mv-x"></th><td class="mv-x"></td>'; }).join('') + '</tr>';
      }).join('') + '</table></div>' +
      '<div class="sim-exobar" hidden><p class="muted">Pressions en bar, débits en L/min (les valeurs du schéma sont masquées).</p><button type="button" class="btn small primary" data-x="check">Vérifier</button> <button type="button" class="btn small" data-x="clear">Effacer</button><div class="sim-res"></div></div>',
    init: { man: 'N', charge: 250, panne: 'aucune', t: 0, ang: 0 },
    keep: ['ang'],
    controls: [
      { key: 'man', type: 'seg', label: 'Manche (servodistributeur 5)', options: [['AR', '◀ AR'], ['N', 'N'], ['AV', 'AV ▶']] },
      { key: 'charge', type: 'range', label: 'Résistance à l’avancement (pression demandée)', min: 20, max: 320, step: 10, unit: 'b' },
      { key: 'panne', type: 'select', label: 'Créer une panne', options: Object.keys(PANNES).map(function (k) { return [k, PANNES[k]]; }) }
    ],
    compute: function (st) {
      var dir = st.man === 'AV' ? 1 : st.man === 'AR' ? -1 : 0, pan = st.panne;
      var g = pan === 'gavDet' ? 5 : GAV, e = pan === 'echDet' ? 4 : ECH;
      var d = { dir: dir, run: false, ann: false, open: false, cale: false, cav: false, leak: 0, hp: g, bp: g, n: 0 };
      var Q = [QG, 0, 0, QG], servo = 0, M = 0;
      if (!dir || pan === 'gavDet') {
        // neutre (ou gavage détaré : la servocommande n’est plus alimentée, la pompe reste à cylindrée nulle)
        if (dir) servo = g;
      } else if (pan === 'echDet' && (st.t % 3) >= 1.5) {
        // limiteur d’échange détaré : la BP s’effondre, la pompe cavite et s’arrête, la pression remonte à 20 b
        d.cav = true; servo = GAV;
      } else {
        var lim = pan === 'shpDet' && dir > 0 ? 50 : SHP, hp = st.charge;
        if (pan !== 'annBloq' && hp >= ANN && lim > ANN) { hp = ANN; d.ann = true; }
        if (hp >= lim) { hp = lim; d.open = true; }
        if (pan === 'shpFuy' && dir > 0) { hp = Math.min(hp, 150); d.leak = Math.round(20 * hp / 150); }
        d.hp = hp; d.bp = e; d.run = !d.ann && !d.open; servo = d.ann ? 0 : e; M = e;
        Q = [0, QG - FUP - FUM, QG - FUP - FUM + FUM, QG];
        d.cale = d.open && pan === 'annBloq';
        d.n = d.run ? Math.round((QP - FUP - FUM - d.leak) / VM * 1000) : 0;
      }
      d.v = { MA: dir < 0 ? d.hp : d.bp, MB: dir > 0 ? d.hp : d.bp, M: M, MG: d.dir && !(pan === 'gavDet') && !d.cav ? d.bp : g, Pp2: dir < 0 ? servo : 0, Pp3: dir > 0 ? servo : 0, Q1: Q[0], Q2: Q[1], Q3: Q[2], Q4: Q[3] };
      if (d.cav) d.v.MG = GAV;
      d.v.Pp1 = Math.max(d.v.MA, d.v.MB);
      d.kw = d.ann ? d.hp * (FUP + FUM) / 600 : d.dir && !d.cav && pan !== 'gavDet' ? d.hp * QP / 600 : 0;
      var sens = dir > 0 ? 'avant' : 'arrière', hpB = dir > 0 ? 'MB (branche du haut)' : 'MA (branche du bas)';
      d.etat = !dir ? 'Neutre' : pan === 'gavDet' ? 'Ne bouge pas' : d.cav ? 'Cavitation : arrêt' : d.cale ? 'Le moteur thermique cale' : d.ann ? 'Annulation de débit' : d.open ? 'Soupape HP ouverte' : 'Marche ' + sens;
      d.text = !dir && pan === 'aucune' ? '<b>Neutre</b> : servodistributeur au centre (A et B à la bâche), servopiston au milieu, cylindrée nulle. La pompe de gavage (28 L/min) remplit les <b>deux branches à 20 b</b> par les clapets 3.1 et 3.2 ; tout le débit repart par le <b>limiteur de gavage 4</b> (Q1 = 28 L/min). Tiroir d’échange au centre : M = 0 b.'
        : pan === 'gavDet' ? '<b>Limiteur de gavage détaré à 5 b</b> : 5 b partout (HP, BP, gavage) dans les 3 positions. À 5 b le gavage ne plaque plus les pistons et n’alimente plus la servocommande : la pompe reste à cylindrée nulle, <b>le véhicule ne bouge pas</b>.'
        : !dir ? '<b>Neutre</b> : la boucle est au repos, le gavage remplit les deux branches. Panne sélectionnée : ' + PANNES[pan] + ' (elle se voit en marche).'
        : d.cav ? '<b>Limiteur d’échange détaré à 4 b</b> : dès que le véhicule part, le tiroir d’échange s’ouvre et la BP tombe à 4 b ; les pistons ne sont plus plaqués, la pompe <b>cavite</b> et s’arrête → la pression remonte à 20 b… et le cycle recommence (oscillations).'
        : d.cale ? '<b>Annulation de débit bloquée</b> : la HP monte jusqu’au tarage des <b>soupapes HP (320 b)</b> alors que la pompe débite toujours : 320 × 70 / 600 = <b>37,3 kW</b>, plus que le moteur thermique ne peut fournir → <b>il cale</b>. L’annulation (280 b) aurait dû couper le débit avant.'
        : d.ann ? '<b>Résistance maxi</b> : la HP atteint <b>280 b</b> ; par le sélecteur 12, elle pilote la <b>soupape d’annulation de débit 11</b> qui coupe l’alimentation du servodistributeur (Pp2 = Pp3 = 0 b) : le servopiston ramène la pompe vers la cylindrée nulle. Le moteur ne cale pas ; la pompe ne fournit plus que les fuites (4 L/min). Le gavage passe toujours par l’échange : Q2 = 28 − 4 = 24 L/min.'
        : d.open ? '<b>Soupape HP de marche avant détarée à 50 b</b> : en avant, la pression plafonne à 50 b (le reste à 18 b) : <b>manque de force</b>, l’huile passe par la soupape 8.2 dans l’autre branche et le véhicule n’avance plus en charge. En arrière, la HP monte bien à 280 b : pompe, sélecteur et annulation sont bons.'
        : pan === 'shpFuy' && dir > 0 ? '<b>Soupape HP de marche avant fuyarde</b> : une partie du débit (' + d.leak + ' L/min) repasse en permanence de la HP vers la BP : la pression ne dépasse pas ≈ 150 b et le moteur tourne moins vite (' + F(d.n) + ' tr/min au lieu de 2 063). L’huile laminée chauffe. (Valeurs d’exemple.)'
        : '<b>Marche ' + sens + '</b> : le servodistributeur alimente le servopiston (' + (dir > 0 ? 'Pp3' : 'Pp2') + ' = 18 b), la pompe débite dans ' + hpB + ' : <b>HP = ' + F(d.hp) + ' b</b> (la pression dépend de la résistance). Le clapet côté HP se ferme ; le gavage réalimente la BP par l’autre clapet. Le tiroir d’échange, piloté par la HP, envoie la BP au <b>limiteur d’échange 18 b</b> : Q1 = 0, Q2 = 28 − 4 = 24 L/min, Q3 = 24 + 2 (fuite moteur) = 26 L/min.';
      if (pan === 'filtre') d.text = '<b>Filtre 14 colmaté</b> : l’huile de retour ne passe plus à travers l’élément filtrant ; la pression monte devant le filtre et ouvre le <b>clapet de by-pass</b> : l’huile retourne à la bâche <b>sans être filtrée</b> (Q4 = 28 L/min passe par le by-pass). Aucun symptôme de pression sur la boucle : c’est l’entretien (indicateur de colmatage, échange de la cartouche) qui le détecte. ' + d.text;
      d.readouts = [['État', d.etat, d.cale || d.cav || d.open || pan === 'gavDet' ? 'hot' : d.run ? 'ok' : ''], ['Haute pression', F(Math.max(d.v.MA, d.v.MB)) + ' b', d.hp >= ANN ? 'hot' : ''],
        ['Basse pression', F(Math.min(d.v.MA, d.v.MB)) + ' b'], ['Moteur hydraulique', F(d.n) + ' tr/min'], ['Puissance', F(d.kw, 1) + ' kW', d.kw > 35 ? 'hot' : '']];
      return d;
    },
    tick: function (st, dt, d) {
      st.t += dt;
      if (d.n) st.ang = (st.ang + d.dir * d.n * dt * 0.15) % 360;
      return !!d.n || st.panne === 'echDet';
    },
    draw: function (a, st, d) {
      var v = d.v, up = d.dir > 0, run = d.run, gp = { pil: true };
      var hpT = run || d.ann || d.open ? up : false, hpB = run || d.ann || d.open ? d.dir < 0 : false;
      function br(id, p, hp, dir, o) { o = o || {}; if (!hp) o.pil = true; a.lineP(id, p, dir, o); }
      var fl = run ? 1 : 0;
      br('bH', v.MB, hpT, run ? (up ? 1 : -1) : 0, { at: 0.42 });
      br('bL', v.MA, hpB, run ? (up ? -1 : 1) : 0, { at: 0.42 });
      a.lineP('gvP', v.MG, 1, { pil: true, at: 0.86, dx: 22 });
      a.lineP('gvS', v.MG, 0, { pil: true, tag: false }); a.lineP('pMG', v.MG, 0, { pil: true, tag: false });
      var neut = !d.dir || st.panne === 'gavDet' || d.cav;
      a.lineP('cv32', v.MG, neut || !up ? 1 : 0, { pil: true, tag: false });
      a.lineP('cv31', v.MG, neut || up ? 1 : 0, { pil: true, tag: false });
      a.lineP('l4', v.MG, v.Q1 ? 1 : 0, { pil: true, tag: false }); a.lineP('q1', 0, v.Q1 ? 1 : 0, { tag: false });
      br('tpT', v.MB, hpT, 0, { tag: false }); br('tpB', v.MA, hpB, 0, { tag: false });
      br('p12', v.Pp1, v.Pp1 > 25, 0, { tag: false }); br('pPp1', v.Pp1, v.Pp1 > 25, 0, { tag: false });
      var sv = d.ann ? 0 : v.MG;
      a.lineP('sv0', sv, 0, { pil: sv > 0.5, tag: false }); a.lineP('svT', 0, 0, { tag: false });
      a.lineP('svA', v.Pp2, 0, { pil: v.Pp2 > 0.5, tag: false }); a.lineP('svB', v.Pp3, 0, { pil: v.Pp3 > 0.5, tag: false });
      a.lineP('pPp2', v.Pp2, 0, { pil: v.Pp2 > 0.5, tag: false }); a.lineP('pPp3', v.Pp3, 0, { pil: v.Pp3 > 0.5, tag: false });
      var o82 = d.open && up, o81 = d.open && d.dir < 0;
      br('s82i', v.MB, hpT, o82 ? 1 : 0, { tag: false }); br('s82o', v.MA, hpB, o82 ? 1 : 0, { tag: false });
      br('s81i', v.MA, hpB, o81 ? 1 : 0, { tag: false }); br('s81o', v.MB, hpT, o81 ? 1 : 0, { tag: false });
      br('x9T', v.MB, hpT, run && !up ? 1 : 0, { tag: false }); br('x9B', v.MA, hpB, run && up ? 1 : 0, { tag: false });
      a.lineP('x9O', v.M, v.Q2 ? 1 : 0, { pil: v.M > 0.5, tag: false }); a.lineP('pM', v.M, 0, { pil: v.M > 0.5, tag: false });
      a.lineP('q2', 0, v.Q2 ? 1 : 0, { tag: false });
      br('pMB', v.MB, hpT, 0, { tag: false }); br('pMA', v.MA, hpB, 0, { tag: false });
      a.lineP('dr13', 0, v.Q3 ? 1 : 0, { tag: false }); a.lineP('sc', 0, 1, { tag: false }); // Q3 : du bloc moteur vers le bloc pompe ; aspiration : de la bâche vers la pompe de gavage
      var col = st.panne === 'filtre';
      a.lineP('rt1', 0, 1, { tag: false }); a.lineP('rt2', 0, col ? 0 : 1, { tag: false }); a.lineP('byp', 0, col ? 1 : 0, { tag: false });
      a.q('bpB').style.transform = col ? 'translateY(6px)' : '';
      a.lineP('dr1', 0, d.dir && !neut ? 1 : 0, { tag: false }); a.lineP('dr7', 0, d.n ? 1 : 0, { tag: false });
      // organes mobiles
      var shift = neut || d.ann ? 0 : up ? -33 : 33;
      a.q('svd').style.transform = 'translateX(' + shift + 'px)';
      a.move('sp6', neut || d.ann ? 0 : up ? 10 : -10, 0);
      a.show('an11', !d.ann); a.show('an11b', d.ann);
      // flèches des limiteurs / soupapes : dans l’axe quand l’appareil est ouvert ; billes des clapets soulevées quand le gavage passe
      a.q('a4').style.transform = v.Q1 ? 'translateX(-6px)' : '';
      a.q('a10').style.transform = v.Q2 ? 'translateX(-6px)' : '';
      a.q('a82').style.transform = o82 ? 'translateX(-6px)' : '';
      a.q('a81').style.transform = o81 ? 'translateX(-6px)' : '';
      a.q('b32').style.transform = neut || !up ? 'translateY(-5px)' : '';
      a.q('b31').style.transform = neut || up ? 'translateY(5px)' : '';
      a.q('va1').style.transform = neut || d.ann ? '' : up ? 'rotate(40deg)' : 'rotate(-40deg)';
      a.q('sel12').style.transform = 'translateX(' + (v.MB > v.MA ? -5 : v.MA > v.MB ? 5 : 0) + 'px)';
      var dy = run || d.ann || d.open ? (up ? 30 : -30) : 0;
      a.q('tir9').style.transform = 'translateY(' + dy + 'px)';
      a.attr('x9pT', 'd', 'M880 250 V262 H858 V' + (268 + dy)); a.attr('x9pB', 'd', 'M880 437 V420 H858 V' + (408 + dy));
      a.move('rot7', 0, 0, st.ang, 959, 331);
      Object.keys(v).forEach(function (k) { a.text('tv' + k, fmtV(k, v[k])); });
    },
    panelDraw: function (el, st, d, c) {
      el._v = d.v;
      if (c.exo) return;
      el.querySelectorAll('td[data-m]').forEach(function (td) {
        var k = td.getAttribute('data-m'), t = fmtV(k, d.v[k]);
        if (td.textContent !== t) { td.textContent = t; td.className = cls(k, d.v[k]); }
      });
    },
    panelClick: function (e, c) {
      var b = e.target.closest('[data-x]'); if (!b) return;
      var el = c.host.querySelector('.sim-panel'), x = b.getAttribute('data-x');
      if (x === 'live' || x === 'exo') {
        c.exo = x === 'exo';
        el.querySelectorAll('[data-x="live"],[data-x="exo"]').forEach(function (t) { t.classList.toggle('on', t === b); });
        c.host.classList.toggle('sim-exo', c.exo);
        el.querySelector('.sim-exobar').hidden = !c.exo;
        el.querySelector('.sim-res').textContent = '';
        el.querySelectorAll('td[data-m]').forEach(function (td) {
          td.className = ''; td.innerHTML = c.exo ? '<input type="text" inputmode="decimal" aria-label="' + td.getAttribute('data-m') + '">' : '';
        });
        c.dirty = true;
      } else if (x === 'clear') {
        el.querySelectorAll('td[data-m] input').forEach(function (i) { i.value = ''; i.className = ''; });
        el.querySelectorAll('.exp').forEach(function (s) { s.remove(); });
        el.querySelector('.sim-res').textContent = '';
      } else if (x === 'check') {
        var ok = 0, n = 0;
        el.querySelectorAll('.exp').forEach(function (s) { s.remove(); });
        el.querySelectorAll('td[data-m]').forEach(function (td) {
          var k = td.getAttribute('data-m'), inp = td.querySelector('input'), want = el._v[k], got = parseFloat(String(inp.value).replace(',', '.'));
          n++;
          var good = isFinite(got) && Math.abs(got - want) <= 1;
          inp.className = good ? 'ok' : 'ko'; if (good) ok++;
          else td.insertAdjacentHTML('beforeend', '<span class="exp">' + fmtV(k, want) + '</span>');
        });
        el.querySelector('.sim-res').textContent = ok + ' / ' + n + ' bonnes réponses' + (ok === n ? ' — bravo !' : '');
      }
    },
    steps: [
      { title: 'Neutre', text: 'Manche au neutre : <b>20 b partout</b> dans la boucle (gavage par les clapets 3.1 et 3.2), M = 0 b, Pp2 = Pp3 = 0 b. Tout le gavage repart par le limiteur 4 : <b>Q1 = Q4 = 28 L/min</b>, Q2 = Q3 = 0.', set: { man: 'N' } },
      { title: 'Manche avant à 250 b', text: 'Marche avant : <b>MB = Pp1 = 250 b</b> (HP), MA = M = MG = 18 b (BP tenue par le limiteur d’échange), Pp3 = 18 b, Pp2 = 0 b. Débits : Q1 = 0, <b>Q2 = 24</b>, <b>Q3 = 26</b>, Q4 = 28 L/min.', set: { man: 'AV', charge: 250 } },
      { title: 'Manche avant, résistance maxi', text: 'La HP atteint <b>280 b</b> : la soupape d’annulation 11 (pilotée par le sélecteur 12) coupe la servocommande (<b>Pp2 = Pp3 = 0 b</b>) : la pompe revient vers la cylindrée nulle, le moteur ne cale pas. MB = Pp1 = 280 b ; MA = M = MG = 18 b. (Débits calculés : Q1 = 0, Q2 = 24, Q3 = 26, Q4 = 28 L/min.)', set: { man: 'AV', charge: 300 } },
      { title: 'Manche arrière à 250 b', text: 'Marche arrière : les branches s’inversent, <b>MA = Pp1 = 250 b</b>, MB = 18 b ; c’est <b>Pp2</b> qui vaut 18 b (l’autre côté du servopiston). Le moteur tourne dans l’autre sens.', set: { man: 'AR', charge: 250 } },
      { title: 'Panne : soupape HP détarée', text: 'Cas 1 du cours : en marche avant la HP plafonne à <b>50 b</b> → manque de force sur une seule boucle. En arrière elle monte à 280 b. Conclusion : <b>soupape HP de la boucle marche avant (8.2) détarée</b>.', set: { man: 'AV', charge: 250, panne: 'shpDet' } },
      { title: 'Panne : annulation bloquée', text: 'Cas 2 du cours : <b>320 b dans les deux sens</b> et le moteur thermique cale : la pression atteint les soupapes HP alors que la pompe débite toujours (37,3 kW). Conclusion : <b>soupape d’annulation de débit (11) bloquée</b> ou sur-tarée.', set: { man: 'AV', charge: 320, panne: 'annBloq' } },
      { title: 'Panne : gavage détaré', text: 'Cas 3 du cours : <b>5 b partout</b> dans les 3 positions, le véhicule ne bouge pas. Conclusion : <b>limiteur de pression de gavage (4) détaré à 5 b</b>.', set: { man: 'AV', charge: 250, panne: 'gavDet' } },
      { title: 'Panne : échange détaré', text: 'Cas 4 du cours : le véhicule part puis s’arrête ; les pressions chutent de 20 b à <b>4 b</b> puis remontent, en oscillant. Conclusion : <b>limiteur d’échange (10) détaré à 4 b</b>.', set: { man: 'AV', charge: 250, panne: 'echDet' }, },
      { title: 'Panne : soupape HP fuyarde', text: 'La soupape HP de marche avant laisse fuir une partie du débit vers la BP : la pression ne monte plus (≈ 150 b maxi), le moteur tourne moins vite et l’huile chauffe. (Valeurs d’exemple.)', set: { man: 'AV', charge: 250, panne: 'shpFuy' } }
    ],
    stepMs: 7000
  });
})();
