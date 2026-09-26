/* Motorisation : schémas du livre GD 21 (Motorisation tome 1) — moteur, cycle, distribution,
   graissage (pompes à huile), refroidissement (pompe à eau, thermostat, bouchon) et capteurs d’injection essence. */
(function () {
  var G = 'gd21/', SRC = 'GD 21 — Motorisation tome 1';
  function im(f, cap) { return { src: G + f + '.jpg', cap: cap }; }

  REV.extendLesson('moteur/caracteristiques', {
    images: [im('m030_0', 'Alésage (diamètre du cylindre) et course (PMH → PMB)'), im('m031_0', 'Volume du cylindre, piston au PMB (Vu + v)'), im('m031_1', 'Volume de la chambre, piston au PMH (v)'),
      im('m019_0', 'Culasse : chambres de combustion'), im('m017_4', 'Cylindre usiné dans le bloc'), im('m018_0', 'Chemise sèche'), im('m018_1', 'Chemise humide (avec joint)'), im('m018_2', 'Cylindre à ailettes (refroidissement par air)'),
      im('m024_0', 'Segments : 1 racleur · 2 et 3 segments de compression, coupes décalées'), im('m025_0', 'Bielle : pied, bague, corps, tête, coussinets, chapeau'),
      im('m026_0', 'Vilebrequin : plateau de fixation, tourillons, masses d’équilibrage, manetons, nez'), im('m029_1', 'Volant moteur : 1 couronne dentée · 2 disque d’embrayage · 3 face de centrage')]
  });
  REV.extendLesson('moteur/cycle', {
    images: [im('m036_0', 'Les 4 temps : admission, compression, explosion-détente, échappement'), im('m041_0', 'Diagramme réel : AOA, RFA, AOE, RFE'), im('m044_0', 'Épure de distribution : balayage (croisement) autour du PMH')]
  });
  REV.extendLesson('moteur/distribution', {
    images: [im('m046_0', 'Soupape : 1 coupelle + clavettes · 2 queue · 3 ressort · 4 guide · 5 siège · 6 tête (tulipe)'), im('m048_0', 'Joints de queue de soupape'),
      im('m049_1', 'Poussoirs : à galet, sabot, plateau, désaxé'), im('m050_0', 'Poussoir hydraulique (rattrapage automatique du jeu)'), im('m051_2', 'Culbuteurs : arbre à cames en tête / arbre à cames latéral, réglage du jeu'),
      im('m052_0', 'Came : cercle primitif, hauteur de levée, jeu'), im('m052_1', 'Arbre à cames : cames, paliers, entraînements'),
      im('m054_0', 'Arbre à cames latéral : poussoirs, tiges, culbuteurs, chaîne'), im('m054_1', 'Arbres à cames en tête à attaque directe'), im('m054_2', 'Arbres à cames en tête avec culbuteurs'),
      im('m057_0', 'Réglage du jeu aux soupapes à la jauge d’épaisseur'), im('m058_0', 'Pignon d’arbre à cames = 2 × pignon de vilebrequin : ½ vitesse'),
      im('m059_0', 'Entraînement par courroie crantée + tendeur'), im('m060_0', 'Tendeur hydraulique : corps, piston, ressort, patin'), im('m061_0', 'Entraînement par chaîne'), im('m062_1', 'Usure du poussoir et de la came')],
    html: `
<h3>Distribution (GD 21)</h3>
<p><b>Rôle</b> : commander l’ouverture et la fermeture des soupapes en les synchronisant avec le mouvement des pistons. L’arbre à cames tourne à <b>½ vitesse</b> du vilebrequin (son pignon a 2 fois plus de dents). Soupape d’admission de plus grand diamètre (le remplissage est plus difficile). Le <b>jeu aux soupapes</b> compense la dilatation (réglage à la jauge, ou poussoirs hydrauliques). Entraînement par engrenages, chaîne (+ tendeur hydraulique) ou courroie crantée (+ galet tendeur) ; le calage se fait sur repères.</p>`
  });
  REV.extendLesson('moteur/graissage', {
    images: [im('m067_1', 'Formation du film d’huile dans un palier'), im('m068_0', 'Graissage du vilebrequin : rampe principale → tourillons → manetons'),
      im('m070_1', 'Pompe à huile à engrenages'), im('m070_2', 'Pompe à huile à rotor'), im('m070_3', 'Pompe à huile à palettes'),
      im('m070_0', 'Clapet de surpression (limiteur de pression) sur la rampe'), im('m071_0', 'Filtre monté en dérivation (parallèle)'), im('m072_0', 'Filtre monté en série avec clapet de by-pass'),
      im('m072_1', 'Cartouche de filtre à huile en coupe'), im('m072_2', 'Circuit de graissage sous pression'), im('m069_0', 'Graissage par carter sec : 1 réservoir · 2 pompe de refoulement · 3 pompe de puisement · 4 carter · 5 puits · 6 filtre'),
      im('m066_1', 'Huile multigrade : grade hiver (W) et grade chaud'), im('m073_0', 'Jauge à huile (mini / maxi)'),
      im('m074_0', 'Transmetteur et indicateur de pression : 1 huile · 2 sonde · 3 galvanomètre · 4 contact'), im('m074_1', 'Manocontact et lampe témoin : 1 huile · 2 manocontact · 3 lampe · 4 contact')],
    html: `
<h3>Graissage (GD 21)</h3>
<ul><li><b>Rôle</b> : empêcher le contact direct des pièces (sinon frottement → chaleur → grippage), refroidir, nettoyer.</li>
<li><b>Systèmes</b> : huile perdue (2 temps, 1/25 à 1/100), barbotage (petits moteurs), <b>sous pression</b> (le plus courant), sous pression intégrale (axe de piston graissé par la bielle), <b>carter sec</b> (tout-terrain, centre de gravité bas : pompe de puisement + pompe de refoulement + réservoir).</li>
<li><b>Pompe à huile</b> (dans le carter, entraînée par la distribution, aspire à travers la crépine) : à <b>engrenages</b>, à <b>rotor</b> ou à <b>palettes</b>. Le <b>limiteur de pression</b> évite d’abîmer la pompe et le circuit.</li>
<li><b>Filtre</b> : en série (tout le débit, clapet de by-pass si colmaté) ou en dérivation (une partie du débit).</li>
<li><b>Contrôle</b> : jauge ; manocontact → voyant si pression insuffisante (arrêter immédiatement le moteur) ; transmetteur + indicateur de pression.</li>
<li><b>Huile</b> : grade « W » = viscosité à froid (plus le chiffre est petit, plus l’huile est fluide) ; normes API (S essence, C diesel) et ACEA.</li></ul>`
  });
  REV.extendLesson('moteur/refroidissement', {
    images: [im('m075_0', 'Refroidissement par air : ailettes'), im('m076_1', 'Air forcé : 1 tôles déflectrices · 2 volet · 3 thermostat'),
      im('m077_0', 'Radiateur : boîtes à eau, faisceau, bouchons'), im('m078_0', 'Pompe à eau centrifuge'), im('m079_0', 'Étanchéité de la pompe à eau : anneau élastique A + bague autolubrifiante B'),
      im('m079_1', 'Thermostat simple effet : à froid fermé, à chaud ouvert (capsule de cire)'), im('m080_0', 'Thermostat double effet : à froid (by-pass), à chaud'),
      im('m082_0', 'Circuit sous pression : 1 radiateur · 3 pompe à eau · 4 thermostat · 8 vase d’expansion · 9 bouchon · 10 sonde de température · 13 radiateur de chauffage'),
      im('m084_0', 'Bouchon : clapet de pression (0,8 à 1,2 bar) et clapet de dépression (0,05 bar)'), im('m085_0', 'Liquide froid'), im('m085_1', 'Liquide chaud : le vase se remplit'), im('m085_2', 'Arrêt : le liquide retourne au radiateur'),
      im('m089_0', 'Tarage des bouchons selon la pastille (1,2 à 1,8 bar)'), im('m086_0', 'Motoventilateur électrique'), im('m087_2', 'Ventilateur débrayable'),
      im('m087_1', 'Transmetteur de température (thermistance) et indicateur'), im('m088_1', 'Thermocontact et lampe témoin')],
    html: `
<h3>Refroidissement (GD 21)</h3>
<ul><li><b>Rôle</b> : évacuer les calories en trop (combustion 2 000 à 2 500 °C) tout en gardant la bonne température de fonctionnement.</li>
<li><b>Pompe à eau</b> (circulateur) : pompe <b>centrifuge</b> entraînée par courroie, brasse le liquide et augmente sa vitesse ; étanchéité par anneau élastique + bague autolubrifiante.</li>
<li><b>Thermostat</b> (capsule de cire) : à froid fermé → pas de circulation vers le radiateur (montée rapide en température) ; à chaud ouvert. Double effet : à froid, circulation bloc ↔ culasse par le by-pass.</li>
<li><b>Circuit sous pression</b> : 1,8 bar ≈ ébullition à 115 °C. Bouchon du vase : clapet de pression (0,8 à 1,2 bar) et clapet de dépression (0,05 bar).</li>
<li><b>Liquide</b> : refroidit, antigel, anticorrosion, lubrifie la pompe ; certains liquides ne se mélangent pas.</li>
<li><b>Contrôle</b> : transmetteur (thermistance) + indicateur, ou thermocontact + lampe.</li></ul>`
  });
  REV.extendLesson('moteur/capteurs-cr', {
    images: [im('m149_0', 'Capteur de régime et de position (volant, cible dentée)'), im('m150_2', 'Capteur de cliquetis sur le bloc'), im('m151_0', 'Implantation du capteur de cliquetis'),
      im('m151_1', 'Signal sans cliquetis'), im('m151_2', 'Signal avec cliquetis'), im('m152_0', 'Potentiomètre de papillon'), im('m153_0', 'Capteur de vitesse véhicule'),
      im('m156_0', 'Injecteur essence : 1 connexion · 2 noyau · 3 enroulement · 4 buse · 5 arrivée de carburant')]
  });

  var Q = [
    ['caracteristiques', 'm030_0', 'L’alésage est :', 'Le diamètre du cylindre', 'La distance entre PMH et PMB', 'Le volume de la chambre'],
    ['caracteristiques', 'm024_0', 'Sur un piston, le segment le plus bas (1) est :', 'Le segment racleur', 'Le segment coup de feu', 'Le segment d’étanchéité de compression'],
    ['caracteristiques', 'm018_1', 'Une chemise humide est :', 'En contact direct avec le liquide de refroidissement (avec joint)', 'Emmanchée à sec dans le bloc', 'À ailettes'],
    ['cycle', 'm041_0', 'Sur le diagramme réel, AOA signifie :', 'Avance à l’ouverture de l’admission', 'Avance à l’ouverture de l’allumage', 'Arrêt ouverture admission'],
    ['distribution', 'm046_0', 'Sur la soupape, l’élément 4 est :', 'Le guide', 'Le siège', 'La coupelle'],
    ['distribution', 'm058_0', 'Pourquoi le pignon d’arbre à cames a-t-il 2 fois plus de dents que celui du vilebrequin ?', 'Pour tourner à ½ vitesse (un cycle = 2 tours de vilebrequin)', 'Pour tourner 2 fois plus vite', 'Pour augmenter la levée'],
    ['distribution', 'm050_0', 'Rôle du poussoir hydraulique :', 'Rattraper automatiquement le jeu aux soupapes', 'Augmenter la levée des soupapes', 'Graisser l’arbre à cames'],
    ['distribution', 'm057_0', 'Le jeu aux soupapes se règle :', 'À la jauge d’épaisseur, soupape fermée (came sur le cercle de base)', 'Moteur chaud en fonctionnement', 'Soupape ouverte au maximum'],
    ['distribution', 'm060_0', 'Rôle du tendeur hydraulique :', 'Maintenir la tension de la chaîne ou de la courroie', 'Régler le calage de l’injection', 'Lubrifier les soupapes'],
    ['graissage', 'm070_1', 'Quels sont les 3 types de pompes à huile du cours ?', 'À engrenages, à rotor, à palettes', 'Centrifuge, à piston, à membrane', 'À vis, à engrenages, centrifuge'],
    ['graissage', 'm070_0', 'Rôle du limiteur (clapet) de pression d’huile :', 'Éviter une pression trop forte qui abîmerait la pompe et le circuit', 'Allumer le voyant', 'Filtrer l’huile'],
    ['graissage', 'm072_0', 'Filtre à huile monté en série : pourquoi un clapet de by-pass ?', 'Pour que l’huile passe quand même si la cartouche est colmatée', 'Pour doubler le débit', 'Pour refroidir l’huile'],
    ['graissage', 'm069_0', 'Le graissage par carter sec comporte :', 'Une pompe de puisement, une pompe de refoulement et un réservoir séparé', 'Uniquement une cuillère sur la bielle', 'De l’huile mélangée au carburant'],
    ['graissage', 'm074_1', 'Le voyant de pression d’huile s’allume moteur tournant :', 'Pression insuffisante : arrêter immédiatement le moteur', 'Huile trop froide, continuer', 'Filtre neuf'],
    ['graissage', 'm066_1', 'Dans une huile 10W40, le chiffre 10 indique :', 'La viscosité à froid (hiver)', 'La viscosité à chaud', 'La norme API'],
    ['refroidissement', 'm078_0', 'La pompe à eau est une pompe :', 'Centrifuge entraînée par courroie', 'À engrenages', 'Électrique à membrane'],
    ['refroidissement', 'm079_1', 'Thermostat à froid :', 'Fermé : pas de circulation entre moteur et radiateur', 'Ouvert en grand', 'Il envoie tout le liquide au vase'],
    ['refroidissement', 'm084_0', 'Le bouchon du vase d’expansion comporte :', 'Un clapet de pression et un clapet de dépression', 'Uniquement un clapet de pression', 'Un thermostat'],
    ['refroidissement', 'm082_0', 'Pourquoi met-on le circuit de refroidissement sous pression ?', 'Pour élever la température d’ébullition du liquide', 'Pour augmenter le débit de la pompe', 'Pour refroidir l’huile'],
    ['refroidissement', 'm087_1', 'Le transmetteur de température contient :', 'Une thermistance', 'Un bilame à 3 positions', 'Un potentiomètre'],
    ['capteurs-cr', 'm151_2', 'Rôle du capteur de cliquetis :', 'Détecter les vibrations du cliquetis pour que le calculateur corrige l’avance', 'Mesurer la vitesse du véhicule', 'Mesurer la pression d’huile']
  ];
  REV.addExercises('moteur', { lessons: [], questions: Q.map(function (x) {
    return { l: x[0], img: G + x[1] + '.jpg', q: x[2], c: [x[3], x[4], x[5]], e: x[3] + '. (' + SRC + ')', src: SRC };
  }) });
})();
