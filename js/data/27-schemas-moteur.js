/* Motorisation : pompes et injecteurs avec les schémas du livre GD 22 (Motorisation tome 2) :
   injecteurs mécaniques et aide au démarrage, pompe en ligne, pompe VE Bosch, suralimentation,
   capteurs / actionneurs du common rail, common rail Bosch et Delphi. */
(function () {
  var G = 'gd22/', SRC = 'GD 22 — Motorisation tome 2';
  function im(f, cap) { return { src: G + f + '.jpg', cap: cap }; }

  REV.addLessons('moteur', 'injection', [
    {
      id: 'injecteurs', title: 'Injecteurs mécaniques, porte-injecteur et aide au démarrage',
      images: [im('g043_1', 'Porte-injecteur et injecteur en coupe'), im('g044_0', 'Injecteurs à téton (cylindrique / conique) : fermé et ouvert'),
        im('g045_0', 'Injecteur à trou pilote : R = recouvrement, P = trou pilote, S = siège, repère face à l’arrivée'),
        im('g045_1', 'Injecteur à étranglement : fermé, peu ouvert (pré-jet), complètement ouvert (jet principal)'),
        im('g046_0', 'Injecteurs à trous type DL (court)'), im('g046_1', 'Injecteur à trous type DLL (aiguille allongée) avec protecteur de chaleur'),
        im('g047_0', 'Porte-injecteur vissé : 1 corps · 2 injecteur · 3 écrou d’injecteur · 4 ressort · 5 siège de ressort + poussoir · 6 entretoise · 7 cales'),
        im('g048_0', 'Porte-injecteur à bride : 1 corps · 2 injecteur (buse + aiguille) · 3 écrou de buse · 4 tige poussoir · 5 ressort · 6 vis de réglage · 7 rondelle · 8 chapeau'),
        im('g050_1', 'Bougies de préchauffage'), im('g050_0', 'Bougies unipolaires : montées en parallèle'), im('g050_3', 'Bougies bipolaires : montées en série'),
        im('g034_0', 'Pompe d’amorçage à main')],
      html: `
<h3>L’injecteur mécanique</h3>
<p><b>Rôle</b> : pulvériser et répartir dans la chambre de combustion le gazole refoulé sous pression par la pompe. <b>Constitution</b> : une aiguille et une buse appariées et rodées ensemble (jeu 2 à 4 µm), montées dans un porte-injecteur. Conditions : ≈ 200 bar, 500 à 600 °C, ≈ 2 000 ouvertures/min.</p>
<p><b>Fonctionnement</b> : au repos, le ressort du porte-injecteur plaque l’aiguille sur son siège. Quand la pression du gazole dépasse le tarage du ressort, l’aiguille se soulève : l’injection commence. Quand la pression redescend sous le tarage, l’aiguille retombe : fin d’injection. Le gazole qui suinte le long de l’aiguille repart par la conduite de retour.</p>
<div class="tw"><table><tr><th>Type</th><th>Moteur</th><th>Particularité</th></tr>
<tr><td>À téton</td><td>Injection indirecte (préchambre, turbulence)</td><td>Trou central 0,8 à 3 mm, jet conique ; le téton évite la calamine</td></tr>
<tr><td>À téton + trou pilote</td><td>Préchambre</td><td>Trou capillaire oblique : au démarrage, le débit passe par le trou pilote ; repère face à l’arrivée</td></tr>
<tr><td>À étranglement</td><td>Injection indirecte</td><td>Forme du téton + ressort spécial → « pré-injection »</td></tr>
<tr><td>À trous (DL, DLL)</td><td>Injection directe</td><td>1 à 12 trous capillaires ≥ 0,2 mm ; DLL (aiguille allongée) moins encombrant, protecteur de chaleur possible</td></tr></table></div>
<h3>Le porte-injecteur</h3>
<p>Supporte et positionne l’injecteur, l’alimente, contient le réglage de la pression d’injection (ressort + cales ou vis), reçoit l’arrivée et le retour. Fixé par bride ou vissé. Au remontage : logement propre, joints neufs, serrage au couple.</p>
<h3>Aide au démarrage</h3>
<ul><li><b>Résistance dans le collecteur d’admission</b> (injection directe) : montée en température ≈ 1 min, grosse consommation.</li>
<li><b>Bougies de préchauffage</b> (dans la préchambre ou la chambre) : <b>unipolaires</b> (filament à la masse du culot) montées <b>en parallèle</b> ; <b>bipolaires</b> (filament isolé, 2 bornes) montées <b>en série</b>.</li>
<li><b>Post-chauffage</b> : bougies alimentées après le démarrage, moteur froid au ralenti, pour réduire fumées et bruit ; coupé par le calculateur quand le levier de charge dépasse une position (potentiomètre sur la pompe), sinon les bougies seraient détruites.</li></ul>`,
      retenir: ['Injection = quand la pression du gazole dépasse le tarage du ressort.', 'Téton = injection indirecte ; trous = injection directe.', 'Bougies unipolaires en parallèle, bipolaires en série.', 'Post-chauffage : moteur froid au ralenti, coupé en accélération.'],
      pieges: ['Injecteur « qui bave » : reste humide après fermeture → calamine, jet dévié.', 'Injecteur à trou pilote : le repère doit être face au raccord d’arrivée.'],
      memo: { cle: 'PRESSION > RESSORT → INJECTION', flow: ['Pompe refoule', 'Pression sous l’aiguille', 'Dépasse le tarage', 'Aiguille levée', 'Pression chute → fermeture'], points: ['Téton : indirecte', 'Trous : directe', 'Unipolaire // · bipolaire série'], astuce: 'L’injecteur mécanique est un clapet taré : c’est la pompe qui décide du début et de la fin.' }
    },
    {
      id: 'pompe-ligne', title: 'La pompe d’injection en ligne',
      images: [im('g053_0', 'Pompe en ligne : premier cylindre côté entraînement, carter pompe, pompe d’alimentation, pompe d’amorçage, régulateur'),
        im('g033_1', 'Circuit d’alimentation d’une pompe en ligne'),
        im('g055_1', 'Élément de pompage : 1 raccord de refoulement · 2 ressort · 3 clapet de refoulement · 4 carter · 5 siège de clapet · 6 joint · 7 cylindre · 8 canal d’alimentation · 9 piston · 10 crémaillère · 11 secteur denté · 12-15 coupelles · 13 ressort · 14 chemise'),
        im('g056_0', 'Principe : remplissage, début d’injection (orifices fermés), fin d’injection'),
        im('g058_0', 'Dosage : a plein débit · b débit partiel · c arrêt (rainure face à l’orifice)'),
        im('g058_1', 'Courses du piston : A PMB · B pré-course · C course de détente · D course utile · E course restante · F PMH'),
        im('g062_1', 'Têtes de piston : début fixe / fin variable, début variable / fin fixe, début et fin variables'),
        im('g059_0', 'Clapet de refoulement et de ré-aspiration (piston de détente)'),
        im('g061_1', 'Variateur d’avance à masselottes'), im('g065_0', 'Régulateur mécanique : masselottes, ressorts, levier coudé, manchon, tige de réglage (crémaillère)'),
        im('g067_0', 'Piston auto-retard : échancrure d’auto-retard, position « surcharge »'),
        im('g071_1', 'Pompe en ligne à régulation électronique (Bosch) : capteurs, actionneur à électro-aimant, calculateur')],
      html: `
<p>Moteurs de moyenne et forte cylindrée (6 à 12 cylindres, jusqu’à 3 000 tr/min). <b>Une pompe élémentaire par cylindre</b>. L’arbre à cames de la pompe tourne à <b>½ vitesse du vilebrequin</b>, graissé à l’huile moteur ; la partie haute est lubrifiée par le gazole.</p>
<h3>Rôles d’une pompe d’injection</h3>
<p>Fournir la pression d’injection · doser · synchroniser les injections · déterminer le début d’injection · couper l’injection (étanchéité de l’injecteur) · réguler le régime · permettre la surcharge au démarrage · permettre l’arrêt.</p>
<h3>Fonctionnement d’un élément</h3>
<ol><li><b>Remplissage</b> : piston au PMB, le gazole entre par les orifices.</li><li><b>Début d’injection</b> : la came pousse le piston, il ferme les orifices, le gazole comprimé soulève le clapet de refoulement vers l’injecteur.</li><li><b>Fin d’injection</b> : la rampe hélicoïdale découvre l’orifice, la pression chute.</li></ol>
<p><b>Dosage</b> : la course totale est constante ; seule la <b>course utile</b> varie. La <b>crémaillère</b> (commandée par l’accélérateur via le régulateur) fait tourner le piston : la rampe hélicoïdale découvre plus ou moins tôt l’orifice. Rainure verticale face à l’orifice = débit nul = arrêt moteur.</p>
<p><b>Clapet de refoulement</b> : isole la HP résiduelle de la BP, monte vite en pression, empêche l’injecteur de baver, garde une pression résiduelle dans les tuyaux ; le piston de détente « ré-aspire » un petit volume à la fermeture.</p>
<h3>Avance et régulation</h3>
<ul><li><b>Avance initiale</b> = calage statique de la pompe. <b>Avance automatique</b> : variateur à masselottes ou à excentriques qui décale l’arbre à cames de la pompe avec le régime.</li>
<li><b>Régulateur</b> (masselottes contre ressorts) : limite le régime maxi, maintient un ralenti stable, permet l’arrêt. « Mini-maxi » (ralenti + maxi) ou « toutes vitesses ». Sans régulateur, le diesel cale ou s’emballe.</li>
<li><b>Surcharge au démarrage</b> : la crémaillère va au-delà de la pleine charge ; le <b>piston auto-retard</b> retarde en même temps l’injection pour un démarrage à froid sans fumées.</li>
<li><b>Calage</b> : piston n°1 au point constructeur ; pompe au début d’injection (goutte, tube viseur, col de cygne ou repères).</li></ul>`,
      retenir: ['Une pompe élémentaire par cylindre ; arbre à cames à ½ vitesse moteur.', 'Crémaillère → rotation du piston → course utile → débit.', 'Clapet de refoulement = pression résiduelle + pas de bavage.', 'Régulateur = régime maxi + ralenti stable + arrêt.'],
      pieges: ['La course totale du piston ne change jamais : c’est la course UTILE qui varie.', 'La pompe ne tourne pas forcément dans le même sens que le moteur (calage).'],
      memo: { cle: 'CRÉMAILLÈRE = DÉBIT', flow: ['Came pousse le piston', 'Orifices fermés : injection', 'Rampe hélicoïdale découvre l’orifice', 'Fin d’injection'], points: ['Course utile = débit', 'Rainure face à l’orifice = stop', 'Auto-retard = démarrage à froid'], astuce: 'Tourner le piston, c’est déplacer la fin d’injection.' }
    },
    {
      id: 'pompe-ve', title: 'La pompe distributrice VE Bosch',
      images: [im('g098_0', 'Pompe VE : circuit du carburant (arrivée, retour au réservoir, vers l’injecteur)'),
        im('g097_0', 'Circuit d’une pompe VE : A pompe d’alimentation · B filtre · C pompe à palettes · D soupape régulatrice · E orifice calibré · I piston distributeur · L réservoir'),
        im('g099_1', 'Pompe d’alimentation : 1 arbre · 2 soupape modulatrice · 3 bague excentrique · 4 bague d’appui · 5 pignon du régulateur · 6 griffes · 7 soupape de décharge · 8 corps'),
        im('g100_2', 'Pompe d’alimentation à palettes (boutonnière supérieure)'), im('g100_0', 'Soupape modulatrice de pression'),
        im('g101_0', 'Ensemble de refoulement HP : 1 tiroir de régulation · 2 tête hydraulique · 3 piston distributeur · 4 raccord de refoulement · 5 clapet · 6 ressorts de rappel'),
        im('g101_1', 'Arrivée du combustible (piston au PMB)'), im('g102_0', 'Refoulement vers le cylindre'), im('g102_1', 'Fin de refoulement : le tiroir découvre l’orifice de décharge'), im('g102_2', 'Nouvelle arrivée de carburant'),
        im('g103_0', 'Piston distributeur : 1 piston · 2 portique de rappel · 3 tiroir · 4 tête hydraulique · 5 raccord'),
        im('g104_1', '1 croisillon · 2 bague porte-galets · 3 disque à cames'), im('g104_0', 'Soupape de refoulement : fermée, étanche, ouverte'),
        im('g106_0', 'Variateur d’avance hydraulique (avance initiale) : 2 bague porte-galets · 7 piston · 9 ressort'),
        im('g107_0', 'Régulateur toutes vitesses : 1 levier de charge · 2 ressort · 3 leviers · 4 masselottes · 5 manchon central'),
        im('g108_0', 'Position de démarrage : sur-débit (course utile maxi h1)'), im('g111_0', 'Régulateur mini-maxi'),
        im('g115_0', 'Électrovanne d’arrêt (ELAB)')],
      html: `
<p>Pompe à <b>distributeur rotatif et piston axial</b> : <b>un seul élément de pompage</b> ; le piston tourne (distribution vers chaque cylindre) et va-et-vient (pompage) grâce au <b>disque à cames</b> qui roule sur les galets de la bague porte-galets.</p>
<div class="tw"><table><tr><th>Partie</th><th>Rôle</th></tr>
<tr><td>Pompe d’alimentation à palettes (4 palettes, bague excentrique)</td><td>Aspire le gazole et le refoule dans la pompe</td></tr>
<tr><td>Soupape modulatrice de pression</td><td>Fait varier la pression intérieure selon le régime (renvoie l’excès côté aspiration)</td></tr>
<tr><td>Soupape de décharge (orifice Ø 0,6 mm)</td><td>Retour au réservoir, maintient la pression intérieure</td></tr>
<tr><td>Tête hydraulique + piston distributeur + tiroir de régulation</td><td>Génèrent la HP, refoulent et répartissent ; toujours remplacés ensemble</td></tr>
<tr><td>Tiroir de régulation</td><td>Fin de refoulement quand il découvre l’orifice de décharge du piston → dose le débit</td></tr>
<tr><td>Disque à cames</td><td>Mouvement alternatif du piston ; son profil fait la loi d’injection (non interchangeable)</td></tr>
<tr><td>Soupapes de refoulement</td><td>Isolent les tuyaux, fermeture nette de l’injecteur, pression résiduelle</td></tr>
<tr><td>Variateur d’avance hydraulique</td><td>La pression intérieure (∝ régime) pousse le piston contre son ressort dès ≈ 300 tr/min et fait tourner la bague porte-galets → avance</td></tr>
<tr><td>Régulateur (masselottes + manchon + leviers)</td><td>Toutes vitesses (engins, groupes) ou mini-maxi (VL) ; sur-débit au démarrage</td></tr>
<tr><td>Électrovanne d’arrêt (ELAB)</td><td>Sous tension : canal d’arrivée ouvert ; contact coupé : le ressort ferme l’arrivée → arrêt</td></tr></table></div>
<p><b>Correcteur LDA</b> (moteurs turbo) : la pression de suralimentation agit sur une membrane et augmente le débit maxi ; turbo en panne → débit de pleine charge limité.</p>`,
      retenir: ['VE = 1 seul élément de pompage, piston rotatif + axial.', 'Disque à cames = mouvement alternatif.', 'Tiroir de régulation = dosage (fin d’injection).', 'Avance hydraulique = pression intérieure proportionnelle au régime.', 'ELAB : diesel arrêté en coupant l’arrivée de gazole.'],
      pieges: ['Ne jamais remplacer séparément piston, tête ou tiroir (ensemble rodé).', 'Le disque à cames n’est pas interchangeable entre pompes.'],
      memo: { cle: 'UN PISTON QUI TOURNE ET QUI POMPE', flow: ['Pompe à palettes', 'Pression intérieure (soupape modulatrice)', 'Piston distributeur (disque à cames)', 'Tiroir : fin de refoulement', 'Soupape de refoulement → injecteur'], points: ['Avance dès ≈ 300 tr/min', 'Toutes vitesses / mini-maxi', 'ELAB = arrêt'], astuce: 'En ligne : un piston par cylindre. VE : un piston pour tous.' }
    },
    {
      id: 'turbo', title: 'Suralimentation : turbocompresseur, wastegate, intercooler, correcteurs',
      images: [im('g119_0', 'Turbocompresseur éclaté : carter compresseur, roue de compresseur, bague palier, carter central, turbine, carter turbine'),
        im('g120_2', 'Turbocompresseur en coupe : 1 écran thermique · 3 carter turbine · 4 arbre turbine · 5 carter de paliers · 6 carter compresseur · 7 roue de compresseur · 9 arrivée d’huile'),
        im('g122_1', 'Géométrie variable, bas régime : ailettes fermées, gaz accélérés → couple'), im('g122_3', 'Géométrie variable, haut régime : ailettes ouvertes'),
        im('g123_0', 'Perméabilité contrôlée : bas régime'), im('g123_1', 'Perméabilité contrôlée : régime élevé'),
        im('g124_0', 'Soupape de décharge (wastegate) pilotée par la pression d’admission'), im('g124_1', 'Pression régulée / non régulée'),
        im('g125_0', 'Échangeur air-air (intercooler)'), im('g128_0', 'Correcteur de richesse LDA sur pompe VE : 5 membrane · 6 ressort · 7 axe de réglage · 8 cône de commande'),
        im('g130_0', 'Correcteur de suralimentation sur pompe en ligne')],
      html: `
<p><b>But</b> : augmenter la masse d’air dans les cylindres pour brûler plus de gazole → plus de puissance au même régime, sans prélever de puissance (énergie des gaz d’échappement).</p>
<ul><li><b>Turbocompresseur</b> : turbine (gaz d’échappement) + compresseur sur le même arbre, sur paliers flottants lubrifiés sous pression (8 à 10 L/min d’huile). Moteur suralimenté : rapport volumétrique plus faible, AOE augmentée.</li>
<li><b>Géométrie fixe</b> + soupape de décharge (wastegate) qui dérive les gaz quand la pression d’admission est trop forte ; sur les moteurs récents, wastegate commandée par une électrovanne (RCO) et une pompe à vide.</li>
<li><b>Géométrie variable</b> : un actuateur oriente les aubages ; bas régime ailettes fermées (gaz accélérés → couple), haut régime ailettes ouvertes. <b>Perméabilité contrôlée</b> : un coulisseau fait varier la surface d’ailettes exposée.</li>
<li><b>Intercooler</b> (air-air ou air-eau) : −10 °C d’air ≈ +3 % de puissance ; meilleur remplissage, moins de pollution et de bruit.</li>
<li><b>Correcteur de suralimentation / LDA</b> : adapte le débit maxi de la pompe à la pression de turbo (pression faible → débit réduit, pas de fumées noires ; turbo HS → débit limité).</li></ul>`,
      retenir: ['Turbo = énergie des gaz d’échappement, pas de prélèvement de puissance.', 'Wastegate = limite la pression d’admission.', 'Géométrie variable : fermé à bas régime, ouvert à haut régime.', 'Intercooler : air plus froid = plus dense.'],
      pieges: ['Le turbo a besoin d’un fort débit d’huile : coupure moteur brutale à chaud = paliers abîmés.'],
      memo: { cle: 'GAZ D’ÉCHAPPEMENT → TURBINE → COMPRESSEUR', flow: ['Gaz d’échappement', 'Turbine', 'Arbre', 'Compresseur', 'Intercooler', 'Admission'], points: ['Wastegate = pression maxi', 'LDA = débit selon la pression de turbo'], astuce: 'Plus d’air → on peut brûler plus de gazole.' }
    }
  ]);

  REV.extendLesson('moteur/capteurs-cr', {
    images: [im('g135_0', 'Implantation des capteurs d’un common rail : 2 pression · 4 pression de rampe · 5 T° eau · 6 contacteur de frein · 8 position vilebrequin · 9 débitmètre · 10 pédale · 11 T° air · 13 calculateur'),
      im('g136_0', 'Capteur de régime (inductif)'), im('g136_1', 'Capteur de phase (effet Hall)'), im('g137_0', 'Capteur de température moteur (CTN)'),
      im('g137_1', 'Capteur de haute pression de rampe'), im('g137_2', 'Capteur de température carburant (CTN)'), im('g138_0', 'Capteur de pression d’air d’admission (piézo-résistif)'),
      im('g138_1', 'Transducteur d’accélérateur (2 potentiomètres)'), im('g138_2', 'Débitmètre d’air à film chaud + sonde de température d’air'),
      im('g139_0', 'Contacteur de stop / d’embrayage'), im('g139_1', 'Capteur de vitesse d’avancement'), im('g139_2', 'Capteur de pression atmosphérique (dans le calculateur)'),
      im('g140_0', 'Électrovanne de régulation de suralimentation : 1 dépression · 2 vers soupape turbo · 3 pression atmosphérique · 4 connecteur'),
      im('g140_1', 'Électrovanne RGE'), im('g171_0', 'Ensemble des capteurs renseignant la gestion moteur')],
    html: `
<h3>Capteurs et actionneurs (GD 22)</h3>
<div class="tw"><table><tr><th>Élément</th><th>Type</th><th>Rôle</th><th>En cas de défaut</th></tr>
<tr><td>Régime (volant)</td><td>Inductif, 2 fausses dents = PMH n°1</td><td>Vitesse et position moteur</td><td>Arrêt moteur</td></tr>
<tr><td>Phase (arbre à cames)</td><td>Effet Hall, signal carré</td><td>Position du 1ᵉʳ cylindre</td><td>Le moteur ne démarre pas</td></tr>
<tr><td>Température moteur</td><td>CTN (2 ou 3 voies)</td><td>Débits de démarrage, ralenti, pré/post-chauffage, RGE, voyant</td><td>Valeur de remplacement, ventilateurs</td></tr>
<tr><td>Haute pression de rampe</td><td>Piézo-électrique</td><td>Quantité à injecter, régulation de pression</td><td>Débit réduit, perte de puissance</td></tr>
<tr><td>Température carburant</td><td>CTN</td><td>Correction du débit</td><td></td></tr>
<tr><td>Débitmètre à film chaud + T° air</td><td>Film chaud + CTN</td><td>Masse d’air admise, bouclage RGE</td><td>Valeur fixe, débit réduit, RGE supprimé</td></tr>
<tr><td>Pression d’admission</td><td>Piézo-résistif</td><td>Pression de suralimentation, débit</td><td>Pression atmosphérique, RGE supprimé</td></tr>
<tr><td>Pédale d’accélérateur</td><td>2 potentiomètres comparés</td><td>Demande « charge » du conducteur</td><td>Plausibilité, mode dégradé</td></tr>
<tr><td>Contacteurs stop / embrayage</td><td>Contacts</td><td>Cohérence avec la pédale</td><td>Débit réduit, régulateur de vitesse supprimé</td></tr>
<tr><td>Vitesse véhicule</td><td>Inductif ou Hall (sortie de BV)</td><td>Arrêt / roulage, rapport engagé</td><td>Vitesse et débit limités</td></tr>
<tr><td>Pression atmosphérique</td><td>Piézo, dans le calculateur</td><td>Densité de l’air, interdit la RGE en altitude</td><td>Remplacer le calculateur</td></tr>
<tr><td>Électrovannes suralimentation / RGE</td><td>Proportionnelles, commande RCO</td><td>Modulent la dépression de la pompe à vide</td><td>RCO mini = pas de dépression</td></tr></table></div>`
  });

  REV.extendLesson('moteur/commonrail', {
    images: [im('g143_0', 'Common rail Bosch : 1-4 injecteurs · 5 rampe · 6 T° carburant · 7 capteur de pression · 8 refroidisseur · 10 pompe de gavage · 12 filtre · 14 réchauffeur · 15 pompe HP · 16 régulateur HP · 17 désactivateur du 3ᵉ piston'),
      im('g144_0', 'Pompe de gavage à engrenages : 1 aspiration · 2 pignon · 3 refoulement'), im('g144_1', 'Pompe électrique multicellulaire à rouleaux'),
      im('g145_0', 'Filtre à carburant : 3 entrée · 4 élément thermostatique · 6 purge d’eau · 8 régulateur BP · 9 cartouche'), im('g145_1', 'Élément thermostatique : < 15 °C, 15-25 °C, > 25 °C'),
      im('g146_4', 'Refroidisseur de gazole'), im('g147_0', 'Pompe HP Bosch : 1 piston · 2 came · 3 arbre à excentrique · 6 clapet de refoulement · 7 clapet d’admission'),
      im('g148_0', 'Pompe HP à 3 pistons radiaux décalés de 120°'), im('g149_0', 'Pompe HP : clapet de sécurité (lubrification à < 0,8 bar)'), im('g149_1', 'Désactivation du 3ᵉ piston'),
      im('g150_0', 'Régulateur haute pression non commandé (ressort ≈ 100 bar)'), im('g150_1', 'Régulateur haute pression commandé (RCO)'),
      im('g151_0', 'Injecteur électro-hydraulique Bosch'), im('g152_0', 'Injecteur Bosch : fermé / ouvert (chambre de commande et aiguille)'),
      im('g154_0', 'Débit injecté selon le temps d’impulsion et la pression de rampe'), im('g155_0', 'Pré-injection et injection principale'),
      im('g157_0', 'Common rail Delphi : pompe HP, rail, injecteurs, capteurs, DCU'), im('g158_0', 'Pompe de transfert Delphi à palettes (≈ 6 bar)'),
      im('g159_0', 'Circuit de réchauffage du gazole (Delphi)'), im('g160_1', 'Pompe HP Delphi (anneau à cames, pistons radiaux)'), im('g161_0', 'Pompe HP Delphi : refoulement'),
      im('g162_0', 'Injecteur Delphi : bobine, valve, entretoise, ressort, aiguille, étiquette C2I'), im('g163_1', 'Entretoise : orifices NPO (alimentation), SPO (décharge), INO (remplissage), chambre de contrôle'),
      im('g164_0', 'Phases de l’injecteur Delphi'), im('g165_0', 'Courant de commande : courant d’appel puis de maintien'),
      im('g166_0', 'Régulateur basse pression IMV (normalement ouvert)'), im('g167_1', 'IMV : plus de courant = moins de débit'),
      im('g170_0', 'Pompe Delphi DFP3 : 2 tête hydraulique · 4 capteur T° G.O · 6 sortie HP · 7 pompe de transfert · 8 IMV')],
    html: `
<h3>Common rail Bosch (GD 22)</h3>
<ul><li><b>Pompe de gavage</b> : à engrenages (mécanique) ou électrique (≈ 200 L/h, 2,5 bar maxi, pré-filtre 300 µm). <b>Filtre</b> 5 µm + décanteur + régulateur BP 1,25 bar ; l’élément thermostatique envoie le gazole au réchauffeur sous 15 °C.</li>
<li><b>Pompe HP</b> : 3 pistons radiaux à 120°, entraînée par la courroie ; débite en fonction du régime (200 bar au démarrage → 1 350 bar). Clapet de sécurité : sous 0,8 bar seulement lubrification/refroidissement. <b>Désactivateur du 3ᵉ piston</b> : réduit la puissance absorbée en faible charge.</li>
<li><b>Régulateur haute pression</b> (sur la pompe ou la rampe) : fuite contrôlée en RCO ; ressort ≈ 100 bar (pression mini + amortissement) ; moteur arrêté, plus de pression.</li>
<li><b>Injecteur électro-hydraulique</b> : ouverture par différence de pression ; appel 20 A, maintien 12 A ; débit = pression de rampe + temps d’ouverture + trous.</li>
<li><b>Rampe</b> (≈ 29 cm³ en 4 cyl.) : accumulateur, amortit les pulsations.</li>
<li>Pré-injection (bruit, préparation de la combustion), injection principale, post-injection.</li></ul>
<h3>Common rail Delphi (GD 22)</h3>
<ul><li><b>Pompe de transfert</b> à palettes intégrée (≈ 6 bar), <b>pompe HP</b> à anneau à cames tournant autour de la tête hydraulique (200 bar en 1,5 tour moteur).</li>
<li><b>IMV</b> (actuateur basse pression) sur la tête hydraulique : normalement <b>ouvert</b> ; plus de courant = moins de gazole envoyé aux pistons → pilote la pression de rail en boucle fermée.</li>
<li><b>Injecteur</b> : valve + chambre de contrôle (orifices NPO, SPO, INO) ; valve ouverte → chambre de contrôle vidée → l’aiguille se lève ; 200 à 1 400 bar. Décharge du rail par impulsions courtes sans injecter. Code <b>C2I</b> à rentrer dans le calculateur à chaque échange d’injecteur.</li>
<li><b>Accéléromètre</b> : recale le débit de pré-injection de chaque injecteur, détecte un injecteur bloqué ouvert.</li></ul>`
  });

  var Q = [
    ['injecteurs', 'g043_1', 'Quand l’aiguille d’un injecteur mécanique se soulève-t-elle ?', 'Quand la pression du gazole dépasse le tarage du ressort du porte-injecteur', 'Quand le calculateur alimente la bobine', 'Quand le piston moteur est au PMB'],
    ['injecteurs', 'g044_0', 'L’injecteur à téton est utilisé sur les moteurs :', 'À injection indirecte (préchambre, chambre de turbulence)', 'À injection directe', 'Essence'],
    ['injecteurs', 'g046_1', 'L’injecteur à trous (DL, DLL) est utilisé sur les moteurs :', 'À injection directe', 'À préchambre', 'À chambre de turbulence'],
    ['injecteurs', 'g045_0', 'Au remontage d’un injecteur à trou pilote, il faut :', 'Placer son trait repère face au raccord d’arrivée', 'Le monter sans joint', 'Le tourner de 90° par rapport à l’arrivée'],
    ['injecteurs', 'g047_0', 'Sur le porte-injecteur vissé, quel élément règle la pression d’injection ?', 'Le ressort et ses cales (7)', 'L’écrou d’injecteur (3)', 'L’entretoise (6)'],
    ['injecteurs', 'g050_0', 'Les bougies de préchauffage unipolaires sont montées :', 'En parallèle', 'En série', 'En étoile'],
    ['injecteurs', 'g050_3', 'Les bougies de préchauffage bipolaires sont montées :', 'En série', 'En parallèle', 'Sans liaison à la batterie'],
    ['injecteurs', 'g050_1', 'Rôle du post-chauffage :', 'Garder les bougies alimentées moteur froid au ralenti pour réduire fumées et bruit', 'Chauffer le gazole dans le réservoir', 'Remplacer le préchauffage'],
    ['pompe-ligne', 'g053_0', 'Combien d’éléments de pompage comporte une pompe en ligne ?', 'Autant que de cylindres', 'Un seul', 'Deux'],
    ['pompe-ligne', 'g055_1', 'Sur l’élément de pompage, quel organe fait tourner le piston (10) ?', 'La crémaillère', 'Le clapet de refoulement', 'Le ressort de rappel'],
    ['pompe-ligne', 'g058_0', 'Position c : rainure verticale du piston face à l’orifice d’alimentation. Résultat ?', 'Débit nul : arrêt du moteur', 'Plein débit', 'Débit de ralenti'],
    ['pompe-ligne', 'g058_1', 'Sur une pompe en ligne, qu’est-ce qui fait varier le débit injecté ?', 'La course utile du piston (rotation par la crémaillère)', 'La course totale du piston', 'La vitesse de l’arbre à cames'],
    ['pompe-ligne', 'g059_0', 'Rôle du clapet de refoulement et de ré-aspiration :', 'Garder une pression résiduelle dans le tuyau et empêcher l’injecteur de baver', 'Régler l’avance', 'Filtrer le gazole'],
    ['pompe-ligne', 'g061_1', 'Le variateur d’avance à masselottes décale l’injection en fonction :', 'Du régime (force centrifuge)', 'De la température d’eau', 'De la pression de turbo'],
    ['pompe-ligne', 'g065_0', 'Rôle du régulateur d’une pompe en ligne :', 'Limiter le régime maxi, maintenir un ralenti stable, permettre l’arrêt', 'Augmenter la pression de suralimentation', 'Refroidir le gazole'],
    ['pompe-ligne', 'g067_0', 'Rôle du piston auto-retard :', 'Retarder l’injection au démarrage (surcharge) pour démarrer à froid sans fumées', 'Couper l’injection', 'Augmenter l’avance à haut régime'],
    ['pompe-ve', 'g098_0', 'Combien d’éléments de pompage comporte la pompe VE Bosch ?', 'Un seul (piston distributeur rotatif et axial)', 'Un par cylindre', 'Trois à 120°'],
    ['pompe-ve', 'g104_1', 'Quel élément donne au piston distributeur son mouvement alternatif ?', 'Le disque à cames qui roule sur les galets', 'La crémaillère', 'La pompe à palettes'],
    ['pompe-ve', 'g102_1', 'Sur la pompe VE, qu’est-ce qui termine le refoulement ?', 'Le tiroir de régulation qui découvre l’orifice de décharge', 'La soupape modulatrice', 'Le variateur d’avance'],
    ['pompe-ve', 'g100_0', 'Rôle de la soupape modulatrice de pression :', 'Faire varier la pression intérieure de la pompe en fonction du régime', 'Couper l’arrivée de gazole', 'Régler le ralenti'],
    ['pompe-ve', 'g106_0', 'Le variateur d’avance de la pompe VE est commandé par :', 'La pression du gazole intérieure à la pompe (proportionnelle au régime)', 'Des masselottes dans l’entraînement', 'Le calculateur uniquement'],
    ['pompe-ve', 'g115_0', 'Rôle de l’électrovanne d’arrêt (ELAB) :', 'Contact coupé, elle ferme l’arrivée de gazole à la chambre HP → le moteur s’arrête', 'Couper l’allumage', 'Couper les bougies de préchauffage'],
    ['pompe-ve', 'g107_0', 'Quel régulateur équipe les engins qui entraînent des treuils, pompes, grues ?', 'Le régulateur toutes vitesses', 'Le régulateur mini-maxi', 'Aucun régulateur'],
    ['turbo', 'g120_2', 'Qu’est-ce qui entraîne la turbine d’un turbocompresseur ?', 'Les gaz d’échappement', 'Une courroie du vilebrequin', 'Un moteur électrique'],
    ['turbo', 'g124_0', 'Rôle de la soupape de décharge (wastegate) :', 'Limiter la pression maxi d’admission en dérivant les gaz d’échappement', 'Refroidir l’air admis', 'Graisser les paliers'],
    ['turbo', 'g122_1', 'Turbo à géométrie variable à bas régime :', 'Ailettes fermées : les gaz sont accélérés → couple', 'Ailettes ouvertes au maximum', 'Turbo débrayé'],
    ['turbo', 'g125_0', 'Rôle de l’échangeur air-air (intercooler) :', 'Refroidir l’air comprimé pour le rendre plus dense', 'Chauffer l’air au démarrage', 'Filtrer l’air'],
    ['turbo', 'g128_0', 'Rôle du correcteur LDA sur pompe VE :', 'Adapter le débit maxi à la pression de suralimentation', 'Régler le ralenti', 'Arrêter le moteur'],
    ['capteurs-cr', 'g136_0', 'Le capteur de régime du common rail est de type :', 'Inductif (2 fausses dents pour le PMH du cylindre 1)', 'Effet Hall', 'CTN'],
    ['capteurs-cr', 'g136_1', 'Capteur de phase défectueux :', 'Le moteur ne démarre pas', 'Le moteur s’arrête en roulant', 'Aucune conséquence'],
    ['capteurs-cr', 'g137_0', 'Le capteur de température moteur est de type :', 'CTN', 'Piézo-électrique', 'Inductif'],
    ['capteurs-cr', 'g137_1', 'Le capteur de haute pression de rampe est de type :', 'Piézo-résistif', 'CTN', 'Effet Hall'],
    ['capteurs-cr', 'g138_2', 'Rôle du débitmètre d’air à film chaud :', 'Déterminer la masse d’air admise (avec la température d’air)', 'Mesurer la pression de rampe', 'Mesurer la vitesse du véhicule'],
    ['capteurs-cr', 'g138_1', 'Pourquoi le transducteur d’accélérateur a-t-il 2 potentiomètres ?', 'Le calculateur compare les 2 pistes pour détecter un dysfonctionnement', 'Pour doubler le débit', 'Pour commander 2 injecteurs'],
    ['capteurs-cr', 'g139_2', 'Où est le capteur de pression atmosphérique ?', 'Dans le calculateur (défaillance = remplacer le calculateur)', 'Sur la rampe', 'Dans le réservoir'],
    ['commonrail', 'g148_0', 'La pompe HP Bosch comporte :', '3 pistons radiaux décalés de 120°', 'Un piston axial', 'Un élément par cylindre'],
    ['commonrail', 'g149_1', 'Rôle du désactivateur du 3ᵉ piston :', 'Réduire la puissance absorbée par la pompe en faible charge', 'Augmenter la pression maxi', 'Arrêter le moteur'],
    ['commonrail', 'g150_1', 'Rôle du régulateur haute pression Bosch :', 'Créer une fuite contrôlée (RCO) pour obtenir la pression voulue', 'Doser le gazole avant la pompe', 'Réchauffer le gazole'],
    ['commonrail', 'g145_1', 'Élément thermostatique du filtre, gazole à moins de 15 °C :', 'Le gazole est envoyé au réchauffeur avant filtrage', 'Tout va directement au filtre', 'Le gazole retourne au réservoir'],
    ['commonrail', 'g166_0', 'L’IMV Delphi au repos (non alimenté) est :', 'Ouvert', 'Fermé', 'À mi-course'],
    ['commonrail', 'g167_1', 'IMV Delphi : si le courant augmente…', 'Le débit envoyé aux pistons diminue', 'Le débit augmente', 'L’injecteur s’ouvre'],
    ['commonrail', 'g162_0', 'Que faut-il faire à chaque échange d’un injecteur Delphi ?', 'Rentrer son code C2I dans le calculateur', 'Caler la pompe', 'Régler la pression d’ouverture au ressort'],
    ['commonrail', 'g165_0', 'Forme du courant de commande d’un injecteur :', 'Un courant d’appel élevé puis un courant de maintien plus faible', 'Un courant constant', 'Une sinusoïde'],
    ['commonrail', 'g154_0', 'Le débit injecté par un injecteur common rail dépend :', 'De la pression de rampe et du temps d’ouverture (et des trous)', 'Uniquement du régime', 'Uniquement de la crémaillère']
  ];
  REV.addExercises('moteur', { lessons: [], questions: Q.map(function (x) {
    return { l: x[0], img: G + x[1] + '.jpg', q: x[2], c: [x[3], x[4], x[5]], e: x[3] + '. (' + SRC + ')', src: SRC };
  }) });
})();
