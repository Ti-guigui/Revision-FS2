/* Quiz RDC du formateur (Socrative FS2PPLOG, 18 questions) : questions et corrigé recopiés mot pour mot. */
REV.addExercises('mcot', {
  lessons: [
    {
      id: 'quiz-rdc', title: 'Quiz RDC (corrigé du formateur)',
      html: `
<h3>Énoncé</h3>
<p>Quiz de 18 questions recopiées <b>mot pour mot</b>, avec le <b>corrigé du formateur</b>. Plusieurs questions ont <b>plusieurs bonnes réponses</b> : coche-les toutes.</p>
<h3>Ce qu’il faut retenir du corrigé</h3>
<div class="tw"><table><tr><th>Question</th><th>Réponse du formateur</th></tr>
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
<tr><td>Quand faire un COS ?</td><td>Une fois par an, après un remisage de plus de 6 mois, sur ordre</td></tr>
<tr><td>Qui pilote la maintenance au niveau BML ?</td><td>La CDM</td></tr>
<tr><td>Vidanges sur le MAT 10004</td><td>En rouge</td></tr>
<tr><td>7 étapes de la remise en condition</td><td>Mise en réparation, diagnostic, préparation, approvisionnement, réparation, contrôle, restitution</td></tr>
<tr><td>NTI1, station et COS</td><td>NTI1, station, COS</td></tr></table></div>`,
      retenir: ['Pas de COS obligatoire au retour de RIP : le prestataire rend le véhicule apte et conforme.', 'COS : une fois par an, après remisage > 6 mois, sur ordre.', 'RDC fermé → attendre qu’il soit ouvert.', 'Potentiel cumulé ≥ potentiel relevé.', 'Fiche de visite : site documentaire ; VP-COS signée par le chef d’atelier.'],
      pieges: ['« Création d’AT » et « clôture du MAT 10004 » ne font pas partie des 7 étapes.', 'Le chef d’atelier ne sort pas lui-même le véhicule quand le RDC est fermé.'],
      memo: { cle: 'RDC RÉPARTIT · CDM PILOTE · ECM VALIDE', flow: ['Mise en réparation', 'Diagnostic', 'Préparation', 'Approvisionnement', 'Réparation', 'Contrôle', 'Restitution'], points: ['COS : 1 an, remisage > 6 mois, sur ordre', 'RIP : le prestataire renseigne le MAT 10004', 'Ordre : NTI1 → station → COS'], astuce: 'On ne repasse jamais derrière une RIP.' }
    }
  ],
  questions: [
    { l: 'quiz-rdc', fixed: true, a: 2, q: 'Q1 — qui réparti les differents travaux a effectuer sur un VHL ?', c: ['CDM', 'Le chef BML', 'Le RDC'], e: 'Le RDC distribue les différents travaux aux ateliers.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q2 — A quoi sert la COS', c: ['a augmenté la DTO du régiment', 'a évité les sueurs froide au CDC', 'sert a mettre en conformité le VHL au réglement militaire', 'sert a mettre en conformité le VHL au code de la route'], e: 'Le COS (contrôle des organes de sécurité) met le véhicule en conformité avec le code de la route.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q3 — je suis au RDC, je suis obligé de faire un COS sur un véhicule qui sort de RIP (vrai / faux)', c: ['Vrai', 'Faux'], e: 'Faux : le prestataire est dans l’obligation de rendre le véhicule apte et conforme au code de la route.' },
    { l: 'quiz-rdc', fixed: true, a: [1, 2, 4, 5], q: 'Q4 — pour prendre le poste au RDC le militaire doit être : (plusieurs réponses)', c: ['être specialiste sur un véhicule', '2 ans d’ateliers', 'FA RDC/COS', 'être titulaire d’un BM2/BSTAT peut importe la specialité', 'inscrit sur le DUO', 'titulaire du BM2/ BSTAT mobTer ou FS1 NG'], e: 'Militaire : 2 ans d’ateliers, FA RDC/COS, inscrit sur le DUO, titulaire du BM2 / BSTAT Mobter ou FS1 NG. Un BM2 / BSTAT d’une autre spécialité ne convient pas.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 1], q: 'Q5 — lors d’un relevé de potentiel sur un véhicule (plusieurs réponses)', c: ['le potentiel relevé peut être égal au potentiel cumulé', 'le potentiel cumulé peut être peut superieur au potentiel relevé', 'le potentiel relevé peut être superieur au potentiel cumulé', 'le potentiel cumulé peut être inferieur au potentiel relevé'], e: 'Le potentiel cumulé est toujours supérieur ou égal au potentiel relevé (en cas de changement de compteur).' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q6 — Qui doit signé la VP-COS', c: ['Le chef d’atelier', 'Le RDC', 'Les trois', 'La CDM'], e: 'La VP-COS est signée par le chef d’atelier.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q7 — je suis chef d’atelier poid lourd, le RDC est fermé pour 2 semaines, que dois-je faire ?', c: ['sortir les véhicules moi-même', 'demande ECM de faire sortir les véhicules', 'demander la validation du Chef BML', 'attendre que le RDC soit ouvert'], e: 'Seul le RDC fait sortir les véhicules : on attend qu’il soit ouvert.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q8 — dans le cas d’une RIP, qui renseigne le MAT 10004 ?', c: ['ECM', 'Le prestataire', 'le RDC', 'le prestataire et RDC', 'RDC et CDM'], e: 'En RIP, c’est le prestataire qui renseigne le MAT 10004.' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q9 — je peux travailler en mode dégradé à l’aide du MAT 10004 (vrai / faux)', c: ['Vrai', 'Faux'], e: 'Vrai : le MAT 10004 permet de travailler en mode dégradé, en format papier, en complément de SIM@T.' },
    { l: 'quiz-rdc', fixed: true, a: 0, q: 'Q10 — pour effectuer une visite sur un véhicule, ou puis-je recupere la fiche de visite ?', c: ['le site documentique', 'a la CDM', 'OFF maintenance', 'sim@t'], e: 'On trouve toujours la fiche de visite à jour sur le site documentaire.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q11 — qui valide la partie 4 du DIT', c: ['RDC', 'ECM', 'OFF maint', 'Le sergent de semaine'], e: 'La partie 4 du DIT est validée par l’ECM (équipe de conduite de la maintenance).' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q12 — je suis au RDC, un VHL sort d’atelier, le dernier COS remonte à 6 mois, jeffectue sur le véhicule :', c: ['un COS et la phase 4 du MAT', 'le contrôle des réparations et la phase 4 du MAT', 'un COS, le contrôle des réparations et la phase 4 du MAT'], e: 'Le COS est annuel : à 6 mois il est encore valable. On contrôle les réparations et on remplit la phase 4.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 3, 4, 5, 6], q: 'Q13 — pour prendre le poste au RDC un Civil doit être : (plusieurs réponses)', c: ['inscrit sur le DUO', 'être specialisé sur un véhicule', 'être designer par la DRHAT', 'FA RDC/COS', '2ans d’atelier', 'FS2 mobter', 'FS1 ou FS1 NG'], e: 'Civil : inscrit sur le DUO, FA RDC/COS, 2 ans d’atelier, FS2 Mobter, FS1 ou FS1 NG.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 2, 3], q: 'Q14 — quand dois-je effectuer une COS ? (plusieurs réponses)', c: ['Un fois par ans', 'après un RIP', 'après un remisage de plus de 6mois', 'sur ordre'], e: 'COS : une fois par an, après un remisage de plus de 6 mois, sur ordre. Pas après une RIP.' },
    { l: 'quiz-rdc', fixed: true, a: 1, q: 'Q15 — Qui pilote la maintenance au niveau BML', c: ['les chefs d’atelier', 'la CDM', 'Le RDC', 'L’off maint'], e: 'La conduite de la maintenance (CDM) pilote les activités de maintenance.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q16 — sur le MAT 10004, les vidanges sont inscrites', c: ['en noir', 'en vert', 'en bleu', 'en rouge', 'peu importe'], e: 'Une opération contenant une vidange s’écrit en rouge.' },
    { l: 'quiz-rdc', fixed: true, a: [0, 1, 4, 6, 7, 9, 10], q: 'Q17 — données les 7 étapes de la remise en condition du matériels (plusieurs réponses)', c: ['réparation', 'préparation', 'nettoyage du matériel', 'création d’AT', 'diagnostique', 'cloturation du MAT 10004 et des AT', 'contrôle', 'mise en réparation du matériel', 'récupération des pièces', 'restitution du materiel', 'approvisionnement'], e: 'Mise en réparation, diagnostic, préparation, approvisionnement, réparation, contrôle, restitution.' },
    { l: 'quiz-rdc', fixed: true, a: 3, q: 'Q18 — Un VHL rentre en atelier pour une visite NTI1, station et COS, dans quel ordre logique sont effectuées les visites', c: ['NTI1, COS, station', 'COS, NTI1, station', 'station, COS, NTI1', 'NTI1, station, COS'], e: 'Ordre de priorité : 1. NTI1, 2. station, 3. COS (le COS vient en dernier sur un véhicule en état).' }
  ].map(function (q) { q.src = 'Quiz RDC — corrigé du formateur'; return q; })
});
