/* PPLD : chaque question sur un fonctionnement affiche le schéma de la phase concernée (au lieu d'une page de calcul ou de rien).
   On ne remplace que les questions sans image ou illustrées par une page de calculs / de graphes. */
(function () {
  var R = [
    [/stabilisateurs au neutre/i, 'stabs-neutre'], [/RMU et grue au neutre/i, 'rmu-neutre'], [/stabilisateurs en butée/i, 'stabs-butee'],
    [/télescopage du RMU en butée/i, 'rmu-butee'], [/grue en fin de course|grue : rôle des électrovannes de fin de course/i, 'grue-fin-de-course'],
    [/récepteur alimenté à 40 L\/min|régulateur de débit placé avant le bloc des stabilisateurs|formule de la puissance hydraulique/i, 'stabs-fonctionnement'],
    [/définition du système débit \(|élément fait du circuit des stabilisateurs un système débit|régulateur de débit 3 voies garde/i, 'stabs-fonctionnement'],
    [/définition du système débit\/pression|limiteur de débit du télescopage/i, 'rmu-fonctionnement'],
    [/équipements fonctionnent en système débit\/pression|bloc distributeur commande les stabilisateurs|sélecteur de circuit sur le retour LS/i, 'schema-principe'],
    [/gicleur anti-pompage/i, 'pompe-phases'],
    [/soupapes de freinage du corps de flèche|bloc de freinage du correcteur d’assiette|vannes de mise à flot/i, 'fiche-rmu'],
    [/désignation et rôle d’un LPS/i, 'rsq-travail'], [/limiteur de pression à commande pilotée de la section d’entrée du RSQ 240/i, 'rsq-entree'],
    [/arrêt d’urgence de la télécommande|voyant de réarmement reste allumé/i, 'elec-arret-urgence'], [/pilote l’électrovanne by-pass du RSQ 240 ou du CETOP/i, 'schema-auto-maintien']
  ];
  Object.keys(REV.qById).forEach(function (id) {
    var q = REV.qById[id];
    if (q.subject !== 'ppld' && !(q.subject === 'uv3' && /ppld/.test(q.lkey))) return;
    if (q.img && !/energie|graphes/.test(q.img)) return;
    for (var i = 0; i < R.length; i++) if (R[i][0].test(q.q)) { q.img = 'ppld/' + R[i][1] + '.jpg'; return; }
  });
})();
