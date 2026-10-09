/* Formulaire par matière : valeurs à connaître, formules, conversions et méthodes de calcul pas à pas.
   Toutes les valeurs viennent des leçons du site (cours et livres fournis). */
REV.formulaires = {
  elec: [
    { t: 'Conversions d’unités', html: `
<div class="tw"><table><tr><th>Préfixe</th><th>Symbole</th><th>Valeur</th><th>Exemple</th></tr>
<tr><td>kilo</td><td>k</td><td>× 1 000 (10³)</td><td>35 kΩ = 35 000 Ω</td></tr>
<tr><td>milli</td><td>m</td><td>÷ 1 000 (10⁻³)</td><td>200 mA = 0,2 A ; 40 ms = 0,040 s</td></tr>
<tr><td>micro</td><td>µ</td><td>÷ 1 000 000 (10⁻⁶)</td><td>500 µA = 0,000 5 A</td></tr>
<tr><td>nano / pico</td><td>n / p</td><td>10⁻⁹ / 10⁻¹²</td><td></td></tr></table></div>
<ul><li><b>Toujours revenir à l’unité de base</b> (A, V, Ω, s, h) avant de calculer.</li>
<li>1 mm² = 10⁻⁶ m² · 1 ch = 736 W · 1 Ah = 3 600 C · minutes → heures : ÷ 60.</li></ul>` },
    { t: 'Formules', html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Exemple</th></tr>
<tr><td>Loi d’Ohm</td><td>U = R × I · I = U / R · R = U / I</td><td>24 V sur 120 Ω → 0,2 A</td></tr>
<tr><td>Puissance</td><td>P = U × I = R × I² = U² / R</td><td>12 V × 5 A = 60 W ; lampe 24 V / 21 W → 0,9 A</td></tr>
<tr><td>Série</td><td>Req = R1 + R2 + … ; même courant ; tensions qui s’additionnent</td><td>100 + 200 = 300 Ω</td></tr>
<tr><td>Parallèle</td><td>1/Req = 1/R1 + 1/R2 ; pour 2 : R1 × R2 / (R1 + R2) ; n égales : R / n</td><td>2 × 120 Ω → 60 Ω</td></tr>
<tr><td>Loi des nœuds</td><td>Σ courants entrants = Σ courants sortants</td><td></td></tr>
<tr><td>Loi des mailles</td><td>Tension du générateur = somme des tensions des récepteurs</td><td>12 = U1 + U2</td></tr>
<tr><td>Pont diviseur (série)</td><td>U(Rx) = Rx / ΣR × Ug</td><td></td></tr>
<tr><td>Résistance d’un fil</td><td>R = ρ × L / S (ρ en Ω·m, L en m, S en m²) ; section ronde S = π × D² / 4</td><td>ρ = 1,6·10⁻⁸, 3,2 Ω, 1 mm² → L = 200 m</td></tr>
<tr><td>Quantité d’électricité</td><td>Q = I × t (Ah si t en h)</td><td>96 Ah en 32 h → 3 A</td></tr>
<tr><td>Potentiel</td><td>U AB = V A − V B</td><td></td></tr></table></div>` },
    { t: 'Alternatif et triphasé', html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Exemple</th></tr>
<tr><td>Fréquence / période</td><td>f = 1 / T · T = 1 / f</td><td>20 ms → 50 Hz ; 40 ms → 25 Hz ; 400 Hz → 2,5 ms</td></tr>
<tr><td>Tension efficace</td><td>Ueff = Umax / √2 = 0,707 × Umax</td><td>Umax 220 V → 155 V</td></tr>
<tr><td>Crête à crête</td><td>Ucàc = 2 × Umax</td><td></td></tr>
<tr><td>Triphasé</td><td>U (entre phases) = V (phase-neutre) × √3 (1,732)</td><td>220 V entre phases → 127 V</td></tr>
<tr><td>Puissance triphasée</td><td>P = U × I × √3 × cos φ</td><td>3 kW, 220 V, cos φ 0,8 → I ≈ 9,8 A</td></tr></table></div>` },
    { t: 'Diodes, transistor NPN, logique', html: `
<div class="tw"><table><tr><th>Élément</th><th>À retenir</th></tr>
<tr><td>Diode passante</td><td>Chute ≈ 0,6 V · résistance de protection R = (U − Ud) / I</td></tr>
<tr><td>Zéner en inverse</td><td>Garde Uz ; la résistance en série prend UR = U − Uz</td></tr>
<tr><td>Transistor NPN</td><td>Ie = Ib + Ic · Ic = β × Ib · saturé : Vbe ≈ 0,6 V, Vce ≈ 0 · bloqué : Ib = Ic = 0</td></tr>
<tr><td>Ponts de diodes</td><td>Graëtz = 4 diodes · triphasé (alternateur) = 6 diodes</td></tr>
<tr><td>Logique</td><td>0 = 0 à 1 V ; 1 = 2 à 5 V · table de vérité : 2ⁿ lignes (2 → 4 ; 3 → 8 ; 6 → 64)</td></tr>
<tr><td>Binaire</td><td>Poids 128-64-32-16-8-4-2-1 : 8 = 1000 ; 13 = 1101 ; 89 = 01011001</td></tr>
<tr><td>De Morgan</td><td>On casse la barre et on change le signe : (A·B)‾ = Ā + B̄ ; (A+B)‾ = Ā·B̄</td></tr></table></div>` },
    { t: 'Méthode : exercice de transistor (relais)', html: `
<ol><li>Transistor saturé : Vce ≈ 0 → toute la tension est sur la bobine : <b>R bobine = U alim / Ic</b> (24 / 0,2 = 120 Ω).</li>
<li><b>Ib = Ic / β</b> (200 mA / 100 = 2 mA).</li>
<li><b>UR1 = U commande − Vbe</b> (5 − 0,6 = 4,4 V).</li>
<li>R2 en parallèle sur base-émetteur : <b>R2 = Vbe / IR2</b> (0,6 / 0,020 = 30 Ω).</li>
<li>Dans R1 passent Ib + IR2 : <b>R1 = UR1 / (Ib + IR2)</b>.</li>
<li>Toujours vérifier l’unité : mA → A en divisant par 1 000.</li></ol>` }
  ],
  equip: [
    { t: 'Batterie', html: `
<div class="tw"><table><tr><th>Valeur</th><th>À retenir</th></tr>
<tr><td>Éléments</td><td>12 V = 6 éléments de ≈ 2 V (2,1 V chargé ; fin de décharge 1,75 V)</td></tr>
<tr><td>État de charge (12 V, repos)</td><td>12,6–12,7 V chargée · 12,4 V ≈ 75 % · 12,2 V ≈ 50 % · &lt; 12 V déchargée</td></tr>
<tr><td>Recharge</td><td>1/10 de la capacité pendant 10 h (80 Ah → 8 A ; 75 Ah → 7,5 A)</td></tr>
<tr><td>Aptitude au démarrage</td><td>3 × la capacité pendant ≈ 15 s, 3 fois, 1 min de repos (70 Ah → 210 A) ; &gt; 9 V au 3ᵉ essai</td></tr>
<tr><td>Montage série / parallèle</td><td>Série : tensions qui s’additionnent (2 × 12 V 60 Ah = 24 V 60 Ah) ; parallèle : capacités qui s’additionnent</td></tr>
<tr><td>Densité (pèse-acide)</td><td>Minimum ≈ 1,24 (28° Baumé)</td></tr></table></div>` },
    { t: 'Démarreur et charge', html: `
<div class="tw"><table><tr><th>Mesure</th><th>12 V</th><th>24 V</th></tr>
<tr><td>Tension mini aux batteries au démarrage (80 %)</td><td>9,6 V</td><td>19,2 V</td></tr>
<tr><td>Tension de charge moteur tournant</td><td>13,5 à 15 V</td><td>28 à 29,5 V</td></tr>
<tr><td>Chute de tension maxi dans une ligne</td><td colspan="2">&lt; 1 V entre batterie et démarreur</td></tr></table></div>
<ul><li>Moteur du démarreur : <b>&lt; 1 Ω</b> · bobine de maintien ≈ 2 × bobine d’appel (2 Ω → 4 Ω).</li>
<li>Diesel : le démarreur entraîne le moteur à ≈ <b>200 tr/min</b>.</li>
<li>Méthode de diagnostic au démarrage (24 V) : sous 19,2 V → <b>batteries</b> ; au-dessus mais démarreur qui peine → <b>démarreur</b> ; batteries bonnes mais chute &gt; 1 V jusqu’au démarreur → <b>ligne</b>.</li></ul>
<div class="box methode"><b>✎ Diagnostic complet du démarreur</b><p>1) Bobines d’appel et de maintien bonnes, moteur du démarreur <b>≈ 0 Ω</b>.<br>2) On doit retrouver <b>Ubat à la borne +DEM</b> ; sinon → <b>perte en ligne</b> (câble sectionné, cosse).<br>3) Tension des batteries au lancement <b>qui s’effondre</b>, circuit bon → <b>moteur thermique grippé</b>.<br>4) Tension des batteries au lancement <b>trop élevée</b>, démarreur qui peine → <b>résistance du moteur du démarreur trop élevée</b>.</p></div>` },
    { t: 'Multiplexage CAN, capteurs, RCO', html: `
<div class="tw"><table><tr><th>Mesure (prise OBD)</th><th>Normal</th><th>Anomalie</th></tr>
<tr><td>Résistance 6–14 (batterie débranchée)</td><td>60 Ω (2 × 120 Ω en parallèle)</td><td>120 Ω = fil coupé / terminaison HS · ≈ 0 Ω = court-circuit H-L</td></tr>
<tr><td>Tension 6–14</td><td>0,5 à 0,7 (0,9) V</td><td>≥ 1 V = réseau saturé</td></tr>
<tr><td>CAN H (broche 6 / masse)</td><td>2,4 à 3,2 V (valeurs données 3,5 / 2,5 V)</td><td>Hors plage : interface de ligne H</td></tr>
<tr><td>CAN L (broche 14 / masse)</td><td>1,8 à 2,6 V (valeurs données 2,5 / 1,5 V)</td><td>Hors plage : interface de ligne L</td></tr></table></div>
<ul><li>Dominant (bit 0) : H = 3,5 V, L = 1,5 V · récessif (bit 1) : H = L = 2,5 V · H + L = 5 V.</li>
<li>OBD : 16 = +BAT ; 4 et 5 = masse ; 6 = CAN H ; 14 = CAN L.</li>
<li><b>RCO</b> : tension moyenne lue = rapport cyclique × tension (50 % sous 12 V → 6 V ; 75 % → 9 V).</li>
<li>Injecteur électromagnétique ≈ 0,5 Ω · piézo ≈ 200 kΩ · IMV 2,5 à 3,5 Ω · régulateur HP ≈ 2 Ω.</li></ul>` }
  ],
  moteur: [
    { t: 'Formules du moteur', html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th></tr>
<tr><td>Cylindrée unitaire</td><td>Vu = π × A² / 4 × C (A = alésage, C = course, en cm → cm³)</td></tr>
<tr><td>Cylindrée totale</td><td>Vtot = Vu × nombre de cylindres</td></tr>
<tr><td>Rapport volumétrique</td><td>ρ = (Vu + v) / v → v = Vu / (ρ − 1) (v = chambre) · diesel 13/1 à 24/1</td></tr>
<tr><td>Puissance</td><td>P (W) = C (N·m) × 2π × N (tr/min) / 60 · 1 CV = 736 W</td></tr>
<tr><td>Cycle 4 temps</td><td>2 tours de vilebrequin (720°) = 1 tour d’arbre à cames (360°)</td></tr></table></div>` },
    { t: 'Valeurs à connaître', html: `
<div class="tw"><table><tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Pression d’huile (diesel)</td><td>4 à 8 bar</td></tr>
<tr><td>Bouchon du vase d’expansion</td><td>Pression 0,8 à 1,2 bar · dépression 0,05 bar · 1,4 bar ≈ ébullition à 115 °C</td></tr>
<tr><td>Indice de cétane mini du gazole</td><td>51 (carburéacteur ≈ 42)</td></tr>
<tr><td>Pré-injection</td><td>Supprimée au-delà de 2 000 tr/min</td></tr>
<tr><td>Régénération du FAP</td><td>≈ 550 °C</td></tr>
<tr><td>Common rail : haute pression</td><td>200 bar au démarrage → 1 350 à 1 400 bar</td></tr>
<tr><td>Capteur HP (0,5 à 4,5 V)</td><td>0,5 V contact mis · 1 à 1,5 V au démarrage · 1 V contact mis = capteur HS ou court-circuit</td></tr>
<tr><td>Filtre à gazole</td><td>ΔP maxi 0,3 bar avant / après le filtre</td></tr>
<tr><td>Jeu aux soupapes (exemple du cours)</td><td>Admission 0,10 à 0,25 mm · échappement 0,20 à 0,25 mm</td></tr></table></div>` },
    { t: 'Méthodes de réglage du jeu aux soupapes', html: `
<div class="tw"><table><tr><th>Méthode</th><th>Principe</th></tr>
<tr><td>Bascule (classique)</td><td>Placer un cylindre en bascule (balayage : entre AOA et RFE) et régler les 2 soupapes du cylindre en fin de compression</td></tr>
<tr><td>Méthode des 5 (4 cylindres)</td><td>Cylindre en bascule + cylindre à régler = 5 : 1 → 4 · 3 → 2 · 4 → 1 · 2 → 3</td></tr>
<tr><td>Méthode des 7 (6 cylindres)</td><td>Somme = 7 : 1 → 6 · 5 → 2 · 3 → 4 · 6 → 1 · 2 → 5 · 4 → 3</td></tr>
<tr><td>Méthode « Peugeot » (POE)</td><td>4 cyl. : POE 1 → ADM 3, ECH 4 · POE 3 → ADM 4, ECH 2 · POE 4 → ADM 2, ECH 1 · POE 2 → ADM 1, ECH 3</td></tr>
<tr><td>Méthode générale</td><td>Soupape à régler en pleine ouverture, faire un tour moteur : elle est en position de réglage (nombre impair de cylindres)</td></tr></table></div>
<p>Les méthodes des 5, des 7 et Peugeot ne s’appliquent qu’aux moteurs <b>en ligne à nombre pair</b> de cylindres.</p>` }
  ],
  hydro: [
    { t: 'Formules hydrauliques', html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Unités</th><th>Exemple</th></tr>
<tr><td>Pression</td><td>P = F / S</td><td>bar, daN, cm²</td><td>10 000 daN sur 50 cm² → 200 bar</td></tr>
<tr><td>Débit d’une pompe</td><td>Q = Cyl × N / 1 000</td><td>L/min, cm³/tr, tr/min</td><td>30 cm³ à 2 800 tr/min → 84 L/min</td></tr>
<tr><td>Vitesse d’un vérin</td><td>v = Q / (6 × S)</td><td>m/s, L/min, cm²</td><td>30 L/min sur 5 cm² → 1 m/s</td></tr>
<tr><td>Vitesse d’un moteur</td><td>N = Q × 1 000 / Cyl</td><td>tr/min, L/min, cm³/tr</td><td></td></tr>
<tr><td>Couple d’un moteur</td><td>C = P × Cyl / 628</td><td>daN·m, bar, cm³/tr</td><td></td></tr>
<tr><td>Puissance</td><td>Pu = P × Q / 600</td><td>kW, bar, L/min</td><td>200 bar × 60 L/min → 20 kW</td></tr>
<tr><td>Débit dans un orifice</td><td>Q = K × S × √ΔP</td><td></td><td>ΔP constant = débit constant</td></tr></table></div>` },
    { t: 'Conversions de pression', html: `
<ul><li>1 bar = 10⁵ Pa = 100 kPa = 0,1 MPa · 1 PSI ≈ 0,07 bar.</li>
<li>Vérin différentiel (S = 2 × s) : rentrée 2 fois plus rapide, avec 2 fois moins de force.</li>
<li>Vitesse de l’huile : 4 à 7 m/s dans les conduites.</li></ul>` },
    { t: 'Load Sensing et transmission hydrostatique', html: `
<div class="tw"><table><tr><th>Situation</th><th>Pression</th></tr>
<tr><td>LS centre fermé en travail</td><td>P pompe = P LS max + tarage du tiroir LS (ex. 150 + 17 = 167 b)</td></tr>
<tr><td>LS centre ouvert (balance d’entrée)</td><td>P pompe = P LS + tarage de la balance (ex. 140 + 20 = 160 b)</td></tr>
<tr><td>Récepteur en butée</td><td>Pression du TAD / annulation de débit (le débit tombe à ≈ 1 L/min)</td></tr>
<tr><td>Transmission hydrostatique au neutre</td><td>BP = limiteur de gavage</td></tr>
<tr><td>Transmission hydrostatique en marche</td><td>BP = limiteur de balayage (plus bas) · HP maxi = annulation de débit · soupapes HP = sécurité</td></tr></table></div>` },
    { t: 'Méthode de diagnostic', html: `
<ol><li>Problème de <b>vitesse</b> = <b>débit</b> ; de <b>force</b> = <b>pression</b> ; moteur qui cale = <b>puissance</b>.</li>
<li><b>Tous les récepteurs</b> → appareil commun (génération) ; <b>un seul</b> → appareil propre à ce récepteur.</li>
<li><b>Deux sens</b> → appareil en amont du distributeur ; <b>un sens</b> → appareil sur une seule ligne d’utilisation.</li></ol>` }
  ],
  dsft: [
    { t: 'Distance de freinage et d’arrêt (méthode AGD 27)', html: `
<ol><li>Convertir la vitesse : <b>km/h ÷ 3,6 = m/s</b> (72 km/h = 20 m/s ; 144 km/h = 40 m/s ; 216 km/h = 60 m/s).</li>
<li>Distance de réaction : <b>Dr = V × temps de réaction</b>.</li>
<li>Décélération : <b>γ = g × c</b> (g = 9,81 ou 10 m/s² ; c = coefficient d’adhérence).</li>
<li>Distance de freinage : <b>DF = V² ÷ 2γ</b>.</li>
<li>Distance d’arrêt : <b>Da = Dr + DF</b>.</li></ol>
<p><b>Exemple</b> : 144 km/h, c = 0,5, g = 10, réaction 1 s → 40 m/s ; DF = 1 600 ÷ 10 = 160 m ; Dr = 40 m ; arrêt = <b>200 m</b>.</p>
<p>Vitesse × 2 → distance de freinage × 4. Sol mouillé : distance de freinage doublée.</p>` },
    { t: 'Train épicycloïdal (Willis)', html: `
<p><b>Zp × Np + Zc × Nc = (Zp + Zc) × Nps</b> (p = planétaire, c = couronne, ps = porte-satellites ; l’élément bloqué = 0 tr/min).</p>
<p><b>Exemple</b> : couronne menante 600 tr/min (Zc = 80), planétaire fixe (Zp = 40) → Nps = 80 × 600 / 120 = <b>400 tr/min</b>, même sens → marche avant démultipliée. Deux éléments liés → prise directe.</p>` },
    { t: 'Angles, pneus, freinage', html: `
<div class="tw"><table><tr><th>Élément</th><th>À retenir</th></tr>
<tr><td>Conversion d’angle</td><td>1° = 60′</td></tr>
<tr><td>Angle inclus</td><td>= carrossage + inclinaison de pivot · bon → triangle / berceau / châssis ; faux → fusée / porte-fusée / jambe de force</td></tr>
<tr><td>Ordre de réglage</td><td>Hauteur de caisse → carrossage → parallélisme (toujours en dernier)</td></tr>
<tr><td>Usure</td><td>Rugueuse = parallélisme · lisse = carrossage · facettes = amortisseurs</td></tr>
<tr><td>Marquage DOT</td><td>4 chiffres : semaine + année (4217 = 42ᵉ semaine 2017)</td></tr>
<tr><td>Liquide de frein</td><td>≥ 185 °C performant · 165–185 °C correct · ≤ 165 °C à remplacer</td></tr>
<tr><td>SPR (freins à tambours)</td><td>Garde 0,5 à 1,5 bar (contrôle : 3 à 4 bar maxi, attendre 5 à 10 min)</td></tr></table></div>` }
  ],
  pneu: [
    { t: 'Normes et valeurs', html: `
<div class="tw"><table><tr><th>Valeur</th><th>À retenir</th></tr>
<tr><td>Temps de remplissage (ralenti)</td><td>6 à 11 min pour toutes les bouteilles</td></tr>
<tr><td>Temps de réponse</td><td>≤ 0,6 s</td></tr>
<tr><td>Épuisabilité</td><td>Après 8 actionnements à fond, encore l’efficacité du frein de secours</td></tr>
<tr><td>Frein de stationnement</td><td>Véhicule seul en charge : 18 % · ensemble routier : 12 %</td></tr>
<tr><td>Deux circuits indépendants</td><td>Si l’un lâche, l’autre assure au moins 30 % de l’efficacité</td></tr>
<tr><td>Réglage de la VCR</td><td>0,5 bar de plus sur la main directe que sur le circuit AR</td></tr>
<tr><td>Contrôle de la rupture</td><td>Manomètre sur la main automatique, fuite sur la directe en freinant → 0 bar</td></tr></table></div>` }
  ],
  mdf: [
    { t: 'La méthode S E N S E S R D', html: `
<div class="tw"><table><tr><th>Étape</th><th>Formule</th></tr>
<tr><td><b>S</b> — Somme des résistances</td><td>ΣR = Rr (P × fr) ou Rg (P × fg) ± Rp · pente ≤ 50 % : Rp = P × p% · 50 à 100 % : Rp = P × sin · &gt; 100 % : R = P</td></tr>
<tr><td><b>E</b> — Effort moteur disponible</td><td>Adhérence A = P × fa (un seul pont moteur : 2/3 P × fa) · EMD = la plus petite de FT (mini) et A · avec bêche : A = P × fa + FT</td></tr>
<tr><td><b>N</b> — Nombre de brins</td><td>Nb = ΣR / EMD → arrondi supérieur ; &lt; 4 → +1 ; ≥ 4 → +2</td></tr>
<tr><td><b>S</b> — Schéma</td><td>Simple : 5 brins maxi · composé : on multiplie (6 = 3 × 2 ; 9 = 3 × 3) · 7 impossible</td></tr>
<tr><td><b>E</b> — Effort moteur total</td><td>Chaque poulie : × 0,9 (−10 %) · EMT = somme des brins actifs · frottement en sommet de pente : −10 %</td></tr>
<tr><td><b>S</b> — Sécurité</td><td>S % = (EMT − ΣR) / ΣR × 100, entre 15 et 70 % (&lt; 15 → +1 brin ; &gt; 70 → −1 brin)</td></tr>
<tr><td><b>R</b> — Points fixes</td><td>Un point fixe résiste à la somme des efforts qui passent par lui · arbre : Ra = Cm × d² (d en dm)</td></tr>
<tr><td><b>D</b> — Distances</td><td>DPF simple au crochet = (Lc − Lg) / (Nb − 1) · au treuil = (Lc − Ls) / Nb</td></tr></table></div>` },
    { t: 'Coefficients et valeurs', html: `
<div class="tw"><table><tr><th>Sol</th><th>fg = fa</th><th>fr</th></tr>
<tr><td>Macadam</td><td>0,7</td><td>0,03</td></tr><tr><td>Route sèche, chemin dur</td><td>0,5</td><td>0,06</td></tr>
<tr><td>Terrain humide, gravier</td><td>0,4</td><td>0,15</td></tr><tr><td>Terrain meuble</td><td>0,35</td><td>0,3</td></tr>
<tr><td>Boue profonde</td><td>0,3</td><td>0,5</td></tr><tr><td>Enlisé</td><td>—</td><td>2</td></tr></table></div>
<div class="tw"><table><tr><th>Cas particulier</th><th>ΣR</th></tr>
<tr><td>Élévation</td><td>11/10 P</td></tr><tr><td>Descente</td><td>3/2 P</td></tr><tr><td>Retournement sol plat</td><td>2/3 P</td></tr>
<tr><td>Retournement sur pente &gt; 15 % / montée &gt; 100 %</td><td>P</td></tr><tr><td>Enlisé jusqu’aux essieux</td><td>2 P</td></tr></table></div>
<ul><li>Densités : bois 1 t/m³ · roche 2,5 t/m³ · métal 8 t/m³.</li>
<li>Arbres (Cm en daN/dm²) : chêne 500 · hêtre 400 · châtaignier 300 · sapin, bouleau, platane 200.</li>
<li>Lot Holmès : 1 chevalet 2 000 à 4 000 daN · 2 : 4 000 à 8 000 · 3 : 8 000 à 15 000 daN.</li>
<li>Force à la jante : Fj = 270 × Pm (kW) / v (km/h) · 1 ch = 0,736 kW.</li></ul>
<div class="tw"><table><tr><th>Angle</th><th>5°</th><th>10°</th><th>15°</th><th>20°</th><th>25°</th><th>30°</th><th>35°</th><th>40°</th><th>45°</th></tr>
<tr><td>sin</td><td>0,09</td><td>0,17</td><td>0,26</td><td>0,34</td><td>0,42</td><td>0,50</td><td>0,57</td><td>0,64</td><td>0,71</td></tr>
<tr><td>Pente</td><td>9 %</td><td>17 %</td><td>27 %</td><td>36 %</td><td>46 %</td><td>57 %</td><td>70 %</td><td>84 %</td><td>100 %</td></tr></table></div>` },
    { t: 'Exemple complet', html: `
<ol><li>ΣR : fardeau roulant 4 000 daN, sol meuble (fr 0,3) → 1 200 daN ; pente 25 % → +1 000 → <b>2 200 daN</b>.</li>
<li>EMD : tracteur 4 100 daN, FT 2 250, boue (fa 0,3) → A = 1 230 &lt; FT → <b>EMD = 1 230 daN</b>.</li>
<li>Nb : 2 200 / 1 230 = 1,79 → 2 → &lt; 4 donc +1 → <b>3 brins</b> (mouflage simple).</li>
<li>EMT : 1 230 + 1 107 + 996 = <b>3 333 daN</b> (−10 % à chaque poulie).</li>
<li>Sécurité : (3 333 − 2 200) / 2 200 × 100 = <b>51,5 %</b> → entre 15 et 70 % : correct.</li></ol>` }
  ],
  ppld: [
    { t: 'Pressions et puissances', html: `
<div class="tw"><table><tr><th>Situation</th><th>Pression</th></tr>
<tr><td>Neutre</td><td>30 b de stand-by, ≈ 1 L/min</td></tr>
<tr><td>Fonctionnement</td><td>Pression de service = P LS + 30 b (ex. 85 + 30 = 115 b)</td></tr>
<tr><td>Récepteur en butée</td><td>320 b (DAD) + 30 b = 350 b</td></tr>
<tr><td>Limiteur piloté RSQ 240</td><td>380 bar (protection générale)</td></tr></table></div>
<p><b>Puissance</b> : P (kW) = p (bar) × Q (L/min) / 600 — ex. 115 × 41 / 600 = 7,86 kW. Pompe : 92 cm³, débit maxi 100 L/min.</p>` }
  ],
  epms: [
    { t: 'Valeurs à connaître', html: `
<div class="tw"><table><tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Séances par semaine</td><td>3 = maintien · 4 et + = amélioration</td></tr>
<tr><td>Séance type</td><td>Prise en main 5 min · mise en train 10-15 min · partie principale 30-50 min · retour au calme 5-10 min · contrôle 5 min</td></tr>
<tr><td>Course : adaptation / continu</td><td>60 à 75 % / 65 à 85 % de la FC max (120-150 / 130-170 puls/min à 20 ans)</td></tr>
<tr><td>Parcours d’obstacles</td><td>500 m, 20 obstacles (3 hauts, 4 moyens, 13 bas) ; féminines 16</td></tr>
<tr><td>CCPM</td><td>CCPG /60 (ECR 2 400 m, aisance aquatique 15 m + 85 m, pompes) + CCPS /40 ; seuil 31/60 ; exempt ≥ 60 jours</td></tr>
<tr><td>CMA</td><td>Validité 2 ans maximum</td></tr></table></div>` }
  ]
};
