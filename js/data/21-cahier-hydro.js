/* Cahier d'exercices hydrauliques (EMB Bourges, préparation CT1, 26/01/2013).
   Questions reprises mot pour mot ; les bonnes réponses sont celles de la CORRECTION du cahier (le cahier fait foi). */
(function () {
  var SRC = 'Cahier d’exercices hydrauliques EMB (corrigé officiel)';

  // Génère des QCM « repère → désignation » à partir d'un tableau de correction.
  function designations(lesson, prefix, img, list, extra) {
    var n = list.length;
    return list.map(function (it, i) {
      var c = [it[1]], k = 1;
      while (c.length < 3 && k < n * 2) {
        var o = list[(i + k * 7) % n][1];
        if (c.map(function (x) { return x.toLowerCase(); }).indexOf(o.toLowerCase()) < 0) c.push(o);
        k++;
      }
      return { l: lesson, q: prefix + ' — Repère ' + it[0] + ' : quelle est sa désignation ?', c: c, img: img,
        e: 'Correction du cahier : repère ' + it[0] + ' = <b>' + it[1] + '</b>.' + (it[2] ? ' ' + it[2] : ''),
        r: extra || '', src: SRC };
    });
  }

  var q10 = [
    ['1', 'Limiteur de pression principal à commande pilotée, réglable, taré à 150 b', 'Il est juste après la pompe, entre la pompe et le distributeur : c’est lui qui fixe la pression maxi de tout le circuit. Pilotage = symbole avec un 2ᵉ étage (pilote).'],
    ['2', 'Soupape réductrice de pression 2 voies réglable tarée à 25 b', 'Normalement ouverte, pilotée par la pression de sortie : elle garde 25 b constants en aval, quelle que soit la pression en amont.'],
    ['3 et 4', 'Soupapes de séquence 2 voies, réglables, tarées à 80 b et à 100 b', 'Normalement fermées, elles ne laissent passer l’huile vers le récepteur suivant qu’une fois leur pression de tarage atteinte : elles imposent un ORDRE de fonctionnement.'],
    ['5 et 7', 'Limiteurs de pression secondaires à action directe, réglables, tarés à 100 b et 120 b', 'Placés entre le distributeur et le récepteur : ils ne protègent que leur branche.'],
    ['6', 'Limiteur de pression secondaire anti-choc (SAC) à action directe, réglable, taré à 300 b', 'Taré au-dessus du limiteur principal (150 b) : il n’écrête que les pointes de pression (chocs) quand le distributeur est au neutre.'],
    ['8', 'Soupape d’équilibrage réglable', 'Pilotage interne : elle retient une charge qui tend à descendre seule (charge menante constante) ; le clapet anti-retour en parallèle laisse remonter librement.'],
    ['9', 'Bloc de freinage réglable', 'Deux soupapes de freinage à pilotage croisé : chaque sens de mouvement est retenu tant que la ligne opposée n’est pas alimentée.'],
    ['A', 'Limiteur de débit sensible à la viscosité, réglable, double effet', 'Étranglement réglable (flèche oblique) sans clapet : il agit dans les deux sens ; un simple étranglement est sensible à la viscosité (température de l’huile).']
  ];
  var q11 = [
    ['1', 'Bloc pompe'], ['2', 'Pompe hydraulique 2 sens de flux, cylindrée variable, drainée externe'],
    ['3', 'Pompe hydraulique 1 sens de flux, cylindrée fixe (pompe de gavage)'], ['4', 'Pompe 1 sens de flux, cylindrée fixe'],
    ['5', 'Distributeur 4/3 commande électrique proportionnelle, progressif, rappel par ressort (servo-distributeur)'],
    ['6', 'Servo-piston : vérin équilibré double effet rappel par ressort'], ['7', 'Robinet d’isolement'],
    ['8', 'Filtre basse pression à l’aspiration'], ['9', 'Limiteur de débit insensible à la viscosité double effet'],
    ['10', 'Limiteur de pression de gavage 12 – 30 bars'], ['11', 'Soupapes HP'],
    ['12', 'Moteur hydraulique 2 sens de rotation, cylindrée fixe, drainé externe'], ['13', 'Vanne de remorquage'],
    ['14', 'Filtre basse pression à l’aspiration (pompe 4)'], ['15', 'Diviseur de débit à action prioritaire'],
    ['16', 'Clapet anti-retour (sortie du diviseur prioritaire vers la direction)'], ['17', 'Boîtier de direction hydrostatique centre fermé à régulation LS'],
    ['18', 'Vérin double effet différentiel (direction)'], ['19', 'Soupapes secondaires anti-chocs tarées à 200 bar'],
    ['20', 'Limiteur de pression à action directe réglable taré à 140 bar'], ['21', 'Bloc de distributeurs'],
    ['22', 'Distributeur 4/3 commande électrique, rappel par ressort, centre ouvert en tandem'],
    ['23', 'Limiteur de pression principal à action directe réglable taré à 230 bar'], ['24', 'Vérin double effet (élévation)'],
    ['25', 'Soupape de freinage tarée à 170 bar réglable'], ['26', 'Limiteur de pression secondaire réglable'],
    ['27', 'Limiteur de pression à action directe, réglable, taré à 80 bar'], ['28', 'Vérin double effet (basculement)'],
    ['29', 'Soupape de freinage tarée à 210 bar réglable'], ['30', 'Refroidisseur équipé d’un clapet anti-retour'],
    ['31', 'Filtre basse pression (retour)'], ['32', 'Bâche hydraulique atmosphérique'],
    ['33', 'Pompe hydraulique 1 sens de flux cylindrée fixe à commande manuelle'], ['34', 'Clapet anti-retour (pompe à main 33)']
  ];
  var q12 = [
    ['1', 'Pompe à cylindrée variable, deux sens de flux (pompe principale)', 'Rôle : transforme l’énergie mécanique en énergie hydraulique en créant le débit.'],
    ['2', 'Pompe à cylindrée fixe, un sens de flux (pompe de gavage)', 'Rôle : crée le débit de gavage ; alimente les circuits de commande de cylindrée (servocommande) et de frein de parc.'],
    ['3', 'Limiteur de gavage', 'Rôle : protège le circuit de gavage ; limite la pression de gavage à 25 b quand le servo-distributeur est au neutre.'],
    ['4', 'Clapets d’alimentation (clapets de gavage)', 'Rôle : gaver tout le circuit quand la pompe principale est au neutre ; alimenter la branche en basse pression pendant le fonctionnement.'],
    ['5', 'Soupapes haute pression réglables', 'Rôle : protéger la branche de la boucle qui est en haute pression en cas de pic de pression (rôle de l’anti-choc d’un circuit ouvert) ; définissent la pression maxi du circuit HP.'],
    ['6', 'Servo-distributeur : distributeur 4/3 à commande électrique, rappel par ressort, centre fermé (A B Y sur T)', 'Rôle : commande le déplacement du servo-piston (vérin équilibré) dans les deux sens.'],
    ['7', 'Vérin équilibré rappel par ressorts (servo-piston)', 'Rôle : commande la variation de cylindrée de la pompe (et le sens de marche). L’ensemble 6 + 7 = la servocommande.'],
    ['8', 'Moteur thermique', 'Rôle : transmet la puissance mécanique (vitesse et couple) à la pompe hydraulique.'],
    ['9', 'Filtre basse pression', 'Rôle : filtration du circuit de gavage sur l’aspiration.'],
    ['10', 'Robinet d’isolement', 'Ouvert : laisse passer le fluide (fonctionnement normal). Fermé : isole la bâche pour intervenir sur le circuit de la pompe sans vidanger la bâche.'],
    ['11', 'Robinet 3 voies à commande manuelle (commande du frein de parking)', 'Neutre : garde une pression en attente et renvoie à la bâche le côté tige du vérin 15. Travail : alimente le côté tige du vérin 15.'],
    ['12', 'Refroidisseur', 'Rôle : refroidir le circuit en chassant les calories.'],
    ['13', 'Prise de pression', 'Rôle : brancher un manomètre pour lire une pression.'],
    ['14', 'Manocontact (pressostat)', 'Rôle : ferme un contact électrique à une pression déterminée (témoin au tableau de bord).'],
    ['15', 'Vérin simple effet à rappel par ressort (frein de parc)', 'Rôle : défreine le moteur hydraulique quand il est alimenté (frein à manque de pression).'],
    ['16', 'Moteur hydraulique à cylindrée fixe, deux sens de rotation, drainage externe', 'Rôle : transforme l’énergie hydraulique en énergie mécanique de rotation.'],
    ['17', 'Robinet d’isolement (mise à flot / remorquage)', 'Rôle : met les moteurs hydrauliques à flot pour remorquer l’engin à faible vitesse sur courte distance.'],
    ['18', 'Distributeur 3/3 à commande hydraulique, rappel par ressort, centre fermé (tiroir d’échange)', 'Rôle : en position commandée, renvoie la BP de la boucle à la bâche pour la régulation thermique.'],
    ['19', 'Limiteur de pression du circuit d’échange', 'Rôle : maintient une pression dans la BP quand le tiroir d’échange est commandé ; son tarage est toujours inférieur à celui du limiteur de gavage. 18 + 19 = le bloc d’échange.']
  ];

  var qs = [
    // ---------- Calculs ----------
    { l: 'cahier-calculs', q: 'Q01 — Un vérin a une section de 15 cm², il doit déplacer une charge de 3000 daN. Quelle sera la pression nécessaire au déplacement du fardeau ?', c: ['200 bars', '45 000 bars', '20 bars'], e: 'P = F / S = 3000 / 15 = <b>200 bars</b> (daN ÷ cm² = bar).', r: 'P (bar) = F (daN) / S (cm²).', src: SRC },
    { l: 'cahier-calculs', q: 'Q02 — Une pompe, qui a une cylindrée de 30 cm³, est entraînée à une vitesse de 3000 tr/min. Quel est son débit ?', c: ['90 l/min', '9 l/min', '900 l/min'], e: 'Q = V × N / 1000 = 30 × 3000 / 1000 = <b>90 l/min</b>.', r: 'Q (l/min) = V (cm³/tr) × N (tr/min) / 1000.', src: SRC },
    { l: 'cahier-calculs', q: 'Q03 — Sachant que ma pompe débite 90 l/min, et que dans le circuit la pression est de 200 bars, quelle est la puissance utile (en watts) du circuit ?', c: ['30 000 W', '30 W', '18 000 W'], e: 'Pu = P × Q / 600 = 200 × 90 / 600 = 30 kW, donc <b>30 000 W</b>.', r: 'Pu (kW) = P (bar) × Q (l/min) / 600.', w: 'La question demande des watts : 30 kW = 30 000 W.', src: SRC },
    { l: 'cahier-calculs', q: 'Q04 — Une pompe hydraulique de cylindrée 30 cm³/tr, entraînée à une vitesse de 1500 tr/min, alimente un vérin ayant une surface de 10 cm². La pression de service est de 300 bars. Calculez la vitesse de sortie du vérin !', c: ['0,75 m/s', '4,5 m/s', '0,075 m/s'], e: 'On calcule d’abord Q = 30 × 1500 / 1000 = 45 l/min. Puis v = Q / (6 × S) = 45 / (6 × 10) = <b>0,75 m/s</b>. La pression (300 b) ne sert pas au calcul de la vitesse.', r: 'v (m/s) = Q (l/min) / (6 × S (cm²)).', w: 'Donnée piège : la pression ne change pas la vitesse, seul le débit compte.', src: SRC },
    { l: 'cahier-calculs', q: 'Q05 (1) — Un circuit hydraulique développant 30 kW est alimenté par une pompe hydraulique de 40 cm³/tr de cylindrée. Celle-ci est entraînée à une vitesse de 3000 tr/min. Le vérin qui est alimenté a une surface de 40 cm². Quelle est la vitesse de déplacement du vérin ?', c: ['0,5 m/s', '5 m/s', '0,05 m/s'], e: 'Q = 40 × 3000 / 1000 = 120 l/min ; v = 120 / (6 × 40) = <b>0,5 m/s</b>.', r: 'Toujours calculer Q en premier.', src: SRC },
    { l: 'cahier-calculs', q: 'Q05 (2) — Même circuit (30 kW, pompe 40 cm³/tr à 3000 tr/min, vérin 40 cm²). Quelle est la force maximale du vérin ?', c: ['6000 daN', '150 daN', '4800 daN'], e: 'P = Pu × 600 / Q = 30 × 600 / 120 = 150 bars ; F = P × S = 150 × 40 = <b>6000 daN</b>.', r: 'P = Pu × 600 / Q puis F = P × S.', src: SRC },
    { l: 'cahier-calculs', q: 'Q06 (1) — Un circuit hydraulique peut soulever une charge maximale de 2400 daN. La surface du vérin est de 8 cm². La cylindrée de la pompe est de 40 cm³/tr, et la puissance hydraulique du circuit est de 40 kW. Calculer le régime de rotation de la pompe.', c: ['2000 tr/min', '1500 tr/min', '3000 tr/min'], e: 'P = F / S = 2400 / 8 = 300 bars ; Q = Pu × 600 / P = 40 × 600 / 300 = 80 l/min ; N = Q × 1000 / V = 80 × 1000 / 40 = <b>2000 tr/min</b>.', r: 'N = Q × 1000 / V.', src: SRC },
    { l: 'cahier-calculs', q: 'Q06 (2) — Même circuit (2400 daN, vérin 8 cm², pompe 40 cm³/tr, 40 kW). Calculer la vitesse de déplacement du vérin.', c: ['1,66 m/s', '0,6 m/s', '16,6 m/s'], e: 'v = Q / (6 × S) = 80 / (6 × 8) = <b>1,66 m/s</b>.', src: SRC },
    { l: 'cahier-calculs', q: 'Q07 (1) — Une pompe débite 2700 l/h, le vérin qu’elle alimente a une vitesse de sortie de 0,75 m/s. Quelle est la surface de ce vérin ?', c: ['10 cm²', '600 cm²', '1 cm²'], e: '2700 l/h ÷ 60 = 45 l/min. S = Q / (6 × v) = 45 / (6 × 0,75) = <b>10 cm²</b>.', w: 'Convertir d’abord les l/h en l/min (÷ 60).', src: SRC },
    { l: 'cahier-calculs', q: 'Q07 (2) — Même circuit (2700 l/h, 0,75 m/s). Sachant que ce circuit a une puissance de 30,57 cv, quelle est la pression dans le circuit ?', c: ['300 bars (299,99)', '407 bars', '30 bars'], e: '1 cv = 736 W → 30,57 × 736 = 22 499,52 W = 22,5 kW. P = Pu × 600 / Q = 22,5 × 600 / 45 ≈ <b>300 bars</b>.', r: '1 cv = 736 W.', src: SRC },
    { l: 'cahier-calculs', q: 'Q08 — Sachant que ma pompe a un débit de 50 l/min, et qu’elle a une cylindrée de 0,1 dm³. Quelle est sa vitesse de rotation ?', c: ['500 tr/min', '5000 tr/min', '5 tr/min'], e: '0,1 dm³ = 100 cm³. N = Q × 1000 / V = 50 × 1000 / 100 = <b>500 tr/min</b>.', w: '1 dm³ = 1000 cm³ : convertir avant de calculer.', src: SRC },
    { l: 'cahier-calculs', q: 'Q09 (1) — À l’aide de mon bras hydraulique, je veux soulever une charge de 12500 daN. Le limiteur de pression principal est taré à 210 bars. Sachant que mon vérin a un alésage de 40 mm de rayon, que pouvez-vous constater et pourquoi ?', c: ['Impossible : il faut 250 bars et le limiteur s’ouvre à 210 bars', 'Possible : il faut 125 bars, moins que 210 bars', 'Possible : il faut 210 bars exactement'], e: 'Rayon 40 mm = 4 cm → S = π × R² = 3,14 × 16 ≈ 50 cm². P = F / S = 12 500 / 50 = <b>250 bars</b>. Le limiteur principal s’ouvre à 210 bars (pression maxi d’utilisation) : on ne pourra pas lever la charge.', w: 'Rayon ≠ diamètre : S = π × R² ou π × D² / 4 (D = 8 cm).', src: SRC },
    { l: 'cahier-calculs', q: 'Q09 (2) — Même bras (vérin de 40 mm de rayon, limiteur taré à 210 bars). Quelle charge maximum pourrez-vous lever ?', c: ['10 500 daN', '12 500 daN', '4 200 daN'], e: 'F = P × S = 210 × 50 = <b>10 500 daN</b>.', src: SRC },
    { l: 'cahier-calculs', q: 'Q10 — Dans un circuit ayant une pression de 200 × 10⁵ pascals, un débit de pompe de 2,7 m³/h, calculez la puissance de ce circuit.', c: ['15 kW', '150 kW', '1,5 kW'], e: '200 × 10⁵ Pa = 200 bars (1 bar = 10⁵ Pa). 2,7 m³/h = 2700 l/h = 45 l/min. Pu = 200 × 45 / 600 = <b>15 kW</b>.', w: 'Le corrigé du cahier écrit « Pu = 15 w » : c’est une faute de frappe, le résultat de la formule /600 est en kW (15 kW).', src: SRC },

    // ---------- Composants ----------
    { l: 'cahier-composants', q: 'Q01 — Désignations et rôles des éléments 1, 2 et 3 : l’élément 1 est…', img: 'cah/hq01.png', c: ['Pompe hydraulique à cylindrée fixe, un sens de flux : crée le débit (énergie mécanique de rotation → énergie hydraulique)', 'Moteur hydraulique à cylindrée fixe : transforme l’énergie hydraulique en rotation', 'Pompe à cylindrée variable, deux sens de flux'], e: 'Triangle plein orienté vers l’extérieur = pompe ; un seul triangle = un sens de flux ; pas de flèche qui traverse = cylindrée fixe.', r: 'Triangle vers l’extérieur = pompe ; vers l’intérieur = moteur.', src: SRC },
    { l: 'cahier-composants', q: 'Q01 — Désignations et rôles des éléments 1, 2 et 3 : l’élément 2 est…', img: 'cah/hq01.png', c: ['Distributeur 4/3 centre ouvert, commande pneumatique, rappel par ressort : oriente le fluide dans le sens désiré', 'Distributeur 4/2 commande électrique : oriente le fluide', 'Distributeur 4/3 centre fermé, commande manuelle'], e: '4 orifices (p = pompe, t = bâche, a et b = récepteur), 3 cases = 3 positions. Centre ouvert : au neutre l’huile va de la pompe à la bâche par le distributeur. Triangle vide = commande pneumatique ; ressorts = rappel.', r: 'Triangle vide = pneumatique ; triangle plein = hydraulique.', src: SRC },
    { l: 'cahier-composants', q: 'Q01 — Désignations et rôles des éléments 1, 2 et 3 : l’élément 3 est…', img: 'cah/hq01.png', c: ['Vérin hydraulique double effet : transforme l’énergie hydraulique en énergie mécanique de translation', 'Vérin simple effet : transforme l’énergie hydraulique en rotation', 'Accumulateur hydraulique'], e: 'Une canalisation arrive côté fond (S2) et une côté tige (s2) : double effet. Un vérin produit un mouvement de translation.', src: SRC },
    { l: 'cahier-composants', q: 'Q02 — Symbolisez une pompe à cylindrée variable, deux sens de flux, drainage externe. Le symbole comporte :', c: ['2 triangles pleins vers l’extérieur, une flèche oblique qui traverse le cercle, un trait pointillé vers la bâche', '1 triangle plein vers l’intérieur, pas de flèche, pas de drain', '2 triangles vides, une flèche oblique, pas de drain'], e: 'Deux triangles = deux sens de flux ; flèche oblique traversante = cylindrée variable ; ligne pointillée vers la bâche = drainage externe (corrigé : schéma ci-dessous).<br><img src="img/cah/hr02.png" alt="Symbole pompe cylindrée variable 2 sens de flux drainage externe" style="max-width:100%">', src: SRC },
    { l: 'cahier-composants', q: 'Q03 — Quel composant allez-vous mettre pour protéger ce circuit ? Placez-le dans le circuit ci-dessous.', img: 'cah/hq03.png', c: ['Un limiteur de pression principal, entre la pompe et le distributeur', 'Un limiteur de pression secondaire, entre le distributeur et le vérin', 'Un clapet anti-retour sur l’aspiration'], e: 'Corrigé : un limiteur de pression principal. Rôle : définir la pression max de service, afin de protéger le circuit, en envoyant le débit à la bâche.<br><img src="img/cah/hr03.png" alt="Limiteur principal placé après la pompe" style="max-width:100%">', r: 'Principal = juste après la pompe, avant le distributeur.', src: SRC },
    { l: 'cahier-composants', q: 'Q04 — Quel est le nom du composant 1 ?', img: 'cah/hq04.png', c: ['Limiteur de pression secondaire', 'Limiteur de pression principal', 'Soupape de séquence'], e: 'C’est un limiteur de pression placé entre le distributeur et le récepteur : c’est un limiteur de pression secondaire (il ne protège que cette branche).', w: 'Même symbole que le principal : c’est sa PLACE dans le circuit qui fait la différence.', src: SRC },
    { l: 'cahier-composants', q: 'Q05 — Symbolisez un distributeur 6/3 à centre ouvert à suivre, commande électrique, rappel par ressort. Que doit-on voir ?', c: ['3 cases, 6 orifices, case centrale qui laisse passer l’huile d’un orifice à l’autre (à suivre), bobines électriques et ressorts de chaque côté', '6 cases, 3 orifices, commande manuelle', '3 cases, 6 orifices, case centrale fermée, commande hydraulique'], e: '6/3 = 6 orifices, 3 positions. Centre ouvert à suivre : au neutre l’huile traverse le distributeur pour alimenter le distributeur suivant. Rectangle avec trait oblique = commande électrique ; ressort = rappel.<br><img src="img/cah/hr05.png" alt="Distributeur 6/3 centre ouvert à suivre" style="max-width:120px">', src: SRC },
    { l: 'cahier-composants', q: 'Q06 — Je veux contrôler un récepteur soumis à une charge menante variable, quel élément devrais-je utiliser ? Quel est le nom de cet élément ?', img: 'cah/hq06-comp.png', c: ['Élément E : soupape de freinage', 'Élément A : soupape d’équilibrage', 'Élément C : limiteur de pression'], e: 'Corrigé : élément E, c’est une soupape de freinage (pilotage externe par la ligne opposée, clapet anti-retour en parallèle). On la place sur la ligne côté fond du vérin qui porte la charge, avec son pilotage pris sur l’autre ligne.<br><img src="img/cah/hr06.png" alt="Soupape de freinage placée dans le circuit" style="max-width:100%">', r: 'Charge menante CONSTANTE → équilibrage ; charge menante VARIABLE → freinage.', src: SRC },
    { l: 'cahier-composants', q: 'Q07 — Quel est le rôle de la soupape réductrice de pression ?', c: ['Maintenir une pression inférieure constante dans le circuit secondaire (C2) par rapport au circuit principal (C1)', 'Limiter la pression maxi de tout le circuit', 'Imposer un ordre de fonctionnement entre deux récepteurs'], e: 'Corrigé : la soupape réductrice de pression permet de maintenir une pression inférieure constante dans le circuit secondaire (c2) par rapport au circuit principal (c1). Symbole : normalement ouverte, pilotée par l’aval.<br><img src="img/cah/hr07.png" alt="Symbole réducteur de pression" style="max-width:220px">', src: SRC },
    { l: 'cahier-composants', q: 'Q08 — Quel est cet élément ? Quel est son rôle ?', img: 'cah/hq08.png', c: ['Diviseur de débit 50/50 à tiroir : deux récepteurs identiques se déplacent à la même vitesse quelle que soit la charge', 'Limiteur de débit double effet', 'Sélecteur de circuit (OU hydraulique)'], e: 'Corrigé : c’est un diviseur de débit 50/50 à tiroir, son rôle est de permettre à deux récepteurs identiques de se déplacer à la même vitesse quelle que soit la charge.', src: SRC },
    { l: 'cahier-composants', q: 'Q09 — Quels sont ces éléments ? L’élément 1 est…', img: 'cah/hq09.png', c: ['Un vérin double effet équilibré : force et vitesse identiques de chaque côté (charge identique)', 'Un vérin double effet différentiel', 'Un vérin simple effet à rappel par ressort'], e: 'Tige des deux côtés = même surface annulaire des deux côtés : même force et même vitesse dans les deux sens.', src: SRC },
    { l: 'cahier-composants', q: 'Q09 — Quels sont ces éléments ? L’élément 2 (8 cm² / 4 cm²) est…', img: 'cah/hq09.png', c: ['Un vérin double effet différentiel rapport ½ : force 2 fois plus grande en sortie, vitesse 2 fois plus grande en rentrée', 'Un vérin double effet équilibré', 'Un vérin télescopique'], e: 'Surface côté fond 8 cm², côté tige 4 cm² (rapport ½). À la sortie (côté fond) : F = P × 8 → 2 fois plus de force. À la rentrée (côté tige) : v = Q / (6 × 4) → 2 fois plus vite.', r: 'Grande surface = force ; petite surface = vitesse.', src: SRC }
  ];

  qs = qs.concat(designations('cahier-schema10', 'Q10', 'cah/hq10-schema.png', q10, 'Principal = après la pompe ; secondaire = entre distributeur et récepteur.'));
  qs = qs.concat(designations('cahier-schema11', 'Q11', 'cah/hq11-schema.png', q11, 'Chargeuse : translation en circuit fermé, direction LS, équipement en circuit ouvert centre ouvert tandem.'));
  qs = qs.concat(q12.map(function (it, i) {
    var o1 = q12[(i + 5) % q12.length], o2 = q12[(i + 11) % q12.length];
    return { l: 'cahier-schema12', q: 'Q12 — Repère ' + it[0] + ' : désignation et rôle ?', img: 'cah/hq12-schema.png',
      c: [it[1] + ' — ' + it[2].replace(/^Rôle : /, ''), o1[1] + ' — ' + o1[2].replace(/^Rôle : /, ''), o2[1] + ' — ' + o2[2].replace(/^Rôle : /, '')],
      e: 'Correction du cahier : repère ' + it[0] + ' = <b>' + it[1] + '</b>. ' + it[2], src: SRC };
  }));

  function table(list, role) {
    return '<div class="tw"><table><tr><th>Rep.</th><th>Désignation</th>' + (role ? '<th>Rôle / remarque</th>' : '') + '</tr>' +
      list.map(function (it) { return '<tr><td><b>' + it[0] + '</b></td><td>' + it[1] + '</td>' + (role ? '<td>' + (it[2] || '') + '</td>' : '') + '</tr>'; }).join('') + '</table></div>';
  }

  REV.addExercises('hydro', {
    lessons: [
      {
        id: 'cahier-calculs', title: 'Cahier d’exercices — Calculs (10 questions)',
        html: `
<p>Les 10 calculs du cahier d’exercices EMB (préparation CT1). Réponses = <b>corrigé officiel du cahier</b>.</p>
<h3>Les 4 formules (unités atelier)</h3>
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Unités</th></tr>
<tr><td>Pression</td><td>P = F / S</td><td>bar = daN / cm²</td></tr>
<tr><td>Débit</td><td>Q = V × N / 1000</td><td>l/min = cm³/tr × tr/min / 1000</td></tr>
<tr><td>Puissance</td><td>Pu = P × Q / 600</td><td>kW = bar × l/min / 600</td></tr>
<tr><td>Vitesse vérin</td><td>v = Q / (6 × S)</td><td>m/s = l/min / (6 × cm²)</td></tr></table></div>
<p><b>Conversions :</b> 1 bar = 10⁵ Pa · 1 m³ = 1000 l · l/h ÷ 60 = l/min · 1 dm³ = 1000 cm³ · 1 cv = 736 W · S = π × R² = π × D² / 4.</p>
<h3>Résultats du corrigé</h3>
<div class="tw"><table><tr><th>Q</th><th>Résultat</th></tr>
<tr><td>1</td><td>P = 3000 / 15 = 200 bars</td></tr>
<tr><td>2</td><td>Q = 30 × 3000 / 1000 = 90 l/min</td></tr>
<tr><td>3</td><td>Pu = 200 × 90 / 600 = 30 kW = 30 000 W</td></tr>
<tr><td>4</td><td>Q = 45 l/min → v = 45 / 60 = 0,75 m/s</td></tr>
<tr><td>5</td><td>Q = 120 l/min → v = 0,5 m/s ; P = 150 b → F = 6000 daN</td></tr>
<tr><td>6</td><td>P = 300 b → Q = 80 l/min → N = 2000 tr/min ; v = 1,66 m/s</td></tr>
<tr><td>7</td><td>Q = 45 l/min → S = 10 cm² ; 30,57 cv = 22,5 kW → P ≈ 300 b</td></tr>
<tr><td>8</td><td>V = 100 cm³ → N = 500 tr/min</td></tr>
<tr><td>9</td><td>S ≈ 50 cm² → il faut 250 b &gt; 210 b : impossible ; charge maxi 10 500 daN</td></tr>
<tr><td>10</td><td>200 b × 45 l/min / 600 = 15 kW (le cahier écrit « 15 w » : faute de frappe)</td></tr></table></div>`,
        retenir: ['P = F / S · Q = V × N / 1000 · Pu = P × Q / 600 · v = Q / (6 × S).', 'Toujours calculer le débit en premier quand on cherche une vitesse.', 'La pression ne change pas la vitesse d’un vérin ; le débit ne change pas sa force.'],
        pieges: ['Rayon ou diamètre ? S = π R² = π D² / 4.', 'l/h → l/min : ÷ 60 ; m³/h → l/min : × 1000 ÷ 60.', 'Pu /600 donne des kW, pas des W.'],
        memo: { cle: 'P = F/S · Q = V·N/1000 · Pu = P·Q/600 · v = Q/6S', flow: ['Convertir les unités', 'Calculer Q', 'Calculer P ou v', 'Vérifier l’ordre de grandeur'], points: ['1 bar = 10⁵ Pa', '1 cv = 736 W', '1 dm³ = 1000 cm³'], astuce: '« Pression = force, débit = vitesse ».' }
      },
      {
        id: 'cahier-composants', title: 'Cahier d’exercices — Les composants (Q1 à Q9)',
        images: [
          { src: 'cah/hq01.png', cap: 'Q1 — Éléments 1, 2 et 3' },
          { src: 'cah/hr02.png', cap: 'Q2 — Corrigé : pompe cylindrée variable, 2 sens de flux, drainage externe' },
          { src: 'cah/hr03.png', cap: 'Q3 — Corrigé : limiteur de pression principal' },
          { src: 'cah/hq04.png', cap: 'Q4 — Composant 1 = limiteur de pression secondaire' },
          { src: 'cah/hr05.png', cap: 'Q5 — Corrigé : distributeur 6/3 centre ouvert à suivre, commande électrique, rappel par ressort' },
          { src: 'cah/hq06-comp.png', cap: 'Q6 — Éléments A à E' },
          { src: 'cah/hr06.png', cap: 'Q6 — Corrigé : soupape de freinage (E) placée dans le circuit' },
          { src: 'cah/hr07.png', cap: 'Q7 — Corrigé : réducteur de pression' },
          { src: 'cah/hq08.png', cap: 'Q8 — Diviseur de débit 50/50 à tiroir' },
          { src: 'cah/hq09.png', cap: 'Q9 — 1 : vérin équilibré · 2 : vérin différentiel ½' }
        ],
        html: `
<h3>Corrigé du cahier</h3>
<ol class="corr">
<li><b>Q1</b> — 1 : pompe à cylindrée fixe, un sens de flux (crée le débit). 2 : distributeur 4/3 centre ouvert, commande pneumatique, rappel par ressort (oriente le fluide). 3 : vérin double effet (énergie hydraulique → translation).</li>
<li><b>Q2</b> — Pompe : 2 triangles pleins (2 sens de flux), flèche oblique (cylindrée variable), trait pointillé vers la bâche (drainage externe).</li>
<li><b>Q3</b> — Limiteur de pression principal : définit la pression max de service, protège le circuit en envoyant le débit à la bâche.</li>
<li><b>Q4</b> — Limiteur de pression secondaire (entre distributeur et récepteur).</li>
<li><b>Q5</b> — Distributeur 6/3 centre ouvert à suivre, commande électrique, rappel par ressort (voir figure).</li>
<li><b>Q6</b> — Élément E : soupape de freinage.</li>
<li><b>Q7</b> — Réducteur : maintient une pression inférieure constante dans le circuit secondaire C2 par rapport au circuit principal C1.</li>
<li><b>Q8</b> — Diviseur de débit 50/50 à tiroir : deux récepteurs identiques à la même vitesse quelle que soit la charge.</li>
<li><b>Q9</b> — 1 : vérin double effet équilibré (même force et vitesse des deux côtés). 2 : vérin double effet différentiel ½ (force ×2 en sortie, vitesse ×2 en rentrée).</li>
</ol>
<h3>Les autres éléments de la Q6 (pour réviser)</h3>
<p>A : soupape d’équilibrage (pilotage interne + clapet) · B : filtre avec clapet by-pass · C : limiteur de pression · D : réducteur de pression (normalement ouvert, drainé) · E : soupape de freinage (pilotage externe + clapet).</p>`,
        retenir: ['Principal = après la pompe ; secondaire = entre distributeur et récepteur.', 'Charge menante constante → équilibrage ; variable → freinage.', 'Réducteur = normalement OUVERT, pilotage aval.', 'Différentiel ½ : force ×2 en sortie, vitesse ×2 en rentrée.'],
        pieges: ['Triangle vide = pneumatique, triangle plein = hydraulique.', 'Centre ouvert « à suivre » : l’huile continue vers le distributeur suivant.'],
        memo: { cle: 'PLACE du limiteur = principal ou secondaire', flow: ['Pompe', 'Limiteur principal', 'Distributeur', 'Limiteur secondaire / freinage', 'Récepteur'], points: ['Diviseur 50/50 = même vitesse', 'Équilibré = même force/vitesse', 'Différentiel = force OU vitesse'], astuce: 'Freinage = pilotage par la ligne d’en face.' }
      },
      {
        id: 'cahier-schema10', title: 'Cahier d’exercices — Schéma Q10 (appareils de pression)',
        images: [{ src: 'cah/hq10-schema.png', cap: 'Q10 — Schéma à repérer (1 à 9 et A)' }],
        html: '<h3>Corrigé du cahier (Q10)</h3>' + table(q10, true),
        retenir: ['Limiteur principal 150 b ; réducteur 25 b ; séquences 80 / 100 b ; secondaires 100 / 120 b ; anti-choc 300 b.', 'Séquence = normalement fermée → ordre de fonctionnement.', 'Anti-choc taré au-dessus du principal.'],
        pieges: ['Réducteur (normalement ouvert, pilotage aval) ≠ séquence (normalement fermée, pilotage amont).', 'Équilibrage (pilotage interne) ≠ freinage (pilotage externe croisé).'],
        memo: { cle: '1 principal · 2 réducteur · 3-4 séquences · 5-7 secondaires · 6 SAC · 8 équilibrage · 9 freinage · A débit', flow: ['Pompe', '1 limiteur principal 150 b', '3 / 4 séquences', 'Distributeurs', '5-6-7-8-9 appareils de branche'], points: ['SAC 300 b > principal 150 b', 'Réducteur 25 b = pression de commande'], astuce: 'Flèche vers le haut normalement fermée, trait passant = normalement ouvert.' }
      },
      {
        id: 'cahier-schema11', title: 'Cahier d’exercices — Schéma Q11 (chargeuse : translation, direction, équipement)',
        images: [{ src: 'cah/hq11-schema.png', cap: 'Q11 — Schéma complet à repérer (1 à 34)' }],
        html: '<h3>Corrigé du cahier (Q11)</h3>' + table(q11, false),
        retenir: ['Translation = transmission hydrostatique en circuit fermé (2, 3, 5, 6, 10, 11, 12, 13).', 'Direction = boîtier LS centre fermé (17) alimenté en priorité par le diviseur prioritaire (15).', 'Équipement = distributeurs 4/3 centre ouvert en tandem (22), limiteur principal 230 b (23), soupapes de freinage (25, 29).'],
        pieges: ['Soupapes HP (11, 250 b) ≠ limiteur de gavage (10, 12–30 b).', 'La vanne de remorquage (13) met les moteurs à flot.'],
        memo: { cle: '3 circuits : translation fermée · direction LS · équipement ouvert', flow: ['Pompe de gavage 3 → gavage 12–30 b', 'Pompe principale 2 → moteurs 12', 'Pompe 4 → diviseur prioritaire 15 → direction 17 puis équipement 21'], points: ['230 b principal équipement', '200 b anti-chocs direction', '140 b limiteur LS'], astuce: 'Diviseur prioritaire : la direction d’abord, le reste après.' }
      },
      {
        id: 'cahier-schema12', title: 'Cahier d’exercices — Schéma Q12 (circuit fermé : désignation et rôle)',
        images: [{ src: 'cah/hq12-schema.png', cap: 'Q12 — Transmission hydrostatique en circuit fermé (1 à 19)' }],
        html: '<h3>Corrigé du cahier (Q12)</h3>' + table(q12, true),
        retenir: ['Gavage : servocommande + frein de parc + compense les fuites.', 'Échange (18 + 19) : tarage toujours inférieur au limiteur de gavage.', 'Servocommande = servo-distributeur 6 + servo-piston 7.', 'Frein de parc 15 = à manque de pression (défreine quand il est alimenté).'],
        pieges: ['Soupapes HP (5) = rôle d’anti-choc d’un circuit ouvert.', 'Robinet 10 = isole la bâche ; robinet 17 = remorquage.'],
        memo: { cle: 'Gavage > échange · HP = anti-choc · 6+7 = servocommande', flow: ['Moteur thermique 8', 'Pompe principale 1 + gavage 2', 'Clapets 4 / soupapes HP 5', 'Moteur hydraulique 16', 'Échange 18 + 19 → refroidisseur 12'], points: ['Limiteur de gavage 25 b au neutre', 'Manocontact 14 = témoin', 'Prise de pression 13'], astuce: 'Ce qui sort par l’échange est remplacé par le gavage.' }
      }
    ],
    questions: qs
  });
})();
