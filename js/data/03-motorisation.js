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
<tr><td>ρ essence / diesel</td><td>6/1 à 12/1 (bougie) · 13/1 à 24/1 (auto-inflammation)</td></tr>
<tr><td>A &lt; C / A = C / A &gt; C</td><td>Course longue / carré / super-carré</td></tr></table></div>
<p>La <b>puissance réelle mesurée au banc</b> est proportionnelle <b>au couple et à la vitesse de rotation</b> (P = C × ω).</p>`,
      retenir: ['Alésage = diamètre du cylindre ; course = distance parcourue par le piston.', 'ρ = (Vu + v) / v.', 'P = C × ω.'],
      pieges: ['ρ se calcule avec la chambre de combustion v, pas avec Vtot.'],
      memo: { cle: 'P = C × ω', points: ['Vu = π × A²/4 × C', 'ρ = (Vu + v)/v', 'Essence 6–12 · Diesel 13–24', '1 CV = 736 W'], astuce: 'A < C : course longue (le piston voyage plus qu’il n’est large).' }
    },
    {
      id: 'cycle', title: 'Les gaz et le cycle 4 temps',
      html: `
<ul><li><b>Isobare</b> = pression constante · <b>isochore</b> = volume constant · <b>adiabatique</b> = sans échange de chaleur (la température varie).</li>
<li>Compression adiabatique : la pression monte <b>lentement au début</b> de la remontée du piston, puis <b>rapidement à l’approche du PMH</b>.</li></ul>
<div class="tw"><table><tr><th>Phase</th><th>Essence (Beau de Rochas)</th><th>Diesel</th></tr>
<tr><td>Admission</td><td>Mélange air + essence</td><td>Air seul</td></tr>
<tr><td>Compression</td><td>ρ 6 à 12</td><td>ρ 13 à 24</td></tr>
<tr><td>Combustion</td><td>Allumage commandé (bougie), combustion isochore</td><td>Gasoil injecté dans l’air chaud : auto-inflammation. Lent = isobare ; rapide/mixte (Sabathé) = isochore puis isobare</td></tr>
<tr><td>Échappement</td><td>Plus de CO</td><td>Plus de NOx</td></tr></table></div>
<ul><li>Combustion qui continue après la fin de l’injection = <b>combustion diffusante</b>.</li>
<li><b>Cliquetis</b> (essence) : auto-allumage d’une partie du mélange <b>après l’étincelle</b>.</li>
<li><b>Cognements diesel</b> : augmentés par une <b>avance à l’injection trop grande</b> ou un <b>cétane trop faible</b>.</li></ul>`,
      retenir: ['Combustion après la fin d’injection = combustion diffusante.', 'Cliquetis = après l’étincelle.', 'Le diesel rejette plus de NOx, l’essence plus de CO.'],
      pieges: ['Isobare (P constante) ≠ isochore (V constant).'],
      memo: { cle: 'ADMISSION · COMPRESSION · COMBUSTION · ÉCHAPPEMENT', flow: ['Diesel : air seul', 'Compression ρ 13–24 (air très chaud)', 'Injection → auto-inflammation', 'Combustion diffusante après l’injection'], points: ['Cognements : avance trop grande / cétane faible', 'Cliquetis essence : après l’étincelle'], astuce: 'Diesel = « Diffuse » : la combustion continue après l’injection.' }
    },
    {
      id: 'distribution', title: 'La distribution',
      html: `
