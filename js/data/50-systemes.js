/* Aides-mémoires « systèmes » : pour chaque système, son rôle, ses phases de fonctionnement,
   puis les pannes : symptôme → diagnostic (quoi contrôler, valeur attendue) → action (remplacer, réparer, régler…).
   Tout est repris des leçons du site (cours, fiches, corrigés). Affiché en tête de #/memos/<matière>.
   Actions : R = remplacer · P = réparer · G = régler · N = recharger / nettoyer / purger · C = contrôler plus loin. */
REV.systemes = {
  equip: [
    { t: 'La batterie', img: [['aga01/bat-description.jpg', 'Constitution de la batterie'], ['aga01/bat-pese-acide.jpg', 'Densité au pèse-acide']],
      role: 'Stocker l’énergie sous forme chimique et la rendre sous forme électrique : démarrage, alimentation moteur arrêté.',
      phases: [['Au repos', '2,1 V par élément : 12,6 V (12 V) · 25,2 V (24 V).'], ['Décharge', 'La réaction chimique fournit le courant ; sulfatation normale des plaques.'], ['Démarrage', 'La tension peut descendre à 1,6 V par élément : 9,6 V (12 V) · 19,2 V (24 V), pas moins.'], ['Charge', 'Courant continu, + sur + ; 1/10 de la capacité (75 Ah → 7,5 A pendant 10 h). La sulfatation normale disparaît.']],
      pannes: [
        ['Démarrage lent, 12,2 V au repos', 'Batterie chargée entre 20 et 60 %', 'Recharger, puis essai d’aptitude au démarrage (3 × C pendant 15 s, 3 fois : > 9 V au 3ᵉ essai en 12 V)', 'N'],
        ['Tension qui s’effondre à l’essai d’aptitude (< 9 V)', 'Batterie usagée ou court-circuit interne', 'Remplacer la batterie ; contrôler aussi le circuit de charge', 'R'],
        ['Plaques claires, gonflement, décharge rapide, sels sur les bornes', 'Sulfatation anormale (repos prolongé déchargée, charge incomplète, niveau bas)', 'Remplacer la batterie', 'R'],
        ['Tension d’élément faible, sels grimpants', 'Court-circuit interne (matière active tombée)', 'Remplacer la batterie', 'R'],
        ['Batterie chaude, dégagement gazeux, fortes chutes de tension', 'Corrosion des grilles positives : surcharge', 'Remplacer la batterie ET contrôler le régulateur (surcharge)', 'R'],
        ['Batterie vide après quelques jours à l’arrêt', 'Courant de fuite contact coupé à la pince : doit être < 30 mA', 'Trouver et réparer le consommateur en cause', 'P'],
        ['Bornes blanches (sulfatées)', 'Contrôle visuel', 'Brosse métallique, serrer, graisse conductrice', 'N']] },
    { t: 'Le démarreur', img: [['fiches/eq-demarreur.jpg', 'Démarreur et solénoïde'], ['aga01/dem-schema-principe.jpg', 'Schéma de principe : bobines d’appel et de maintien']],
      role: 'Lancer le moteur thermique (≈ 200 tr/min en diesel) pour obtenir les premières combustions.',
      phases: [['1. Clé sur démarrage', 'Le + arrive à EXC : bobine d’appel (en série avec le moteur) et bobine de maintien alimentées ; le noyau est attiré.'], ['2. Engrènement', 'Le noyau pousse la fourchette : le pignon du lanceur engrène sur la couronne.'], ['3. Contact de puissance', 'En fin de course, le noyau ferme le contacteur : plein courant au moteur électrique. La bobine d’appel est court-circuitée, seule la bobine de maintien tient le noyau.'], ['4. Moteur démarré', 'Le lanceur (roue libre) empêche le moteur thermique d’entraîner le démarreur.'], ['5. Clé relâchée', 'Le ressort ramène le noyau, le frein d’induit arrête la rotation.']],
      pannes: [
        ['Rien ne se passe à la clé', 'Bobine d’appel coupée (entre EXC et +DEM) ou contacteur électromagnétique', 'Remplacer le solénoïde', 'R'],
        ['Bruit de « mitraillette », le moteur ne tourne pas', 'Bobine de maintien coupée (entre EXC et la masse) ou batterie faible', 'Contrôler la batterie, puis remplacer le solénoïde', 'R'],
        ['24 V : batteries sous 19,2 V pendant le lancement (ex. 18 V)', 'Batteries en cause', 'Recharger ou remplacer les batteries', 'N'],
        ['24 V : batteries au-dessus de 19,2 V (ex. 22 V) mais démarreur qui peine', 'Contrôler d’abord la résistance mécanique du moteur thermique', 'Remplacer le démarreur', 'R'],
        ['25,3 V aux batteries, 24 V au +BAT du démarreur', 'Perte en ligne sur le câble + (chute > 1 V)', 'Réparer le câble ou les connexions', 'P'],
        ['Moteur électrique à 7 Ω (doit être < 1 Ω)', 'Contrôle à l’ohmmètre', 'Remplacer le moteur électrique / le démarreur', 'R'],
        ['Démarreur qui ne réagit pas', 'Balais : usure maxi 60 %, ni gras ni humides', 'Remplacer les balais', 'R'],
        ['Induit : la lame de scie vibre sur le grognard', 'Court-circuit de l’induit', 'Remplacer l’induit', 'R']],
      methode: ['Tension batterie à vide (recharger si basse)', 'Tension aux batteries pendant le lancement', 'Chute de tension ligne + puis ligne − pendant le lancement', 'Essai d’intensité au démarrage'] },
    { t: 'L’alternateur et le régulateur', img: [['fiches/eq-alt-9d.jpg', 'Alternateur 9 diodes'], ['fiches/eq-alt-6d.jpg', 'Alternateur 6 diodes à régulateur incorporé'], ['equip/alt-6d-12d.svg', '6 diodes et 12 diodes']],
      role: 'Produire le courant qui alimente les récepteurs et recharge la batterie moteur tournant.',
      phases: [['1. Contact mis', 'Pré-excitation par la lampe témoin (9 diodes) : 2 à 3 V sur L ou D+, le témoin s’allume.'], ['2. Moteur tournant', 'Le rotor (inducteur) crée un champ tournant, le stator (induit) produit du courant triphasé.'], ['3. Redressement', 'Pont de 6 diodes (2 par phase) : courant presque continu. 12 diodes : moins d’ondulation, plus de courant.'], ['4. Excitation', '9 diodes : les 3 diodes trio alimentent l’inducteur et éteignent le témoin.'], ['5. Régulation', 'Le régulateur mesure U, la compare (13,5 à 15 V en 12 V) et dose le courant d’excitation.']],
      pannes: [
        ['Surcharge / surtension', 'Régulateur HS (1 diode trio HS peut aussi donner une surtension)', 'Remplacer le régulateur', 'R'],
        ['9 diodes : plus de charge, la batterie se décharge dans l’induit', '2 ou 3 diodes trio HS : sous-tension', 'Remplacer le pont / les diodes trio', 'R'],
        ['9 diodes : témoin qui ne s’allume pas, plus de charge', 'Régulateur non alimenté (pré-excitation absente)', 'Dépannage : shunter +BAT vers +L ; réparer la ligne ou la lampe', 'P'],
        ['6 diodes : +BAT du régulateur débranché', 'Le régulateur ne fonctionne plus (sans le témoin +L il fonctionne)', 'Rebrancher / réparer la ligne +BAT', 'P'],
        ['Rotor ou stator suspect', 'Ohmmètre : isolement (∞ par rapport à la masse), coupure, court-circuit', 'Remplacer le rotor ou le stator', 'R'],
        ['Alternateur LIN : tension fixe 13,2 V', 'Bus LIN coupé : mode secours', 'Réparer le bus LIN (contrôle à l’oscilloscope)', 'P']] },
    { t: 'Les capteurs', img: [['fiches/cap-inductif-slide.jpg', 'Capteur inductif (actif)'], ['fiches/cap-hall-slide.jpg', 'Capteur à effet Hall (passif)'], ['fiches/eq-cap-passif.jpg', 'Capteur passif : alimentation, signal, masse']],
      role: 'Informer le calculateur qui commande ensuite les actionneurs.',
      phases: [['Actif', 'Il fabrique sa tension (inductif, piézo-électrique) : 2 fils, pas d’alimentation.'], ['Passif', 'Alimenté en 5 V par le calculateur (CTN, CTP, potentiomètre, capacitif, piézo-résistif, Hall) : 3 fils.'], ['Signal', 'Inductif : sinusoïde (fréquence et amplitude variables) · Hall : carré d’amplitude fixe.']],
      pannes: [
        ['Pas de signal d’un capteur passif', 'Contrôler alimentation 5 V et masse ; signal ≈ 4,80 V capteur débranché (pull-up)', 'Ordre : capteur → connecteur → faisceau ; réparer le faisceau ou remplacer le capteur', 'P'],
        ['Capteur inductif suspect', 'Résistance 100 à 2 000 Ω + isolement ; branché : voltmètre en alternatif', 'Remplacer le capteur', 'R'],
        ['CTN suspecte', 'En chauffant : la résistance ET la tension doivent baisser', 'Remplacer la CTN', 'R'],
        ['Voyant ABS après changement des plaquettes AR', 'Capteur, faisceau ou cible abîmé ou mal remonté', 'Reposer correctement ou remplacer', 'P']] },
    { t: 'Le réseau CAN HS', img: [['fiches/can-hs-lecture-trame.jpg', 'Niveaux NL0 / NL1'], ['fiches/can-hs-diag-resistance.jpg', 'Résistance du bus : 60 Ω'], ['fiches/can-hs-diag-h.jpg', 'Tension CAN H : 2,6 V']],
      role: 'Faire circuler toutes les informations entre calculateurs sur une paire torsadée CAN H / CAN L.',
      phases: [['Récessif (bit 1)', 'CAN H = CAN L = 2,5 V : écart 0 V.'], ['Dominant (bit 0)', 'CAN H 3,5 V · CAN L 1,5 V : écart 2 V. Il s’impose si deux nœuds émettent.'], ['Lecture', 'L’interface fait H − L et amplifie × 2,5 ; H + L = 5 V toujours.'], ['Au voltmètre (OBD)', 'Le voltmètre lit une moyenne : CAN H 2,4 à 3,2 V · CAN L 1,8 à 2,6 V · H − L 0,5 à 0,9 V. Les 3,5 / 2,5 / 1,5 V ne se voient qu’à l’oscilloscope.']],
      pannes: [
        ['120 Ω entre 6 et 14 (hors tension)', 'Fil coupé, résistance de terminaison HS (parfois dans un calculateur)', 'Réparer le faisceau ou remplacer l’élément de terminaison', 'P'],
        ['≈ 0 Ω entre 6 et 14', 'CAN H et CAN L en court-circuit', 'Réparer le faisceau', 'P'],
        ['Tension 14-6 ≥ 1 V (normal 0,5 à 0,9 V)', 'Réseau saturé : interface de ligne', 'Débrancher les calculateurs un par un jusqu’à retrouver 0,5 V ; remplacer le calculateur en cause', 'R'],
        ['CAN H hors 2,4-3,2 V ou CAN L hors 1,8-2,6 V', 'Interface de ligne H ou L HS', 'Remplacer le calculateur en cause', 'R']],
      methode: ['Architecture du réseau', 'Outil de diagnostic', 'Point commun des réseaux', 'Plage de fonctionnement', 'Débrancher les calculateurs un par un'] }
  ],

  moteur: [
    { t: 'Le graissage', img: [['gd21/m072_2.jpg', 'Circuit de graissage sous pression'], ['gd21/m070_1.jpg', 'Pompe à engrenages'], ['gd21/m074_1.jpg', 'Manocontact et lampe']],
      role: 'Réduire frottements et usure, refroidir, nettoyer, protéger de la corrosion, participer à l’étanchéité.',
      phases: [['1. Aspiration', 'La pompe (engrenages, rotor ou palettes) aspire l’huile du carter à travers la crépine.'], ['2. Limitation', 'Le limiteur de pression protège pompe et circuit (4 à 8 bar en diesel).'], ['3. Filtration', 'Filtre en série (clapet de by-pass si colmaté) ou en dérivation.'], ['4. Distribution', 'Rampe principale → tourillons → manetons, arbre à cames, culbuteurs.'], ['5. Surveillance', 'Manocontact → voyant si pression insuffisante.']],
      pannes: [
        ['Voyant de pression d’huile allumé', 'Pression insuffisante', 'Arrêter immédiatement le moteur, puis chercher la cause', 'C'],
        ['Défaut de pression', 'Entraînement de pompe, crépine colmatée, fuites', 'Réparer l’entraînement, nettoyer la crépine, supprimer les fuites', 'P'],
        ['Consommation d’huile', 'Joints de queue de soupape, joint de culasse, segmentation', 'Remplacer les pièces en cause', 'R']] },
    { t: 'Le refroidissement', img: [['gd21/m082_0.jpg', 'Circuit sous pression'], ['gd21/m079_1.jpg', 'Thermostat'], ['gd21/m084_0.jpg', 'Bouchon : clapets de pression et de dépression']],
      role: 'Évacuer les calories en trop tout en gardant la bonne température de fonctionnement.',
      phases: [['À froid', 'Thermostat fermé : pas de circulation vers le radiateur (double effet : bloc ↔ culasse par le by-pass) → montée rapide en température.'], ['À chaud', 'Thermostat ouvert : le liquide passe dans le radiateur ; le vase d’expansion se remplit.'], ['Sous pression', '1,8 bar ≈ ébullition à 115 °C ; le bouchon limite la pression (0,8 à 1,2 bar).'], ['À l’arrêt', 'Le liquide retourne au radiateur ; le clapet de dépression (0,05 bar) laisse entrer l’air.']],
      pannes: [
        ['Consommation de liquide', 'Joint de culasse, joints de chemises humides, durites, pastilles de dessablage', 'Remplacer l’élément qui fuit', 'R']] },
    { t: 'Le common rail (moteur qui ne démarre pas)', img: [['gd22/g143_0.jpg', 'Common rail Bosch'], ['diag-delphi-dfp1.jpg', 'Logigramme Delphi DFP1'], ['diag-bosch-cp1.jpg', 'Logigramme Bosch CP1']],
      role: 'Une pompe HP remplit une rampe commune ; le calculateur règle la pression et pilote chaque injecteur.',
      phases: [['1. Basse pression', 'Pompe de gavage → filtre (5 µm, décanteur, réchauffeur) → pompe HP.'], ['2. Haute pression', 'Pompe HP à 3 pistons radiaux ; clapet de sécurité (< 0,8 bar = graissage seul).'], ['3. Régulation', 'Bosch : régulateur HP et/ou de débit · Delphi : IMV, décharge par impulsions courtes.'], ['4. Injection', 'Débit = temps d’ouverture + pression de rampe + trous ; pré-injection puis principale.']],
      pannes: [
        ['Ne démarre pas', 'Filtre à gazole colmaté (Bosch : ΔP avant/après filtre ≥ 0,3 bar)', 'Changer le filtre', 'R'],
        ['Capteur HP contact mis > 1 V (normal 0,5 V)', 'Capteur HS ou ligne en court-circuit', 'Remplacer le capteur ou réparer la ligne', 'R'],
        ['Au démarreur 1 à 1,5 V', 'BP et HP bonnes', 'Contrôler les capteurs PMH et d’arbre à cames', 'C'],
        ['Au démarreur 0,5 à 0,9 V', 'Retours d’injecteurs puis aiguilles (bougies déposées) : fuite ?', 'Remplacer le ou les injecteurs, rentrer le code (IMA / C2I)', 'R'],
        ['Delphi : pression largement > 1,5 V', 'IMV : résistance, tension, grippage', 'Remplacer l’IMV', 'R'],
        ['Pas de fuite, IMV bon', 'Clapet de sécurité HP grippé ouvert', 'Changer le clapet ; en dernier, la pompe HP', 'R']] },
    { t: 'Suralimentation et alimentation gasoil', img: [['gd22/g120_2.jpg', 'Turbocompresseur en coupe'], ['gd22/g124_0.jpg', 'Wastegate'], ['gd22/g122_1.jpg', 'Géométrie variable']],
      role: 'Envoyer plus d’air dans les cylindres (turbo) ; amener le gazole propre jusqu’à la pompe.',
      phases: [['Turbo', 'Les gaz d’échappement font tourner la turbine, qui entraîne le compresseur.'], ['Wastegate', 'Dérive les gaz quand la pression d’admission est trop forte.'], ['Géométrie variable', 'Bas régime ailettes fermées (couple), haut régime ouvertes.'], ['Intercooler', 'Refroidit l’air : −10 °C ≈ +3 % de puissance.']],
      pannes: [
        ['Manque de puissance + ralentisseur peu efficace', 'Turbo HS (le frein moteur passe par le turbo VGT)', 'Remplacer le turbo', 'R'],
        ['Démarrage anormalement long à 20 °C', 'Clapet de pression résiduelle 0,3 bar resté ouvert : le circuit se désamorce', 'Remplacer le clapet', 'R'],
        ['Démarre après purge, difficile le lendemain', 'Air qui revient : pompe manuelle du préfiltre, clapet 0,3 bar', 'Finir la purge par la culasse (petit purgeur côté ventilateur), vérifier le clapet', 'N'],
        ['Injecteur-pompe remplacé', 'Code gravé sur l’injecteur', 'Programmer le code dans le calculateur', 'G']] }
  ],

  hydro: [
    { t: 'Méthode de diagnostic hydraulique', img: [['livres/l-k094_0.jpg', 'Débit = vitesse'], ['livres/l-k097_0.jpg', 'Réglage du LPP']],
      role: 'Trouver l’appareil en cause en 7 questions, sans démonter au hasard.',
      phases: [['1. Combien de récepteurs ?', 'Tous → appareil commun (pompe, LPP, TAD, commande) · un seul → appareil de sa section.'], ['2. Combien de sens ?', '2 sens → en amont du distributeur · 1 sens → sur une ligne (LPS, anti-cavitation, freinage).'], ['3. Problème de quoi ?', 'Vitesse = DÉBIT · force = PRESSION · moteur qui cale = PUISSANCE.'], ['4. Quels appareils ?', 'Ceux qui agissent sur cette grandeur.'], ['5. Rôle et tarage', 'Ce que je sais de chacun.'], ['6. Conclusion', 'Appareil + état : bloqué ouvert / fermé, grippé, sur-taré, déréglé.']],
      pannes: [
        ['Tous les récepteurs manquent de force', 'LPP détaré', 'Régler le LPP (manomètre, récepteur en butée)', 'G'],
        ['Un récepteur manque de force dans un sens', 'LPS détaré ou bloqué ouvert', 'Régler ou remplacer le LPS', 'G'],
        ['Un récepteur manque de vitesse dans un sens', 'Soupape de freinage', 'Remplacer la soupape', 'R'],
        ['Tous lents', 'Régime moteur, fuite interne de pompe, entraînement qui patine', 'Régler le régime / remplacer la pompe', 'C'],
        ['Le châssis descend', 'LPSAC détaré ou vérin qui « barrique » (fuite interne)', 'Régler le LPSAC ou réparer le vérin (joints)', 'P']] },
    { t: 'Circuit ouvert Load Sensing centre fermé', img: [['hydro-ls-centre-ferme.jpg', 'Circuit LS centre fermé (lame + ripper)'], ['pelle-emad1.jpg', 'Pelle EMAD 1']],
      role: 'Adapter en permanence débit et pression au juste besoin du récepteur le plus chargé.',
      phases: [['Neutre', 'Pompe au stand-by : débit mini, faible puissance absorbée.'], ['Travail', 'P pompe = P LS maxi + 17 b ; chaque BIP garde ΔP = 6 b → vitesse constante.'], ['Butée', 'Le TAD (252 b) annule le débit : plus de puissance de coin (252 × 1 / 600 ≈ 0,42 kW).'], ['Commande', 'Réducteur 2 voies : 25 b ; limiteur de commande 30 b.']],
      pannes: [
        ['En butée, le moteur cale (ripper, inclinaison), le régime baisse ailleurs', 'Tous les récepteurs, puissance trop élevée', 'TAD sur-taré ou grippé : régler ou remplacer', 'G'],
        ['La descente marche, rien ne remonte ; commande à 30 b au lieu de 25', 'Pression de service limitée à 30 b', 'Réducteur 2 voies bloqué ouvert : remplacer', 'R'],
        ['Orientation OK seule, accélère avec le ripper', 'Un récepteur, vitesse = débit ; ΔP 87 b au lieu de 6', 'BIP de l’orientation bloquée ouverte : remplacer', 'R']] },
    { t: 'Transmission hydrostatique (circuit fermé)', img: [['hydro-circuit-ferme-marche-avant.jpg', 'Chargeuse compacte en marche avant'], ['transmission-hydrostatique.jpg', 'Transmission hydrostatique']],
      role: 'Faire rouler l’engin : pompe à cylindrée variable 2 sens ↔ moteur hydraulique, sans passer par la bâche.',
      phases: [['Neutre', 'Pompe à cylindrée nulle ; gavage à 20 b (limiteur de gavage).'], ['Marche', 'Le servopiston incline la pompe ; HP selon la charge ; la BP est tenue à 18 b par le limiteur d’échange ; l’huile chaude part au refroidisseur.'], ['Résistance maxi', 'HP = 280 b (annulation de débit) ; soupapes HP à 320 b = sécurité.'], ['Progressivité', 'La rétroaction mécanique referme le servodistributeur quand la cylindrée atteint la demande.']],
      pannes: [
        ['Du mal à progresser en charge en AV ; 50 b en AV, 280 b en AR', 'Une seule boucle en cause', 'Soupape HP de la marche AV détarée : régler ou remplacer', 'G'],
        ['Le moteur thermique cale en charge ; 320 b dans les 2 sens', 'Puissance trop élevée (320 × 70 / 600 = 37,3 kW)', 'Soupape d’annulation de débit grippée ou sur-tarée : régler ou remplacer', 'G'],
        ['Ne bouge pas ; 5 b partout', 'Le gavage ne plaque plus les pistons ni la servocommande', 'Limiteur de gavage détaré à 5 b : régler', 'G'],
        ['Part puis s’arrête ; pressions qui oscillent de 20 à 4 b', 'La BP s’effondre, la pompe cavite', 'Limiteur d’échange détaré à 4 b : régler', 'G'],
        ['Atteint tout de suite sa vitesse maxi', 'Plus de progressivité', 'Rétroaction mécanique cassée : réparer', 'P']] }
  ],

  dsft: [
    { t: 'Les angles du train avant (diagnostic)', img: [['sym/agd27-p37-1.png', 'Angle inclus = carrossage + pivot'], ['tableau-alfa.jpg', 'Tableau ALFA']],
      role: 'Lire un relevé d’angles et trouver la pièce en cause.',
      phases: [['1. Plage', 'Écrire la plage mini–maxi de chaque angle (1° = 60′).'], ['2. Hors tolérance', 'Repérer les angles hors plage, à gauche et à droite.'], ['3. Angle inclus', 'Calculer carrossage + pivot à gauche et à droite.'], ['4. Conclusion', 'Angle inclus bon (identique G/D) → triangle, berceau ou châssis. Angle inclus pas bon → fusée, porte-fusée et/ou jambe de force.']],
      pannes: [
        ['Carrossage et pivot hors tolérance, angle inclus bon (identique G/D)', 'La fusée est bonne : c’est la position de la roue qui a bougé', 'Remplacer le triangle ; contrôler le berceau et le châssis', 'R'],
        ['Angle inclus pas bon (différent G/D)', 'Fusée, porte-fusée et/ou jambe de force déformés', 'Remplacer la fusée / le porte-fusée et/ou la jambe de force', 'R'],
        ['Usure rugueuse du pneu', 'Parallélisme pas bon', 'Régler le parallélisme', 'G'],
        ['Usure lisse du pneu', 'Carrossage pas bon', 'Contrôler l’angle inclus, puis la pièce en cause', 'C'],
        ['Le véhicule tire d’un côté', 'Côté du carrossage le plus positif (et de la chasse la plus faible)', 'Ordre de réglage : hauteur de caisse, carrossage, parallélisme', 'G']] },
    { t: 'Le freinage hydraulique', img: [['livres/l-d047_2.jpg', 'Maître-cylindre'], ['livres/l-d054_0.jpg', 'ICP by-pass'], ['livres/l-d059_1.jpg', 'Circuit en II']],
      role: 'Ralentir et arrêter le véhicule en transformant l’effort à la pédale en pression dans les récepteurs.',
      phases: [['1. Pédale', 'L’effort du conducteur est multiplié par l’assistance (dépression : Mastervac).'], ['2. Maître-cylindre tandem', 'Transforme l’effort en pression ; 2 chambres : si un circuit fuit, l’autre freine encore.'], ['3. Correcteur', 'Dose la pression arrière (limiteur ou compensateur, asservi ou non à la charge).'], ['4. Récepteurs', 'Étriers (disques) et cylindres de roue (tambours).'], ['5. Défreinage', 'Rappel par le joint carré (disque) ou les ressorts (tambour) ; SPR : 0,5 à 1,5 bar gardés à l’arrière.']],
      pannes: [
        ['Le véhicule plonge de l’avant au freinage', 'Défaut du freinage arrière', 'Contrôler garnitures, correcteur, SPR, fuite ; réparer', 'P'],
        ['Garnitures grasses', 'Liquide de frein → cylindre de roue ; huile → joint spi de moyeu ou de pont', 'Réparer la fuite, remplacer les garnitures des 2 côtés (jamais nettoyées)', 'R'],
        ['Ne freine plus de l’AV, peu de l’AR, pédale longue, bocal bon', 'Fuite interne du maître-cylindre tandem', 'Remplacer le maître-cylindre', 'R'],
        ['Roues AR qui bloquent, aucun témoin', 'Correcteur de freinage', 'Régler ou remplacer le correcteur', 'G'],
        ['Freine mal, pédale dure', 'Assistance : aspiration, clapet, pompe à vide, servo', 'Contrôle du Mastervac, remplacer l’élément HS', 'R'],
        ['Tire à gauche, pédale longue, bocal bon', 'Côté droit en cause ; pressions OK → fuite interne du maître-cylindre', 'Réparer le côté droit ou remplacer le maître-cylindre', 'P'],
        ['Liquide à ébullition ≤ 165 °C', 'Contrôle du liquide', 'Remplacer le liquide et purger', 'N']],
      methode: ['Questionner', 'Constater (statique puis dynamique)', 'Contrôler du plus simple au plus complexe', 'Mesurer (purge, prise de pression)', 'Conclure', 'Remédier + essai'] },
    { t: 'ABS', img: [['livres/l-d073_0.jpg', 'Fonction antiblocage'], ['livres/l-d076_0.jpg', 'Groupe hydraulique']],
      role: 'Garder stabilité et direction au freinage quelle que soit l’adhérence (ne raccourcit pas forcément la distance).',
      phases: [['Freinage normal', 'Électrovanne d’admission ouverte, d’échappement fermée.'], ['Maintien', 'L’électrovanne isole la roue qui tend à bloquer.'], ['Réduction', 'L’huile part vers l’accumulateur, la pompe la refoule : pulsations à la pédale.']],
      pannes: [
        ['Pédale et volant vibrent au freinage', 'Disque voilé (refroidissement trop rapide)', 'Remplacer disques + plaquettes par paire', 'R'],
        ['Voyant ABS après changement des plaquettes AR', 'Capteur, faisceau ou cible abîmé ou mal remonté', 'Reposer correctement ou remplacer', 'P']] },
    { t: 'Transmission : « les vitesses passent, le véhicule n’avance pas »', img: [['livres/l-d081_0.jpg', 'La chaîne cinématique']],
      role: 'Démarche de recherche, du plus simple au plus compliqué.',
      phases: [['1', 'Depuis quand ? Voyant ? Le moteur démarre ?'], ['2', 'Pression de régulation, fuites ? Frein de parc desserré ?'], ['3', 'Aucun équipement enclenché ? Position de la boîte de transfert ?'], ['4', 'Arbres de transmission ? Odeur d’embrayage ? Fuite hydraulique ? Robinet inhibiteur d’embrayage ?'], ['5', 'Boîte automatique (TRM, VAB) : convertisseur de couple.']],
      pannes: [] }
  ],

  pneu: [
    { t: 'Production et stockage de l’air', img: [['pneu/prod-dessiccateur.jpg', 'Production avec dessiccateur'], ['pneu/prod-epurateur.jpg', 'Production avec épurateur']],
      role: 'Produire un air comprimé sec et le répartir en réserves séparées.',
      phases: [['1. Compresseur', 'Produit l’air.'], ['2. Régulateur', 'Conjoncteur-disjoncteur : met le compresseur en charge ou à vide.'], ['3. Dessiccateur', 'Dessiccation, régénération, absorption : air sec, plus de purges ni d’antigel.'], ['4. Valve de protection 4 circuits', 'Remplit les circuits dans un ordre précis, isole un circuit qui fuit, réalimente les autres.'], ['5. Réservoirs', 'Clapets anti-retour : la réserve reste si fuite en amont.']],
      pannes: [
        ['Voyant de pression allumé, 8,6 bar au manomètre', 'La pression est normale : manocontact ou son câblage', 'Remplacer le manocontact ou réparer le câblage', 'R'],
        ['Un circuit fuit', 'La valve de protection isole ce circuit', 'Chercher et réparer la fuite', 'P']] },
    { t: 'Frein de parc : cylindre à verrou, Tristop, VNAE', img: [['pneu/tristop-route-principe.jpg', 'Tristop : route'], ['pneu/tristop-stationnement-principe.jpg', 'Tristop : stationnement'], ['pneu/vnae-principe.jpg', 'VNAE']],
      role: 'Immobiliser le véhicule, et freiner en secours si l’air disparaît.',
      phases: [['Route', 'Chambre à ressort sous pression : ressort comprimé, défreiné.'], ['Frein de service', 'La chambre de service (diaphragme) freine.'], ['Stationnement', 'Chambre à ressort vidée : le ressort freine. Sans air (fuite), il freine tout seul : sécurité.'], ['VNAE', 'Frein de parc serré + pédale : réalimente la chambre à ressort pour ne pas additionner les 2 efforts.']],
      pannes: [
        ['Frein de parc qui s’enclenche tout seul en essai dynamique', 'La valve de retenue (élément L) libère l’air de la chambre de parc', 'Remplacer la valve', 'R'],
        ['Test VNAE : voyant de parc qui reste allumé frein de parc mis + pédale', 'La VNAE ne réalimente pas la chambre à ressort', 'Remplacer la VNAE', 'R'],
        ['GBC 180 : fuite franche sur le circuit AR', 'Au freinage de service, le frein de parc doit freiner les roues AR', 'Si non : valve de secours à remplacer', 'R']] },
    { t: 'Commande de la remorque : VCR et VRU', img: [['pneu/remorquage-avec-rupture.jpg', 'Remorquage avec rupture'], ['pneu/valve-relais-urgence.jpg', 'VRU']],
      role: 'Commander le freinage de la remorque à partir du tracteur, et la freiner seule si l’attelage se rompt.',
      phases: [['Main rouge (automatique)', 'Pression constante : alimente la remorque.'], ['Main jaune (directe)', 'Pression délivrée : commande le freinage.'], ['Freinage', 'La VCR (pilotages 41-42 service, 43 parc) commande la VRU de la remorque.'], ['Rupture', 'Conducteur qui freine + fuite sur la jaune : le piston coupe 95 % de l’alimentation, la rouge chute, la VRU freine la remorque.']],
      pannes: [
        ['Ensemble routier qui louvoie au freinage', 'Prédominance de la VCR (la remorque doit freiner un peu avant)', 'Régler : 0,5 bar de plus sur la main directe que sur le circuit AR', 'G'],
        ['Air en permanence à la main directe', 'Frein d’alignement enclenché, frein de parc serré, pilotage 43, VCR grippée (jamais le correcteur)', 'Desserrer / remplacer la VCR', 'R'],
        ['Test VCR : la main rouge ne tombe pas à 0 bar', 'Fonction rupture HS', 'Remplacer la VCR', 'R'],
        ['Test VRU : main rouge débranchée, la remorque ne freine pas', 'VRU HS', 'Remplacer la VRU', 'R']] }
  ],

  pplog: [
    { t: 'Direction assistée et ASR', img: [],
      role: 'Assistance hydraulique à 2 circuits ; l’ASR limite le patinage des roues motrices.',
      phases: [['ASR', 'Capteurs ABS → début de patinage → électrovanne ASR → pression de commande à la valve relais → vases de frein AR.'], ['Témoins, circuit principal défaillant', 'Contact mis : T1 éteint, T2 allumé · moteur à l’arrêt : T1 et T2 allumés · en roulant : T1 allumé, T2 éteint.']],
      pannes: [
        ['Témoin 6 allumé, 3 éteint, moteur tournant en roulant', 'Plus de pression sur le 1ᵉʳ circuit (pompe ou circuit HS) : direction dure', 'Réparer la pompe ou le circuit', 'P'],
        ['Contrôler le limiteur n° 14', 'Braquer à fond à droite avec une cale entre la butée mécanique et la barre', 'Régler le limiteur', 'G']] },
    { t: 'Turbo VGT, frein moteur et gasoil', img: [],
      role: 'Le turbo à géométrie variable sert aussi de frein moteur.',
      phases: [['Au contact', 'Électrovanne VGT ouverte à 60 % → actionneur de turbine.'], ['Frein moteur', 'Injection coupée, réactivée sous 600 tr/min.'], ['Contact coupé', 'L’électrovanne d’arrêt vide le circuit pour protéger l’électrovanne VGT.']],
      pannes: [
        ['Manque de puissance + ralentisseur peu efficace', 'Turbo HS', 'Remplacer le turbo', 'R'],
        ['Démarrage long à 20 °C', 'Clapet de pression résiduelle 0,3 bar ouvert', 'Remplacer le clapet', 'R'],
        ['Injecteur-pompe remplacé', 'Code gravé sur l’injecteur', 'Le programmer dans la centrale', 'G']] }
  ],

  ppld: [
    { t: 'Régulation de la pompe Load Sensing', img: [['ppld/pompe-phases.jpg', 'Les 4 phases'], ['ppld/notes-pompe.jpg', 'Tes notes']],
      role: 'La pompe ne donne que le débit et la pression demandés par le récepteur le plus chargé.',
      phases: [['Neutre', '30 b de stand-by, 1 L/min (gicleur anti-pompage).'], ['Ouvert à fond', 'Ps = P LS : débit maxi 100 L/min.'], ['Fonctionnement', 'Ps = P LS + 30 b.'], ['Butée', 'DAD 320 b + 30 b = 350 b, débit nul.']],
      pannes: [] },
    { t: 'Commande électrique et arrêt d’urgence', img: [['ppld/notes-schema-electrique.jpg', 'Ton schéma'], ['ppld/elec-arret-urgence.jpg', 'Arrêt d’urgence']],
      role: 'Alimenter l’équipement selon le mode choisi (Radio, Manu, Stab).',
      phases: [['PTO', 'Batterie → 40 A → interrupteur PTO → 5 A → relais R6 → 20 A → façade éclairée.'], ['Réarmement', 'Le bouton colle le relais d’auto-maintien.'], ['Sélecteur 3 voies', 'Radio : radiocommande · Manu : façade + by-pass RSQ 240 · Stab : coffrets + by-pass CETOP.'], ['Arrêt d’urgence', '3 coups de poing (coffre 6, coffre 1, radio) : auto-maintien désexcité, système isolé.']],
      pannes: [
        ['Voyant de réarmement resté allumé', 'Pas d’alimentation sur le sélecteur', 'Désenclencher le coup de poing et réarmer (coffre 6)', 'C'],
        ['Façade éteinte', 'Ligne PTO : fusibles, relais R6', 'Contrôler les fusibles du boîtier près des batteries', 'P'],
        ['Panne électrique complète', 'Fusibles du boîtier de distribution près des batteries', 'Mode dégradé : forcer les vannes by-pass', 'P']] },
    { t: 'Dépannage : les cas étudiés', img: [['ppld/diag-resume.jpg', 'En résumé'], ['ppld/degrade-stabs.jpg', 'Mode dégradé stabs']],
      role: 'Force → pression · vitesse → débit · tous les récepteurs → génération/distribution · un seul → distribution/récepteur.',
      phases: [['Questions', 'Force ou vitesse ? Un ou tous les récepteurs ? Un sens ou deux ?'], ['Relevé', 'Pression en M, au manomètre HYDAC, dans chaque sens.'], ['Conclusion', 'Du plus simple au plus compliqué, du moins cher au plus cher.']],
      pannes: [
        ['Grue : télescopage bloqué en charge ; 5XX dans les 2 sens, 240 b en butée des 2 côtés', 'Distributeur et électrovanne bons', 'Contrôler les capteurs d’angle, longueur, pression : étalonnage sur la console Mentor', 'G'],
        ['Aucun stab ne bouge, 0 b en M', 'Tous les récepteurs, 2 sens', 'Régulateur de débit 3 voies (shunter P et A) ou vanne by-pass (solénoïde au multimètre)', 'R'],
        ['Correcteur d’assiette ne descend pas ; 30 b en descente', 'Distributeur (solénoïde A) ou vanne manuelle grippée ouverte', 'Mode manuel pour confirmer ; solénoïde au multimètre ; échanger les vannes', 'R'],
        ['Treuil de halage déroule mais n’enroule pas ; 30 b en enroulement', 'Distributeur, solénoïde B', 'Mode manuel pour confirmer ; solénoïde B et ligne au multimètre', 'R'],
        ['PPLD bloqué, stabs au sol, boîtiers non éclairés', 'Commande électrique des stabs', 'Forcer la vanne by-pass CETOP (capuchon + molette), shunter le solénoïde de décharge LS, manipulateurs de secours', 'P']] }
  ],

  elec: [
    { t: 'La diode et la Zéner', img: [['sym/aga03-diode.png', 'Diode']],
      role: 'Diode : ne laisser passer le courant que dans un sens. Zéner : limiter une tension en inverse.',
      phases: [['Diode passante', 'Anode plus positive que la cathode, VAK ≥ 0,6 V : elle conduit.'], ['Diode bloquée', 'Polarisée en inverse : pas de courant.'], ['Zéner', 'En inverse, elle conduit dès sa tension Zéner et la maintient.']],
      pannes: [] },
    { t: 'Le transistor NPN', img: [],
      role: 'Commander un fort courant (collecteur) par un faible courant (base).',
      phases: [['Bloqué', 'Pas de courant de base : interrupteur ouvert.'], ['Conduction', 'Ic = β × Ib.'], ['Saturé', 'Vce ≈ 0 : interrupteur fermé, toute la tension est sur la charge (ex. relais : R = U / Ic).']],
      pannes: [] }
  ]
};
