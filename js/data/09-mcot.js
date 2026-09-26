REV.add({
  id: 'mcot', name: 'Environnement maintenance / MCO-T / RDC', icon: '🛠️', color: '#475569',
  desc: 'Doctrine vérifiée contre l’AQA 03 (édition R, janvier 2026) + QCM et contrôles RDC.',
  lessons: [
    {
      id: 'histoire', title: 'Histoire et culture du Matériel',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Naissance de l’esprit maintenance</td><td>Avec l’<b>artillerie</b> au Moyen-Âge (AQA 03) — un QCM répondait « cavalerie »</td></tr>
<tr><td>Saint Éloi, patron du Matériel, meurt en…</td><td>659</td></tr>
<tr><td>Service du Matériel</td><td>Corps institué le 25/08/1940 ; 1943 : 1ʳᵉ école du Matériel à Meknès</td></tr>
<tr><td>Musée du Matériel et de la maintenance</td><td>Créé en 1997 (centre de recueil du patrimoine), à Bourges en 1999, nom actuel en 2012, rouvert le 1ᵉʳ juillet 2023</td></tr>
<tr><td>Étendard du Matériel</td><td>Remis le 5 septembre 1980</td></tr>
<tr><td>Garde de l’étendard</td><td>Assurée par les BSMAT depuis 2018 ; 2025-2026 : 13ᵉ BSMAT</td></tr>
<tr><td>Pilote du domaine maintenance (MAI)</td><td>COM ÉcoMAT (depuis l’été 2024)</td></tr>
<tr><td>COMMF créé le 1ᵉʳ juillet…</td><td>2016 (non vérifiable dans l’AQA 03)</td></tr>
<tr><td>EMPT</td><td>Pôle formation de la DRH-AT ; 2 ans à Bourges (créée en 2022), bac avec le GRETA ; contrat EVSO de 9 ans ; devise « instruits, droits, adroits » ; drapeau le 27/10/2022</td></tr>
<tr><td>CETAT</td><td>Centre d’Enseignement Technique de l’Armée de Terre ; stagiaires engagés pour 2 ans</td></tr>
<tr><td>BM3</td><td>Tenir les fonctions de chef de section, commander une section C3T dans les MCT de niveau 6</td></tr>
<tr><td>CAMO (07/11/2018)</td><td>Partenariat stratégique avec la Belgique</td></tr></table></div>`,
      retenir: ['Esprit maintenance : l’artillerie (AQA 03).', 'Saint Éloi meurt en 659.', 'Service du Matériel : 25/08/1940.'],
      pieges: ['« Cavalerie » (QCM Uv1) : le texte officiel dit artillerie.'],
      memo: { cle: 'ARTILLERIE · SAINT ÉLOI 659 · 1940', points: ['1943 : école à Meknès', '1997 : musée du Matériel', 'Étendard : BSMAT (13ᵉ en 2025-2026)', 'CAMO 2018 : Belgique'], astuce: 'Les canons ont inventé la maintenance : sans entretien, pas de tir.' }
    },
    {
      id: 'organisation', title: 'Organisation du MCO-T et sigles',
      html: `
<ul><li><b>MCO-T</b> : répondre au besoin opérationnel en maîtrisant les coûts, au « juste » besoin, en optimisant le personnel.</li>
<li>Sous pilotage unique de la <b>SIMMT</b> : maintenance opérationnelle (MO) + maintenance industrielle (MI). Logique de milieu : terrestre, aéronautique, naval-nautique-plongée.</li>
<li><b>4 principes du modèle MCO terrestre</b> (ch. 1) : 1) approche par compétence ; 2) étagement des responsabilités sur 3 niveaux (MOA / MOAd / MOE) ; 3) séparation MO / MI ; 4) équilibre entre MIé (industrielle étatique) et MIp (industrielle privée).</li>
<li><b>MOA</b> : états-majors, directions et services (politique de soutien) · <b>MOAd</b> : la <b>SIMMT</b> pour le milieu terrestre · <b>MOE</b> : CFOT, CALT, divisions et brigades, SMITer (étatique), BITD (industriel privé).</li>
<li><b>DT</b> (disponibilité technique) = % de matériels disponibles sur le nombre de matériels réalisés, à un instant donné. <b>ARM</b> = assurer ses fonctions pendant un temps déterminé sans réparation d’un niveau supérieur à l’OSR.</li>
<li>Actes techniques : <b>préventifs</b> (prévisionnels ou conditionnels), <b>correctifs</b> (fait technique fortuit), <b>de modification</b>.</li>
<li><b>3 niveaux techniques d’intervention (NTI)</b> ; les actes de NTI3 relèvent en général de la MO. La RAM sépare NTI1 et NTI2.</li>
<li><b>COMMF</b> : maîtrise d’œuvre de la maintenance opérationnelle (pour les trois armées). Les 6 régiments du Matériel : MO de leur zone. MICAM subordonnée à la SIMMT.</li>
<li>La SIMMT entretient la documentation de maintenance. <b>Types d’interventions</b> : préventives, correctives, de modification (+ rénovation sur SIM@T).</li>
<li><b>En opération : 6 effecteurs (principes) du MCO-T</b> (ch. 11, à ne pas confondre avec les 4 principes du ch. 1) : 1) au plus près des combats sans être une charge ; 2) redonner des moyens même incomplets ; 3) gérer une « casse de masse » avec des moyens comptés ; 4) conserver les ressources rares ; 5) manœuvrer à tous les niveaux ; 6) tirer profit des outils de communication et de données. Réparer <b>autrement, à temps, utilement</b>.</li>
<li><b>ASIA</b> = conseiller logistique du commandant de la Force, rédige l’OAL, a l’AMAT sous son autorité. <b>AMAT</b> = conseiller MCO-T du commandant de la Force : organise, coordonne, conduit, contrôle, calcule la DT ; autorité organique ASIA, fonctionnelle SIMMT ; rédige le CRFM. <b>CALT</b> porte la logistique et le MCO du CFOT. La SIMMT rédige l’OMMT.</li>
<li><b>REM</b> : 3 familles professionnelles → 12 filières → 77 ETD → ≈ 392 ETR. FP <b>MMT</b> (10 filières), FP <b>LSC</b> (5), FP <b>MUN</b> (1). Chaque ETD sur un <b>niveau d’emploi de 1 à 5</b>. COM ÉcoMAT = PILDOM MAI depuis l’été 2024.</li>
<li>Niveaux fonctionnels : FS1 → NF2 (technicien) ; <b>FS2 → NF3a puis 3b</b> ; officiers (cours d’application) → NF4 ; MDR : CP → 1a, CTE/CME + brigadier → 1b, CQTS (+ 11 ans) → 1c. <b>CFD</b> = centre de formation délégué, <b>CFA</b> = centre de formation associé (pas « CFDT »).</li></ul>
<div class="tw"><table><tr><th>Sigle</th><th>Signification</th></tr>
<tr><td>SIMMT</td><td>Structure intégrée du MCO des matériels terrestres</td></tr>
<tr><td>SMITer</td><td>Service de la maintenance industrielle terrestre</td></tr>
<tr><td>MICAM</td><td>Mission de contrôle et d’appui de la maintenance</td></tr>
<tr><td>SIM@T</td><td>Système d’information de la maintenance terrestre</td></tr>
<tr><td>ECM</td><td>Équipe de conduite de la maintenance (la « CDM » de tes fiches)</td></tr>
<tr><td>GLB</td><td>Gestion logistique des biens</td></tr>
<tr><td>RGLU</td><td>Responsable de la gestion des munitions de l’unité</td></tr>
<tr><td>CAA</td><td>Cellule approvisionnement des ateliers</td></tr>
<tr><td>OCMUE / SOCMUE</td><td>Officier / sous-officier chargé des matériels de l’unité élémentaire</td></tr>
<tr><td>GME</td><td>Groupement momentané d’entreprises</td></tr>
<tr><td>PHL</td><td>Parc hors ligne</td></tr>
<tr><td>CIPCE</td><td>Contrôle interne relatif à la préservation du capital en équipements</td></tr>
<tr><td>PPAC / PEGP</td><td>Politique des parcs au contact / Politique d’emploi et de gestion des parcs</td></tr>
<tr><td>RIP</td><td>Réparation dans l’industrie privée</td></tr>
<tr><td>SMR</td><td>Section de maintenance régimentaire</td></tr>
<tr><td>BML (NG)</td><td>Bureau maintenance logistique (nouvelle génération)</td></tr>
<tr><td>ARM</td><td>Aptitude à remplir la mission</td></tr>
<tr><td>OSR</td><td>Organisme de soutien (et) de rattachement</td></tr>
<tr><td>PRMAR</td><td>Point de regroupement des matériels à réparer</td></tr>
<tr><td>CSOA</td><td>Centre du soutien des opérations et des acheminements</td></tr>
<tr><td>ICPE</td><td>Installation classée pour la protection de l’environnement</td></tr>
<tr><td>DUERP</td><td>Document unique d’évaluation des risques professionnels</td></tr>
<tr><td>SCORPION</td><td>Synergie du contact renforcée par la polyvalence et l’infovalorisation</td></tr>
<tr><td>GME</td><td>Groupement momentané d’entreprises</td></tr></table></div>`,
      retenir: ['3 NTI.', 'Interventions : préventives, correctives, de modification.', 'SIMMT = pilote unique du MCO-T.', 'ARM = assurer ses fonctions sans passer par l’OSR.'],
      memo: { cle: 'SIMMT = PILOTE UNIQUE (MO + MI)', points: ['3 NTI', 'COMMF = MOE de la MO', 'MICAM = contrôle et appui', 'Préventive / corrective / modification'], astuce: 'SIM@T = le logiciel ; SIMMT = la structure.' }
    },
    {
      id: 'regiment', title: 'Au régiment : BML-NG, SMR, gestion des biens',
      html: `
