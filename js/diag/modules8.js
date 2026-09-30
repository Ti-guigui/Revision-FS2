/* Diagnostic — CONTRÔLE DIRECT : accès direct à l’étape de contrôle d’un élément (capteur, actionneur, organe).
   [catégorie, id, nom, module, étape, précision] */
(function () {
  var D = window.DIAG;
  function info(title, html, bouton, next) { return { type: 'info', title: title, html: html, bouton: bouton, next: next }; }

  /* Étapes ajoutées pour les éléments qui n’en avaient pas */
  D.MODULES.capteurs.steps.c_cliq = info('Capteur de cliquetis', '<p>Capteur <b>piézo-électrique</b> vissé sur le bloc : il produit une petite tension alternative quand le moteur cogne (cliquetis). <b>Pas d’alimentation.</b></p><ol><li><b>Serrage au couple</b> exact (trop ou pas assez serré = signal faux) ; surface d’appui propre, sans rondelle.</li><li>Connecteur et <b>blindage</b> du fil (relié d’un seul côté).</li><li>Oscilloscope sur le signal : en tapotant le bloc près du capteur avec un petit outil, une tension alternative doit apparaître.</li><li>Le calculateur réduit l’avance en cas de défaut : perte de puissance, défaut mémorisé.</li></ol>', 'Conclusion', 'end_cap_ok');
  D.MODULES.cr.steps.inj_piezo = info('Injecteur piézo-électrique', '<p>L’injecteur <b>piézo</b> est commandé sous forte tension (≈ 100 à 200 V selon système) : <b>ne pas mesurer ni débrancher moteur tournant</b>. Sa résistance n’est pas significative (plusieurs centaines de kΩ). On le contrôle surtout par le <b>débit de retour</b> et les <b>corrections de débit</b> à la valise, et par les défauts de circuit du calculateur.</p>', 'Contrôler les retours', 'ret');

  D.ELEMENTS = [
    ['📡 Capteurs moteur', 'pmh', 'Capteur de régime / PMH (inductif)', 'capteurs', 'c_ind', 'Volant moteur, 2 fils'],
    ['📡 Capteurs moteur', 'pmh_hall', 'Capteur de régime / PMH (Hall)', 'capteurs', 'c_hall', '3 fils, sur moteurs récents'],
    ['📡 Capteurs moteur', 'phase', 'Capteur de phase / arbre à cames', 'capteurs', 'c_hall', 'Effet Hall'],
    ['📡 Capteurs moteur', 'rail', 'Capteur de pression de rail', 'capteurs', 'c_pres', '5 V, 0,5 V contact mis'],
    ['📡 Capteurs moteur', 'map', 'Capteur de pression de suralimentation / admission (MAP)', 'capteurs', 'c_pres', '5 V'],
    ['📡 Capteurs moteur', 'dpf_p', 'Capteur de pression différentielle FAP', 'capteurs', 'c_pres', '5 V'],
    ['📡 Capteurs moteur', 'pedale', 'Pédale d’accélérateur (2 pistes)', 'capteurs', 'c_pot', '2 alimentations 5 V'],
    ['📡 Capteurs moteur', 'papillon', 'Papillon motorisé : capteur de position', 'capteurs', 'c_pot', '5 V'],
    ['📡 Capteurs moteur', 'ctn_eau', 'Sonde de température moteur (eau)', 'capteurs', 'c_ctn', 'CTN'],
    ['📡 Capteurs moteur', 'ctn_air', 'Sonde de température d’air', 'capteurs', 'c_ctn', 'CTN'],
    ['📡 Capteurs moteur', 'ctn_carbu', 'Sonde de température carburant', 'capteurs', 'c_ctn', 'CTN'],
    ['📡 Capteurs moteur', 'debit', 'Débitmètre d’air à film chaud', 'capteurs', 'c_deb', '12 V'],
    ['📡 Capteurs moteur', 'lambda', 'Sonde lambda : alimentation et chauffage', 'capteurs', 'c_lam', ''],
    ['📡 Capteurs moteur', 'lambda_sig', 'Sonde lambda : signal et catalyseur', 'anti', 'lambda', 'Essence'],
    ['📡 Capteurs moteur', 'cliq', 'Capteur de cliquetis', 'capteurs', 'c_cliq', 'Piézo'],
    ['📡 Capteurs moteur', 'nox', 'Capteur NOx', 'capteurs', 'c_bus', 'Sur bus CAN'],
    ['📡 Capteurs moteur', 'ibs', 'Capteur de batterie (IBS)', 'capteurs', 'c_bus', 'Sur LIN'],
    ['📡 Capteurs moteur', 'abs_p', 'Capteur ABS passif', 'capteurs', 'c_ind', 'Inductif, 2 fils'],
    ['📡 Capteurs moteur', 'abs_a', 'Capteur ABS actif', 'frein', 'abs_act', '7 / 14 mA'],
    ['📡 Capteurs moteur', 'vitesse', 'Capteur de vitesse véhicule', 'capteurs', 'c_hall', 'Hall ou inductif'],

    ['⚙️ Actionneurs', 'inj_d', 'Injecteur diesel à solénoïde', 'mux', 'c_injd', 'Résistance < 1 Ω'],
    ['⚙️ Actionneurs', 'inj_p', 'Injecteur diesel piézo', 'cr', 'inj_piezo', 'Contrôle par retours et corrections'],
    ['⚙️ Actionneurs', 'inj_ret', 'Injecteurs diesel : débit de retour', 'cr', 'ret', 'Éprouvettes'],
    ['⚙️ Actionneurs', 'inj_corr', 'Injecteurs diesel : corrections de débit', 'cr', 'corr', 'Valise'],
    ['⚙️ Actionneurs', 'inj_e', 'Injecteur essence', 'mux', 'c_inje', '12 à 16 Ω'],
    ['⚙️ Actionneurs', 'reg_hp', 'Régulateur de pression / de débit (rail)', 'mux', 'c_ev', 'RCO'],
    ['⚙️ Actionneurs', 'ev_turbo', 'Électrovanne de commande du turbo', 'mux', 'c_ev', 'RCO'],
    ['⚙️ Actionneurs', 'ev_egr', 'Électrovanne EGR (commande pneumatique)', 'mux', 'c_ev', 'RCO'],
    ['⚙️ Actionneurs', 'egr', 'Vanne EGR : position demandée / mesurée', 'anti', 'egr', 'Valise'],
    ['⚙️ Actionneurs', 'bobine', 'Bobine d’allumage', 'meca', 'm_bob', 'Primaire / secondaire'],
    ['⚙️ Actionneurs', 'bougie', 'Bougie d’allumage', 'meca', 'm_bougie', 'Aspect, écartement'],
    ['⚙️ Actionneurs', 'prechauf', 'Bougies de préchauffage', 'meca', 'm_pre', 'Résistance'],
    ['⚙️ Actionneurs', 'prechauf_alim', 'Alimentation du préchauffage', 'meca', 'm_pre_alim', 'Boîtier / relais'],
    ['⚙️ Actionneurs', 'doseur', 'Doseur AdBlue (test de débit)', 'anti', 'scr_dos', 'Éprouvette'],

    ['🌀 Air, turbo, antipollution', 'turbo_p', 'Turbo : pression de suralimentation', 'turbo', 't_ps', 'Capteur + demandée / mesurée'],
    ['🌀 Air, turbo, antipollution', 'turbo_fuite', 'Turbo : étanchéité de l’admission', 'turbo', 't_fuite', '2 bar maxi'],
    ['🌀 Air, turbo, antipollution', 'turbo_cmd', 'Turbo : commande (capsule, géométrie, actionneur)', 'turbo', 't_act', ''],
    ['🌀 Air, turbo, antipollution', 'pompe_vide', 'Pompe à vide', 'turbo', 't_cmd', 'Dépression'],
    ['🌀 Air, turbo, antipollution', 'turbo_meca', 'Turbo : jeu, roue, ailettes', 'turbo', 't_meca', ''],
    ['🌀 Air, turbo, antipollution', 'turbo_huile', 'Turbo : huile dans l’admission', 'turbo', 't_huile', ''],
    ['🌀 Air, turbo, antipollution', 'fap', 'FAP : pression différentielle', 'anti', 'fap', 'Ralenti / 3 000 tr/min'],
    ['🌀 Air, turbo, antipollution', 'adblue', 'AdBlue : qualité et activation du SCR', 'anti', 'scr', 'Réfractomètre'],
    ['🌀 Air, turbo, antipollution', 'scr_eff', 'SCR : efficacité (NOx amont / aval)', 'anti', 'scr_nox', ''],

    ['⛽ Carburant', 'gavage', 'Pompe de gavage électrique : pression', 'cr', 'bp_el', 'Manomètre'],
    ['⛽ Carburant', 'dep_hp', 'Alimentation en dépression (pompe mécanique)', 'cr', 'bp_dep', 'Vacuomètre'],
    ['⛽ Carburant', 'air_gazole', 'Air dans le gazole', 'cr', 'air', 'Durite transparente'],
    ['⛽ Carburant', 'rail_p', 'Haute pression : demandée / mesurée', 'cr', 'hp', 'Valise'],
    ['⛽ Carburant', 'rail_dem', 'Pression de rail au démarreur', 'cr', 'start_c', ''],

    ['🔧 Moteur (mécanique)', 'compression', 'Compression des cylindres', 'meca', 'm_comp', 'Compressiomètre'],
    ['🔧 Moteur (mécanique)', 'huile_p', 'Pression d’huile', 'meca', 'm_huile', 'Manomètre'],
    ['🔧 Moteur (mécanique)', 'thermostat', 'Thermostat, motoventilateur, sonde', 'meca', 'm_therm', ''],
    ['🔧 Moteur (mécanique)', 'co2', 'Joint de culasse : test CO₂', 'culasse', 'c_co2', ''],
    ['🔧 Moteur (mécanique)', 'pression_ref', 'Circuit de refroidissement : mise sous pression', 'culasse', 'c_press', ''],
    ['🔧 Moteur (mécanique)', 'echangeur', 'Échangeur eau / huile', 'culasse', 'c_ech', ''],
    ['🔧 Moteur (mécanique)', 'fumee', 'Fumée : identifier la cause', 'fumee', 'start', 'Essence / diesel'],

    ['🔋 Électricité', 'batterie', 'Batterie : tension au repos', 'charge', 'bat', ''],
    ['🔋 Électricité', 'batterie_test', 'Batterie : test de capacité', 'charge', 'bat_test', 'Testeur'],
    ['🔋 Électricité', 'fuite', 'Courant de fuite', 'charge', 'fuite', 'Pince mA'],
    ['🔋 Électricité', 'alternateur', 'Alternateur : charge et ondulation', 'charge', 'chg', ''],
    ['🔋 Électricité', 'cables', 'Câbles de charge : chutes de tension', 'charge', 'chg_dt', ''],
    ['🔋 Électricité', 'demarreur', 'Démarreur : commande et chutes de tension', 'charge', 'dem', ''],
    ['🔋 Électricité', 'calculateur', 'Calculateur : alimentation et masse', 'mux', 'ecu_alim', ''],
    ['🔋 Électricité', 'faisceau', 'Faisceau entre un composant et le calculateur', 'mux', 'c_wire', ''],
    ['🔋 Électricité', 'pile_cle', 'Pile de clé', 'cles', 'k_pile_tel', ''],
    ['🔋 Électricité', 'antidem', 'Antidémarrage : essai avec une autre clé', 'cles', 'k_2e', ''],

    ['🔌 Réseaux', 'can_r', 'CAN HS : résistance de ligne', 'mux', 'can_r', '60 Ω'],
    ['🔌 Réseaux', 'can_term', 'CAN HS : résistance de terminaison', 'mux', 'can_term', '120 Ω'],
    ['🔌 Réseaux', 'can_u', 'CAN HS : tensions', 'mux', 'can_u', ''],
    ['🔌 Réseaux', 'can_ls', 'CAN basse vitesse : tensions', 'mux', 'ls_u', ''],
    ['🔌 Réseaux', 'lin', 'LIN : tension de la ligne', 'mux', 'lin_u', ''],
    ['🔌 Réseaux', 'j1939', 'J1939 (PL) : prise de diagnostic et réseau', 'pl', 'pl_can', '24 V'],

    ['🛑 Freinage, DSFT', 'liquide', 'Liquide de frein : teneur en eau', 'frein', 'lf', ''],
    ['🛑 Freinage, DSFT', 'servo', 'Servofrein : dépression', 'frein', 'assist', ''],
    ['🛑 Freinage, DSFT', 'disques', 'Disques et plaquettes', 'frein', 'vib', 'Voile, cote mini'],
    ['🛑 Freinage, DSFT', 'geo', 'Relevé de géométrie', 'dsft', 'geo', 'Angle inclus'],
    ['🛑 Freinage, DSFT', 'usure', 'Usure des pneus', 'dsft', 'usure', ''],
    ['🛑 Freinage, DSFT', 'banc', 'Banc de freinage VL', 'dsft', 'banc', 'Déséquilibre, efficacité'],

    ['🚛 Poids lourds', 'air_pl', 'Production d’air et étanchéité', 'pl', 'pl_air', 'Coupure, remplissage, fuite'],
    ['🚛 Poids lourds', 'dessic', 'Dessiccateur / purge des réservoirs', 'pl', 'pl_dess', ''],
    ['🚛 Poids lourds', 'vcr', 'VCR : prédominance, rupture, frein de parc', 'pl', 'vcr', 'Manomètres'],
    ['🚛 Poids lourds', 'parc_pl', 'Frein de parc (Tristop, verrou)', 'pl', 'pl_parc', ''],
    ['🚛 Poids lourds', 'banc_pl', 'Banc de freinage PL', 'pl', 'pl_banc', ''],
    ['🚛 Poids lourds', 'bat24', 'Batteries 24 V et charge', 'pl', 'pl_24', ''],
    ['🚛 Poids lourds', 'prise_rem', 'Prises de remorque (24N, 24S, 15 broches, ISO 7638)', 'pl', 'pr_type', ''],
    ['🚛 Poids lourds', 'susp_pl', 'Suspension pneumatique', 'pl', 'pl_susp', '']
  ];
})();
