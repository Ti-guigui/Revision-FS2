/* Quiz RDC du formateur (Socrative FS2PPLOG, 18 questions) : questions et corrigé recopiés mot pour mot. */
REV.addExercises('mcot', {
  lessons: [
    {
      id: 'quiz-rdc', title: 'Quiz RDC',
      html: `
<h3>Énoncé</h3>
<p>Quiz de 18 questions recopiées <b>mot pour mot</b>, avec leur correction. Plusieurs questions ont <b>plusieurs bonnes réponses</b> : coche-les toutes.</p>
<h3>Ce qu’il faut retenir du corrigé</h3>
<div class="tw"><table><tr><th>Question</th><th>Bonne réponse</th></tr>
<tr><td>Qui répartit les travaux sur un VHL ?</td><td>Le RDC</td></tr>
<tr><td>À quoi sert le COS ?</td><td>Mettre le VHL en conformité avec le code de la route</td></tr>
<tr><td>COS obligatoire au retour de RIP ?</td><td><b>Non</b> : le prestataire doit rendre le véhicule apte et conforme au code de la route</td></tr>
<tr><td>Poste au RDC (militaire)</td><td>2 ans d’atelier, FA RDC/COS, inscrit sur le DUO, titulaire du BM2 / BSTAT Mobter ou FS1 NG</td></tr>
<tr><td>Poste au RDC (civil)</td><td>Inscrit sur le DUO, FA RDC/COS, 2 ans d’atelier, FS2 Mobter, FS1 ou FS1 NG</td></tr>
<tr><td>Relevé de potentiel</td><td>Le potentiel cumulé est toujours supérieur ou égal au potentiel relevé (changement de compteur)</td></tr>
<tr><td>Qui signe la VP-COS ?</td><td>Le chef d’atelier</td></tr>
<tr><td>RDC fermé 2 semaines</td><td>Attendre que le RDC soit ouvert</td></tr>
<tr><td>RIP : qui renseigne le MAT 10004 ?</td><td>Le prestataire</td></tr>
<tr><td>Mode dégradé avec le MAT 10004</td><td>Vrai</td></tr>
<tr><td>Fiche de visite</td><td>Sur le site documentaire (toujours à jour)</td></tr>
<tr><td>Qui valide la partie 4 du DIT ?</td><td>L’ECM</td></tr>
<tr><td>VHL sort d’atelier, dernier COS à 6 mois</td><td>Le contrôle des réparations et la phase 4 du MAT</td></tr>
<tr><td>Quand faire un COS ?</td><td>Une fois par an, lors d’une VP + OS, sur ordre, après un remisage de plus de 6 mois</td></tr>
<tr><td>Qui pilote la maintenance au niveau BML ?</td><td>La CDM</td></tr>
<tr><td>Vidanges sur le MAT 10004</td><td>En rouge</td></tr>
<tr><td>7 étapes de la remise en condition</td><td>Mise en réparation, diagnostic, préparation, approvisionnement, réparation, contrôle, restitution</td></tr>
<tr><td>NTI1, station et COS</td><td>NTI1, station, COS</td></tr></table></div>`,
      retenir: ['Pas de COS obligatoire au retour de RIP : le prestataire rend le véhicule apte et conforme.', 'COS : tous les ans, lors d’une VP + OS, sur ordre, après remisage > 6 mois.', 'RDC fermé → attendre qu’il soit ouvert.', 'Potentiel cumulé ≥ potentiel relevé.', 'Fiche de visite : site documentaire ; VP-COS signée par le chef d’atelier.'],
      pieges: ['« Création d’AT » et « clôture du MAT 10004 » ne font pas partie des 7 étapes.', 'Le chef d’atelier ne sort pas lui-même le véhicule quand le RDC est fermé.'],
      memo: { cle: 'RDC RÉPARTIT · CDM PILOTE · ECM VALIDE', flow: ['Mise en réparation', 'Diagnostic', 'Préparation', 'Approvisionnement', 'Réparation', 'Contrôle', 'Restitution'], points: ['COS : 1 an, remisage > 6 mois, sur ordre', 'RIP : le prestataire renseigne le MAT 10004', 'Ordre : NTI1 → station → COS'], astuce: 'On ne repasse jamais derrière une RIP.' }
    }
  ],
  questions: [
    { l: 'quiz-rdc', fixed: true, a: 2, q: 'Q1 — Qui répartit les différents travaux à effectuer sur un VHL ?', c: ['CDM', 'Le chef BML', 'Le RDC'], e: 'Le RDC distribue les différents travaux aux ateliers.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q2 — À quoi sert le COS ?', c: ['Augmenter la DTO du régiment', 'Éviter les sueurs froides au CDC', 'Mettre en conformité le VHL avec le règlement militaire', 'Mettre en conformité le VHL avec le code de la route'], e: 'Le COS (contrôle des organes de sécurité) met le véhicule en conformité avec le code de la route.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q3 — Je suis au RDC, je suis obligé de faire un COS sur un véhicule qui sort de RIP (vrai / faux)', c: ['Vrai', 'Faux'], e: 'Faux : le prestataire est dans l’obligation de rendre le véhicule apte et conforme au code de la route.' },
    { l: 'quiz-rdc', fixed: true, a: [1, 2, 4, 5], q: 'Q4 — Pour prendre le poste au RDC, le militaire doit : (plusieurs réponses)', c: ['Être spécialiste sur un véhicule', 'Avoir 2 ans d’atelier', 'Avoir la FA RDC/COS', 'Être titulaire d’un BM2/BSTAT, peu importe la spécialité', 'Être inscrit sur le DUO', 'Être titulaire du BM2/BSTAT Mobter ou du FS1 NG'], e: 'Militaire : 2 ans d’ateliers, FA RDC/COS, inscrit sur le DUO, titulaire du BM2 / BSTAT Mobter ou FS1 NG. Un BM2 / BSTAT d’une autre spécialité ne convient pas.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 1], q: 'Q5 — Lors d’un relevé de potentiel sur un véhicule : (plusieurs réponses)', c: ['Le potentiel relevé peut être égal au potentiel cumulé', 'Le potentiel cumulé peut être supérieur au potentiel relevé', 'Le potentiel relevé peut être supérieur au potentiel cumulé', 'Le potentiel cumulé peut être inférieur au potentiel relevé'], e: 'Le potentiel cumulé est toujours supérieur ou égal au potentiel relevé (en cas de changement de compteur).' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q6 — Qui doit signer la VP-COS ?', c: ['Le chef d’atelier', 'Le RDC', 'Les trois', 'La CDM'], e: 'La VP-COS est signée par le chef d’atelier.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q7 — Je suis chef d’atelier poids lourd, le RDC est fermé pour 2 semaines, que dois-je faire ?', c: ['Sortir les véhicules moi-même', 'Demander à l’ECM de faire sortir les véhicules', 'Demander la validation du chef BML', 'Attendre que le RDC soit ouvert'], e: 'Seul le RDC fait sortir les véhicules : on attend qu’il soit ouvert.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q8 — Dans le cas d’une RIP, qui renseigne le MAT 10004 ?', c: ['L’ECM', 'Le prestataire', 'Le RDC', 'Le prestataire et le RDC', 'Le RDC et la CDM'], e: 'En RIP, c’est le prestataire qui renseigne le MAT 10004.' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q9 — Je peux travailler en mode dégradé à l’aide du MAT 10004 (vrai / faux)', c: ['Vrai', 'Faux'], e: 'Vrai : le MAT 10004 permet de travailler en mode dégradé, en format papier, en complément de SIM@T.' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q10 — Pour effectuer une visite sur un véhicule, où puis-je récupérer la fiche de visite ?', c: ['Sur le site documentique', 'À la CDM', 'Auprès de l’off maint', 'Sur SIM@T'], e: 'On trouve toujours la fiche de visite à jour sur le site documentaire.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q11 — Qui valide la partie 4 du DIT ?', c: ['Le RDC', 'L’ECM', 'L’off maint', 'Le sergent de semaine'], e: 'La partie 4 du DIT est validée par l’ECM (équipe de conduite de la maintenance).' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q12 — Je suis au RDC, un VHL sort d’atelier, le dernier COS remonte à 6 mois, j’effectue sur le véhicule :', c: ['Un COS et la phase 4 du MAT', 'Le contrôle des réparations et la phase 4 du MAT', 'Un COS, le contrôle des réparations et la phase 4 du MAT'], e: 'Le COS est annuel : à 6 mois il est encore valable. On contrôle les réparations et on remplit la phase 4.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 3, 4, 5, 6], q: 'Q13 — Pour prendre le poste au RDC, un civil doit : (plusieurs réponses)', c: ['Être inscrit sur le DUO', 'Être spécialisé sur un véhicule', 'Être désigné par la DRHAT', 'Avoir la FA RDC/COS', 'Avoir 2 ans d’atelier', 'Être FS2 Mobter', 'Être FS1 ou FS1 NG'], e: 'Civil : inscrit sur le DUO, FA RDC/COS, 2 ans d’atelier, FS2 Mobter, FS1 ou FS1 NG.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 2, 3], q: 'Q14 — Quand dois-je effectuer un COS ? (plusieurs réponses)', c: ['Une fois par an', 'Après une RIP', 'Après un remisage de plus de 6 mois', 'Sur ordre'], e: 'COS : une fois par an, lors d’une VP + OS, sur ordre, après un remisage de plus de 6 mois. Sortie de RIP : on ne touche plus au véhicule.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q15 — Qui pilote la maintenance au niveau BML ?', c: ['Les chefs d’atelier', 'La CDM', 'Le RDC', 'L’off maint'], e: 'La conduite de la maintenance (CDM) pilote les activités de maintenance.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q16 — Sur le MAT 10004, les vidanges sont inscrites :', c: ['En noir', 'En vert', 'En bleu', 'En rouge', 'Peu importe'], e: 'Une opération contenant une vidange s’écrit en rouge.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 1, 4, 6, 7, 9, 10], q: 'Q17 — Donnez les 7 étapes de la remise en condition du matériel (plusieurs réponses)', c: ['Réparation', 'Préparation', 'Nettoyage du matériel', 'Création d’AT', 'Diagnostic', 'Clôture du MAT 10004 et des AT', 'Contrôle', 'Mise en réparation du matériel', 'Récupération des pièces', 'Restitution du matériel', 'Approvisionnement'], e: 'Mise en réparation, diagnostic, préparation, approvisionnement, réparation, contrôle, restitution.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q18 — Un VHL rentre en atelier pour une visite NTI1, station et COS, dans quel ordre logique sont effectuées les visites ?', c: ['NTI1, COS, station', 'COS, NTI1, station', 'station, COS, NTI1', 'NTI1, station, COS'], e: 'Ordre de priorité : 1. NTI1, 2. station, 3. COS (le COS vient en dernier sur un véhicule en état).' }
  ].map(function (q) { q.src = 'Quiz RDC'; return q; })
});

