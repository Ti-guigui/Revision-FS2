/* Tests transmis : QCM EPMS FS2 (version 06/09/21) et test SST (réponses de la copie). Recopiés mot pour mot. */
REV.addExercises('epms', {
  lessons: [{
    id: 'qcm-epms', title: 'EPMS – QCM FS2 (version 06/09/21)',
    html: `
<h3>Énoncé</h3>
<p>Pour chaque question, 3 affirmations : cocher <b>oui / vrai</b> ou <b>non / faux</b> pour chacune. <b>3 bonnes réponses = 1 point, sinon 0</b>. Il y a au moins 1 vrai et au plus 3 vrais par question.</p>
<p>Sur le site : coche toutes les affirmations <b>vraies</b> de chaque question. Les questions 8, 9 et 10 et la 3ᵉ affirmation de la question 16 ne sont pas lisibles sur les photos.</p>
<h3>Correction : ce qui est faux et pourquoi</h3>
<ul><li>Le titre de l’EPMS dans le TTA 150 est le titre <b>XIV</b> (pas XVI).</li>
<li>On n’est pas « de facto » en service en faisant du sport ; le sport n’est pas limité au quartier.</li>
<li>Séance type : <b>5</b> parties. EPMS : <b>4</b> groupes d’APMS. Les TIOR font partie des APMS (techniques militaires).</li>
<li>Le cadre de contact n’est pas formé pour conduire les CCPM de ses subordonnés (spécialiste EPMS ou CDS en fonction).</li>
<li>Parcours d’obstacles : 3 hauts + 4 moyens + <b>13</b> bas ; aux concours et examens, c’est la technique <b>réglementaire</b>.</li>
<li>Aisance aquatique : <b>15 m</b> en immersion + <b>85 m</b> ; CCPS facultatifs pour les <b>Masters 2</b> seulement.</li>
<li>La viande rouge apporte surtout des <b>protides</b> (les glucides : pâtes, riz, pain).</li></ul>`,
    retenir: ['TTA 150 titre XIV.', 'Séance type : 5 parties ; 4 groupes d’APMS.', 'PO : 3 hauts + 4 moyens + 13 bas, technique réglementaire.', 'AA : 15 m + 85 m ; CCPS facultatif Master 2.'],
    memo: { cle: '1 VRAI MINIMUM · 3 VRAIS MAXIMUM', points: ['Titre XIV', '5 parties', '4 APMS'], astuce: 'Un chiffre faux suffit à rendre l’affirmation fausse.' }
  }],
  questions: [
    { a: [1], q: '1- (But de l’EPMS) Cochez les affirmations vraies :', c: ['Rendre l’ensemble du personnel des armées apte à l’engagement opérationnel sous toutes ses formes', 'Rendre le personnel militaire apte à l’engagement opérationnel sous toutes ses formes', 'Intégrer l’armée des champions'], e: 'But : rendre le personnel MILITAIRE apte à l’engagement opérationnel sous toutes ses formes.' },
    { a: [1, 2], q: '2- Documents de référence en EPMS : cochez les affirmations vraies.', c: ['Le titre XVI du TTA 150 traite de l’EPMS', 'La note D13-002073 traite de l’encadrement des séances EPMS', 'La PIA 7.1.1 est le manuel EPMS'], e: 'C’est le titre XIV du TTA 150 (pas XVI).' },
    { a: [2], q: '3- Pour être reconnu position en service en cas d’accident : cochez les affirmations vraies.', c: ['En se livrant à une activité sportive, le militaire se trouve de facto dans la position « en service »', 'Il faut faire du sport uniquement dans le quartier', 'Répondre idéalement à 6 critères (faire constater/RC, temps, lieu, aptitude, subordination, lien au service)'], e: 'Six critères : constat / compte rendu, temps, lieu, aptitude, subordination, lien au service.' },
    { a: [2], q: '4- Dans le TTA 150, la séance type EPMS : cochez les affirmations vraies.', c: ['Est composée de 3 grandes parties distinctes', 'Est composée de 4 grandes parties distinctes', 'Est composée de 5 grandes parties distinctes'], e: 'Prise en main, mise en train, partie principale, retour au calme, contrôle.' },
    { a: [0, 1], q: '5- Le cadre de contact est formé en EPMS pour : cochez les affirmations vraies.', c: ['Être autonome dans son entraînement, sa préparation physique et mentale', 'Être autonome dans l’entraînement, la préparation physique et mentale de ses subordonnés', 'Être autonome dans la conduite des CCPM de ses subordonnés'], e: 'Le CCPM est conduit par un spécialiste EPMS ou un CDS en fonction.' },
    { a: [2], q: '6- L’EPMS est divisé en groupes d’activités physiques militaires et sportives : cochez les affirmations vraies.', c: ['L’EPMS a été divisé en 2 grands groupes d’APMS', 'L’EPMS a été divisé en 3 grands groupes d’APMS', 'L’EPMS a été divisé en 4 grands groupes d’APMS'], e: '4 groupes : fondamentales, militaires, complémentaires, techniques militaires.' },
    { a: [0, 1], q: '7- Les APMS : cochez les affirmations vraies.', c: ['La natation fait partie des APMS « fondamentales »', 'La course d’orientation fait partie des APMS « militaires »', 'Les T.I.O.R ne rentrent pas dans la classification des différentes APMS'], e: 'Les TIOR sont des APMS « techniques militaires ».' },
    { a: [0], q: '11- Le parcours d’obstacles : cochez les affirmations vraies.', c: ['Est constitué de 20 obstacles répartis sur 500m', 'Lors des concours et examens, seule la technique utilitaire est autorisée', 'La réception « 4 membres » est préconisée pour la réception de l’espalier'], e: 'Aux concours et examens : technique réglementaire (obligatoire depuis 2011). La réception « 4 membres » : réponse de la copie (non détaillée dans le cours).' },
    { a: [1, 2], q: '12- Parcours d’obstacles : cochez les affirmations vraies.', c: ['Le PO se compose de 4 obstacles hauts + 4 moyens + 12 bas', 'Le règlement (TTA) prévoit 3 tentatives de franchissement pour le gué', 'Lors d’un chrono, le personnel féminin franchit 16 obstacles'], e: '3 hauts + 4 moyens + 13 bas. Les 3 tentatives pour le gué : réponse de la copie (non détaillée dans le cours).' },
    { a: [0, 1, 2], q: '13- CCPM NG : cochez les affirmations vraies.', c: ['Je suis classé exempt de CCPM si j’ai eu au moins 60 jours d’exemption dans l’année', 'Je dois refaire tout ou partie des CCPG si je n’ai pas obtenu au moins 31 pts/60', 'Exempt de l’ECR, la réalisation d’une épreuve de substitution me permet d’avoir 10/20'], e: 'Exempt ≥ 60 jours ; seuil 31/60 ; ECR exempt : épreuve de substitution (0/20 ou 10/20).' },
    { a: [2], q: '14- CCPM NG : cochez les affirmations vraies.', c: ['Une femme de 39 ans doit effectuer 8 km à la marche-course', 'Les CCPS sont facultatifs pour les personnels Masters 1 et Master 2', 'Les résultats CCPM sont pris en compte pour la notation'], e: 'CCPS facultatif pour les Masters 2 seulement ; résultats pris en compte pour la notation de l’année suivante.' },
    { a: [0], q: '15- CCPM NG : cochez les affirmations vraies.', c: ['Le 2400 est noté sur 20 pts', 'La natation prévoit une apnée de 10 m puis 90 m de nage libre', 'La marche course reste obligatoire pour les Masters 2'], e: 'Aisance aquatique : 15 m en immersion + 85 m de nage libre.' },
    { a: [1], q: '16- Alimentation : cochez les affirmations vraies (3ᵉ affirmation non lisible sur la photo).', c: ['La viande rouge apporte essentiellement les glucides nécessaires à l’effort', 'Les 3 grands groupes alimentaires sont : les lipides, protides et glucides'], e: 'La viande apporte des protides ; les glucides viennent des pâtes, du riz, du pain.' }
  ].map(function (q) { q.l = 'qcm-epms'; q.fixed = true; q.src = 'EPMS – QCM FS2 (version 06/09/21), copie cochée'; return q; })
});

