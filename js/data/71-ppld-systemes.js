/* PPLD — définition du système débit (stabilisateurs, bloc CETOP) et du système débit/pression (équipement, RSQ 240).
   Repris du cours PPLD (régulateur 3 voies 40 L/min, Load Sensing, stand-by 30 b, DAD 320 b) et des notes de cours. */
(function () {
  function ol(a) { return '<ol class="steps">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  var html = '<h3>Système débit et système débit/pression</h3>' +
    '<p><b>Système débit</b> (stabilisateurs, bloc CETOP) : le débit envoyé aux vérins est <b>fixé</b> → la vitesse reste <b>constante quelle que soit la charge</b>. L’opérateur <b>ne ressent pas la charge</b>.</p>' +
    '<p><b>Système débit/pression</b> (équipement : grue, treuils, RMU, par le RSQ 240) : la pompe Load Sensing <b>adapte son débit et sa pression</b> au besoin du récepteur, grâce aux <b>blocs proportionnels du RSQ 240</b>. L’opérateur <b>ressent la charge</b> : un changement de vitesse est visible.</p>' +
    '<h3>Système débit (stabilisateurs)</h3><p><b>🎯 Rôle :</b> donner une vitesse constante aux vérins de stabilisateurs, quelle que soit la charge.</p><p><b>⚙️ Fonctionnement :</b></p>' +
    ol(['On actionne un stabilisateur : le solénoïde de décharge LS est piloté, la ligne LS monte en pression et la pompe débite.', 'L’huile passe par le <b>régulateur de débit 3 voies</b>, placé à l’entrée du bloc CETOP.', 'Il maintient une <b>ΔP constante</b> à ses bornes : Q = K × S × √ΔP.', 'ΔP constante → débit constant (<b>40 L/min</b>) → vitesse constante.', 'Charge lourde ou légère : le débit ne change pas, donc on ne ressent pas la charge.', 'En butée : la pression monte jusqu’au limiteur piloté du CETOP (<b>220 b</b>) et le débit part en chaleur.']) +
    '<h3>Système débit/pression (équipement RSQ 240)</h3><p><b>🎯 Rôle :</b> ne donner que le débit et la pression dont le récepteur a besoin (moins de chaleur).</p><p><b>⚙️ Fonctionnement :</b></p>' +
    ol(['Au neutre : la pompe reste en <b>stand-by à 30 b</b>, sans débit (cylindrée mini).', 'On actionne la commande : le distributeur renvoie la pression de la charge (<b>LS</b>) à la pompe.', 'La pompe règle sa pression : <b>pression de service = LS + 30 b</b>.', 'Elle donne le débit demandé par l’ouverture du tiroir.', 'La pression suit la charge : l’opérateur ressent la charge, un changement de vitesse est visible.', 'En butée : la pression est limitée (LPS + 30 b, ou DAD 320 b + 30 b = <b>350 b</b> maxi).']) +
    '<div class="tw"><table><tr><th></th><th>Système débit</th><th>Système débit/pression</th></tr>' +
    '<tr><td>Où</td><td>Stabilisateurs (bloc CETOP)</td><td>Grue, treuils, RMU (RSQ 240)</td></tr>' +
    '<tr><td>Ce qui commande</td><td>Régulateur de débit 3 voies (40 L/min)</td><td>Pompe Load Sensing (LS + 30 b)</td></tr>' +
    '<tr><td>Vitesse</td><td>Constante quelle que soit la charge</td><td>Un changement de vitesse est visible</td></tr>' +
    '<tr><td>Ressenti de charge</td><td>Non</td><td>Oui</td></tr></table></div>';
  var retenir = ['Système débit = stabs (CETOP) : régulateur 3 voies 40 L/min, ΔP constante → vitesse constante, pas de ressenti de charge.', 'Système débit/pression = équipement (RSQ 240) : la pompe LS adapte débit et pression (LS + 30 b), ressenti de charge.'];
  REV.extendLesson('ppld/generation', { html: html, retenir: retenir });
  REV.extendLesson('uv3/ppld', { html: html, retenir: retenir });
  var Q = [
    ['Définition du système débit (PPLD) ?', ['Le débit envoyé aux récepteurs est fixé : vitesse constante quelle que soit la charge', 'La pompe adapte son débit et sa pression au besoin', 'La pression est fixée, le débit varie avec la charge', 'Le débit est coupé en butée par le DAD']],
    ['Définition du système débit/pression (PPLD) ?', ['La pompe Load Sensing adapte son débit et sa pression au besoin du récepteur (LS + 30 b)', 'Le débit est fixé à 40 L/min par un régulateur 3 voies', 'La pression est toujours de 350 b', 'La pompe débite toujours 100 L/min']],
    ['Quel élément fait du circuit des stabilisateurs un système débit ?', ['Le régulateur de débit 3 voies (40 L/min) à l’entrée du bloc CETOP', 'Le DAD de la pompe', 'Le réducteur de pression 25 b', 'Le solénoïde de décharge LS']],
    ['Quels équipements fonctionnent en système débit/pression ?', ['La grue, les treuils et le RMU (distributeur RSQ 240)', 'Les stabilisateurs (bloc CETOP)', 'Uniquement les treuils', 'Aucun']],
    ['Comment le régulateur de débit 3 voies garde-t-il une vitesse constante ?', ['Il maintient une ΔP constante à ses bornes : Q = K × S × √ΔP', 'Il limite la pression à 220 b', 'Il coupe la pompe', 'Il augmente le stand-by']]
  ];
  function qs(l) { return Q.map(function (q) { return { l: l, q: q[0], c: q[1] }; }); }
  REV.addExercises('ppld', { lessons: [], questions: qs('generation') });
  REV.addExercises('uv3', { lessons: [], questions: qs('ppld') });
})();
