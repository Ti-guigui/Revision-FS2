/* Exercices présents dans les livres de cours (hors cahiers déjà intégrés) :
   AGD 27 (distance d’arrêt), AGD 19 (démonstration, exercice 11, montages de distributeurs, désignation), AGD 20 (vérins de direction). */
(function () {
  var L = 'livres/';
  REV.addExercises('dsft', {
    lessons: [{
      id: 'livre-distance-arret', title: 'Livre AGD 27 — Distance de freinage et distance d’arrêt',
      html: `
<h3>Énoncé</h3>
<p><b>Formules du livre</b> : distance de freinage DF = V² ÷ 2γ avec γ = g × c (V en m/s, g ≈ 9,81 ou 10 m/s², c = coefficient d’adhérence). Distance parcourue pendant la réaction = V × temps de réaction. <b>Distance d’arrêt = distance de réaction + distance de freinage</b> (temps de réponse des freins hydrauliques ≈ 0).</p>
<p>km/h → m/s : ÷ 3,6 (72 km/h = 20 m/s ; 144 km/h = 40 m/s).</p>
<h3>Exemples du livre</h3>
<ul><li>72 km/h, c = 0,6, g = 9,81 : DF = 400 ÷ 11,772 = 33,97 m ; réaction 1 s = 20 m ; arrêt = 53,97 m.</li>
<li>144 km/h : DF = 1 600 ÷ 11,772 = 135,91 m ; réaction 40 m ; arrêt = 175,91 m.</li>
<li>Sol mouillé, pneus moyens : décélération divisée par 2 → distance de freinage doublée.</li></ul>
<p class="muted small">Exercice n° 2 du livre (108 km/h) : le coefficient d’adhérence est incomplet dans le livre (« 0. ») → à demander au formateur. Avec c = 0,5 et g = 10 : 30 m/s → DF = 900 ÷ 10 = 90 m + 15 m de réaction = 105 m.</p>
<h3>Corrigés (calculés avec les formules du livre)</h3>
<ol class="corr">
<li><b>Q01 — 200 m.</b> 144 km/h = 40 m/s ; DF = 40² ÷ (2 × 10 × 0,5) = 1 600 ÷ 10 = 160 m ; réaction 40 × 1 = 40 m ; arrêt = 200 m.</li>
<li><b>Q02 — 345 m.</b> 216 km/h = 60 m/s ; DF = 3 600 ÷ (2 × 10 × 0,6) = 300 m ; réaction 60 × 0,75 = 45 m ; arrêt = 345 m.</li>
</ol>`,
      retenir: ['DF = V² ÷ 2(g × c), V en m/s.', 'Arrêt = réaction (V × t) + freinage.', 'La distance de freinage augmente avec le CARRÉ de la vitesse : vitesse × 2 → distance × 4.'],
      pieges: ['Convertir les km/h en m/s (÷ 3,6) avant tout.', 'Ne pas oublier la distance parcourue pendant le temps de réaction.'],
      memo: { cle: 'ARRÊT = V × t + V² / 2gc', flow: ['km/h ÷ 3,6', 'Réaction : V × t', 'Freinage : V² ÷ 2gc', 'Addition'], points: ['72 km/h = 20 m/s', 'Mouillé → distance × 2'], astuce: 'Deux fois plus vite, quatre fois plus long pour freiner.' }
    }],
    questions: [
      { l: 'livre-distance-arret', q: 'Q01 — Exercice n° 1 : 144 km/h ; g = 10 m/s² ; coefficient d’adhérence 0,5 ; temps de réaction 1 s. Calculez la distance d’arrêt du véhicule.', c: ['200 m', '160 m', '240 m'], e: '40 m/s ; DF = 1 600 ÷ 10 = 160 m ; + 40 m de réaction = 200 m.', src: 'AGD 27 (corrigé calculé)' },
      { l: 'livre-distance-arret', q: 'Q02 — Exercice n° 3 : 216 km/h ; g = 10 m/s² ; coefficient d’adhérence 0,6 ; temps de réaction 0,75 s. Calculez la distance d’arrêt du véhicule.', c: ['345 m', '300 m', '405 m'], e: '60 m/s ; DF = 3 600 ÷ 12 = 300 m ; + 45 m = 345 m.', src: 'AGD 27 (corrigé calculé)' },
      { l: 'livre-distance-arret', q: 'Q03 — Exemple du livre : à 72 km/h (c = 0,6 ; g = 9,81 ; réaction 1 s), quelle est la distance d’arrêt ?', c: ['53,97 m', '33,97 m', '20 m'], e: 'DF = 33,97 m + 20 m de réaction = 53,97 m (exemple du livre).', src: 'AGD 27' },
      { l: 'livre-distance-arret', q: 'Q04 — Si la vitesse double, la distance de freinage est :', c: ['Multipliée par 4', 'Multipliée par 2', 'Inchangée'], e: 'DF = V² ÷ 2γ : elle augmente avec le carré de la vitesse (33,97 m à 72 km/h → 135,91 m à 144 km/h).', src: 'AGD 27' }
    ]
  });

  REV.addExercises('hydro', {
    lessons: [{
      id: 'livre-agd19', title: 'Livres AGD 19 / AGD 20 — Exercices du cours',
      images: [{ src: L + 'agd19-demonstration.jpg', cap: 'AGD 19 — Démonstration corrigée : pompe 30 cm³/tr à 1 500 tr/min, vérin 10 cm², 300 b' },
        { src: L + 'agd20-verins-direction.jpg', cap: 'AGD 20 — Vérins de direction : forces et vitesses à droite et à gauche (corrigé du livre)' },
        { src: L + 'agd19-ex2-serie.jpg', cap: 'AGD 19 — Exercice 2 : montage SÉRIE (tableau à compléter, pas de corrigé dans le livre)' },
        { src: L + 'agd19-ex2-individuel.jpg', cap: 'AGD 19 — Exercice 2 : montage INDIVIDUEL / prioritaire (pas de corrigé dans le livre)' },
        { src: L + 'agd19-ex2-parallele.jpg', cap: 'AGD 19 — Exercice 2 : montage PARALLÈLE (pas de corrigé dans le livre)' },
        { src: L + 'agd19-ex-designation.jpg', cap: 'AGD 19 — Exercice : désignation et rôle des éléments 1 à 5 (pas de corrigé dans le livre)' }],
      html: `
<h3>Énoncé</h3>
<p><b>Exercice 11 (AGD 19, p. 123)</b> : une pompe n°1 de 25 cm³ entraînée à 1 800 tr/min entraîne un moteur hydraulique de 20 cm³. Une pompe n°2, identique et jumelée, alimente un vérin de 30 cm² pour sortir ; la rentrée se fait à 0,5 m/s ; charge 2 000 daN. 1. Vitesse du moteur hydraulique ; 2. vitesse de sortie du vérin ; 3. diamètre de la tige ; 4. pression pour sortir et pour rentrer la charge ; 5. puissance utile du circuit de la pompe n°2.</p>
<p><b>Démonstration (AGD 19, p. 12, corrigée dans le livre)</b> : pompe 30 cm³/tr à 1 500 tr/min, vérin 10 cm², 300 b → Q = 45 L/min, v = 0,75 m/s, Fmax = 3 000 daN, Pu = 22,5 kW.</p>
<p><b>Vérins de direction (AGD 20, p. 61, corrigé dans le livre)</b> : Q = 60 L/min, 100 bar, S1 = 10 cm² (côté tige), S2 = 20 cm² (côté fond). Côté tige : F = 100 × 10 = 1 000 daN, v = 60 ÷ (6 × 10) = 1 m/s. Côté fond : F = 100 × 20 = 2 000 daN, v = 60 ÷ (6 × 20) = 0,5 m/s → gros déséquilibre droite / gauche ; solution : vérins équilibrés (plus encombrants et plus lourds).</p>
<p class="muted small">Les tableaux de l’exercice 2 (montages série, individuel, parallèle) et l’exercice de désignation n’ont pas de corrigé dans le livre : ils sont affichés ci-dessous pour t’entraîner ; fais-les valider par le formateur.</p>
<h3>Corrigé de l’exercice 11 (calculé avec les formules du livre — pas de corrigé imprimé)</h3>
<ol class="corr">
<li><b>Q01 — 2 250 tr/min.</b> Q1 = 25 × 1 800 ÷ 1 000 = 45 L/min ; N moteur = 45 × 1 000 ÷ 20 = 2 250 tr/min.</li>
<li><b>Q02 — 0,25 m/s.</b> Pompe 2 identique : 45 L/min ; v = 45 ÷ (6 × 30) = 0,25 m/s.</li>
<li><b>Q03 — ≈ 43,7 mm.</b> Rentrée à 0,5 m/s : section annulaire = 45 ÷ (6 × 0,5) = 15 cm² ; section de tige = 30 − 15 = 15 cm² ; d = √(4 × 15 ÷ π) ≈ 4,37 cm.</li>
<li><b>Q04 — 66,7 b pour sortir, 133,3 b pour rentrer.</b> P = 2 000 ÷ 30 et P = 2 000 ÷ 15.</li>
<li><b>Q05 — 5 kW en sortie, 10 kW en rentrée.</b> Pu = P × Q ÷ 600 = 66,7 × 45 ÷ 600 = 5 kW ; 133,3 × 45 ÷ 600 = 10 kW.</li>
</ol>`,
      retenir: ['Q = V × N ÷ 1 000 ; N moteur = Q × 1 000 ÷ V.', 'Vérin : côté fond = force, côté tige = vitesse.', 'Vérin équilibré = mêmes forces et vitesses dans les deux sens.'],
      pieges: ['Section de tige = section fond − section annulaire.', 'La pompe 2 « identique et jumelée » a le même débit que la pompe 1.'],
      memo: { cle: 'Q = V·N/1000 · v = Q/6S · P = F/S · Pu = P·Q/600', flow: ['Débit pompe', 'Vitesse (moteur ou vérin)', 'Pression = F/S', 'Puissance'], points: ['Direction : 1 000 daN / 1 m/s côté tige', '2 000 daN / 0,5 m/s côté fond'], astuce: 'Petite surface = vite mais faible ; grande surface = lent mais fort.' }
    }],
    questions: [
      { l: 'livre-agd19', q: 'Q01 — Exercice 11 : pompe n°1 de 25 cm³ à 1 800 tr/min, moteur hydraulique de 20 cm³. Vitesse du moteur hydraulique ?', c: ['2 250 tr/min', '1 440 tr/min', '1 800 tr/min'], e: 'Q = 45 L/min ; N = 45 000 ÷ 20 = 2 250 tr/min.', src: 'AGD 19 (corrigé calculé)' },
      { l: 'livre-agd19', q: 'Q02 — Exercice 11 : vitesse de sortie du vérin (30 cm²) alimenté par la pompe n°2 identique ?', c: ['0,25 m/s', '0,5 m/s', '1,5 m/s'], e: 'v = 45 ÷ (6 × 30) = 0,25 m/s.', src: 'AGD 19 (corrigé calculé)' },
      { l: 'livre-agd19', q: 'Q03 — Exercice 11 : la rentrée se fait à 0,5 m/s. Diamètre de la tige ?', c: ['≈ 43,7 mm', '≈ 61,8 mm', '15 mm'], e: 'Section annulaire = 15 cm² → tige = 30 − 15 = 15 cm² → d = √(60 ÷ π) ≈ 4,37 cm.', src: 'AGD 19 (corrigé calculé)' },
      { l: 'livre-agd19', q: 'Q04 — Exercice 11 : pression pour sortir puis pour rentrer la charge de 2 000 daN ?', c: ['66,7 b et 133,3 b', '133,3 b et 66,7 b', '66,7 b dans les deux sens'], e: 'P = F ÷ S : 2 000 ÷ 30 et 2 000 ÷ 15.', src: 'AGD 19 (corrigé calculé)' },
      { l: 'livre-agd19', q: 'Q05 — Exercice 11 : puissance utile du circuit de la pompe n°2 (45 L/min) ?', c: ['5 kW en sortie, 10 kW en rentrée', '10 kW en sortie, 5 kW en rentrée', '22,5 kW'], e: 'Pu = P × Q ÷ 600.', src: 'AGD 19 (corrigé calculé)' },
      { l: 'livre-agd19', img: L + 'agd19-demonstration.jpg', q: 'Q06 — Démonstration du livre : pompe 30 cm³/tr à 1 500 tr/min, vérin 10 cm², 300 b. Force maxi et puissance maxi ?', c: ['3 000 daN et 22,5 kW', '300 daN et 45 kW', '3 000 daN et 45 kW'], e: 'F = 300 × 10 = 3 000 daN ; Pu = 300 × 45 ÷ 600 = 22,5 kW (corrigé du livre).', src: 'AGD 19' },
      { l: 'livre-agd19', img: L + 'agd20-verins-direction.jpg', q: 'Q07 — Vérin de direction (60 L/min, 100 b, S tige 10 cm², S fond 20 cm²) : force et vitesse côté tige ?', c: ['1 000 daN et 1 m/s', '2 000 daN et 0,5 m/s', '1 000 daN et 0,5 m/s'], e: 'F = 100 × 10 = 1 000 daN ; v = 60 ÷ 60 = 1 m/s (corrigé du livre).', src: 'AGD 20' },
      { l: 'livre-agd19', img: L + 'agd20-verins-direction.jpg', q: 'Q08 — Quelle solution corrige le déséquilibre droite / gauche des vérins de direction ?', c: ['Des vérins équilibrés (mêmes surfaces des deux côtés)', 'Un vérin simple effet', 'Un limiteur de débit'], e: 'Vérins équilibrés : mêmes forces et vitesses, mais plus encombrants et plus lourds.', src: 'AGD 20' }
    ]
  });
})();
