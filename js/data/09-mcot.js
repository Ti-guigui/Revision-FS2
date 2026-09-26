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
<tr><td>Musée du Matériel</td><td>1997 (centre de recueil du patrimoine)</td></tr>
<tr><td>Garde de l’étendard</td><td>Assurée par les BSMAT depuis 2018 ; 2025-2026 : 13ᵉ BSMAT</td></tr>
<tr><td>Pilote du domaine maintenance (MAI)</td><td>COM ÉcoMAT (depuis l’été 2024)</td></tr>
<tr><td>COMMF créé le 1ᵉʳ juillet…</td><td>2016 (non vérifiable dans l’AQA 03)</td></tr>
<tr><td>EMPT</td><td>Sous l’autorité de la DRH-AT ; contrat de 9 ans après le bac</td></tr>
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
<li>Organisation : maîtrise d’ouvrage (MOA), maîtrise d’ouvrage déléguée (MOAd), maîtrises d’œuvre (MOE).</li>
<li><b>3 niveaux techniques d’intervention (NTI)</b> ; les actes de NTI3 relèvent en général de la MO. La RAM sépare NTI1 et NTI2.</li>
<li><b>COMMF</b> : maîtrise d’œuvre de la maintenance opérationnelle (pour les trois armées). Les 6 régiments du Matériel : MO de leur zone. MICAM subordonnée à la SIMMT.</li>
<li>La SIMMT entretient la documentation de maintenance. <b>Types d’interventions</b> : préventives, correctives, de modification (+ rénovation sur SIM@T).</li>
<li>En opération : 6 principes du MCO-T ; AMAT = autorité fonctionnelle et coordinateur MCO-T sur le théâtre ; ASIA = conseiller log du commandement de la force.</li>
<li>3 familles professionnelles : FP MMT, FP LSC, FP MUN.</li></ul>
<div class="tw"><table><tr><th>Sigle</th><th>Signification</th></tr>
<tr><td>SIMMT</td><td>Structure intégrée du MCO des matériels terrestres</td></tr>
<tr><td>SMITer</td><td>Service de la maintenance industrielle terrestre</td></tr>
<tr><td>MICAM</td><td>Mission de contrôle et d’appui de la maintenance</td></tr>
<tr><td>SIM@T</td><td>Système d’information de la maintenance terrestre</td></tr>
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
<li><b>STE</b> : cellules gestion logistique des biens, <b>conduite de la maintenance (CDM, pilote la maintenance)</b>, gestion pool tactique, munitions du corps de troupe.</li>
<li><b>SMR</b> : cellule RDC (réception-diagnostic-contrôle), station-service, ateliers, cellule approvisionnement.</li>
<li>L’entretien, acte de combat et d’instruction, incombe à <b>TOUS les détenteurs</b> de matériels.</li>
<li>PPAC : PEO (parc en exploitation opérationnelle) et PIT (parc en immobilisation technique).</li>
<li><b>Stocks</b> : central, régional, local. <b>Statut de gestion logistique</b> = situation et état d’un bien. Code état 79 = à éliminer (52 = pièce neuve).</li>
<li>REO : moyens en personnel et matériels dimensionnant une unité.</li>
<li>Marchés : GME GRIFFON/JAGUAR = NEXTER, ARQUUS, THALES ; SERVAL = NEXTER, ARQUUS, TEXELIS. VDAE remplace VBL et VB2L.</li>
<li><b>SIMu</b> : un échelon central et <b>4 établissements principaux</b>. Hors SIMu : <b>vecteurs nucléaires</b>, artifices liés à la navigabilité des aéronefs.</li>
<li>Détenteur des biens de l’arme du Matériel dans une formation : le <b>CDU</b>.</li></ul>`,
      retenir: ['CDM = pilote la maintenance.', 'Stocks : central, régional, local.', 'SIMu : 1 échelon central + 4 établissements principaux.', 'Le responsable de la gestion logistique est désigné par le chef de corps.'],
      pieges: ['Le quiz FS2 dit 5 EPMu : l’AQA 03 dit 4 (à vérifier).'],
      memo: { cle: 'CDC → CBML → CDM → SMR', points: ['CBML conseille le CDC', 'CDM pilote la maintenance', 'SMR = RDC + station-service + ateliers + appro', 'Statut de gestion logistique = situation et état'], astuce: 'L’entretien, c’est l’affaire de tous les détenteurs, pas seulement des mécanos.' }
    },
    {
      id: 'documentation', title: 'Documentation',
      html: `
