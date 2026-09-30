/* Diagnostic — catalogue des véhicules civils les plus courants en France (parc roulant 2024 : Clio III, 207, 208,
   C3 III, Clio IV, Clio II, 206, Sandero II… en tête) et de leur architecture multiplexée PROBABLE.
   Sources : documentation Citroën « Architecture multiplexée AEE2010 » (C4 Picasso B78), documentation Renault
   Clio IV (réseau multiplexé), documents Volkswagen (passerelle J533), connaissances générales constructeurs.
   Tout est « à vérifier » sur le véhicule réel : la fiche véhicule permet de corriger. */
(function () {
  var D = window.DIAG = window.DIAG || {};

  /* Types de réseau (valeurs de mesure dans modules.js) */
  D.NET_TYPES = {
    canhs: { nom: 'CAN haute vitesse (500 kbit/s)', court: 'CAN HS' },
    canls: { nom: 'CAN basse vitesse tolérant aux pannes (100 à 125 kbit/s)', court: 'CAN LS' },
    cansw: { nom: 'CAN monofilaire (33,3 kbit/s, GMLAN)', court: 'CAN 1 fil' },
    lin: { nom: 'LIN (maître / esclave, 19,2 kbit/s)', court: 'LIN' },
    van: { nom: 'VAN (ancien réseau PSA / Renault)', court: 'VAN' },
    most: { nom: 'MOST (fibre optique, multimédia)', court: 'MOST' }
  };

  /* Architectures types. ecus : [nom, réseau, terminaison 120 Ω ?] */
  var A = D.ARCHI = {
    psa_van: {
      nom: 'PSA « VAN + CAN » (1998-2005 environ)', passerelle: 'BSI (boîtier de servitude intelligent)',
      reseaux: [['CAN IS', 'canhs'], ['VAN CAR', 'van'], ['VAN CONFORT', 'van']],
      ecus: [['Calculateur moteur', 'CAN IS', 1], ['BSI', 'CAN IS', 1], ['ABS / ESP', 'CAN IS'], ['Boîte automatique (si équipé)', 'CAN IS'],
        ['Airbag', 'VAN CAR'], ['BSM (servitude moteur)', 'VAN CAR'], ['Commutation sous volant (CV00)', 'VAN CAR'],
        ['Combiné', 'VAN CONFORT'], ['Autoradio', 'VAN CONFORT'], ['Climatisation régulée', 'VAN CONFORT']],
      note: 'Le réseau VAN n’est pas encore couvert par le diagnostic guidé : seul le CAN IS se mesure à la prise (pins 6 et 14).'
    },
    psa_aee2004: {
      nom: 'PSA AEE2004 « full CAN » (2004-2013 environ)', passerelle: 'BSI',
      reseaux: [['CAN IS', 'canhs'], ['CAN CAR', 'canls'], ['CAN CONFORT', 'canls'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN IS', 1], ['BSI', 'CAN IS', 1], ['ABS / ESP', 'CAN IS'], ['Boîte automatique / pilotée (si équipé)', 'CAN IS'], ['Direction assistée électrique (si équipé)', 'CAN IS'],
        ['BSM (servitude moteur)', 'CAN CAR'], ['Airbag', 'CAN CAR'], ['Commutation sous volant (CV00)', 'CAN CAR'],
        ['Combiné', 'CAN CONFORT'], ['Autoradio / navigation', 'CAN CONFORT'], ['Climatisation', 'CAN CONFORT'],
        ['Moteur d’essuie-vitre, capteur de pluie (selon version)', 'LIN']],
      note: 'CAN IS : terminaisons dans le calculateur moteur et le BSI (principe PSA). CAN CAR et CAN CONFORT : chaque calculateur a sa propre terminaison.'
    },
    psa_aee2010: {
      nom: 'PSA AEE2010 (2012-2019 environ)', passerelle: 'BSI1',
      reseaux: [['CAN IS', 'canhs'], ['CAN LAS (selon version)', 'canhs'], ['CAN CAR', 'canls'], ['CAN CONFORT', 'canls'], ['CAN INFO DIV', 'canls'], ['LIN', 'lin']],
      ecus: [['Calculateur contrôle moteur (1320)', 'CAN IS', 1], ['BSI1', 'CAN IS', 1], ['ESP (7800)', 'CAN IS'], ['Direction assistée électrique (7126)', 'CAN IS'], ['Boîte automatique / pilotée (si équipé)', 'CAN IS'],
        ['Platine servitude PSF1', 'CAN LAS (selon version)', 1], ['Commutation sous volant CV00', 'CAN CAR'], ['Antivol électrique', 'CAN CAR'], ['Lecteur de clé', 'CAN CAR'],
        ['Airbag (6570)', 'CAN CONFORT'], ['Climatisation (8080)', 'CAN CONFORT'],
        ['Combiné (0004)', 'CAN INFO DIV'], ['Écran multifonction / radionavigation', 'CAN INFO DIV'],
        ['Boîtier d’état de charge batterie, essuie-vitres, alternateur piloté', 'LIN']],
      note: 'Doc Citroën AEE2010 : CAN IS 500 kbit/s, terminaisons dans le calculateur moteur et le BSI ; la coupure d’un fil CAN IS coupe la communication. CAN CAR / CONFORT / INFO DIV 125 kbit/s : la coupure d’un fil ou un court-circuit entre fils laisse communiquer avec un défaut mémorisé. LIN 19,2 kbit/s.'
    },
    psa_cmp: {
      nom: 'Stellantis CMP / EMP2 V2 (2019 et après)', passerelle: 'BSI / passerelle centrale',
      reseaux: [['CAN IS', 'canhs'], ['Autres CAN (châssis, confort, multimédia)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN IS', 1], ['BSI / passerelle', 'CAN IS', 1], ['ESP', 'CAN IS'], ['Direction assistée électrique', 'CAN IS'], ['Airbag', 'Autres CAN (châssis, confort, multimédia)'], ['Combiné numérique', 'Autres CAN (châssis, confort, multimédia)'], ['Écran multimédia', 'Autres CAN (châssis, confort, multimédia)']],
      note: 'Architecture récente : plusieurs réseaux CAN haute vitesse et accès au diagnostic souvent sécurisé. À vérifier sur le schéma constructeur.'
    },
    renault_can1: {
      nom: 'Renault CAN (2001-2012 environ)', passerelle: 'UCH (unité centrale habitacle)',
      reseaux: [['CAN V (véhicule)', 'canhs'], ['LIN (selon version)', 'lin']],
      ecus: [['Injection', 'CAN V (véhicule)', 1], ['UCH', 'CAN V (véhicule)', 1], ['ABS / ESP', 'CAN V (véhicule)'], ['Airbag', 'CAN V (véhicule)'], ['Tableau de bord', 'CAN V (véhicule)'], ['Boîte automatique (si équipé)', 'CAN V (véhicule)'], ['Direction assistée électrique (si équipé)', 'CAN V (véhicule)'], ['Climatisation régulée (si équipé)', 'CAN V (véhicule)']],
      note: 'Principe Renault : un réseau CAN principal ; les terminaisons 120 Ω sont en général dans l’injection et l’UCH. À vérifier sur le schéma du véhicule.'
    },
    renault_can2: {
      nom: 'Renault / Dacia CAN V + CAN M (2012-2019 environ)', passerelle: 'UCH',
      reseaux: [['CAN V (véhicule)', 'canhs'], ['CAN M (multimédia)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Injection', 'CAN V (véhicule)', 1], ['UCH', 'CAN V (véhicule)', 1], ['ABS / ESP', 'CAN V (véhicule)'], ['Airbag', 'CAN V (véhicule)'], ['Tableau de bord', 'CAN V (véhicule)'], ['Direction assistée électrique', 'CAN V (véhicule)'], ['Boîte automatique EDC (si équipé)', 'CAN V (véhicule)'],
        ['Multimédia (R-Link / MediaNav)', 'CAN M (multimédia)'], ['Capteur batterie, essuie-vitres (selon version)', 'LIN']],
      note: 'Clio IV : deux calculateurs ont une résistance interne de 120 Ω entre CAN H et CAN L, l’injection et l’UCH. L’outil de diagnostic interroge l’airbag et l’UCH pour connaître la topologie du réseau.'
    },
    renault_cmf: {
      nom: 'Renault / Dacia CMF-B (2019 et après)', passerelle: 'Passerelle centrale (CGW)',
      reseaux: [['CAN moteur / châssis', 'canhs'], ['CAN habitacle', 'canhs'], ['CAN multimédia', 'canhs'], ['LIN', 'lin']],
      ecus: [['Injection', 'CAN moteur / châssis', 1], ['Passerelle centrale (CGW)', 'CAN moteur / châssis', 1], ['ESP', 'CAN moteur / châssis'], ['Airbag', 'CAN habitacle'], ['UCH / BCM', 'CAN habitacle'], ['Tableau de bord', 'CAN habitacle'], ['Multimédia', 'CAN multimédia']],
      note: 'Architecture récente avec passerelle centrale : plusieurs CAN séparés. À vérifier sur le schéma constructeur.'
    },
    dacia_1: {
      nom: 'Dacia 1ʳᵉ génération (Logan / Sandero I / Duster I)', passerelle: 'UCH',
      reseaux: [['CAN V (véhicule)', 'canhs']],
      ecus: [['Injection', 'CAN V (véhicule)', 1], ['UCH', 'CAN V (véhicule)', 1], ['ABS', 'CAN V (véhicule)'], ['Airbag', 'CAN V (véhicule)'], ['Tableau de bord', 'CAN V (véhicule)']],
      note: 'Architecture simplifiée d’origine Renault. À vérifier.'
    },
    vw_pq: {
      nom: 'Volkswagen PQ (Golf IV à VI, Polo IV/V…)', passerelle: 'Passerelle J533 (dans le combiné ou séparée selon modèle)',
      reseaux: [['CAN Antrieb (motorisation)', 'canhs'], ['CAN Komfort (confort)', 'canls'], ['CAN Infotainment', 'canls'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN Antrieb (motorisation)', 1], ['ABS / ESP', 'CAN Antrieb (motorisation)'], ['Airbag', 'CAN Antrieb (motorisation)'], ['Boîte automatique / DSG', 'CAN Antrieb (motorisation)'], ['Direction assistée électrique', 'CAN Antrieb (motorisation)'], ['Passerelle J533', 'CAN Antrieb (motorisation)'],
        ['Réseau de bord (BCM)', 'CAN Komfort (confort)'], ['Portes, climatisation', 'CAN Komfort (confort)'], ['Radio / navigation', 'CAN Infotainment']],
      note: 'CAN Antrieb 500 kbit/s. VW utilise une terminaison répartie (résistance principale dans le calculateur moteur, les autres calculateurs à forte valeur) : on doit quand même lire environ 60 Ω à la prise. À vérifier.'
    },
    vw_mqb: {
      nom: 'Volkswagen MQB (Golf VII/VIII, Polo VI, T-Roc…)', passerelle: 'Passerelle J533',
      reseaux: [['CAN Antrieb (motorisation)', 'canhs'], ['CAN Komfort (confort)', 'canhs'], ['CAN Infotainment', 'canhs'], ['CAN Fahrwerk (châssis)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN Antrieb (motorisation)', 1], ['Boîte DSG', 'CAN Antrieb (motorisation)'], ['ABS / ESP', 'CAN Fahrwerk (châssis)'], ['Airbag', 'CAN Fahrwerk (châssis)'], ['Réseau de bord (BCM)', 'CAN Komfort (confort)'], ['Climatisation', 'CAN Komfort (confort)'], ['Radio / navigation', 'CAN Infotainment'], ['Passerelle J533', 'CAN Antrieb (motorisation)', 1]],
      note: 'Plusieurs CAN haute vitesse réunis par la passerelle J533. À vérifier sur le schéma constructeur.'
    },
    toyota: {
      nom: 'Toyota (Yaris, Auris, Aygo…)', passerelle: 'Calculateur passerelle / carrosserie principal',
      reseaux: [['CAN V (véhicule)', 'canhs'], ['CAN MS / carrosserie (selon modèle)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'CAN V (véhicule)', 1], ['ABS / VSC', 'CAN V (véhicule)'], ['Direction assistée électrique', 'CAN V (véhicule)'], ['Airbag', 'CAN V (véhicule)'], ['Combiné', 'CAN V (véhicule)', 1], ['Calculateur carrosserie principal', 'CAN MS / carrosserie (selon modèle)']],
      note: 'L’emplacement des résistances de terminaison varie selon le modèle (moteur, combiné ou jonction). À vérifier.'
    },
    ford: {
      nom: 'Ford (Fiesta, Focus, C-Max, Kuga…)', passerelle: 'GEM / BCM et combiné',
      reseaux: [['HS-CAN', 'canhs'], ['MS-CAN (125 kbit/s)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (PCM)', 'HS-CAN', 1], ['ABS / ESP', 'HS-CAN'], ['Airbag (RCM)', 'HS-CAN'], ['Combiné (IPC)', 'HS-CAN', 1], ['Direction assistée électrique', 'HS-CAN'], ['Module électronique générique (GEM / BCM)', 'MS-CAN (125 kbit/s)'], ['Audio / navigation', 'MS-CAN (125 kbit/s)'], ['Climatisation', 'MS-CAN (125 kbit/s)']],
      note: 'Ford : HS-CAN 500 kbit/s et MS-CAN 125 kbit/s (deux fils, mesures proches du CAN HS). À vérifier.'
    },
    opel_gm: {
      nom: 'Opel GM (Corsa D/E, Astra H/J, Meriva…)', passerelle: 'BCM (carrosserie)',
      reseaux: [['HS-CAN', 'canhs'], ['LS-GMLAN (1 fil)', 'cansw'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'HS-CAN', 1], ['ABS / ESP (EBCM)', 'HS-CAN'], ['Boîte automatique (TCM)', 'HS-CAN'], ['BCM', 'HS-CAN', 1], ['Airbag (SDM)', 'LS-GMLAN (1 fil)'], ['Combiné (IPC)', 'LS-GMLAN (1 fil)'], ['Radio', 'LS-GMLAN (1 fil)'], ['Climatisation', 'LS-GMLAN (1 fil)']],
      note: 'GM utilise un CAN monofilaire basse vitesse (33,3 kbit/s) en plus du HS-CAN. À vérifier.'
    },
    fiat: {
      nom: 'Fiat (500, Panda III, Punto…)', passerelle: 'Body Computer (NBC / BSM)',
      reseaux: [['C-CAN (500 kbit/s)', 'canhs'], ['B-CAN (50 kbit/s, tolérant)', 'canls'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'C-CAN (500 kbit/s)', 1], ['ABS / ESP', 'C-CAN (500 kbit/s)'], ['Direction assistée électrique', 'C-CAN (500 kbit/s)'], ['Body Computer', 'C-CAN (500 kbit/s)', 1], ['Airbag', 'B-CAN (50 kbit/s, tolérant)'], ['Combiné', 'B-CAN (50 kbit/s, tolérant)'], ['Radio / Blue&Me', 'B-CAN (50 kbit/s, tolérant)'], ['Climatisation', 'B-CAN (50 kbit/s, tolérant)']],
      note: 'Body Computer = passerelle entre C-CAN et B-CAN. À vérifier.'
    }
  };

  /* [marque, modèle, années, architecture, motorisations fréquentes (à vérifier)] — dans l’ordre du parc roulant */
  var M = [
    ['Renault', 'Clio III', '2005-2014', 'renault_can1', '1.5 dCi (K9K : Delphi puis Continental), 1.2 16V, 1.4 / 1.6 16V'],
    ['Peugeot', '207', '2006-2014', 'psa_aee2004', '1.4 / 1.6 HDi (DV4 / DV6), 1.4 / 1.6 VTi, 1.4 75'],
    ['Peugeot', '208 I', '2012-2019', 'psa_aee2010', '1.2 PureTech, 1.4 / 1.6 HDi, 1.6 BlueHDi'],
    ['Citroën', 'C3 III', '2016-2024', 'psa_aee2010', '1.2 PureTech, 1.5 / 1.6 BlueHDi'],
    ['Renault', 'Clio IV', '2012-2019', 'renault_can2', '1.5 dCi (K9K), 0.9 TCe, 1.2 16V / 1.2 TCe'],
    ['Renault', 'Clio II (phase 2)', '2001-2012', 'renault_can1', '1.5 dCi (K9K), 1.2 / 1.4 / 1.6'],
    ['Peugeot', '206', '1998-2012', 'psa_van', '1.4 HDi (DV4), 2.0 HDi, 1.1 / 1.4 / 1.6'],
    ['Dacia', 'Sandero II', '2012-2020', 'renault_can2', '1.5 dCi, 0.9 TCe, 1.0 SCe'],
    ['Peugeot', '308 I', '2007-2013', 'psa_aee2004', '1.6 HDi, 2.0 HDi, 1.6 VTi / THP'],
    ['Peugeot', '308 II', '2013-2021', 'psa_aee2010', '1.2 PureTech, 1.6 / 2.0 BlueHDi, 1.5 BlueHDi'],
    ['Renault', 'Mégane II', '2002-2009', 'renault_can1', '1.5 dCi, 1.9 dCi, 1.4 / 1.6 16V'],
    ['Renault', 'Mégane III', '2008-2016', 'renault_can2', '1.5 dCi, 1.6 dCi, 1.2 TCe'],
    ['Renault', 'Twingo II', '2007-2014', 'renault_can1', '1.2 / 1.2 TCe, 1.5 dCi'],
    ['Renault', 'Captur I', '2013-2019', 'renault_can2', '1.5 dCi, 0.9 / 1.2 TCe'],
    ['Renault', 'Scénic II / III', '2003-2016', 'renault_can1', '1.5 / 1.9 dCi, 1.6 16V'],
    ['Renault', 'Kangoo II', '2008-2021', 'renault_can1', '1.5 dCi, 1.6 16V'],
    ['Peugeot', '2008 I', '2013-2019', 'psa_aee2010', '1.2 PureTech, 1.6 BlueHDi'],
    ['Peugeot', '3008 I', '2009-2016', 'psa_aee2004', '1.6 HDi / e-HDi, 2.0 HDi, 1.6 THP'],
    ['Peugeot', '3008 II / 5008 II', '2016-2023', 'psa_aee2010', '1.2 PureTech, 1.5 / 2.0 BlueHDi'],
    ['Peugeot', '307', '2001-2008', 'psa_van', '1.6 / 2.0 HDi, 1.4 / 1.6 16V (réseau full CAN sur les dernières)'],
    ['Peugeot', 'Partner II / Citroën Berlingo II', '2008-2018', 'psa_aee2004', '1.6 HDi, 1.6 BlueHDi'],
    ['Citroën', 'C3 I', '2002-2009', 'psa_van', '1.4 HDi, 1.1 / 1.4'],
    ['Citroën', 'C3 II / DS3', '2009-2016', 'psa_aee2004', '1.4 / 1.6 HDi, 1.2 PureTech, 1.4 / 1.6 VTi'],
    ['Citroën', 'Xsara Picasso', '1999-2012', 'psa_van', '1.6 / 2.0 HDi, 1.6 16V'],
    ['Citroën', 'C4 I / C4 Picasso I', '2004-2013', 'psa_aee2004', '1.6 / 2.0 HDi'],
    ['Citroën', 'C4 Picasso II / C4 Cactus', '2013-2020', 'psa_aee2010', '1.2 PureTech, 1.6 / 2.0 BlueHDi'],
    ['Dacia', 'Logan I / Sandero I', '2004-2012', 'dacia_1', '1.5 dCi, 1.4 / 1.6 MPI'],
    ['Dacia', 'Duster I', '2010-2017', 'dacia_1', '1.5 dCi, 1.6 16V'],
    ['Dacia', 'Duster II', '2018-2023', 'renault_can2', '1.5 dCi / Blue dCi, 1.0 / 1.3 TCe'],
    ['Renault', 'Clio V / Captur II', '2019-', 'renault_cmf', '1.0 TCe, 1.5 Blue dCi, E-Tech hybride'],
    ['Dacia', 'Sandero III', '2020-', 'renault_cmf', '1.0 SCe / TCe, ECO-G'],
    ['Peugeot', '208 II / 2008 II', '2019-', 'psa_cmp', '1.2 PureTech, 1.5 BlueHDi'],
    ['Opel', 'Corsa F', '2019-', 'psa_cmp', '1.2 PureTech, 1.5 Diesel'],
    ['Volkswagen', 'Polo IV / V', '2002-2017', 'vw_pq', '1.2 / 1.4 / 1.6 TDI, 1.2 / 1.4 essence'],
    ['Volkswagen', 'Golf IV / V / VI', '1997-2012', 'vw_pq', '1.9 TDI (injecteur-pompe), 1.6 / 2.0 TDI common rail'],
    ['Volkswagen', 'Golf VII / VIII, Polo VI', '2012-', 'vw_mqb', '1.6 / 2.0 TDI, 1.0 / 1.2 / 1.4 TSI'],
    ['Toyota', 'Yaris II / III', '2005-2020', 'toyota', '1.0 / 1.33 VVT-i, 1.4 D-4D, hybride'],
    ['Ford', 'Fiesta VI / VII', '2008-2023', 'ford', '1.0 EcoBoost, 1.25 / 1.4, 1.4 / 1.5 / 1.6 TDCi'],
    ['Ford', 'Focus II / III', '2004-2018', 'ford', '1.6 TDCi, 1.0 EcoBoost, 1.6'],
    ['Opel', 'Corsa D / E', '2006-2019', 'opel_gm', '1.2 / 1.4, 1.3 CDTI'],
    ['Opel', 'Astra H / J', '2004-2015', 'opel_gm', '1.7 CDTI, 1.4 / 1.6'],
    ['Fiat', '500 / Panda III', '2007-', 'fiat', '1.2 / 0.9 TwinAir, 1.3 Multijet']
  ];
  D.CATALOGUE = M.map(function (m, i) {
    return { id: 'c' + i, marque: m[0], modele: m[1], annees: m[2], archi: m[3], moteurs: m[4] };
  });
})();
