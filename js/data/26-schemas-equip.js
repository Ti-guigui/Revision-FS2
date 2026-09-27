/* Équipement électrique : schémas du livre AGA 01 (batterie, démarreur, alternateurs, allumage, capteurs d’allumage)
   ajoutés aux leçons de cours, avec fonctionnement, rôle de chaque élément et QCM. */
(function () {
  var A = 'aga01/', SRC = 'AGA 01 — Équipement électrique';
  function im(f, cap) { return { src: A + f + '.jpg', cap: cap }; }

  REV.extendLesson('equip/batterie', {
    images: [im('bat-description', 'Description de l’accumulateur (AGA 01) : 1 couvercle · 2 barrettes · 3 plaque négative · 4 bac · 5 séparateur · 6 plaque positive · 7 bouchon · 8 bornes · 9 rampe support bouchon'), im('bat-pese-acide', 'Contrôle de la densité au pèse-acide')],
    html: `
<h3>Constitution (AGA 01)</h3>
<div class="tw"><table><tr><th>Rep.</th><th>Élément</th><th>Rôle</th></tr>
<tr><td>1</td><td>Couvercle</td><td>Cloison supérieure du bac, porte les orifices de remplissage</td></tr>
<tr><td>2</td><td>Barrettes (plomb)</td><td>Relient les éléments en série</td></tr>
<tr><td>3 / 6</td><td>Plaques négative / positive</td><td>Grilles en alliage de plomb contenant la matière active ; plusieurs plaques en parallèle = plus de performances</td></tr>
<tr><td>4</td><td>Bac (plastique moulé)</td><td>Cloisons séparant les éléments, tasseaux supportant les plaques</td></tr>
<tr><td>5</td><td>Séparateur</td><td>Plaque plastique perméable qui isole les plaques entre elles</td></tr>
<tr><td>7</td><td>Bouchon</td><td>Évacue les gaz et retient l’électrolyte</td></tr>
<tr><td>8</td><td>Bornes (plomb)</td><td>Borne − petit diamètre, borne + gros diamètre</td></tr></table></div>`
  });

  REV.extendLesson('equip/demarreur', {
    images: [im('dem-circuit', 'Circuit de démarrage : partie commande (contacteur antivol, relais) et alimentation en puissance'),
      im('dem-main-droite', 'Règle de la main droite : champ, courant, chemin (loi de Laplace)'),
      im('dem-coupe', 'Démarreur à commande positive : 1 carcasse · 2 inducteur · 3 induit · 4 collecteur · 5 balais · 6 rondelle porte-balais · 7 lanceur · 8 nez · 9 noyau et fourchette · 10 frein d’induit · 11 contacteur électromagnétique'),
      im('dem-ensemble', 'Ensemble démarreur : solénoïde (appel + maintien), fourchette, lanceur à roue libre, moteur électrique'),
      im('dem-inducteur', 'Inducteur : bobinages + masses polaires sur la carcasse (électro-aimant)'),
      im('dem-induit', 'Induit : collecteur, tambour, bobinage'),
      im('dem-collecteur-balais', 'Collecteur et balais'),
      im('dem-solenoide', 'Solénoïde : plongeur, enroulement d’appel, enroulement de maintien, contact'),
      im('dem-schema-principe', 'Schéma de principe : contact de puissance, enroulement d’appel, enroulement de maintien, inducteur, induit'),
      im('dem-controle-solenoide', 'Contrôle du solénoïde : 1 appel (− sur DEM) · 2 maintien (− sur la carcasse) · 3 lame de contact (− sur BAT)'),
      im('dem-controle-inducteur', 'Contrôle de l’inducteur à l’ohmmètre'),
      im('dem-controle-induit', 'Contrôle de l’induit à l’ohmmètre'),
      im('dem-controle-lames', 'Contrôle coupure : mesure entre deux lames du collecteur'),
      im('dem-grognard', 'Contrôle court-circuit de l’induit au grognard (lame de scie)')],
    html: `
<h3>Le livre AGA 01 en résumé</h3>
<ul><li><b>Rôle</b> : lancer le moteur à une vitesse suffisante pour obtenir les premières combustions (≈ 80 à 200 tr/min selon le moteur).</li>
<li><b>Moteur série</b> : couple élevé, l’intensité (300 à 500 A) et donc le couple augmentent avec l’effort à vaincre. Rapport démarreur / moteur : 10 à 20.</li>
<li><b>Principe (loi de Laplace)</b> : un conducteur parcouru par un courant dans un champ magnétique se déplace (F = B × I × L). Sens : règle de la main droite ; inverser UN seul paramètre (champ ou courant) inverse le sens.</li></ul>
<div class="tw"><table><tr><th>Élément</th><th>Rôle</th></tr>
<tr><td>Nez / support lanceur (8)</td><td>Fixe le démarreur sur le moteur, guide l’arbre d’induit</td></tr>
<tr><td>Lanceur (7)</td><td>Transmet la rotation au moteur thermique ; roue libre</td></tr>
<tr><td>Induit (3) + collecteur (4)</td><td>Donne la rotation ; le collecteur alimente les spires avec les balais (lames isolées)</td></tr>
<tr><td>Inducteur (2) + carcasse (1)</td><td>Crée le champ magnétique (électro-aimant parcouru par le courant d’excitation)</td></tr>
<tr><td>Balais (5) + porte-balais (6)</td><td>Alimentent l’induit ; retour à la masse de l’enroulement d’appel ; balai + isolé</td></tr>
<tr><td>Contacteur électromagnétique / solénoïde (11)</td><td>Déplace la fourchette (engrène le lanceur) et ferme le contact de puissance ; en série avec inducteur et induit</td></tr>
<tr><td>Noyau et fourchette (9)</td><td>Translation du lanceur et rappel en fin de démarrage</td></tr>
<tr><td>Frein d’induit (10)</td><td>Freine l’induit dès qu’on relâche la clé</td></tr></table></div>
<h3>Dépannage (AGA 01)</h3>
<ul><li>Clé actionnée, rien ne se passe → contacteur électromagnétique. Bruit de « mitraillette », moteur ne tourne pas → <b>enroulement de maintien coupé</b>.</li>
<li>Contrôle solénoïde : − sur DEM → le relais s’enclenche (appel) ; − sur la carcasse, appuyer → reste enclenché (maintien) ; − sur BAT → reste enclenché (lame de contact).</li>
<li>Tout bobinage : isolement (∞ = bon), coupure, court-circuit (valeur constructeur). Induit : même valeur entre chaque paire de lames.</li>
<li>Balais : coulissent librement, ni gras ni humides, usure &lt; 60 % de la longueur.</li></ul>`,
    retenir: ['Solénoïde = fonction mécanique (lanceur) + fonction électrique (contact de puissance).', 'Maintien coupé = claquements (« mitraillette »).', 'Grognard : la lame de scie ne vibre pas = pas de court-circuit.']
  });

  REV.extendLesson('equip/alternateur', {
    images: [im('alt-circuit', 'Circuit de charge : 1 régulateur · 2 alternateur · 3 prise de force · 4 batterie · 5 clé · 6 lampe témoin · 7 informations spécifiques'),
      im('alt-principe', 'Principe : magnétisme + mouvement = électricité (loi de Lenz)'),
      im('alt-fonctionnement', 'Le rotor (électro-aimant) tourne dans le stator (conducteur) : production de courant'),
      im('alt-poles', 'Pôles nord et sud alternés sur le rotor'),
      im('alt-triphase', '3 bobinages décalés de 120° : courant triphasé'),
      im('alt-redressement-1', 'Redressement : 3 diodes positives, 3 diodes négatives'),
      im('alt-redressement-2', 'Redressement : l’alternance inverse sort par une autre diode, le sens dans la batterie ne change pas'),
      im('alt-tension-redressee', 'Tension redressée des 3 phases (presque continue)'),
      im('alt-regulation', 'Régulation : mesurer U, comparer (13,5 V < U < 15 V), agir sur l’excitation'),
      im('alt-eclate', 'Éclaté : poulie, ventilateur, flasques, roulements, induit, inducteur, porte-diodes, porte-balais'),
      im('alt-rotor', 'Rotor (inducteur) : masses polaires à griffes, bobinage, bagues collectrices'),
      im('alt-stator', 'Stator (induit) : carcasse feuilletée + bobinages'),
      im('alt-couplages', 'Couplage du stator : triangle (le plus courant) ou étoile'),
      im('alt-porte-diodes', 'Pont de diodes sur profilé aluminium (refroidissement)'),
      im('alt-types-diodes', 'Types de diodes : bouton, press-fit, trio (25 à 32 A)'),
      im('alt-multifonction', 'Régulateur multifonction : la lampe s’allume en cas de décharge ET de surcharge'),
      im('alt-6d-regulateur-separe', 'Alternateur 6 diodes à régulateur séparé (régulateur à palette + voltmètre thermique)'),
      im('alt-9d', 'Alternateur 9 diodes à régulateur incorporé : 3 diodes trio, pré-excitation par la lampe témoin (borne L)'),
      im('alt-6d-regulateur-incorpore', 'Alternateur 6 diodes à régulateur incorporé : entrées L (lampe, signalisation de défaut) et + (excitation dès le contact)'),
      im('alt-controle-rotor-coupure', 'Contrôle rotor : coupure et court-circuit (une touche sur chaque bague)'),
      im('alt-controle-rotor-isolement', 'Contrôle rotor : isolement (une bague et la carcasse → ∞)'),
      im('alt-controle-stator-isolement', 'Contrôle stator : isolement'),
      im('alt-controle-stator-coupure', 'Contrôle stator en étoile : coupure (l’ohmmètre ne doit pas indiquer l’infini)'),
      im('alt-controle-porte-balais', 'Contrôle du porte-balais')],
    html: `
<h3>Le livre AGA 01 en résumé</h3>
<ul><li><b>Rôle</b> : moteur tournant, alimenter les récepteurs et recharger la batterie. Ce sont les récepteurs qui déterminent le débit.</li>
<li><b>Principe (loi de Lenz)</b> : une variation de flux magnétique dans un circuit fermé crée un courant induit sinusoïdal. 3 bobinages décalés de 120° → triphasé.</li>
<li><b>Régulation</b> autour de 14 V : sous 13,5 V l’inducteur est relié à la masse ; au-dessus de 15 V la masse de l’inducteur est coupée → plus de champ → la tension baisse. Le régulateur diminue l’intensité moyenne d’excitation. 12 V : 13,5 à 15 V ; 24 V : 28 à 29,5 V.</li></ul>
<div class="tw"><table><tr><th>Élément</th><th>Rôle</th></tr>
<tr><td>Rotor = inducteur</td><td>Crée le champ (électro-aimant) ; parcouru par le courant d’excitation via balais et bagues ; 12 pôles en général</td></tr>
<tr><td>Stator = induit</td><td>Siège de la f.e.m. alternative induite ; 3 bobinages, couplage triangle (le plus courant) ou étoile</td></tr>
<tr><td>Pont de diodes</td><td>Redresser ; éventuellement fournir l’excitation (trio) ; empêcher la batterie de se décharger dans le stator</td></tr>
<tr><td>Porte-balais / régulateur</td><td>Balais sur les bagues, équilibre thermique, amorçage, info de charge, régulation</td></tr>
<tr><td>Flasques · poulie · ventilateur</td><td>Assemblage et guidage · entraînement · refroidissement (surtout le pont de diodes)</td></tr>
<tr><td>Condensateur</td><td>Évite le clignotement de la lampe, lisse le courant</td></tr></table></div>
<h3>Les différents alternateurs</h3>
<div class="tw"><table><tr><th>Type</th><th>Excitation / amorçage</th><th>Lampe témoin</th></tr>
<tr><td>6 diodes, régulateur séparé</td><td>Rotor alimenté contact mis par le régulateur (palette 1 → 0 → 2)</td><td>Voltmètre thermique ou lampe de défaut</td></tr>
<tr><td>9 diodes, régulateur incorporé (1 borne)</td><td>Amorçage par la lampe témoin (3 W), puis par les 3 diodes trio ; sinon champ rémanent (il faut monter en régime)</td><td>S’éteint quand la tension trio = tension batterie ; lampe HS = pas d’amorçage</td></tr>
<tr><td>6 diodes, régulateur incorporé (bornes L et +)</td><td>Pas de trio : le + alimente l’inducteur dès le contact mis</td><td>Gérée par l’entrée L (sous-tension et surtension), 1,2 W</td></tr>
<tr><td>12 diodes</td><td>6 × 2 diodes de redressement en parallèle</td><td>Pour les grosses puissances</td></tr>
<tr><td>8 diodes</td><td>Montage étoile avec reprise du point milieu</td><td></td></tr></table></div>
<h3>6 ou 12 diodes : la différence</h3>
<p>Un pont de 6 diodes a 2 diodes par phase (3 positives + 3 négatives). Le 12 diodes double chaque diode (6 × 2 en parallèle) : le courant de chaque phase se partage entre 2 diodes → l’alternateur peut débiter plus d’ampères (grosses puissances, poids lourds), chaque diode chauffe moins et le pont est plus fiable. La tension de charge est la même.</p>
<h3>Contrôles (AGA 01)</h3>
<ul><li>Rotor : coupure et court-circuit entre les 2 bagues (valeur constructeur) ; isolement bague / carcasse = ∞. Bagues creusées ou grasses → remplacer bagues et balais.</li>
<li>Stator : isolement = ∞ ; coupure et court-circuit : lectures identiques entre phases.</li>
<li>Diodes : correcte = passe dans un seul sens ; coupée = bloque dans les 2 sens ; en court-circuit = passe dans les 2 sens. Diodes sorties de leur logement = batterie ou chargeur inversé, ou soudure à l’arc alternateur branché.</li>
<li>Précautions : jamais tourner rotor alimenté sans batterie ; débrancher l’alternateur pour charger ou souder.</li></ul>`,
    retenir: ['Alternateur : rotor = inducteur (champ), stator = induit (courant).', '9 diodes : amorçage par la lampe ; 6 diodes à régulateur incorporé : par le + après contact.', '12 diodes = 6 × 2 en parallèle pour les grosses puissances.']
  });

  REV.extendLesson('equip/allumage', {
    images: [im('all-classique', 'Allumage classique : batterie, bobine, rupteur, condensateur, distributeur, bougies'),
      im('all-bobine', 'Bobine d’allumage en coupe : primaire, secondaire, noyau'),
      im('all-principe-bobine', 'Principe : le rupteur coupe le primaire → variation de flux → haute tension au secondaire'),
      im('all-distributeur', 'Distributeur : le doigt envoie la HT à la bougie du cylindre concerné'),
      im('all-bougie', 'La bougie et ses éléments'),
      im('all-gamme-thermique', 'Gamme thermique des bougies : de la plus chaude à la plus froide'),
      im('all-angle-came', 'Angle de came (fermeture) et ouverture du rupteur'),
      im('all-saturation', 'Saturation de la bobine pendant la fermeture (90° pour 4 cylindres)'),
      im('all-avance-centrifuge', 'Correcteur d’avance centrifuge (fonction du régime)'),
      im('all-avance-depression', 'Correcteur d’avance à dépression (fonction de la charge)'),
      im('all-transistorise', 'Allumage transistorisé : module, capteur inductif, bobine, distributeur'),
      im('all-module', 'Module transistorisé : mise en forme (T1-T2), angle de came, amplification (T3-T4), puissance (T5-T5′)')],
    html: `
<h3>Allumage transistorisé (AGA 01)</h3>
<ul><li><b>Module transistorisé</b> : même rôle que le rupteur (charger la bobine, provoquer la variation de flux). Transistor <b>NPN</b> : impulsion positive sur la base → il conduit → la bobine se charge ; plus d’impulsion → il bloque → coupure franche du primaire → haute tension au secondaire.</li>
<li>Étages : mise en forme (signal rectangulaire), angle de came (temps de conduction adapté au régime), amplification, puissance (souvent un Darlington).</li>
<li>Bobine transistorisée : 7 à 8 A au primaire (au lieu de 4 A), primaire ≈ 1,5 Ω (au lieu de 3 Ω), ≈ 25 000 V (au lieu de 18 000 V) : elle est différente d’une bobine classique.</li>
<li>Avantages : plus de HT, HT constante à haut régime, jusqu’à 21 000 étincelles/min, pas d’usure de rupteur. Inconvénient : avance toujours mécanique.</li></ul>`
  });

  REV.extendLesson('equip/capteurs', {
    images: [im('cap-inductif', 'Capteur (générateur) inductif : aimant permanent, bobine inductive, roue polaire'),
      im('cap-inductif-fonctionnement', 'Fonctionnement du générateur à impulsions : la variation d’entrefer crée une tension alternative'),
      im('cap-hall-allumeur', 'Capteur à effet Hall d’un allumeur : écrans, aimant, C.I. Hall, entrefer'),
      im('cap-effet-hall', 'Effet Hall : courant Iv + champ B → tension Hall UH'),
      im('cap-barriere-hall', 'Barrière Hall : a) flux direct, b) flux court-circuité par l’écran')],
    html: `
<h3>Capteurs de l’allumage (AGA 01)</h3>
<div class="tw"><table><tr><th>Capteur</th><th>Constitution</th><th>Fonctionnement</th><th>Signal</th></tr>
<tr><td>Inductif (générateur à induction magnétique)</td><td>Roue polaire (autant de branches que de cylindres), aimant permanent, bobine inductive</td><td>La rotation fait varier l’entrefer donc le flux → tension induite alternative ; l’allumage a lieu quand le rotor s’éloigne du stator</td><td>Alternatif, crête de 0,5 V (bas régime) à 100 V (haut régime) ; capteur actif (pas d’alimentation)</td></tr>
<tr><td>Effet Hall (barrière Hall)</td><td>C.I. Hall + aimant, rotor à écrans (autant d’écrans que de cylindres)</td><td>Entrefer libre : tension Hall présente. Écran dans l’entrefer : champ court-circuité, tension Hall nulle → le C.I. envoie 5 V à la base du transistor → la bobine se charge</td><td>Carré d’amplitude fixe (5 V) ; alimenté, fonctionne dès 0 tr/min</td></tr></table></div>`,
    retenir: ['Inductif : alternatif, amplitude qui augmente avec la vitesse, pas d’alimentation.', 'Hall : carré 5 V d’amplitude fixe, alimenté.']
  });

  var Q = [
    ['batterie', 'bat-description', 'Sur cette batterie, quel est le rôle du séparateur (5) ?', 'Isoler les plaques positives et négatives entre elles tout en restant perméable', 'Relier les éléments en série', 'Évacuer les gaz'],
    ['batterie', 'bat-description', 'Comment reconnaît-on la borne + d’une batterie ?', 'Elle a le plus gros diamètre', 'Elle a le plus petit diamètre', 'Elle est toujours à gauche'],
    ['demarreur', 'dem-coupe', 'Sur cette coupe, quel élément crée le champ magnétique (2) ?', 'L’inducteur', 'L’induit', 'Le lanceur'],
    ['demarreur', 'dem-coupe', 'Rôle du lanceur (7) ?', 'Transmettre la rotation au moteur thermique et assurer la roue libre', 'Freiner l’induit', 'Créer le champ magnétique'],
    ['demarreur', 'dem-coupe', 'Rôle du frein d’induit (10) ?', 'Freiner l’induit dès que l’on relâche la clé', 'Bloquer le lanceur engrené', 'Limiter l’intensité'],
    ['demarreur', 'dem-solenoide', 'Le solénoïde (contacteur électromagnétique) assure :', 'Le déplacement du lanceur (fonction mécanique) et la mise sous tension du moteur (fonction électrique)', 'Uniquement la roue libre', 'La recharge de la batterie'],
    ['demarreur', 'dem-schema-principe', 'Quel enroulement est court-circuité quand le contact de puissance est fermé ?', 'L’enroulement d’appel', 'L’enroulement de maintien', 'L’inducteur'],
    ['demarreur', 'dem-controle-solenoide', 'Contrôle du solénoïde : on met le − sur DEM, que contrôle-t-on ?', 'L’enroulement d’appel (le relais doit s’enclencher)', 'L’enroulement de maintien', 'La lame de contact'],
    ['demarreur', 'dem-grognard', 'À quoi sert le grognard (avec la lame de scie) ?', 'Détecter un court-circuit dans l’induit (la lame ne doit pas vibrer)', 'Mesurer l’isolement de l’inducteur', 'Contrôler l’usure des balais'],
    ['demarreur', 'dem-main-droite', 'Pour inverser le sens de rotation d’un moteur électrique, il faut :', 'Changer un seul paramètre : le sens du champ OU celui du courant', 'Changer le champ ET le courant', 'Augmenter la tension'],
    ['alternateur', 'alt-coupe', null],
    ['alternateur', 'alt-rotor', 'Dans un alternateur, le rotor est :', 'L’inducteur : il crée le champ magnétique', 'L’induit : il produit le courant', 'Le pont de diodes'],
    ['alternateur', 'alt-stator', 'Dans un alternateur, le stator est :', 'L’induit : siège de la force électromotrice alternative', 'L’inducteur : il crée le champ', 'Le régulateur'],
    ['alternateur', 'alt-redressement-1', 'Combien de diodes de redressement comporte un pont triphasé simple ?', '6 (3 positives + 3 négatives)', '4', '3'],
    ['alternateur', 'alt-regulation', 'Comment le régulateur limite-t-il la tension de l’alternateur ?', 'En coupant / diminuant le courant d’excitation du rotor', 'En coupant la sortie B+ de l’alternateur', 'En débranchant la batterie'],
    ['alternateur', 'alt-9d', 'Alternateur 9 diodes : comment se fait l’amorçage au démarrage ?', 'Par la lampe témoin, puis les diodes trio prennent le relais', 'Par le + après contact directement sur l’inducteur', 'Par la batterie à travers les diodes de puissance'],
    ['alternateur', 'alt-6d-regulateur-incorpore', 'Alternateur 6 diodes à régulateur incorporé : rôle de l’entrée + ?', 'Amorcer et alimenter l’inducteur dès que le contact est mis', 'Allumer la lampe témoin', 'Recharger la batterie'],
    ['alternateur', 'alt-couplages', 'Quel couplage du stator est le plus rencontré sur les véhicules ?', 'Le triangle', 'L’étoile', 'Le monophasé'],
    ['alternateur', 'alt-controle-rotor-isolement', 'Contrôle d’isolement du rotor (une bague et la carcasse) : valeur correcte ?', 'L’infini', '0 Ω', 'La valeur constructeur de la bobine'],
    ['alternateur', 'alt-types-diodes', 'Une diode laisse passer le courant dans les deux sens : elle est…', 'En court-circuit', 'Coupée', 'Correcte'],
    ['alternateur', 'alt-porte-diodes', 'Que signifie un alternateur à 12 diodes ?', '6 × 2 diodes de redressement en parallèle, pour les grosses puissances', '6 diodes de redressement + 6 diodes trio', 'Un montage étoile avec reprise du point milieu'],
    ['allumage', 'all-classique', 'Dans l’allumage classique, quand naît l’étincelle ?', 'À l’ouverture du rupteur (coupure brutale du primaire)', 'À la fermeture du rupteur', 'Quand le condensateur se charge'],
    ['allumage', 'all-transistorise', 'Dans l’allumage transistorisé, quel élément remplace le rupteur ?', 'Le module transistorisé (transistor NPN)', 'Le capteur inductif', 'Le distributeur'],
    ['allumage', 'all-transistorise', 'Dans l’allumage transistorisé, quel élément remplace la came de l’allumeur ?', 'Le générateur (capteur inductif ou Hall)', 'Le module transistorisé', 'La bobine'],
    ['allumage', 'all-module', 'Quand le transistor NPN du module reçoit une impulsion positive sur sa base :', 'Il conduit : la bobine se charge', 'Il bloque : l’étincelle jaillit', 'Il inverse le courant du primaire'],
    ['allumage', 'all-gamme-thermique', 'Une bougie est classée selon :', 'Sa gamme thermique (de la plus chaude à la plus froide)', 'Sa tension de claquage', 'Le nombre de cylindres'],
    ['capteurs', 'cap-inductif', 'Le générateur inductif est composé de :', 'Une roue polaire, un aimant permanent et une bobine inductive', 'Un C.I. Hall et un rotor à écrans', 'Une résistance CTN'],
    ['capteurs', 'cap-inductif-fonctionnement', 'Le signal d’un capteur inductif est :', 'Alternatif, d’amplitude qui augmente avec la vitesse (0,5 V à 100 V)', 'Carré de 5 V d’amplitude fixe', 'Continu'],
    ['capteurs', 'cap-barriere-hall', 'Capteur Hall : quand l’écran passe dans l’entrefer…', 'Le champ est court-circuité, la tension Hall s’annule et le C.I. envoie 5 V', 'La tension Hall devient maximale', 'La bobine inductive produit une tension alternative'],
    ['capteurs', 'cap-effet-hall', 'L’effet Hall : une plaquette parcourue par un courant et traversée par un champ magnétique produit…', 'Une tension Hall (de l’ordre du millivolt)', 'Un courant alternatif fort', 'Une variation de résistance avec la température']
  ];
  var qs = [];
  Q.forEach(function (x) {
    if (!x[2]) return;
    qs.push({ l: x[0], img: A + x[1] + '.jpg', q: x[2], c: [x[3], x[4], x[5]], e: x[3] + '. (' + SRC + ')', src: SRC });
  });
  REV.addExercises('equip', { lessons: [], questions: qs });
})();