<ul><li><b>Chef de corps</b> : détenteur/gestionnaire logistique des biens, <b>désigne le responsable de la gestion logistique</b> (son assistant fonctionnel). Chef BML = clé de voûte ; le <b>CBML conseille le CDC</b> (comptabilité, utilisation, entretien, maintenance des matériels).</li>
<li>Organisation rationnelle = <b>2 impératifs, tous les deux exigés</b> : un responsable par domaine technique dans chaque unité ET le respect de l’organisation hiérarchique et fonctionnelle.</li>
<li><b>STE</b> (section technique équipements) = <b>GLB</b> (gestion logistique des biens) + <b>ECM</b> (équipe de conduite de la maintenance, pilote la maintenance) + <b>RGLU</b> (munitions de l’unité). La gestion du pool tactique est une cellule du BML NG, pas un 4ᵉ composant de la STE.</li>
<li><b>CAA</b> (cellule approvisionnement des ateliers) : suit les commandes dans SIM@T, réceptionne et distribue ; propose à l’ECM des solutions aux DHNS ; reverse les rechanges réparables ; gère le stock atelier (listes R et V) ; détient la <b>carte d’achat de niveau 1</b>.</li>
<li><b>OCMUE</b> : planifie, organise, contrôle l’entretien ; peut interdire l’emploi d’un matériel dangereux. <b>SOCMUE</b> : conseiller technique du CDU, interlocuteur de la SMR, suit les potentiels sur SIM@T.</li>
<li><b>6 régiments ont une UMR</b> : 2ᵉ REP, 1ᵉʳ RA, 61ᵉ RA, 9ᵉ RIMa (Guyane), 2ᵉ RPIMa (La Réunion), RIMaP-NC.</li>
<li><b>SMR</b> : cellule RDC (réception-diagnostic-contrôle), station-service, ateliers, cellule approvisionnement.</li>
<li>L’entretien, acte de combat et d’instruction, incombe à <b>TOUS les détenteurs</b> de matériels.</li>
<li><b>PPAC 2022</b>, 4 piliers : autonomie des régiments ; continuum compétition / contestation / affrontement (projeter les unités avec leurs matériels) ; meilleure gestion des équipements ; intégration interarmées.</li>
<li>Parc total → parc en utilisation → parc en service actif = <b>PEO</b> (parc en exploitation opérationnelle : <b>PRGT, POPEX, PDYN, PE</b> = 4 sous-parcs) + <b>PHL</b> (parc hors ligne : soutien industriel lourd). Pas de « PIT », « PSP » ni « PU ».</li>
<li>Critères de gestion : <b>4 classes d’appartenance</b> (CA 1 à 4), <b>5 catégories de soutien</b> (CS10 à CS50), <b>SGL</b> (SGL4 en exploitation, SGL5 disponible, SGL7 non disponible).</li>
<li><b>Échelonnement du code approvisionnement</b> : <b>Central</b> (entrepôt central) · <b>Avancé</b> (jusqu’au centre de distribution régional) · <b>R et V</b> (jusqu’à la cellule appro d’atelier). <b>Statut de gestion logistique</b> = situation et état d’un bien. Code état 79 = à éliminer (52 = pièce neuve).</li>
<li>REO : moyens en personnel et matériels dimensionnant une unité.</li>
<li><b>SCORPION</b> : GRIFFON (remplace VAB), JAGUAR (VAB HOT, ERC 90, AMX 10 RCR), SERVAL (VAB, VLTP), <b>VBAE</b> (VBL, VB2L), EGC (EBG). GME GRIFFON / JAGUAR = <b>KNDS (ex-NEXTER)</b>, ARQUUS, THALES SIX (+ TLAS pour le MEPAC) ; SERVAL = <b>KNDS + TEXELIS</b>. Rechanges : stock industriel des GME à Fourchambault ; AIP propriété de l’État. Régénération : 12ᵉ BSMAT Douai (GRIFFON), Gien (JAGUAR), 13ᵉ BSMAT Clermont-Ferrand (SERVAL).</li>
<li><b>SIMu</b> (créé le 25/03/2011, rattaché au CEMA) : <b>1 direction à Versailles + 5 EPMu</b> (Bretagne, Champagne-Lorraine, Centre-Aquitaine, Provence, Méditerranée). Hors SIMu : <b>munitions nucléaires (vecteurs et têtes)</b>, artifices liés à la navigabilité des aéronefs (sauf stockage).</li>
<li>Détenteur des biens de l’arme du Matériel dans une formation : le <b>CDU</b>.</li></ul>`,
      retenir: ['ECM (« CDM ») = pilote la maintenance.', 'STE = GLB + ECM + RGLU.', 'Stocks : Central / Avancé / R et V.', 'SIMu : 1 direction + 5 EPMu.', 'PEO (PRGT, POPEX, PDYN, PE) + PHL.', 'Le responsable de la gestion logistique est désigné par le chef de corps.'],
      pieges: ['SIMu : 5 EPMu (AQA 03), pas 4.', 'Pas de « PIT » : le soutien industriel lourd, c’est le PHL.', 'Stocks : « Central / Avancé / R et V », pas « central / régional / local ».'],
      memo: { cle: 'CDC → CBML → STE (GLB · ECM · RGLU) → SMR', points: ['CBML conseille le CDC', 'ECM pilote la maintenance', 'SIMu : 5 EPMu', 'SMR = RDC + station-service + ateliers + appro', 'Statut de gestion logistique = situation et état'], astuce: 'L’entretien, c’est l’affaire de tous les détenteurs, pas seulement des mécanos.' }
    },
    {
      id: 'documentation', title: 'Documentation',
      html: `
