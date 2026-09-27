/* Équipement électrique : deuxième série de compléments (fiches « Révision », alternateurs, régulateurs, LIN, capteurs). */
(function () {
  var F = 'fiches/';
  function im(src, cap) { return { src: F + src + '.jpg', cap: cap }; }

  REV.extendLesson('equip/batterie', {
    html: `
<h3>Tensions par élément</h3>
<div class="tw"><table><tr><th></th><th>Par élément</th><th>12 V</th><th>24 V</th></tr>
<tr><td>Tension à vide (chargée)</td><td>2,1 V</td><td>12,6 V</td><td>25,2 V</td></tr>
<tr><td>Minimum sous l’action du démarreur</td><td>1,6 V (tolérable)</td><td>9,6 V</td><td>19,2 V</td></tr></table></div>
<p>3 valeurs à prendre en compte sur une batterie : la <b>tension</b>, la <b>capacité</b> et le <b>courant maxi sur 20 s</b>.</p>`,
    retenir: ['2,1 V par élément à vide : 12,6 V (12 V) · 25,2 V (24 V).', 'Au démarrage : 1,6 V par élément tolérable → 9,6 V · 19,2 V.']
  });

  REV.extendLesson('equip/alternateur', {
    images: [im('eq-alt-pont-triphase', 'Stator triphasé et pont de 6 diodes de redressement (2 par phase)'), im('eq-regulateur-9d', 'Régulateur : la tension de l’inducteur est pilotée par le régulateur (Zéner 15 V)'), im('eq-regulateur-6d', 'Alternateur 6 diodes à régulateur incorporé : régulateur à 2 transistors PNP, Zéner, diode de roue libre')],
    html: `
<h3>Rotation et fixe</h3>
<p>Alternateur : <b>rotation = inducteur = rotor</b> ; <b>fixe = induit = stator</b>. L’inducteur tourne à l’intérieur de l’induit ; l’inducteur <b>génère</b> un champ magnétique, l’induit le <b>reçoit</b>. La tension de l’inducteur est pilotée par le régulateur.</p>
<h3>9 diodes (1 borne L ou D+, monofonction)</h3>
<ul><li>6 diodes de puissance (redressement, 2 par phase) + 3 diodes trio d’excitation : <b>séparation des phases de puissance et d’excitation</b>.</li>
<li>Contact mis : <b>2 à 3 V sur L ou D+</b> (lampe et inducteur connectés) ; moteur tournant : tension de régulation.</li>
<li>Régulateur HS = surchauffe. 1 diode trio HS = surtension. 2 ou 3 diodes trio HS = <b>sous-tension</b> : l’alternateur ne charge plus, la batterie se décharge dans l’induit.</li>
<li>Absence du témoin de charge : l’alternateur ne fonctionne pas (régulateur non alimenté). Dépannage : shunter +BAT vers +L pour le démarrage.</li></ul>
<h3>6 diodes à régulateur incorporé (2 bornes, multifonction)</h3>
<ul><li>Sur le régulateur : 1 +BAT et 1 +L (témoin).</li>
<li>Régulateur : 2 transistors PNP (driver) · 1 diode Zéner (tension Zéner pour le découpage) · 1 inducteur · 1 diode de roue libre (protection).</li></ul>
<h3>12 diodes à régulateur incorporé</h3>
<ul><li><b>Double pont de diodes de puissance</b>, <b>2 stators décalés</b> ; 2 bornes : +BAT / L ou D+.</li>
<li>Avantages : courant continu avec <b>moins d’ondulation</b> (plus lisse) ; <b>meilleur rendement</b> et charge plus stable ; pic de tension atteint plus tôt → <b>meilleure charge à bas régime</b>.</li></ul>`,
    retenir: ['Alternateur : inducteur = rotor (tourne, génère le champ) ; induit = stator (fixe, reçoit le champ).', '2 ou 3 diodes trio HS = sous-tension, plus de charge.', '12 diodes : double pont, 2 stators décalés → moins d’ondulation, meilleure charge à bas régime.']
  });

  REV.extendLesson('equip/lin', {
    html: `
<ul><li>IBS : sur la masse (le moins) de la batterie, ou <b>bague ampèremétrique</b> au plus près du + de l’alternateur ; un fil de petite section.</li>
<li>LIN contact mis ≈ 80 % de Ubat, soit <b>10 à 12 V</b> (relevé sur le fil LIN de l’alternateur).</li>
<li>Tension de charge : 10,7 à 16 V selon la demande ; <b>17 V possible pour le désulfatage</b> de la batterie (fonctionnement de 10,7 à 17 V).</li>
<li>Dialogue numérique entre l’ECU et l’alternateur : commander la tension de l’inducteur (excitation selon l’ECU), envoyer la température, régler la tension de consigne.</li>
<li>Voyant moteur + témoin de charge corrects = bus LIN correct.</li>
<li>Avantages : pilotage précis de la tension par l’ECU, échange d’informations et diagnostic via le LIN, régulation adaptée à l’état de santé des batteries.</li></ul>`,
    retenir: ['17 V possible pour désulfater la batterie (fonctionnement 10,7 à 17 V).', 'IBS sur le moins batterie, ou bague ampèremétrique près du + alternateur.']
  });

  REV.extendLesson('equip/capteurs', {
    html: `
<ul><li><b>Actionneurs</b> : souvent complétés d’un potentiomètre pour connaître leur position.</li>
<li><b>Injecteurs</b> : tout ou rien, ou alimentés en RCO / PWM ; <b>bobine d’allumage</b> : on / off.</li>
<li><b>Sonde lambda</b> : optimise le rapport air / carburant.</li>
<li>Calculateur : l’<b>interface de ligne</b> remet en forme les signaux numériques ; le <b>contrôleur de protocole</b> fait le tri et rejette un message si la trame est corrompue.</li></ul>`,
    retenir: ['Actionneur souvent complété d’un potentiomètre (position).']
  });

  var ex = function (l, q) { q.l = l; return q; };
  REV.addExercises('equip', { lessons: [], questions: [
    ex('batterie', { q: 'Tension à vide d’un élément de batterie chargé ?', c: ['2,1 V', '1,6 V', '2,5 V'], e: '2,1 V par élément : 12,6 V pour une 12 V, 25,2 V pour une 24 V.' }),
    ex('batterie', { q: 'Tension à vide d’une batterie 24 V chargée ?', c: ['25,2 V', '24 V', '28 V'], e: '12 éléments × 2,1 V = 25,2 V.' }),
    ex('batterie', { q: 'Sous l’action du démarreur, tension minimale tolérable par élément ?', c: ['1,6 V', '2,1 V', '1 V'], e: '1,6 V × 6 = 9,6 V (12 V) ; × 12 = 19,2 V (24 V).' }),
    ex('batterie', { q: 'Les 3 valeurs à prendre en compte sur une batterie ?', c: ['Tension, capacité, courant maxi sur 20 s', 'Tension, poids, densité', 'Capacité, marque, date'], e: 'Tension (V), capacité (Ah), courant de démarrage (A pendant 20 s).' }),
    ex('alternateur', { img: F + 'eq-alt-pont-triphase.jpg', q: 'Dans l’alternateur, quel élément tourne à l’intérieur de l’autre ?', c: ['L’inducteur (rotor) tourne à l’intérieur de l’induit (stator)', 'L’induit tourne à l’intérieur de l’inducteur', 'Le pont de diodes tourne avec le rotor'], e: 'Alternateur : rotation = inducteur = rotor ; fixe = induit = stator (l’inverse du démarreur).' }),
    ex('alternateur', { q: 'Dans l’alternateur, que fait l’inducteur et que fait l’induit ?', c: ['L’inducteur génère un champ magnétique, l’induit le reçoit', 'L’induit génère le champ, l’inducteur le reçoit', 'Les deux génèrent un champ'], e: 'L’inducteur (rotor) crée le champ ; l’induit (stator) produit le courant.' }),
    ex('alternateur', { img: F + 'eq-regulateur-9d.jpg', q: 'Qui pilote la tension de l’inducteur ?', c: ['Le régulateur', 'Le pont de diodes', 'La lampe témoin'], e: 'Le régulateur dose le courant d’excitation de l’inducteur pour tenir la tension de régulation.' }),
    ex('alternateur', { q: 'Alternateur 9 diodes, contact mis, moteur arrêté : tension sur la borne L ou D+ ?', c: ['2 à 3 V (lampe et inducteur connectés)', '0 V', 'La tension de régulation'], e: 'Moteur tournant, on retrouve la tension de régulation sur L ou D+.' }),
    ex('alternateur', { q: 'Alternateur 9 diodes : 2 ou 3 diodes trio HS. Conséquence ?', c: ['Sous-tension : il ne charge plus, la batterie se décharge dans l’induit', 'Surtension', 'Aucune'], e: '1 diode trio HS = surtension ; 2 ou 3 = sous-tension, plus de charge.' }),
    ex('alternateur', { q: 'Pourquoi l’alternateur 9 diodes a-t-il 6 diodes de puissance et 3 diodes trio ?', c: ['Pour séparer les phases de puissance et d’excitation', 'Pour doubler le courant', 'Pour alimenter le compte-tours'], e: 'Les 6 diodes redressent le courant de charge ; les 3 diodes trio fournissent l’excitation.' }),
    ex('alternateur', { img: F + 'eq-regulateur-6d.jpg', q: 'Composition du régulateur d’un alternateur 6 diodes à régulateur incorporé ?', c: ['2 transistors PNP, 1 diode Zéner, 1 inducteur, 1 diode de roue libre', '4 diodes et 1 condensateur', '1 relais et 1 fusible'], e: 'Zéner : tension de découpage ; diode de roue libre : protection.' }),
    ex('alternateur', { q: 'Alternateur 12 diodes à régulateur incorporé : comment est-il constitué ?', c: ['Double pont de diodes de puissance et 2 stators décalés', '9 diodes et 3 diodes trio', 'Un seul pont de 6 diodes'], e: '2 bornes : +BAT / L ou D+.' }),
    ex('alternateur', { q: 'Avantage de l’alternateur 12 diodes ?', c: ['Courant plus lisse (moins d’ondulation), meilleur rendement, meilleure charge à bas régime', 'Il n’a pas besoin de régulateur', 'Il fonctionne sans batterie'], e: 'Le pic de tension est atteint plus tôt : meilleure charge à bas régime.' }),
    ex('lin', { q: 'Alternateur piloté par LIN : quelle tension maximale est possible, et pourquoi ?', c: ['17 V, pour désulfater la batterie', '13,2 V, pour protéger les calculateurs', '24 V, pour démarrer'], e: 'Fonctionnement de 10,7 à 17 V ; 17 V possible pour le désulfatage.' }),
    ex('lin', { q: 'Où peut-on trouver le capteur IBS ?', c: ['Sur le moins de la batterie, ou sous forme de bague ampèremétrique près du + alternateur', 'Dans le démarreur', 'Sur la prise OBD'], e: 'L’IBS mesure l’état de la batterie ; il est relié par un fil de petite section.' }),
    ex('lin', { q: 'Voyant moteur et témoin de charge fonctionnent correctement. Que peut-on dire du bus LIN ?', c: ['Il est correct', 'Il est coupé', 'Il est saturé'], e: 'Bus LIN coupé = mode secours, tension fixe 13,2 V.' }),
    ex('capteurs', { q: 'Pourquoi un actionneur est-il souvent complété d’un potentiomètre ?', c: ['Pour connaître sa position', 'Pour l’alimenter', 'Pour le protéger des surtensions'], e: 'Le potentiomètre renvoie au calculateur la position réelle de l’actionneur.' }),
    ex('can', { q: 'Dans un calculateur, rôle de l’interface de ligne ?', c: ['Remettre en forme les signaux numériques (entre 0 et 5 V) et se connecter au bus', 'Construire la trame', 'Convertir le signal des capteurs'], e: 'Le contrôleur de protocole fait le tri et rejette une trame corrompue ; l’interface de ligne met les signaux sur le bus.' })
  ] });
})();
