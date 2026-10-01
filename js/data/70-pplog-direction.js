/* PPLOG — cours AGE 14 ind. g, chapitres 5 (direction) et 6 (transmission) : circuit de direction à deux pompes,
   voyants, pannes, contrôles LPP / LPS, embrayage tiré à actionneur électropneumatique, boîte ZF ASTRONIC 16AS2631,
   Intarder 3, blocages de différentiels. Seul l’essentiel est repris. */
(function () {
  var I = 'pplog/';
  function im(src, cap) { return { src: I + src + '.jpg', cap: cap }; }
  function ul(a) { return '<ul class="exp-steps">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function ol(a) { return '<ol class="steps">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function bloc(t, role, fonct, plus) { return '<h3>' + t + '</h3>' + (role ? '<p><b>🎯 Rôle :</b> ' + role + '</p>' : '') + (fonct ? '<p><b>⚙️ Fonctionnement :</b></p>' + ol(fonct) : '') + (plus ? ul(plus) : ''); }
  function tab(head, rows) { return '<div class="tw"><table><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; }

  /* Repères du schéma hydraulique de direction (cours, § 5.5) : [n°, désignation, rôle] */
  var REP = [
    [1, 'Réservoir du circuit secondaire', 'Alimenter la pompe de secours (2).'],
    [2, 'Pompe de secours (secondaire), en sortie de boîte de vitesses', 'Donner la pression de secours. Elle tourne seulement quand le véhicule roule.'],
    [3, 'Témoin d’avarie du circuit secondaire (témoin 2)', 'Signaler l’absence de pression dans le circuit secondaire.'],
    [4, 'Pompe principale (à aubes, sur le compresseur)', 'Donner la pression du circuit principal dès que le moteur tourne.'],
    [5, 'Vérin hydraulique directeur du pont intermédiaire AV', 'Braquer le 2ᵉ essieu.'],
    [6, 'Témoin d’avarie du circuit principal (témoin 1)', 'Signaler l’absence de pression dans le circuit principal.'],
    [7, 'Boîtier de direction assistée', 'Transformer la rotation du volant en braquage, avec assistance hydraulique.'],
    [8, 'Soupape de commutation', 'Alimenter le vérin du 2ᵉ essieu (5) quand le circuit principal a de la pression.'],
    ['9 et 10', 'Clapets anti-retour (alimentation du vérin 5)', 'En panne du circuit principal : équilibrer seulement les volumes d’huile du vérin 5.'],
    [11, 'Piston de braquage (pont AV)', 'Pousser la direction de l’essieu avant.'],
    [12, 'Soupape de limitation de braquage', 'En butée : décharger la pression des chambres de braquage vers le réservoir.'],
    [13, 'Distributeur de commande (volant)', 'Envoyer l’huile d’un côté ou de l’autre du piston selon le sens du volant.'],
    [14, 'Soupape de limitation de pression (surpression)', 'Limiter la pression d’assistance.'],
    [15, 'Soupape de commande', 'Choisir la pompe qui alimente le boîtier : principale (P1) si elle a de la pression, sinon secours (P2).'],
    [17, 'Clapet anti-retour', 'Laisser passer l’huile de la pompe principale vers la direction assistée, sans retour.'],
    [18, 'Régulateur de débit (sur le refoulement T2)', 'Allumer ou éteindre le témoin 2 selon le débit de la pompe de secours.'],
    [19, 'Voyant de niveau d’huile', 'Signaler un niveau d’huile insuffisant.'],
    [20, 'Réservoir du circuit principal', 'Alimenter la pompe principale (4).']
  ];

  var L = [
    { id: 'direction-circuit', title: 'Direction : circuit, voyants, pannes et contrôles',
      images: [im('di-circuit', 'Circuit de direction : A volant · B pompe principale sur compresseur · C réservoirs · D pompe de secours sur transmission · E vérin 2ᵉ essieu · F tringlerie 2ᵉ essieu · G tringlerie 1ᵉʳ essieu · H direction assistée · I radiateur'),
        im('di-implantation', 'Implantation : pompe principale, régulateur de débit, pompe de secours en sortie BV, réservoirs ×2, vérin du pont inter AV, direction assistée'),
        im('di-tringlerie', 'Tringlerie (repères 1 à 11)'),
        im('di-temoins', 'Témoins 1 et 2 en situation normale : contact mis, moteur tournant à l’arrêt, véhicule en marche'),
        im('di-schema-arret', 'Schéma 1 — moteur arrêté, contact mis : témoins 1 (6) et 2 (3) allumés'),
        im('di-schema-moteur', 'Schéma 2 — moteur tournant, véhicule arrêté : témoin 1 éteint, témoin 2 allumé'),
        im('di-schema-braquage', 'Schéma 3 — véhicule en marche, braquage à droite : les 2 essieux braquent, les 2 témoins sont éteints'),
        im('di-schema-limitation', 'Schéma 4 — braquage en butée : la soupape de limitation de braquage (12) décharge'),
        im('di-schema-panne', 'Schéma 5 — circuit principal en panne : témoin 1 allumé, assistance sur l’essieu avant seulement'),
        im('di-braquage', 'Braquage à droite et à gauche : boîtier, tringlerie et vérin du 2ᵉ essieu')],
      html:
        bloc('Les deux circuits',
          'Assister la direction, et garder une direction partielle si le circuit principal lâche ou en remorquage moteur coupé.',
          ['<b>Circuit principal</b> (essieu avant) : pompe à aubes sur le compresseur → réservoir → boîtier de direction assistée → vérin du 2ᵉ essieu.', 'Il marche <b>dès que le moteur tourne</b>.', '<b>Circuit auxiliaire (secours)</b> : pompe à pistons <b>entraînée par la boîte de vitesses</b> → réservoir → régulateur de débit.', 'Il ne marche <b>que si le véhicule roule</b> (la pompe tourne avec la transmission).', 'Les 2 réservoirs sont reliés entre eux.']) +
        '<h3>Nom des éléments du circuit</h3>' + tab(['N°', 'Élément', 'Rôle'], REP.map(function (r) { return ['<b>' + r[0] + '</b>', r[1], r[2]]; })) +
        '<p>A et B : capteurs du boîtier de direction (contact électrique avec les soupapes 15 et 8). T1 / T2 : retours vers les réservoirs ; P1 / P2 : arrivées de pression des pompes principale / de secours.</p>' +
        '<p><b>Tringlerie :</b> 1 volant · 2 colonne de direction · 3 boîtier de direction · 4 barre de direction de l’essieu principal · 5 tête de levier de fusée 1ᵉʳ pont · 6 tringlerie de commande 2ᵉ pont · 7 vérin de direction 2ᵉ pont · 8 barre de direction de l’essieu secondaire · 9 tête de levier de fusée 2ᵉ pont · 10 barre d’accouplement 1ᵉʳ pont · 11 barre d’accouplement 2ᵉ pont.</p>' +
        '<h3>Pourquoi les voyants s’allument et s’éteignent</h3>' +
        '<p><b>Témoin 1</b> (pictogramme I) = circuit <b>principal</b>. <b>Témoin 2</b> (pictogramme II) = circuit <b>secondaire</b>. Règle simple : <b>voyant allumé = pas de pression</b> dans son circuit.</p>' +
        bloc('Témoin 1 (circuit principal)', 'Dire si la pompe principale donne de la pression.',
          ['Contact mis, moteur arrêté : pas de pression, les soupapes 15 et 8 sont au repos et touchent les capteurs A et B → <b>témoin allumé</b>. C’est aussi le test des capteurs.', 'On démarre : la pompe principale donne de la pression.', 'La pression pousse les soupapes 15 et 8 : le contact avec les capteurs A et B est coupé → <b>témoin éteint</b>.', 'S’il reste allumé moteur tournant : pas de pression (pompe ou circuit principal HS).', 'S’il est éteint au contact (moteur arrêté) : les capteurs du boîtier ne marchent pas.']) +
        bloc('Témoin 2 (circuit secondaire)', 'Dire si la pompe de secours donne de la pression.',
          ['La pompe de secours est entraînée par la boîte de vitesses : à l’arrêt, elle ne tourne pas.', 'Pas de débit dans le régulateur de débit (18) → <b>témoin allumé</b> (normal à l’arrêt, même moteur tournant).', 'Le véhicule roule : la pompe débite, l’huile passe par la soupape 15 et pilote le régulateur de débit → <b>témoin éteint</b>.', 'S’il reste allumé en roulant : pompe de secours ou circuit secondaire HS.']) +
        bloc('Voyant de niveau d’huile (19)', null, null, ['Au contact, il s’allume <b>quelques secondes</b> (test), puis s’éteint.', 'Allumé ensuite = <b>niveau d’huile insuffisant</b>.']) +
        tab(['Situation', 'Normal', 'Principal en panne', 'Secondaire en panne'], [
          ['Contact mis, moteur arrêté', '1 allumé · 2 allumé', '<b>1 éteint</b> (capteurs du boîtier HS) · 2 allumé', '1 allumé · 2 allumé'],
          ['Moteur tournant, véhicule arrêté', '1 éteint · 2 allumé', '<b>1 allumé</b> · 2 allumé', '1 éteint · 2 allumé'],
          ['Moteur tournant, véhicule en marche', '1 éteint · 2 éteint', '<b>1 allumé</b> · 2 éteint', '1 éteint · <b>2 allumé</b>']]) +
        '<h3>Le circuit étape par étape (schémas 1 à 5)</h3>' +
        bloc('1. Moteur arrêté, contact mis', null, ['Le réservoir 20 alimente la pompe principale (4), le réservoir 1 la pompe de secours (2).', 'Les pompes alimentent le boîtier (7) par P1 et P2, à travers les soupapes 15 et 8.', 'Au contact : le voyant d’huile (19) s’allume quelques secondes.', 'Les témoins 6 (principal) et 3 (secondaire) restent allumés : les soupapes 15 et 8 touchent les capteurs A et B.']) +
        bloc('2. Moteur tournant, véhicule arrêté', null, ['La pompe principale (4) tourne et ouvre le clapet anti-retour (17) : la direction assistée est alimentée.', 'La pression déplace la soupape de commande (15) : alimentation du boîtier et retour vers le réservoir 20.', 'La soupape de commutation (8) se déplace aussi : elle alimente le vérin du 2ᵉ essieu (5).', 'Les soupapes 15 et 8 ne touchent plus les capteurs A et B : le <b>témoin 6 s’éteint</b>.', 'La pompe de secours (2) ne tourne pas : le régulateur de débit (18) garde le <b>témoin 3 allumé</b>.']) +
        bloc('3. Véhicule en marche, on braque', null, ['On tourne le volant : le distributeur de commande (13) se déplace.', 'L’huile de la pompe principale va d’un côté du piston de braquage (11) du pont AV.', 'Elle va aussi, par la soupape de commutation (8), dans la chambre du vérin du pont inter AV (5).', 'Les 2 essieux braquent. La pression est limitée par la soupape de surpression (14).', 'La pompe de secours (2) débite : elle pilote le régulateur de débit (18), le <b>témoin 3 s’éteint</b>.']) +
        bloc('4. Braquage en butée', null, ['Le braquage maximum est atteint.', 'La soupape de limitation de braquage (12) s’ouvre : les chambres se vident vers le réservoir 20 par T1.', 'La pression chute : on ne peut plus braquer davantage (protection en butée).']) +
        bloc('5. Circuit principal en panne', 'Garder une direction assistée sur l’essieu avant.',
          ['La pompe principale (4) ne donne plus de pression (panne, fuite, débit trop faible) : plus de pression dans P1.', 'Les soupapes 15 et 8 reviennent au repos.', 'La soupape 15 ferme P1 et alimente le boîtier (7) avec la <b>pompe de secours (2)</b> par P2 ; le retour se fait par T2 vers le réservoir 1.', 'La soupape 8 coupe l’alimentation du vérin du 2ᵉ essieu (5) ; les clapets 9 et 10 équilibrent seulement ses volumes d’huile.', 'Résultat : assistance <b>uniquement sur l’essieu avant</b> (boîtier de direction) ; le 2ᵉ essieu suit par les <b>tirants mécaniques</b>.', 'Le témoin 6 s’allume (soupapes 15 et 8 au contact des capteurs).']) +
        '<h3>Les pannes possibles et ce qui se passe</h3>' +
        tab(['Panne', 'Ce qu’on voit', 'Ce qui se passe'], [
          ['Pompe ou circuit <b>principal</b> HS', 'Témoin 1 allumé moteur tournant', 'La pompe de secours prend le relais et alimente <b>uniquement le boîtier de direction</b> (essieu avant). 2ᵉ essieu par la tringlerie seule. À l’arrêt, la pompe de secours ne tourne pas : direction <b>très dure</b>.'],
          ['Pompe ou circuit <b>secondaire</b> HS', 'Témoin 2 allumé en roulant', 'Direction normale (circuit principal OK), mais <b>plus de secours</b> si le principal lâche ou en remorquage.'],
          ['Capteurs du boîtier de direction HS', 'Témoin 1 éteint au contact, moteur arrêté', 'Plus de surveillance du circuit principal : une panne ne serait pas signalée.'],
          ['Niveau d’huile insuffisant', 'Voyant 19 allumé (console : « niveau d’huile d’assistance de direction insuffisant »)', 'Risque de désamorçage et de casse des pompes : faire l’appoint (ATF DEXRON III G / H548), chercher la fuite.'],
          ['Remorquage, moteur coupé', 'Témoin 1 allumé', 'Pompe principale arrêtée ; la pompe de secours tourne avec la transmission : direction partielle sur l’essieu avant.']]) +
        '<h3>Données de la direction hydraulique</h3>' +
        tab(['Boîtier de direction', 'Valeur'], [['Type', 'ZF 8099/1,5'], ['Pression de service', '14 bar'], ['Rapport au centre / en braquage maximum', '22,2 : 1 / 26,2 : 1'], ['Limiteur de braquage', '<b>85 bar</b>'], ['Limiteur de pression principal', '<b>154 bar</b>']]) +
        tab(['Pompes', 'Principale', 'De secours'], [['Régime mini', '500 tr/min', '—'], ['Régime maxi', '3 000 tr/min', '4 500 tr/min'], ['Pression maximale', '165 bar', '180 bar'], ['Débit réglé', '22,5 à 30 dm³/min', '16 dm³/min'], ['Huile', 'ATF DEXRON III G / H548', 'ATF DEXRON III G / H548']]) +
        '<h3>Contrôles au manomètre</h3>' +
        bloc('Test du LPP (limiteur de pression principal)', 'Vérifier la pression maxi d’assistance (cours : 154 bar).',
          ['Brancher un manomètre sur le circuit.', 'Bloquer l’orientation des roues avec un <b>trottoir</b> ou une <b>cale</b>, au niveau de la butée de braquage (les roues ne doivent pas arriver en butée).', 'Moteur tournant, <b>braquer assez fort</b> contre l’obstacle.', 'Lire la pression : c’est le limiteur de pression principal qui s’ouvre.']) +
        bloc('Test du LPS', 'Vérifier la pression quand on braque jusqu’en butée.',
          ['Brancher un manomètre.', 'Moteur tournant, <b>braquer jusqu’en butée</b>.', 'Lire la pression : en butée, c’est la soupape de limitation de braquage qui décharge.']),
      retenir: ['Direction : circuit principal (pompe à aubes sur compresseur, moteur tournant) + circuit de secours (pompe à pistons sur la BV, véhicule qui roule).', 'Voyant allumé = pas de pression : témoin 1 = principal, témoin 2 = secondaire (normal allumé à l’arrêt).', 'Principal en panne → la pompe de secours alimente uniquement le boîtier de direction (essieu avant) ; 2ᵉ essieu par la tringlerie.', 'Limiteur de braquage 85 bar ; limiteur de pression principal 154 bar ; pompe principale 165 bar, secours 180 bar ; ATF DEXRON III G.', 'LPP : roues bloquées (trottoir / cale) avant la butée, braquer fort. LPS : braquer jusqu’en butée.'] },

    { id: 'transmission', title: 'Transmission : embrayage et boîte ASTRONIC',
      images: [im('tr-cinematique', 'Cinématique : A moteur · B boîte de vitesses · C boîte de transfert · D pont inter ARR · E pont ARR · F pont inter AV · G pont AV'),
        im('tr-embrayage', 'Embrayage : 1 volant moteur · 2 disque · 3 plateau de pression · 4 diaphragme · 5 corps du mécanisme · 6 arbre d’entrée BV · 7 fourchette avec butée · 8 actionneur · 9 roulement pilote'),
        im('tr-actionneur', 'A actionneur électropneumatique · B butée · C levier de commande'),
        im('tr-ev-embrayage', 'Électrovannes de l’actionneur d’embrayage Y14 à Y17 et capteur de position S'),
        im('tr-astronic', 'Boîte ZF 16AS2631 (ASTRONIC) avec Intarder 3'),
        im('tr-schema-logique', 'Schéma logique de la boîte : VDB, VCM, ECM, Intarder, ABS, unité électronique de boîte, PTO, tachygraphe'),
        im('tr-etc', 'Unité de commande ETC, sur le dessus de la boîte'),
        im('tr-air', 'Circuit d’air : 1 régulateur 7,3 bar · 2 clapet anti-retour · 3 enceinte d’air · 4 actionneur d’embrayage · 5 embrayage · 6 unité de commande ETC'),
        im('tr-etc-schema', 'Schéma de l’ETC : électrovannes Y1 à Y10, capteurs B2, B4 à B7'),
        im('tr-coupe', 'Vue en coupe : K1 / K2 splitter (GV), 4 vitesses + R, réducteur épicycloïdal GRE (GP), pompe à huile, frein d’inertie, PTO'),
        im('tr-cinematique-bv', 'Fourchettes et actionneurs : K splitter, L sélection des 4 vitesses, M réducteur épicycloïdal ; actionneurs F, G, H, J'),
        im('tr-selection', 'Sélection des vitesses : A marche arrière, B à E 1ʳᵉ à 4ᵉ vitesse principale'),
        im('tr-1re', 'Cinématique en 1ʳᵉ vitesse : électrovalves splitter Y2, sélection Y5, engagement Y6, GRE Y8')],
      html:
        '<h3>Chaîne de transmission</h3><p>Moteur → <b>embrayage</b> → <b>boîte de vitesses</b> → <b>boîte de transfert</b> → ponts : <b>AV</b>, <b>inter-AV</b>, <b>inter-ARR</b>, <b>ARR</b> (8×8 permanent).</p>' +
        bloc('Embrayage tiré', 'Accoupler / désaccoupler le moteur et la boîte.',
          ['Embrayé : le diaphragme (4) serre le disque (2) entre le plateau (3) et le volant moteur (1).', 'Pour débrayer, la butée <b>tire</b> le diaphragme (embrayage <b>tiré</b>) : le plateau recule, le disque est libre.', 'La butée est déplacée par la fourchette (7), commandée par l’<b>actionneur électropneumatique</b> (8) : il n’y a pas de pédale d’embrayage.'],
          ['<b>Remplacer systématiquement le roulement pilote</b> (9) du volant moteur quand on change l’embrayage.']) +
        bloc('Actionneur électropneumatique d’embrayage', 'Remplacer la pédale : embrayer / débrayer à chaque passage de vitesse.',
          ['Le calculateur pilote les électrovannes de l’actionneur.', 'L’air en attente entre dans le vérin : la butée se déplace, le disque est désaccouplé.', 'Rapide ou lent selon l’électrovanne pilotée (trous de passage d’air 2,5 mm = rapide, 1,5 mm = lent).', 'Un capteur de position (S) informe le calculateur de la position de l’embrayage.'],
          ['<b>Y17</b> débrayage lent · <b>Y15</b> embrayage lent · <b>Y16</b> débrayage rapide · <b>Y14</b> embrayage rapide.', 'Code <b>CW</b> : embrayage usé à <b>90 %</b>. Code <b>CL</b> : <b>surchauffe</b> de l’embrayage.']) +
        bloc('Boîte ZF 16AS2631 (AS TRONIC / ASTRONIC)', 'Boîte à 2 arbres, automatique ou semi-automatique, avec ralentisseur Intarder à l’arrière.',
          ['4 vitesses principales.', '× 2 avec le doubleur de gamme (<b>splitter</b>, K1 lentes / K2 rapides) = 8.', '× 2 avec le réducteur épicycloïdal (<b>GRE</b>, H / L) = <b>16 vitesses AV</b>, et <b>2 marches arrière</b>.', 'Semi-automatique : le conducteur passe les vitesses au levier. Automatique : il appuie seulement sur l’accélérateur ou le frein.', 'L’embrayage est entièrement commandé par l’actionneur électropneumatique.'],
          ['<b>Frein d’inertie</b> en bout d’arbre intermédiaire inférieur ; <b>pompe à huile</b> sur l’arbre supérieur ; prise de mouvement <b>PTO</b> à l’arrière.', '<b>Kick-down</b> : appuyer sur l’accélérateur au-delà du point dur → rapports tenus jusqu’au régime maxi, rétrogradation possible pour dépasser.', 'L’écran du combiné affiche le rapport engagé et les anomalies.']) +
        bloc('Unité de commande ETC', 'Commander l’embrayage et la sélection des vitesses.',
          ['Partie électronique + partie pneumatique dans le même carter, sur le <b>dessus de la boîte</b>.', 'L’électronique pilote les actionneurs électropneumatiques (embrayage, sélection).', 'Un capteur de pression mini surveille l’air : <b>sous 6 bar, le code AL s’affiche</b>.', 'Un capteur de régime lit la vitesse de l’arbre primaire (face à la roue phonique).']) +
        bloc('Circuit d’air de la boîte', null,
          ['La bouteille (enceinte d’air) alimente l’actionneur et l’ETC à <b>8,5 bar</b>.', 'Un régulateur à l’entrée de l’ETC ramène la pression à <b>7,3 bar</b>.', 'Un clapet anti-retour garde l’air dans l’enceinte.']) +
        '<h3>Électrovannes et capteurs de l’ETC</h3>' +
        tab(['Repère', 'Fonction'], [['Y1', 'Frein d’inertie'], ['Y2 / Y3', 'Splitter K2 / K1'], ['Y4 / Y5', 'Sélection des vitesses'], ['Y6 / Y7', 'Enclenchement des vitesses'], ['Y8 / Y9', 'GRE réduites / normales'], ['Y10', 'Électrovanne principale'], ['B2', 'Capteur de régime de l’arbre primaire'], ['B4', 'Capteur de vitesse enclenchée'], ['B5 / B6 / B7', 'Capteurs de position sélecteur / GRE / splitter']]) +
        '<p><b>Exemple, 1ʳᵉ vitesse :</b> splitter Y2, sélection Y5, engagement Y6, GRE Y8.</p>',
      retenir: ['Transmission 8×8 : moteur → embrayage → BV → boîte de transfert → ponts AV, inter-AV, inter-ARR, ARR.', 'Embrayage tiré, commandé par un actionneur électropneumatique (pas de pédale) ; Y17 / Y15 lent, Y16 / Y14 rapide ; CW = usure 90 %, CL = surchauffe.', 'Changer le roulement pilote à chaque remplacement d’embrayage.', 'ZF 16AS2631 : 4 vitesses × splitter × GRE = 16 AV, 2 AR.', 'Air de la boîte 8,5 bar, régulateur 7,3 bar ; code AL sous 6 bar.'] },

    { id: 'intarder-blocages', title: 'Ralentisseur Intarder et blocages de différentiels',
      images: [im('tr-intarder', 'Intarder 3, à l’arrière de la boîte de vitesses'),
        im('tr-intarder-levier', 'Levier de commande (positions 0 à 6), témoin de fonctionnement (R) et tableau des niveaux de freinage'),
        im('tr-intarder-logique', 'Schéma logique : 1 sélecteur frein moteur / Intarder · 2 bloc instrument · 3 module SWI · 4 module Intarder EST52 · 5 électrovanne de commande · 6 électrovanne de commutation · 7 capteur de pression d’huile · 8 capteur de température d’huile · 9 capteur de température d’eau · 10 échangeur · 11 tachygraphe'),
        im('tr-intarder-interne', 'Composition interne : 1 rotor-stator · 2 dispositif de réduction · 3 vanne de commutation · 4 pompe à débit variable · 5 soupape électrique de commande · 6 soupape électrique de commutation · 7 cloison · 8 douille de pompe · 9 vanne de remplissage · 10 filtre à huile'),
        im('tr-intarder-fonct', 'Rotor (relié à l’arbre) et stator (fixe) : l’huile freine le rotor'),
        im('tr-blocages', '3 blocages longitudinaux et 2 blocages transversaux'),
        im('tr-commutateur', 'Commutateur 0 / L / L+T1 et témoins L (jaune) et T1 (rouge)'),
        im('tr-blocages-pneu', 'Circuit d’air : A APU · B réservoir · C servitudes BV · D électrovalve de blocage longitudinal · E électrovalve de blocage transversal · F1 / F2 vitesses lentes / rapides de la boîte de transfert · G électrovalve VGT'),
        im('tr-blocage-figures', 'Figure A : blocage longitudinal (position L) · Figure B : longitudinal + transversal (position L+T1)'),
        im('tr-ev-emplacement', 'Emplacement des électrovalves : blocage longitudinal, blocage transversal, petite vitesse et vitesse normale de la boîte de transfert')],
      html:
        bloc('Intarder (ralentisseur hydraulique)', 'Freiner le véhicule sans user les freins, grâce à l’huile.',
          ['Le rotor est relié à l’arbre de transmission ; le stator est fixé au carter (donc au châssis).', 'Au freinage, l’huile est envoyée dans la chambre entre rotor et stator.', 'Le rotor accélère l’huile, le stator la freine : le tourbillon d’huile ralentit le rotor, donc le véhicule.', 'La chaleur produite part dans le <b>circuit de refroidissement</b> du moteur (échangeur).'],
          ['Unité de contrôle <b>Intarder 3 (EST52)</b>, montée sur l’Intarder : elle règle le couple de freinage selon le roulage.', 'Les 2 électrovannes (commande et commutation on / off) sont <b>normalement fermées</b>, résistance ≈ <b>12 Ω</b>.', 'Mettre le ralentisseur annule les réglages du <b>Cruise Control</b>.']) +
        '<h3>Commande au levier : positions 0 à 6</h3>' +
        tab(['Position', 'Frein moteur', 'Ralentisseur'], [['0', 'off', 'désactivé'], ['1', 'on', 'désactivé'], ['2', 'on', '25 %'], ['3', 'on', '50 %'], ['4', 'on', '75 %'], ['5', 'on', '100 %'], ['6', 'on', '100 % + <b>rétrogradation</b>']]) +
        bloc('Différence entre la position 5 et la position 6', null,
          ['En 5 et en 6 : frein moteur + ralentisseur à 100 %.', 'En <b>6</b>, en mode automatique, la boîte <b>passe au rapport inférieur</b> chaque fois que c’est utile.', 'Le régime monte : le frein moteur et le ralentisseur freinent au maximum.']) +
        bloc('Témoin de l’Intarder (R)', null, null, ['Allumé <b>3 secondes</b> à la mise du contact (test).', '<b>Fixe</b> pendant que le ralentisseur freine.', '<b>Clignotant</b> en cas d’anomalie.']) +
        bloc('Blocages de différentiels', 'Envoyer la même force sur tous les ponts (blocage longitudinal) et sur les 2 roues d’un pont (blocage transversal) quand une roue patine.',
          ['<b>3 blocages longitudinaux</b> : pont <b>inter-AV</b> (LA), <b>boîte de transfert</b> (LC) et pont <b>inter-ARR</b> (LP).', '<b>2 blocages transversaux</b> (TP) : sur les <b>2 ponts arrière</b> (inter-ARR et ARR).', 'Ils sont commandés par l’air : électrovalve de blocage longitudinal (D) et électrovalve de blocage transversal (E).']) +
        bloc('Commutateur à 3 positions', null,
          ['<b>0</b> : pas de blocage.', '<b>L</b> : blocage longitudinal (boîte de transfert + différentiels entre les ponts) → témoin <b>L</b> allumé (jaune).', '<b>L+T1</b> : longitudinal + transversaux des ponts arrière → témoin <b>T1</b> allumé (rouge).']) +
        bloc('Circuit d’air', null,
          ['Le compresseur remplit le réservoir (B) à travers l’APU (A).', 'Le réservoir alimente les servitudes de la boîte de vitesses (C).', 'L’APU alimente l’électrovalve de blocage longitudinal (D) et l’électrovalve de blocage transversal (E).', 'Il alimente aussi les électrovalves de vitesses lentes / rapides de la boîte de transfert (F1, F2) et l’électrovalve de la VGT (G).']),
      retenir: ['Intarder : rotor (arbre) + stator (carter) ; l’huile freine ; chaleur évacuée par le refroidissement moteur.', 'Positions : 1 frein moteur seul ; 2 / 3 / 4 / 5 = + 25 / 50 / 75 / 100 % ; 6 = 100 % + rétrogradation.', 'Témoin R : 3 s au contact, fixe en freinage, clignotant si anomalie ; électrovannes NF ≈ 12 Ω.', 'Blocages : 3 longitudinaux (inter-AV, boîte de transfert, inter-ARR) + 2 transversaux (2 ponts arrière).', 'Commutateur 0 / L (témoin L jaune) / L+T1 (témoin T1 rouge).'] }
  ];

  /* [leçon, question, [bonne réponse, …]] — la bonne réponse est toujours écrite en premier */
  var Q = [
    ['direction-circuit', 'Combien de circuits de direction sur le PPLOG ?', ['2 indépendants : principal (essieu avant) et auxiliaire', '1 seul circuit', '3 : un par essieu directeur', '2 : un hydraulique, un pneumatique']],
    ['direction-circuit', 'Pompe du circuit principal : type et entraînement ?', ['Pompe à aubes calée sur le compresseur', 'Pompe à pistons entraînée par la boîte de vitesses', 'Pompe électrique', 'Pompe à engrenages sur la boîte de transfert']],
    ['direction-circuit', 'Pompe de secours (secondaire) : type et entraînement ?', ['Pompe à pistons entraînée par la boîte de vitesses (sortie BV)', 'Pompe à aubes sur le compresseur', 'Pompe électrique sur batterie', 'Pompe manuelle']],
    ['direction-circuit', 'Quand la pompe de secours donne-t-elle de la pression ?', ['Seulement quand le véhicule roule (elle tourne avec la transmission)', 'Dès que le moteur tourne', 'Seulement contact mis', 'Seulement en marche arrière']],
    ['direction-circuit', 'Circuit principal en panne : que se passe-t-il ?', ['La pompe secondaire prend le relais et alimente uniquement le boîtier de direction (essieu avant)', 'Plus aucune direction', 'La pompe secondaire alimente les deux essieux comme avant', 'Le moteur s’arrête']],
    ['direction-circuit', 'Circuit principal en panne : comment braque le 2ᵉ essieu ?', ['Par les tirants mécaniques seulement (le vérin 5 n’est plus alimenté)', 'Par son vérin, alimenté par la pompe de secours', 'Il ne braque plus du tout', 'Par un vérin pneumatique']],
    ['direction-circuit', 'Témoin 1 de direction allumé : que signifie-t-il ?', ['Pas de pression dans le circuit principal', 'Pas de pression dans le circuit secondaire', 'Niveau d’huile bas', 'Direction en butée']],
    ['direction-circuit', 'Pourquoi le témoin 1 s’éteint-il quand le moteur démarre ?', ['La pression de la pompe principale déplace les soupapes 15 et 8 qui ne touchent plus les capteurs A et B', 'Le calculateur coupe le témoin après 3 secondes', 'La pompe de secours se met à débiter', 'Le niveau d’huile monte']],
    ['direction-circuit', 'Moteur tournant, véhicule arrêté, témoin 2 allumé : est-ce normal ?', ['Oui : la pompe de secours ne tourne pas à l’arrêt', 'Non : pompe principale HS', 'Non : capteurs du boîtier HS', 'Non : niveau d’huile bas']],
    ['direction-circuit', 'Pourquoi le témoin 2 s’éteint-il quand le véhicule roule ?', ['La pompe de secours débite et pilote le régulateur de débit (18)', 'Les soupapes 15 et 8 touchent les capteurs', 'Le voyant d’huile s’allume à sa place', 'La pompe principale accélère']],
    ['direction-circuit', 'Contact mis, moteur arrêté, témoin 1 éteint : diagnostic ?', ['Mauvais fonctionnement des capteurs du boîtier de direction', 'Circuit principal OK', 'Pompe de secours HS', 'Niveau d’huile bas']],
    ['direction-circuit', 'Véhicule en marche, témoin 1 éteint et témoin 2 allumé : diagnostic ?', ['Pompe auxiliaire et/ou circuit secondaire HS', 'Pompe principale HS', 'Situation normale', 'Capteurs du boîtier HS']],
    ['direction-circuit', 'Voyant de niveau d’huile (19) au contact ?', ['Il s’allume quelques secondes (test) ; allumé ensuite = niveau insuffisant', 'Il reste toujours allumé', 'Il clignote si tout va bien', 'Il ne s’allume jamais au contact']],
    ['direction-circuit', 'Rôle de la soupape de commande (15) ?', ['Choisir la pompe qui alimente le boîtier : principale (P1) ou secours (P2)', 'Limiter la pression en butée', 'Braquer le 2ᵉ essieu', 'Signaler le niveau d’huile']],
    ['direction-circuit', 'Rôle de la soupape de commutation (8) ?', ['Alimenter le vérin du 2ᵉ essieu quand le circuit principal a de la pression', 'Limiter la pression principale', 'Choisir la pompe', 'Allumer le témoin 2']],
    ['direction-circuit', 'Rôle du régulateur de débit (18) ?', ['Allumer ou éteindre le témoin du circuit secondaire selon le débit de la pompe de secours', 'Régler la vitesse de braquage', 'Limiter la pression à 154 bar', 'Alimenter le vérin 5']],
    ['direction-circuit', 'Rôle de la soupape de limitation de braquage (12) ?', ['En butée, décharger la pression des chambres de braquage vers le réservoir', 'Choisir la pompe de secours', 'Allumer le témoin 1', 'Remplir le vérin 5']],
    ['direction-circuit', 'Rôle du distributeur de commande (13) ?', ['Envoyer l’huile d’un côté ou de l’autre du piston de braquage selon le volant', 'Limiter la pression', 'Choisir la pompe', 'Remplir le réservoir']],
    ['direction-circuit', 'Repère 5 du schéma de direction ?', ['Vérin hydraulique directeur du pont intermédiaire AV', 'Pompe de secours', 'Réservoir principal', 'Boîtier de direction']],
    ['direction-circuit', 'Repères 9 et 10 du schéma de direction ?', ['Clapets anti-retour sur l’alimentation du vérin du 2ᵉ essieu', 'Capteurs du boîtier', 'Soupapes de commande', 'Témoins d’avarie']],
    ['direction-circuit', 'Repères 3 et 6 du schéma de direction ?', ['Témoins d’avarie : 3 circuit secondaire, 6 circuit principal', 'Pompes de secours et principale', 'Réservoirs', 'Clapets anti-retour']],
    ['direction-circuit', 'Repère 7 du schéma de direction ?', ['Boîtier de direction assistée', 'Vérin du 2ᵉ essieu', 'Pompe principale', 'Régulateur de débit']],
    ['direction-circuit', 'Test du LPP : comment faire ?', ['Manomètre branché, roues bloquées par un trottoir ou une cale avant la butée, braquer assez fort', 'Manomètre branché, braquer jusqu’en butée', 'Moteur arrêté, tourner le volant', 'Véhicule roulant, freiner fort']],
    ['direction-circuit', 'Test du LPS : comment faire ?', ['Brancher un manomètre et braquer jusqu’en butée', 'Bloquer les roues avec une cale et braquer fort', 'Débrancher la pompe de secours', 'Mesurer au réservoir moteur arrêté']],
    ['direction-circuit', 'Valeur du limiteur de pression principal (cours) ?', ['154 bar', '85 bar', '165 bar', '180 bar']],
    ['direction-circuit', 'Valeur du limiteur de braquage (cours) ?', ['85 bar', '154 bar', '14 bar', '180 bar']],
    ['direction-circuit', 'Pression maximale de la pompe de secours ?', ['180 bar', '165 bar', '154 bar', '85 bar']],
    ['direction-circuit', 'Huile de la direction ?', ['ATF DEXRON III G / H548', 'Huile moteur 15W40', 'LHM', 'Liquide de frein DOT 4']],
    ['transmission', 'Type d’embrayage du PPLOG ?', ['Embrayage tiré, commandé par un actionneur électropneumatique', 'Embrayage poussé à pédale hydraulique', 'Convertisseur de couple', 'Embrayage multidisque à bain d’huile']],
    ['transmission', 'Que faut-il remplacer systématiquement avec l’embrayage ?', ['Le roulement pilote du volant moteur', 'Le volant moteur', 'L’actionneur', 'La fourchette']],
    ['transmission', 'Électrovanne de débrayage rapide ?', ['Y16', 'Y14', 'Y15', 'Y17']],
    ['transmission', 'Électrovanne d’embrayage lent ?', ['Y15', 'Y14', 'Y16', 'Y17']],
    ['transmission', 'Code CW au tableau de bord ?', ['Embrayage usé à 90 %', 'Surchauffe de l’embrayage', 'Pression d’air sous 6 bar', 'Boîte en défaut de communication']],
    ['transmission', 'Code CL au tableau de bord ?', ['Surchauffe de l’embrayage', 'Usure de l’embrayage à 90 %', 'Pression d’air insuffisante', 'Kick-down actif']],
    ['transmission', 'Code AL au tableau de bord ?', ['Pression d’air dans l’ETC inférieure à 6 bar', 'Embrayage usé', 'Surchauffe de l’Intarder', 'Défaut du capteur de régime']],
    ['transmission', 'Combien de rapports sur la boîte ZF 16AS2631 ?', ['16 AV et 2 AR (4 vitesses × splitter × GRE)', '12 AV et 2 AR', '16 AV et 1 AR', '8 AV et 2 AR']],
    ['transmission', 'Que double le splitter ?', ['Les 4 vitesses principales (K1 lentes / K2 rapides) → 8', 'Les 8 vitesses → 16', 'Les marches arrière', 'Le couple de l’Intarder']],
    ['transmission', 'Pression d’air de la boîte et du régulateur de l’ETC ?', ['8,5 bar à l’alimentation, régulateur 7,3 bar', '10,3 bar et 8,5 bar', '7,3 bar et 6 bar', '12 bar et 10 bar']],
    ['transmission', 'Où se trouve l’unité de commande ETC ?', ['Sur la partie supérieure de la boîte de vitesses', 'Dans la cabine', 'Sur l’Intarder', 'Sur la boîte de transfert']],
    ['transmission', 'Fonction kick-down ?', ['Appui au-delà du point dur : rapports tenus jusqu’au régime maxi, rétrogradation pour dépasser', 'Frein moteur renforcé', 'Passage en mode manuel', 'Coupure du ralentisseur']],
    ['transmission', 'Électrovanne Y1 de l’ETC ?', ['Frein d’inertie', 'Électrovanne principale', 'Splitter K1', 'GRE normales']],
    ['intarder-blocages', 'Ralentisseur : différence entre la position 5 et la position 6 ?', ['En 6, la boîte passe au rapport inférieur (100 % dans les deux cas)', 'En 6, le ralentisseur est à 125 %', 'En 6, le frein moteur est coupé', 'Aucune différence']],
    ['intarder-blocages', 'Ralentisseur, position 4 ?', ['Frein moteur + 75 % du ralentisseur', 'Frein moteur + 50 %', 'Ralentisseur seul à 100 %', 'Frein moteur seul']],
    ['intarder-blocages', 'Principe de l’Intarder ?', ['Le rotor accélère l’huile, le stator la freine : le tourbillon ralentit le rotor', 'Des courants de Foucault freinent un disque', 'Le moteur est mis en compression', 'Des mâchoires serrent l’arbre']],
    ['intarder-blocages', 'Où part la chaleur produite par l’Intarder ?', ['Dans le circuit de refroidissement du véhicule (échangeur)', 'Dans l’échappement', 'Dans l’air ambiant par des ailettes', 'Dans l’huile de la boîte, sans refroidissement']],
    ['intarder-blocages', 'Témoin de l’Intarder clignotant ?', ['Anomalie du système', 'Freinage en cours', 'Test au contact', 'Position 6 engagée']],
    ['intarder-blocages', 'Électrovannes de l’Intarder : type et résistance ?', ['Normalement fermées, environ 12 Ω', 'Normalement ouvertes, environ 2 Ω', 'Proportionnelles, environ 120 Ω', 'Normalement fermées, environ 1 kΩ']],
    ['intarder-blocages', 'Combien de blocages longitudinaux, et où ?', ['3 : pont inter-AV, boîte de transfert, pont inter-AR', '2 : avant et arrière', '4 : un par pont', '1 : boîte de transfert']],
    ['intarder-blocages', 'Combien de blocages transversaux, et où ?', ['2 : sur les deux ponts arrière', '4 : sur tous les ponts', '1 : pont avant', '2 : ponts avant']],
    ['intarder-blocages', 'Commutateur de blocage sur L+T1 : quels blocages ?', ['Longitudinaux + transversaux des ponts arrière (témoins L et T1)', 'Transversaux seulement', 'Longitudinaux seulement', 'Aucun']],
    ['intarder-blocages', 'Témoin T1 (rouge) allumé ?', ['Blocages transversaux arrière activés', 'Blocage longitudinal activé', 'Boîte de transfert en petite vitesse', 'Défaut de l’Intarder']],
    ['intarder-blocages', 'Qui alimente en air les électrovalves de blocage ?', ['L’APU (distributeur)', 'La pompe de direction', 'Le réservoir de freinage AV directement', 'Le turbo']]
  ];
  function qs(l) { return Q.map(function (q) { return { l: typeof l === 'function' ? l(q[0]) : l, q: q[1], c: q[2], src: 'Cours AGE 14 ind. g (PPLOG), chapitres 5 et 6' }; }); }
  REV.addLessons('pplog', 'frein-pneumatique', L);
  REV.addExercises('pplog', { lessons: [], questions: qs(function (l) { return l; }) });
  REV.addLessons('uv3', 'pplog-freinage', [{ id: 'pplog-direction', title: 'PPLOG : direction, transmission, Intarder, blocages', images: [].concat.apply([], L.map(function (x) { return x.images; })), html: L.map(function (x) { return '<h2>' + x.title + '</h2>' + x.html; }).join(''), retenir: [].concat.apply([], L.map(function (x) { return x.retenir; })) }]);
  REV.addExercises('uv3', { lessons: [], questions: qs('pplog-direction') });
})();