<ul><li><b>Rôle</b> : ouvrir et fermer les soupapes en synchronisation avec le vilebrequin. L’arbre à cames tourne à <b>demi-vitesse</b> du vilebrequin.</li>
<li><b>Régularité cyclique</b> R = 720° / n (4 cyl → 180° ; 6 cyl → 120°). Jamais 360° : un cycle = 2 tours de vilebrequin.</li>
<li>Chaîne cinématique : came → poussoir (galet, sabot, plateau, désaxé) → tige de culbuteur → culbuteur/linguet → soupape.</li>
<li>Soupapes : contraintes mécaniques, chimiques, thermiques. Ressorts à pas constant, progressif, ou concentriques à pas inversé (évitent l’affolement).</li>
<li><b>Jeu aux soupapes</b> : nécessaire car la soupape se dilate plus que le bloc. Méthodes : bascule, méthode des 5 (4 cyl), méthode Peugeot universelle.</li></ul>
<div class="tw"><table><tr><th>Sigle</th><th>Nom</th><th>Rôle</th></tr>
<tr><td>AOA</td><td>Avance ouverture admission</td><td>Améliore le remplissage</td></tr>
<tr><td>RFA</td><td>Retard fermeture admission</td><td>Profite de l’inertie des gaz frais après le PMB</td></tr>
<tr><td>AA</td><td>Avance à l’allumage</td><td>Pression maxi juste après le PMH</td></tr>
<tr><td>AOE</td><td>Avance ouverture échappement</td><td>Avance la chute de pression, limite la contre-pression</td></tr>
<tr><td>RFE</td><td>Retard fermeture échappement</td><td>Inertie des gaz pour vider le cylindre</td></tr></table></div>
<p>Les gaz ont une inertie : on ouvre l’admission un peu AVANT le PMH (AOA), on la ferme APRÈS le PMB (RFA) ; on ouvre l’échappement AVANT le PMB (AOE), on le ferme APRÈS le PMH (RFE). L’allumage est avancé (AA) car la combustion met du temps à se développer.</p>`,
      retenir: ['Balayage = chevauchement AOA / RFE : les gaz brûlés qui sortent vite favorisent l’aspiration du mélange.', 'Arbre à cames = ½ vitesse du vilebrequin.', 'R = 720° / n.'],
      pieges: ['Régularité cyclique : 720° (2 tours), jamais 360°.'],
      memo: { cle: 'AVANCE À L’OUVERTURE · RETARD À LA FERMETURE', points: ['AOA / RFA : admission', 'AOE / RFE : échappement', 'Balayage = AOA + RFE (chevauchement)', '4 cyl → 180° ; 6 cyl → 120°'], astuce: 'On ouvre en avance et on ferme en retard : les gaz ont de l’élan.' }
    },
    {
      id: 'graissage', title: 'Le graissage',
      html: `
<ul><li><b>Rôles</b> : réduire frottements et usure, évacuer la chaleur, éviter la corrosion, éliminer les particules, participer à l’étanchéité.</li>
<li><b>Types</b> : barbotage (petits moteurs, risque de déjaugeage) · huile perdue (2 temps) · sous pression normale (vilebrequin, rampe de culbuteurs, arbre à cames) · intégrale (idem + axe de piston) · carter sec (meilleur refroidissement, moteurs inclinés, complexe).</li>
<li><b>Circuit</b> : carter, crépine (maille 1 mm), pompe à <b>engrenage, à rotor ou à palettes</b>, filtre, canalisations. Pression : 2–4 bar essence, 4–8 bar diesel.</li>
<li>Consommation d’huile : joints de queue de soupape, joint de culasse, segmentation. Défaut de pression : entraînement de pompe, crépine colmatée, fuites.</li></ul>`,
      retenir: ['Pression d’huile : 2–4 bar essence, 4–8 bar diesel.', 'Pompe à engrenage, à rotor ou à palettes.'],
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
<li><b>Indice de cétane</b> : carburéacteur ≈ 40 · gasoil 51 · Extélium ≈ 52-53 (additif S-1750 pour relever celui du carburéacteur). Un cétane faible <b>augmente le délai d’auto-inflammation</b> → cognements, démarrage difficile, fumées.</li>
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
      id: 'depollution', title: 'Dépollution',
      html: `
