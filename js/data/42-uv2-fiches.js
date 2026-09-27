/* Fiches mémoire UV2 : une par matière, par thème, avec les schémas à connaître et les questions qui reviennent.
   Affichées sur #/uv2/fiche/<matière>. */
REV.uv2Fiches = {
  dsft: {
    intro: 'Géométrie du train, pneumatiques, freinage hydraulique, ABS et train épicycloïdal : les 11 premières questions de l’UV2.',
    blocs: [
      { t: 'Tableau ALFA : lire les tolérances', img: [['dsft/alfa-uv2.svg', 'Le tableau du dossier UV2'], ['dsft/var-tolerance.svg', 'Valeur constructeur ± tolérance']],
        html: '<div class="tw"><table><tr><th>Angle</th><th>Constructeur</th><th>Plage mini – maxi</th><th>G</th><th>D</th></tr><tr><td>Parallélisme</td><td>−1 ± 1 mm</td><td>−2 à 0 mm</td><td colspan="2">+1 mm ❌</td></tr><tr><td>Carrossage</td><td>−0°10′ ± 30′</td><td>−0°40′ à +0°20′</td><td>−0°09′ ✅</td><td>−1°10′ ❌</td></tr><tr><td>Chasse</td><td>3°20′ ± 30′</td><td>2°50′ à 3°50′</td><td>3°25′ ✅</td><td>3°30′ ✅</td></tr><tr><td>Pivot</td><td>10°30′ ± 30′</td><td>10°00′ à 11°00′</td><td>10°20′ ✅</td><td>11°35′ ❌</td></tr></table></div>',
        pts: ['1° = 60′ : écrire la plage mini–maxi AVANT de comparer.', 'Angle inclus = carrossage + pivot : bon (identique G/D) → triangle, berceau ou châssis ; pas bon → fusée, porte-fusée et/ou jambe de force.', 'Tire du côté du carrossage le plus positif (et de la chasse la plus faible).', 'Ordre de réglage : hauteur de caisse → carrossage → parallélisme (toujours en dernier).'],
        qr: [['Angles hors tolérance', 'parallélisme, carrossage droit, pivot droit'], ['Pièce à incriminer', 'un triangle (angle inclus G ≈ D)'], ['Le véhicule tire', 'à gauche (−0°09′ plus positif que −1°10′)'], ['Ordre de réglage', 'hauteur de caisse, carrossage, parallélisme']] },
      { t: 'Les angles du train avant', img: [['sym/agd27-p30-0.png', 'Parallélisme : ouverture (A > B)'], ['sym/agd27-p30-1.png', 'Parallélisme : pincement (A < B)'], ['sym/agd27-p34-1.png', 'Carrossage positif'], ['sym/agd27-p34-2.png', 'Carrossage négatif'], ['sym/agd27-p34-3.png', 'Inclinaison de pivot (vue de face)'], ['sym/agd27-p38-1.png', 'Chasse (vue de côté)'], ['sym/agd27-p37-1.png', 'Angle inclus = carrossage + pivot']],
        pts: ['Parallélisme vu de dessus : (−) ouverture, (+) pincement ; barre d’accouplement = valeur, barre de direction = répartition.', 'Carrossage vu de face ; pivot vu de face (toujours positif) ; chasse vue de côté = auto-stabilité de la direction.'],
        qr: [['Angle qui assure le retour en ligne droite', 'la chasse'], ['Angle de diagnostic, pas de réglage', 'l’angle inclus']] },
      { t: 'Lire l’usure des pneus', img: [['dsft/usure-rugueuse-int.svg', 'Rugueuse à l’intérieur = trop d’ouverture'], ['dsft/usure-rugueuse-ext.svg', 'Rugueuse à l’extérieur = trop de pincement'], ['dsft/usure-lisse-int.svg', 'Lisse à l’intérieur = carrossage trop négatif'], ['dsft/usure-lisse-ext.svg', 'Lisse à l’extérieur = carrossage trop positif'], ['dsft/usure-facettes.svg', 'Facettes = amortisseurs HS']],
        pts: ['RUGUEUSE (dents de scie) = PARALLÉLISME.', 'LISSE = CARROSSAGE.', 'FACETTES = AMORTISSEURS : changer amortisseurs ET pneus du même essieu.'],
        qr: [['Usure rugueuse intérieure, pneu AVG', 'parallélisme : trop d’ouverture'], ['Usure en facettes au train arrière d’un VLTT', 'pneus arrière + amortisseurs arrière']] },
      { t: 'Marquages des pneumatiques', img: [['dsft/pneu-225.svg', '225/40 R18 92 Y'], ['dsft/pneu-295.svg', 'Poids lourd : 152/148 = solo / jumelé'], ['dsft/pneu-1400.svg', '14.00 R20 : « 00 » = pneu carré'], ['dsft/pneu-dot4217.svg', 'DOT 4217 = 42ᵉ semaine 2017'], ['dsft/pneu-vcfd20.svg', 'V CFD 20 = recreusé à Clermont-Ferrand en 2020'], ['dsft/pneu-r18.svg', 'R18 = rechapé en 2018']],
        pts: ['Largeur / hauteur du flanc en % · R = radial · diamètre en pouces · indice de charge · indice de vitesse (la lettre).', 'V = recreusé · VV = 2ᵉ recreusage · R = rechapé · AR = armée.', 'Durée de vie d’un pneumatique : 20 ans (date de fabrication : DOT).'],
        qr: [['V CFD 20', 'recreusé à Clermont-Ferrand en 2020'], ['Lettre T dans « 185 70 R 15 86 T »', 'indice de vitesse']] },
      { t: 'Freinage hydraulique', img: [['livres/l-d048_0.jpg', 'Maître-cylindre tandem'], ['livres/l-d057_1.jpg', 'Mastervac au repos'], ['livres/l-d059_0.jpg', 'Double circuit (en II)'], ['livres/l-d070_0.jpg', 'Points d’ébullition du liquide de frein']],
        pts: ['Fuite interne (pédale qui s’enfonce, bocal bon, aucune trace) = maître-cylindre tandem.', 'Pédale dure = assistance ; roues AR qui bloquent = correcteur.', 'Liquide : > 185 °C bon · 165–185 °C correct (changer si > 2 ans) · < 165 °C à remplacer.'],
        qr: [['Fuite interne', 'maître-cylindre tandem'], ['Contrôle Mastervac', 'moteur arrêté, pomper → pédale dure et haute ; pied appuyé, démarrer → la pédale s’enfonce un peu puis se stabilise']] },
      { t: 'ABS', img: [['livres/l-d073_0.jpg', 'Composition du système ABS'], ['livres/l-d074_0.jpg', 'Capteur de roue'], ['livres/l-d076_0.jpg', 'Groupe hydraulique']],
        pts: ['Rôle : quelles que soient les conditions d’adhérence, améliorer la sécurité en optimisant stabilité, directibilité et efficacité.', 'L’ABS ne garantit pas une distance plus courte ; les pulsations de la pédale sont normales.', 'Capteur Hall : mesure jusqu’à 0 km/h ; inductif : perd le signal à très basse vitesse.'],
        qr: [['Rôle de l’ABS', 'stabilité, directibilité et efficacité, quelle que soit l’adhérence']] },
      { t: 'Train épicycloïdal (Willis)', img: [['dsft/train-c600-p-fixe.svg', 'Couronne menante, planétaire fixe'], ['dsft/willis-c600-p-fixe.svg', 'Méthode graphique : 400 tr/min, avant démultiplié'], ['dsft/willis-p1200-ps-fixe.svg', 'Porte-satellites fixe : marche arrière']],
        html: '<p class="center"><b>Zp × Np + Zc × Nc = (Zp + Zc) × Nps</b> — l’élément fixe vaut 0.</p>',
        pts: ['Porte-satellites MENÉ = démultiplié ; MENANT = multiplié ; FIXE = marche arrière.', 'Deux éléments liés = prise directe.'],
        qr: [['Couronne 600 tr/min (Zc 80), planétaire fixe (Zp 40)', 'porte-satellites 400 tr/min : avant démultiplié']] }
    ]
  },
  pneu: {
    intro: 'Le schéma « DSFT théorique » du dossier : repères, VCR, mains d’accouplement, remplissage (questions 12 à 18).',
    blocs: [
      { t: 'Le schéma théorique du dossier', img: [['dsft/schema-pneu-theorique.jpg', 'Schéma DSFT théorique (sujet UV2)']],
        pts: ['7 = clapet anti-retour : garde la pression en cas de fuite en amont.', '13 = VNAE (valve de non-addition des efforts).', '17 = valve de barrage à retour partiel (priorité de remplissage).', '12 = têtes d’accouplement : rouge = automatique, jaune = directe.'],
        qr: [['Élément 17', 'valve de barrage à retour partiel'], ['Élément 13', 'valve de non addition des efforts (VNAE)'], ['Rôle de l’élément 7 (circuit parc)', 'garder la pression si fuite en amont']] },
      { t: 'Repères et codes couleur', img: [['livres/l-p011_0.jpg', 'Code chiffré des orifices'], ['sym/agb03r-p71-15.png', 'Valve relais simple pilotage : 1, 2, 3, 4']],
        pts: ['1 = alimentation · 2 = utilisation · 3 = échappement · 4 = pilotage (41, 42, 43…).', '43 = pilotage par absence d’air (frein de parc).', 'Trait plein = pression constante ; tirets = pression délivrée ; alterné jaune = pilotage.'] },
      { t: 'Production et stockage de l’air', img: [['livres/l-p013_0.jpg', 'Compresseur'], ['livres/l-p021_0.jpg', 'Dessiccateur : phase de dessiccation'], ['livres/l-p015_0.jpg', 'Valve de protection 4 circuits']],
        pts: ['Compresseur → régulateur → dessiccateur → valve de protection → réservoirs.', 'Dessiccateur : air sec, plus besoin d’antigel.', 'Valve de protection : isole un circuit défaillant.'],
        qr: [['Temps de remplissage (norme européenne, ralenti)', '6 à 11 minutes'], ['Temps de réponse', '0,6 seconde']] },
      { t: 'Frein de parc : Tristop et VNAE', img: [['sym/agb03r-p72-07.png', 'Cylindre Tristop'], ['sym/agb03r-p71-23.png', 'VNAE (valve relais double pilotage)'], ['livres/l-p048_1.jpg', 'Robinet de frein de parc']],
        pts: ['Tristop : l’air DÉFREINE, le ressort FREINE (sécurité si l’air disparaît).', 'VNAE : ne pas additionner l’effort de service et celui du ressort.', 'Stationnement : 18 % véhicule seul, 12 % ensemble routier.'] },
      { t: 'Commande de la remorque : VCR et VRU', img: [['livres/l-p045_0.jpg', 'VCR à triple pilotage avec rupture'], ['sym/agb03r-p71-22.png', 'Symbole VCR triple pilotage avec rupture'], ['sym/agb03r-p71-26.png', 'VRU (sur la remorque)']],
        pts: ['Rouge = automatique = alimentation ; jaune = directe = commande.', 'Rupture : le conducteur freine ET fuite sur la directe → l’automatique chute → la VRU freine la remorque.', 'Air permanent à la main directe : frein de parc serré, frein d’alignement, pilotage 43, VCR grippée — jamais le correcteur.'],
        qr: [['Contrôle de la rupture', 'manomètre sur la main AUTOMATIQUE, fuite sur la main DIRECTE → 0 bar'], ['« Mauvaise affirmation » pour l’air permanent à la directe', 'mauvais réglage du correcteur'], ['4 roues restent freinées', 'le circuit frein de parc (même circuit que la remorque)']] }
    ]
  },
  hydro: {
    intro: 'Diagnostic en circuit ouvert Load-Sensing, symboles de débit et de pression, transmission hydrostatique (questions 19 à 30).',
    blocs: [
      { t: 'La méthode de diagnostic', img: [['pelle-emad1.jpg', 'Pelle EMAD 1 : tiroir LS 27 b, annulation 240 b, secours 280 b, balances 10 b']],
        html: '<div class="tw"><table><tr><th>Question</th><th>Réponse → où chercher</th></tr><tr><td>Vitesse ou force ?</td><td>Vitesse = <b>débit</b> · force = <b>pression</b> · moteur qui cale = <b>puissance</b></td></tr><tr><td>Combien de récepteurs ?</td><td>Tous → appareil commun · un seul → appareil de sa section</td></tr><tr><td>Combien de sens ?</td><td>2 sens → en amont du distributeur (balance) · 1 sens → sur une ligne (limiteur secondaire)</td></tr></table></div>',
        qr: [['Vérins de verrouillage : sortent, ne rentrent plus', 'force, 2 récepteurs, 1 sens → limiteur secondaire'], ['Réactions brusques, 290 b en butée', 'annulation de débit'], ['Télescope qui accélère en combiné', 'balance individuelle (vitesse, 1 récepteur, 2 sens)'], ['Pression au neutre', '27 bar (tarage du tiroir LS)']] },
      { t: 'Load-Sensing : qui fait quoi', img: [['hydro-ls-centre-ferme.jpg', 'Circuit LS centre fermé colorié']],
        pts: ['Tiroir LS : pompe = pression LS maxi + marge ; au neutre, pression de veille = tarage du tiroir.', 'Annulation de débit : pression maxi de service + débit nul en butée (plus de puissance de coin).', 'Balance individuelle + distributeur = régulateur 2 voies : vitesse constante en simultané.', 'Limiteur de secours / anti-choc taré au-dessus de l’annulation.'] },
      { t: 'Symboles de débit et de pression', img: [['uv2-q23.png', 'Balance EN SÉRIE avant un étrangleur = régulateur de débit 2 voies (B)'], ['uv2-q24.png', 'Réducteur de pression (B)'], ['uv2-q25.png', 'Rôle : réduire la pression d’entrée au tarage du ressort'], ['sym/agd20-p020-0.png', 'Régulateur de débit 3 voies'], ['sym/agd19-p109-0.png', 'Réducteur de pression 3 voies']],
        pts: ['Limiteur : fermé au repos, pilotage AMONT. Réducteur : ouvert au repos, pilotage AVAL.', 'Régulateur 3 voies : l’excédent part à la bâche → moins de pertes que le 2 voies.', 'Réducteur 3 voies : retour bâche → protège le circuit aval.'] },
      { t: 'Transmission hydrostatique (circuit fermé)', img: [['transmission-hydrostatique.jpg', 'Schéma du dossier : gavage 30 b, balayage 27 b, annulation 320 b, soupapes HP 360 b'], ['exo-hydro-ferme-schema.jpg', 'Chargeuse compacte : repères de mesure']],
        pts: ['Neutre : BP = limiteur de gavage (30 b).', 'En marche : BP = limiteur de balayage (27 b), taré PLUS BAS que le gavage pour renouveler l’huile.', 'Pression de service maxi = annulation de débit (320 b) ; soupapes HP (360 b) = chocs.', 'Valve DA (3) : avancement selon le régime du moteur thermique.', 'Moteur à régulation de puissance : cylindrée adaptée à la charge.'],
        qr: [['BP (verte) de la boucle', '27 bar'], ['Service maxi (rouge)', '320 bar'], ['Rôle du composant 4', 'pression de la BP au neutre'], ['Rôle du composant 3', 'déplacement selon le régime du moteur thermique']] },
      { t: 'Les formules', img: [['sym/gd08-p17-367.png', 'Pompe'], ['sym/agd19-p081-2.png', 'Vérin double effet']],
        html: '<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Unités</th></tr><tr><td>Débit pompe</td><td>Q = V × N / 1000</td><td>L/min, cm³/tr, tr/min</td></tr><tr><td>Vitesse vérin</td><td>v = Q / (6 × S)</td><td>m/s, L/min, cm²</td></tr><tr><td>Pression</td><td>P = F / S</td><td>bar, daN, cm²</td></tr><tr><td>Puissance</td><td>Pu = P × Q / 600</td><td>kW, bar, L/min</td></tr></table></div>' }
    ]
  },
  moteur: {
    intro: 'Common rail Bosch et Delphi, capteurs, dépollution et carburant (questions 31 à 40).',
    blocs: [
      { t: 'Bosch ou Delphi : qui règle la haute pression ?', img: [['gd22/g143_0.jpg', 'Common rail Bosch'], ['gd22/g157_0.jpg', 'Common rail Delphi'], ['gd22/g166_0.jpg', 'Régulateur de débit IMV (Delphi)']],
        html: '<div class="tw"><table><tr><th>Système</th><th>Monter la HP</th><th>Faire chuter la HP</th></tr><tr><td>Bosch 1ʳᵉ génération</td><td>Régulateur de haute pression</td><td>Ouverture du régulateur HP</td></tr><tr><td>Bosch 2ᵉ / 3ᵉ gén.</td><td>Régulateur de débit (+ HP en 3ᵉ)</td><td>Fermeture du régulateur de débit</td></tr><tr><td>Delphi</td><td>Régulateur de débit (IMV)</td><td>Retours des injecteurs (impulsions courtes)</td></tr></table></div>',
        pts: ['Delphi n’a PAS de régulateur haute pression.', 'IMV normalement ouvert : plus de courant = moins de débit.'],
        qr: [['Monter la HP, Bosch 1ʳᵉ gén.', 'régulateur de haute pression'], ['Monter la HP, Delphi', 'régulateur de débit'], ['Chuter la HP en décélération, Delphi', 'retours des injecteurs']] },
      { t: 'Injection et injecteurs', img: [['gd22/g154_0.jpg', 'Débit injecté : temps d’impulsion et pression de rampe'], ['gd22/g155_0.jpg', 'Pré-injection puis injection principale'], ['gd22/g165_0.jpg', 'Courant d’appel puis de maintien'], ['gd22/g162_0.jpg', 'Injecteur Delphi et son code C2I']],
        pts: ['Débit = temps d’ouverture + pression de rampe + sections des trous.', 'Pré-injection : chauffer la chambre, moins de bruit et de HC ; supprimée au-delà de 2 000 tr/min.', 'Électromagnétique ≈ 0,5 Ω ; piézo ≈ 200 kΩ.', 'Accéléromètre Delphi : recale la pré-injection périodiquement.'],
        qr: [['Augmenter le débit (Bosch 1ʳᵉ gén.)', 'temps d’ouverture de l’injecteur et haute pression'], ['Rôle de l’accéléromètre Delphi', 'modifier le débit de pré-injection périodiquement']] },
      { t: 'Capteurs et diagnostic', img: [['gd22/g136_0.jpg', 'Capteur de régime / PMH (inductif)'], ['gd22/g136_1.jpg', 'Capteur de phase (effet Hall)'], ['gd22/g137_1.jpg', 'Capteur de haute pression de rampe'], ['diag-delphi-dfp1.jpg', 'Logigramme Delphi : le moteur ne démarre pas']],
        pts: ['Capteur PMH : régime + PMH des cylindres 1 et 4 (60 − 2 dents).', 'Capteur de phase : 1ᵉʳ cylindre en compression ; HS = le moteur ne démarre pas.', 'Capteur HP : 0,5 V contact mis ; 1 à 1,5 V au démarreur = HP bonne.', 'La pompe HP se change en dernier.'],
        qr: [['Capteur de point mort haut', 'PMH du 1ᵉʳ et du 4ᵉ cylindre'], ['Rôle de la pré-pompe', 'alimenter la pompe d’alimentation au démarrage']] },
      { t: 'Dépollution', img: [['gd22/g140_1.jpg', 'Électrovanne de recyclage des gaz (EGR)']],
        html: '<div class="tw"><table><tr><th>Organe</th><th>Rôle</th></tr><tr><td>Filtre à particules</td><td>Filtrer et brûler les suies (≈ 550 °C)</td></tr><tr><td>Catalyseur</td><td>Réduire les NOx, HC et CO</td></tr><tr><td>EGR</td><td>Moins de NOx (température de combustion plus basse)</td></tr><tr><td>SCR (AdBlue)</td><td>Réduire les NOx (≥ 180 °C au catalyseur)</td></tr></table></div>',
        qr: [['Rôle du FAP', 'filtrer et brûler les particules de suie'], ['Rôle du catalyseur', 'réduire les NOx, HC et CO']] },
      { t: 'Carburant et suralimentation', img: [['gd22/g124_0.jpg', 'Wastegate'], ['gd22/g122_1.jpg', 'Géométrie variable : bas régime'], ['gd22/g125_0.jpg', 'Intercooler']],
        pts: ['Cétane ≥ 51 ; en dessous : cognements, démarrage difficile, fumées.', 'Froid : point de trouble → TLF → point d’écoulement.', 'Wastegate = limite la pression d’admission ; intercooler = air plus dense.'],
        qr: [['Cétane inférieur à 51', 'des cognements']] }
    ]
  },
  equip: {
    intro: 'Démarreur, batteries, alternateurs, multiplexage CAN et capteurs (questions 41 à 52).',
    blocs: [
      { t: 'Le démarreur', img: [['fiches/eq-demarreur.jpg', 'Schéma du démarreur (bobines d’appel et de maintien, +DEM, induit, inducteur)'], ['aga01/dem-schema-principe.jpg', 'Schéma de principe : appel, maintien, contact de puissance'], ['aga01/dem-solenoide.jpg', 'Solénoïde : plongeur, appel, maintien'], ['aga01/dem-coupe.jpg', 'Démarreur en coupe']],
        pts: ['Moteur du démarreur < 1 Ω.', 'Appel : EXC ↔ +DEM, faible résistance ; maintien : EXC ↔ masse, ≈ 2 × l’appel.', 'Appel coupé = rien ne se passe ; maintien coupé = colle par intermittence (mitraillette).'],
        qr: [['Résistance du moteur de démarreur', '< 1 Ω'], ['Enroulement de maintien coupé', 'le solénoïde colle par intermittence']] },
      { t: 'Démarrage lent : batteries ou lignes ?', img: [['aga01/dem-circuit.jpg', 'Circuit de démarrage'], ['aga01/bat-description.jpg', 'Batterie : éléments, plaques, bornes']],
        html: '<div class="tw"><table><tr><th>Mesure</th><th>Conclusion</th></tr><tr><td>12 V : 12,2 V au repos, 9,2 V au démarrage</td><td>Recharger d’abord (12,2 V ≈ 50 %)</td></tr><tr><td>24 V : 24,5 V au repos, 18,6 V au démarrage</td><td>Batteries déchargées (18,6 V &lt; 19,2 V)</td></tr><tr><td>Plus de 1 V entre batterie et +BAT démarreur</td><td>Perte en ligne sur le câble +</td></tr></table></div>',
        pts: ['Minimum au lancement : 9,6 V (12 V) · 19,2 V (24 V).', 'Recharge : C/10 pendant 10 h ; essai d’aptitude : 3 × C, 15 s, 3 fois, > 9 V au 3ᵉ.'] },
      { t: 'Les alternateurs : 6, 9 ou 12 diodes', img: [['fiches/eq-alt-6d.jpg', '6 diodes = 2 bornes'], ['fiches/eq-alt-9d.jpg', '9 diodes = 1 borne (3 diodes trio)'], ['aga01/alt-9d.jpg', '9 diodes : pré-excitation par la lampe (borne L)'], ['aga01/alt-6d-regulateur-incorpore.jpg', '6 diodes à régulateur incorporé : bornes L et +'], ['aga01/alt-regulation.jpg', 'Régulation : 13,5 V < U < 15 V']],
        pts: ['1 borne L = 9 diodes ; 2 bornes L et + = 6 ou 12 diodes.', 'Lampe HS : 9 diodes = ne débite plus ; 6 diodes = aucune conséquence.', 'Surtension (17 V en 12 V) = régulateur.', 'Témoin éteint contact mis (9 diodes) = inducteur (ou régulateur).'],
        qr: [['9 diodes, lampe HS', 'l’alternateur ne débitera pas'], ['6 diodes rég. incorporé, lampe HS', 'aucune conséquence sur la charge'], ['17 V moteur tournant (12 V)', 'le régulateur'], ['Lampe éteinte contact mis (9 diodes)', 'l’inducteur']] },
      { t: 'Multiplexage CAN', img: [['fiches/eq-can-double-boucle.jpg', 'Réseau double boucle : CAN HS / CAN LS / passerelle'], ['can-support-transmission.jpg', 'Paire torsadée et résistances de terminaison 120 Ω'], ['can-niveaux.jpg', 'Récessif 2,5 / 2,5 V · dominant 3,5 / 1,5 V'], ['calculateur-schema-bloc.jpg', 'Calculateur : étage d’entrée, micro-ordinateur, étage de sortie']],
        pts: ['Terminaison : 2 × 120 Ω → 60 Ω mesurés.', 'Fils torsadés = contre les perturbations extérieures.', 'Les capteurs arrivent sur l’étage d’entrée.', 'Binaire : 8 = 1000 ; 13 = 1101.'],
        qr: [['Élément qui reçoit les capteurs', 'l’étage d’entrée'], ['Décimal 8 en binaire', '1000'], ['Résistance de terminaison', '120 Ω'], ['Pourquoi torsadés', 'perturbations électromagnétiques extérieures']] },
      { t: 'Capteurs et actionneurs', img: [['aga01/cap-inductif.jpg', 'Capteur inductif'], ['aga01/cap-effet-hall.jpg', 'Effet Hall'], ['gd22/g165_0.jpg', 'Commande d’un injecteur (actionneur)']],
        pts: ['Inductif = actif : sinusoïde, fréquence et amplitude variables.', 'Effet Hall = passif (5 V) : carré d’amplitude fixe.', 'RCO : le multimètre lit la moyenne (75 % de 12 V = 9 V).'] }
    ]
  },
  elec: {
    intro: 'Transistor NPN et relais, lois des nœuds et des mailles, triphasé, alternatif, portes logiques et diodes (questions 53 à 64).',
    blocs: [
      { t: 'Transistor NPN qui commande un relais', img: [['elec/transistor-relais.svg', 'Commande d’un relais par un transistor NPN']],
        html: '<div class="tw"><table><tr><th>On cherche</th><th>Formule</th><th>Exemple du dossier</th></tr><tr><td>RK1 (bobine)</td><td>RK1 = Ualim / Ic (saturé, Vce = 0)</td><td>24 / 0,2 = 120 Ω</td></tr><tr><td>Ib</td><td>Ib = Ic / β</td><td>200 / 100 = 2 mA</td></tr><tr><td>UR1</td><td>UR1 = Ucommande − Vbe</td><td>5 − 0,6 = 4,4 V</td></tr><tr><td>R2</td><td>R2 = Vbe / IR2</td><td>0,6 / 0,02 = 30 Ω</td></tr><tr><td>IR1</td><td>IR1 = Ib + IR2 (loi des nœuds)</td><td>2 + 20 = 22 mA</td></tr></table></div>',
        pts: ['Saturé = interrupteur fermé (Vce ≈ 0) ; bloqué (Ib = 0) = interrupteur ouvert.', 'Toujours convertir les mA en A avant la loi d’Ohm.'] },
      { t: 'Lois des nœuds et des mailles', img: [['elec/noeud.svg', 'Loi des nœuds'], ['elec/maille.svg', 'Loi des mailles']],
        pts: ['Nœud : somme des courants qui entrent = somme des courants qui sortent.', 'Maille : Ug = somme des tensions des récepteurs.', 'Loi d’Ohm : U = R × I.'] },
      { t: 'Alternatif et triphasé', img: [['elec/sinus.svg', 'Tension sinusoïdale'], ['elec/triphase.svg', 'Tension simple V et tension composée U']],
        pts: ['Ueff = Umax / √2 (√2 = 1,414).', 'f = 1 / T (T en secondes).', 'U (entre phases) = V (phase-neutre) × √3 (√3 = 1,732).'],
        qr: [['220 V entre phases → voyant phase-neutre', '127 V'], ['Umax 220 V → Ueff', '155 V'], ['T = 40 ms → f', '25 Hz']] },
      { t: 'Portes logiques', img: [['logique-portes.jpg', 'Les portes vues en cours'], ['elec/porte-et-3.svg', 'Porte ET à 3 entrées'], ['elec/porte-ou-2.svg', 'Porte OU']],
        pts: ['ET : S = 1 seulement si toutes les entrées sont à 1 (série).', 'OU : une entrée à 1 suffit (parallèle).', 'Rond en sortie = inversion (ET NON, OU NON).', 'Nombre de combinaisons = 2ⁿ (6 entrées → 64).'],
        qr: [['Porte ET à 6 entrées', '64 combinaisons']] },
      { t: 'Diodes et ponts', img: [['elec/diodes-lampes.svg', 'Diode passante / bloquée'], ['cah/r18.png', 'Pont de Graëtz (4 diodes)'], ['cah/r19.png', 'Pont triphasé (6 diodes)'], ['elec-q20-zener.png', 'Zéner qui stabilise la tension']],
        pts: ['Diode passante de l’anode vers la cathode (≈ 0,6 V).', 'Zéner en inverse : garde sa tension VZ.', 'Pont de Graëtz = 4 diodes ; pont triphasé = 6 diodes.'] }
    ]
  }
};
