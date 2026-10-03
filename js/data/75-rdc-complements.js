/* RDC — questions complémentaires (réponses du stagiaire et du formateur), ajoutées sans modifier les questions existantes. */
(function () {
  var S = 'Questions RDC complémentaires (cours du formateur)';
  var Q = [
    ['Si on n’a pas de RDC, que peut-on faire ?', ['Faire sortir le véhicule si le besoin est urgent, ponctuel et nécessaire', 'Faire sortir le véhicule par le chef d’atelier dans tous les cas', 'Rien : le véhicule ne sort jamais', 'Demander au prestataire RIP de le contrôler'], 'Exception seulement : besoin urgent, ponctuel et nécessaire (le contrôle peut alors être fait par un FS2 MOBTER). Hors urgence, quand le RDC est simplement fermé, on attend qu’il soit ouvert.'],
    ['Un GBC doit rentrer en atelier pour un COS, une visite station, une RIP et une visite NTI1. Dans quel ordre logique ?', ['Visite NTI1, visite station, COS, et on termine par la RIP', 'RIP, NTI1, station, COS', 'COS, RIP, NTI1, station', 'Visite station, NTI1, RIP, COS'], 'On remet le véhicule en état (NTI1), on fait la station, puis le COS ; la RIP (réparation dans l’industrie privée) vient en dernier.'],
    ['Qui planifie les séances d’instruction sur l’entretien des matériels ?', ['Le BOI', 'Le RDC', 'La CDM', 'Le chef d’atelier'], 'Le BOI (bureau opérations instruction) planifie l’instruction.'],
    ['Qui décide des opérations préventives à effectuer sur un véhicule ?', ['La conduite de la maintenance (CDM)', 'Le RDC', 'Le chef d’atelier', 'Le conducteur'], 'La conduite de la maintenance pilote la maintenance, dont le préventif.'],
    ['Un véhicule d’un PTAC inférieur à 3,5 t doit effectuer un COS tous les :', ['24 mois', '12 mois', '6 mois', '36 mois'], 'PTAC < 3,5 t : COS tous les 24 mois (au-dessus de 3,5 t : tous les ans ; bus : tous les 6 mois).'],
    ['Quelles sont les différentes opérations de contrôle sur un véhicule ?', ['CT, CTVC, COS, VP + OS, DIT chapitre 4', 'Seulement le COS', 'NTI1, NTI2, NTI3', 'BIMT et MICAM uniquement'], 'Contrôle technique, contrôle technique volontaire complet, COS, visite périodique avec opérations de sécurité, et chapitre 4 (contrôle) du DIT.'],
    ['Visite station-service SANS vidange : comment l’opération est-elle inscrite dans le chapitre préventif du MAT 10 004 ?', ['En noir', 'En rouge', 'En vert', 'Au crayon à papier'], 'Avec une vidange : en rouge. Sans vidange : en noir.'],
    ['Où doit-on enregistrer les FT (faits techniques) ?', ['Dans le chapitre des FT', 'Dans le chapitre préventif', 'Sur la fiche de visite', 'Dans le MAT 1015'], 'Chaque fait technique est inscrit dans son chapitre dédié.'],
    ['Lors d’une visite périodique ayant valeur de COS (VP + OS), qui enregistre le contrôle dans le MAT 10 004 ?', ['Le chef d’atelier', 'Le RDC', 'La CDM', 'Le prestataire'], 'C’est le chef d’atelier (l’atelier qui a réalisé la visite) qui l’enregistre.'],
    ['Quels sont les deux types de COS ?', ['Générique et spécifique', 'Annuel et semestriel', 'Civil et militaire', 'Préventif et correctif'], 'AQA 03 : le COS MAT 4485 générique et ses dérivés spécifiques à certains véhicules.']
  ];
  var lesson = { id: 'rdc-complements', title: 'Questions RDC complémentaires',
    html: '<h3>Énoncé</h3><p>Questions RDC complémentaires du cours, avec leur réponse.</p><div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>' +
      Q.map(function (q) { return '<tr><td>' + q[0] + '</td><td><b>' + q[1][0] + '</b></td></tr>'; }).join('') + '</table></div>',
    retenir: ['Pas de RDC : sortie seulement si besoin urgent, ponctuel et nécessaire.', 'Ordre : NTI1 → station → COS → RIP.', 'PTAC < 3,5 t : COS tous les 24 mois.', 'Station sans vidange : en noir ; avec vidange : en rouge.', 'COS générique et spécifique.'] };
  function qs(l) { return Q.map(function (q) { return { l: l, q: q[0], c: q[1], e: q[2], src: S }; }); }
  REV.addExercises('mcot', { lessons: [lesson], questions: qs('rdc-complements') });
  REV.addExercises('uv3', { lessons: [], questions: qs('rdc') });
})();
