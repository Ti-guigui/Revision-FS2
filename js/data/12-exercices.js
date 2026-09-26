/* Exercices corrigés (sujets complets avec schéma) — séparés des matières. */
REV.add({
  id: 'exos', name: 'Exercices corrigés', icon: '📝', color: '#0d9488',
  desc: 'Sujets complets sur schéma, corrigés pas à pas. Chaque réponse a été recalculée à partir du cours (pas recopiée du corrigé).',
  lessons: [
    {
      id: 'microtracteur', title: 'Microtracteur tondeuse (schéma « 8. Moto »)',
      images: [{ src: 'exo-microtracteur.jpg', cap: 'Schéma du microtracteur tondeuse (p. 24) : entrées A à E, portes logiques F à M, démarreur (Q1, K1) et électro-aimant des lames (Q2, K2)' }],
      html: `
<h3>1. Lire le schéma</h3>
<ul>
<li><b>Chaque entrée</b> = un contact + une résistance + une <b>Zener</b> qui limite la tension à <b>5 V</b> (niveau 1 de la logique).</li>
<li><b>A (frein à pied)</b> et <b>E (siège)</b>, <b>D (présence panier)</b> : contact <b>à la masse</b> + résistance de rappel au 12 V ApC.<br>
→ contact <b>ouvert</b> : la Zener fixe le point à <b>5 V = 1</b> ; contact <b>fermé</b> : le point est à la masse, <b>0 V = 0</b>.</li>
<li><b>Frein à main</b> : même montage, puis une porte <b>NON</b> → sortie <b>B</b>.</li>
<li><b>C (commande rotation lames)</b> : contact relié au <b>12 V ApC</b>, puis R5 et Dz5.<br>
→ relâché : aucun courant, <b>C = 0 V</b> ; actionné : la Zener fixe <b>C = 5 V</b>. C’est l’inverse des autres entrées !</li>
<li><b>J</b> = position <b>DEM</b> de la clé (via R1 / Dz1) : J = 1 seulement pendant le démarrage.</li>
</ul>
<h3>2. Les portes</h3>
<table class="tbl"><tr><th>Point</th><th>Porte</th><th>Équation</th></tr>
<tr><td>F</td><td>OU NON (≥1 + rond)</td><td>F = <span style="text-decoration:overline">A + E</span> = Ā·Ē</td></tr>
<tr><td>G</td><td>ET (&amp;)</td><td>G = B·E</td></tr>
<tr><td>H</td><td>NON (1 + rond)</td><td>H = C̄</td></tr>
<tr><td>K</td><td>OU (≥1)</td><td>K = F + G</td></tr>
<tr><td>L</td><td>ET à 3 entrées</td><td>L = J·K·H</td></tr>
<tr><td>M</td><td>OU NON à 3 entrées (D, H, E)</td><td>M = <span style="text-decoration:overline">D + H + E</span></td></tr></table>
<p><b>L</b> = J · C̄ · (Ā·Ē + B·E) &nbsp;·&nbsp; <b>M</b> = D̄ · <span style="text-decoration:overline">C̄</span> · Ē = <b>C · D̄ · Ē</b> (théorème de De Morgan : un OU NON = ET des entrées inversées).</p>
<h3>3. Les sorties de puissance</h3>
<ul>
<li><b>L → R7/R8 → Q1</b> : Q1 saturé = bobine de <b>K1</b> alimentée = <b>démarreur</b>. <b>D2</b> en parallèle sur la bobine = <b>diode de roue libre</b> : elle élimine la surtension (le courant) à la coupure de la bobine.</li>
<li><b>M → R9/R10 → Q2</b> : Q2 <b>saturé</b> = bobine de <b>K2</b> alimentée = <b>électro-aimant des lames</b>. D3 et D4 = roue libre de K2 et de l’électro-aimant.</li>
<li>Transistor <b>bloqué</b> : pas de courant, Vce = tension d’alimentation (12 V). <b>Saturé</b> : Vce ≈ 0 V.</li>
</ul>
<h3>4. Les calculs (Q12 à Q18)</h3>
<ol>
<li><b>Ic = β × Ib</b> = 200 × 500 µA = <b>0,1 A</b>.</li>
<li><b>R bobine K2</b> = U / Ic = 12 / 0,1 = <b>120 Ω</b> (Q2 saturé : toute la tension est sur la bobine).</li>
<li><b>IR10</b> = 11 × Ib = 11 × 0,0005 = <b>0,0055 A</b>.</li>
<li><b>R10</b> : R10 est en parallèle sur base-émetteur, donc U<sub>R10</sub> = Vbe sat = 0,55 V → R10 = 0,55 / 0,0055 = <b>100 Ω</b>.</li>
<li><b>IR9</b> = IR10 + Ib = 0,0055 + 0,0005 = <b>0,006 A</b> (loi des nœuds, = 12 × Ib).</li>
<li><b>UR9</b> = U<sub>M</sub> − Vbe = 5 − 0,55 = <b>4,45 V</b>.</li>
<li><b>R9</b> = 4,45 / 0,006 ≈ <b>741,66 Ω</b>.</li>
</ol>
<div class="box trancher"><b>⚠ Coquilles du corrigé papier</b><p>Q03 : la bonne réponse est écrite « A = 0 V » alors qu’on parle du point <b>C</b> (C = 0 V). Q18 : les propositions sont notées « R10 » alors qu’on calcule <b>R9</b>. Les réponses restent justes.</p></div>`,
      retenir: [
        'Montage contact à la masse + rappel + Zener : ouvert = 5 V (1), fermé = 0 V (0).',
        'Contact relié au + (commande lames) : relâché = 0 V, actionné = 5 V.',
        'OU NON = 1 seulement si toutes les entrées sont à 0.',
        'Diode en parallèle sur une bobine = roue libre : élimine la surtension à la coupure.',
        'Ic = β·Ib ; transistor bloqué → Vce = 12 V ; saturé → Vce ≈ 0 V.',
        'Pont de base : IR9 = IR10 + Ib ; UR10 = Vbe ; UR9 = U commande − Vbe.'
      ],
      pieges: [
        'Clé sur ON (pas DEM) : J = 0 → L = 0 → Q1 bloqué → Vce = 12 V (pas 0 V).',
        'Le point C ne se comporte pas comme A, D, E : son contact est côté 12 V.',
        'R9 est traversée par IR10 + Ib, pas par Ib seul.'
      ],
      memo: {
        cle: 'LAMES : C = 1, D = 0, E = 0 → M = 1 → Q2 saturé → K2 → électro-aimant',
        flow: ['Contact', 'Zener 5 V', 'Portes', 'Transistor', 'Relais', 'Actionneur'],
        points: ['F = Ā·Ē · G = B·E · H = C̄', 'L = J·C̄·(Ā·Ē + B·E)', 'M = C·D̄·Ē', 'Ic = 0,1 A · Rbob = 120 Ω', 'R10 = 100 Ω · R9 ≈ 741,66 Ω'],
        astuce: 'Démarrage interdit lames enclenchées (H = C̄ dans L) ; lames autorisées seulement panier en place ET assis.'
      }
    }
  ],
  questions: [
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q01 — Quelle est la tension au point A lorsque la pédale de frein est relâchée ?', c: ['A = 5 V', 'A = 0 V', 'A = en l’air'], e: 'Le contact du frein à pied est relié à la masse. Relâché, il est ouvert : R2 tire le point vers le 12 V ApC et la Zener Dz2 limite à 5 V. A = 5 V (état 1).', r: 'Contact à la masse ouvert = 5 V par la Zener.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q02 — Quelle est la tension au point A lorsque la pédale de frein est actionnée ?', c: ['A = 0 V', 'A = en l’air', 'A = 5 V'], e: 'Actionné, le contact se ferme et relie A directement à la masse : A = 0 V (état 0). R2 limite le courant.', r: 'Contact à la masse fermé = 0 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q03 — Quelle est la tension au point C lorsque la commande de rotation des lames est relâchée ?', c: ['C = 0 V', 'C = en l’air', 'C = 5 V'], e: 'Ici le contact est relié au 12 V ApC (et non à la masse). Relâché, il est ouvert : aucun courant dans R5, C est au potentiel de la masse via Dz5 → C = 0 V. (Le corrigé papier écrit « A = 0 V » : coquille, c’est bien le point C.)', w: 'Ne pas raisonner comme pour A : le contact de C est côté +.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q04 — Quelle est la tension au point C lorsque la commande de rotation des lames est actionnée ?', c: ['C = 5 V', 'C = 0 V', 'C = en l’air'], e: 'Contact fermé : le 12 V ApC passe par R5 et la Zener Dz5 fixe la tension à 5 V → C = 5 V (état 1).', r: 'La Zener adapte le 12 V au niveau logique 5 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q05 — Quels sont les états des points B et E pour avoir le point G à l’état 1 ?', c: ['B à 1 et E à 1', 'B à 1 et E à 0', 'B à 0 et E à 0'], e: 'G est la sortie d’une porte ET (&) dont les entrées sont B et E : G = B·E. Une porte ET ne donne 1 que si toutes ses entrées sont à 1.', r: 'ET : 1 seulement si tout est à 1.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q06 — Quels sont les états des points A et E pour avoir le point F à l’état 1 ?', c: ['A à 0 et E à 0', 'A à 1 et E à 0', 'A à 1 et E à 1'], e: 'F est la sortie d’une porte OU NON (≥1 avec un rond) : F = NON(A + E) = Ā·Ē. Elle ne donne 1 que si toutes ses entrées sont à 0 (pédale de frein enfoncée et conducteur assis).', r: 'OU NON : 1 seulement si tout est à 0.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q07 — Fonction logique simplifiée du point L par rapport aux entrées A, E, B, C et J ?', c: ['L = J·C̄·(Ā·Ē + B·E)', 'L = J·C̄·(Ā·E + B·E)', 'L = J·C̄·(A·E + B̄·Ē)'], e: 'L = J·K·H avec K = F + G, F = Ā·Ē, G = B·E et H = C̄. Donc L = J·C̄·(Ā·Ē + B·E).', r: 'Remonter le schéma porte par porte depuis la sortie.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q08 — Fonction logique simplifiée du point M par rapport aux entrées C, D et E ?', c: ['M = C·D̄·Ē', 'M = C·D·E', 'M = C̄·D·E'], e: 'M est un OU NON à 3 entrées (D, H, E) : M = NON(D + H + E) = D̄·H̄·Ē. Comme H = C̄, H̄ = C. Donc M = C·D̄·Ē.', r: 'De Morgan : NON(a + b) = ā·b̄ ; une double barre s’annule.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q09 — Quel est le rôle de la diode D2 (en parallèle sur la bobine du relais K1) ?', c: ['Éliminer le courant (la surtension) à la coupure', 'Protéger des surtensions du réseau', 'Redresser la tension'], e: 'C’est une diode de roue libre. À la coupure, la bobine produit une forte surtension (auto-induction) ; la diode laisse circuler ce courant dans la bobine et protège le transistor Q1.', r: 'Diode en parallèle inverse sur une bobine = roue libre.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q10 — Dans quel état doit être le transistor Q2 pour que le relais K2 alimente l’électro-aimant ?', c: ['Q2 saturé', 'Q2 bloqué', 'Peu importe'], e: 'La bobine de K2 est entre le 12 V ApC et le collecteur de Q2. Il faut que Q2 conduise (saturé) pour que le courant traverse la bobine et ferme le contact de K2.', r: 'Transistor en commutation : saturé = interrupteur fermé.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q11 — Clé de contact sur la position ON (pas DEM) : quelle est la tension Vce du transistor Q1 ?', c: ['Vce = 12 V', 'Vce = 6 V', 'Vce = 0 V'], e: 'Sur ON, J = 0 (J n’est à 1 que sur DEM). La porte ET donne L = 0 → Q1 bloqué → aucun courant dans K1 → pas de chute de tension dans la bobine : le collecteur est à 12 V, donc Vce = 12 V.', w: 'Bloqué = 12 V entre C et E ; saturé = environ 0 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q12 — Le courant Ib de Q2 saturé est de 500 µA et son β = 200. Valeur du courant Ic ?', c: ['Ic = 0,1 A', 'Ic = 0,01 A', 'Ic = 0,001 A'], e: 'Ic = β × Ib = 200 × 0,0005 A = 0,1 A.', r: 'Ic = β·Ib (500 µA = 0,0005 A).', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q13 — Q2 saturé, Ic = 0,1 A, alimentation 12 V : résistance de la bobine du relais K2 ?', c: ['R bobine = 120 Ω', 'R bobine = 12 Ω', 'R bobine = 1 200 Ω'], e: 'Q2 saturé (Vce ≈ 0) : toute la tension de 12 V est aux bornes de la bobine. R = U / I = 12 / 0,1 = 120 Ω.', r: 'Loi d’Ohm R = U / I.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q14 — Vbe sat de Q2 = 0,55 V, M = 5 V, Ib = 500 µA et IR10 = 11 × Ib. Valeur de IR10 ?', c: ['IR10 = 0,0055 A', 'IR10 = 0,055 A', 'IR10 = 0,00055 A'], e: 'IR10 = 11 × 0,0005 A = 0,0055 A (5,5 mA).', r: 'Attention aux puissances de 10 : 500 µA = 0,0005 A.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q15 — Vbe sat = 0,55 V et IR10 = 0,0055 A. Valeur de la résistance R10 (entre base et masse) ?', c: ['R10 = 100 Ω', 'R10 = 10 Ω', 'R10 = 1 000 Ω'], e: 'R10 est en parallèle sur la jonction base-émetteur : U R10 = Vbe = 0,55 V. R10 = 0,55 / 0,0055 = 100 Ω.', r: 'Résistance en parallèle sur la jonction BE : sa tension = Vbe.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q16 — Ib = 500 µA et IR10 = 0,0055 A. Valeur du courant dans R9 ?', c: ['IR9 = 0,006 A', 'IR9 = 0,0006 A', 'IR9 = 0,06 A'], e: 'Loi des nœuds à la base : le courant qui arrive par R9 se partage entre R10 et la base. IR9 = IR10 + Ib = 0,0055 + 0,0005 = 0,006 A.', r: 'Loi des nœuds : somme des courants entrants = somme des sortants.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q17 — Point M à 5 V, Vbe sat = 0,55 V. Tension aux bornes de R9 ?', c: ['UR9 = 4,45 V', 'UR9 = 5 V', 'UR9 = 0,55 V'], e: 'Loi des mailles : U M = UR9 + Vbe → UR9 = 5 − 0,55 = 4,45 V.', r: 'Loi des mailles : les tensions en série s’additionnent.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q18 — UR9 = 4,45 V et IR9 = 0,006 A. Valeur de la résistance R9 ?', c: ['R9 ≈ 741,66 Ω', 'R9 ≈ 74,16 Ω', 'R9 ≈ 7 416,6 Ω'], e: 'R9 = UR9 / IR9 = 4,45 / 0,006 ≈ 741,66 Ω. (Le corrigé papier écrit « R10 = … » dans les propositions : coquille, c’est bien R9.)', r: 'Loi d’Ohm, vérifier l’ordre de grandeur.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', img: 'exo-microtracteur.jpg', q: 'Q19 — Quelles commandes faut-il actionner pour alimenter l’électro-aimant de rotation des lames ?', c: ['Rotation des lames commandée, présence du panier et assis sur le siège', 'Rotation des lames commandée, pas de panier et assis sur le siège', 'Rotation des lames commandée, présence du panier et pas assis sur le siège'], e: 'M = C·D̄·Ē doit être à 1 : C = 1 (commande des lames actionnée), D = 0 (contact panier fermé = panier présent), E = 0 (contact siège fermé = conducteur assis). M = 1 → Q2 saturé → K2 → électro-aimant.', r: 'Sécurité : lames seulement si panier en place ET conducteur assis.', src: 'Exercice microtracteur tondeuse' },
  ]
});
