/* Diagnostic — module MULTIPLEXAGE : explications, mesures (valeurs de référence) et arbre de diagnostic.
   Valeurs de référence :
   - CAN haute vitesse : 2 résistances de 120 Ω en parallèle = 60 Ω à la prise (pins 6 et 14) ; tensions moyennes
     CAN H ≈ 2,65 V et CAN L ≈ 2,35 V, somme ≈ 5 V (doc Citroën AEE2010, CAN IS) ; à l’oscilloscope 2,5 V ± 1 V.
   - CAN basse vitesse (CAN CAR / CONFORT) : CAN H 0 à 0,2 V (repos) / 3,8 à 4,2 V (dominant) ; CAN L 4,8 à 5,6 V /
     1 à 1,4 V (doc Citroën AEE2010) ; au multimètre (moyenne) CAN H faible, CAN L proche de 5 V, somme ≈ 5 V.
   - LIN : un fil, environ 12 V au repos, 19,2 kbit/s.
   Les plages des capteurs / actionneurs sont des valeurs TYPES : la valeur constructeur prime toujours. */
(function () {
  var D = window.DIAG = window.DIAG || {};

  /* id: [libellé, unité, min, max, précision sur la valeur de référence] */
  var ME = {
    ubat: ['Tension batterie, moteur arrêté', 'V', 12.4, 12.9, 'Batterie chargée : 12,4 à 12,8 V. Sous 12 V, les calculateurs peuvent perdre la communication.'],
    r_can: ['Résistance entre CAN H et CAN L (prise OBD pins 6 et 14)', 'Ω', 55, 65, '2 résistances de 120 Ω en parallèle = 60 Ω.'],
    r_term: ['Résistance du calculateur débranché, entre ses broches CAN H et CAN L', 'Ω', 110, 130, 'Résistance de terminaison interne : 120 Ω.'],
    r_ch_m: ['Résistance CAN H – masse (contact coupé)', 'Ω', 1000, Infinity, 'Au moins quelques kΩ : pas de liaison franche à la masse.'],
    r_cl_m: ['Résistance CAN L – masse (contact coupé)', 'Ω', 1000, Infinity, 'Au moins quelques kΩ.'],
    u_ch: ['Tension moyenne CAN H – masse (contact mis)', 'V', 2.5, 3.0, 'Doc PSA : 2,65 V en activité.'],
    u_cl: ['Tension moyenne CAN L – masse (contact mis)', 'V', 2.0, 2.5, 'Doc PSA : 2,35 V en activité.'],
    u_lsh: ['Tension moyenne CAN LS High – masse (contact mis)', 'V', 0.1, 1.5, 'CAN H basse vitesse : 0 à 0,2 V au repos, 3,8 à 4,2 V quand il émet → moyenne faible.'],
    u_lsl: ['Tension moyenne CAN LS Low – masse (contact mis)', 'V', 3.5, 4.9, 'CAN L basse vitesse : 4,8 à 5,6 V au repos, 1 à 1,4 V quand il émet → moyenne proche de 5 V.'],
    u_lin: ['Tension moyenne ligne LIN – masse (contact mis)', 'V', 8, 13, 'Repos ≈ tension batterie ; en communication, la moyenne baisse un peu.'],
    r_fil: ['Continuité du fil (d’un connecteur à l’autre)', 'Ω', 0, 1, 'Un fil sain fait moins de 1 Ω.'],
    u_alim: ['Alimentation du calculateur (+BAT ou +APC au connecteur)', 'V', 11.5, 14.8, 'Au moins 11,5 V (12,5 V environ moteur arrêté, 14 V moteur tournant).'],
    u_masse: ['Chute de tension de la masse (masse calculateur → borne – batterie, calculateur alimenté)', 'V', 0, 0.2, 'Une bonne masse chute moins de 0,2 V.'],
    /* capteurs / actionneurs (valeurs types) */
    r_ind: ['Résistance du bobinage (capteur débranché)', 'Ω', 200, 1500, 'Valeur type : souvent 500 à 1 200 Ω. Exemple Renault / PSA diesel : 770 à 950 Ω à 20 °C.'],
    r_iso: ['Isolement bobinage – masse / boîtier', 'Ω', 1000000, Infinity, 'Au moins 1 MΩ (idéalement infini).'],
    u_ac: ['Tension alternative générée au démarreur (voltmètre en V AC)', 'V', 0.5, 50, 'Au moins 0,5 V alternatif ; elle augmente avec la vitesse.'],
    u_5v: ['Tension d’alimentation au connecteur (contact mis)', 'V', 4.8, 5.2, 'Alimentation régulée par le calculateur : 5 V.'],
    u_sig_hi: ['Signal au niveau haut (cible devant le capteur ou non, rotation lente)', 'V', 4.5, 5.2, 'Signal carré 0 / 5 V.'],
    u_sig_lo: ['Signal au niveau bas', 'V', 0, 0.5, 'Signal carré 0 / 5 V.'],
    r_ctn20: ['Résistance CTN à 20 °C (moteur froid)', 'Ω', 2000, 3000, 'Valeur type d’une sonde de température d’eau.'],
    r_ctn80: ['Résistance CTN à 80 °C (moteur chaud)', 'Ω', 250, 400, 'CTN : la résistance baisse quand la température monte.'],
    u_sig_p: ['Signal du capteur de pression (moteur arrêté, pression nulle / atmosphérique)', 'V', 0.3, 2.5, 'Signal utile entre 0,5 et 4,5 V ; au repos il doit être dans le bas de la plage.'],
    u_pot_lo: ['Signal pédale relâchée', 'V', 0.3, 1.0, 'Potentiomètre : environ 0,5 V pied levé.'],
    u_pot_hi: ['Signal pédale à fond', 'V', 3.5, 4.8, 'Environ 4 V pied à fond, sans trou ni saut en appuyant lentement.'],
    r_ev: ['Résistance de l’électrovanne (débranchée)', 'Ω', 2, 30, 'Très variable : régulateur de pression ou de débit 2 à 6 Ω, électrovanne EGR / turbo 8 à 30 Ω. Utilise la valeur constructeur.'],
    u_ev_plus: ['Alimentation + de l’électrovanne (contact mis)', 'V', 11.5, 14.8, 'Le + est souvent permanent, le calculateur pilote la masse en RCO.'],
    r_inj_d: ['Résistance de l’injecteur diesel à solénoïde', 'Ω', 0.2, 1, 'Injecteur common rail à solénoïde : moins de 1 Ω. Un injecteur piézo mesure plusieurs centaines de kΩ : ce test ne s’applique pas.'],
    r_inj_e: ['Résistance de l’injecteur essence', 'Ω', 11, 17, 'Injecteur essence haute impédance : 12 à 16 Ω.']
  };
  D.MEASURES = {};
  Object.keys(ME).forEach(function (k) { var m = ME[k]; D.MEASURES[k] = { id: k, label: m[0], unit: m[1], min: m[2], max: m[3], note: m[4] }; });

  var WHY_CAN = '<p>Un réseau CAN haute vitesse, c’est <b>deux fils torsadés</b> (CAN H et CAN L). Les calculateurs lisent la <b>différence de tension</b> entre les deux : 0 V = bit 1 (récessif), environ 2 V = bit 0 (dominant). À chaque extrémité du bus, une <b>résistance de 120 Ω</b> ferme la ligne pour éviter les échos. Vues de la prise, elles sont en parallèle : <b>60 Ω</b>.</p>';

  var S = {};
  S.start = { type: 'choice', title: 'Quel est le symptôme ?', why: '<p>Le symptôme oriente vers le <b>réseau</b> (plusieurs calculateurs touchés) ou vers <b>un composant</b> (un seul équipement).</p>',
    choices: [['La valise ne communique avec aucun calculateur', 'batt'], ['La valise ne communique pas avec un ou plusieurs calculateurs', 'batt'], ['Plusieurs voyants allumés ou fonctions incohérentes', 'batt'], ['Un seul équipement ne marche pas (capteur ou actionneur)', 'comp'], ['Je veux contrôler le réseau (entraînement)', 'batt']] };
  S.batt = { type: 'measure', title: 'Contrôle préalable : la batterie', why: '<p>Une batterie faible provoque des pertes de communication et des défauts fantômes sur tous les calculateurs. On la contrôle <b>toujours en premier</b>, avec les fusibles et les masses principales.</p>',
    how: '<p>Multimètre en V continu, sur les bornes de la batterie, moteur arrêté, au repos depuis quelques minutes.</p>', measures: ['ubat'],
    decide: function (m) { var b = m('ubat'); if (b.st === 'bad' && b.dir === 'low') return { v: 'bad', msg: 'Batterie trop faible : charge-la (ou teste-la au testeur de batterie) avant tout diagnostic du réseau, puis efface les défauts et recommence.', next: 'net' }; return { v: b.st, msg: b.st === 'ok' ? 'Batterie correcte : on peut passer au réseau.' : 'Tension limite : pense à la charger, on continue.', next: 'net' }; } };
  S.net = { type: 'network', title: 'Quel réseau contrôler ?', why: '<p>Chaque réseau a ses propres mesures. Regarde sur ta fiche véhicule à quel réseau appartiennent les calculateurs qui ne répondent pas.</p>',
    choices: [['CAN haute vitesse (moteur, freinage, direction…)', 'can_r', 'canhs'], ['CAN basse vitesse tolérant aux pannes (confort, carrosserie)', 'ls_u', 'canls'], ['LIN (essuie-vitres, lève-vitres, capteur batterie…)', 'lin_u', 'lin']] };

  S.can_r = { type: 'measure', title: 'CAN HS : résistance de la ligne', why: WHY_CAN + '<p>La mesure de résistance dit si la ligne est <b>entière</b> et si les <b>deux terminaisons</b> sont présentes.</p>',
    how: '<ol><li><b>Contact coupé</b>, attendre la mise en veille des calculateurs (idéalement batterie débranchée : un calculateur réveillé fausse la mesure).</li><li>Ohmmètre entre <b>pin 6 (CAN H) et pin 14 (CAN L)</b> de la prise OBD (ou aux points indiqués sur le schéma).</li><li>Si l’appareil affiche « OL », tape <b>OL</b>.</li></ol>',
    measures: ['r_can'], decide: function (m) {
      var r = m('r_can').v;
      if (r === Infinity || r > 300) return { v: 'bad', msg: 'Ligne ouverte (aucune terminaison vue) : la prise diagnostic n’est pas reliée au réseau, ou les deux branches sont coupées. Contrôle la continuité CAN H et CAN L entre la prise et le premier calculateur.', next: 'can_wire' };
      if (r >= 100 && r <= 140) return { v: 'bad', msg: '≈ 120 Ω : une seule terminaison est vue. Une branche est coupée, ou le calculateur qui porte l’autre résistance est débranché / défectueux.', next: 'can_term' };
      if (r < 10) return { v: 'bad', msg: 'Court-circuit entre CAN H et CAN L (fils écrasés, eau dans un connecteur, calculateur défectueux).', next: 'can_short' };
      if (m('r_can').st === 'ok') return { v: 'ok', msg: '≈ 60 Ω : les deux terminaisons sont là et la ligne est continue.', next: 'can_rg' };
      if (r < 55) return { v: 'bad', msg: 'Résistance trop basse : une résistance parasite (humidité, oxydation) ou un calculateur défectueux charge la ligne.', next: 'can_short' };
      return { v: 'warn', msg: 'Résistance trop haute : mauvais contact, oxydation ou fil abîmé sur une branche.', next: 'can_term' };
    } };
  S.can_term = { type: 'measure', title: 'CAN HS : contrôler une résistance de terminaison', ecusTerm: true,
    why: '<p>Seuls <b>deux calculateurs</b> portent une résistance de 120 Ω (par exemple calculateur moteur et BSI chez PSA, injection et UCH chez Renault). Si on n’en voit qu’une, soit la résistance interne est HS, soit le fil jusqu’à ce calculateur est coupé.</p>',
    how: '<ol><li>Contact coupé, débranche <b>un des deux calculateurs à terminaison</b> (voir la liste de ta fiche).</li><li>Mesure la résistance entre ses broches CAN H et CAN L, <b>côté calculateur</b>.</li></ol>', measures: ['r_term'],
    decide: function (m) { var t = m('r_term'); if (t.st === 'bad') return { v: 'bad', msg: 'Résistance interne hors tolérance : le calculateur est défectueux (réparation ou remplacement, puis codage / apprentissage).', next: 'end_ecu' }; return { v: 'ok', msg: 'La terminaison de ce calculateur est bonne : on contrôle maintenant le faisceau jusqu’à lui. Si le fil est bon, refais ce test sur l’autre calculateur à terminaison.', next: 'can_wire' }; } };
  S.can_wire = { type: 'measure', title: 'CAN HS : continuité des fils', why: '<p>Une coupure de fil empêche toute communication sur le CAN HS (PSA : « la coupure d’un fil CAN IS High ou Low ne permet pas la communication »).</p>',
    how: '<ol><li>Contact coupé, calculateur débranché.</li><li>Mesure la résistance du fil <b>CAN H</b> entre la prise OBD (pin 6) et la broche du calculateur, puis la même chose pour <b>CAN L</b> (pin 14). Note la plus mauvaise des deux.</li><li>Bouge le faisceau pendant la mesure : un faux contact fait varier la valeur.</li></ol>', measures: ['r_fil'],
    decide: function (m) { if (m('r_fil').st === 'ok') return { v: 'ok', msg: 'Les fils sont continus. Contrôle les connecteurs (broches écartées, oxydation) puis refais la mesure de résistance du réseau.', next: 'can_r' }; return { v: 'bad', msg: 'Coupure ou forte résistance du fil : répare le faisceau (épissure étanche, en gardant les fils torsadés) ou remplace-le.', next: 'end_wire' }; } };
  S.can_short = { type: 'measure', title: 'CAN HS : trouver le court-circuit', why: '<p>On isole le coupable <b>en débranchant les calculateurs un par un</b>, en mesurant à chaque fois : quand la résistance redevient normale, le dernier débranché est en cause.</p>',
    how: '<ol><li>Contact coupé. Débranche un calculateur du réseau (commence par ceux exposés à l’eau ou récemment touchés).</li><li>Mesure à nouveau entre pin 6 et pin 14 et note la valeur.</li><li>Si rien ne change, rebranche-le et passe au suivant.</li></ol>', measures: ['r_can'],
    decide: function (m) { var r = m('r_can'); if (r.st === 'ok' || (r.v >= 100 && r.v <= 140)) return { v: 'ok', msg: 'La résistance est redevenue normale : le calculateur que tu viens de débrancher est en cause (contrôle son connecteur, puis le calculateur).', next: 'end_ecu' }; return { v: 'bad', msg: 'Toujours anormal : rebranche ce calculateur et passe au suivant. Si tous sont débranchés et que le défaut reste, c’est le faisceau (fils écrasés entre eux, pincés contre la caisse).', next: 'can_short' }; } };
  S.can_rg = { type: 'measure', title: 'CAN HS : isolement par rapport à la masse', why: '<p>Un fil CAN en contact avec la masse fait chuter sa tension : la ligne peut garder 60 Ω entre H et L mais ne plus communiquer.</p>',
    how: '<p>Contact coupé. Ohmmètre entre pin 6 et la masse, puis entre pin 14 et la masse.</p>', measures: ['r_ch_m', 'r_cl_m'],
    decide: function (m) { if (m('r_ch_m').st === 'bad' || m('r_cl_m').st === 'bad') return { v: 'bad', msg: 'Un fil CAN touche la masse : débranche les calculateurs un par un pour savoir si c’est un calculateur ou le faisceau (fil dénudé contre la caisse).', next: 'end_wire' }; return { v: 'ok', msg: 'Pas de court-circuit à la masse : on passe aux tensions.', next: 'can_u' }; } };
  S.can_u = { type: 'measure', title: 'CAN HS : tensions contact mis', why: '<p>Au multimètre, on lit la <b>tension moyenne</b> : environ <b>2,65 V</b> sur CAN H et <b>2,35 V</b> sur CAN L en activité (doc PSA), soit une <b>somme d’environ 5 V</b>. À l’oscilloscope : composante continue de 2,5 V, CAN H monte vers 3,5 V et CAN L descend vers 1,5 V, en miroir.</p>',
    how: '<ol><li>Rebranche tout, <b>contact mis</b>, moteur arrêté.</li><li>Voltmètre : pin 6 / masse, puis pin 14 / masse.</li></ol>', measures: ['u_ch', 'u_cl'],
    decide: function (m) {
      var h = m('u_ch').v, l = m('u_cl').v;
      if (h > 6 || l > 6) return { v: 'bad', msg: 'Un fil CAN est en court-circuit avec le + (' + (h > 6 ? 'CAN H' : 'CAN L') + ' ≈ ' + Math.max(h, l) + ' V) : cherche le fil en contact avec un + dans le faisceau, ou un calculateur défectueux.', next: 'end_wire' };
      if (h < 0.5) return { v: 'bad', msg: 'CAN H à la masse : fil CAN H en contact avec la masse ou calculateur défectueux.', next: 'can_short' };
      if (l < 0.5) return { v: 'bad', msg: 'CAN L à la masse : fil CAN L en contact avec la masse ou calculateur défectueux.', next: 'can_short' };
      if (Math.abs(h - l) < 0.05 && Math.abs(h - 2.5) < 0.2) return { v: 'warn', msg: 'Les deux fils restent à 2,5 V sans différence : pas de trafic. Aucun calculateur n’émet (alimentations, +APC, calculateur maître non réveillé).', next: 'ecu_alim' };
      if (Math.abs(h - l) < 0.05) return { v: 'bad', msg: 'CAN H et CAN L ont la même tension : court-circuit entre les deux fils.', next: 'can_short' };
      if (m('u_ch').st === 'ok' && m('u_cl').st === 'ok') return { v: 'ok', msg: 'Tensions correctes (somme ≈ ' + (Math.round((h + l) * 100) / 100) + ' V) : le réseau CAN HS est bon physiquement.', next: 'can_ok' };
      return { v: 'warn', msg: 'Tensions un peu hors plage : contrôle à l’oscilloscope (déformation, parasites) et vérifie les masses.', next: 'can_ok' };
    } };
  S.can_ok = { type: 'choice', title: 'Réseau CAN HS bon : et maintenant ?', why: '<p>Le support physique (fils, terminaisons, tensions) est bon. Si un calculateur ne répond toujours pas, le problème vient de <b>lui</b> : alimentation, masse, connecteur, puis calculateur.</p>',
    choices: [['Un calculateur ne répond toujours pas', 'ecu_alim'], ['Tout communique maintenant', 'end_ok']] };

  S.ls_u = { type: 'measure', title: 'CAN basse vitesse : tensions', why: '<p>Le CAN basse vitesse (125 kbit/s chez PSA : CAN CAR, CAN CONFORT, CAN INFO DIV) est <b>tolérant aux pannes</b> : si un fil est coupé ou en court-circuit, le réseau continue sur un fil, avec un défaut mémorisé. Chaque calculateur a sa propre terminaison : <b>la mesure de 60 Ω ne s’applique pas</b>.</p><p>Niveaux (doc PSA) : CAN H 0 à 0,2 V au repos, 3,8 à 4,2 V quand il émet ; CAN L 4,8 à 5,6 V au repos, 1 à 1,4 V quand il émet. Au multimètre, on lit une moyenne : CAN H faible, CAN L proche de 5 V, somme ≈ 5 V.</p>',
    how: '<p>Contact mis, moteur arrêté. Voltmètre entre CAN H et la masse, puis CAN L et la masse (au connecteur d’un calculateur du réseau ou au BSI).</p>', measures: ['u_lsh', 'u_lsl'],
    decide: function (m) {
      var h = m('u_lsh').v, l = m('u_lsl').v;
      if (h > 6 || l > 6.5) return { v: 'bad', msg: 'Court-circuit au + sur ' + (h > 6 ? 'CAN H' : 'CAN L') + ' : le réseau fonctionne peut-être encore en mode dégradé, mais il faut trouver le fil en cause.', next: 'end_wire' };
      if (l < 0.5) return { v: 'bad', msg: 'CAN L à la masse : le réseau passe en mode monofilaire (dégradé) avec un défaut mémorisé. Cherche le fil ou le calculateur en cause (débranchements successifs).', next: 'end_wire' };
      if (Math.abs(h - l) < 0.3) return { v: 'bad', msg: 'CAN H et CAN L au même potentiel : court-circuit entre les deux fils (réseau en mode dégradé).', next: 'end_wire' };
      if (h < 0.05 && l > 4.7) return { v: 'warn', msg: 'Niveaux de repos sans trafic : le réseau est peut-être en veille (le BSI gère le « + CAN »). Vérifie contact mis, le réveil du réseau et l’alimentation des calculateurs.', next: 'ecu_alim' };
      if (m('u_lsh').st === 'ok' && m('u_lsl').st === 'ok') return { v: 'ok', msg: 'Tensions cohérentes (somme ≈ ' + (Math.round((h + l) * 100) / 100) + ' V) : le réseau basse vitesse est bon physiquement.', next: 'can_ok' };
      return { v: 'warn', msg: 'Valeurs inhabituelles : confirme à l’oscilloscope (signaux H et L complémentaires).', next: 'can_ok' };
    } };

  S.lin_u = { type: 'measure', title: 'LIN : tension de la ligne', why: '<p>Le LIN est un réseau <b>maître / esclave</b> sur <b>un seul fil</b> (19,2 kbit/s) : l’esclave (moteur d’essuie-vitre, capteur batterie…) ne répond qu’au maître (BSI, calculateur moteur…). Au repos, la ligne est à la tension batterie ; en communication, elle descend brièvement à 0.</p>',
    how: '<p>Contact mis. Voltmètre entre le fil LIN et la masse, au connecteur de l’esclave.</p>', measures: ['u_lin'],
    decide: function (m) { var u = m('u_lin'); if (u.v < 1) return { v: 'bad', msg: 'Ligne LIN à 0 V : fil LIN à la masse, ou maître non alimenté. Débranche l’esclave : si la tension revient, l’esclave est en cause ; sinon contrôle le fil et le maître.', next: 'end_wire' }; if (u.st === 'bad' && u.dir === 'high') return { v: 'bad', msg: 'Tension trop haute : fil LIN en contact avec un +.', next: 'end_wire' }; return { v: 'ok', msg: 'La ligne LIN est présente. Si l’esclave ne fonctionne pas, contrôle son alimentation et sa masse.', next: 'ecu_alim' }; } };

  S.ecu_alim = { type: 'measure', title: 'Alimentation et masse du calculateur', why: '<p>Un calculateur sans alimentation ou avec une mauvaise masse ne répond pas, alors que le réseau est bon.</p>',
    how: '<ol><li>Au connecteur du calculateur (branché, en piquant par l’arrière), contact mis : mesure le <b>+BAT</b> et le <b>+APC</b>.</li><li>Mesure la <b>chute de tension de la masse</b> : voltmètre entre la broche de masse du calculateur et la borne – de la batterie, calculateur en fonctionnement.</li></ol>', measures: ['u_alim', 'u_masse'],
    decide: function (m) { if (m('u_alim').st === 'bad') return { v: 'bad', msg: 'Alimentation absente ou faible : contrôle le fusible, le relais et le fil d’alimentation.', next: 'end_wire' }; if (m('u_masse').st === 'bad') return { v: 'bad', msg: 'Mauvaise masse : nettoie et resserre le point de masse, contrôle le fil de masse.', next: 'end_wire' }; return { v: 'ok', msg: 'Alimentation et masse bonnes : contrôle le connecteur (broches, oxydation). S’il est bon, le calculateur est suspect (téléchargement ou remplacement, puis codage).', next: 'end_ecu' }; } };

  /* Composants */
  S.comp = { type: 'choice', title: 'Quel type de composant ?', why: '<p>Chaque technologie se contrôle différemment. Un <b>capteur</b> informe le calculateur, un <b>actionneur</b> est commandé par lui.</p>',
    choices: [['Capteur inductif (régime / PMH, ABS passif) — 2 fils', 'c_ind'], ['Capteur à effet Hall (phase, ABS actif) — 3 fils', 'c_hall'], ['Sonde de température CTN — 2 fils', 'c_ctn'], ['Capteur de pression (rail, suralimentation) — 3 fils', 'c_pres'], ['Potentiomètre (pédale d’accélérateur, papillon)', 'c_pot'], ['Électrovanne pilotée en RCO (régulateur, EGR, turbo)', 'c_ev'], ['Injecteur diesel à solénoïde', 'c_injd'], ['Injecteur essence', 'c_inje']] };
  function compStep(title, why, how, ms, ok) { return { type: 'measure', title: title, why: why, how: how, measures: ms, decide: function (m) { var bad = ms.filter(function (k) { return m(k).st === 'bad'; }); if (bad.length) return { v: 'bad', msg: 'Hors tolérance : ' + bad.map(function (k) { return D.MEASURES[k].label.toLowerCase(); }).join(' ; ') + '. Le composant ou son alimentation est en cause (voir l’explication).', next: 'end_comp' }; return { v: 'ok', msg: ok, next: 'c_wire' }; } }; }
  S.c_ind = compStep('Capteur inductif', '<p>Un aimant et une bobine face à une cible dentée : le passage des dents fait varier le flux et <b>crée une tension alternative</b> (loi de Lenz). Pas d’alimentation : il se contrôle en <b>résistance</b>, en <b>isolement</b> et en <b>tension générée</b>. L’entrefer (distance cible / capteur) compte aussi.</p>',
    '<ol><li>Capteur débranché : ohmmètre entre ses 2 broches (bobinage), puis entre une broche et le boîtier / la masse (isolement).</li><li>Voltmètre en <b>V alternatif</b> sur le capteur, moteur entraîné au démarreur.</li></ol>', ['r_ind', 'r_iso', 'u_ac'], 'Capteur bon électriquement : contrôle l’entrefer, la cible (dents abîmées, encrassement) puis le faisceau.');
  S.c_hall = compStep('Capteur à effet Hall', '<p>Une plaquette semi-conductrice alimentée délivre une faible tension quand un champ magnétique la traverse ; l’électronique intégrée la transforme en <b>signal carré 0 / 5 V</b> d’amplitude fixe. Il faut donc une <b>alimentation</b>, une <b>masse</b> et un <b>signal</b>.</p>',
    '<ol><li>Connecteur branché, contact mis : alimentation entre le + et la masse du capteur.</li><li>Signal : tourne lentement (ou fais passer la cible) et relève le niveau haut et le niveau bas. À l’oscilloscope : créneaux nets.</li></ol>', ['u_5v', 'u_sig_hi', 'u_sig_lo'], 'Alimentation et signal corrects : contrôle le fil de signal jusqu’au calculateur.');
  S.c_ctn = compStep('Sonde de température CTN', '<p>CTN = coefficient de température négatif : <b>plus il fait chaud, plus la résistance baisse</b>. Le calculateur l’alimente en 5 V à travers une résistance et lit la tension.</p>',
    '<ol><li>Sonde débranchée, ohmmètre sur ses 2 broches moteur froid (≈ 20 °C).</li><li>Refais la mesure moteur chaud (≈ 80 °C), en comparant avec un thermomètre.</li></ol>', ['r_ctn20', 'r_ctn80'], 'La sonde suit bien la température : contrôle le faisceau et l’alimentation 5 V au connecteur.');
  S.c_pres = compStep('Capteur de pression 3 fils', '<p>Capteur piézo-résistif : une membrane déforme des jauges, l’électronique délivre un <b>signal de 0,5 à 4,5 V</b> proportionnel à la pression. Il faut 5 V, une masse et un signal.</p>',
    '<ol><li>Connecteur branché, contact mis, moteur arrêté : alimentation entre + et masse du capteur.</li><li>Tension de signal au repos, puis moteur tournant : elle doit augmenter avec la pression.</li></ol>', ['u_5v', 'u_sig_p'], 'Alimentation et signal de repos corrects : compare le signal moteur tournant avec la valeur de consigne à la valise.');
  S.c_pot = compStep('Potentiomètre (pédale d’accélérateur)', '<p>Une piste résistive alimentée en 5 V et un curseur : la tension du curseur est <b>proportionnelle à la position</b>. La pédale a souvent <b>deux pistes</b> (la 2ᵉ vaut souvent la moitié de la 1ʳᵉ) pour que le calculateur détecte une incohérence.</p>',
    '<ol><li>Contact mis, connecteur branché : alimentation 5 V.</li><li>Signal pied levé puis pied à fond, en appuyant lentement : la tension doit monter régulièrement.</li></ol>', ['u_5v', 'u_pot_lo', 'u_pot_hi'], 'Piste correcte : contrôle l’autre piste de la même façon, puis le faisceau.');
  S.c_ev = compStep('Électrovanne pilotée en RCO', '<p>Le calculateur pilote l’électrovanne en <b>RCO</b> (rapport cyclique d’ouverture) : il la met à la masse par impulsions ; plus le rapport cyclique est grand, plus elle s’ouvre (ou se ferme). Au multimètre, on ne voit qu’une moyenne : <b>l’oscilloscope</b> montre le signal réel.</p>',
    '<ol><li>Électrovanne débranchée : résistance du bobinage.</li><li>Connecteur branché, contact mis : tension du + (souvent permanent).</li><li>Oscilloscope sur le fil de commande (côté masse) moteur tournant : créneaux dont la largeur varie.</li></ol>', ['r_ev', 'u_ev_plus'], 'Bobinage et alimentation corrects : contrôle le signal de commande à l’oscilloscope et le fil de commande jusqu’au calculateur.');
  S.c_injd = compStep('Injecteur diesel à solénoïde', '<p>L’injecteur common rail à solénoïde est commandé par le calculateur avec un <b>courant d’appel</b> élevé puis un <b>courant de maintien</b>. Il se contrôle en résistance (très faible), puis en <b>débit de retour</b> (test hydraulique) et en correction de débit à la valise.</p>',
    '<p>Injecteur débranché : ohmmètre entre ses 2 broches (retire la résistance des cordons de l’appareil).</p>', ['r_inj_d'], 'Bobinage correct : contrôle le débit de retour des injecteurs (module ⛽ Common rail) et les corrections de débit à la valise.');
  S.c_inje = compStep('Injecteur essence', '<p>Injecteur haute impédance commandé à la masse par le calculateur, avec un + commun.</p>', '<p>Injecteur débranché : ohmmètre entre ses 2 broches. Compare les injecteurs entre eux.</p>', ['r_inj_e'], 'Bobinage correct : contrôle l’alimentation, la commande (oscilloscope ou lampe témoin) et l’étanchéité / le jet.');
  S.c_wire = { type: 'measure', title: 'Faisceau entre le composant et le calculateur', why: '<p>Composant bon mais équipement en défaut : le problème est souvent le <b>faisceau</b> (coupure, oxydation, fils frottés) ou le connecteur.</p>',
    how: '<ol><li>Contact coupé, composant et calculateur débranchés.</li><li>Continuité de chaque fil entre les deux connecteurs (note la plus mauvaise valeur).</li><li>Bouge le faisceau pendant la mesure.</li></ol>', measures: ['r_fil'],
    decide: function (m) { if (m('r_fil').st === 'ok') return { v: 'ok', msg: 'Faisceau bon : contrôle les connecteurs, puis le calculateur (alimentation, masse).', next: 'ecu_alim' }; return { v: 'bad', msg: 'Fil coupé ou résistant : répare le faisceau.', next: 'end_wire' }; } };

  S.end_ok = { type: 'end', v: 'ok', title: 'Réseau conforme', html: '<p>Tous les contrôles sont bons. Efface les défauts, fais un essai et relis les défauts à la valise.</p>' };
  S.end_wire = { type: 'end', v: 'bad', title: 'Défaut de faisceau ou d’alimentation localisé', html: '<p>Répare (épissure étanche, fils CAN gardés torsadés), puis refais les mesures du réseau, efface les défauts et fais un essai.</p>' };
  S.end_ecu = { type: 'end', v: 'bad', title: 'Calculateur suspect', html: '<p>Réseau, alimentation et faisceau bons : contrôle le connecteur du calculateur. En dernier recours, téléchargement ou remplacement, puis <b>codage / apprentissages</b> à la valise.</p>' };
  S.end_comp = { type: 'end', v: 'bad', title: 'Composant hors tolérance', html: '<p>Vérifie la mesure avec la valeur constructeur, contrôle le connecteur du composant, puis remplace-le. Efface les défauts et fais un essai.</p>' };

  D.MODULES = {
    mux: { id: 'mux', icon: '🔌', titre: 'Multiplexage', sous: 'Réseaux CAN, LIN, capteurs et actionneurs', start: 'start', steps: S,
      comprendre: '<h3>Le principe</h3><p>Au lieu d’un fil par information, les calculateurs échangent des <b>trames numériques</b> sur un réseau commun. Chaque trame porte un identifiant et des données ; chaque calculateur prend ce qui l’intéresse. Une <b>passerelle</b> (BSI chez PSA, UCH chez Renault, J533 chez VW) relie les réseaux entre eux et à la prise diagnostic.</p>' +
        '<div class="tw"><table><tr><th>Réseau</th><th>Débit</th><th>Particularité</th><th>Mesure clé</th></tr>' +
        '<tr><td>CAN haute vitesse (CAN IS PSA, CAN V Renault, Antrieb VW)</td><td>500 kbit/s</td><td>Moteur, freinage, direction. Coupure d’un fil = plus de communication.</td><td>60 Ω entre H et L ; H ≈ 2,65 V, L ≈ 2,35 V</td></tr>' +
        '<tr><td>CAN basse vitesse (CAN CAR / CONFORT PSA, Komfort VW)</td><td>100 à 125 kbit/s</td><td>Confort, carrosserie. Tolérant aux pannes : marche sur un fil.</td><td>Tensions : H faible, L proche de 5 V</td></tr>' +
        '<tr><td>LIN</td><td>19,2 kbit/s</td><td>Maître / esclave, 1 fil (essuie-vitres, capteur batterie…)</td><td>≈ 12 V au repos</td></tr></table></div>' +
        '<h3>Méthode</h3><ol><li>Lire les défauts à la valise et noter <b>quels calculateurs</b> ne répondent pas : cela désigne le réseau.</li><li>Batterie, fusibles, masses.</li><li>Réseau : résistance (contact coupé), isolement, puis tensions (contact mis), oscilloscope si besoin.</li><li>Calculateur : alimentation, masse, connecteur, puis calculateur.</li></ol>' +
        '<div class="box piege"><b>⚠️ Pièges</b><ul><li>Mesurer une résistance <b>contact coupé</b> et réseau en veille, sinon la mesure est fausse.</li><li>Ne jamais piquer un fil CAN avec une pointe : passer par l’arrière du connecteur ou un bornier.</li><li>Réparer un fil CAN en gardant les deux fils <b>torsadés</b>.</li></ul></div>' }
  };
})();
