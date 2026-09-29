REV.add({
  id: 'dsft', name: 'DSFT', icon: '🚙', color: '#7c3aed',
  desc: 'Direction – Suspension – Freinage hydraulique – Transmission – Roues et pneumatiques.',
  lessons: [
    {
      id: 'suspension', title: 'Suspension',
      html: `
<ul><li><b>Rôles</b> : garder les roues au contact du sol (adhérence), filtrer les vibrations (confort), protéger la mécanique et le chargement.</li>
<li><b>Mouvements néfastes</b> : tangage (avant/arrière), roulis (gauche/droite), pompage (vertical), lacet (autour de l’axe vertical).</li>
<li><b>Ressorts</b> : à lames, hélicoïdal (cylindrique, conique, biconique), barre de torsion. Autres : barre anti-roulis, silent-blocs, amortisseurs (bi-tube, à gaz).</li>
<li><b>Avant</b> : double triangulation, Mac Pherson (l’axe de l’amortisseur passe par la rotule), pseudo Mac Pherson (il n’y passe pas). <b>Arrière</b> : multibras, barre de torsion, essieu rigide à lames.</li></ul>`,
      retenir: ['Tangage = AV/AR ; roulis = G/D ; pompage = vertical ; lacet = autour de l’axe vertical.', 'Usure des pneus en facettes = amortisseurs HS.'],
      pieges: ['Amortisseurs : toujours par paire sur un même essieu, stockés verticalement.'],
      memo: { cle: 'TANGAGE · ROULIS · POMPAGE · LACET', points: ['Mac Pherson : l’axe passe par la rotule', 'Facettes sur le pneu → amortisseurs', 'Amortisseurs par paire'], astuce: 'Roulis = le bateau qui roule d’un bord à l’autre.' }
    },
    {
      id: 'angles', title: 'Direction et angles du train',
      html: `
<ul><li><b>Barre d’accouplement</b> = règle la VALEUR du parallélisme. <b>Barre de direction</b> = règle sa RÉPARTITION.</li>
<li><b>Le parallélisme</b> : est la différence d’écartement entre l’avant et l’arrière des roues d’un même essieu, mesurée à hauteur du moyeu, <b>vue de dessus</b>. (−) = ouverture, (+) = pincement.</li>
<li><b>Le déport</b> : est la distance entre l’axe de pivot et le plan de la roue au sol, <b>vue de face</b>.</li>
<li><b>Le carrossage</b> :<br>– est l’angle formé par le plan de rotation de la roue et la verticale au sol, <b>vue de face</b> ;<br>– est l’angle formé par l’axe géométrique de la fusée et l’horizontale au sol, <b>vue de face</b>.</li>
<li><b>L’angle d’inclinaison de pivot</b> : est l’angle formé par la verticale au sol et l’axe de pivot dans le plan <b>TRANSVERSAL</b> du véhicule, <b>vu de face</b>.</li>
<li><b>L’angle inclus</b> : le déport est fonction de 2 angles, ① l’angle d’inclinaison de pivot et ② l’angle de carrossage. Ces deux angles sont indissociables, ils forment l’angle inclus : <b>① + 90° + ② = angle inclus</b>. L’angle inclus est un angle de <b>diagnostic</b> : il détermine la forme du porte-fusée. Bon (identique G/D) → triangle, berceau ou châssis ; pas bon → fusée, porte-fusée et/ou jambe de force.</li>
<li><b>L’angle de chasse</b> : est l’angle formé par la verticale au sol et l’axe de pivot dans le plan <b>LONGITUDINAL</b> du véhicule, <b>vue de côté</b>. Elle assure l’<b>auto-stabilité (rappel)</b> de la direction.</li></ul>
<p class="small muted">Pour comparer gauche et droite dans un tableau de relevés, le 90° est le même des deux côtés : on compare simplement pivot + carrossage.</p>
<div class="tw"><table><tr><th>Angle</th><th>Vue</th><th>Référence</th><th>Signe / défaut</th></tr>
<tr><td>Carrossage</td><td>De face</td><td>Verticale / plan de roue</td><td>+ ou − · faux = usure LISSE</td></tr>
<tr><td>Pivot</td><td>De face</td><td>Verticale / axe de pivot</td><td>Toujours positif</td></tr>
<tr><td>Chasse</td><td>De côté</td><td>Verticale / axe de pivot</td><td>+ ou −</td></tr>
<tr><td>Angle inclus</td><td>De face</td><td>Pivot + 90° + carrossage</td><td>Angle de diagnostic</td></tr>
<tr><td>Parallélisme</td><td>De dessus</td><td>Ouverture (−) / pincement (+)</td><td>Faux = usure RUGUEUSE</td></tr></table></div>
<div class="box retenir"><b>★ Lire l’usure d’un pneu</b><div class="tw"><table><tr><th>Type d’usure</th><th>Angle en cause</th></tr>
<tr><td><b>Usure LISSE</b></td><td><b>Carrossage</b> pas bon</td></tr>
<tr><td><b>Usure RUGUEUSE</b> (en dents de scie)</td><td><b>Parallélisme</b> pas bon</td></tr></table></div>
<p>Moyen mnémotechnique : le parallélisme faux fait « frotter » le pneu en travers → il devient rugueux ; le carrossage faux fait rouler le pneu sur un bord → il s’use lisse.</p></div>
<div class="tw"><table><tr><th>Constat</th><th>Pièce incriminée</th></tr>
<tr><td>Angle inclus bon (identique G/D), carrossage et pivot décalés en sens inverse</td><td>Triangle, berceau, châssis</td></tr>
<tr><td>Angle inclus pas bon (différent G/D)</td><td>Fusée, porte-fusée et/ou jambe de force</td></tr>
<tr><td>Chasse hors tolérance d’un côté</td><td>Tirant, triangle, longeron</td></tr></table></div>
<p>Le véhicule <b>tire du côté du carrossage le plus positif</b>, et du côté de la chasse la plus faible.</p>`,
      retenir: ['Rugueuse = parallélisme ; lisse = carrossage.', 'Chasse = auto-stabilité de la direction (vue de côté).', 'Angle inclus = carrossage + pivot : bon → triangle, berceau ou châssis ; pas bon → fusée, porte-fusée et/ou jambe de force.', 'Tire du côté du carrossage le plus positif.'],
      pieges: ['Barre d’accouplement = valeur ; barre de direction = répartition.', 'Chasse = vue de côté (plan longitudinal) ; vue de face (plan transversal) = inclinaison de pivot.'],
      memo: { cle: 'RUGUEUSE = PARALLÉLISME · LISSE = CARROSSAGE', points: ['Usure rugueuse → parallélisme', 'Usure lisse → carrossage', 'Inclus faux → fusée ; inclus bon → triangle'], astuce: 'Les dents de scie « frottent » : c’est la roue qui ne roule pas droit (parallélisme).' }
    },
    {
      id: 'reglage', title: 'Réglage du train (tableau ALFA)',
      html: `
<ul><li><b>Avant le banc</b> : essai, MAT 10004, pneus (usure, pression, conformité), jantes (voile), jeux DSFT, hauteur de caisse.</li>
<li><b>Ordre</b> : hauteur de caisse → chasse → pivot → carrossage → hauteur de crémaillère → <b>parallélisme (toujours en dernier</b> : d’abord la valeur à la barre d’accouplement, puis la répartition à la barre de direction, volant bloqué, repères alignés).</li>
<li><b>Boîtier de direction</b> : contrôler les périphériques, désaccoupler bielle pendante et barre, trouver le point milieu, régler selon le constructeur, chercher les points durs, réaccoupler avec goupille et écrou neufs.</li>
<li><b>Tableau de diagnostic</b> (colonnes G, D, valeurs constructeur) : parallélisme total, parallélisme partiel, carrossage, chasse, pivot, angle inclus (= carrossage + pivot). Parallélisme faux = usure rugueuse ; carrossage faux = usure lisse ; angle inclus bon = triangle / berceau / châssis ; angle inclus faux = fusée / porte-fusée et/ou jambe de force.</li>
<li><b>Conversion</b> : 1° = 60′. Toujours écrire la plage MINI–MAXI avant de comparer (10°30′ ± 30′ → 10°00′ à 11°00′).</li></ul>
<h3>Exercice ALFA corrigé</h3>
<p>Tolérances : parallélisme −1 ± 1 mm (−2 à 0) · carrossage −0°10′ ± 30′ (−0°40′ à +0°20′) · chasse 3°20′ ± 30′ (2°50′ à 3°50′) · pivot 10°30′ ± 30′ (10°00′ à 11°00′).<br>Relevés : pincement +1 mm ; carrossage G −0°09′ / D −1°10′ ; chasse G 3°25′ / D 3°30′ ; pivot G 10°20′ / D 11°35′.</p>
<ul><li><b>Hors tolérance</b> : parallélisme, carrossage droit, pivot droit.</li>
<li><b>Pièce</b> : un triangle — angle inclus D = 11°35′ − 1°10′ = 10°25′ ≈ angle inclus G (10°20′ − 0°09′ = 10°11′) : la fusée est bonne, c’est la position du pivot qui a bougé.</li>
<li><b>Tire à gauche</b> : carrossage le plus positif à gauche (−0°09′), chasse la plus faible à gauche.</li></ul>`,
      images: [{ src: 'tableau-alfa.jpg', cap: 'Sujet « DSFT pratique » : tableau ALFA et questions 1 à 6' }],
      retenir: ['Parallélisme toujours en dernier.', 'Hauteur de caisse → carrossage → parallélisme.', '1° = 60′ : écrire la plage mini–maxi avant de comparer.'],
      pieges: ['Uv1 disait « tire à droite » : les deux corrigés UV2 disent gauche.'],
      memo: { cle: 'HAUTEUR → CHASSE → PIVOT → CARROSSAGE → PARALLÉLISME', flow: ['Hauteur de caisse', 'Chasse', 'Pivot', 'Carrossage', 'Hauteur de crémaillère', 'Parallélisme (en dernier)'], points: ['Valeur = barre d’accouplement', 'Répartition = barre de direction', '10°30′ ± 30′ → 10°00′ à 11°00′'], astuce: 'On règle de bas en haut, et on finit toujours par le parallélisme.' }
    },
    {
      id: 'transmission', title: 'Transmission : embrayage et boîte',
      html: `
<ul><li>Chaîne 4×4 : moteur → embrayage → BV → boîte de transfert → 2 ponts. 6×6 : … → BT → palier relais → 3 ponts.</li>
<li><b>Embrayage</b> : accouplement progressif et désaccouplement pour changer de rapport. Menant (volant, plateau, couvercle, ressorts), mené (disque, arbre primaire), commande (diaphragme, butée, fourchette). <b>Embrayage tiré ≈ +20 % de couple transmissible</b> par rapport au poussé.</li>
<li><b>Boîte de vitesses</b> : adapter le couple moteur au couple résistant, marche arrière, point mort. Dentures droite, hélicoïdale, spirale, chevrons.</li>
<li><b>Verrouillage de sécurité</b> (bonhomme/disque) : interdit 2 vitesses à la fois. <b>Verrouillage de positionnement</b> (bille + ressort) : maintient la vitesse engagée.</li>
<li>Avant de remonter la boîte : centrer le disque et vérifier son sens.</li></ul>
<div class="tw"><table><tr><th>Symptôme</th><th>Cause</th></tr>
<tr><td>Bruit à l’appui sur la pédale, disparaît au relâché</td><td>Butée</td></tr>
<tr><td>À-coup au relâché</td><td>Ressorts de progressivité</td></tr>
<tr><td>Craquement au démarreur</td><td>Dents du volant moteur</td></tr>
<tr><td>Vis de visite grasse</td><td>Joint spi du volant moteur</td></tr>
<tr><td>Seule la 3ᵉ craque</td><td>Synchro de 3ᵉ</td></tr>
<tr><td>Vitesse qui saute</td><td>Bille + ressort (positionnement)</td></tr>
<tr><td>2 vitesses en même temps</td><td>Disque de verrouillage (sécurité)</td></tr>
<tr><td>Toutes les vitesses craquent</td><td>Purge de l’embrayage / butée (garde, mécanisme)</td></tr>
<tr><td>Suintement d’huile</td><td>Reniflard bouché</td></tr>
<tr><td>Vitesses passent mais le véhicule n’avance pas (BV auto)</td><td>Convertisseur de couple</td></tr></table></div>
<p><b>Logigrammes</b> (fiches 01 à 10) : toujours du plus simple au plus lourd — 1) réglage (garde, tringlerie) → 2) commande (câble, hydraulique, pédalier) → 3) supports (silent-blocs) → 4) embrayage (disque, mécanisme, butée, volant) → 5) dépose de la BV (synchros, verrouillage, fourchettes).</p>
<ul><li>Patinage : garde → régler → déposer : disque usé ou gras (trouver la fuite).</li>
<li>Broutement : supports boîte-moteur → volant/disque voilé ou gras, mécanisme.</li>
<li>Bruit sur route : arrêt, point mort — le bruit cesse → transmissions/roulements ; continue → garde, niveau BV, débrayer à fond.</li></ul>`,
      retenir: ['Embrayage TIRÉ = +20 % de couple (pas le poussé).', 'Sécurité = pas 2 vitesses ; positionnement = la vitesse ne saute pas.', 'Une BV n’a pas pour qualité « une faible inertie ».'],
      pieges: ['« Le diaphragme poussé passe 20 % de couple en plus » est FAUX : c’est le tiré.'],
      memo: { cle: 'DU PLUS SIMPLE AU PLUS LOURD', flow: ['Réglage (garde, tringlerie)', 'Commande (câble, hydraulique)', 'Supports (silent-blocs)', 'Embrayage', 'Dépose de la BV'], points: ['Vitesse qui saute → bille + ressort', '2 vitesses à la fois → disque de verrouillage', 'Une seule vitesse craque → son synchro'], astuce: 'On ne dépose pas une boîte avant d’avoir réglé la garde.' }
    },
    {
      id: 'willis', title: 'Train épicycloïdal (Willis)',
      html: `
<p>Formule de Willis : <span class="formula">Zp × Np + Zc × Nc = (Zp + Zc) × Nps</span>. L’organe de réaction (bloqué) est pris à 0 tr/min. (p = planétaire, c = couronne, ps = porte-satellites)</p>
<div class="tw"><table><tr><th>Menant</th><th>Fixe</th><th>Mené</th><th>Résultat</th></tr>
<tr><td>Couronne</td><td>Planétaire</td><td>Porte-satellites</td><td>Avant démultiplié</td></tr>
<tr><td>Planétaire</td><td>Couronne</td><td>Porte-satellites</td><td>Avant, grande démultiplication</td></tr>
<tr><td>Porte-satellites</td><td>Planétaire</td><td>Couronne</td><td>Avant multiplié</td></tr>
<tr><td>Porte-satellites</td><td>Couronne</td><td>Planétaire</td><td>Avant, grande multiplication</td></tr>
<tr><td>Planétaire</td><td>Porte-satellites</td><td>Couronne</td><td>Marche arrière démultipliée</td></tr>
<tr><td>2 éléments liés</td><td>—</td><td>3ᵉ</td><td>Prise directe</td></tr></table></div>
<div class="box explic"><b>+ Exemples</b><ul>
<li>UV2 Q11 : Zp = 40, Zc = 80, Nc = 600 (couronne motrice), planétaire fixe → Nps = 80 × 600 / 120 = <b>400 tr/min</b>, même sens → avant démultiplié.</li>
<li>Fiche : planétaire menant 1 200 tr/min, Zp = 30, Zc = 40, porte-satellites bloqué → Nc = −1 200 × 30 / 40 = <b>−900 tr/min</b> (marche arrière). La fiche indiquait 800 : erreur de report probable.</li></ul></div>`,
      images: [{ src: 'willis.png', cap: 'Diagramme de Willis : planétaire menant 1 200 tr/min, porte-satellites bloqué, couronne en sortie à −900 tr/min (marche arrière)' }],
      retenir: ['Porte-satellites MENÉ = démultiplié ; MENANT = multiplié ; FIXE = marche arrière.', 'Deux éléments liés = prise directe.'],
      pieges: ['Ne pas oublier de mettre l’élément fixe à 0 dans la formule.'],
      memo: { cle: 'PORTE-SATELLITES : MENÉ ↓ · MENANT ↑ · FIXE = MAR', points: ['Zp·Np + Zc·Nc = (Zp+Zc)·Nps', 'Élément fixe = 0 tr/min', '2 éléments liés = prise directe'], astuce: 'Quand le porte-satellites est bloqué, tout tourne à l’envers.' }
    },
    {
      id: 'freinage', title: 'Freinage hydraulique',
      html: `
<p>Pédale → (assistance) → <b>maître-cylindre</b> qui transforme l’effort en pression → canalisations → correcteur qui dose l’arrière → récepteurs (étriers, cylindres de roue). Le maître-cylindre <b>tandem</b> (depuis 1977) a deux chambres : si un circuit fuit, l’autre freine encore.</p>
<ul><li><b>Assistance</b> : Mastervac ou Isovac (dépression) ; contrôle = pompe à vide + tuyau + fonctionnement.</li>
<li><b>Maître-cylindre</b> : transforme la force mécanique en pression hydraulique. Fuite interne (pédale qui s’enfonce, pas de trace) = maître-cylindre tandem.</li>
<li><b>ICP by-pass</b> (indicateur de chute de pression), sur un <b>circuit II</b> (Auverland) : indique au conducteur une fuite sur le circuit avant ou arrière et, si la fuite est à l’avant, envoie la pression maxi à l’arrière en shuntant le correcteur.</li>
<li><b>Maître-cylindre tandem</b> (depuis 1977) : un piston pour deux roues ; pression plus forte à l’avant qu’à l’arrière. Types : à trou de dilatation, à <b>soupapes basculantes</b> (isolent le circuit qui fuit), à clapets.</li>
<li><b>Correcteurs</b> : limiteur (plafond de pression) ou compensateur (pente continue), asservis ou non à la charge.</li>
<li><b>SPR</b> (soupape de pression résiduelle) : sur les freins à <b>tambours ancienne génération</b>, elle conserve <b>0,5 à 1,5 bar</b> dans le circuit arrière pour plaquer les joints des cylindres de roue et éviter les fuites au repos.</li>
<li>Circuits : standard, II, X, HI, HH, L. Tambour : rattrapage Bendix / Girling ; disque : étrier fixe ou flottant, rappel par le joint carré.</li>
<li><b>Liquide de frein</b> : bidon ouvert à utiliser sous 72 h ; normes HS42, DOT 3, DOT 4, DOT 5. Point d’ébullition ≥ 185 °C performant ; 165–185 °C correct (changer si &gt; 2 ans) ; <b>≤ 165 °C à remplacer</b>.</li></ul>
<div class="box methode"><b>✎ Contrôle de l’ICP by-pass</b><p>Brancher un manomètre sur le circuit AVANT et un sur le circuit ARRIÈRE (purger les manomètres), appuyer sur les freins et lire les pressions constructeur. Créer une fuite sur le circuit AVANT : la pression <b>baisse à l’avant</b> et <b>augmente à l’arrière</b>.</p></div>
<div class="box methode"><b>✎ Contrôle de la SPR</b><p>Brancher un manomètre basse pression (TESTARC) sur le circuit ARRIÈRE et purger. Appuyer sur la pédale jusqu’à <b>3 à 4 bar maximum</b>, relâcher, attendre <b>5 à 10 minutes</b> et lire : si la valeur n’est pas dans le tarage de la SPR (<b>0,5 à 1,5 bar</b>), la remplacer.</p></div>
<div class="box methode"><b>✎ Contrôle du Mastervac</b><p>Contrôler la pompe à vide, le tuyau et le fonctionnement. Moteur arrêté, pomper plusieurs fois (5 à 7) → pédale dure et haute ; pied maintenu, démarrer → la pédale s’enfonce un peu puis se stabilise. On peut aussi comparer la pression du circuit moteur arrêté et moteur en route (coefficient d’assistance). Étanchéité : moteur coupé, attendre 30 s, 2 à 3 coups assistés ; pied appuyé en coupant le moteur, la pédale ne remonte pas pendant 30 s.</p></div>
<p><b>Purge ARC50 / LURO</b> : contrôle appareil et liquide, EPI, mise sous pression (4 bars maxi), purger le flexible, marquer le bocal, circuit à 1 bar, contrôle d’étanchéité, purge, vider la pression, reconditionner.</p>`,
      retenir: ['Maître-cylindre = force mécanique → pression hydraulique.', 'Fuite interne sans trace = maître-cylindre tandem.', 'ICP by-pass : signale la chute + pression maxi à l’AR si l’AV lâche.', 'Liquide ≤ 165 °C = à remplacer.'],
      pieges: ['Une fiche manuscrite parle de « 65 °C » : retiens 165 °C comme seuil de remplacement.'],
      memo: { cle: 'PÉDALE → MAÎTRE-CYLINDRE → PRESSION → RÉCEPTEURS', flow: ['Pédale', 'Assistance (Mastervac)', 'Maître-cylindre tandem', 'Correcteur (AR)', 'Étriers / cylindres de roue'], points: ['SPR : 0,5–1,5 bar à l’AR', 'Mastervac : pédale dure moteur arrêté, s’enfonce au démarrage', 'Liquide : ≥ 185 bon, ≤ 165 à changer'], astuce: 'Tandem = deux chambres = deux chances de freiner.' }
    },
    {
      id: 'abs', title: 'ABS, ESP, ASR',
      html: `
<ul><li><b>ABS</b> : améliore <b>stabilité, directibilité, efficacité</b> quelle que soit l’adhérence (ne garantit pas une distance plus courte). Phases : freinage normal, maintien de pression (électrovanne isole la roue), réduction (vers accumulateur, pompe qui refoule : pulsations pédale).</li>
<li><b>Bloc ABS</b> (livré pré-rempli) : calculateur + groupe hydraulique ; 2 électrovannes par roue (admission ouverte au repos, échappement fermée au repos) + pompe ; l’accumulateur fait baisser la pression en phase de blocage.</li>
<li><b>ESP</b> : corrige la trajectoire indépendamment du conducteur, dans 3 cas : sous-virage (le train AV chasse), survirage (le train AR chasse), évitement d’obstacle. 2 électrovannes par train + capteur d’angle volant.</li>
<li><b>ASR</b> : évite le patinage des roues motrices.</li>
<li><b>Adhérence</b> = qualité du contact pneu/sol. <b>Glissement</b> = différence entre le déplacement du véhicule et le développement de la roue.</li>
<li><b>Capteurs de roue</b> : inductif (roue phonique, pas d’alimentation, plus de signal à très basse vitesse) = ACTIF dans ton cours ; effet Hall (alimenté, créneaux, mesure jusqu’à 0 km/h) = PASSIF.</li></ul>`,
      retenir: ['ABS = stabilité, directibilité, efficacité.', 'Sous-virage = l’AV chasse ; survirage = l’AR chasse.', 'Hall mesure jusqu’à 0 km/h ; l’inductif perd le signal à très basse vitesse.'],
      pieges: ['L’ABS ne garantit pas une distance de freinage plus courte.', 'Pulsations de la pédale en freinage fort = régulation ABS normale.'],
      memo: { cle: 'ABS = GARDER LE CONTRÔLE', points: ['Phases : normal → maintien → réduction', 'ESP : sous-virage, survirage, évitement', 'ASR : pas de patinage'], astuce: 'Sous-virage : le nez file tout droit. Survirage : les fesses passent devant.' }
    },
    {
      id: 'pneus', title: 'Roues et pneumatiques',
      html: `
<p>Source : fiche « Rappels marquages pneumatique » (FS2 MOBTER).</p>
<h3>Marquage VL : 225/40 R18 92 Y DOT 4217</h3>
<div class="tw"><table><tr><th>Repère</th><th>Signification</th></tr>
<tr><td><b>225</b></td><td>Largeur de la bande de roulement, de flanc à flanc, en <b>mm</b></td></tr>
<tr><td><b>40</b></td><td>Hauteur du flanc = rapport Hauteur / Largeur en <b>%</b> (le flanc fait 40 % de 225 mm)</td></tr>
<tr><td><b>R</b></td><td>Type de structure : <b>radial</b></td></tr>
<tr><td><b>18</b></td><td>Diamètre intérieur du pneu en <b>pouces</b> = diamètre d’accrochage de la jante</td></tr>
<tr><td><b>92</b></td><td><b>Indice de charge</b> → charge maxi en kg (tableau des indices)</td></tr>
<tr><td><b>Y</b></td><td><b>Indice de vitesse</b> → vitesse maxi en km/h (tableau des indices)</td></tr>
<tr><td><b>DOT</b></td><td>Sigle des manufactures américaines : <b>Department Of Transportation</b></td></tr>
<tr><td><b>4217</b></td><td>Semaine et année de fabrication : <b>42ᵉ semaine de 2017</b></td></tr></table></div>
<h3>Marquage PL : 295/80 R22.5 152/148 L DOT 2018</h3>
<ul><li><b>295</b> = largeur en mm · <b>80</b> = hauteur du flanc, 80 % de 295 mm · <b>R</b> = radial · <b>22.5</b> = diamètre intérieur en pouces.</li>
<li>Jante 22,5" : <b>inclinaison du talon d’accrochage à 15°</b>.</li>
<li><b>152</b> = indice de charge en montage <b>roue SOLO</b> · <b>148</b> = indice de charge en montage <b>roue JUMELÉE</b>.</li>
<li><b>L</b> = indice de vitesse · <b>DOT 2018</b> = <b>20ᵉ semaine de 2018</b>.</li></ul>
<h3>Marquage en pouces : 14.00 R20 152/148 L DOT 2019</h3>
<ul><li><b>14</b> = largeur de la bande de roulement, de flanc à flanc, en <b>pouces</b> (14").</li>
<li><b>00</b> = rapport Hauteur / Largeur : le flanc fait <b>100 %</b> de 14" → pneu dit <b>CARRÉ</b> (mêmes dimensions en hauteur et en largeur).</li>
<li><b>R</b> = radial · <b>20</b> = diamètre intérieur en pouces · jante 20" : <b>talon d’accrochage à 5°</b>.</li>
<li><b>152</b> = charge roue solo · <b>148</b> = charge roue jumelée · <b>L</b> = vitesse · <b>DOT 2019</b> = 20ᵉ semaine de 2019.</li></ul>
<h3>Marquages militaires spécifiques</h3>
<div class="tw"><table><tr><th>Marquage</th><th>Signification</th></tr>
<tr><td><b>AR17</b></td><td>Pneumatique exclusivement militaire : « <b>Armée</b>, fabriqué en 2017 »</td></tr>
<tr><td><b>R18</b></td><td><b>Rechapé</b> en 2018</td></tr>
<tr><td><b>V CFD 19</b></td><td><b>V</b> = <b>Recreusé</b> (1ᵉʳ recreusage) ; <b>VV</b> = 2ᵉ recreusage · <b>CFD</b> = localité de l’intervention (Clermont-Ferrand) · <b>19</b> = année du recreusage (2019)</td></tr></table></div>
<h3>Jante</h3>
<p>5½ J 13 FH E28 : largeur 5½" · hauteur de rebord J · diamètre 13" · sécurité FH (flat hump) · déport 28 mm. REGROOVABLE = recreusable ; BRAND TIRE HERE = zone de marquage à chaud.</p>`,
      retenir: ['Largeur (mm ou pouces) / hauteur du flanc en % · R = radial · diamètre en pouces · indice de charge · indice de vitesse.', 'Deux indices de charge (152/148) = roue solo / roue jumelée.', 'DOT 4217 = 42ᵉ semaine 2017 ; DOT 2018 = 20ᵉ semaine 2018.', '« 00 » = flanc de 100 % : pneu carré.', 'V = recreusé (VV = 2ᵉ recreusage) · R = rechapé · AR = armée.', 'Durée de vie d’un pneumatique : 20 ans.'],
      pieges: ['La lettre après l’indice de charge est la VITESSE, pas la charge.', '« V » dans « V CFD 20 » signifie RECREUSÉ, pas « vérifié » (certaines corrections de test disaient « vérifié »).', 'Talon d’accrochage : 15° pour une jante 22,5" ; 5° pour une jante 20".'],
      memo: { cle: 'LARGEUR / HAUTEUR % R DIAMÈTRE · CHARGE · VITESSE · DOT', points: ['225/40 R18 92 Y DOT 4217', '152/148 = solo / jumelé', '14.00 : 14" de large, 00 = 100 % → carré', 'AR = armée · R = rechapé · V = recreusé · VV = 2ᵉ recreusage', 'Durée de vie : 20 ans'], astuce: 'Le chiffre porte (charge), la lettre court (vitesse) ; V comme « Vidé » : on a recreusé la gomme.' }
    },
    {
      id: 'panne', title: 'Recherche de panne freinage',
      html: `
<div class="box methode"><b>✎ Démarche</b><p>QUESTIONNER (depuis quand ? intervention récente ? voyant ? bruit ? odeur ?) → CONSTATER (essai statique puis dynamique) → CONTRÔLER du plus simple au plus complexe (visuel, niveaux, fuites externes) → MESURER (purge, prise de pression) → CONCLURE → REMÉDIER + essai.</p></div>
<div class="tw"><table><tr><th>Cas</th><th>Situation</th><th>Réponse attendue</th></tr>
<tr><td>P4 – 1</td><td>Le véhicule plonge de l’avant au freinage</td><td>Défaut du freinage arrière (garnitures, correcteur, SPR ou fuite)</td></tr>
<tr><td>P4 – 2</td><td>Garnitures grasses à la visite</td><td>Trouver la fuite, remplacer les garnitures des deux côtés (jamais nettoyées)</td></tr>
<tr><td>ABS – 1</td><td>Pédale et volant vibrent au freinage</td><td>Disque voilé (refroidissement trop rapide) → disques + plaquettes par paire</td></tr>
<tr><td>ABS – 2</td><td>Voyant ABS allumé après changement des plaquettes AR</td><td>Capteur, faisceau ou cible abîmé ou mal remonté</td></tr>
<tr><td>Auverland – 1</td><td>Ne freine plus de l’AV, peu de l’AR, pédale longue, bocal bon, pas de voyant</td><td>Fuite interne du maître-cylindre tandem</td></tr>
<tr><td>Auverland – 2</td><td>Roues AR qui bloquent, aucun témoin</td><td>Correcteur de freinage HS ou déréglé</td></tr>
<tr><td>AX – 1</td><td>Freine mal, pédale dure</td><td>Assistance (aspiration, clapet, pompe à vide, servo)</td></tr>
<tr><td>AX – 2</td><td>Tire à gauche, pédale longue, bocal bon</td><td>Côté droit en cause ; si pressions OK, fuite interne du maître-cylindre</td></tr></table></div>
<p>Garnitures grasses : liquide de frein → coupelles du cylindre de roue ; huile/graisse → joint spi de moyeu ou de pont.</p>
<h3>« Les vitesses passent et le véhicule n’avance pas »</h3>
<p>Depuis quand / voyant ? → le moteur démarre ? → pression de régulation, fuites ? → frein de parc desserré ? → aucun équipement enclenché ? → position de la boîte de transfert ? → arbres de transmission ? → odeur d’embrayage ? → fuite hydraulique ? → robinet inhibiteur d’embrayage ? Sur boîte automatique (TRM, VAB) : <b>convertisseur de couple</b>.</p>`,
      retenir: ['Plonge de l’avant = défaut du freinage ARRIÈRE.', 'Pédale dure = assistance.', 'Pédale longue + bocal bon + pas de voyant = fuite interne du maître-cylindre.', 'Vibrations pédale + volant = disque voilé.'],
      pieges: ['Tire à gauche = c’est le côté DROIT qui freine mal.', 'Garnitures grasses : on les remplace (des deux côtés), on ne les nettoie jamais.'],
      memo: { cle: 'QUESTIONNER · CONSTATER · CONTRÔLER · MESURER · CONCLURE', points: ['Pédale dure → assistance', 'Pédale longue sans fuite → maître-cylindre', 'Plonge AV → freins AR', 'Roues AR bloquent → correcteur', 'Vibrations → disque voilé'], astuce: 'Il tire vers le côté qui freine le mieux : cherche la panne de l’autre côté.' }
    }
  ],
  questions: [
    { l: 'suspension', q: 'Usure des pneus en facettes (méplats) : élément en cause ?', c: ['Les amortisseurs', 'Le parallélisme', 'Le carrossage', 'Le surgonflage'], e: 'Facettes = rebonds de la roue : amortisseurs HS (et équilibrage).', src: 'UV2 (P4, usure en facettes AR)' },
    { l: 'suspension', q: 'Le mouvement de la caisse autour de l’axe longitudinal (gauche/droite) s’appelle :', c: ['Le roulis', 'Le tangage', 'Le pompage', 'Le lacet'], e: 'Tangage = avant/arrière ; roulis = gauche/droite ; pompage = vertical ; lacet = autour de l’axe vertical.' },
    { l: 'suspension', q: 'Remplacement d’amortisseurs : règle à respecter ?', c: ['Toujours par paire sur un même essieu', 'Un seul suffit s’il est HS', 'Les quatre obligatoirement', 'Les stocker à plat'], e: 'Par paire sur un même essieu, et stockés verticalement.' },
    { l: 'angles', q: 'Angle de carrossage : définition retenue au test final ?', c: ['Angle entre l’axe géométrique de la fusée et l’horizontale', 'Angle entre la verticale et l’axe de pivot, vue de côté', 'Différence d’écartement avant/arrière des roues', 'Angle entre la verticale et l’axe de pivot, vue de face'], e: 'Carrossage = angle du plan de roue avec la verticale, ce qui revient à l’angle de la fusée avec l’horizontale.', src: 'Test final Q23 (officiel)' },
    { l: 'angles', q: 'Quel angle assure l’auto-stabilité (le rappel) de la direction ?', c: ['L’angle de chasse', 'Le carrossage', 'Le parallélisme', 'L’angle inclus'], e: 'La chasse (vue de côté) ramène les roues en ligne droite.', src: 'Test final Q24 (officiel)' },
    { l: 'angles', q: 'Définition de l’angle de chasse ?', c: ['Angle entre la verticale et l’axe de pivot, vu de côté (plan longitudinal)', 'Angle entre la verticale et l’axe de pivot, vu de face (plan transversal)', 'Angle entre le plan de roue et la verticale, vu de face', 'Différence d’écartement avant/arrière des roues'], e: 'La chasse se lit de côté, dans le plan longitudinal ; elle assure le rappel de la direction. Vu de face (plan transversal), c’est l’inclinaison de pivot.', w: 'La correction du test final donnait le « plan transversal » : c’est la définition de l’inclinaison de pivot. Le cours dit plan longitudinal.' },
    { l: 'angles', q: 'Quelle barre règle la VALEUR du parallélisme ?', c: ['La barre d’accouplement', 'La barre de direction', 'La barre anti-roulis', 'La barre de torsion'], e: 'Barre d’accouplement = valeur ; barre de direction = répartition.' },
    { l: 'angles', img: 'sym/agd27-p37-1.png', q: 'L’angle inclus est bon (identique à gauche et à droite) mais carrossage et pivot sont hors tolérance. Pièce(s) en cause ?', c: ['Triangle, berceau ou châssis', 'Fusée, porte-fusée et/ou jambe de force', 'Crémaillère', 'Pneumatique'], e: 'Angle inclus bon → triangle, berceau ou châssis. Angle inclus pas bon → fusée, porte-fusée et/ou jambe de force.' },
    { l: 'angles', img: 'sym/agd27-p37-1.png', q: 'L’angle inclus n’est pas bon. Pièce(s) en cause ?', c: ['Fusée, porte-fusée et/ou jambe de force', 'Triangle, berceau ou châssis', 'Barre d’accouplement', 'Amortisseur'], e: 'Angle inclus = carrossage + pivot. Pas bon → fusée, porte-fusée et/ou jambe de force ; bon → triangle, berceau ou châssis.' },
    { l: 'angles', q: 'Angle inclus différent entre gauche et droite. Pièce à incriminer ?', c: ['La fusée, le porte-fusée et/ou la jambe de force', 'Le triangle', 'Le berceau', 'La crémaillère'], e: 'Angle inclus pas bon → fusée, porte-fusée et/ou jambe de force. Angle inclus bon → triangle, berceau ou châssis.' },
    { l: 'angles', q: 'Un véhicule tire du côté…', c: ['Du carrossage le plus positif (et de la chasse la plus faible)', 'Du carrossage le plus négatif', 'De la chasse la plus forte', 'Du pneu le plus gonflé'], e: 'Règle du cours : il tire vers le carrossage le plus positif et la chasse la plus faible.' },
    { l: 'angles', q: 'Un pneu présente une usure RUGUEUSE (en dents de scie). Quel angle est en cause ?', c: ['Le parallélisme', 'Le carrossage', 'La chasse', 'L’inclinaison de pivot'], e: 'Usure rugueuse = parallélisme pas bon ; usure lisse = carrossage pas bon.', r: 'Rugueuse = parallélisme ; lisse = carrossage.' },
    { l: 'angles', q: 'Un pneu présente une usure LISSE. Quel angle est en cause ?', c: ['Le carrossage', 'Le parallélisme', 'La chasse', 'L’angle inclus'], e: 'Usure lisse = carrossage pas bon ; usure rugueuse = parallélisme pas bon.' },
    { l: 'angles', q: 'Un parallélisme hors tolérance provoque une usure…', c: ['Rugueuse', 'Lisse', 'Au centre de la bande', 'En facettes'], e: 'Parallélisme (vue de dessus, ouverture ou pincement) pas bon = usure rugueuse.' },
    { l: 'angles', q: 'Un carrossage hors tolérance provoque une usure…', c: ['Lisse', 'Rugueuse', 'En dents de scie', 'Aucune usure'], e: 'Carrossage (vue de face, positif ou négatif) pas bon = usure lisse.' },
    { l: 'reglage', q: 'Relevés du parallélisme et des angles : parallélisme mesuré +1 mm de pincement (tolérance −1 ± 1 mm) ; carrossage G −0°09′, D −1°10′ (tolérance −0°10′ ± 30′) ; chasse G 3°25′, D 3°30′ (tolérance 3°20′ ± 30′) ; pivot G 10°20′, D 11°35′ (tolérance 10°30′ ± 30′). Quels angles sont hors tolérance ?', c: ['Parallélisme, carrossage droit, pivot droit', 'Parallélisme, carrossage droit, chasse droite', 'Carrossage gauche, chasse droite, pivot droit', 'Uniquement le parallélisme'], e: 'Plages : parallélisme −2 à 0 mm (mesuré +1 → hors) ; carrossage −0°40′ à +0°20′ (D −1°10′ → hors) ; chasse 2°50′ à 3°50′ (OK) ; pivot 10°00′ à 11°00′ (D 11°35′ → hors).', r: 'Toujours écrire la plage mini–maxi avant de comparer.' },
    { l: 'reglage', q: 'Côté droit : carrossage −1°10′ et pivot 11°35′ (hors tolérance), alors que côté gauche carrossage −0°09′ et pivot 10°20′. Quelle pièce incriminer ?', c: ['Un triangle', 'La fusée / porte-fusée', 'La fusée et un triangle', 'La crémaillère'], e: 'Angle inclus = carrossage + pivot : D = 11°35′ − 1°10′ = 10°25′, G = 10°20′ − 0°09′ = 10°11′ : presque identiques. La fusée est bonne ; carrossage et pivot sont décalés en sens inverse → la position du pivot a bougé → triangle.', r: 'Angle inclus bon = triangle, berceau ou châssis ; pas bon = fusée, porte-fusée et/ou jambe de force.' },
    { l: 'reglage', q: 'Carrossage gauche −0°09′, carrossage droit −1°10′ ; chasse gauche 3°25′, chasse droite 3°30′. De quel côté le véhicule aura-t-il tendance à tirer ?', c: ['À gauche', 'À droite', 'Il ne tirera pas', 'Uniquement au freinage'], e: 'Un véhicule tire du côté du carrossage le plus positif (−0°09′ à gauche > −1°10′ à droite) et du côté de la chasse la plus faible (3°25′ à gauche).', r: 'Tire vers le carrossage le plus positif et la chasse la plus faible.' },
    { l: 'reglage', q: 'Parallélisme, hauteur de caisse et carrossage réglables : dans quel ordre régler ?', c: ['Hauteur de caisse → carrossage → parallélisme', 'Carrossage → hauteur → parallélisme', 'Parallélisme → hauteur → carrossage', 'Hauteur → parallélisme → carrossage'], e: 'La hauteur modifie tous les angles ; le parallélisme se règle toujours en dernier.', src: 'UV2 Q5' },
    { l: 'reglage', q: 'Tolérance 10°30′ ± 30′ : quelle plage ?', c: ['10°00′ à 11°00′', '10°00′ à 10°60′', '9°30′ à 11°30′', '10°27′ à 10°33′'], e: '1° = 60′ : 10°30′ − 30′ = 10°00′ ; 10°30′ + 30′ = 11°00′.' },
    { l: 'transmission', q: 'Affirmation FAUSSE sur l’embrayage ?', c: ['« Le diaphragme poussé transmet 20 % de couple en plus que le tiré »', '« L’embrayage permet un accouplement progressif »', '« Le disque fait partie de l’ensemble mené »', '« La butée fait partie de la commande »'], e: 'C’est l’embrayage TIRÉ qui transmet environ 20 % de couple en plus que le poussé.', src: 'Test final Q27 (officiel)' },
    { l: 'transmission', q: 'Laquelle n’est PAS une qualité attendue d’une boîte de vitesses ?', c: ['Avoir une faible inertie', 'Adapter le couple moteur au couple résistant', 'Permettre la marche arrière', 'Permettre le point mort'], e: 'Réponse officielle : « avoir une faible inertie » n’est pas une qualité de la BV.', src: 'Test final Q28 (officiel)' },
    { l: 'transmission', q: 'Une vitesse saute toute seule. Élément en cause ?', c: ['Le verrouillage de positionnement (bille + ressort)', 'Le disque de verrouillage de sécurité', 'La butée d’embrayage', 'Le reniflard'], e: 'Bille + ressort maintiennent la vitesse engagée. Deux vitesses à la fois = verrouillage de sécurité.' },
    { l: 'transmission', q: 'Seule la 3ᵉ craque au passage. Cause ?', c: ['Le synchro de 3ᵉ', 'La butée', 'La garde d’embrayage', 'Le mécanisme d’embrayage'], e: 'Une seule vitesse → son synchroniseur. Toutes les vitesses → garde / purge / mécanisme.' },
    { l: 'transmission', q: 'Bruit à l’appui sur la pédale d’embrayage, qui disparaît au relâché :', c: ['La butée', 'Les ressorts de progressivité', 'Le synchro', 'Le volant moteur'], e: 'La butée ne travaille que pédale enfoncée.' },
    { l: 'transmission', q: 'Boîte automatique (TRM, VAB) : les vitesses passent mais le véhicule n’avance pas. Cause classique ?', c: ['Le convertisseur de couple', 'La butée d’embrayage', 'Le synchro', 'Le reniflard'], e: 'Sur BV automatique, le convertisseur transmet le couple : s’il est HS, rien n’avance.' },
    { l: 'transmission', q: 'Suintement d’huile sur la boîte de vitesses :', c: ['Reniflard bouché', 'Butée usée', 'Synchro HS', 'Ressorts de progressivité'], e: 'Reniflard bouché → surpression interne → l’huile sort par les joints.' },
    { l: 'willis', q: 'Train épicycloïdal : couronne motrice (Zc = 80, 600 tr/min), planétaire fixe (Zp = 40). Vitesse du porte-satellites ?', c: ['400 tr/min, avant démultiplié', '900 tr/min, avant multiplié', '400 tr/min, marche arrière', '1 200 tr/min, prise directe'], e: 'Zp·Np + Zc·Nc = (Zp+Zc)·Nps → 0 + 80 × 600 = 120 × Nps → Nps = 400 tr/min, même sens.', r: 'Porte-satellites mené = démultiplié.', src: 'UV2 Q11' },
    { l: 'willis', q: 'Porte-satellites FIXE, planétaire menant : résultat ?', c: ['Marche arrière démultipliée', 'Avant multiplié', 'Prise directe', 'Avant démultiplié'], e: 'Porte-satellites fixe = marche arrière.', r: 'Mené = démultiplié ; menant = multiplié ; fixe = marche arrière.' },
    { l: 'willis', q: 'Planétaire menant 1 200 tr/min (Zp = 30), couronne Zc = 40, porte-satellites bloqué. Vitesse de la couronne ?', img: 'willis.png', c: ['900 tr/min en marche arrière', '800 tr/min en marche arrière', '1 600 tr/min en avant', '900 tr/min en avant'], e: '30 × 1 200 + 40 × Nc = 0 → Nc = −900 tr/min (sens inverse).', w: 'La fiche indiquait 800 tr/min : erreur de report probable.' },
    { l: 'willis', q: 'Deux éléments d’un train épicycloïdal sont liés ensemble. Résultat ?', c: ['Prise directe', 'Marche arrière', 'Grande démultiplication', 'Point mort'], e: 'Tout le train tourne d’un bloc : rapport 1.' },
    { l: 'freinage', q: 'Rôle du maître-cylindre ?', c: ['Transformer la force mécanique en pression hydraulique', 'Doser la pression à l’arrière', 'Assister l’effort du conducteur', 'Transformer la pression en effort de serrage'], e: 'Il reçoit l’effort de la pédale et crée la pression dans les circuits.', src: 'Test final Q25 (officiel)' },
    { l: 'freinage', q: 'Rôles de l’ICP by-pass ?', c: ['Signaler une chute de pression et envoyer la pression maxi à l’arrière si l’avant lâche', 'Limiter la pression arrière selon la charge', 'Garder une pression résiduelle à l’arrière', 'Assister le freinage'], e: 'Il allume le témoin et, si le circuit AV lâche, shunte le correcteur pour freiner fort à l’AR.', src: 'Test final Q26 (officiel)' },
    { l: 'freinage', q: 'Pédale qui s’enfonce, aucune trace de fuite. Élément en cause ?', c: ['Le maître-cylindre tandem (fuite interne)', 'Le Mastervac', 'Un flexible', 'Le correcteur'], e: 'Pas de fuite externe → le liquide passe d’une chambre à l’autre à l’intérieur du maître-cylindre.', src: 'UV2 Q7' },
    { l: 'freinage', q: 'Contrôle du Mastervac, résultat correct ?', c: ['Pédale dure moteur arrêté, qui s’enfonce un peu au démarrage', 'Pédale molle moteur arrêté', 'Pédale qui remonte moteur arrêté', 'Pédale dure qui reste dure au démarrage'], e: 'Moteur arrêté, pomper 5 à 7 fois → pédale dure ; au démarrage la dépression revient et la pédale s’enfonce.', src: 'UV2' },
    { l: 'freinage', q: 'Point d’ébullition du liquide de frein à partir duquel il faut le remplacer ?', c: ['≤ 165 °C', '≤ 65 °C', '≤ 185 °C', '≤ 230 °C'], e: '≥ 185 °C performant ; 165–185 °C correct ; ≤ 165 °C à remplacer.', w: 'La fiche manuscrite parlait de 65 °C : à faire expliquer, retiens 165 °C.' },
    { l: 'freinage', q: 'Rôle de la SPR dans un circuit HI ?', c: ['Garder 0,5 à 1,5 bar dans le circuit arrière pour plaquer les coupelles', 'Doser la pression arrière selon la charge', 'Signaler une chute de pression', 'Isoler une roue en ABS'], e: 'Soupape de pression résiduelle : les coupelles restent plaquées, pas de prise d’air.' },
    { l: 'freinage', q: 'Sur quel type de circuit trouve-t-on un ICP by-pass (exemple : Auverland) ?', c: ['Un circuit II', 'Un circuit en X', 'Un circuit HI', 'Un circuit pneumatique'], e: 'Il indique une fuite sur le circuit avant ou arrière et, si l’avant fuit, envoie la pression maxi à l’arrière en shuntant le correcteur.' },
    { l: 'freinage', q: 'Contrôle de l’ICP by-pass : on crée une fuite sur le circuit AVANT. Que doit-on constater ?', c: ['Une baisse de pression à l’avant et une augmentation à l’arrière', 'Une baisse de pression sur les deux circuits', 'Aucun changement', 'Une augmentation à l’avant'], e: 'Manomètres purgés sur l’avant et l’arrière : l’ICP shunte le correcteur et envoie la pression maxi à l’arrière.' },
    { l: 'freinage', q: 'Sur quel type de frein trouve-t-on une SPR ?', c: ['Sur un circuit de frein à tambours ancienne génération', 'Sur un frein à disques à étrier fixe', 'Sur un frein pneumatique', 'Sur le frein de stationnement'], e: 'Elle garde 0,5 à 1,5 bar dans le circuit arrière pour plaquer les joints des cylindres de roue.' },
    { l: 'freinage', q: 'Contrôle de la SPR : jusqu’à quelle pression appuyer sur la pédale, et combien de temps attendre ?', c: ['3 à 4 bar maximum, puis attendre 5 à 10 minutes', '10 bar, puis lire tout de suite', '0,5 bar, puis attendre 1 heure', '100 bar, puis attendre 30 secondes'], e: 'Manomètre basse pression (TESTARC) purgé sur le circuit arrière ; hors 0,5–1,5 bar → remplacer la SPR.' },
    { l: 'freinage', q: 'Après le contrôle, la pression résiduelle lue sur le circuit arrière est de 0,1 bar. Que faire ?', c: ['Remplacer la SPR (tarage 0,5 à 1,5 bar)', 'Rien, c’est normal', 'Remplacer le maître-cylindre', 'Purger l’avant'], e: 'La SPR doit garder 0,5 à 1,5 bar.' },
    { l: 'freinage', q: 'Maître-cylindre tandem à soupapes basculantes : rôle des soupapes ?', c: ['Isoler un circuit en cas de fuite', 'Doser la pression arrière', 'Assister l’effort', 'Garder une pression résiduelle'], e: 'Types de maître-cylindre tandem : à trou de dilatation, à soupapes basculantes, à clapets.' },
    { l: 'freinage', q: 'Correcteur de freinage « compensateur » : caractéristiques ?', c: ['Asservi à la charge, positionné à l’arrière, intégré au cylindre de roue', 'Non asservi à la charge, positionné à l’avant', 'Placé sur le maître-cylindre', 'Commandé par l’ABS'], e: 'Le limiteur n’est pas asservi à la charge et se place à l’avant.' },
    { l: 'freinage', q: 'Pourquoi le liquide de frein doit-il être remplacé régulièrement ?', c: ['Il absorbe l’humidité avec le temps, son point d’ébullition baisse', 'Il s’évapore', 'Il durcit', 'Il devient trop visqueux avec la chaleur'], e: '≥ 185 °C : performant ; 165–185 °C : correct, à changer s’il a plus de 2 ans ; ≤ 165 °C : à remplacer.' },
    { l: 'panne', q: 'Pédale dure : dans quel ordre contrôler ?', c: ['Assistance (moteur arrêté / tournant) → aspiration (clapet, tuyau) → pompe à vide → servo-frein (filtre)', 'Maître-cylindre → étriers → disques', 'Correcteur → SPR → ICP', 'Liquide → purge → bocal'], e: 'Pédale dure = défaut d’assistance.' },
    { l: 'panne', q: 'Le véhicule plonge vers l’avant au freinage (circuit I, H ou II). Où chercher ?', c: ['Sur le circuit arrière : purge / prise de pression, correcteur, garnitures grasses, SPR (0,5 à 1,5 bar)', 'Sur le circuit avant uniquement', 'Sur l’assistance', 'Sur le Mastervac'], e: 'Si l’arrière freine mal, tout le freinage est fait par l’avant.' },
    { l: 'panne', q: 'Voyant ABS allumé après intervention : quels contrôles ?', c: ['Capteur remis en place ? câble branché, pas arraché ? cible (couronne dentée) non abîmée ?', 'Purger tout le circuit', 'Changer le calculateur', 'Changer les plaquettes'], e: 'C’est presque toujours un élément démonté mal remonté.' },
    { l: 'abs', q: 'Rôle de l’ABS ?', c: ['Améliorer stabilité, directibilité et efficacité du freinage', 'Garantir une distance de freinage plus courte', 'Éviter le patinage à l’accélération', 'Corriger le sous-virage'], e: 'L’ABS évite le blocage des roues pour garder le contrôle ; il ne garantit pas une distance plus courte.', src: 'UV2' },
    { l: 'abs', q: 'L’ESP intervient en cas de sous-virage. Cela signifie que…', c: ['Le train avant chasse (le véhicule tire tout droit)', 'Le train arrière chasse', 'Les roues motrices patinent', 'Une roue se bloque'], e: 'Sous-virage = l’AV glisse vers l’extérieur ; survirage = l’AR chasse.' },
    { l: 'abs', q: 'Quel système évite le patinage des roues motrices ?', c: ['L’ASR', 'L’ABS', 'L’ICP', 'La SPR'], e: 'ASR = antipatinage à l’accélération.' },
    { l: 'abs', q: 'Capteur de roue qui mesure jusqu’à 0 km/h ?', c: ['Le capteur à effet Hall', 'Le capteur inductif', 'Le capteur piézo-électrique', 'La CTN'], e: 'Le Hall (alimenté, créneaux) mesure jusqu’à l’arrêt ; l’inductif n’a plus de signal à très basse vitesse.' },
    { l: 'pneus', q: 'Dans le marquage « 185 70 R 15 86 T », que représente la lettre T ?', c: ['L’indice de vitesse', 'L’indice de charge', 'Le type de carcasse', 'La saison'], e: '86 = indice de charge ; T = indice de vitesse (190 km/h). R = radial.', src: 'Test final Q21 (officiel)' },
    { l: 'pneus', q: 'Que signifie le marquage « V CFD 20 » sur un pneumatique ?', c: ['Recreusé (1ᵉʳ recreusage) à Clermont-Ferrand en 2020', 'Vérifié à Clermont-Ferrand en 2020', 'Vérifié à Clermont-Ferrand la 20ᵉ semaine', 'Vitesse maxi 200 km/h'], e: 'V = recreusé (VV = 2ᵉ recreusage) ; CFD = localité de l’intervention (Clermont-Ferrand) ; 20 = année du recreusage.', w: 'Une correction de test donnait « vérifié » : la fiche de révision dit RECREUSÉ.' },
    { l: 'pneus', q: 'Que signifie « DOT 4217 » sur un pneumatique ?', c: ['Fabriqué la 42ᵉ semaine de 2017', 'Fabriqué en 1742', 'Indice de charge 42, vitesse 17', 'Fabriqué le 4 février 2017'], e: 'Les 4 chiffres = semaine puis année de fabrication. DOT = Department Of Transportation (sigle des manufactures américaines).' },
    { l: 'pneus', q: 'Dans « 225/40 R18 92 Y », que signifie 225 ?', c: ['La largeur de la bande de roulement, de flanc à flanc, en mm', 'Le diamètre de la jante en mm', 'La hauteur du flanc en mm', 'La charge maxi en kg'], e: '225 mm de flanc à flanc ; 40 = le flanc fait 40 % de 225 mm.' },
    { l: 'pneus', q: 'Dans « 225/40 R18 92 Y », que signifie 40 ?', c: ['La hauteur du flanc : 40 % de la largeur', 'La hauteur du flanc : 40 mm', 'L’indice de charge', 'Le diamètre en cm'], e: 'Rapport Hauteur / Largeur en pourcentage : le flanc fait 40 % de 225 mm.' },
    { l: 'pneus', q: 'Dans « 225/40 R18 92 Y », que signifie 18 ?', c: ['Le diamètre intérieur du pneu (accrochage de la jante) en pouces', 'La largeur en pouces', 'L’année de fabrication', 'La pression de gonflage'], e: '18" = diamètre d’accrochage de la jante.' },
    { l: 'pneus', q: 'Dans « 225/40 R18 92 Y », que signifie 92 ?', c: ['L’indice de charge (charge maxi en kg, voir tableau)', 'L’indice de vitesse', 'La charge maxi : 92 kg', 'La hauteur du flanc'], e: '92 = indice de charge ; Y = indice de vitesse. On lit la valeur réelle dans le tableau des indices.' },
    { l: 'pneus', q: 'Que signifie le sigle « DOT » sur un pneumatique ?', c: ['Department Of Transportation (manufactures américaines)', 'Date Of Tyre', 'Dimension Officielle du Talon', 'Diamètre Ou Taille'], e: 'Il est suivi de la semaine et de l’année de fabrication.' },
    { l: 'pneus', q: 'Pneu PL « 295/80 R22.5 152/148 L » : que signifient 152 et 148 ?', c: ['Indice de charge en roue solo (152) et en roue jumelée (148)', 'Indice de vitesse avant (152) et arrière (148)', 'Charge maxi en kg de chaque roue', 'Largeur mini et maxi'], e: 'Deux indices de charge : montage roue SOLO puis roue JUMELÉE. L = indice de vitesse.' },
    { l: 'pneus', q: 'Inclinaison du talon d’accrochage pour une jante de 22,5" ?', c: ['15°', '5°', '45°', '22,5°'], e: 'Jante 22,5" : talon à 15° ; jante 20" (ex. 14.00 R20) : talon à 5°.' },
    { l: 'pneus', q: 'Pneu « 14.00 R20 » : que signifie 14 ?', c: ['La largeur de la bande de roulement en pouces (14")', 'La largeur en mm', 'Le diamètre de la jante', 'L’indice de charge'], e: 'Sur ce type de marquage, la largeur est en pouces.' },
    { l: 'pneus', q: 'Pneu « 14.00 R20 » : que signifie « 00 » ?', c: ['Rapport H/L de 100 % : pneu dit « carré »', 'Pneu sans chambre', 'Aucune indication', 'Flanc de 0 mm'], e: 'Le flanc fait 100 % de 14" : mêmes dimensions en hauteur et en largeur.' },
    { l: 'pneus', q: 'Marquage militaire « AR17 » :', c: ['Pneumatique exclusivement militaire, « Armée », fabriqué en 2017', 'Rechapé en 2017', 'Recreusé en 2017', 'Arrière droit, 17 pouces'], e: 'AR = armée ; R = rechapé ; V = recreusé.' },
    { l: 'pneus', q: 'Marquage militaire « R18 » :', c: ['Rechapé en 2018', 'Radial 18 pouces', 'Recreusé en 2018', 'Armée 2018'], e: 'R = rechapé (nouvelle bande de roulement) ; V = recreusé (sculptures recreusées).' },
    { l: 'pneus', q: 'Que signifie « VV » sur un pneumatique militaire ?', c: ['2ᵉ recreusage', 'Double vitesse', 'Vérifié deux fois', 'Véhicule de l’avant'], e: 'V = 1ᵉʳ recreusage ; VV = 2ᵉ recreusage.' },
    { l: 'panne', q: 'Le véhicule plonge de l’avant au freinage. Diagnostic ?', c: ['Défaut du freinage arrière', 'Défaut du freinage avant', 'Assistance défaillante', 'Maître-cylindre HS'], e: 'Si l’arrière ne freine pas assez, tout le freinage est fait par l’avant : la caisse plonge.', src: 'Cas P4 – 1' },
    { l: 'panne', q: 'Freine mal, pédale DURE. Élément à contrôler ?', c: ['L’assistance (aspiration, clapet, pompe à vide, servo)', 'Le maître-cylindre', 'Le correcteur', 'Les disques'], e: 'Pédale dure = l’assistance ne fonctionne plus.', src: 'Cas AX – 1' },
    { l: 'panne', q: 'Ne freine plus de l’AV, peu de l’AR, pédale longue, bocal bon, pas de voyant. Diagnostic ?', c: ['Fuite interne du maître-cylindre tandem', 'Correcteur HS', 'Assistance HS', 'Disque voilé'], e: 'Bocal bon + pas de voyant ICP = pas de fuite externe ; pédale longue sans pression AV = fuite interne.', src: 'Cas Auverland – 1' },
    { l: 'panne', q: 'Les roues arrière bloquent au freinage, aucun témoin. Élément en cause ?', c: ['Le correcteur de freinage (HS ou déréglé)', 'Le maître-cylindre', 'La SPR', 'Le Mastervac'], e: 'Trop de pression à l’arrière : le correcteur ne la limite plus.', src: 'Cas Auverland – 2' },
    { l: 'panne', q: 'Pédale ET volant vibrent au freinage. Cause ?', c: ['Disque voilé', 'Régulation ABS normale à chaque freinage', 'Garnitures grasses', 'Correcteur grippé'], e: 'Disque voilé (refroidissement trop rapide après un gros freinage) : remplacer disques + plaquettes par paire.', w: 'Des pulsations seulement en freinage fort = régulation ABS normale.', src: 'Cas ABS – 1' },
    { l: 'panne', q: 'Garnitures de frein grasses : que faire ?', c: ['Trouver la fuite et remplacer les garnitures des deux côtés', 'Les nettoyer au dégraissant', 'Remplacer seulement le côté gras', 'Purger le circuit uniquement'], e: 'Des garnitures grasses ne se nettoient jamais ; on répare la fuite, on change les deux côtés, on dégraisse et on purge.', src: 'Cas P4 – 2' },
    { l: 'panne', q: 'Tire à gauche au freinage, pédale longue, bocal bon. Côté en cause ?', c: ['Le côté droit', 'Le côté gauche', 'L’arrière', 'Aucun, c’est normal'], e: 'Il tire vers le côté qui freine le mieux : c’est le droit qui freine mal (étrier grippé, garnitures grasses, flexible). Si les pressions sont bonnes : fuite interne du maître-cylindre.', src: 'Cas AX – 2' },
    { l: 'panne', q: 'Voyant ABS allumé après le changement des plaquettes arrière. Piste ?', c: ['Capteur, faisceau ou cible abîmé ou mal remonté', 'Liquide de frein trop vieux', 'Disque voilé', 'Maître-cylindre HS'], e: 'Élément démonté mal remonté : connecteur, faisceau pincé, entrefer du capteur, cible sale ou abîmée.', src: 'Cas ABS – 2' }
  ]
});
