/* PPLOG — partie équipement : bras de chargement hydraulique (BCH, Marrel), cours AGE 13 ind. b
   (interface de commande, génération, groupe de distribution, électrique, pneumatique, séquences, modes dégradés)
   + notes du stagiaire (PTO à 800 tr/min, 3 modes, boîtier de jonction, EV3 / EV4 / EV5, détecteurs interchangeables, dépannages). */
(function () {
  var I = 'pplog/';
  function im(src, cap) { return { src: I + src + '.jpg', cap: cap }; }
  function ul(a) { return '<ul class="exp-steps">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function ol(a) { return '<ol class="steps">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function bloc(t, role, fonct, plus) { return '<h3>' + t + '</h3>' + (role ? '<p><b>🎯 Rôle :</b> ' + role + '</p>' : '') + (fonct ? '<p><b>⚙️ Fonctionnement :</b></p>' + ol(fonct) : '') + (plus ? ul(plus) : ''); }
  function tab(head, rows) { return '<div class="tw"><table><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; }

  var EV = [['EV1 et EV2', 'Valve de décompression à commande électrique des vérins de bras'], ['EV3', 'Valve by-pass de la pompe (doit toujours être alimentée pour travailler)'], ['EV4', 'Linguet de sécurité du crochet (pneumatique)'], ['EV5', '2 crochets de verrouillage du cadre de manutention (pneumatique)'],
    ['EV6 / EV7', 'Sortie / rentrée des 2 vérins de bras'], ['EV8 / EV9', 'Sortie / rentrée du vérin de coulisse'], ['EV10 / EV11', 'Sortie / rentrée du vérin de télescopage de la poutre de stockage'], ['EV12 / EV13', 'Sortie / rentrée des 2 vérins des galets arrière']];
  var DT = [['DT1', 'Crochets de verrouillage du cadre fermés', 'Autorise la descente du cadre au déstockage'], ['DT2', 'Potence coulissante sortie', 'Plateau : autorise la rentrée de la potence ; conteneur : autorise la prise du cadre ; arrête la sortie de coulisse'],
    ['DT3', 'Potence coulissante rentrée', 'Autorise le déploiement du bras ; arrête la rentrée de coulisse'], ['DT4', 'Bras replié', 'Autorise les mouvements de la potence bras replié ; commande la décompression des vérins de bras (mode SAV)'],
    ['DT5', 'Bras et biellette en contact', 'Mémorise la position du bras (mémoire) ; arrête le déploiement à la dépose au sol'], ['DT6', 'Crochets de verrouillage ouverts', 'Empêche la descente du cadre pendant le stockage'],
    ['DT7', 'Coulisse de la poutre de stockage abaissée', 'Autorise le recul de la coulisse ; arrête la rentrée du télescopage'], ['DT12A / B', 'Patins relevés (mode conteneur)', 'Autorise le mode conteneur, interdit le mode plateau'],
    ['DT14A / B', 'Volets relevés (mode plateau)', 'Autorise le mode plateau, interdit le mode conteneur'], ['DT15A / B', 'Galets relevés (mode plateau)', 'Autorise le mode plateau, interdit le mode conteneur'],
    ['DT16', 'Barre anti-encastrement (BAE) rentrée', 'Autorise le mode plateau ou conteneur'], ['DT18 / DT19', 'Plateau en butée sur les broches DIN', 'Arrête la potence au chargement (DT18 Flatrack, DT19 PLM)']];

  var L = [
    { id: 'equipement', title: 'Équipement : BCH, commande, PTO, génération',
      images: [im('eq-mise-sous-tension', 'Bouton de prise de force (PTO), bouton marche / arrêt du boîtier et écran d’initialisation (niveau, température d’huile, heures de PTO)'),
        im('eq-boitier-commande', 'Boîtier de commande : A liseuse · B dépose · N prise · C à M commandes manuelles · G marche / arrêt · P afficheur'),
        im('eq-modes', 'Partie séquentielle et partie manuelle du boîtier'),
        im('eq-mode-manuel', 'Mode manuel : potence, bras, cadre de manutention, galets arrière, linguet'),
        im('eq-sav-ecrans', 'Mode SAV : état des détecteurs, état des électrovannes, compteur, huile, réinitialisation de la mémoire'),
        im('eq-synoptique', 'Synoptique : boîtier de commande, boîtier de jonction, groupe de distribution, pompe, réservoirs d’huile et d’air'),
        im('eq-reservoir', 'Réservoir 60 L : filtre retour, niveau, vanne by-pass, vidange ; capteurs CT19 température, CT20 colmatage, CT21 niveau'),
        im('eq-pompe', 'Pompe Hydro Leduc XPi : sens de rotation SH / SIH'),
        im('eq-valve-bypass', 'A pompe · B interface de la PTO · C valve by-pass EV3'),
        im('eq-valve-schema', 'Valve by-pass EV3 : élément logique + électrodistributeur 2/2'),
        im('eq-distribution', 'Groupe de distribution : tranches a1 à a4, assistance pneumatique, commande électrique, LPS, LPP, prise de pression'),
        im('eq-distribution-schema', 'Schéma du groupe de distribution : LPS, LPP 290 b, régulateur 6 L/min, EV6 à EV13')],
      html:
        '<p>Le <b>BCH</b> (bras de chargement hydraulique, Marrel) charge et décharge un <b>plateau</b> (PLM, Flatrack) ou un <b>conteneur</b>. Il utilise l’énergie <b>électrique</b> (commande), <b>hydraulique</b> (vérins) et <b>pneumatique</b> (verrouillages).</p>' +
        bloc('Mise en route : la PTO', 'Entraîner la pompe hydraulique du BCH.',
          ['Démarrer le moteur, boîte au <b>point mort</b>.', 'Appuyer sur le bouton <b>PTO</b> (prise de force) : la pompe du BCH tourne.', '<b>Quand on active la PTO, le moteur accélère à 800 tr/min.</b>', 'Tirer le bouton <b>STOP</b> (marche / arrêt) du boîtier de commande.', 'L’écran d’initialisation s’affiche : niveau d’huile, température d’huile, heures de PTO.']) +
        '<h3>Les 3 modes de fonctionnement</h3>' +
        tab(['Mode', 'Ce qu’il fait'], [
          ['<b>Séquentiel</b>', '<b>2 actions</b> : <b>prise</b> ou <b>dépose</b> de charge. On garde le bouton appuyé : les mouvements s’enchaînent tout seuls.'],
          ['<b>Manuel</b>', 'On commande <b>chaque mouvement</b> un par un (potence, bras, cadre, galets, linguet). Sert aux manœuvres particulières : hauteur du bras, stockage du cadre, verrouillage sur conteneur, transport ferroviaire.'],
          ['<b>SAV</b>', '<b>Service après-vente</b>, <b>réservé au mainteneur</b>. Il <b>désactive toutes les sécurités</b> (tout devient possible) et <b>permet de connaître l’état du système</b> : détecteurs, électrovannes, heures, huile, mémoire.']]) +
        ul(['En SAV, un détecteur ou une électrovanne <b>surligné</b> = actif / commandé.', 'La <b>mémoire</b> (détecteur DT5) retient le contact bras / biellette ; après des manipulations en SAV, on la <b>réinitialise</b> : BCH en position route, mode plateau, bouton <b>Prise</b> maintenu 3 s.', 'En SAV, les <b>temporisations</b> sont inactives.']) +
        bloc('Génération', 'Fournir l’huile sous pression au BCH.',
          ['La PTO entraîne la <b>pompe Hydro Leduc XPi</b> (7 pistons, 63 cm³, cylindrée fixe, 145 L/min maxi).', 'La PTO n’est pas débrayable : la pompe tourne tout le temps.', 'EV3 <b>non alimentée</b> : le refoulement retourne à l’aspiration, pas de pression (pas d’échauffement inutile).', 'EV3 <b>alimentée</b> : la pompe envoie l’huile au groupe de distribution.'],
          ['Réservoir <b>60 L</b> : filtre retour 25 µ, filtre d’évent 10 µ, indicateur de niveau, vanne by-pass, vanne de vidange.', '3 capteurs : <b>CT19</b> température, <b>CT20</b> colmatage du filtre, <b>CT21</b> niveau.', 'Pompe « intelligente » : elle s’indexe seule sur le sens de rotation (SH / SIH) ; en maintenance, bien brancher l’aspiration selon le sens de la PTO.']) +
        bloc('Groupe de distribution', 'Diriger l’huile vers chaque vérin.',
          ['4 tranches en parallèle, distributeurs <b>6/3 centre ouvert</b>, commande <b>électropneumatique</b> (EV6 à EV13), rappel par ressort.', 'Avec ce distributeur, l’opérateur <b>ressent la charge</b>.', 'Protection : <b>LPP 290 b</b> + 6 LPS ; <b>régulateur de débit 6 L/min</b> pour les galets arrière (mouvement lent et précis).'],
          ['LPS : bras 265 b (sortie) / 210 b (rentrée) · coulisse 150 b · galets 100 b · télescopage poutre 100 b / 100 b.', '2 <b>raccords rapides</b> aux extrémités du bloc : pour se brancher sur un autre PPLOG si la génération est en panne.']),
      retenir: ['PTO activée → moteur à 800 tr/min.', '3 modes : séquentiel (prise / dépose), manuel (chaque mouvement), SAV (mainteneur, sécurités désactivées, état du système).', 'EV3 = valve by-pass de la pompe : doit toujours être alimentée pour travailler.', 'Pompe XPi 63 cm³, 145 L/min ; réservoir 60 L ; LPP 290 b ; régulateur 6 L/min (galets).'] },

    { id: 'equipement-commande', title: 'Équipement : boîtier de jonction, électrovannes, détecteurs, pneumatique',
      images: [im('eq-jonction', 'Boîtier de jonction (avant gauche du BCH) et temporisations'),
        im('eq-raccordement', 'Boîtier de raccordement : A boîtier · B fusibles 7,5 A et 15 A · C 3 relais 24 V'),
        im('eq-electrovannes', 'Électrovannes : EV1 / EV2 décompression, EV3 by-pass, EV4 linguet, EV5 crochets, EV6 à EV13 distributeur'),
        im('eq-detecteurs', 'Implantation des 16 détecteurs (DT1 à DT19)'),
        im('eq-pneumatique', 'Circuit pneumatique : réservoir d’air → groupe de distribution et boîtier de jonction (EV4, EV5)')],
      html:
        bloc('Le boîtier de jonction', 'Faire le lien entre le boîtier de commande et le BCH :',
          ['La <b>télécommande</b> (boîtier de commande) <b>doit fonctionner</b> : elle envoie les ordres au boîtier de jonction.', 'Le boîtier de jonction <b>transmet les informations</b> au boîtier de commande (état des détecteurs, écran).', 'Il <b>alimente les détecteurs et les capteurs</b>.', 'Il <b>commande les électrovannes et électrovalves</b>.', 'Il <b>temporise deux actions</b> : descente des galets (<b>3 s</b>) et montée du cadre de manutention (<b>4 s</b>).'],
          ['Situé à l’<b>avant gauche</b> du BCH.', 'Le <b>boîtier de raccordement</b> (24 V batterie + fonction blackout) l’alimente : 2 fusibles (7,5 A et 15 A), 3 relais 24 V ; il alimente aussi les feux de travail et le gyrophare.']) +
        '<h3>Les électrovannes</h3>' + tab(['Électrovanne', 'Commande'], EV) +
        ul(['<b>EV3 doit toujours être alimentée</b> : sinon la pompe débite à vide et rien ne bouge.', '<b>EV4 et EV5 commandent la partie pneumatique</b> (dans le boîtier de jonction) : EV4 = vérin du linguet de sécurité, EV5 = 2 vérins des crochets de verrouillage du cadre.', 'EV6 à EV13 pilotent en air les tranches du distributeur.']) +
        '<h3>Les détecteurs</h3>' +
        '<p>L’équipement possède <b>16 détecteurs de proximité interchangeables</b> (+ 3 capteurs sur le réservoir). Ils autorisent ou non chaque action.</p>' + tab(['Détecteur', 'Détecte', 'Sert à'], DT) +
        bloc('Astuce de dépannage : détecteurs interchangeables', null,
          ['Des détecteurs du mode <b>plateau</b> sont HS (ex. DT14, DT15) ?', 'Je récupère des détecteurs du mode <b>conteneur</b> (ex. DT12), qui ne servent pas pour cette mission.', 'Je les monte à la place des détecteurs HS.', 'Et inversement : selon que la mission demande le mode conteneur ou le mode plateau.']) +
        bloc('Circuit pneumatique', null,
          ['Le réservoir d’air alimente le groupe de distribution : pilotage des tranches par EV6 à EV13.', 'Il alimente aussi le boîtier de jonction : EV4 (linguet) et EV5 (crochets du cadre).', 'L’air s’échappe par l’échappement « ECH » du boîtier de jonction.']),
      retenir: ['Boîtier de jonction : transmet les infos au boîtier de commande, alimente détecteurs et capteurs, commande les électrovannes, temporise 2 actions (galets 3 s, cadre 4 s).', 'EV3 toujours alimentée ; EV4 (linguet) et EV5 (crochets) = partie pneumatique.', '16 détecteurs interchangeables : on peut prendre ceux du mode inutilisé (plateau ↔ conteneur).'] },

    { id: 'equipement-sequences', title: 'Équipement : séquences et dépannage',
      images: [im('eq-dechargement', 'Séquence de déchargement : recul de la coulisse, puis sortie des vérins de bras'),
        im('eq-chargement', 'Séquence de chargement : rentrée des vérins de bras, puis sortie de la coulisse'),
        im('eq-degrade-electrique', 'Défaillance électrique : vis de shuntage sur EV3 (pompe) et tranches A du groupe de distribution'),
        im('eq-degrade-generation', 'Défaillance de la génération : flexibles du PPLOG en panne branchés sur le PPLOG de dépannage')],
      html:
        bloc('Déchargement (dépose)', null,
          ['EV3 + <b>EV9</b> : rentrée du vérin de coulisse (EV2 décompresse les vérins de bras). Arrêt par <b>DT3</b> (sécurité : LPP 290 b).', 'Puis EV3 + <b>EV6</b> : sortie des 2 vérins de bras (valve de contrôle de charge). <b>DT5</b> s’active au contact bras / biellette (sécurité : LPS 265 b).', 'On lâche le bouton quand le crochet arrive à hauteur de l’anneau du PLM.']) +
        bloc('Chargement (prise)', null,
          ['EV3 + <b>EV7</b> : rentrée des 2 vérins de bras ; le linguet se met en place, les galets touchent les broches d’appui (sécurité : LPS 210 b).', 'Puis EV3 + <b>EV8</b> : sortie du vérin de coulisse (EV1 décompresse les vérins de bras). Arrêt par <b>DT2</b> (sécurité : LPS 150 b).', 'Le mouvement s’arrête quand le PLM se verrouille dans les broches DIN.']) +
        ul(['Galets arrière : sortie <b>EV12</b> (DT15A / B actifs), rentrée <b>EV13</b> ; débit réduit à 6 L/min.', 'Poutre de stockage : sortie du télescopage <b>EV10</b>, rentrée <b>EV11</b> (arrêt par DT7).', 'Ouverture du linguet : <b>EV4</b> sort le vérin du linguet, puis <b>EV5</b> sort les vérins des crochets du cadre.']) +
        '<h3>Dépannage</h3>' +
        bloc('Le régime monte bien à 800 tr/min mais la télécommande ne fonctionne pas', 'Descendre ou prendre la charge sans le boîtier de commande (défaillance électrique).',
          ['Le régime monte à 800 tr/min : la PTO et la pompe fonctionnent.', 'La télécommande ne marche pas : EV3 n’est plus alimentée, la pompe débite à vide.', 'Je <b>shunte EV3</b> : je visse la vis à empreinte hexagonale sur l’électrovanne 3, au niveau de la pompe.', 'J’<b>actionne les distributeurs en mode manuel</b>, directement sur les 4 tranches du groupe de distribution.', '⚠️ Toutes les sécurités sont désactivées : manœuvrer avec prudence.']) +
        bloc('La PTO ne s’enclenche pas mais la télécommande fonctionne', 'Utiliser la génération hydraulique d’un autre PPLOG.',
          ['Le régime ne monte pas : la PTO ne crabote pas, la pompe ne tourne pas.', 'Je <b>branche les push-pull du véhicule en panne sur le véhicule de dépannage</b> (flexibles d’alimentation et de retour).', 'J’<b>active la PTO du véhicule de dépannage</b>.', 'J’<b>utilise la télécommande du véhicule en panne</b> pour descendre la charge (ou je manœuvre à la main sur la distribution).', '⚠️ Ne jamais activer la PTO du véhicule en panne.']),
      retenir: ['Déchargement : rentrée coulisse (EV9, DT3) puis sortie bras (EV6, DT5). Chargement : rentrée bras (EV7) puis sortie coulisse (EV8, DT2).', '800 tr/min mais télécommande HS → shunter EV3 (vis hexagonale) et actionner les distributeurs à la main.', 'PTO HS mais télécommande OK → push-pull du PPLOG en panne sur le PPLOG de dépannage, PTO du dépanneur, télécommande du véhicule en panne.'] }
  ];

  var Q = [
    ['equipement', 'Que se passe-t-il quand on active la PTO du PPLOG ?', ['Le moteur accélère à 800 tr/min', 'Le moteur passe au ralenti à 600 tr/min', 'Le moteur s’arrête', 'La boîte passe en 1re']],
    ['equipement', 'Combien de modes de fonctionnement sur le boîtier de commande du BCH ?', ['3 : séquentiel, manuel, SAV', '2 : manuel et automatique', '4 : séquentiel, manuel, SAV, secours', '1 seul']],
    ['equipement', 'Mode séquentiel ?', ['2 actions : prise ou dépose de charge, enchaînées en maintenant le bouton', 'On commande chaque mouvement un par un', 'Réservé au mainteneur', 'Désactive les sécurités']],
    ['equipement', 'Mode manuel ?', ['On commande chaque mouvement', '2 actions : prise ou dépose', 'Il désactive toutes les sécurités', 'Il affiche l’état des détecteurs']],
    ['equipement', 'Mode SAV ?', ['Service après-vente : réservé au mainteneur, désactive toutes les sécurités, permet de connaître l’état du système', 'Mode de chargement automatique', 'Mode de transport ferroviaire', 'Mode réservé au conducteur']],
    ['equipement', 'En mode SAV, que signifie un détecteur surligné à l’écran ?', ['Il est actif', 'Il est HS', 'Il est débranché', 'Il doit être remplacé']],
    ['equipement', 'Rôle de la valve by-pass EV3 ?', ['Non alimentée : la pompe débite à vide (refoulement relié à l’aspiration) ; alimentée : la pompe alimente le distributeur', 'Commander le linguet de sécurité', 'Décompresser les vérins de bras', 'Limiter la pression à 290 b']],
    ['equipement', 'Pompe du BCH ?', ['Hydro Leduc XPi, 7 pistons, 63 cm³, cylindrée fixe, 145 L/min maxi', 'Pompe à cylindrée variable Load Sensing 100 L/min', 'Pompe à engrenages 40 L/min', 'Pompe électrique']],
    ['equipement', 'Capacité du réservoir hydraulique du BCH ?', ['60 L', '380 L', '30 L', '100 L']],
    ['equipement', 'Capteurs CT19, CT20, CT21 du réservoir ?', ['Température, colmatage du filtre, niveau', 'Pression, débit, température', 'Niveau, pression, vitesse', 'Colmatage, pression, niveau']],
    ['equipement', 'Type de distributeurs du groupe de distribution du BCH ?', ['6/3 centre ouvert à commande électropneumatique, rappel par ressort', '4/3 centre fermé LS', '4/2 à commande manuelle', '6/3 centre fermé à commande hydraulique']],
    ['equipement', 'Tarage du LPP du groupe de distribution ?', ['290 b', '350 b', '220 b', '265 b']],
    ['equipement', 'À quoi sert le régulateur de débit 6 L/min ?', ['Déplacer les galets arrière lentement et précisément', 'Régler la vitesse du bras', 'Limiter la pression de la coulisse', 'Alimenter le linguet']],
    ['equipement-commande', 'Rôles du boîtier de jonction ?', ['Transmettre les infos au boîtier de commande, alimenter détecteurs et capteurs, commander les électrovannes, temporiser deux actions', 'Seulement alimenter les feux de travail', 'Produire la pression hydraulique', 'Commander la PTO']],
    ['equipement-commande', 'Quelles actions le boîtier de jonction temporise-t-il ?', ['Descente des galets (3 s) et montée du cadre de manutention (4 s)', 'Sortie du bras (5 s) et rentrée de la coulisse (2 s)', 'Ouverture du linguet (1 s)', 'Aucune']],
    ['equipement-commande', 'Quelle électrovanne doit toujours être alimentée pour travailler ?', ['EV3', 'EV4', 'EV5', 'EV1']],
    ['equipement-commande', 'EV4 et EV5 commandent :', ['La partie pneumatique : EV4 le linguet de sécurité, EV5 les crochets de verrouillage du cadre', 'La sortie et la rentrée du bras', 'La valve by-pass', 'Les galets arrière']],
    ['equipement-commande', 'EV1 et EV2 ?', ['Valve de décompression à commande électrique des vérins de bras', 'Valve by-pass de la pompe', 'Linguet de sécurité', 'Télescopage de la poutre']],
    ['equipement-commande', 'Combien de détecteurs sur le BCH ?', ['16, interchangeables', '8', '3', '24']],
    ['equipement-commande', 'Des détecteurs du mode plateau sont HS : comment se dépanner ?', ['Récupérer des détecteurs du mode conteneur (interchangeables) selon le besoin de la mission', 'Passer en mode SAV en permanence', 'Shunter EV3', 'Impossible : il faut attendre la pièce']],
    ['equipement-commande', 'Rôle du détecteur DT5 ?', ['Détecter le contact bras / biellette (mémoire) et arrêter le déploiement à la dépose au sol', 'Détecter la BAE rentrée', 'Détecter le plateau sur les broches DIN', 'Détecter les patins relevés']],
    ['equipement-commande', 'Rôle du détecteur DT16 ?', ['Détecter la barre anti-encastrement rentrée : autorise le mode plateau ou conteneur', 'Détecter le bras replié', 'Détecter la coulisse rentrée', 'Détecter les crochets ouverts']],
    ['equipement-commande', 'DT12A / DT12B (patins relevés) actifs : quel mode ?', ['Mode conteneur autorisé, mode plateau interdit', 'Mode plateau autorisé', 'Mode SAV', 'Les deux modes']],
    ['equipement-sequences', 'Séquence de déchargement : dans quel ordre ?', ['Rentrée du vérin de coulisse, puis sortie des vérins de bras', 'Sortie des vérins de bras, puis rentrée de la coulisse', 'Sortie de la coulisse, puis rentrée du bras', 'Galets, puis bras']],
    ['equipement-sequences', 'Séquence de chargement : dans quel ordre ?', ['Rentrée des vérins de bras, puis sortie du vérin de coulisse', 'Sortie de la coulisse, puis rentrée du bras', 'Sortie du bras, puis rentrée de la coulisse', 'Linguet, puis galets']],
    ['equipement-sequences', 'Le régime monte bien à 800 tr/min mais la télécommande ne fonctionne pas. Comment se dépanner ?', ['Shunter EV3 et actionner les distributeurs en mode manuel', 'Brancher les push-pull sur un PPLOG de dépannage', 'Passer en mode SAV', 'Changer la pompe']],
    ['equipement-sequences', 'La PTO ne s’enclenche pas mais la télécommande fonctionne. Comment se dépanner ?', ['Brancher les push-pull du véhicule en panne sur le véhicule de dépannage, activer la PTO du dépanneur et utiliser la télécommande du véhicule en panne', 'Shunter EV3 et actionner les distributeurs à la main', 'Activer la PTO du véhicule en panne et celle du dépanneur', 'Passer en mode SAV']],
    ['equipement-sequences', 'Comment shunter EV3 ?', ['Visser la vis à empreinte hexagonale sur l’électrovanne 3, au niveau de la pompe', 'Débrancher le boîtier de jonction', 'Retirer le fusible 15 A', 'Ponter le relais R1']],
    ['equipement-sequences', 'Dépannage par un autre PPLOG : que ne faut-il jamais faire ?', ['Activer la PTO du véhicule en panne', 'Activer la PTO du véhicule de dépannage', 'Utiliser la télécommande du véhicule en panne', 'Brancher les push-pull']]
  ];
  function qs(l) { return Q.map(function (q) { return { l: typeof l === 'function' ? l(q[0]) : l, q: q[1], c: q[2], src: 'Cours AGE 13 ind. b (équipement du PPLOG) et notes de cours' }; }); }
  REV.addLessons('pplog', 'intarder-blocages', L);
  REV.addExercises('pplog', { lessons: [], questions: qs(function (l) { return l; }) });
  REV.addLessons('uv3', 'pplog-direction', [{ id: 'pplog-equipement', title: 'PPLOG : équipement (BCH, modes, boîtier de jonction, dépannage)', images: [].concat.apply([], L.map(function (x) { return x.images; })), html: L.map(function (x) { return '<h2>' + x.title + '</h2>' + x.html; }).join(''), retenir: [].concat.apply([], L.map(function (x) { return x.retenir; })) }]);
  REV.addExercises('uv3', { lessons: [], questions: qs('pplog-equipement') });
})();
