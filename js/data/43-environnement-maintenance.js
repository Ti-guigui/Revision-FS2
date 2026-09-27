/* Environnement maintenance (RDC) : reprise complète de la fiche de l’élève, point par point, avec ses questions. */
REV.addLessons('mcot', 'reparation', [{
  id: 'environnement', title: 'Environnement maintenance : SMR, RDC, station, atelier, COS',
  html: `
<h3>La SMR</h3>
<p>RDC · station-service · atelier · approvisionnement.</p>
<div class="tw"><table><tr><th>Qui</th><th>Rôle</th></tr>
<tr><td><b>Conduite de la maintenance (CDM)</b></td><td>Pilote les activités de maintenance · <b>ouvre et clôture le MAT 4486</b></td></tr>
<tr><td><b>RDC</b> (Réception, Diagnostic, Contrôle)</td><td><ul>
<li>Ouvre l’AT</li><li>Ouvre et remplit le MAT 4486</li><li>Applique les procédures</li>
<li>Effectue le contrôle des organes de sécurité (<b>COS</b>) : sur ordre · annuellement · remisage de plus de 6 mois (sauf ENU)</li>
<li>Crée son tableau de production</li>
<li>Opérations de contrôle en sortie : organes de <b>freinage</b> · de <b>direction</b> · de <b>liaison au sol</b> · d’<b>éclairage</b> · suite aux <b>interventions techniques</b> · <b>essai dynamique</b></li>
<li><b>Distribue les différents travaux aux ateliers</b></li></ul></td></tr>
<tr><td><b>Station-service</b></td><td><ul>
<li>Entretien courant (vidange, petite réparation)</li>
<li>Assiste, participe et contrôle le 1ᵉʳ échelon (lavage, graissage)</li>
<li>Gère les ingrédients pour tout le monde</li>
<li>Participe à l’élimination des déchets</li>
<li>Remplit les préventives dans le MAT 10004 : <b>vidange en rouge obligatoirement</b> (de préférence toute la ligne)</li>
<li>Sollicitée pour les séances d’instruction</li></ul></td></tr>
<tr><td><b>Atelier</b></td><td><ul>
<li>Prépare les travaux sur chaque véhicule</li>
<li>Participe et affine les diagnostics du RDC</li>
<li>Respecte les gammes opératoires et les types d’AT</li>
<li>Effectue les réparations, visites et modifications</li>
<li>Met à jour la documentation (au moins savoir où la chercher)</li>
<li>Veille aux mesures SST et HSCT</li>
<li>Crée son tableau de production</li></ul></td></tr></table></div>
<h3>Bonnes pratiques pour une entrée en atelier</h3>
<ol><li>Réception de l’ordre de travail.</li>
<li>Manuel de réparation du véhicule concerné sur la desserte de travail.</li>
<li>Temps moyen de réparation connu.</li>
<li>Outillage spécifique nécessaire identifié et disponible : sa présence sera contrôlée en <b>MICAM</b>.</li>
<li>Identification des points clés par le chef d’atelier avec le chef d’équipe.</li>
<li>Compte rendu du chef d’équipe au chef d’atelier quand un point clé est atteint.</li>
<li>Contrôle du point clé par le chef d’atelier.</li>
<li>La réparation avance de point clé en point clé.</li></ol>
<h3>COS — Contrôle des organes de sécurité</h3>
<ul><li>Permet de se mettre en <b>conformité avec le code de la route</b>.</li>
<li>Effectué par un <b>BM2 Mobter affecté au RDC</b>. Par un <b>FS2 Mobter</b> si besoin <b>urgent, ponctuel, local</b>.</li>
<li>Suite à un retour de <b>RIP</b> (⚠ ne jamais repasser derrière).</li>
<li><b>Sur ordre</b> ; <b>annuellement</b> (+ 3,5 t) ; <b>bus : tous les 6 mois</b> ; <b>stockage de plus de 6 mois</b> (sauf ENU).</li></ul>
<h3>Documents</h3>
<ul><li><b>MAT 10004</b> : carnet d’entretien du matériel en complément de SIMMT ; permet le travail en <b>mode dégradé</b> en format papier ; peut être rempli par la <b>CDM, le RDC, le chef d’atelier</b>. Directive relative aux opérations de contrôle des véhicules terrestres relevant du périmètre de la structure intégrée du maintien en condition opérationnelle des matériels terrestres.</li>
<li><b>MAT 4486</b> : dossier d’intervention technique (<b>DIT</b>). Chapitre 4 — contrôle dans l’ordre : <b>éclairage → freinage → suspension → direction → réparation effectuée → essai dynamique</b>.</li>
<li><b>BIMT</b> : bulletin d’information des matériels terrestres ; mis à jour <b>tous les 3 mois</b> ; à consulter régulièrement pour voir les nouveautés ou modifications.</li></ul>
<h3>Les 7 étapes de la remise en condition opérationnelle</h3>
<p>Mise en réparation du matériel → diagnostic → préparation → approvisionnement → réparation → contrôles → restitution du matériel.</p>
<h3>Ordre de priorité d’intervention</h3>
<div class="tw"><table><tr><th>Cas 1</th><th>Cas 2</th></tr>
<tr><td>1. Visite NTI1, réparation</td><td>1. Réparation NTI1</td></tr>
<tr><td>2. Station</td><td>2. COS</td></tr>
<tr><td>3. COS</td><td>3. RIP</td></tr></table></div>
<h3>Opérations de contrôle</h3>
<ul><li><b>CT</b> : − 3,5 t tous les 2 ans (antipollution tous les ans) · + 3,5 t tous les ans · bus tous les 6 mois.</li>
<li>CTVC · VTG · <b>COS</b> · <b>MAT 4486 (ch. 4)</b> · <b>VP + OS</b>.</li>
<li><b>Visite périodique (VP + OS)</b> : inscrite sur la fiche de visite, par un <b>BM2 ou BSTAT Mobter</b>.</li></ul>
<h3>Opérations et demandes</h3>
<ul><li><b>Demande de nouveau matériel pour l’atelier</b> : la justifier par l’augmentation de la DTO, la limitation des risques HSCT et la protection de l’environnement.</li>
<li><b>Opération préventive</b> : si elle contient une vidange, elle s’écrit <b>en rouge</b> (⚠ attention au feuillet « OPÉRATIONS PRÉVENTIVES »).</li>
<li><b>Opérations correctives</b> : renseignées par le <b>chef d’atelier</b> ; suivi détaillé des opérations effectuées (prioriser les plus importantes).</li>
<li><b>Vérification périodique</b> : ESP, VGP, etc.</li>
<li><b>Opération en industrie privée = RIP</b>.</li></ul>`,
  retenir: ['CDM : pilote la maintenance, ouvre et clôture le MAT 4486.', 'RDC : ouvre l’AT, ouvre et remplit le MAT 4486, fait le COS, distribue les travaux aux ateliers.', 'COS : BM2 Mobter affecté au RDC (FS2 Mobter si urgent, ponctuel, local) ; sur ordre, annuellement, bus 6 mois, stockage > 6 mois sauf ENU (pas après une RIP).', 'MAT 4486 ch. 4 : éclairage, freinage, suspension, direction, réparation effectuée, essai dynamique.', 'Vidange = en rouge dans le MAT 10004 ; BIMT tous les 3 mois.'],
  pieges: ['Retour de RIP : pas de COS obligatoire, on ne repasse jamais derrière (le prestataire rend le véhicule apte et conforme au code de la route).', 'Le MAT 10004 peut être rempli par la CDM, le RDC et le chef d’atelier (pas seulement le RDC).'],
  memo: { cle: 'CDM PILOTE · RDC CONTRÔLE · STATION ENTRETIENT · ATELIER RÉPARE', flow: ['CDM ouvre le MAT 4486', 'RDC : réception, diagnostic', 'Atelier / station : travaux', 'RDC : contrôle de sortie + COS', 'CDM clôture'], points: ['COS : BM2 Mobter affecté au RDC', 'Bus : COS tous les 6 mois', 'BIMT : 3 mois', 'Vidange en rouge'], astuce: 'Éclairage, Freinage, Suspension, Direction, Réparation, Essai : « Et Freiner Sans Dévier, Réparer, Essayer ».' }
}]);

