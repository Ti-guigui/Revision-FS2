/* Diagnostic — fiches MARQUES (marques vendues ou courantes en France, liste Vivacar / Caradisiac).
   Pour chaque marque : pays, groupe, boîtier passerelle / servitude, architecture multiplexée probable (clé ARCHI),
   passerelle de diagnostic sécurisée, modèles courants, pièces / moteurs partagés avec d'autres marques.
   Sources : sites spécialisés diagnostic (passerelles SGW / SFD), documentation constructeur publique, connaissances
   générales. Tout est indicatif : « à vérifier » sur le schéma du véhicule. */
(function () {
  var D = window.DIAG = window.DIAG || {};

  /* Architectures supplémentaires (s'ajoutent à catalogue.js) */
  var X = {
    mercedes: { nom: 'Mercedes-Benz (SAM, plusieurs CAN, MOST)', passerelle: 'Passerelle centrale / EIS-EZS (selon génération), boîtiers SAM avant et arrière',
      reseaux: [['CAN C (moteur / châssis)', 'canhs'], ['CAN B (habitacle)', 'canls'], ['CAN D (diagnostic)', 'canhs'], ['LIN', 'lin'], ['MOST (multimédia)', 'most']],
      ecus: [['Calculateur moteur (ME / CDI)', 'CAN C (moteur / châssis)', 1], ['ESP', 'CAN C (moteur / châssis)'], ['Boîte automatique', 'CAN C (moteur / châssis)'], ['EIS / EZS (contacteur d’allumage, passerelle)', 'CAN C (moteur / châssis)', 1], ['SAM avant', 'CAN B (habitacle)'], ['SAM arrière', 'CAN B (habitacle)'], ['Airbag', 'CAN B (habitacle)'], ['Combiné', 'CAN B (habitacle)']],
      note: 'SAM = module d’acquisition des signaux et de commande (équivalent du BSI). Sur les générations récentes, le CAN habitacle devient haute vitesse. À vérifier.' },
    bmw: { nom: 'BMW / Mini (PT-CAN, K-CAN, FlexRay, MOST)', passerelle: 'Passerelle centrale (ZGM, FEM ou BDC selon génération)',
      reseaux: [['PT-CAN (motorisation)', 'canhs'], ['K-CAN (carrosserie)', 'canhs'], ['FlexRay (châssis, selon génération)', 'canhs'], ['D-CAN (diagnostic)', 'canhs'], ['LIN', 'lin'], ['MOST (multimédia)', 'most']],
      ecus: [['Calculateur moteur (DME / DDE)', 'PT-CAN (motorisation)', 1], ['Boîte automatique (EGS)', 'PT-CAN (motorisation)'], ['DSC (ESP)', 'FlexRay (châssis, selon génération)'], ['Passerelle (ZGM / FEM / BDC)', 'PT-CAN (motorisation)', 1], ['Module d’accès (CAS / FEM)', 'K-CAN (carrosserie)'], ['Combiné', 'K-CAN (carrosserie)'], ['Airbag', 'K-CAN (carrosserie)']],
      note: 'BMW utilise plusieurs réseaux dont le FlexRay (châssis) sur les séries F / G ; K-CAN basse vitesse sur les anciennes séries E. À vérifier.' },
    hyundai_kia: { nom: 'Hyundai / Kia (C-CAN, B-CAN, M-CAN)', passerelle: 'BCM / boîtier de jonction intelligent (SJB, IPM)',
      reseaux: [['C-CAN (moteur / châssis)', 'canhs'], ['B-CAN (carrosserie, 100 kbit/s)', 'canls'], ['M-CAN (multimédia)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'C-CAN (moteur / châssis)', 1], ['ABS / ESC', 'C-CAN (moteur / châssis)'], ['Airbag (SRS)', 'C-CAN (moteur / châssis)'], ['Direction assistée électrique (MDPS)', 'C-CAN (moteur / châssis)'], ['Combiné', 'C-CAN (moteur / châssis)', 1], ['BCM / IPM', 'B-CAN (carrosserie, 100 kbit/s)'], ['Multimédia', 'M-CAN (multimédia)']],
      note: 'Passerelle sécurisée (SGW) sur certains modèles depuis 2018 (Ioniq 5, EV6…). À vérifier.' },
    nissan: { nom: 'Nissan (BCM + IPDM)', passerelle: 'BCM (carrosserie) et IPDM E/R (boîtier de distribution moteur)',
      reseaux: [['CAN (moteur / châssis)', 'canhs'], ['CAN carrosserie (selon modèle)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'CAN (moteur / châssis)', 1], ['ABS / VDC', 'CAN (moteur / châssis)'], ['Airbag', 'CAN (moteur / châssis)'], ['Combiné', 'CAN (moteur / châssis)', 1], ['BCM', 'CAN (moteur / châssis)'], ['IPDM E/R', 'CAN (moteur / châssis)']],
      note: 'Nombreux modèles récents sur plateformes Renault-Nissan (CMF) : architecture proche des Renault. À vérifier.' },
    japon: { nom: 'Constructeurs japonais (Honda, Mazda, Mitsubishi, Subaru, Suzuki)', passerelle: 'BCM ou combiné (selon marque)',
      reseaux: [['CAN moteur / châssis', 'canhs'], ['CAN carrosserie (selon modèle)', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN moteur / châssis', 1], ['ABS / ESP', 'CAN moteur / châssis'], ['Airbag', 'CAN moteur / châssis'], ['Direction assistée électrique', 'CAN moteur / châssis'], ['Combiné', 'CAN moteur / châssis', 1], ['BCM (carrosserie)', 'CAN carrosserie (selon modèle)']],
      note: 'Principe général : un CAN haute vitesse moteur / châssis et un réseau carrosserie. Les noms changent selon la marque (Honda : F-CAN / B-CAN ; Mazda : HS-CAN / MS-CAN). À vérifier.' },
    volvo: { nom: 'Volvo / Polestar / Lynk & Co (CEM, plusieurs CAN)', passerelle: 'CEM (module électronique central)',
      reseaux: [['HS-CAN (moteur / châssis)', 'canhs'], ['LS-CAN / CAN habitacle', 'canls'], ['MOST ou Ethernet (multimédia, selon génération)', 'most'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'HS-CAN (moteur / châssis)', 1], ['Boîte automatique (TCM)', 'HS-CAN (moteur / châssis)'], ['ABS / ESP (BCM Volvo)', 'HS-CAN (moteur / châssis)'], ['CEM (passerelle)', 'HS-CAN (moteur / châssis)', 1], ['Combiné (DIM)', 'LS-CAN / CAN habitacle'], ['Airbag (SRS)', 'HS-CAN (moteur / châssis)']],
      note: 'Attention : chez Volvo, « BCM » désigne le calculateur de freinage. Les plateformes récentes (SPA, CMA) utilisent aussi FlexRay / Ethernet. À vérifier.' },
    jlr: { nom: 'Jaguar / Land Rover (HS-CAN, MS-CAN, MOST)', passerelle: 'BCM / module passerelle (GWM)',
      reseaux: [['HS-CAN (moteur / châssis)', 'canhs'], ['MS-CAN (confort)', 'canhs'], ['MOST (multimédia)', 'most'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur (ECM)', 'HS-CAN (moteur / châssis)', 1], ['ABS / DSC', 'HS-CAN (moteur / châssis)'], ['Boîte automatique', 'HS-CAN (moteur / châssis)'], ['Combiné', 'HS-CAN (moteur / châssis)', 1], ['BCM', 'MS-CAN (confort)'], ['Airbag', 'HS-CAN (moteur / châssis)']],
      note: 'Héritage Ford (HS-CAN / MS-CAN) sur les générations 2005-2015. À vérifier.' },
    ev_tesla: { nom: 'Tesla (architecture spécifique, CAN + Ethernet)', passerelle: 'Passerelle / ordinateur central',
      reseaux: [['CAN châssis / motorisation', 'canhs'], ['CAN carrosserie', 'canhs'], ['Ethernet (ordinateur central)', 'canhs']],
      ecus: [['Onduleurs / moteurs de traction', 'CAN châssis / motorisation', 1], ['Gestion batterie (BMS)', 'CAN châssis / motorisation'], ['Freinage (iBooster, ESP)', 'CAN châssis / motorisation'], ['Contrôleurs de carrosserie', 'CAN carrosserie'], ['Ordinateur central (MCU)', 'Ethernet (ordinateur central)', 1]],
      note: 'Diagnostic constructeur via Tesla Toolbox. ⚡ Haute tension : habilitation électrique obligatoire (B1VL / B2VL / BCL selon l’intervention).' },
    ev_generique: { nom: 'Véhicule électrique / marques chinoises (plusieurs CAN + passerelle)', passerelle: 'Passerelle centrale (VCU / GW)',
      reseaux: [['CAN motorisation (VCU, BMS, onduleur)', 'canhs'], ['CAN châssis', 'canhs'], ['CAN habitacle', 'canhs'], ['CAN multimédia', 'canhs'], ['LIN', 'lin']],
      ecus: [['VCU (superviseur véhicule)', 'CAN motorisation (VCU, BMS, onduleur)', 1], ['BMS (batterie)', 'CAN motorisation (VCU, BMS, onduleur)'], ['Onduleur / moteur', 'CAN motorisation (VCU, BMS, onduleur)'], ['ESP', 'CAN châssis'], ['Airbag', 'CAN châssis'], ['BCM', 'CAN habitacle'], ['Multimédia', 'CAN multimédia'], ['Passerelle', 'CAN motorisation (VCU, BMS, onduleur)', 1]],
      note: 'Architecture générique : à vérifier sur la documentation du modèle. ⚡ Haute tension : habilitation électrique obligatoire.' },
    vsp: { nom: 'Voiture sans permis (Aixam, Ligier, Microcar, Chatenet)', passerelle: 'Calculateur moteur / combiné',
      reseaux: [['CAN (selon modèle)', 'canhs']],
      ecus: [['Calculateur moteur (diesel Kubota / Lombardini) ou contrôleur électrique', 'CAN (selon modèle)', 1], ['Combiné', 'CAN (selon modèle)', 1]],
      note: 'Électronique réduite : souvent un seul réseau, voire aucun sur les anciennes. À vérifier.' },
    generique: { nom: 'Architecture générique (à compléter)', passerelle: 'Boîtier de servitude / passerelle (à identifier)',
      reseaux: [['CAN haute vitesse (moteur / châssis)', 'canhs'], ['CAN carrosserie', 'canhs'], ['LIN', 'lin']],
      ecus: [['Calculateur moteur', 'CAN haute vitesse (moteur / châssis)', 1], ['ABS / ESP', 'CAN haute vitesse (moteur / châssis)'], ['Airbag', 'CAN haute vitesse (moteur / châssis)'], ['Combiné', 'CAN haute vitesse (moteur / châssis)'], ['Boîtier de servitude / BCM', 'CAN carrosserie', 1]],
      note: 'Aucune donnée spécifique : complète la fiche avec le schéma du véhicule.' }
  };
  Object.keys(X).forEach(function (k) { D.ARCHI[k] = X[k]; });

  var SGW_STELL = 'Stellantis : SGW sur les ex-FCA depuis 2018 et sur des modèles récents PSA / Opel ; lecture possible, écriture (effacement, tests actionneurs, codage) après authentification (valise compatible).';
  var SGW_FCA = 'SGW (Secure Gateway) depuis 2018 : sans authentification, lecture seule (pas d’effacement de défauts, de tests actionneurs ni de codage). Déverrouillage via un compte AutoAuth / valise compatible.';
  var SFD = 'SFD (protection du diagnostic) sur MQB Evo / MEB depuis 2020 (Golf 8, Octavia IV, Leon IV, A3 8Y, ID.3 / ID.4…) : codage et adaptations bloqués sans jeton de déverrouillage en ligne.';
  var SGW_REN = 'Passerelle sécurisée depuis 2020 environ (Clio V, Captur II, Arkana, Mégane E-Tech, Duster…) : authentification en ligne pour les fonctions d’écriture (licence sur valise compatible).';
  var SGW_MB = 'SGW depuis 2020 (Classe S W223, puis Classe C W206, Classe E W214, EQE, EQS, SL) : accès restreint sans authentification.';
  var SGW_HK = 'SGW sur certains modèles depuis 2018 (Ioniq 5, EV6…).';
  var NONE = 'Pas de passerelle sécurisée connue sur les modèles anciens ; vérifier sur les modèles récents.';

  /* [marque, pays, groupe, archi, boîtier / passerelle, passerelle sécurisée, modèles courants en France, partages utiles au diagnostic] */
  var B = [
    ['Renault', 'France', 'Renault Group', 'renault_can2', 'UCH (unité centrale habitacle), puis passerelle centrale sur CMF', SGW_REN, 'Clio, Captur, Mégane, Scénic, Twingo, Kangoo, Austral, Arkana, Zoé', 'Moteur 1.5 dCi (K9K) aussi chez Dacia, Nissan, Mercedes (Classe A / B 180 d, Citan) ; Twingo III = Smart ForFour ; Kangoo = Mercedes Citan / Nissan Townstar.'],
    ['Dacia', 'Roumanie', 'Renault Group', 'renault_can2', 'UCH', SGW_REN, 'Sandero, Logan, Duster, Jogger, Spring', 'Mécanique et électronique Renault.'],
    ['Alpine', 'France', 'Renault Group', 'renault_cmf', 'Passerelle centrale', SGW_REN, 'A110, A290', 'A110 : moteur 1.8 TCe Renault-Nissan ; A290 : base Renault 5 électrique.'],
    ['Peugeot', 'France', 'Stellantis', 'psa_aee2010', 'BSI (boîtier de servitude intelligent)', SGW_STELL, '208, 2008, 308, 3008, 5008, 206, 207, Partner, Rifter', 'Plateformes et moteurs (PureTech, BlueHDi) partagés avec Citroën, DS, Opel (depuis 2019), Toyota (Aygo I, Proace).'],
    ['Citroën', 'France', 'Stellantis', 'psa_aee2010', 'BSI', SGW_STELL, 'C3, C3 Aircross, C4, C5 Aircross, Berlingo, C1', 'Voir Peugeot ; C1 = Peugeot 107 / 108 = Toyota Aygo (moteur Toyota 1.0).'],
    ['DS', 'France', 'Stellantis', 'psa_aee2010', 'BSI', SGW_STELL, 'DS3, DS4, DS7', 'Base Peugeot / Citroën.'],
    ['Opel', 'Allemagne', 'Stellantis (ex-GM jusqu’en 2017)', 'opel_gm', 'BCM (GM) ; BSI sur les modèles PSA depuis 2019', SGW_STELL, 'Corsa, Astra, Mokka, Crossland, Grandland, Zafira', 'Avant 2019 : architecture GM (LS-GMLAN 1 fil). Depuis Corsa F (2019) : base Peugeot.'],
    ['Fiat', 'Italie', 'Stellantis', 'fiat', 'Body Computer (NBC / BSM)', SGW_FCA, '500, Panda, Tipo, Punto, 500X', 'Moteurs Multijet ; 600 et nouvelle 500e sur base Stellantis récente.'],
    ['Abarth', 'Italie', 'Stellantis', 'fiat', 'Body Computer', SGW_FCA, '500 / 595 / 695', 'Base Fiat 500.'],
    ['Alfa Romeo', 'Italie', 'Stellantis', 'fiat', 'Body Computer', SGW_FCA, 'Giulietta, MiTo, Giulia, Stelvio, Tonale, Junior', 'MiTo = base Fiat Punto ; Junior = base Peugeot 2008.'],
    ['Lancia', 'Italie', 'Stellantis', 'fiat', 'Body Computer', SGW_FCA, 'Ypsilon', 'Ypsilon récente = base Peugeot 208.'],
    ['Jeep', 'États-Unis', 'Stellantis', 'fiat', 'Body Computer / BCM', SGW_FCA, 'Renegade, Compass, Avenger, Wrangler', 'Renegade / Compass = base Fiat 500X ; Avenger = base Peugeot 2008.'],
    ['Maserati', 'Italie', 'Stellantis', 'fiat', 'Body Computer', SGW_FCA, 'Ghibli, Levante, Grecale', 'Électronique groupe FCA.'],
    ['Volkswagen', 'Allemagne', 'Volkswagen Group', 'vw_mqb', 'Passerelle J533', SFD, 'Polo, Golf, T-Roc, Tiguan, Passat, Touran, ID.3', 'Plateformes PQ / MQB communes à Audi, Seat, Skoda, Cupra ; moteurs TDI / TSI communs.'],
    ['Audi', 'Allemagne', 'Volkswagen Group', 'vw_mqb', 'Passerelle J533', SFD, 'A1, A3, A4, Q2, Q3, Q5', 'A1 / A3 / Q2 / Q3 sur base VW Polo / Golf.'],
    ['Seat', 'Espagne', 'Volkswagen Group', 'vw_mqb', 'Passerelle J533', SFD, 'Ibiza, Leon, Arona, Ateca', 'Base VW (Polo / Golf).'],
    ['Cupra', 'Espagne', 'Volkswagen Group', 'vw_mqb', 'Passerelle J533', SFD, 'Formentor, Born, Leon', 'Base VW ; Born = VW ID.3.'],
    ['Skoda', 'Tchéquie', 'Volkswagen Group', 'vw_mqb', 'Passerelle J533', SFD, 'Fabia, Octavia, Kamiq, Karoq, Kodiaq', 'Base VW.'],
    ['Porsche', 'Allemagne', 'Volkswagen Group', 'vw_mqb', 'Passerelle', SFD, '911, Macan, Cayenne, Taycan', 'Cayenne = base VW Touareg / Audi Q7 ; Macan = base Audi Q5.'],
    ['Bentley', 'Royaume-Uni', 'Volkswagen Group', 'vw_mqb', 'Passerelle', SFD, 'Continental, Bentayga', 'Électronique groupe VW.'],
    ['Lamborghini', 'Italie', 'Volkswagen Group', 'vw_mqb', 'Passerelle', SFD, 'Huracán, Urus', 'Urus = base Audi / Porsche.'],
    ['Bugatti', 'France', 'Bugatti Rimac', 'generique', 'Spécifique', NONE, 'Chiron', 'Diagnostic uniquement réseau constructeur.'],
    ['Toyota', 'Japon', 'Toyota', 'toyota', 'Passerelle / calculateur carrosserie principal', NONE, 'Yaris, Yaris Cross, C-HR, Corolla, RAV4, Aygo', 'Aygo I = Citroën C1 / Peugeot 107 ; Proace = Peugeot Expert ; Suzuki Across / Swace = RAV4 / Corolla. Hybrides : ⚡ habilitation électrique.'],
    ['Lexus', 'Japon', 'Toyota', 'toyota', 'Passerelle', NONE, 'UX, NX, RX', 'Base Toyota hybride (⚡ habilitation électrique).'],
    ['Nissan', 'Japon', 'Alliance Renault-Nissan-Mitsubishi', 'nissan', 'BCM + IPDM E/R', SGW_REN, 'Micra, Juke, Qashqai, X-Trail, Leaf, Note', 'Micra K14 = base Renault Clio V ; moteurs Renault (1.5 dCi, 1.3 TCe) sur Qashqai / Juke.'],
    ['Mitsubishi', 'Japon', 'Alliance Renault-Nissan-Mitsubishi', 'japon', 'BCM (ETACS)', NONE, 'Space Star, ASX, Eclipse Cross, Outlander', 'ASX récent = base Renault Captur ; Colt récente = base Clio.'],
    ['Honda', 'Japon', 'Honda', 'japon', 'BCM / MICU (unité de contrôle multiplexée)', NONE, 'Jazz, Civic, HR-V, CR-V', 'Réseaux F-CAN (moteur / châssis) et B-CAN (carrosserie). Hybrides : ⚡ habilitation électrique.'],
    ['Mazda', 'Japon', 'Mazda', 'japon', 'BCM', NONE, 'Mazda2, Mazda3, CX-3, CX-5, MX-5', 'Héritage Ford (HS-CAN / MS-CAN) ; Mazda2 hybride récente = Toyota Yaris.'],
    ['Subaru', 'Japon', 'Subaru', 'japon', 'BCM', NONE, 'Impreza, XV / Crosstrek, Forester, Outback', 'Moteurs boxer ; transmission intégrale symétrique.'],
    ['Suzuki', 'Japon', 'Suzuki', 'japon', 'BCM', NONE, 'Swift, Ignis, Vitara, S-Cross, Jimny', 'Across / Swace = Toyota ; anciens diesels d’origine Fiat (1.3 Multijet).'],
    ['Hyundai', 'Corée du Sud', 'Hyundai Motor Group', 'hyundai_kia', 'BCM / SJB (boîtier de jonction intelligent)', SGW_HK, 'i10, i20, i30, Kona, Tucson, Ioniq', 'Plateformes et moteurs communs avec Kia.'],
    ['Kia', 'Corée du Sud', 'Hyundai Motor Group', 'hyundai_kia', 'BCM / IPM', SGW_HK, 'Picanto, Rio, Ceed, Stonic, Niro, Sportage, EV6', 'Base Hyundai.'],
    ['Ford', 'États-Unis', 'Ford', 'ford', 'GEM / BCM et combiné', NONE, 'Fiesta, Focus, Puma, Kuga, Transit', 'Diesels TDCi d’origine PSA (1.4 / 1.6 TDCi = DV4 / DV6) ; Tourneo Courier / Transit Connect récents sur base VW.'],
    ['Mercedes-Benz', 'Allemagne', 'Mercedes-Benz Group', 'mercedes', 'SAM avant / arrière, EIS-EZS, passerelle centrale', SGW_MB, 'Classe A, B, C, E, GLA, GLC, Vito, Sprinter, Citan', 'Classe A / B 180 d et Citan : moteur Renault 1.5 dCi (K9K) ; Citan = Renault Kangoo.'],
    ['Smart', 'Allemagne / Chine', 'Mercedes-Benz / Geely', 'renault_can2', 'Selon génération', NONE, 'ForTwo, ForFour, #1', 'ForTwo / ForFour 2014-2024 = base Renault Twingo III ; #1 = base Geely.'],
    ['BMW', 'Allemagne', 'BMW Group', 'bmw', 'Passerelle ZGM / FEM / BDC, module d’accès CAS', NONE, 'Série 1, Série 3, X1, X3, Série 5', 'Moteurs communs avec Mini ; ancien 1.6 essence Mini / Peugeot (moteur Prince EP6).'],
    ['Mini', 'Royaume-Uni', 'BMW Group', 'bmw', 'Passerelle BMW', NONE, 'Cooper, Countryman, Clubman', 'Mini 2006-2014 : moteur 1.6 « Prince » commun avec PSA (EP6) ; diesels PSA 1.6 HDi sur certaines versions.'],
    ['Rolls-Royce', 'Royaume-Uni', 'BMW Group', 'bmw', 'Passerelle BMW', NONE, 'Ghost, Cullinan', 'Électronique BMW.'],
    ['Volvo', 'Suède', 'Geely', 'volvo', 'CEM (module électronique central)', NONE, 'XC40, XC60, XC90, V40, V60', 'Anciens diesels 1.6 D = PSA 1.6 HDi ; plateforme CMA partagée avec Polestar et Lynk & Co.'],
    ['Polestar', 'Suède', 'Geely / Volvo', 'volvo', 'CEM / passerelle centrale', NONE, 'Polestar 2, 3, 4', 'Base Volvo ; ⚡ haute tension.'],
    ['Lynk & Co', 'Chine / Suède', 'Geely', 'volvo', 'Passerelle centrale', NONE, '01', 'Base Volvo CMA (hybride rechargeable).'],
    ['Jaguar', 'Royaume-Uni', 'Tata Motors (JLR)', 'jlr', 'BCM / GWM', NONE, 'XE, XF, F-Pace, E-Pace, I-Pace', 'Héritage Ford sur les anciennes générations.'],
    ['Land Rover', 'Royaume-Uni', 'Tata Motors (JLR)', 'jlr', 'BCM / GWM', NONE, 'Range Rover Evoque, Discovery Sport, Defender', 'Freelander 2 / Evoque I : base Ford (EUCD).'],
    ['Aston Martin', 'Royaume-Uni', 'Aston Martin Lagonda', 'generique', 'Spécifique', NONE, 'Vantage, DB12, DBX', 'Électronique et moteurs V8 d’origine Mercedes-AMG sur les modèles récents.'],
    ['Ferrari', 'Italie', 'Ferrari', 'generique', 'Spécifique', NONE, 'Roma, 296, SF90', 'Diagnostic réseau constructeur uniquement.'],
    ['Tesla', 'États-Unis', 'Tesla', 'ev_tesla', 'Ordinateur central', 'Diagnostic constructeur via Tesla Toolbox.', 'Model 3, Model Y, Model S, Model X', '⚡ Haute tension : habilitation électrique obligatoire.'],
    ['BYD', 'Chine', 'BYD', 'ev_generique', 'Passerelle centrale', NONE, 'Dolphin, Atto 3, Seal', 'Batteries « Blade » LFP ; ⚡ habilitation électrique.'],
    ['MG', 'Chine (marque d’origine britannique)', 'SAIC', 'ev_generique', 'Passerelle / BCM', NONE, 'MG4, ZS, MG3, HS', 'Marque chinoise SAIC ; ⚡ habilitation électrique sur hybrides et électriques.'],
    ['Maxus', 'Chine', 'SAIC', 'ev_generique', 'Passerelle / BCM', NONE, 'eDeliver 3 / 9, T90', 'Utilitaires électriques SAIC.'],
    ['Leapmotor', 'Chine', 'Stellantis / Leapmotor', 'ev_generique', 'Passerelle centrale', NONE, 'T03, C10', 'Distribuée par Stellantis ; ⚡ haute tension.'],
    ['Omoda / Jaecoo', 'Chine', 'Chery', 'ev_generique', 'Passerelle / BCM', NONE, 'Omoda 5, Jaecoo 7', 'Données constructeur rares : complète la fiche.'],
    ['Xpeng', 'Chine', 'Xpeng', 'ev_generique', 'Passerelle centrale', NONE, 'G6, G9', '⚡ haute tension.'],
    ['SsangYong / KGM', 'Corée du Sud', 'KG Group', 'generique', 'BCM', NONE, 'Tivoli, Korando, Rexton', 'Anciens diesels d’origine Mercedes.'],
    ['Chevrolet (ex-Daewoo)', 'États-Unis / Corée', 'GM (retirée d’Europe en 2015)', 'opel_gm', 'BCM (GM)', NONE, 'Spark, Aveo, Cruze, Captiva, Matiz', 'Architecture GM (proche Opel) ; encore courante dans le parc.'],
    ['Daihatsu', 'Japon', 'Toyota (retirée d’Europe en 2013)', 'toyota', 'Selon modèle', NONE, 'Cuore, Sirion, Terios', 'Base Toyota.'],
    ['Saab', 'Suède', 'Disparue (2011)', 'opel_gm', 'Selon modèle', NONE, '9-3, 9-5', 'Base GM / Opel (9-3 = Vectra C).'],
    ['Rover / MG Rover', 'Royaume-Uni', 'Disparue (2005)', 'generique', 'Selon modèle', NONE, '25, 45, 75', 'Anciennes, peu multiplexées ; certaines bases Honda.'],
    ['Aixam / Ligier / Microcar / Chatenet', 'France', 'Voitures sans permis', 'vsp', 'Calculateur moteur / combiné', NONE, 'City, Crossline, JS50, Dué', 'Diesels Kubota ou Lombardini (DCI) ; versions électriques.']
  ];
  D.MARQUES = B.map(function (b, i) { return { id: 'm' + i, nom: b[0], pays: b[1], groupe: b[2], archi: b[3], boitier: b[4], sgw: b[5], modeles: b[6], partages: b[7] }; });
})();
