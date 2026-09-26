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
<li><b>Parallélisme</b> : différence d’écartement avant/arrière des roues d’un essieu, vue de dessus. (−) = ouverture, (+) = pincement.</li>
<li><b>Déport</b> : distance au sol entre l’axe de pivot et le plan de roue, vue de face.</li>
<li><b>Carrossage</b> : angle entre le plan de roue et la verticale (= axe de fusée et horizontale), vue de face.</li>
<li><b>Inclinaison de pivot</b> : angle entre la verticale et l’axe de pivot, plan TRANSVERSAL, vue de face.</li>
<li><b>Chasse</b> : angle entre la verticale et l’axe de pivot, plan LONGITUDINAL, vue de côté. Elle assure l’<b>auto-stabilité (rappel)</b> de la direction.</li>
<li><b>Angle inclus</b> = carrossage + pivot : angle de diagnostic, pas de réglage. Faux → fusée / porte-fusée déformé ; bon mais carrossage et pivot décalés → triangle / berceau.</li></ul>
<div class="tw"><table><tr><th>Angle</th><th>Vue</th><th>Référence</th><th>Signe / défaut</th></tr>
<tr><td>Carrossage</td><td>De face</td><td>Verticale / plan de roue</td><td>+ ou − · faux = usure LISSE</td></tr>
<tr><td>Pivot</td><td>De face</td><td>Verticale / axe de pivot</td><td>Toujours positif</td></tr>
<tr><td>Chasse</td><td>De côté</td><td>Verticale / axe de pivot</td><td>+ ou −</td></tr>
<tr><td>Angle inclus</td><td>—</td><td>Carrossage + pivot</td><td>Angle de diagnostic</td></tr>
<tr><td>Parallélisme</td><td>De dessus</td><td>Ouverture (−) / pincement (+)</td><td>Faux = usure RUGUEUSE</td></tr></table></div>
<div class="tw"><table><tr><th>Usure du pneu</th><th>Cause</th></tr>
<tr><td>Rugueuse (dents de scie) côté extérieur</td><td>Trop de pincement</td></tr>
<tr><td>Rugueuse côté intérieur</td><td>Trop d’ouverture</td></tr>
<tr><td>Lisse côté extérieur</td><td>Carrossage trop positif</td></tr>
<tr><td>Lisse côté intérieur</td><td>Carrossage trop négatif</td></tr>
<tr><td>Centre de la bande</td><td>Surgonflage</td></tr>
<tr><td>Les deux bords</td><td>Sous-gonflage</td></tr>
<tr><td>Facettes / méplats</td><td>Amortisseurs (+ équilibrage)</td></tr></table></div>
<div class="tw"><table><tr><th>Constat</th><th>Pièce incriminée</th></tr>
<tr><td>Angle inclus identique G/D, carrossage et pivot décalés en sens inverse</td><td>Triangle, bras, berceau</td></tr>
<tr><td>Angle inclus différent G/D</td><td>Fusée / porte-fusée faussé</td></tr>
<tr><td>Chasse hors tolérance d’un côté</td><td>Tirant, triangle, longeron</td></tr></table></div>
<p>Le véhicule <b>tire du côté du carrossage le plus positif</b>, et du côté de la chasse la plus faible.</p>
<div class="box trancher"><b>⚖ À trancher</b><p>Test final Q22 : la correction officielle donne la réponse 4 (« verticale et axe de pivot dans le plan transversal »). Sur le fond, c’est la définition de l’inclinaison de pivot : la chasse se lit de côté, plan longitudinal. Au test, coche la réponse officielle ; en cours, retiens la vraie définition.</p></div>`,
      retenir: ['Rugueuse = parallélisme ; lisse = carrossage.', 'Chasse = auto-stabilité de la direction (vue de côté).', 'Angle inclus = carrossage + pivot (diagnostic).', 'Tire du côté du carrossage le plus positif.'],
      pieges: ['Barre d’accouplement = valeur ; barre de direction = répartition.', 'Chasse : définition officielle du test ≠ définition du cours (voir encadré).'],
      memo: { cle: 'RUGUEUSE = PARALLÉLISME · LISSE = CARROSSAGE', points: ['Pincement → rugueux extérieur', 'Ouverture → rugueux intérieur', 'Carrossage + → lisse extérieur', 'Carrossage − → lisse intérieur', 'Inclus faux → fusée ; inclus bon → triangle'], astuce: 'Les dents de scie « frottent » : c’est la roue qui ne roule pas droit (parallélisme).' }
    },
    {
      id: 'reglage', title: 'Réglage du train (tableau ALFA)',
      html: `