<ul><li><b>Circulaire 9400</b> (05/07/2004) : documentation technique + complémentaire. <b>Circulaire 9401</b> (27/07/2004) : organisation de la maintenance dans les formations.</li>
<li><b>3 familles de documentation technique</b> : 1) information à caractère général (instructions, répertoires, registres, périodiques) ; 2) <b>DTU</b> (mise en œuvre, entretien / réparation, ravitaillement, <b>fiches COS, de visite, de station-service, manuel de maintenance</b>) ; 3) documentation de modification (fiches et bulletins techniques). Le manuel de maintenance fait partie de la DTU : nature et temps de l’opération, opérateurs, outillage spécifique, ingrédients, décomposition.</li>
<li><b>MAT 1015 = carnet de bord</b>. Il sert aussi d’ordre de sortie ; la carte d’identité du véhicule y est insérée. <b>MAT 10 004</b> = carnet de matériel, toute la vie du matériel (affectations, modifications, maintenance, contrôles MICAM) ; <b>MAT 10 004/21</b> = fiches des constituants principaux (moteur, boîte, réducteur). <b>MAT 1017</b> = carnet de contrôle des matériels de l’UE (armement, transmissions, optique, levage, NRBC, incendie, EOT, franchissement ; pas les matériels à moteur thermique ni les remorques) : visé chaque mois par le sous-officier spécialisé et contresigné par le CDU, tous les 6 mois par le CBML, une fois par an par le CDC. <b>MAT 4486 = DIT</b>.</li>
<li><b>BIMT</b> : veille documentaire, <b>trimestriel</b> (fusion du bulletin d’information technique et du MAT 3999). Toujours utiliser la dernière fiche de visite approuvée.</li>
<li>Un fait technique est <b>fortuit ou prescrit</b>. Arborescence logistique : tout ce qui constitue un matériel avec type et n° de série.</li></ul>`,
      retenir: ['MAT 1015 = carnet de bord ; MAT 10004 = vie du matériel ; MAT 4486 = DIT.', 'BIMT trimestriel.', 'Fait technique : fortuit ou prescrit.'],
      memo: { cle: '1015 CARNET · 10004 VIE · 4486 DIT', points: ['MAT 1017 : CDU mensuel, BML 6 mois, CDC annuel', 'BIMT : tous les 3 mois', 'Circ. 9400 doc · 9401 organisation'], astuce: '10004 = « dix mille quatre » = toute la vie du matériel.' }
    },
    {
      id: 'reparation', title: 'Processus de réparation, DIT, COS, RDC',
      html: `
