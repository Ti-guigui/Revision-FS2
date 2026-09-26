REV.add({
  id: 'mdf', name: 'Manœuvre de force', icon: '🏗️', color: '#a16207', ordered: true,
  desc: 'Cours AGB 08 / AGB 04 (version simplifiée, ind. C 2021). Leçons et QCM rangés dans l’ordre de la méthode S-E-N-S-E-S-R-D, pour faire les calculs étape par étape.',
  lessons: [
    {
      id: 'cadres', title: '0 · Avant de calculer : analyse, rôle des cadres, sécurité',
      html: `
<p><b>But</b> : déplacer ou modifier la position d’un fardeau à l’aide d’une force, par des moyens adaptés.</p>
<h3>Analyse des facteurs</h3>
<ul><li><b>Le fardeau</b> : nature et poids. Densités à retenir pour les obstacles naturels : <b>bois 1 t/m³</b> · <b>roche 2,5 t/m³</b> · <b>métal 8 t/m³</b>.</li>
<li><b>Le terrain</b> : plat ou incliné, sec ou humide, présence de points fixes naturels, accès et repli des tracteurs.</li>
<li><b>L’ambiance</b> : jour/nuit, météo, présence de blessés, bulle de sécurité selon le contexte.</li>
<li><b>Les moyens</b> : personnel qui connaît parfaitement le matériel, matériel en parfait état, seul le personnel nécessaire intervient.</li>
<li><b>Les délais</b> : imposés par la situation.</li></ul>
<h3>Rôle des cadres</h3>
<div class="tw"><table><tr><th>Directeur de manœuvre (officier)</th><th>Chef de manœuvre (sous-officier)</th></tr>
<tr><td>Surveille la manœuvre et <b>en est responsable</b> · prévient les accidents, fait respecter la sécurité · choisit après avoir entendu le chef de manœuvre · donne ses ordres <b>par l’intermédiaire du chef de manœuvre</b> · détermine le <b>périmètre de sécurité</b>.</td>
<td>Chargé de la <b>préparation et de l’exécution</b> : reconnaît le terrain, fait vérifier le matériel et sa CMU, calcule les efforts, adapte le schéma, répartit les tâches, donne les consignes · met le dispositif en <b>légère tension</b> pour un dernier contrôle · se place pour voir et être vu · surveille fardeau et points fixes · fait démonter et récupérer le matériel.</td></tr></table></div>
<p>Chaque opération élémentaire est exécutée par une équipe aux ordres d’un chef d’équipe. En l’absence d’un cadre, l’officier ou le sous-officier présent assume seul toutes les responsabilités.</p>
<h3>Sécurité</h3>
<p>Une manœuvre de force ne s’exécute jamais intuitivement : elle suit un plan, avec calme, fermeté et prudence ; le personnel opère en silence. Avant l’exécution : moyens assez puissants et en bon état, engins sur une base solide, point d’application robuste sur le fardeau, <b>évacuer le polygone</b> défini par les câbles, les points fixes, les tracteurs et le fardeau.</p>
<ul><li>Ne pas franchir les câbles en tension ni stationner dans leur prolongement.</li>
<li>Ne jamais se placer sous la charge ; ne pas passer sous un fardeau halé sur une rampe.</li>
<li>Ne pas retenir une cale avec le pied ou la main : cales emmanchées, sur le côté.</li>
<li>Retirer montres, bagues, alliances ; gants épais et lunettes.</li>
<li>Ne pas laisser glisser un câble dans la main, ne pas porter un câble sur l’épaule, ne pas laisser traîner le crochet.</li>
<li>Ne pas enrouler/dérouler un câble de treuil sans ordre ; pas de marche arrière sans guide.</li>
<li><b>Ne pas frapper à plus de trois sur le même piquet</b>.</li>
<li>Ne pas s’entêter dans une solution qui ne marche pas ; prévoir large pour ne pas recommencer.</li></ul>`,
      retenir: ['Bois 1 t/m³ · roche 2,5 t/m³ · métal 8 t/m³.', 'Directeur (officier) = responsable, périmètre de sécurité. Chef de manœuvre (sous-officier) = préparation + exécution.', 'Légère tension avant la manœuvre = dernier contrôle des agrès.'],
      pieges: ['Le directeur ne donne pas ses ordres directement au personnel : il passe par le chef de manœuvre.'],
      memo: { cle: 'FARDEAU · TERRAIN · AMBIANCE · MOYENS · DÉLAIS', points: ['Bois 1 · roche 2,5 · métal 8 (t/m³)', 'Officier = directeur, responsable', 'Sous-officier = chef, prépare et exécute', 'Jamais sous la charge, jamais dans l’axe d’un câble tendu'], astuce: 'Un câble qui casse fouette dans son axe : ne jamais rester dans le prolongement.' }
    },
    {
      id: 'resistances', title: '1 · S — Somme des résistances du fardeau (ΣR)',
      html: `
<div class="box methode"><b>✎ Toujours dans cet ordre</b><p>1 S → 2 E → 3 N → 4 S → 5 E → 6 S → 7 R → 8 D. Chaque étape utilise le résultat de la précédente : ΣR sert à calculer Nb, l’EMD sert à Nb et à l’EMT, l’EMT sert à la sécurité… Si la sécurité oblige à changer le nombre de brins, on <b>revient à l’étape 4 (schéma)</b>. Le QCM de cette matière suit aussi cet ordre.</p></div>
<h3>La méthode S E N S E S R D</h3>
<div class="tw"><table><tr><th>Lettre</th><th>Étape</th></tr>
<tr><td>S</td><td>Somme des résistances du fardeau (ΣR)</td></tr>
<tr><td>E</td><td>Effort moteur disponible (EMD)</td></tr>
<tr><td>N</td><td>Nombre de brins (Nb)</td></tr>
<tr><td>S</td><td>Schéma</td></tr>
<tr><td>E</td><td>Effort moteur total (EMT)</td></tr>
<tr><td>S</td><td>Sécurité (S %)</td></tr>
<tr><td>R</td><td>Résistance des points fixes et agrès (RPF)</td></tr>
<tr><td>D</td><td>Distances : implantation des PF, déplacement du tracteur, déplacement du fardeau</td></tr></table></div>
<h3>Somme des résistances : ΣR = Rr ou Rg ± Rp</h3>
<ul><li>Fardeau qui <b>roule</b> (roues, chenilles) : <span class="formula">Rr = P × fr</span>.</li>
<li>Fardeau qui <b>glisse</b> : <span class="formula">Rg = P × fg</span>.</li>
<li>Exemple sol horizontal : 9 600 daN, terrain humide (fr = 0,15) → R = <b>1 440 daN</b>.</li></ul>
<h3>Résistance à la pente Rp</h3>
<ul><li>Pente <b>≤ 50 %</b> : <span class="formula">Rp = P × p%</span>.</li>
<li>Pente <b>entre 50 et 100 %</b> : <span class="formula">Rp = P × sinus</span> correspondant (table).</li>
<li>Pente <b>&gt; 100 %</b> : <span class="formula">R = P</span>.</li>
<li>En <b>montée</b>, on ajoute Rp ; en <b>descente</b>, on la retranche.</li></ul>
<div class="box explic"><b>+ Exemples (fardeau roulant 4 000 daN, sol meuble fr = 0,3 → Rr = 1 200 daN)</b><ul>
<li>Pente 25 % : Rp = 4 000 × 0,25 = 1 000 → <b>R = 2 200 daN</b>.</li>
<li>Pente 84 % (sin = 0,64) : Rp = 2 560 → <b>R = 3 760 daN</b>.</li>
<li>Descente 84 % : 1 200 − 2 560 = −1 360 → il faut <b>retenir le fardeau avec 1 360 daN</b>.</li></ul></div>
<h3>Cas particuliers (AGB 04)</h3>
<div class="tw"><table><tr><th>Situation</th><th>ΣR</th></tr>
<tr><td>Élévation d’un fardeau</td><td><b>11/10 P</b></td></tr>
<tr><td>Descente d’un fardeau</td><td><b>3/2 P</b></td></tr>
<tr><td>Retournement d’un fardeau sur sol plat</td><td><b>2/3 P</b> (4 000 daN → 2 667 daN ; 3 500 daN → 2 333 daN)</td></tr>
<tr><td>Retournement sur une pente &gt; 15 %</td><td><b>P</b></td></tr>
<tr><td>Montée sur une pente &gt; 100 %</td><td><b>P</b></td></tr>
<tr><td>Fardeau enlisé jusqu’aux essieux (effet ventouse)</td><td><b>2 P</b></td></tr></table></div>
<h3>Coefficients selon le sol</h3>
<div class="tw"><table><tr><th>Nature du sol</th><th>fg = fa (glissement / adhérence)</th><th>fr (roulement)</th></tr>
<tr><td>Macadam</td><td>0,7</td><td>0,03</td></tr>
<tr><td>Route sèche, chemin dur</td><td>0,5</td><td>0,06</td></tr>
<tr><td>Terrain humide, gravier</td><td>0,4</td><td>0,15</td></tr>
<tr><td>Terrain meuble</td><td>0,35</td><td>0,3</td></tr>
<tr><td>Boue profonde</td><td>0,3</td><td>0,5</td></tr>
<tr><td>Enlisé</td><td>—</td><td>2</td></tr></table></div>
<h3>Table trigonométrique simplifiée</h3>
<div class="tw"><table><tr><th>Angle</th><td>5°</td><td>10°</td><td>15°</td><td>20°</td><td>25°</td><td>30°</td><td>35°</td><td>40°</td><td>45°</td></tr>
<tr><th>sin</th><td>0,09</td><td>0,17</td><td>0,26</td><td>0,34</td><td>0,42</td><td>0,50</td><td>0,57</td><td>0,64</td><td>0,71</td></tr>
<tr><th>Pente</th><td>9 %</td><td>17 %</td><td>27 %</td><td>36 %</td><td>46 %</td><td>57 %</td><td>70 %</td><td>84 %</td><td>100 %</td></tr></table></div>`,
      retenir: ['SENSESRD : Somme – EMD – Nombre – Schéma – EMT – Sécurité – Résistance PF – Distances.', 'Pente ≤ 50 % : P × p ; 50–100 % : P × sin ; > 100 % : R = P.', 'Retournement = 2/3 P ; enlisement aux essieux = 2 P.'],
      pieges: ['Au-dessus de 50 % de pente, on ne multiplie plus par le pourcentage mais par le sinus.', 'En descente, la pente aide : on la retranche (et on calcule l’effort de retenue).'],
      memo: { cle: 'S-E-N-S-E-S-R-D', flow: ['Somme des résistances', 'Effort moteur disponible', 'Nombre de brins', 'Schéma', 'Effort moteur total', 'Sécurité', 'Résistance des points fixes', 'Distances'], points: ['ΣR = Rr (ou Rg) ± Rp', 'Retournement 2/3 P · enlisé aux essieux 2 P', 'Terrain meuble : fr 0,3 · boue profonde : fa 0,3'], astuce: '« SENSES » + « RD » : on sent le fardeau avant de tirer.' }
    },
    {
      id: 'emd', title: '2 · E — Effort moteur disponible (EMD)',
      html: `
<h3>Traction au treuil</h3>
<p>Le constructeur donne une force maxi (câble déroulé) et <b>mini (câble enroulé)</b> : on prend la <b>valeur mini</b>. Une longueur de sécurité reste toujours enroulée sur le tambour.</p>
<ul><li>Adhérence du tracteur : <span class="formula">A = P × fa</span>.</li>
<li>Si <b>A &gt; FT</b> → <b>EMD = FT</b> (valeur mini constructeur).</li>
<li>Si <b>A &lt; FT</b> → <b>EMD = A</b> : la force du treuil est limitée par l’adhérence.</li>
<li>Avec <b>bêches ou socs d’ancrage</b> (GBC 180 lot 7, TRM 10000 CLD, PPLD) : <span class="formula">A = P × fa + FT</span> → on récupère la force du treuil.</li></ul>
<div class="box explic"><b>+ Exemple</b><p>Tracteur 4 100 daN, FT = 2 250 daN, boue profonde fa = 0,3 → A = 1 230 daN &lt; FT → EMD = 1 230 daN. Avec bêche : A = 1 230 + 2 250 = 3 480 daN &gt; FT → <b>EMD = 2 250 daN</b>.</p></div>
<h3>Traction au crochet (véhicule sans treuil)</h3>
<p><span class="formula">EMD = FC = (Fj ou A) − ΣR tracteur</span> — on prend <b>la plus petite</b> des deux valeurs Fj et A.</p>
<ul><li><b>Force à la jante</b> : <span class="formula">Fj = 270 × Pm / v</span> (Pm en kW, v ≈ 5 km/h au plus petit rapport ; 1 ch = 0,736 kW).</li>
<li><b>Adhérence</b> : tous les ponts moteurs (4×4, 6×6) → <span class="formula">A = P × fa</span> ; <b>un seul pont moteur</b> → <span class="formula">A = 2/3 P × fa</span>.</li>
<li><b>Résistances du tracteur</b> : ΣRT = Rr ± Rp.</li></ul>
<div class="box explic"><b>+ Exemple</b><p>PL 5 000 daN, 81 kW, 5 km/h, route sèche (fr 0,06 ; fa 0,5), pente 10 %, deux ponts moteurs. Fj = 270 × 81 / 5 = 4 374 daN ; A = 2 500 daN → on garde A. ΣRT = 300 + 500 = 800 daN. <b>EMD = 2 500 − 800 = 1 700 daN</b>.</p></div>`,
      retenir: ['Treuil : EMD = FT mini, sauf si l’adhérence est plus faible (EMD = A).', 'Bêches d’ancrage : A = P × fa + FT.', 'Crochet : EMD = min(Fj ; A) − ΣR tracteur, Fj = 270 × Pm / v.', 'Un seul pont moteur : A = 2/3 P × fa.'],
      pieges: ['Prendre la valeur MINI du treuil (câble enroulé), pas la maxi.', 'Au crochet, ne pas oublier de retirer les résistances du tracteur lui-même.'],
      memo: { cle: 'LE PLUS FAIBLE COMMANDE', flow: ['Force du treuil (mini) ou force à la jante', 'Comparer à l’adhérence A = P × fa', 'On garde la plus petite', 'Crochet : − résistances du tracteur', '= EMD'], points: ['Fj = 270 × Pm / v', '1 pont moteur : A = 2/3 P × fa', 'Bêche : A = P × fa + FT'], astuce: 'Un treuil surpuissant sur un tracteur qui patine ne sert à rien : l’adhérence limite.' }
    },
    {
      id: 'brins', title: '3-4 · N — Nombre de brins, puis S — Schéma',
      html: `
<h3>Formule et règles</h3>
<p><span class="formula">Nb = ΣR / EMD</span></p>
<ul><li><b>1ʳᵉ règle</b> : on arrondit à l’entier supérieur (sauf résultat rond).</li>
<li><b>2ᵉ règle</b> : si Nb &lt; 4 → <b>+1 brin</b> ; si Nb ≥ 4 → <b>+2 brins</b>.</li></ul>
<div class="tw"><table><tr><th>ΣR / EMD</th><th>Calcul</th><th>1ʳᵉ règle</th><th>2ᵉ règle</th><th>Final</th></tr>
<tr><td>9 500 / 4 000</td><td>2,37</td><td>3</td><td>3 &lt; 4 → +1</td><td><b>4</b></td></tr>
<tr><td>10 400 / 2 000</td><td>5,2</td><td>6</td><td>6 ≥ 4 → +2</td><td><b>8</b></td></tr>
<tr><td>10 000 / 5 000</td><td>2</td><td>2 (rond)</td><td>2 &lt; 4 → +1</td><td><b>3</b></td></tr></table></div>
<h3>Schémas</h3>
<ul><li><b>Mouflage simple</b> : un seul câble. <b>Maximum 5 brins</b> en liaison directe avec le fardeau ; au-delà, les pertes par frottement dans les poulies imposent un mouflage composé.</li>
<li><b>Mouflage composé</b> : plus d’un câble ; on <b>multiplie</b> le nombre de brins des mouflages : 6 = 3 × 2 ; 9 = 3 × 3 ; 20 = 5 × 2 × 2. Un mouflage à <b>7 brins est donc impossible</b> (7 &gt; 5 et ne se décompose pas).</li>
<li><b>Traction droite</b> : le fardeau se déplace dans le même sens que le tracteur. <b>Traction renversée</b> : sens opposé, avec un brin de manœuvre.</li>
<li><b>Le brin de manœuvre ne compte pas</b> dans le nombre de brins final.</li></ul>
<h3>Nom des brins</h3>
<ul><li><b>Dormant</b> : fixé au point fixe (ne bouge pas).</li>
<li><b>Courant</b> : passe dans les poulies.</li>
<li><b>Garant</b> : relié au tracteur ou au treuil (il supporte l’EMD).</li>
<li><b>Brin de manœuvre</b> : en traction renversée, entre la poulie de renvoi et le tracteur.</li></ul>`,
      images: [{ src: 'mdf-noms-brins.png', cap: 'Noms des brins : dormant (rouge), courant (vert), garant (bleu), brin de manœuvre (violet)' }],
      retenir: ['Nb = ΣR / EMD → arrondi supérieur → +1 si < 4, +2 si ≥ 4.', 'Simple : 5 brins maxi. Composé : on multiplie (3 × 2 = 6).', 'Le brin de manœuvre ne compte pas.'],
      pieges: ['L’ancienne fiche mémoire donnait 6 brins pour 10 400 / 2 000 : avec la 2ᵉ règle, c’est 8.', 'Résultat rond (ex. 2) : pas d’arrondi, mais la 2ᵉ règle s’applique quand même.'],
      memo: { cle: 'ARRONDIR PUIS +1 (< 4) OU +2 (≥ 4)', flow: ['ΣR ÷ EMD', 'Arrondi supérieur', '< 4 → +1 · ≥ 4 → +2', 'Choisir le schéma (simple ≤ 5, sinon composé)'], points: ['10 400 / 2 000 → 8 brins', 'Composé : 3 × 2 = 6 · 3 × 3 = 9', '7 brins : impossible'], astuce: 'Dormant dort au point fixe, garant va au tracteur, courant court dans les poulies.' }
    },
    {
      id: 'emt', title: '5-6 · E — Effort moteur total (EMT), puis S — Sécurité',
      html: `
<p>Les mouflages multiplient l’EMD pour obtenir un <b>EMT supérieur à ΣR</b>. Chaque passage dans une poulie fait perdre <b>10 %</b> (on multiplie par 0,9). L’EMT est la <b>somme des efforts de tous les brins actifs</b> appliqués au fardeau.</p>
<ul><li><b>Mouflage simple</b> (EMD 1 000 daN) : 1 000 + 900 + 810 = <b>2 710 daN</b>.</li>
<li><b>Mouflage composé</b> : la résultante du 1ᵉʳ mouflage (1 000 + 900 = 1 900) devient le garant du second : 1 900 + 1 710 + 1 539 = <b>5 149 daN</b>.</li>
<li><b>Traction renversée</b> : 900 + 810 + 729 = <b>2 439 daN</b> — on ne bénéficie pas de la force du brin de manœuvre : à éviter autant que possible.</li>
<li><b>Frottement des brins en sommet de pente</b> (fardeau dans un trou) : <b>retirer 10 % à l’EMT</b> (5 149 × 0,9 = 4 634 daN).</li></ul>
<h3>Sécurité</h3>
<p><span class="formula">S % = (EMT − ΣR) / ΣR × 100</span>, qui doit être comprise <b>entre 15 et 70 %</b>.</p>
<ul><li>S &lt; 15 % → <b>ajouter 1 brin</b>.</li>
<li>S &gt; 70 % → <b>enlever 1 brin</b>.</li>
<li>Si le nombre de brins change, on reprend la méthode à l’étape du schéma.</li></ul>
<div class="box explic"><b>+ Exemples</b><ul><li>ΣR = 9 330, EMT = 16 260 → S ≈ 74 % → trop : enlever 1 brin.</li><li>ΣR = 15 623, EMT = 16 240 → S ≈ 4 % → insuffisant : ajouter 1 brin.</li></ul></div>`,
      images: [{ src: 'mdf-emt-simple.png', cap: 'Mouflage simple : EMT = 1 000 + 900 + 810 = 2 710 daN' }, { src: 'mdf-emt-compose.png', cap: 'Mouflage composé : EMT = 1 900 + 1 710 + 1 539 = 5 149 daN' }],
      retenir: ['−10 % par poulie (× 0,9).', 'EMT = somme des brins actifs sur le fardeau.', 'Sécurité entre 15 et 70 % ; < 15 → +1 brin ; > 70 → −1 brin.', 'Sommet de pente : EMT − 10 %.'],
      pieges: ['Traction renversée : le brin de manœuvre n’apporte rien à l’EMT.', 'Le cours écrit 6,4 % pour le premier exemple : le vrai calcul donne ≈ 4 %. La conclusion reste la même (+1 brin).'],
      memo: { cle: '× 0,9 À CHAQUE POULIE', flow: ['EMD sur le garant', '× 0,9 par poulie', 'Somme des brins actifs = EMT', 'S % = (EMT − ΣR) / ΣR', '15 % ≤ S ≤ 70 %'], points: ['1 000 + 900 + 810 = 2 710', 'Composé : 5 149', 'Renversé : 2 439'], astuce: 'Sécurité « 15–70 » : ni trop juste, ni gaspillage de brins.' }
    },
    {
      id: 'points-fixes', title: '7-8 · R — Résistance des points fixes et agrès, puis D — Distances',
      html: `
<h3>Résistance des points fixes (RPF)</h3>
<p>Un point fixe doit résister à la <b>somme des efforts qui passent par lui</b>. Ex. : 900 + 810 = 1 710 daN → chevalet + 4 piquets, poulie et manille résistant à 1 710 daN.</p>
<div class="tw"><table><tr><th>Lot Holmès (3 chevalets, 10 piquets)</th><th>Mini</th><th>Maxi</th></tr>
<tr><td>1 chevalet</td><td>2 000 daN</td><td>4 000 daN</td></tr>
<tr><td>2 chevalets</td><td>4 000 daN</td><td>8 000 daN</td></tr>
<tr><td>3 chevalets</td><td>8 000 daN</td><td>15 000 daN</td></tr>
<tr><td>2 lots Holmès en V (élingue de répartition + poulie d’équilibrage)</td><td colspan="2">15 000 à 30 000 daN</td></tr></table></div>
<ul><li>Roue de secours + 5 piquets = 5 000 daN ; + 8 piquets = 8 000 daN.</li>
<li>4 piquets en ligne (pour cordage) = 4 000 daN.</li>
<li>Mini ou maxi selon la nature du sol. Autres points fixes : doc GEN 701.</li></ul>
<h3>Arbres (points fixes naturels)</h3>
<p><span class="formula">Ra = Cm × d²</span> (Cm en daN/dm², d = diamètre <b>en décimètres</b>).</p>
<div class="tw"><table><tr><th>Essence</th><td>Chêne</td><td>Hêtre</td><td>Châtaignier</td><td>Sapin, bouleau, platane</td></tr>
<tr><th>Cm (daN/dm²)</th><td>500</td><td>400</td><td>300</td><td>200</td></tr></table></div>
<p>Exemple : châtaignier de 60 cm = 6 dm → 300 × 36 = <b>10 800 daN</b>. Avec un arbre : le protéger, se fixer <b>au plus près du sol</b>, tenir compte du sol.</p>
<h3>CMU des câbles et agrès</h3>
<p>La <b>CMU</b> doit être ≥ à la plus grande force exercée : pour un point fixe, les efforts qui lui sont appliqués ; pour un agrès souple, le <b>brin le plus chargé</b>.</p>
<h3>Distances</h3>
<p>Ls = longueur de sécurité (sur le tambour + sur le châssis) · Lg = longueur du garant (≈ 5 m) · Lbm = brin de manœuvre (≈ 5 m) · Lc = longueur de câble.</p>
<div class="tw"><table><tr><th>Cas</th><th>Distance du point fixe (DPF)</th></tr>
<tr><td>Simple, au crochet</td><td>(Lc − Lg) / (Nb − 1)</td></tr>
<tr><td>Simple, au treuil</td><td>(Lc − Ls) / Nb</td></tr>
<tr><td>Composé, au crochet</td><td>DPF1 = (Lc1 − Lg1) / (Nb1 − 1) ; DPF2 = (Lc2 − Lg2) / (Nb2 − 1) + Lg1</td></tr>
<tr><td>Composé, au treuil</td><td>DPF1 = (Lc1 − Lg1) / (Nb1 − 1) ; DPF2 = (Lc2 − Ls) / Nb2 + Lg1</td></tr></table></div>
<ul><li><b>Déplacement du tracteur</b> (crochet) : simple DT = DPF − Lg + Lc ; composé DT = DPF2 − (Lg1 + Lg2) + Lc2 ; renversée DT = Lc − brin de manœuvre.</li>
<li><b>Déplacement du fardeau</b> : au crochet D = DT / Nb total ; au treuil D = (Lc − Ls) / Nb total.</li></ul>`,
      retenir: ['Un point fixe résiste à la somme des efforts qui passent par lui.', 'Holmès : 1 chevalet 2 000–4 000 · 2 : 4 000–8 000 · 3 : 8 000–15 000 daN.', 'Arbre : Cm × d² (d en dm) ; chêne 500, hêtre 400, châtaignier 300, résineux 200.', 'Le fardeau avance Nb fois moins que le tracteur.'],
      pieges: ['Le diamètre de l’arbre s’exprime en DÉCIMÈTRES (l’ancienne fiche disait mètres).', 'Au crochet on divise par Nb − 1 ; au treuil par Nb.'],
      memo: { cle: 'ARBRE = Cm × d² (en dm)', points: ['Chêne 500 · hêtre 400 · châtaignier 300 · sapin 200', 'Holmès : 1 chevalet = 2 000 à 4 000 daN', 'CMU ≥ brin le plus chargé', 'D fardeau = DT / Nb'], astuce: 'Plus il y a de brins, plus c’est fort… et plus le fardeau avance lentement.' }
    },
    {
      id: 'commandements', title: '9 · Exécution : commandements, nœuds, manilles, lexique',
      html: `
<h3>À la voix</h3>
<p>Un commandement <b>préparatoire</b> puis un commandement <b>d’exécution</b>. Plusieurs commandements successifs sont précédés d’un seul signal de prise de commandement, et la fin est indiquée par un signal de fin de commandement. Tout le personnel, surtout les conducteurs, doit connaître les gestes.</p>
<ul><li><b>Manœuvre à bras</b> : « À BRAS » (préparatoire) → « FERME » (exécution).</li>
<li><b>Au treuil — préparation</b> : « À vos postes » · « Tendez les mouflages » (moteur au ralenti, le conducteur regarde le chef) · « Appliquez-vous » · « Attention ».</li>
<li><b>Au treuil — exécution</b> : « Ferme » (répété pour soutenir l’effort) · « Au treuil » (le conducteur embraye) · « Halte » (il débraye).</li>
<li><b>Indications</b> : « Laissez aller » / « Donnez du mou » (vitesse inverse, diminution progressive de l’effort) · « Déséquipez le mouflage » (démonté, rangé, inventorié).</li></ul>
<h3>Au sifflet</h3>
<div class="tw"><table><tr><th>Ordre</th><th>Signal</th></tr>
<tr><td>Prise de commandement</td><td>1 signal long</td></tr>
<tr><td>Faire effort</td><td>1 bref + 1 long</td></tr>
<tr><td>Donner du mou</td><td>Plusieurs signaux longs</td></tr>
<tr><td>Arrêt express</td><td>1 signal bref</td></tr>
<tr><td>Fin de commandement</td><td>3 signaux brefs</td></tr></table></div>
<h3>Au geste (treuil)</h3>
<ul><li><b>Prise de commandement / attention</b> : 1 bras tendu vers le haut, immobile.</li>
<li><b>Faire effort</b> : 1 bras à demi tendu vers le haut, l’avant-bras tourne au-dessus des épaules.</li>
<li><b>Donner du mou</b> : bras tendu vers le bas, paume vers le bas, abaisser le bras.</li>
<li><b>Arrêt express</b> : les 2 bras levés à l’horizontale.</li>
<li><b>Fin de commandement</b> : bras en croix devant la poitrine (l’opérateur n’est plus aux ordres).</li></ul>
<p>Avec des <b>véhicules en déplacement</b>, celui qui commande se place <b>devant le véhicule</b>, toujours visible du conducteur. En levage, le conducteur signale qu’il est prêt (avertisseur, phares ou sifflet). Haut-parleurs et klaxons ne permettent pas la réponse de l’exécutant : prévoir un signal de réception et doubler les moyens.</p>
<h3>Nœuds</h3>
<ul><li><b>Nœud de jambe de chien</b> : isoler une partie de cordage en mauvais état.</li>
<li><b>Nœud droit</b> : réunir deux cordages de même diamètre. <b>Nœud droit gansé</b> : pareil, mais se défait plus facilement.</li>
<li>Autres : boucle, ganse, nœud allemand, nœud simple, jonction par nœuds simples.</li></ul>
<h3>Manilles (réglementation 2020)</h3>
<ul><li>Marquage imposé (norme <b>NF EN 13889</b>) : CMU en tonnes, classe « 6 », fabricant, code de traçabilité, marquage CE.</li>
<li>Manilles non destinées au levage : plaque « <b>NE PAS UTILISER POUR LE LEVAGE</b> » ; contrôle visuel lors des visites techniques annuelles par un spécialiste BSTAT, reporté au MAT 1004.</li>
<li>Manilles de levage : vérifications à la mise en service et lors des vérifications générales périodiques ; suivies au MAT 1017 levage.</li></ul>
<h3>Lexique anglais</h3>
<p>Available motive force = EMD · Total motive force = EMT · Total resistance = ΣR · Dead end / fixed point = point fixe · Pulley = poulie · Pulley-block = mouflage · Pulley-frame = chevalet · Stick = piquet · Shackle = manille · Reverse traction = traction renversée · Rolling resistance = résistance au roulement · Rim pull = effort à la jante · Wedge = cale.</p>`,
      images: [{ src: 'mdf-sifflet.png', cap: 'Commandements au sifflet' }, { src: 'mdf-gestes-treuil.jpg', cap: 'Commandements au geste pour les manœuvres au treuil' }, { src: 'mdf-noeuds.jpg', cap: 'Les nœuds : boucle, ganse, nœud allemand, nœud simple, jambe de chien, nœud droit, nœud droit gansé' }],
      retenir: ['Sifflet : 1 long = prise ; 1 bref = arrêt express ; 3 brefs = fin.', 'Arrêt express au geste = 2 bras à l’horizontale.', '« Au treuil » = embraye ; « Halte » = débraye.', 'Nœud de jambe de chien = isoler une partie abîmée.'],
      pieges: ['Ne pas confondre arrêt express (1 bref) et fin de commandement (3 brefs).'],
      memo: { cle: 'LONG = JE PRENDS · BREF = STOP · 3 BREFS = FINI', points: ['Faire effort : bref + long', 'Donner du mou : plusieurs longs', 'Geste arrêt : 2 bras horizontaux', 'Fin : bras en croix'], astuce: 'Un coup bref comme un coup de frein ; trois coups brefs, on range le matériel.' }
    }
  ],
  questions: [
    { l: 'cadres', q: 'Densité de référence d’un obstacle métallique (ex. conteneur couché) ?', c: ['8 t/m³', '1 t/m³', '2,5 t/m³', '0,8 t/m³'], e: 'Densités du cours : bois 1 t/m³, roche 2,5 t/m³, métal 8 t/m³.', src: 'Test final Q59 (officiel) + cours A GB 08' },
    { l: 'cadres', q: 'Densité à retenir pour un tronc d’arbre (bois) ?', c: ['1 t/m³', '2,5 t/m³', '8 t/m³', '0,5 t/m³'], e: 'Bois 1 t/m³ ; roche 2,5 t/m³ ; métal 8 t/m³.' },
    { l: 'cadres', q: 'Qui est responsable de la manœuvre de force et détermine le périmètre de sécurité ?', c: ['Le directeur de manœuvre (officier)', 'Le chef de manœuvre (sous-officier)', 'Le chef d’équipe', 'Le conducteur du tracteur'], e: 'Le directeur surveille la manœuvre, en est responsable et fixe le périmètre réservé aux intervenants ; il donne ses ordres par l’intermédiaire du chef de manœuvre.' },
    { l: 'cadres', q: 'Qui prépare et exécute la manœuvre (reconnaissance, calculs, consignes) ?', c: ['Le chef de manœuvre (sous-officier)', 'Le directeur de manœuvre', 'Le conducteur', 'Le chef de corps'], e: 'Le chef de manœuvre prépare (terrain, matériel, CMU, calculs, schéma, consignes) et exécute la manœuvre.' },
    { l: 'cadres', q: 'Avant de lancer la manœuvre, le chef de manœuvre met le dispositif en légère tension. Pourquoi ?', c: ['Pour un dernier contrôle de sécurité des agrès', 'Pour gagner du temps', 'Pour tester la force du treuil', 'Pour mesurer le poids du fardeau'], e: 'La légère tension permet de vérifier que tout le dispositif est bien en place avant l’effort.' },
    { l: 'cadres', q: 'Au maximum, combien de personnes peuvent frapper sur le même piquet ?', c: ['3', '1', '2', '5'], e: 'Consigne de sécurité : ne pas frapper à plus de trois sur le même piquet.' },
    { l: 'cadres', q: 'Laquelle de ces pratiques est INTERDITE ?', c: ['Retenir une cale avec le pied', 'Utiliser une cale emmanchée par le côté', 'Porter des gants épais', 'Se tenir hors du prolongement des câbles'], e: 'On ne retient jamais une cale avec le pied ou la main : on se tient sur le côté avec une cale emmanchée.' },
    { l: 'resistances', q: 'Que signifie le premier « S » de la méthode SENSESRD ?', c: ['Somme des résistances du fardeau', 'Sécurité', 'Schéma', 'Sens de traction'], e: 'S = Somme des résistances, E = EMD, N = Nombre de brins, S = Schéma, E = EMT, S = Sécurité, R = Résistance des points fixes, D = Distances.' },
    { l: 'resistances', q: 'Résistance au roulement d’un fardeau de 4 000 daN avec fr = 0,3 ?', c: ['1 200 daN', '13 333 daN', '4 300 daN', '120 daN'], e: 'Rr = P × fr = 4 000 × 0,3 = 1 200 daN.', src: 'Test final Q54 (officiel)' },
    { l: 'resistances', q: 'Fardeau roulant de 9 600 daN sur terrain humide (fr = 0,15), sol horizontal. ΣR ?', c: ['1 440 daN', '960 daN', '3 840 daN', '14 400 daN'], e: 'R = P × fr = 9 600 × 0,15 = 1 440 daN.' },
    { l: 'resistances', q: 'Fardeau roulant de 4 000 daN, sol meuble (fr 0,3), montée à 25 %. ΣR ?', c: ['2 200 daN', '1 200 daN', '1 000 daN', '3 760 daN'], e: 'Pente ≤ 50 % : Rp = 4 000 × 0,25 = 1 000 ; Rr = 1 200 ; ΣR = 2 200 daN.' },
    { l: 'resistances', q: 'Pente de 84 % : comment calcule-t-on la résistance à la pente ?', c: ['Rp = P × sinus correspondant (0,64)', 'Rp = P × 0,84', 'R = P', 'Rp = 2/3 P'], e: 'Entre 50 et 100 % on utilise le sinus : 84 % ↔ 40° ↔ sin 0,64. Au-dessus de 100 %, R = P.', w: 'Ne pas multiplier par le pourcentage au-dessus de 50 %.' },
    { l: 'resistances', q: 'Fardeau roulant de 4 000 daN, sol meuble (fr 0,3), montée à 84 % (sin 0,64). ΣR ?', c: ['3 760 daN', '4 560 daN', '2 560 daN', '4 000 daN'], e: 'Rr = 1 200 ; Rp = 4 000 × 0,64 = 2 560 ; ΣR = 3 760 daN.' },
    { l: 'resistances', q: 'Au-delà de 100 % de pente, que vaut la résistance ?', c: ['R = P (le poids du fardeau)', 'R = 2 P', 'R = P × 1,00 + Rr', 'R = 2/3 P'], e: 'Règle du cours : pente > 100 % → R = P.' },
    { l: 'resistances', q: 'Fardeau à retourner sur sol plat, 3,5 t. ΣR ?', c: ['2 333 daN', '1 400 daN', '3 500 daN', '7 000 daN'], e: 'Retournement : R = 2/3 × P = 2/3 × 3 500 ≈ 2 333 daN.', src: 'Test final Q55 (officiel) + cours A GB 08' },
    { l: 'resistances', q: 'Fardeau de 4 000 daN enlisé jusqu’aux essieux. ΣR ?', c: ['8 000 daN', '4 000 daN', '2 667 daN', '12 000 daN'], e: 'La boue fait ventouse : R = 2 × P = 8 000 daN.' },
    { l: 'resistances', q: 'Coefficient de roulement (fr) sur route sèche / chemin dur ?', c: ['0,06', '0,5', '0,15', '0,3'], e: 'Route sèche : fa = 0,5 et fr = 0,06. Terrain meuble : fr = 0,3.' },
    { l: 'resistances', q: 'Coefficient d’adhérence (fa) en boue profonde ?', c: ['0,3', '0,7', '0,5', '0,06'], e: 'Boue profonde : fa = 0,3 et fr = 0,5.' },
    { l: 'resistances', q: 'Fardeau roulant de 4 000 daN en DESCENTE à 84 %, fr 0,3. Que faut-il prévoir ?', c: ['Un effort de retenue de 1 360 daN', 'Un effort de traction de 3 760 daN', 'Aucun effort', 'Un effort de retenue de 4 000 daN'], e: 'En descente on retranche la pente : 1 200 − 2 560 = −1 360 daN → il faut retenir le fardeau avec 1 360 daN.' },
    { l: 'emd', q: 'Traction au treuil : quelle force du treuil prend-on en compte ?', c: ['La valeur mini constructeur (câble enroulé)', 'La valeur maxi (câble déroulé)', 'La moyenne des deux', 'La charge de rupture du câble'], e: 'On prend la valeur mini, la plus défavorable, en gardant la longueur de sécurité sur le tambour.' },
    { l: 'emd', q: 'Tracteur 4 100 daN, FT = 2 250 daN, boue profonde fa = 0,3, sans bêche. EMD ?', c: ['1 230 daN', '2 250 daN', '3 480 daN', '4 100 daN'], e: 'A = 4 100 × 0,3 = 1 230 daN < FT : la force du treuil est limitée par l’adhérence, EMD = A.', src: 'Test final Q57 (officiel) + cours A GB 08' },
    { l: 'emd', q: 'Même tracteur (4 100 daN, FT 2 250, fa 0,3) avec bêche d’ancrage. EMD ?', c: ['2 250 daN', '1 230 daN', '3 480 daN', '5 730 daN'], e: 'Avec bêche : A = 1 230 + 2 250 = 3 480 daN > FT → EMD = FT = 2 250 daN.' },
    { l: 'emd', q: 'Formule de la force à la jante ?', c: ['Fj = 270 × Pm / v', 'Fj = Pm × v / 270', 'Fj = P × fa', 'Fj = 736 × Pm / v'], e: 'Fj (daN) = 270 × Pm (kW) / v (km/h), v ≈ 5 km/h au plus petit rapport.' },
    { l: 'emd', q: 'Véhicule avec UN SEUL pont moteur : formule de l’adhérence ?', c: ['A = 2/3 P × fa', 'A = P × fa', 'A = 2 P × fa', 'A = P × fr'], e: 'Tous ponts moteurs : A = P × fa. Un seul pont : seule une partie du poids est sur les roues motrices → 2/3 P × fa.' },
    { l: 'emd', q: 'PL 5 000 daN, 81 kW, 5 km/h, route sèche (fr 0,06 ; fa 0,5), pente 10 %, 2 ponts moteurs. EMD au crochet ?', c: ['1 700 daN', '2 500 daN', '4 374 daN', '3 574 daN'], e: 'Fj = 4 374 ; A = 2 500 → on garde A. ΣRT = 300 + 500 = 800. EMD = 2 500 − 800 = 1 700 daN.', w: 'On prend la plus petite de Fj et A, puis on retire les résistances du tracteur.' },
    { l: 'brins', q: 'Σ des résistances = 10 400 daN, EMD = 2 000 daN. Nombre de brins final ?', c: ['8', '6', '5', '7'], e: '10 400 / 2 000 = 5,2 → 1ʳᵉ règle : 6 → 2ᵉ règle : 6 ≥ 4 donc +2 → 8 brins.', src: 'Test final Q58 (officiel) + cours A GB 08' },
    { l: 'brins', q: 'ΣR = 9 500 daN, EMD = 4 000 daN. Nombre de brins final ?', c: ['4', '3', '5', '2'], e: '2,37 → 3 (arrondi) → 3 < 4 donc +1 → 4 brins.' },
    { l: 'brins', q: 'ΣR = 10 000 daN, EMD = 5 000 daN. Nombre de brins final ?', c: ['3', '2', '4', '5'], e: 'Résultat rond (2) : pas d’arrondi. 2 < 4 donc +1 → 3 brins.' },
    { l: 'brins', q: 'Deuxième règle du nombre de brins ?', c: ['Moins de 4 : +1 brin ; 4 ou plus : +2 brins', 'Toujours +1 brin', 'Moins de 4 : +2 ; 4 ou plus : +1', 'On arrondit à l’entier inférieur'], e: '1ʳᵉ règle : arrondi supérieur. 2ᵉ règle : +1 si < 4, +2 si ≥ 4.' },
    { l: 'brins', q: 'Nombre maximum de brins en mouflage SIMPLE (liaison directe avec le fardeau) ?', c: ['5', '3', '7', '10'], e: 'Au-delà de 5, les pertes par frottement dans les poulies imposent un mouflage composé.' },
    { l: 'brins', q: 'Un mouflage à 7 brins est-il possible ?', c: ['Non', 'Oui', 'Oui, avec une poulie de renvoi', 'Uniquement en traction renversée'], e: 'Simple : 5 brins maxi. Composé : on multiplie les mouflages (6 = 3 × 2, 9 = 3 × 3). 7 ne se décompose pas.', src: 'Test final Q56 (officiel)' },
    { l: 'brins', q: 'Mouflage composé d’un mouflage à 3 brins et d’un mouflage à 2 brins : nombre de brins ?', c: ['6', '5', '3', '9'], e: 'En mouflage composé on multiplie : 3 × 2 = 6.' },
    { l: 'brins', q: 'En traction renversée, le brin de manœuvre compte-t-il dans le nombre de brins ?', c: ['Non', 'Oui', 'Oui, pour moitié', 'Seulement en pente'], e: 'Le brin de manœuvre ne rentre pas dans la comptabilité du nombre de brins final.', src: 'Test final Q51 (officiel)' },
    { l: 'brins', q: 'Quel brin est relié au tracteur (ou au treuil) et supporte l’EMD ?', c: ['Le garant', 'Le dormant', 'Le courant', 'Le brin de manœuvre'], e: 'Dormant = fixé au point fixe ; courant = dans les poulies ; garant = vers le tracteur.', img: 'mdf-noms-brins.png' },
    { l: 'emt', q: 'Perte par frottement à chaque passage dans une poulie ?', c: ['10 %', '5 %', '20 %', '1 %'], e: 'On multiplie par 0,9 à chaque poulie.' },
    { l: 'emt', q: 'Mouflage simple, EMD 1 000 daN, 3 brins actifs. EMT ?', c: ['2 710 daN', '3 000 daN', '2 439 daN', '2 700 daN'], e: '1 000 + 900 + 810 = 2 710 daN.', img: 'mdf-emt-simple.png' },
    { l: 'emt', q: 'Pourquoi éviter autant que possible la traction renversée ?', c: ['On ne bénéficie pas de la force du brin de manœuvre', 'Elle est interdite', 'Elle demande deux tracteurs', 'Elle double les pertes'], e: 'Traction renversée : EMT = 900 + 810 + 729 = 2 439 daN au lieu de 2 710.' },
    { l: 'emt', q: 'Fardeau dans un trou, frottement des brins en sommet de pente : que faire ?', c: ['Enlever 10 % à l’EMT', 'Ajouter 10 % à l’EMT', 'Enlever 50 % à l’EMT', 'Ne rien changer'], e: 'Ex. : 5 149 × 0,9 = 4 634 daN.', src: 'Test final Q60 (officiel)' },
    { l: 'emt', q: 'Entre quelles valeurs doit être le coefficient de sécurité ?', c: ['15 et 70 %', '10 et 50 %', '20 et 100 %', '5 et 15 %'], e: 'S % = (EMT − ΣR) / ΣR × 100 ; 15 % ≤ S ≤ 70 %.' },
    { l: 'emt', q: 'La sécurité peut-elle être de 15 % ?', c: ['Oui', 'Non', 'Seulement en traction directe', 'Seulement au-dessus de 10 t'], e: '15 % est la borne basse, incluse : 15 % ≤ S ≤ 70 %.', src: 'Test final Q52 (officiel)' },
    { l: 'emt', q: 'ΣR = 9 330 daN, EMT = 16 260 daN (S ≈ 74 %). Que faire ?', c: ['Enlever un brin', 'Ajouter un brin', 'Rien, c’est bon', 'Changer de tracteur'], e: 'S > 70 % → on enlève un brin, puis on reprend à l’étape du schéma.' },
    { l: 'emt', q: 'La sécurité calculée est de 4 %. Que faire ?', c: ['Ajouter un brin', 'Enlever un brin', 'Rien', 'Augmenter la vitesse'], e: 'S < 15 % → ajouter un brin et reprendre la méthode à l’étape du schéma.' },
    { l: 'points-fixes', q: 'Résistance d’un chêne de 40 cm de diamètre ?', c: ['8 000 daN', '20 000 daN', '800 daN', '4 000 daN'], e: 'Ra = Cm × d² avec d en dm : 500 × 4² = 8 000 daN.' },
    { l: 'points-fixes', q: 'Résistance d’un châtaignier de 60 cm ?', c: ['10 800 daN', '18 000 daN', '1 800 daN', '108 000 daN'], e: '60 cm = 6 dm → 300 × 36 = 10 800 daN.' },
    { l: 'points-fixes', q: 'Pour la résistance d’un arbre, le diamètre s’exprime en :', c: ['Décimètres', 'Mètres', 'Centimètres', 'Millimètres'], e: 'Ra = Cm (daN/dm²) × d² (dm²).', w: 'L’ancienne fiche mémoire disait « mètre ».', src: 'Test final Q53 (officiel)' },
    { l: 'points-fixes', q: 'Coefficient de matière d’un sapin ?', c: ['200 daN/dm²', '500 daN/dm²', '400 daN/dm²', '300 daN/dm²'], e: 'Chêne 500 · hêtre 400 · châtaignier 300 · sapin, bouleau, platane 200.' },
    { l: 'points-fixes', q: 'Résistance d’un point fixe Holmès à 1 chevalet ?', c: ['2 000 à 4 000 daN', '4 000 à 8 000 daN', '8 000 à 15 000 daN', '500 à 1 000 daN'], e: '1 chevalet : 2 000–4 000 ; 2 : 4 000–8 000 ; 3 : 8 000–15 000 daN selon le sol.' },
    { l: 'points-fixes', q: 'Un point fixe doit résister à…', c: ['La somme des efforts qui passent par lui', 'L’EMD seul', 'Le poids du fardeau', 'La moitié de l’EMT'], e: 'Ex. : 900 + 810 = 1 710 daN → chevalet, poulie et manille résistant à 1 710 daN.' },
    { l: 'points-fixes', q: 'Pour un agrès souple, la CMU doit être supérieure ou égale à…', c: ['La force du brin le plus chargé', 'L’EMT', 'Le poids du fardeau', 'La force moyenne des brins'], e: 'La CMU du câble doit être ≥ à la plus grande force exercée sur lui.' },
    { l: 'points-fixes', q: 'Mouflage simple, force au TREUIL : distance du point fixe ?', c: ['(Lc − Ls) / Nb', '(Lc − Lg) / (Nb − 1)', 'Lc / Nb', 'DPF − Lg + Lc'], e: 'Au treuil, on retire la longueur de sécurité et on divise par Nb. Au crochet : (Lc − Lg) / (Nb − 1).' },
    { l: 'points-fixes', q: 'Traction au crochet : comment calcule-t-on le déplacement du fardeau ?', c: ['D = DT / Nb total', 'D = DT × Nb', 'D = Lc − Ls', 'D = DPF − Lg'], e: 'Le fardeau avance Nb fois moins que le tracteur.' },
    { l: 'commandements', q: 'Au sifflet, que signifie 1 signal bref ?', c: ['Arrêt express', 'Prise de commandement', 'Fin de commandement', 'Faire effort'], e: '1 long = prise ; 1 bref + 1 long = faire effort ; plusieurs longs = donner du mou ; 1 bref = arrêt express ; 3 brefs = fin.' },
    { l: 'commandements', q: 'Au sifflet, fin de commandement :', c: ['3 signaux brefs', '1 signal long', '1 signal bref', 'Plusieurs signaux longs'], e: '3 brefs = fin de commandement.', img: 'mdf-sifflet.png' },
    { l: 'commandements', q: 'Au geste, « arrêt express » :', c: ['Les deux bras levés à l’horizontale', 'Un bras tendu vers le haut, immobile', 'Les bras en croix devant la poitrine', 'Un bras qui tourne au-dessus des épaules'], e: 'Bras en croix devant la poitrine = fin de commandement ; bras vers le haut immobile = prise de commandement.' },
    { l: 'commandements', q: 'Manœuvre à bras : commandements préparatoire et d’exécution ?', c: ['« À BRAS » puis « FERME »', '« ATTENTION » puis « HALTE »', '« AU TREUIL » puis « FERME »', '« À VOS POSTES » puis « AU TREUIL »'], e: 'Le commandement de base des manœuvres à bras est « À BRAS » (préparatoire), « FERME » (exécution).' },
    { l: 'commandements', q: 'Au commandement « Au treuil », que fait le conducteur ?', c: ['Il embraye le treuil', 'Il débraye', 'Il donne du mou', 'Il coupe le moteur'], e: '« Au treuil » = embraye ; « Halte » = débraye ; « Laissez aller » = vitesse inverse.' },
    { l: 'commandements', q: 'Manœuvre avec un véhicule en déplacement : où se place celui qui commande ?', c: ['Devant le véhicule, toujours visible du conducteur', 'Derrière le véhicule', 'Dans la cabine', 'Dans le prolongement du câble'], e: 'Il doit toujours être visible de l’opérateur.' },
    { l: 'commandements', q: 'À quoi sert le nœud de jambe de chien ?', c: ['Isoler une partie de cordage en mauvais état', 'Réunir deux cordages de même diamètre', 'Faire une boucle de levage', 'Fixer un cordage à un piquet'], e: 'Le nœud droit réunit deux cordages de même diamètre ; le nœud droit gansé se défait plus facilement.' },
    { l: 'commandements', q: 'Selon la réglementation 2020, une manille non destinée au levage porte :', c: ['Une plaque « NE PAS UTILISER POUR LE LEVAGE »', 'Un marquage rouge', 'Aucun marquage', 'La mention LC'], e: 'Marquage selon NF EN 13889 : CMU en tonnes, classe 6, fabricant, traçabilité, CE.' },
    { l: 'commandements', q: 'Traduction de « shackle » ?', c: ['Manille', 'Poulie', 'Piquet', 'Chevalet'], e: 'Pulley = poulie ; stick = piquet ; pulley-frame = chevalet ; dead end = point fixe.' }
  ]
});