<ul><li><b>Avant le banc</b> : essai, MAT 10004, pneus (usure, pression, conformité), jantes (voile), jeux DSFT, hauteur de caisse.</li>
<li><b>Ordre</b> : hauteur de caisse → chasse → pivot → carrossage → hauteur de crémaillère → <b>parallélisme (toujours en dernier</b> : d’abord la valeur à la barre d’accouplement, puis la répartition à la barre de direction, volant bloqué, repères alignés).</li>
<li><b>Boîtier de direction</b> : contrôler les périphériques, désaccoupler bielle pendante et barre, trouver le point milieu, régler selon le constructeur, chercher les points durs, réaccoupler avec goupille et écrou neufs.</li>
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
<li><b>ICP by-pass</b> : indique une chute de pression et, si le circuit avant lâche, envoie la pression maxi à l’arrière en shuntant le correcteur.</li>
<li><b>Correcteurs</b> : limiteur (plafond de pression) ou compensateur (pente continue), asservis ou non à la charge.</li>
<li><b>SPR</b> (circuit HI) : garde 0,5 à 1,5 bar dans le circuit arrière pour plaquer les coupelles.</li>
<li>Circuits : standard, II, X, HI, HH, L. Tambour : rattrapage Bendix / Girling ; disque : étrier fixe ou flottant, rappel par le joint carré.</li>
<li><b>Liquide de frein</b> : bidon ouvert à utiliser sous 72 h ; normes HS42, DOT 3, DOT 4, DOT 5. Point d’ébullition ≥ 185 °C performant ; 165–185 °C correct (changer si &gt; 2 ans) ; <b>≤ 165 °C à remplacer</b>.</li></ul>
<div class="box methode"><b>✎ Contrôle du Mastervac</b><p>Moteur arrêté, pomper 5 à 7 fois → pédale dure et haute ; pied maintenu, démarrer → la pédale s’enfonce un peu puis se stabilise. Étanchéité : moteur coupé, attendre 30 s, 2 à 3 coups assistés ; pied appuyé en coupant le moteur, la pédale ne remonte pas pendant 30 s.</p></div>
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
<div class="tw"><table><tr><th>Marquage</th><th>Lecture</th></tr>
<tr><td>Jante 5½ J 13 FH E28</td><td>Largeur 5½" · rebord J · diamètre 13" · sécurité FH (flat hump) · déport 28 mm</td></tr>
<tr><td>Pneu 185/70 R13 86T M+S</td><td>Largeur 185 mm · H/S 70 % · radial · 13" · charge 86 (530 kg) · <b>vitesse T</b> (190 km/h) · neige</td></tr>
<tr><td>Pneu PL 295/80 R 22.5 152/148 H</td><td>Largeur · H/L 80 % · radial · 22,5" · charge roue simple / jumelée · vitesse</td></tr>
<tr><td>12.00 R 20</td><td>Largeur en pouces, 00 = rapport H/L, radial, jante 20"</td></tr>
<tr><td>DOT 4519</td><td>Semaine 45 de 2019. Ton cours : pneu utilisable 20 ans</td></tr>
<tr><td>V CFD 20</td><td>Vérifié à Clermont-Ferrand en 2020</td></tr>
<tr><td>REGROOVABLE / BRAND TIRE HERE</td><td>Recreusable / zone de marquage à chaud</td></tr></table></div>`,
      retenir: ['Dans 185/70 R13 86T : 86 = indice de charge, T = indice de vitesse.', 'DOT 4519 = semaine 45 de 2019.', 'V CFD 20 = vérifié à Clermont-Ferrand en 2020.'],
      pieges: ['La lettre après l’indice de charge est la VITESSE, pas la charge.'],
      memo: { cle: 'LARGEUR / SÉRIE R DIAMÈTRE CHARGE VITESSE', points: ['185 mm / 70 % / radial / 13" / 86 / T', 'DOT SSAA = semaine + année', 'V CFD 20 = vérifié CF 2020'], astuce: 'Le chiffre porte (charge), la lettre court (vitesse).' }
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
    { l: 'angles', q: 'Définition de la chasse selon la correction OFFICIELLE du test final (réponse 4) ?', c: ['Angle entre la verticale au sol et l’axe de pivot dans le plan transversal', 'Angle entre la verticale et l’axe de pivot dans le plan longitudinal', 'Angle entre le plan de roue et la verticale', 'Distance au sol entre l’axe de pivot et le plan de roue'], e: 'Au test, c’est la réponse officielle (Q22 = 4). Sur le fond, c’est la définition de l’inclinaison de pivot : la chasse se lit de côté, plan longitudinal.', w: 'Coche la réponse officielle au test, mais retiens la vraie définition (plan longitudinal) et signale l’écart au formateur.', src: 'Test final Q22 (officiel)' },
    { l: 'angles', q: 'Usure RUGUEUSE (dents de scie) à l’intérieur du pneu avant gauche. Cause probable ?', c: ['Trop d’ouverture au parallélisme', 'Carrossage trop négatif', 'Trop de pincement', 'Sous-gonflage'], e: '« Rugueuse » = parallélisme ; côté intérieur = ouverture. Le carrossage donne une usure lisse.', w: 'Uv1 répondait « carrossage trop négatif » : c’est la cause d’une usure LISSE intérieure.', src: 'UV2 Q4 (tableau ALFA)' },
    { l: 'angles', q: 'Usure lisse côté extérieur de la bande de roulement :', c: ['Carrossage trop positif', 'Carrossage trop négatif', 'Trop de pincement', 'Surgonflage'], e: 'Lisse = carrossage ; extérieur = carrossage trop positif.' },
    { l: 'angles', q: 'Usure au centre de la bande de roulement :', c: ['Surgonflage', 'Sous-gonflage', 'Amortisseurs HS', 'Trop d’ouverture'], e: 'Surgonflé, le pneu bombe et ne porte qu’au centre. Sous-gonflé : usure des deux bords.' },
    { l: 'angles', q: 'Quelle barre règle la VALEUR du parallélisme ?', c: ['La barre d’accouplement', 'La barre de direction', 'La barre anti-roulis', 'La barre de torsion'], e: 'Barre d’accouplement = valeur ; barre de direction = répartition.' },
    { l: 'angles', q: 'Angle inclus différent entre gauche et droite. Pièce à incriminer ?', c: ['La fusée / porte-fusée', 'Le triangle', 'Le longeron', 'La crémaillère'], e: 'Angle inclus = carrossage + pivot : il ne dépend que de la fusée. S’il est bon mais carrossage et pivot décalés → triangle / berceau.' },
    { l: 'angles', q: 'Un véhicule tire du côté…', c: ['Du carrossage le plus positif (et de la chasse la plus faible)', 'Du carrossage le plus négatif', 'De la chasse la plus forte', 'Du pneu le plus gonflé'], e: 'Règle du cours : il tire vers le carrossage le plus positif et la chasse la plus faible.' },
    { l: 'reglage', q: 'Tableau ALFA : quels angles sont hors tolérance ?', img: 'tableau-alfa.jpg', c: ['Parallélisme, carrossage droit, pivot droit', 'Parallélisme, carrossage droit, chasse droite', 'Carrossage gauche, chasse droite, pivot droit', 'Uniquement le parallélisme'], e: 'Pincement +1 mm hors de −2…0 ; carrossage D −1°10′ hors de −0°40′…+0°20′ ; pivot D 11°35′ hors de 10°00′…11°00′.', r: 'Toujours écrire la plage mini–maxi avant de comparer.', src: 'UV2 Q1' },
    { l: 'reglage', q: 'Tableau ALFA : quelle pièce incriminer ?', img: 'tableau-alfa.jpg', c: ['Un triangle', 'La fusée / porte-fusée', 'La fusée et un triangle', 'La crémaillère'], e: 'Angle inclus D = 11°35′ − 1°10′ = 10°25′, proche de G : la fusée est bonne, c’est la position du pivot qui a bougé → triangle.', src: 'UV2 Q2' },
    { l: 'reglage', q: 'Tableau ALFA (carrossage G −0°09′, D −1°10′) : le véhicule aura tendance à tirer…', img: 'tableau-alfa.jpg', c: ['À gauche', 'À droite', 'Il ne tirera pas', 'Uniquement au freinage'], e: 'Carrossage le plus positif à gauche (−0°09′ > −1°10′) et chasse la plus faible à gauche.', w: 'Uv1 disait « à droite » ; les deux corrigés UV2 disent gauche.', src: 'UV2 Q3' },
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
    { l: 'abs', q: 'Rôle de l’ABS ?', c: ['Améliorer stabilité, directibilité et efficacité du freinage', 'Garantir une distance de freinage plus courte', 'Éviter le patinage à l’accélération', 'Corriger le sous-virage'], e: 'L’ABS évite le blocage des roues pour garder le contrôle ; il ne garantit pas une distance plus courte.', src: 'UV2' },
    { l: 'abs', q: 'L’ESP intervient en cas de sous-virage. Cela signifie que…', c: ['Le train avant chasse (le véhicule tire tout droit)', 'Le train arrière chasse', 'Les roues motrices patinent', 'Une roue se bloque'], e: 'Sous-virage = l’AV glisse vers l’extérieur ; survirage = l’AR chasse.' },
    { l: 'abs', q: 'Quel système évite le patinage des roues motrices ?', c: ['L’ASR', 'L’ABS', 'L’ICP', 'La SPR'], e: 'ASR = antipatinage à l’accélération.' },
    { l: 'abs', q: 'Capteur de roue qui mesure jusqu’à 0 km/h ?', c: ['Le capteur à effet Hall', 'Le capteur inductif', 'Le capteur piézo-électrique', 'La CTN'], e: 'Le Hall (alimenté, créneaux) mesure jusqu’à l’arrêt ; l’inductif n’a plus de signal à très basse vitesse.' },
    { l: 'pneus', q: 'Dans le marquage « 185 70 R 15 86 T », que représente la lettre T ?', c: ['L’indice de vitesse', 'L’indice de charge', 'Le type de carcasse', 'La saison'], e: '86 = indice de charge ; T = indice de vitesse (190 km/h). R = radial.', src: 'Test final Q21 (officiel)' },
    { l: 'pneus', q: 'Que signifie le marquage « V CFD 20 » ?', c: ['Vérifié à Clermont-Ferrand en 2020', 'Recreusé à Clermont-Ferrand en 2020', 'Vérifié la 20ᵉ semaine', 'Vitesse maxi 200 km/h'], e: 'V = vérifié, CFD = Clermont-Ferrand, 20 = 2020.', src: 'UV2 Q6' },
    { l: 'pneus', q: 'Que signifie « DOT 4519 » ?', c: ['Fabriqué la semaine 45 de 2019', 'Fabriqué en 1945', 'Indice de charge 45, vitesse 19', 'Pneu de 45 cm, jante 19"'], e: 'Les 4 chiffres = semaine + année de fabrication.' },
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
