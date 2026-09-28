/* Dépollution : essence ou diesel ? Limité à ce qui est vu en cours et aux tests (catalyseurs, FAP, EGR, SCR),
   confirmé par le livre Motorisation Tome 1, chapitre 12 « La pollution automobile ».
   + Réseau CAN : état logique (théorique) ou mesure au voltmètre / ohmmètre sur la prise OBD (notes + AGA 01). */
(function () {
  var SRC = 'Cours dépollution (confirmé par Motorisation Tome 1, ch. 12)';

  REV.extendLesson('moteur/depollution', {
    html: `
<h3>Essence ou diesel : ne pas confondre</h3>
<div class="tw"><table class="cmp"><tr><th></th><th>⛽ ESSENCE</th><th>🛢️ DIESEL</th></tr>
<tr><td>Mélange</td><td>Richesse <b>1</b></td><td>Toujours <b>pauvre</b> (excès d’air)</td></tr>
<tr><td>Catalyseur</td><td><b>3 voies</b> : CO, HC <b>et NOx</b></td><td><b>D’oxydation</b> : CO et HC seulement</td></tr>
<tr><td>Particules</td><td>—</td><td><b>FAP</b> : filtre puis brûle les suies (≈ 550 °C)</td></tr>
<tr><td>NOx</td><td>EGR</td><td>EGR + <b>SCR (AdBlue)</b></td></tr></table></div>
<p><b>Commun aux deux : l’EGR.</b> La recirculation des gaz par l’EGR se fait à partir de ≈ <b>1 300 °C</b> ; elle fait baisser la température de combustion, donc les NOx (le livre : N₂ + O₂ → NOx au-delà de 2 000 °C).</p>`,
    retenir: ['Essence = catalyseur 3 voies (CO, HC, NOx).', 'Diesel = catalyseur d’oxydation (CO, HC) + FAP (suies) + SCR/AdBlue (NOx).', 'EGR : essence ET diesel ; recirculation à partir de ≈ 1 300 °C.'],
    pieges: ['Le FAP et l’AdBlue n’existent pas sur un moteur essence.', 'Catalyseur d’oxydation (diesel) : pas de NOx. Seul le 3 voies (essence) traite les NOx.']
  });

  var qs = [
    { q: 'Un catalyseur 3 voies équipe :', c: ['Le moteur essence', 'Le moteur diesel', 'Les deux indifféremment'], e: 'Le 3 voies traite CO, HC et NOx ; il fonctionne à richesse 1, donc sur l’essence. Le diesel (toujours pauvre) a un catalyseur d’oxydation.', r: 'Essence = 3 voies · diesel = oxydation.' },
    { q: 'Quels polluants traite le catalyseur 3 voies (essence) ?', c: ['CO, HC et NOx', 'CO et HC seulement', 'Les particules (suies)', 'Les NOx seulement'], e: 'Il oxyde CO et HC et réduit les NOx.' },
    { q: 'Quels polluants traite le catalyseur d’oxydation (diesel) ?', c: ['CO et HC', 'CO, HC et NOx', 'Les suies', 'Les NOx seulement'], e: 'En diesel, les NOx sont traités par l’EGR et la SCR (AdBlue), pas par le catalyseur d’oxydation.' },
    { q: 'Pourquoi le catalyseur 3 voies ne convient-il pas au diesel ?', c: ['Il fonctionne à richesse 1, alors que le diesel fonctionne toujours en mélange pauvre', 'Parce que le diesel ne rejette pas de CO', 'Parce qu’il bouche le FAP'], e: 'Mélange pauvre = excès d’oxygène : les NOx ne sont plus traités par le catalyseur.' },
    { q: 'Le filtre à particules (FAP) équipe :', c: ['Le moteur diesel', 'Le moteur essence', 'Les deux'], e: 'Les suies viennent du diesel ; le FAP les filtre puis les brûle (régénération ≈ 550 °C).' },
    { q: 'La SCR (AdBlue) équipe :', c: ['Le moteur diesel', 'Le moteur essence', 'Les deux'], e: 'Elle réduit les NOx du diesel dans l’échappement.' },
    { q: 'L’EGR (recyclage des gaz d’échappement) équipe :', c: ['Les moteurs essence ET diesel', 'Le diesel seulement', 'L’essence seulement'], e: 'Commun aux deux : il réduit les NOx en diminuant la température de combustion.' },
    { q: 'Quel dispositif est commun aux moteurs essence et diesel ?', c: ['L’EGR', 'Le FAP', 'La SCR (AdBlue)', 'Le catalyseur d’oxydation'], e: 'Essence : catalyseur 3 voies. Diesel : catalyseur d’oxydation, FAP, SCR. Les deux : EGR.' },
    { q: 'À partir de quelle température se fait la recirculation des gaz par l’EGR ?', c: ['≈ 1 300 °C', '≈ 550 °C', '≈ 180 °C', '≈ 250 °C'], e: 'La recirculation se fait à partir de ≈ 1 300 °C pour faire baisser la température de combustion et limiter les NOx. (550 °C = régénération du FAP ; 180 °C = catalyseur pour la SCR.)' }
  ];
  REV.addExercises('moteur', { lessons: [], questions: qs.map(function (q) { q.l = 'depollution'; q.src = SRC; return q; }) });

  var F = REV.formulaires;
  if (F && F.moteur) F.moteur.push({ t: '🌿 Dépollution : essence ou diesel ?', html: `
<div class="tw"><table><tr><th>⛽ Essence</th><th>🛢️ Diesel</th></tr>
<tr><td>Catalyseur <b>3 voies</b> (CO, HC, NOx)</td><td>Catalyseur d’<b>oxydation</b> (CO, HC)</td></tr>
<tr><td>—</td><td><b>FAP</b> ≈ 550 °C · <b>SCR / AdBlue</b> (NOx)</td></tr>
<tr><td colspan="2" style="text-align:center">Les deux : <b>EGR</b> (recirculation à partir de ≈ 1 300 °C)</td></tr></table></div>
<p>💡 « L’essence a <b>3 voies</b> ; le diesel <b>s’encrasse</b> (FAP) et <b>boit de l’AdBlue</b>. L’EGR, tout le monde l’a. »</p>` });

  /* ---------- Réseau CAN : état logique ou mesure sur la prise OBD ---------- */
  REV.extendLesson('equip/can', {
    html: `
<h3>CAN H / CAN L : état logique ou mesure ?</h3>
<p>Ne pas mélanger les <b>états logiques</b> (valeurs théoriques du bus) et ce qu’on <b>lit au voltmètre</b> sur la prise OBD : le voltmètre ne suit pas les bits qui changent très vite, il affiche une valeur entre les deux états.</p>
<div class="tw"><table class="cmp"><tr><th></th><th>État logique (théorique)</th><th>Mesure sur la prise OBD</th></tr>
<tr><td>CAN H</td><td>3,5 V = <b>0</b> (dominant)<br>2,5 V = <b>1</b> (récessif)</td><td><b>Voltmètre</b>, broche <b>6</b> ↔ broche <b>4 ou 5</b> (masse) : <b>2,4 à 3,2 V</b></td></tr>
<tr><td>CAN L</td><td>2,5 V = <b>1</b> (récessif)<br>1,5 V = <b>0</b> (dominant)</td><td><b>Voltmètre</b>, broche <b>14</b> ↔ broche <b>4 ou 5</b> (masse) : <b>1,8 à 2,6 V</b></td></tr>
<tr><td>Entre H et L</td><td>Dominant : H − L = 2 V<br>Récessif : H − L = 0 V</td><td><b>Voltmètre</b>, broche 14 ↔ broche 6 : <b>0,5 à 0,7 / 0,9 V</b> ; au-delà de 0,9 V ou 1 V = <b>réseau saturé</b></td></tr>
<tr><td>Résistance</td><td>2 × 120 Ω (une à chaque extrémité)</td><td><b>Ohmmètre, batterie débranchée</b>, broche 6 ↔ broche 14 : <b>60 Ω</b> (60 ± 5 Ω)</td></tr></table></div>
<ul><li>Prise OBD : <b>6 = CAN H</b> · <b>14 = CAN L</b> · <b>4 et 5 = masse</b> · <b>16 = +BAT</b>.</li>
<li>Tension d’alimentation : <b>5 V</b> · courant de sortie : <b>25 à 50 mA sur 60 Ω</b> · CAN LS = confort habitacle.</li></ul>`,
    retenir: ['Au voltmètre sur l’OBD : 6/masse (4 ou 5) = 2,4 à 3,2 V ; 14/masse = 1,8 à 2,6 V ; 14/6 = 0,5 à 0,9 V.', 'États logiques : H 3,5 V = 0 / 2,5 V = 1 ; L 2,5 V = 1 / 1,5 V = 0.', 'Ohmmètre batterie débranchée, 6-14 : 60 Ω.']
  });
  var cs = 'Notes de cours multiplexage (confirmé par AGA 01)';
  var can = [
    { q: 'Au voltmètre, entre la broche 14 (CAN L) et la broche 4 ou 5 (masse) de la prise OBD, on doit trouver :', c: ['Entre 1,8 et 2,6 V', 'Entre 2,4 et 3,2 V', 'Entre 0,5 et 0,9 V', '60 Ω'], e: 'Mesure réelle au voltmètre sur CAN L : 1,8 à 2,6 V. Ce ne sont pas les états logiques (1,5 V = 0 ; 2,5 V = 1) : le voltmètre affiche une valeur entre les deux.', r: 'CAN L / masse (14 ↔ 4 ou 5) = 1,8 à 2,6 V.' },
    { q: 'Au voltmètre, entre la broche 6 (CAN H) et la broche 4 ou 5 (masse) de la prise OBD, on doit trouver :', c: ['Entre 2,4 et 3,2 V', 'Entre 1,8 et 2,6 V', 'Exactement 3,5 V', 'Exactement 5 V'], e: 'Mesure réelle au voltmètre sur CAN H : 2,4 à 3,2 V. Les états logiques sont 3,5 V (0) et 2,5 V (1).', r: 'CAN H / masse (6 ↔ 4 ou 5) = 2,4 à 3,2 V.' },
    { q: 'Au voltmètre, entre la broche 14 (CAN L) et la broche 6 (CAN H), on trouve 1,2 V. Diagnostic ?', c: ['Réseau saturé (au-delà de 0,9 V ou 1 V)', 'Réseau normal', 'Résistance de terminaison coupée', 'Batterie déchargée'], e: 'Normal : 0,5 à 0,7 / 0,9 V entre H et L. Au-delà de 0,9 V ou 1 V : réseau saturé.' },
    { q: 'État logique : sur le fil CAN L, 1,5 V correspond à…', c: ['Un 0 (niveau dominant)', 'Un 1 (niveau récessif)', 'Un défaut du bus'], e: 'CAN L : 2,5 V = 1 (récessif) ; 1,5 V = 0 (dominant). C’est une valeur théorique, pas une mesure au voltmètre.' },
    { q: 'État logique : sur le fil CAN H, 3,5 V correspond à…', c: ['Un 0 (niveau dominant)', 'Un 1 (niveau récessif)', 'Un défaut du bus'], e: 'CAN H : 3,5 V = 0 (dominant) ; 2,5 V = 1 (récessif).' },
    { q: 'Comment mesure-t-on les 60 Ω de la ligne de bus CAN ?', c: ['À l’ohmmètre, batterie débranchée, entre les broches 6 et 14 de la prise OBD', 'Au voltmètre, contact mis, entre les broches 6 et 16', 'À l’ohmmètre, moteur tournant, entre les broches 4 et 5', 'À l’ampèremètre sur la broche 16'], e: 'Deux résistances de terminaison de 120 Ω en parallèle = 60 Ω (60 ± 5 Ω).' },
    { q: 'Tension d’alimentation d’une interface CAN ?', c: ['5 V', '12 V', '24 V', '3,5 V'], e: 'Alimentation 5 V ; courant de sortie 25 à 50 mA sur 60 Ω.' },
    { q: 'Courant de sortie d’une interface CAN high speed (mode émission) ?', c: ['25 à 50 mA sur 60 Ω', '2 à 5 A sur 120 Ω', '1 mA sur 60 Ω', '500 mA sur 5 V'], e: 'Caractéristiques du bus CAN high speed : 25 à 50 mA sur 60 Ω, alimentation 5 V, 2 × 120 Ω.' }
  ];
  REV.addExercises('equip', { lessons: [], questions: can.map(function (q) { q.l = 'can'; q.src = cs; return q; }) });
})();
