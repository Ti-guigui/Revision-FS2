REV.add({
  id: 'elec', name: 'Électricité générale', icon: '⚡', color: '#d97706',
  desc: 'Grandeurs, lois, résistances, générateurs, alternatif, diodes, transistors, logique.',
  lessons: [
    {
      id: 'unites', title: 'Unités et préfixes',
      html: `
<p>Un préfixe = une puissance de 10. <b>Avant tout calcul, on ramène tout à l’unité de base</b> : A, V, Ω, s, h.</p>
<div class="tw"><table><tr><th>Préfixe</th><th>Symbole</th><th>Valeur</th></tr>
<tr><td>Téra</td><td>T</td><td>10¹²</td></tr><tr><td>Giga</td><td>G</td><td>10⁹</td></tr>
<tr><td>Méga</td><td>M</td><td>10⁶</td></tr><tr><td>kilo</td><td>k</td><td>10³</td></tr>
<tr><td>(unité)</td><td>—</td><td>1</td></tr><tr><td>milli</td><td>m</td><td>10⁻³</td></tr>
<tr><td>micro</td><td>µ</td><td>10⁻⁶</td></tr><tr><td>nano</td><td>n</td><td>10⁻⁹</td></tr><tr><td>pico</td><td>p</td><td>10⁻¹²</td></tr></table></div>
<h3>Exemples de conversion</h3>
<ul><li>35 kΩ = 35 000 Ω</li><li>500 µA = 0,000 5 A</li><li>200 mA = 0,2 A</li><li>40 ms = 0,040 s</li><li>24 min = 24/60 = 0,4 h</li></ul>`,
      retenir: ['On convertit TOUJOURS en unités de base avant de calculer.', 'kilo = ×1 000 ; milli = ÷1 000 ; micro = ÷1 000 000.'],
      pieges: ['Confondre milli (10⁻³) et micro (10⁻⁶) : le résultat est faux d’un facteur 1 000.', 'Vérifier l’ordre de grandeur final : quelques ohms sous 12 V ne donnent pas des milliers d’ampères.'],
      memo: { cle: 'PRÉFIXE = PUISSANCE DE 10', flow: ['k = ×1 000', 'unité', 'm = ÷1 000', 'µ = ÷1 000 000'], points: ['500 µA = 0,000 5 A', '24 min = 0,4 h'], astuce: 'Micro, c’est mille fois plus petit que milli : µ comme « minuscule ».' }
    },
    {
      id: 'lois', title: 'Lois fondamentales',
      html: `
<p>La <b>tension</b> est la « pression » qui pousse les électrons, le <b>courant</b> est leur « débit », la <b>résistance</b> est ce qui freine. À tension fixe, plus la résistance est grande, moins il passe de courant.</p>
<div class="tw"><table><tr><th>Loi</th><th>En série</th><th>En parallèle</th></tr>
<tr><td>Courant (loi des nœuds)</td><td>Même courant partout : Ig = I1 = I2</td><td>Le courant se partage : Ig = I1 + I2</td></tr>
<tr><td>Tension (loi des mailles)</td><td>Les tensions s’additionnent : Ug = U1 + U2</td><td>Même tension partout : Ug = U1 = U2</td></tr>
<tr><td>Résistances</td><td>Req = R1 + R2 + …</td><td>1/Req = 1/R1 + 1/R2 · 2 résistances : R1×R2/(R1+R2) · n égales : R/n</td></tr></table></div>
<h3>Formules</h3>
<ul>
<li><b>Loi d’Ohm</b> : <span class="formula">U = R × I</span> (V, Ω, A). Triangle U en haut, R et I en bas : on cache la grandeur cherchée.</li>
<li><b>Puissance</b> : <span class="formula">P = U × I = R × I² = U² / R</span> (W). 1 ch = 736 W. Une lampe 24 V / 21 W absorbe I = 21/24 ≈ 0,9 A.</li>
<li><b>Résistance d’un fil</b> : <span class="formula">R = ρ × L / S</span> (ρ en Ω·m, L en m, S en m²). Section ronde : S = π × D² / 4. <b>1 mm² = 10⁻⁶ m²</b>.</li>
<li><b>Quantité d’électricité</b> : <span class="formula">Q = I × t</span> (Ah si t en heures ; 1 Ah = 3 600 C). Une batterie 90 Ah donne 90 A pendant 1 h, 45 A pendant 2 h ou 1 A pendant 90 h.</li>
<li><b>Pont diviseur</b> (résistances en série uniquement) : <span class="formula">U(Rx) = [Rx / ΣR] × Ug</span>.</li>
<li><b>Règle de cours</b> : environ 5 A par mm² de section de conducteur.</li>
</ul>
<p>Le <b>potentiel</b> est comme une altitude : la borne − sert de 0 V ; en série, le potentiel baisse à chaque résistance traversée.</p>
<div class="box explic"><b>+ Méthode</b><p>Dans une association, on raisonne en deux temps : d’abord réduire le montage (série puis parallèle, branche par branche) jusqu’à une seule résistance équivalente, puis revenir vers chaque élément avec la loi d’Ohm.</p></div>
<div class="box explic"><b>+ Pourquoi le pont diviseur exige des résistances en série</b><p>La formule suppose que le même courant les traverse toutes. Dès qu’une branche en parallèle prend du courant, la répartition change.</p></div>`,
      images: [{ src: 'elec-q16-req.png', cap: 'Test final Q16 : résistance équivalente entre A et B (réponse 2 Ω)' }],
      retenir: ['Série = courant commun, tensions qui s’additionnent.', 'Parallèle = tension commune, courants qui s’additionnent.', 'U = R × I ; P = U × I ; R = ρL/S ; Q = I × t.'],
      pieges: ['Oublier que 1 mm² = 10⁻⁶ m² dans R = ρL/S.', 'Appliquer le pont diviseur à des résistances qui ne sont pas en série.'],
      memo: { cle: 'SÉRIE = MÊME I · PARALLÈLE = MÊME U', flow: ['Réduire le montage', 'Req', 'I = U / Req', 'Revenir vers chaque élément'], points: ['U = R × I', 'P = U × I = R × I² = U²/R', 'R = ρ × L / S (1 mm² = 10⁻⁶ m²)', 'Q = I × t (Ah)', '≈ 5 A par mm²'], astuce: 'Triangle d’Ohm : U en haut, R et I en bas — cache ce que tu cherches.' }
    },
    {
      id: 'generateurs', title: 'Récepteurs et générateurs',
      html: `
<h3>Lampes</h3>
<ul><li><b>En série</b> : même tension ET même puissance nominales (le même courant les traverse). Ex. : 2 lampes 12 V / 60 W sous 24 V → I = 60/12 = 5 A, Pg = 24 × 5 = 120 W.</li>
<li><b>En parallèle</b> : même tension obligatoire, les courants s’additionnent.</li>
<li>Dans les deux cas, <b>les puissances s’additionnent</b>.</li></ul>
<h3>Générateur réel</h3>
<p>À vide Ug = E (force électromotrice, FEM). En charge, Ug baisse à cause de la résistance interne : <span class="formula">E = Ug + Ri × Ig</span>.</p>
<h3>Association de batteries</h3>
<div class="tw"><table><tr><th>Association</th><th>FEM</th><th>Résistance interne</th><th>Capacité</th></tr>
<tr><td>Série</td><td>E1 + E2</td><td>Ri1 + Ri2</td><td>La plus petite des deux → prendre des batteries identiques</td></tr>
<tr><td>Parallèle</td><td>E1 = E2 obligatoire</td><td>Ri1×Ri2/(Ri1+Ri2)</td><td>Q1 + Q2</td></tr></table></div>
<h3>Exemple corrigé (test final Q14)</h3>
<p>Pg = 108 W ; L1 24 V/60 W et L2 24 V/12 W en parallèle, Rx en série. Lampes sous 24 V : I = 2,5 + 0,5 = 3 A. Rx dissipe 108 − 72 = 36 W → URx = 36/3 = 12 V → <b>Rx = 12/3 = 4 Ω</b> (Ug = 36 V).</p>`,
      images: [{ src: 'elec-q14-rx.png', cap: 'Test final Q14 : Rx en série avec L1 et L2 en parallèle' }],
      retenir: ['Série de batteries → on additionne les TENSIONS.', 'Parallèle de batteries → on additionne les CAPACITÉS (Ah).', 'Générateur réel : E = Ug + Ri × Ig.'],
      pieges: ['Ne jamais inverser : série = tensions, parallèle = capacités.', 'Lampes en série : il faut même tension ET même puissance nominales.'],
      memo: { cle: 'SÉRIE = VOLTS · PARALLÈLE = AMPÈRES-HEURES', points: ['2 × 12 V 60 Ah en série → 24 V / 60 Ah', '2 × 12 V 60 Ah en parallèle → 12 V / 120 Ah', 'Les puissances s’additionnent toujours'], astuce: 'Série : on empile les batteries comme des marches → la tension monte.' }
    },
    {
      id: 'alternatif', title: 'Courant alternatif et triphasé',
      html: `
<ul>
<li>Fils : <b>phase rouge</b>, <b>neutre bleu</b>, <b>terre vert-jaune</b>.</li>
<li>Période T (s) = durée d’un cycle ; <span class="formula">f = 1 / T</span>. 20 ms → 50 Hz ; 40 ms → 25 Hz ; 400 Hz → T = 2,5 ms.</li>
<li>Umax = valeur crête ; Ucàc = 2 × Umax ; tension moyenne d’une sinusoïde pure = 0 V.</li>
<li><b>Tension efficace</b> : <span class="formula">Ueff = Umax / √2 = 0,707 × Umax</span> — c’est ce qu’affiche le voltmètre.</li>
<li><b>Triphasé</b> : tension simple V (phase-neutre) et composée U (entre 2 phases) : <span class="formula">U = V × √3</span>. 380 V entre phases ↔ 220 V phase-neutre ; 220 V entre phases ↔ 127 V phase-neutre.</li>
<li>Couplage <b>étoile</b> : chaque récepteur reçoit V. Couplage <b>triangle</b> : chaque récepteur reçoit U.</li>
<li>Puissance apparente <span class="formula">S (VA) = U × I × √3</span> ; puissance active <span class="formula">P = U × I × √3 × cos φ</span>.</li>
</ul>
<div class="box explic"><b>+ Exemple (pont élévateur UV2)</b><p>Moteur 3 kW, 220 V entre phases, cos φ = 0,8 : I = P / (U × √3 × cos φ) = 3 000 / (220 × 1,732 × 0,8) ≈ 9,8 A.</p></div>`,
      retenir: ['f = 1/T.', 'Ueff = Umax/√2 (le voltmètre affiche la valeur efficace).', 'U (entre phases) = V (phase-neutre) × √3.'],
      pieges: ['Diviser par √3 (et pas par √2) pour passer d’une tension composée à une tension simple.', 'Étoile = V sur chaque récepteur ; triangle = U.'],
      memo: { cle: 'f = 1/T · U = V × √3', flow: ['Tension entre 2 phases (U)', '÷ √3 (1,732)', 'Tension phase-neutre (V)'], points: ['220 V entre phases → 127 V', '380 V entre phases → 220 V', '400 Hz → 2,5 ms ; 40 ms → 25 Hz'], astuce: 'Rouge = phase (danger), bleu = neutre, vert-jaune = terre.' }
    },
    {
      id: 'composants', title: 'Diodes, transistors, condensateurs',
      html: `
<h3>Diode</h3>
<ul><li>Anode A → cathode K. Sens direct : conduit avec ≈ <b>0,6 V</b> de chute. Sens inverse : bloque (interrupteur ouvert).</li>
<li><b>Pont de Graëtz</b> : redresse l’alternatif (double alternance), 2 diodes par alternance (2 × 0,6 V de chute).</li>
<li>Redressement triphasé = <b>6 diodes</b> (2 par phase) : c’est le pont de l’alternateur.</li>
<li>Contrôle au multimètre : position test diode, rouge sur anode, noir sur cathode → ≈ 0,6 V ; dans l’autre sens : « OL » (bloquée).</li>
<li>Diode Zener : maintient une tension fixe (tension de Zener) à ses bornes.</li></ul>
<h3>Transistor (B, C, E ; NPN ou PNP)</h3>
<ul><li><span class="formula">Ie = Ib + Ic</span> ; <span class="formula">Ic = β × Ib</span> (β souvent entre 80 et 320).</li>
<li>Commutation : <b>bloqué</b> (Ib = Ic = 0, Vce = tension d’alimentation) ou <b>saturé</b> (Vbe ≈ 0,6 V, Vce ≈ 0 V : toute la tension est sur la charge).</li></ul>
<p>C’est un <b>interrupteur commandé électriquement</b> : un petit courant de base Ib (quelques mA) autorise un gros courant collecteur Ic (relais, lampe). Pour dimensionner : Ic = courant de la charge → Ib = Ic/β → la résistance de base doit laisser passer Ib (plus le courant du pont base-émetteur s’il y en a un) sous la tension de commande moins Vbe (0,6 V).</p>
<div class="box explic"><b>+ Exemples corrigés</b><ul>
<li>Relais 200 mA, β = 100 → Ib = 200/100 = <b>2 mA</b>. Commande 5 V → UR1 = 5 − 0,6 = <b>4,4 V</b>.</li>
<li>R2 entre base et émetteur avec IR2 = 10 × Ib = 20 mA : R2 = 0,6/0,02 = <b>30 Ω</b>.</li>
<li>Transistor saturé, bobine de relais 12 V / 0,1 A : R = 12/0,1 = <b>120 Ω</b>.</li>
<li>Ib = 500 µA, β = 200 → Ic = 200 × 0,000 5 = <b>0,1 A</b>.</li></ul></div>
<h3>Condensateur (Farad)</h3>
<p>Polarisé (respecter le +) ou non polarisé. Tension de service = tension maxi supportée.</p>
<p>Une diode placée sur une ligne de commande sert souvent de <b>protection contre le retour de courant</b> (ex. empêcher le 12 V qui alimente K1 de repartir vers le circuit DEM).</p>`,
      images: [{ src: 'elec-q20-zener.png', cap: 'Test final Q20 : Z2 et les lampes sous 10 V → Ig = 0,5 + 3,5 + 0,5 = 4,5 A' }],
      retenir: ['Diode passante : ≈ 0,6 V de chute.', 'Ic = β × Ib ; transistor saturé : Vce ≈ 0, toute la tension sur la charge.', 'Pont triphasé = 6 diodes (2 par phase).'],
      pieges: ['Ne pas confondre le circuit de commande (base, petit courant) et le circuit de puissance (collecteur-émetteur). La base ne fait que piloter.', 'Le 0,6 V est le Vbe, pas un niveau logique.'],
      memo: { cle: 'TRANSISTOR = INTERRUPTEUR COMMANDÉ', flow: ['Petit courant Ib (base)', '× β', 'Gros courant Ic (charge)'], points: ['Ib = Ic / β', 'Saturé : Vbe ≈ 0,6 V, Vce ≈ 0 V', 'Diode : 0,6 V en direct, OL en inverse'], astuce: 'La base, c’est le doigt sur l’interrupteur : elle commande, elle ne transporte pas la puissance.' }
    },
    {
      id: 'logique', title: 'Logique et binaire',
      html: `
<ul>
<li>Niveau <b>0 = 0 à 1 V</b> ; niveau <b>1 = 2 à 5 V</b> ; entre 1 et 2 V = zone interdite. 8 bits = 1 octet.</li>
<li><b>Décimal → binaire</b> : poids 128-64-32-16-8-4-2-1, on retire le plus grand poids possible. 89 = 64+16+8+1 = 01011001.</li>
<li>Bit de parité : 1 si le nombre de « 1 » est impair.</li>
<li>Nombre de lignes d’une table de vérité = <b>2ⁿ</b> (n entrées) : 2 → 4, 3 → 8, 6 → 64.</li>
<li>Écriture : A·B = ET (montage série) ; A+B = OU (montage parallèle) ; Ā = NON.</li>
</ul>
<div class="tw"><table><tr><th>Porte</th><th>Équation</th><th>Sortie à 1 quand…</th></tr>
<tr><td>NON</td><td>S = Ā</td><td>l’entrée vaut 0</td></tr>
<tr><td>ET</td><td>S = A·B</td><td>toutes les entrées valent 1</td></tr>
<tr><td>OU</td><td>S = A+B</td><td>au moins une entrée vaut 1</td></tr>
<tr><td>NON-ET (NAND)</td><td>S = (A·B)‾</td><td>inverse du ET</td></tr>
<tr><td>NON-OU (NOR)</td><td>S = (A+B)‾</td><td>inverse du OU → se remplace par un OU suivi d’un NON</td></tr></table></div>
<p><b>De Morgan</b> : on casse la barre ET on change le signe. (A+B)‾ = Ā·B̄ ; (A·B)‾ = Ā + B̄.</p>
<p><b>Simplifications</b> : A·0 = 0 ; A·1 = A ; A·Ā = 0 ; A+0 = A ; A+1 = 1 ; A+Ā = 1 ; A + A·B = A ; A·(B+C) = A·B + A·C.</p>
<div class="tw"><table><tr><th>Décimal</th><th>Binaire</th><th>Détail</th></tr>
<tr><td>3 / 6</td><td>011 / 110</td><td>2+1 / 4+2</td></tr><tr><td>8</td><td>1000</td><td>8</td></tr>
<tr><td>11</td><td>1011</td><td>8+2+1</td></tr><tr><td>12</td><td>1100</td><td>8+4</td></tr>
<tr><td>15</td><td>1111</td><td>8+4+2+1 (4 bits)</td></tr><tr><td>18</td><td>10010</td><td>16+2</td></tr>
<tr><td>20</td><td>10100</td><td>16+4</td></tr><tr><td>40</td><td>101000</td><td>32+8</td></tr></table></div>
<h3>Algèbre de Boole (fascicule « Fonction logique »)</h3>
<p>Les variables booléennes ne prennent que deux valeurs, 0 et 1 : ce ne sont pas des nombres mais des <b>états</b> (niveaux logiques). Les opérateurs logiques s’appellent aussi <b>portes</b> ou <b>fonctions logiques</b>.</p>
<ul><li>Point (.) = « <b>et</b> » : A.B (on écrit aussi AB) · plus (+) = « <b>ou</b> » · barre (Ā) = « <b>inverse</b>, complément » · ⊕ = « <b>soit l’un, soit l’autre</b> » (OU exclusif) · « = S » indique la sortie.</li>
<li>Deux barres s’annulent : Ā̄ = A (trois barres = une barre).</li>
<li>Sauf NON, XOR et XNOR, les portes peuvent avoir de 2 à « x » entrées.</li></ul>
<h3>Les 8 portes</h3>
<div class="tw"><table><tr><th>Porte</th><th>Symbole AFNOR</th><th>Équation</th><th>Sortie à 1 si…</th><th>Analogie électrique</th></tr>
<tr><td>OUI</td><td>1</td><td>S = A</td><td>A = 1</td><td>1 contact ouvert au repos</td></tr>
<tr><td>NON (NOT)</td><td>1 + rond</td><td>S = Ā</td><td>A = 0</td><td>1 contact fermé au repos</td></tr>
<tr><td>ET (AND)</td><td>&amp;</td><td>S = A.B</td><td>A et B à 1</td><td>2 contacts ouverts <b>en série</b></td></tr>
<tr><td>ET NON (NAND)</td><td>&amp; + rond</td><td>S = (A.B)‾</td><td>au moins une entrée à 0</td><td>2 contacts fermés <b>en parallèle</b></td></tr>
<tr><td>OU (OR)</td><td>≥1</td><td>S = A + B</td><td>au moins une entrée à 1</td><td>2 contacts ouverts <b>en parallèle</b></td></tr>
<tr><td>OU NON (NOR)</td><td>≥1 + rond</td><td>S = (A + B)‾</td><td>A et B à 0</td><td>2 contacts fermés <b>en série</b></td></tr>
<tr><td>OU EXCLUSIF (XOR)</td><td>=1</td><td>S = Ā.B + A.B̄ = A ⊕ B</td><td>entrées <b>différentes</b></td><td>2 inverseurs croisés</td></tr>
<tr><td>OU NON EXCLUSIF (XNOR)</td><td>=1 + rond</td><td>S = Ā.B̄ + A.B = (A ⊕ B)‾</td><td>entrées <b>identiques</b></td><td>2 inverseurs</td></tr></table></div>
<p>Le <b>rond</b> en sortie d’un symbole = inversion. Symboles OTAN : formes arrondies (ET en « D », OU en ogive, XOR avec une double courbe à l’entrée).</p>
<h3>Propriétés</h3>
<ul><li><b>Commutativité</b> : A.B = B.A ; A + B = B + A.</li>
<li><b>Associativité</b> : (A.B).C = A.(B.C) ; (A + B) + C = A + (B + C). Attention : on ne peut pas écrire (A.B) + C = A.(B + C).</li>
<li><b>Distributivité</b> : A.(B + C) = A.B + A.C ; et aussi A + (B.C) = (A + B).(A + C).</li>
<li><b>Absorption</b> : A + A.B = A (car A.1 + A.B = A.(1 + B) = A.1 = A).</li></ul>`,
      images: [{ src: 'logique-portes.jpg', cap: 'Tableau des portes : symboles OTAN et AFNOR, équations, analogies électriques, tables de vérité et chronogrammes' }],
      retenir: ['2ⁿ combinaisons pour n entrées.', 'ET = série, OU = parallèle.', 'De Morgan : casser la barre, changer le signe.', 'AFNOR : & = ET, ≥1 = OU, =1 = OU exclusif, rond = inversion.', 'XOR = 1 si les entrées sont différentes ; XNOR = 1 si elles sont identiques.', 'Absorption : A + A.B = A.'],
      pieges: ['Une porte NOR se remplace par un OU suivi d’un NON (pas un ET).', 'Dans une équation ET, une seule entrée à 0 suffit à mettre la sortie à 0.'],
      memo: { cle: 'ET = SÉRIE · OU = PARALLÈLE', points: ['Poids : 128-64-32-16-8-4-2-1', '2ⁿ lignes (6 entrées → 64)', '(A+B)‾ = Ā·B̄ · (A·B)‾ = Ā + B̄', '0 = 0–1 V · 1 = 2–5 V'], astuce: 'De Morgan : « je casse la barre, je change le signe ».' }
    }
  ],
  questions: [
    { l: 'unites', q: '500 µA exprimés en ampères, cela donne :', c: ['0,000 5 A', '0,5 A', '0,05 A', '0,005 A'], e: 'µ = micro = 10⁻⁶ : 500 × 10⁻⁶ = 0,000 5 A.', r: 'milli = 10⁻³, micro = 10⁻⁶.', w: 'Confondre µ et m donne un résultat 1 000 fois trop grand (0,5 A).' },
    { l: 'unites', q: '24 minutes exprimées en heures, cela donne :', c: ['0,4 h', '0,24 h', '2,4 h', '0,04 h'], e: '24 / 60 = 0,4 h. On convertit les minutes en heures pour calculer des Ah.', r: 'Toujours convertir en unité de base avant de calculer.' },
    { l: 'unites', q: 'Tension aux bornes d’une résistance de 35 kΩ traversée par 0,003 A ?', c: ['105 V', '10,5 V', '0,105 V', '1 050 V'], e: 'U = R × I = 35 000 × 0,003 = 105 V. 35 kΩ = 35 000 Ω.', r: 'kilo = ×1 000.', src: 'Test final Q15 (officiel)' },
    { l: 'lois', q: 'Courant maximal admissible dans un conducteur de 3 mm² ?', c: ['15 A', '3 A', '30 A', '9 A'], e: 'Règle de cours : environ 5 A par mm² → 3 × 5 = 15 A.', r: '≈ 5 A par mm² de section.', src: 'Test final Q11 (officiel)' },
    { l: 'lois', q: 'Quel courant fournit une batterie de 96 Ah pendant 32 h ?', c: ['3 A', '0,33 A', '64 A', '3 072 A'], e: 'Q = I × t → I = Q / t = 96 / 32 = 3 A.', r: 'Q (Ah) = I (A) × t (h).', src: 'Test final Q12 (officiel)' },
    { l: 'lois', q: 'Fil de cuivre ρ = 1,6·10⁻⁸ Ω·m, R = 3,2 Ω, S = 1 mm². Quelle longueur ?', c: ['200 m', '2 m', '20 m', '2 000 m'], e: 'L = R × S / ρ = 3,2 × 10⁻⁶ / 1,6·10⁻⁸ = 200 m.', r: '1 mm² = 10⁻⁶ m².', w: 'Oublier la conversion mm² → m² donne un résultat complètement faux.', src: 'Test final Q13 (officiel)' },
    { l: 'lois', q: 'Lampe de 24 W traversée par 2 A : quelle est sa résistance ?', c: ['6 Ω', '12 Ω', '48 Ω', '3 Ω'], e: 'P = R × I² → R = P / I² = 24 / 4 = 6 Ω.', r: 'P = U × I = R × I² = U²/R.', src: 'Test final Q17 (officiel)' },
    { l: 'lois', q: 'Résistance équivalente entre A et B du schéma (1 Ω en entrée, puis deux branches en parallèle : [2 Ω ∥ 2 Ω] + 1 Ω, et 1 Ω + 1 Ω) ?', img: 'elec-q16-req.png', c: ['2 Ω', '1 Ω', '4 Ω', '8 Ω'], e: '2 ∥ 2 = 1 Ω, + 1 Ω = 2 Ω. Branche du bas : 1 + 1 = 2 Ω. Ces deux branches de 2 Ω en parallèle = 1 Ω. Plus le 1 Ω d’entrée : 2 Ω.', r: 'n résistances égales en parallèle = R/n.', src: 'Test final Q16 (officiel)' },
    { l: 'lois', q: 'Dans un montage en SÉRIE, qu’est-ce qui est identique pour tous les éléments ?', c: ['Le courant', 'La tension', 'La puissance', 'La résistance'], e: 'En série, un seul chemin : le même courant traverse tout. Ce sont les tensions qui s’additionnent.', r: 'Série = même I ; parallèle = même U.' },
    { l: 'lois', q: 'Le pont diviseur de tension U(Rx) = [Rx / ΣR] × Ug s’applique :', c: ['Uniquement à des résistances en série', 'À des résistances en parallèle', 'À n’importe quel montage', 'Uniquement en courant alternatif'], e: 'La formule suppose que le même courant traverse toutes les résistances. Une branche en parallèle change la répartition.', r: 'Pont diviseur = série uniquement.' },
    { l: 'generateurs', q: 'Deux batteries 12 V / 60 Ah montées en PARALLÈLE donnent :', c: ['12 V / 120 Ah', '24 V / 60 Ah', '24 V / 120 Ah', '12 V / 60 Ah'], e: 'En parallèle, la tension reste la même et les capacités s’additionnent.', r: 'Série → tensions ; parallèle → capacités.', w: 'Ne jamais inverser série et parallèle.' },
    { l: 'generateurs', q: 'Deux lampes 12 V / 60 W en série sous 24 V : quel courant et quelle puissance totale ?', c: ['5 A et 120 W', '10 A et 60 W', '2,5 A et 120 W', '5 A et 60 W'], e: 'I = P/U = 60/12 = 5 A (même courant en série). Pg = 24 × 5 = 120 W : les puissances s’additionnent.', r: 'Les puissances s’additionnent toujours, en série comme en parallèle.' },
    { l: 'generateurs', q: 'Pg = 108 W ; L1 (24 V / 60 W) et L2 (24 V / 12 W) en parallèle, en série avec Rx. Valeur de Rx ?', img: 'elec-q14-rx.png', c: ['4 Ω', '12 Ω', '8 Ω', '2 Ω'], e: 'Sous 24 V : I = 2,5 + 0,5 = 3 A. Rx dissipe 108 − 72 = 36 W → URx = 36/3 = 12 V → Rx = 12/3 = 4 Ω.', r: 'Loi des nœuds puis bilan des puissances.', src: 'Test final Q14 (officiel)' },
    { l: 'generateurs', q: 'Pour un générateur réel en charge, quelle relation est juste ?', c: ['E = Ug + Ri × Ig', 'E = Ug − Ri × Ig', 'Ug = E + Ri × Ig', 'E = Ri × Ig'], e: 'En charge, la tension aux bornes baisse à cause de la résistance interne : Ug = E − Ri × Ig, donc E = Ug + Ri × Ig.', r: 'À vide Ug = E (FEM).' },
    { l: 'alternatif', q: '220 V entre deux phases : quelle tension entre phase et neutre ?', c: ['127 V', '380 V', '155 V', '110 V'], e: 'V = U / √3 = 220 / 1,732 ≈ 127 V.', r: 'U (composée) = V (simple) × √3.', w: 'Ne pas diviser par √2 (c’est pour la valeur efficace).', src: 'Test final Q18 (officiel)' },
    { l: 'alternatif', q: 'Réseau 200 V – 400 Hz : quelle est la période ?', c: ['2,5 ms', '25 ms', '0,4 ms', '400 ms'], e: 'T = 1 / f = 1 / 400 = 0,002 5 s = 2,5 ms.', r: 'f = 1/T.', src: 'Test final Q19 (officiel)' },
    { l: 'alternatif', q: 'Période de 40 ms : quelle fréquence ?', c: ['25 Hz', '40 Hz', '50 Hz', '250 Hz'], e: 'f = 1 / 0,040 = 25 Hz.', r: '20 ms → 50 Hz ; 40 ms → 25 Hz.', src: 'Corrigé UV2 Q63' },
    { l: 'alternatif', q: 'Quelle valeur affiche un voltmètre en alternatif sinusoïdal ?', c: ['La tension efficace (Umax/√2)', 'La tension crête Umax', 'La tension crête à crête', 'La tension moyenne (0 V)'], e: 'Le voltmètre affiche la valeur efficace : Ueff = Umax / √2 = 0,707 × Umax.', r: 'Ueff = 0,707 × Umax.' },
    { l: 'alternatif', q: 'Couleur du conducteur de neutre ?', c: ['Bleu', 'Rouge', 'Vert-jaune', 'Noir'], e: 'Phase rouge, neutre bleu, terre vert-jaune.', r: 'Vert-jaune = terre, jamais autre chose.' },
    { l: 'alternatif', q: 'En couplage TRIANGLE, chaque récepteur reçoit :', c: ['La tension composée U (entre phases)', 'La tension simple V (phase-neutre)', 'U / √3', 'La moitié de U'], e: 'Étoile : chaque récepteur reçoit V. Triangle : chaque récepteur est entre deux phases et reçoit U.', r: 'Étoile = V, triangle = U.' },
    { l: 'composants', q: 'Ug = 29 V, VZ1 = VZ2 = 10 V, IZ2 = 500 mA, PL1 = 5 W, PL2 = 35 W (lampes en parallèle avec Z2). Courant Ig ?', img: 'elec-q20-zener.png', c: ['4,5 A', '4 A', '2,9 A', '0,5 A'], e: 'Les lampes sont sous 10 V (tension de Zener) : 5/10 = 0,5 A et 35/10 = 3,5 A, plus IZ2 = 0,5 A → loi des nœuds : 4,5 A.', r: 'Diode Zener = tension fixe à ses bornes.', src: 'Test final Q20 (officiel)' },
    { l: 'composants', q: 'Relais de 200 mA commandé par un transistor de gain β = 100. Courant de base Ib ?', c: ['2 mA', '20 mA', '200 mA', '0,2 mA'], e: 'Ib = Ic / β = 200 mA / 100 = 2 mA.', r: 'Ic = β × Ib.', src: 'Corrigé UV2 Q58' },
    { l: 'composants', q: 'Transistor saturé, Ib = 500 µA, β = 200. Courant Ic ?', c: ['0,1 A', '1 A', '0,01 A', '10 A'], e: 'Ic = β × Ib = 200 × 0,000 5 = 0,1 A.', r: 'Convertir 500 µA = 0,000 5 A avant de calculer.', src: 'Test électronique Uv1' },
    { l: 'composants', q: 'Commande 5 V, Vbe = 0,6 V : tension aux bornes de la résistance de base R1 ?', c: ['4,4 V', '5,6 V', '5 V', '0,6 V'], e: 'UR1 = tension de commande − Vbe = 5 − 0,6 = 4,4 V.', r: 'Vbe ≈ 0,6 V quand le transistor conduit.', src: 'Corrigé UV2 Q59' },
    { l: 'composants', q: 'Transistor en commutation SATURÉ : que vaut Vce ?', c: ['≈ 0 V : toute la tension est sur la charge', 'La tension d’alimentation', '0,6 V', '5 V'], e: 'Saturé : Vbe ≈ 0,6 V et Vce ≈ 0 V. Bloqué : Ic = 0 et Vce = tension d’alimentation.', r: 'Saturé = interrupteur fermé ; bloqué = interrupteur ouvert.' },
    { l: 'composants', q: 'Contrôle d’une diode au multimètre (position test diode), rouge sur l’anode, noir sur la cathode : on lit…', c: ['≈ 0,6 V', 'OL', '0 V', '12 V'], e: 'Dans le sens direct, la diode conduit avec ≈ 0,6 V de chute. Dans l’autre sens : « OL » (bloquée).', r: 'Diode : 0,6 V dans un sens, OL dans l’autre.' },
    { l: 'composants', q: 'Combien de diodes pour redresser un courant triphasé (double alternance) ?', c: ['6 (2 par phase)', '3 (1 par phase)', '4', '9'], e: 'Redressement triphasé = 6 diodes, 2 par phase : c’est le pont de puissance de l’alternateur.', r: 'Pont de Graëtz monophasé = 4 diodes ; triphasé = 6.' },
    { l: 'logique', q: 'Combien de combinaisons (lignes de table de vérité) pour 6 entrées ?', c: ['64', '12', '36', '32'], e: '2ⁿ = 2⁶ = 64.', r: '2 entrées → 4 ; 3 → 8 ; 6 → 64.', src: 'Corrigé UV2 Q64' },
    { l: 'logique', q: '12 en binaire s’écrit :', c: ['1100', '1010', '1001', '0110'], e: '12 = 8 + 4 → 1100.', r: 'Poids 8-4-2-1.' },
    { l: 'logique', q: '1011 en binaire vaut en décimal :', c: ['11', '13', '9', '1 011'], e: '1011 = 8 + 0 + 2 + 1 = 11.', r: 'On additionne les poids des bits à 1.' },
    { l: 'logique', q: 'Par quoi remplacer une porte OU-NON (NOR) ?', c: ['Une porte OU suivie d’une porte NON', 'Une porte ET suivie d’une porte NON', 'Une porte NON suivie d’une porte OU', 'Deux portes ET'], e: 'NOR = inverse du OU → OU puis NON.', r: 'NAND = ET + NON ; NOR = OU + NON.' },
    { l: 'logique', q: 'Selon De Morgan, (A + B)‾ est égal à :', c: ['Ā · B̄', 'Ā + B̄', 'A · B', '(A · B)‾'], e: 'On casse la barre ET on change le signe : (A+B)‾ = Ā·B̄.', r: '« Je casse la barre, je change le signe ».' },
    { l: 'logique', q: 'Équation de descente : S = B̄·D·(M̄ + H). Avec D = 0, la sortie vaut :', c: ['0 (0 V)', '1 (5 V)', '0,6 V', 'Ça dépend de M et H'], e: 'D est un facteur d’un ET : si D = 0, toute l’expression vaut 0 → 0 V. Le 0,6 V est le Vbe, pas un niveau logique.', r: 'Dans un ET, une seule entrée à 0 met la sortie à 0.', src: 'Corrigé UV2 Q56' },
    { l: 'logique', q: 'Quelle plage de tension correspond au niveau logique 1 ?', c: ['2 à 5 V', '0 à 1 V', '1 à 2 V', '5 à 12 V'], e: '0 = 0 à 1 V ; 1 = 2 à 5 V ; entre 1 et 2 V = zone interdite.', r: 'Électronique embarquée : logique en 5 V.' },
    { l: 'logique', q: 'Symbole AFNOR « ≥1 » : de quelle porte s’agit-il ?', c: ['OU (OR)', 'ET (AND)', 'OU exclusif (XOR)', 'NON (NOT)'], e: '& = ET ; ≥1 = OU (au moins une entrée à 1) ; =1 = OU exclusif (exactement une entrée à 1) ; 1 = OUI.', img: 'logique-portes.jpg' },
    { l: 'logique', q: 'Symbole AFNOR « =1 » suivi d’un rond : de quelle porte s’agit-il ?', c: ['OU NON exclusif (XNOR)', 'OU exclusif (XOR)', 'NON-OU (NOR)', 'NON (NOT)'], e: '=1 = OU exclusif ; le rond en sortie inverse → XNOR.' },
    { l: 'logique', q: 'OU exclusif (XOR) : quand la sortie vaut-elle 1 ?', c: ['Quand les deux entrées sont différentes', 'Quand les deux entrées sont à 1', 'Quand au moins une entrée est à 1', 'Quand les deux entrées sont identiques'], e: 'S = Ā.B + A.B̄ = A ⊕ B : « soit l’un, soit l’autre », pas les deux.', r: 'XNOR = 1 si les entrées sont identiques.' },
    { l: 'logique', q: 'Porte NAND : combien de lignes de sa table de vérité (2 entrées) donnent S = 0 ?', c: ['1 (A = 1 et B = 1)', '3', '0', '2'], e: 'NAND = inverse du ET : S = 0 seulement quand toutes les entrées sont à 1.' },
    { l: 'logique', q: 'Analogie électrique de la porte ET :', c: ['Deux contacts ouverts au repos en série', 'Deux contacts ouverts au repos en parallèle', 'Deux contacts fermés au repos en série', 'Un contact fermé au repos'], e: 'ET = série (il faut A et B fermés). OU = parallèle. NOR = contacts fermés au repos en série. NAND = contacts fermés au repos en parallèle.' },
    { l: 'logique', q: 'Analogie électrique de la porte NON (NOT) :', c: ['Un contact fermé au repos (NF)', 'Un contact ouvert au repos (NO)', 'Deux contacts en série', 'Deux inverseurs'], e: 'Appuyer sur A ouvre le contact : la lampe s’éteint. S = Ā.' },
    { l: 'logique', q: 'Que signifie le signe ⊕ ?', c: ['« Soit l’un, soit l’autre » (OU exclusif)', '« Et »', '« Ou » inclusif', '« Inverse »'], e: 'A ⊕ B = Ā.B + A.B̄.' },
    { l: 'logique', q: 'Simplifier A + A.B :', c: ['A', 'B', 'A.B', '1'], e: 'Règle d’absorption : A.1 + A.B = A.(1 + B) = A.1 = A.' },
    { l: 'logique', q: 'Quelles portes ne peuvent pas avoir plus de 2 entrées (ou 1 pour NON) ?', c: ['NON, XOR et XNOR', 'ET et OU', 'NAND et NOR', 'Toutes'], e: 'Les autres portes peuvent avoir de 2 à « x » entrées.' },
    { l: 'logique', q: 'Que vaut A.Ā ?', c: ['0', '1', 'A', 'Ā'], e: 'Une variable ET son complément vaut toujours 0 ; A + Ā = 1.' },
    { l: 'logique', q: 'Quelle écriture est FAUSSE ?', c: ['(A.B) + C = A.(B + C)', 'A.(B + C) = A.B + A.C', '(A.B).C = A.(B.C)', 'A + (B.C) = (A + B).(A + C)'], e: 'On ne peut pas déplacer les parenthèses entre un ET et un OU (attention aux parenthèses !).' }
  ]
});
