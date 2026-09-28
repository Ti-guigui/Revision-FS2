REV.add({
  id: 'moteur', name: 'Motorisation', icon: '🔧', color: '#dc2626',
  desc: 'Caractéristiques, cycles, distribution, graissage, refroidissement, injection, dépollution.',
  lessons: [
    {
      id: 'caracteristiques', title: 'Caractéristiques du moteur',
      html: `
<div class="tw"><table><tr><th>Grandeur</th><th>Formule / valeur</th></tr>
<tr><td>Cylindrée unitaire</td><td>Vu = π × A² / 4 × C (A = alésage, C = course, en cm → cm³)</td></tr>
<tr><td>Cylindrée totale</td><td>Vtot = Vu × n (nombre de cylindres)</td></tr>
<tr><td>Rapport volumétrique</td><td>ρ = (Vu + v) / v → v = Vu / (ρ − 1) (v = chambre de combustion)</td></tr>
<tr><td>Puissance</td><td>P (W) = C (N·m) × 2π × N (tr/min) / 60 · 1 CV = 736 W</td></tr>
<tr><td>ρ diesel</td><td>13/1 à 24/1 (auto-inflammation)</td></tr>
<tr><td>A &lt; C / A = C / A &gt; C</td><td>Course longue (<b>moteur lent</b>) / carré / super-carré</td></tr>
<tr><td>Cycle 4 temps</td><td>1 cycle complet = <b>2 tours de vilebrequin = 720°</b> ; l’arbre à cames tourne à demi-vitesse (2 tours vilebrequin = 1 tour arbre à cames)</td></tr>
<tr><td>Régularité cyclique</td><td><b>R = 720° / n</b> (n = nombre de cylindres) : ex. 4 cylindres → une combustion tous les 180°</td></tr>
<tr><td>Taux de remplissage τ</td><td>Moteur atmosphérique : <b>0,7 &lt; τ &lt; 0,9</b> (≈ 0,9 au ralenti, ≈ 0,7 à régime élevé)</td></tr></table></div>
<p>La <b>puissance réelle mesurée au banc</b> est proportionnelle <b>au couple et à la vitesse de rotation</b> (P = C × ω).</p>`,
      retenir: ['Alésage = diamètre du cylindre ; course = distance parcourue par le piston.', 'ρ = (Vu + v) / v.', 'P = C × ω.'],
      pieges: ['ρ se calcule avec la chambre de combustion v, pas avec Vtot.'],
      memo: { cle: 'P = C × ω', points: ['Vu = π × A²/4 × C', 'ρ = (Vu + v)/v', 'Diesel 13–24', '1 CV = 736 W', 'R = 720° / n', 'τ atmo : 0,7 à 0,9'], astuce: 'A < C : course longue (le piston voyage plus qu’il n’est large).' }
    },
    {
      id: 'cycle', title: 'Les gaz et le cycle 4 temps',
      html: `
<ul><li><b>Isobare</b> = pression constante · <b>isochore</b> = volume constant · <b>adiabatique</b> = sans échange de chaleur (la température varie).</li>
<li>Compression adiabatique : la pression monte <b>lentement au début</b> de la remontée du piston, puis <b>rapidement à l’approche du PMH</b>.</li></ul>
<div class="tw"><table><tr><th>Phase</th><th>Moteur diesel</th></tr>
<tr><td>Admission</td><td>Air seul</td></tr>
<tr><td>Compression</td><td>ρ 13 à 24</td></tr>
<tr><td>Combustion</td><td>Gazole injecté dans l’air chaud : auto-inflammation. Lent = isobare ; rapide/mixte (Sabathé) = isochore puis isobare</td></tr>
<tr><td>Échappement</td><td>Rejette surtout des NOx et des suies</td></tr></table></div>
<ul><li>Combustion qui continue après la fin de l’injection = <b>combustion diffusante</b>.</li>
<li><b>Cliquetis</b> (essence) : auto-allumage d’une partie du mélange <b>après l’étincelle</b>.</li>
<li><b>Cognements diesel</b> : augmentés par une <b>avance à l’injection trop grande</b> ou un <b>cétane trop faible</b>.</li></ul>`,
      retenir: ['Combustion après la fin d’injection = combustion diffusante.', 'Cliquetis = après l’étincelle.', 'Le diesel rejette surtout des NOx et des suies.'],
      pieges: ['Isobare (P constante) ≠ isochore (V constant).'],
      memo: { cle: 'ADMISSION · COMPRESSION · COMBUSTION · ÉCHAPPEMENT', flow: ['Diesel : air seul', 'Compression ρ 13–24 (air très chaud)', 'Injection → auto-inflammation', 'Combustion diffusante après l’injection'], points: ['Cognements : avance trop grande / cétane faible'], astuce: 'Diesel = « Diffuse » : la combustion continue après l’injection.' }
    },
    {
      id: 'distribution', title: 'La distribution',
      html: `
<ul><li><b>Rôle</b> : ouvrir et fermer les soupapes en synchronisation avec le vilebrequin. L’arbre à cames tourne à <b>demi-vitesse</b> du vilebrequin.</li>
<li><b>Régularité cyclique</b> R = 720° / n (4 cyl → 180° ; 6 cyl → 120°). Jamais 360° : un cycle = 2 tours de vilebrequin.</li>
<li>Chaîne cinématique : came → poussoir (galet, sabot, plateau, désaxé) → tige de culbuteur → culbuteur/linguet → soupape.</li>
<li>Soupapes : contraintes mécaniques, chimiques, thermiques. Ressorts à pas constant, progressif, ou concentriques à pas inversé (évitent l’affolement).</li>
<li><b>Jeu aux soupapes</b> : nécessaire car la soupape se dilate plus que le bloc. Méthodes : bascule, méthode des 5 (4 cyl), méthode Peugeot universelle.</li></ul>
<p><b>Balayage</b> : pendant le croisement des soupapes (admission et échappement ouvertes ensemble autour du PMH), les gaz brûlés qui sortent vite favorisent l’aspiration de l’air frais.</p>`,
      retenir: ['Balayage : les gaz brûlés qui sortent vite favorisent l’aspiration du mélange (croisement des soupapes).', 'Arbre à cames = ½ vitesse du vilebrequin.', 'R = 720° / n.'],
      pieges: ['Régularité cyclique : 720° (2 tours), jamais 360°.'],
      memo: { cle: 'ARBRE À CAMES = ½ VITESSE', points: ['Un cycle = 2 tours de vilebrequin', 'Balayage = croisement des soupapes', '4 cyl → 180° ; 6 cyl → 120°'], astuce: 'R = 720° / n, jamais 360°.' }
    },
    {
      id: 'graissage', title: 'Le graissage',
      html: `
<ul><li><b>Rôles</b> : réduire frottements et usure, évacuer la chaleur, éviter la corrosion, éliminer les particules, participer à l’étanchéité.</li>
<li><b>Types</b> : barbotage (petits moteurs, risque de déjaugeage) · huile perdue (2 temps) · sous pression normale (vilebrequin, rampe de culbuteurs, arbre à cames) · intégrale (idem + axe de piston) · carter sec (meilleur refroidissement, moteurs inclinés, complexe).</li>
<li><b>Circuit</b> : carter, crépine (maille 1 mm), pompe à <b>engrenage, à rotor ou à palettes</b>, filtre, canalisations. Pression : 4 à 8 bar (diesel).</li>
<li>Consommation d’huile : joints de queue de soupape, joint de culasse, segmentation. Défaut de pression : entraînement de pompe, crépine colmatée, fuites.</li></ul>`,
      retenir: ['Pression d’huile : 4 à 8 bar (diesel).', 'Pompe à engrenage, à rotor ou à palettes.'],
      pieges: ['Graissage intégral = pression normale + axe de piston.'],
      memo: { cle: 'CARTER → CRÉPINE → POMPE → FILTRE → PALIERS', points: ['Pompe à rotor (test final Q2)', 'Diesel 4–8 bar', 'Carter sec = moteurs inclinés'], astuce: 'L’huile : glisser, refroidir, protéger, nettoyer, étancher.' }
    },
    {
      id: 'refroidissement', title: 'Le refroidissement',
      html: `
<ul><li><b>Air</b> : simple, sans gel ni entretien, mais irrégulier, bruyant, insuffisant au ralenti et à l’arrêt.</li>
<li><b>Liquide</b> : circuit fermé <b>sous pression pour élever le point d’ébullition</b> (100 °C à l’air libre, ≈ 85 °C à 4 500 m, ≈ 115 °C sous 1,4 bar) et ne plus dépendre de la pression atmosphérique.</li>
<li>Liquide de refroidissement : caloporteur, antigel, anticorrosion, lubrifie la pompe à eau.</li>
<li><b>Bouchon du vase d’expansion</b> : limite la pression quand la température monte (≈ 0,8 à 1,7 bar) et <b>laisse entrer l’air pendant le refroidissement</b> (≈ 0,05 bar).</li>
<li>Consommation de liquide : joint de culasse, joints de chemises humides, durites, pastilles de dessablage, boues.</li></ul>`,
      retenir: ['Pressuriser le circuit = élever le point d’ébullition.', 'Bouchon : 2 soupapes (surpression et dépression).'],
      pieges: ['La pression du circuit ne sert PAS à faire circuler plus vite.'],
      memo: { cle: 'PRESSION = ÉBULLITION PLUS HAUTE', points: ['1,4 bar → ≈ 115 °C', 'Bouchon : limite la pression + laisse entrer l’air au refroidissement'], astuce: 'Cocotte-minute : sous pression, l’eau bout plus tard.' }
    },
    {
      id: 'injection', title: 'Alimentation et injection diesel',
      html: `
<ul><li>La pompe d’injection garantit : pression de pulvérisation, quantité (charge + demande), moment de l’injection.</li>
<li>Basse pression : préfiltre décanteur (eau, grosses impuretés), filtre principal, pompe d’alimentation. La <b>pré-pompe alimente la pompe au démarrage</b>.</li>
<li><b>Indice de cétane</b> : carburéacteur ≈ 42 · gasoil ≥ 51 · Extélium ≈ 52-53 (additif S-1750 pour relever celui du carburéacteur). Un cétane faible <b>augmente le délai d’auto-inflammation</b> → cognements, démarrage difficile, fumées.</li>
<li>Température limite : le gasoil se trouble puis bouche le filtre (limite de filtrabilité, point d’écoulement).</li>
<li>Aide au démarrage : bougies de préchauffage ou dispositif <b>Flamstart</b>.</li></ul>
<div class="tw"><table><tr><th>Pompe en ligne</th><th>Pompe rotative (VE Bosch)</th></tr>
<tr><td>1 élément de pompage par cylindre, gros moteurs (≥ 6 cyl.)</td><td>1 seul élément + distributeur, ≤ 6 cyl.</td></tr>
<tr><td>Lubrifiée huile moteur + gasoil ; pompe d’alimentation externe</td><td>Tout au gasoil ; pompe d’alimentation intégrée ; contient un <b>disque à cames</b></td></tr>
<tr><td>Flexibles dans l’ordre des CYLINDRES</td><td>Flexibles dans l’ordre de FONCTIONNEMENT (ex. 1-3-4-2)</td></tr></table></div>
<p>Pompe en ligne : entre la pré-course et la course utile se trouve la <b>course de détente</b>. Tuyaux HP : même longueur, même diamètre intérieur. Injecteur à téton : fuite interne ; à trous : fuite sur le siège. Contrôle à la pompe à tarer ; symptômes : fumée noire, claquement.</p>
<h3>Rampe commune</h3>
<p>Une pompe HP remplit une rampe commune à tous les injecteurs. Le calculateur règle la pression et pilote chaque injecteur : la <b>quantité injectée dépend du temps d’ouverture et de la pression</b>. Plusieurs injections par cycle (pilote, principale) : moins de bruit et de pollution.</p>
<div class="tw"><table><tr><th>Système</th><th>Monter la haute pression</th><th>Faire chuter la pression</th></tr>
<tr><td>Bosch 1ʳᵉ génération (CP1)</td><td>Régulateur de haute pression (la pompe débite toujours)</td><td>Ouverture du régulateur HP</td></tr>
<tr><td>Bosch 2ᵉ / 3ᵉ gén.</td><td>Régulateur de débit en entrée (+ régulateur HP en 3ᵉ)</td><td>Fermeture du régulateur de débit</td></tr>
<tr><td>Delphi</td><td>Régulateur de débit (IMV) — pas de régulateur HP</td><td>Impulsions très courtes sur les injecteurs vers le retour (décélération)</td></tr></table></div>
<ul><li><b>Accéléromètre Delphi</b> : capte les vibrations de combustion pour recaler la pré-injection périodiquement.</li>
<li><b>Capteur PMH</b> (vilebrequin) : régime + PMH des cylindres 1 et 4. <b>Capteur de phase</b> (arbre à cames) : position du 1ᵉʳ cylindre en compression.</li>
<li>Changement d’un injecteur-pompe : programmer son code (IMA) dans le calculateur.</li></ul>
<h3>Suralimentation</h3>
<ul><li>La pression maxi d’admission d’un turbo est limitée par la <b>wastegate</b>.</li>
<li>Turbo à géométrie variable : meilleur rendement, moins de consommation, moins de pollution.</li></ul>`,
      retenir: ['Pompe VE Bosch : un disque à cames.', 'Pompe en ligne : course de détente entre pré-course et course utile.', 'Capteur de phase = position du 1ᵉʳ cylindre.', 'Wastegate = limite la pression d’admission du turbo.'],
      pieges: ['Fiche mémoire « rampe hélicoïdale » et « course restante » : les réponses officielles sont « disque à cames » et « course de détente ».', 'Pompe en ligne : flexibles dans l’ordre des cylindres ; VE : ordre de fonctionnement.'],
      memo: { cle: 'QUANTITÉ = TEMPS D’OUVERTURE + PRESSION', flow: ['Pompe HP', 'Rampe commune', 'Calculateur règle la pression', 'Injecteurs pilotés électriquement'], points: ['Bosch CP1 : régulateur HP', 'Delphi : régulateur de débit IMV', 'Cétane faible → délai ↑ → cognements', 'Flamstart = aide au démarrage'], astuce: 'Phase = Premier cylindre ; PMH = cylindres 1 et 4.' }
    },
    {
      id: 'commonrail', title: 'Common rail Bosch et Delphi',
      html: `
<p>Source : tes fiches de révision « Common rail » et « Motorisation ».</p>
<h3>Système d’injection directe Bosch</h3>
<ul><li><b>Pompe d’alimentation basse pression</b> : 150 à 200 L/h, clapet de sécurité à <b>7 bar</b>.</li>
<li><b>Filtre à carburant</b> : pouvoir de filtration de 5 à 3 microns, élément thermostatique, refroidisseur.</li>
<li><b>Pompe haute pression</b> : clapet de sécurité — pression <b>inférieure à 0,8 bar = graissage</b> de la pompe ; <b>supérieure à 0,8 bar = alimentation</b> de la pompe. <b>3 éléments de pompage</b>, avec un <b>désactivateur du 3ᵉ piston</b> (évite la surchauffe du gazole). Régulateur HP.</li>
<li><b>Rampe commune haute pression</b> : capteur de pression du gazole, capteur de température du gazole, <b>limiteur de débit</b> (protège le moteur) : il coupe le débit de gazole en cas de grippage ouvert d’un injecteur ou de rupture de canalisation.</li></ul>
<h3>Débit injecté : 3 paramètres</h3>
<p><b>Débit injecté = temps d’ouverture de l’injecteur + pression dans la rampe + somme des sections des trous.</b></p>
<h3>L’injection pilote (pré-injection)</h3>
<ul><li><b>Principe</b> : injecter une petite quantité de carburant avant l’injection principale.</li>
<li><b>Rôle</b> : faire monter la température dans la chambre de combustion avant l’injection principale.</li>
<li><b>But</b> : réduire le délai d’auto-inflammation de l’injection principale, réduire les HC, la consommation et le bruit ; augmenter le couple et la puissance.</li>
<li>Au-delà de <b>2 000 tr/min</b>, il n’y a plus de pré-injection.</li></ul>
<h3>Les injecteurs</h3>
<div class="tw"><table><tr><th>Type</th><th>Contrôles</th><th>À savoir</th></tr>
<tr><td><b>Électromagnétique</b> (2 fils)</td><td>Résistance ≈ <b>0,5 Ω</b> ; continuité du faisceau</td><td>Codage en classes 1, 2, 3 (ou A, B, C ; jaune, rouge, bleu) : les injecteurs d’un même moteur doivent être de la même classe. Recodage = rentrer le <b>code IMA</b> dans le calculateur. Le temps d’alimentation électrique s’adapte à l’injecteur.</td></tr>
<tr><td><b>Piézo-électrique</b></td><td>Résistance ≈ <b>200 kΩ</b> ; capacité ≈ <b>4 µF</b> ; continuité du faisceau</td><td>10 bar dans l’injecteur pour gaver le circuit de l’actionneur piézo.</td></tr></table></div>
<h3>Common rail Delphi</h3>
<ul><li><b>Rail sphérique</b>.</li>
<li>Contrôle rapide : capteur de pression à <b>0,5 V contact mis</b> et <b>1 V au démarrage</b>, injecteurs à 0,5 Ω → HP bonne, circuit hydraulique bon.</li>
<li>Pas de régulateur HP : la HP se règle par le <b>régulateur de débit (IMV)</b> ; pour la faire chuter, <b>impulsions courtes sur les injecteurs vers le retour</b>.</li>
<li><b>Accéléromètre</b> (piézo, entre les cylindres 2 et 3) : repère le cylindre qui fait trop de bruit et permet au calculateur de modifier son débit → recale la pré-injection périodiquement.</li>
<li><b>Électrovanne régulateur de débit</b>, pilotée par signal <b>RCO</b> : normalement ouverte (bobine parallèle au connecteur) ou normalement fermée (connecteur incliné par rapport à la bobine). Contrôles : résistance <b>2,5 à 3,5 Ω</b>, continuité du faisceau, signal de commande à l’oscilloscope.</li></ul>
<div class="tw"><table><tr><th>Système</th><th>Monter la HP</th><th>Baisser la HP</th><th>Particularité</th></tr>
<tr><td>Bosch 1ʳᵉ gén.</td><td>Régulateur HP (sur la pompe)</td><td>Ouverture du régulateur HP</td><td>La pompe débite toujours au maxi</td></tr>
<tr><td>Bosch 2ᵉ gén.</td><td>Régulateur de débit (entrée pompe)</td><td>Fermeture du régulateur de débit</td><td>Moins d’échauffement</td></tr>
<tr><td>Bosch 3ᵉ gén.</td><td>Régulateur de débit + régulateur HP</td><td>Les deux</td><td>Régulation fine</td></tr>
<tr><td>Delphi</td><td>Régulateur de débit</td><td>Retours injecteurs (impulsions courtes)</td><td>Pas de régulateur HP, accéléromètre</td></tr></table></div>
<p><b>Pré-pompe</b> : garantit l’alimentation de la pompe HP au démarrage.</p>`,
      retenir: ['Débit injecté = temps d’ouverture + pression de rampe + sections des trous.', 'Pré-injection : chauffer la chambre → délai d’auto-inflammation, bruit, HC et conso en baisse ; plus de pré-injection au-delà de 2 000 tr/min.', 'Injecteur électromagnétique ≈ 0,5 Ω ; piézo ≈ 200 kΩ et 4 µF.', 'Limiteur de débit de la rampe : coupe le débit si un injecteur reste ouvert ou si une canalisation casse.', 'Clapet de la pompe HP Bosch : < 0,8 bar = graissage ; > 0,8 bar = alimentation.'],
      pieges: ['Delphi n’a pas de régulateur HP.', 'Injecteurs électromagnétiques d’un même moteur : même classe, sinon recodage IMA.'],
      memo: { cle: 'DÉBIT = TEMPS + PRESSION + TROUS', flow: ['Pompe BP (150–200 L/h, 7 bar)', 'Filtre 5 à 3 µm', 'Pompe HP (3 pistons)', 'Rampe (capteur P, capteur T°, limiteur de débit)', 'Injecteurs'], points: ['Électromagnétique 0,5 Ω · piézo 200 kΩ / 4 µF', 'Delphi : IMV + retours injecteurs', 'IMV : 2,5 à 3,5 Ω, pilotée en RCO'], astuce: 'La pré-injection, c’est allumer le barbecue avant d’y mettre la viande.' }
    },
    {
      id: 'capteurs-cr', title: 'Capteurs du common rail',
      html: `
<div class="tw"><table><tr><th>Capteur</th><th>Type</th><th>Signal</th><th>Contrôle</th></tr>
<tr><td><b>Régime / PMH</b> (vilebrequin)</td><td><b>Inductif, actif</b>, 2 fils</td><td>Sinusoïde de fréquence <b>et</b> d’amplitude variables avec la vitesse</td><td>Il génère son propre courant : on mesure sa <b>résistance</b> et celle du faisceau</td></tr>
<tr><td><b>Phase</b> (arbre à cames)</td><td><b>Effet Hall, passif</b>, 3 fils</td><td>Signal <b>carré</b> de fréquence variable, amplitude fixe (5 V), directement exploitable par le calculateur</td><td>Faisceau débranché : 5 V alim, 5 V signal, masse. Branché : signal 0 ou 5 V selon la cible. Continuité du faisceau</td></tr>
<tr><td><b>Pression de rail</b></td><td><b>Piézo-résistif, passif</b>, 3 fils</td><td>Tension proportionnelle à la pression : <b>0,5 à 4,5 V</b></td><td>Alim 5 V ; <b>0,5 V contact mis</b> ; <b>1 à 1,5 V au démarrage</b></td></tr>
<tr><td><b>Température (CTN)</b></td><td>Passif</td><td>T° ↑ → R ↓</td><td>Résistance élevée à basse température, faible à haute température ; continuité du faisceau</td></tr></table></div>
<ul><li>Capteur de régime Bosch : couronne du vilebrequin à <b>60 dents moins 2</b> ; le « top » est à 114° volant avant le PMH.</li>
<li>Capteur de phase : 2 cibles larges suivies de 2 cibles étroites ; <b>entrefer à respecter</b> (1,2 mm, tolérance +0 / +0,1 mm).</li>
<li>Élément piézo-résistif : stable au repos ; soumis à une pression, il se déséquilibre et génère une tension à ses bornes.</li>
<li><b>Actionneur en RCO</b> (rapport cyclique d’ouverture) : ex. 15 ms alimenté / 5 ms coupé = 75 % → le multimètre lit la moyenne : <b>75 % de 12 V = 9 V</b>.</li></ul>`,
      retenir: ['Régime : inductif, actif, sinusoïde (fréquence et amplitude variables) → mesurer sa résistance.', 'Phase : effet Hall, passif, carré 5 V.', 'Pression de rail : piézo-résistif, 0,5 V contact mis, 1 à 1,5 V au démarrage.', 'RCO 75 % sous 12 V → 9 V moyens.'],
      pieges: ['Le capteur inductif n’est pas alimenté : on ne cherche pas de 5 V dessus.'],
      memo: { cle: 'INDUCTIF = SINUS · HALL = CARRÉ · PIÉZO-RÉSISTIF = PRESSION', points: ['PMH : 60 − 2 dents', 'Phase : entrefer 1,2 mm', 'Rail : 0,5 V → 1–1,5 V au démarreur', 'CTN : chaud = R faible'], astuce: 'Le capteur inductif fabrique son courant ; les autres attendent leur 5 V.' }
    },
    {
      id: 'diag-hp', title: 'Diagnostic haute pression (Delphi, Bosch, Continental)',
      html: `
<p>Logigrammes de diagnostic « le moteur ne démarre pas ». On commence toujours par les <b>contrôles préliminaires</b>.</p>
<h3>Delphi, pompe DFP1</h3>
<ol><li><b>Filtre à gazole</b> colmaté → le changer.</li>
<li><b>Tension du capteur HP contact mis</b> : 0,5 V = capteur et ligne bons ; <b>&gt; 1 V</b> = capteur HS ou ligne en court-circuit.</li>
<li><b>Tension du capteur HP pendant l’action du démarreur</b> :
<ul><li><b>1 à 1,5 V</b> → circuits basse et haute pression bons → contrôler les capteurs PMH et d’arbre à cames.</li>
<li><b>Largement &gt; 1,5 V</b> → dysfonctionnement du régulateur de débit (<b>IMV</b>) → contrôler sa résistance, sa tension et son grippage.</li>
<li><b>0,5 à 0,9 V</b> (pression insuffisante) → suite ci-dessous.</li></ul></li>
<li>Contrôler l’<b>étanchéité des retours d’injecteurs</b> pendant le démarreur → fuite = injecteur(s) HS.</li>
<li>Pas de fuite → <b>étanchéité des aiguilles</b> d’injecteurs (bougies déposées) → fuite = injecteur(s) HS.</li>
<li>Pas de fuite → contrôler l’<b>IMV grippé fermé</b>.</li>
<li>IMV bon → contrôler le <b>clapet de sécurité HP</b> : grippé ouvert → le changer.</li>
<li>Tout est bon → <b>échange de la pompe haute pression</b>.</li></ol>
<h3>Continental</h3>
<p>Même démarche que Delphi :</p>
<ol><li>Filtre à gazole.</li>
<li>Capteur HP contact mis : 0,5 V bon ; &gt; 1 V = capteur HS ou ligne en court-circuit.</li>
<li>Au démarreur : <b>1 à 1,5 V</b> → circuits BP et HP bons → capteurs PMH et d’arbre à cames.</li>
<li><b>0,5 à 0,9 V</b> → étanchéité des retours d’injecteurs, puis des aiguilles (bougies déposées) → fuite sur un ou plusieurs injecteurs.</li>
<li>Pas de fuite → contrôler le <b>régulateur de débit</b> : tension, résistance (Ω) et grippage.</li>
<li>Régulateur bon → <b>clapet de sécurité HP</b> (grippé ouvert ?) → en dernier, échange de la pompe HP.</li></ol>
<h3>Bosch, pompe CP1</h3>
<ol><li><b>Signal du capteur HP contact mis</b> : 0,5 V = bon ; pas de tension ou largement &gt; 0,5 V → contrôler la ligne et le capteur.</li>
<li><b>Pendant le démarreur</b> : <b>U ≥ 1 V</b> → circuits BP et HP bons → vérifier le capteur PMH (résistance, entrefer, limaille, continuité du faisceau) puis le capteur de phase (alimentation, cible).</li>
<li><b>U &lt; 1 V</b> → vérifier la <b>pompe d’alimentation</b> et la pression avant/après le filtre : <b>ΔP maxi 0,3 bar</b> (≥ 0,3 bar → changer le filtre) ; pompe à l’arrêt → contrôler sa résistance et son alimentation.</li>
<li>Pompe et filtre bons → vérifier le <b>clapet de sécurité à l’entrée de la pompe HP</b> (grippé ?).</li>
<li>Contrôler l’<b>étanchéité des retours des porte-injecteurs</b> (non étanches → les changer tous), puis des injecteurs (bougies de préchauffage retirées).</li>
<li>Contrôler le <b>régulateur HP</b> : résistance ≈ <b>2 Ω</b>, alimentation, grippage.</li>
<li>Tout est bon → <b>test d’étanchéité de la pompe HP avec un rail bouché</b> → changer la pompe HP.</li></ol>`,
      images: [{ src: 'diag-delphi-dfp1.jpg', cap: 'Logigramme : diagnostic haute pression Delphi, pompe DFP1' }, { src: 'diag-bosch-cp1.jpg', cap: 'Logigramme : diagnostic rampe commune Bosch, pompe CP1' }, { src: 'diag-continental.jpg', cap: 'Logigramme : diagnostic haute pression Continental' }],
      retenir: ['Toujours commencer par les contrôles préliminaires (filtre).', 'Capteur HP contact mis = 0,5 V.', 'Delphi au démarreur : 1–1,5 V = HP bonne ; > 1,5 V = IMV ; 0,5–0,9 V = fuite (retours, aiguilles), IMV, clapet HP, puis pompe.', 'Bosch au démarreur : ≥ 1 V = HP bonne → capteurs PMH/phase ; < 1 V = alimentation, filtre (ΔP 0,3 bar), clapet, fuites, régulateur HP (≈ 2 Ω), pompe.'],
      pieges: ['On ne change la pompe HP qu’en dernier, quand tout le reste est bon.'],
      memo: { cle: 'DU PLUS SIMPLE AU PLUS CHER', flow: ['Filtre', 'Capteur HP contact mis (0,5 V)', 'Capteur HP au démarreur', 'Fuites retours / injecteurs', 'Régulateur (IMV / HP)', 'Clapet de sécurité', 'Pompe HP'], points: ['Delphi : > 1,5 V → IMV', 'Bosch : ΔP filtre ≤ 0,3 bar', 'Régulateur HP Bosch ≈ 2 Ω'], astuce: 'Pas assez de pression au démarreur ? Cherche d’abord où elle s’échappe.' }
    },
    {
      id: 'carburants', title: 'Carburants et comportement à froid',
      html: `
<h3>Les hydrocarbures (CnH2n+2)</h3>
<ul><li>État gazeux : méthane, propane C3H8, butane C4H10.</li>
<li>Essences : heptane C7H16, octane C8H18.</li>
<li>Gazole : cétane C16H34, pour sa faculté à s’auto-enflammer.</li></ul>
<h3>Indice de cétane</h3>
<p>Le gazole est défini par son <b>indice de cétane</b> : son aptitude à s’auto-enflammer. Il doit être <b>≥ 51</b>. En dessous : délai d’allumage allongé → <b>difficulté de démarrage à froid, cognements, fumées</b>.</p>
<h3>Comportement en basse température</h3>
<ul><li><b>Point de trouble (PT)</b> : les premiers cristaux de paraffine apparaissent.</li>
<li><b>Température limite de filtrabilité (TLF)</b> : les cristaux bouchent le filtre.</li>
<li><b>Point d’écoulement (PE)</b> : le gazole est figé.</li>
<li>Ordre : <b>PE &lt; TLF &lt; PT</b> (en refroidissant, on passe d’abord le point de trouble).</li></ul>
<h3>Le carburéacteur utilisé dans un diesel</h3>
<ul><li>TLF = −50 °C · indice de cétane ≈ 42 · viscosité 1,35 mm²/s (2,4 pour le gazole) → plus de fuites dans les pompes.</li>
<li>Pouvoir lubrifiant très mauvais ; pouvoir détergent très élevé (« nettoyage » des tuyauteries).</li>
<li>Problèmes : usure du système d’injection, démarrage difficile ou instabilité. (L’additif S-1750 relève son indice de cétane.)</li></ul>
<h3>La boucle de régulation</h3>
<p>3 paramètres : la vitesse du moteur, la charge à vaincre, le débit de la pompe d’injection. Le conducteur agit sur l’accélérateur → le régulateur adapte le débit selon la surcharge, les vitesses mini/maxi, la correction de débit, la pression d’admission…</p>`,
      retenir: ['Cétane ≥ 51 ; en dessous : démarrage difficile, cognements, fumées.', 'PT : premiers cristaux ; TLF : filtre bouché ; PE : gazole figé ; PE < TLF < PT.', 'Carburéacteur : TLF −50 °C, cétane ≈ 42, faible viscosité et mauvais pouvoir lubrifiant → usure de l’injection.'],
      pieges: ['Le point de trouble arrive en premier quand la température baisse, le point d’écoulement en dernier.'],
      memo: { cle: 'PE < TLF < PT', flow: ['Point de trouble : cristaux', 'TLF : filtre bouché', 'Point d’écoulement : figé'], points: ['Cétane ≥ 51', 'Carburéacteur : cétane 42, TLF −50 °C', 'Gazole = cétane C16H34'], astuce: 'Trouble → Filtre → Figé : ça se Trouble, ça Filtre mal, puis ça Fige.' }
    },
    {
      id: 'depollution', title: 'Dépollution',
      html: `
<div class="tw"><table><tr><th>Organe</th><th>Rôle</th></tr>
<tr><td>Catalyseur d’oxydation (diesel)</td><td>HC et CO</td></tr>
<tr><td>Catalyseur 3 voies</td><td>HC, CO et NOx</td></tr>
<tr><td>FAP</td><td>Filtre puis brûle les suies ; régénération par élévation de la température des gaz (≈ 550 °C)</td></tr>
<tr><td>EGR</td><td>Diminue les NOx en abaissant la température de combustion</td></tr>
<tr><td>SCR (AdBlue)</td><td>NOx ; actif si T° catalyseur &gt; 180 °C, couple &gt; 5 %, T° moteur &gt; 40 °C, régime &gt; 400 tr/min</td></tr></table></div>
<ul><li><b>4 principaux polluants</b> : CO (mortel), HC (cancérigènes), NOx (irritants), particules de carbone (cancérigènes).</li>
<li><b>Pot catalytique</b> : 2 réactions chimiques — réduction des NOx et oxydation du CO et des HC. Diesel (oxydation) : CO et HC ; essence (3 voies) : CO, HC et NOx.</li>
<li><b>EGR</b> : la recirculation des gaz se fait à partir de ≈ <b>1 300 °C</b> ; on fait recirculer une partie des gaz d’échappement dans l’admission pour baisser la température de combustion (moins de NOx).</li>
<li><b>FAP</b> : filtre les particules (tamis de 1 micron) puis les brûle.</li>
<li><b>SCR / AdBlue</b> : urée 32,5 % + eau déminéralisée 67,5 % ; libère de l’ammoniac (NH3) qui réduit les NOx. Durée de vie du catalyseur ≈ 1 million de km, capteur NOx ≈ 500 000 km.</li>
<li>CO et HC plus importants avec un <b>dosage riche</b> (manque d’air pour tout brûler).</li>
<li>Le diesel rejette plus d’oxydes d’azote qu’un moteur essence.</li></ul>`,
      retenir: ['FAP : régénération à ≈ 550 °C par élévation de la température des gaz.', 'EGR : moins de NOx en baissant la température de combustion.', 'SCR : 180 °C cata, 5 % couple, 40 °C moteur, 400 tr/min.'],
      pieges: ['Catalyseur d’oxydation diesel = HC et CO seulement ; le 3 voies traite aussi les NOx.'],
      memo: { cle: 'NOx = HAUTE TEMPÉRATURE', points: ['EGR refroidit la combustion → moins de NOx', 'FAP 550 °C', 'SCR/AdBlue : 180 · 5 · 40 · 400'], astuce: 'AdBlue : « 180 degrés au cata, 40 au moteur, 400 tours, 5 % de couple ».' }
    }
  ],
  questions: [
    { l: 'caracteristiques', q: 'La puissance réelle mesurée au banc est proportionnelle…', c: ['Au couple et à la vitesse de rotation', 'À la cylindrée seule', 'Au rapport volumétrique', 'À la consommation'], e: 'P = C × ω : la puissance est le produit du couple par la vitesse angulaire.', src: 'QCM moteur Q2' },
    { l: 'caracteristiques', q: 'Rapport volumétrique courant d’un moteur diesel ?', c: ['13/1 à 24/1', '6/1 à 12/1', '2/1 à 5/1', '30/1 à 40/1'], e: 'Le diesel a besoin d’une forte compression pour chauffer l’air jusqu’à l’auto-inflammation. Essence : 6 à 12.', r: 'ρ = (Vu + v) / v.' },
    { l: 'caracteristiques', q: 'Régularité cyclique d’un moteur 4 temps 6 cylindres (R = 720° / n) ?', c: ['120°', '180°', '90°', '60°'], e: 'Un cycle complet = 2 tours de vilebrequin = 720°. R = 720 / 6 = 120° entre deux combustions (4 cylindres : 180°).', r: 'R = 720° / n.' },
    { l: 'caracteristiques', q: 'Un cycle moteur 4 temps complet correspond à :', c: ['2 tours de vilebrequin (720°)', '1 tour de vilebrequin (360°)', '4 tours de vilebrequin', '2 tours d’arbre à cames'], e: 'Admission, compression, combustion-détente, échappement : 4 courses de piston = 2 tours de vilebrequin = 1 tour d’arbre à cames.' },
    { l: 'caracteristiques', q: 'Taux de remplissage d’un moteur atmosphérique ?', c: ['Entre 0,7 et 0,9', 'Entre 0,9 et 1,2', 'Exactement 1', 'Entre 0,3 et 0,5'], e: 'Rapport entre la quantité de mélange réellement admise et la quantité théorique. ≈ 0,9 au ralenti, ≈ 0,7 à régime élevé.' },
    { l: 'caracteristiques', q: 'Un moteur à course longue (A < C) est plutôt :', c: ['Un moteur lent', 'Un moteur rapide', 'Un moteur super-carré', 'Un moteur 2 temps'], e: 'Alésage < course : moteur à course longue (moteur lent). A = C : carré ; A > C : super-carré.' },
    { l: 'caracteristiques', q: 'Un moteur dont l’alésage est inférieur à la course est dit :', c: ['À course longue', 'Carré', 'Super-carré', 'Isochore'], e: 'A < C = course longue ; A = C = carré ; A > C = super-carré.' },
    { l: 'caracteristiques', q: 'Pour calculer le rapport volumétrique ρ, on utilise :', c: ['La cylindrée unitaire et le volume de la chambre de combustion', 'La cylindrée totale et l’alésage', 'La course et le régime', 'La cylindrée totale seule'], e: 'ρ = (Vu + v) / v, avec v le volume de la chambre de combustion.', w: 'Ne pas utiliser Vtot.' },
    { l: 'cycle', q: 'Comment appelle-t-on la combustion qui continue après la fin de l’injection ?', c: ['Combustion diffusante', 'Combustion isochore', 'Cliquetis', 'Auto-allumage'], e: 'Une fois l’injection terminée, le carburant restant continue de brûler en se diffusant dans l’air.', src: 'Test final Q5 (officiel)' },
    { l: 'cycle', q: 'Lors d’une compression adiabatique, la pression monte…', c: ['Lentement au début, rapidement près du PMH', 'Rapidement au début, lentement près du PMH', 'De façon constante', 'Uniquement après le PMH'], e: 'Le volume diminue de plus en plus vite en valeur relative à l’approche du PMH.', src: 'QCM moteur Q7' },
    { l: 'cycle', q: 'Les cognements diesel sont augmentés par…', c: ['Une avance à l’injection trop grande', 'Un retard à l’injection', 'Un indice de cétane élevé', 'Un gasoil trop froid'], e: 'Trop d’avance (ou cétane trop faible) : plus de carburant s’accumule avant l’inflammation, qui devient brutale.', src: 'QCM moteur Q8' },
    { l: 'cycle', q: 'Le cliquetis (moteur essence) apparaît…', c: ['Après l’étincelle', 'Avant l’étincelle', 'Pendant l’admission', 'Uniquement au ralenti'], e: 'C’est l’auto-allumage d’une partie du mélange après l’étincelle de la bougie.', src: 'QCM moteur Q9' },
    { l: 'cycle', q: 'Comparé à un moteur essence, un diesel rejette…', c: ['Plus d’oxydes d’azote (NOx)', 'Plus de monoxyde de carbone (CO)', 'Moins de NOx', 'Autant de chaque polluant'], e: 'Combustion à haute température avec excès d’air : plus de NOx. L’essence rejette plus de CO.', src: 'QCM moteur Q10' },
    { l: 'distribution', q: 'Les gaz brûlés qui sortent vite et favorisent l’aspiration du mélange, c’est :', c: ['Le balayage', 'Le cliquetis', 'La combustion diffusante', 'L’affolement des soupapes'], e: 'Balayage : admission et échappement ouverts ensemble autour du PMH (croisement des soupapes).', src: 'Test final Q1 (officiel)' },
    { l: 'distribution', q: 'À quelle vitesse tourne l’arbre à cames par rapport au vilebrequin ?', c: ['À demi-vitesse', 'À la même vitesse', 'Deux fois plus vite', 'Au quart de la vitesse'], e: 'Un cycle 4 temps = 2 tours de vilebrequin, chaque soupape s’ouvre une fois : l’arbre à cames fait 1 tour.' },
    { l: 'distribution', q: 'Régularité cyclique d’un moteur 6 cylindres ?', c: ['120°', '180°', '60°', '360°'], e: 'R = 720° / n = 720 / 6 = 120°. 4 cylindres → 180°.', w: 'On divise 720° (2 tours), jamais 360°.' },
    { l: 'distribution', q: 'Pourquoi faut-il un jeu aux soupapes ?', c: ['Parce que la soupape se dilate plus que le bloc', 'Pour augmenter le remplissage', 'Pour réduire le bruit', 'Pour la lubrification'], e: 'À chaud la soupape s’allonge : sans jeu, elle ne fermerait plus complètement.' },
    { l: 'distribution', q: 'Rôle de l’AOE (avance à l’ouverture de l’échappement) ?', c: ['Avancer la chute de pression et limiter la contre-pression', 'Améliorer le remplissage', 'Profiter de l’inertie des gaz frais', 'Avoir la pression maxi après le PMH'], e: 'On ouvre l’échappement avant le PMB pour que la pression chute avant la remontée du piston.', r: 'AOA → remplissage ; RFA → inertie des gaz frais ; RFE → vider le cylindre.' },
    { l: 'graissage', q: 'Quel type de pompe à huile était demandé au test final ?', c: ['À rotor', 'Centrifuge', 'À membrane', 'À piston axial'], e: 'Pompes à huile : à engrenage, à rotor ou à palettes. Réponse officielle : à rotor.', src: 'Test final Q2 (officiel)' },
    { l: 'graissage', q: 'Pression d’huile courante d’un moteur diesel ?', c: ['4 à 8 bar', '2 à 4 bar', '0,5 à 1 bar', '15 à 20 bar'], e: 'Diesel : 4–8 bar ; essence : 2–4 bar.' },
    { l: 'graissage', q: 'Quel type de graissage offre un meilleur refroidissement et convient aux moteurs inclinés ?', c: ['Le carter sec', 'Le barbotage', 'L’huile perdue', 'Sous pression normale'], e: 'Le carter sec (réservoir séparé) évite le déjaugeage mais est plus complexe.' },
    { l: 'refroidissement', q: 'Rôle de la soupape du bouchon de vase d’expansion ?', c: ['Limiter la pression quand la température augmente et laisser entrer l’air au refroidissement', 'Faire circuler le liquide plus vite', 'Ajouter de l’antigel automatiquement', 'Purger l’air en permanence'], e: 'Deux fonctions : soupape de surpression (≈ 0,8 à 1,7 bar) et soupape de dépression (≈ 0,05 bar).', src: 'Test final Q3 (officiel)' },
    { l: 'refroidissement', q: 'Pourquoi le circuit de refroidissement est-il mis sous pression ?', c: ['Pour élever le point d’ébullition', 'Pour faire circuler le liquide plus vite', 'Pour lubrifier la pompe', 'Pour éviter le gel'], e: 'Sous 1,4 bar, le liquide bout vers 115 °C au lieu de 100 °C, et ne dépend plus de l’altitude.', w: 'La pression ne sert PAS à accélérer la circulation.' },
    { l: 'refroidissement', q: 'Inconvénient du refroidissement par air ?', c: ['Irrégulier, bruyant, insuffisant au ralenti et à l’arrêt', 'Risque de gel', 'Entretien important', 'Consommation de liquide'], e: 'Avantages : simple, sans gel ni entretien. Inconvénients : irrégulier, bruyant, insuffisant à bas régime.' },
    { l: 'injection', q: 'Dispositif d’aide au démarrage demandé au test final ?', c: ['Flamstart', 'Wastegate', 'EGR', 'IMV'], e: 'Aide au démarrage diesel : bougies de préchauffage ou Flamstart.', src: 'Test final Q6 (officiel)' },
    { l: 'injection', q: 'Pompe en ligne : entre la pré-course et la course utile, on trouve…', c: ['La course de détente', 'La course restante', 'La course de refoulement', 'Le temps mort'], e: 'Réponse officielle du test final : la course de détente.', w: 'La fiche mémoire disait « course restante » : c’est tranché, retiens « course de détente ».', src: 'Test final Q7 (officiel)' },
    { l: 'injection', q: 'Dans une pompe rotative VE Bosch, on trouve :', c: ['Un disque à cames', 'Une rampe hélicoïdale', 'Un élément de pompage par cylindre', 'Un régulateur de débit IMV'], e: 'La VE a un seul élément de pompage entraîné par un disque à cames, et un distributeur.', w: 'La fiche mémoire disait « rampe hélicoïdale » : tranché, c’est le disque à cames.', src: 'Test final Q8 (officiel)' },
    { l: 'injection', q: 'Quel organe limite la pression d’admission d’un turbo ?', c: ['La wastegate', 'L’EGR', 'Le FAP', 'Le régulateur de débit'], e: 'La wastegate dérive une partie des gaz d’échappement hors de la turbine.', src: 'Test final Q9 (officiel)' },
    { l: 'injection', q: 'Quel capteur donne la position du 1ᵉʳ cylindre en compression ?', c: ['Le capteur de phase (arbre à cames)', 'Le capteur PMH (vilebrequin)', 'L’accéléromètre', 'Le capteur MAP'], e: 'Le capteur PMH donne le régime et le PMH des cylindres 1 et 4 ; seul le capteur de phase distingue le cylindre 1 en compression.', src: 'Test final Q10 (officiel)' },
    { l: 'injection', q: 'Le capteur PMH (vilebrequin) permet de connaître :', c: ['Le régime et le PMH des cylindres 1 et 4', 'La position du 1ᵉʳ cylindre en compression', 'La pression de rampe', 'La température du gasoil'], e: 'Sur un tour de vilebrequin, les cylindres 1 et 4 passent ensemble au PMH.', src: 'Corrigé UV2 Q39' },
    { l: 'injection', q: 'Un faible indice de cétane…', c: ['Augmente le délai d’auto-inflammation', 'Diminue le délai d’auto-inflammation', 'Réduit les cognements', 'Facilite le démarrage à froid'], e: 'Cétane faible → délai plus long → cognements, démarrage difficile, fumées.', src: 'QCM moteur Q4, UV2 Q37' },
    { l: 'injection', q: 'Bosch 1ʳᵉ génération (CP1) : comment monte-t-on la haute pression ?', c: ['Avec le régulateur de haute pression', 'Avec le régulateur de débit IMV', 'Par des impulsions sur les injecteurs', 'Avec la wastegate'], e: 'Sur la CP1 la pompe débite toujours : c’est le régulateur HP qui fait monter ou chuter la pression.', src: 'Corrigé UV2 Q31' },
    { l: 'injection', q: 'Delphi : comment monte-t-on la haute pression ?', c: ['Avec le régulateur de débit (IMV) en entrée de pompe', 'Avec le régulateur de haute pression', 'Avec l’accéléromètre', 'Avec la pré-pompe'], e: 'Delphi n’a pas de régulateur HP : la pression est gérée par le débit admis dans la pompe (IMV).', src: 'Corrigé UV2 Q33' },
    { l: 'injection', q: 'Delphi : comment faire chuter rapidement la HP en décélération ?', c: ['Agir sur les retours des injecteurs (impulsions très courtes)', 'Ouvrir le régulateur HP', 'Couper la pré-pompe', 'Ouvrir la wastegate'], e: 'Des impulsions trop courtes pour injecter envoient du gasoil vers le retour et vident la rampe.', w: 'La banque Uv1 répondait « régulateur de débit » : c’est la régulation courante, pas la décharge rapide.', src: 'Corrigé UV2 Q34' },
    { l: 'injection', q: 'À quoi sert l’accéléromètre sur un système Delphi ?', c: ['Adapter (recaler) la pré-injection', 'Mesurer la vitesse du véhicule', 'Détecter le PMH', 'Réguler la pression de rampe'], e: 'Il capte les vibrations de combustion pour recaler périodiquement la pré-injection.', src: 'Corrigé UV2 Q38' },
    { l: 'injection', q: 'Rôle de la pré-pompe ?', c: ['Alimenter suffisamment la pompe au démarrage', 'Créer la haute pression', 'Refroidir le gasoil', 'Réguler la pression de rampe'], e: 'Elle assure l’alimentation de la pompe haute pression lors du démarrage.', src: 'Corrigé UV2 Q40' },
    { l: 'injection', q: 'Sur une rampe commune, de quoi dépend la quantité injectée ?', c: ['Du temps d’ouverture de l’injecteur et de la haute pression', 'Uniquement du régime moteur', 'De la position de la rampe hélicoïdale', 'Du tarage du ressort d’injecteur'], e: 'Plus l’injecteur reste ouvert longtemps et plus la pression est haute, plus on injecte.', src: 'Corrigé UV2 Q32' },
    { l: 'injection', q: 'Pompe rotative : dans quel ordre sont branchés les flexibles HP ?', c: ['Dans l’ordre de fonctionnement (ex. 1-3-4-2)', 'Dans l’ordre des cylindres (1-2-3-4)', 'Dans n’importe quel ordre', 'Du plus court au plus long'], e: 'La pompe en ligne se branche dans l’ordre des cylindres ; la rotative dans l’ordre de fonctionnement.' },
    { l: 'depollution', q: 'Température de régénération d’un FAP ?', c: ['≈ 550 °C', '≈ 180 °C', '≈ 900 °C', '≈ 300 °C'], e: 'Le FAP brûle les suies en élevant la température des gaz d’échappement vers 550 °C.', src: 'Test final Q4 (officiel)' },
    { l: 'depollution', q: 'Le FAP se régénère…', c: ['Par l’élévation de la température des gaz d’échappement', 'Par injection d’AdBlue', 'Par ouverture de l’EGR', 'Par lavage à l’eau'], e: 'Il filtre puis brûle les suies à haute température.', src: 'QCM moteur Q1' },
    { l: 'depollution', q: 'L’EGR diminue les NOx…', c: ['En diminuant la température de combustion', 'En augmentant la température de combustion', 'En injectant de l’AdBlue', 'En filtrant les suies'], e: 'Les NOx se forment à haute température : réintroduire des gaz brûlés refroidit la combustion.', src: 'QCM moteur Q3' },
    { l: 'depollution', q: 'CO et HC sont plus importants avec…', c: ['Un dosage riche', 'Un dosage pauvre', 'Un moteur chaud', 'Un EGR ouvert'], e: 'Mélange riche = manque d’air pour brûler tout le carburant.', src: 'QCM moteur Q5' },
    { l: 'depollution', q: 'Laquelle n’est PAS une condition d’activation du SCR (AdBlue) ?', c: ['Régime moteur > 2 000 tr/min', 'Température du catalyseur > 180 °C', 'Couple > 5 %', 'Température moteur > 40 °C'], e: 'Conditions : T° cata > 180 °C, couple > 5 %, T° moteur > 40 °C, régime > 400 tr/min.' },
    { l: 'depollution', q: 'Un catalyseur d’oxydation diesel traite :', c: ['HC et CO', 'HC, CO et NOx', 'Les suies', 'Uniquement les NOx'], e: 'Le 3 voies (essence) traite aussi les NOx ; l’oxydation diesel seulement HC et CO.', src: 'Corrigé UV2 Q36' },
    { l: 'commonrail', q: 'Les 3 paramètres qui déterminent le débit injecté ?', c: ['Temps d’ouverture de l’injecteur, pression dans la rampe, somme des sections des trous', 'Régime, charge, température', 'Pression de gavage, cétane, température', 'Temps d’ouverture seulement'], e: 'Débit injecté = temps d’ouverture + pression de rampe + sections des trous.' },
    { l: 'commonrail', q: 'Rôle de l’injection pilote (pré-injection) ?', c: ['Faire monter la température de la chambre avant l’injection principale', 'Refroidir la chambre de combustion', 'Nettoyer les injecteurs', 'Augmenter la pression de rampe'], e: 'But : réduire le délai d’auto-inflammation de l’injection principale, le bruit, les HC et la consommation ; plus de couple et de puissance.' },
    { l: 'commonrail', q: 'Au-delà de quel régime n’y a-t-il plus de pré-injection ?', c: ['2 000 tr/min', '800 tr/min', '4 500 tr/min', 'Il y en a toujours'], e: 'Selon ta fiche common rail.' },
    { l: 'commonrail', q: 'Rôle du limiteur de débit sur la rampe commune ?', c: ['Couper le débit si un injecteur reste grippé ouvert ou si une canalisation casse (protège le moteur)', 'Réguler la haute pression', 'Mesurer la température du gazole', 'Alimenter la pompe au démarrage'], e: 'La rampe porte aussi le capteur de pression et le capteur de température du gazole.' },
    { l: 'commonrail', q: 'Clapet de sécurité de la pompe HP Bosch : que se passe-t-il sous 0,8 bar ?', c: ['Le gazole sert seulement au graissage de la pompe', 'La pompe est alimentée', 'Le moteur s’arrête', 'La rampe se vide'], e: 'Sous 0,8 bar : graissage ; au-dessus de 0,8 bar : alimentation de la pompe.' },
    { l: 'commonrail', q: 'Pompe HP Bosch : à quoi sert le désactivateur du 3ᵉ piston ?', c: ['Éviter la surchauffe du gazole quand on n’a pas besoin de tout le débit', 'Augmenter la pression maxi', 'Démarrer à froid', 'Alimenter la pré-pompe'], e: 'La pompe a 3 éléments de pompage ; couper le 3ᵉ limite le débit inutile qui chauffe le gazole.' },
    { l: 'commonrail', q: 'Résistance d’un injecteur électromagnétique ?', c: ['≈ 0,5 Ω', '≈ 200 kΩ', '≈ 2,5 à 3,5 Ω', '≈ 60 Ω'], e: 'Piézo : ≈ 200 kΩ et 4 µF ; électrovanne de débit Delphi : 2,5 à 3,5 Ω.' },
    { l: 'commonrail', q: 'Contrôles d’un injecteur piézo-électrique ?', c: ['Résistance ≈ 200 kΩ, capacité ≈ 4 µF, continuité du faisceau', 'Résistance ≈ 0,5 Ω seulement', 'Tension de 5 V sur le signal', 'Pression de tarage à la pompe à tarer seulement'], e: 'Un élément piézo se comporte comme un condensateur : on contrôle aussi sa capacité.' },
    { l: 'commonrail', q: 'Injecteurs électromagnétiques codés en classes (1, 2, 3 / A, B, C). Règle ?', c: ['Les injecteurs d’un même moteur doivent être de la même classe, sinon recodage (code IMA)', 'Chaque cylindre a une classe différente', 'Les classes ne comptent pas', 'On mélange les classes pour équilibrer'], e: 'Recodage = rentrer le code IMA de l’injecteur dans le calculateur.' },
    { l: 'commonrail', q: 'Common rail Delphi : comment se règle la haute pression ?', c: ['Par le régulateur de débit (IMV), et on la fait chuter par des impulsions courtes vers le retour des injecteurs', 'Par un régulateur HP sur la rampe', 'Par le clapet de sécurité de 7 bar', 'Par la pré-pompe'], e: 'Delphi n’a pas de régulateur HP.' },
    { l: 'commonrail', q: 'Rôle de l’accéléromètre Delphi ?', c: ['Repérer le cylindre qui fait trop de bruit et permettre au calculateur de corriger son débit (recalage de la pré-injection)', 'Mesurer la vitesse du véhicule', 'Mesurer la pression de rampe', 'Détecter le PMH'], e: 'Capteur piézo placé entre les cylindres 2 et 3.' },
    { l: 'commonrail', q: 'Électrovanne régulateur de débit Delphi : contrôles ?', c: ['Résistance 2,5 à 3,5 Ω, continuité du faisceau, signal RCO à l’oscilloscope', 'Résistance 200 kΩ et capacité 4 µF', 'Tension de 5 V contact mis', 'Pression de 0,8 bar'], e: 'Elle est pilotée en RCO : le multimètre ne voit que la moyenne, l’oscilloscope montre le signal.' },
    { l: 'commonrail', q: 'Bosch 2ᵉ génération : comment fait-on monter la HP ?', c: ['Avec le régulateur de débit en entrée de pompe', 'Avec le régulateur HP sur la pompe', 'Avec les retours injecteurs', 'Avec l’accéléromètre'], e: '1ʳᵉ gén. : régulateur HP ; 2ᵉ : régulateur de débit (moins d’échauffement) ; 3ᵉ : les deux (régulation fine) ; Delphi : régulateur de débit.' },
    { l: 'commonrail', q: 'Bosch 1ʳᵉ génération : particularité de la pompe HP ?', c: ['Elle débite toujours au maxi (l’excédent part par le régulateur HP)', 'Elle n’a pas de régulateur', 'Elle se désactive au ralenti', 'Elle est pilotée par un accéléromètre'], e: 'D’où plus d’échauffement du gazole qu’en 2ᵉ génération.' },
    { l: 'capteurs-cr', q: 'Capteur de régime (PMH) du common rail : type et signal ?', c: ['Inductif, actif : sinusoïde de fréquence et d’amplitude variables', 'Effet Hall, passif : signal carré 5 V', 'Piézo-résistif : 0,5 à 4,5 V', 'CTN : résistance variable'], e: 'Il génère son propre courant : on mesure sa résistance et celle du faisceau.' },
    { l: 'capteurs-cr', q: 'Capteur de phase à effet Hall : quel signal ?', c: ['Carré, fréquence variable, amplitude fixe (5 V)', 'Sinusoïdal, amplitude variable', 'Continu proportionnel à la pression', 'Aucun signal, c’est un contacteur'], e: 'Signal directement exploitable par le calculateur ; entrefer à respecter (1,2 mm).' },
    { l: 'capteurs-cr', q: 'Capteur de pression de rail : tension contact mis, moteur arrêté ?', c: ['≈ 0,5 V', '≈ 5 V', '≈ 12 V', '0 V'], e: 'Piézo-résistif alimenté en 5 V : signal de 0,5 V (sans pression) à 4,5 V ; 1 à 1,5 V au démarrage.' },
    { l: 'capteurs-cr', q: 'Capteur de pression de rail : tension normale pendant l’action du démarreur ?', c: ['1 à 1,5 V', '0,5 V', '4,5 V', '12 V'], e: 'La pression monte au démarreur : la tension passe de 0,5 V à 1–1,5 V.' },
    { l: 'capteurs-cr', q: 'Couronne du capteur de régime Bosch ?', c: ['60 dents moins 2 dents', '4 cibles', '30 dents', '120 dents'], e: 'L’absence de 2 dents donne le repère ; le top est à 114° volant avant le PMH.' },
    { l: 'capteurs-cr', q: 'Actionneur piloté en RCO : 15 ms alimenté, 5 ms coupé, sous 12 V. Tension moyenne lue au multimètre ?', c: ['9 V', '12 V', '3 V', '6 V'], e: 'Rapport cyclique = 15 / 20 = 75 % → 75 % de 12 V = 9 V.' },
    { l: 'capteurs-cr', q: 'Sonde CTN de température : quand la température monte…', c: ['Sa résistance baisse', 'Sa résistance monte', 'Sa tension monte', 'Rien ne change'], e: 'CTN : résistance élevée à basse température, faible à haute température.' },
    { l: 'diag-hp', q: 'Delphi DFP1 : capteur HP contact mis, on lit plus de 1 V. Diagnostic ?', c: ['Capteur HS ou ligne en court-circuit', 'Capteur et ligne bons', 'IMV défectueux', 'Injecteur qui fuit'], e: 'Contact mis, sans pression, le capteur doit donner 0,5 V.' },
    { l: 'diag-hp', q: 'Delphi DFP1 : pendant le démarreur, le capteur HP donne 1 à 1,5 V. Conclusion ?', c: ['Circuits basse et haute pression en bon état → contrôler les capteurs PMH et d’arbre à cames', 'Pompe HP à changer', 'IMV défectueux', 'Injecteurs qui fuient'], e: 'La pression monte : le problème de démarrage vient d’ailleurs.' },
    { l: 'diag-hp', q: 'Delphi DFP1 : pendant le démarreur, le capteur HP donne largement plus de 1,5 V. Élément à contrôler ?', c: ['Le régulateur de débit (IMV) : résistance, tension, grippage', 'Le filtre à gazole', 'Les retours d’injecteurs', 'Le capteur de PMH'], e: 'Trop de pression au démarreur : l’IMV ne régule pas.' },
    { l: 'diag-hp', q: 'Delphi DFP1 : 0,5 à 0,9 V au démarreur (pression insuffisante). Premier contrôle ?', c: ['L’étanchéité des retours d’injecteurs pendant l’action du démarreur', 'Changer la pompe HP', 'Changer le capteur HP', 'Contrôler le capteur de phase'], e: 'Ensuite : étanchéité des aiguilles (bougies déposées), IMV grippé fermé, clapet de sécurité HP, et en dernier la pompe HP.' },
    { l: 'diag-hp', q: 'Bosch CP1 : pendant le démarreur, le capteur HP donne moins de 1 V. Que contrôler d’abord ?', c: ['La pompe d’alimentation et la chute de pression du filtre (ΔP maxi 0,3 bar)', 'Le capteur de phase', 'La pompe HP directement', 'Le calculateur'], e: 'Puis le clapet de sécurité d’entrée de pompe HP, les retours des porte-injecteurs, les injecteurs, le régulateur HP (≈ 2 Ω), et en dernier la pompe HP.' },
    { l: 'diag-hp', q: 'Bosch CP1 : chute de pression à travers le filtre à gazole ≥ 0,3 bar. Que faire ?', c: ['Changer le filtre', 'Changer la pompe HP', 'Changer les injecteurs', 'Rien, c’est normal'], e: 'ΔP maxi admis : 0,3 bar.' },
    { l: 'diag-hp', q: 'Bosch CP1 : résistance normale du régulateur HP ?', c: ['≈ 2 Ω', '≈ 0,5 Ω', '≈ 200 kΩ', '≈ 60 Ω'], e: 'On contrôle aussi son alimentation et son état mécanique (grippage).' },
    { l: 'diag-hp', q: 'Dans les logigrammes de diagnostic HP, quand change-t-on la pompe haute pression ?', c: ['En dernier, quand tous les autres contrôles sont bons', 'En premier', 'Dès que le moteur ne démarre pas', 'Après le filtre'], e: 'On va du plus simple au plus coûteux ; chez Bosch, test d’étanchéité de la pompe avec un rail bouché avant de la changer.' },
    { l: 'diag-hp', q: 'Continental : 0,5 à 0,9 V au démarreur, aucune fuite aux retours ni aux aiguilles d’injecteurs. Contrôle suivant ?', c: ['Le régulateur de débit : tension, résistance et grippage', 'Changer la pompe HP', 'Le capteur de phase', 'Le filtre à gazole'], e: 'Puis, si le régulateur est bon, le clapet de sécurité HP ; la pompe HP en dernier.' },
    { l: 'diag-hp', q: 'Diagnostic HP (Delphi ou Continental) : le clapet de sécurité HP est grippé ouvert. Conséquence au démarreur ?', c: ['La pression reste trop basse (0,5 à 0,9 V au capteur) : le moteur ne démarre pas', 'La pression dépasse 1,5 V', 'Le capteur HP affiche plus de 1 V contact mis', 'Aucune conséquence'], e: 'La HP s’échappe par le clapet : pression insuffisante pour injecter.' },
    { l: 'diag-hp', q: 'Pour contrôler l’étanchéité des aiguilles d’injecteurs pendant l’action du démarreur, que faut-il déposer ?', c: ['Les bougies de préchauffage', 'Les injecteurs', 'La pompe HP', 'Le capteur de pression'], e: 'Étape commune aux logigrammes Delphi, Continental et Bosch.' },
    { l: 'carburants', q: 'Indice de cétane minimal du gazole ?', c: ['51', '40', '95', '30'], e: 'En dessous : délai d’allumage allongé → démarrage difficile à froid, cognements, fumées.' },
    { l: 'carburants', q: 'À quel moment apparaissent les premiers cristaux de paraffine ?', c: ['Au point de trouble (PT)', 'Au point d’écoulement (PE)', 'À la température limite de filtrabilité (TLF)', 'À 0 °C exactement'], e: 'Ordre : PE < TLF < PT. TLF = les cristaux bouchent le filtre ; PE = le gazole est figé.' },
    { l: 'carburants', q: 'Que se passe-t-il à la température limite de filtrabilité (TLF) ?', c: ['Les cristaux bouchent le filtre', 'Le gazole est figé', 'Les premiers cristaux apparaissent', 'Le gazole s’évapore'], e: 'PT : premiers cristaux ; TLF : filtre bouché ; PE : figé.' },
    { l: 'carburants', q: 'Classer du plus froid au moins froid : point d’écoulement (PE), TLF, point de trouble (PT).', c: ['PE < TLF < PT', 'PT < TLF < PE', 'TLF < PE < PT', 'PE < PT < TLF'], e: 'En refroidissant, on atteint d’abord le point de trouble, puis la TLF, puis le point d’écoulement.' },
    { l: 'carburants', q: 'Carburéacteur utilisé dans un diesel : quel problème ?', c: ['Pouvoir lubrifiant très mauvais et faible viscosité → usure et fuites du système d’injection', 'Il gèle à −5 °C', 'Son indice de cétane est trop élevé', 'Il encrasse les tuyauteries'], e: 'TLF −50 °C, cétane ≈ 42, viscosité 1,35 mm²/s (2,4 pour le gazole), pouvoir détergent très élevé.' },
    { l: 'carburants', q: 'Formule du cétane (constituant de référence du gazole) ?', c: ['C16H34', 'C8H18', 'C3H8', 'C4H10'], e: 'C8H18 = octane (essence) ; C3H8 = propane ; C4H10 = butane.' },
    { l: 'depollution', q: 'Les 4 principaux polluants et leur effet ?', c: ['CO mortel, HC cancérigènes, NOx irritants, particules cancérigènes', 'CO irritant, HC mortels, NOx cancérigènes, particules sans danger', 'CO2 mortel, O2 irritant, H2O cancérigène, N2 toxique', 'Seulement les particules sont dangereuses'], e: 'Selon ta fiche dépollution.' },
    { l: 'depollution', q: 'Les 2 réactions chimiques d’un pot catalytique ?', c: ['Réduction des NOx et oxydation du CO et des HC', 'Oxydation des NOx et réduction du CO', 'Combustion des particules et filtration', 'Injection d’AdBlue et réduction des HC'], e: 'Catalyseur d’oxydation diesel : CO et HC ; catalyseur 3 voies essence : CO, HC et NOx.' },
    { l: 'depollution', q: 'Composition de l’AdBlue ?', c: ['Urée 32,5 % et eau déminéralisée 67,5 %', 'Urée 67,5 % et eau 32,5 %', 'Ammoniac pur', 'Gazole et urée'], e: 'Il libère de l’ammoniac (NH3) qui réduit les NOx dans le catalyseur SCR.' },
    { l: 'depollution', q: 'Maille du tamis d’un FAP ?', c: ['1 micron', '1 mm', '10 microns', '0,1 mm'], e: 'Le FAP filtre les particules puis les brûle lors de la régénération.' }
  ]
});
