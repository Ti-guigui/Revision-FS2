/* Équipement électrique : cours scannés « Multiplexage » (surtout le CAN HS), « Diagnostic CAN HS » et « Capteurs »
   (fonctionnement de chaque capteur, différence entre capteurs actifs et passifs). */
(function () {
  var F = 'fiches/';
  function im(src, cap) { return { src: F + src + '.jpg', cap: cap }; }

  REV.extendLesson('equip/can', {
    images: [
      im('can-ls-hs-tableau', 'CAN LS et CAN HS : débit, nœuds, courant, niveaux dominant (NL0) et récessif (NL1)'),
      im('can-hs-lecture-trame', 'Lecture d’une trame CAN HS : NL0 = 3,5 V / 1,5 V (écart 2 V) ; NL1 = 2,5 V / 2,5 V (écart 0 V)'),
      im('can-interface-nl0', 'Interface CAN, NL0 : 3,5 − 1,5 = 2 V, amplifié × 2,5 = 5 V'),
      im('can-interface-nl1', 'Interface CAN, NL1 : 2,5 − 2,5 = 0 V, amplifié × 2,5 = 0 V'),
      im('can-hs-diag-h', 'Test de tension CAN H : voltmètre entre la broche 6 et la masse (broche 4), véhicule sous tension → 2,6 V'),
      im('can-hs-diag-l', 'Test de tension CAN L : voltmètre entre la broche 14 et la masse (broche 4), véhicule sous tension → 2,4 V'),
      im('can-hs-diag-ligne', 'Test de tension de la ligne : voltmètre entre les broches 6 et 14, véhicule sous tension → 0,5 V'),
      im('can-hs-diag-resistance', 'Test de résistance du bus : ohmmètre entre les broches 6 et 14, véhicule hors tension → 60 Ω'),
      im('can-multiplexage-temporel', 'Multiplexage temporel : plusieurs informations sur un même câble, à tour de rôle'),
      im('can-signal-numerique', 'Signal analogique et signal numérique (1 = 5 V, 0 = 0 V)'),
      im('can-rapport-cyclique', 'Rapport cyclique : D = 100 % = 12 V ; 90 % = 10,8 V ; 50 % = 6 V'),
      im('can-formes-ondes', 'Formes d’ondes : sinusoïdal, rectangulaire, triangulaire, en dent de scie')],
    html: `
<h3>Pourquoi le multiplexage</h3>
<ul><li>L’électronique automobile évolue sans cesse : exigences de <b>pollution</b>, <b>sécurité</b> et <b>confort</b>, options en cours de vie du véhicule.</li>
<li>Conséquence : plus de <b>calculateurs</b>, plus de <b>capteurs</b>, plus de <b>faisceaux</b> électriques.</li>
<li><b>Multiplexage temporel</b> : une multitude d’informations circule sur <b>un même câble (le bus)</b> entre les calculateurs, qui communiquent <b>à tour de rôle</b> (multiplexage à l’émission, démultiplexage à la réception).</li></ul>
<h3>Les signaux</h3>
<ul><li><b>Analogique</b> : l’amplitude peut prendre une <b>infinité de valeurs</b> dans un intervalle donné.</li>
<li><b>Numérique</b> : une suite de bits : <b>1 = 5 V</b>, <b>0 = 0 V</b>.</li>
<li><b>Bit</b> (Binary Digit) = 1 caractère, 1 ou 0 · <b>Byte</b> = 8 bits · <b>1 octet</b> = 1 byte = 8 bits.</li>
<li>Formes d’ondes : sinusoïdal, rectangulaire, triangulaire, en dent de scie.</li>
<li><b>Rapport cyclique</b> D : part du temps où le signal est à l’état haut. Sous 12 V : D = 100 % → 12 V ; D = 90 % → 10,8 V ; D = 50 % → 6 V (tension moyenne = D × tension).</li></ul>
<h3>CAN LS et CAN HS</h3>
<div class="tw"><table><tr><th>Paramètre</th><th>CAN LS</th><th>CAN HS</th></tr>
<tr><td>Débit</td><td>125 kb/s</td><td><b>125 kb/s à 1 Mb/s</b></td></tr>
<tr><td>Nœuds sur le bus</td><td>2 à 20</td><td><b>2 à 30</b></td></tr>
<tr><td>Courant de sortie (émission)</td><td>&gt; 1 mA sur 2,2 kΩ</td><td><b>25 à 50 mA sur 60 Ω</b></td></tr>
<tr><td>Dominant (NL0)</td><td>H = 4 V · L = 1 V</td><td><b>H = 3,5 V · L = 1,5 V</b></td></tr>
<tr><td>Récessif (NL1)</td><td>H = 1,75 V · L = 3,25 V</td><td><b>H = 2,5 V · L = 2,5 V</b></td></tr>
<tr><td>Câble</td><td>30 pF entre les câbles de ligne</td><td><b>2 × 120 Ω</b></td></tr>
<tr><td>Alimentation</td><td>5 V</td><td>5 V</td></tr></table></div>
<ul><li>Si deux nœuds émettent en même temps, le <b>NL0 s’impose</b> sur le NL1 : NL0 = état <b>dominant</b>, NL1 = état <b>récessif</b>.</li></ul>
<h3>CAN HS : lecture d’une trame</h3>
<ul><li>CAN H : NL0 = <b>3,5 V</b> · NL1 = <b>2,5 V</b>. CAN L : NL0 = <b>1,5 V</b> · NL1 = <b>2,5 V</b>.</li>
<li>La ligne est chargée à <b>5 V</b> : H + L = 3,5 + 1,5 = 2,5 + 2,5 = 5 V.</li>
<li>Niveau logique = H − L : NL0 → 3,5 − 1,5 = <b>2 V</b> ; NL1 → 2,5 − 2,5 = <b>0 V</b>.</li>
<li><b>Interface CAN</b> (amplificateur différentiel) : elle fait H − L puis amplifie × 2,5 → NL0 : 2 V × 2,5 = <b>5 V</b> ; NL1 : 0 V × 2,5 = <b>0 V</b>.</li></ul>
<h3>Diagnostic CAN HS à la prise OBD</h3>
<p>Broche <b>6 = CAN H</b> · broche <b>14 = CAN L</b> · broches <b>4 et 5 = masse</b> · broche <b>16 = + batterie</b>.</p>
<h3>Valeurs données ≠ valeurs lues au voltmètre</h3>
<div class="tw"><table><tr><th></th><th>Valeurs données (sur la trame, à l’oscilloscope)</th><th>Valeurs lues au voltmètre (prise OBD, sous tension)</th></tr>
<tr><td><b>CAN H</b></td><td>3,5 V = bit 0 (dominant) · 2,5 V = bit 1 (récessif)</td><td>Entre <b>2,4 et 3,2 V</b> (broche 6 / masse), ex. 2,6 V</td></tr>
<tr><td><b>CAN L</b></td><td>2,5 V = bit 1 (récessif) · 1,5 V = bit 0 (dominant)</td><td>Entre <b>1,8 et 2,6 V</b> (broche 14 / masse), ex. 2,4 V</td></tr>
<tr><td><b>Entre H et L</b></td><td>2 V (bit 0) ou 0 V (bit 1)</td><td><b>0,5 à 0,7 V</b> (jusqu’à 0,9 V) ; <b>au-dessus de 0,9 V ou 1 V = réseau saturé</b></td></tr></table></div>
<p><b>Pourquoi ce n’est pas pareil ?</b> Les bits changent des milliers de fois par seconde : le voltmètre ne peut pas les suivre et affiche une <b>moyenne</b> entre les deux niveaux. CAN H se lit donc un peu au-dessus de 2,5 V, CAN L un peu en dessous. Les vraies valeurs 3,5 / 2,5 / 1,5 V ne se voient qu’à l’<b>oscilloscope</b>.</p>
<div class="tw"><table><tr><th>Test</th><th>Appareil et condition</th><th>Entre</th><th>Valeur</th></tr>
<tr><td>Tension CAN H</td><td>Voltmètre, véhicule <b>sous tension</b></td><td>6 et 4</td><td><b>2,6 V</b></td></tr>
<tr><td>Tension CAN L</td><td>Voltmètre, véhicule <b>sous tension</b></td><td>14 et 4</td><td><b>2,4 V</b></td></tr>
<tr><td>Tension de la ligne</td><td>Voltmètre, véhicule <b>sous tension</b></td><td>6 et 14</td><td><b>0,5 V</b></td></tr>
<tr><td>Résistance du bus</td><td>Ohmmètre, véhicule <b>hors tension</b></td><td>6 et 14</td><td><b>60 Ω</b> (2 × 120 Ω en parallèle)</td></tr></table></div>
<h3>Architecture du VLTP-NP (VT4)</h3>
<ul><li><b>CAN</b> (Control Area Network) : HS-CAN1, HS-CAN2 et HS-CAN3 = haute vitesse, <b>500 kbit/s</b> ; MS-CAN = vitesse moyenne, <b>125 kbit/s</b>.</li>
<li><b>LIN</b> (Local Interconnect Network) : ≈ <b>20 kbit/s</b> maxi.</li></ul>`,
    retenir: ['CAN HS : 125 kb/s à 1 Mb/s, 2 à 30 nœuds, 5 V, 2 × 120 Ω.', 'NL0 (dominant) : H 3,5 V / L 1,5 V → H − L = 2 V ; NL1 (récessif) : 2,5 / 2,5 → 0 V. H + L = 5 V.', 'En cas d’émission simultanée, le NL0 s’impose.', 'OBD sous tension : 6-4 = 2,6 V · 14-4 = 2,4 V · 6-14 = 0,5 V ; hors tension : 6-14 = 60 Ω.', 'Valeurs données : H 3,5 / 2,5 V · L 2,5 / 1,5 V. Au voltmètre : H 2,4 à 3,2 V · L 1,8 à 2,6 V · H−L 0,5 à 0,9 V.'],
    pieges: ['La résistance du bus se mesure véhicule HORS tension ; les tensions, véhicule SOUS tension.', 'CAN LS : au récessif, CAN H (1,75 V) est plus bas que CAN L (3,25 V).']
  });

  REV.extendLesson('equip/lin', {
    images: [im('lin-pcm-alternateur', 'Bus LIN : le PCM (maître, passerelle avec le HS-CAN1) pilote l’alternateur (esclave) d’après le capteur de courant')],
    html: `
<h3>Bus LIN du VLTP-NP</h3>
<ul><li>Un bus LIN = <b>un maître</b> LIN, un ou plusieurs <b>esclaves</b> et la ligne de données. Le maître (ici le <b>PCM</b>) sert de <b>passerelle</b> avec le réseau CAN (<b>HS-CAN1</b>).</li>
<li>L’alternateur (esclave) est piloté par le PCM en fonction de l’intensité et de la tension relevées par le <b>capteur de courant</b> : forte consommation ou batteries déchargées → le PCM <b>augmente</b> la tension de régulation ; batteries chargées → il la <b>réduit</b>.</li></ul>`,
    retenir: ['VLTP-NP : PCM = maître LIN et passerelle avec le HS-CAN1 ; alternateur = esclave.']
  });

  REV.extendLesson('equip/capteurs', {
    images: [
      im('cap-synoptique', 'Capteurs → calculateur → actionneurs'),
      im('cap-contacteur', 'Contacteur : signal binaire 0 ou 1, style interrupteur'),
      im('cap-ctn', 'CTN : T° ↑ → R ↓ (ohmmètre, ou voltmètre si branché)'),
      im('cap-ctp', 'CTP : T° ↑ → R ↑ (ohmmètre, ou voltmètre si branché)'),
      im('cap-potentiometre', 'Potentiomètre : signal linéaire croissant, double piste, contacteur pied levé / pied à fond'),
      im('cap-capacitif', 'Capteur capacitif : pression ↑ → signal ↑ (voltmètre)'),
      im('cap-inductif-slide', 'Capteur inductif : sinusoïde de fréquence et d’amplitude variables'),
      im('cap-inductif-lenz', 'Principe de l’inductif (loi de Lenz) : période et fréquence'),
      im('cap-hall-slide', 'Capteur à effet Hall : 5 V, sortie, masse ; signal carré d’amplitude fixe'),
      im('cap-hall-principe', 'Principe de l’effet Hall : plaquette de silicium, courant, champ magnétique → faible ddp'),
      im('cap-piezo-resistif', 'Capteur piézo-résistif : tension proportionnelle à la pression'),
      im('cap-piezo-principe', 'Piézo-résistivité (la résistance change) et piézo-électricité (une ddp apparaît)'),
      im('cap-wheatstone', 'Pont de Wheatstone : équilibré quand la ddp entre A et B est nulle'),
      im('cap-piezo-electrique', 'Capteur piézo-électrique : pics de tension sur chocs (oscilloscope)'),
      im('cap-debitmetre', 'Débitmètre à film chaud : +12 V, signal, masse'),
      im('cap-lambda', 'Sonde lambda : riche ≈ 900 mV, pauvre ≈ 100 mV ; résistance chauffante 12 V'),
      im('cap-opto', 'Capteur opto-électrique : +12 V, 2 signaux, masse ; signal carré'),
      im('cap-opto-principe', 'Principe opto-électrique : émetteur et récepteur infrarouge, roue phonique')],
    html: `
<h3>Capteurs actifs et capteurs passifs</h3>
<div class="tw"><table><tr><th></th><th>Capteur ACTIF</th><th>Capteur PASSIF</th></tr>
<tr><td>Alimentation</td><td><b>Aucune</b> : il fabrique lui-même sa tension, il se comporte comme un <b>générateur</b></td><td><b>Doit être alimenté</b> par le calculateur (le plus souvent en <b>5 V</b>, parfois 12 V)</td></tr>
<tr><td>Principe</td><td>Un phénomène physique crée directement une tension : variation de flux magnétique (inductif), choc ou pression (piézo-électrique)</td><td>Le capteur fait varier une grandeur (résistance, capacité, conduction…) : la tension d’alimentation renvoyée au calculateur change</td></tr>
<tr><td>Fils</td><td>2 fils (1 et 2)</td><td>3 fils le plus souvent : <b>alimentation · signal · masse</b></td></tr>
<tr><td>Exemples</td><td><b>Inductif, piézo-électrique</b></td><td><b>CTN, CTP, potentiomètre, capacitif, piézo-résistif, effet Hall</b> ; alimentés en +12 V : opto-électrique, débitmètre</td></tr>
<tr><td>Contrôle</td><td>Ohmmètre (résistance, isolement) ; en fonctionnement voltmètre alternatif ou oscilloscope</td><td>Contrôler d’abord l’alimentation et la masse, puis le signal (≈ 4,80 V capteur débranché : pull-up)</td></tr></table></div>
<ul><li>Pour la rotation, les deux existent : <b>inductif = actif</b>, sinusoïde dont la fréquence <b>et l’amplitude</b> varient avec la vitesse ; <b>effet Hall = passif</b>, carré dont seule la fréquence varie (amplitude fixe, 5 V).</li>
<li>Certains capteurs inductifs peuvent être alimentés.</li>
<li>La sonde lambda génère elle aussi sa tension de signal (couche de platine) ; seule sa résistance chauffante est alimentée en +12 V.</li></ul>
<h3>Fonctionnement de chaque capteur</h3>
<div class="tw"><table><tr><th>Capteur</th><th>Fonctionnement</th><th>Signal</th><th>Contrôle</th></tr>
<tr><td>Contacteur</td><td>Style « interrupteur »</td><td>Binaire 0 ou 1</td><td>Ohmmètre (voltmètre si branché)</td></tr>
<tr><td>CTN</td><td>Résistance variable à Coefficient de Température Négatif : T° ↑ → R ↓</td><td>Décroissant</td><td>Ohmmètre en chauffant (voltmètre si branché)</td></tr>
<tr><td>CTP</td><td>Résistance variable à Coefficient de Température Positif : T° ↑ → R ↑</td><td>Croissant</td><td>Ohmmètre en chauffant (voltmètre si branché)</td></tr>
<tr><td>Potentiomètre</td><td>Résistance variable à double piste (auto-vérification) ; contacteur pied levé / pied à fond possible</td><td>Linéaire croissant</td><td>Ohmmètre (voltmètre si branché)</td></tr>
<tr><td>Capacitif</td><td>Plus la pression (hydraulique ou pneumatique) est élevée, plus le signal est élevé</td><td>Linéaire</td><td>Voltmètre</td></tr>
<tr><td>Inductif</td><td>Loi de Lenz : un bobinage soumis à une variation de flux magnétique génère une tension induite</td><td>Sinusoïde : fréquence et amplitude variables</td><td>Ohmmètre + isolement ; voltmètre alternatif si branché</td></tr>
<tr><td>Effet Hall</td><td>Plaquette de semi-conducteur (silicium) parcourue par un courant ; soumise à un champ magnétique, une faible ddp apparaît à ses bornes</td><td>Carré : fréquence variable, amplitude fixe (5 V)</td><td>Voltmètre sur 5 V · sortie · masse ; de préférence oscilloscope</td></tr>
<tr><td>Piézo-résistif</td><td>Piézo-résistivité : la résistance change sous une contrainte mécanique ; stable au repos, il se déséquilibre sous la pression (pont de Wheatstone)</td><td>Tension proportionnelle à la pression</td><td>Voltmètre (Us, +, −)</td></tr>
<tr><td>Piézo-électrique</td><td>Piézo-électricité : sous une contrainte (vibrations, pressions), le corps produit une ddp sur ses faces</td><td>Pics de tension sur chocs</td><td>Voltmètre en provoquant des chocs ; de préférence oscilloscope</td></tr>
<tr><td>Débitmètre</td><td>Film à résistances exposé à l’air : plus ou moins refroidi, sa résistance et donc la tension changent ; le calculateur en déduit la masse d’air et le carburant à injecter</td><td>Croissant avec la masse d’air</td><td>Voltmètre : +12 V, signal, masse</td></tr>
<tr><td>Sonde lambda</td><td>Couche de platine : tension quand la teneur en oxygène diffère entre l’intérieur et l’extérieur ; efficace à 300 °C → résistance chauffante</td><td>0 à 1 000 mV (riche ≈ 900 mV, pauvre ≈ 100 mV)</td><td>Voltmètre : signal 1 → masse 2 ; chauffage 3 (+12 V) → masse 4</td></tr>
<tr><td>Opto-électrique</td><td>Émetteur et récepteur infrarouge + roue phonique : le récepteur devient conducteur quand il reçoit l’onde, isolant quand elle disparaît</td><td>Carré : fréquence variable, amplitude fixe (ex. 5 V) ; numérique 0101…</td><td>Voltmètre : +12 V, 2 signaux, masse ; oscilloscope</td></tr></table></div>
<ul><li><b>Période</b> : temps que met un signal pour se reproduire à l’identique. <b>Fréquence</b> : nombre de périodes par seconde, en <b>hertz</b>.</li></ul>`,
    retenir: ['Actif = générateur, pas d’alimentation, 2 fils : inductif, piézo-électrique.', 'Passif = alimenté (5 V), 3 fils : CTN, CTP, potentiomètre, capacitif, piézo-résistif, effet Hall.', 'Inductif : sinus, amplitude variable ; Hall : carré, amplitude fixe.'],
    pieges: ['Un capteur passif ne fonctionne pas sans son alimentation : contrôler l’alimentation et la masse avant de condamner le capteur.']
  });

  REV.extendLesson('equip/alternateur', {
    images: [{ src: 'equip/alt-6d-12d.svg', cap: '6 diodes : 1 stator et 1 pont de 6 diodes. 12 diodes à double stator : 2 stators décalés de 30°, 2 ponts de 6 diodes réunis sur B+' },
      { src: 'equip/alt-ondulation.svg', cap: 'Tension redressée : 6 bosses par tour électrique avec 6 diodes, 12 bosses avec le double stator → courant plus lisse' }],
    html: `
<h3>Alternateur 6 diodes ou 12 diodes : la différence</h3>
<div class="tw"><table><tr><th></th><th>6 diodes</th><th>12 diodes</th></tr>
<tr><td>Induit (stator)</td><td>1 enroulement triphasé</td><td>1 enroulement dont chaque diode est doublée <b>ou</b> <b>2 enroulements triphasés</b> (2 stators) <b>décalés de 30°</b></td></tr>
<tr><td>Pont de diodes</td><td>1 pont de 6 diodes : 3 positives + 3 négatives, 2 par phase</td><td>6 × 2 diodes en parallèle <b>ou</b> <b>2 ponts de 6 diodes</b> (1 par stator), sorties réunies sur B+</td></tr>
<tr><td>Bornes, régulateur</td><td>2 bornes (+ et L ou D+), régulateur incorporé</td><td>Pareil : 2 bornes, régulateur incorporé</td></tr>
<tr><td>Intérêt</td><td>—</td><td><b>Fournir plus de courant</b> (grosses puissances)</td></tr></table></div>
<ul><li><b>Diodes doublées (6 × 2 en parallèle)</b> : le courant de chaque phase se partage entre 2 diodes → chaque diode chauffe moins, l’alternateur peut débiter plus.</li>
<li><b>Double stator + double pont</b> : chaque stator a son propre pont de 6 diodes. Comme les 2 stators sont décalés de 30°, leurs alternances ne tombent pas en même temps : on redresse <b>12 alternances</b> par tour électrique au lieu de 6 → courant <b>plus lisse</b> (moins d’ondulation), <b>plus de courant</b>, meilleure charge à bas régime.</li></ul>`,
    pieges: ['Intérêt du pont à 12 diodes : il FOURNIT PLUS DE COURANT.']
  });

  var ex = function (l, q) { q.l = l; return q; };
  REV.addExercises('equip', { lessons: [], questions: [
    ex('can', { q: 'Pourquoi le nombre de calculateurs augmente-t-il sur les véhicules ?', c: ['Exigences de pollution, de sécurité et de confort, et options en cours de vie', 'Pour diminuer le prix du véhicule', 'Pour supprimer les capteurs'], e: 'Conséquence : plus de calculateurs, de capteurs et de faisceaux ; le multiplexage limite le câblage.' }),
    ex('can', { img: F + 'can-multiplexage-temporel.jpg', q: 'Multiplexage temporel : comment les calculateurs utilisent-ils le bus ?', c: ['Ils communiquent à tour de rôle sur un même câble', 'Chacun a son propre câble', 'Ils émettent tous en permanence'], e: 'Une multitude d’informations circule sur un seul câble, le bus.' }),
    ex('can', { q: 'Un signal analogique est un signal dont l’amplitude :', c: ['Peut prendre une infinité de valeurs dans un intervalle donné', 'Ne prend que deux valeurs, 0 ou 1', 'Est toujours de 5 V'], e: 'Le signal numérique, lui, est une suite de bits (1 = 5 V, 0 = 0 V).' }),
    ex('can', { img: F + 'can-signal-numerique.jpg', q: 'Dans un signal numérique, que valent les bits 1 et 0 ?', c: ['1 = 5 V ; 0 = 0 V', '1 = 12 V ; 0 = 5 V', '1 = 0 V ; 0 = 5 V'], e: 'Signal numérique = suite de bits pris parmi deux valeurs possibles.' }),
    ex('can', { q: 'Combien de bits contient un byte ?', c: ['8', '4', '16'], e: 'Bit = Binary Digit (1 ou 0) ; 1 byte = 1 octet = 8 bits.' }),
    ex('can', { img: F + 'can-rapport-cyclique.jpg', q: 'Signal sous 12 V avec un rapport cyclique de 90 %. Tension moyenne ?', c: ['10,8 V', '12 V', '9 V'], e: '0,9 × 12 = 10,8 V (100 % = 12 V ; 50 % = 6 V).' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'Combien de nœuds (calculateurs) peut-on raccorder sur un bus CAN HS ?', c: ['2 à 30', '2 à 20', '2 à 8'], e: 'CAN HS : 2 à 30 nœuds ; CAN LS : 2 à 20.' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'Débit d’un bus CAN HS ?', c: ['125 kb/s à 1 Mb/s', '20 kb/s maxi', '10 kb/s'], e: 'CAN LS : 125 kb/s ; LIN : ≈ 20 kb/s.' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'CAN HS au niveau dominant (NL0) : tensions de CAN H et CAN L ?', c: ['CAN H = 3,5 V ; CAN L = 1,5 V', 'CAN H = 4 V ; CAN L = 1 V', 'CAN H = CAN L = 2,5 V'], e: '4 V / 1 V = dominant du CAN LS ; 2,5 V / 2,5 V = récessif du CAN HS.' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'CAN HS au niveau récessif (NL1) : tensions de CAN H et CAN L ?', c: ['CAN H = 2,5 V ; CAN L = 2,5 V', 'CAN H = 3,5 V ; CAN L = 1,5 V', 'CAN H = 1,75 V ; CAN L = 3,25 V'], e: '1,75 V / 3,25 V = récessif du CAN LS.' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'Deux nœuds émettent en même temps sur le bus CAN, l’un un NL0, l’autre un NL1. Quel niveau s’impose ?', c: ['Le NL0 : c’est l’état dominant', 'Le NL1 : c’est l’état dominant', 'Aucun, le bus se coupe'], e: 'Le NL0 s’impose sur le NL1 : NL0 = dominant, NL1 = récessif.' }),
    ex('can', { img: F + 'can-ls-hs-tableau.jpg', q: 'Courant de sortie (émission) d’un bus CAN LS ?', c: ['Plus de 1 mA sur 2,2 kΩ', '25 à 50 mA sur 60 Ω', '5 A'], e: '25 à 50 mA sur 60 Ω = CAN HS.' }),
    ex('can', { img: F + 'can-hs-lecture-trame.jpg', q: 'CAN HS : que vaut toujours la somme CAN H + CAN L ?', c: ['5 V', '2,5 V', '12 V'], e: 'La ligne est chargée à 5 V : 3,5 + 1,5 = 2,5 + 2,5 = 5 V.' }),
    ex('can', { img: F + 'can-hs-lecture-trame.jpg', q: 'CAN HS : différence CAN H − CAN L au niveau logique 0 (dominant) ?', c: ['2 V', '0 V', '5 V'], e: '3,5 − 1,5 = 2 V (au NL1 : 2,5 − 2,5 = 0 V).' }),
    ex('can', { img: F + 'can-hs-lecture-trame.jpg', q: 'CAN HS : différence CAN H − CAN L au niveau logique 1 (récessif) ?', c: ['0 V', '2 V', '1 V'], e: '2,5 − 2,5 = 0 V.' }),
    ex('can', { img: F + 'can-interface-nl0.jpg', q: 'Que fait l’interface CAN du calculateur avec les deux fils du bus ?', c: ['Elle fait CAN H − CAN L et amplifie le résultat × 2,5', 'Elle additionne CAN H et CAN L', 'Elle ne lit que CAN H'], e: 'NL0 : 2 V × 2,5 = 5 V ; NL1 : 0 V × 2,5 = 0 V.' }),
    ex('can', { img: F + 'can-hs-diag-h.jpg', q: 'Test de tension CAN H à la prise OBD : entre quelles broches, et dans quelle condition ?', c: ['Broche 6 et masse (broche 4), véhicule sous tension', 'Broches 6 et 14, véhicule hors tension', 'Broche 16 et masse, moteur tournant'], e: 'Voltmètre entre 6 (CAN H) et 4 (masse châssis) : ≈ 2,6 V.' }),
    ex('can', { img: F + 'can-hs-diag-h.jpg', q: 'Véhicule sous tension, voltmètre entre la broche 6 (CAN H) et la masse de la prise OBD. Valeur attendue ?', c: ['≈ 2,6 V', '≈ 0,5 V', '≈ 12 V'], e: 'CAN H un peu au-dessus de 2,5 V : 2,6 V.' }),
    ex('can', { img: F + 'can-hs-diag-l.jpg', q: 'Véhicule sous tension, voltmètre entre la broche 14 (CAN L) et la masse de la prise OBD. Valeur attendue ?', c: ['≈ 2,4 V', '≈ 2,6 V', '≈ 60 V'], e: 'CAN L un peu en dessous de 2,5 V : 2,4 V.' }),
    ex('can', { img: F + 'can-hs-diag-ligne.jpg', q: 'Véhicule sous tension, voltmètre entre les broches 6 et 14 de la prise OBD. Valeur attendue ?', c: ['≈ 0,5 V', '≈ 5 V', '≈ 2,5 V'], e: 'Le voltmètre lit une moyenne : CAN H ≈ 2,4 à 3,2 V, CAN L ≈ 1,8 à 2,6 V, et entre les deux (broches 6 et 14) ≈ 0,5 à 0,7 V. Au-delà de 0,9 à 1 V, le réseau est saturé.' }),
    ex('can', { img: F + 'can-hs-diag-resistance.jpg', q: 'Test de résistance du bus CAN HS : appareil et condition ?', c: ['Ohmmètre entre 6 et 14, véhicule hors tension', 'Ohmmètre entre 6 et 14, véhicule sous tension', 'Voltmètre entre 6 et 4, véhicule sous tension'], e: 'On ne mesure jamais une résistance sous tension. Valeur attendue : 60 Ω.' }),
    ex('can', { img: F + 'can-hs-diag-resistance.jpg', q: 'Véhicule hors tension, ohmmètre entre les broches 6 et 14 de la prise OBD. Valeur normale ?', c: ['60 Ω', '120 Ω', '0 Ω'], e: 'Deux résistances de 120 Ω en parallèle = 60 Ω.' }),
    ex('can', { q: 'VLTP-NP : vitesse de transmission des réseaux HS-CAN1, HS-CAN2 et HS-CAN3 ?', c: ['500 kbit/s', '125 kbit/s', '20 kbit/s'], e: 'MS-CAN : 125 kbit/s (vitesse moyenne) ; LIN : ≈ 20 kbit/s maxi.' }),
    ex('can', { img: F + 'can-hs-diag-h.jpg', q: 'Au voltmètre, sur la prise OBD sous tension, entre quelles valeurs doit se trouver CAN H (broche 6 / masse) ?', c: ['Entre 2,4 et 3,2 V', 'Exactement 3,5 V', 'Entre 1,8 et 2,6 V'], e: '3,5 V est une valeur donnée (bit dominant) : au voltmètre on lit une moyenne, ex. 2,6 V.' }),
    ex('can', { img: F + 'can-hs-diag-l.jpg', q: 'Au voltmètre, sur la prise OBD sous tension, entre quelles valeurs doit se trouver CAN L (broche 14 / masse) ?', c: ['Entre 1,8 et 2,6 V', 'Exactement 1,5 V', 'Entre 2,4 et 3,2 V'], e: '1,5 V est une valeur donnée (bit dominant) : au voltmètre on lit une moyenne, ex. 2,4 V.' }),
    ex('can', { img: F + 'can-hs-trame-oscillo.jpg', q: 'Pourquoi ne lit-on pas 3,5 V sur CAN H avec un voltmètre ?', c: ['Les bits changent trop vite : le voltmètre affiche une moyenne entre 2,5 et 3,5 V', 'Parce que le réseau est en panne', 'Parce que CAN H est alimenté en 12 V'], e: 'Les valeurs 3,5 / 2,5 / 1,5 V se voient à l’oscilloscope.' }),
    ex('can', { img: F + 'can-hs-diag-ligne.jpg', q: 'Au voltmètre entre CAN H et CAN L, vous lisez 1 V. Conclusion ?', c: ['Réseau saturé (normal : 0,5 à 0,7 V, jusqu’à 0,9 V)', 'Réseau normal', 'Résistance de terminaison coupée'], e: 'Au-dessus de 0,9 V ou 1 V : réseau saturé → débrancher les calculateurs un par un.' }),
    ex('can', { q: 'Prise OBD : quelles broches sont à la masse ?', c: ['4 et 5', '6 et 14', '16'], e: '6 = CAN H · 14 = CAN L · 16 = + batterie.' }),
    ex('can', { img: F + 'can-hs-trame-oscillo.jpg', q: 'Valeurs données sur la trame : CAN H au bit 1 (récessif) ?', c: ['2,5 V', '3,5 V', '2,6 V'], e: '2,6 V est une valeur typique lue au VOLTMÈTRE, pas une valeur de trame.' }),
    ex('lin', { img: F + 'lin-pcm-alternateur.jpg', q: 'VLTP-NP : quel calculateur est maître LIN et sert de passerelle avec le HS-CAN1 ?', c: ['Le PCM (gestion moteur)', 'L’alternateur', 'Le capteur de courant'], e: 'L’alternateur est l’esclave LIN du PCM.' }),
    ex('lin', { img: F + 'lin-pcm-alternateur.jpg', q: 'Batteries déchargées ou forte consommation : que fait le PCM sur l’alternateur piloté par LIN ?', c: ['Il augmente la tension de régulation', 'Il réduit la tension de régulation', 'Il coupe l’alternateur'], e: 'Batteries chargées : il réduit la tension de régulation.' }),

    ex('alternateur', { img: 'equip/alt-6d-12d.svg', q: 'Alternateur 12 diodes à double stator : combien a-t-il de ponts de diodes ?', c: ['2 ponts de 6 diodes, un par stator', '1 pont de 12 diodes sur un seul stator', '1 pont de 6 diodes et 6 diodes trio'], e: 'Les sorties des 2 ponts sont réunies sur B+.' }),
    ex('alternateur', { img: 'equip/alt-6d-12d.svg', q: 'Alternateur 12 diodes à double stator : comment sont placés les 2 enroulements du stator ?', c: ['Décalés de 30° l’un par rapport à l’autre', 'Superposés exactement', 'Décalés de 180°'], e: 'Grâce au décalage, les alternances des 2 stators ne tombent pas en même temps.' }),
    ex('alternateur', { img: 'equip/alt-ondulation.svg', q: 'Pourquoi un alternateur 12 diodes à double stator donne-t-il un courant plus lisse qu’un 6 diodes ?', c: ['Il redresse 12 alternances par tour électrique au lieu de 6', 'Il n’a pas de régulateur', 'Ses diodes sont montées en série'], e: 'Moins d’ondulation, plus de courant, meilleure charge à bas régime.' }),
    ex('alternateur', { img: 'equip/alt-6d-12d.svg', q: 'Combien de diodes par phase dans le pont d’un alternateur 6 diodes ?', c: ['2 (une positive, une négative)', '1', '3'], e: '3 phases × 2 diodes = 6 diodes : 3 positives et 3 négatives.' }),
    ex('alternateur', { q: 'Alternateur 12 diodes à diodes doublées (6 × 2 en parallèle) : pourquoi 2 diodes en parallèle ?', c: ['Le courant de chaque phase se partage entre 2 diodes : l’alternateur peut débiter plus', 'Pour supprimer le régulateur', 'Pour redresser 2 fois plus vite'], e: 'Chaque diode chauffe moins : c’est un montage pour les grosses puissances.' }),
    ex('capteurs', { img: F + 'cap-synoptique.jpg', q: 'Rôle des capteurs ?', c: ['Informer le calculateur qui, en fonction de ces données, commande les actionneurs', 'Commander directement les actionneurs', 'Alimenter le calculateur'], e: 'Capteurs → calculateur → actionneurs.' }),
    ex('capteurs', { q: 'Quelle est la différence entre un capteur actif et un capteur passif ?', c: ['L’actif produit sa propre tension sans alimentation ; le passif doit être alimenté', 'L’actif est alimenté en 5 V ; le passif produit sa propre tension', 'L’actif a 3 fils ; le passif en a 2'], e: 'Actif = générateur (inductif, piézo-électrique) ; passif = alimenté, le plus souvent en 5 V.' }),
    ex('capteurs', { img: F + 'cap-inductif-slide.jpg', q: 'Parmi ces capteurs, lequel est actif ?', c: ['Le capteur inductif', 'La CTN', 'Le capteur à effet Hall'], e: 'Actifs : inductif et piézo-électrique. CTN et effet Hall sont passifs.' }),
    ex('capteurs', { img: F + 'cap-hall-slide.jpg', q: 'Parmi ces capteurs, lequel est passif ?', c: ['Le capteur à effet Hall', 'Le capteur inductif', 'Le capteur piézo-électrique'], e: 'Le capteur à effet Hall doit être alimenté (5 V · sortie · masse).' }),
    ex('capteurs', { q: 'Lequel de ces groupes ne contient que des capteurs passifs ?', c: ['CTN, CTP, potentiomètre, capacitif', 'Inductif, piézo-électrique, CTN', 'Inductif, effet Hall, CTP'], e: 'Passifs : CTN, CTP, potentiomètre, capacitif, piézo-résistif, effet Hall.' }),
    ex('capteurs', { q: 'Capteur passif à 3 fils : que trouve-t-on sur ses fils ?', c: ['L’alimentation, le signal, la masse', 'Deux signaux et le CAN H', 'Le + batterie, le + après contact, la masse'], e: 'Avant de condamner un capteur passif, on contrôle son alimentation et sa masse.' }),
    ex('capteurs', { img: F + 'cap-inductif-slide.jpg', q: 'Pourquoi dit-on qu’un capteur actif se comporte comme un générateur ?', c: ['Il fabrique lui-même la tension de son signal', 'Il alimente le calculateur', 'Il est branché sur la batterie'], e: 'Exemple : le capteur inductif crée une tension induite quand le flux magnétique varie.' }),
    ex('capteurs', { img: F + 'cap-contacteur.jpg', q: 'Quel signal délivre un contacteur ?', c: ['Un signal binaire, 0 ou 1', 'Une sinusoïde', 'Une tension proportionnelle à la pression'], e: 'Style « interrupteur » ; contrôle à l’ohmmètre (voltmètre si branché).' }),
    ex('capteurs', { img: F + 'cap-ctp.jpg', q: 'Capteur CTP : que fait sa résistance quand la température augmente ?', c: ['Elle augmente', 'Elle diminue', 'Elle reste constante'], e: 'CTP = Coefficient de Température Positif. La CTN fait l’inverse.' }),
    ex('capteurs', { img: F + 'cap-inductif-lenz.jpg', q: 'Principe du capteur inductif ?', c: ['Un bobinage soumis à une variation de flux magnétique génère une tension induite (loi de Lenz)', 'Une plaquette de silicium soumise à un champ magnétique présente une faible ddp', 'Un film chauffé se refroidit au passage de l’air'], e: 'Le signal est une sinusoïde dont la fréquence et l’amplitude varient avec la vitesse.' }),
    ex('capteurs', { img: F + 'cap-inductif-lenz.jpg', q: 'Qu’est-ce que la fréquence d’un signal ?', c: ['Le nombre de périodes par seconde, en hertz', 'Le temps d’une période, en secondes', 'La tension maximale du signal'], e: 'Période = temps que met le signal pour se reproduire à l’identique.' }),
    ex('capteurs', { img: F + 'cap-hall-principe.jpg', q: 'Principe du capteur à effet Hall ?', c: ['Une plaquette de semi-conducteur parcourue par un courant et soumise à un champ magnétique présente une faible ddp', 'Un bobinage soumis à une variation de flux génère une tension', 'Une couche de platine compare la teneur en oxygène'], e: 'Cette faible ddp est amplifiée : signal carré d’amplitude fixe (5 V).' }),
    ex('capteurs', { img: F + 'cap-piezo-principe.jpg', q: 'Qu’est-ce que la piézo-résistivité ?', c: ['La propriété de certains corps de modifier leur résistance sous une contrainte mécanique', 'La propriété de produire une ddp sous une contrainte mécanique', 'La propriété de conduire sous un rayon infrarouge'], e: 'La piézo-électricité, elle, produit une ddp sur les faces du corps.' }),
    ex('capteurs', { img: F + 'cap-piezo-principe.jpg', q: 'Qu’est-ce que la piézo-électricité ?', c: ['La propriété de certains corps de produire une ddp sur leurs faces sous une contrainte mécanique', 'La propriété de modifier sa résistance avec la température', 'La propriété de modifier sa capacité avec la pression'], e: 'C’est pourquoi le capteur piézo-électrique est actif : il génère sa tension sous les chocs.' }),
    ex('capteurs', { img: F + 'cap-debitmetre.jpg', q: 'Débitmètre d’air à film chaud : comment fonctionne-t-il ?', c: ['L’air refroidit plus ou moins un film à résistances ; sa résistance et la tension changent', 'Une hélice tourne dans le flux d’air', 'Une couche de platine mesure l’oxygène'], e: 'Le calculateur en déduit la masse d’air et la quantité de carburant correspondante.' }),
    ex('capteurs', { img: F + 'cap-debitmetre.jpg', q: 'Quels fils trouve-t-on sur un débitmètre d’air ?', c: ['+12 V, signal, masse', 'Deux fils sans alimentation', 'CAN H et CAN L'], e: 'Contrôle au voltmètre sur les 3 fils.' }),
    ex('capteurs', { img: F + 'cap-lambda.jpg', q: 'Sonde lambda : à partir de quelle température mesure-t-elle efficacement ?', c: ['300 °C', '80 °C', '900 °C'], e: 'D’où sa résistance chauffante (+12 V).' }),
    ex('capteurs', { img: F + 'cap-lambda.jpg', q: 'Comment la sonde lambda génère-t-elle son signal ?', c: ['Une couche de platine génère une tension quand la teneur en oxygène diffère entre l’intérieur et l’extérieur', 'Un film chaud se refroidit au passage des gaz', 'Une plaquette Hall détecte les gaz'], e: 'Mélange riche ≈ 900 mV, pauvre ≈ 100 mV.' }),
    ex('capteurs', { img: F + 'cap-opto-principe.jpg', q: 'Capteur opto-électrique : que fait le récepteur quand il reçoit l’onde infrarouge ?', c: ['Il devient conducteur', 'Il devient isolant', 'Il émet de la lumière visible'], e: 'L’onde disparaît : il redevient isolant. Avec la roue phonique, on obtient un signal carré.' }),
    ex('capteurs', { img: F + 'cap-opto.jpg', q: 'Quel signal délivre un capteur opto-électrique ?', c: ['Un signal carré de fréquence variable et d’amplitude fixe', 'Une sinusoïde d’amplitude variable', 'Des pics de tension sur chocs'], e: 'Signal numérique 0101… ; contrôle à l’oscilloscope.' }),
    ex('capteurs', { img: F + 'cap-piezo-resistif.jpg', q: 'Capteur piézo-résistif : comment se comporte-t-il ?', c: ['Stable au repos, il se déséquilibre sous la pression et génère une tension', 'Il génère des pics de tension sur chocs sans alimentation', 'Il délivre un signal carré'], e: 'Tension proportionnelle à la pression ; contrôle au voltmètre.' })
  ] });

  /* Fiche mémoire UV2 : deux blocs de plus en équipement électrique */
  if (REV.uv2Fiches && REV.uv2Fiches.equip) {
    REV.uv2Fiches.equip.blocs.push(
      { t: 'Capteurs actifs et passifs', img: [['fiches/cap-inductif-slide.jpg', 'Inductif (actif) : sinusoïde'], ['fiches/cap-hall-slide.jpg', 'Effet Hall (passif) : carré 5 V']],
        html: '<div class="tw"><table><tr><th></th><th>Actif</th><th>Passif</th></tr><tr><td>Alimentation</td><td>Aucune : générateur</td><td>Alimenté (5 V le plus souvent)</td></tr><tr><td>Fils</td><td>2</td><td>3 : alim · signal · masse</td></tr><tr><td>Exemples</td><td>Inductif, piézo-électrique</td><td>CTN, CTP, potentiomètre, capacitif, piézo-résistif, effet Hall</td></tr></table></div>',
        pts: ['Actif = il fabrique sa tension ; passif = il faut l’alimenter.', 'Inductif : sinus, amplitude variable ; Hall : carré, amplitude fixe.', 'CTN : T° ↑ → R ↓ ; CTP : T° ↑ → R ↑.'],
        qr: [['Capteur actif', 'pas d’alimentation (inductif, piézo-électrique)'], ['Capteur passif', 'alimenté en 5 V (CTN, Hall…)']] },
      { t: 'CAN HS : diagnostic à la prise OBD', img: [['fiches/can-hs-diag-h.jpg', 'CAN H : 6-4 = 2,6 V'], ['fiches/can-hs-diag-resistance.jpg', 'Résistance : 6-14 = 60 Ω hors tension']],
        html: '<div class="tw"><table><tr><th>Mesure</th><th>Condition</th><th>Valeur</th></tr><tr><td>6 - 4 (CAN H)</td><td>Sous tension</td><td>2,6 V</td></tr><tr><td>14 - 4 (CAN L)</td><td>Sous tension</td><td>2,4 V</td></tr><tr><td>6 - 14 (ligne)</td><td>Sous tension</td><td>0,5 V</td></tr><tr><td>6 - 14 (résistance)</td><td>Hors tension</td><td>60 Ω</td></tr></table></div>',
        pts: ['NL0 dominant : 3,5 / 1,5 V (écart 2 V) ; NL1 récessif : 2,5 / 2,5 V (écart 0 V).', 'H + L = 5 V ; le NL0 s’impose en cas d’émission simultanée.', 'CAN HS : 125 kb/s à 1 Mb/s, 2 à 30 nœuds.'],
        qr: [['Résistance du bus', '60 Ω, véhicule hors tension'], ['Niveau dominant', 'NL0']] });
  }
})();
