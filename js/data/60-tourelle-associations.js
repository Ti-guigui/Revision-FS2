/* Associations de composants (précisions du formateur), exercice « Circuit d’orientation de tourelle »
   et schémas PPLD (treuils + push pull, stabilisateurs, schéma électrique). */
(function () {
  /* 1. Associations de composants : à connaître par cœur. */
  REV.extendLesson('hydro/ls', {
    html: `
<div class="box retenir"><b>★ Associations de composants</b><p>Un même composant change de nom selon sa place dans le circuit : une balance de pression placée <b>en série avant un distributeur</b> est une <b>balance individuelle de pression (BIP)</b> ; placée <b>à l’entrée, en dérivation vers la bâche</b>, c’est une <b>balance d’entrée</b>.</p><div class="tw"><table><tr><th>Association</th><th>Assimilée à</th></tr>
<tr><td>Balance d’entrée + tête pilote</td><td><b>Limiteur de pression à commande pilotée</b></td></tr>
<tr><td>Balance individuelle de pression (BIP) + distributeur</td><td><b>Régulateur de débit 2 voies réglable, sensible à la viscosité</b></td></tr>
<tr><td>Distributeur + balance d’entrée</td><td><b>Régulateur de débit 3 voies réglable, sensible à la viscosité</b></td></tr></table></div></div>`,
    retenir: ['Balance d’entrée + tête pilote = limiteur de pression à commande pilotée.', 'Balance individuelle de pression (BIP) + distributeur = régulateur de débit 2 voies réglable, sensible à la viscosité.', 'Distributeur + balance d’entrée = régulateur de débit 3 voies réglable, sensible à la viscosité.']
  });
  REV.addExercises('hydro', {
    lessons: [],
    questions: [
      { l: 'ls', q: 'L’association d’une balance d’entrée et d’une tête pilote peut être assimilée à :', c: ['Un limiteur de pression à commande pilotée', 'Un régulateur de débit 2 voies réglable, sensible à la viscosité', 'Un régulateur de débit 3 voies réglable, sensible à la viscosité', 'Un réducteur de pression'], e: 'La balance d’entrée (étage principal) évacue le gros débit, la tête pilote (étage pilote) fixe la pression : ensemble, c’est un limiteur de pression à commande pilotée. Pression maxi = tarage de la tête pilote + ressort de la balance.', r: 'Balance d’entrée + tête pilote = limiteur de pression à commande pilotée.' },
      { l: 'ls', q: 'L’association d’une balance individuelle de pression (BIP) et d’un distributeur peut être assimilée à :', c: ['Un régulateur de débit 2 voies réglable, sensible à la viscosité', 'Un régulateur de débit 3 voies réglable, sensible à la viscosité', 'Un limiteur de pression à commande pilotée', 'Un diviseur de débit'], e: 'La BIP est placée en série avant le distributeur et garde une ΔP constante à ses bornes : l’ensemble est un régulateur de débit 2 voies réglable, sensible à la viscosité.', r: 'BIP + distributeur = régulateur de débit 2 voies réglable, sensible à la viscosité.' },
      { l: 'ls', q: 'L’association d’un distributeur et d’une balance d’entrée peut être assimilée à :', c: ['Un régulateur de débit 3 voies réglable, sensible à la viscosité', 'Un régulateur de débit 2 voies réglable, sensible à la viscosité', 'Un limiteur de pression à commande pilotée', 'Un réducteur de pression'], e: 'La balance d’entrée est en dérivation et renvoie le surplus de débit à la bâche : c’est la 3ᵉ voie. Le distributeur fait le passage réglable, sensible à la viscosité. Distributeur + balance d’entrée = régulateur de débit 3 voies réglable, sensible à la viscosité.', r: 'Balance d’entrée (vers la bâche) + distributeur = régulateur de débit 3 voies réglable, sensible à la viscosité.' }
    ]
  });

  /* 2. Exercice : circuit d’orientation de tourelle. */
  var IMG = 'tourelle-orientation.jpg';
  REV.addExercises('hydro', {
    lessons: [{
      id: 'tourelle', title: 'Circuit d’orientation de tourelle',
      html: `
<h3>Énoncé</h3>
<figure class="q-img"><a href="img/${IMG}" target="_blank" rel="noopener"><img src="img/${IMG}" alt="Schéma du circuit d’orientation de tourelle"></a></figure>
<ol><li>Quel est ce type de circuit ?</li>
<li>Donnez la désignation et le rôle des composants ?</li>
<li>Que forme l’association des composants (2) et (4) ? Donnez sa symbolisation détaillée.</li>
<li>Représentez avec des couleurs la rotation du moteur hydraulique (sortie en A) pour un travail demandant une pression de 100 b et un débit de 45 l/min ? Complétez le tableau en indiquant les différentes valeurs théoriques relevées sur les manomètres de pression et les débitmètres.</li>
<li>Quelle sera la puissance hydraulique délivrée par la pompe au neutre et en fonctionnement avec une charge maximum ?</li></ol>
<p><b>NOTA :</b> la commande électrique des composants (4) et (9) est simultanée.</p>
<h3>Correction</h3>
<p class="muted small">Pas de corrigé fourni : correction établie avec la méthode du cours (Hydraulique Tome 2, circuit à détection de charge centre ouvert) et les associations vues en cours.</p>
<p><b>1)</b> Circuit ouvert à <b>détection de charge (LS) centre ouvert</b>, pompe à cylindrée fixe.</p>
<div class="tw"><table><tr><th>N°</th><th>Désignation</th><th>Rôle</th></tr>
<tr><td>1</td><td>Pompe à cylindrée fixe (30 cm³/tr, 2 000 tr/min)</td><td>Crée le débit : 30 × 2 000 / 1 000 = 60 l/min</td></tr>
<tr><td>2</td><td>Balance d’entrée (ressort 10 b)</td><td>Renvoie à la bâche le débit non utilisé ; garde ΔP = 10 b aux bornes du distributeur</td></tr>
<tr><td>3</td><td>Tête pilote (limiteur de pression 150 b sur la ligne LS)</td><td>Limite la pression LS : fixe la pression maxi avec la balance d’entrée</td></tr>
<tr><td>4</td><td>Distributeur 4/3 à commande électrique proportionnelle, avec canaux LS A et LS B</td><td>Dose le débit et le sens de rotation du moteur ; envoie l’information de charge</td></tr>
<tr><td>5</td><td>Réducteur de pression 25 b</td><td>Fournit la pression de commande (P2)</td></tr>
<tr><td>6</td><td>Limiteur de pression 30 b</td><td>Protège le circuit de commande</td></tr>
<tr><td>7</td><td>Moteur hydraulique 2 sens de rotation</td><td>Fait tourner la tourelle</td></tr>
<tr><td>8</td><td>Vérin simple effet à rappel par ressort (frein de parc)</td><td>Permet le défreinage du moteur hydraulique lorsque le vérin est alimenté</td></tr>
<tr><td>9</td><td>Distributeur 3/2 à commande électrique, rappel par ressort</td><td>Alimente le vérin de frein de parc pour défreiner (en même temps que 4)</td></tr>
<tr><td>10</td><td>Limiteurs de pression secondaires 200 b avec clapets anti-cavitation</td><td>Protègent le moteur (anti choc) et évitent la cavitation</td></tr></table></div>
<p>Le sélecteur de circuit envoie la plus forte des pressions LS A / LS B vers la balance ; Q1 à Q4 sont des débitmètres, P1 à P4 des manomètres.</p>
<p><b>3)</b> Distributeur (4) + balance d’entrée (2) = <b>régulateur de débit 3 voies réglable, sensible à la viscosité</b>.</p>
<p><b>4)</b> Travail à 100 b et 45 l/min (sortie en A) :</p>
<div class="tw"><table><tr><th>Manomètre</th><th>Valeur</th><th>Débitmètre</th><th>Valeur</th></tr>
<tr><td>P1 (sortie pompe)</td><td><b>110 b</b> (100 b de charge + 10 b de balance)</td><td>Q1 (pompe)</td><td><b>60 l/min</b></td></tr>
<tr><td>P2 (commande)</td><td><b>25 b</b></td><td>Q2 (vers le distributeur)</td><td><b>45 l/min</b></td></tr>
<tr><td>P3 (entrée moteur, A)</td><td><b>100 b</b></td><td>Q3 (retour du distributeur)</td><td><b>45 l/min</b></td></tr>
<tr><td>P4 (sortie moteur)</td><td><b>0 b</b></td><td>Q4 (retour balance d’entrée)</td><td><b>15 l/min</b> (60 − 45)</td></tr></table></div>
<p><b>5)</b> Au neutre : pas de LS, la pompe débite sous le ressort de la balance : Pu = 10 × 60 / 600 = <b>1 kW</b>. Charge maximum : P = 150 (tête pilote) + 10 (balance) = 160 b → Pu = 160 × 60 / 600 = <b>16 kW</b>.</p>`,
      retenir: ['LS centre ouvert : pompe à cylindrée fixe + balance d’entrée.', 'P pompe = P charge + ressort de balance (100 + 10 = 110 b).', 'Pression maxi = tête pilote + ressort de balance (150 + 10 = 160 b).', 'Distributeur + balance d’entrée = régulateur de débit 3 voies réglable, sensible à la viscosité.'],
      memo: { cle: 'P POMPE = CHARGE + BALANCE', points: ['Neutre : 10 b → 1 kW', 'Travail : 110 b, 45 l/min au moteur, 15 l/min à la bâche', 'Butée : 160 b → 16 kW'], astuce: 'Q1 = Q2 + Q4 : ce que le moteur ne prend pas repart par la balance.' }
    }],
    questions: [
      { a: 0, q: '1) Quel est ce type de circuit ?', c: ['Circuit ouvert à détection de charge (LS) centre ouvert, pompe à cylindrée fixe', 'Circuit LS centre fermé, pompe à cylindrée variable', 'Circuit fermé (transmission hydrostatique)'], e: 'Pompe à cylindrée fixe + balance d’entrée qui renvoie le surplus à la bâche : LS centre ouvert.' },
      { a: 0, q: '3) Que forme l’association des composants (2) et (4) ?', c: ['Un régulateur de débit 3 voies réglable, sensible à la viscosité', 'Un régulateur de débit 2 voies réglable, sensible à la viscosité', 'Un limiteur de pression à commande pilotée'], e: 'Distributeur (4) + balance d’entrée (2) = régulateur de débit 3 voies réglable, sensible à la viscosité (la balance renvoie le surplus à la bâche).' },
      { a: 0, q: 'Que forme l’association des composants (2) et (3) ?', c: ['Un limiteur de pression à commande pilotée', 'Un régulateur de débit 3 voies réglable, sensible à la viscosité', 'Un réducteur de pression'], e: 'Balance d’entrée (2) + tête pilote (3) = limiteur de pression à commande pilotée : pression maxi 150 + 10 = 160 b.' },
      { a: 1, q: '4) Rotation à 100 b et 45 l/min : pression P1 en sortie de pompe ?', c: ['100 b', '110 b', '160 b'], e: 'P pompe = pression de charge + ressort de la balance d’entrée = 100 + 10 = 110 b.' },
      { a: 2, q: '4) Rotation à 100 b et 45 l/min : débit Q4 au retour de la balance d’entrée ?', c: ['0 l/min', '45 l/min', '15 l/min'], e: 'Q1 = 30 × 2 000 / 1 000 = 60 l/min ; le moteur prend 45 l/min, la balance renvoie 60 − 45 = 15 l/min.' },
      { a: 0, q: '4) Pression P2 du circuit de commande ?', c: ['25 b (réducteur de pression)', '30 b (limiteur)', '10 b (balance)'], e: 'P2 est fixée par le réducteur de pression 5 à 25 b ; le limiteur 6 (30 b) protège le circuit de commande.' },
      { a: 0, q: '5) Puissance hydraulique délivrée par la pompe au neutre ?', c: ['1 kW', '0 kW', '16 kW'], e: 'Au neutre, la pompe débite 60 l/min sous le ressort de la balance : 10 × 60 / 600 = 1 kW.' },
      { a: 2, q: '5) Puissance hydraulique délivrée par la pompe avec une charge maximum ?', c: ['15 kW', '26,7 kW', '16 kW'], e: 'Pression maxi = tête pilote 150 b + balance 10 b = 160 b : 160 × 60 / 600 = 16 kW.' },
      { a: 0, q: 'Rôle des composants (8) et (9) ?', c: ['8 = vérin simple effet à rappel par ressort (frein de parc) ; 9 = distributeur 3/2 à commande électrique qui l’alimente en même temps que le distributeur 4', '8 = limiteur de pression ; 9 = sélecteur de circuit', '8 = accumulateur ; 9 = clapet anti-retour'], e: 'NOTA de l’exercice : la commande électrique de 4 et 9 est simultanée : le vérin de frein de parc est alimenté (défreinage) quand on commande la rotation.' }
    ].map(function (q) { q.l = 'tourelle'; q.fixed = true; q.img = IMG; return q; })
  });

  /* 3. Schémas PPLD. */
  REV.extendLesson('ppld/rsq240', {
    images: [
      { src: 'ppld/treuils-push-pull.jpg', cap: 'Treuils + push pull : dévidage, halage, push pull moteur et vérin (régulateurs 15 et 30 l/min, limiteurs 150 b et 190 b)' },
      { src: 'ppld/schema-hydraulique-complet.jpg', cap: 'Schéma hydraulique complet : RSQ 240 (treuils, grue, RMU) et CETOP (stabilisateurs)' }
    ]
  });
  REV.extendLesson('ppld/cetop', {
    images: [{ src: 'ppld/stabilisateurs.jpg', cap: 'Les stabilisateurs : régulateur de débit 40 l/min en amont, étage principal 20 b + étage pilote 200 b, gicleurs 0,5 et 0,7, solénoïde de décharge LS' }]
  });
  REV.extendLesson('ppld/diagnostic', {
    images: [{ src: 'ppld/schema-electrique.jpg', cap: 'Schéma électrique : électrovannes (électrovannes by-pass RSQ 240 et CETOP, push pull, treuils), capteurs de fin de course, radiocommande, solénoïde de décharge LS' }]
  });
})();
