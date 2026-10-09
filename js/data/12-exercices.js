/* Rattachés à l'onglet « Exercices corrigés » de la matière Électricité. */
REV.addExercises('elec', {
  lessons: [
    {
      id: 'microtracteur', title: 'Microtracteur tondeuse',
      images: [{ src: 'exo-microtracteur.jpg', cap: 'Schéma du microtracteur tondeuse (p. 24) : entrées A à E, portes logiques F à M, démarreur (Q1, K1) et électro-aimant des lames (Q2, K2)' }],
      html: `
<h3>Énoncé</h3>
<p>Le schéma représente la <b>commande du circuit de démarreur</b> et la <b>commande de rotation des lames</b>.</p>
<table class="tbl"><tr><th>Commande</th><th>Fonctionnement</th></tr>
<tr><td>Contact à clé</td><td>3 positions : OFF (arrêt), ON (contact), DEM (démarrage). 12 V ApC = 12 V après contact.</td></tr>
<tr><td>Frein à pied</td><td>Contact <b>fermé lors d’un freinage</b></td></tr>
<tr><td>Siège</td><td>Contact <b>fermé pilote assis</b></td></tr>
<tr><td>Frein à main</td><td>Contact <b>fermé frein à main serré</b></td></tr>
<tr><td>Commande rotation lames</td><td>Commande un électro-aimant qui embraye une poulie sur la courroie d’entraînement des lames</td></tr>
<tr><td>Présence panier</td><td>Contact <b>fermé panier en place</b></td></tr></table>
<p>Logique 5 V · Dz1 à Dz6 : diodes Zener 5 V · R1 à R6 : résistances 1 kΩ.</p>
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
<h3>Ce que ça veut dire sur la machine</h3>
<ul>
<li><b>F = 1</b> (A = 0 et E = 0) : pédale de frein <b>enfoncée</b> et pilote <b>assis</b>.</li>
<li><b>G = 1</b> (B = 1 et E = 1) : frein à main <b>serré</b> (contact fermé → 0 → porte NON → B = 1) et pilote <b>pas assis</b>.</li>
<li><b>Démarreur</b> (L = 1) : clé sur <b>DEM</b>, lames <b>non commandées</b> (C = 0 → H = 1) et (assis + frein à pied OU siège vide + frein à main serré).</li>
<li><b>Lames</b> (M = 1) : commande lames actionnée, panier en place, pilote assis.</li>
</ul>
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
<h3>5. Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Q01 — A, pédale relâchée → 5 V.</b> Contact frein à pied = fermé seulement au freinage. Relâché → ouvert → aucun chemin vers la masse. Le 12 V ApC arrive par R2 et la Zener Dz2 (5 V) fixe la tension : <b>A = 5 V = état 1</b>.</li>
<li><b>Q02 — A, pédale actionnée → 0 V.</b> Contact fermé → A relié directement à la masse → <b>A = 0 V = état 0</b>. R2 (1 kΩ) limite le courant : I = 12 / 1 000 = 12 mA.</li>
<li><b>Q03 — C, commande relâchée → 0 V.</b> Le contact de C est côté <b>12 V</b>. Ouvert → aucun courant dans R5 → aucune tension apportée → <b>C = 0 V</b>.</li>
<li><b>Q04 — C, commande actionnée → 5 V.</b> Contact fermé → 12 V → R5 → Dz5 limite à 5 V → <b>C = 5 V = état 1</b>.</li>
<li><b>Q05 — G = 1 → B = 1 et E = 1.</b> G sort d’une porte <b>ET</b> (&amp;) : G = B·E. Une ET ne vaut 1 que si <b>toutes</b> ses entrées valent 1.</li>
<li><b>Q06 — F = 1 → A = 0 et E = 0.</b> F sort d’un <b>OU NON</b> : F = NON(A + E). Pour que la sortie inversée soit 1, il faut A + E = 0, donc A = 0 et E = 0 (freinage + pilote assis).</li>
<li><b>Q07 — L = J·C̄·(Ā·Ē + B·E).</b> On part de la sortie : L = J·K·H. On remplace K = F + G, puis F = Ā·Ē (De Morgan), G = B·E et H = C̄. Résultat : L = J·C̄·(Ā·Ē + B·E).</li>
<li><b>Q08 — M = C·D̄·Ē.</b> M = NON(D + H + E) = D̄·H̄·Ē (De Morgan). H = C̄ donc H̄ = C (double inversion). M = C·D̄·Ē.</li>
<li><b>Q09 — D2 : éliminer le courant à la coupure.</b> Quand Q1 se bloque, la bobine de K1 s’oppose à la disparition du courant (auto-induction) → forte surtension. D2 (roue libre) laisse ce courant tourner dans la bobine et protège Q1.</li>
<li><b>Q10 — Q2 saturé.</b> La bobine de K2 est entre le 12 V et le collecteur de Q2. Seul un transistor saturé (interrupteur fermé) laisse passer le courant de la bobine.</li>
<li><b>Q11 — Vce Q1 = 12 V.</b> Clé sur ON → J = 0 → porte ET : L = 0 → pas de courant de base → Q1 bloqué → aucun courant dans K1 → aucune chute de tension dans la bobine → collecteur à 12 V, émetteur à 0 V : <b>Vce = 12 V</b>.</li>
<li><b>Q12 — Ic = 0,1 A.</b> Ib = 500 µA = 0,0005 A. Ic = β × Ib = 200 × 0,0005 = <b>0,1 A</b>.</li>
<li><b>Q13 — R bobine = 120 Ω.</b> Q2 saturé → Vce ≈ 0 → les 12 V sont aux bornes de la bobine. R = U / I = 12 / 0,1 = <b>120 Ω</b>.</li>
<li><b>Q14 — IR10 = 0,0055 A.</b> IR10 = 11 × Ib = 11 × 0,0005 = <b>0,0055 A</b> (5,5 mA).</li>
<li><b>Q15 — R10 = 100 Ω.</b> R10 est entre la base et la masse, donc en parallèle sur la jonction BE : U R10 = Vbe sat = 0,55 V. R10 = 0,55 / 0,0055 = <b>100 Ω</b>.</li>
<li><b>Q16 — IR9 = 0,006 A.</b> Nœud de base : ce qui arrive par R9 repart dans R10 et dans la base. IR9 = IR10 + Ib = 0,0055 + 0,0005 = <b>0,006 A</b>.</li>
<li><b>Q17 — UR9 = 4,45 V.</b> Maille : U M = UR9 + Vbe → UR9 = 5 − 0,55 = <b>4,45 V</b>.</li>
<li><b>Q18 — R9 ≈ 741,66 Ω.</b> R9 = UR9 / IR9 = 4,45 / 0,006 = <b>741,66 Ω</b>.</li>
<li><b>Q19 — lames commandées + panier présent + assis.</b> Il faut M = C·D̄·Ē = 1 : C = 1 (commande actionnée), D = 0 (contact panier fermé = panier en place), E = 0 (contact siège fermé = pilote assis).</li>
</ol>`,
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
    },
    {
      id: 'moto', title: 'Moto : démarreur et boîtier d’allumage',
      images: [{ src: 'exo-moto.jpg', cap: 'Schéma « Moto » : entrées A (point mort), C (embrayage), F (béquille), portes B, D, E, G, H, démarreur (Q1, K1, K2) et boîtier d’allumage (Q2)' }],
      html: `
<h3>Énoncé</h3>
<p>Le schéma représente la <b>commande du circuit du démarreur</b> et la <b>commande du boîtier d’allumage</b>.</p>
<table class="tbl"><tr><th>Commande</th><th>Fonctionnement</th></tr>
<tr><td>Contact à clé</td><td>2 positions : OFF (arrêt), ON (contact). 12 V ApC = 12 V après contact.</td></tr>
<tr><td>Run</td><td>Contact de sécurité (coupe-circuit) en série après la clé</td></tr>
<tr><td>Point mort</td><td>Contact position point mort</td></tr>
<tr><td>Embrayage</td><td>Contact position levier d’embrayage</td></tr>
<tr><td>Béquille</td><td>Contact position béquille</td></tr></table>
<p><b>Logique 12 V</b> (pas de Zener sur les entrées : 1 = 12 V, 0 = 0 V) · R1 et R2 : 1 kΩ.</p>
<h3>1. Lire les entrées</h3>
<ul>
<li><b>A (point mort)</b> : contact à la masse, relié au 12 V ApC <b>à travers le voyant de point mort</b>.<br>
→ <b>point mort</b> : contact fermé → A = <b>0 V</b> et le voyant s’allume (il est entre 12 V et masse) ;<br>
→ <b>vitesse enclenchée</b> : contact ouvert → aucun courant → pas de chute de tension dans la lampe → A = <b>12 V</b>.</li>
<li><b>C (embrayage)</b> : contact à la masse + R1 au 12 V ApC. Contact fermé → C = 0 ; ouvert → C = 1. Sur le schéma, le contact se ferme <b>embrayé</b> : <b>débrayé → C = 1</b>.</li>
<li><b>F (béquille)</b> : contact à la masse + R2 au 12 V ApC. Contact fermé <b>béquille au sol → F = 0</b> ; <b>béquille hors sol → F = 1</b>.</li>
</ul>
<h3>2. Les portes</h3>
<table class="tbl"><tr><th>Point</th><th>Porte</th><th>Équation</th></tr>
<tr><td>B</td><td>NON</td><td>B = Ā</td></tr>
<tr><td>D</td><td>ET à 3 entrées</td><td>D = A·C·F</td></tr>
<tr><td>E</td><td>OU</td><td>E = B + D = <b>Ā + A·C·F</b></td></tr>
<tr><td>G</td><td>NON</td><td>G = F̄</td></tr>
<tr><td>H</td><td>ET NON (&amp; + rond)</td><td>H = <span style="text-decoration:overline">A·G</span> = Ā + Ḡ = <b>Ā + F</b></td></tr></table>
<h3>Ce que ça veut dire sur la moto</h3>
<ul>
<li><b>Démarreur autorisé</b> (E = 1) : <b>au point mort</b> (Ā) OU <b>vitesse enclenchée + débrayé + béquille relevée</b> (A·C·F).</li>
<li><b>Allumage alimenté</b> (H = 1) : au point mort (Ā) OU béquille relevée (F). <b>Vitesse enclenchée + béquille au sol → H = 0 → moteur coupé</b> (sécurité anti-départ béquille baissée).</li>
</ul>
<h3>3. Les sorties de puissance</h3>
<ul>
<li><b>E → R3/R4 → Q1 → K1</b>. Le contact de K1 alimente la <b>commande du démarreur</b> (bouton) → <b>K2</b> → contact de puissance → <b>DEM</b>. Pour démarrer : E = 1 (Q1 saturé) <b>et</b> appui sur le bouton.</li>
<li><b>D1</b> en parallèle sur la bobine de K1 = <b>diode de roue libre</b>.</li>
<li><b>H → R5/R6 → Q2</b> : Q2 saturé = <b>boîtier d’allumage</b> alimenté. <b>DZ1 = 14 V</b> en parallèle protège le boîtier et Q2 des surtensions.</li>
</ul>
<h3>4. Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Q01 — A, vitesse enclenchée → 12 V.</b> Contact point mort ouvert → pas de courant dans le voyant → pas de chute de tension dans la lampe (U = R × I = R × 0) → <b>A = 12 V</b> (état 1). Voyant éteint.</li>
<li><b>Q02 — A, point mort → 0 V.</b> Contact fermé → A relié à la masse → <b>A = 0 V</b>. Les 12 V sont aux bornes du voyant, qui s’allume.</li>
<li><b>Q03 — Q1 saturé.</b> La bobine de K1 est entre le 12 V ApC et le collecteur de Q1. Il faut Q1 saturé pour alimenter K1 ; son contact amène le 12 V au bouton « commande du démarreur », qui alimente alors K2.</li>
<li><b>Q04 — D1 : éliminer le courant à la coupure.</b> Diode de roue libre en parallèle sur la bobine de K1 : à la coupure, elle absorbe la surtension d’auto-induction et protège Q1.</li>
<li><b>Q05 — béquille au sol + vitesse enclenchée → hors tension.</b> Béquille au sol → F = 0 → G = 1. Vitesse → A = 1. H = NON(A·G) = NON(1·1) = <b>0</b> → Q2 bloqué → <b>boîtier d’allumage hors tension</b>.</li>
<li><b>Q06 — H = Ā + F.</b> H = NON(A·G) = Ā + Ḡ (De Morgan). G = F̄ donc Ḡ = F. <b>H = Ā + F</b>.</li>
<li><b>Q07 — E = Ā + A·C·F.</b> E = B + D, avec B = Ā et D = A·C·F. <b>E = Ā + A·C·F</b>. (On pourrait simplifier en Ā + C·F, mais c’est la forme du corrigé.)</li>
<li><b>Q08 — H = 0 → A = 1 et G = 1.</b> Une ET NON ne donne 0 que si <b>toutes</b> ses entrées sont à 1.</li>
<li><b>Q09 — Ic = 0,3 A.</b> Q1 saturé (Vce = 0) → les 12 V sont sur la bobine : Ic = U / R = 12 / 40 = <b>0,3 A</b>.</li>
<li><b>Q10 — Ib = 0,002 A.</b> Ib = Ic / β = 0,3 / 150 = <b>0,002 A</b> (2 mA).</li>
<li><b>Q11 — IR3 = 0,022 A.</b> IR3 = 11 × Ib = 11 × 0,002 = <b>0,022 A</b>.</li>
<li><b>Q12 — IR4 = 0,02 A.</b> Loi des nœuds à la base : IR3 = IR4 + Ib → IR4 = 0,022 − 0,002 = <b>0,02 A</b> (= 10 × Ib).</li>
<li><b>Q13 — UR3 = 11,4 V.</b> E = 1 = 12 V (logique 12 V). Maille : 12 = UR3 + Vbe → UR3 = 12 − 0,6 = <b>11,4 V</b>.</li>
<li><b>Q14 — R3 = 518,18 Ω.</b> R3 = UR3 / IR3 = 11,4 / 0,022 = <b>518,18 Ω</b>.</li>
<li><b>Q15 — R4 = 30 Ω.</b> R4 en parallèle sur base-émetteur : UR4 = Vbe = 0,6 V. R4 = 0,6 / 0,02 = <b>30 Ω</b>.</li>
<li><b>Q16 — Vce Q2 = 12 V → bloqué.</b> Transistor bloqué = interrupteur ouvert : toute la tension d’alimentation se retrouve entre collecteur et émetteur. (Saturé ≈ 0 V.)</li>
</ol>`,
      retenir: [
        'Logique 12 V : pas de Zener sur les entrées, état 1 = 12 V.',
        'Voyant en série avec un contact à la masse : contact ouvert → pas de courant → 12 V au point A.',
        'ET NON = 0 seulement si toutes les entrées sont à 1.',
        'IR3 = IR4 + Ib ; UR4 = Vbe ; UR3 = 12 − Vbe.',
        'Vce = 12 V → bloqué ; Vce ≈ 0 V → saturé.'
      ],
      pieges: [
        'Ici la logique est en 12 V (pas 5 V comme le microtracteur) : UR3 = 12 − 0,6.',
        'IR4 = IR3 − Ib (pas IR3 + Ib) : c’est R3 qui amène tout le courant.',
        'Point mort = contact fermé = A à 0 V (voyant allumé).'
      ],
      memo: {
        cle: 'DÉMARRER : point mort OU (débrayé + béquille relevée) · ALLUMAGE : point mort OU béquille relevée',
        flow: ['Contact', 'Porte logique', 'Transistor', 'K1', 'Bouton démarreur', 'K2', 'DEM'],
        points: ['E = Ā + A·C·F', 'H = Ā + F', 'Ic = 12/40 = 0,3 A · Ib = 0,002 A', 'IR3 = 0,022 A · IR4 = 0,02 A', 'R3 = 518,18 Ω · R4 = 30 Ω'],
        astuce: 'Béquille au sol avec une vitesse : H = 0, le moteur est coupé.'
      }
    }
  ],
  questions: [
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q01 — Quelle est la tension au point A lorsque la pédale de frein est relâchée ?', c: ['A = 0V', 'A = 5V', 'A = En l’air'], e: 'Le contact du frein à pied est relié à la masse. Relâché, il est ouvert : R2 tire le point vers le 12 V ApC et la Zener Dz2 limite à 5 V. A = 5 V (état 1).', r: 'Contact à la masse ouvert = 5 V par la Zener.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q02 — Quelle est la tension au point A lorsque la pédale de frein est actionnée ?', c: ['A = 0V', 'A = 5V', 'A = En l’air'], e: 'Actionné, le contact se ferme et relie A directement à la masse : A = 0 V (état 0). R2 limite le courant.', r: 'Contact à la masse fermé = 0 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q03 — Quelle est la tension au point C lorsque la commande de rotation lames est relâchée ?', c: ['C = 0V', 'C = En l’air', 'C = 5V'], e: 'Ici le contact est relié au 12 V ApC (et non à la masse). Relâché, il est ouvert : aucun courant dans R5, C est au potentiel de la masse via Dz5 → C = 0 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q04 — Quelle est la tension au point C lorsque la commande de rotation lames est actionnée ?', c: ['C = En l’air', 'C = 0V', 'C = 5V'], e: 'Contact fermé : le 12 V ApC passe par R5 et la Zener Dz5 fixe la tension à 5 V → C = 5 V (état 1).', r: 'La Zener adapte le 12 V au niveau logique 5 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q05 — Quels sont les états des points B et E pour avoir le point G à l’état 1 ?', c: ['B à 1 et E à 0', 'B à 0 et E à 0', 'B à 1 et E à 1'], e: 'G est la sortie d’une porte ET (&) dont les entrées sont B et E : G = B·E. Une porte ET ne donne 1 que si toutes ses entrées sont à 1.', r: 'ET : 1 seulement si tout est à 1.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q06 — Quels sont les états des points A et E pour avoir le point F à l’état 1 ?', c: ['A à 1 et E à 0', 'A à 0 et E à 0', 'A à 1 et E à 1'], e: 'F est la sortie d’une porte OU NON (≥1 avec un rond) : F = NON(A + E) = Ā·Ē. Elle ne donne 1 que si toutes ses entrées sont à 0 (pédale de frein enfoncée et conducteur assis).', r: 'OU NON : 1 seulement si tout est à 0.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q07 — Donner la fonction logique simplifiée du point L par rapport aux entrées A, E, B, C et J.', c: ['L = J · C̄ · (Ā · E + B · E)', 'L = J · C̄ · (Ā · Ē + B · E)', 'L = J · C̄ · (A · E + B̄ · Ē)'], e: 'L = J·K·H avec K = F + G, F = Ā·Ē, G = B·E et H = C̄. Donc L = J·C̄·(Ā·Ē + B·E).', r: 'Remonter le schéma porte par porte depuis la sortie.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q08 — Donner la fonction logique simplifiée du point M par rapport aux entrées C, D et E.', c: ['M = C · D̄ · Ē', 'M = C · D · E', 'M = C̄ · D · E'], e: 'M est un OU NON à 3 entrées (D, H, E) : M = NON(D + H + E) = D̄·H̄·Ē. Comme H = C̄, H̄ = C. Donc M = C·D̄·Ē.', r: 'De Morgan : NON(a + b) = ā·b̄ ; une double barre s’annule.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q09 — Quel est le rôle de la diode D2 ?', c: ['Protéger des surtensions', 'Redresser la tension', 'Éliminer le courant à la coupure'], e: 'C’est une diode de roue libre. À la coupure, la bobine produit une forte surtension (auto-induction) ; la diode laisse circuler ce courant dans la bobine et protège le transistor Q1.', r: 'Diode en parallèle inverse sur une bobine = roue libre.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q10 — Dans quel état doit être le transistor Q2 pour que le relais K2 alimente l’électroaimant ?', c: ['Q2 Saturé', 'Q2 Bloqué', 'Peu importe'], e: 'La bobine de K2 est entre le 12 V ApC et le collecteur de Q2. Il faut que Q2 conduise (saturé) pour que le courant traverse la bobine et ferme le contact de K2.', r: 'Transistor en commutation : saturé = interrupteur fermé.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q11 — Lorsque le contact à clef est sur la position ON, quelle est la tension VCE du transistor Q1 ?', c: ['Vce = 12V', 'Vce = 6V', 'Vce = 0V'], e: 'Sur ON, J = 0 (J n’est à 1 que sur DEM). La porte ET donne L = 0 → Q1 bloqué → aucun courant dans K1 → pas de chute de tension dans la bobine : le collecteur est à 12 V, donc Vce = 12 V.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q12 — Le courant IB du transistor Q2, lorsqu’il est saturé, est de 500µA, son β = 200. Calculer en Ampère la valeur du courant Ic.', c: ['Ic = 0,01A', 'Ic = 0,1A', 'Ic = 0,001A'], e: 'Ic = β × Ib = 200 × 0,0005 A = 0,1 A.', r: 'Ic = β·Ib (500 µA = 0,0005 A).', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q13 — Calculer, dans les conditions de la question 12, la résistance de la bobine du relais K2.', c: ['Rbobine = 1200Ω', 'Rbobine = 12Ω', 'Rbobine = 120Ω'], e: 'Q2 saturé (Vce ≈ 0) : toute la tension de 12 V est aux bornes de la bobine. R = U / I = 12 / 0,1 = 120 Ω.', r: 'Loi d’Ohm R = U / I.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q14 — Le VBE sat du transistor Q2 est de 0,55V, le point M est à l’état 1 soit 5V, le courant IR10 est de 11 x IB, calculer la valeur de IR10.', c: ['IR10 = 0,055A', 'IR10 = 0,0055A', 'IR10 = 0,00055A'], e: 'IR10 = 11 × 0,0005 A = 0,0055 A (5,5 mA).', r: 'Attention aux puissances de 10 : 500 µA = 0,0005 A.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q15 — Calculer la valeur de la résistance R10.', c: ['R10 = 1000Ω', 'R10 = 10Ω', 'R10 = 100Ω'], e: 'R10 est en parallèle sur la jonction base-émetteur : U R10 = Vbe = 0,55 V. R10 = 0,55 / 0,0055 = 100 Ω.', r: 'Résistance en parallèle sur la jonction BE : sa tension = Vbe.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 0, img: 'exo-microtracteur.jpg', q: 'Q16 — Calculer la valeur de IR9.', c: ['IR9 = 0,006A', 'IR9 = 0,0006A', 'IR9 = 0,06A'], e: 'Loi des nœuds à la base : le courant qui arrive par R9 se partage entre R10 et la base. IR9 = IR10 + Ib = 0,0055 + 0,0005 = 0,006 A.', r: 'Loi des nœuds : somme des courants entrants = somme des sortants.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q17 — Calculer la valeur de la tension UR9.', c: ['UR9 = 5V', 'UR9 = 0,55V', 'UR9 = 4,45V'], e: 'Loi des mailles : U M = UR9 + Vbe → UR9 = 5 − 0,55 = 4,45 V.', r: 'Loi des mailles : les tensions en série s’additionnent.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 1, img: 'exo-microtracteur.jpg', q: 'Q18 — Calculer la valeur de la résistance R9.', c: ['R9 = 74,16Ω', 'R9 = 741,66Ω', 'R9 = 7416,6 Ω'], e: 'R9 = UR9 / IR9 = 4,45 / 0,006 ≈ 741,66 Ω.', r: 'Loi d’Ohm, vérifier l’ordre de grandeur.', src: 'Exercice microtracteur tondeuse' },
    { l: 'microtracteur', fixed: true, a: 2, img: 'exo-microtracteur.jpg', q: 'Q19 — Quelles sont les commandes à actionner pour alimenter l’électroaimant de commande de rotation des lames ?', c: ['Rotation des lames commandées, pas de panier et assis sur le siège', 'Rotation des lames commandées, présence du panier et pas assis sur le siège', 'Rotation des lames commandées, présence du panier et assis sur le siège'], e: 'M = C·D̄·Ē doit être à 1 : C = 1 (commande des lames actionnée), D = 0 (contact panier fermé = panier présent), E = 0 (contact siège fermé = conducteur assis). M = 1 → Q2 saturé → K2 → électro-aimant.', r: 'Sécurité : lames seulement si panier en place ET conducteur assis.', src: 'Exercice microtracteur tondeuse' },
    { l: 'moto', fixed: true, a: 1, img: 'exo-moto.jpg', q: 'Q01 — Quelle est la tension au point A lorsqu’une vitesse est enclenchée ?', c: ['A = 0V', 'A = 12V', 'A = En l’air'], e: 'Contact point mort ouvert : aucun courant dans le voyant, donc aucune chute de tension dans la lampe (U = R × 0). A est au 12 V ApC.', r: 'Pas de courant = pas de chute de tension.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q02 — Quelle est la tension au point A lorsqu’une vitesse est au point mort ?', c: ['A = 0V', 'A = 12V', 'A = En l’air'], e: 'Au point mort, le contact se ferme et relie A à la masse : A = 0 V. Les 12 V sont aux bornes du voyant, qui s’allume.', r: 'Contact à la masse fermé = 0 V.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q03 — Dans quel état doit être le transistor Q1 pour que l’action sur la commande de démarreur actionne le relais K2 ?', c: ['Q1 Saturé', 'Q1 Bloqué', 'Peu importe'], e: 'Q1 saturé alimente la bobine de K1 ; le contact de K1 amène le 12 V au bouton de commande du démarreur, qui alimente la bobine de K2. Q1 bloqué : le bouton n’a pas de tension.', r: 'Saturé = interrupteur fermé.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 2, img: 'exo-moto.jpg', q: 'Q04 — Quel est le rôle de la diode D1 ?', c: ['Protéger des surtensions', 'Redresser la tension', 'Éliminer le courant à la coupure'], e: 'Diode de roue libre : à la coupure de Q1, la bobine crée une surtension d’auto-induction ; D1 laisse circuler ce courant et protège Q1.', r: 'Diode inverse en parallèle sur une bobine = roue libre.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 1, img: 'exo-moto.jpg', q: 'Q05 — Lorsque la béquille est au sol et une vitesse est enclenchée, le boîtier d’allumage est-il sous tension ?', c: ['Sous tension', 'Hors Tension', 'Moitié de la tension'], e: 'Béquille au sol → contact fermé → F = 0 → G = F̄ = 1. Vitesse → A = 1. H = NON(A·G) = NON(1) = 0 → Q2 bloqué → boîtier hors tension (sécurité : on ne roule pas béquille baissée).', r: 'ET NON = 0 seulement si tout est à 1.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 1, img: 'exo-moto.jpg', q: 'Q06 — Donner l’équation de la sortie H en fonction des entrées A et F.', c: ['H = A + F̄', 'H = Ā + F', 'H = A · F̄'], e: 'H = NON(A·G) = Ā + Ḡ (De Morgan). Or G = F̄, donc Ḡ = F : H = Ā + F.', r: 'De Morgan : NON(a·b) = ā + b̄.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 2, img: 'exo-moto.jpg', q: 'Q07 — Donner l’équation de la sortie E en fonction des entrées A, C et F.', c: ['E = A + A · C · F', 'E = Ā · (A + C + F)', 'E = Ā + A · C · F'], e: 'E est un OU entre B = Ā et D = A·C·F (ET à 3 entrées) : E = Ā + A·C·F.', r: 'Remonter porte par porte.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q08 — Quels sont les états des points A et G pour que la sortie H soit à l’état 0 ?', c: ['A à 1 et G à 1', 'A à 0 et G à 0', 'A à 0 et G à 1'], e: 'H est une ET NON : sa sortie ne vaut 0 que si toutes ses entrées valent 1.', r: 'ET NON : 0 seulement si tout est à 1.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 2, img: 'exo-moto.jpg', q: 'Q09 — La résistance de la bobine du relais K1 vaut 40 Ω, le transistor est saturé (Vce = 0V). Calculer le courant Ic.', c: ['Ic = 0,03A', 'Ic = 0,003A', 'Ic = 0,3A'], e: 'Vce = 0 → les 12 V sont aux bornes de la bobine : Ic = 12 / 40 = 0,3 A.', r: 'Loi d’Ohm I = U / R.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q10 — Le β du transistor Q1 est de 150. Calculer le courant Ib.', c: ['Ib = 0,002A', 'Ib = 0,0002A', 'Ib = 0,02A'], e: 'Ib = Ic / β = 0,3 / 150 = 0,002 A (2 mA).', r: 'Ic = β·Ib donc Ib = Ic / β.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 1, img: 'exo-moto.jpg', q: 'Q11 — Le Vbe du transistor Q1 vaut 0,6 V. Le courant dans la résistance R3 vaut 11 x Ib. Calculer IR3', c: ['IR3 = 0,00022A', 'IR3 = 0,022A', 'IR3 = 0,0022A'], e: 'IR3 = 11 × 0,002 = 0,022 A.', r: 'Attention aux décimales.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 2, img: 'exo-moto.jpg', q: 'Q12 — Calculer IR4', c: ['IR4 = 0,002A', 'IR4 = 0,0002A', 'IR4 = 0,02A'], e: 'Loi des nœuds à la base : IR3 = IR4 + Ib → IR4 = 0,022 − 0,002 = 0,02 A.', r: 'Le courant de R3 se partage entre R4 et la base.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q13 — Calculer UR3', c: ['UR3 = 11,4V', 'UR3 = 12V', 'UR3 = 0,6V'], e: 'Maille : UE = UR3 + Vbe → UR3 = 12 − 0,6 = 11,4 V.', r: 'Loi des mailles.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 2, img: 'exo-moto.jpg', q: 'Q14 — Calculer la valeur de la résistance R3', c: ['R3 = 51,81Ω', 'R3 = 5181Ω', 'R3 = 518,18Ω'], e: 'R3 = 11,4 / 0,022 = 518,18 Ω.', r: 'Loi d’Ohm R = U / I.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q15 — Calculer la valeur de la résistances R4', c: ['R4 = 30Ω', 'R4 = 300Ω', 'R4 = 3000Ω'], e: 'R4 est en parallèle sur base-émetteur : UR4 = Vbe = 0,6 V. R4 = 0,6 / 0,02 = 30 Ω.', r: 'Résistance base-masse : sa tension = Vbe.', src: 'Exercice moto' },
    { l: 'moto', fixed: true, a: 0, img: 'exo-moto.jpg', q: 'Q16 — On mesure entre collecteur et émetteur du transistor Q2 une tension de 12V. Quel est l’état du transistor.', c: ['Q2 Bloqué', 'Q2 Saturé', 'Q2 Passant'], e: 'Bloqué = interrupteur ouvert : aucune chute de tension dans la charge, toute la tension d’alimentation est entre C et E. Saturé : Vce ≈ 0 V.', r: 'Vce = alimentation → bloqué.', src: 'Exercice moto' },
  ]
});
