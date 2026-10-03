/* PPLD — questions de calcul : la valeur cherchée est masquée sur le schéma de la question (img/ppld/q/…), le schéma complet
   revient dans l'explication, et l'explication dit d'où vient chaque valeur. Chargé après 77-sans-indices. */
(function () {
  var MASK = ['stabs-neutre', 'stabs-fonctionnement', 'stabs-butee', 'rmu-neutre', 'rmu-fonctionnement', 'rmu-butee', 'grue-neutre', 'grue-fonctionnement', 'grue-fin-de-course',
    'ph-stab-85b', 'ph-treuil-fin-de-course', 'ph-treuil-halage', 'ph-rmu-corps-fleche', 'ph-rmu-corps-fleche-butee'];
  var E = [
    [/^Stabilisateurs au neutre : puissance absorbée/, 'Pression : au neutre, la pompe est en stand-by → 30 b (ressort du tiroir LS, couleur rouge de la légende) ; Débit : aucun vérin ne bouge, seul le gicleur anti-pompage laisse fuir 1 L/min ; Calcul : Pu = p × Q / 600 = 30 × 1 / 600 = 0,05 kW.'],
    [/^RMU et grue au neutre : débit de la pompe/, 'Au neutre, la pompe ne débite que ce qui fuit en permanence ; 1 L/min par le gicleur anti-pompage (sur le vérin du plateau de la pompe) ; 1 L/min par le gicleur LS du bloc d’entrée du RSQ 240 ; Total : 1 + 1 = 2 L/min (puissance : 30 × 2 / 600 = 0,1 kW).'],
    [/^Récepteur alimenté à 40 L\/min : débit total de la pompe/, '40 L/min : le débit envoyé au récepteur (régulateur de débit 3 voies) ; 1 L/min : la fuite permanente du gicleur anti-pompage ; Débit pompe = 40 + 1 = 41 L/min.'],
    [/^Stabilisateurs en butée : puissance totale absorbée/, 'Pression du circuit : le vérin est en butée, la pression monte jusqu’au limiteur piloté du CETOP = tête pilote 200 b + balance 20 b = 220 b ; Pression pompe : 220 + 30 b (ΔP du régulateur de débit) = 250 b (rouge de la légende) ; Débit : le DAD (320 b) n’est pas atteint, la pompe débite toujours 40 + 1 = 41 L/min ; Limiteur piloté : 220 × 40 / 600 = 14,667 kW ; Régulateur : 30 × 40 / 600 = 2 kW ; Gicleur anti-pompage : 250 × 1 / 600 = 0,417 kW ; Total : 14,667 + 2 + 0,417 = 17,083 kW = pompe 250 × 41 / 600 ✔ (le cahier écrit 17,07 kW en arrondissant).'],
    [/^Télescopage du RMU en butée \(LPS 200 b\) : pression de service/, '200 b : en sortie, le vérin de télescopage est en butée, la pression monte jusqu’au LPS de la sortie télescopage : 200 b, lu sur le schéma à côté du limiteur ; + 30 b : le tiroir LS de la pompe garde toujours 30 b au-dessus de la pression LS ; Pression de service = 200 + 30 = 230 b ; Le DAD (320 b) n’est pas atteint : la pompe débite toujours 40 + 1 = 41 L/min, d’où 230 × 41 / 600 = 15,717 kW (le cahier écrit 15,71).'],
    [/^Rotation de la grue en fin de course \(LPS 210 b\)/, '210 b : le moteur de rotation est en fin de course, la pression monte jusqu’au LPS du moteur de rotation : 210 b, lu sur le schéma à côté du limiteur ; + 30 b : le tiroir LS de la pompe garde 30 b au-dessus de la pression LS → pression de service = 210 + 30 = 240 b ; 41 L/min : le DAD (320 b) n’est pas atteint, donc la pompe ne s’annule pas : 40 L/min passent par le LPS + 1 L/min pour le gicleur anti-pompage ; Puissance = 240 × 41 / 600 = 16,40 kW, entièrement transformée en chaleur.'],
    [/^Stabilisateur à 85 b : pression de service/, '85 b : la pression du vérin (donnée) ; + 30 b : la ΔP du régulateur de débit 3 voies, qui garde la vitesse constante ; Pression de service = 85 + 30 = 115 b.'],
    [/^Stabilisateur à 85 b \(40 L\/min\) : puissance fournie par la pompe|^Sortie d’un stabilisateur à 85 b : puissance fournie par la pompe/, 'Pression pompe : 85 b (vérin) + 30 b (ΔP du régulateur de débit) = 115 b ; Débit pompe : 40 L/min (régulateur) + 1 L/min (gicleur anti-pompage) = 41 L/min ; Puissance = 115 × 41 / 600 = 7,858 kW ; Vérification : vérin 85 × 40 / 600 = 5,667 + régulateur 30 × 40 / 600 = 2 + gicleur 115 × 1 / 600 = 0,192 → 7,858 kW.'],
    [/^Stabilisateur en butée : pourquoi la pompe est-elle à 250 b/, '220 b : en butée, la pression monte jusqu’au limiteur de pression piloté du CETOP (tête pilote 200 b + balance d’entrée 20 b) ; 30 b : la ΔP du régulateur de débit 3 voies placé avant le bloc ; Pompe = 220 + 30 = 250 b (le DAD 320 b n’est pas atteint).'],
    [/^Électrovanne de fin de course fermée sur le halage : puissance de la pompe/, 'L’électrovanne fermée bloque l’huile : la pression LS monte jusqu’au DAD taré à 320 b ; Pression pompe : 320 + 30 b = 350 b (rouge de la légende) ; Débit : le DAD annule le débit, il ne reste que 1 L/min (gicleur anti-pompage) + 0,5 L/min (gicleur du DAD) = 1,5 L/min ; Puissance = 350 × 1,5 / 600 = 0,875 kW : pression maxi mais presque pas de puissance.'],
    [/^Gicleur du DAD \(0,5 L\/min\) quand la pompe est à 350 b/, 'Le gicleur du DAD est entre la pompe (350 b) et le DAD (320 b) ; Sa chute de pression : ΔP = 350 − 320 = 30 b ; Son débit : 0,5 L/min ; Puissance = 30 × 0,5 / 600 = 0,025 kW (on prend la chute de pression, pas la pression totale).'],
    [/^Halage à 180 b et 28 L\/min : pression et débit de la pompe/, 'Pression : 180 b au moteur de halage (donnée) + 30 b de ΔP dans le distributeur = 210 b ; Débit : 28 L/min au moteur (donné) + 1 L/min du gicleur anti-pompage = 29 L/min.'],
    [/^Halage à 180 b et 28 L\/min : débit qui traverse le distributeur/, 'Le moteur reçoit 28 L/min ; Sur ces 28 L/min, 1 L/min (low flow) passe par le gicleur LS ; Le reste traverse le distributeur (full flow) : 28 − 1 = 27 L/min.'],
    [/^Corps de flèche, 300 b au manomètre : pression dans les vérins/, '300 b : la pression lue au manomètre est celle de la pompe (pression de service) ; La pompe garde toujours 30 b au-dessus de la charge (tiroir LS) ; Pression dans les vérins = 300 − 30 = 270 b.'],
    [/^Corps de flèche en butée( \(LPS 300 b\))? : pression de la pompe/, '300 b : en butée, la pression monte jusqu’au LPS du corps de flèche : 300 b, lu sur le schéma à côté du limiteur ; + 30 b : le tiroir LS ajoute toujours 30 b → pompe à 330 b ; Le signal LS (300 b) n’atteint pas le DAD (320 b) : le débit ne s’annule pas, il part en chaleur dans le LPS.']
  ];
  /* Télescopage du RMU en sortie, en fonctionnement à 100 b (limiteur de débit en sortie : ΔP 10 b) */
  var REG = ['ppld/dad-standby.jpg', 'Régulation de la pompe : tiroir LS, ressort de stand-by (30 b), DAD (320 b), gicleur anti-pompage (1 L/min), gicleur 0,5 L/min, vérin de commande du plateau'];
  var T = 'Télescopage du RMU en sortie, en fonctionnement à 100 b (limiteur de débit en sortie de télescopage : ΔP 10 b)';
  var NQ = [
    [T + ' : pression de service ?', ['140 b', '110 b', '130 b', '100 b'], 'Vérin de télescopage : 100 b (donné), lu en bordeaux sur le schéma ; Le limiteur de débit en sortie de télescopage crée une ΔP de 10 b : l’autre vérin est donc à 100 + 10 = 110 b ; La pression LS recopie la plus forte : 110 b ; Le tiroir LS de la pompe ajoute 30 b : pression de service = 110 + 30 = 140 b.'],
    [T + ' : pourquoi un des vérins est-il à 110 b ?', ['100 b du vérin + 10 b de ΔP du limiteur de débit en sortie de télescopage', '100 b + 10 b de ΔP du distributeur', '140 b − 30 b du tiroir LS', '110 b est la pression de stand-by'], 'Les 2 vérins jumelés reçoivent 20 L/min chacun ; Le limiteur de débit placé en sortie de télescopage freine l’huile : chute de 10 b ; Ce vérin travaille donc à 100 + 10 = 110 b.'],
    [T + ' : puissance perdue dans le limiteur de débit ?', ['0,33 kW', '0,67 kW', '2 kW', '1,17 kW'], 'Chute de pression du limiteur : ΔP = 10 b ; Débit qui le traverse : 20 L/min (un des deux vérins) ; Puissance = 10 × 20 / 600 = 0,33 kW, transformée en chaleur.'],
    [T + ' : puissance totale absorbée ?', ['9,57 kW', '7 kW', '15,72 kW', '7,86 kW'], 'Pompe : 110 b (vérin le plus chargé) + 30 b (tiroir LS) = 140 b ; 40 L/min (vérins) + 1 L/min (gicleur anti-pompage) = 41 L/min ; Puissance pompe = 140 × 41 / 600 = 9,567 kW ; Vérification : vérins 100 × 20 / 600 + 110 × 20 / 600 = 7 kW ; Limiteur de débit : 10 × 20 / 600 = 0,333 kW ; Distributeur (full flow 39 L/min) : 30 × 39 / 600 = 1,95 kW ; Gicleur LS (low flow 1 L/min) : 30 × 1 / 600 = 0,05 kW ; Gicleur anti-pompage : 140 × 1 / 600 = 0,233 kW ; Total = 9,567 kW. Le cahier trouve 9,60 kW parce qu’il arrondit à 2 chiffres et compte le distributeur sur 40 L/min.']
  ];
  function nq(l) { return NQ.map(function (x) { return { l: l, q: x[0], c: x[1], e: x[2], img: 'ppld/q/rmu-fonctionnement.jpg', eimg2: ['ppld/rmu-fonctionnement.jpg', 'Le schéma complet, avec les valeurs de la légende'], eimg: REG, src: 'Cours PPLD, analyse énergétique du RMU' }; }); }
  REV.addExercises('ppld', { lessons: [], questions: nq('energie') });
  REV.addExercises('uv3', { lessons: [], questions: nq('ppld') });

  Object.keys(REV.qById).forEach(function (id) {
    var q = REV.qById[id];
    if (q.subject !== 'ppld' && !(q.subject === 'uv3' && /ppld/.test(q.lkey))) return;
    var e = null;
    for (var i = 0; i < E.length; i++) if (E[i][0].test(q.q)) { e = E[i][1]; break; }
    if (!e) return;
    q.e = e;
    q.c = q.c.map(function (c) { return c === '17,07 kW' ? '17,08 kW' : c; });
    q.q = q.q.replace('Télescopage du RMU en butée (LPS 200 b)', 'Télescopage du RMU en butée en sortie').replace('Rotation de la grue en fin de course (LPS 210 b)', 'Rotation de la grue en fin de course').replace('Corps de flèche en butée (LPS 300 b)', 'Corps de flèche en butée');
    var m = (q.img || '').match(/^ppld\/([\w-]+)\.jpg$/);
    if (m && MASK.indexOf(m[1]) >= 0) {
      q.eimg2 = ['ppld/' + m[1] + '.jpg', 'Le schéma complet, avec les valeurs de la légende'];
      q.img = 'ppld/q/' + m[1] + '.jpg';
    }
  });
})();
