REV.add({
  id: 'pmr', name: 'PMR / SST', icon: '🦺', color: '#ea580c',
  desc: 'Cours CT1 fusionné avec le chapitre 10 de l’AQA 03 (source la plus récente).',
  lessons: [
    {
      id: 'fondamentaux', title: 'Fondamentaux et principes de prévention',
      html: `
<ul><li>La <b>PMR est une prérogative de commandement</b> : préserver la ressource humaine et la préparation opérationnelle. Code du travail = texte de référence ; il s’applique aux militaires pour les activités de même nature que les civils. En OPEX : <b>PMROPS</b>.</li>
<li><b>4 domaines</b> : SST (santé et sécurité au travail), PPCI (incendie), RTE (risques technologiques et environnementaux), PSR (sécurité routière).</li></ul>
<h3>Les 9 principes généraux de prévention</h3>
<ol><li>Éviter les risques</li><li>Évaluer ceux qu’on ne peut pas éviter</li><li>Les combattre à la source</li><li>Adapter le travail à l’homme</li><li>Tenir compte de l’évolution de la technique</li><li>Remplacer le dangereux par le moins dangereux</li><li>Planifier la prévention</li><li>Priorité à la protection collective sur l’individuelle</li><li>Donner les instructions appropriées</li></ol>`,
      retenir: ['PMR = prérogative de commandement.', '4 domaines : SST, PPCI, RTE, PSR.', 'Protection collective AVANT individuelle.'],
      pieges: ['Droit de retrait : inapplicable en opération et à l’entraînement.'],
      memo: { cle: 'ÉVITER → ÉVALUER → COMBATTRE À LA SOURCE', points: ['4 domaines : SST · PPCI · RTE · PSR', 'Collectif avant individuel', 'OPEX : PMROPS'], astuce: 'Le meilleur risque est celui qu’on a supprimé.' }
    },
    {
      id: 'acteurs', title: 'Responsabilités et acteurs',
      html: `
<ul><li><b>Chef d’organisme</b> : sécurité et santé physique et mentale, registre SST, DUERP, FEN, RDP ; <b>principal responsable pénal</b>. 3 niveaux : chef d’organisme → encadrement → personnel.</li>
<li>Central : ministre, DRH-MD, EMDS, états-majors zonaux, coordonnateur central, DCSSA, inspections (ITA, IRAD, IMPA, ITPCI).</li>
<li>Local : <b>CLP</b> (coordonnateur local, en général le <b>commandant en second</b>) ; <b>CPRP</b> (conseille le chef, <b>tient le registre SST</b>) ; préventeurs ; médecin de prévention (civil) ; médecin conseiller (militaire, membre de droit de la CCHPA) ; conseiller incendie ; CLPSR ; PCR ; encadrement ; chaque agent.</li>
<li><b>Instances</b> : CCHPA (militaires), formation spécialisée FS (civils, obligatoire dès 50 agents) ; <b>2 réunions par an</b> ; réunions conjointes possibles depuis le 08/07/2024 avec 2 procès-verbaux distincts ; réunion supplémentaire en cas d’accident grave. CLP (= commandant en second) : coordonne, anime, surveille.</li>
</ul>`,
      retenir: ['Chef d’organisme = responsable de la PMR (et pénalement).', 'CPRP tient le registre SST.', 'CLP = commandant en second.', 'CCHPA / FS : 2 réunions par an.'],
      pieges: ['« Le chargé de prévention est responsable de la PMR-E » est FAUX : c’est le chef d’organisme.'],
      memo: { cle: 'CHEF D’ORGANISME = RESPONSABLE', points: ['CPRP : registre SST, conseille', 'CLP : commandant en second', 'CCHPA (militaires) / FS (civils) : 2×/an'], astuce: 'Le CPRP conseille, le chef décide et répond.' }
    },
    {
      id: 'documents', title: 'Documents : DUERP, FEN, registres',
      html: `
<ul><li><b>RDP</b> = DUERP + organisation locale + PAPRIPACT ; dématérialisable (arrêté du 18/12/2023).</li>
<li><b>DUERP</b> : par unité de travail, mis à jour chaque année, conservé 40 ans. La FEN ne peut citer que des risques inscrits au DUERP.</li>
<li><b>Registre SST</b> : tenu par le CPRP, accessible à tous, examiné au moins 2 fois par an. <b>Registre spécial</b> (droit de retrait) : sous la responsabilité du chef d’organisme ; aucune sanction pour un retrait valable.</li>
<li><b>FEN</b> (fiche emploi-nuisances) : informe les agents et le médecin de prévention des risques pour la santé. Chef d’organisme + CPRP + médecin ; 2 parties (administrative, nuisances) ; mise à jour <b>au moins tous les 5 ans</b> ; <b>4 exemplaires</b> : agent, dossier médical, dossier administratif, chef d’organisme (selon ta fiche « l’essentiel » ; le cours citait : 1 à l’agent, 1 au dossier médical, l’original au dossier administratif).</li>
<li><b>Fiche d’exposition</b> : complète la FEN et trace les expositions (amiante, rayonnements optiques) ; FEAPERI (rayonnements ionisants).</li></ul>`,
      retenir: ['DUERP : chaque année, conservé 40 ans.', 'FEN : mise à jour au moins tous les 5 ans ; 4 exemplaires (agent, dossier médical, dossier administratif, chef d’organisme).', 'Fiche d’exposition = complète la FEN, trace les expositions.'],
      memo: { cle: 'DUERP 1 AN · FEN 5 ANS · 40 ANS D’ARCHIVE', points: ['Registre SST : CPRP, 2×/an', 'Registre spécial : droit de retrait', 'FEN : informer agents + médecin'], astuce: 'La FEN ne parle que des risques déjà inscrits au DUERP.' }
    },
    {
      id: 'risques', title: 'Formation, accidents, incendie, environnement, route',
      html: `
<ul><li><b>Formation SST</b> : à l’arrivée, à la prise de poste à risque, après changement ou longue absence, après accident grave ou répété ; information au moins 1 fois par an. Chariots élévateurs : aptitude médicale + stage + formation sur site + autorisation du chef de corps.</li>
<li><b>En service</b> : enceinte militaire, activité organisée, trajet de mission, sport commandé (ordre écrit). Accident de trajet : domicile-travail sans détour. <b>Imputabilité</b> : condition de temps + condition de lieu + relation avec le service.</li>
<li>L’analyse d’un accident sert à <b>éviter un accident similaire</b>.</li>
<li><b>Risque chimique</b> : 9 pictogrammes, FDS en 16 rubriques. Orientation SST 2020-2023 : prévention de l’exposition aux CMR.</li>
<li><b>PPCI</b> : sécurité des personnes et des biens, faciliter les secours, <b>limiter naissance et propagation du feu</b>, faciliter l’évacuation.</li>
<li><b>RTE</b> : eau, sols pollués, ICPE (déclaration, enregistrement, autorisation), déchets (BSD, registre).</li>
<li><b>PSR</b> : 2ᵉ cause de mortalité au ministère ; PPRR triennal, PLPRR local.</li>
<li><b>Risque chimique</b> : 9 pictogrammes (nocif, toxique, CMR, corrosif, inflammable, comburant, gaz sous pression, explosif, polluant) ; <b>3 voies de contamination</b> : respiratoire, cutanée, digestive.</li>
<li><b>PPCI</b> : <b>triangle du feu</b> = combustible + comburant + énergie d’activation ; <b>5 classes de feux</b> : A solides, B liquides, C gaz, D métaux, F huiles et graisses de cuisson. Formation incendie : initiale + entretien tous les <b>6 mois</b> + rappel des consignes tous les <b>2 mois</b>.</li>
<li><b>ICPE</b> : 4 régimes : déclaration, enregistrement, autorisation, autorisation avec servitudes. Déchets tracés par <b>BSD</b>.</li>
<li>Formations : <b>PRAP</b> = prévention des risques liés à l’activité physique ; <b>TMD</b> = transport de matières dangereuses.</li>
<li><b>PMROPS</b> (en OPEX) : CCP EMA → AIPT (théâtre) → CPRPO (COMSITE) ; CCHSO possibles sur le théâtre.</li>
</ul>`,
      retenir: ['Imputabilité : temps + lieu + lien avec le service.', 'PPCI : limiter naissance et propagation du feu.', 'Analyse d’accident = éviter un accident similaire.'],
      memo: { cle: 'IMPUTABILITÉ = TEMPS + LIEU + SERVICE', points: ['Sport commandé = ordre écrit', 'Trajet domicile-travail sans détour', 'PSR : 2ᵉ cause de mortalité'], astuce: 'Pour qu’un accident soit « de service » : au bon moment, au bon endroit, pour le service.' }
    }
  ],
  questions: [
    { l: 'fondamentaux', q: 'La PMR est avant tout :', c: ['Une prérogative de commandement', 'Une mission du médecin de prévention', 'Une obligation du seul CPRP', 'Une affaire de spécialistes civils'], e: 'Elle vise à préserver la ressource humaine et la préparation opérationnelle.' },
    { l: 'fondamentaux', q: 'Quels sont les 4 domaines de la PMR ?', c: ['SST, PPCI, RTE, PSR', 'SST, NRBC, PSR, OPEX', 'DUERP, FEN, RDP, SST', 'PPCI, ICPE, PSR, CMR'], e: 'Santé-sécurité au travail, incendie, risques technologiques et environnementaux, sécurité routière.' },
    { l: 'fondamentaux', q: 'Selon les principes de prévention, quelle protection est prioritaire ?', c: ['La protection collective', 'La protection individuelle', 'Les deux à égalité', 'Aucune, on forme le personnel'], e: 'Principe n°8 : priorité à la protection collective sur l’individuelle.' },
    { l: 'fondamentaux', q: 'Le droit de retrait des militaires est-il applicable en opération et à l’entraînement ?', c: ['Non (décret 2012-422)', 'Oui, toujours', 'Oui, seulement à l’entraînement', 'Oui, sur ordre écrit'], e: 'Correction apportée par l’AQA 03 au cours PMR.' },
    { l: 'acteurs', q: 'Affirmation FAUSSE ?', c: ['« Le chargé de prévention est responsable de la PMR-E »', '« Le chef d’organisme est le principal responsable pénal »', '« Le CPRP tient le registre SST »', '« Le CLP est en général le commandant en second »'], e: 'C’est le chef d’organisme qui est responsable, pas le chargé de prévention.', src: 'QCM FS2' },
    { l: 'acteurs', q: 'Qui tient le registre SST ?', c: ['Le CPRP', 'Le chef d’organisme', 'Le médecin de prévention', 'Le commandant en second'], e: 'Le CPRP conseille le chef et tient le registre SST.', src: 'QCM FS2' },
    { l: 'acteurs', q: 'Qui est en général le coordonnateur local à la prévention (CLP) ?', c: ['Le commandant en second', 'Le chef de corps', 'Le CPRP', 'Le médecin conseiller'], e: 'Fiche PMR / SST l’essentiel : CLP (= C2, commandant en second) : coordonne, anime, surveille.', src: 'QCM FS2' },
    { l: 'acteurs', q: 'Combien de réunions par an pour la CCHPA / FS (AQA 03) ?', c: ['2', '4', '1', '12'], e: 'Le cours disait 4 : l’AQA 03 (plus récente) dit 2.' },
    { l: 'documents', q: 'À quoi sert la fiche emploi-nuisances (FEN) ?', c: ['Informer les agents et le médecin de prévention des risques pour la santé', 'Déclarer un accident', 'Exercer le droit de retrait', 'Suivre la vie d’un matériel'], e: 'Elle ne peut citer que des risques inscrits au DUERP.', src: 'QCM FS2' },
    { l: 'documents', q: 'Mise à jour de la FEN ?', c: ['A minima 5 ans après son élaboration ou sa dernière mise à jour', 'Chaque année', 'Tous les 40 ans', 'Uniquement après un accident'], e: 'Réponse du QCM Test FS2.', src: 'QCM FS2' },
    { l: 'documents', q: 'Remise de la FEN :', c: ['Un exemplaire est remis à l’agent', 'Elle reste confidentielle au chef', 'Elle n’est remise qu’au médecin', 'Elle est affichée'], e: '1 exemplaire à l’agent, 1 au dossier médical, l’original au dossier administratif.', src: 'QCM FS2' },
    { l: 'documents', q: 'Quel document complète la FEN et trace les expositions ?', c: ['La fiche d’exposition', 'Le DUERP', 'Le registre spécial', 'Le MAT 1017'], e: 'Fiche d’exposition annuelle (amiante, rayonnements optiques).', src: 'QCM FS2' },
    { l: 'documents', q: 'Le DUERP est mis à jour…', c: ['Chaque année (et conservé 40 ans)', 'Tous les 5 ans', 'Tous les 10 ans', 'Uniquement sur demande'], e: 'Par unité de travail, mis à jour chaque année, conservé 40 ans.' },
    { l: 'risques', q: 'Imputabilité d’un accident de service : conditions ?', c: ['Condition de temps + condition de lieu + relation avec le service', 'Un témoin + un certificat médical', 'Uniquement dans l’enceinte militaire', 'Un ordre écrit uniquement'], e: 'Les trois conditions cumulées.', src: 'QCM FS2' },
    { l: 'risques', q: 'L’analyse d’un accident permet avant tout…', c: ['D’éviter un accident similaire', 'De désigner un coupable', 'De calculer une indemnité', 'De clôturer le dossier'], e: 'But : comprendre pour prévenir la récidive.', src: 'QCM FS2' },
    { l: 'risques', q: 'Affirmation vraie : la PPCI…', c: ['Limite les risques de naissance du feu', 'Concerne uniquement les véhicules', 'Remplace les exercices d’évacuation', 'Est gérée par le médecin'], e: 'PPCI : limiter naissance et propagation du feu, faciliter secours et évacuation.', src: 'QCM FS2' },
    { l: 'risques', q: 'Orientation SST 2020-2023 ?', c: ['Prévention de l’exposition aux CMR', 'Sécurité routière uniquement', 'Réduction du bruit', 'Ergonomie des bureaux'], e: 'CMR = cancérogènes, mutagènes, reprotoxiques.', src: 'QCM FS2' },
    { l: 'risques', q: 'Un sport est « en service » s’il est :', c: ['Commandé (ordre écrit)', 'Pratiqué dans une salle civile', 'Pratiqué le week-end', 'Pratiqué seul'], e: 'Sport commandé = ordre écrit.' },
    { l: 'risques', q: 'Le triangle du feu associe :', c: ['Combustible, comburant, énergie d’activation', 'Eau, air, chaleur', 'Combustible, eau, oxygène'], e: 'Supprimer un des trois côtés éteint le feu.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Un feu de métaux est de classe :', c: ['D', 'B', 'F'], e: 'A solides, B liquides, C gaz, D métaux, F huiles et graisses.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Un feu d’huile de cuisson est de classe :', c: ['F', 'B', 'A'], e: 'A solides, B liquides, C gaz, D métaux, F huiles / graisses.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Formation incendie : périodicité de l’entretien et du rappel des consignes ?', c: ['Entretien tous les 6 mois, rappel des consignes tous les 2 mois', 'Tous les ans', 'Tous les 3 ans'], e: 'Plus la formation initiale.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Les 3 voies de contamination chimique :', c: ['Respiratoire, cutanée, digestive', 'Visuelle, auditive, cutanée', 'Sanguine, osseuse, nerveuse'], e: 'D’où les EPI adaptés : masque, gants, hygiène.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Combien de régimes pour les ICPE ?', c: ['4 : déclaration, enregistrement, autorisation, autorisation avec servitudes', '3 : déclaration, enregistrement, autorisation', '2'], e: 'Ta fiche « l’essentiel » ajoute l’autorisation avec servitudes.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'PRAP signifie :', c: ['Prévention des risques liés à l’activité physique', 'Plan de retour après accident', 'Protection des risques d’atmosphère polluée'], e: 'TMD = transport de matières dangereuses.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'risques', q: 'Chaîne PMROPS en opération :', c: ['CCP EMA → AIPT (théâtre) → CPRPO (COMSITE)', 'CPRP → CLP → chef de corps', 'DRH-MD → EMDS → CCHPA'], e: 'Des CCHSO sont possibles sur le théâtre.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'acteurs', q: 'Rôle du CLP (commandant en second) :', c: ['Coordonner, animer, surveiller la prévention', 'Tenir le registre SST', 'Être le principal responsable pénal'], e: 'Le CPRP conseille et tient le registre ; le chef d’organisme est responsable pénal.', src: 'Fiche « PMR / SST — l’essentiel »' },
    { l: 'documents', q: 'En combien d’exemplaires la FEN est-elle établie (fiche « l’essentiel ») ?', c: ['4 : agent, dossier médical, dossier administratif, chef d’organisme', '1 seul, gardé par le chef', '2 : agent et médecin'], e: 'Base légale : arrêté du 9 octobre 2020 ; 2 parties ; mise à jour au moins tous les 5 ans.', src: 'Fiche « PMR / SST — l’essentiel »' },
  ]
});
