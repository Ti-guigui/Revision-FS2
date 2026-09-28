/* Équipement électrique : compléments repris des fiches de révision de l’élève (schémas dessinés + détails). */
(function () {
  var F = 'fiches/';
  function im(src, cap) { return { src: F + src + '.jpg', cap: cap }; }

  REV.extendLesson('equip/batterie', {
    html: `
<h3>Recharge au 1/10 : exemple d’une batterie 12 V de 75 Ah</h3>
<div class="tw"><table><tr><th>Courant</th><th>Durée</th></tr><tr><td>7,5 A (10 % de la capacité)</td><td>10 h</td></tr><tr><td>3,75 A</td><td>20 h</td></tr><tr><td>1,875 A</td><td>40 h</td></tr></table></div>`,
    retenir: ['75 Ah : 7,5 A pendant 10 h (3,75 A / 20 h ; 1,875 A / 40 h).']
  });

  REV.extendLesson('equip/demarreur', {
    images: [im('eq-demarreur', 'Schéma du démarreur : excitation, contact de démarrage, +BAT, bobines d’appel et de maintien, +DEM, inducteur (stator), induit (rotor)')],
    html: `
<h3>Les 4 fonctions du démarreur</h3>
<div class="tw"><table><tr><th>Fonction</th><th>Organe</th></tr>
<tr><td>La rotation</td><td>Induit = rotor ; inducteur = stator</td></tr>
<tr><td>La commande</td><td>Solénoïde → fourchette → lanceur</td></tr>
<tr><td>La liaison électrique</td><td>Balais = charbons sur le collecteur</td></tr>
<tr><td>Le repos</td><td>Ressort de rappel, frein d’induit</td></tr></table></div>
<p><b>+DEM</b> = sortie du solénoïde vers le moteur électrique (sortie de la bobine d’appel). La bobine de maintien se teste entre EXC et la masse (<b>corps du solénoïde</b>). Moteur électrique : &lt; 1 Ω, le plus proche de 0.</p>
<h3>Le véhicule ne démarre pas</h3>
<div class="tw"><table><tr><th>Symptôme</th><th>Cause</th></tr>
<tr><td>Démarreur qui colle par intermittence</td><td>Bobine de maintien HS ou batterie faible</td></tr>
<tr><td>Batteries &lt; 19,2 V au démarrage (24 V)</td><td>Batteries en cause</td></tr>
<tr><td>Batteries &gt; 19,2 V, démarreur qui peine</td><td>Démarreur HS (après contrôle de la résistance mécanique du moteur)</td></tr>
<tr><td>25,3 V aux batteries, 24 V au +BAT démarreur</td><td>Ligne positive du démarreur (chute &gt; 1 V)</td></tr>
<tr><td>7 Ω sur le moteur électrique</td><td>Moteur HS (doit être &lt; 1 Ω)</td></tr></table></div>`,
    retenir: ['4 fonctions : rotation, commande, liaison électrique, repos.', 'Démarreur qui peine avec batteries > 19,2 V : démarreur HS, après avoir contrôlé la résistance mécanique du moteur thermique.']
  });

  REV.extendLesson('equip/alternateur', {
    images: [im('eq-alt-6d', 'Alternateur 6 diodes, régulateur incorporé : 2 bornes (+ et L ou D+)'), im('eq-alt-9d', 'Alternateur 9 diodes : 6 diodes de puissance + 3 diodes trio d’excitation, 1 borne (L ou D+)')],
    html: `
<h3>Alternateur 6 diodes à régulateur incorporé</h3>
<ul><li><b>3 fonctions</b> : alimenter les récepteurs et recharger la batterie · allumer le témoin · fonction rupture de courroie.</li>
<li>On enlève le <b>+BAT</b> → le régulateur ne fonctionne plus.</li>
<li>On perd le témoin (<b>+L</b>) → il fonctionne toujours.</li>
<li>Exemple Ford Ranger 2005 : 6 diodes avec + permanent, le fil témoin part vers le combiné (IC) ; le régulateur consomme un peu même contact coupé.</li>
<li>Panne : bobine coupée, balai coupé ou usé → induit défaillant.</li></ul>
<h3>Pannes de l’alternateur 9 diodes</h3>
<div class="tw"><table><tr><th>Symptôme</th><th>Cause</th></tr>
<tr><td>Surcharge</td><td>Régulateur HS</td></tr>
<tr><td>Surtension (ex. 32 V sur PL)</td><td>1 diode trio HS et/ou régulateur HS</td></tr>
<tr><td>Plus de débit, batterie qui se décharge dans l’induit</td><td>2 ou 3 diodes trio HS (surchauffe des bobines)</td></tr>
<tr><td>Témoin qui ne s’allume pas</td><td>Inducteur HS ou régulateur HS (circuit série coupé)</td></tr>
<tr><td>Absence du témoin de charge</td><td>Régulateur non alimenté → ne charge plus. Dépannage : shunter +BAT vers +L</td></tr></table></div>
<p><b>12 diodes</b> : 2 bornes (L ou D+ et +) comme le 6 diodes, régulateur intégré ; +APC et D+ ou L sur le régulateur.</p>`,
    retenir: ['6 diodes rég. incorporé : sans +BAT le régulateur ne fonctionne plus ; sans témoin il fonctionne toujours.', '9 diodes : surcharge = régulateur HS ; plus de débit = 2 ou 3 diodes trio HS.']
  });

  REV.extendLesson('equip/lin', {
    html: `
<ul><li><b>IBS</b> = Intelligent Battery System (Sensor) : sur la masse de la batterie, au plus près du + alternateur.</li>
<li>Contact mis, alternateur branché, 12 V aux bornes de bonnes batteries = bus en bonne santé ; LIN contact mis ≈ 80 % de Ubat.</li>
<li>Régulateur LIN couplé à un calculateur (<b>LIN Dummy</b>) → contrôle à l’oscilloscope.</li>
<li>LIN = 1 maître + esclaves : le calculateur <b>interroge</b>, l’alternateur <b>répond</b> ; débit faible (jusqu’à ≈ 20 kb/s), à opposer au CAN qui est multi-maître.</li>
<li>Alternateur numérique à <b>13,2 V moteur tournant</b> → mode par défaut : bus LIN coupé (ouvert).</li></ul>`,
    retenir: ['LIN : le calculateur interroge, l’alternateur répond (1 maître + esclaves).', 'LIN Dummy : contrôle du régulateur LIN à l’oscilloscope.']
  });

  REV.extendLesson('equip/can', {
    images: [im('eq-can-ligne', 'Ligne CAN : 2 résistances de 120 Ω, Req = 60 Ω, fils torsadés'), im('eq-can-double-boucle', 'Réseau double boucle : CAN HS (500 kb/s – 1 Mb/s) et CAN LS (125 – 250 kb/s) reliés par la passerelle ; LIN vers l’alternateur'), im('eq-calculateur', 'Calculateur : étage d’entrée (CAN analogique → numérique), micro-ordinateur, étage de sortie, contrôleur de protocole, interface de ligne'), im('eq-can-signaux', 'Message 101001 : CAN H et CAN L vers l’amplificateur différentiel'), im('eq-can-ampli', 'Amplificateur opérationnel : 3,5 V − 1,5 V = 2 V, × 2,5 (transistor) → 5 V')],
    html: `
<h3>Signaux du calculateur</h3>
<div class="tw"><table><tr><th>Signal</th><th>De → vers</th></tr>
<tr><td>Analogique</td><td>Capteur → calculateur (entrée) : peut prendre une multitude de valeurs sur un temps donné</td></tr>
<tr><td>Analogique de puissance</td><td>Calculateur (sortie) → actionneur / actuateur</td></tr>
<tr><td>Numérique</td><td>Calculateur → calculateur</td></tr></table></div>
<p>Étage d’entrée : <b>convertisseur analogique → numérique</b> ; interface de ligne vers le bus : <b>convertisseur numérique → analogique</b> (traduit électriquement entre 0 et 5 V).</p>
<h3>Réseau et diagnostic</h3>
<ul><li>CAN Low Speed et CAN High Speed : chaque réseau a besoin de 2 fils (L et H).</li>
<li>Réseau double boucle : <b>CAN HS 500 kb/s à 1 Mb/s</b> (ECU, ABS, BVA…) ; <b>CAN LS 125 à 250 kb/s</b> (radio, tableau de bord…) ; reliés par la <b>passerelle</b>, elle-même reliée à la prise OBD.</li>
<li>Fils torsadés : protection magnétique, contre les interférences extérieures.</li>
<li>Courant de sortie : 25 à 50 mA sur 60 Ω.</li>
<li>Résistance de ligne à 120 Ω → fil coupé ou résistance de terminaison HS, ou fil d’un calculateur. La résistance de terminaison peut se trouver <b>dans le calculateur</b>.</li>
<li>Pour un diagnostic : partir de l’<b>architecture réseau</b>.</li>
<li>Actionneur = déplacement mécanique ; actuateur = gestion électronique. FCU = Flasher Computer Unit.</li></ul>`,
    retenir: ['CAN HS : 500 kb/s à 1 Mb/s ; CAN LS : 125 à 250 kb/s ; passerelle entre les deux.', 'Résistance de terminaison parfois dans le calculateur.', 'Signal analogique = capteur → calculateur ; analogique de puissance = calculateur → actionneur ; numérique = calculateur → calculateur.']
  });

  REV.extendLesson('equip/capteurs', {
    images: [im('eq-cap-ctn', 'CTN : T° ↑ = R ↓ (signal décroissant)'), im('eq-cap-potentiometre', 'Potentiomètre : signal linéaire croissant, double piste'), im('eq-cap-capacitif', 'Capteur capacitif (passif) : pression ↑ = tension ↑'), im('eq-cap-inductif', 'Capteur inductif (actif) : sinusoïde, 100 à 2 000 Ω'), im('eq-cap-hall', 'Capteur à effet Hall (passif) : signal carré 5 V, oscilloscope'), im('eq-cap-piezo-resistif', 'Capteur piézo-résistif (passif) : tension proportionnelle à la pression'), im('eq-cap-piezo-electrique', 'Capteur piézo-électrique (passif) : pics de tension sur chocs'), im('eq-cap-passif', 'Capteur passif : alimentation 5 V (ou 12 V), signal ≈ 4,80 V (pull-up), masse'), im('eq-actionneur-rco', 'Actionneur : tout ou rien, RCO 50 % sous 12 V = 6 V ; 300 µs sur 1 000 µs sous 24 V = 7,2 V')],
    html: `
<h3>Valeurs à connaître</h3>
<ul><li><b>Potentiomètre</b> : toujours en complément d’un contacteur (pied levé ou pied à fond).</li>
<li><b>Capacitif</b> : 1,31 V = 101 kPa ; 5,01 V = 264 kPa ; 0 V = 0 bar.</li>
<li><b>Inductif</b> : résistance de 100 à 2 000 Ω ; voltmètre en alternatif s’il est branché ; contrôle de l’isolement.</li>
<li><b>Effet Hall</b> : la plaquette Hall émet un signal carré de fréquence variable (rotation de l’organe) et d’amplitude fixe (ex. 5 V), amplifié par un transistor ; de préférence à l’oscilloscope.</li>
<li><b>Capteur passif</b> : une alimentation 5 V ou 12 V, un signal un peu moins de 5 V (≈ 4,80 / 4,90 V : résistance de pull-up, qui stabilise le signal et donne l’état de santé du capteur), une masse.</li>
<li><b>MAP</b> (pression absolue) : 250 kPa = 4,65 V ; pression atmosphérique ≈ 100 kPa.</li></ul>
<h3>Actionneurs</h3>
<ul><li><b>Tout ou rien</b> : 0 ou 5 V.</li>
<li><b>Plus ou moins longtemps</b> selon le besoin : <b>RCO</b>. Exemple : 50 % sous 12 V → 12 × 0,5 = <b>6 V</b> ; 300 µs sur une période de 1 000 µs sous 24 V → 300 / 1 000 = 0,3 → 0,3 × 24 = <b>7,2 V</b>.</li></ul>`,
    retenir: ['Inductif : 100 à 2 000 Ω.', 'Capteur passif : 5 V, signal ≈ 4,80 V (pull-up), masse.', 'RCO : tension moyenne = rapport cyclique × tension (0,3 × 24 = 7,2 V).']
  });

  var ex = function (l, q) { q.l = l; return q; };
  REV.addExercises('equip', { lessons: [], questions: [
    ex('batterie', { q: 'Batterie 12 V de 75 Ah : courant de recharge classique (10 %) et durée ?', c: ['7,5 A pendant 10 h', '75 A pendant 1 h', '3,75 A pendant 10 h'], e: '10 % de 75 Ah = 7,5 A pendant 10 h (3,75 A / 20 h ; 1,875 A / 40 h).' }),
    ex('batterie', { q: 'Batterie de 75 Ah rechargée à 3,75 A : durée de charge ?', c: ['20 h', '10 h', '40 h'], e: 'Moitié du courant = double du temps : 3,75 A pendant 20 h.' }),
    ex('demarreur', { img: F + 'eq-demarreur.jpg', q: 'Quelles sont les 4 fonctions du démarreur ?', c: ['La rotation, la commande, la liaison électrique, le repos', 'Le démarrage, la charge, l’allumage, le repos', 'La rotation, la régulation, le redressement, l’excitation'], e: 'Rotation (induit/inducteur) · commande (solénoïde → fourchette → lanceur) · liaison électrique (balais) · repos (ressort de rappel, frein d’induit).' }),
    ex('demarreur', { img: F + 'eq-demarreur.jpg', q: 'Sur un démarreur, qu’assure la « liaison électrique » ?', c: ['Les balais (charbons) sur le collecteur', 'Le frein d’induit', 'La fourchette'], e: 'Les balais frottent sur le collecteur et alimentent l’induit.' }),
    ex('demarreur', { img: F + 'eq-demarreur.jpg', q: 'Qu’est-ce que la borne +DEM ?', c: ['La sortie du solénoïde vers le moteur électrique (sortie de la bobine d’appel)', 'Le + après contact démarrage', 'Le + permanent de la batterie'], e: 'EXC = + après contact démarrage ; +BAT = batterie ; +DEM = sortie vers le moteur électrique.' }),
    ex('demarreur', { q: 'Réseau 24 V : batteries au-dessus de 19,2 V au démarrage, démarreur qui peine. Conclusion ?', c: ['Démarreur HS, après avoir contrôlé la résistance mécanique du moteur', 'Batteries en cause', 'Ligne négative coupée'], e: 'Les batteries tiennent : on vérifie que le moteur thermique ne force pas (résistance mécanique), puis on conclut au démarreur.' }),
    ex('alternateur', { img: F + 'eq-alt-6d.jpg', q: 'Les 3 fonctions de l’alternateur 6 diodes à régulateur incorporé ?', c: ['Alimenter les récepteurs et recharger la batterie, allumer le témoin, fonction rupture de courroie', 'Redresser, réguler, démarrer', 'Charger, allumer, multiplexer'], e: 'Régulateur multifonction : charge, témoin, détection de rupture de courroie.' }),
    ex('alternateur', { img: F + 'eq-alt-6d.jpg', q: 'Alternateur 6 diodes à régulateur incorporé : on débranche le +BAT du régulateur. Conséquence ?', c: ['Le régulateur ne fonctionne plus', 'Aucune conséquence', 'Le témoin reste éteint mais il charge'], e: 'Sans +BAT le régulateur n’est plus alimenté ; en revanche, sans le témoin (+L), il fonctionne toujours.' }),
    ex('alternateur', { img: F + 'eq-alt-9d.jpg', q: 'Alternateur 9 diodes en surcharge : cause ?', c: ['Régulateur HS', 'Lampe témoin HS', 'Une diode de puissance coupée'], e: 'Surcharge = régulateur HS ; surtension = 1 diode trio HS et/ou régulateur.' }),
    ex('alternateur', { img: F + 'eq-alt-9d.jpg', q: 'Alternateur 9 diodes : plus de débit, la batterie se décharge dans l’induit. Cause ?', c: ['2 ou 3 diodes trio HS (surchauffe des bobines)', 'Le régulateur seul', 'Les balais neufs'], e: '2 ou 3 diodes trio HS = plus de charge du tout.' }),
    ex('alternateur', { img: F + 'eq-alt-9d.jpg', q: 'Alternateur 9 diodes : absence du témoin de charge, l’alternateur ne charge plus. Dépannage ?', c: ['Shunter +BAT vers +L', 'Remplacer la batterie', 'Débrancher le régulateur'], e: 'Régulateur non alimenté : on shunte +BAT vers +L pour le pré-exciter.' }),
    ex('alternateur', { img: F + 'eq-alt-9d.jpg', q: 'Rôle des 3 diodes trio de l’alternateur 9 diodes ?', c: ['Éteindre le voyant, exciter le régulateur / l’inducteur, éviter que la batterie se décharge dans l’induit', 'Redresser le courant de charge', 'Alimenter le compte-tours'], e: 'Les 6 diodes de puissance redressent ; les 3 diodes trio fournissent l’excitation.' }),
    ex('lin', { q: 'Bus LIN : comment dialoguent le calculateur et l’alternateur ?', c: ['Le calculateur (maître) interroge, l’alternateur (esclave) répond', 'Les deux sont maîtres', 'L’alternateur envoie seul ses données'], e: 'LIN = 1 maître + esclaves, débit faible (≈ 20 kb/s) ; le CAN est multi-maître.' }),
    ex('lin', { q: 'Comment contrôle-t-on un régulateur LIN couplé à un calculateur (LIN Dummy) ?', c: ['À l’oscilloscope', 'À l’ohmmètre', 'Au pèse-acide'], e: 'Signal numérique : contrôle à l’oscilloscope.' }),
    ex('lin', { q: 'Où est placé l’IBS (Intelligent Battery Sensor) ?', c: ['Sur la masse de la batterie', 'Sur la borne B+ de l’alternateur', 'Dans le calculateur moteur'], e: 'IBS : sur la masse de la batterie, au plus près.' }),
    ex('can', { img: F + 'eq-can-double-boucle.jpg', q: 'Réseau double boucle : débit du CAN High Speed ?', c: ['500 kb/s à 1 Mb/s', '125 à 250 kb/s', '20 kb/s'], e: 'CAN HS : 500 kb/s à 1 Mb/s ; CAN LS : 125 à 250 kb/s ; LIN : ≈ 20 kb/s.' }),
    ex('can', { img: F + 'eq-can-double-boucle.jpg', q: 'Réseau double boucle : quel élément relie le CAN HS, le CAN LS et la prise OBD ?', c: ['La passerelle', 'L’alternateur', 'Le tableau de bord'], e: 'La passerelle (gateway) fait le lien entre les réseaux.' }),
    ex('can', { img: F + 'eq-can-ligne.jpg', q: 'Vous mesurez 120 Ω sur la ligne CAN. Causes possibles ?', c: ['Fil coupé, résistance de terminaison HS ou fil d’un calculateur', 'Réseau normal', 'CAN H et CAN L en court-circuit'], e: 'Normal : 60 Ω. La résistance de terminaison peut se trouver dans le calculateur.' }),
    ex('can', { q: 'Où peut se trouver une résistance de terminaison CAN ?', c: ['Dans un calculateur', 'Dans la prise OBD uniquement', 'Dans la batterie'], e: 'Les résistances de terminaison sont souvent intégrées aux calculateurs d’extrémité.' }),
    ex('can', { img: F + 'eq-calculateur.jpg', q: 'Le signal qui va d’un calculateur vers un actionneur est un signal :', c: ['Analogique de puissance', 'Numérique', 'Analogique de capteur'], e: 'Capteur → calculateur : analogique ; calculateur → actionneur : analogique de puissance ; calculateur → calculateur : numérique.' }),
    ex('can', { img: F + 'eq-calculateur.jpg', q: 'Le signal échangé entre deux calculateurs est :', c: ['Numérique', 'Analogique de puissance', 'Sinusoïdal'], e: 'Entre calculateurs, sur le bus : signal numérique.' }),
    ex('can', { img: F + 'eq-calculateur.jpg', q: 'Dans le calculateur, que contient l’étage d’entrée ?', c: ['Un convertisseur analogique → numérique', 'Un convertisseur numérique → analogique', 'L’interface de ligne'], e: 'Les capteurs envoient de l’analogique ; le micro-ordinateur ne comprend que le numérique.' }),
    ex('can', { q: 'Pour un diagnostic sur un réseau multiplexé, on commence par :', c: ['L’architecture du réseau', 'Changer le calculateur moteur', 'Mesurer la batterie au pèse-acide'], e: 'Connaître l’architecture (quels calculateurs, quelles boucles, où sont les terminaisons).' }),
    ex('can', { q: 'Courant de sortie d’un bus CAN High Speed ?', c: ['25 à 50 mA sur 60 Ω', '5 A', '1 mA'], e: 'Caractéristique du CAN HS : 25 à 50 mA sur 60 Ω, alimentation 5 V.' }),
    ex('capteurs', { img: F + 'eq-cap-inductif.jpg', q: 'Résistance habituelle d’un capteur inductif ?', c: ['100 à 2 000 Ω', '0,5 Ω', '200 kΩ'], e: 'On contrôle sa résistance (100 à 2 000 Ω) et son isolement ; branché, voltmètre en alternatif.' }),
    ex('capteurs', { img: F + 'eq-cap-potentiometre.jpg', q: 'Un potentiomètre de pédale est souvent complété par :', c: ['Un contacteur « pied levé » ou « pied à fond »', 'Un capteur inductif', 'Une diode Zéner'], e: 'Double piste pour l’auto-vérification, plus un contacteur.' }),
    ex('capteurs', { img: F + 'eq-cap-capacitif.jpg', q: 'Capteur capacitif : que fait la tension quand la pression augmente ?', c: ['Elle augmente', 'Elle diminue', 'Elle reste à 5 V'], e: 'Signal linéaire : ex. 1,31 V = 101 kPa ; 5,01 V = 264 kPa.' }),
    ex('capteurs', { img: F + 'eq-cap-passif.jpg', q: 'Sur le fil signal d’un capteur passif débranché, on mesure ≈ 4,80 V. À quoi est-ce dû ?', c: ['À la résistance de pull-up du calculateur (signal stabilisé, état de santé)', 'À un court-circuit', 'À une batterie faible'], e: 'Capteur passif : alimentation 5 V (ou 12 V), signal un peu moins de 5 V (pull-up), masse.' }),
    ex('capteurs', { img: F + 'eq-cap-piezo-electrique.jpg', q: 'Capteur piézo-électrique : quel signal et avec quel appareil le contrôler ?', c: ['Pics de tension sur chocs, de préférence à l’oscilloscope', 'Signal carré 5 V au voltmètre', 'Résistance variable à l’ohmmètre'], e: 'Capteur passif (il reçoit un courant) : au repos stable, il génère des pics de tension sous vibrations ou pressions.' }),
    ex('capteurs', { img: F + 'eq-actionneur-rco.jpg', q: 'Actionneur alimenté 300 µs sur une période de 1 000 µs, sous 24 V. Tension moyenne ?', c: ['7,2 V', '24 V', '3 V'], e: 'Rapport cyclique 300 / 1 000 = 0,3 → 0,3 × 24 = 7,2 V.' }),
    ex('capteurs', { img: F + 'eq-actionneur-rco.jpg', q: 'Actionneur commandé en RCO à 50 % sous 12 V. Tension moyenne ?', c: ['6 V', '12 V', '0,5 V'], e: '12 × 0,5 = 6 V.' })
  ] });
})();
