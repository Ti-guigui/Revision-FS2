/* UV3 — PPLD (porteur polyvalent lourd de dépannage) : partie équipement hydraulique. */
(function () {
  var I = 'ppld/';
  function im(src, cap) { return { src: I + src + '.jpg', cap: cap }; }

  REV.add({
    id: 'ppld', name: 'PPLD — équipement hydraulique (UV3)', icon: '🏗️', color: '#b45309',
    desc: 'Dépanneuse PPLD : pompe Load Sensing, blocs CETOP et RSQ 240, stabilisateurs, RMU, grue, treuils, analyse énergétique, diagnostic et mode dégradé.',
    lessons: [
      {
        id: 'presentation', title: 'Présentation, commandes et mise en œuvre',
        images: [im('composants', 'Les composants de l’équipement'), im('fonctions', 'Grue, treuil et bras de remorquage : rôle et composition'), im('telecommande', 'Télécommande radio'), im('facade', 'Façade de commande (coffre n° 6)'), im('boitiers-stab', 'Boîtiers de commande des stabilisateurs')],
        html: `
<ul><li><b>PPLD</b> : porteur polyvalent lourd de dépannage, porteur 8×8 + dépanneur. Fonctions : <b>levage</b> (aide à la maintenance et à la logistique), <b>halage</b> (évacuation, extraction), <b>remorquage</b> tracté-tiré et tracté-levé, <b>stabilisateurs</b> AV et AR (maintien pendant le grutage).</li>
<li>Équipage de 2 : conducteur et chef de bord (responsable de la sécurité de la zone d’évolution).</li>
<li>Capacités : grue <b>15 t</b> · halage <b>18 t</b> · RMU tracté-levé <b>12,5 t</b>, tracté-tiré <b>50 t</b>.</li></ul>
<div class="tw"><table><tr><th>Fonction</th><th>Rôle</th><th>Composition</th></tr>
<tr><td>Grue</td><td>Soulever et déplacer des charges (maintenance, manutention)</td><td>1 tourelle, 1 poutre d’extension, 1 treuil de levage, 2 vérins de levage</td></tr>
<tr><td>Treuil</td><td>Haler un véhicule immobilisé</td><td>1 tambour de stockage, 1 treuil à cabestan, 1 câble, 1 treuil de dévidage</td></tr>
<tr><td>Bras de remorquage (RMU)</td><td>Remorquer en tracté-tiré ou levé</td><td>1 corps de flèche, 1 correcteur d’assiette, 1 bras télescopique</td></tr></table></div>
<h3>Mise en œuvre</h3>
<ol><li>Boîte de vitesses au neutre, frein de parc serré.</li>
<li>Enclencher la <b>prise de force (PTO)</b> (commande en cabine) : le témoin de la console latérale s’allume, la façade arrière est éclairée ; l’horamètre, l’afficheur de pression et le <b>CEC</b> (contrôleur d’état de charge) se mettent en route.</li>
<li>Appuyer sur le bouton de <b>réarmement</b> de la façade.</li>
<li>Commutateur <b>STABS / MANU / RADIO</b> : « STABS » active les boîtiers des stabilisateurs (la radiocommande est alors désactivée) ; « RADIO » pour la radiocommande (initialiser la radio avec le bouton de la radiocommande) ; « MANU » = leviers de la façade (mode secours).</li>
<li>RMU : sélectionner au CEC le <b>calage pneumatique</b>.</li></ol>
<p>Grue : à la mise sous tension, initialisation, essai du système LCC, test des voyants et des alarmes sonores ; les chiffres 1 à 6 défilent sur l’écran du coffret <b>MENTOR</b> (coffre n° 6). On confirme (OK) les données de la dernière utilisation, sinon on les corrige ; le verrouillage pneumatique de la grue s’efface et la pompe démarre.</p>
<h3>Commandes</h3>
<ul><li>Télécommande : manipulateurs S (1) treuil de halage ; R (2), P (3), N (4) bras de remorquage (télescopage, déploiement, levage) ; M (5) télescopage grue ; L (6) levage grue ; K (7) rotation grue ; J (8) treuil de levage. Plus : arrêt d’urgence, commutateurs PV/GV des treuils, accélérateur, débrayage du treuil de dévidage.</li>
<li>Façade : horamètre, arrêt d’urgence, témoin de colmatage des filtres, verrouillage grue, prises push-pull, CEC, leviers (mode secours), manomètre, commutateur STABS/MANU/RADIO, bouton de réarmement.</li>
<li>Boîtiers stab : boîtier gauche = stabs AV et AR gauches, boîtier droit = AV et AR droits, arrêt d’urgence sur le boîtier gauche.</li></ul>`,
        retenir: ['Grue 15 t · halage 18 t · RMU tracté-levé 12,5 t / tracté-tiré 50 t.', 'PTO enclenchée = témoin console latérale + façade éclairée + CEC en route.', 'Mode STABS = radiocommande désactivée.'],
        memo: { cle: 'PTO → RÉARMEMENT → STABS / MANU / RADIO', points: ['Grue 15 t · halage 18 t', 'RMU 12,5 t levé · 50 t tiré', 'STABS = radio désactivée'], astuce: 'Pas de réarmement = pas d’alimentation du sélecteur.' }
      },
      {
        id: 'generation', title: 'Principe hydraulique, pompe et réservoir',
        images: [im('schema-principe', 'Schéma de principe : pompe, séparateur de flux, blocs RSQ 240 et CETOP, vannes by-pass'), im('pompe', 'Pompe Hydro Leduc TXV à cylindrée variable'), im('pompe-phases', 'Les 4 phases de la régulation Load Sensing'), im('reservoir', 'Réservoir 380 L et filtration'), im('huile', 'Huiles RH-545 et XH-68')],
        html: `
<h3>Philosophie du circuit</h3>
<ul><li>Circuit <b>ouvert</b> à régulation <b>Load Sensing centre fermé</b>. En sortie de pompe, un <b>séparateur de flux</b> alimente 2 parties ; sur le retour LS, un <b>sélecteur de circuit</b> prend la pression la plus forte des 2 blocs et pilote la pompe.</li>
<li>2 blocs distributeurs : <b>RSQ 240</b> proportionnel (grue, treuils, bras de remorquage) et bloc électrodistributeur <b>CETOP</b> (stabilisateurs), chacun précédé d’une <b>vanne by-pass</b> de sécurité.</li>
<li>⚠️ Une fonction hydraulique ne peut être commandée <b>que si la vanne by-pass</b> en amont de son bloc est pilotée.</li>
<li><b>Système débit</b> (CETOP) : vitesse des récepteurs constante quelle que soit la charge (régulateur de débit 3 voies, 40 L/min, à l’entrée du bloc). <b>Système débit/pression</b> (RSQ 240) : la pompe adapte son débit aux besoins.</li></ul>
<h3>La pompe</h3>
<ul><li>Hydro Leduc TXV, 11 pistons, 92 cm³, <b>cylindrée variable</b>, drainée externe, régulation débit-pression Load Sensing, débit maxi <b>100 L/min</b>.</li>
<li>Elle ne fournit que la puissance nécessaire : pas d’échauffement, de bruit ni de laminage inutiles.</li>
<li><b>Gicleur anti-pompage</b> (1 L/min) : fuite sur le circuit du vérin de plateau pour éviter les oscillations du plateau (variations de débit).</li>
<li>Réglages sur la pompe : <b>tiroir LS</b> (stand-by <b>30 b</b>) et <b>dispositif d’annulation de débit</b> (DAD, <b>320 b</b>). La vis de réglage du stand-by est <b>sur la pompe</b>.</li></ul>
<div class="tw"><table><tr><th>Phase</th><th>Ce qui se passe</th></tr>
<tr><td>Débit nul (stand-by)</td><td>Distributeurs fermés : la pression monte jusqu’au ressort de stand-by (30 b), le plateau se redresse : plus de débit, 30 b maintenus.</td></tr>
<tr><td>Plein débit</td><td>Distributeur ouvert au maxi : LS = pression de service, le tiroir LS ne bouge pas, cylindrée maxi.</td></tr>
<tr><td>Contrôle du débit</td><td>Distributeur ouvert partiellement : la pression de service s’oppose à LS + ressort de stand-by, le débit s’adapte au besoin.</td></tr>
<tr><td>Débit nul (pression maxi)</td><td>Récepteur en butée : la pression monte jusqu’au DAD (320 b), qui relie LS au drain : plus de débit, pression maxi maintenue.</td></tr></table></div>
<h3>Réservoir et huile</h3>
<ul><li>Réservoir de <b>380 litres</b> ; filtre <b>haute pression</b> après la pompe, filtre <b>basse pression</b> au retour, refroidisseur.</li>
<li>Contrôle : nettoyer le bouchon indicateur de niveau ; si besoin, compléter par le bouchon de remplissage.</li>
<li>Huile <b>RH-545</b> (sans zinc, températures extrêmes, −50 °C à 35 °C extérieur) remplacée par <b>XH-68</b> (grade ISO VG 68, huile de −20 °C à 100 °C).</li>
<li><b>70 %</b> des problèmes hydrauliques viennent de la <b>pollution</b> : contrôler régulièrement la propreté de l’huile.</li></ul>`,
        retenir: ['Load Sensing centre fermé, circuit ouvert.', 'Stand-by 30 b (vis sur la pompe) · DAD 320 b · débit maxi 100 L/min.', 'Réservoir 380 L · 70 % des pannes = pollution.', 'Pas de vanne by-pass pilotée = pas de mouvement.'],
        memo: { cle: 'LOAD SENSING : LA POMPE DONNE CE QU’ON DEMANDE', flow: ['Neutre : 30 b, débit nul', 'Travail : P service = LS + 30 b', 'Butée : DAD 320 b'], points: ['100 L/min maxi', 'Réservoir 380 L', '70 % des pannes = pollution'], astuce: 'Le stand-by se règle sur la pompe.' }
      },
      {
        id: 'cetop', title: 'Le bloc CETOP (stabilisateurs)',
        images: [im('cetop-entree', 'Section d’entrée CETOP : repères 1 à 7'), im('cetop-travail', 'Section de travail : distributeur 4/3 centre fermé'), im('cetop-fonctionnement', 'Neutre, fonctionnement et butée')],
        html: `
<p><b>CETOP</b> = Comité Européen des Transmissions Oléo-hydrauliques et Pneumatiques (normalisation).</p>
<div class="tw"><table><tr><th>N°</th><th>Désignation</th><th>Rôle</th></tr>
<tr><td>1</td><td>Balance de pression (étage principal, 20 b)</td><td>Évacue la majorité du débit en cas de butée du récepteur</td></tr>
<tr><td>2</td><td>Limiteur de pression réglable (étage pilote, 200 b)</td><td>Détermine la pression maxi du montage</td></tr>
<tr><td>3</td><td>Bouchon</td><td>Déconnecte l’information LS de l’étage principal</td></tr>
<tr><td>4</td><td>Gicleur de déséquilibre (0,5)</td><td>Déséquilibre l’étage principal en cas de butée</td></tr>
<tr><td>5</td><td>Limiteur de débit réglable double effet</td><td>Neutralisé volontairement (ouvert à fond)</td></tr>
<tr><td>6</td><td>Gicleur LS (0,7)</td><td>Crée une ΔP au neutre pour avoir la pression de stand-by</td></tr>
<tr><td>7</td><td>Solénoïde de décharge LS</td><td>Monte la pression LS en travail, décharge la ligne LS au neutre</td></tr></table></div>
<ul><li>Étage principal + étage pilote = <b>limiteur de pression à commande pilotée</b> qui protège le circuit des stabilisateurs : <b>220 b</b> (200 + 20).</li>
<li>Le limiteur de débit est neutralisé car un <b>régulateur de débit 3 voies</b> est placé en amont sur P.</li>
<li>Le solénoïde de décharge LS est piloté dès qu’on touche aux manipulateurs des stabs.</li>
<li>Sections de travail : distributeurs <b>4/3 centre fermé en Y/T</b>, commande électrique et manuelle de secours, rappel par ressort.</li>
<li><b>Neutre</b> : 30 b, pompe en cylindrée mini (≈ 1,7 L/min). <b>Fonctionnement</b> : pression de service = LS + ressort de stand-by. <b>Butée</b> : P = 220 b (sous le DAD de la pompe).</li></ul>`,
        retenir: ['CETOP : pilote 200 b + principal 20 b = 220 b maxi.', 'Gicleur LS → stand-by 30 b ; solénoïde de décharge LS piloté avec les manipulateurs.', 'Régulateur de débit 3 voies (40 L/min) en amont.'],
        memo: { cle: 'CETOP = STABS · 200 + 20 = 220 b', points: ['Gicleur LS 0,7 → stand-by', 'Gicleur 0,5 → déséquilibre', 'Solénoïde de décharge LS'], astuce: 'Le limiteur de débit est neutralisé : le régulateur 3 voies est en amont.' }
      },
      {
        id: 'rsq240', title: 'Le distributeur RSQ 240',
        images: [im('rsq240', 'RSQ 240 : section d’entrée, sections de travail, section de sortie'), im('rsq-entree', 'Section d’entrée'), im('rsq-travail', 'Section de travail : repères 1 à 10'), im('rsq-fonctionnement', 'Neutre et fonctionnement'), im('rsq-explicitation', 'ΔP régulateur + ΔP distributeur = tarage du tiroir LS')],
        html: `
<ul><li>Distributeur <b>open center</b> en montage parallèle, jusqu’à <b>350 bar</b> et <b>100 L/min</b>, <b>double flux séparé</b> : <b>LOW FLOW</b> et <b>FULL FLOW</b>. Avec la pompe : régulation Load Sensing centre fermé, système débit/pression ; beaucoup moins de chaleur produite.</li></ul>
<h3>Section d’entrée</h3>
<ul><li>1 corps · 2 étage pilote · 3 étage principal · 4 <b>réducteur de pression 3 voies (25 b)</b> · 5 bouchon.</li>
<li>Le réducteur donne la <b>pression de pilotage</b> des tiroirs et amortit leurs déplacements (pas de pics de pression).</li>
<li>Étage principal + pilote = limiteur à commande pilotée taré à <b>380 bar</b> : protection du système.</li>
<li><b>Gicleur</b> : fait passer le low flow par la ligne LS ; la ΔP à ses bornes = tarage du tiroir LS (30 b).</li></ul>
<h3>Section de travail</h3>
<div class="tw"><table><tr><th>N°</th><th>Désignation</th></tr>
<tr><td>1</td><td>Corps</td></tr><tr><td>2 / 8</td><td>Solénoïdes 24 V sortie A / sortie B</td></tr><tr><td>3</td><td>Chape de commande manuelle</td></tr>
<tr><td>4 / 5</td><td>Tiroir / ressort</td></tr><tr><td>6</td><td>Clapet anti-dérive (low flow)</td></tr>
<tr><td>7</td><td>Régulateur de débit 2 voies réglable avec clapet anti-dérive (full flow)</td></tr>
<tr><td>9 / 10</td><td>Limiteurs de pression secondaires sortie A / sortie B</td></tr></table></div>
<ul><li>2 types : 4×3 LS centre fermé <b>Y/T</b> pour <b>moteur hydraulique</b> ; 4×3 LS centre fermé pour <b>vérin double effet</b>. Action progressive, commande hydraulique proportionnelle et manuelle, rétroaction barométrique.</li></ul>
<h3>Fonctionnement</h3>
<ul><li><b>Neutre</b> : 30 b à l’entrée des distributeurs, pompe en cylindrée mini ; le réducteur donne 25 b en attente de pilotage.</li>
<li><b>Travail</b> : le débit se sépare en <b>full flow</b> (débit principal vers le récepteur) et <b>low flow</b> (petit débit par le canal LS, il décolle le clapet anti-dérive). <b>Pression de service = LS + tarage du tiroir LS.</b></li>
<li>ΔP régulateur + ΔP distributeur = tarage du tiroir LS : les ΔP restent constantes quelle que soit la charge → <b>débit et vitesse constants</b>.</li>
<li>Régulation de pompe défaillante en butée : l’étage pilote (350 b) + l’étage principal (30 b) laissent passer le débit sous <b>380 bar</b> : protection générale du circuit.</li></ul>`,
        retenir: ['RSQ 240 : 350 bar, 100 L/min, low flow + full flow.', 'Réducteur 3 voies 25 b = pression de pilotage.', 'Limiteur piloté d’entrée 380 bar = protection générale.', 'P service = LS + tarage tiroir LS (30 b).'],
        memo: { cle: 'RSQ 240 = LOW FLOW + FULL FLOW', points: ['350 bar · 100 L/min', 'Réducteur 25 b = pilotage', 'Protection 380 b'], astuce: 'ΔP régulateur + ΔP distributeur = 30 b → vitesse constante.' }
      },
      {
        id: 'fonctions', title: 'Stabilisateurs, RMU et grue',
        images: [im('stabs-mise-en-oeuvre', 'Mise en œuvre des stabilisateurs'), im('stabs-neutre', 'Stabilisateurs : neutre'), im('stabs-fonctionnement', 'Stabilisateurs : fonctionnement'), im('stabs-butee', 'Stabilisateurs : butée'),
          im('rmu-synopsis', 'RMU : corps de flèche, télescopage, correcteur d’assiette'), im('rmu-neutre', 'RMU : neutre'), im('rmu-fonctionnement', 'RMU : fonctionnement'), im('rmu-butee', 'RMU : butée'),
          im('grue-mise-en-oeuvre', 'Mise en œuvre de la grue'), im('grue-synopsis', 'Grue : secteurs de travail et sécurités'), im('grue-neutre', 'Grue : neutre'), im('grue-fonctionnement', 'Grue : fonctionnement'), im('grue-fin-de-course', 'Grue : fin de course'), im('electro-coupures', 'Électrovannes de coupure liées au CEC'), im('schema-general', 'Schéma hydraulique général')],
        html: `
<h3>Stabilisateurs</h3>
<ul><li>Bloc CETOP de 6 sections : extensions AVG et AVD, stabs AVG, AVD, ARG, ARD (vérins verrouillés par double clapet piloté).</li>
<li>Calage : nature du sol, grue à 0° arrière, 4 stabs sortis sur plaques de répartition, dévers &lt; ±0,5°, pente &lt; ±1,5°, pas de jeu dans les poutres avant, pneus en contact avec le sol.</li></ul>
<h3>RMU (unité de remorquage militaire)</h3>
<ul><li><b>Corps de flèche</b> : 2 vérins double effet, protégés par 2 <b>soupapes de freinage</b> (maîtrise du mouvement et maintien en cas de chute de pression).</li>
<li><b>Télescopage</b> : vérins double effet jumelés qui se déplacent en sens opposés ; le <b>limiteur de débit</b> assure leur sortie simultanée.</li>
<li><b>Correcteur d’assiette</b> : vérin double effet dans le corps de flèche, normalement sorti ; sa rentrée abaisse le télescope ; protégé par un <b>bloc de freinage</b>.</li>
<li>Tracté-tiré en terrain accidenté : une fois broché, on libère le correcteur d’assiette en tournant les <b>2 vannes manuelles de mise à flot</b> (arrière du coffre n° 6). À la fin, les refermer <b>avant de débrocher</b>.</li></ul>
<h3>Grue</h3>
<ul><li>Champ de battage 180° de part et d’autre de l’axe arrière : secteur <b>arrière 15°</b> de chaque côté, secteurs <b>latéraux 100°</b>, secteur <b>avant 65°</b> de part et d’autre de l’axe avant.</li>
<li>Secteur avant : élévation d’au moins <b>50°</b> ; des capteurs de fin de course stoppent la rotation si l’élévation est inférieure à 50°. Capacité de 1 t au-dessus de 50° dans le secteur avant ; longueur de flèche 5 m à 8,40 m.</li>
<li><b>Rotation</b> : l’huile dé-freine le moteur via le détecteur de circuit ; à l’arrêt, il est freiné par le ressort du vérin simple effet. Fin de course : électrovanne désexcitée, moteur stoppé et freiné.</li>
<li><b>Levage</b> : 2 vérins double effet avec <b>soupapes d’équilibrage</b>. <b>Télescopage</b> : 1 vérin double effet, 2 capteurs donnent la position de l’allonge au CEC.</li>
<li><b>Électrovannes de contrôle (de coupure)</b> : alimentées tant que les abaques de travail sont respectés ; si le CEC détecte une incohérence, elles sont désexcitées et le mouvement s’arrête.</li>
<li><b>Treuil de levage</b> : sécurité d’enroulement (masselotte sous la moufle, évite le contact crochet/moufle) ; sécurité de déroulement (arrêt quand il reste <b>5 spires</b> sur le tambour).</li>
<li><b>Bloc retour de fin de course</b> : permet la rotation inverse pour déverrouiller la vanne inverseur (évite un blocage hydrostatique).</li>
<li>Position route : tourelle vers 0° arrière, verrouillage tourelle, flèche abaissée, câble enroulé, crochet attaché.</li></ul>`,
        retenir: ['RMU : soupapes de freinage ; vannes de mise à flot à refermer avant de débrocher.', 'Grue : secteur avant 65°, élévation ≥ 50° ; 5 spires mini sur le tambour.', 'Électrovannes de coupure commandées par le CEC (abaques).'],
        memo: { cle: 'SÉCURITÉS = CEC + ÉLECTROVANNES DE COUPURE', points: ['Secteur AR 15° · latéraux 100° · AV 65°', 'Élévation ≥ 50° à l’avant', '5 spires mini sur le tambour'], astuce: 'Vannes de mise à flot : refermer avant de débrocher.' }
      },
      {
        id: 'energie', title: 'Analyse énergétique',
        images: [im('stabs-energie', 'Stabilisateurs : calculs'), im('stabs-graphes', 'Stabilisateurs : graphes P/Q'), im('rmu-energie', 'RMU : calculs'), im('rmu-graphes', 'RMU : graphes P/Q'), im('grue-energie', 'Grue : calculs'), im('grue-graphes', 'Grue : graphes P/Q')],
        html: `
<p>Puissance hydraulique : <b>P (kW) = p (bar) × Q (L/min) / 600</b>. Toute puissance perdue (régulateur, gicleur, limiteur) se transforme en <b>chaleur</b>.</p>
<div class="tw"><table><tr><th></th><th>Stabilisateurs (CETOP)</th><th>RMU (télescopage)</th><th>Grue (rotation)</th></tr>
<tr><td>Neutre</td><td>30 × 1 / 600 = <b>0,05 kW</b> (1 L/min : gicleur anti-pompage)</td><td>30 × 2 / 600 = <b>0,1 kW</b> (2 L/min : anti-pompage + gicleur LS)</td><td><b>0,1 kW</b> (2 L/min)</td></tr>
<tr><td>Fonctionnement (40 L/min)</td><td>vérin 6,66 + régulateur 2 + gicleur 0,21 = <b>8,87 kW</b></td><td>vérin 6,99 + limiteur de débit 0,33 + distributeur 2 + gicleur LS 0,05 + gicleur 0,23 = <b>9,60 kW</b></td><td>moteur 6,66 + distributeur 2 + gicleur LS 0,05 + gicleur 0,21 = <b>8,92 kW</b></td></tr>
<tr><td>Butée</td><td>LP piloté 220 × 40 = 14,66 + 2 + 0,41 = <b>17,07 kW</b></td><td>LPS 200 b → P service 230 b : 230 × 41 / 600 = <b>15,71 kW</b></td><td>LPS 210 b → 240 b : 240 × 41 / 600 = <b>16,40 kW</b></td></tr></table></div>
<ul><li>Débit pompe en fonctionnement : <b>41 L/min</b> (40 pour le récepteur + 1 pour le gicleur anti-pompage).</li>
<li>En butée, la pression LS n’atteint pas le DAD : pression de service = LPS + 30 b, le débit continue à passer par le limiteur (chaleur).</li></ul>`,
        retenir: ['P (kW) = p × Q / 600.', 'Neutre stabs 0,05 kW · RMU et grue 0,1 kW.', 'Butée : P service = LPS + 30 b.'],
        memo: { cle: 'P (kW) = p × Q / 600', points: ['Neutre : 0,05 à 0,1 kW', 'Travail : ≈ 9 kW', 'Butée : 15 à 17 kW'], astuce: 'Tout ce qui ne bouge pas le récepteur part en chaleur.' }
      },
      {
        id: 'diagnostic', title: 'Diagnostic et mode dégradé',
        images: [im('diag-circuit-ouvert', 'Le diagnostic en circuit ouvert'), im('diag-resume', 'En résumé : questions, pourquoi, qui, où'), im('moyens-controle', 'Moyens de contrôle : pression et débit'), im('degrade-stabs', 'Mode dégradé : vanne by-pass CETOP'), im('degrade-rsq', 'Mode dégradé : vanne by-pass RSQ 240 et électrovannes de coupure')],
        html: `
<h3>Méthode (10 étapes)</h3>
<ol><li>Discuter avec l’utilisateur (symptômes).</li><li>Essayer soi-même la machine.</li><li>Chercher les schémas (hydraulique, électrique, pneumatique).</li><li>Comprendre le fonctionnement : le point de départ est toujours la <b>reconnaissance des symboles</b>.</li>
<li>Panne hydraulique ou de commande ? On a plus souvent des problèmes <b>électriques</b> (connectique, oxydation, coupure) : contrôleur universel.</li><li>Photocopier les schémas.</li><li>Colorier la phase de fonctionnement (pressions attendues, calibre des manomètres).</li><li>Relever les pressions.</li><li>Analyser.</li><li>Diagnostiquer : du plus simple au plus compliqué, du moins cher au plus cher.</li></ol>
<p>⚠️ Seule la <b>documentation technique constructeur officielle (MAT)</b> fait foi pour le contrôle et la réparation.</p>
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Problème de force</td><td>Problème de <b>pression</b> → appareils de pression (F = P × S)</td></tr>
<tr><td>Problème de vitesse</td><td>Problème de <b>débit</b> → appareils de débit + leur commande (v = Q / 6S)</td></tr>
<tr><td>Tous les récepteurs</td><td>Entre la <b>génération</b> et la <b>distribution</b></td></tr>
<tr><td>Un seul récepteur</td><td>Entre la <b>distribution</b> et le <b>récepteur</b></td></tr>
<tr><td>Un seul sens</td><td>Sur la ligne d’alimentation concernée</td></tr>
<tr><td>Les deux sens</td><td>Éléments communs aux deux sens</td></tr></table></div>
<h3>Moyens de contrôle</h3>
<ul><li><b>Manomètre</b> : lit la pression <b>relative</b> (sans la pression atmosphérique). Sécurité : le capillaire doit être équipé de son manomètre <b>avant</b> d’être branché sur la prise de pression.</li>
<li><b>Débitmètre</b> : toujours <b>en série</b> ; souvent difficile à monter, on préfère le calcul d’un <b>temps de cycle</b>.</li></ul>
<h3>Mode dégradé</h3>
<ul><li>Panne électrique complète : vérifier d’abord les <b>fusibles</b> du boîtier près des batteries.</li>
<li><b>Stabilisateurs</b> : forcer la <b>vanne by-pass CETOP</b> (dévisser le capuchon noir avec son joint, dévisser la molette), <b>shunter le solénoïde de décharge LS</b>, puis utiliser les manipulateurs du bloc.</li>
<li><b>Grue, RMU, treuils</b> : forcer la <b>vanne by-pass RSQ 240</b> et les <b>électrovannes de coupure</b> (sécurités grue et treuil), puis utiliser les manipulateurs du distributeur proportionnel.</li></ul>
<h3>Cas étudiés</h3>
<ul><li><b>Grue, télescopage bloqué en charge</b> (5XX dans les 2 sens, 240 b en butée des 2 côtés) : vitesse = débit, 1 récepteur ; distributeur et électrovanne OK → contrôler les <b>capteurs d’angle, de longueur et de pression</b> (étalonnage sur la console Mentor).</li>
<li><b>Aucun stab ne bouge, 0 b en M</b> : tous les récepteurs, les 2 sens → régulateur de débit 3 voies ou vanne by-pass (grippée ou solénoïde HS).</li>
<li><b>Correcteur d’assiette ne descend pas</b> (30 b en descente, 340 b en montée) : distributeur (solénoïde A) ou vanne manuelle grippée ouverte.</li>
<li><b>Treuil de halage déroule mais n’enroule pas</b> (30 b en enroulement) : distributeur, commande du solénoïde B.</li></ul>`,
        retenir: ['Force → pression ; vitesse → débit.', 'Tous les récepteurs → génération/distribution ; un seul → distribution/récepteur.', 'Mode dégradé stabs : by-pass CETOP + shunt du solénoïde de décharge LS.'],
        memo: { cle: 'FORCE = PRESSION · VITESSE = DÉBIT', flow: ['Tous les récepteurs → génération / distribution', 'Un seul → distribution / récepteur', 'Un sens → sa ligne', 'Deux sens → éléments communs'], astuce: 'Du plus simple au plus compliqué, du moins cher au plus cher.' }
      },
      {
        id: 'questions', title: 'Questions posées (PPLD)',
        html: `<p>Questions types de l’UV3 sur l’équipement hydraulique du PPLD.</p>`
      }
    ],
    questions: [
      /* Questions transmises */
      { l: 'questions', img: I + 'pompe.jpg', q: 'Donnez la désignation et le rôle de la soupape d’annulation de débit :', c: ['Soupape d’annulation de débit, elle règle la pression maxi dans le circuit', 'Le DAD qui fait monter la pression pour déplacer le récepteur', 'Dispositif d’annulation de débit, elle s’ouvre quand il y a une fuite sur le circuit'], e: 'Le DAD (320 b) relie la ligne LS au drain : la pompe ne débite plus et maintient la pression maxi.' },
      { l: 'questions', img: I + 'pompe.jpg', q: 'Où se trouve la vis de réglage pour régler la pression du stand-by ?', c: ['La vis de réglage de pression de stand-by se trouve sur la pompe', 'La vis de réglage de pression de stand-by se trouve sur le bloc CETOP', 'La vis de réglage de pression de stand-by se trouve sur le bloc RSQ240'], e: 'Le stand-by (30 b) est le tarage du tiroir LS de la pompe.' },
      { l: 'questions', q: 'Grue : le télescopage de la poutre fonctionne à vide, mais en charge, en sortie de télescopage, le système se verrouille (colonne lumineuse rouge). Façade éclairée, pas de code défaut au CEC, le récepteur radio affiche 5XX dans les 2 sens. Manomètre : neutre 30 bar, sortie en butée 240 bar, rentrée en butée 240 bar. Analyse du problème ?', c: ['Problème de vitesse = problème de débit, concerne 1 récepteur dans 1 sens. La façade est éclairée donc la ligne électrique est correcte ; le récepteur de la radiocommande confirme l’alimentation du canal 5 dans les 2 sens.', 'Problème de force = problème de pression, concerne un récepteur dans 1 sens. La façade indique que le voyant de réarmement est éteint.', 'Problème de vitesse = problème de force, concerne 1 récepteur dans 1 sens. La façade est éclairée donc le relais R6 est ok.'], e: '240 b dans les 2 sens : le distributeur fonctionne ; le vérin fonctionne à vide : l’électrovanne de sécurité est bonne.' },
      { l: 'questions', q: 'Grue : le télescopage se verrouille en charge alors que le distributeur (240 b dans les 2 sens) et l’électrovanne de sécurité sont bons. Quel élément peut présenter un problème ?', c: ['Contrôler les capteurs d’angle, longueur et de pression', 'Électrovanne shuntée qui bloque le mouvement avec le CEC', 'Je peux incriminer le LPS'], e: 'Le CEC coupe le mouvement d’après les capteurs : on vérifie leur étalonnage sur la console Mentor.' },
      { l: 'questions', q: 'Quelle est la conséquence sur le système si le voyant de réarmement reste allumé ?', c: ['Pas d’alimentation sur le sélecteur', 'Permet l’alimentation des vannes by pass', 'Je peux commander mes stabilisateurs'], e: 'Il faut réarmer (voyant éteint) pour alimenter le sélecteur STABS / MANU / RADIO.' },
      { l: 'questions', img: I + 'grue-fin-de-course.jpg', q: 'Donnez la désignation et le rôle du bloc de fin de course de la rotation :', c: ['Le bloc de fin de course permet le début de mouvement pour éviter un blocage hydrostatique', 'Bloc multi clapet, ajuste le débit vers le moteur hydraulique', 'Bloc de fin de course, isole le circuit défaillant'], e: 'Il permet une rotation inverse pour déverrouiller la vanne inverseur.' },
      { l: 'questions', img: I + 'electro-coupures.jpg', a: [0, 1], q: 'Donnez la désignation et le rôle de l’électrovanne de coupure du treuil de levage (2 réponses) :', c: ['Électro de coupure, elle est activée pour éviter de dévider le câble', 'Électro de coupure, elle coupe l’alimentation vers le récepteur, elle est commandée par le CEC', 'Électro de coupure, elle se déplace'], e: 'Commandée par le CEC ; le déroulement s’arrête quand il reste 5 spires sur le tambour.' },
      { l: 'questions', img: I + 'schema-principe.jpg', q: 'Donnez la désignation et le rôle de la vanne by-pass placée avant le bloc CETOP :', c: ['By pass set up, permet d’alimenter le bloc stab', 'By pass RSQ240, permet l’alimentation de l’équipement quand le sélecteur est sur la position radio', 'By pass set up, permet l’alimentation du bloc proportionnel si le sélecteur est en position manu'], e: 'Sans vanne by-pass pilotée, aucun mouvement du bloc concerné.' },
      { l: 'questions', q: 'Quel élément règle la pression maxi du circuit ?', c: ['La régulation de pompe', 'Le limiteur de pression sur le bloc d’entrée CETOP', 'Le limiteur de pression à commande piloté sur le RSQ 240'], e: 'Le dispositif d’annulation de débit de la pompe (320 b). Le limiteur piloté du RSQ 240 (380 b) ne sert que de protection si la régulation est défaillante.' },
      { l: 'questions', q: 'À quel endroit et comment je règle la pression de stand-by ?', c: ['Elle se règle à l’aide du mano HYDAC en agissant sur la pompe', 'Elle se règle sur la partie avant du bloc RSQ 240 avec le mano HYDAC', 'Avec le mano supplémentaire, je règle la pression sur le bloc CETOP'], e: 'Stand-by = tarage du tiroir LS de la pompe (30 b).' },
      { l: 'questions', q: 'Donner la bonne réponse :', c: ['La pression de service est égale à l’addition de la pression LS + le tarage du ressort de stand-by', 'La ligne LS est égale au reflet de la charge moins le dispositif d’annulation débit', 'La pression de service est le reflet de la charge'], e: 'P service = LS + 30 b.' },
      { l: 'questions', img: I + 'degrade-stabs.jpg', q: 'En sortie terrain, un PPLD est bloqué avec les stabilisateurs posés au sol. Les boîtiers de commande des stabilisateurs ne sont pas éclairés, la façade est éclairée, sélecteur sur stab, voyant de réarmement éteint, 30 b en M. Quelle méthode de dépannage ?', c: ['Je dois shunter le solénoïde sur le bloc d’entrée STAB et la vanne by pass avant le régulateur et agir sur les manipulateurs de secours', 'Je dois shunter le solénoïde de décharge LS sur le bloc d’entrée et agir sur les manipulateurs de secours', 'Je dois shunter la vanne by pass du RSQ 240 et le solénoïde de décharge LS et agir sur les manipulateurs', 'Je dois agir sur la pompe pour augmenter le tarage du ressort de stand-by et shunter le solénoïde de décharge LS et agir sur les manipulateurs de secours'], e: 'Mode dégradé stabs : forcer la vanne by-pass CETOP (capuchon + molette), shunter le solénoïde de décharge LS, utiliser les manipulateurs du bloc.' },

      /* Présentation / commandes */
      { l: 'presentation', img: I + 'composants.jpg', q: 'Capacité de levage de la grue du PPLD ?', c: ['15 t', '18 t', '50 t'], e: 'Halage 18 t ; RMU tracté-levé 12,5 t, tracté-tiré 50 t.' },
      { l: 'presentation', q: 'Capacité du treuil de halage du PPLD ?', c: ['18 t', '15 t', '12,5 t'], e: 'Grue 15 t ; RMU tracté-levé 12,5 t.' },
      { l: 'presentation', q: 'RMU : capacités de remorquage ?', c: ['Tracté-levé 12,5 t ; tracté-tiré 50 t', 'Tracté-levé 50 t ; tracté-tiré 12,5 t', 'Tracté-levé 15 t ; tracté-tiré 18 t'], e: 'La grue lève 15 t, le treuil hale 18 t.' },
      { l: 'presentation', img: I + 'fonctions.jpg', q: 'Composition du bras de remorquage (RMU) ?', c: ['1 corps de flèche, 1 correcteur d’assiette, 1 bras télescopique', '1 tourelle, 1 poutre d’extension, 2 vérins de levage', '1 tambour de stockage, 1 treuil à cabestan, 1 câble'], e: 'Grue : tourelle, poutre, treuil de levage, 2 vérins ; treuil : tambour, cabestan, câble, treuil de dévidage.' },
      { l: 'presentation', img: I + 'fonctions.jpg', q: 'Rôle du treuil du PPLD ?', c: ['Haler un véhicule immobilisé', 'Soulever des charges', 'Remorquer en tracté-levé'], e: 'Tambour de stockage, treuil à cabestan, câble, treuil de dévidage.' },
      { l: 'presentation', q: 'Prise de force correctement enclenchée : que constate-t-on ?', c: ['Le témoin de la console latérale s’allume, la façade arrière est éclairée, l’horamètre, l’afficheur de pression et le CEC se mettent en route', 'Le moteur passe à 2 000 tr/min', 'La radiocommande s’initialise seule'], e: 'Ensuite : bouton de réarmement puis commutateur STABS / MANU / RADIO.' },
      { l: 'presentation', img: I + 'facade.jpg', q: 'Commutateur sur « STABS » : que se passe-t-il ?', c: ['Les boîtiers des stabilisateurs sont actifs et éclairés, la radiocommande est désactivée', 'La radiocommande commande les stabilisateurs', 'Les leviers de la façade commandent la grue'], e: 'RADIO = radiocommande ; MANU = leviers de la façade (mode secours).' },
      { l: 'presentation', q: 'Mise en œuvre du RMU : quel calage sélectionne-t-on au CEC ?', c: ['Le calage pneumatique', 'Le calage sur 4 stabilisateurs', 'Aucun calage'], e: 'Puis réarmement, commutateur sur RADIO, initialisation de la radiocommande.' },
      { l: 'presentation', q: 'Pour la grue, le mode normal et le mode secours sont commandés par :', c: ['Normal : radiocommande ; secours : leviers de la façade', 'Normal : leviers ; secours : radiocommande', 'Normal : boîtiers stab ; secours : radiocommande'], e: 'Sélecteur 3 positions STABS / MANU / RADIO.' },
      { l: 'presentation', q: 'Où se trouve la façade du panneau de commande et le coffret MENTOR ?', c: ['Dans le coffre n° 6', 'Dans la cabine', 'Sur le boîtier de stab gauche'], e: 'La commande de prise de force, elle, est dans la cabine.' },

      /* Génération */
      { l: 'generation', img: I + 'schema-principe.jpg', q: 'Type de régulation de l’équipement hydraulique du PPLD ?', c: ['Circuit ouvert à régulation Load Sensing centre fermé', 'Circuit fermé à centre ouvert', 'Circuit ouvert à pompe à cylindrée fixe'], e: 'La pompe à cylindrée variable adapte pression et débit au besoin.' },
      { l: 'generation', img: I + 'schema-principe.jpg', q: 'À quelle condition une fonction hydraulique peut-elle être commandée ?', c: ['Si la vanne by-pass en amont de son bloc est pilotée', 'Si le DAD est ouvert', 'Si le réservoir est plein'], e: '2 vannes by-pass : une avant le RSQ 240, une avant le bloc CETOP.' },
      { l: 'generation', q: 'Quel bloc distributeur commande les stabilisateurs ?', c: ['Le bloc électrodistributeur CETOP', 'Le RSQ 240', 'Le bloc LIN'], e: 'Le RSQ 240 proportionnel commande la grue, les treuils et le bras de remorquage.' },
      { l: 'generation', q: 'Rôle du sélecteur de circuit sur le retour LS ?', c: ['Transmettre à la pompe la pression LS la plus importante des 2 blocs', 'Alimenter le réservoir', 'Couper les stabilisateurs'], e: 'La pompe est pilotée par le signal LS le plus élevé.' },
      { l: 'generation', img: I + 'pompe.jpg', q: 'Débit maxi de la pompe Hydro Leduc du PPLD ?', c: ['100 L/min', '40 L/min', '380 L/min'], e: 'Pompe à pistons (11), 92 cm³, cylindrée variable.' },
      { l: 'generation', img: I + 'pompe-phases.jpg', q: 'Tarage du ressort de stand-by (tiroir LS) ?', c: ['30 b', '320 b', '25 b'], e: 'DAD 320 b ; réducteur de pilotage du RSQ 240 : 25 b.' },
      { l: 'generation', img: I + 'pompe-phases.jpg', q: 'Tarage du dispositif d’annulation de débit de la pompe ?', c: ['320 b', '30 b', '200 b'], e: 'Récepteur en butée : la pompe s’annule et maintient la pression maxi.' },
      { l: 'generation', img: I + 'pompe-phases.jpg', q: 'Distributeurs fermés (neutre), que fait la pompe ?', c: ['Le plateau se redresse : plus de débit, maintien de 30 b', 'Cylindrée maxi à 320 b', 'Elle s’arrête complètement à 0 b'], e: 'Seul un petit débit subsiste pour les gicleurs.' },
      { l: 'generation', q: 'Rôle du gicleur anti-pompage ?', c: ['Créer une fuite (1 L/min) sur le circuit du vérin de plateau pour éviter ses oscillations', 'Protéger le circuit à 380 b', 'Remplir le réservoir'], e: 'Sans lui, le plateau oscille et le débit varie sans cesse.' },
      { l: 'generation', img: I + 'reservoir.jpg', q: 'Capacité du réservoir hydraulique du PPLD ?', c: ['380 litres', '100 litres', '209 litres'], e: 'Filtre haute pression après la pompe, filtre basse pression au retour.' },
      { l: 'generation', img: I + 'huile.jpg', q: 'Par quelle huile la RH-545 est-elle remplacée ?', c: ['XH-68 (grade ISO VG 68)', 'XH-32', 'RH-68'], e: 'XH-68 : de −20 °C à 100 °C (température de l’huile).' },
      { l: 'generation', img: I + 'huile.jpg', q: 'Quelle part des problèmes hydrauliques est causée par la pollution ?', c: ['70 %', '10 %', '30 %'], e: 'D’où le contrôle régulier de la propreté de l’huile.' },

      /* CETOP */
      { l: 'cetop', img: I + 'cetop-entree.jpg', q: 'Section d’entrée CETOP : tarage de l’étage pilote ?', c: ['200 b', '20 b', '380 b'], e: 'Étage principal (balance) 20 b : pression maxi 220 b.' },
      { l: 'cetop', img: I + 'cetop-entree.jpg', q: 'Pression maxi du circuit des stabilisateurs (bloc CETOP en butée) ?', c: ['220 b', '200 b', '320 b'], e: 'Étage pilote 200 b + étage principal 20 b.' },
      { l: 'cetop', img: I + 'cetop-entree.jpg', q: 'Rôle du gicleur LS (0,7) de la section d’entrée CETOP ?', c: ['Créer une ΔP au neutre pour avoir la pression de stand-by', 'Déséquilibrer l’étage principal en butée', 'Régler la vitesse des stabilisateurs'], e: 'Le gicleur 0,5 est le gicleur de déséquilibre.' },
      { l: 'cetop', img: I + 'cetop-entree.jpg', q: 'Rôle du solénoïde de décharge LS du bloc CETOP ?', c: ['Monter la pression LS en travail ou décharger la ligne LS au neutre', 'Couper l’alimentation de la pompe', 'Verrouiller les stabilisateurs'], e: 'Il est piloté dès qu’on touche aux manipulateurs des stabs.' },
      { l: 'cetop', img: I + 'cetop-entree.jpg', q: 'Pourquoi le limiteur de débit de la section d’entrée CETOP est-il neutralisé ?', c: ['Un régulateur de débit 3 voies est monté en amont sur P', 'Il est hors service', 'Pour augmenter la pression'], e: 'L’élément d’entrée standard peut limiter le débit mais pas le réguler.' },
      { l: 'cetop', img: I + 'cetop-travail.jpg', q: 'Type de distributeur des sections de travail CETOP ?', c: ['4/3 centre fermé en Y/T, commande électrique et manuelle de secours, rappel par ressort', '6/3 centre ouvert', '4/2 commande pneumatique'], e: 'Ce sont les distributeurs des stabilisateurs.' },
      { l: 'cetop', q: 'Débit du régulateur de débit placé avant le bloc des stabilisateurs ?', c: ['40 L/min', '100 L/min', '15 L/min'], e: 'Système débit : vitesse constante quelle que soit la charge.' },

      /* RSQ 240 */
      { l: 'rsq240', img: I + 'rsq240.jpg', q: 'Caractéristiques du distributeur RSQ 240 ?', c: ['Jusqu’à 350 bar et 100 L/min, double flux séparé (low flow et full flow)', 'Jusqu’à 200 bar et 40 L/min, simple flux', 'Centre fermé en série, 20 L/min'], e: 'Montage parallèle, régulation Load Sensing système débit/pression.' },
      { l: 'rsq240', img: I + 'rsq-entree.jpg', q: 'RSQ 240 : tarage et rôle du réducteur de pression 3 voies ?', c: ['25 b : pression de pilotage des tiroirs', '380 b : protection du système', '30 b : stand-by'], e: 'Il amortit aussi les déplacements des tiroirs (pas de pics de pression).' },
      { l: 'rsq240', img: I + 'rsq-entree.jpg', q: 'RSQ 240 : tarage du limiteur de pression à commande pilotée de la section d’entrée ?', c: ['380 bar', '220 bar', '25 bar'], e: 'Étage pilote 350 + étage principal 30 : protection générale si la régulation de pompe est défaillante.' },
      { l: 'rsq240', img: I + 'rsq-fonctionnement.jpg', q: 'Qu’est-ce que le low flow ?', c: ['Un faible débit secondaire qui passe par un étranglement de la section d’entrée puis par le canal LS', 'Le débit principal vers le récepteur', 'Le débit de fuite vers le drain'], e: 'Le full flow est le débit principal ; le low flow décolle le clapet anti-dérive.' },
      { l: 'rsq240', img: I + 'rsq-travail.jpg', q: 'Section de travail RSQ 240 : quel type pour un moteur hydraulique ?', c: ['Distributeur 4×3 LS centre fermé Y/T', 'Distributeur 4×3 LS centre fermé (sans Y/T)', 'Distributeur 4/2'], e: 'Le 4×3 sans Y/T est destiné aux vérins double effet.' },
      { l: 'rsq240', img: I + 'rsq-travail.jpg', q: 'Section de travail RSQ 240 : que sont les repères 9 et 10 ?', c: ['Limiteurs de pression secondaires sortie A et sortie B', 'Solénoïdes 24 V', 'Clapets anti-dérive'], e: '2 et 8 = solénoïdes 24 V ; 6 = clapet anti-dérive ; 7 = régulateur 2 voies.' },
      { l: 'rsq240', img: I + 'rsq-explicitation.jpg', q: 'Pourquoi la vitesse d’un récepteur reste-t-elle constante quelle que soit la charge ?', c: ['ΔP régulateur + ΔP distributeur = tarage du tiroir LS : les ΔP restent constantes, donc le débit aussi', 'Parce que la pompe est à cylindrée fixe', 'Parce que le DAD s’ouvre'], e: 'Pression de service = LS + tarage du tiroir LS.' },

      /* Fonctions */
      { l: 'fonctions', img: I + 'rmu-synopsis.jpg', q: 'RMU : comment est protégé le circuit du corps de flèche ?', c: ['Par 2 soupapes de freinage montées dans le sens de rentrée des tiges', 'Par un limiteur de débit', 'Par un accumulateur'], e: 'Elles maîtrisent le mouvement et maintiennent les vérins en cas de chute de pression.' },
      { l: 'fonctions', img: I + 'rmu-synopsis.jpg', q: 'RMU : rôle du limiteur de débit du télescopage ?', c: ['Assurer la sortie simultanée des deux vérins jumelés', 'Protéger le circuit à 300 b', 'Freiner le télescope'], e: 'Les vérins se déplacent en sens opposés pour allonger le télescope.' },
      { l: 'fonctions', img: I + 'rmu-synopsis.jpg', q: 'Tracté-tiré en terrain accidenté : comment libérer le vérin correcteur d’assiette ?', c: ['Une fois broché, ouvrir les 2 vannes manuelles de mise à flot (arrière du coffre n° 6)', 'Débrancher le flexible', 'Mettre le commutateur sur MANU'], e: 'Les refermer impérativement avant de débrocher le véhicule remorqué.' },
      { l: 'fonctions', img: I + 'grue-synopsis.jpg', q: 'Grue : angle du secteur arrière ?', c: ['15° de part et d’autre de l’axe arrière', '65° de part et d’autre', '100° de part et d’autre'], e: 'Secteurs latéraux 100° ; secteur avant 65° de part et d’autre de l’axe avant.' },
      { l: 'fonctions', img: I + 'grue-synopsis.jpg', q: 'Grue : élévation mini pour passer au-dessus du secteur avant ?', c: ['50°', '15°', '10°'], e: 'Sinon les capteurs de fin de course des secteurs latéraux stoppent la rotation.' },
      { l: 'fonctions', img: I + 'grue-synopsis.jpg', q: 'Treuil de levage : quand la sécurité de déroulement arrête-t-elle le câble ?', c: ['Quand il reste 5 spires sur le tambour', 'Quand il reste 1 m de câble', 'Quand la masselotte touche la moufle'], e: 'La sécurité d’enroulement, elle, évite le contact crochet/moufle.' },
      { l: 'fonctions', img: I + 'grue-synopsis.jpg', q: 'Grue : comment est freiné le moteur de rotation à l’arrêt ?', c: ['Par le ressort de rappel du vérin simple effet de verrouillage', 'Par l’huile sous pression', 'Par le CEC'], e: 'En fonctionnement, l’huile dé-freine le moteur via le détecteur de circuit.' },
      { l: 'fonctions', img: I + 'electro-coupures.jpg', q: 'Quand les électrovannes de contrôle de la grue sont-elles désexcitées ?', c: ['Quand le CEC détecte une incohérence (abaques de travail dépassés)', 'À chaque arrêt du moteur', 'Quand le réservoir est chaud'], e: 'Le mouvement est alors stoppé.' },
      { l: 'fonctions', img: I + 'grue-synopsis.jpg', q: 'Grue : combien de capteurs donnent la position de l’allonge de poutre au CEC ?', c: ['2 capteurs électriques', '1 manomètre', 'Aucun'], e: 'Une soupape d’équilibrage maintient le vérin en cas de perte de pression.' },

      /* Énergie */
      { l: 'energie', q: 'Formule de la puissance hydraulique utilisée ?', c: ['P (kW) = p (bar) × Q (L/min) / 600', 'P = p × Q × 600', 'P = F × S'], e: 'Ex. : 30 b × 40 L/min / 600 = 2 kW.' },
      { l: 'energie', img: I + 'stabs-energie.jpg', q: 'Stabilisateurs au neutre : puissance absorbée ?', c: ['0,05 kW (30 b × 1 L/min / 600)', '2 kW', '8,87 kW'], e: 'Seul le gicleur anti-pompage consomme 1 L/min.' },
      { l: 'energie', img: I + 'rmu-energie.jpg', q: 'RMU et grue au neutre : débit de la pompe ?', c: ['2 L/min (gicleur anti-pompage + gicleur LS)', '1 L/min', '41 L/min'], e: '30 × 2 / 600 = 0,1 kW.' },
      { l: 'energie', q: 'Récepteur alimenté à 40 L/min : débit total de la pompe ?', c: ['41 L/min', '40 L/min', '100 L/min'], e: '40 pour le récepteur + 1 pour le gicleur anti-pompage.' },
      { l: 'energie', img: I + 'stabs-graphes.jpg', q: 'Stabilisateurs en butée : puissance totale absorbée ?', c: ['17,07 kW', '8,87 kW', '0,05 kW'], e: 'LP piloté 220 × 40 / 600 = 14,66 + régulateur 2 + gicleur 0,41.' },
      { l: 'energie', img: I + 'rmu-energie.jpg', q: 'Télescopage du RMU en butée (LPS 200 b) : pression de service ?', c: ['230 b', '200 b', '380 b'], e: 'LPS + 30 b : 230 × 41 / 600 = 15,71 kW.' },
      { l: 'energie', img: I + 'grue-energie.jpg', q: 'Rotation de la grue en fin de course (LPS 210 b) : pression de service et puissance ?', c: ['240 b ; 16,40 kW', '210 b ; 14 kW', '350 b ; 23 kW'], e: '210 + 30 = 240 b ; 240 × 41 / 600 = 16,40 kW.' },

      /* Diagnostic */
      { l: 'diagnostic', img: I + 'diag-resume.jpg', q: 'Un problème de force est un problème de :', c: ['Pression', 'Débit', 'Commande électrique'], e: 'F = P × S : on cherche du côté des appareils de pression.' },
      { l: 'diagnostic', img: I + 'diag-resume.jpg', q: 'Un problème de vitesse est un problème de :', c: ['Débit', 'Pression', 'Température'], e: 'v = Q / 6S : appareils de débit et leur commande.' },
      { l: 'diagnostic', img: I + 'diag-circuit-ouvert.jpg', q: 'Tous les récepteurs manquent de force ou de vitesse : où se situe l’anomalie ?', c: ['Entre la génération et la distribution', 'Entre la distribution et le récepteur', 'Dans le récepteur'], e: 'Un seul récepteur : entre la distribution et le récepteur.' },
      { l: 'diagnostic', img: I + 'diag-resume.jpg', q: 'Un seul récepteur, dans les deux sens : où chercher ?', c: ['Les éléments communs aux deux sens', 'La ligne d’alimentation d’un seul sens', 'La pompe'], e: 'Un seul sens : sur la ligne d’alimentation concernée.' },
      { l: 'diagnostic', q: 'Quel est le point de départ pour comprendre un circuit hydraulique ?', c: ['La reconnaissance des différents symboles', 'Le démontage de la pompe', 'La vidange'], e: 'Ex. : c’est un limiteur réglable ; vu sa place c’est le LPP, il protège tout le circuit.' },
      { l: 'diagnostic', q: 'Sur ces machines, quels problèmes rencontre-t-on le plus souvent ?', c: ['Électriques (connectique, oxydation, coupure)', 'Hydrauliques', 'Pneumatiques'], e: 'On les contrôle avec un contrôleur universel.' },
      { l: 'diagnostic', q: 'Pour le contrôle et la réparation, quelle référence fait foi ?', c: ['La documentation technique constructeur officielle (MAT)', 'Le cahier du stagiaire', 'L’habitude de l’atelier'], e: 'C’est la seule et unique référence.' },
      { l: 'diagnostic', img: I + 'moyens-controle.jpg', q: 'Quelle pression lit un manomètre ?', c: ['La pression relative (sans la pression atmosphérique)', 'La pression absolue', 'La pression différentielle'], e: 'Les boîtiers digitaux à capteurs piézorésistifs répondent plus vite.' },
      { l: 'diagnostic', img: I + 'moyens-controle.jpg', q: 'Branchement d’un manomètre avec capillaire : quelle précaution ?', c: ['Équiper le capillaire de son manomètre avant de le brancher sur la prise de pression', 'Brancher le capillaire seul puis le manomètre', 'Moteur arrêté uniquement'], e: 'Pour des raisons de sécurité.' },
      { l: 'diagnostic', img: I + 'moyens-controle.jpg', q: 'Comment se branche un débitmètre ?', c: ['Toujours en série', 'En parallèle', 'Sur le retour au réservoir uniquement'], e: 'Souvent difficile : le calcul d’un temps de cycle est plus rapide.' },
      { l: 'diagnostic', img: I + 'degrade-rsq.jpg', q: 'Mode dégradé de la grue et des treuils : que faut-il forcer ?', c: ['La vanne by-pass du RSQ 240 et les électrovannes de coupure', 'Uniquement la vanne by-pass CETOP', 'Le DAD de la pompe'], e: 'Pour chaque vanne : capuchon noir avec son joint, puis molette ; ensuite les manipulateurs du distributeur proportionnel.' },
      { l: 'diagnostic', q: 'Panne électrique complète : que vérifie-t-on en premier ?', c: ['Les fusibles du boîtier de distribution près des batteries', 'La pompe', 'Le niveau d’huile'], e: 'Si besoin, sortir le stabilisateur gauche pour y accéder.' },
      { l: 'diagnostic', q: 'Aucun stabilisateur ne bouge, boîtiers et façade éclairés, 0 b en M. Éléments à incriminer ?', c: ['Le régulateur de débit 3 voies ou la vanne by-pass', 'Un seul distributeur de stab', 'Le RSQ 240'], e: 'Tous les récepteurs, les 2 sens : entre la génération et la distribution.' },
      { l: 'diagnostic', q: 'Treuil de halage : il déroule mais n’enroule pas ; 30 b en enroulement, 350 b en fin de déroulement. Diagnostic ?', c: ['Distributeur : commande du solénoïde B', 'Pompe défaillante', 'Limiteur principal HS'], e: 'Un récepteur, un sens : ligne d’alimentation concernée ; contrôle en mode manuel puis au multimètre.' },
      { l: 'diagnostic', q: 'Correcteur d’assiette : il ne descend pas (30 b en descente, 340 b en butée à la montée). Éléments à contrôler ?', c: ['Le solénoïde A du distributeur ou la vanne manuelle côté tige grippée ouverte', 'La pompe', 'Le réservoir'], e: 'Confirmer en mode manuel, contrôler le solénoïde au multimètre, échanger les vannes manuelles.' }
    ]
  });
})();
