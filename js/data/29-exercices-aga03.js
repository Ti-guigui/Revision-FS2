/* Électricité générale : les 52 exercices du livre AGA 03 (ind. g) avec la « Correction des exercices » du livre (p. 111 à 127).
   Chaque question montre l’énoncé et le schéma découpés dans le livre. */
(function () {
  var SRC = 'AGA 03 — exercices et correction du livre';
  var qs = [];
  function q(l, n, t, good, bad, e, w) {
    var o = { l: l, img: 'aga03ex/ex' + String(n).padStart(2, '0') + '.png', q: 'Ex ' + n + ' — ' + t, c: [good].concat(bad), e: e, src: SRC };
    if (w) o.w = w;
    qs.push(o);
  }
  var L = { c: 'aga03-courant', t: 'aga03-tension', r: 'aga03-resistance', a: 'aga03-associations', p: 'aga03-puissance', g: 'aga03-generateurs', ac: 'aga03-alternatif', d: 'aga03-diodes', tr: 'aga03-transistor', cd: 'aga03-condensateur' };

  q(L.c, 1, 'Quelle est, en ampère, la valeur d’un courant de 10 milliampères ?', '0,010 A', ['0,10 A', '10 000 A'], '10 mA ÷ 1 000 = 0,010 A.');
  q(L.c, 2, 'Quelle est, en milliampères, la valeur d’un courant de 0,15 A ?', '150 mA', ['15 mA', '1 500 mA'], '0,15 A × 1 000 = 150 mA.');
  q(L.c, 3, 'IG = 9 A, IR1 = 2 A et IR3 = 4 A. Déterminer la valeur du courant IR2.', '3 A', ['15 A', '6 A'], 'Loi des nœuds : IG = IR1 + IR2 + IR3 → IR2 = 9 − 2 − 4 = 3 A.');
  q(L.c, 4, 'I1 = 2 A, I3 = 5 A et I5 = 4 A. Quelles sont les valeurs des courants I2 et I4 ?', 'I2 = 3 A ; I4 = 1 A', ['I2 = 7 A ; I4 = 9 A', 'I2 = 1 A ; I4 = 3 A'], 'Nœud gauche : I1 + I2 = I3 → I2 = 5 − 2 = 3 A. Nœud droit : I3 = I4 + I5 → I4 = 5 − 4 = 1 A.');
  q(L.c, 5, 'Quelle section minimale de conducteur en cuivre choisir pour un courant I = 15 A ?', '2,5 à 3 mm²', ['1 mm²', '15 mm²'], 'Densité de courant du cuivre : 5 à 7 A/mm² → 15 / 6 = 2,5 mm² ; 15 / 5 = 3 mm².');
  q(L.c, 6, 'Batterie de 112 Ah ; récepteur alimenté pendant 5 h 36 min. Courant maximal du récepteur ?', '20 A', ['21,4 A', '2 A'], '5 h 36 = 336 min ÷ 60 = 5,6 h. I = Q / t = 112 / 5,6 = 20 A.', '5 h 36 ≠ 5,36 h.');

  q(L.t, 7, 'Quel est le potentiel de S, sachant que celui de K est de 20 V et que la d.d.p. USK est de + 50 V ?', '70 V', ['30 V', '−30 V'], 'USK = VS − VK → VS = 50 + 20 = 70 V.');
  q(L.t, 8, 'UG = 24 V ; UR1 = 9 V ; UR3 = 12 V. Calculer UR2 et la d.d.p. UAM.', 'UR2 = 3 V ; UAM = 15 V', ['UR2 = 3 V ; UAM = 21 V', 'UR2 = 45 V ; UAM = 57 V'], 'Loi des mailles : UG = UR1 + UR2 + UR3 → UR2 = 24 − 9 − 12 = 3 V. UAM = UR2 + UR3 = 3 + 12 = 15 V.');
  q(L.t, 9, 'Potentiels : A = 8 V, B = 4 V, C = 2 V. Calculer UAB, UBC, UAC et UCA.', 'UAB = 4 V ; UBC = 2 V ; UAC = 6 V ; UCA = −6 V', ['UAB = 12 V ; UBC = 6 V ; UAC = 10 V ; UCA = 10 V', 'UAB = −4 V ; UBC = −2 V ; UAC = −6 V ; UCA = 6 V'], 'UAB = VA − VB = 4 V ; UBC = 2 V ; UAC = 6 V = UAB + UBC ; UCA = −UAC = −6 V.');
  q(L.t, 10, 'Potentiels : A = + 30 mV, B = + 20 mV, C = − 50 mV. Calculer UAB, UBC et UCA.', 'UAB = 10 mV ; UBC = 70 mV ; UCA = −80 mV', ['UAB = 50 mV ; UBC = −30 mV ; UCA = 20 mV', 'UAB = 10 mV ; UBC = −30 mV ; UCA = 80 mV'], 'UAB = 30 − 20 = 10 mV ; UBC = 20 − (−50) = 70 mV ; UCA = −50 − 30 = −80 mV.');

  q(L.r, 11, 'Donner la valeur de la résistance ainsi que sa tolérance (rouge, rouge, rouge, argent).', '2,2 kΩ ± 10 %', ['222 Ω ± 5 %', '22 kΩ ± 10 %'], 'Rouge = 2, rouge = 2, multiplicateur rouge = × 100 → 2 200 Ω ; argent = ± 10 %.', 'La 3ᵉ bague est le multiplicateur (nombre de zéros).');
  q(L.r, 12, 'Donner la valeur de la résistance ainsi que sa tolérance.', '47 kΩ ± 5 %', ['4,7 kΩ ± 10 %', '470 kΩ ± 5 %'], 'Correction du livre : 47 kΩ ± 5 % (or = ± 5 %).');
  q(L.r, 13, 'Donner la valeur de la résistance ainsi que sa tolérance.', '6,8 MΩ ± 5 %', ['68 kΩ ± 5 %', '6,8 kΩ ± 10 %'], 'Correction du livre : 6,8 MΩ ± 5 % (or = ± 5 %).');
  q(L.r, 14, 'Calculer les trois valeurs manquantes du tableau (circuit 1 : ? / 150 Ω / 10 mA ; circuit 2 : 28 V / ? / 4 A ; circuit 3 : 0,3 kV / 5 000 Ω / ?).', '1,5 V ; 7 Ω ; 60 mA', ['1 500 V ; 112 Ω ; 16,7 A', '15 V ; 7 Ω ; 6 mA'], 'U = 150 × 0,010 = 1,5 V ; R = 28 / 4 = 7 Ω ; I = 300 / 5 000 = 0,06 A = 60 mA.');
  q(L.r, 15, 'Bobine de 750 m, section 2,5 mm², ρ = 1,8 × 10⁻⁸ Ω.m. Résistance du fil ?', '5,4 Ω', ['0,54 Ω', '54 Ω'], 'R = ρ × L / S = 1,8 × 10⁻⁸ × 750 / 2,5 × 10⁻⁶ = 5,4 Ω.');
  q(L.r, 16, 'Fil de tungstène (ρ = 5,6 × 10⁻⁷ Ω.m), longueur 10 m, diamètre 1/10ᵉ de mm. Résistance ?', '713 Ω', ['71,3 Ω', '178 Ω'], 'S = π × d² / 4 = 3,14 × (0,1 × 10⁻³)² / 4 = 7,85 × 10⁻⁹ m². R = 5,6 × 10⁻⁷ × 10 / 7,85 × 10⁻⁹ ≈ 713 Ω.', 'On donne le DIAMÈTRE : S = π d² / 4.');
  q(L.r, 17, 'Section 2,5 mm², résistance 8 Ω, ρ = 4 × 10⁻⁸ Ω.m. Longueur du conducteur ?', '500 m', ['50 m', '5 000 m'], 'L = R × S / ρ = 8 × 2,5 × 10⁻⁶ / 4 × 10⁻⁸ = 500 m.');
  q(L.r, 18, 'Fil de 300 m, résistance 5 Ω, ρ = 7 × 10⁻⁸ Ω.m. Section ?', '4,2 mm²', ['0,42 mm²', '42 mm²'], 'S = ρ × L / R = 7 × 10⁻⁸ × 300 / 5 = 4,2 × 10⁻⁶ m² = 4,2 mm².');
  q(L.r, 19, 'Distance générateur-récepteur 200 m, courant 10 A, Ug = 220 V, ρ = 2 × 10⁻⁸, S = 4 mm². Tension UR ?', '200 V', ['210 V', '220 V'], 'Ligne aller + retour = 400 m → R = 2 × 10⁻⁸ × 400 / 4 × 10⁻⁶ = 2 Ω ; chute = 2 × 10 = 20 V ; UR = 220 − 20 = 200 V.');

  q(L.a, 20, 'Calculer la résistance équivalente du montage (R1 = 2 Ω en série avec R2 = 20 Ω // R3 = 30 Ω).', '14 Ω', ['52 Ω', '12 Ω'], 'R2 // R3 = 600 / 50 = 12 Ω ; + R1 = 14 Ω.');
  q(L.a, 21, 'Calculer la résistance équivalente (R1 = 80 Ω en parallèle avec R2 + R3 = 12 + 8 Ω).', '16 Ω', ['100 Ω', '20 Ω'], 'R23 = 20 Ω ; 80 × 20 / 100 = 16 Ω.');
  q(L.a, 22, 'Calculer la résistance équivalente (R1 = 8, R2 = 20, R3 = 12, R4 = 6, R5 = 7, R6 = 19 Ω).', '20 Ω', ['72 Ω', '12 Ω'], 'R3 // R4 = 4 Ω ; + R5 + R6 = 30 Ω ; // R2 = 12 Ω ; + R1 = 20 Ω.');
  q(L.a, 23, 'Calculer la résistance équivalente (R1 = 10, R2 = 20, R3 = 60, R4 = 5, R5 = 30 Ω).', '22 Ω', ['125 Ω', '12 Ω'], 'R2 // R3 = 15 Ω ; + R4 = 20 Ω ; // R5 = 12 Ω ; + R1 = 22 Ω.');
  q(L.a, 24, 'Calculer la résistance équivalente (R1 = 20, R2 = 10, R3 = 20, R4 = 8, R5 = 5, R6 = 25 Ω).', '12 Ω', ['88 Ω', '20 Ω'], 'R12 = 30 ; // R3 = 12 ; + R4 = 20 ; R56 = 30 ; 20 // 30 = 12 Ω.');
  q(L.a, 25, 'Calculer : Ig, UR1, IR1, IR2, UR2, IR3, UR3 (Ug = 48 V).', 'Ig = 3 A ; UR1 = 48 V ; IR1 = 0,6 A ; IR2 = IR3 = 2,4 A ; UR2 = 28,8 V ; UR3 = 19,2 V', ['Ig = 3 A ; UR1 = 24 V ; IR1 = 0,3 A ; IR2 = IR3 = 2,7 A ; UR2 = 32,4 V ; UR3 = 21,6 V', 'Ig = 2,4 A ; UR1 = 48 V ; IR1 = 0,6 A ; IR2 = IR3 = 1,8 A ; UR2 = 21,6 V ; UR3 = 14,4 V'], 'Ig = 48 / 16 = 3 A ; R1 aux bornes du générateur → 48 V, 0,6 A ; IR2 = 3 − 0,6 = 2,4 A ; UR2 = 12 × 2,4 ; UR3 = 8 × 2,4.');
  q(L.a, 26, 'Calculer Ig, UR1, UR2, IR2, IR6 (Ug = 60 V).', 'Ig = 3 A ; UR1 = 24 V ; UR2 = 36 V ; IR2 = 1,8 A ; IR6 = 1,2 A', ['Ig = 3 A ; UR1 = 36 V ; UR2 = 24 V ; IR2 = 1,2 A ; IR6 = 1,8 A', 'Ig = 5 A ; UR1 = 40 V ; UR2 = 20 V ; IR2 = 1 A ; IR6 = 4 A'], 'Ig = 60 / 20 = 3 A ; UR1 = 24 V ; UR2 = 36 V ; IR2 = 36 / 20 = 1,8 A ; IR6 = 3 − 1,8 = 1,2 A. Suite : UR6 = 22,8 V, UR5 = 8,4 V, UR4 = UR3 = 4,8 V, IR4 = 0,8 A, IR3 = 0,4 A.');
  q(L.a, 27, 'Calculer dans l’ordre : Ig, UR1, UR5, IR5, IR4 (Ug = 22 V).', 'Ig = 1 A ; UR1 = 10 V ; UR5 = 12 V ; IR5 = 0,4 A ; IR4 = 0,6 A', ['Ig = 1 A ; UR1 = 12 V ; UR5 = 10 V ; IR5 = 0,33 A ; IR4 = 0,67 A', 'Ig = 2 A ; UR1 = 20 V ; UR5 = 2 V ; IR5 = 0,07 A ; IR4 = 1,93 A'], 'Ig = 22 / 22 = 1 A ; UR1 = 10 V ; UR5 = 12 V ; IR5 = 0,4 A ; IR4 = 0,6 A. Suite : UR4 = 3 V, UR3 = UR2 = 9 V, IR3 = 0,15 A, IR2 = 0,45 A.');
  q(L.a, 28, 'Calculer : UR5, UR4, UR2 (Ug = 24 V).', 'UR5 = 4 V ; UR4 = 9,6 V ; UR2 = 4,8 V', ['UR5 = 20 V ; UR4 = 9,6 V ; UR2 = 9,6 V', 'UR5 = 4 V ; UR4 = 14,4 V ; UR2 = 4,8 V'], 'IR5 = 24 / 30 = 0,8 A → UR5 = 4 V ; Ig = 2 A → IR4 = 1,2 A → UR4 = 9,6 V ; UR3 = 14,4 V → IR1 = 0,48 A → UR2 = 4,8 V.');
  q(L.a, 29, 'Pont diviseur : Ug = 24 V ; R1 = 16 Ω ; R2 = 20 Ω ; R3 = 12 Ω en série. Calculer UR1, UR2, UR3.', 'UR1 = 8 V ; UR2 = 10 V ; UR3 = 6 V', ['UR1 = 8 V ; UR2 = 8 V ; UR3 = 8 V', 'UR1 = 16 V ; UR2 = 20 V ; UR3 = 12 V'], 'R = 48 Ω → I = 0,5 A ; UR1 = 16 × 0,5 = 8 V ; UR2 = 10 V ; UR3 = 6 V. (Pont diviseur : UR = Ug × R / Rtotale.)');
  q(L.a, 30, 'Dérivation des courants : Ig = 3 A ; R1 = 12 Ω ; R2 = 6 Ω. Calculer IR1, IR2 et UG.', 'IR1 = 1 A ; IR2 = 2 A ; UG = 24 V', ['IR1 = 2 A ; IR2 = 1 A ; UG = 24 V', 'IR1 = 1,5 A ; IR2 = 1,5 A ; UG = 18 V'], 'Correction du livre : IR1 = 1 A, IR2 = 2 A, UG = 24 V. Le courant se partage à l’inverse des résistances : la branche 2 fois moins résistante prend 2 fois plus de courant.');
  q(L.a, 31, 'Potentiomètre : résistance équivalente totale, curseur en H puis en B ?', 'H : 16 Ω ; B : 48 Ω', ['H : 48 Ω ; B : 16 Ω', 'H : 80 Ω ; B : 120 Ω'], 'Correction du livre : H → 16 Ω (IRV = 0,4 A, IR1 = 0, UR2 = 12,8 V, IR3 = 0,96 A) ; B → 48 Ω (IR1 = 0,266 A, IR2 = 0). Le montage rhéostatique fait varier l’intensité, le montage potentiométrique fait varier la tension.');

  q(L.p, 32, 'Un moteur de 1/10 ch est alimenté sous 12 V. Intensité consommée ?', '6,13 A', ['0,61 A', '61,3 A'], 'P = 736 / 10 = 73,6 W ; I = 73,6 / 12 = 6,13 A.');
  q(L.p, 33, 'Voiture à l’arrêt en feux de détresse : lampes de 7 W, batterie 14 V / 60 Ah. Durée maximale de fonctionnement ?', '60 heures', ['30 heures', '120 heures'], 'Correction du livre : 60 h. 4 lampes × 7 W = 28 W, mais elles clignotent (allumées la moitié du temps) → 14 W en moyenne → I = 14 / 14 = 1 A → t = 60 / 1 = 60 h.', 'Le livre ne détaille pas le calcul : l’explication par le clignotement est celle qui donne 60 h.');
  q(L.p, 34, 'Moteur : puissance utile 100 W, tension 12,5 V, rendement 80 %. Intensité consommée ?', '10 A', ['8 A', '6,4 A'], 'Puissance absorbée = 100 / 0,8 = 125 W ; I = 125 / 12,5 = 10 A.', 'Le rendement : Pabsorbée = Putile / η (toujours plus grande).');
  q(L.p, 35, 'Récepteur de 10 W alimenté pendant une année ; kWh à 11,416 centimes. Coût ?', '10 €', ['1 €', '100 €'], 'W = 10 W × 8 760 h = 87,6 kWh ; 87,6 × 0,11416 ≈ 10 €.');

  q(L.g, 36, 'Calculer IR3, UR2, Ig, UR1, Ug et la résistance interne r (E = 16,2 V).', 'IR3 = 1 A ; UR2 = 12 V ; Ig = 3 A ; UR1 = 3 V ; Ug = 15 V ; r = 0,4 Ω', ['IR3 = 1 A ; UR2 = 12 V ; Ig = 2 A ; UR1 = 2 V ; Ug = 14 V ; r = 1,1 Ω', 'IR3 = 12 A ; UR2 = 12 V ; Ig = 14 A ; UR1 = 14 V ; Ug = 26 V ; r = 0,7 Ω'], 'IR3 = 12 / 12 = 1 A ; UR2 = UR3 = 12 V ; Ig = 2 + 1 = 3 A ; UR1 = 3 V ; Ug = 15 V ; r = (16,2 − 15) / 3 = 0,4 Ω.');
  q(L.g, 37, 'Calculer UR3, UR2, IR2, IR1, UR1, Ug et la f.e.m. E (2 × R1 = R2 = R3 = 20 Ω ; IR3 = 0,5 A ; r = 0,1 Ω).', 'UR3 = UR2 = 10 V ; IR2 = 0,5 A ; IR1 = 1 A ; UR1 = 10 V ; Ug = 20 V ; E = 20,1 V', ['UR3 = UR2 = 10 V ; IR2 = 0,5 A ; IR1 = 1 A ; UR1 = 20 V ; Ug = 30 V ; E = 30,1 V', 'UR3 = 10 V ; UR2 = 20 V ; IR2 = 1 A ; IR1 = 1,5 A ; UR1 = 15 V ; Ug = 35 V ; E = 35,15 V'], 'R1 = 10 Ω ; E = Ug + r × I = 20 + 0,1 × 1 = 20,1 V.');
  q(L.g, 38, 'G1 (24 V ; 20 mΩ ; 100 Ah) et G2 (24 V ; 30 mΩ ; 60 Ah) : série puis parallèle ?', 'Série : 48 V, 50 mΩ, 60 Ah, 47,5 V · Parallèle : 24 V, 12 mΩ, 160 Ah, 23,88 V', ['Série : 48 V, 12 mΩ, 160 Ah · Parallèle : 24 V, 50 mΩ, 60 Ah', 'Série : 24 V, 50 mΩ, 160 Ah · Parallèle : 48 V, 12 mΩ, 60 Ah'], 'Série : E et r s’ajoutent, capacité la plus faible. Parallèle : même E, r = 20 × 30 / 50 = 12 mΩ, capacités ajoutées. Ug = E − r × 10 A.');

  q(L.ac, 39, 'D’après le signal (359,2 V crête à crête, 8,33 ms), calculer la fréquence et la tension efficace.', 'f = 60 Hz ; Ueff = 126,92 V', ['f = 120 Hz ; Ueff = 254 V', 'f = 60 Hz ; Ueff = 254 V'], '8,33 ms = une demi-période → T = 16,67 ms → f = 1 / T = 60 Hz. 359,2 V crête à crête → Umax = 179,6 V → Ueff = 179,6 / √2 ≈ 127 V (correction : 126,92 V).', 'Lire si la cote est une demi-période et si la tension est crête à crête.');
  q(L.ac, 40, 'Moteur de 3 ch, rendement 80 %, cos φ = 0,82, alimenté en monophasé 230 V. Intensité ?', '14,63 A', ['11,7 A', '9,6 A'], 'Putile = 3 × 736 = 2 208 W ; Pabsorbée = 2 208 / 0,8 = 2 760 W ; I = P / (U × cos φ) = 2 760 / (230 × 0,82) = 14,63 A.');
  q(L.ac, 41, 'Tension phase-neutre mesurée : 239,6 V. Tension entre deux phases ?', '415 V', ['138 V', '339 V'], 'U = V × √3 = 239,6 × 1,732 ≈ 415 V.');
  q(L.ac, 42, 'Moteur de 3 ch, rendement 80 %, cos φ = 0,82, en triphasé 380 V. Intensité par phase ?', '≈ 5,1 A', ['14,63 A', '8,9 A'], 'Même méthode que l’exercice 40 : Pabsorbée = 2 760 W ; I = P / (U × cos φ × √3) = 2 760 / (380 × 0,82 × 1,732) ≈ 5,1 A.', 'Le corrigé du livre donne 4,2 A : c’est le résultat sans le rendement (≈ 4,1 A). Avec la méthode de l’exercice 40 on trouve 5,1 A. À faire confirmer par le formateur.');

  q(L.d, 43, 'Indiquer les repères des composants traversés par un courant.', 'D2, D4, D3, R1, R2', ['D1, R1, R2', 'D1, D2, D3, D4'], 'Correction du livre : D2, D4, D3, R1, R2 (on flèche le courant depuis le + : seules les diodes dans le sens anode → cathode conduisent).');
  q(L.d, 44, 'Ug = 12 V ; VDel = 2 V ; IDel = 10 mA. Calculer R1.', '1 kΩ', ['1,2 kΩ', '200 Ω'], 'UR1 = 12 − 2 = 10 V ; R1 = 10 / 0,01 = 1 000 Ω.');
  q(L.d, 45, 'S1 ouvert et S2 fermé : quelles Del sont allumées ?', 'Del 2, Del 3, Del 4 allumées ; Del 1 éteinte', ['Toutes allumées', 'Del 1 seule allumée'], 'Tableau corrigé : ouvert/ouvert → toutes éteintes ; ouvert/fermé → Del 2, 3, 4 ; fermé/ouvert → Del 1, 2, 3 ; fermé/fermé → toutes. R1 = 1 kΩ ; R2 = 470 Ω.');
  q(L.d, 46, 'Ug = + 8 V : calculer UR3 et IR2, puis R1.', 'UR3 = 5 V ; IR2 = 0,3 A ; R1 = 8 Ω', ['UR3 = 8 V ; IR2 = 0,8 A ; R1 = 10 Ω', 'UR3 = 5,6 V ; IR2 = 0,1 A ; R1 = 24 Ω'], 'Correction du livre : UR3 = 5 V (tension de la Zéner) ; IR2 = 0,3 A ; R1 = 8 Ω.');
  q(L.d, 47, 'Ug = 12 V ; VZ = 10 V ; lampes 2 W ; IZ = 100 mA. Calculer Ig, UR2, R1 = R2.', 'Ig = 0,5 A ; UR2 = 2 V ; R1 = R2 = 8 Ω', ['Ig = 0,4 A ; UR2 = 1 V ; R1 = R2 = 5 Ω', 'Ig = 0,6 A ; UR2 = 10 V ; R1 = R2 = 20 Ω'], 'Correction du livre : Ig = 0,2 + 0,2 + 0,1 = 0,5 A ; UR2 = 2 V ; R1 = R2 = 8 Ω.');

  q(L.tr, 48, 'Transistor saturé (Ug2 = 13,8 V ; Rc = 37,5 Ω ; β = 200 ; Ig1 = 13,2 mA ; Vbe = 0,6 V). Calculer Ic, Ib, Rp, Rb.', 'Ic = 368 mA ; Ib = 1,84 mA ; Rp = 52,8 Ω ; Rb = 333 Ω', ['Ic = 368 mA ; Ib = 73,6 mA ; Rp = 8 Ω ; Rb = 60 Ω', 'Ic = 13,2 mA ; Ib = 0,066 mA ; Rp = 45 Ω ; Rb = 379 Ω'], 'Ic = 13,8 / 37,5 = 0,368 A ; Ib = 368 / 200 = 1,84 mA ; IRp = 13,2 − 1,84 = 11,36 mA → Rp = 0,6 / 0,01136 = 52,8 Ω ; Rb = (5 − 0,6) / 0,0132 = 333 Ω.');
  q(L.tr, 49, 'Ug = 24 V, Rc = 10 kΩ : quelle est la tension Vs lorsque Va = 0 V ? Quelle Va pour saturer le transistor ?', 'Vs = 24 V ; Va = 12,8 V', ['Vs = 0 V ; Va = 0,8 V', 'Vs = 12 V ; Va = 24 V'], 'Va = 0 → transistor bloqué → pas de courant dans Rc → Vs = Ug = 24 V. Correction du livre pour saturer : Va = 12,8 V.');
  q(L.tr, 50, 'Transistor saturé : calculer Ic, Ig2, Ib, Rb. Rôle de R1 ?', 'Ic = 100 mA ; Ig2 = 120 mA ; Ib = 1 mA ; Rb = 4,3 kΩ ; R1 = résistance ballast', ['Ic = 120 mA ; Ig2 = 100 mA ; Ib = 1,2 mA ; Rb = 3,6 kΩ ; R1 = résistance de charge', 'Ic = 100 mA ; Ig2 = 80 mA ; Ib = 10 mA ; Rb = 430 Ω ; R1 = diode de roue libre'], 'Ic = 20 V / 200 Ω = 100 mA (la Zéner fixe 20 V sur Rc) ; Ig2 = Ic + Iz = 120 mA ; Ib = 100 / 100 = 1 mA ; Rb = (5 − 0,7) / 0,001 = 4,3 kΩ ; R1 protège la Zéner (ballast).');
  q(L.tr, 51, 'Calculer Ib, IDEL, Rc. Valeur de VCE quand la Del est allumée ?', 'Ib = 0,1 mA ; IDEL = 10 mA ; Rc = 2,2 kΩ ; VCE = 0 V', ['Ib = 1 mA ; IDEL = 100 mA ; Rc = 220 Ω ; VCE = 24 V', 'Ib = 0,1 mA ; IDEL = 10 mA ; Rc = 2,4 kΩ ; VCE = 0,54 V'], 'Correction du livre : Ib = 0,1 mA ; IDEL = β × Ib = 10 mA ; Rc = (24 − 2) / 0,01 = 2,2 kΩ ; saturé → VCE = 0 V.');

  q(L.cd, 52, 'Trois condensateurs de 60 µF : comment obtenir 90 µF ?', 'Deux en série (30 µF) et le troisième en parallèle sur l’ensemble', ['Les trois en série', 'Les trois en parallèle'], 'C1 et C2 en série : 60 × 60 / 120 = 30 µF ; + C3 en parallèle : 30 + 60 = 90 µF.', 'Condensateurs : série = formule « produit / somme », parallèle = on additionne (l’inverse des résistances).');

  function les(id, title, nums, retenir, cle) {
    return { id: id, title: 'Livre AGA 03 — ' + title, html: '<p>Exercices ' + nums + ' du livre AGA 03, avec la correction du livre (p. 111 à 127). Touche une image pour l’agrandir.</p>',
      retenir: retenir, pieges: ['Toujours convertir (mA → A, min → h, mm² → m²) avant de calculer.'], memo: { cle: cle, flow: ['Lire l’énoncé et le schéma', 'Convertir les unités', 'Choisir la formule', 'Calculer et vérifier'], points: retenir.slice(0, 3), astuce: 'Pose toujours la formule avant les chiffres.' } };
  }
  REV.addExercises('elec', {
    lessons: [
      les(L.c, 'courant (Ex 1 à 6)', '1 à 6', ['1 A = 1 000 mA.', 'Loi des nœuds.', 'Cuivre : 5 à 7 A/mm².', 'Q = I × t.'], 'NŒUDS : ce qui entre = ce qui sort'),
      les(L.t, 'tension et potentiels (Ex 7 à 10)', '7 à 10', ['UAB = VA − VB.', 'UCA = − UAC.', 'Loi des mailles.'], 'TENSION = différence de potentiels'),
      les(L.r, 'résistances et résistivité (Ex 11 à 19)', '11 à 19', ['Code couleurs : 2 chiffres + multiplicateur + tolérance (or 5 %, argent 10 %).', 'U = R × I.', 'R = ρ L / S ; S = π d² / 4.'], 'R = ρ L / S'),
      les(L.a, 'associations, ponts diviseurs, potentiomètre (Ex 20 à 31)', '20 à 31', ['Série : R = R1 + R2.', 'Parallèle : R = R1 R2 / (R1 + R2).', 'Pont diviseur : UR = Ug × R / Rtotale.', 'Rhéostat → I ; potentiomètre → U.'], 'SÉRIE = même I · PARALLÈLE = même U'),
      les(L.p, 'puissance, rendement, énergie (Ex 32 à 35)', '32 à 35', ['P = U × I ; 1 ch = 736 W.', 'Pabsorbée = Putile / η.', 'W = P × t (kWh).'], 'P = U × I · η = Pu / Pa'),
      les(L.g, 'générateurs (Ex 36 à 38)', '36 à 38', ['Ug = E − r × I.', 'Série : E et r s’ajoutent, capacité la plus faible.', 'Parallèle : capacités ajoutées.'], 'Ug = E − rI'),
      les(L.ac, 'alternatif mono et triphasé (Ex 39 à 42)', '39 à 42', ['f = 1 / T ; Ueff = Umax / √2.', 'Mono : P = U I cos φ.', 'Tri : P = U I cos φ √3 ; U = V √3.'], '√2 pour l’efficace · √3 pour le triphasé'),
      les(L.d, 'diodes, Del, Zéner (Ex 43 à 47)', '43 à 47', ['Diode ≈ 0,6 V ; Del ≈ 2 V / 10 mA.', 'Zéner en inverse garde VZ.', 'R = (Ug − Vdiode) / I.'], 'DIODE : anode → cathode'),
      les(L.tr, 'transistor NPN (Ex 48 à 51)', '48 à 51', ['Saturé : VCE = 0 ; bloqué : pas de courant collecteur.', 'Ib = Ic / β.', 'Rb = (Ucommande − Vbe) / I.'], 'SATURÉ = interrupteur fermé'),
      les(L.cd, 'condensateurs (Ex 52)', '52', ['Parallèle : C = C1 + C2.', 'Série : C = C1 C2 / (C1 + C2).'], 'Condensateurs : l’inverse des résistances')
    ],
    questions: qs
  });

  REV.trancher.push({ sujet: 'AGA 03 exercice 42 : moteur 3 ch, η 80 %, cos φ 0,82, triphasé 380 V', a: 'Corrigé du livre : 4,2 A', b: 'Même méthode que l’exercice 40 (avec le rendement) : 2 760 / (380 × 0,82 × 1,732) ≈ 5,1 A', keep: 'À faire confirmer : le 4,2 A correspond au calcul sans le rendement (≈ 4,1 A).' });
})();
