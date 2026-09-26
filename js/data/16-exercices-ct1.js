/* Exercices du cours CT1 : onglet « Exercices corrigés » de l'électricité générale. */
REV.addExercises('elec', {
  lessons: [
    {
      id: 'exos-ct1', title: 'Exercices du cours CT1 (nœuds, mailles, Ohm, résistances)',
      html: `
<h3>Énoncé</h3>
<p>Les 12 exercices du fascicule « Révisions CT1 » (courant, tension, loi d’Ohm, associations de résistances, calcul complet d’un circuit), plus l’exemple résolu du cours. Le fascicule ne donne pas les réponses : elles sont <b>calculées pas à pas</b> ci-dessous, avec une vérification à chaque fois. Les montages sont décrits en toutes lettres dans chaque question.</p>
<div class="box methode"><b>✎ Méthode (boîte à outils)</b><ol>
<li>Flécher les courants (sens conventionnel) puis les tensions (générateur : même sens que I ; récepteur : sens inverse).</li>
<li>Réduire le montage : parallèle R1 × R2 / (R1 + R2), série R1 + R2, jusqu’à Req.</li>
<li>Ig = Ug / Req, puis redescendre : loi d’Ohm (U = R × I), loi des mailles (tension), loi des nœuds (courant).</li>
<li>Vérifier : les courants d’un nœud et les tensions d’une maille doivent « boucler ».</li></ol></div>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Q01 — Ex. 1 : 0,01 A.</b> 1 mA = 0,001 A, donc 10 mA = 10 × 0,001 = 0,01 A.</li>
<li><b>Q02 — Ex. 2 : 150 mA.</b> On multiplie par 1 000 : 0,15 × 1 000 = 150 mA.</li>
<li><b>Q03 — Ex. 3 : 3 A.</b> Loi des nœuds : IG = IR1 + IR2 + IR3 → IR2 = 9 − 2 − 4 = 3 A.</li>
<li><b>Q04 — Ex. 4 (I2) : 3 A.</b> Entrants = sortants : I1 + I2 = I3 → I2 = 5 − 2 = 3 A.</li>
<li><b>Q05 — Ex. 4 (I4) : 1 A.</b> I3 = I4 + I5 → I4 = 5 − 4 = 1 A.</li>
<li><b>Q06 — Ex. 5 : 70 V.</b> U(SK) = V(S) − V(K) → V(S) = U(SK) + V(K) = 50 + 20 = 70 V.</li>
<li><b>Q07 — Ex. 6 (UR2) : 3 V.</b> Loi des mailles : UG − UR1 − UR2 − UR3 = 0 → UR2 = 24 − 9 − 12 = 3 V.</li>
<li><b>Q08 — Ex. 6 (UAM) : 15 V.</b> Entre A et M il y a R2 et R3 : UAM = UR2 + UR3 = 3 + 12 = 15 V (ou UG − UR1 = 24 − 9 = 15 V).</li>
<li><b>Q09 — Ex. 7 (UAB) : 4 V.</b> UAB = VA − VB = 8 − 4 = 4 V.</li>
<li><b>Q10 — Ex. 7 (UBC) : 2 V.</b> UBC = VB − VC = 4 − 2 = 2 V.</li>
<li><b>Q11 — Ex. 7 (UAC) : 6 V.</b> UAC = VA − VC = 8 − 2 = 6 V.</li>
<li><b>Q12 — Ex. 7 (UCA) : − 6 V.</b> UCA = VC − VA = 2 − 8 = − 6 V.</li>
<li><b>Q13 — Ex. 7 (relation) : UAC = UAB + UBC et UCA = − UAC.</b> 4 + 2 = 6 V : les tensions s’additionnent comme des dénivelés ; inverser les indices change le signe.</li>
<li><b>Q14 — Ex. 8 (1) : 1,5 V.</b> U = R × I = 150 × 0,01 = 1,5 V (convertir 10 mA en 0,01 A).</li>
<li><b>Q15 — Ex. 8 (2) : 7 Ω.</b> R = U / I = 28 / 4 = 7 Ω.</li>
<li><b>Q16 — Ex. 8 (3) : 0,06 A (60 mA).</b> 0,3 kV = 300 V ; I = U / R = 300 / 5 000 = 0,06 A = 60 mA.</li>
<li><b>Q17 — Ex. 9 : 14 Ω.</b> R2 // R3 = 20 × 30 / (20 + 30) = 12 Ω ; puis en série avec R1 : 2 + 12 = 14 Ω.</li>
<li><b>Q18 — Ex. 10 : 16 Ω.</b> Branche R2 + R3 = 20 Ω ; en parallèle avec R1 : 80 × 20 / (80 + 20) = 16 Ω.</li>
<li><b>Q19 — Ex. 11 (Ig) : 3 A.</b> Ig = Ug / Req = 48 / 16 = 3 A.</li>
<li><b>Q20 — Ex. 11 (R1) : UR1 = 48 V et IR1 = 0,6 A.</b> R1 est directement aux bornes du générateur : UR1 = 48 V ; IR1 = 48 / 80 = 0,6 A.</li>
<li><b>Q21 — Ex. 11 (branche) : 2,4 A.</b> Loi des nœuds : 3 − 0,6 = 2,4 A (ou 48 / (12 + 8) = 2,4 A). Même courant dans R2 et R3 (série).</li>
<li><b>Q22 — Ex. 11 (tensions) : UR2 = 28,8 V et UR3 = 19,2 V.</b> UR2 = 12 × 2,4 = 28,8 V ; UR3 = 8 × 2,4 = 19,2 V. Vérification : 28,8 + 19,2 = 48 V.</li>
<li><b>Q23 — Ex. 12 (Ig) : 1 A.</b> R2 // R3 = 20 × 60 / 80 = 15 Ω ; + R4 = 20 Ω ; // R5 : 20 × 30 / 50 = 12 Ω ; + R1 = 22 Ω. Ig = 22 / 22 = 1 A.</li>
<li><b>Q24 — Ex. 12 (UR1, UR5) : UR1 = 10 V et UR5 = 12 V.</b> UR1 = 10 × 1 = 10 V ; maille : UR5 = 22 − 10 = 12 V.</li>
<li><b>Q25 — Ex. 12 (IR5, IR4) : IR5 = 0,4 A et IR4 = 0,6 A.</b> IR5 = 12 / 30 = 0,4 A ; nœud : IR4 = 1 − 0,4 = 0,6 A.</li>
<li><b>Q26 — Ex. 12 (UR4, UR3) : UR4 = 3 V et UR3 = 9 V.</b> UR4 = 5 × 0,6 = 3 V ; maille : UR3 = UR5 − UR4 = 12 − 3 = 9 V (UR2 = UR3, en parallèle).</li>
<li><b>Q27 — Ex. 12 (IR3, IR2) : IR3 = 0,15 A et IR2 = 0,45 A.</b> IR3 = 9 / 60 = 0,15 A ; IR2 = 9 / 20 = 0,45 A. Vérification : 0,15 + 0,45 = 0,6 A = IR4.</li>
<li><b>Q28 — Exemple 5.2 : IG = 2 A ; UR1 = 16 V ; UR2 = UR3 = 24 V ; IR2 = 1,2 A ; IR3 = 0,8 A.</b> Req = 8 + 12 = 20 Ω → IG = 40 / 20 = 2 A ; UR1 = 8 × 2 = 16 V ; UR2 = 40 − 16 = 24 V ; IR2 = 24 / 20 = 1,2 A ; IR3 = 24 / 30 = 0,8 A (1,2 + 0,8 = 2 A).</li>
</ol>`,
      retenir: ['mA → A : diviser par 1 000.', 'U(AB) = V(A) − V(B).', 'Parallèle : R1 × R2 / (R1 + R2) ; série : somme.', 'Nœud → courant ; maille → tension ; Ohm → les trois.'],
      pieges: ['Convertir mA et kV avant d’appliquer la loi d’Ohm.', 'La formule R1 × R2 / (R1 + R2) ne s’applique qu’à 2 résistances à la fois.'],
      memo: { cle: 'FLÉCHER · RÉDUIRE · REDESCENDRE · VÉRIFIER', flow: ['Flécher I et U', 'Req', 'Ig = Ug / Req', 'Ohm, mailles, nœuds', 'Vérifier'], points: ['Ex. 9 : 14 Ω · Ex. 10 : 16 Ω', 'Ex. 11 : Ig 3 A, IR1 0,6 A, IR2 2,4 A', 'Ex. 12 : Req 22 Ω, Ig 1 A'], astuce: 'Un calcul juste « boucle » : les courants d’un nœud et les tensions d’une maille retombent sur leurs pieds.' }
    }
  ],
  questions: [
    { l: 'exos-ct1', q: 'Q01 — Exercice 1 : quelle est, en ampères, la valeur d’un courant de 10 mA ?', c: ['0,01 A', '0,1 A', '0,001 A'], e: '1 mA = 0,001 A, donc 10 mA = 10 × 0,001 = 0,01 A.', r: 'Diviser par 1 000 pour passer de mA à A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q02 — Exercice 2 : quelle est, en milliampères, la valeur d’un courant de 0,15 A ?', c: ['150 mA', '15 mA', '1 500 mA'], e: 'On multiplie par 1 000 : 0,15 × 1 000 = 150 mA.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q03 — Exercice 3 : trois résistances R1, R2, R3 en parallèle sur un générateur. IG = 9 A, IR1 = 2 A, IR3 = 4 A. Valeur de IR2 ?', c: ['3 A', '6 A', '15 A'], e: 'Loi des nœuds : IG = IR1 + IR2 + IR3 → IR2 = 9 − 2 − 4 = 3 A.', r: 'Parallèle : les courants s’additionnent.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q04 — Exercice 4 : au premier nœud, I1 = 2 A et I2 entrent, I3 = 5 A sort vers un second nœud. Valeur de I2 ?', c: ['3 A', '7 A', '2,5 A'], e: 'Entrants = sortants : I1 + I2 = I3 → I2 = 5 − 2 = 3 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q05 — Exercice 4 (suite) : au second nœud, I3 = 5 A entre, I4 et I5 = 4 A sortent. Valeur de I4 ?', c: ['1 A', '9 A', '4 A'], e: 'I3 = I4 + I5 → I4 = 5 − 4 = 1 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q06 — Exercice 5 : le potentiel de K vaut 20 V et la D.D.P. U(SK) = + 50 V. Potentiel de S ?', c: ['70 V', '30 V', '− 30 V'], e: 'U(SK) = V(S) − V(K) → V(S) = U(SK) + V(K) = 50 + 20 = 70 V.', r: 'U(AB) = V(A) − V(B) : le premier indice est à la pointe de la flèche.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q07 — Exercice 6 : R1, R2, R3 en série sur un générateur. UG = 24 V, UR1 = 9 V, UR3 = 12 V. Valeur de UR2 ?', c: ['3 V', '21 V', '45 V'], e: 'Loi des mailles : UG − UR1 − UR2 − UR3 = 0 → UR2 = 24 − 9 − 12 = 3 V.', r: 'Série : UG = somme des tensions des récepteurs.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q08 — Exercice 6 (suite) : A est entre R1 et R2, M après R3 (côté −). Valeur de la D.D.P. UAM ?', c: ['15 V', '9 V', '24 V'], e: 'Entre A et M il y a R2 et R3 : UAM = UR2 + UR3 = 3 + 12 = 15 V (ou UG − UR1 = 24 − 9 = 15 V).', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q09 — Exercice 7 : potentiels par rapport à 0 : A = 8 V, B = 4 V, C = 2 V. Valeur de UAB ?', c: ['4 V', '12 V', '− 4 V'], e: 'UAB = VA − VB = 8 − 4 = 4 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q10 — Exercice 7 : valeur de UBC ?', c: ['2 V', '6 V', '− 2 V'], e: 'UBC = VB − VC = 4 − 2 = 2 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q11 — Exercice 7 : valeur de UAC ?', c: ['6 V', '10 V', '− 6 V'], e: 'UAC = VA − VC = 8 − 2 = 6 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q12 — Exercice 7 : valeur de UCA ?', c: ['− 6 V', '6 V', '10 V'], e: 'UCA = VC − VA = 2 − 8 = − 6 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q13 — Exercice 7 : quelle relation existe entre ces D.D.P. ?', c: ['UAC = UAB + UBC et UCA = − UAC', 'UAC = UAB × UBC', 'UAB = UBC = UAC'], e: '4 + 2 = 6 V : les tensions s’additionnent comme des dénivelés ; inverser les indices change le signe.', r: 'Chasles : UAC = UAB + UBC.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q14 — Exercice 8, circuit 1 : R = 150 Ω, I = 10 mA. Tension U ?', c: ['1,5 V', '1 500 V', '15 V'], e: 'U = R × I = 150 × 0,01 = 1,5 V (convertir 10 mA en 0,01 A).', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q15 — Exercice 8, circuit 2 : U = 28 V, I = 4 A. Résistance R ?', c: ['7 Ω', '112 Ω', '0,14 Ω'], e: 'R = U / I = 28 / 4 = 7 Ω.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q16 — Exercice 8, circuit 3 : U = 0,3 kV, R = 5 000 Ω. Intensité I ?', c: ['0,06 A (60 mA)', '0,6 A', '16,7 A'], e: '0,3 kV = 300 V ; I = U / R = 300 / 5 000 = 0,06 A = 60 mA.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q17 — Exercice 9 : R1 = 2 Ω en série avec R2 = 20 Ω et R3 = 30 Ω en parallèle. Req ?', c: ['14 Ω', '52 Ω', '12 Ω'], e: 'R2 // R3 = 20 × 30 / (20 + 30) = 12 Ω ; puis en série avec R1 : 2 + 12 = 14 Ω.', r: 'Réduire d’abord le parallèle, puis additionner la série.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q18 — Exercice 10 : R1 = 80 Ω directement aux bornes du générateur, en parallèle avec une branche R2 = 12 Ω + R3 = 8 Ω en série. Req ?', c: ['16 Ω', '100 Ω', '6 Ω'], e: 'Branche R2 + R3 = 20 Ω ; en parallèle avec R1 : 80 × 20 / (80 + 20) = 16 Ω.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q19 — Exercice 11 : même montage que l’exercice 10 avec Ug = 48 V. Courant Ig ?', c: ['3 A', '0,6 A', '2,4 A'], e: 'Ig = Ug / Req = 48 / 16 = 3 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q20 — Exercice 11 : UR1 et IR1 ?', c: ['UR1 = 48 V et IR1 = 0,6 A', 'UR1 = 24 V et IR1 = 0,3 A', 'UR1 = 48 V et IR1 = 3 A'], e: 'R1 est directement aux bornes du générateur : UR1 = 48 V ; IR1 = 48 / 80 = 0,6 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q21 — Exercice 11 : IR2 = IR3 = ?', c: ['2,4 A', '3 A', '0,6 A'], e: 'Loi des nœuds : 3 − 0,6 = 2,4 A (ou 48 / (12 + 8) = 2,4 A). Même courant dans R2 et R3 (série).', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q22 — Exercice 11 : UR2 et UR3 ?', c: ['UR2 = 28,8 V et UR3 = 19,2 V', 'UR2 = 24 V et UR3 = 24 V', 'UR2 = 19,2 V et UR3 = 28,8 V'], e: 'UR2 = 12 × 2,4 = 28,8 V ; UR3 = 8 × 2,4 = 19,2 V. Vérification : 28,8 + 19,2 = 48 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q23 — Exercice 12 : Ug = 22 V, R1 = 10 Ω en série avec : [ (R2 = 20 Ω // R3 = 60 Ω) + R4 = 5 Ω ] en parallèle avec R5 = 30 Ω. Ig ?', c: ['1 A', '2,2 A', '0,5 A'], e: 'R2 // R3 = 20 × 60 / 80 = 15 Ω ; + R4 = 20 Ω ; // R5 : 20 × 30 / 50 = 12 Ω ; + R1 = 22 Ω. Ig = 22 / 22 = 1 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q24 — Exercice 12 : UR1 et UR5 ?', c: ['UR1 = 10 V et UR5 = 12 V', 'UR1 = 12 V et UR5 = 10 V', 'UR1 = 22 V et UR5 = 0 V'], e: 'UR1 = 10 × 1 = 10 V ; maille : UR5 = 22 − 10 = 12 V.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q25 — Exercice 12 : IR5 et IR4 ?', c: ['IR5 = 0,4 A et IR4 = 0,6 A', 'IR5 = 0,6 A et IR4 = 0,4 A', 'IR5 = 1 A et IR4 = 0 A'], e: 'IR5 = 12 / 30 = 0,4 A ; nœud : IR4 = 1 − 0,4 = 0,6 A.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q26 — Exercice 12 : UR4 et UR3 ?', c: ['UR4 = 3 V et UR3 = 9 V', 'UR4 = 9 V et UR3 = 3 V', 'UR4 = 6 V et UR3 = 6 V'], e: 'UR4 = 5 × 0,6 = 3 V ; maille : UR3 = UR5 − UR4 = 12 − 3 = 9 V (UR2 = UR3, en parallèle).', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q27 — Exercice 12 : IR3 et IR2 ?', c: ['IR3 = 0,15 A et IR2 = 0,45 A', 'IR3 = 0,45 A et IR2 = 0,15 A', 'IR3 = 0,3 A et IR2 = 0,3 A'], e: 'IR3 = 9 / 60 = 0,15 A ; IR2 = 9 / 20 = 0,45 A. Vérification : 0,15 + 0,45 = 0,6 A = IR4.', src: 'Cours CT1 (exercices corrigés)' },
    { l: 'exos-ct1', q: 'Q28 — Exemple résolu du cours : UG = 40 V, R1 = 8 Ω en série avec R2 = 20 Ω // R3 = 30 Ω. IG, UR1, UR2, IR2, IR3 ?', c: ['IG = 2 A ; UR1 = 16 V ; UR2 = UR3 = 24 V ; IR2 = 1,2 A ; IR3 = 0,8 A', 'IG = 5 A ; UR1 = 40 V ; UR2 = 0 V', 'IG = 0,5 A ; UR1 = 4 V ; UR2 = 36 V'], e: 'Req = 8 + 12 = 20 Ω → IG = 40 / 20 = 2 A ; UR1 = 8 × 2 = 16 V ; UR2 = 40 − 16 = 24 V ; IR2 = 24 / 20 = 1,2 A ; IR3 = 24 / 30 = 0,8 A (1,2 + 0,8 = 2 A).', src: 'Cours CT1 (exercices corrigés)' },
  ]
});