<div class="tw"><table><tr><th>7 étapes de la réparation</th><th>Qui (répartition probable)</th></tr>
<tr><td>1. Mise en réparation</td><td>RDC (ouvre le dossier dans SIM@T)</td></tr>
<tr><td>2. Diagnostic</td><td>RDC</td></tr>
<tr><td>3. Préparation</td><td>Chef d’atelier</td></tr>
<tr><td>4. Approvisionnement</td><td></td></tr>
<tr><td>5. Réparation</td><td>Atelier</td></tr>
<tr><td>6. Contrôles (en cours, en fin d’actes, final)</td><td>RDC</td></tr>
<tr><td>7. Restitution</td><td>RDC</td></tr></table></div>
<p><b>Le RDC prend en charge 4 étapes sur 7</b> : 1 (mise en réparation, par visite contradictoire avec l’utilisateur), 2 (diagnostic, ouverture du dossier SIM@T), 6 (<b>contrôle final</b> seulement : les contrôles en cours et en fin d’acte sont faits par le chef d’atelier), 7 (restitution : documents renseignés, actes techniques / DATEC clôturés). Le chef d’atelier gère 3 (préparation), 4 (approvisionnement via SIM@T, avec la CAA) et 5 (réparation, confiée au chef d’équipe). Les ateliers multi-techniques font les 7 étapes et rendent compte à l’ECM.</p>
<ul><li><b>DIT</b> (MAT 4486) en 4 phases : réception, diagnostic, intervention technique, contrôle.</li>
<li><b>SIM@T</b> : planifier, préparer, effectuer, suivre. On crée des IT, on déclare les indisponibilités, on planifie. Le chef d’équipe commande et consomme les pièces, pointe ses heures.</li>
<li>Statuts RDC : retardé, différé, accepté. AISM = article individualisé à suivi de maintenance.</li>
<li><b>MICAM</b> : contrôle administratif et mécanique. Classement : A apte / AR apte avec restriction / I inapte.</li>
<li><b>COS</b> : valable 1 an ; sur ordre, une fois par an, en <b>sortie de remisage &gt; 6 mois</b>, au retour d’une RIP, en sortie de station-service ou d’atelier. Réalisé par un <b>BSTAT Mobilité terrestre employé et désigné au RDC</b>. Celui qui signe engage sa responsabilité.</li></ul>
<div class="tw"><table><tr><th>Question (contrôle RDC)</th><th>Réponse</th></tr>
<tr><td>RDC fermé 2 semaines</td><td>Faire contrôler par un BSTAT d’un autre atelier</td></tr>
<tr><td>Feuille NTI1 : impossible d’avoir…</td><td>Un potentiel km supérieur au relevé compteur</td></tr>
<tr><td>RIP : qui renseigne la partie contrôle du DIT ?</td><td>Le prestataire</td></tr>
<tr><td>Fiche de visite prise…</td><td>Sur SIM@T</td></tr>
<tr><td>Qui répartit les travaux (phase 2) ?</td><td>Le RDC</td></tr>
<tr><td>GBC 180 : COS + visite station + NTI1</td><td>NTI1, puis station, puis COS</td></tr>
<tr><td>Chef d’atelier : BSTAT + FA 3 selon le TTA…</td><td>TTA 129</td></tr>
<tr><td>Qui valide la partie 4 du DIT dans tous les cas ?</td><td>La CDM (à confirmer)</td></tr>
<tr><td>Visite périodique valant COS : qui l’enregistre au MAT 10004 ?</td><td>Le RDC</td></tr></table></div>
<h3>Ta fiche : environnement maintenance</h3>
<div class="tw"><table><tr><th>Qui</th><th>Rôle</th></tr>
<tr><td><b>SMR</b></td><td>RDC · station-service · ateliers · approvisionnement</td></tr>
<tr><td><b>Conduite de la maintenance (CDM)</b></td><td>Pilote les activités de maintenance ; <b>ouvre et clôture le MAT 4486</b></td></tr>
<tr><td><b>RDC</b> (réception, diagnostic, contrôle)</td><td>Ouvre l’AT ; ouvre et remplit le MAT 4486 ; applique les procédures ; effectue le <b>COS</b> ; crée son tableau de production ; <b>distribue les travaux aux ateliers</b> ; contrôles en sortie : freinage, direction, liaison au sol, éclairage, suite aux interventions techniques, essai dynamique</td></tr>
<tr><td><b>Station-service</b></td><td>Entretien courant (vidange, petites réparations) ; assiste, participe et contrôle le 1ᵉʳ échelon (lavage, graissage) ; gère les ingrédients pour tout le monde ; participe à l’élimination des déchets ; remplit les préventives dans le MAT 10004 (vidange <b>en rouge</b> obligatoirement, de préférence toute la ligne) ; sollicitée pour l’instruction</td></tr>
<tr><td><b>Atelier</b></td><td>Prépare les travaux sur chaque véhicule ; participe et affine les diagnostics du RDC ; respecte les gammes opératoires et les types d’AT ; effectue réparations, visites et modifications ; met à jour la documentation ; veille aux mesures SST / HSCT ; crée son tableau de production</td></tr></table></div>
<p><b>Bonnes pratiques pour une entrée en atelier</b> : réception de l’ordre de travail ; manuel de réparation du véhicule sur la desserte ; temps moyen de réparation connu ; outillage spécifique identifié et disponible (sa présence sera contrôlée en MICAM) ; points clés identifiés par le chef d’atelier avec le chef d’équipe ; compte rendu du chef d’équipe quand un point clé est atteint ; contrôle du point clé par le chef d’atelier ; la réparation avance de point clé en point clé.</p>
<ul>
<li><b>MAT 4486 (DIT), chapitre 4 — contrôle dans l’ordre</b> : éclairage → freinage → suspension → direction → réparations effectuées → essai dynamique.</li>
<li><b>COS</b> (contrôle des organes de sécurité) : mise en conformité avec le code de la route ; sur ordre, annuellement, en sortie de remisage de plus de 6 mois (sauf ENU), après une RIP. Délais notés sur ta fiche : annuel pour + 3,5 t, 6 mois pour les bus.</li>
<li><b>MAT 10004</b> : carnet d’entretien du matériel en complément de SIMMT ; permet de travailler en mode dégradé (papier) ; peut être rempli par la CDM, le RDC, le chef d’atelier. Directive relative aux opérations de contrôle des véhicules terrestres de la structure intégrée du MCO des matériels terrestres.</li>
<li><b>BIMT</b> (bulletin d’information des matériels terrestres) : mis à jour tous les <b>3 mois</b>, à consulter régulièrement (nouveautés, modifications).</li>
<li><b>Ordre de priorité d’intervention</b> : 1. visite NTI1 / réparation → 2. station → 3. COS (autre ordre noté : réparation NTI1 → COS → RIP).</li>
<li><b>Opérations de contrôle</b> : CT (− 3,5 t : 2 ans ; antipollution 1 an ; + 3,5 t : 1 an ; bus 6 mois), CTVC / VTG, COS, MAT 4486 (ch. 4), VP + OS. <b>Visite périodique (VP + OS)</b> : inscrite sur la fiche de visite, par un BM2 ou BSTAT Mobilité terrestre.</li>
<li><b>Opération préventive</b> contenant une vidange = écrite <b>en rouge</b> (attention au feuillet « opérations préventives »). <b>Opération corrective</b> : renseignée par le chef d’atelier (suivi détaillé, prioriser les plus importantes). <b>Vérification périodique</b> : ESP, VGP… <b>Opération en industrie privée = RIP</b>.</li>
<li><b>Demande de nouveau matériel pour l’atelier</b> : justifier par l’augmentation de la DTO, la limitation des risques HSCT, la protection de l’environnement.</li></ul>`,
      retenir: ['7 étapes ; le RDC en prend 4.', 'DIT = 4 phases : réception, diagnostic, intervention, contrôle.', 'COS : 1 an ; sortie de remisage > 6 mois ; BSTAT Mobilité terrestre désigné au RDC.', 'Préparation = chef d’atelier.'],
      pieges: ['Points à trancher : répartition des travaux (RDC ou CDM ?) et validation de la partie 4 du DIT (CDM ou RDC ?).'],
      memo: { cle: 'RDC = RÉCEPTION · DIAGNOSTIC · CONTRÔLE', flow: ['Mise en réparation (RDC)', 'Diagnostic (RDC)', 'Préparation (chef d’atelier)', 'Approvisionnement', 'Réparation (atelier)', 'Contrôles (RDC)', 'Restitution (RDC)'], points: ['COS valable 1 an', 'NTI1 → station → COS'], astuce: 'Le RDC ouvre et ferme la porte : il reçoit, diagnostique, contrôle et restitue.' }
    }
  ],
  questions: [
    { l: 'histoire', q: 'Avec quelle arme est né l’esprit maintenance (AQA 03) ?', c: ['L’artillerie', 'La cavalerie', 'L’infanterie', 'Le génie'], e: 'Texte officiel AQA 03 : avec l’artillerie au Moyen-Âge.', w: 'Un QCM Uv1 répondait « cavalerie » : retiens le texte officiel.' },
    { l: 'histoire', q: 'Saint Éloi, patron du Matériel, meurt en…', c: ['659', '1940', '1943', '1066'], e: 'Saint Éloi meurt en 659.' },
    { l: 'histoire', q: 'Date d’institution du corps du Service du Matériel ?', c: ['25 août 1940', '1er juillet 2016', '1943', '1997'], e: '25/08/1940 ; 1943 : 1ʳᵉ école du Matériel à Meknès ; 1997 : musée.' },
    { l: 'histoire', q: 'Le partenariat CAMO (07/11/2018) est un partenariat stratégique avec :', c: ['La Belgique', 'L’Allemagne', 'Le Royaume-Uni', 'L’Italie'], e: 'CAMO = partenariat stratégique franco-belge.' },
    { l: 'organisation', q: 'Combien de niveaux techniques d’intervention (NTI) ?', c: ['3', '4', '5', '2'], e: '3 NTI ; la RAM sépare NTI1 et NTI2.', src: 'QCM Test FS2' },
    { l: 'organisation', q: 'Les types d’interventions techniques sont :', c: ['Préventives, correctives, de modification', 'Urgentes, programmées, différées', 'Légères, lourdes, industrielles', 'Internes, externes, mixtes'], e: 'Plus la rénovation sur SIM@T.', src: 'QCM Test FS2' },
    { l: 'organisation', q: 'La capacité à assurer ses fonctions sans passer par l’OSR s’appelle :', c: ['L’aptitude à remplir la mission (ARM)', 'Le statut de gestion logistique', 'Le REO', 'La PEGP'], e: 'ARM = aptitude à remplir la mission.', src: 'QCM Test FS2' },
    { l: 'organisation', q: 'Que signifie DUERP ?', c: ['Document unique d’évaluation des risques professionnels', 'Dossier unique d’entretien et de réparation des parcs', 'Document d’urgence en cas de risque particulier', 'Directive unifiée d’emploi des ressources'], e: 'Le DUERP recense les risques par unité de travail.', src: 'QCM Test FS2' },
    { l: 'organisation', q: 'Quelle structure pilote de façon unique le MCO-T (MO + MI) ?', c: ['La SIMMT', 'Le COMMF', 'La MICAM', 'Le SMITer'], e: 'La SIMMT pilote la maintenance opérationnelle et industrielle ; le COMMF est maître d’œuvre de la MO.' },
    { l: 'regiment', q: 'Qui est l’assistant fonctionnel du détenteur de biens ?', c: ['Le responsable de la gestion logistique', 'Le chef d’atelier', 'Le CPRP', 'Le commandant en second'], e: 'Il est désigné par le détenteur des biens (chef de corps).', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Qui désigne le responsable de la gestion logistique ?', c: ['Le détenteur des biens (chef de corps)', 'Le chef BML', 'La SIMMT', 'Le CDU'], e: 'Le chef de corps, détenteur des biens, le désigne.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Le CBML assiste le CDC pour…', c: ['Comptabilité, utilisation, entretien, maintenance des matériels', 'La sécurité au travail uniquement', 'Le recrutement', 'Les munitions uniquement'], e: 'Le chef BML est la clé de voûte de la maintenance au régiment.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Qui pilote la maintenance au BML ?', c: ['L’ECM (équipe de conduite de la maintenance, « CDM »)', 'Le RDC', 'La cellule approvisionnement', 'La station-service'], e: 'La cellule CDM de la STE pilote la maintenance.', src: 'Contrôle RDC' },
    { l: 'regiment', q: 'La situation et l’état d’un bien, c’est :', c: ['Le statut de gestion logistique', 'Le code état', 'L’arborescence logistique', 'Le REO'], e: 'Statut de gestion logistique = situation et état d’un bien.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Échelonnement du code approvisionnement (AQA 03) ?', c: ['Central, Avancé, R et V', 'Central, régional, local', 'National, zonal, régimentaire', 'Stratégique, opératif, tactique'], e: 'Central = entrepôt central ; Avancé = jusqu’au centre de distribution régional ; R et V = jusqu’à la cellule appro d’atelier.', w: 'Le QCM Test FS2 disait « central, régional, local » : l’AQA 03 emploie Central / Avancé / R et V.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Organisation du SIMu (AQA 03) ?', c: ['Une direction (Versailles) et cinq établissements principaux (EPMu)', 'Un échelon central et quatre établissements principaux', 'Trois échelons régionaux', 'Six régiments'], e: 'EPMu Bretagne, Champagne-Lorraine, Centre-Aquitaine, Provence, Méditerranée ; 9 dépôts rattachés à la direction.', w: 'Une ancienne réponse disait 4 : l’AQA 03 en compte 5.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Quelle munition est hors SIMu ?', c: ['Les vecteurs nucléaires', 'Les obus de 155 mm', 'Les munitions de petit calibre', 'Les grenades'], e: 'Hors SIMu : vecteurs nucléaires et artifices liés à la navigabilité des aéronefs.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'La section de maintenance régimentaire (SMR), ce sont…', c: ['Des spécialistes affectés au RDC, à la station-service ou aux ateliers', 'Les détenteurs de matériels', 'Les officiers du BML', 'Les personnels de la MICAM'], e: 'SMR : cellule RDC, station-service, ateliers, cellule approvisionnement.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Qui détient les biens de l’arme du Matériel dans une formation ?', c: ['Le CDU', 'Le chef de corps', 'Le CPRP', 'Le chef d’atelier'], e: 'Réponse du QCM Test FS2 : le CDU.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Le MAT 1015, c’est :', c: ['Le carnet de bord', 'Le DIT', 'La vie du matériel et ses entretiens', 'Le registre SST'], e: 'MAT 1015 = carnet de bord ; MAT 10004 = vie du matériel ; MAT 4486 = DIT.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Rôle du MAT 10004 ?', c: ['Suivre la vie du matériel de la mise en place au retrait, et ses entretiens', 'Carnet de bord', 'Demande d’intervention technique', 'Observations des inspections'], e: 'Carnet de matériel : affectations, modifications, maintenance, contrôles MICAM.', w: '« Remplace le MAT 1013 » n’est pas confirmé par l’AQA 03.', src: 'Contrôle RDC' },
    { l: 'documentation', q: 'Édition du BIMT ?', c: ['Trimestrielle', 'Mensuelle', 'Annuelle', 'Semestrielle'], e: 'Le BIMT assure la veille documentaire tous les trimestres.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Un fait technique peut être…', c: ['Fortuit ou prescrit', 'Préventif ou correctif', 'Majeur ou mineur', 'Interne ou externe'], e: 'FT = fait technique ; BS = bulletin de sécurité.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'La documentation technique utilisateur (DTU) comprend notamment :', c: ['Mise en œuvre, entretien / réparation, fiches COS, de visite, de station-service et le manuel de maintenance', 'DUERP, FEN, registre SST', 'MAT 1017 uniquement', 'Circulaires 9400 et 9401'], e: 'C’est la 2ᵉ des 3 familles de documentation technique (le QCM Test FS2 citait TCKIT, notice de mise en œuvre, documentation d’entretien).', src: 'AQA 03 (fiche définitive)' },
    { l: 'reparation', q: 'Combien d’étapes dans la réparation des matériels complets ?', c: ['7', '4', '5', '3'], e: 'Mise en réparation, diagnostic, préparation, approvisionnement, réparation, contrôles, restitution.', src: 'QCM Test FS2' },
    { l: 'reparation', q: 'Quelle cellule prend en charge 4 étapes sur 7 ?', c: ['Le RDC', 'L’atelier', 'La CDM', 'La cellule approvisionnement'], e: 'Mise en réparation, diagnostic, contrôles, restitution.', src: 'QCM Test FS2' },
    { l: 'reparation', q: 'Qui s’occupe de la phase « préparation » ?', c: ['Le chef d’atelier', 'Le RDC', 'Le chef BML', 'Le détenteur'], e: 'Réponse du QCM Test FS2.', src: 'QCM Test FS2' },
    { l: 'reparation', q: 'Dans quel cas faut-il un COS ?', c: ['Sortie de remisage de plus de 6 mois ; sur ordre, une fois par an', 'Après chaque plein de carburant', 'Tous les 3 mois', 'Uniquement après un accident'], e: 'Aussi : retour de RIP, sortie de station-service ou d’atelier. Un COS est valable 1 an.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'Conditions pour réaliser un COS ?', c: ['Être BSTAT Mobilité terrestre, employé et désigné au RDC', 'Être chef de corps', 'Être CDU', 'Avoir le permis PL'], e: 'Celui qui signe engage sa responsabilité.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'RDC fermé 2 semaines, un COS est nécessaire. Que faire ?', c: ['Faire contrôler par un BSTAT d’un autre atelier', 'Reporter le COS', 'Le faire signer par le chef d’atelier PL', 'Rendre le véhicule sans COS'], e: 'Le contrôle doit être fait par une personne habilitée.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'Feuille de visite NTI1 : qu’est-il impossible d’avoir ?', c: ['Un potentiel km supérieur au relevé compteur', 'Un compteur supérieur au potentiel', 'Un potentiel à zéro', 'Une visite datée'], e: 'Réponse de la copie Uv1 corrigée.', w: 'Le corrigé UV2 proposait l’inverse : point à trancher.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'GBC 180 : dans quel ordre faire le COS, la visite station et la NTI1 ?', c: ['NTI1, puis station, puis COS', 'COS, puis NTI1, puis station', 'Station, puis COS, puis NTI1', 'Peu importe'], e: 'Le COS valide un véhicule en état : il vient en dernier.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'Réparation dans l’industrie privée (RIP) : qui renseigne la partie contrôle du DIT ?', c: ['Le prestataire', 'Le RDC', 'La CDM', 'Le détenteur'], e: 'Réponse du contrôle RDC.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'Les 4 phases du DIT (MAT 4486) ?', c: ['Réception, diagnostic, intervention technique, contrôle', 'Commande, livraison, montage, essai', 'Préparation, approvisionnement, réparation, restitution', 'Planifier, préparer, effectuer, suivre'], e: '« Planifier, préparer, effectuer, suivre » décrit SIM@T.' },
    { l: 'reparation', q: 'Chef d’atelier : BSTAT + FA 3 selon quel TTA ?', c: ['TTA 129', 'TTA 150', 'TTA 106', 'TTA 208'], e: 'Réponse du contrôle RDC.', src: 'Contrôle RDC' },
    { l: 'reparation', q: 'Qui ouvre et clôture le MAT 4486 (DIT) ?', c: ['La conduite de la maintenance (CDM)', 'La station-service', 'Le détenteur'], e: 'La CDM pilote les activités de maintenance : elle ouvre et clôture le DIT ; le RDC l’ouvre à la réception et le remplit.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Qui distribue les différents travaux aux ateliers ?', c: ['Le RDC', 'La station-service', 'La cellule approvisionnement'], e: 'Ta fiche : le RDC distribue les travaux aux ateliers (phase 2 du DIT).', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Qui gère les ingrédients pour tout le monde et participe à l’élimination des déchets ?', c: ['La station-service', 'L’atelier', 'Le RDC'], e: 'La station-service fait l’entretien courant, assiste le 1ᵉʳ échelon, gère les ingrédients et les déchets.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Dans le MAT 10004, une opération préventive contenant une vidange s’écrit :', c: ['En rouge', 'En bleu', 'Au crayon à papier'], e: 'Vidange en rouge obligatoirement, de préférence toute la ligne (attention au feuillet « opérations préventives »).', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'MAT 4486, chapitre 4 : ordre du contrôle ?', c: ['Éclairage, freinage, suspension, direction, réparations effectuées, essai dynamique', 'Essai dynamique, direction, freinage, éclairage', 'Freinage, éclairage, essai dynamique, direction'], e: 'L’essai dynamique vient en dernier, après les contrôles statiques et la vérification des réparations.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Le BIMT est mis à jour :', c: ['Tous les 3 mois', 'Tous les mois', 'Tous les ans'], e: 'Bulletin d’information des matériels terrestres, trimestriel : à consulter régulièrement.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Le MAT 10004 peut être rempli par :', c: ['La CDM, le RDC et le chef d’atelier', 'Le seul chef de corps', 'Le seul détenteur'], e: 'Carnet d’entretien en complément de SIMMT, il permet aussi de travailler en mode dégradé (papier).', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Une opération corrective est renseignée par :', c: ['Le chef d’atelier', 'La station-service', 'Le détenteur'], e: 'Suivi détaillé des opérations effectuées, en priorisant les plus importantes.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Pour demander un nouveau matériel pour l’atelier, on justifie par :', c: ['L’augmentation de la DTO, la limitation des risques HSCT et la protection de l’environnement', 'Le prix du matériel', 'L’ancienneté de l’atelier'], e: 'Trois arguments de ta fiche.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Bonne pratique en atelier : la réparation avance…', c: ['De point clé en point clé, contrôlés par le chef d’atelier', 'Sans contrôle jusqu’à l’essai final', 'Au rythme du détenteur'], e: 'Points clés identifiés par le chef d’atelier avec le chef d’équipe ; compte rendu du chef d’équipe à chaque point clé ; contrôle par le chef d’atelier.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'reparation', q: 'Présence de l’outillage spécifique : elle sera contrôlée lors de :', c: ['La MICAM', 'Du COS', 'Du BIMT'], e: 'L’outillage spécifique doit être identifié et disponible ; la MICAM le contrôle.', src: 'Ta fiche « Environnement maintenance »' },
    { l: 'organisation', q: 'Combien de principes fondent le modèle du MCO terrestre (chapitre 1) ?', c: ['4', '6', '3'], e: 'Compétence ; étagement MOA / MOAd / MOE ; séparation MO / MI ; équilibre MIé / MIp.', r: 'Ne pas confondre avec les 6 effecteurs du MCO-T en opération (ch. 11).', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'Qui exerce la maîtrise d’ouvrage déléguée (MOAd) pour le milieu terrestre ?', c: ['La SIMMT', 'Le CFOT', 'Le SMITer'], e: 'MOA = états-majors ; MOAd = SIMMT ; MOE = CFOT, CALT, divisions, brigades, SMITer, BITD.', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'Combien d’effecteurs (principes) du MCO-T en opération ?', c: ['6', '4', '3'], e: 'Au plus près des combats ; redonner des moyens même incomplets ; casse de masse ; ressources rares ; manœuvrer à tous les niveaux ; outils de données.', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'Qui est le conseiller MCO-T du commandant de la Force et calcule la DT sur le théâtre ?', c: ['L’AMAT', 'L’ASIA', 'Le CALT'], e: 'L’AMAT est sous l’autorité organique de l’ASIA (conseiller logistique global) et fonctionnelle de la SIMMT ; il rédige le CRFM.', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'Un FS2 accède au niveau fonctionnel :', c: ['3a puis 3b', '2', '4'], e: 'FS1 → NF2 (technicien) ; FS2 → NF3a puis 3b ; officiers → NF4.', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'Les ETD sont décrits sur un niveau d’emploi gradué de :', c: ['1 à 5', '1 à 3', '1 à 4'], e: 'REM : 3 FP → 12 filières → 77 ETD → ≈ 392 ETR ; chaque ETD sur un NE de 1 à 5.', src: 'AQA 03 (fiche définitive)' },
    { l: 'organisation', q: 'La disponibilité technique (DT), c’est :', c: ['Le % de matériels disponibles sur les matériels réalisés, à un instant donné', 'Le temps moyen de réparation', 'Le nombre de matériels en RIP'], e: 'Définition AQA 03, chapitre 3.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Composition officielle de la STE (AQA 03) ?', c: ['GLB, ECM, RGLU', 'GLB, CDM, gestion pool tactique, munitions', 'RDC, station-service, ateliers'], e: 'Gestion logistique des biens, équipe de conduite de la maintenance, responsable de la gestion des munitions de l’unité. RDC / station / ateliers = la SMR.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Le parc en exploitation opérationnelle (PEO) comprend :', c: ['4 sous-parcs : PRGT, POPEX, PDYN, PE', '5 sous-parcs dont le PSP', 'Le PEO et le PIT'], e: 'Le soutien industriel lourd = parc hors ligne (PHL).', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Qui détient la carte d’achat de niveau 1 ?', c: ['La cellule approvisionnement des ateliers (CAA)', 'Le RDC', 'Le CDU'], e: 'La CAA gère aussi le stock atelier (listes R et V) et propose des solutions aux DHNS.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Combien de régiments sont dotés d’une UMR ?', c: ['6', '4', '9'], e: '2ᵉ REP, 1ᵉʳ RA, 61ᵉ RA, 9ᵉ RIMa, 2ᵉ RPIMa, RIMaP-NC.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'Qui peut interdire l’emploi d’un matériel si la sécurité est en jeu ?', c: ['L’OCMUE', 'Le SOCMUE', 'Le chef d’équipe'], e: 'OCMUE : planifie, organise, contrôle l’entretien. SOCMUE : conseiller technique du CDU.', src: 'AQA 03 (fiche définitive)' },
    { l: 'regiment', q: 'GME du SERVAL :', c: ['KNDS (ex-NEXTER) et TEXELIS', 'KNDS, ARQUUS et THALES SIX', 'ARQUUS seul'], e: 'GRIFFON / JAGUAR : KNDS, ARQUUS, THALES SIX.', src: 'AQA 03 (fiche définitive)' },
    { l: 'documentation', q: 'Combien de familles de documentation technique ?', c: ['3 : caractère général, DTU, modification', '4 dont le manuel de maintenance', '2 : technique et administrative'], e: 'Le manuel de maintenance fait partie de la DTU.', src: 'AQA 03 (fiche définitive)' },
    { l: 'documentation', q: 'Le MAT 1017 est visé mensuellement par :', c: ['Le sous-officier spécialisé, contresigné par le CDU', 'Le chef de corps', 'Le CBML'], e: 'Puis tous les 6 mois par le CBML et chaque année par le CDC.', src: 'AQA 03 (fiche définitive)' },
    { l: 'reparation', q: 'Dans les 7 étapes, quels contrôles fait le RDC ?', c: ['Le contrôle final uniquement', 'Les contrôles en cours, en fin d’acte et final', 'Aucun'], e: 'Contrôles en cours et en fin d’acte : chef d’atelier ; contrôle final : personnel qualifié du RDC.', src: 'AQA 03 (fiche définitive)' },
    { l: 'reparation', q: 'Qui passe les commandes de l’étape « approvisionnement » ?', c: ['Le chef d’atelier via SIM@T', 'Le RDC', 'Le CDU'], e: 'Suivi par le chef d’atelier et la CAA, qui réceptionne et distribue.', src: 'AQA 03 (fiche définitive)' },
    { l: 'histoire', q: 'Date de remise de l’étendard du Matériel ?', c: ['5 septembre 1980', '25 août 1940', '1er juillet 2023'], e: 'Garde tournante des BSMAT : 13ᵉ BSMAT en 2025-2026.', src: 'AQA 03 (fiche définitive)' },
    { l: 'histoire', q: 'Devise de l’EMPT ?', c: ['« Instruits, droits, adroits »', '« Servir et réparer »', '« Toujours prêts »'], e: 'Adoptée par l’EMPT du Mans en 1959.', src: 'AQA 03 (fiche définitive)' },
  ]
});
