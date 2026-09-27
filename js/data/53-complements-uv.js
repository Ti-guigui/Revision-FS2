/* Compléments demandés pour l’UV1 / UV2 : bases moteur (cycles, épure, jeu aux soupapes), méthodes de calcul et portes logiques,
   contrôle des actionneurs, pannes du circuit pneumatique GBC 180 ADR, circuits de freinage et embrayage tiré / poussé,
   associations d’éléments et phénomènes hydrauliques. Sources : GD 21, AGA 03, AGA 01, GD 22, AGB 03, AGD 27, AGD 19, AGD 20. */
(function () {
  var G = 'gd21/', L = 'livres/', P = 'pneu/';
  function im(src, cap) { return { src: src, cap: cap }; }
  function ex(subj, l, arr) { REV.addExercises(subj, { lessons: [], questions: arr.map(function (q) { q.l = l; return q; }) }); }

  /* =============================== MOTORISATION =============================== */
  REV.addLessons('moteur', 'caracteristiques', [{
    id: 'bases-cycles', title: 'Bases : cycle de Beau de Rochas, transformations, cycles théorique / réel / pratique, 2 temps',
    images: [im(G + 'page-035.jpg', 'Thermodynamique : caractéristiques d’un gaz, transformations isotherme et isobare'), im(G + 'page-036.jpg', 'Transformations isochore et adiabatique ; principe du cycle à quatre temps'),
      im(G + 'page-037.jpg', 'Les 4 temps : déplacements du piston, positions des soupapes, degrés vilebrequin et arbre à cames'), im(G + 'page-038.jpg', 'Le cycle à quatre temps théorique : volume, pression, température, graphique'),
      im(G + 'page-039.jpg', 'Cycle théorique : hypothèses, travail moteur ADEBA, temps résistants ABCA'), im(G + 'page-040.jpg', 'Cycle réel sans réglages : S2 − S1 = travail utile insuffisant'),
      im(G + 'page-041.jpg', 'Cycle pratique avec réglages : AOA, RFA, AA, AOE, RFE'), im(G + 'page-092.jpg', 'Moteur deux temps : lumières, canal de transfert, carter-pompe'),
      im(G + 'page-093.jpg', 'Deux temps : fonctionnement au-dessus et au-dessous du piston'), im(G + 'page-094.jpg', 'Deux temps : diagramme pratique et épure')],
    html: `
<h3>Le cycle à quatre temps (cycle de Beau de Rochas)</h3>
<p>Un <b>cycle</b> est une série d’opérations qui se succèdent dans un ordre déterminé ; à la fin, le mécanisme revient à sa position de départ. Le cycle à 4 temps se fait en <b>2 tours de vilebrequin (720°)</b> = <b>1 tour d’arbre à cames (360°)</b>.</p>
<div class="tw"><table><tr><th>Temps</th><th>Piston</th><th>Vilebrequin</th><th>Adm.</th><th>Éch.</th><th>Ce qui se passe</th></tr>
<tr><td>1. Admission</td><td>PMH → PMB</td><td>½ tour (0 à 180°)</td><td>O</td><td>F</td><td>Le piston descend et crée une dépression qui aspire les gaz</td></tr>
<tr><td>2. Compression</td><td>PMB → PMH</td><td>½ tour (180 à 360°)</td><td>F</td><td>F</td><td>Cylindre étanche : les gaz sont comprimés dans la chambre (pression + chaleur)</td></tr>
<tr><td>3. Combustion-détente</td><td>PMH → PMB</td><td>½ tour (360 à 540°)</td><td>F</td><td>F</td><td>La combustion pousse le piston : <b>seul temps moteur</b> (qui produit un travail)</td></tr>
<tr><td>4. Échappement</td><td>PMB → PMH</td><td>½ tour (540 à 720°)</td><td>F</td><td>O</td><td>Le piston remonte et chasse les gaz brûlés</td></tr></table></div>
<h3>Les transformations (thermodynamique)</h3>
<p>Un gaz est caractérisé par sa <b>pression P</b>, son <b>volume V</b> et sa <b>température T</b>. Il y a transformation quand l’une d’elles change.</p>
<div class="tw"><table><tr><th>Transformation</th><th>Ce qui reste constant</th><th>Sur le diagramme P/V</th><th>Dans le cycle théorique</th></tr>
<tr><td><b>Isotherme</b></td><td>La température T</td><td>Courbe</td><td>—</td></tr>
<tr><td><b>Isobare</b></td><td>La pression P</td><td>Droite horizontale (// à l’abscisse)</td><td>Admission et échappement (pression atmosphérique)</td></tr>
<tr><td><b>Isochore</b></td><td>Le volume V</td><td>Droite verticale (// à l’ordonnée)</td><td>Combustion au PMH</td></tr>
<tr><td><b>Adiabatique</b></td><td>Pas d’échange de chaleur avec l’extérieur</td><td>Courbe</td><td>Compression et détente</td></tr></table></div>
<h3>Cycle théorique, réel, pratique</h3>
<ul><li><b>Théorique</b> (diagramme simplifié) : soupapes qui s’ouvrent et se ferment instantanément, admission et échappement à la pression atmosphérique, compression adiabatique, pas de perte. Travail utile = travail moteur (ADEBA) − temps résistants (ABCA).</li>
<li><b>Réel sans réglages</b> : les gaz ont de l’<b>inertie</b>, la combustion prend du temps, il y a des échanges de chaleur. Admission en dépression, pression maxi plus faible, contre-pression à l’échappement : les temps utiles perdent de la surface (S2), les temps résistants augmentent (S1) → <b>S2 − S1 = travail utile insuffisant</b>.</li>
<li><b>Pratique avec réglages</b> : on ouvre les soupapes plus tôt et on les ferme plus tard, on avance la combustion → S2 augmente, S1 diminue, le travail utile augmente. Trop d’avance ou de retard raccourcit trop la compression et la détente, le travail rebaisse.</li></ul>
<div class="tw"><table><tr><th>Réglage</th><th>Rôle</th></tr>
<tr><td><b>AOA</b> — avance à l’ouverture de l’admission</td><td>Éviter l’arrêt de la veine gazeuse devant une soupape fermée → meilleur remplissage. Autour du PMH les deux soupapes sont ouvertes : c’est le <b>balayage</b> (croisement).</td></tr>
<tr><td><b>RFA</b> — retard à la fermeture de l’admission</td><td>Profiter de l’inertie des gaz pour mieux remplir : la soupape se ferme après le PMB.</td></tr>
<tr><td><b>AA</b> — avance à l’allumage (à l’injection en diesel)</td><td>Répartir la combustion de part et d’autre du PMH → pression maxi plus élevée.</td></tr>
<tr><td><b>AOE</b> — avance à l’ouverture de l’échappement</td><td>Avancer la chute de pression des gaz brûlés → limiter la contre-pression.</td></tr>
<tr><td><b>RFE</b> — retard à la fermeture de l’échappement</td><td>Profiter de l’inertie des gaz pour vider complètement le cylindre : la soupape se ferme au début de l’admission.</td></tr></table></div>
<h3>Le moteur deux temps</h3>
<ul><li>Les 4 phases en <b>2 courses de piston = 1 tour de vilebrequin</b>. Pas de soupapes : c’est le piston qui ouvre et ferme les <b>lumières</b> (admission, échappement, transfert). Carter étanche = <b>carter-pompe</b>.</li>
<li><b>Montée</b> : compression au-dessus du piston ; dépression dans le carter → entrée des gaz frais. <b>Descente</b> : détente (temps moteur) puis échappement ; précompression dans le carter, puis transfert des gaz frais par le canal de transfert (balayage).</li>
<li>Avantages : 2 fois plus de temps moteurs à vitesse égale, léger, simple, pas d’affolement de soupapes. Inconvénients : échauffement du piston (serrage), pertes de gaz frais à l’échappement, graissage par mélange (calamine, fumée).</li></ul>`,
    retenir: ['4 temps : 2 tours de vilebrequin = 1 tour d’arbre à cames ; seul la combustion-détente est motrice.', 'Isobare = P constante · isochore = V constant · isotherme = T constante · adiabatique = sans échange de chaleur.', 'AOA / RFA / AOE / RFE : gagner du remplissage et de l’évacuation grâce à l’inertie des gaz.', '2 temps : 1 tour de vilebrequin, lumières, carter-pompe.'],
    memo: { cle: 'ADMISSION · COMPRESSION · DÉTENTE · ÉCHAPPEMENT = 720°', flow: ['Admission : PMH → PMB, adm. ouverte', 'Compression : PMB → PMH, tout fermé', 'Détente : PMH → PMB, temps moteur', 'Échappement : PMB → PMH, éch. ouverte'], points: ['Isobare = adm./éch. · isochore = combustion · adiabatique = compression/détente', 'Balayage = croisement des soupapes autour du PMH'], astuce: 'ISObare = même preSSion, ISOchore = même vOlume.' }
  }]);

  REV.addLessons('moteur', 'distribution', [{
    id: 'epure-jeu', title: 'Épure de distribution, jeu aux soupapes et calage',
    images: [im(G + 'page-043.jpg', 'L’épure de distribution : AOA, RFA, AA, AOE, RFE, PMH, PMB'), im(G + 'page-044.jpg', 'Corrigé de l’épure : admission, compression, combustion, détente, échappement, balayage'),
      im(G + 'page-055.jpg', 'Réglage du jeu aux soupapes : nécessité et méthode de la bascule (méthode des 5)'), im(G + 'page-056.jpg', 'Méthode des 7 (6 cylindres), méthode Peugeot (POE), méthode générale'), im(G + 'page-061.jpg', 'Calage de la distribution sans repère')],
    html: `
<h3>L’épure de distribution</h3>
<p>C’est la <b>représentation des angles de réglage de la distribution</b> sur un cercle qui représente la rotation du vilebrequin (2 tours). Chaque constructeur donne ses valeurs ; elles doivent être strictement respectées. On y lit :</p>
<ul><li>l’<b>admission</b> de l’AOA (avant le PMH) au RFA (après le PMB) ;</li><li>la <b>compression</b> du RFA jusqu’à l’AA ;</li><li>la <b>combustion-détente</b> de l’AA jusqu’à l’AOE (avant le PMB) ;</li><li>l’<b>échappement</b> de l’AOE jusqu’au RFE (après le PMH) ;</li><li>le <b>balayage</b> (croisement) entre l’AOA et le RFE, autour du PMH : les deux soupapes sont ouvertes.</li></ul>
<h3>Le jeu aux soupapes</h3>
<ul><li><b>Pourquoi</b> : la soupape se dilate plus que le bloc moteur. Sans jeu, la commande resterait en contrainte (la soupape ne se fermerait plus). Trop de jeu : choc sur la queue de soupape et <b>levée plus faible</b> (moins de gaz).</li>
<li>La valeur est donnée par le constructeur ; elle est <b>plus grande à l’échappement</b> (soupape plus chaude). Exemple du cours : 0,10 et 0,25 mm à l’admission, 0,20 et 0,25 mm à l’échappement.</li></ul>
<div class="tw"><table><tr><th>Méthode</th><th>Principe</th></tr>
<tr><td><b>Bascule</b> (classique)</td><td>Placer un cylindre en bascule (balayage : entre AOA et RFE) et régler les 2 soupapes du cylindre qui est en fin de compression.</td></tr>
<tr><td><b>Méthode des 5</b> (4 cylindres)</td><td>Cylindre en bascule + cylindre à régler = 5 : 1 → 4 · 3 → 2 · 4 → 1 · 2 → 3.</td></tr>
<tr><td><b>Méthode des 7</b> (6 cylindres)</td><td>Somme = 7 : 1 → 6 · 5 → 2 · 3 → 4 · 6 → 1 · 2 → 5 · 4 → 3.</td></tr>
<tr><td><b>Méthode « Peugeot »</b> (POE = pleine ouverture échappement)</td><td>4 cyl. : POE 1 → ADM 3, ECH 4 · POE 3 → ADM 4, ECH 2 · POE 4 → ADM 2, ECH 1 · POE 2 → ADM 1, ECH 3.<br>6 cyl. : POE 1 → 5 / 3 · POE 5 → 3 / 6 · POE 3 → 6 / 2 · POE 6 → 2 / 4 · POE 2 → 4 / 1 · POE 4 → 1 / 5.</td></tr>
<tr><td><b>Méthode générale</b></td><td>Mettre la soupape à régler en pleine ouverture, faire <b>un tour moteur</b> : elle est en position de réglage. La plus longue mais la plus précise ; pour les moteurs à nombre <b>impair</b> de cylindres.</td></tr></table></div>
<p>Les méthodes des 5, des 7 et Peugeot ne s’appliquent qu’aux moteurs <b>en ligne à nombre pair</b> de cylindres.</p>
<h3>Calage de la distribution</h3>
<ul><li><b>Avec repères</b> : cylindre de référence (souvent le n° 1, côté volant) au PMH, vilebrequin bloqué (pige), faire coïncider les repères des pignons, de la chaîne ou de la courroie.</li>
<li><b>Sans repère</b> : cylindre de référence au PMH ; régler le jeu du cylindre opposé (le 4 si la référence est le 1) ; tourner l’arbre à cames jusqu’à ce que ce cylindre soit <b>en bascule</b> ; accoupler. Une erreur d’une dent (12 à 18°) est impossible : la bascule disparaîtrait.</li>
<li>Arbre à cames : 1 tour pendant que le vilebrequin en fait 2 ; son pignon est 2 fois plus gros.</li></ul>`,
    retenir: ['Épure = angles de distribution : AOA, RFA, AA, AOE, RFE ; balayage entre AOA et RFE.', 'Jeu plus grand à l’échappement ; trop de jeu = choc + levée plus faible.', 'Méthode des 5 (4 cyl.) : 1-4, 3-2, 4-1, 2-3 ; méthode des 7 (6 cyl.).', 'Méthode générale : pleine ouverture + 1 tour moteur (nombre impair de cylindres).'],
    memo: { cle: 'BASCULE : LA SOMME FAIT 5 (4 CYL.) OU 7 (6 CYL.)', points: ['1 en bascule → je règle le 4', '3 → 2 · 4 → 1 · 2 → 3', 'Peugeot : cylindre en POE'], astuce: 'Nombre de cylindres + 1 = la somme à trouver.' }
  }]);

  ex('moteur', 'bases-cycles', [
    { q: 'Combien de tours de vilebrequin pour un cycle à 4 temps ?', c: ['2 tours (720°)', '1 tour (360°)', '4 tours'], e: 'L’arbre à cames, lui, fait 1 tour.' },
    { q: 'Quel est le seul temps moteur du cycle à 4 temps ?', c: ['La combustion-détente', 'La compression', 'L’admission'], e: 'C’est le seul temps qui produit un travail.' },
    { q: 'Temps de compression : position des soupapes ?', c: ['Admission fermée, échappement fermé', 'Admission ouverte, échappement fermé', 'Admission fermée, échappement ouvert'], e: 'Le cylindre doit être parfaitement étanche.' },
    { q: 'Une transformation isobare se fait :', c: ['À pression constante', 'À volume constant', 'À température constante'], e: 'Sur le diagramme P/V : droite horizontale (admission, échappement).' },
    { q: 'Une transformation isochore se fait :', c: ['À volume constant', 'À pression constante', 'Sans échange de chaleur'], e: 'Droite verticale : la combustion au PMH dans le cycle théorique.' },
    { q: 'Une transformation adiabatique se fait :', c: ['Sans échange de chaleur avec l’extérieur', 'À température constante', 'À pression constante'], e: 'Compression et détente du cycle théorique.' },
    { q: 'Cycle réel sans réglages : pourquoi le travail utile est-il insuffisant ?', c: ['L’inertie des gaz, la durée de la combustion et les échanges de chaleur : S2 diminue et S1 augmente', 'Le rapport volumétrique est trop grand', 'Il n’y a pas d’échappement'], e: 'S2 − S1 = travail utile insuffisant.' },
    { q: 'Rôle de l’AOA (avance à l’ouverture de l’admission) ?', c: ['Éviter l’arrêt de la veine gazeuse et améliorer le remplissage', 'Limiter la contre-pression à l’échappement', 'Augmenter la pression maxi'], e: 'Autour du PMH les deux soupapes sont ouvertes : balayage.' },
    { q: 'Rôle du RFA (retard à la fermeture de l’admission) ?', c: ['Profiter de l’inertie des gaz pour mieux remplir le cylindre', 'Vider complètement le cylindre', 'Répartir la combustion autour du PMH'], e: 'La soupape d’admission se ferme après le PMB.' },
    { q: 'Rôle du RFE (retard à la fermeture de l’échappement) ?', c: ['Profiter de l’inertie des gaz pour les évacuer complètement', 'Améliorer le remplissage en air frais', 'Augmenter la compression'], e: 'La soupape d’échappement se ferme au début de l’admission.' },
    { q: 'Qu’appelle-t-on le balayage ?', c: ['La phase où les deux soupapes sont ouvertes autour du PMH : les gaz brûlés qui sortent aspirent les gaz frais', 'Le nettoyage du cylindre à l’arrêt', 'La fermeture des deux soupapes'], e: 'Il a lieu entre l’AOA et le RFE.' },
    { q: 'Moteur deux temps : en combien de tours de vilebrequin se fait le cycle ?', c: ['1 tour (2 courses de piston)', '2 tours', '½ tour'], e: 'Pas de soupapes : le piston ouvre et ferme les lumières.' },
    { q: 'Moteur deux temps : qu’est-ce que le carter-pompe ?', c: ['Le carter étanche où les gaz frais sont aspirés puis précomprimés', 'Le réservoir d’huile', 'La pompe à eau'], e: 'Les gaz passent ensuite par le canal de transfert.' }
  ]);
  ex('moteur', 'epure-jeu', [
    { img: G + 'page-044.jpg', q: 'Qu’est-ce que l’épure de distribution ?', c: ['La représentation des angles de réglage de la distribution sur la rotation du vilebrequin', 'Le schéma de montage de la courroie', 'Le tableau des jeux aux soupapes'], e: 'On y lit AOA, RFA, AA, AOE, RFE.' },
    { img: G + 'page-044.jpg', q: 'Sur l’épure, entre quels points a lieu le balayage ?', c: ['Entre l’AOA et le RFE', 'Entre le RFA et l’AA', 'Entre l’AOE et le PMB'], e: 'Autour du PMH, les deux soupapes sont ouvertes.' },
    { img: G + 'page-044.jpg', q: 'Sur l’épure, de quand à quand dure l’admission ?', c: ['De l’AOA au RFA', 'Du PMH au PMB exactement', 'De l’AOE au RFE'], e: 'Elle commence avant le PMH et finit après le PMB.' },
    { img: G + 'page-055.jpg', q: 'Pourquoi faut-il un jeu aux soupapes ?', c: ['La soupape se dilate plus que le bloc moteur', 'Pour faire du bruit', 'Pour augmenter la levée'], e: 'Sans jeu, la commande resterait en contrainte et la soupape ne fermerait plus.' },
    { img: G + 'page-055.jpg', q: 'Conséquence d’un jeu aux soupapes trop grand ?', c: ['Choc sur la queue de soupape et levée plus faible', 'La soupape ne ferme plus', 'Meilleur remplissage'], e: 'Moins de levée = moins d’écoulement des gaz.' },
    { img: G + 'page-055.jpg', q: 'Quelle soupape a le jeu le plus grand ?', c: ['L’échappement', 'L’admission', 'Les deux ont le même'], e: 'Elle est soumise à une température plus élevée.' },
    { img: G + 'page-055.jpg', q: 'Méthode des 5 (4 cylindres) : le cylindre 1 est en bascule. Quel cylindre réglez-vous ?', c: ['Le 4', 'Le 1', 'Le 3'], e: '1 + 4 = 5.' },
    { img: G + 'page-055.jpg', q: 'Méthode des 5 : le cylindre 3 est en bascule. Quel cylindre réglez-vous ?', c: ['Le 2', 'Le 4', 'Le 3'], e: '3 + 2 = 5.' },
    { img: G + 'page-056.jpg', q: 'Méthode des 7 (6 cylindres) : le cylindre 5 est en bascule. Quel cylindre réglez-vous ?', c: ['Le 2', 'Le 6', 'Le 1'], e: '5 + 2 = 7.' },
    { img: G + 'page-056.jpg', q: 'Qu’est-ce qu’un cylindre « en bascule » ?', c: ['Un cylindre en position de balayage : ses deux soupapes sont légèrement ouvertes', 'Un cylindre en fin de compression', 'Un cylindre dont les soupapes sont fermées'], e: 'On règle alors le cylindre qui est en fin de compression.' },
    { img: G + 'page-056.jpg', q: 'Méthode Peugeot (4 cylindres) : le cylindre 1 est en POE. Quelles soupapes réglez-vous ?', c: ['Admission du 3 et échappement du 4', 'Admission du 4 et échappement du 1', 'Les deux soupapes du 1'], e: 'POE = pleine ouverture échappement.' },
    { img: G + 'page-056.jpg', q: 'Quelle méthode pour un moteur à nombre impair de cylindres ?', c: ['La méthode générale : pleine ouverture puis un tour moteur', 'La méthode des 5', 'La méthode Peugeot'], e: 'Les autres méthodes ne valent que pour les moteurs en ligne à nombre pair de cylindres.' },
    { img: G + 'page-061.jpg', q: 'Calage de la distribution sans repère : quel cylindre met-on en bascule ?', c: ['Le cylindre opposé au cylindre de référence (le 4 si c’est le 1)', 'Le cylindre de référence', 'N’importe lequel'], e: 'Une erreur d’une dent ferait disparaître la bascule.' }
  ]);

  /* =============================== ÉLECTRICITÉ =============================== */
  REV.addLessons('elec', 'logique', [{
    id: 'methodes', title: 'Méthodes de calcul pas à pas (lois, transistor, alternatif, portes logiques)',
    images: [im('logique-portes.jpg', 'Les portes logiques (OTAN et AFNOR)')],
    html: `
<h3>Les formules de base</h3>
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Exemple</th></tr>
<tr><td>Loi d’Ohm</td><td>U = R × I · R = U / I · I = U / R</td><td>24 V sur 120 Ω → I = 0,2 A</td></tr>
<tr><td>Puissance</td><td>P = U × I = R × I² = U² / R</td><td>12 V × 5 A = 60 W</td></tr>
<tr><td>Résistances en série</td><td>Req = R1 + R2 + …</td><td>100 + 200 = 300 Ω</td></tr>
<tr><td>Résistances en parallèle</td><td>1/Req = 1/R1 + 1/R2 · pour 2 : Req = R1 × R2 / (R1 + R2)</td><td>2 × 120 Ω → 60 Ω</td></tr>
<tr><td>Loi des nœuds</td><td>Σ courants entrants = Σ courants sortants</td><td>I = I1 + I2</td></tr>
<tr><td>Loi des mailles</td><td>Σ des tensions dans une maille = 0 (générateur = somme des tensions des récepteurs)</td><td>12 = U1 + U2</td></tr>
<tr><td>Alternatif</td><td>Ueff = Umax / √2 = 0,707 × Umax · f = 1 / T</td><td>Umax 220 V → 155 V ; T = 40 ms → 25 Hz</td></tr>
<tr><td>Triphasé</td><td>U (entre phases) = V (phase-neutre) × √3 · P = U × I × √3 × cos φ</td><td>220 V entre phases → 127 V</td></tr></table></div>
<h3>Méthode pour un exercice de circuit</h3>
<ol><li>Repérer les données (tensions, résistances, courants) et ce qu’on cherche.</li><li>Repérer ce qui est en <b>série</b> (même courant) et en <b>parallèle</b> (même tension).</li><li>Calculer la résistance équivalente, puis le courant total (loi d’Ohm).</li><li>Revenir sur chaque branche : loi des nœuds pour les courants, loi des mailles pour les tensions.</li><li>Vérifier l’unité (mA → A : ÷ 1 000).</li></ol>
<h3>Transistor NPN qui commande un relais (type UV2)</h3>
<ol><li><b>Saturé</b> : Vce ≈ 0 → toute la tension d’alimentation est sur la bobine : <b>RK1 = Ualim / Ic</b> (24 / 0,2 = 120 Ω).</li>
<li><b>Ib = Ic / β</b> (200 mA / 100 = 2 mA).</li>
<li><b>UR1 = Ucommande − Vbe</b> (5 − 0,6 = 4,4 V).</li>
<li>R2 est en parallèle sur la jonction base-émetteur : <b>R2 = Vbe / IR2</b> (0,6 / 0,020 = 30 Ω).</li>
<li>Dans R1 passent Ib + IR2 : <b>R1 = UR1 / (Ib + IR2)</b>.</li></ol>
<h3>Diode et Zéner</h3>
<ul><li>Diode passante : chute de ≈ <b>0,6 V</b> ; résistance de protection <b>R = (U − Ud) / I</b>.</li><li>Zéner en inverse : elle maintient sa tension Uz ; la résistance en série prend le reste : <b>UR = U − Uz</b>.</li></ul>
<h3>Portes logiques : la méthode</h3>
<ol><li><b>Nommer</b> la sortie de chaque porte intermédiaire (a, b, c…).</li>
<li><b>Écrire l’équation</b> porte par porte, de l’entrée vers la sortie : ET = « · », OU = « + », NON = barre.</li>
<li><b>Simplifier</b> avec De Morgan : on casse la barre ET on change le signe : (A·B)‾ = Ā + B̄ ; (A + B)‾ = Ā · B̄.</li>
<li><b>Remplacer</b> par les valeurs (0 ou 1) : un ET vaut 0 dès qu’une entrée vaut 0 ; un OU vaut 1 dès qu’une entrée vaut 1.</li>
<li><b>Table de vérité</b> : 2ⁿ lignes pour n entrées (2 → 4, 3 → 8, 4 → 16, 6 → 64).</li>
<li><b>Tension de sortie</b> : 1 = 2 à 5 V (niveau haut), 0 = 0 à 1 V (niveau bas).</li></ol>
<div class="tw"><table><tr><th>A</th><th>B</th><th>ET</th><th>OU</th><th>ET NON</th><th>OU NON</th></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr></table></div>`,
    retenir: ['Série = même courant, parallèle = même tension.', 'Transistor saturé : RK1 = U / Ic ; Ib = Ic / β ; UR1 = Ucom − Vbe ; R2 = Vbe / IR2.', 'Portes : nommer, écrire, simplifier (De Morgan), remplacer, table 2ⁿ lignes.'],
    memo: { cle: 'NOMMER · ÉCRIRE · SIMPLIFIER · REMPLACER', points: ['ET = 0 dès qu’une entrée vaut 0', 'OU = 1 dès qu’une entrée vaut 1', 'De Morgan : casser la barre, changer le signe', '2ⁿ combinaisons'], astuce: 'Le rond en sortie inverse tout : ET NON = inverse du ET.' }
  }]);
  ex('elec', 'methodes', [
    { q: 'Porte ET à 2 entrées, A = 1 et B = 0. Sortie ?', c: ['0', '1', 'Indéterminée'], e: 'Un ET vaut 0 dès qu’une entrée vaut 0.' },
    { q: 'Porte OU à 2 entrées, A = 0 et B = 1. Sortie ?', c: ['1', '0', 'Indéterminée'], e: 'Un OU vaut 1 dès qu’une entrée vaut 1.' },
    { q: 'Porte ET NON à 2 entrées, A = 1 et B = 1. Sortie ?', c: ['0', '1', '2'], e: 'ET NON = inverse du ET : le ET donne 1, donc 0.' },
    { q: 'Porte OU NON à 2 entrées, A = 0 et B = 0. Sortie ?', c: ['1', '0', 'Indéterminée'], e: 'OU NON = inverse du OU : le OU donne 0, donc 1.' },
    { q: 'Combien de combinaisons pour une porte à 4 entrées ?', c: ['16', '8', '4'], e: '2⁴ = 16.' },
    { q: 'Simplifiez (A · B)‾ :', c: ['Ā + B̄', 'Ā · B̄', 'A + B'], e: 'De Morgan : on casse la barre et on change le signe.' },
    { q: 'Simplifiez (Ā + B̄)‾ :', c: ['A · B', 'A + B', 'Ā · B̄'], e: 'De Morgan : (Ā + B̄)‾ = A · B (double barre = sans barre).' },
    { q: 'S = A · B̄ avec A = 1 et B = 0. Valeur de S ?', c: ['1', '0', 'Indéterminée'], e: 'B̄ = 1 ; 1 · 1 = 1.' },
    { q: 'S = (A + B) · C avec A = 1, B = 0, C = 0. Valeur de S ?', c: ['0', '1', 'Indéterminée'], e: '(1 + 0) · 0 = 1 · 0 = 0.' },
    { q: 'Tension correspondant au niveau logique 1 ?', c: ['2 à 5 V', '0 à 1 V', '1 à 2 V'], e: '0 = 0 à 1 V ; entre 1 et 2 V = zone interdite.' },
    { q: 'Deux résistances de 120 Ω en parallèle. Résistance équivalente ?', c: ['60 Ω', '240 Ω', '120 Ω'], e: '120 × 120 / (120 + 120) = 60 Ω.' },
    { q: 'Résistances de 100 Ω et 200 Ω en série sous 12 V. Courant ?', c: ['40 mA', '120 mA', '60 mA'], e: 'Req = 300 Ω ; I = 12 / 300 = 0,04 A.' },
    { q: 'Transistor saturé, relais sous 24 V, Ic = 200 mA. Résistance de la bobine ?', c: ['120 Ω', '12 Ω', '4 800 Ω'], e: 'RK1 = 24 / 0,2 = 120 Ω.' },
    { q: 'Ic = 150 mA, β = 50. Courant de base Ib ?', c: ['3 mA', '7 500 mA', '0,3 mA'], e: 'Ib = Ic / β = 150 / 50 = 3 mA.' },
    { q: 'Diode (0,6 V) et LED alimentées sous 12 V : courant 20 mA, LED 2 V. Résistance de protection ?', c: ['470 Ω', '600 Ω', '100 Ω'], e: 'R = (12 − 0,6 − 2) / 0,020 = 470 Ω.' },
    { q: 'Signal alternatif de période T = 20 ms. Fréquence ?', c: ['50 Hz', '20 Hz', '500 Hz'], e: 'f = 1 / T = 1 / 0,020 = 50 Hz.' }
  ]);

  /* =============================== ÉQUIPEMENT : contrôle des actionneurs et capteurs =============================== */
  REV.extendLesson('equip/capteurs', {
    html: `
<h3>Comment contrôler un actionneur</h3>
<div class="tw"><table><tr><th>Actionneur</th><th>Contrôle</th><th>Valeur / constat</th></tr>
<tr><td>Injecteur électromagnétique (2 fils)</td><td>Ohmmètre + continuité du faisceau</td><td>≈ 0,5 Ω</td></tr>
<tr><td>Injecteur piézo-électrique</td><td>Ohmmètre, capacimètre, faisceau</td><td>≈ 200 kΩ ; ≈ 4 µF</td></tr>
<tr><td>Régulateur de débit IMV (Delphi)</td><td>Ohmmètre, faisceau, signal RCO à l’oscilloscope, grippage</td><td>2,5 à 3,5 Ω</td></tr>
<tr><td>Régulateur haute pression (Bosch)</td><td>Ohmmètre, alimentation, grippage</td><td>≈ 2 Ω</td></tr>
<tr><td>Électrovanne en RCO (suralimentation, RGE)</td><td>Voltmètre (tension moyenne) ou oscilloscope (rapport cyclique)</td><td>U moyenne = RCO × U (75 % sous 12 V = 9 V)</td></tr>
<tr><td>Relais</td><td>Bobine à l’ohmmètre ; contact commandé / non commandé</td><td>Bobine ni coupée ni en court-circuit</td></tr>
<tr><td>Actionneur tout ou rien</td><td>Voltmètre sur l’alimentation et la masse</td><td>0 ou pleine tension</td></tr></table></div>
<p><b>Méthode</b> : alimentation et masse d’abord, puis la résistance de l’actionneur (valeur constructeur), puis le faisceau (continuité, isolement), et enfin le signal de commande (oscilloscope). Un actionneur est souvent complété d’un potentiomètre qui renvoie sa position au calculateur.</p>`,
    retenir: ['Injecteur électromagnétique ≈ 0,5 Ω ; piézo ≈ 200 kΩ ; IMV 2,5 à 3,5 Ω ; régulateur HP ≈ 2 Ω.', 'RCO : le voltmètre lit la moyenne, l’oscilloscope le rapport cyclique.']
  });
  REV.extendLesson('equip/capteurs', {
    html: `
<h3>Contrôler un capteur : la méthode</h3>
<ol><li>Contrôler dans l’ordre : <b>capteur → connecteur → faisceau</b>.</li>
<li><b>Capteur passif</b> (alimenté) : alimentation (5 V), masse, puis le signal ; débranché, le fil signal donne ≈ 4,80 V (pull-up).</li>
<li><b>Capteur actif</b> : ohmmètre (résistance + isolement par rapport à la masse) ; branché, voltmètre alternatif (inductif).</li>
<li><b>Signal qui varie vite</b> (carré du Hall, opto-électrique, pics du piézo-électrique) : <b>oscilloscope</b>.</li>
<li><b>Résistance qui varie</b> (CTN, CTP) : ohmmètre en chauffant, puis la tension branché : pour une CTN, R et U doivent baisser quand la température monte.</li></ol>`
  });
  ex('equip', 'capteurs', [
    { q: 'Résistance normale d’un injecteur électromagnétique common rail ?', c: ['≈ 0,5 Ω', '≈ 200 kΩ', '≈ 2 000 Ω'], e: 'L’injecteur piézo-électrique, lui, fait ≈ 200 kΩ.' },
    { q: 'Comment contrôler un injecteur piézo-électrique ?', c: ['Résistance ≈ 200 kΩ, capacité ≈ 4 µF, continuité du faisceau', 'Résistance ≈ 0,5 Ω', 'Au pèse-acide'], e: 'Il se comporte comme un condensateur.' },
    { q: 'Résistance du régulateur de débit IMV (Delphi) ?', c: ['2,5 à 3,5 Ω', '≈ 200 kΩ', '≈ 0 Ω'], e: 'On contrôle aussi le faisceau et le signal RCO à l’oscilloscope.' },
    { q: 'Électrovanne commandée en RCO 50 % sous 24 V : que lit le voltmètre ?', c: ['12 V (la tension moyenne)', '24 V', '0 V'], e: 'Le voltmètre lit la moyenne ; l’oscilloscope montre le rapport cyclique.' },
    { q: 'Ordre de contrôle d’un actionneur ?', c: ['Alimentation et masse, résistance, faisceau, signal de commande', 'Remplacer d’abord l’actionneur', 'Le calculateur en premier'], e: 'Du plus simple au plus compliqué.' },
    { q: 'Capteur à effet Hall : avec quel appareil voit-on le mieux son signal ?', c: ['L’oscilloscope', 'L’ohmmètre', 'Le pèse-acide'], e: 'Signal carré de fréquence variable.' },
    { q: 'Ordre de contrôle d’un capteur ?', c: ['Capteur → connecteur → faisceau', 'Faisceau → calculateur → capteur', 'Calculateur → capteur'], e: 'On commence par le capteur lui-même.' }
  ]);

  /* =============================== PNEUMATIQUE =============================== */
  REV.extendLesson('pneu/circuits', {
    images: [im(P + 'verrou-route-principe.jpg', 'Cylindre à verrou : phases pour passer en position route'), im(P + 'verrou-parc-principe.jpg', 'Cylindre à verrou : phases pour passer en position frein de parc')],
    html: `
<h3>Cylindre à verrou : l’ordre d’alimentation</h3>
<div class="tw"><table><tr><th></th><th>Frein de parc → position ROUTE</th><th>Position route → FREIN DE PARC</th></tr>
<tr><td>1</td><td><b>Alimentation de la chambre arrière</b> (diminue l’effort sur le verrou)</td><td><b>Alimentation de la chambre arrière</b> (le véhicule est freiné)</td></tr>
<tr><td>2</td><td><b>Alimentation de la chambre à verrou</b> (le verrou libère la tige du piston)</td><td><b>Vidange de la chambre à verrou</b> (le verrou bloque la tige du piston)</td></tr>
<tr><td>3</td><td><b>Vidange de la chambre arrière</b> (le piston recule sous l’effet de son ressort et libère les freins)</td><td><b>Vidange de la chambre arrière</b> (le freinage est entièrement mécanique)</td></tr></table></div>
<p>⚠️ Respecter les temps du constructeur : <b>2 à 3 secondes par phase</b>. Une action trop rapide sur le robinet de frein de parc peut détériorer la tige du piston et/ou le verrou.</p>`
  });
  REV.addLessons('pneu', 'schemas-complets', [{
    id: 'pannes-gbc', title: 'GBC 180 ADR : rôle de chaque élément et pannes sur le circuit',
    images: [im(P + 'gbc180-freinage-couleurs.jpg', 'GBC 180 ADR : véhicule qui roule, conducteur qui freine'), im(P + 'gbc180-vierge.jpg', 'Schéma vierge pour suivre les pannes')],
    html: `
<h3>Rôle de chaque élément</h3>
<div class="tw"><table><tr><th>N°</th><th>Élément</th><th>Rôle</th></tr>
<tr><td>1</td><td>Compresseur</td><td>Entraîné par le moteur, il fournit l’air comprimé</td></tr>
<tr><td>2</td><td>Serpentin</td><td>Refroidit l’air (condensation de l’eau)</td></tr>
<tr><td>3</td><td>Régulateur</td><td>Met le compresseur en charge ou à vide selon la pression</td></tr>
<tr><td>4</td><td>Dessiccateur</td><td>Assèche l’air : plus de condensation, plus d’antigel</td></tr>
<tr><td>5</td><td>Double valve d’arrêt</td><td>Alimente une sortie à partir de la plus forte de deux pressions</td></tr>
<tr><td>6</td><td>Valve de protection</td><td>Remplit les circuits dans un ordre précis, isole un circuit qui fuit et réalimente les autres</td></tr>
<tr><td>7 / 8 / 9</td><td>Réservoirs AV / AR / parc-remorque</td><td>Une réserve par circuit</td></tr>
<tr><td>10</td><td>Détendeur</td><td>Limite la pression délivrée (servitudes)</td></tr>
<tr><td>11</td><td>Purgeur automatique</td><td>Évacue l’eau des réservoirs</td></tr>
<tr><td>12</td><td>Robinet de frein de service</td><td>Délivre la pression de freinage, proportionnelle à l’appui, vers l’AV et l’AR</td></tr>
<tr><td>13</td><td>Valve relais simple pilotage</td><td>Alimente vite les récepteurs, commandée par le robinet</td></tr>
<tr><td>14</td><td>Valve relais simple pilotage négatif</td><td>Commande par absence d’air (frein de parc / secours)</td></tr>
<tr><td>15</td><td>Robinet de frein de parc</td><td>Commande le frein de parc et de secours</td></tr>
<tr><td>16</td><td>Connecteur de freinage + valve relais intégrée</td><td>Adapte l’effort de freinage arrière à la charge</td></tr>
<tr><td>17</td><td>VCR avec rupture</td><td>Commande la remorque à partir de l’AV et de l’AR ; freine la remorque si la conduite directe fuit</td></tr>
<tr><td>18</td><td>Vase à diaphragme</td><td>Transforme la pression en force de freinage</td></tr>
<tr><td>19</td><td>VNAE</td><td>Évite d’additionner l’effort du service et celui du ressort sur les Tristop</td></tr>
<tr><td>20</td><td>Tristop</td><td>Frein de service (diaphragme) + frein de parc / secours (ressort)</td></tr>
<tr><td>21</td><td>Valve de desserrage rapide</td><td>Vide vite les récepteurs pour défreiner plus vite</td></tr>
<tr><td>22 / 23</td><td>Mains d’accouplement</td><td>Rouge = automatique (alimentation) ; jaune = directe (commande)</td></tr></table></div>
<h3>Que se passe-t-il en cas de fuite pendant le freinage ?</h3>
<div class="tw"><table><tr><th>Fuite sur…</th><th>Ce qui se passe</th></tr>
<tr><td><b>Circuit AVANT</b></td><td>La valve de protection (6) isole le circuit AV : les autres circuits gardent leur pression. Le robinet de frein de service étant double, <b>l’arrière freine toujours</b> ; la VCR commande encore la remorque à partir du circuit AR. La pression AV chute (manomètre, voyant) ; freinage moins efficace.</td></tr>
<tr><td><b>Circuit ARRIÈRE</b></td><td>La valve de protection isole le circuit AR ; <b>l’avant freine toujours</b> et la VCR commande la remorque à partir du circuit AV. Sur le GBC 180, au freinage de service, <b>le frein de parc (ressort des Tristop) freine les roues arrière</b> : c’est la fonction secours (contrôle : fuite franche sur l’AR, le cylindre de frein de parc doit freiner).</td></tr>
<tr><td><b>Circuit de parc</b></td><td>Plus d’air dans les chambres à ressort : <b>les ressorts des Tristop freinent</b> l’arrière (sécurité).</td></tr>
<tr><td><b>Conduite directe (main jaune)</b> en freinant</td><td>Fonction rupture de la VCR : l’automatique chute, la <b>VRU freine la remorque</b>.</td></tr>
<tr><td><b>Conduite automatique (main rouge)</b></td><td>La VRU de la remorque freine automatiquement.</td></tr></table></div>`,
    retenir: ['Fuite AV → l’AR freine ; fuite AR → l’AV freine et les ressorts des Tristop assurent le secours à l’AR.', 'La valve de protection isole le circuit qui fuit.', 'Fuite sur la directe en freinant → rupture VCR → VRU freine la remorque.'],
    memo: { cle: 'UN CIRCUIT FUIT → LES AUTRES FREINENT', points: ['6 = valve de protection : isole', 'Fuite AR : les ressorts des Tristop freinent', 'Directe qui fuit : rupture → VRU'], astuce: 'Le ressort freine, l’air défreine.' }
  }]);
  ex('pneu', 'pannes-gbc', [
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'GBC 180 ADR : fuite sur le circuit AVANT pendant le freinage. Que se passe-t-il ?', c: ['La valve de protection isole l’AV, l’arrière freine toujours', 'Plus aucun frein ne fonctionne', 'Seul le frein de remorque fonctionne'], e: 'Le robinet de frein de service est double : l’AR reste alimenté.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'GBC 180 ADR : fuite franche sur le circuit ARRIÈRE, le conducteur freine. Que doit-il se passer ?', c: ['L’avant freine et le frein de parc (ressorts des Tristop) freine les roues arrière', 'Le véhicule ne freine plus du tout', 'Seul l’arrière freine'], e: 'C’est la fonction secours, contrôlée en créant une fuite franche sur l’AR.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'Quel élément isole un circuit qui fuit et continue d’alimenter les autres ?', c: ['La valve de protection (6)', 'La double valve d’arrêt (5)', 'Le détendeur (10)'], e: 'Elle réalimente les circuits valides.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'Fuite sur le circuit de parc : conséquence ?', c: ['Les ressorts des Tristop freinent l’arrière', 'Le véhicule se défreine', 'Aucune'], e: 'Sans air, le ressort serre le frein : c’est une sécurité.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'Rôle de l’élément 21 (valve de desserrage rapide) ?', c: ['Vider vite les récepteurs pour défreiner plus vite', 'Alimenter la remorque', 'Assécher l’air'], e: 'Elle évite que l’air revienne jusqu’au robinet.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'Rôle de l’élément 16 ?', c: ['Adapter l’effort de freinage arrière à la charge', 'Commander la remorque', 'Limiter la pression des servitudes'], e: 'Connecteur de freinage + valve relais simple pilotage intégrée.' },
    { img: P + 'gbc180-freinage-couleurs.jpg', q: 'Rôle de l’élément 10 (détendeur) ?', c: ['Limiter la pression délivrée (servitudes)', 'Évacuer l’eau', 'Freiner la remorque'], e: 'L’élément 11 est le purgeur automatique.' },
    { img: P + 'verrou-route-principe.jpg', q: 'Cylindre à verrou, passage en position route : première phase ?', c: ['Alimentation de la chambre arrière', 'Alimentation de la chambre à verrou', 'Vidange de la chambre arrière'], e: 'Elle diminue l’effort sur le verrou ; puis alimentation du verrou, puis vidange de la chambre arrière.' },
    { img: P + 'verrou-route-principe.jpg', q: 'Cylindre à verrou, passage en position route : ordre des phases ?', c: ['Chambre arrière alimentée → chambre à verrou alimentée → chambre arrière vidée', 'Chambre à verrou → chambre arrière → vidange du verrou', 'Tout en même temps'], e: '2 à 3 secondes par phase.' },
    { img: P + 'verrou-parc-principe.jpg', q: 'Cylindre à verrou, passage en frein de parc : ordre des phases ?', c: ['Chambre arrière alimentée → chambre à verrou vidée → chambre arrière vidée', 'Chambre à verrou alimentée → chambre arrière vidée', 'Chambre arrière vidée seulement'], e: 'À la fin, le freinage est entièrement mécanique.' },
    { img: P + 'verrou-parc-principe.jpg', q: 'Pourquoi respecter 2 à 3 secondes par phase sur le robinet de frein de parc (cylindre à verrou) ?', c: ['Une action trop rapide peut détériorer la tige du piston et/ou le verrou', 'Pour économiser l’air', 'Pour laisser chauffer les freins'], e: 'Temps défini par le constructeur.' }
  ]);

  /* =============================== DSFT =============================== */
  REV.extendLesson('dsft/freinage', {
    images: [im(L + 'l-d059_0.jpg', 'Circuit II'), im(L + 'l-d059_1.jpg', 'Circuit en X'), im(L + 'l-d060_0.jpg', 'Circuit en HI'), im(L + 'l-d060_1.jpg', 'Circuit en HH'), im(L + 'l-d061_0.jpg', 'Circuit en L (triangle)'), im(L + 'l-d054_0.jpg', 'ICP by-pass')],
    html: `
<h3>Les différents circuits de freinage (doubles depuis 1975)</h3>
<div class="tw"><table><tr><th>Circuit</th><th>Principe</th><th>Avantage</th><th>Inconvénient</th></tr>
<tr><td><b>II</b></td><td>Un circuit pour l’avant, un pour l’arrière</td><td>Simple ; une panne n’affecte pas la stabilité</td><td>Si l’avant lâche, il ne reste que l’arrière (corrigé)</td></tr>
<tr><td><b>X</b></td><td>Chaque circuit freine une roue AV et la roue AR opposée</td><td>50 % d’efficacité en panne ; montage simple</td><td>En panne, la stabilité est affectée</td></tr>
<tr><td><b>HI</b></td><td>Étriers AV à 2 pistons : un circuit sur les 4 roues, l’autre sur l’avant</td><td>—</td><td>Prix du montage</td></tr>
<tr><td><b>HH</b></td><td>Chaque circuit freine les 4 roues</td><td>Freinage intégral quelle que soit la panne</td><td>—</td></tr>
<tr><td><b>L</b> (triangle)</td><td>Chaque circuit freine les 2 roues AV et une roue AR</td><td>Freinage intégral à l’avant quelle que soit la panne</td><td>—</td></tr></table></div>
<p>L’<b>ICP</b> et l’<b>ICP by-pass</b> se trouvent uniquement sur les circuits en <b>II</b>.</p>
<h3>Contrôler l’ICP by-pass et la SPR</h3>
<ul><li><b>ICP by-pass</b> : un manomètre sur le circuit AV et un sur le circuit AR (purgés), appuyer et lire les pressions constructeur ; créer une fuite sur l’AV : la pression <b>baisse à l’avant et augmente à l’arrière</b> (le correcteur est shunté).</li>
<li><b>SPR</b> : manomètre basse pression (TESTARC) sur le circuit AR, purger ; appuyer jusqu’à 3 à 4 bar maxi, relâcher, attendre 5 à 10 min : il doit rester <b>0,5 à 1,5 bar</b>, sinon remplacer la SPR.</li></ul>`,
    retenir: ['II : AV / AR · X : diagonales (50 %) · HH : intégral · L : intégral à l’avant.', 'ICP by-pass : fuite AV → pression AR maxi (correcteur shunté).', 'SPR : 0,5 à 1,5 bar restant après 5 à 10 min.']
  });
  REV.extendLesson('dsft/transmission', {
    images: [im(L + 'l-d087_0.jpg', 'Diaphragme : position embrayée'), im(L + 'l-d087_1.jpg', 'Diaphragme : position débrayée'), im(L + 'l-d087_2.jpg', 'Mécanisme tiré et mécanisme poussé')],
    html: `
<h3>Embrayage à diaphragme poussé ou tiré</h3>
<div class="tw"><table><tr><th></th><th>Diaphragme POUSSÉ</th><th>Diaphragme TIRÉ</th></tr>
<tr><td>Débrayage</td><td>La butée <b>pousse</b> au centre du diaphragme (vers le volant)</td><td>La butée <b>tire</b> le centre du diaphragme (vers la boîte)</td></tr>
<tr><td>Intérêt</td><td>Montage classique</td><td>Plus d’effort de pression <b>sans</b> plus d’effort de débrayage : couple transmis supérieur (≈ 20 %), confort, charge à la butée réduite, durée de vie supérieure, moins d’échauffement</td></tr>
<tr><td>Inconvénient</td><td>—</td><td>À la dépose de la boîte, la butée doit être désaccouplée de sa fourchette</td></tr></table></div>
<p>Avantages du diaphragme : grande progressivité, faible effort à la pédale, pression sur le disque peu variable malgré l’usure, bonne ventilation.</p>`,
    retenir: ['Tiré : la butée tire ; +20 % de couple sans plus d’effort ; butée à désaccoupler pour déposer la boîte.']
  });
  ex('dsft', 'freinage', [
    { img: L + 'l-d059_1.jpg', q: 'Circuit de freinage en X : principe ?', c: ['Chaque circuit freine une roue AV et la roue AR opposée', 'Un circuit à l’avant, un à l’arrière', 'Chaque circuit freine les 4 roues'], e: 'En panne : 50 % d’efficacité mais stabilité affectée.' },
    { img: L + 'l-d059_0.jpg', q: 'Circuit en II : inconvénient ?', c: ['Si le circuit avant lâche, il ne reste que l’arrière (corrigé)', 'La stabilité est affectée en panne', 'Il est très cher'], e: 'Avantage : simple, stabilité conservée.' },
    { img: L + 'l-d060_1.jpg', q: 'Quel circuit assure un freinage intégral quelle que soit la panne ?', c: ['Le circuit en HH', 'Le circuit en X', 'Le circuit en II'], e: 'Le circuit en L assure un freinage intégral à l’avant.' },
    { img: L + 'l-d061_0.jpg', q: 'Circuit en L (triangle) : avantage ?', c: ['Freinage intégral à l’avant quelle que soit la panne', 'Freinage intégral sur les 4 roues', 'Le moins cher'], e: 'Chaque circuit freine les 2 roues AV et une roue AR.' },
    { img: L + 'l-d054_0.jpg', q: 'Sur quel type de circuit trouve-t-on l’ICP by-pass ?', c: ['Uniquement sur les circuits en II', 'Sur les circuits en X', 'Sur tous les circuits'], e: 'Il shunte le correcteur si l’avant lâche.' },
    { img: L + 'l-d054_0.jpg', q: 'Contrôle de l’ICP by-pass : on crée une fuite sur le circuit AV. Que doit-on lire ?', c: ['La pression baisse à l’avant et augmente à l’arrière', 'La pression baisse partout', 'Rien ne change'], e: 'Le correcteur est shunté : pression maxi à l’arrière.' },
    { q: 'Contrôle de la SPR : après 5 à 10 minutes, quelle pression doit rester dans le circuit arrière ?', c: ['0,5 à 1,5 bar', '0 bar', '3 à 4 bar'], e: 'Sinon remplacer la SPR.' }
  ]);
  ex('dsft', 'transmission', [
    { img: L + 'l-d087_2.jpg', q: 'Embrayage à diaphragme tiré : que fait la butée au débrayage ?', c: ['Elle tire le centre du diaphragme', 'Elle pousse le centre du diaphragme', 'Elle écarte le volant'], e: 'Sur le poussé, la butée pousse.' },
    { img: L + 'l-d087_2.jpg', q: 'Avantage de l’embrayage tiré ?', c: ['Plus de couple transmis (≈ 20 %) sans plus d’effort de débrayage', 'Plus simple à déposer', 'Il n’a pas de butée'], e: 'Aussi : confort, butée moins chargée, durée de vie, moins d’échauffement.' },
    { img: L + 'l-d087_2.jpg', q: 'Inconvénient de l’embrayage tiré ?', c: ['À la dépose de la boîte, la butée doit être désaccouplée de sa fourchette', 'Il transmet moins de couple', 'Il chauffe plus'], e: 'La butée est accrochée au diaphragme.' }
  ]);

  /* =============================== HYDRAULIQUE =============================== */
  REV.addLessons('hydro', 'diagnostic', [{
    id: 'associations', title: 'Associations d’éléments, valve DA / inching et phénomènes (cavitation, émulsion…)',
    images: [im(L + 'l-k017_1.jpg', 'Régulateur de débit 2 voies'), im(L + 'l-k020_1.jpg', 'Régulateur de débit 3 voies'), im(L + 'l-k050_0.jpg', 'Balance d’entrée + tête pilote'),
      im(L + 'l-h021_0.jpg', 'Dommages de la cavitation'), im(L + 'l-h024_0.jpg', 'L’émulsion'), im(L + 'l-k088_1.jpg', 'Vérins ayant subi un flambage'), im(L + 'l-k089_0.jpg', 'Contrôle des fuites internes d’un vérin')],
    html: `
<h3>2 éléments associés = 1 élément</h3>
<div class="tw"><table><tr><th>Association</th><th>Donne</th><th>Pourquoi</th></tr>
<tr><td><b>BIP</b> (balance individuelle de pression) + <b>distributeur</b></td><td><b>Régulateur de débit 2 voies</b></td><td>La BIP garde ΔP constant aux bornes du distributeur → vitesse constante</td></tr>
<tr><td><b>Balance de pression en série</b> + <b>limiteur de débit</b></td><td><b>Régulateur de débit 2 voies</b></td><td>Débit constant quelle que soit la charge (mauvais rendement : l’excédent passe par le limiteur principal)</td></tr>
<tr><td><b>Balance de pression en dérivation</b> + <b>étrangleur</b></td><td><b>Régulateur de débit 3 voies</b></td><td>L’excédent retourne à la bâche à faible pression → meilleur rendement</td></tr>
<tr><td><b>Balance d’entrée</b> + <b>tête pilote</b></td><td><b>Régulateur de débit 3 voies</b> (LS centre ouvert)</td><td>La balance d’entrée renvoie l’excédent à la bâche ; en butée, P maxi = tarage de la tête pilote + ressort de la balance (ex. 200 + 20 = 220 b)</td></tr>
<tr><td><b>Distributeur</b> + <b>balance d’entrée</b></td><td><b>Régulateur de débit 3 voies</b></td><td>P pompe = P LS + tarage de la balance</td></tr>
<tr><td><b>Étage principal</b> + <b>étage pilote</b></td><td><b>Limiteur de pression à commande pilotée</b></td><td>Pression maxi = étage pilote + étage principal</td></tr>
<tr><td><b>Étrangleur</b> + <b>clapet anti-retour</b> en parallèle</td><td><b>Limiteur de débit simple effet</b> (clapet freineur)</td><td>Freine dans un sens, libre dans l’autre</td></tr>
<tr><td><b>Réducteur de pression 2 voies</b> + <b>limiteur de pression</b></td><td>Même fonction qu’un <b>réducteur 3 voies</b></td><td>Protège le circuit réduit contre les surpressions</td></tr>
<tr><td><b>Servodistributeur</b> + <b>servopiston</b> + rétroaction</td><td><b>Servocommande</b></td><td>Commande progressive de la cylindrée de la pompe</td></tr></table></div>
<h3>Valve DA (automotive) et commande inching</h3>
<ul><li><b>Valve DA</b> (transmission hydrostatique) : elle pilote la pompe <b>selon le régime du moteur thermique</b> : l’engin avance d’autant plus que le moteur tourne vite (progression automatique).</li>
<li><b>Inching</b> (pédale d’approche) : ralentir voire arrêter l’avancement de l’engin <b>en gardant le moteur au régime nominal</b>, pour donner la puissance à l’équipement.</li></ul>
<h3>Les phénomènes et problèmes</h3>
<div class="tw"><table><tr><th>Phénomène</th><th>Ce que c’est</th><th>Causes</th><th>Conséquences / symptômes</th><th>Remèdes</th></tr>
<tr><td><b>Cavitation</b></td><td>Dépression : le gaz dissous se libère en bulles qui implosent en revenant en pression (micro-arrachements de métal)</td><td>Filtre colmaté, robinet d’isolement fermé, aspiration bouchée ou pincée, mise à l’air de la bâche bouchée, huile trop visqueuse, niveau bas</td><td>Pompe détruite en quelques minutes, oxydation de l’huile ; mousse dans la bâche, pompe bruyante, récepteurs lents ou par à-coups</td><td>Propreté des reniflards et filtres, niveau d’huile ; bâche en charge ou pressurisée, clapets de réalimentation, gavage</td></tr>
<tr><td><b>Émulsion</b></td><td>Mélange d’huile et d’eau</td><td>Condensation dans la bâche, lavage haute pression, infiltration d’eau</td><td>Huile pâteuse ; grippage des soupapes, clapets, distributeurs</td><td>Purger l’eau au fond de la bâche, huile anti-émulsion, éviter le lavage HP</td></tr>
<tr><td><b>Coup de bélier</b></td><td>Onde de pression due à un arrêt brutal du fluide (jusqu’à ≈ 4 × la pression)</td><td>Ouverture / fermeture trop brusque</td><td>Martèlement, fatigue et rupture des canalisations, joints et filtres HP qui éclatent</td><td>Progressivité, accumulateur</td></tr>
<tr><td><b>Pertes de charge</b></td><td>Chute de pression due à la résistance à l’écoulement (seulement s’il y a débit)</td><td>Canalisation écrasée, raccords rapides, filtre colmaté, huile trop visqueuse</td><td>Échauffement, manque de force, lenteur</td><td>Distributeurs près des récepteurs, composants conformes</td></tr>
<tr><td><b>Barriquage</b> (vérin)</td><td>Le corps du vérin se déforme (« tonneau ») : fuite interne entre côté tige et côté fond</td><td>Usure, surpression</td><td>Vitesse normale en début et fin de course, <b>ralentit en milieu de course</b> ; échauffement (peinture qui change de couleur)</td><td>Échange du vérin</td></tr>
<tr><td><b>Flambage</b> (vérin)</td><td>Tige déformée en courbe</td><td>Choc latéral sur la tige</td><td>Fuite externe, joints abîmés</td><td>Remplacer la tige / le vérin</td></tr>
<tr><td><b>Joints de piston</b> usés</td><td>Fuite interne du vérin</td><td>Usure</td><td>Le vérin ne tient pas la charge, plus lent</td><td>Contrôle : vérin en butée, débrancher le côté butée, envoyer le débit : si l’huile coule, changer les joints</td></tr></table></div>`,
    retenir: ['BIP + distributeur = régulateur de débit 2 voies ; balance en dérivation (balance d’entrée + tête pilote) = régulateur de débit 3 voies.', 'Étage principal + étage pilote = limiteur à commande pilotée.', 'Cavitation = bulles qui implosent (aspiration) ; émulsion = eau dans l’huile ; barriquage = ralentit en milieu de course ; flambage = tige tordue.', 'Valve DA : avance selon le régime ; inching : ralentir au régime nominal.'],
    memo: { cle: 'SÉRIE = 2 VOIES · DÉRIVATION = 3 VOIES', points: ['BIP + distributeur = régulateur 2 voies', 'Balance d’entrée + tête pilote = régulateur 3 voies', 'Principal + pilote = limiteur piloté'], astuce: 'Barriquage : le vérin ralentit au milieu, comme s’il passait dans un tonneau.' }
  }]);
  ex('hydro', 'associations', [
    { q: 'BIP + distributeur forment :', c: ['Un régulateur de débit 2 voies', 'Un régulateur de débit 3 voies', 'Un limiteur à commande pilotée'], e: 'La BIP garde ΔP constant aux bornes du distributeur.' },
    { q: 'Balance d’entrée + tête pilote forment :', c: ['Un régulateur de débit 3 voies', 'Un régulateur de débit 2 voies', 'Un diviseur de débit'], e: 'La balance en dérivation renvoie l’excédent à la bâche.' },
    { q: 'Balance de pression montée EN SÉRIE avec un limiteur de débit :', c: ['Régulateur de débit 2 voies', 'Régulateur de débit 3 voies', 'Réducteur de pression'], e: 'En dérivation, ce serait un régulateur 3 voies.' },
    { q: 'Étage principal + étage pilote forment :', c: ['Un limiteur de pression à commande pilotée', 'Un réducteur de pression', 'Un régulateur de débit'], e: 'Pression maxi = étage pilote + étage principal.' },
    { q: 'Étrangleur + clapet anti-retour en parallèle forment :', c: ['Un limiteur de débit simple effet (clapet freineur)', 'Un régulateur de débit 3 voies', 'Un sélecteur de circuit'], e: 'Il freine dans un sens et laisse passer librement dans l’autre.' },
    { q: 'Pourquoi le régulateur de débit 3 voies a-t-il un meilleur rendement que le 2 voies ?', c: ['L’excédent de débit retourne à la bâche à faible pression', 'Il n’a pas de balance', 'Il supprime le débit'], e: 'Dans le 2 voies, l’excédent part par le limiteur principal à haute pression.' },
    { q: 'Balance d’entrée (ressort 20 b) + tête pilote (200 b), récepteur en butée. Pression en sortie de pompe ?', c: ['220 b', '200 b', '20 b'], e: 'Tête pilote + ressort de la balance.' },
    { q: 'Rôle de la valve DA (automotive) ?', c: ['Faire avancer l’engin selon le régime du moteur thermique', 'Protéger la boucle des chocs', 'Refroidir l’huile'], e: 'Plus le moteur tourne vite, plus l’engin avance.' },
    { q: 'Rôle de la commande inching ?', c: ['Ralentir voire arrêter l’engin en gardant le moteur au régime nominal', 'Augmenter la vitesse maxi', 'Remorquer l’engin'], e: 'La puissance va à l’équipement.' },
    { img: L + 'l-h021_0.jpg', q: 'Qu’est-ce que la cavitation ?', c: ['Des bulles de gaz qui se forment en dépression et implosent en revenant en pression', 'Un mélange d’huile et d’eau', 'Une onde de pression'], e: 'Elle arrache le métal (pompe détruite en quelques minutes).' },
    { img: L + 'l-h021_0.jpg', q: 'Cause possible de cavitation ?', c: ['Filtre d’aspiration colmaté ou robinet d’isolement fermé', 'Lavage haute pression', 'Choc sur une tige de vérin'], e: 'Aussi : aspiration pincée, mise à l’air bouchée, huile trop visqueuse, niveau bas.' },
    { img: L + 'l-h021_0.jpg', q: 'Symptômes de la cavitation ?', c: ['Mousse dans la bâche, pompe bruyante, récepteurs lents ou par à-coups', 'Huile pâteuse', 'Vérin qui ralentit en milieu de course'], e: 'Remède : bâche en charge, gavage, clapets de réalimentation.' },
    { img: L + 'l-h024_0.jpg', q: 'Qu’est-ce que l’émulsion ?', c: ['Un mélange d’huile et d’eau', 'Des bulles d’air dans l’huile', 'Une huile trop chaude'], e: 'Causes : condensation, lavage HP, infiltration.' },
    { img: L + 'l-h024_0.jpg', q: 'Conséquence de l’émulsion ?', c: ['Grippage des soupapes, clapets et distributeurs', 'Pompe qui cavite', 'Tige de vérin tordue'], e: 'L’huile devient pâteuse.' },
    { img: L + 'l-k089_0.jpg', q: 'Un vérin va à vitesse normale en début et en fin de course mais ralentit au milieu. Cause ?', c: ['Barriquage (fuite interne)', 'Flambage', 'Émulsion'], e: 'Échange du vérin.' },
    { img: L + 'l-k088_1.jpg', q: 'Qu’est-ce que le flambage d’un vérin ?', c: ['Une tige déformée en courbe après un choc latéral', 'Un corps déformé en tonneau', 'Des joints de piston usés'], e: 'Il provoque une fuite externe.' },
    { q: 'Le vérin ne tient pas la charge et devient plus lent. Comment vérifier les joints de piston ?', c: ['Vérin en butée, débrancher le côté butée, envoyer le débit : si l’huile coule, changer les joints', 'Mesurer la tige au pied à coulisse', 'Vidanger la bâche'], e: 'Fuite interne par les joints de piston.' },
    { q: 'Qu’est-ce que le coup de bélier ?', c: ['Une onde de pression due à un arrêt brutal du fluide (jusqu’à ≈ 4 × la pression)', 'Des bulles qui implosent', 'De l’eau dans l’huile'], e: 'Remède : progressivité, accumulateur.' }
  ]);
})();
