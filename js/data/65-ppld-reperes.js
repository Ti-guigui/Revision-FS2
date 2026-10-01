/* PPLD — Rôle et désignation des repères sur les fiches RMU, Treuils + push pull et section d’entrée (bloc CETOP).
   Désignations transmises par le stagiaire avec les fiches ; rôles tirés du cours PPLD (bloc CETOP, RSQ 240, RMU, grue). */
(function () {
  var I = 'ppld/';
  var F = {
    rmu: { img: I + 'fiche-rmu.jpg', nom: 'RMU' },
    treuil: { img: I + 'fiche-treuil-pushpull.jpg', nom: 'Treuils + push pull' },
    cetop: { img: I + 'fiche-entree-cetop.jpg', nom: 'Section d’entrée (bloc CETOP)' }
  };
  /* [fiche, repère, désignation, rôle court (ou null si seule la désignation est demandée), demander la désignation, étapes de fonctionnement] */
  var R = [
    ['rmu', 1, 'Vanne de mise à flot', 'Libérer le vérin correcteur d’assiette en tracté-tiré.', true,
      ['Le véhicule est broché en tracté-tiré, en terrain accidenté.', 'On ouvre la vanne : le vérin correcteur d’assiette n’est plus bloqué.', 'Le vérin suit librement les mouvements du véhicule remorqué.', 'On referme la vanne avant de débrocher.']],
    ['rmu', 2, 'Soupape de freinage', 'Retenir la charge du vérin de corps de flèche.', true,
      ['La charge pousse le vérin (charge entraînante).', 'La soupape freine : le vérin ne descend pas plus vite que le débit envoyé.', 'Si un flexible casse, la soupape reste fermée : le vérin est maintenu.']],
    ['rmu', 3, 'Réducteur de pression 3 voies', 'Fournir la pression de pilotage des tiroirs (25 b).', true,
      ['Il reçoit la pression du circuit.', 'Il la réduit à 25 b.', 'Ces 25 b pilotent les tiroirs des distributeurs.', 'Il amortit les déplacements des tiroirs : pas de pics de pression.']],
    ['rmu', 4, 'Gicleur de déséquilibre', 'Faire ouvrir la balance d’entrée (étage principal) en butée.', true,
      ['En butée, la tête pilote s’ouvre.', 'De l’huile passe par le gicleur : une différence de pression se crée.', 'La balance d’entrée est déséquilibrée et s’ouvre.', 'Elle évacue le débit à la bâche.']],
    ['rmu', 5, 'Balance d’entrée', null, true, null],
    ['rmu', 6, 'Tête pilote', null, true, null],
    ['rmu', 7, 'Distributeur 4/3 LS centre fermé, à action progressive, commande électro-hydraulique proportionnelle et commande manuelle, rappel par ressort', 'Diriger l’huile vers A ou B et doser la vitesse du récepteur.', true,
      ['Au neutre (centre fermé) : le récepteur est isolé, rien ne bouge.', 'On actionne la commande : le tiroir se déplace.', 'L’huile part vers la sortie A ou B.', 'Plus on actionne, plus le débit est grand : plus le récepteur va vite.', 'Le distributeur renvoie la pression de la charge sur la ligne LS (vers la pompe).', 'On relâche : le ressort ramène le tiroir au neutre.']],
    ['rmu', 8, 'LPS (limiteur de pression secondaire)', 'Limiter la pression d’une sortie (A ou B) d’un récepteur.', true,
      ['La pression monte dans la sortie (récepteur en butée).', 'Le LPS s’ouvre à sa valeur de tarage.', 'La pression de cette sortie ne dépasse plus le tarage.', 'Pression de service = LPS + 30 b.']],
    ['rmu', 13, 'Bloc de freinage', 'Retenir et bloquer le vérin correcteur d’assiette.', true,
      ['Le vérin correcteur rentre : le télescope s’abaisse.', 'Le bloc de freinage freine cette rentrée.', 'En cas de chute de pression, il bloque le vérin.']],
    ['treuil', 9, 'Électrovanne de fin de course', 'Couper le mouvement quand une limite est atteinte.', true,
      ['Le CEC surveille les limites : 5 spires mini sur le tambour, secteur de travail, abaques.', 'Une limite est atteinte.', 'Le CEC coupe l’électrovanne.', 'Le récepteur n’est plus alimenté : le mouvement s’arrête.']],
    ['treuil', 10, 'Limiteur de pression à commande pilotée principal', null, true, null],
    ['treuil', 11, 'Électrovanne by-pass RSQ 240', 'Autoriser l’alimentation du distributeur RSQ 240 (grue, treuils, RMU).', true,
      ['On met le sélecteur 3 voies sur MANU ou RADIO.', 'L’électrovanne by-pass RSQ 240 est pilotée.', 'L’huile arrive au RSQ 240 : on peut commander la grue, les treuils et le RMU.', 'Non pilotée : aucune fonction du RSQ 240 ne bouge.', 'À ne pas confondre : l’électrovanne by-pass CETOP alimente les stabilisateurs (sélecteur sur STAB).']],
    ['cetop', 1, 'Balance d’entrée', null, false, null],
    ['cetop', 2, 'Tête pilote', null, false, null],
    ['cetop', 3, 'Bouchon', null, false, null],
    ['cetop', 4, 'Gicleur de déséquilibre', null, false, null],
    ['cetop', 5, 'Limiteur de débit réglable double effet, sensible à la viscosité', null, false, null],
    ['cetop', 6, 'Gicleur LS', 'Obtenir la pression de stand-by au neutre.', true,
      ['Au neutre, un petit débit passe par le gicleur LS.', 'Le gicleur crée une différence de pression (ΔP).', 'Cette ΔP donne la pression de stand-by (30 b).']],
    ['cetop', 7, 'Solénoïde de décharge LS', 'Monter la pression LS en travail, la vider au neutre.', true,
      ['On touche aux manipulateurs des stabilisateurs : le solénoïde est piloté.', 'La pression LS monte : la pompe débite.', 'On relâche : le solénoïde n’est plus piloté.', 'La ligne LS est vidée : retour au stand-by.']]
  ];

  function others(pool, good, i) { var o = pool.filter(function (x) { return x !== good; }); var out = []; for (var k = 0; k < 3 && k < o.length; k++) out.push(o[(i + k * 2) % o.length]); return out; }
  function build(lesson) {
    var qs = [];
    var desPool = function (f) { return R.filter(function (r) { return f === 'cetop' ? r[0] === 'cetop' : r[0] !== 'cetop'; }).map(function (r) { return r[2]; }).filter(function (x, i, a) { return a.indexOf(x) === i; }); };
    var rolePool = R.filter(function (r) { return r[3]; }).map(function (r) { return r[3]; });
    R.forEach(function (r, i) {
      var f = F[r[0]];
      if (r[4]) qs.push({ l: lesson, img: f.img, q: f.nom + ' — repère n° ' + r[1] + ' : quelle est sa désignation ?', c: [r[2]].concat(others(desPool(r[0]), r[2], i)), e: 'Repère ' + r[1] + ' = ' + r[2] + '.', role: r[3] || null, fonct: r[5] || null, src: 'Fiches « Rôle et désignation » (PPLD)' });
      if (r[3]) qs.push({ l: lesson, img: f.img, q: f.nom + ' — repère n° ' + r[1] + ' : quel est son rôle ?', c: [r[3]].concat(others(rolePool, r[3], i)), e: 'Repère ' + r[1] + ' = ' + r[2] + '.', role: r[3], fonct: r[5] || null, src: 'Fiches « Rôle et désignation » (PPLD) et cours PPLD' });
    });
    return qs;
  }
  function table(f) {
    return '<h3>' + F[f].nom + '</h3><div class="tw"><table><tr><th>N°</th><th>Désignation</th><th>🎯 Rôle</th><th>⚙️ Fonctionnement</th></tr>' + R.filter(function (r) { return r[0] === f; }).map(function (r) { return '<tr><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + (r[3] || '—') + '</td><td>' + (r[5] ? '<ol class="steps">' + r[5].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' : '—') + '</td></tr>'; }).join('') + '</table></div>';
  }
  function lesson(id) {
    return { id: id, title: 'Rôle et désignation des repères (fiches)',
      images: [{ src: F.rmu.img, cap: 'Fiche RMU : repères 1 à 8 et 13' }, { src: F.treuil.img, cap: 'Fiche Treuils + push pull : repères 9 à 11' }, { src: F.cetop.img, cap: 'Section d’entrée (bloc CETOP) : repères 1 à 7' }],
      html: '<p>Les repères des fiches à connaître : <b>désignation</b> de chaque repère, et <b>rôle</b> des repères demandés à l’examen (RMU : 1, 2, 3, 4, 7, 8 et 13 ; treuils : 9 et 11 ; section d’entrée : 6 et 7).</p>' + table('rmu') + table('treuil') + table('cetop'),
      retenir: ['RMU : 3 = réducteur 3 voies 25 b (pilotage des tiroirs) ; 4 = gicleur de déséquilibre ; 5 + 6 = balance d’entrée + tête pilote.', 'Gicleur LS → stand-by ; solénoïde de décharge LS → monte LS en travail, décharge au neutre.', 'Électrovanne by-pass RSQ 240 (repère 11, MANU / RADIO) = grue, treuils, RMU ; électrovanne by-pass CETOP (STAB) = stabilisateurs.'] };
  }

  REV.addLessons('ppld', 'fonctions', [lesson('reperes')]);
  REV.addExercises('ppld', { lessons: [], questions: build('reperes') });
  REV.addLessons('uv3', 'ppld', [lesson('ppld-reperes')]);
  REV.addExercises('uv3', { lessons: [], questions: build('ppld-reperes') });
  /* Schéma DAD / stand-by (tiroir LS de la pompe) */
  var DAD = { images: [{ src: I + 'dad-standby.jpg', cap: 'Régulation de la pompe : tiroir LS, ressort de stand-by (30 b), DAD (320 b), gicleurs et vérin de commande du plateau' }],
    html: '<h3>Stand-by et DAD : lecture du schéma</h3><ul>' +
      '<li>Le <b>tiroir LS</b> reçoit d’un côté la <b>pression de service (PS)</b>, de l’autre la <b>pression LS</b> + le <b>ressort de stand-by (30 b)</b>.</li>' +
      '<li><b>Stand-by</b> : distributeurs au neutre, LS = 0 : dès que PS dépasse 30 b, le tiroir se déplace et envoie la pression au <b>vérin de commande</b> qui ramène le <b>plateau</b> vers la cylindrée mini : la pompe maintient <b>30 b</b> sans débiter.</li>' +
      '<li><b>Travail</b> : la pression LS (reflet de la charge) s’ajoute au ressort : le tiroir équilibre <b>PS = LS + 30 b</b> et la cylindrée s’adapte au besoin.</li>' +
      '<li><b>DAD (320 b)</b> : clapet taré sur la chambre du ressort. Récepteur en butée, LS monte jusqu’à 320 b : le DAD s’ouvre vers la bâche (≈ 1 L/min), la pression LS est plafonnée à 320 b, donc <b>PS maxi = 320 + 30 = 350 b</b> et le plateau revient en cylindrée mini (débit annulé, pression maintenue).</li>' +
      '<li><b>Gicleur 0,5 L/min</b> sur l’arrivée LS : il limite le débit qui entre dans la chambre, pour que le DAD puisse décharger la pression. <b>Gicleur anti-pompage</b> (vers la bâche) : il amortit les mouvements du tiroir pour éviter les oscillations (pompage).</li></ul>' };
  REV.extendLesson('ppld/generation', DAD);
  REV.extendLesson('uv3/ppld', DAD);
})();