REV.addExercises('pmr', {
  lessons: [{
    id: 'test-sst', title: 'Test Santé et sécurité au travail (copie corrigée)',
    html: `
<h3>Énoncé</h3>
<p>Test rédigé noté sur 20. Questions recopiées mot pour mot ; les réponses sont celles de la copie corrigée (les questions illisibles sur les photos ne sont pas reprises).</p>
<h3>Réponses attendues</h3>
<ul><li><b>Buts de la SST</b> : diminuer le nombre d’accidents du travail et de maladies professionnelles ; éviter les conséquences des accidents.</li>
<li><b>Instance de prévention</b> : la <b>CCHPA</b> (commission consultative d’hygiène et de prévention des accidents). La copie répond « 1 fois par trimestre » ; l’<b>AQA 03 indice R</b>, plus récent, dit <b>2 réunions par an</b>.</li>
<li><b>FEN</b> : informer les agents concernés et le médecin de prévention des risques pouvant altérer leur santé au travail, et des moyens mis en œuvre pour assurer leur protection.</li>
<li><b>Accident de service</b> : condition de temps, condition de lieu, relation avec le service.</li></ul>`,
    retenir: ['SST : moins d’accidents et de maladies professionnelles, limiter leurs conséquences.', 'CCHPA = commission consultative d’hygiène et de prévention des accidents.', 'FEN : informer agents + médecin des risques et des protections.']
  }],
  questions: [
    { a: 0, q: 'Question n°1 — Quels sont les buts de la Santé et Sécurité au Travail (SST) ?', c: ['Diminuer le nombre d’accidents du travail et de maladies professionnelles, et éviter les conséquences des accidents', 'Augmenter la productivité des ateliers', 'Sanctionner les agents qui ne respectent pas les consignes'], e: 'Réponse de la copie corrigée.' },
    { a: 0, q: 'Question n°2 A — Quel est le nom de l’instance de prévention qui vous représente pour améliorer les conditions de travail ?', c: ['La CCHPA : commission consultative d’hygiène et de prévention des accidents', 'Le CPRP', 'Le DUERP'], e: 'CCHPA pour les militaires (FS pour les civils).' },
    { a: 0, q: 'Question n°2 B — Quand doit-elle se réunir ?', c: ['2 fois par an (AQA 03 indice R)', '1 fois par an', 'Tous les mois'], e: 'La copie répond « 1 fois par trimestre (4 × par an) », comme l’ancien cours ; l’AQA 03 indice R, plus récent, dit 2 réunions par an.', w: 'Si le formateur attend l’ancienne réponse : 1 fois par trimestre.' },
    { a: 0, q: 'Question n°6 — À quoi sert la Fiche Emploi-Nuisances (FEN) ?', c: ['Informer les agents concernés et le médecin de prévention des risques pouvant altérer leur santé au travail, et des moyens mis en œuvre pour les protéger', 'Déclarer un accident de service', 'Exercer le droit de retrait'], e: 'Réponse de la copie (3/3).' },
    { a: 0, q: 'Question n°7 — Quelles sont les conditions requises pour la reconnaissance d’un accident de service ?', c: ['Condition de temps, condition de lieu, relation avec le service', 'Un témoin et un certificat médical', 'Être dans l’enceinte militaire uniquement'], e: 'Imputabilité : temps + lieu + relation avec le service.' }
  ].map(function (q) { q.l = 'test-sst'; q.fixed = true; q.src = 'Test SST (copie corrigée)'; return q; })
});
