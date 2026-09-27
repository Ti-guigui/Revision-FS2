/* Périmètre des cours réellement vus (demandé par l'élève) — appliqué en dernier :
   - Motorisation : pas de moteur essence, pas d'angle de came.
   - Équipement électrique : démarreur, alternateur, batterie, multiplexage, capteurs, actionneurs uniquement.
   - Électricité : diodes, lois des nœuds et des mailles, portes logiques, transistor NPN, mono / triphasé (pas de transformateur,
     pas de condensateur) ; un exercice de calcul a toujours son schéma ; barres de complément bien visibles.
   - DSFT : chaque question a une image droite et lisible (Willis redessiné).
   - Aucune mention « question de remplacement » ni commentaire sur les sources dans les QCM. */
(function () {
  function subj(id) { return REV.subjects.find(function (s) { return s.id === id; }); }
  function renum(s) {
    var c = 0, e = 0;
    s.lessons.forEach(function (l) { l.num = l.exo ? 'E' + (++e) : String(++c).padStart(2, '0'); });
  }
  function dropLessons(id, ids) {
    var s = subj(id);
    s.lessons = s.lessons.filter(function (l) { return ids.indexOf(l.id) < 0; });
    s.questions = s.questions.filter(function (q) { return ids.indexOf(q.l) < 0; });
    ids.forEach(function (x) { delete REV.lessonById[id + '/' + x]; });
    renum(s);
  }
  function dropQuestions(id, fn) {
    var s = subj(id);
    s.questions = s.questions.filter(function (q) { return !fn(q); });
  }
  function dropImages(key, re) {
    var l = REV.lessonById[key];
    if (l && l.images) l.images = l.images.filter(function (im) { return !re.test(im.src); });
  }

  /* ---------- Motorisation : pas d'essence ---------- */
  dropQuestions('moteur', function (q) { return /cliquetis|Comparé à un moteur essence/i.test(q.q); });
  dropImages('moteur/capteurs-cr', /gd21\/m1(49|50|51|52|53|56)_/);
  (function () {
    var l = REV.lessonById['moteur/cycle'];
    if (l) {
      l.html = l.html.replace(/<li><b>Cliquetis<\/b>[\s\S]*?<\/li>/, '');
      l.retenir = l.retenir.filter(function (r) { return !/Cliquetis|essence/.test(r); });
    }
  })();

  /* ---------- Équipement électrique : périmètre ---------- */
  dropLessons('equip', ['mesures', 'symboles', 'relais', 'allumage', 'diagnostic', 'schemas']);
  REV.addLessons('equip', 'capteurs', [{
    id: 'actionneurs', title: 'Les actionneurs',
    images: [{ src: 'gd22/g140_0.jpg', cap: 'Électrovanne de régulation de suralimentation : 1 entrée dépression · 2 sortie vers la soupape du turbo · 3 pression atmosphérique · 4 connecteur' },
      { src: 'gd22/g140_1.jpg', cap: 'Électrovanne de recyclage des gaz d’échappement (RGE)' },
      { src: 'gd22/g150_1.jpg', cap: 'Régulateur haute pression Bosch commandé par le calculateur (RCO)' },
      { src: 'gd22/g166_0.jpg', cap: 'Régulateur de débit IMV Delphi (normalement ouvert)' },
      { src: 'gd22/g151_0.jpg', cap: 'Injecteur électro-hydraulique Bosch' },
      { src: 'gd22/g165_0.jpg', cap: 'Courant de commande d’un injecteur : courant d’appel puis de maintien' },
      { src: 'gd22/g141_1.jpg', cap: 'Boîtier de préchauffage (1150) commandé par le calculateur (1320) : alimente les bougies (1160)' }],
    html: `
<p>Un <b>actionneur</b> (actuateur) reçoit un ordre électrique du calculateur et le transforme en action (mouvement, ouverture, pression). Le capteur informe, le calculateur décide, l’actionneur agit.</p>
<div class="tw"><table><tr><th>Actionneur</th><th>Commande</th><th>Rôle</th></tr>
<tr><td>Électrovanne de suralimentation</td><td>Proportionnelle, tension variable (RCO)</td><td>Module la dépression de la pompe à vide vers la soupape du turbo : régule et limite la pression de suralimentation</td></tr>
<tr><td>Électrovanne RGE</td><td>Proportionnelle (RCO)</td><td>Commande la soupape de recyclage des gaz ; RCO mini = pas de dépression = RGE supprimé</td></tr>
<tr><td>Régulateur haute pression (Bosch)</td><td>RCO</td><td>Fuite contrôlée pour obtenir la pression de rampe voulue</td></tr>
<tr><td>IMV (Delphi)</td><td>Courant</td><td>Dose le gazole envoyé à la pompe HP ; plus de courant = moins de débit ; ouvert au repos</td></tr>
<tr><td>Injecteur électromagnétique</td><td>Courant d’appel puis de maintien</td><td>Injecte la quantité demandée (pression de rampe + temps d’ouverture)</td></tr>
<tr><td>Relais double</td><td>Calculateur (auto-maintien)</td><td>Alimente le calculateur, la pompe à carburant et les actionneurs</td></tr>
<tr><td>Relais de préchauffage</td><td>Calculateur</td><td>Alimente les bougies de préchauffage selon la cartographie</td></tr></table></div>
<p><b>RCO</b> (rapport cyclique d’ouverture) : le calculateur alimente l’actionneur par impulsions ; la tension moyenne (ex. RCO 75 % sous 12 V → 9 V) fixe la position.</p>`,
    retenir: ['Capteur = information ; calculateur = décision ; actionneur = action.', 'Électrovannes proportionnelles commandées en RCO.', 'IMV : normalement ouvert, plus de courant = moins de débit.'],
    pieges: ['RCO minimum sur l’électrovanne RGE = pas de dépression = RGE supprimé.'],
    memo: { cle: 'CAPTEUR → CALCULATEUR → ACTIONNEUR', flow: ['Capteur mesure', 'Calculateur compare à la cartographie', 'Actionneur commandé (RCO, courant)'], points: ['RCO 75 % sous 12 V = 9 V moyens', 'Injecteur : appel puis maintien'], astuce: 'Le capteur parle, le calculateur réfléchit, l’actionneur travaille.' }
  }]);
  (function () {
    var A = 'gd22/', src = 'GD 22 — Motorisation tome 2';
    REV.addExercises('equip', { lessons: [], questions: [
      { l: 'actionneurs', img: A + 'g140_0.jpg', q: 'Comment le calculateur commande-t-il l’électrovanne de régulation de suralimentation ?', c: ['Par une tension variable (RCO)', 'Par une tension fixe de 24 V', 'Par un signal carré de 5 V venant d’un capteur'], e: 'Électrovanne proportionnelle commandée en RCO : elle module la dépression envoyée à la soupape du turbo.', src: src },
      { l: 'actionneurs', img: A + 'g140_1.jpg', q: 'Électrovanne RGE avec un RCO minimum (non alimentée) :', c: ['Pas de dépression : le recyclage des gaz est supprimé', 'Recyclage maximum', 'Le moteur s’arrête'], e: 'RCO mini = pression atmosphérique sur la soupape = RGE supprimé.', src: src },
      { l: 'actionneurs', img: A + 'g166_0.jpg', q: 'Régulateur IMV Delphi : si le courant de commande augmente…', c: ['Le débit envoyé à la pompe HP diminue', 'Le débit augmente', 'La pompe s’arrête'], e: 'L’IMV est normalement ouvert ; le courant le ferme progressivement.', src: src },
      { l: 'actionneurs', img: A + 'g165_0.jpg', q: 'Forme du courant de commande d’un injecteur :', c: ['Un courant d’appel élevé puis un courant de maintien plus faible', 'Un courant constant', 'Une sinusoïde'], e: 'Appel pour ouvrir vite, maintien plus faible pour tenir l’injecteur ouvert sans chauffer.', src: src },
      { l: 'actionneurs', img: A + 'g141_1.jpg', q: 'Sur ce schéma, rôle du boîtier de préchauffage 1150 commandé par le calculateur 1320 :', c: ['Alimenter les bougies de préchauffage 1160', 'Alimenter le démarreur', 'Mesurer la tension batterie'], e: 'Le calculateur commande le boîtier de préchauffage, qui alimente les bougies selon la cartographie.', src: src }
    ] });
  })();

  /* ---------- Électricité : périmètre ---------- */
  dropLessons('elec', ['generateurs', 'exos-ct1', 'cah-e-quantite', 'cah-e-resistivite', 'cah-e-generateurs', 'aga03-puissance', 'aga03-generateurs', 'aga03-condensateur']);
  dropQuestions('elec', function (q) {
    if (/^Ex (5|6|1[1-35-9]) —/.test(q.q) && /^aga03-/.test(q.l)) return true;             // section, Ah, code couleurs, résistivité
    if (q.l === 'lois' && /3 mm²|96 Ah|ρ = 1,6/.test(q.q)) return true;
    if (q.l === 'cah-e-alimentation' && /composant B|Ex 27 c\)|Ex 27 d\)/.test(q.q)) return true; // condensateur, transformateur, filtrage
    if (/aga03\/p(104|107|109|110)\.jpg/.test(q.img || '')) return true;
    if (q.l === 'composants' && /alimentation stabilisée|transformateur|condensateur/i.test(q.q + q.c.join(' '))) return true;
    if (q.l === 'sym-composants' && /aga03-(rheostat|potentiometre|ajustable|cond-pol|cond-np|transfo|synoptique)/.test(q.img || '')) return true;
    if (q.l === 'uv2-elec' && /^5[3-6]\)/.test(q.q)) return true;                              // schéma logique absent du dossier
    return false;
  });
  (function () {
    var s = subj('elec');
    var al = REV.lessonById['elec/aga03-resistance']; if (al) al.title = 'Livre AGA 03 — loi d’Ohm (Ex 14)';
    var cc = REV.lessonById['elec/aga03-courant']; if (cc) cc.title = 'Livre AGA 03 — courant, loi des nœuds (Ex 1 à 4)';
    var ca = REV.lessonById['elec/cah-e-alimentation']; if (ca) { ca.title = 'Cahier électricité — Pont de diodes et Zéner (Ex 27)'; ca.images = (ca.images || []).filter(function (im) { return !/e27osc|r27/.test(im.src); }); }
    var c = REV.lessonById['elec/composants'];
    if (c) {
      c.title = 'Diodes et transistors';
      c.html = c.html.replace(/<h3>Condensateur \(Farad\)<\/h3>[\s\S]*?(?=<p>Une diode placée)/, '')
        .replace(/<tr><td>Condensateur<\/td>[\s\S]*?<\/tr>/, '').replace(/<tr><td>Transformateur<\/td>[\s\S]*?<\/tr>/, '');
      dropImages('elec/composants', /aga03\/p(104|107|109|110)\.jpg/);
    }
    var sc = REV.lessonById['elec/sym-composants'];
    if (sc) {
      var bad = /aga03-(rheostat|potentiometre|ajustable|cond-pol|cond-np|transfo|synoptique)/;
      sc.images = sc.images.filter(function (im) { return !bad.test(im.src); });
      sc.html = sc.html.replace(/<tr><td><img src="img\/sym\/aga03-(rheostat|potentiometre|ajustable|cond-pol|cond-np|transfo)\.png"[\s\S]*?<\/tr>/g, '');
      sc.memo.flow = ['Diode', 'Del', 'Zéner', 'Transistor NPN'];
    }
    // schémas pour les exercices de calcul qui n'en avaient pas
    var E = 'elec/';
    s.questions.forEach(function (q) {
      if (q.img) return;
      var t = q.q;
      if (/relais|RK1|IbQ1|UR1|R2\.|Ib\b|Ic\b|β|Vbe|transistor/i.test(t)) q.img = E + 'transistor-relais.svg';
      else if (/phases|triphasé|neutre/i.test(t)) q.img = E + 'triphase.svg';
      else if (/sinusoïdale|efficace|période|fréquence|Umax|valeur maximale|400 Hz|40 ?ms|20 ms/i.test(t)) q.img = E + 'sinus.svg';
      else if (/Porte ET à 3 entrées : A = 1/.test(t)) q.img = E + 'porte-et-3.svg';
    });
  })();

  /* ---------- DSFT : une image droite et lisible pour chaque question ---------- */
  (function () {
    var D = 'dsft/', L = 'livres/l-', S = 'sym/agd27-';
    var map = [
      ['Usure des pneus en facettes', D + 'usure-facettes.svg'], ['autour de l’axe longitudinal', D + 'caisse-mouvements.svg'], ['Remplacement d’amortisseurs', L + 'd017_0.jpg'],
      ['Angle de carrossage : définition', S + 'p34-1.png'], ['auto-stabilité', S + 'p38-1.png'], ['Définition de l’angle de chasse', S + 'p38-1.png'], ['définition de l’angle de chasse', S + 'p38-1.png'],
      ['définition de l’angle de carrossage', S + 'p34-1.png'], ['auto stabilité', S + 'p38-1.png'],
      ['VALEUR du parallélisme', L + 'd030_0.jpg'], ['Angle inclus différent', S + 'p37-1.png'], ['Un véhicule tire du côté', D + 'var-tirage.svg'],
      ['usure RUGUEUSE', D + 'usure-rugueuse.svg'], ['usure LISSE', D + 'usure-lisse.svg'], ['parallélisme hors tolérance provoque', D + 'usure-rugueuse.svg'], ['carrossage hors tolérance provoque', D + 'usure-lisse.svg'],
      ['Relevés du parallélisme et des angles', D + 'alfa-uv2.svg'], ['Côté droit : carrossage −1°10′', D + 'alfa-uv2.svg'], ['Carrossage gauche −0°09′', D + 'alfa-uv2.svg'],
      ['dans quel ordre régler', D + 'alfa-uv2.svg'], ['Tolérance 10°30′', D + 'var-tolerance.svg'],
      ['Affirmation FAUSSE sur l’embrayage', L + 'd084_1.jpg'], ['qualité attendue d’une boîte', L + 'd092_0.jpg'], ['Une vitesse saute', L + 'd108_5.jpg'], ['Seule la 3ᵉ craque', L + 'd099_0.jpg'], ['Bruit à l’appui sur la pédale d’embrayage', L + 'd089_0.jpg'],
      ['couronne motrice (Zc = 80', D + 'train-c600-p-fixe.svg'], ['Porte-satellites FIXE, planétaire menant', D + 'train-ps-fixe.svg'], ['Planétaire menant 1 200 tr/min (Zp = 30)', D + 'train-p1200-ps-fixe.svg'], ['Deux éléments d’un train', D + 'train-lies.svg'],
      ['Rôle du maître-cylindre', L + 'd047_2.jpg'], ['Rôles de l’ICP by-pass', L + 'd054_0.jpg'], ['aucune trace de fuite', L + 'd050_0.jpg'], ['Contrôle du Mastervac', L + 'd057_1.jpg'], ['Point d’ébullition du liquide', L + 'd070_0.jpg'],
      ['Rôle de la SPR', L + 'd060_1.jpg'], ['trouve-t-on un ICP by-pass', L + 'd059_1.jpg'], ['Contrôle de l’ICP by-pass', L + 'd054_1.jpg'], ['type de frein trouve-t-on une SPR', L + 'd062_0.jpg'],
      ['Contrôle de la SPR', L + 'd060_1.jpg'], ['pression résiduelle lue sur le circuit arrière', L + 'd060_1.jpg'], ['soupapes basculantes', L + 'd050_0.jpg'], ['« compensateur »', L + 'd056_2.jpg'], ['liquide de frein doit-il être remplacé', L + 'd070_0.jpg'],
      ['Pédale dure : dans quel ordre', L + 'd057_1.jpg'], ['plonge vers l’avant au freinage (circuit', L + 'd059_0.jpg'], ['Voyant ABS allumé après intervention', L + 'd074_0.jpg'],
      ['Rôle de l’ABS', L + 'd073_0.jpg'], ['sous-virage', D + 'virage.svg'], ['patinage des roues motrices', L + 'd078_0.jpg'], ['mesure jusqu’à 0 km/h', L + 'd074_1.jpg'],
      ['185 70 R 15 86 T', D + 'pneu-185.svg'], ['« V CFD 20 »', D + 'pneu-vcfd20.svg'], ['V CFD 20', D + 'pneu-vcfd20.svg'], ['DOT 4217', D + 'pneu-dot4217.svg'], ['225/40 R18 92 Y', D + 'pneu-225.svg'],
      ['sigle « DOT »', D + 'pneu-dot.svg'], ['295/80 R22.5', D + 'pneu-295.svg'], ['talon d’accrochage', D + 'pneu-jante225.svg'], ['14.00 R20', D + 'pneu-1400.svg'], ['« AR17 »', D + 'pneu-ar17.svg'], ['« R18 »', D + 'pneu-r18.svg'], ['« VV »', D + 'pneu-vv.svg'],
      ['plonge de l’avant au freinage. Diagnostic', L + 'd059_0.jpg'], ['Freine mal, pédale DURE', L + 'd058_1.jpg'], ['Ne freine plus de l’AV', L + 'd048_0.jpg'], ['roues arrière bloquent', L + 'd055_1.jpg'],
      ['Pédale ET volant vibrent', L + 'd066_0.jpg'], ['Garnitures de frein grasses', L + 'd062_0.jpg'], ['Tire à gauche au freinage', L + 'd059_0.jpg'], ['plaquettes arrière', L + 'd074_0.jpg'],
      ['usure rugueuse à l’intérieur de la bande', D + 'usure-rugueuse-int.svg'], ['dans quel ordre procéder', D + 'alfa-uv2.svg'], ['fuite interne sur un circuit', L + 'd048_0.jpg'], ['assistance de freinage de type Mastervac', L + 'd057_1.jpg'],
      ['usure des pneus en facette', D + 'usure-facettes.svg'], ['Donnez le rôle de l’ABS', L + 'd073_0.jpg'], ['méthode graphique', D + 'train-c600-p-fixe.svg'],
      ['quatre roues restent freinées', D + 'schema-pneu-theorique.jpg'], ['temps de remplissage', D + 'schema-pneu-theorique.jpg'], ['air à la main directe', D + 'schema-pneu-theorique.jpg'], ['système de rupture de la VCR', D + 'schema-pneu-theorique.jpg'],
      ['Quel est le rôle du maitre-cylindre', L + 'd047_2.jpg'], ['rôles d’un ICP by-pass', L + 'd054_0.jpg'], ['Quelle affirmation est fausse', L + 'd084_1.jpg'], ['qualités d’une boite de vitesse', L + 'd092_0.jpg'],
      ['carrossage est hors tolérance', D + 'usure-lisse.svg'], ['parallélisme est hors tolérance', D + 'usure-rugueuse.svg'], ['Usure rugueuse à l’intérieur', D + 'usure-rugueuse-int.svg'], ['Usure rugueuse à l’extérieur', D + 'usure-rugueuse-ext.svg'],
      ['Usure lisse à l’intérieur', D + 'usure-lisse-int.svg'], ['Usure lisse à l’extérieur', D + 'usure-lisse-ext.svg'], ['pas le même à gauche et à droite', D + 'var-tirage.svg'], ['a changé après un choc', S + 'p37-1.png'],
      ['Angle inclus identique des deux côtés', L + 'd038_0.jpg'], ['retour en ligne droite', S + 'p38-1.png'], ['Ordre de réglage d’un train avant', D + 'alfa-uv2.svg'], ['inclinaison de pivot entraîne', S + 'p34-3.png'],
      ['Pivot constructeur 9°45′', D + 'var-pivot.svg'], ['Carrossage constructeur −0°30′', D + 'var-carrossage.svg'], ['gauche −0°50′, droite −0°05′', D + 'var-tirage.svg'], ['D’après ce relevé d’angles (valeurs constructeur', D + 'var-triangle.svg'],
      ['couronne menante (Zc = 60 dents)', D + 'train-c900-p-fixe.svg'], ['Planétaire menant (Zp = 20)', D + 'train-p1200-c-fixe.svg'], ['Porte-satellites fixe, planétaire menant (Zp = 30)', D + 'train-p900-ps-fixe.svg'],
      ['Usure lisse sur le côté intérieur', D + 'usure-lisse-int.svg'], ['DOT 0519', D + 'pneu-dot0519.svg'],
      ['144 km/h ; g = 10', D + 'arret-144.svg'], ['216 km/h', D + 'arret-216.svg'], ['à 72 km/h', D + 'arret-72.svg'], ['Si la vitesse double', D + 'arret-vitesse.svg']
    ];
    var sol = {
      'train-c600-p-fixe.svg': 'willis-c600-p-fixe.svg', 'train-p1200-ps-fixe.svg': 'willis-p1200-ps-fixe.svg', 'train-c900-p-fixe.svg': 'willis-c900-p-fixe.svg',
      'train-p1200-c-fixe.svg': 'willis-p1200-c-fixe.svg', 'train-p900-ps-fixe.svg': 'willis-p900-ps-fixe.svg'
    };
    var s = subj('dsft');
    s.questions.forEach(function (q) {
      if (q.img === 'tableau-alfa.jpg') q.img = D + 'alfa-uv2.svg';
      if (q.img === 'pneumatique-dsft-theorique.jpg') q.img = D + 'schema-pneu-theorique.jpg';
      if (q.img === 'willis.png') q.img = null;
      if (!q.img) {
        for (var i = 0; i < map.length; i++) if (q.q.indexOf(map[i][0]) >= 0) { q.img = map[i][1]; break; }
      }
      var m = q.img && q.img.match(/dsft\/(train-[\w-]+\.svg)/);
      if (m && sol[m[1]] && q.e.indexOf('willis-') < 0) q.e += '<br><b>Méthode graphique de Willis :</b><br><img src="img/dsft/' + sol[m[1]] + '" alt="Diagramme de Willis" style="max-width:100%;background:#fff">';
    });
    s.questions = s.questions.filter(function (q) { return !!q.img; });   // pas de QCM sans image en DSFT
    s.lessons.forEach(function (l) {
      if (!l.images) return;
      l.images.forEach(function (im) {
        if (im.src === 'tableau-alfa.jpg') { im.src = D + 'alfa-uv2.svg'; im.cap = 'Tableau ALFA — relevés d’angles'; }
        if (im.src === 'pneumatique-dsft-theorique.jpg') { im.src = D + 'schema-pneu-theorique.jpg'; }
        if (im.src === 'willis.png') { im.src = D + 'willis-p1200-ps-fixe.svg'; im.cap = 'Méthode graphique de Willis : planétaire menant 1 200 tr/min, porte-satellites bloqué → couronne −900 tr/min (marche arrière)'; }
      });
    });
    var w = REV.lessonById['dsft/willis'];
    if (w) w.images = [{ src: D + 'train-c600-p-fixe.svg', cap: 'Train épicycloïdal : couronne, planétaire, satellites, porte-satellites' },
      { src: D + 'willis-c600-p-fixe.svg', cap: 'Couronne menante 600 tr/min, planétaire fixe → porte-satellites 400 tr/min (avant démultiplié)' },
      { src: D + 'willis-p1200-ps-fixe.svg', cap: 'Planétaire menant 1 200 tr/min, porte-satellites fixe → couronne −900 tr/min (marche arrière)' },
      { src: D + 'willis-p1200-c-fixe.svg', cap: 'Planétaire menant 1 200 tr/min, couronne fixe → porte-satellites 300 tr/min (grande démultiplication)' }];
  })();

  /* ---------- Textes : pas de mention « remplacement », pas de commentaire de source ---------- */
  var SRCW = /fiche|corrigé|formateur|livre|confirmer|OVI|Uv1|dossier|erreur de report/i;
  function ov(t) {
    if (typeof t !== 'string' || t.indexOf('<svg') >= 0) return t;
    return t.normalize('NFD').replace(/\(([^()]{1,40})\)‾/g, '<span class="ov">$1</span>').replace(/([A-Za-z0-9])̄/g, '<span class="ov">$1</span>').normalize('NFC');
  }
  REV.subjects.forEach(function (s) {
    s.questions.forEach(function (q) {
      q.q = q.q.replace(/\(question de remplacement[^)]*\)\s*/gi, '').replace(/\(Données reprises du corrigé : ([^)]*)\)/g, '($1)');
      if (q.w && SRCW.test(q.w)) delete q.w;
      q.q = ov(q.q); q.c = q.c.map(ov); q.e = ov(q.e); if (q.r) q.r = ov(q.r);
    });
    s.lessons.forEach(function (l) {
      l.html = ov(l.html);
      if (l.retenir) l.retenir = l.retenir.map(ov);
      if (l.memo && l.memo.points) l.memo.points = l.memo.points.map(ov);
      if (l.memo && l.memo.cle) l.memo.cle = ov(l.memo.cle);
    });
  });
  // index des questions
  REV.subjects.forEach(function (s) {
    s.questions.forEach(function (q) { REV.qById[q.id] = q; });
  });
})();
