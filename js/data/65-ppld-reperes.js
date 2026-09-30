/* PPLD — Rôle et désignation des repères sur les fiches RMU, Treuils + push pull et section d’entrée (bloc CETOP).
   Désignations transmises par le stagiaire avec les fiches ; rôles tirés du cours PPLD (bloc CETOP, RSQ 240, RMU, grue). */
(function () {
  var I = 'ppld/';
  var F = {
    rmu: { img: I + 'fiche-rmu.jpg', nom: 'RMU' },
    treuil: { img: I + 'fiche-treuil-pushpull.jpg', nom: 'Treuils + push pull' },
    cetop: { img: I + 'fiche-entree-cetop.jpg', nom: 'Section d’entrée (bloc CETOP)' }
  };
  /* [fiche, repère, désignation, rôle (ou null si seule la désignation est demandée), demander la désignation] */
  var R = [
    ['rmu', 1, 'Vanne de mise à flot', 'En tracté-tiré en terrain accidenté, une fois broché, elle libère le vérin correcteur d’assiette pour qu’il suive les mouvements ; il faut la refermer avant de débrocher.', true],
    ['rmu', 2, 'Soupape de freinage', 'Maîtriser le mouvement du vérin de corps de flèche face à une charge entraînante et le maintenir en position en cas de chute de pression (rupture de flexible).', true],
    ['rmu', 3, 'Réducteur de pression 3 voies', 'Donner la pression de pilotage des tiroirs (25 b) et amortir leurs déplacements (pas de pics de pression).', true],
    ['rmu', 4, 'Gicleur de déséquilibre', 'Déséquilibrer l’étage principal (balance d’entrée) quand la tête pilote s’ouvre en butée, pour qu’il s’ouvre et évacue le débit.', true],
    ['rmu', 5, 'Balance d’entrée', null, true],
    ['rmu', 6, 'Tête pilote', null, true],
    ['rmu', 7, 'Distributeur 4/3 LS centre fermé, à action progressive, commande électro-hydraulique proportionnelle et commande manuelle, rappel par ressort', 'Diriger l’huile vers la sortie A ou B du récepteur et en doser le débit (donc la vitesse) proportionnellement à la commande ; au neutre, centre fermé, le récepteur est isolé ; en travail, il renvoie la pression de charge à la ligne LS.', true],
    ['rmu', 8, 'LPS (limiteur de pression secondaire)', 'Protéger une sortie (A ou B) d’un récepteur à une pression inférieure à la pression maxi : en butée, pression de service = LPS + 30 b.', true],
    ['rmu', 13, 'Bloc de freinage', 'Maîtriser la rentrée du vérin correcteur d’assiette (qui abaisse le télescope) et le bloquer en cas de chute de pression.', true],
    ['treuil', 9, 'Électrovanne de fin de course', 'Couper l’alimentation du récepteur quand une limite est atteinte (5 spires mini sur le tambour, secteur de travail, abaques) ; elle est commandée par le CEC.', true],
    ['treuil', 10, 'Limiteur de pression à commande pilotée principal', null, true],
    ['treuil', 11, 'Électro by-pass CETOP', 'Vanne de sécurité en amont du bloc CETOP : pilotée (sélecteur sur STAB), elle autorise l’alimentation des stabilisateurs ; non pilotée, aucune fonction du bloc ne peut être commandée.', true],
    ['cetop', 1, 'Balance d’entrée', null, false],
    ['cetop', 2, 'Tête pilote', null, false],
    ['cetop', 3, 'Bouchon', null, false],
    ['cetop', 4, 'Gicleur de déséquilibre', null, false],
    ['cetop', 5, 'Limiteur de débit réglable double effet, sensible à la viscosité', null, false],
    ['cetop', 6, 'Gicleur LS', 'Créer une différence de pression (ΔP) au neutre pour obtenir la pression de stand-by.', true],
    ['cetop', 7, 'Solénoïde de décharge LS', 'Faire monter la pression LS en travail (il est piloté dès qu’on touche aux manipulateurs des stabilisateurs) et décharger la ligne LS au neutre.', true]
  ];

  function others(pool, good, i) { var o = pool.filter(function (x) { return x !== good; }); var out = []; for (var k = 0; k < 3 && k < o.length; k++) out.push(o[(i + k * 2) % o.length]); return out; }
  function build(lesson) {
    var qs = [];
    var desPool = function (f) { return R.filter(function (r) { return f === 'cetop' ? r[0] === 'cetop' : r[0] !== 'cetop'; }).map(function (r) { return r[2]; }).filter(function (x, i, a) { return a.indexOf(x) === i; }); };
    var rolePool = R.filter(function (r) { return r[3]; }).map(function (r) { return r[3]; });
    R.forEach(function (r, i) {
      var f = F[r[0]];
      if (r[4]) qs.push({ l: lesson, img: f.img, q: f.nom + ' — repère n° ' + r[1] + ' : quelle est sa désignation ?', c: [r[2]].concat(others(desPool(r[0]), r[2], i)), e: 'Repère ' + r[1] + ' (' + f.nom + ') : ' + r[2] + '.' + (r[3] ? ' Rôle : ' + r[3] : ''), src: 'Fiches « Rôle et désignation » (PPLD)' });
      if (r[3]) qs.push({ l: lesson, img: f.img, q: f.nom + ' — repère n° ' + r[1] + ' : quel est son rôle ?', c: [r[3]].concat(others(rolePool, r[3], i)), e: 'Repère ' + r[1] + ' = ' + r[2] + '.', src: 'Fiches « Rôle et désignation » (PPLD) et cours PPLD' });
    });
    return qs;
  }
  function table(f, withRole) {
    return '<h3>' + F[f].nom + '</h3><div class="tw"><table><tr><th>N°</th><th>Désignation</th><th>Rôle</th></tr>' + R.filter(function (r) { return r[0] === f; }).map(function (r) { return '<tr><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + (r[3] || '—') + '</td></tr>'; }).join('') + '</table></div>';
  }
  function lesson(id) {
    return { id: id, title: 'Rôle et désignation des repères (fiches)',
      images: [{ src: F.rmu.img, cap: 'Fiche RMU : repères 1 à 8 et 13' }, { src: F.treuil.img, cap: 'Fiche Treuils + push pull : repères 9 à 11' }, { src: F.cetop.img, cap: 'Section d’entrée (bloc CETOP) : repères 1 à 7' }],
      html: '<p>Les repères des fiches à connaître : <b>désignation</b> de chaque repère, et <b>rôle</b> des repères demandés à l’examen (RMU : 1, 2, 3, 4, 7, 8 et 13 ; treuils : 9 et 11 ; section d’entrée : 6 et 7).</p>' + table('rmu') + table('treuil') + table('cetop'),
      retenir: ['RMU : 3 = réducteur 3 voies 25 b (pilotage des tiroirs) ; 4 = gicleur de déséquilibre ; 5 + 6 = balance d’entrée + tête pilote.', 'Gicleur LS → stand-by ; solénoïde de décharge LS → monte LS en travail, décharge au neutre.', 'By-pass CETOP piloté (STAB) = stabilisateurs alimentés.'] };
  }

  REV.addLessons('ppld', 'fonctions', [lesson('reperes')]);
  REV.addExercises('ppld', { lessons: [], questions: build('reperes') });
  REV.addLessons('uv3', 'ppld', [lesson('ppld-reperes')]);
  REV.addExercises('uv3', { lessons: [], questions: build('ppld-reperes') });
})();