REV.addExercises('mcot', { lessons: [], questions: [
  { l: 'environnement', q: 'De quoi se compose la SMR ?', c: ['RDC, station-service, atelier, approvisionnement', 'CDM, RDC, BML, CDU', 'Station-service et atelier uniquement'], e: 'SMR : RDC – station – atelier – appro.' },
  { l: 'environnement', q: 'Rôle de la conduite de la maintenance (CDM) ?', c: ['Piloter les activités de maintenance ; ouvrir et clôturer le MAT 4486', 'Faire le COS des véhicules', 'Gérer les ingrédients'], e: 'La CDM pilote la maintenance ; elle ouvre et clôture le MAT 4486.' },
  { l: 'environnement', q: 'Que signifie RDC ?', c: ['Réception, diagnostic, contrôle', 'Réparation, dépannage, contrôle', 'Répartition des commandes'], e: 'RDC = réception, diagnostic, contrôle.' },
  { l: 'environnement', q: 'Lequel de ces rôles appartient au RDC ?', c: ['Ouvrir l’AT, ouvrir et remplir le MAT 4486', 'Gérer les ingrédients pour tout le monde', 'Préparer les travaux sur chaque véhicule'], e: 'RDC : ouvre l’AT, ouvre et remplit le MAT 4486, applique les procédures, fait le COS, crée son tableau de production, distribue les travaux.' },
  { l: 'environnement', q: 'Opérations de contrôle en sortie faites par le RDC :', c: ['Organes de freinage, de direction, de liaison au sol, d’éclairage, suite aux interventions techniques, essai dynamique', 'Niveaux et lavage uniquement', 'Uniquement l’essai dynamique'], e: 'Six contrôles en sortie, dont la vérification des interventions techniques et l’essai dynamique.' },
  { l: 'environnement', q: 'Au sein de la SMR, qui répartit les travaux entre les ateliers ?', c: ['Le RDC', 'La CDM', 'La station-service'], e: 'Le RDC distribue les travaux aux ateliers (phase 2 du DIT).' },
  { l: 'environnement', q: 'Qui fait l’entretien courant (vidange, petite réparation) ?', c: ['La station-service', 'Le RDC', 'La CDM'], e: 'La station-service fait l’entretien courant et assiste le 1ᵉʳ échelon.' },
  { l: 'environnement', q: 'Qui assiste, participe et contrôle le 1ᵉʳ échelon (lavage, graissage) ?', c: ['La station-service', 'L’atelier', 'Le RDC'], e: 'Station-service : 1ᵉʳ échelon, ingrédients, déchets, préventives, instruction.' },
  { l: 'environnement', q: 'La station-service remplit les préventives dans le MAT 10004. Une vidange s’écrit :', c: ['En rouge obligatoirement, de préférence toute la ligne', 'En bleu', 'Au crayon à papier'], e: 'Vidange en rouge obligatoirement (de préférence toute la ligne).' },
  { l: 'environnement', q: 'Qui est sollicité pour les séances d’instruction ?', c: ['La station-service', 'La CDM', 'Le RDC uniquement'], e: 'La station-service est sollicitée pour les séances d’instruction.' },
  { l: 'environnement', q: 'Qui prépare les travaux sur chaque véhicule et affine les diagnostics du RDC ?', c: ['L’atelier', 'La station-service', 'La CDM'], e: 'L’atelier prépare les travaux, affine les diagnostics, respecte les gammes opératoires et les types d’AT.' },
  { l: 'environnement', q: 'Pour la documentation, l’atelier doit :', c: ['La mettre à jour (au moins savoir où la chercher)', 'La confier au RDC', 'Ne consulter que le BIMT'], e: 'L’atelier met à jour la documentation, ou au moins sait où la chercher.' },
  { l: 'environnement', q: 'L’atelier veille aux mesures :', c: ['SST et HSCT', 'ADR uniquement', 'NRBC'], e: 'L’atelier veille aux mesures SST et HSCT et crée son tableau de production.' },
  { l: 'environnement', q: 'Bonne pratique pour une entrée en atelier : où doit se trouver le manuel de réparation du véhicule ?', c: ['Sur la desserte de travail', 'Au bureau du RDC', 'Au magasin'], e: 'Manuel de réparation du véhicule concerné sur la desserte de travail.' },
  { l: 'environnement', q: 'Qui identifie les points clés d’une réparation ?', c: ['Le chef d’atelier avec le chef d’équipe', 'Le RDC seul', 'La CDM'], e: 'Le chef d’équipe rend compte quand un point clé est atteint ; le chef d’atelier le contrôle.' },
  { l: 'environnement', q: 'Quand un point clé est atteint, que se passe-t-il ?', c: ['Le chef d’équipe rend compte au chef d’atelier, qui contrôle le point clé', 'Le véhicule part au RDC', 'On passe directement à l’essai dynamique'], e: 'La réparation avance de point clé en point clé.' },
  { l: 'environnement', q: 'À quoi sert le COS ?', c: ['Se mettre en conformité avec le code de la route', 'Commander les pièces', 'Suivre les heures des mécaniciens'], e: 'COS = contrôle des organes de sécurité.' },
  { l: 'environnement', q: 'Qui effectue le COS ?', c: ['Un BM2 Mobter affecté au RDC', 'Le chef d’atelier qui a réparé', 'Le conducteur du véhicule'], e: 'BM2 Mobter affecté au RDC ; un FS2 Mobter peut le faire si besoin urgent, ponctuel, local.' },
  { l: 'environnement', q: 'Dans quel cas un FS2 Mobter peut-il effectuer le COS ?', c: ['Si le besoin est urgent, ponctuel, local', 'Jamais', 'Uniquement pour les bus'], e: 'COS par un FS2 Mobter : besoin urgent, ponctuel, local.' },
  { l: 'environnement', q: 'Un bus doit passer le COS :', c: ['Tous les 6 mois', 'Tous les ans', 'Tous les 2 ans'], e: 'COS : annuellement (+ 3,5 t) ; bus tous les 6 mois.' },
  { l: 'environnement', q: 'Véhicule qui sort de stockage : quand faut-il un COS ?', c: ['Après plus de 6 mois de stockage (sauf ENU)', 'Après 1 mois de stockage', 'Jamais après un stockage'], e: 'Stockage de plus de 6 mois (sauf ENU).' },
  { l: 'environnement', q: 'Véhicule qui revient de RIP : le RDC est-il obligé de faire un COS ?', c: ['Non : le prestataire doit rendre le véhicule apte et conforme au code de la route, on ne repasse jamais derrière', 'Oui, un COS est obligatoire après chaque RIP', 'Oui, et il refait les réparations de la RIP'], e: 'Suite à un retour de RIP : ⚠ ne jamais repasser derrière. C’est le prestataire qui rend le véhicule apte et conforme.' },
  { l: 'environnement', q: 'Que signifie RIP ?', c: ['Opération en industrie privée', 'Réparation d’intervention prioritaire', 'Retour immédiat au parc'], e: 'Opération en industrie privée = RIP.' },
  { l: 'environnement', q: 'Le MAT 10004 permet :', c: ['De travailler en mode dégradé, en format papier, en complément de SIMMT', 'De commander les pièces', 'D’ouvrir le DIT'], e: 'MAT 10004 = carnet d’entretien du matériel en complément de SIMMT ; mode dégradé papier.' },
  { l: 'environnement', q: 'Que signifie BIMT ?', c: ['Bulletin d’information des matériels terrestres', 'Bureau d’inspection des matériels techniques', 'Bilan d’intervention de maintenance terrestre'], e: 'BIMT : mis à jour tous les 3 mois, à consulter régulièrement (nouveautés, modifications).' },
  { l: 'environnement', q: 'MAT 4486, chapitre 4 : par quoi commence le contrôle ?', c: ['L’éclairage', 'L’essai dynamique', 'La direction'], e: 'Ordre : éclairage → freinage → suspension → direction → réparation effectuée → essai dynamique.' },
  { l: 'environnement', q: 'MAT 4486, chapitre 4 : par quoi se termine le contrôle ?', c: ['L’essai dynamique', 'L’éclairage', 'Le freinage'], e: 'Le contrôle se termine par l’essai dynamique, après les réparations effectuées.' },
  { l: 'environnement', q: 'Première des 7 étapes de la remise en condition opérationnelle ?', c: ['Mise en réparation du matériel', 'Diagnostic', 'Approvisionnement'], e: 'Mise en réparation → diagnostic → préparation → approvisionnement → réparation → contrôles → restitution.' },
  { l: 'environnement', q: 'Dernière des 7 étapes ?', c: ['Restitution du matériel', 'Contrôles', 'Réparation'], e: 'Restitution du matériel, après les contrôles.' },
  { l: 'environnement', q: 'Ordre de priorité d’intervention : visite NTI1, station et COS ?', c: ['1. Visite NTI1 / réparation, 2. station, 3. COS', '1. COS, 2. station, 3. NTI1', '1. Station, 2. COS, 3. NTI1'], e: 'Le COS vient après la visite et la station.' },
  { l: 'environnement', q: 'Ordre de priorité : réparation NTI1, COS et RIP ?', c: ['1. Réparation NTI1, 2. COS, 3. RIP', '1. RIP, 2. COS, 3. NTI1', '1. COS, 2. RIP, 3. NTI1'], e: 'Réparation NTI1 → COS → RIP.' },
  { l: 'environnement', q: 'Contrôle technique d’un véhicule de moins de 3,5 t :', c: ['Tous les 2 ans (antipollution tous les ans)', 'Tous les 6 mois', 'Tous les 5 ans'], e: 'CT : − 3,5 t tous les 2 ans, antipollution 1 an ; + 3,5 t tous les ans ; bus tous les 6 mois.' },
  { l: 'environnement', q: 'Contrôle technique d’un véhicule de plus de 3,5 t :', c: ['Tous les ans', 'Tous les 2 ans', 'Tous les 6 mois'], e: '+ 3,5 t : 1 an ; bus : 6 mois.' },
  { l: 'environnement', q: 'Visite périodique (VP + OS) : où est-elle inscrite et par qui ?', c: ['Sur la fiche de visite, par un BM2 ou BSTAT Mobter', 'Sur le MAT 1015, par le conducteur', 'Dans le BIMT, par la CDM'], e: 'VP + OS : inscrite sur la fiche de visite par un BM2 ou BSTAT Mobter.' },
  { l: 'environnement', q: 'Opération préventive contenant une vidange :', c: ['Elle s’écrit en rouge (attention au feuillet « opérations préventives »)', 'Elle ne s’écrit pas', 'Elle s’écrit dans le BIMT'], e: 'Préventive avec vidange = écrite en rouge.' },
  { l: 'environnement', q: 'Opérations correctives : qui les renseigne ?', c: ['Le chef d’atelier (suivi détaillé, prioriser les plus importantes)', 'La station-service', 'Le conducteur'], e: 'Le chef d’atelier renseigne le suivi détaillé des opérations effectuées.' },
  { l: 'environnement', q: 'Exemples de vérifications périodiques :', c: ['ESP, VGP', 'COS, NTI1', 'CT, VTG'], e: 'Vérification périodique : ESP, VGP, etc.' }
] });
