/* Réglementation EPMS à l’usage des cadres de contact (EMB, version janvier 2022). */
REV.add({
  id: 'epms', name: 'Réglementation EPMS', icon: '🏃', color: '#16a34a',
  desc: 'Entraînement physique militaire et sportif : cours « Réglementation EPMS à l’usage des cadres de contact » (EMB, janv. 2022).',
  lessons: [
    {
      id: 'politique', title: 'But de l’EPMS, textes de référence, position en service',
      html: `
<h3>But de l’EPMS</h3>
<p>Rendre <b>l’ensemble du personnel militaire apte à l’engagement opérationnel sous toutes ses formes</b>.</p>
<h3>Les 4 textes principaux à connaître</h3>
<ol><li><b>TTA 150 titre XIV</b> (partie EPMS).</li>
<li>La <b>note annuelle EPMS</b> de ton unité.</li>
<li>La <b>PIA 7.1.1</b> (publication interarmées, 2011) : manuel EPMS.</li>
<li>La <b>note D13-002073</b> (CEMA, février 2013) : encadrement des séances EPMS.</li></ol>
<h3>La position « en service »</h3>
<p>Il ne suffit pas de faire du sport pour être « en service ». Il faut :</p>
<ol><li>Faire <b>constater au plus vite</b> par le service médical et rendre compte à ses chefs.</li>
<li><b>Condition de temps</b> : à un moment précis, prévu à l’EDT ou sur le cahier d’ordres.</li>
<li><b>Condition de lieu</b> : à l’endroit prévu (circuit, zone…).</li>
<li><b>Condition de lien au service</b> : pour l’exécution de son service.</li>
<li><b>Condition de subordination</b> : pour un service commandé (cahier d’ordres, programme SAGAIE, registre APMS, NDS).</li>
<li><b>Condition d’aptitude</b> : pas de contre-indication médicale.</li></ol>
<p>Dossiers étudiés au cas par cas. Si la position en service est reconnue : <b>droit à prestations</b> (soins gratuits) et <b>droit à pension</b> (pension d’invalidité, allocations des fonds de prévoyance).</p>`,
      retenir: ['But : rendre tout le personnel apte à l’engagement opérationnel sous toutes ses formes.', 'Textes : TTA 150 titre XIV, note annuelle EPMS, PIA 7.1.1, note D13-002073.', 'Position en service : temps, lieu, lien au service, subordination, aptitude + constat médical rapide.'],
      pieges: ['Faire du sport ne suffit pas à être « en service » : il faut que l’activité soit commandée, prévue et au lieu prévu.'],
      memo: { cle: 'EN SERVICE = TEMPS + LIEU + LIEN + SUBORDINATION + APTITUDE', points: ['Constat médical au plus vite', 'Droit à prestations et à pension si reconnu'], astuce: 'Pas prévu, pas commandé = pas en service.' }
    },
    {
      id: 'principes', title: 'Principes de base (SPRAD) et sécurité',
      html: `
<h3>Les principes de base : « SPRAD »</h3>
<div class="tw"><table><tr><th>Lettre</th><th>Principe</th><th>Ce que ça veut dire</th></tr>
<tr><td><b>S</b></td><td>Sécurité</td><td>Limiter les blessures ; compétences de l’encadrant</td></tr>
<tr><td><b>P</b></td><td>Progressivité</td><td>Augmenter la charge petit à petit</td></tr>
<tr><td><b>R</b></td><td>Régularité</td><td>Quasi quotidien : <b>3 séances / semaine</b> pour un maintien en condition, <b>4 et plus</b> pour s’améliorer (PIA 7.1.1)</td></tr>
<tr><td><b>A</b></td><td>Adaptation</td><td>Météo, règles, fatigue, population…</td></tr>
<tr><td><b>D</b></td><td>Diversité</td><td>Varier entre les <b>4 types d’APMS</b></td></tr></table></div>
<h3>Sécurité : prévention des accidents</h3>
<ul><li><b>Connaître son personnel</b> : fatigue, entraînement, surentraînement, blessure, stress, exemptions, traitement médical…</li>
<li><b>Surveillance médicale</b> lors de la <b>VMP</b> (visite médicale périodique) : questionnaire médico-biographique, biométrie, examen / entretien avec le médecin, puis délivrance du <b>CMA</b> (certificat médico-administratif d’aptitude).</li>
<li>Le CMA donne une aptitude ou une inaptitude temporaire, partielle ou définitive. <b>Validité 2 ans maximum</b> (imprimé 620-4*/1).</li></ul>`,
      retenir: ['SPRAD : Sécurité, Progressivité, Régularité, Adaptation, Diversité.', '3 séances / semaine = maintien ; 4 et + = amélioration.', 'CMA délivré à la VMP, valable 2 ans maximum.'],
      memo: { cle: 'SPRAD', flow: ['Sécurité', 'Progressivité', 'Régularité', 'Adaptation', 'Diversité'], points: ['3 séances = maintien', '4+ = amélioration', 'CMA : 2 ans maxi'], astuce: 'Pas de sport sans CMA valide.' }
    },
    {
      id: 'seance', title: 'La séance type (TTA 150 titre XIV) et les étirements',
      html: `
<h3>La séance type : 5 parties</h3>
<div class="tw"><table><tr><th>Partie</th><th>Durée</th><th>Contenu</th></tr>
<tr><td>1. <b>Prise en main</b></td><td>≈ 5 min</td><td>Présentation, effectif, contraintes, but de la séance, contrôle de la tenue, lien avec la séance précédente, pulsations au repos (15 s)</td></tr>
<tr><td>2. <b>Mise en train</b></td><td>≈ 10 à 15 min</td><td>Échauffement du <b>généralisé</b> (réveil articulaire, musculaire, cardio) vers le <b>spécifique</b> (ex. parcours d’obstacles : rusticité, réception, contact avec le PO)</td></tr>
<tr><td>3. <b>Partie principale</b></td><td>≈ 30 à 50 min</td><td>Le cœur de la séance</td></tr>
<tr><td>4. <b>Retour au calme</b></td><td>≈ 5 à 10 min</td><td>Baisse des pulsations, de la chaleur et de l’excitation, puis étirements</td></tr>
<tr><td>5. <b>Contrôle</b></td><td>≈ 5 min</td><td>Rappel des points-clés, bilan, ouverture sur la séance suivante, pulsations de récupération</td></tr></table></div>
<h3>Les étirements</h3>
<ul><li><b>Cas général</b> : on s’étire <b>sans jamais atteindre le seuil de la douleur</b>.</li>
<li><b>Cas particulier</b> : après une séance particulièrement dure (ex. marathon) avec suspicion de micro-déchirures, <b>on ne s’étire pas</b>. On attend que l’organisme se répare (12 h / 24 h / 36 h), puis étirements après une petite séance.</li></ul>`,
      retenir: ['5 parties : prise en main, mise en train, partie principale, retour au calme, contrôle.', 'Mise en train : du généralisé vers le spécifique.', 'Pas d’étirements après une séance très dure (micro-déchirures).'],
      memo: { cle: 'PRISE EN MAIN → MISE EN TRAIN → PRINCIPALE → RETOUR AU CALME → CONTRÔLE', flow: ['Prise en main (5 min)', 'Mise en train (10-15 min)', 'Partie principale (30-50 min)', 'Retour au calme (5-10 min)', 'Contrôle (5 min)'], astuce: 'On s’étire sans douleur ; jamais après un marathon.' }
    },
    {
      id: 'apms', title: 'Les APMS et le cadre de contact',
      html: `
<h3>Les 4 types d’APMS (activités physiques militaires et sportives)</h3>
<div class="tw"><table><tr><th>Type</th><th>Activités</th></tr>
<tr><td><b>Fondamentales</b></td><td>Course à pied, natation, musculation, marche</td></tr>
<tr><td><b>Militaires</b></td><td>Parcours d’obstacles, parcours d’audace, marche-course, escalade, natation utilitaire, parcours naturel / méthode naturelle, course d’orientation, raids, franchissements</td></tr>
<tr><td><b>Complémentaires</b></td><td>Sports collectifs, sports de combat, autres (golf, ski, kayak, équitation, voile…)</td></tr>
<tr><td><b>Techniques militaires</b></td><td><b>TIOR</b> (techniques d’interventions opérationnelles rapprochées) et <b>ORFA</b> (optimisation des ressources des forces armées, anciennement TOP)</td></tr></table></div>
<h3>Le cadre de contact (non spécialiste EPMS)</h3>
<p>Il est formé à la <b>conception</b>, à l’<b>organisation</b> et à la <b>conduite</b> de la préparation physique et mentale du personnel, à son niveau de responsabilité. Il doit être <b>autonome</b> pour son propre entraînement et pour celui de ses subordonnés, sauf pour les activités qui demandent une qualification particulière.</p>
<div class="tw"><table><tr><th>Activité</th><th>Cadre de contact</th><th>Spécialiste EPMS</th></tr>
<tr><td>Course à pied</td><td>Maintien en condition (faible / moyenne intensité)</td><td>Préparation à la performance, reprise d’activité, tests</td></tr>
<tr><td>Musculation</td><td>Entretien musculaire (faible intensité) + charge guidée</td><td>Développement des qualités musculaires, tests</td></tr>
<tr><td>Natation</td><td colspan="2">Selon les qualifications détenues (MNS, BEESAN, BPJEPS AAN ; le BNSSA surveille)</td></tr>
<tr><td>Marche-course</td><td>Entraînement (+ tests si prérogatives TAP)</td><td>Tests</td></tr>
<tr><td>Méthode naturelle</td><td>Non (mais parcours naturel oui)</td><td>Conception, animation (G. Hébert, 10 familles)</td></tr>
<tr><td>Parcours d’obstacles</td><td>Étude, initiation, entraînement (20 obstacles, hommes et femmes)</td><td>Formation, tests (méthode réglementaire)</td></tr>
<tr><td>Parcours d’audace, franchissement</td><td colspan="2">Selon qualifications (instructeur / moniteur commando…)</td></tr>
<tr><td>Escalade</td><td colspan="2">Selon qualifications (DSE, initiateur / moniteur SAE)</td></tr>
<tr><td>Course d’orientation</td><td>Formation, animation non chronométrée</td><td>Apprentissage, entraînement, chrono</td></tr>
<tr><td>Raids sportifs</td><td>Non</td><td>Organisation, animation</td></tr>
<tr><td>Sports collectifs</td><td>Animation sans compétition / challenge</td><td>Organisation, animation, challenge</td></tr>
<tr><td>Sports de combat, TIOR, ORFA</td><td colspan="2">Selon qualifications (CAC, moniteur / instructeur TIOR, ORFA…)</td></tr></table></div>`,
      retenir: ['4 types d’APMS : fondamentales, militaires, complémentaires, techniques militaires.', 'Fondamentales : CAP, natation, musculation, marche.', 'TIOR et ORFA (ex-TOP) = techniques militaires.', 'Cadre de contact : conception, organisation, conduite ; autonome sauf activités à qualification.'],
      memo: { cle: '4 APMS : FONDAMENTALES · MILITAIRES · COMPLÉMENTAIRES · TECHNIQUES MILITAIRES', points: ['Fondamentales = CAP, natation, muscu, marche', 'ORFA = ex-TOP'], astuce: 'Sans qualification : pas de natation encadrée, pas d’escalade, pas de raid sportif.' }
    },
    {
      id: 'cap-po', title: 'Course à pied et parcours d’obstacles',
      html: `
<h3>Les 3 étapes de la course à pied</h3>
<div class="tw"><table><tr><th>Étape</th><th>But</th><th>Intensité</th></tr>
<tr><td>1. <b>Adaptation</b></td><td>Mise en condition (débutant, reprise d’activité) : alterner effort / contre-effort (course / marche)</td><td>60 à 75 % de la FC max (120 à 150 puls/min à 20 ans) — aérobie, faible intensité</td></tr>
<tr><td>2. <b>Continu</b></td><td>Maintien en condition : footing en relative aisance respiratoire, sans arrêt, terrain varié</td><td>65 à 85 % de la FC max (130 à 170 puls/min à 20 ans) — surtout aérobie</td></tr>
<tr><td>3. <b>Intermittent</b></td><td>Amélioration des performances : alternance d’allures (30”/30”), fractionné (2 × (5 × 200 m))</td><td>Anaérobie lactique (intensif) : <b>spécialiste EPMS</b></td></tr></table></div>
<h3>Le parcours d’obstacles</h3>
<ul><li><b>500 m, 20 obstacles</b> : 3 hauts + 4 moyens + 13 bas.</li>
<li>Entraînement au niveau cadre de contact (TTA 150 titre XIV), personnel masculin et féminin, sur les 20 obstacles (voir la note annuelle EPMS : restrictions possibles).</li>
<li><b>Technique réglementaire obligatoire depuis 2011</b> pour les concours et examens.</li>
<li>Échauffement : général (articulaire, musculaire, cardio) puis spécifique (rusticité, réception, contact avec le PO). Fractionné et chrono : spécialiste EPMS.</li>
<li><b>Féminines</b> : 16 obstacles. Elles ne franchissent pas : n°5 gué, n°10 table irlandaise, n°16 mur d’assaut, n°17 fosse.</li></ul>`,
      retenir: ['CAP : adaptation → continu → intermittent (spécialiste EPMS).', 'PO : 500 m, 20 obstacles (3 hauts, 4 moyens, 13 bas).', 'Féminines : 16 obstacles (pas le gué, la table irlandaise, le mur d’assaut, la fosse).'],
      memo: { cle: 'ADAPTATION → CONTINU → INTERMITTENT', points: ['PO = 500 m / 20 obstacles', '3 hauts + 4 moyens + 13 bas', 'Technique réglementaire depuis 2011'], astuce: 'Le fractionné, c’est pour le spécialiste EPMS.' }
    },
    {
      id: 'ccpm', title: 'Le CCPM nouvelle génération',
      html: `
<h3>Contrôle de la condition physique du militaire (NG, déc. 2019 + nov. 2021)</h3>
<ul><li><b>Contrôle annuel</b> (du 1ᵉʳ janvier au 31 décembre) pour le personnel militaire d’active (réservistes encouragés).</li>
<li>Condition : être apte (non contre-indication). Classé <b>« exempt »</b> si l’exemption dure <b>60 jours ou plus</b>.</li>
<li>Obtenir <b>au moins 31 / 60 au CCPG</b>. En dessous, il faut repasser tout ou partie des tests pour atteindre ce seuil.</li>
<li>Contrôle fait par un <b>spécialiste EPMS</b> ou un <b>CDS en fonction</b>.</li>
<li>Les résultats comptent pour la <b>notation de l’année suivante</b>.</li></ul>
<div class="tw"><table><tr><th>Contrôle</th><th>Épreuves</th><th>Points</th></tr>
<tr><td rowspan="3"><b>CCPG</b> (condition physique générale)</td><td><b>ECR</b> (endurance cardio-respiratoire) : 2 400 m</td><td>/20</td></tr>
<tr><td><b>AA</b> (aisance aquatique) : 15 m en immersion + 85 m nage libre</td><td>/20</td></tr>
<tr><td><b>CMG</b> (capacité musculaire généralisée) : pompes</td><td>/20</td></tr>
<tr><td><b>CCPS</b> (condition physique spécifique) à partir de 2022</td><td>Parcours avec musette de 5 kg : développé × 20, 100 m, touche-épaules × 20, 100 m, abdos × 20, 100 m, jumping-jacks × 20, 100 m. Facultatif pour les Master 2.</td><td>/40 : réussite en moins de 5 min = 40 pts ; échec = 10 pts ou 0</td></tr></table></div>
<p><b>CCPG : 9 catégories</b> d’âge (18-21 ans … 50 ans et +), hommes et femmes ; âge au 31 décembre de l’année de notation. <b>CCPS 2022 : barème unique</b>, quels que soient l’âge et le sexe.</p>`,
      retenir: ['CCPM annuel : CCPG /60 + CCPS /40.', 'CCPG : ECR 2 400 m, aisance aquatique, pompes ; au moins 31/60.', 'Exempt si exemption ≥ 60 jours.', 'CCPS 2022 : < 5 min = 40 pts ; barème unique.'],
      memo: { cle: 'CCPG /60 + CCPS /40', points: ['ECR 2 400 m · AA 15 m + 85 m · pompes', 'Seuil 31/60', 'Exempt ≥ 60 jours'], astuce: 'Le CCPM de l’année compte pour la notation de l’année suivante.' }
    },
    {
      id: 'anatomie', title: 'Anatomie, filières énergétiques, alimentation, qualités physiques',
      html: `
<h3>Anatomie (minimum à connaître)</h3>
<ul><li><b>Plus de 200 os</b> : crâne, humérus, radius, cubitus (ulna), fémur, tibia, péroné, rachis (vertèbres), côtes, clavicule, omoplate, bassin…</li>
<li><b>Plus de 600 muscles</b> : myocarde (cœur), biceps, triceps, deltoïde, pectoraux, abdos, fessiers, adducteurs, quadriceps, ischio-jambiers, mollets.</li>
<li><b>Plus de 90 articulations</b> : poignet, coude, épaule, cheville, genou, hanche.</li>
<li><b>Traumatologie</b> (entorse, brûlure, tendinite, luxation, fracture, claquage, déchirure…) : savoir réagir = <b>arrêt de l’activité, immobilisation, froid</b>.</li></ul>
<h3>Les filières énergétiques</h3>
<div class="tw"><table><tr><th>Filière</th><th>Effort</th><th>Exemple</th></tr>
<tr><td><b>Aérobie</b></td><td>Peu intense</td><td>Footing d’1 h</td></tr>
<tr><td><b>Anaérobie lactique</b></td><td>Intense</td><td>Fractionné 8 × 400 m</td></tr>
<tr><td><b>Anaérobie alactique</b></td><td>Intense mais très court</td><td>Sprint de 60 m</td></tr></table></div>
<h3>L’alimentation</h3>
<ul><li><b>Glucides</b> (sucres à assimilation lente de préférence) : pâtes, riz, pain.</li>
<li><b>Protides</b> (protéines) : viandes, poissons, œufs.</li>
<li><b>Lipides</b> (graisses) : huile, beurre.</li>
<li>+ eau, sels minéraux, vitamines.</li></ul>
<h3>Les qualités physiques</h3>
<ul><li><b>Musculaires</b> : force, souplesse.</li>
<li><b>Organiques</b> : capacité et puissance (endurance), résistance.</li>
<li><b>Psychomotrices</b> : coordination, vitesse de réaction, vitesse et justesse du mouvement.</li>
<li><b>Perceptivo-cognitives</b> : se situer dans l’espace, orientation, mémorisation, visualisation, situer partenaires et adversaires, estimer les limites du terrain.</li></ul>`,
      retenir: ['Aérobie = footing ; anaérobie lactique = fractionné ; alactique = sprint court.', 'Blessure : arrêt, immobilisation, froid.', 'Glucides lents : pâtes, riz, pain.'],
      memo: { cle: 'AÉROBIE · LACTIQUE · ALACTIQUE', points: ['Footing 1 h = aérobie', '8 × 400 m = lactique', 'Sprint 60 m = alactique'], astuce: 'Plus c’est court et intense, moins il y a d’oxygène.' }
    }
  ],
  questions: [
    { l: 'politique', q: 'Quel est le but de l’EPMS ?', c: ['Rendre l’ensemble du personnel militaire apte à l’engagement opérationnel sous toutes ses formes', 'Préparer les compétitions sportives militaires', 'Remplacer la visite médicale périodique'], e: 'But de l’EPMS : rendre tout le personnel apte à l’engagement opérationnel sous toutes ses formes.' },
    { l: 'politique', q: 'Quel texte contient la partie EPMS du règlement ?', c: ['Le TTA 150 titre XIV', 'Le MAT 4486', 'La PFT 5.1'], e: 'TTA 150 titre XIV = partie EPMS.' },
    { l: 'politique', q: 'Qu’est-ce que la PIA 7.1.1 ?', c: ['Le manuel EPMS interarmées', 'La note d’encadrement des séances', 'Le barème du CCPM'], e: 'PIA 7.1.1 : publication interarmées (2011), manuel EPMS.' },
    { l: 'politique', q: 'La note D13-002073 (CEMA, 2013) traite de :', c: ['L’encadrement des séances EPMS', 'La reprise d’activité', 'Le parachutisme sportif'], e: 'Note D13-002073 : encadrement des séances EPMS.' },
    { l: 'politique', q: 'Un militaire se blesse en faisant du sport. Suffit-il qu’il fasse du sport pour être en position « en service » ?', c: ['Non : il faut des conditions de temps, de lieu, de lien au service, de subordination et d’aptitude', 'Oui, toujours', 'Oui, s’il porte la tenue de sport militaire'], e: 'Il ne suffit pas de faire du sport : l’activité doit être prévue, au lieu prévu, commandée, liée au service, et le militaire apte.' },
    { l: 'politique', q: 'Quelle est la première chose à faire après une blessure pendant le sport ?', c: ['Faire constater au plus vite par le service médical et rendre compte à ses chefs', 'Attendre la fin de la séance', 'Remplir le CCPM'], e: 'Faire constater au plus vite par le service médical / rendre compte.' },
    { l: 'politique', q: 'La condition de subordination de la position en service est prouvée par :', c: ['Le cahier d’ordres, le programme SAGAIE, le registre APMS ou une NDS', 'Le certificat médical', 'La carte de sport de l’unité'], e: 'Subordination = service commandé : cahier d’ordres, SAGAIE, registre APMS, NDS.' },
    { l: 'politique', q: 'Si la position en service est reconnue, le militaire a droit à :', c: ['Des prestations (soins gratuits) et une pension', 'Une prime sportive', 'Rien de particulier'], e: 'Droit à prestations (soins gratuits) et à pension (invalidité, fonds de prévoyance).' },
    { l: 'principes', q: 'Que signifie « SPRAD » ?', c: ['Sécurité, Progressivité, Régularité, Adaptation, Diversité', 'Souplesse, Puissance, Rapidité, Agilité, Durée', 'Sport, Préparation, Récupération, Alimentation, Discipline'], e: 'Principes de base : Sécurité, Progressivité, Régularité, Adaptation, Diversité.' },
    { l: 'principes', q: 'Combien de séances par semaine pour un MAINTIEN en condition ?', c: ['3', '1', '6'], e: '3 séances / semaine pour un maintien ; 4 et plus pour une amélioration (PIA 7.1.1).' },
    { l: 'principes', q: 'Combien de séances par semaine pour une AMÉLIORATION ?', c: ['4 et plus', '2', '3'], e: '4 séances et plus pour s’améliorer.' },
    { l: 'principes', q: 'Le principe de diversité consiste à :', c: ['Varier entre les 4 types d’APMS', 'Faire toujours le même sport', 'Changer d’encadrant à chaque séance'], e: 'Diversité : les 4 APMS.' },
    { l: 'principes', q: 'Quelle est la durée de validité maximale du CMA ?', c: ['2 ans', '1 an', '5 ans'], e: 'CMA (certificat médico-administratif d’aptitude) : validité 2 ans maximum.' },
    { l: 'principes', q: 'Lors de quelle visite est délivré le CMA ?', c: ['La VMP (visite médicale périodique)', 'Le CCPM', 'La visite d’incorporation uniquement'], e: 'Le CMA est délivré à la VMP après questionnaire, biométrie et examen.' },
    { l: 'seance', q: 'Combien de parties comporte la séance type (TTA 150 titre XIV) ?', c: ['5', '3', '4'], e: 'Prise en main, mise en train, partie principale, retour au calme, contrôle.' },
    { l: 'seance', q: 'Dans quel ordre se déroule une séance type ?', c: ['Prise en main, mise en train, partie principale, retour au calme, contrôle', 'Mise en train, prise en main, partie principale, contrôle, retour au calme', 'Partie principale, mise en train, contrôle, retour au calme, prise en main'], e: 'Ordre de la séance type.' },
    { l: 'seance', q: 'Durée de la partie principale d’une séance ?', c: ['Environ 30 à 50 min', 'Environ 5 min', 'Environ 2 h'], e: 'Partie principale : 30 à 50 min.' },
    { l: 'seance', q: 'La mise en train (échauffement) va :', c: ['Du généralisé vers le spécifique', 'Du spécifique vers le généralisé', 'Uniquement sur le spécifique'], e: 'Réveil articulaire, musculaire, cardio, puis exercices propres à l’activité.' },
    { l: 'seance', q: 'Pendant la prise en main, on contrôle les pulsations au repos sur :', c: ['15 secondes', '1 minute', '5 minutes'], e: 'Contrôle des pulsations au repos sur 15 s.' },
    { l: 'seance', q: 'Après un marathon avec suspicion de micro-déchirures, que fait-on pour les étirements ?', c: ['On ne s’étire pas : on attend que l’organisme se répare (12 h / 24 h / 36 h)', 'On s’étire fort tout de suite', 'On s’étire jusqu’au seuil de la douleur'], e: 'Pour ne pas déchirer davantage les fibres, pas d’étirements après une séance très dure.' },
    { l: 'seance', q: 'Règle générale des étirements ?', c: ['S’étirer sans jamais atteindre le seuil de la douleur', 'Aller jusqu’à la douleur pour progresser', 'Ne jamais s’étirer'], e: 'Cas général : sans atteindre le seuil de la douleur.' },
    { l: 'apms', q: 'Combien de types d’APMS existe-t-il ?', c: ['4', '3', '6'], e: 'Fondamentales, militaires, complémentaires, techniques militaires.' },
    { l: 'apms', q: 'Quelles sont les APMS fondamentales ?', c: ['Course à pied, natation, musculation, marche', 'Parcours d’obstacles, escalade, raids', 'Sports collectifs et sports de combat'], e: 'APMS fondamentales : CAP, natation, musculation, marche.' },
    { l: 'apms', q: 'Le parcours d’obstacles appartient aux APMS :', c: ['Militaires', 'Fondamentales', 'Complémentaires'], e: 'APMS militaires : PO, parcours d’audace, marche-course, escalade, CO, raids…' },
    { l: 'apms', q: 'TIOR et ORFA appartiennent aux APMS :', c: ['Techniques militaires', 'Complémentaires', 'Fondamentales'], e: 'TIOR = techniques d’interventions opérationnelles rapprochées ; ORFA = optimisation des ressources des forces armées (ex-TOP).' },
    { l: 'apms', q: 'Que signifie ORFA (anciennement TOP) ?', c: ['Optimisation des ressources des forces armées', 'Organisation des raids et franchissements armés', 'Orientation et reconnaissance en forêt'], e: 'ORFA = optimisation des ressources des forces armées.' },
    { l: 'apms', q: 'Un cadre de contact peut-il organiser un raid sportif ?', c: ['Non, c’est le spécialiste EPMS', 'Oui, toujours', 'Oui, s’il a le permis'], e: 'Raids sportifs : non pour le cadre de contact ; organisation par le spécialiste EPMS.' },
    { l: 'apms', q: 'En course à pied, le cadre de contact encadre :', c: ['Le maintien en condition (faible / moyenne intensité)', 'La préparation à la performance et les tests', 'Le fractionné chronométré'], e: 'La préparation à la performance, la reprise d’activité et les tests sont pour le spécialiste EPMS.' },
    { l: 'cap-po', q: 'Quelles sont les 3 étapes de la course à pied ?', c: ['Adaptation, continu, intermittent', 'Sprint, fractionné, footing', 'Échauffement, course, étirements'], e: 'Adaptation (mise en condition), continu (maintien), intermittent (amélioration).' },
    { l: 'cap-po', q: 'L’étape « intermittent » (fractionné, 30”/30”) est encadrée par :', c: ['Un spécialiste EPMS', 'Tout cadre de contact', 'Le chef de section seul'], e: 'Travail en anaérobie lactique (intensif) : spécialiste EPMS.' },
    { l: 'cap-po', q: 'Étape « continu » (footing) : quelle intensité ?', c: ['65 à 85 % de la FC max', '90 à 100 % de la FC max', '30 à 40 % de la FC max'], e: '65 à 85 % de la FC max, soit 130 à 170 puls/min à 20 ans.' },
    { l: 'cap-po', q: 'Longueur et nombre d’obstacles du parcours d’obstacles ?', c: ['500 m et 20 obstacles', '400 m et 16 obstacles', '1 000 m et 30 obstacles'], e: '500 m, 20 obstacles : 3 hauts, 4 moyens, 13 bas.' },
    { l: 'cap-po', q: 'Répartition des 20 obstacles ?', c: ['3 hauts, 4 moyens, 13 bas', '5 hauts, 5 moyens, 10 bas', '10 hauts, 10 bas'], e: '3 hauts + 4 moyens + 13 bas.' },
    { l: 'cap-po', q: 'Combien d’obstacles franchissent les féminines ?', c: ['16', '20', '12'], e: '16 obstacles : pas le gué (5), la table irlandaise (10), le mur d’assaut (16), la fosse (17).' },
    { l: 'cap-po', q: 'Depuis quand la technique réglementaire du PO est-elle obligatoire pour les concours et examens ?', c: ['2011', '2001', '2019'], e: 'Technique réglementaire obligatoire depuis 2011.' },
    { l: 'ccpm', q: 'Le CCPM est un contrôle :', c: ['Annuel (du 1ᵉʳ janvier au 31 décembre)', 'Tous les 2 ans', 'Mensuel'], e: 'Contrôle annuel.' },
    { l: 'ccpm', q: 'Note minimale à obtenir au CCPG ?', c: ['31 / 60', '10 / 20', '40 / 60'], e: 'Au moins 31/60 ; sinon on repasse tout ou partie des tests.' },
    { l: 'ccpm', q: 'À partir de quelle durée d’exemption est-on classé « exempt » ?', c: ['60 jours ou plus', '15 jours', '6 mois'], e: 'Classé « exempt » si l’exemption dure 60 jours ou plus.' },
    { l: 'ccpm', q: 'Quelles sont les 3 épreuves du CCPG ?', c: ['ECR (2 400 m), aisance aquatique, pompes', 'Marche-course, tir, parcours d’obstacles', 'Sprint, abdos, grimper de corde'], e: 'ECR /20, AA /20, CMG /20.' },
    { l: 'ccpm', q: 'Épreuve d’aisance aquatique du CCPG ?', c: ['15 m en immersion + 85 m nage libre', '50 m brasse', '200 m nage libre'], e: 'AA : 15 m immersion + 85 m nage libre.' },
    { l: 'ccpm', q: 'Sur combien de points est noté le CCPS ?', c: ['40', '60', '20'], e: 'CCPG /60 + CCPS /40.' },
    { l: 'ccpm', q: 'CCPS 2022 : combien de points si le parcours est réussi en moins de 5 min ?', c: ['40 points', '20 points', '10 points'], e: 'Réussite < 5 min = 40 pts ; échec = 10 pts ou 0.' },
    { l: 'ccpm', q: 'Qui peut faire passer le CCPM ?', c: ['Un spécialiste EPMS ou un CDS en fonction', 'N’importe quel militaire', 'Uniquement le médecin'], e: 'Contrôle CCPM : spécialiste EPMS (PIA 7.1.1) ou CDS en fonction.' },
    { l: 'ccpm', q: 'Les résultats du CCPM comptent pour :', c: ['La notation de l’année suivante', 'La solde du mois', 'L’avancement immédiat'], e: 'Résultats pris en compte pour la notation de l’année suivante.' },
    { l: 'ccpm', q: 'Combien de catégories d’âge pour le CCPG ?', c: ['9', '5', '3'], e: '9 catégories (18-21 ans … 50 ans et +), âge au 31 décembre de l’année de notation. CCPS 2022 : barème unique.' },
    { l: 'anatomie', q: 'Un footing d’1 h sollicite surtout la filière :', c: ['Aérobie', 'Anaérobie lactique', 'Anaérobie alactique'], e: 'Effort peu intense et long = aérobie.' },
    { l: 'anatomie', q: 'Un fractionné 8 × 400 m sollicite surtout la filière :', c: ['Anaérobie lactique', 'Aérobie', 'Anaérobie alactique'], e: 'Effort intense = anaérobie lactique.' },
    { l: 'anatomie', q: 'Un sprint de 60 m sollicite surtout la filière :', c: ['Anaérobie alactique', 'Aérobie', 'Anaérobie lactique'], e: 'Effort intense mais très court = anaérobie alactique.' },
    { l: 'anatomie', q: 'Face à une blessure (entorse, claquage…), comment réagir ?', c: ['Arrêt de l’activité, immobilisation, froid', 'Continuer en ralentissant', 'Masser et étirer fort'], e: 'Savoir réagir : arrêt, immobilisation, froid.' },
    { l: 'anatomie', q: 'Quels aliments apportent des glucides à assimilation lente ?', c: ['Pâtes, riz, pain', 'Huile, beurre', 'Viandes, poissons, œufs'], e: 'Glucides : pâtes, riz, pain. Protides : viandes, poissons, œufs. Lipides : huile, beurre.' },
    { l: 'anatomie', q: 'La souplesse est une qualité :', c: ['Musculaire', 'Organique', 'Perceptivo-cognitive'], e: 'Qualités musculaires : force, souplesse.' },
    { l: 'anatomie', q: 'La vitesse de réaction est une qualité :', c: ['Psychomotrice', 'Musculaire', 'Organique'], e: 'Psychomotrices : coordination, vitesse de réaction, vitesse et justesse du mouvement.' },
    { l: 'anatomie', q: 'Combien d’os compte le corps humain environ ?', c: ['Plus de 200', 'Environ 50', 'Plus de 600'], e: '> 200 os ; > 600 muscles ; > 90 articulations.' }
  ].map(function (q) { q.src = 'Réglementation EPMS à l’usage des cadres de contact (EMB, janv. 2022)'; return q; })
});
