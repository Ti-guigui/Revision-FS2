/* Cahier d'exercices corrigés d'électricité générale (EMB-DTM, mise à jour 29/03/2011).
   Énoncés repris mot pour mot ; bonnes réponses = « Réponses » et « Réponses détaillées » du cahier (le cahier fait foi). */
(function () {
  var SRC = 'Cahier d’exercices corrigés d’électricité générale EMB (réponses officielles)';
  var qs = [];
  // q(leçon, image, texte, bonne, [mauvaises], développement, à retenir?, attention?)
  function q(l, img, t, good, bad, e, r, w) {
    var o = { l: l, q: t, c: [good].concat(bad), e: e, src: SRC };
    if (img) o.img = 'cah/' + img + '.png';
    if (r) o.r = r;
    if (w) o.w = w;
    qs.push(o);
  }
  var OHM = 'Loi d’Ohm : U = R × I.', NOEUD = 'Loi des nœuds : la somme des courants qui arrivent = la somme des courants qui repartent.', MAILLE = 'Loi des mailles : dans une boucle, la somme des tensions = 0 (Ug = somme des tensions des récepteurs en série).';
  var PAR = 'Deux résistances en parallèle : R = (R1 × R2) / (R1 + R2) ; en série : R = R1 + R2.';

  /* ---------- 1. Quantité d’électricité, puissance ---------- */
  var L1 = 'cah-e-quantite';
  q(L1, null, 'Ex 1 — Un accumulateur de capacité 3 Ah alimente une diode électroluminescente (LED) nécessitant un courant de 15 mA pour éclairer normalement. Pendant combien de temps peut-on faire fonctionner cette LED ?', '200 heures', ['20 heures', '45 heures'], 'Q = I × t donc t = Q / I. 15 mA = 0,015 A. t = 3 / 0,015 = <b>200 heures</b>.', 'Q (Ah) = I (A) × t (h).', 'Convertir les mA en A (÷ 1000) avant de diviser.');
  q(L1, null, 'Ex 2 a) — Une automobile est équipée d’une batterie de 60 Ah. On alimente, pendant 1h30mn, les feux de croisement qui consomment 6 A, puis l’autoradio, qui consomme 5 A, pendant 2h36mn. Quelle quantité d’électricité a été consommée par ces deux utilisations ?', '22 Ah', ['21,8 Ah', '11 Ah'], '1h30 = 90 mn / 60 = 1,5 h → Q1 = 6 × 1,5 = 9 Ah. 2h36 = 156 mn / 60 = 2,6 h → Q2 = 5 × 2,6 = 13 Ah. Q = 9 + 13 = <b>22 Ah</b>.', null, '2h36 ≠ 2,36 h : on passe tout en minutes puis on divise par 60 (= 2,6 h).');
  q(L1, null, 'Ex 2 b) — Même batterie (60 Ah). Quelle est la quantité d’électricité restante dans la batterie après ces deux utilisations ?', '38 Ah', ['22 Ah', '82 Ah'], '60 Ah − 22 Ah = <b>38 Ah</b>.');
  q(L1, null, 'Ex 2 c) — Combien de temps pourrait-on faire fonctionner (avec les 38 Ah restants) un récepteur qui consommerait 1,9 A ?', '20 heures', ['72,2 heures', '31,6 heures'], 't = Q / I = 38 / 1,9 = <b>20 heures</b>.');
  q(L1, null, 'Ex 13 a) — Un moteur de puissance P = ¼ de cheval est alimenté par une batterie de 12 V. Calculer la valeur de l’intensité débitée par la batterie.', '15,33 A', ['61,3 A', '3,8 A'], '1 cheval = 736 W → P = 736 / 4 = 184 W. I = P / U = 184 / 12 = <b>15,33 A</b>.', 'P = U × I ; 1 ch = 736 W.');
  q(L1, null, 'Ex 13 b) — Même moteur (15,33 A). Calculer la valeur de la section minimale du fil de cuivre nécessaire pour alimenter ce moteur.', 'Entre 2,5 mm² et 3 mm²', ['0,5 mm²', '15 mm²'], 'On admet 5 à 7 A par mm² de cuivre. Avec 5 A/mm² : 15,33 / 5 = 3,07 mm² ; avec 6 A/mm² : 15,33 / 6 = 2,55 mm². Donc <b>2,5 mm² &lt; S &lt; 3 mm²</b>.', 'Cuivre : 5 à 7 A par mm².');
  q(L1, null, 'Ex 14 a) — Une automobile possède une batterie de 12 V - 90 Ah. Le conducteur oublie d’éteindre ses feux de route après l’arrêt du moteur. Chaque feu possède une puissance de 50 W et les quatre veilleuses ont une puissance par veilleuse de 5 W. Calculer la valeur de l’intensité débitée par la batterie.', '10 A', ['4,6 A', '9,2 A'], 'P totale = 2 × 50 + 4 × 5 = 120 W. I = P / U = 120 / 12 = <b>10 A</b>.', null, 'Deux feux de route (50 W chacun) + quatre veilleuses.');
  q(L1, null, 'Ex 14 b) — Même installation (90 Ah, 10 A). Calculer la durée maximale de fonctionnement de cette installation.', '9 heures', ['90 heures', '0,9 heure'], 't = Q / I = 90 / 10 = <b>9 heures</b>.');

  /* ---------- 2. Associations de résistances ---------- */
  var L2 = 'cah-e-resistances';
  q(L2, 'e03', 'Ex 3 b) — Calculer la résistance équivalente du montage (Réqt). (Ug = 28 V ; R1 = 2 Ω ; R2 = 20 Ω ; R3 = 30 Ω)', '14 Ω', ['52 Ω', '12 Ω'], 'R2 // R3 = (20 × 30) / (20 + 30) = 12 Ω ; en série avec R1 : 2 + 12 = <b>14 Ω</b>.', PAR);
  q(L2, 'e03', 'Ex 3 c) — Même montage : calculer Ig.', '2 A', ['14 A', '0,5 A'], 'Ig = Ug / Réq = 28 / 14 = <b>2 A</b>.', OHM);
  q(L2, 'e03', 'Ex 3 c) — Même montage : calculer UR1.', '4 V', ['24 V', '2 V'], 'R1 est traversée par Ig : UR1 = 2 × 2 = <b>4 V</b>.');
  q(L2, 'e03', 'Ex 3 c) — Même montage : calculer UR2.', '24 V', ['28 V', '4 V'], 'Loi des mailles : UR2 = Ug − UR1 = 28 − 4 = <b>24 V</b>.', MAILLE);
  q(L2, 'e03', 'Ex 3 c) — Même montage : calculer IR2 et IR3.', 'IR2 = 1,2 A ; IR3 = 0,8 A', ['IR2 = 0,8 A ; IR3 = 1,2 A', 'IR2 = 1 A ; IR3 = 1 A'], 'IR2 = UR2 / R2 = 24 / 20 = 1,2 A ; loi des nœuds : IR3 = Ig − IR2 = 2 − 1,2 = <b>0,8 A</b>.', NOEUD);
  q(L2, 'e03', 'Ex 3 c) — Même montage : calculer UR3.', '24 V', ['4 V', '28 V'], 'R3 est en parallèle sur R2 : même tension, UR3 = UR2 = <b>24 V</b> (vérif. : 30 × 0,8 = 24 V).', 'Récepteurs en parallèle = même tension.');
  q(L2, 'e04', 'Ex 4 b) — Calculer la résistance équivalente du montage (Réqt). (Ug = 48 V ; R1 = 80 Ω ; R2 = 12 Ω ; R3 = 8 Ω)', '16 Ω', ['100 Ω', '4,8 Ω'], 'R2 + R3 en série = 20 Ω ; en parallèle avec R1 : (80 × 20) / (80 + 20) = <b>16 Ω</b>.', PAR);
  q(L2, 'e04', 'Ex 4 c) — Même montage : calculer Ig.', '3 A', ['0,6 A', '2,4 A'], 'Ig = 48 / 16 = <b>3 A</b>.');
  q(L2, 'e04', 'Ex 4 c) — Même montage : calculer UR1 et IR1.', 'UR1 = 48 V ; IR1 = 0,6 A', ['UR1 = 24 V ; IR1 = 0,3 A', 'UR1 = 48 V ; IR1 = 3 A'], 'R1 est directement aux bornes du générateur : UR1 = Ug = 48 V ; IR1 = 48 / 80 = <b>0,6 A</b>.');
  q(L2, 'e04', 'Ex 4 c) — Même montage : calculer IR2, UR2, IR3, UR3.', 'IR2 = IR3 = 2,4 A ; UR2 = 28,8 V ; UR3 = 19,2 V', ['IR2 = IR3 = 3 A ; UR2 = 36 V ; UR3 = 24 V', 'IR2 = 2,4 A ; IR3 = 0,6 A ; UR2 = 28,8 V ; UR3 = 4,8 V'], 'IR2 = Ig − IR1 = 3 − 0,6 = 2,4 A ; R2 et R3 en série → IR3 = 2,4 A. UR2 = 12 × 2,4 = 28,8 V ; UR3 = 8 × 2,4 = 19,2 V. Vérif. : 28,8 + 19,2 = 48 V.');
  q(L2, 'e05', 'Ex 5 b) — Calculer la résistance équivalente du montage (Réqt). (Ug = 60 V ; R1 = 8 ; R2 = 20 ; R3 = 12 ; R4 = 6 ; R5 = 7 ; R6 = 19 Ω)', '20 Ω', ['72 Ω', '12 Ω'], 'R3 // R4 = 72 / 18 = 4 Ω ; + R5 + R6 = 4 + 7 + 19 = 30 Ω ; // R2 = 600 / 50 = 12 Ω ; + R1 = 8 + 12 = <b>20 Ω</b>.', 'On réduit le schéma en partant du bout le plus éloigné du générateur.');
  q(L2, 'e05', 'Ex 5 c) — Même montage : calculer Ig, UR1 et UR2.', 'Ig = 3 A ; UR1 = 24 V ; UR2 = 36 V', ['Ig = 3 A ; UR1 = 36 V ; UR2 = 24 V', 'Ig = 5 A ; UR1 = 40 V ; UR2 = 20 V'], 'Ig = 60 / 20 = 3 A ; UR1 = 8 × 3 = 24 V ; UR2 = 60 − 24 = <b>36 V</b>.');
  q(L2, 'e05', 'Ex 5 c) — Même montage : calculer IR2, IR6 et IR5.', 'IR2 = 1,8 A ; IR6 = IR5 = 1,2 A', ['IR2 = 1,2 A ; IR6 = IR5 = 1,8 A', 'IR2 = 1,5 A ; IR6 = IR5 = 1,5 A'], 'IR2 = 36 / 20 = 1,8 A ; IR6 = Ig − IR2 = 3 − 1,8 = 1,2 A ; R5 en série avec R6 → IR5 = <b>1,2 A</b>.');
  q(L2, 'e05', 'Ex 5 c) — Même montage : calculer UR6, UR5 et UR4 (= UR3).', 'UR6 = 22,8 V ; UR5 = 8,4 V ; UR4 = UR3 = 4,8 V', ['UR6 = 19 V ; UR5 = 7 V ; UR4 = UR3 = 10 V', 'UR6 = 22,8 V ; UR5 = 8,4 V ; UR4 = 4,8 V ; UR3 = 7,2 V'], 'UR6 = 19 × 1,2 = 22,8 V ; UR5 = 7 × 1,2 = 8,4 V ; maille : UR4 = UR2 − UR5 − UR6 = 36 − 8,4 − 22,8 = 4,8 V ; R3 // R4 → UR3 = 4,8 V.');
  q(L2, 'e05', 'Ex 5 c) — Même montage : calculer IR4 et IR3.', 'IR4 = 0,8 A ; IR3 = 0,4 A', ['IR4 = 0,4 A ; IR3 = 0,8 A', 'IR4 = 0,6 A ; IR3 = 0,6 A'], 'IR4 = 4,8 / 6 = 0,8 A ; IR3 = 4,8 / 12 = 0,4 A. Vérif. : 0,8 + 0,4 = 1,2 A = IR5.');
  q(L2, 'e07', 'Ex 7 b) — Calculer la résistance équivalente du montage (Réqt). (Ug = 22 V ; R1 = 10 ; R2 = 20 ; R3 = 60 ; R4 = 5 ; R5 = 30 Ω)', '22 Ω', ['125 Ω', '12 Ω'], 'R2 // R3 = 1200 / 80 = 15 Ω ; + R4 = 20 Ω ; // R5 = 600 / 50 = 12 Ω ; + R1 = <b>22 Ω</b>.');
  q(L2, 'e07', 'Ex 7 c) — Même montage, dans l’ordre : Ig, UR1, UR5, IR5.', 'Ig = 1 A ; UR1 = 10 V ; UR5 = 12 V ; IR5 = 0,4 A', ['Ig = 1 A ; UR1 = 12 V ; UR5 = 10 V ; IR5 = 0,33 A', 'Ig = 2 A ; UR1 = 20 V ; UR5 = 2 V ; IR5 = 0,07 A'], 'Ig = 22 / 22 = 1 A ; UR1 = 10 × 1 = 10 V ; UR5 = 22 − 10 = 12 V ; IR5 = 12 / 30 = 0,4 A.');
  q(L2, 'e07', 'Ex 7 c) — Suite : IR4, UR4, UR3.', 'IR4 = 0,6 A ; UR4 = 3 V ; UR3 = 9 V', ['IR4 = 0,4 A ; UR4 = 2 V ; UR3 = 10 V', 'IR4 = 0,6 A ; UR4 = 9 V ; UR3 = 3 V'], 'IR4 = Ig − IR5 = 1 − 0,4 = 0,6 A ; UR4 = 5 × 0,6 = 3 V ; UR3 = UR5 − UR4 = 12 − 3 = 9 V.');
  q(L2, 'e07', 'Ex 7 c) — Suite : IR3 et IR2.', 'IR3 = 0,15 A ; IR2 = 0,45 A', ['IR3 = 0,45 A ; IR2 = 0,15 A', 'IR3 = 0,3 A ; IR2 = 0,3 A'], 'IR3 = 9 / 60 = 0,15 A ; IR2 = 9 / 20 = 0,45 A. Vérif. : 0,15 + 0,45 = 0,6 A = IR4.');
  q(L2, 'e08', 'Ex 8 a) — Démontrer que la résistance équivalente totale du montage est Réq = 12 Ω. Quel est le bon enchaînement ?', 'R12 = 30 Ω et R56 = 30 Ω ; R12 // R3 = 12 Ω ; + R4 = 20 Ω ; // R56 = 12 Ω', ['R1 + R2 + R3 + R4 + R5 + R6 = 88 Ω ÷ 6 ≈ 12 Ω', 'R3 // R4 = 5,7 Ω ; + R12 + R56 ≈ 12 Ω'], 'R12 = 20 + 10 = 30 Ω ; R56 = 5 + 25 = 30 Ω ; R3 // R12 = 600 / 50 = 12 Ω ; + R4 = 20 Ω ; 20 // 30 = 600 / 50 = <b>12 Ω</b>.');
  q(L2, 'e08', 'Ex 8 b) — Même montage (Ug = 24 V) : calculer UR5, UR4, UR2.', 'UR5 = 4 V ; UR4 = 9,6 V ; UR2 = 4,8 V', ['UR5 = 20 V ; UR4 = 9,6 V ; UR2 = 9,6 V', 'UR5 = 4 V ; UR4 = 14,4 V ; UR2 = 4,8 V'], 'IR5 = Ug / R56 = 24 / 30 = 0,8 A → UR5 = 5 × 0,8 = 4 V. Ig = 24 / 12 = 2 A → IR4 = 2 − 0,8 = 1,2 A → UR4 = 8 × 1,2 = 9,6 V. UR3 = 24 − 9,6 = 14,4 V = UR12 → IR1 = 14,4 / 30 = 0,48 A → UR2 = 10 × 0,48 = 4,8 V.');
  q(L2, 'e08', 'Ex 8 c) — Calculer l’énergie consommée par R3 en 2h 24 minutes.', '24,88 Wh', ['10,37 Wh', '248,8 Wh'], 'IR3 = 14,4 / 20 = 0,72 A ; 2h24 = 144 mn / 60 = 2,4 h. W = U × I × t = 14,4 × 0,72 × 2,4 = <b>24,88 Wh</b>.', 'W (Wh) = P (W) × t (h).');
  q(L2, 'e09', 'Ex 9 — Les résistances ayant des repères identiques ont la même valeur (R1 = 4 Ω ; R2 = 16 Ω ; IR4 = 2,5 A ; UR3 = 30 V ; Réquit = 10 Ω). Calculer IR1 = IR2, UR1 et UR2.', 'IR1 = IR2 = 1,5 A ; UR1 = 6 V ; UR2 = 24 V', ['IR1 = IR2 = 2,5 A ; UR1 = 10 V ; UR2 = 40 V', 'IR1 = IR2 = 1 A ; UR1 = 4 V ; UR2 = 16 V'], 'R1 + R2 (20 Ω) est en parallèle sur R3 : UR12 = UR3 = 30 V → IR1 = IR2 = 30 / 20 = 1,5 A ; UR1 = 4 × 1,5 = 6 V ; UR2 = 16 × 1,5 = 24 V.');
  q(L2, 'e09', 'Ex 9 — Suite : calculer IR3, R3 et R4.', 'IR3 = 1 A ; R3 = 30 Ω ; R4 = 8 Ω', ['IR3 = 1,5 A ; R3 = 20 Ω ; R4 = 10 Ω', 'IR3 = 1 A ; R3 = 30 Ω ; R4 = 20 Ω'], 'Nœud : IR3 = IR4 − IR2 = 2,5 − 1,5 = 1 A ; R3 = 30 / 1 = 30 Ω. Deux demi-circuits identiques en parallèle font 10 Ω → chacun vaut 20 Ω. R123 = (20 × 30) / 50 = 12 Ω → R4 = 20 − 12 = <b>8 Ω</b>.');
  q(L2, 'e09', 'Ex 9 — Suite : calculer UR4, Ug et Ig.', 'UR4 = 20 V ; Ug = 50 V ; Ig = 5 A', ['UR4 = 20 V ; Ug = 50 V ; Ig = 2,5 A', 'UR4 = 10 V ; Ug = 40 V ; Ig = 4 A'], 'UR4 = 8 × 2,5 = 20 V ; Ug = UR3 + UR4 = 30 + 20 = 50 V ; Ig = 50 / 10 = <b>5 A</b> (2 × 2,5 A, un par demi-circuit).');

  /* ---------- 3. Potentiels (Ex 6) ---------- */
  var L3 = 'cah-e-potentiels';
  q(L3, 'e06', 'Ex 6 a) — Calculer la valeur de la résistance R1. (R2 = 20 Ω ; R3 = 10 Ω ; IR4 = 0,6 A ; IR6 = 2 A ; VAC = 96 V ; VBM = 62 V ; VCM = 54 V)', '88 Ω', ['44 Ω', '146 Ω'], 'UR1 = VAB = (VAC + VCM) − VBM = (96 + 54) − 62 = 88 V. IR2 = (VBM − VCM) / R2 = 8 / 20 = 0,4 A ; IR1 = IR2 + IR4 = 0,4 + 0,6 = 1 A. R1 = 88 / 1 = <b>88 Ω</b>.', 'Une tension = une différence de potentiels : VAB = VA − VB.');
  q(L3, 'e06', 'Ex 6 b) — Calculer la valeur de la résistance R4.', '20 Ω', ['13,3 Ω', '40 Ω'], 'UR2 = VBM − VCM = 8 V ; UR3 = 10 × 0,4 = 4 V ; UR4 = UR2 + UR3 = 12 V. R4 = 12 / 0,6 = <b>20 Ω</b>.');
  q(L3, 'e06', 'Ex 6 c) — Calculer la valeur de la résistance R5.', '100 Ω', ['50 Ω', '88 Ω'], 'UR5 = UR1 + UR4 = 88 + 12 = 100 V ; IR5 = IR6 − IR3 − IR4 = 2 − 0,4 − 0,6 = 1 A. R5 = <b>100 Ω</b>.');
  q(L3, 'e06', 'Ex 6 d) — Calculer la valeur de la résistance R6.', '25 Ω', ['27 Ω', '50 Ω'], 'UR6 = VCM − UR3 = 54 − 4 = 50 V ; R6 = 50 / 2 = <b>25 Ω</b>.');
  q(L3, 'e06', 'Ex 6 e) f) — Calculer la tension générateur Ug et la résistance équivalente totale du circuit.', 'Ug = 150 V ; Réq = 75 Ω', ['Ug = 96 V ; Réq = 48 Ω', 'Ug = 212 V ; Réq = 106 Ω'], 'Ug = VAC + VCM = 96 + 54 = 150 V ; Ig = IR6 = 2 A → Réq = 150 / 2 = <b>75 Ω</b>.');

  /* ---------- 4. Résistivité, lignes ---------- */
  var L4 = 'cah-e-resistivite';
  q(L4, 'e10', 'Ex 10 — Conducteur 1 : ρ = 3,2 × 10⁻⁸ Ω.m ; L = 200 m ; S = 1,6 mm². Calculer R.', '4 Ω', ['0,4 Ω', '40 Ω'], 'R = ρ × L / S = 3,2 × 10⁻⁸ × 200 / 1,6 × 10⁻⁶ = <b>4 Ω</b>.', 'R = ρ × L / S avec L en m et S en m² (1 mm² = 10⁻⁶ m²).');
  q(L4, 'e10', 'Ex 10 — Conducteur 2 : R = 15 Ω ; L = 1 km ; S = 1 mm². Calculer ρ.', '1,5 × 10⁻⁸ Ω.m', ['1,5 × 10⁻⁵ Ω.m', '15 × 10⁻⁸ Ω.m'], 'ρ = R × S / L = 15 × 10⁻⁶ / 1000 = <b>1,5 × 10⁻⁸ Ω.m</b>.', null, '1 km = 1000 m.');
  q(L4, 'e10', 'Ex 10 — Conducteur 3 : R = 80 mΩ ; ρ = 2 × 10⁻⁸ Ω.m ; S = 2 mm². Calculer L.', '8 m', ['80 m', '0,8 m'], 'L = R × S / ρ = 80 × 10⁻³ × 2 × 10⁻⁶ / 2 × 10⁻⁸ = <b>8 m</b>.');
  q(L4, 'e10', 'Ex 10 — Conducteur 4 : R = 0,2 Ω ; ρ = 2 × 10⁻⁸ Ω.m ; L = 160 m. Calculer S.', '16 mm²', ['1,6 mm²', '160 mm²'], 'S = ρ × L / R = 2 × 10⁻⁸ × 160 / 0,2 = 16 × 10⁻⁶ m² = <b>16 mm²</b>.');
  q(L4, null, 'Ex 11 — La longueur d’une bobine de fil conducteur est de 750 m ; sa section est de 2,5 mm² et sa résistivité ρ = 1,8 × 10⁻⁸ Ω.m. Quelle est la résistance de ce fil conducteur ?', '5,4 Ω', ['0,54 Ω', '54 Ω'], 'R = 1,8 × 10⁻⁸ × 750 / 2,5 × 10⁻⁶ = <b>5,4 Ω</b>.');
  q(L4, 'e12', 'Ex 12 a) — La distance entre le générateur et le récepteur est de 200 m et le courant est de 10 A (ρ = 2 × 10⁻⁸ ; S = 4 mm²). Calculer la résistance totale de la ligne.', '2 Ω', ['1 Ω', '20 Ω'], 'La ligne = aller + retour = 400 m. R = 2 × 10⁻⁸ × 400 / 4 × 10⁻⁶ = <b>2 Ω</b>.', null, 'Piège : ne pas oublier le fil de retour (2 × 200 m).');
  q(L4, 'e12', 'Ex 12 b) c) — Calculer la chute de tension en ligne et la tension aux bornes du récepteur (Ug = 220 V).', 'Uligne = 20 V ; Urécepteur = 200 V', ['Uligne = 10 V ; Urécepteur = 210 V', 'Uligne = 20 V ; Urécepteur = 240 V'], 'Uligne = 2 × 10 = 20 V ; Urécepteur = 220 − 20 = <b>200 V</b>.');
  q(L4, 'e12', 'Ex 12 d) — Calculer la valeur de la résistance du récepteur.', '20 Ω', ['22 Ω', '2 Ω'], 'Rrécepteur = 200 / 10 = <b>20 Ω</b>.');

  /* ---------- 5. Générateurs ---------- */
  var L5 = 'cah-e-generateurs';
  q(L5, 'e15', 'Ex 15 a) b) c) — (R1 = 1 Ω ; R3 = 12 Ω ; IR2 = 2 A ; UR3 = 12 V ; E = 16,2 V) Calculer IR3, UR2 et Ig.', 'IR3 = 1 A ; UR2 = 12 V ; Ig = 3 A', ['IR3 = 1 A ; UR2 = 24 V ; Ig = 2 A', 'IR3 = 12 A ; UR2 = 12 V ; Ig = 14 A'], 'IR3 = 12 / 12 = 1 A ; R2 // R3 → UR2 = 12 V ; Ig = IR2 + IR3 = 2 + 1 = <b>3 A</b>.');
  q(L5, 'e15', 'Ex 15 d) e) — Calculer UR1 et Ug.', 'UR1 = 3 V ; Ug = 15 V', ['UR1 = 1 V ; Ug = 13 V', 'UR1 = 3 V ; Ug = 16,2 V'], 'UR1 = 1 × 3 = 3 V ; Ug = UR1 + UR2 = 3 + 12 = <b>15 V</b>.');
  q(L5, 'e15', 'Ex 15 f) — Calculer la résistance interne r du générateur.', '0,4 Ω', ['1,2 Ω', '0,08 Ω'], 'Ug = E − r × I → r = (E − Ug) / I = (16,2 − 15) / 3 = <b>0,4 Ω</b>.', 'Ug = E − r × I (générateur) : la tension aux bornes baisse quand le courant augmente.');
  q(L5, 'e16', 'Ex 16 a) b) c) — (2 × R1 = R2 = R3 = 20 Ω ; IR3 = 0,5 A ; r = 0,1 Ω) Calculer UR3, UR2 et IR2.', 'UR3 = UR2 = 10 V ; IR2 = 0,5 A', ['UR3 = 10 V ; UR2 = 20 V ; IR2 = 1 A', 'UR3 = UR2 = 5 V ; IR2 = 0,25 A'], 'UR3 = 20 × 0,5 = 10 V ; R2 // R3 → UR2 = 10 V ; IR2 = 10 / 20 = 0,5 A.');
  q(L5, 'e16', 'Ex 16 d) e) f) — Calculer IR1, UR1 et Ug.', 'IR1 = 1 A ; UR1 = 10 V ; Ug = 20 V', ['IR1 = 1 A ; UR1 = 20 V ; Ug = 30 V', 'IR1 = 0,5 A ; UR1 = 5 V ; Ug = 15 V'], 'IR1 = 0,5 + 0,5 = 1 A ; R1 = 20 / 2 = 10 Ω → UR1 = 10 V ; Ug = 10 + 10 = <b>20 V</b>.', null, '« 2 × R1 = 20 Ω » : R1 vaut 10 Ω, pas 40 Ω.');
  q(L5, 'e16', 'Ex 16 g) — Calculer la f.e.m. E du générateur.', '20,1 V', ['19,9 V', '20 V'], 'E = Ug + r × I = 20 + 0,1 × 1 = <b>20,1 V</b>.');
  q(L5, 'e17', 'Ex 17 — G1 (24 V ; 20 mΩ ; 100 Ah) et G2 (24 V ; 30 mΩ ; 60 Ah) en SÉRIE : f.e.m., résistance interne et capacité équivalentes ?', '48 V ; 50 mΩ ; 60 Ah', ['48 V ; 12 mΩ ; 160 Ah', '24 V ; 50 mΩ ; 160 Ah'], 'Série : les f.e.m. s’additionnent (48 V), les résistances internes s’additionnent (50 mΩ), la capacité est celle de la PLUS FAIBLE (60 Ah).', 'Série = tensions ajoutées, capacité la plus faible.');
  q(L5, 'e17', 'Ex 17 — G1 et G2 en PARALLÈLE : f.e.m., résistance interne et capacité équivalentes ?', '24 V ; 12 mΩ ; 160 Ah', ['48 V ; 50 mΩ ; 60 Ah', '24 V ; 25 mΩ ; 100 Ah'], 'Parallèle : même f.e.m. (24 V), r = (20 × 30) / (20 + 30) = 12 mΩ, capacités additionnées (160 Ah).', 'Parallèle = même tension, capacités ajoutées.');
  q(L5, 'e17', 'Ex 17 — Tension générateur pour Ig = 10 A, en série puis en parallèle ?', 'Série 47,50 V ; parallèle 23,88 V', ['Série 48 V ; parallèle 24 V', 'Série 47,88 V ; parallèle 23,50 V'], 'Ug = E − r × I. Série : 48 − 0,05 × 10 = 47,5 V. Parallèle : 24 − 0,012 × 10 = 23,88 V.');

  /* ---------- 6. Diodes et Zéner ---------- */
  var L6 = 'cah-e-diodes';
  q(L6, 'e18', 'Ex 18 — Dessiner les diodes sur ce pont de Graëtz. Comment sont-elles placées ?', '4 diodes : les 2 diodes reliées au + ont leur cathode (trait) vers le +, les 2 reliées au − ont leur anode vers le −', ['4 diodes toutes orientées vers la borne −', '2 diodes seulement, une par borne ~'], 'Chaque borne ~ est reliée à une diode vers le + et une diode venant du −. Le courant sort toujours par le + et revient par le −, quelle que soit l’alternance (corrigé ci-dessous).<br><img src="img/cah/r18.png" alt="Pont de Graëtz corrigé" style="max-width:220px">', 'Pont de Graëtz = 4 diodes = redressement double alternance.');
  q(L6, 'e19', 'Ex 19 — Dessiner les diodes sur ce pont de redressement triphasé. Combien de diodes et comment ?', '6 diodes : 3 en haut (cathode vers le +) et 3 en bas (anode vers le −), chaque phase entre une diode du haut et une du bas', ['3 diodes, une par phase, cathode vers le +', '4 diodes comme un pont de Graëtz'], 'Pont triphasé = 3 bras de 2 diodes : diodes positives vers le +, diodes négatives vers le − (corrigé ci-dessous). C’est le pont de l’alternateur.<br><img src="img/cah/r19.png" alt="Pont triphasé corrigé" style="max-width:100%">');
  q(L6, 'e20', 'Ex 20 a) — Déterminer les diodes passantes en donnant leur repère.', 'D2 et D3', ['D1 et D4', 'D1 et D2'], 'En fléchant le courant depuis le + du générateur, seules D2 et D3 sont dans le sens passant (corrigé ci-dessous).<br><img src="img/cah/r20.png" alt="Diodes passantes D2 et D3" style="max-width:100%">');
  q(L6, 'e20', 'Ex 20 b) — Calculer la valeur de la résistance R. (Ug = 12,6 V ; VD1 = VD3 = 2 V ; ID1 = ID3 = 10 mA ; VD2 = VD4 = 0,6 V)', '1 kΩ (1000 Ω)', ['1,26 kΩ', '1 200 Ω'], 'Maille : UR = Ug − VD2 − VD3 = 12,6 − 0,6 − 2 = 10 V. R est traversée par ID3 = 10 mA : R = 10 / 0,01 = <b>1000 Ω</b>.');
  q(L6, 'e21', 'Ex 21 a) — Calculer IR3 et UR1 si la tension d’alimentation Ug = + 4 V. (VZ1 = 5 V ; VZ2 = 9 V ; R1 = 2 ; R2 = 4 ; R3 = 6 Ω)', 'IR3 = 0 ; UR1 = 0', ['IR3 = 0,33 A ; UR1 = 0,67 V', 'IR3 = 0,5 A ; UR1 = 1 V'], 'Ug = 4 V &lt; VZ1 = 5 V : Z1 ne conduit pas, aucun courant. <b>UR1 = 0 et IR3 = 0</b>.', 'Avec des diodes : toujours vérifier d’abord si elles conduisent.');
  q(L6, 'e21', 'Ex 21 b) — Même question mais avec Ug = + 11 V.', 'IR3 = 0,5 A ; UR1 = 1 V', ['IR3 = 0,9 A ; UR1 = 2 V', 'IR3 = 0 ; UR1 = 0'], 'Z1 conduit (11 &gt; 5). La tension dispo pour Z2 = 6 − UR1 &lt; 9 V : Z2 ne conduit pas. Série : I = (11 − 5) / (2 + 4 + 6) = 0,5 A ; UR1 = 2 × 0,5 = <b>1 V</b>.');
  q(L6, 'e21', 'Ex 21 c) — Même question mais avec Ug = + 16 V.', 'IR3 = 0,9 A ; UR1 = 2 V', ['IR3 = 0,92 A ; UR1 = 1,83 V', 'IR3 = 0,5 A ; UR1 = 1 V'], 'Z2 conduit : R2 + R3 ont 9 V à leurs bornes → IR3 = 9 / 10 = 0,9 A. Maille : UR1 = 16 − 5 − 9 = <b>2 V</b>.');
  q(L6, 'e22', 'Ex 22 a) — Calculer la valeur de la résistance R1. (Ug = 14 V ; VD = 0,5 V ; VZ = 10 V ; PL = 20 W ; IZ = 500 mA)', '1,4 Ω', ['7 Ω', '1,75 Ω'], 'UR1 = 14 − 0,5 − 10 = 3,5 V. IL = PL / VZ = 20 / 10 = 2 A ; IR1 = IZ + IL = 0,5 + 2 = 2,5 A. R1 = 3,5 / 2,5 = <b>1,4 Ω</b>.', null, 'La lampe est en parallèle sur la Zéner : UL = VZ = 10 V.');
  q(L6, 'e22', 'Ex 22 b) — Quelle doit être la puissance de R1 ?', '8,75 W', ['1,75 W', '35 W'], 'P = U × I = 3,5 × 2,5 = <b>8,75 W</b> (ou U²/R = 3,5²/1,4, ou R × I² = 1,4 × 2,5²).', 'P = U × I = U² / R = R × I².');
  q(L6, 'e23', 'Ex 23 — Les deux diodes Zéner sont identiques ainsi que les deux résistances. Quelle est la tension VAB quand la tension Ug = 12 V ?', '2 V', ['0 V', '7 V'], 'Chaque Zéner garde 5 V, chaque résistance a 12 − 5 = 7 V. Le point A est à 7 V (résistance en bas), le point B à 5 V (Zéner en bas). VAB = 7 − 5 = <b>2 V</b>.');

  /* ---------- 7. Transistors ---------- */
  var L7 = 'cah-e-transistors';
  q(L7, 'e24', 'Ex 24 a) — Le transistor est saturé. Calculer la valeur de la résistance Rc. (Ug1 = 5 V ; Ug2 = 24 V ; Idel = 10 mA ; Vdel = 2 V ; β = 100 ; Vbe = 0,6 V)', '2,2 kΩ', ['2,4 kΩ', '220 Ω'], 'Saturé : VCE = 0. URc = 24 − 2 − 0 = 22 V ; Rc = 22 / 0,01 = <b>2 200 Ω</b>.', 'Transistor saturé = interrupteur fermé entre C et E (VCE ≈ 0).');
  q(L7, 'e24', 'Ex 24 b) c) — Calculer Ib puis Rb.', 'Ib = 0,1 mA ; Rb = 44 kΩ', ['Ib = 1 mA ; Rb = 4,4 kΩ', 'Ib = 0,1 mA ; Rb = 50 kΩ'], 'Ib = Ic / β = 10 / 100 = 0,1 mA. URb = Ug1 − Vbe = 5 − 0,6 = 4,4 V ; Rb = 4,4 / 0,0001 = <b>44 kΩ</b>.', 'β = Ic / Ib.');
  q(L7, 'e25', 'Ex 25 a) — Calculer la valeur de la résistance Rp pour que le transistor devienne saturé. (Ug2 = 12 V ; Rc = 50 Ω ; Rb = 100 Ω ; Ib = 2 mA ; IRb = 11 × Ib ; Vbe sat = 0,6 V)', '30 Ω', ['27 Ω', '300 Ω'], 'Rp est en parallèle sur la jonction B-E : URp = 0,6 V. IRp = IRb − Ib = 22 − 2 = 20 mA. Rp = 0,6 / 0,02 = <b>30 Ω</b>.');
  q(L7, 'e25', 'Ex 25 b) — Calculer Ug1 pour que le transistor soit saturé.', '2,8 V', ['2,2 V', '0,6 V'], 'URb = 100 × 0,022 = 2,2 V ; Ug1 = URb + URp = 2,2 + 0,6 = <b>2,8 V</b>.');
  q(L7, 'e25', 'Ex 25 c) d) — Calculer Ic (transistor saturé) et le gain β.', 'Ic = 240 mA ; β = 120', ['Ic = 240 mA ; β = 100', 'Ic = 24 mA ; β = 12'], 'URc = 12 − 0 = 12 V ; Ic = 12 / 50 = 0,24 A. β = Ic / Ib = 240 / 2 = <b>120</b>.');
  q(L7, 'e26', 'Ex 26 a) b) — Le transistor est saturé. Calculer Ic puis Ib. (Ug2 = 24 V ; Rbobine = 24 Ω ; β = 200)', 'Ic = 1 A ; Ib = 5 mA', ['Ic = 1 A ; Ib = 0,5 mA', 'Ic = 0,5 A ; Ib = 2,5 mA'], 'Ic = 24 / 24 = 1 A ; Ib = 1 / 200 = <b>5 mA</b>.');
  q(L7, 'e26', 'Ex 26 c) d) — Calculer Rp puis Rb. (Ug1 = 12 V ; Ig1 = 200 mA ; Vz = 5,1 V ; Iz = 145 mA ; Vbe sat = 0,7 V)', 'Rp = 80 Ω ; Rb = 14 Ω', ['Rp = 93 Ω ; Rb = 12,7 Ω', 'Rp = 80 Ω ; Rb = 140 Ω'], 'URp = Vz − Vbe = 5,1 − 0,7 = 4,4 V ; IRp = Ig1 − Iz = 55 mA → Rp = 4,4 / 0,055 = 80 Ω. IRb = IRp − Ib = 55 − 5 = 50 mA ; URb = Vbe = 0,7 V → Rb = <b>14 Ω</b>.');
  q(L7, 'e26', 'Ex 26 e) — Calculer la valeur de la résistance R1.', '34,5 Ω', ['60 Ω', '25,5 Ω'], 'UR1 = 12 − 5,1 = 6,9 V ; IR1 = Ig1 = 0,2 A → R1 = <b>34,5 Ω</b>.');
  q(L7, 'e26', 'Ex 26 f) — Comment s’appelle le rôle de la diode D ?', 'Diode de roue libre : protège le transistor lors du passage saturé → bloqué', ['Diode Zéner : stabilise la tension de la bobine', 'Diode de redressement : redresse le courant de la bobine'], 'D est une diode de roue libre : à l’ouverture, la bobine crée une surtension (self-induction) ; la diode la court-circuite et protège le transistor.');

  /* ---------- 8. Alimentation stabilisée (Ex 27) ---------- */
  var L8 = 'cah-e-alimentation';
  q(L8, 'e27', 'Ex 27 a) — Donner le nom et le rôle du composant A.', 'Pont de Graëtz : redresser une tension alternative', ['Condensateur : filtrer une tension redressée', 'Transformateur : abaisser la tension'], 'Corrigé : A = pont de Graëtz, redresser une tension alternative.');
  q(L8, 'e27', 'Ex 27 a) — Donner le nom et le rôle du composant B.', 'Condensateur : filtrer une tension redressée', ['Diode Zéner : stabiliser une tension filtrée', 'Résistance ballast : protéger la diode Zéner'], 'Corrigé : B = condensateur, filtrer une tension redressée.');
  q(L8, 'e27', 'Ex 27 a) — Donner le nom et le rôle du composant C.', 'Résistance ballast : protéger la diode Zéner', ['Condensateur : filtrer une tension redressée', 'Pont de Graëtz : redresser'], 'Corrigé : C = résistance ballast, protéger la diode Zéner (elle limite le courant).');
  q(L8, 'e27', 'Ex 27 a) — Donner le nom et le rôle du composant D.', 'Diode Zéner : stabiliser une tension filtrée', ['Diode de roue libre : protéger un transistor', 'LED : témoin de fonctionnement'], 'Corrigé : D = diode Zéner, stabiliser une tension filtrée.', 'Transformer → redresser → filtrer → stabiliser.');
  q(L8, 'e27osc', 'Ex 27 c) — Quelle est la valeur efficace de la tension primaire Up (m = 0,1) et sa fréquence ? (Y : 11 V/carreau ; X : 2,5 ms/carreau)', 'Up eff ≈ 233 V ; f = 50 Hz', ['Up eff = 330 V ; f = 50 Hz', 'Up eff ≈ 23,3 V ; f = 400 Hz'], 'Us max = 11 V × 3 carreaux = 33 V ; période = 2,5 ms × 8 carreaux = 20 ms → f = 1 / 0,02 = 50 Hz. m = Us / Up = 0,1 → Up max = 33 / 0,1 = 330 V ; Up eff = 330 / √2 = <b>233,34 V</b> (corrigé). Un transformateur ne change pas la fréquence.', 'Ueff = Umax / √2 ; f = 1 / T.');
  q(L8, 'e27osc', 'Ex 27 d) — Chronogramme 1 : UR23 sans les composants B, C, D (C remplacé par un fil). Quelle forme obtient-on ?', 'Une tension redressée double alternance (toutes les alternances du même côté, qui retombent à 0)', ['Une tension continue parfaitement lisse', 'Une sinusoïde identique à Us'], 'Sans condensateur ni Zéner, on voit la sortie du pont de Graëtz : les alternances négatives sont « retournées » (courbe bleue du corrigé).<br><img src="img/cah/r27.png" alt="Chronogrammes corrigés" style="max-width:100%">');
  q(L8, 'e27osc', 'Ex 27 d) — Chronogramme 2 : UR23 sans C et D, le composant B (condensateur) étant de faible valeur. Quelle forme obtient-on ?', 'Une tension redressée filtrée : elle suit le sommet puis redescend lentement (ondulation)', ['Une tension redressée double alternance qui retombe à 0', 'Une tension nulle'], 'Le condensateur se charge au sommet puis se décharge lentement dans R2 + R3 : ondulation en « dents de scie » (courbe rouge du corrigé). Plus la capacité est grande, plus l’ondulation est faible.<br><img src="img/cah/r27.png" alt="Chronogrammes corrigés" style="max-width:100%">');
  q(L8, 'e27', 'Ex 27 e) — Calculer la valeur de la tension UR3 avec tous les composants.', '12 V', ['6 V', '18 V'], 'R2 + R3 sont aux bornes de la Zéner : UR2 + UR3 = Vz = 18 V. I = 18 / (100 + 200) = 0,06 A ; UR3 = 200 × 0,06 = <b>12 V</b>.', 'Diviseur de tension : UR3 = Vz × R3 / (R2 + R3).');

  var F = '<h3>Formules du cahier</h3><div class="tw"><table><tr><th>Loi</th><th>Formule</th></tr>' +
    '<tr><td>Ohm</td><td>U = R × I</td></tr><tr><td>Puissance</td><td>P = U × I = R × I² = U² / R</td></tr>' +
    '<tr><td>Quantité d’électricité</td><td>Q (Ah) = I (A) × t (h)</td></tr><tr><td>Énergie</td><td>W (Wh) = P × t</td></tr>' +
    '<tr><td>Série</td><td>R = R1 + R2 (même courant)</td></tr><tr><td>Parallèle</td><td>R = R1 × R2 / (R1 + R2) (même tension)</td></tr>' +
    '<tr><td>Résistivité</td><td>R = ρ × L / S (S en m²)</td></tr><tr><td>Générateur</td><td>Ug = E − r × I</td></tr>' +
    '<tr><td>Transistor</td><td>β = Ic / Ib ; saturé : VCE ≈ 0</td></tr><tr><td>Alternatif</td><td>Ueff = Umax / √2 ; f = 1 / T</td></tr></table></div>';
  function les(id, title, html, retenir, pieges, cle, flow, points, astuce, images) {
    var o = { id: id, title: title, html: html + F, retenir: retenir, pieges: pieges, memo: { cle: cle, flow: flow, points: points, astuce: astuce } };
    if (images) o.images = images;
    return o;
  }

  REV.addExercises('elec', {
    lessons: [
      les(L1, 'Cahier électricité — Quantité d’électricité et puissance (Ex 1, 2, 13, 14)', '<p>Réponses officielles : Ex 1 = 200 h · Ex 2 = 22 Ah, 38 Ah, 20 h · Ex 13 = 15,33 A, 2,5 mm² &lt; S &lt; 3 mm² · Ex 14 = 10 A, 9 h.</p>',
        ['Q = I × t (Ah = A × h).', 'P = U × I ; 1 ch = 736 W.', 'Cuivre : 5 à 7 A par mm².'], ['Minutes → heures : ÷ 60 (2h36 = 2,6 h).', 'mA → A : ÷ 1000.'],
        'Q = I × t · P = U × I', ['Convertir (mA, minutes)', 'Q = I × t ou t = Q / I', 'I = P / U'], ['200 h', '22 Ah / 38 Ah / 20 h', '10 A → 9 h'], 'Batterie = réservoir en Ah : on divise par le courant pour trouver les heures.'),
      les(L2, 'Cahier électricité — Associations de résistances (Ex 3, 4, 5, 7, 8, 9)', '<p>Réponses officielles : Ex 3 Réq 14 Ω · Ex 4 Réq 16 Ω · Ex 5 Réq 20 Ω · Ex 7 Réq 22 Ω · Ex 8 Réq 12 Ω · Ex 9 Ug 50 V, Ig 5 A.</p>',
        ['Série : même courant, tensions ajoutées.', 'Parallèle : même tension, courants ajoutés.', 'Réduire le schéma pas à pas depuis le bout.'], ['Deux résistances en parallèle : le résultat est plus PETIT que la plus petite.', 'Toujours vérifier avec la loi des nœuds ou des mailles.'],
        'Série = même I · Parallèle = même U', ['Réduire en Réq', 'Ig = Ug / Réq', 'Tensions par la loi d’Ohm et des mailles', 'Courants par la loi des nœuds'], ['14 Ω · 16 Ω · 20 Ω · 22 Ω · 12 Ω'], 'Produit sur somme pour 2 résistances en parallèle.',
        [{ src: 'cah/e03.png', cap: 'Ex 3' }, { src: 'cah/e04.png', cap: 'Ex 4' }, { src: 'cah/e05.png', cap: 'Ex 5' }, { src: 'cah/e07.png', cap: 'Ex 7' }, { src: 'cah/e08.png', cap: 'Ex 8' }, { src: 'cah/e09.png', cap: 'Ex 9' }]),
      les(L3, 'Cahier électricité — Potentiels (Ex 6)', '<p>Réponses officielles : R1 = 88 Ω · R4 = 20 Ω · R5 = 100 Ω · R6 = 25 Ω · Ug = 150 V · Réq = 75 Ω.</p>',
        ['VAB = VA − VB.', 'Un potentiel se mesure par rapport à la masse M.'], ['VAB = (VAC + VCM) − VBM : bien suivre le chemin.'],
        'Tension = différence de potentiels', ['Tensions par les potentiels', 'Courants par les nœuds', 'R = U / I'], ['R1 88 Ω', 'Ug 150 V'], 'On part de la masse et on remonte les potentiels.',
        [{ src: 'cah/e06.png', cap: 'Ex 6' }]),
      les(L4, 'Cahier électricité — Résistivité et lignes (Ex 10, 11, 12)', '<p>Réponses officielles : Ex 10 = 4 Ω, 1,5 × 10⁻⁸ Ω.m, 8 m, 16 mm² · Ex 11 = 5,4 Ω · Ex 12 = 2 Ω, 20 V, 200 V, 20 Ω.</p>',
        ['R = ρ × L / S (L en m, S en m²).', 'Ligne = aller + retour.'], ['1 mm² = 10⁻⁶ m².', 'Oublier le retour divise la résistance par 2.'],
        'R = ρ L / S', ['Convertir L (m) et S (m²)', 'R = ρ L / S', 'Chute de tension = R × I'], ['Ex 12 : 400 m de fil'], 'Plus c’est long, plus ça résiste ; plus c’est gros, moins ça résiste.',
        [{ src: 'cah/e10.png', cap: 'Ex 10' }, { src: 'cah/e12.png', cap: 'Ex 12' }]),
      les(L5, 'Cahier électricité — Générateurs (Ex 15, 16, 17)', '<p>Réponses officielles : Ex 15 r = 0,4 Ω · Ex 16 E = 20,1 V · Ex 17 série 48 V / 50 mΩ / 60 Ah / 47,5 V ; parallèle 24 V / 12 mΩ / 160 Ah / 23,88 V.</p>',
        ['Ug = E − r × I.', 'Série : E et r s’ajoutent, capacité = la plus faible.', 'Parallèle : même E, r en parallèle, capacités ajoutées.'], ['Batteries en série : la capacité NE s’ajoute PAS.'],
        'Ug = E − rI', ['E (à vide)', '− r × I (chute interne)', '= Ug (en charge)'], ['Série 48 V 60 Ah', 'Parallèle 24 V 160 Ah'], 'Série = plus de volts ; parallèle = plus d’ampères-heures.',
        [{ src: 'cah/e15.png', cap: 'Ex 15' }, { src: 'cah/e16.png', cap: 'Ex 16' }, { src: 'cah/e17.png', cap: 'Ex 17' }]),
      les(L6, 'Cahier électricité — Diodes et Zéner (Ex 18 à 23)', '<p>Réponses officielles : Ex 20 = D2 et D3, R = 1 kΩ · Ex 21 = 0/0 ; 0,5 A/1 V ; 0,9 A/2 V · Ex 22 = 1,4 Ω, 8,75 W · Ex 23 = VAB = 2 V.</p>',
        ['Vérifier d’abord si chaque diode conduit.', 'Zéner en inverse : garde VZ à ses bornes dès que U ≥ VZ.', 'Pont de Graëtz 4 diodes ; pont triphasé 6 diodes.'], ['Ug inférieure à VZ : aucun courant.', 'La lampe en parallèle sur la Zéner a la tension VZ.'],
        'Diode passante ? puis loi des mailles', ['Flécher le courant', 'Repérer les diodes passantes', 'Maille avec VD / VZ', 'R = U / I'], ['LED ≈ 2 V ; silicium ≈ 0,6 V'], 'La Zéner est un « plafond » de tension.',
        [{ src: 'cah/r18.png', cap: 'Ex 18 — corrigé pont de Graëtz' }, { src: 'cah/r19.png', cap: 'Ex 19 — corrigé pont triphasé' }, { src: 'cah/r20.png', cap: 'Ex 20 — diodes passantes' }, { src: 'cah/e21.png', cap: 'Ex 21' }, { src: 'cah/e22.png', cap: 'Ex 22' }, { src: 'cah/e23.png', cap: 'Ex 23' }]),
      les(L7, 'Cahier électricité — Transistors (Ex 24, 25, 26)', '<p>Réponses officielles : Ex 24 = 2,2 kΩ, 0,1 mA, 44 kΩ · Ex 25 = 30 Ω, 2,8 V, 240 mA, β 120 · Ex 26 = 1 A, 5 mA, 80 Ω, 14 Ω, 34,5 Ω, diode de roue libre.</p>',
        ['Saturé = interrupteur fermé (VCE ≈ 0).', 'β = Ic / Ib.', 'Diode de roue libre sur une bobine = protège le transistor.'], ['Vbe (0,6 / 0,7 V) se retire dans la maille de base.'],
        'Saturé : VCE = 0 · β = Ic / Ib', ['Maille collecteur → Ic', 'Ib = Ic / β', 'Maille de base → Rb'], ['Vbe 0,6–0,7 V'], 'Petit courant de base commande grand courant collecteur.',
        [{ src: 'cah/e24.png', cap: 'Ex 24' }, { src: 'cah/e25.png', cap: 'Ex 25' }, { src: 'cah/e26.png', cap: 'Ex 26' }]),
      les(L8, 'Cahier électricité — Alimentation stabilisée (Ex 27)', '<p>Réponses officielles : A pont de Graëtz (redresser) · B condensateur (filtrer) · C résistance ballast (protéger la Zéner) · D Zéner (stabiliser) · Up eff = 233,34 V ; f = 50 Hz · UR3 = 12 V.</p>',
        ['Transformer → redresser → filtrer → stabiliser.', 'Ueff = Umax / √2.', 'Un transformateur ne change pas la fréquence.'], ['m = Us / Up : Up = Us / m.', 'Lire les carreaux avec les calibres Y et X.'],
        'TRANSFO → PONT → CONDO → ZÉNER', ['Transformateur (m = 0,1)', 'Pont de Graëtz A', 'Condensateur B', 'Ballast C + Zéner D', 'Charge R2 + R3'], ['33 V max → 330 V → 233 V eff', '20 ms → 50 Hz'], 'Redresser, lisser, plafonner.',
        [{ src: 'cah/e27.png', cap: 'Ex 27 — schéma' }, { src: 'cah/e27osc.png', cap: 'Ex 27 — oscillogramme Us' }, { src: 'cah/r27.png', cap: 'Ex 27 — corrigé des chronogrammes' }])
    ],
    questions: qs
  });
})();