<ul><li><b>Circulaire 9400</b> (05/07/2004) : documentation technique + complémentaire. <b>Circulaire 9401</b> (27/07/2004) : organisation de la maintenance dans les formations.</li>
<li>Documentation technique utilisateur : <b>TCKIT, notice de mise en œuvre, documentation d’entretien</b> ; manuel de maintenance (nature et temps de l’opération, opérateurs, outillage, ingrédients).</li>
<li><b>MAT 1015 = carnet de bord</b>. <b>MAT 10004</b> (remplace le MAT 1013) = vie du matériel de la mise en place au retrait, suivi des entretiens. <b>MAT 1017</b> = observations des inspections ; signé par le commandant d’unité chaque mois, le chef BML tous les 6 mois, le chef de corps une fois par an. <b>MAT 4486 = DIT</b>.</li>
<li><b>BIMT</b> : veille documentaire, <b>trimestriel</b>. Toujours utiliser la dernière fiche de visite approuvée.</li>
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
<p><b>Le RDC prend en charge 4 étapes sur 7.</b></p>
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
<tr><td>Visite périodique valant COS : qui l’enregistre au MAT 10004 ?</td><td>Le RDC</td></tr></table></div>`,
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
    { l: 'regiment', q: 'Qui pilote la maintenance au BML ?', c: ['La CDM (conduite de la maintenance)', 'Le RDC', 'La cellule approvisionnement', 'La station-service'], e: 'La cellule CDM de la STE pilote la maintenance.', src: 'Contrôle RDC' },
    { l: 'regiment', q: 'La situation et l’état d’un bien, c’est :', c: ['Le statut de gestion logistique', 'Le code état', 'L’arborescence logistique', 'Le REO'], e: 'Statut de gestion logistique = situation et état d’un bien.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Échelonnement des stocks ?', c: ['Central, régional, local', 'National, zonal, régimentaire', 'Stratégique, opératif, tactique', 'Principal, secondaire'], e: 'Stocks central, régional, local.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Organisation du SIMu (AQA 03) ?', c: ['Un échelon central et quatre établissements principaux', 'Un échelon central et cinq établissements principaux', 'Trois échelons régionaux', 'Six régiments'], e: 'Réponse du QCM : 4 établissements principaux.', w: 'Le quiz FS2 parle de 5 EPMu : à vérifier.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Quelle munition est hors SIMu ?', c: ['Les vecteurs nucléaires', 'Les obus de 155 mm', 'Les munitions de petit calibre', 'Les grenades'], e: 'Hors SIMu : vecteurs nucléaires et artifices liés à la navigabilité des aéronefs.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'La section de maintenance régimentaire (SMR), ce sont…', c: ['Des spécialistes affectés au RDC, à la station-service ou aux ateliers', 'Les détenteurs de matériels', 'Les officiers du BML', 'Les personnels de la MICAM'], e: 'SMR : cellule RDC, station-service, ateliers, cellule approvisionnement.', src: 'QCM Test FS2' },
    { l: 'regiment', q: 'Qui détient les biens de l’arme du Matériel dans une formation ?', c: ['Le CDU', 'Le chef de corps', 'Le CPRP', 'Le chef d’atelier'], e: 'Réponse du QCM Test FS2 : le CDU.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Le MAT 1015, c’est :', c: ['Le carnet de bord', 'Le DIT', 'La vie du matériel et ses entretiens', 'Le registre SST'], e: 'MAT 1015 = carnet de bord ; MAT 10004 = vie du matériel ; MAT 4486 = DIT.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Rôle du MAT 10004 ?', c: ['Suivre la vie du matériel de la mise en place au retrait, et ses entretiens', 'Carnet de bord', 'Demande d’intervention technique', 'Observations des inspections'], e: 'Il remplace le MAT 1013.', src: 'Contrôle RDC' },
    { l: 'documentation', q: 'Édition du BIMT ?', c: ['Trimestrielle', 'Mensuelle', 'Annuelle', 'Semestrielle'], e: 'Le BIMT assure la veille documentaire tous les trimestres.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'Un fait technique peut être…', c: ['Fortuit ou prescrit', 'Préventif ou correctif', 'Majeur ou mineur', 'Interne ou externe'], e: 'FT = fait technique ; BS = bulletin de sécurité.', src: 'QCM Test FS2' },
    { l: 'documentation', q: 'La documentation technique utilisateur comprend :', c: ['TCKIT, notice de mise en œuvre, documentation d’entretien', 'DUERP, FEN, registre SST', 'MAT 1017 uniquement', 'Circulaires 9400 et 9401'], e: 'Réponse du QCM Test FS2.', src: 'QCM Test FS2' },
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
    { l: 'reparation', q: 'Chef d’atelier : BSTAT + FA 3 selon quel TTA ?', c: ['TTA 129', 'TTA 150', 'TTA 106', 'TTA 208'], e: 'Réponse du contrôle RDC.', src: 'Contrôle RDC' }
  ]
});