/* Conditions officielles pour les contrôles (AQA 03 indice R, note SIMMT du 22 mai 2024). */
REV.extendLesson('mcot/environnement', {
  html: `
<h3>Qui peut faire les contrôles avant remise en circulation (AQA 03)</h3>
<div class="tw"><table><tr><th></th><th>Cas normal</th><th>Si la ressource manque</th></tr>
<tr><td><b>Militaire</b></td><td>Détenteur de la <b>FS2 MOT</b></td><td>Sous-officier <b>FS1 NG MOT</b>, <b>2 ans</b> minimum d’atelier, <b>FA CTRL RDC COS</b> suivie à la DTM de l’ÉcoMAT</td></tr>
<tr><td><b>Civil</b></td><td>Détenteur de la <b>FS2 MOT</b></td><td>OE G6 minimum, <b>FS1 ou FS1 NG</b>, <b>2 ans</b> minimum d’atelier militaire, <b>FA CTRL RDC COS</b></td></tr></table></div>
<ul><li>L’activité de contrôle comprend : le <b>COS</b> et ses dérivés (CT, CTCV), le <b>contrôle après maintenance</b> (phase 4 du DIT, MAT 4486) et le contrôle après une <b>fiche de visite ayant valeur de COS</b> (VP + OS).</li>
<li>Contrôles en cours et en fin d’acte technique : le <b>chef d’atelier</b>. <b>Contrôle final</b> : personnel qualifié et <b>nommément désigné du RDC</b>.</li>
<li>La <b>restitution</b> du matériel est à la charge du RDC (ateliers MOT) : documents renseignés, AT et DATEC clôturés.</li></ul>`,
  retenir: ['Contrôle avant remise en circulation : FS2 MOT ; à défaut FS1 NG MOT + 2 ans d’atelier + FA CTRL RDC COS.', 'Contrôle final = personnel nommément désigné du RDC.']
});
