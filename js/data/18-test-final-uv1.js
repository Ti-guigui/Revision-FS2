/* Sujet de préparation au TEST FINAL FS2 UV1 (domaine MOBTER) : questions et propositions mot pour mot, numérotées 1 à 4 comme sur la copie.
   Réponses : correction officielle, vérifiée avec le cours (écart signalé). */
REV.addExercises('moteur', {
  lessons: [
    {
      id: 'tf-moteur', title: 'Test final UV1 : motorisation (Q1 à Q10)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°1 → 3 : Le balayage.</b> La vitesse des gaz brûlés qui sortent « aspire » le mélange frais pendant le croisement des soupapes : c’est le balayage.</li>
<li><b>Question N°2 → 3 : A rotor.</b> Pompes à huile : à engrenages, à rotor (lobes). « À targettes », « à crémaillère », « à stator » ne sont pas des pompes à huile.</li>
<li><b>Question N°3 → 4 : Limiter la pression lorsque la température augmente et permettre l’entrée d’air au cours du refroidissement.</b> Le bouchon a 2 soupapes : l’une limite la pression quand la température monte, l’autre laisse entrer l’air quand le liquide refroidit (sinon le circuit se mettrait en dépression).</li>
<li><b>Question N°4 → 3 : 550°.</b> Pour brûler les suies, il faut environ 550 °C dans le FAP.</li>
<li><b>Question N°5 → 3 : La combustion diffusante.</b> Après la fin d’injection, le carburant restant brûle au fur et à mesure qu’il rencontre l’air : combustion diffusante.</li>
<li><b>Question N°6 → 3 : Flamstart.</b> Flamstart : une bougie enflamme du gazole dans le collecteur d’admission pour réchauffer l’air au démarrage.</li>
<li><b>Question N°7 → 4 : La course de détente.</b> Pompe en ligne : entre la pré-course et la course utile se trouve la course de détente (correction officielle ; l’ancienne fiche disait « course restante »).</li>
<li><b>Question N°8 → 3 : Un disque à cames.</b> La pompe rotative VE Bosch utilise un disque à cames ; crémaillère, arbre à cames et rampe hélicoïdale sont ceux de la pompe en ligne.</li>
<li><b>Question N°9 → 3 : Wastegate.</b> La wastegate ouvre un by-pass des gaz d’échappement autour de la turbine : elle limite la pression de suralimentation.</li>
<li><b>Question N°10 → 4 : Le capteur de phase.</b> Le capteur de régime (vilebrequin) donne le PMH des cylindres 1 et 4 ; le capteur de phase (arbre à cames) indique lequel est en compression → position du 1ᵉʳ cylindre.</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°1 : La vitesse avec laquelle les gaz brûlés quittent le cylindre, favorise l’aspiration du mélange. Cette phase s’appelle :', c: ['Le nettoyage.', 'Le remplissage.', 'Le balayage.', 'L’évacuation.'], e: 'La vitesse des gaz brûlés qui sortent « aspire » le mélange frais pendant le croisement des soupapes : c’est le balayage.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°2 : Parmi les types de pompes à huile, il existe les pompes :', c: ['À targettes.', 'À crémaillère.', 'A rotor.', 'A stator.'], e: 'Pompes à huile : à engrenages, à rotor (lobes). « À targettes », « à crémaillère », « à stator » ne sont pas des pompes à huile.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 3, q: 'Question N°3 : Quel est le rôle de la soupape du bouchon du vase d’expansion ?', c: ['Limiter uniquement la pression lorsque la température augmente.', 'Permet uniquement l’entrée d’air au cours du refroidissement.', 'Évacuer la pression du circuit lorsque la température dépasse 200 °C.', 'Limiter la pression lorsque la température augmente et permettre l’entrée d’air au cours du refroidissement.'], e: 'Le bouchon a 2 soupapes : l’une limite la pression quand la température monte, l’autre laisse entrer l’air quand le liquide refroidit (sinon le circuit se mettrait en dépression).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°4 : Le principe de régénération d’un FAP pour éliminer les particules est de monter en température. Cette température doit atteindre :', c: ['250°.', '400°.', '550°.', '750°.'], e: 'Pour brûler les suies, il faut environ 550 °C dans le FAP.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°5 : Pendant la phase de combustion en fin d’injection, le mélange continue à brûler. Comment appelle-t-on cette combustion ?', c: ['La combustion rapide incontrôlée.', 'La combustion principale contrôlée.', 'La combustion diffusante.', 'La combustion principale incontrôlée.'], e: 'Après la fin d’injection, le carburant restant brûle au fur et à mesure qu’il rencontre l’air : combustion diffusante.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°6 : Parmi les dispositifs d’aide au démarrage, il existe le dispositif :', c: ['Start and go.', 'Startflam.', 'Flamstart.', 'Openstart.'], e: 'Flamstart : une bougie enflamme du gazole dans le collecteur d’admission pour réchauffer l’air au démarrage.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 3, q: 'Question N°7 : Sur une pompe à injection en ligne, la distance entre la précourse et la course utile s’appelle :', c: ['La course restante.', 'Le point mort haut.', 'Le point mort bas.', 'La course de détente.'], e: 'Pompe en ligne : entre la pré-course et la course utile se trouve la course de détente (correction officielle ; l’ancienne fiche disait « course restante »).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°8 : A l’intérieur d’une pompe à injection VE BOSCH on peut trouver :', c: ['Une crémaillère.', 'Un arbre à cames.', 'Un disque à cames.', 'Une rampe hélicoïdale.'], e: 'La pompe rotative VE Bosch utilise un disque à cames ; crémaillère, arbre à cames et rampe hélicoïdale sont ceux de la pompe en ligne.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 2, q: 'Question N°9 : Sur un turbocompresseur la pression maximum à l’admission est limitée par un dispositif appelé :', c: ['Flamstart.', 'Stargate.', 'Wastegate.', 'Électrovanne de pression max.'], e: 'La wastegate ouvre un by-pass des gaz d’échappement autour de la turbine : elle limite la pression de suralimentation.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-moteur', fixed: true, num: true, a: 3, q: 'Question N°10 : Quel capteur permet au calculateur de connaître la position moteur du premier cylindre ?', c: ['Le capteur de haute pression de rampe.', 'Le capteur de régime.', 'Le capteur du premier cylindre.', 'Le capteur de phase.'], e: 'Le capteur de régime (vilebrequin) donne le PMH des cylindres 1 et 4 ; le capteur de phase (arbre à cames) indique lequel est en compression → position du 1ᵉʳ cylindre.', src: 'Sujet de préparation au test final UV1' },
  ]
});
REV.addExercises('elec', {
  lessons: [
    {
      id: 'tf-elec', title: 'Test final UV1 : électricité générale (Q11 à Q20)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°11 → 2 : 15A.</b> Règle du cours : environ 5 A par mm² → 3 × 5 = 15 A.</li>
<li><b>Question N°12 → 3 : 3A.</b> I = Q / t = 96 Ah / 32 h = 3 A.</li>
<li><b>Question N°13 → 3 : 200m.</b> R = ρ × L / S → L = R × S / ρ = 3,2 × 10⁻⁶ / 1,6 × 10⁻⁸ = 200 m (1 mm² = 10⁻⁶ m²).</li>
<li><b>Question N°14 → 2 : 4Ω.</b> Lampes en parallèle sous 24 V : I = 60/24 + 12/24 = 2,5 + 0,5 = 3 A. Rx dissipe 108 − 72 = 36 W → URx = 36 / 3 = 12 V → Rx = 12 / 3 = 4 Ω.</li>
<li><b>Question N°15 → 1 : 105V.</b> U = R × I = 35 000 × 0,003 = 105 V.</li>
<li><b>Question N°16 → 2 : 2Ω.</b> 2 Ω ∥ 2 Ω = 1 Ω, + 1 Ω = 2 Ω ; branche du bas 1 + 1 = 2 Ω ; les deux branches de 2 Ω en parallèle = 1 Ω ; + 1 Ω d’entrée = 2 Ω.</li>
<li><b>Question N°17 → 1 : 6Ω.</b> P = R × I² → R = 24 / 2² = 6 Ω.</li>
<li><b>Question N°18 → 3 : 127V.</b> Tension simple V = U / √3 = 220 / 1,732 ≈ 127 V.</li>
<li><b>Question N°19 → 2 : 2,5ms.</b> T = 1 / f = 1 / 400 = 0,0025 s = 2,5 ms.</li>
<li><b>Question N°20 → 1 : 4,5 A.</b> Les lampes sont sous 10 V (Zener Z2) : IL1 = 5/10 = 0,5 A ; IL2 = 35/10 = 3,5 A ; + IZ2 = 0,5 A → Ig = 4,5 A.</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-elec', fixed: true, num: true, a: 1, q: 'Question N°11 : Quel est le courant maximum qui peut circuler dans un conducteur de 3mm² ?', c: ['28A.', '15A.', '5A.', '7A.'], e: 'Règle du cours : environ 5 A par mm² → 3 × 5 = 15 A.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 2, q: 'Question N°12 : Quelle sera la valeur du courant débitée par une batterie de 96Ah pendant 32h ?', c: ['0,33A.', '33mA.', '3A.', '30A.'], e: 'I = Q / t = 96 Ah / 32 h = 3 A.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 2, q: 'Question N°13 : Quelle est la longueur d\'un fil de cuivre de résistivité ρ = 1,6.10-8 Ω.m d\'une résistance de 3,2Ω et d\'une section S=1mm2 ?', c: ['100m.', '50m.', '200m.', '20m.'], e: 'R = ρ × L / S → L = R × S / ρ = 3,2 × 10⁻⁶ / 1,6 × 10⁻⁸ = 200 m (1 mm² = 10⁻⁶ m²).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 1, img: 'elec-q14-rx.png', q: 'Question N°14 : Soit le schéma suivant (Rx en série avec L1 et L2 montées en parallèle). Calculer la valeur de la résistance Rx pour que les lampes soient correctement alimentées. Données : Pg = 108W ; UL1 = UL2 = 24V ; PL1 = 60W ; PL2 = 12W.', c: ['3Ω.', '4Ω.', '36Ω.', '30Ω.'], e: 'Lampes en parallèle sous 24 V : I = 60/24 + 12/24 = 2,5 + 0,5 = 3 A. Rx dissipe 108 − 72 = 36 W → URx = 36 / 3 = 12 V → Rx = 12 / 3 = 4 Ω.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 0, q: 'Question N°15 : La tension aux bornes d’une résistance de 35kΩ, traversée par un courant de 0,003 A est de :', c: ['105V.', '10,5V.', '12V.', '1050V.'], e: 'U = R × I = 35 000 × 0,003 = 105 V.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 1, img: 'elec-q16-req.png', q: 'Question N°16 : Quelle est la résistance équivalente du circuit ci-dessous entre les bornes A et B ?', c: ['4Ω.', '2Ω.', '7Ω.', '6Ω.'], e: '2 Ω ∥ 2 Ω = 1 Ω, + 1 Ω = 2 Ω ; branche du bas 1 + 1 = 2 Ω ; les deux branches de 2 Ω en parallèle = 1 Ω ; + 1 Ω d’entrée = 2 Ω.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 0, q: 'Question N°17 : Une lampe à incandescence d’une puissance de 24W consomme un courant de 2A. Quelle est la valeur de la résistance de cette lampe ?', c: ['6Ω.', '12Ω.', '48Ω.', '22Ω.'], e: 'P = R × I² → R = 24 / 2² = 6 Ω.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 2, q: 'Question N°18 : On mesure 220V entre deux phases d\'un réseau alternatif triphasé. Quelle est la tension que l\'on mesure entre une des phases et le neutre?', c: ['155,5V.', '220V.', '127V.', '380V.'], e: 'Tension simple V = U / √3 = 220 / 1,732 ≈ 127 V.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 1, q: 'Question N°19 : Un réseau alternatif sinusoïdal monophasé est caractérisé par les indications 200V-400Hz. Quelle est la période de ce réseau ?', c: ['25s.', '2,5ms.', '25ms.', '4ms.'], e: 'T = 1 / f = 1 / 400 = 0,0025 s = 2,5 ms.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-elec', fixed: true, num: true, a: 0, img: 'elec-q20-zener.png', q: 'Question N°20 : Calculer la valeur du courant Ig. Données : Ug = 29V ; VZ1 = 10V ; VZ2 = 10V ; IZ2 = 500mA ; PL1 = 5W ; PL2 = 35W (R1 et Z1 en série ; Z2, L1 et L2 en parallèle).', c: ['4,5 A.', '1 A.', '0,7 A', '700 mA.'], e: 'Les lampes sont sous 10 V (Zener Z2) : IL1 = 5/10 = 0,5 A ; IL2 = 35/10 = 3,5 A ; + IZ2 = 0,5 A → Ig = 4,5 A.', src: 'Sujet de préparation au test final UV1' },
  ]
});
REV.addExercises('dsft', {
  lessons: [
    {
      id: 'tf-dsft', title: 'Test final UV1 : DSFT (Q21 à Q30)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°21 → 2 : A l’indice de vitesse.</b> 185 = largeur, 70 = série, R = radial, 15 = diamètre de jante, 86 = indice de charge, T = indice de vitesse.</li>
<li><b>Question N°22 → 3 : C’est l’angle formé par la verticale au sol et l’axe de pivot dans le plan longitudinal du véhicule.</b> Cours DSFT : la chasse est l’angle entre la verticale au sol et l’axe de pivot, vu de côté, dans le plan LONGITUDINAL.</li>
<li><b>Question N°23 → 3 : C’est l’angle formé par l’axe géométrique de la fusée et l’horizontale.</b> Carrossage = angle entre le plan de roue et la verticale, ce qui revient à l’angle entre l’axe géométrique de la fusée et l’horizontale (réponse officielle).</li>
<li><b>Question N°24 → 1 : L’angle de chasse.</b> La chasse ramène les roues en ligne droite : auto-stabilité (rappel) de la direction.</li>
<li><b>Question N°25 → 2 : Transformer la force mécanique en pression hydraulique.</b> Le maître-cylindre transforme l’effort mécanique sur la pédale en pression hydraulique.</li>
<li><b>Question N°26 → 1 : Indiquer au conducteur une chute de pression dans le circuit et envoyer la pression maximum dans le circuit arrière en shuntant le correcteur de freinage en cas de défaillance du circuit avant.</b> ICP by-pass : il allume le témoin et, si le circuit AVANT lâche, envoie la pression maxi à l’ARRIÈRE en shuntant le correcteur.</li>
<li><b>Question N°27 → 1 : Un mécanisme d’embrayage à diaphragme poussé a un passage de couple supérieur d’environ 20%.</b> Affirmation FAUSSE : c’est le diaphragme TIRÉ (et non poussé) qui passe environ 20 % de couple en plus.</li>
<li><b>Question N°28 → 3 : Elle doit avoir une faible inertie.</b> Une boîte doit supporter couple et puissance, être silencieuse, fiable, avoir un bon rendement. « Faible inertie » n’en fait pas partie.</li>
<li><b>Question N°30 → 4 : Une valve de commande de remorque avec rupture.</b> Entrées 11 et 12, sortie 2, échappement 3, pilotages 41-42-43 : valve de commande de remorque avec rupture.</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-dsft', fixed: true, num: true, a: 1, q: 'Question N°21 : Dans le marquage de pneumatique « 185 70 R 15 86 T », à quoi correspond la lettre T ?', c: ['À l’indice de charge.', 'À l’indice de vitesse.', 'Au type d’enveloppe.', 'Au type de structure.'], e: '185 = largeur, 70 = série, R = radial, 15 = diamètre de jante, 86 = indice de charge, T = indice de vitesse.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 2, q: 'Question N°22 : Quelle est la définition de l’angle de chasse ?', c: ['C’est l’angle formé par le plan de rotation de la roue et l’axe de pivot dans le plan longitudinal du véhicule.', 'C’est l’angle formé par le plan de rotation de la roue et l’axe de pivot dans le plan transversal du véhicule.', 'C’est l’angle formé par la verticale au sol et l’axe de pivot dans le plan longitudinal du véhicule.', 'C’est l’angle formé par la verticale au sol et l’axe de pivot dans le plan transversal du véhicule.'], w: 'Sur certaines copies, la case « plan transversal » est cochée : c’est faux, le plan transversal correspond à l’inclinaison de pivot.', e: 'Cours DSFT : la chasse est l’angle entre la verticale au sol et l’axe de pivot, vu de côté, dans le plan LONGITUDINAL.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 2, q: 'Question N°23 : Quelle est la définition de l’angle de carrossage ?', c: ['C’est l’angle formé par le plan de rotation de la roue et l’horizontale.', 'C’est l’angle formé par le plan vertical de la roue et l’horizontale.', 'C’est l’angle formé par l’axe géométrique de la fusée et l’horizontale.', 'C’est l’angle formé par l’axe géométrique de la fusée et la verticale.'], e: 'Carrossage = angle entre le plan de roue et la verticale, ce qui revient à l’angle entre l’axe géométrique de la fusée et l’horizontale (réponse officielle).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 0, q: 'Question N°24 : L’autostabilité de la direction est entre autres réalisée par :', c: ['L’angle de chasse.', 'L’angle de carrossage.', 'L’utilisation d’une direction assistée.', 'Un déport très important.'], e: 'La chasse ramène les roues en ligne droite : auto-stabilité (rappel) de la direction.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 1, q: 'Question N°25 : Quel est le rôle du maître-cylindre ?', c: ['Transformer la pression hydraulique en force mécanique.', 'Transformer la force mécanique en pression hydraulique.', 'Répartir la pression entre les circuits primaire et secondaire.', 'Diminuer le temps de réponse des freins.'], e: 'Le maître-cylindre transforme l’effort mécanique sur la pédale en pression hydraulique.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 0, q: 'Question N°26 : Quels sont les rôles d’un ICP by-pass ?', c: ['Indiquer au conducteur une chute de pression dans le circuit et envoyer la pression maximum dans le circuit arrière en shuntant le correcteur de freinage en cas de défaillance du circuit avant.', 'Indiquer au conducteur une chute de pression dans le circuit et envoyer la pression maximum dans le circuit avant en shuntant le correcteur de freinage en cas de défaillance du circuit arrière.', 'Indiquer au conducteur une chute de pression dans le circuit et envoyer la pression du circuit avant dans le circuit arrière en shuntant le correcteur de freinage en cas de défaillance du circuit avant.', 'Indiquer au conducteur une chute de pression dans le circuit et envoyer la pression maximum dans les deux circuits en shuntant le correcteur de freinage.'], e: 'ICP by-pass : il allume le témoin et, si le circuit AVANT lâche, envoie la pression maxi à l’ARRIÈRE en shuntant le correcteur.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 0, q: 'Question N°27 : Quelle affirmation est fausse ?', c: ['Un mécanisme d’embrayage à diaphragme poussé a un passage de couple supérieur d’environ 20%.', 'Un mécanisme d’embrayage à diaphragme a une force pressante sur le disque peu variable.', 'Un mécanisme d’embrayage à diaphragme a une meilleure ventilation.', 'Un mécanisme d’embrayage à diaphragme a une grande progressivité au démarrage.'], e: 'Affirmation FAUSSE : c’est le diaphragme TIRÉ (et non poussé) qui passe environ 20 % de couple en plus.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 2, q: 'Question N°28 : Quelle affirmation ne fait pas partie des qualités d’une boîte de vitesses ?', c: ['Elle doit supporter le couple et la puissance maxi.', 'Elle doit être silencieuse et fiable.', 'Elle doit avoir une faible inertie.', 'Elle doit avoir un bon rendement.'], e: 'Une boîte doit supporter couple et puissance, être silencieuse, fiable, avoir un bon rendement. « Faible inertie » n’en fait pas partie.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 2, img: 'symbole-valve-reduction.png', q: 'Question N°29 : A quoi correspond le symbole suivant ?', c: ['Un correcteur de freinage.', 'Un correcteur de freinage avec valve relais simple pilotage intégrée.', 'Une valve de réduction pilotée.', 'Une valve relais simple pilotage.'], e: 'Carré AVEC une croix + pilotage 4 = valve de réduction pilotée (AGB 03 p. 35). La valve relais simple pilotage est un carré VIDE, sans croix, avec une flèche sur la sortie 2 (AGB 03 p. 31).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-dsft', fixed: true, num: true, a: 3, img: 'symbole-vcr-rupture.png', q: 'Question N°30 : A quoi correspond le symbole suivant ?', c: ['Une valve de non addition des efforts.', 'Une valve relais d’urgence.', 'Une valve de commande de remorque sans rupture.', 'Une valve de commande de remorque avec rupture.'], e: 'Entrées 11 et 12, sortie 2, échappement 3, pilotages 41-42-43 : valve de commande de remorque avec rupture.', src: 'Sujet de préparation au test final UV1' },
  ]
});
REV.addExercises('hydro', {
  lessons: [
    {
      id: 'tf-hydro', title: 'Test final UV1 : hydraulique (Q31 à Q40)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°31 → 4 : De la surface et du débit.</b> v = Q / S : la vitesse d’un vérin dépend du débit et de la surface (la charge agit sur la pression).</li>
<li><b>Question N°32 → 4 : Une soupape haute pression.</b> Dans une boucle de puissance (circuit fermé), le moteur est protégé des chocs par les soupapes haute pression.</li>
<li><b>Question N°33 → 2 : D’une pompe hydraulique à cylindrée variable.</b> LS centre fermé = pompe à cylindrée variable pilotée par le tiroir LS.</li>
<li><b>Question N°34 → 1 : Permet de consommer moins.</b> Le régulateur 3 voies renvoie le surplus à la bâche à une pression juste suffisante : moins de pertes, on consomme moins (réponse officielle).</li>
<li><b>Question N°35 → 4 : Protège le circuit de commande suite à une surpression.</b> Le réducteur 3 voies a un retour bâche : il protège le circuit de commande d’une surpression (réponse officielle).</li>
<li><b>Question N°36 → 2 : Un limiteur de pression.</b> La pression de gavage est maintenue par un limiteur de pression.</li>
<li><b>Question N°37 → 3 : Le clapet anti-retour piloté.</b> Le clapet anti-retour piloté bloque le récepteur tant qu’il n’y a pas de pression de pilotage.</li>
<li><b>Question N°38 → 2 : Le débit de la pompe est égal au débit côté tige d’un vérin.</b> Montage différentiel en sortie de tige : l’huile côté tige est renvoyée côté fond ; au final, le débit de la pompe est égal au débit côté tige.</li>
<li><b>Question N°39 → 2 : Lorsqu’un vérin arrive en butée l’autre s’arrête.</b> Réponse officielle : quand un vérin arrive en butée, l’autre s’arrête (vérins d’orientation).</li>
<li><b>Question N°40 → 4 : Permet de créer un équilibrage radial d’un composant.</b> Réponse officielle : le joint oléique crée un équilibrage radial du composant.</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-hydro', fixed: true, num: true, a: 3, q: 'Question N°31 : La vitesse de déplacement d’un vérin dépend', c: ['De la surface et de la charge.', 'Du débit et de la charge.', 'De la pression et du débit.', 'De la surface et du débit.'], e: 'v = Q / S : la vitesse d’un vérin dépend du débit et de la surface (la charge agit sur la pression).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 3, q: 'Question N°32 : Dans une boucle de puissance, le moteur hydraulique est protégé par', c: ['Une soupape réductrice de pression.', 'Un limiteur de pression à commande pilotée.', 'Une soupape de gavage.', 'Une soupape haute pression.'], e: 'Dans une boucle de puissance (circuit fermé), le moteur est protégé des chocs par les soupapes haute pression.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 1, q: 'Question N°33 : Le circuit LS centre fermé est équipé', c: ['D’une pompe hydraulique à deux sens de flux, cylindrée fixe.', 'D’une pompe hydraulique à cylindrée variable.', 'D’une pompe hydraulique à cylindrée fixe.', 'D’un servodistributeur.'], e: 'LS centre fermé = pompe à cylindrée variable pilotée par le tiroir LS.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 0, q: 'Question N°34 : Le régulateur de débit 3 voies par rapport au régulateur de débit 2 voies', c: ['Permet de consommer moins.', 'Permet d’utiliser plus de récepteurs.', 'Permet un meilleur contrôle de la charge menante.', 'Permet d’avoir un meilleur débit.'], e: 'Le régulateur 3 voies renvoie le surplus à la bâche à une pression juste suffisante : moins de pertes, on consomme moins (réponse officielle).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 3, q: 'Question N°35 : Le réducteur de pression 3 voies par rapport au 2 voies', c: ['A besoin d’un limiteur de pression.', 'Permet de réduire la pression dans deux branches différentes.', 'A deux plages de commutation : la conjonction et la disjonction.', 'Protège le circuit de commande suite à une surpression.'], e: 'Le réducteur 3 voies a un retour bâche : il protège le circuit de commande d’une surpression (réponse officielle).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 1, q: 'Question N°36 : Quel élément pouvez-vous utiliser pour maintenir une pression de gavage ?', c: ['Une soupape d’équilibrage.', 'Un limiteur de pression.', 'Un clapet anti-retour piloté.', 'Une soupape de freinage.'], e: 'La pression de gavage est maintenue par un limiteur de pression.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 2, q: 'Question N°37 : Quel élément empêche le déplacement d’un récepteur en absence de génération ?', c: ['Le diviseur de débit.', 'Le régulateur de débit.', 'Le clapet anti-retour piloté.', 'Le limiteur de pression à commande pilotée.'], e: 'Le clapet anti-retour piloté bloque le récepteur tant qu’il n’y a pas de pression de pilotage.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 1, q: 'Question N°38 : Lors de la sortie de tige du vérin de direction dans un montage différentiel la finalité est que :', c: ['Le débit de la pompe est égal au débit côté fond d’un vérin.', 'Le débit de la pompe est égal au débit côté tige d’un vérin.', 'Le débit de la pompe est égal à 2 fois le débit côté tige d’un vérin.', 'Le débit de la pompe est égal à 2 fois le débit côté fond d’un vérin.'], e: 'Montage différentiel en sortie de tige : l’huile côté tige est renvoyée côté fond ; au final, le débit de la pompe est égal au débit côté tige.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 1, q: 'Question N°39 : Quel est le rôle d’un débrayage de fin de course ?', c: ['Eviter les chocs mécaniques lorsque l’on arrive en butée.', 'Lorsqu’un vérin arrive en butée l’autre s’arrête.', 'Débrayer la charge lorsqu’elle est trop importante.', 'Permet, lorsqu’un vérin arrive en fin de course, le déplacement d’un autre vérin.'], e: 'Réponse officielle : quand un vérin arrive en butée, l’autre s’arrête (vérins d’orientation).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-hydro', fixed: true, num: true, a: 3, q: 'Question N°40 : Un joint oléique permet', c: ['Une étanchéité hydraulique entre élément mobile en rotation et un élément fixe.', 'Permet de rendre étanche la liaison entre un raccord et une canalisation.', 'Permet de créer un équilibrage axial d’un composant.', 'Permet de créer un équilibrage radial d’un composant.'], e: 'Réponse officielle : le joint oléique crée un équilibrage radial du composant.', src: 'Sujet de préparation au test final UV1' },
  ]
});
REV.addExercises('equip', {
  lessons: [
    {
      id: 'tf-equip', title: 'Test final UV1 : équipement électrique (Q41 à Q50)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°41 → 3 : Le démarreur.</b> Le démarreur, en tournant, produit une force contre-électromotrice qui s’oppose à la tension batterie.</li>
<li><b>Question N°42 → 1 : Assurent la continuité du circuit d’induit.</b> Balais et porte-balais assurent la continuité du circuit d’induit (contact avec le collecteur).</li>
<li><b>Question N°43 → 3 : Limiter la tension de sortie.</b> Le régulateur limite la tension de sortie de l’alternateur (en agissant sur l’excitation).</li>
<li><b>Question N°44 → 1 : Crée le champ magnétique.</b> Le rotor = inducteur : il crée le champ magnétique. Le stator (induit) est le siège de la f.é.m.</li>
<li><b>Question N°45 → 1 : Un étage d’entrée et un étage de sortie.</b> Calculateur multiplexé : étage d’entrée (capteurs) et étage de sortie (actionneurs), autour du microcontrôleur.</li>
<li><b>Question N°46 → 4 : C’est le courant maximum fourni pendant un temps donné.</b> Capacité (Ah) = courant maximal fourni pendant un temps donné.</li>
<li><b>Question N°47 → 3 : 6.</b> 12 V = 6 éléments de 2 V.</li>
<li><b>Question N°48 → 4 : A la puissance du démarreur.</b> La batterie est dimensionnée par rapport à la puissance du démarreur.</li>
<li><b>Question N°49 → 2 : 200 tr /min.</b> Un diesel doit être entraîné à environ 200 tr/min pour avoir une compression suffisante.</li>
<li><b>Question N°50 → 3 : L’inducteur.</b> Le courant d’excitation circule dans l’inducteur (rotor).</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-equip', fixed: true, num: true, a: 2, q: 'Question N°41 : Dans un circuit de démarrage la force contre-électromotrice c’est :', c: ['La batterie.', 'Le câble.', 'Le démarreur.', 'La masse.'], e: 'Le démarreur, en tournant, produit une force contre-électromotrice qui s’oppose à la tension batterie.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 0, q: 'Question N°42 : Sur le démarreur le porte-balais et les balais :', c: ['Assurent la continuité du circuit d’induit.', 'Créent le champ magnétique.', 'Transmettent le mouvement de rotation au lanceur.', 'Permet le centrage de l’induit.'], e: 'Balais et porte-balais assurent la continuité du circuit d’induit (contact avec le collecteur).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 2, q: 'Question N°43 : Le régulateur de l’alternateur permet de :', c: ['Limiter le courant de sortie.', 'Limiter la surchauffe.', 'Limiter la tension de sortie.', 'Réguler la vitesse de rotation.'], e: 'Le régulateur limite la tension de sortie de l’alternateur (en agissant sur l’excitation).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 0, q: 'Question N°44 : Le rotor ou inducteur de l’alternateur', c: ['Crée le champ magnétique.', 'Redresse le courant alternatif.', 'Permet le refroidissement.', 'Est le siège de la force électromotrice.'], e: 'Le rotor = inducteur : il crée le champ magnétique. Le stator (induit) est le siège de la f.é.m.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 0, q: 'Question N°45 : Le calculateur d’un réseau multiplexé possède :', c: ['Un étage d’entrée et un étage de sortie.', 'Une alimentation haute tension.', 'Une protection pour la batterie.', 'Gère le guidage du véhicule.'], e: 'Calculateur multiplexé : étage d’entrée (capteurs) et étage de sortie (actionneurs), autour du microcontrôleur.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 3, q: 'Question N°46 : La capacité d’une batterie :', c: ['C’est le courant maximum.', 'La valeur de protection du démarreur.', 'S’exprime en Ampère.', 'C’est le courant maximum fourni pendant un temps donné.'], e: 'Capacité (Ah) = courant maximal fourni pendant un temps donné.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 2, q: 'Question N°47 : Une batterie 12 volts est constituée de combien d’éléments ?', c: ['2.', '3.', '6.', '12.'], e: '12 V = 6 éléments de 2 V.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 3, q: 'Question N°48 : La batterie est dimensionnée par rapport :', c: ['À l’alternateur.', 'À la puissance du moteur.', 'Au type de carburant utilisé.', 'À la puissance du démarreur.'], e: 'La batterie est dimensionnée par rapport à la puissance du démarreur.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 1, q: 'Question N°49 : Sur une motorisation diesel le démarreur doit tourner à :', c: ['50 tr /min.', '200 tr /min.', '500 tr /min.', '1500 tr /min.'], e: 'Un diesel doit être entraîné à environ 200 tr/min pour avoir une compression suffisante.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-equip', fixed: true, num: true, a: 2, q: 'Question N°50 : Dans l’alternateur, le courant d’excitation est situé dans :', c: ['Le pont de diodes.', 'L’induit.', 'L’inducteur.', 'La batterie.'], e: 'Le courant d’excitation circule dans l’inducteur (rotor).', src: 'Sujet de préparation au test final UV1' },
  ]
});
REV.addExercises('mdf', {
  lessons: [
    {
      id: 'tf-mdf', title: 'Test final UV1 : manœuvre de force (Q51 à Q60)',
      html: `
<h3>Énoncé</h3>
<p>Sujet de préparation au <b>test final FS2 UV1</b> (domaine MOBTER, durée 2 h, 60 questions, 10 par matière). Questions et propositions <b>recopiées mot pour mot</b>, propositions numérotées <b>1 à 4</b> comme sur la copie. <b>Une seule bonne affirmation par question</b>. Barème : bonne réponse + 1, fausse − 0,5, pas de réponse 0.</p>
<h3>Correction détaillée question par question</h3>
<ol class="corr">
<li><b>Question N°51 → 4 : Non.</b> Le brin de manœuvre ne compte pas dans le nombre de brins : il n’applique pas d’effort sur le fardeau.</li>
<li><b>Question N°52 → 4 : Oui.</b> La sécurité doit être comprise entre 15 % et 70 % : 15 % est donc acceptable.</li>
<li><b>Question N°53 → 3 : Décimètre.</b> Ra = Cm × d², avec d en DÉCIMÈTRES.</li>
<li><b>Question N°54 → 3 : 1200 daN.</b> Rr = P × fr = 4 000 × 0,3 = 1 200 daN.</li>
<li><b>Question N°55 → 3 : 2333 daN.</b> Retournement sur sol plat : ΣR = 2/3 P = 2/3 × 3 500 = 2 333 daN (Fr et la pente ne servent pas).</li>
<li><b>Question N°56 → 2 : Non.</b> Mouflage simple : 5 brins maxi. Composé : on multiplie (3 × 2 = 6, 3 × 3 = 9). 7 est premier et > 5 : impossible.</li>
<li><b>Question N°57 → 4 : 1230 daN.</b> 2 ponts moteurs = tous les ponts moteurs → A = P × fa = 4 100 × 0,3 = 1 230 daN (FT ne sert pas au calcul de l’adhérence).</li>
<li><b>Question N°58 → 4 : 8.</b> Nb = 10 400 / 2 000 = 5,2 → arrondi 6 → 6 ≥ 4 donc + 2 brins → 8.</li>
<li><b>Question N°59 → 2 : 8 tonnes au m3.</b> Métal : 8 t/m³ (bois 1, roche 2,5).</li>
<li><b>Question N°60 → 4 : Enlever 10% à l’EMT.</b> Frottement des brins en sommet de pente : on retire 10 % à l’EMT.</li>
</ol>`,
      retenir: ['Barème + 1 / − 0,5 / 0 : dans le doute entre les 4, laisse vide.'],
      memo: { cle: 'UNE SEULE BONNE AFFIRMATION', points: ['60 questions, 2 h', '+1 / −0,5 / 0'], astuce: 'Élimine d’abord ce qui est sûrement faux.' }
    }
  ],
  questions: [
    { l: 'tf-mdf', fixed: true, num: true, a: 3, q: 'Question N°51 : Dans le cas d’une traction renversée, le Brin de Manœuvre est-il pris en compte dans le nombre de brins total de votre MDF ?', c: ['Peut-être.', 'Quelquefois.', 'Oui.', 'Non.'], e: 'Le brin de manœuvre ne compte pas dans le nombre de brins : il n’applique pas d’effort sur le fardeau.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 3, q: 'Question N°52 : La sécurité peut-elle être égale à 15 % ?', c: ['Cela dépend du fardeau.', 'Cela dépend du coefficient de frottement.', 'Non.', 'Oui.'], e: 'La sécurité doit être comprise entre 15 % et 70 % : 15 % est donc acceptable.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 2, q: 'Question N°53 : Pour calculer la résistance d’un arbre, le diamètre de l’arbre sera exprimé en :', c: ['Mètre.', 'Décamètre.', 'Décimètre.', 'Centimètre.'], e: 'Ra = Cm × d², avec d en DÉCIMÈTRES.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 2, q: 'Question N°54 : Calculez la résistance au roulement. Poids =4000 daN Fr=0.3', c: ['1.2 T.', '120 daN.', '1200 daN.', '1200 T.'], e: 'Rr = P × fr = 4 000 × 0,3 = 1 200 daN.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 2, q: 'Question N°55 : Calculez la somme des résistances d’un fardeau à retourner sur sol plat : Poids = 3.5 t Fr= 0.4 PM= 100 %', c: ['7000 daN.', '5250 daN.', '2333 daN.', '2333 %.'], e: 'Retournement sur sol plat : ΣR = 2/3 P = 2/3 × 3 500 = 2 333 daN (Fr et la pente ne servent pas).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 1, q: 'Question N°56 : Est-il possible de réaliser un mouflage à 7 brins ?', c: ['Oui.', 'Non.', 'Seulement avec une force au treuil.', 'Seulement avec une force au crochet.'], e: 'Mouflage simple : 5 brins maxi. Composé : on multiplie (3 × 2 = 6, 3 × 3 = 9). 7 est premier et > 5 : impossible.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 3, q: 'Question N°57 : Calculez l’Adhérence d’un véhicule équipé de 2 ponts moteur : Poids=4100 kg FT=2250 Fa=0.3', c: ['675 daN.', '1850 daN.', '1230 m.', '1230 daN.'], e: '2 ponts moteurs = tous les ponts moteurs → A = P × fa = 4 100 × 0,3 = 1 230 daN (FT ne sert pas au calcul de l’adhérence).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 3, q: 'Question N°58 : Calculez le nombre de brins final en fonction des éléments ci-dessous  : ∑ des résistances du fardeau= 10400 daN ; EMD=2000 daN', c: ['5.', '6.', '7.', '8.'], e: 'Nb = 10 400 / 2 000 = 5,2 → arrondi 6 → 6 ≥ 4 donc + 2 brins → 8.', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 1, q: 'Question N°59 : Vous devez dégager un conteneur métallique qui s’est couché sur la route. A quelle valeur doit-on se référer ?', c: ['15 tonnes au m3.', '8 tonnes au m3.', '2.5 tonnes au m3.', '1 tonne au m3.'], e: 'Métal : 8 t/m³ (bois 1, roche 2,5).', src: 'Sujet de préparation au test final UV1' },
    { l: 'tf-mdf', fixed: true, num: true, a: 3, q: 'Question N°60 : En cas de frottement des brins en sommet de pente (cas de fardeau dans un trou), faut-il ?', c: ['Faire appel à une grue.', 'Mettre une planche en bois afin de limiter les frottements.', 'Enlever 15% à l’EMT.', 'Enlever 10% à l’EMT.'], e: 'Frottement des brins en sommet de pente : on retire 10 % à l’EMT.', src: 'Sujet de préparation au test final UV1' },
  ]
});
