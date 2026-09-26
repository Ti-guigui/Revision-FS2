/* « L’essentiel » de chaque fiche de révision complète (#/fiche/<matière>) et fiche spéciale UV2 (#/fiche/uv2).
   Le reste de chaque fiche (À retenir, pièges, schémas, symboles, exercices) est assemblé automatiquement depuis les leçons. */
REV.fiches = {
  elec: { html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Unités</th></tr>
<tr><td>Loi d’Ohm</td><td>U = R × I</td><td>V = Ω × A</td></tr>
<tr><td>Puissance</td><td>P = U × I = R × I² = U² / R</td><td>W</td></tr>
<tr><td>Quantité d’électricité</td><td>Q = I × t</td><td>Ah = A × h</td></tr>
<tr><td>Énergie</td><td>W = P × t</td><td>Wh</td></tr>
<tr><td>Résistivité</td><td>R = ρ × L / S</td><td>Ω · Ω.m · m · m² (1 mm² = 10⁻⁶ m²)</td></tr>
<tr><td>Série</td><td>R = R1 + R2 + … (même courant)</td><td></td></tr>
<tr><td>Parallèle (2 R)</td><td>R = R1 × R2 / (R1 + R2) (même tension)</td><td></td></tr>
<tr><td>Générateur réel</td><td>Ug = E − r × I</td><td></td></tr>
<tr><td>Alternatif</td><td>f = 1 / T · Ueff = Umax / √2</td><td>Hz · s</td></tr>
<tr><td>Triphasé</td><td>U (entre phases) = V (phase-neutre) × √3</td><td>√2 = 1,414 · √3 = 1,732</td></tr>
<tr><td>Transistor</td><td>Ic = β × Ib ; saturé : VCE ≈ 0</td><td></td></tr>
<tr><td>Logique</td><td>2ⁿ combinaisons pour n entrées</td><td></td></tr></table></div>
<h3>Batteries</h3>
<p>Série : tensions ajoutées, capacité = la plus faible. Parallèle : même tension, capacités ajoutées.</p>
<h3>Composants</h3>
<p>Diode : passante de l’anode vers la cathode (≈ 0,6 V). LED ≈ 2 V + résistance série. Zéner : en inverse garde VZ (stabilise). Pont de Graëtz = 4 diodes ; pont triphasé = 6 diodes. Transistor : bloqué = interrupteur ouvert ; saturé = interrupteur fermé. Diode de roue libre sur une bobine = protège le transistor. Alimentation stabilisée : transformateur → pont → condensateur → Zéner + ballast.</p>
<h3>Portes logiques vues en cours (6)</h3>
<p>OUI (S = A) · NON (S = Ā) · ET (S = A·B, « série ») · ET NON · OU (S = A + B, « parallèle ») · OU NON. De Morgan : (A·B)‾ = Ā + B̄ ; (A + B)‾ = Ā·B̄.</p>
<h3>Méthode de calcul (cahier d’exercices)</h3>
<ol><li>Flécher courants et tensions.</li><li>Réduire le montage en Réq (en partant du bout).</li><li>Ig = Ug / Réq.</li><li>Tensions par la loi d’Ohm et la loi des mailles ; courants par la loi des nœuds.</li><li>Vérifier (somme des courants, somme des tensions).</li></ol>` },

  equip: { html: `
<div class="tw"><table><tr><th>Point</th><th>Valeur / règle</th></tr>
<tr><td>Mesures</td><td>Voltmètre en parallèle · ampèremètre en série · ohmmètre hors tension · chute de tension circuit EN CHARGE</td></tr>
<tr><td>Batterie 12 V</td><td>6 éléments de 2 V · 12,6 V chargée · 12,2 V = 50 % · &lt; 12 V déchargée · charge à C/10 pendant 10 h</td></tr>
<tr><td>Test d’aptitude</td><td>3 × C pendant 15 s, 3 fois ; &gt; 9 V au 3ᵉ essai (12 V) · fuite &lt; 30 mA contact coupé</td></tr>
<tr><td>Démarreur</td><td>Moteur &lt; 1 Ω · appel (EXC ↔ +DEM) · maintien (EXC ↔ masse) ≈ 2 × appel · mini au démarrage 9,6 V (12 V) / 19,2 V (24 V)</td></tr>
<tr><td>Régulation</td><td>12 V : 13,5 à 15 V · 24 V : 28 à 29,5 V</td></tr>
<tr><td>Relais</td><td>85/86 = bobine (commande) · 30/87/87a = puissance · 87 = NO · 87a = NF</td></tr>
<tr><td>Bornes</td><td>KL30 = + permanent · KL15 = + après contact · KL31 = masse · KL50 = démarreur</td></tr>
<tr><td>CAN</td><td>2 × 120 Ω → 60 Ω mesurés · dominant 0 (H 3,5 V / L 1,5 V) · récessif 1 (2,5 / 2,5 V) · fils torsadés = perturbations</td></tr>
<tr><td>Sonde lambda</td><td>riche ≈ 900 mV · pauvre ≈ 100 mV · efficace à 300 °C</td></tr></table></div>
<h3>Alternateurs : 6, 9 ou 12 diodes</h3>
<div class="tw"><table><tr><th>Type</th><th>Reconnaître</th><th>À retenir</th></tr>
<tr><td>6 diodes</td><td>2 bornes (L et +), régulateur intégré</td><td>Pont de 6 diodes de puissance (2 par phase) ; excitation par le régulateur ; lampe HS = pas de conséquence sur la charge</td></tr>
<tr><td>9 diodes</td><td>1 seule borne L (D+)</td><td>6 diodes de puissance + 3 diodes trio (excitation, extinction du voyant) ; pré-excitation par la lampe : lampe HS = pas de charge</td></tr>
<tr><td>12 diodes</td><td>2 bornes, régulateur intégré</td><td>6 × 2 diodes de puissance en parallèle (2 par demi-phase) : pour les grosses puissances, plus de courant, moins d’échauffement par diode</td></tr></table></div>
<h3>Diagnostic</h3>
<p>Aucun des 3 signes du court-circuit → coupure. Une seule panne à la fois. La masse ne fait jamais partie de la zone de diagnostic. &gt; 1 V d’écart sur un même potentiel = ligne HS.</p>` },

  moteur: { html: `
<div class="tw"><table><tr><th>Point</th><th>À retenir</th></tr>
<tr><td>Rapport volumétrique</td><td>ρ = (Vu + v) / v · P = C × ω</td></tr>
<tr><td>Distribution</td><td>Arbre à cames = ½ vitesse du vilebrequin · balayage = chevauchement AOA / RFE · R = 720° / n</td></tr>
<tr><td>Graissage</td><td>2–4 bar essence · 4–8 bar diesel</td></tr>
<tr><td>Refroidissement</td><td>Pressuriser = élever le point d’ébullition · bouchon à 2 soupapes</td></tr>
<tr><td>Common rail</td><td>Débit injecté = temps d’ouverture + pression de rampe · injecteur électromagnétique ≈ 0,5 Ω · piézo ≈ 200 kΩ</td></tr>
<tr><td>Bosch 1ʳᵉ gén. (CP1)</td><td>Monter la HP = régulateur de haute pression (sur la pompe)</td></tr>
<tr><td>Delphi</td><td>Monter la HP = régulateur de débit (IMV) · faire chuter = impulsions courtes aux injecteurs (retours) · accéléromètre = recalage pré-injection</td></tr>
<tr><td>Capteurs</td><td>Régime = inductif (sinus) · phase = Hall (carré 5 V) · pression rail 0,5 V contact mis, 1–1,5 V au démarrage</td></tr>
<tr><td>Carburant</td><td>Cétane ≥ 51 (sinon cognements, démarrage difficile, fumées) · PE &lt; TLF &lt; PT</td></tr>
<tr><td>Dépollution</td><td>FAP : filtre et brûle les suies (≈ 550 °C) · EGR : NOx · catalyseur : NOx, HC, CO · SCR : 180 °C cata, 5 % couple, 40 °C moteur, 400 tr/min</td></tr></table></div>` },

  hydro: { html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule (unités atelier)</th></tr>
<tr><td>Pression</td><td>P (bar) = F (daN) / S (cm²)</td></tr>
<tr><td>Débit pompe</td><td>Q (l/min) = V (cm³/tr) × N (tr/min) / 1000</td></tr>
<tr><td>Puissance</td><td>Pu (kW) = P (bar) × Q (l/min) / 600</td></tr>
<tr><td>Vitesse vérin</td><td>v (m/s) = Q (l/min) / (6 × S (cm²))</td></tr>
<tr><td>Surface</td><td>S = π × R² = π × D² / 4 · 1 cv = 736 W · 1 bar = 10⁵ Pa</td></tr></table></div>
<p><b>Pression = force ; débit = vitesse.</b></p>
<h3>Appareils de pression</h3>
<div class="tw"><table><tr><th>Appareil</th><th>Au repos</th><th>Pilotage</th><th>Rôle</th></tr>
<tr><td>Limiteur (principal / secondaire)</td><td>Fermé</td><td>Amont</td><td>Pression maxi (principal = après la pompe ; secondaire = entre distributeur et récepteur)</td></tr>
<tr><td>Réducteur</td><td>Ouvert</td><td>Aval</td><td>Pression inférieure constante dans un circuit secondaire</td></tr>
<tr><td>Séquence</td><td>Fermée</td><td>Amont</td><td>Ordre de fonctionnement (priorité)</td></tr>
<tr><td>Équilibrage</td><td>Fermée</td><td>Interne</td><td>Charge menante constante</td></tr>
<tr><td>Freinage</td><td>Fermée</td><td>Externe (ligne opposée)</td><td>Charge menante variable</td></tr></table></div>
<h3>Diagnostic en 3 questions</h3>
<ol><li>Vitesse anormale = débit ; force / pas de mouvement = pression ; calage = puissance.</li><li>Tous les récepteurs → appareil commun ; un seul → sa section.</li><li>2 sens → amont du distributeur ; 1 sens → sur une ligne.</li></ol>
<h3>Circuit fermé (transmission hydrostatique)</h3>
<p>Gavage : compense les fuites, alimente la servocommande et le frein de parc ; limiteur de gavage = pression BP au neutre. Échange (tiroir + limiteur) : taré PLUS BAS que le gavage, fixe la BP en marche et renouvelle l’huile. Soupapes HP = anti-choc, tarées au-dessus de l’annulation de débit.</p>` },

  dsft: { html: `
<div class="tw"><table><tr><th>Point</th><th>À retenir</th></tr>
<tr><td>Usure des pneus</td><td>Rugueuse = parallélisme · lisse = carrossage · facettes = amortisseurs</td></tr>
<tr><td>Tirage</td><td>Tire du côté du carrossage le plus positif</td></tr>
<tr><td>Angle inclus</td><td>= carrossage + pivot (diagnostic : identique G/D → triangle ; différent → fusée)</td></tr>
<tr><td>Réglage</td><td>Hauteur de caisse → carrossage → parallélisme (toujours en dernier) · 1° = 60′, écrire mini–maxi</td></tr>
<tr><td>Willis</td><td>Porte-satellites MENÉ = démultiplié · MENANT = multiplié · FIXE = marche arrière · 2 éléments liés = prise directe</td></tr>
<tr><td>Freinage hydraulique</td><td>Fuite interne sans trace = maître-cylindre tandem · pédale dure = assistance · liquide ≤ 165 °C à remplacer</td></tr>
<tr><td>ABS</td><td>Stabilité, directibilité, efficacité (pas forcément une distance plus courte)</td></tr>
<tr><td>Pneus</td><td>DOT 4217 = 42ᵉ semaine 2017 · V = recreusé · R = rechapé · 152/148 = solo / jumelé</td></tr>
<tr><td>Embrayage</td><td>Tiré = +20 % de couple · sécurité = pas 2 vitesses à la fois</td></tr></table></div>
<p>Formule de Willis : Zp·Np + Zc·Nc = (Zp + Zc)·Nps.</p>` },

  pneu: { html: `
<div class="tw"><table><tr><th>Point</th><th>À retenir</th></tr>
<tr><td>Norme</td><td>Remplissage 6 à 11 min · temps de réponse 0,6 s · stationnement 18 % seul, 12 % en ensemble</td></tr>
<tr><td>Repères</td><td>1 entrée · 2 sortie · 3 échappement · 4 pilotage · 43 = pilotage par absence d’air · 7 = antigel</td></tr>
<tr><td>Production</td><td>Dessiccateur = air sec · valve de protection = isole un circuit en fuite · clapet anti-retour = garde la pression aval</td></tr>
<tr><td>Tristop</td><td>Air = défreiné ; plus d’air = freiné par le ressort · VNAE = pas d’addition service + ressort</td></tr>
<tr><td>Remorque</td><td>Rouge = automatique = alimentation · jaune = directe = commande · VRU freine la remorque si la main rouge casse</td></tr>
<tr><td>Test de rupture VCR</td><td>Mano sur l’automatique, freiner, fuite sur la directe → l’automatique chute à 0 bar</td></tr>
<tr><td>Réglage</td><td>La remorque freine un peu AVANT le tracteur (≈ 0,5 bar de plus sur la directe) · louvoiement = prédominance de la VCR</td></tr></table></div>` },

  mdf: { html: `
<p><b>Ordre S-E-N-S-E-S-R-D :</b> Somme des résistances – Effort moteur disponible – Nombre de brins – Schéma – Effort moteur total – Sécurité – Résistance des points fixes – Distances.</p>
<div class="tw"><table><tr><th>Étape</th><th>À retenir</th></tr>
<tr><td>Masses volumiques</td><td>Bois 1 t/m³ · roche 2,5 t/m³ · métal 8 t/m³</td></tr>
<tr><td>Résistances</td><td>Pente ≤ 50 % : P × p · 50–100 % : P × sin · &gt; 100 % : R = P · retournement 2/3 P · enlisement aux essieux 2 P</td></tr>
<tr><td>EMD</td><td>Treuil = FT mini (sauf adhérence plus faible) · un seul pont moteur : A = 2/3 P × fa</td></tr>
<tr><td>Nombre de brins</td><td>ΣR / EMD → arrondi supérieur → +1 si &lt; 4, +2 si ≥ 4 · simple 5 brins maxi · le brin de manœuvre ne compte pas</td></tr>
<tr><td>EMT</td><td>−10 % par poulie (× 0,9) · sécurité entre 15 et 70 %</td></tr>
<tr><td>Points fixes</td><td>Holmès 1 chevalet 2 000–4 000 daN · arbre Cm × d² (d en dm)</td></tr>
<tr><td>Commandements</td><td>Sifflet : 1 long = prise · 1 bref = arrêt · 3 brefs = fin · arrêt express = 2 bras à l’horizontale</td></tr></table></div>` },

  uv2: { html: `
<div class="box methode"><b>🎯 Barème + 1 / − 0,5 / 0</b><ul><li>Au hasard entre 3 choix : espérance 0 → si tu hésites entre les 3, laisse vide.</li><li>Dès que tu élimines UNE proposition avec certitude : réponds (espérance + 0,25).</li><li>Les questions reviennent souvent <b>avec d’autres valeurs</b> : apprends la MÉTHODE, pas le chiffre. Entraîne-toi avec les leçons « UV2 — valeurs différentes » de chaque matière.</li></ul></div>

<h2 class="h2">🚙 DSFT (Q1 à Q18)</h2>
<ul>
<li><b>Tableau ALFA</b> : 1° = 60′ ; pour chaque angle, écrire la plage MINI–MAXI (valeur ± tolérance) puis comparer. Ex. 10°30′ ± 30′ → 10°00′ à 11°00′.</li>
<li><b>Pièce incriminée</b> : angle inclus (carrossage + pivot) identique G/D mais carrossage et pivot décalés en sens inverse → triangle / bras ; angle inclus différent → fusée.</li>
<li><b>Tirage</b> : du côté du carrossage le plus positif.</li>
<li><b>Usures</b> : rugueuse = parallélisme (intérieur = trop d’ouverture, extérieur = trop de pincement) ; lisse = carrossage ; facettes = amortisseurs (changer pneus + amortisseurs du même train).</li>
<li><b>Ordre de réglage</b> : hauteur de caisse → carrossage → parallélisme.</li>
<li><b>Marquage pneu</b> : V = recreusé ; lieu ; année (ex. « V CFD 20 » = recreusé à Clermont-Ferrand en 2020).</li>
<li><b>Freinage hydraulique</b> : fuite interne = maître-cylindre tandem. Mastervac : moteur arrêté, pomper → pédale dure et haute ; pied maintenu, démarrer → la pédale s’enfonce un peu.</li>
<li><b>ABS</b> : améliorer la sécurité quelle que soit l’adhérence en optimisant stabilité, directibilité, efficacité.</li>
<li><b>Willis</b> : Zp·Np + Zc·Nc = (Zp + Zc)·Nps. Porte-satellites mené = démultiplié ; menant = multiplié ; fixe = marche arrière.</li>
<li><b>Pneumatique</b> : clapet anti-retour = garde la pression en aval si fuite en amont ; 4 roues freinées = circuits AV et AR ; remplissage 6 à 11 min au ralenti ; air permanent à la main directe : PAS le correcteur de freinage ; test de rupture : mano sur l’automatique, fuite sur la directe → 0 bar.</li></ul>

<h2 class="h2">🛢️ Hydraulique (Q19 à Q30)</h2>
<ul>
<li><b>Méthode</b> : vitesse = débit ; force = pression. Combien de récepteurs ? Combien de sens ? (1 sens = composant sur une ligne : limiteur secondaire ; 2 sens = amont du distributeur : balance, tiroir.)</li>
<li><b>LS</b> : pression au neutre = tarage du tiroir LS (27 b) ; butée = annulation de débit ; limiteur principal = sécurité ; perte d’indépendance en action combinée = balance individuelle.</li>
<li><b>Régulateur 2 voies</b> = balance EN SÉRIE avec l’étrangleur ; <b>3 voies</b> = balance en dérivation vers la bâche.</li>
<li><b>Réducteur</b> : ouvert au repos, pilotage aval → réduit la pression d’entrée à la valeur du tarage de son ressort.</li>
<li><b>Circuit fermé</b> : BP en marche = limiteur de balayage/échange (plus bas que le gavage) ; BP au neutre = limiteur de gavage ; pression de service maxi = annulation de débit (sous les soupapes HP) ; valve automotive = avancement selon le régime ; moteur à régulation de puissance = cylindrée adaptée à la charge.</li></ul>

<h2 class="h2">🔧 Motorisation (Q31 à Q40)</h2>
<ul><li>Bosch 1ʳᵉ gén. : monter la HP = régulateur de haute pression ; débit injecté = temps d’ouverture + HP.</li>
<li>Delphi : monter la HP = régulateur de débit ; faire chuter en décélération = retours injecteurs ; accéléromètre = recalage de la pré-injection.</li>
<li>FAP = filtrer et brûler les suies ; catalyseur = NOx, HC, CO ; cétane &lt; 51 = cognements.</li>
<li>Capteur PMH = PMH des cylindres 1 et 4 ; pré-pompe = alimentation au démarrage.</li></ul>

<h2 class="h2">🔋 Équipement électrique (Q41 à Q52)</h2>
<ul><li>Moteur de démarreur &lt; 1 Ω ; maintien coupé = colle par intermittence.</li>
<li>Démarreur lent : batterie bonne en charge → lignes + / − ; batterie basse à vide (12,2 V) → recharger d’abord. Mini au démarrage 9,6 V (12 V) / 19,2 V (24 V).</li>
<li>9 diodes : lampe HS = pas de charge ; lampe éteinte contact mis = circuit d’excitation ouvert (inducteur). 6 diodes à régulateur incorporé : lampe HS = pas de conséquence ; surtension = régulateur.</li>
<li>Calculateur : étage d’entrée (capteurs) → microcontrôleur → étage de sortie. Binaire : poids 8-4-2-1 (8 = 1000). CAN HS : 2 × 120 Ω, fils torsadés contre les perturbations.</li></ul>

<h2 class="h2">⚡ Électricité générale (Q53 à Q64)</h2>
<div class="tw"><table><tr><th>Type de question</th><th>Méthode</th><th>Exemple du dossier</th></tr>
<tr><td>Résistance d’un relais</td><td>R = U / I</td><td>24 / 0,2 = 120 Ω</td></tr>
<tr><td>Courant de base</td><td>Ib = Ic / β</td><td>200 mA / 100 = 2 mA</td></tr>
<tr><td>Tension de la résistance de base</td><td>UR = Ucommande − Vbe</td><td>5 − 0,6 = 4,4 V</td></tr>
<tr><td>Résistance base-émetteur</td><td>R = Vbe / I</td><td>0,6 / 0,02 = 30 Ω</td></tr>
<tr><td>Triphasé</td><td>V = U / √3</td><td>220 / 1,732 = 127 V</td></tr>
<tr><td>Valeur efficace</td><td>Ueff = Umax / √2</td><td>220 / 1,414 = 155 V</td></tr>
<tr><td>Fréquence</td><td>f = 1 / T (T en s)</td><td>1 / 0,040 = 25 Hz</td></tr>
<tr><td>Combinaisons</td><td>2ⁿ</td><td>2⁶ = 64</td></tr>
<tr><td>Équations logiques</td><td>ET = produit, OU = somme, De Morgan</td><td>(M·H̄)‾ = M̄ + H</td></tr></table></div>
<p class="muted small">Détail et questions : onglet « Exercices corrigés » de chaque matière → « UV2 — Dossier d’évaluation n°1 » et « UV2 — valeurs différentes ».</p>` }
};
