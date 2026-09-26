/* Manœuvre de force : un calcul complet résolu dans l'ordre S-E-N-S-E-S-R-D (onglet Exercices corrigés). */
REV.addExercises('mdf', {
  lessons: [
    {
      id: 'calcul-senses', title: 'Calcul complet pas à pas : S-E-N-S-E-S-R-D',
      images: [{ src: 'mdf-emt-simple.png', cap: 'Rappel : mouflage simple, EMD sur le garant puis − 10 % à chaque poulie' }],
      html: `
<h3>Énoncé</h3>
<p>Un véhicule en panne (<b>fardeau roulant de 8 000 daN</b>) doit être remonté sur une <b>pente de 20 %</b>, en <b>terrain meuble</b> (fr = 0,3 ; fa = 0,35). On dispose d’une dépanneuse de <b>15 000 daN</b> équipée d’un treuil de <b>3 à 5 t</b> (câble Lc = 60 m, longueur de sécurité Ls = 6 m). On tire <b>au treuil, en traction droite</b>.</p>
<div class="box methode"><b>✎ On ne saute aucune étape</b><p>Chaque résultat sert à l’étape suivante : note-le avant de passer à la suite.</p></div>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Q01 — Étape 1 · S : ΣR = 4 000 daN.</b> Le fardeau roule : Rr = P × fr = 8 000 × 0,3 = 2 400 daN. Pente ≤ 50 % : Rp = P × p = 8 000 × 0,20 = 1 600 daN. Il MONTE : on ajoute → ΣR = 2 400 + 1 600 = <b>4 000 daN</b>.</li>
<li><b>Q02 — Étape 2 · E : EMD = 3 000 daN.</b> Force au treuil : on prend la valeur MINI → FT = 3 t = 3 000 daN. Adhérence de la dépanneuse : A = P × fa = 15 000 × 0,35 = 5 250 daN. FT &lt; A → <b>EMD = FT = 3 000 daN</b>.</li>
<li><b>Q03 — Étape 3 · N : 3 brins.</b> Nb = ΣR / EMD = 4 000 / 3 000 = 1,33 → 1ʳᵉ règle : arrondi à l’entier supérieur = 2 → 2ᵉ règle : 2 &lt; 4 → + 1 brin → <b>3 brins</b>.</li>
<li><b>Q04 — Étape 4 · S : mouflage simple.</b> 3 brins ≤ 5 → un seul câble suffit : <b>mouflage simple, traction droite au treuil</b> (on trace en partant du garant, le plus de brins côté fardeau).</li>
<li><b>Q05 — Étape 5 · E : EMT = 8 130 daN.</b> On applique l’EMD sur le 1ᵉʳ brin (garant) puis − 10 % à chaque poulie : 3 000 → 2 700 → 2 430. EMT = 3 000 + 2 700 + 2 430 = <b>8 130 daN</b>.</li>
<li><b>Q06 — Étape 6 · S : 103 % → enlever 1 brin.</b> S = (EMT − ΣR) / ΣR × 100 = (8 130 − 4 000) / 4 000 × 100 ≈ <b>103 %</b> &gt; 70 % → trop : <b>on enlève 1 brin</b> (3 → 2) et on <b>revient à l’étape 4</b>.</li>
<li><b>Q07 — Retour étapes 4-5-6 avec 2 brins : S = 42,5 %.</b> Schéma : une poulie sur le fardeau, garant au treuil, dormant au point fixe. EMT = 3 000 + 2 700 = 5 700 daN. S = (5 700 − 4 000) / 4 000 × 100 = <b>42,5 %</b> → entre 15 et 70 % : <b>on garde 2 brins</b>.</li>
<li><b>Q08 — Étape 7 · R : point fixe ≥ 2 700 daN → 2 chevalets.</b> Le point fixe reçoit le dormant : 2 700 daN. En terrain meuble on retient les valeurs MINI du lot Holmès : 1 chevalet = 2 000 daN (insuffisant), <b>2 chevalets = 4 000 daN</b> ✔. Câble et poulie : CMU ≥ brin le plus chargé (3 000 daN) ; l’accrochage de la poulie au fardeau reçoit 3 000 + 2 700 = 5 700 daN.</li>
<li><b>Q09 — Étape 8 · D : DPF = 27 m.</b> Traction au treuil : DPF = (Lc − Ls) / Nb = (60 − 6) / 2 = <b>27 m</b>.</li>
<li><b>Q10 — Étape 8 · D : le fardeau avance de 27 m.</b> Au treuil : D fardeau = (Lc − Ls) / Nb total = 54 / 2 = <b>27 m</b> ; s’il faut aller plus loin, on refait une manœuvre.</li>
</ol>`,
      retenir: ['Toujours : ΣR → EMD → Nb → schéma → EMT → sécurité → points fixes → distances.', 'Sécurité hors 15–70 % : on change le nombre de brins et on reprend à l’étape 4.'],
      pieges: ['Treuil : prendre la valeur MINI (3 t, pas 5 t).', 'Pente qui MONTE : on ajoute Rp.', 'Au treuil : diviser par Nb ; au crochet : par Nb − 1.'],
      memo: { cle: '4 000 → 3 000 → 3 brins → 103 % → 2 brins → 42,5 %', flow: ['S : ΣR = 4 000', 'E : EMD = 3 000', 'N : 3 brins', 'S : simple', 'E : 8 130', 'S : 103 % → 2 brins', 'R : 2 chevalets', 'D : 27 m'], points: ['Rr = P × fr ; Rp = P × p %', 'EMT : × 0,9 par poulie'], astuce: 'Chaque étape se nourrit de la précédente : écris le résultat avant de continuer.' }
    }
  ],
  questions: [
    { l: 'calcul-senses', q: 'Q01 — Étape 1 (S) : fardeau roulant de 8 000 daN, terrain meuble (fr = 0,3), montée d’une pente de 20 %. Somme des résistances ΣR ?', c: ['4 000 daN', '2 400 daN', '800 daN', '10 400 daN'], e: 'Rr = 8 000 × 0,3 = 2 400 daN ; Rp = 8 000 × 0,20 = 1 600 daN ; on MONTE → on ajoute : 4 000 daN.', r: 'ΣR = Rr (ou Rg) ± Rp.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q02 — Étape 2 (E) : treuil de 3 à 5 t, dépanneuse de 15 000 daN en terrain meuble (fa = 0,35). Effort moteur disponible ?', c: ['3 000 daN', '5 000 daN', '5 250 daN', '4 500 daN'], e: 'On prend le mini du treuil : 3 000 daN. A = 15 000 × 0,35 = 5 250 daN > FT → EMD = FT = 3 000 daN.', r: 'Le plus faible commande.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q03 — Étape 3 (N) : ΣR = 4 000 daN et EMD = 3 000 daN. Nombre de brins ?', c: ['3 brins', '2 brins', '4 brins', '1 brin'], e: '4 000 / 3 000 = 1,33 → arrondi 2 → 2 < 4 → + 1 = 3 brins.', r: 'Arrondir, puis + 1 (< 4) ou + 2 (≥ 4).', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q04 — Étape 4 (S) : quel schéma pour 3 brins ?', c: ['Un mouflage simple (≤ 5 brins)', 'Un mouflage composé obligatoire', 'Une traction renversée obligatoire', 'Impossible à réaliser'], e: 'Jusqu’à 5 brins, un seul câble suffit : mouflage simple. Au-delà : mouflage composé.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q05 — Étape 5 (E) : mouflage simple à 3 brins, EMD = 3 000 daN. Effort moteur total ?', c: ['8 130 daN', '9 000 daN', '5 700 daN', '8 100 daN'], e: '3 000 + 2 700 + 2 430 = 8 130 daN (− 10 % à chaque poulie).', r: '× 0,9 à chaque poulie.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q06 — Étape 6 (S) : ΣR = 4 000 daN, EMT = 8 130 daN. Que conclure ?', c: ['S ≈ 103 % > 70 % : enlever 1 brin', 'S ≈ 103 % : c’est parfait', 'S ≈ 51 % : on garde 3 brins', 'S < 15 % : ajouter 1 brin'], e: '(8 130 − 4 000) / 4 000 × 100 ≈ 103 % : au-dessus de 70 %, on enlève 1 brin et on revient au schéma.', r: '15 % ≤ S ≤ 70 %.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q07 — Retour aux étapes 4-5-6 avec 2 brins (EMD 3 000 daN, ΣR 4 000 daN). EMT et sécurité ?', c: ['EMT = 5 700 daN ; S = 42,5 % → on garde 2 brins', 'EMT = 6 000 daN ; S = 50 %', 'EMT = 5 700 daN ; S = 142 % → enlever encore 1 brin', 'EMT = 2 700 daN ; S < 15 %'], e: '3 000 + 2 700 = 5 700 daN ; (5 700 − 4 000) / 4 000 = 42,5 % : entre 15 et 70 %.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q08 — Étape 7 (R) : le point fixe reçoit le dormant (2 700 daN), en terrain meuble. Lot Holmès ?', c: ['2 chevalets (4 000 daN mini)', '1 chevalet (2 000 daN mini)', '1 chevalet (4 000 daN maxi)', 'Aucun point fixe n’est nécessaire'], e: 'Sol meuble → valeurs mini : 1 chevalet = 2 000 daN < 2 700 ; 2 chevalets = 4 000 daN ≥ 2 700.', r: 'Un point fixe résiste à la somme des efforts qui passent par lui.', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q09 — Étape 8 (D) : traction au treuil, Lc = 60 m, Ls = 6 m, 2 brins. Distance du point fixe ?', c: ['27 m', '54 m', '30 m', '18 m'], e: 'DPF = (Lc − Ls) / Nb = (60 − 6) / 2 = 27 m.', r: 'Treuil : / Nb ; crochet : (Lc − Lg) / (Nb − 1).', src: 'Calcul SENSESRD pas à pas' },
    { l: 'calcul-senses', q: 'Q10 — Étape 8 (D) : de combien le fardeau avance-t-il (Lc = 60 m, Ls = 6 m, 2 brins, au treuil) ?', c: ['27 m', '54 m', '60 m', '13,5 m'], e: 'D fardeau = (Lc − Ls) / Nb total = 54 / 2 = 27 m.', src: 'Calcul SENSESRD pas à pas' },
  ]
});