<div class="tw"><table><tr><th>Organe</th><th>Rôle</th></tr>
<tr><td>Catalyseur d’oxydation (diesel)</td><td>HC et CO</td></tr>
<tr><td>Catalyseur 3 voies</td><td>HC, CO et NOx</td></tr>
<tr><td>FAP</td><td>Filtre puis brûle les suies ; régénération par élévation de la température des gaz (≈ 550 °C)</td></tr>
<tr><td>EGR</td><td>Diminue les NOx en abaissant la température de combustion</td></tr>
<tr><td>SCR (AdBlue)</td><td>NOx ; actif si T° catalyseur &gt; 180 °C, couple &gt; 5 %, T° moteur &gt; 40 °C, régime &gt; 400 tr/min</td></tr></table></div>
<ul><li>CO et HC plus importants avec un <b>dosage riche</b> (manque d’air pour tout brûler).</li>
<li>Le diesel rejette plus d’oxydes d’azote qu’un moteur essence.</li></ul>`,
      retenir: ['FAP : régénération à ≈ 550 °C par élévation de la température des gaz.', 'EGR : moins de NOx en baissant la température de combustion.', 'SCR : 180 °C cata, 5 % couple, 40 °C moteur, 400 tr/min.'],
      pieges: ['Catalyseur d’oxydation diesel = HC et CO seulement ; le 3 voies traite aussi les NOx.'],
      memo: { cle: 'NOx = HAUTE TEMPÉRATURE', points: ['EGR refroidit la combustion → moins de NOx', 'FAP 550 °C', 'SCR/AdBlue : 180 · 5 · 40 · 400'], astuce: 'AdBlue : « 180 degrés au cata, 40 au moteur, 400 tours, 5 % de couple ».' }
    }
  ],
  questions: [
    { l: 'caracteristiques', q: 'La puissance réelle mesurée au banc est proportionnelle…', c: ['Au couple et à la vitesse de rotation', 'À la cylindrée seule', 'Au rapport volumétrique', 'À la consommation'], e: 'P = C × ω : la puissance est le produit du couple par la vitesse angulaire.', src: 'QCM moteur Q2' },
    { l: 'caracteristiques', q: 'Rapport volumétrique courant d’un moteur diesel ?', c: ['13/1 à 24/1', '6/1 à 12/1', '2/1 à 5/1', '30/1 à 40/1'], e: 'Le diesel a besoin d’une forte compression pour chauffer l’air jusqu’à l’auto-inflammation. Essence : 6 à 12.', r: 'ρ = (Vu + v) / v.' },
    { l: 'caracteristiques', q: 'Un moteur dont l’alésage est inférieur à la course est dit :', c: ['À course longue', 'Carré', 'Super-carré', 'Isochore'], e: 'A < C = course longue ; A = C = carré ; A > C = super-carré.' },
    { l: 'caracteristiques', q: 'Pour calculer le rapport volumétrique ρ, on utilise :', c: ['La cylindrée unitaire et le volume de la chambre de combustion', 'La cylindrée totale et l’alésage', 'La course et le régime', 'La cylindrée totale seule'], e: 'ρ = (Vu + v) / v, avec v le volume de la chambre de combustion.', w: 'Ne pas utiliser Vtot.' },
    { l: 'cycle', q: 'Comment appelle-t-on la combustion qui continue après la fin de l’injection ?', c: ['Combustion diffusante', 'Combustion isochore', 'Cliquetis', 'Auto-allumage'], e: 'Une fois l’injection terminée, le carburant restant continue de brûler en se diffusant dans l’air.', src: 'Test final Q5 (officiel)' },
    { l: 'cycle', q: 'Lors d’une compression adiabatique, la pression monte…', c: ['Lentement au début, rapidement près du PMH', 'Rapidement au début, lentement près du PMH', 'De façon constante', 'Uniquement après le PMH'], e: 'Le volume diminue de plus en plus vite en valeur relative à l’approche du PMH.', src: 'QCM moteur Q7' },
    { l: 'cycle', q: 'Les cognements diesel sont augmentés par…', c: ['Une avance à l’injection trop grande', 'Un retard à l’injection', 'Un indice de cétane élevé', 'Un gasoil trop froid'], e: 'Trop d’avance (ou cétane trop faible) : plus de carburant s’accumule avant l’inflammation, qui devient brutale.', src: 'QCM moteur Q8' },
    { l: 'cycle', q: 'Le cliquetis (moteur essence) apparaît…', c: ['Après l’étincelle', 'Avant l’étincelle', 'Pendant l’admission', 'Uniquement au ralenti'], e: 'C’est l’auto-allumage d’une partie du mélange après l’étincelle de la bougie.', src: 'QCM moteur Q9' },
    { l: 'cycle', q: 'Comparé à un moteur essence, un diesel rejette…', c: ['Plus d’oxydes d’azote (NOx)', 'Plus de monoxyde de carbone (CO)', 'Moins de NOx', 'Autant de chaque polluant'], e: 'Combustion à haute température avec excès d’air : plus de NOx. L’essence rejette plus de CO.', src: 'QCM moteur Q10' },
    { l: 'distribution', q: 'Les gaz brûlés qui sortent vite et favorisent l’aspiration du mélange, c’est :', c: ['Le balayage', 'Le cliquetis', 'La combustion diffusante', 'L’affolement des soupapes'], e: 'Balayage = chevauchement AOA / RFE : admission et échappement ouverts ensemble autour du PMH.', src: 'Test final Q1 (officiel)' },
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
    { l: 'depollution', q: 'Un catalyseur d’oxydation diesel traite :', c: ['HC et CO', 'HC, CO et NOx', 'Les suies', 'Uniquement les NOx'], e: 'Le 3 voies (essence) traite aussi les NOx ; l’oxydation diesel seulement HC et CO.', src: 'Corrigé UV2 Q36' }
  ]
});
