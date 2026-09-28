REV.add({
  id: 'equip', name: 'Équipement électrique', icon: '🔋', color: '#2563eb',
  desc: 'Mesures, relais, batterie, démarreur, alternateur, allumage, LIN, diagnostic, capteurs, CAN, schémas (livre FS2 + cours AGA 01).',
  lessons: [
    {
      id: 'mesures', title: 'Mesures et sécurité',
      html: `
<div class="tw"><table><tr><th>Appareil</th><th>Branchement</th><th>Remarque</th></tr>
<tr><td>Voltmètre</td><td>En parallèle (dérivation)</td><td>Circuit alimenté ; en fonctionnement pour mesurer une chute de tension</td></tr>
<tr><td>Ampèremètre</td><td>En série, ou pince ampèremétrique</td><td>Pince obligatoire pour les forts courants (démarreur, alternateur)</td></tr>
<tr><td>Ohmmètre</td><td>Composant isolé</td><td>Toujours hors tension, composant débranché</td></tr></table></div>
<ul>
<li><b>Chute de tension</b> : se mesure <b>circuit en charge</b>, voltmètre aux deux bouts d’un même fil ou d’une même connexion. Hors charge, un fil à moitié coupé peut afficher 0 V.</li>
<li><b>Règle du QCM</b> : plus de <b>1 V d’écart</b> sur un même potentiel = ligne HS.</li>
<li><b>Sécurité batterie</b> : débrancher le <b>− en premier</b>, le rebrancher <b>en dernier</b> (évite le court-circuit clé/masse). Ne jamais débrancher une batterie moteur tournant.</li>
</ul>`,
      retenir: ['Voltmètre en parallèle, ampèremètre en série, ohmmètre hors tension.', 'Chute de tension : toujours circuit EN CHARGE.', '> 1 V d’écart sur un même potentiel = ligne HS.'],
      pieges: ['Mesurer une chute de tension hors charge : un fil à moitié coupé affiche 0 V.', 'Débrancher le + en premier : risque de court-circuit avec la clé.'],
      memo: { cle: 'V // · A série · Ω hors tension', points: ['Batterie : − en premier, − en dernier', 'Chute de tension en charge : > 1 V = HS'], astuce: 'Le moins part le premier et revient le dernier.' }
    },
    {
      id: 'symboles', title: 'Symboles, commandes et connectique',
      html: `
<div class="tw"><table><tr><th>Élément</th><th>À savoir</th></tr>
<tr><td>Fusible / disjoncteur</td><td>Fusible = usage unique · disjoncteur = réarmable. Un fusible se remplace par le <b>même calibre</b> (5 A beige, 7,5 A marron, 10 A rouge, 15 A bleu, 20 A jaune, 25 A blanc, 30 A vert).</td></tr>
<tr><td>Interrupteur / bouton-poussoir</td><td>Interrupteur = position stable · poussoir = position instable (revient seul).</td></tr>
<tr><td>NO / NF</td><td>Normalement ouvert / normalement fermé = état au repos.</td></tr>
<tr><td>Commutateur / inverseur</td><td>Commutateur : ex. clignotants · inverseur : ex. feux route/croisement.</td></tr>
<tr><td>Conducteurs</td><td>Fil, masse, torsadé (protection magnétique), blindé (protection renforcée).</td></tr>
<tr><td>Connectique</td><td>Sans outil : fiche, connecteur, connecteur multivoies · avec outil : borne · soudé ou serti : épissure.</td></tr>
<tr><td>Croisement de fils</td><td>Sans point = pas de connexion · avec un point = épissure (liaison réelle).</td></tr>
<tr><td>Tensions</td><td>Continue (=) · alternative (~) · haute tension (éclair).</td></tr>
<tr><td>Câblage</td><td>Monofilaire = retour par la masse · bifilaire = retour par un fil.</td></tr>
<tr><td>Récepteurs</td><td>Moteur, démarreur, bobine, témoin, klaxon, pressostat, résistances (fixe, variable, chauffante), potentiomètre, thermistance.</td></tr></table></div>`,
      retenir: ['Fusible = usage unique, même calibre ; disjoncteur = réarmable.', 'Croisement avec un point = épissure ; sans point = pas de liaison.', 'Monofilaire = retour par la masse.'],
      pieges: ['Poussoir (instable) ≠ interrupteur (stable).'],
      memo: { cle: 'FUSIBLE : MÊME CALIBRE', points: ['10 A rouge · 15 A bleu · 20 A jaune · 30 A vert', 'Point sur un croisement = épissure', 'NO / NF = état au repos'], astuce: '« Un point, une liaison ; pas de point, pas de liaison. »' }
    },
    {
      id: 'relais', title: 'Le relais',
      html: `
<div class="tw"><table><tr><th>Borne</th><th>N°</th><th>Fonction</th></tr>
<tr><td>85</td><td>1</td><td>+ commande (bobine)</td></tr>
<tr><td>86</td><td>2</td><td>0 V commande (bobine)</td></tr>
<tr><td>30</td><td>3</td><td>Commun (+ puissance)</td></tr>
<tr><td>87a</td><td>4</td><td>Normalement fermé (NF) : s’ouvre quand le relais est excité</td></tr>
<tr><td>87</td><td>5</td><td>Commuté, normalement ouvert (NO) : se ferme quand le relais est excité</td></tr></table></div>
<div class="box methode"><b>✎ Contrôle</b><p>Bobine 85-86 à l’ohmmètre (quelques dizaines à centaines d’Ω ; infini = coupée). Puis alimenter 85-86 : « clic », continuité 30-87 et plus de continuité 30-87a.</p></div>`,
      retenir: ['85/86 = circuit de commande (bobine, faible courant).', '30/87/87a = circuit de puissance.', '87 = NO (se ferme excité) ; 87a = NF (s’ouvre excité).'],
      pieges: ['87 ≠ 87a.', 'Un relais dans la zone défectueuse = 2 zones de diagnostic : commande et puissance.'],
      memo: { cle: '85-86 COMMANDE · 30-87 PUISSANCE', flow: ['85-86 alimentées', '« clic »', '30 ↔ 87 fermé', '30 ↔ 87a ouvert'], astuce: '87a : « a » comme « au repos fermé ».' }
    },
    {
      id: 'batterie', title: 'La batterie',
      html: `
<div class="tw"><table><tr><th>Montage (2 × 12 V 60 Ah)</th><th>Résultat</th></tr>
<tr><td>Série</td><td>24 V / 60 Ah : la tension s’additionne</td></tr>
<tr><td>Parallèle</td><td>12 V / 120 Ah : la capacité s’additionne</td></tr></table></div>
<ul>
<li>Caractéristiques : tension (V), capacité (Ah), courant de démarrage (A pendant 20 s). Une 12 V = <b>6 éléments</b> de ≈ 2 V en série.</li>
<li>La <b>capacité</b> = courant maximal fourni pendant un temps donné. La batterie est <b>dimensionnée par rapport à la puissance du démarreur</b>.</li>
<li>Plomb : plaques en plomb, électrolyte eau + acide sulfurique (le nickel, c’est la Ni-Cd).</li>
<li><b>Recharge = 1/10 de la capacité</b> : 80 Ah → 8 A pendant 10 h (ou 4 A / 20 h, 2 A / 40 h) ; 300 Ah → 30 A / 10 h ou 15 A / 20 h ; 75 Ah en 60 h → 1,25 A.</li>
<li><b>État de charge au repos (12 V)</b> : 12,6–12,7 V chargée · 12,4 V ≈ 75 % · 12,2 V ≈ 50 % · moins de 12 V déchargée. En 24 V, doubler.</li>
<li><b>Courant de fuite</b> : pince ou ampèremètre en série sur la masse, calculateurs en veille ; quelques dizaines de mA maxi, sinon retirer les fusibles un par un.</li>
<li><b>Prise OBD</b> : 16 = +BAT ; 4 et 5 = masse ; 6 = CAN H ; 14 = CAN L.</li>
</ul>
<h3>Compléments du cours AGA 01</h3>
<ul>
<li><b>Définition</b> : l’accumulateur reçoit de l’énergie électrique, la stocke sous forme <b>chimique</b> (charge) et la restitue sous forme électrique (décharge).</li>
<li><b>Rôles</b> : fournir la puissance au démarreur, alimenter les récepteurs à l’arrêt, compléter l’alternateur quand son débit est insuffisant.</li>
<li><b>Constitution</b> : plaques positives (dioxyde de plomb) et négatives (plomb spongieux) en parallèle dans chaque élément, séparateurs isolants perméables, bac en polypropylène, barrettes qui relient les éléments en série, bouchons de dégazage. Borne + = <b>gros diamètre</b>, borne − = petit diamètre.</li>
<li><b>Tension par élément</b> : 2 V (1,8 à 2,2 V selon la charge) ; 2,1 V chargé ; dégagement gazeux à 2,4–2,5 V ; <b>fin de décharge 1,75 V</b> — ne pas descendre en dessous.</li>
<li><b>FEM et résistance interne</b> : en décharge U = E − Rb × I ; en charge U = E + Rb × I. Rb (0,01 à 0,03 Ω) augmente avec la décharge et le froid.</li>
<li><b>Capacité nominale</b> : quantité d’électricité fournie en <b>20 h</b> (au 1/20 de la capacité) jusqu’à 1,75 V par élément. Ex. : 50 Ah = 2,5 A pendant 20 h. Elle baisse quand la température descend sous 25 °C.</li>
<li><b>Courant d’essai à froid</b> (ex. 250 A) : débit pendant au moins 60 s à −18 °C avec au moins 8,4 V ; le démarreur doit tourner à plus de 150 tr/min.</li>
<li><b>Densité de l’électrolyte</b> : élément chargé <b>1,280</b> (1 280 g/L), déchargé <b>1,120</b>. Pays froids 1,290 (moins de risque de gel) ; pays chauds 1,230 (moins de sulfatation).</li>
</ul>`,
      retenir: ['12 V = 6 éléments de 2 V.', 'Recharge à 1/10 de la capacité pendant 10 h.', '12,6 V = chargée ; 12,2 V = 50 % ; < 12 V = déchargée.'],
      pieges: ['Une batterie à 12,2 V à vide doit être rechargée AVANT tout diagnostic de démarrage.'],
      memo: { cle: 'RECHARGE = 1/10 DE LA CAPACITÉ', points: ['80 Ah → 8 A × 10 h', '300 Ah → 30 A × 10 h ou 15 A × 20 h', '12,6 V 100 % · 12,4 V 75 % · 12,2 V 50 %', 'OBD : 16 +BAT · 4/5 masse · 6 CAN H · 14 CAN L'], astuce: 'On ne teste pas un démarreur avec une batterie à moitié vide.' }
    },
    {
      id: 'batterie-entretien', title: 'Batterie : maladies, entretien et charge',
      html: `
<h3>Les maladies des batteries</h3>
<div class="tw"><table><tr><th>Maladie</th><th>Causes</th><th>Indices</th></tr>
<tr><td><b>Sulfatation anormale</b> (sulfate de plomb cristallisé, impossible à réduire)</td><td>Repos prolongé déchargée, mauvais stockage, densité trop forte, niveau bas, recharge incomplète, charge ou décharge trop forte</td><td>Plaques de couleur claire, gonflement, décharge rapide, sels sur les bornes</td></tr>
<tr><td><b>Court-circuit interne</b></td><td>Chute de matière active qui relie le bas des plaques, plaques déformées ou tombées</td><td>Tension d’élément faible, sels grimpants</td></tr>
<tr><td><b>Corrosion des grilles positives</b></td><td><b>Surcharge</b></td><td>Température qui monte, dégagement gazeux, fortes chutes de tension</td></tr></table></div>
<p>La sulfatation <b>normale</b> apparaît à chaque décharge et disparaît à la charge ; elle devient anormale après une décharge trop longue ou une charge incomplète.</p>
<h3>Entretien courant</h3>
<ul><li>Batterie propre et sèche (évite les fuites de courant) ; fixation, bac sans fêlure.</li>
<li>Bornes sulfatées : brosse métallique, puis <b>graisse conductrice</b> après serrage.</li>
<li>Jamais de flamme ni d’étincelle : risque d’explosion (hydrogène + oxygène).</li>
<li>Batterie défectueuse → toujours contrôler aussi le <b>circuit de charge</b>.</li>
<li>Stockage : à l’abri du gel, vers 15 °C, recharge tous les 1 à 2 mois (ou chargeur d’entretien).</li>
<li>Pour préparer l’électrolyte : <b>verser l’acide dans l’eau</b>, jamais l’eau dans l’acide.</li></ul>
<h3>Contrôles</h3>
<ul><li><b>Pèse-acide</b> : densité minimale ≈ 1,24 (28° Baumé) ; zone verte = normale, jaune = minimum, rouge = trop faible. Une densité normale ne garantit pas un bon démarrage.</li>
<li><b>Aptitude au démarrage</b> (le seul test qui juge vraiment la batterie) : débit de <b>3 × la capacité</b> (55 Ah → 165 A) pendant ≈ 15 s, 3 fois avec 1 min de repos. Au 3ᵉ essai, une 12 V ne doit pas passer <b>sous 9 V</b>.</li>
<li><b>Courant de fuite</b> contact coupé : <b>&lt; 30 mA</b> à la pince.</li>
<li>Décharge spontanée : une batterie bien chargée démarre encore à 0 °C après 5 semaines, à −20 °C après 10 jours d’immobilisation.</li></ul>
<div class="tw"><table><tr><th>Pendant l’essai de décharge</th><th>État</th></tr>
<tr><td>Intensité nulle</td><td>Batterie défectueuse (coupure)</td></tr>
<tr><td>La tension chute rapidement vers zéro</td><td>Batterie défectueuse (court-circuit)</td></tr>
<tr><td>Tension stabilisée au-dessus de 9 V</td><td>Batterie bonne</td></tr>
<tr><td>La tension ne se stabilise pas</td><td>Batterie usagée</td></tr></table></div>
<h3>Charge</h3>
<ul><li>Toujours en <b>courant continu</b>, + du chargeur sur le + de la batterie. Débrancher d’abord le − (masse) sur le véhicule.</li>
<li>Intensité classique : <b>1/10 de la capacité</b> (50 Ah → 5 A). Faire dégeler une batterie gelée avant de la charger.</li>
<li>Indices de fin de charge : bouillonnement, densité 32° Baumé, plaques rouges (+) et grises (−). La batterie est chargée quand la densité n’augmente plus.</li>
<li>Brancher les pinces <b>avant</b> d’alimenter le chargeur ; couper le chargeur <b>avant</b> de retirer les pinces (risque d’explosion).</li>
<li>Groupement pour la charge : même capacité dans une branche série. Ex. 4 × 12 V 45 Ah en série → 48 V, charge à 4,5 A.</li>
<li><b>Batterie sans entretien</b> : chargeur auto-régulé à tension constante, <b>14 à 14,5 V, 30 A maxi</b>, sans ébullition. Durée selon la tension au repos : &lt; 12 V → 24 h ; 12 à 12,3 V → 12 h ; &gt; 12,3 V → 6 h. Charge unitaire (pas de batteries différentes en parallèle).</li>
<li><b>Booster</b> : usage exceptionnel, toujours en actionnant le démarreur en même temps.</li></ul>
<h3>État des batteries (MAT 2630)</h3>
<div class="tw"><table><tr><th>Rond rouge</th><th>Rond blanc</th><th>Rond bleu</th></tr>
<tr><td>Chargée humide · durée de vie 18 mois</td><td>Chargée sèche · 2 h de pose après remplissage · durée de vie 5 ans</td><td>Déchargée sèche · à charger au 1/20 de la capacité · stockage 10 ans</td></tr></table></div>
<p>Batterie chargée sèche : remplir d’électrolyte à 1,28, attendre 30 min à 2 h. Les batteries usagées sont remises à l’organisme de soutien.</p>`,
      retenir: ['Test d’aptitude : 3 × C pendant 15 s, 3 fois ; > 9 V au 3ᵉ essai (12 V).', 'Fuite < 30 mA contact coupé.', 'Sans entretien : 14–14,5 V, 30 A maxi, pas d’ébullition.', 'Surcharge → corrosion des grilles positives.'],
      pieges: ['L’acide se verse dans l’eau, jamais l’inverse.', 'Couper le chargeur avant de retirer les pinces (étincelle = explosion).'],
      memo: { cle: 'EAU DISTILLÉE, JAMAIS D’ACIDE', flow: ['Niveau et propreté', 'Densité au pèse-acide', 'Recharge 1/10 C', 'Test d’aptitude 3 × C (> 9 V)', 'Contrôle du circuit de charge'], points: ['Sulfatation = décharge trop longue / charge incomplète', 'Surcharge = corrosion des grilles +', 'Rouge humide 18 mois · blanc sèche 5 ans · bleu déchargée 10 ans'], astuce: '« Fais comme tu dois, mets l’acide dans l’eau ».' }
    },
    {
      id: 'demarreur', title: 'Le démarreur',
      html: `
<p><b>Le cycle</b> : on tourne la clé → le + arrive à EXC. Les deux bobines sont alimentées : la <b>bobine d’appel</b> (faible résistance, gros courant, en série avec le moteur) attire vite le noyau plongeur, qui pousse la fourchette et engrène le pignon. En fin de course, le noyau ferme le contacteur de puissance : le moteur électrique reçoit le plein courant. La bobine d’appel se retrouve avec + des deux côtés (court-circuitée) : seule la <b>bobine de maintien</b> garde le noyau. On relâche la clé → le ressort ramène le noyau, le frein d’induit arrête la rotation.</p>
<div class="tw"><table><tr><th>Fonction</th><th>Organe</th></tr>
<tr><td>Rotation</td><td>Induit = rotor · inducteur = stator</td></tr>
<tr><td>Commande</td><td>Solénoïde → fourchette → lanceur</td></tr>
<tr><td>Liaison électrique</td><td>Balais (charbons) sur le collecteur : assurent la continuité du circuit d’induit</td></tr>
<tr><td>Repos</td><td>Ressort de rappel + frein d’induit</td></tr></table></div>
<ul>
<li><b>Solénoïde</b> : noyau plongeur, bobine d’appel, bobine de maintien, ressort de rappel. Il ferme le circuit de puissance et entraîne fourchette-lanceur.</li>
<li><b>Bornes</b> : EXC (+ après contact démarrage) · +BAT · +DEM (sortie vers le moteur électrique).</li>
<li><b>Bobine d’appel</b> : en série avec le moteur, se teste entre <b>EXC et +DEM</b>. Résistance la plus faible.</li>
<li><b>Bobine de maintien</b> : se teste entre <b>EXC et la masse</b>. Résistance ≈ <b>2 × celle d’appel</b> (appel 2 Ω → maintien 4 Ω ; 3 Ω → 6 Ω).</li>
<li><b>Moteur électrique</b> : <b>&lt; 1 Ω</b> (7 Ω ou 1,2 Ω = HS).</li>
<li><b>Lanceur</b> : roue libre — le moteur démarré n’entraîne pas le démarreur.</li>
<li>Le démarreur est la <b>force contre-électromotrice</b> du circuit ; en diesel, il entraîne le moteur à ≈ <b>200 tr/min</b>.</li>
<li>Moteur qui ne démarre pas après 20 s de lancement → contrôler PMH, pression de rampe, arbre à cames.</li>
</ul>
<div class="tw"><table><tr><th>Réseau</th><th>Tension mini aux batteries sous démarreur</th></tr>
<tr><td>12 V</td><td>9,6 V (80 %)</td></tr><tr><td>24 V</td><td>19,2 V (80 %)</td></tr></table></div>
<div class="tw"><table><tr><th>Symptôme / mesure</th><th>Cause</th></tr>
<tr><td>Bobine d’appel coupée</td><td>Rien ne se passe : le noyau n’est pas attiré</td></tr>
<tr><td>Démarreur qui colle par intermittence (« mitraillette »)</td><td>Bobine de maintien HS, ou batterie faible</td></tr>
<tr><td>Batteries &lt; 19,2 V au démarrage (24 V), ex. 18 V</td><td>Batteries en cause</td></tr>
<tr><td>Batteries &gt; 19,2 V (ex. 22 V) mais démarreur qui peine</td><td>Démarreur HS</td></tr>
<tr><td>25,3 V aux batteries, 24 V au +BAT démarreur (ou 2 V d’écart)</td><td>Perte en ligne sur le câble positif (chute &gt; 1 V)</td></tr>
<tr><td>Démarreur qui ne réagit pas au contacteur</td><td>Peut venir de balais usés</td></tr></table></div>
<div class="box methode"><b>✎ Méthode — diagnostic complet du démarreur</b><p>1) <b>Résistances du démarreur</b> : bobine d’appel et bobine de maintien bonnes (maintien ≈ 2 × appel), moteur du démarreur <b>au plus proche de 0 Ω</b> (&lt; 1 Ω).<br>2) <b>Ligne</b> : on doit retrouver <b>Ubat</b> à la borne <b>+DEM</b> du démarreur. Pas la même tension aux batteries qu’à la borne +DEM → <b>perte en ligne</b> (câble sectionné, cosse desserrée ou oxydée).<br>3) <b>Tension des batteries pendant le lancement</b> :<br>• la tension <b>s’effondre</b> (chute trop importante) alors que batteries et démarreur sont bons → le démarreur force : <b>moteur thermique grippé</b> ;<br>• la tension <b>reste trop élevée</b> (elle ne chute presque pas) et le démarreur peine → peu de courant passe : <b>résistance du moteur du démarreur trop élevée</b>.</p></div>
<div class="box methode"><b>✎ Méthode — démarrage lent</b><p>1) Tension batterie à vide (recharger si bas) · 2) tension aux batteries pendant le lancement · 3) chute de tension ligne + (batterie → +BAT démarreur) puis ligne − (masse batterie → carcasse) pendant le lancement · 4) essai d’intensité au démarrage.</p></div>
<h3>Compléments du cours AGA 01</h3>
<ul>
<li><b>Rôle</b> : lancer le moteur à une vitesse suffisante pour obtenir les premières combustions. Vitesse de lancement à 0 °C : essence 80 à 100 tr/min ; diesel 70 à 200 tr/min selon le type et le préchauffage (≈ 200 tr/min retenu au test).</li>
<li>Couple à fournir au démarrage : <b>1/3 à 1/2 du couple moteur</b>. Rapport de démultiplication démarreur/moteur : <b>10 à 20</b>.</li>
<li>Moteur <b>série</b> à commande positive : couple élevé, absorbe <b>300 à 500 A</b> (jusqu’à 2 000 A au décollage). Câble jusqu’à 75 mm².</li>
<li>Principe : <b>loi de Laplace</b> F = B × I × L × sin α — un conducteur parcouru par un courant dans un champ magnétique subit une force. Inverser <b>un seul</b> paramètre (courant ou champ) inverse le sens de rotation.</li>
<li>Démarreur : <b>inducteur</b> (bobinages + masses polaires sur la carcasse) = crée le champ ; <b>induit</b> (collecteur, tambour, bobinage) = tourne. Le balai + est isolé.</li>
<li>Le <b>relais</b> de démarrage limite les chutes de tension dans les fils longs : un faible courant commande un fort courant.</li>
<li>Le contacteur à clé a un <b>anti-redémarrage</b> : il faut revenir au zéro. Dents du lanceur abîmées = ce retour à zéro ne fonctionne pas.</li>
</ul>
<div class="box methode"><b>✎ Contrôle du solénoïde déposé (+ sur l’excitation)</b><p>1) <b>Appel</b> : − sur DEM → le relais s’enclenche. 2) <b>Maintien</b> : − sur la carcasse, pousser le noyau → il doit rester enclenché. 3) <b>Lame de contact</b> : − sur BAT, pousser le noyau → il doit rester enclenché.</p></div>
<ul>
<li>Bobinages (inducteur, induit) : 3 contrôles — isolement (infini par rapport à la masse), coupure, court-circuit (valeur constructeur).</li>
<li>Balais : coulissent librement, ni gras ni humides, <b>usure maxi 60 %</b> de la longueur.</li>
<li>Rien ne se passe à la clé → contacteur électromagnétique possible. Bruit de mitraillette sans rotation → bobinage de maintien interrompu.</li>
</ul>`,
      images: [{ src: 'demarreur.jpg', cap: 'Démarreur : solénoïde (bobinages d’appel et de maintien, noyau plongeur, contacteur), fourchette, pignon, moteur électrique, balais' }],
      retenir: ['Appel : EXC ↔ +DEM, faible résistance, en série avec le moteur.', 'Maintien : EXC ↔ masse, ≈ 2 × la résistance d’appel.', 'Moteur électrique < 1 Ω.', 'Mini sous démarreur : 9,6 V (12 V) · 19,2 V (24 V).'],
      pieges: ['Maintien coupé = colle par intermittence (mitraillette), pas « ne fonctionne pas ».', 'Appel coupé = rien ne se passe.', '12,2 V à vide / 9,2 V en charge : on RECHARGE d’abord.'],
      memo: { cle: 'APPEL ATTIRE · MAINTIEN MAINTIENT', flow: ['Clé → + à EXC', 'Bobine d’appel attire le noyau', 'Pignon engrené + contacteur fermé', 'Moteur à plein courant', 'Bobine de maintien seule'], points: ['Appel 2 Ω → maintien 4 Ω', 'Moteur < 1 Ω', '24 V : < 19,2 V = batteries ; > 19,2 V = démarreur', 'Diesel : lancement ≈ 200 tr/min'], astuce: 'L’appel donne le coup de poing, le maintien tient la porte.' }
    },
    {
      id: 'alternateur', title: 'Alternateur et régulateur',
      html: `
<ul>
<li><b>Rôle</b> : alimenter les récepteurs et recharger la batterie.</li>
<li><b>Inducteur = rotor</b> (tourne, électro-aimant alimenté par les balais) : il crée le champ magnétique, c’est lui qui reçoit le <b>courant d’excitation</b>.</li>
<li><b>Induit = stator</b> : reçoit le champ et produit le courant triphasé, redressé par les diodes de puissance.</li>
<li><b>Régulateur</b> : <b>limite la tension de sortie</b> en dosant l’excitation. Composé de 2 transistors (PNP), 1 diode Zener (seuil), 1 inducteur, 1 diode roue libre (protection).</li>
</ul>
<div class="tw"><table><tr><th>Réseau</th><th>Tension de régulation (moteur tournant)</th></tr>
<tr><td>12 V</td><td>13,5 à 15 V</td></tr><tr><td>24 V</td><td>28 à 29,5 V</td></tr></table></div>
<p>Le moteur fait tourner le rotor alimenté par les balais : c’est un électro-aimant tournant. Son champ traverse les 3 bobinages du stator, qui produisent un alternatif triphasé. Le <b>pont de 6 diodes</b> (2 par phase) le redresse. Le régulateur coupe/rétablit l’excitation : plus d’excitation = plus de tension. Sur un <b>9 diodes</b>, la pré-excitation passe par la <b>lampe témoin</b>, d’où la panne « lampe HS = pas de charge ».</p>
<h3>Reconnaître le type d’alternateur</h3>
<div class="tw"><table><tr><th>Type</th><th>Bornes</th><th>Particularités</th></tr>
<tr><td>6 diodes, régulateur incorporé</td><td>2 bornes : L et + (+ B+)</td><td>Multifonction : charger/alimenter, allumer le témoin, rupture de courroie.</td></tr>
<tr><td>6 diodes, régulateur séparé</td><td>+BAT, −BAT, EXC</td><td>EXC contact mis moteur arrêté = tension batterie ; moteur tournant = tension de régulation.</td></tr>
<tr><td>9 diodes (ancienne génération)</td><td>1 borne L (ou D+)</td><td>6 diodes de puissance + 3 diodes trio d’excitation. Monofonction. Borne L : 2–3 V contact mis, URT moteur tournant.</td></tr>
<tr><td>12 diodes</td><td>2 bornes L et +</td><td>Régulateur intégré. 2 diodes de puissance par phase en parallèle : plus de courant.</td></tr>
<tr><td>Numérique / LIN</td><td>B+ + 1 petit fil (LIN)</td><td>Piloté par un calculateur, IBS sur la batterie.</td></tr></table></div>
<p>Borne L (témoin/excitation) : D+, L, +A/L, IND (DIN : KL61) · Masse : B−, D−, M, GRD, 31, E · Borne W : compte-tours (vieux diesels).</p>
<h3>Pannes</h3>
<div class="tw"><table><tr><th>Symptôme</th><th>Cause</th></tr>
<tr><td>Surtension 12 V (17 ou 19 V moteur tournant)</td><td>Régulateur HS, défaut du circuit d’excitation, ou masse du régulateur</td></tr>
<tr><td>Surtension sur un 9 diodes (ex. 32 V sur PL)</td><td>1 diode trio HS et/ou régulateur HS</td></tr>
<tr><td>9 diodes : plus de débit, batterie qui se décharge dans l’induit</td><td>2 ou 3 diodes trio HS</td></tr>
<tr><td>9 diodes : témoin qui ne s’allume pas contact mis</td><td>Inducteur HS ou régulateur HS (circuit série coupé) ; balais usés</td></tr>
<tr><td>9 diodes : lampe témoin HS</td><td>Plus de pré-excitation → ne charge plus. Dépannage : shunter +BAT vers +L</td></tr>
<tr><td>6 diodes rég. incorporé : lampe témoin HS ou fil L débranché</td><td>Continue de charger ; le témoin ne s’allume plus</td></tr>
<tr><td>Voltmètre instable, régulateur séparé</td><td>Régulateur HS ou sans masse</td></tr></table></div>
<ul><li><b>Test de charge</b> : allumer un maximum de consommateurs.</li>
<li><b>Débit</b> : pince sur le câble B+, régime accéléré, consommateurs allumés, à comparer à l’étiquette (ex. 14 V 190 A).</li>
<li>Alimenter directement l’inducteur : si l’alternateur débite, on a contrôlé l’inducteur.</li></ul>
<h3>Compléments du cours AGA 01</h3>
<ul>
<li><b>Principe</b> : « magnétisme + mouvement = électricité » (<b>loi de Lenz</b>) — une variation de flux dans une bobine crée une tension sinusoïdale. Pas de mouvement, pas de FEM.</li>
<li>La batterie a surtout un rôle de <b>réserve</b> : moteur tournant, c’est l’alternateur qui alimente les consommateurs. <b>Ce sont les récepteurs qui déterminent le débit</b> : sans consommateur, l’alternateur ne débite pas.</li>
<li>L’alternateur est <b>auto-limiteur d’intensité</b> ; seule la tension doit être régulée, en <b>coupant l’excitation du rotor</b> (limiter la sortie directement serait trop complexe). Sous 13,5 V l’inducteur est mis à la masse ; au-dessus de 15 V cette masse est coupée.</li>
<li><b>Rotor</b> : 2 masses polaires à 6 griffes (12 pôles), bobinage, bagues collectrices. <b>Stator</b> : 3 bobinages décalés de <b>120°</b>, couplés en étoile ou (le plus souvent) en <b>triangle</b>.</li>
<li><b>Pont de diodes</b> : 3 diodes + et 3 diodes −, éventuellement 3 diodes d’excitation ; il redresse, fournit l’excitation (trio) et <b>empêche la batterie de se décharger dans le stator</b>. Existe en 8 diodes (étoile avec point milieu) et 12 diodes.</li>
<li><b>Condensateur</b> : évite le clignotement de la lampe témoin et lisse le courant.</li>
<li><b>Lampe témoin</b> : 3 W sur un 9 diodes ; 1,2 à 1,6 W chez Renault (régulateur multifonction). Une lampe de mauvaise puissance fausse l’information.</li>
<li>Régulateur <b>monofonction</b> (9 diodes) : la lampe s’allume en cas de décharge. <b>Multifonction</b> (6 diodes) : en cas de décharge <b>et</b> de surcharge.</li>
<li><b>47 % des pannes</b> viennent de l’environnement de l’alternateur (fuites d’huile ou de gasoil qui usent bagues et balais).</li>
</ul>
<div class="box methode"><b>✎ Contrôles à l’ohmmètre</b><p><b>Rotor</b> : une pointe sur chaque bague = continuité (valeur constructeur) ; bague / carcasse = infini (isolement). <b>Pont de diodes</b> : une diode correcte ne laisse passer le courant que dans un sens ; coupée = aucun sens ; en court-circuit = les deux sens. Diodes sorties de leur logement = batterie ou chargeur branché à l’envers, ou soudure à l’arc alternateur branché.</p></div>
<div class="box piege"><b>⚠ Précautions</b><ul><li>Ne jamais faire tourner l’alternateur rotor alimenté sans liaison avec la batterie.</li><li>Une inversion de polarité de la batterie <b>détruit le pont de diodes</b>.</li><li>Pour charger la batterie ou <b>souder à l’arc</b>, débrancher l’<b>alternateur</b>, pas seulement la batterie.</li></ul></div>`,
      images: [{ src: 'alternateur.jpg', cap: 'Alternateur à régulateur incorporé : balais et inducteur, stator, pont de diodes de puissance et diodes d’excitation, bornes D+, B+ et W' }],
      retenir: ['2 bornes L et + ⇒ 6 ou 12 diodes, régulateur intégré (même refroidi par liquide).', '1 seule borne L ⇒ 9 diodes (3 petites diodes trio en plus).', 'Diodes trio : éteindre le voyant, exciter l’inducteur, éviter que la batterie se décharge dans l’induit.', 'Le régulateur polarise l’inducteur « sur le plus ».'],
      pieges: ['1 diode trio HS = surtension ; 2 ou 3 HS = plus de charge du tout.', 'Lampe témoin HS : 9 diodes = ne charge plus ; 6 diodes rég. incorporé = continue de charger.'],
      memo: { cle: 'RÉGULATEUR = RÉGULE (limite la tension)', flow: ['Moteur fait tourner le rotor (inducteur)', 'Champ magnétique', 'Stator (induit) → triphasé', 'Pont de 6 diodes → continu', 'Régulateur dose l’excitation', 'Tension stable'], points: ['12 V : 13,5–15 V · 24 V : 28–29,5 V', 'Rotor = inducteur · Stator = induit', '12 diodes = 2 diodes par phase = meilleur rendement'], astuce: 'Le régulateur ne fabrique pas l’électricité : il empêche la tension de partir trop haut ou trop bas.' }
    },
    {
      id: 'allumage', title: 'L’allumage (moteur essence)',
      html: `
<p><b>Rôle</b> : amorcer, à l’instant le plus favorable, la combustion du mélange air-essence comprimé. Le mélange s’enflamme vers <b>400 °C</b> : on l’atteint avec un <b>arc électrique</b> entre les électrodes de la bougie. Il faut disposer d’au moins <b>12 000 à 20 000 V</b> (≈ 20 kV pour 1 mm d’écartement sous 30 bar).</p>
<p>Principe : à partir des 12 V de la batterie, la <b>bobine</b> élève la tension, un <b>déclencheur</b> (rupteur, module transistorisé ou calculateur) choisit l’instant, le <b>distributeur</b> répartit la haute tension entre les cylindres.</p>
<h3>L’allumage classique</h3>
<ul><li><b>Bobine</b> : transformateur avec un <b>primaire</b> (basse tension, peu de spires), un <b>secondaire</b> (haute tension, beaucoup de spires) et un noyau de fer doux.</li>
<li>La haute tension naît d’une <b>variation brutale du flux</b> (loi de Lenz) : elle est d’autant plus grande que le flux est important, que le secondaire a beaucoup de spires et que la variation est <b>rapide</b>.</li>
<li><b>Rupteur</b> fermé = le primaire se charge ; rupteur qui <b>s’ouvre</b> = coupure brutale = étincelle. L’étincelle ne se produit qu’à l’ouverture, car à la fermeture le courant de self-induction ralentit la variation.</li>
<li>L’arbre du rupteur tourne à <b>demi-vitesse du vilebrequin</b> (1 étincelle par cylindre pour 2 tours) et porte autant de cames que de cylindres.</li>
<li><b>Condensateur</b> : absorbe l’<b>extra-courant de rupture</b> → protège les contacts du rupteur et accélère la coupure → étincelle plus forte.</li>
<li><b>Distributeur</b> : le doigt répartit la haute tension selon l’ordre d’allumage, synchronisé avec le rupteur.</li>
<li><b>Bougie</b> : deux électrodes (dont une à la masse), culot, isolant. Degré thermique adapté au moteur : moteur lent → bougie chaude ; moteur poussé, rapide → bougie froide.</li></ul>
<h3>Angle de came (dwell)</h3>
<p>Angle pendant lequel les contacts du rupteur sont <b>fermés</b> : ≈ <b>63 % de dwell</b> fermé / 37 % ouvert, soit sur un 4 cylindres <b>57° fermé et 33° ouvert</b> (90° par cylindre). Il se règle par l’écartement des contacts.</p>
<ul><li><b>Trop petit</b> (contacts trop écartés) : bobine mal remplie → ratés à haut régime.</li>
<li><b>Trop grand</b> (contacts pas assez écartés) : rupture peu franche → étincelle faible, bobine qui chauffe.</li></ul>
<h3>Point d’allumage et correcteurs d’avance</h3>
<ul><li>Le calage initial convient au ralenti ; il faut ensuite corriger l’avance.</li>
<li><b>Avance centrifuge</b> : fonction du <b>régime</b> (masselottes + 2 ressorts qui décalent l’arbre porte-cames).</li>
<li><b>Avance à dépression</b> : fonction de la <b>charge / du remplissage</b> (capsule à membrane qui tourne le plateau porte-rupteur). Moins bon remplissage = combustion plus lente = plus d’avance.</li></ul>
<p>Limites de l’allumage classique : courant primaire limité à <b>4 A</b>, arc aux contacts, usure du toucheau et de la came qui décale l’avance, fréquence limitée (≈ 18 000 étincelles/min).</p>
<h3>L’allumage transistorisé</h3>
<ul><li>Le <b>module transistorisé</b> remplace le rupteur, le <b>générateur</b> remplace la came : plus de rupteur ni de condensateur.</li>
<li>Transistor NPN : base alimentée = le primaire se charge ; base coupée = coupure franche = haute tension. Le module contient mise en forme, gestion de l’angle de came (adapté au régime), amplification et étage de puissance (souvent un Darlington).</li>
<li><b>Générateur inductif</b> : roue polaire en étoile (une branche par cylindre) + aimant + bobine → tension alternative de 0,5 V (bas régime) à 100 V (haut régime).</li>
<li><b>Générateur à effet Hall</b> : rotor à écrans (un par cylindre) qui coupe le champ de l’aimant → signal carré de 5 V.</li>
<li><b>Bobine spécifique</b> : primaire de 1,5 Ω au lieu de 3 Ω, courant de 7 à 8 A au lieu de 4 A, ≈ 25 000 V au lieu de 18 000 V. Une bobine d’allumage classique n’est pas interchangeable.</li>
<li><b>Avantages</b> : haute tension plus forte et constante même à haut régime, jusqu’à 21 000 étincelles/min, pas d’usure de contacts. <b>Inconvénient</b> : les avances restent mécaniques → évolution vers l’<b>allumage électronique intégral</b>.</li></ul>`,
      images: [{ src: 'allumage-classique.jpg', cap: 'Allumage classique : batterie, bobine, rupteur, condensateur, distributeur et bougies' }, { src: 'allumage-transistorise.jpg', cap: 'Allumage transistorisé : le capteur (étoile + aimant + bobinage) pilote le module qui coupe le primaire de la bobine' }],
      retenir: ['Bobine = élever la tension (primaire BT, secondaire HT).', 'L’étincelle naît à l’OUVERTURE du rupteur (coupure brutale du primaire).', 'Condensateur = protège le rupteur et renforce l’étincelle.', 'Centrifuge = régime ; dépression = charge.', 'Angle de came 4 cyl. : 57° fermé / 33° ouvert (63 % dwell).'],
      pieges: ['Angle de came trop petit = contacts trop écartés (et inversement).', 'Moteur poussé et rapide = bougie FROIDE.'],
      memo: { cle: 'BOBINE ÉLÈVE · RUPTEUR COUPE · DISTRIBUTEUR RÉPARTIT', flow: ['12 V batterie', 'Primaire de la bobine se charge (rupteur fermé)', 'Rupteur s’ouvre → variation brutale du flux', 'Secondaire : 12 000 à 25 000 V', 'Distributeur → bougie'], points: ['Condensateur : absorbe l’extra-courant de rupture', 'Avance centrifuge = régime ; dépression = charge', 'Transistorisé : module + générateur (inductif ou Hall)'], astuce: 'C’est quand on coupe le courant que ça claque : comme un interrupteur qui fait une étincelle en s’ouvrant.' }
    },
    {
      id: 'lin', title: 'Bus LIN et IBS',
      html: `
<ul>
<li><b>LIN = Local Interconnect Network</b> : monofilaire, fil violet ou bleu, 0,35 mm², sans blindage. 1 maître (calculateur) + esclaves, débit faible (≈ 20 kb/s). Le CAN, lui, est multi-maître.</li>
<li><b>IBS = Intelligent Battery Sensor</b> : sur la masse de la batterie, au plus près.</li>
<li>Contact mis : tension sur le fil LIN ≈ <b>80 % de Ubat</b> (≈ 9,6 à 10 V en 12 V).</li>
<li>Moteur tournant : la tension de charge varie de 10,7 à 16 V (jusqu’à 16–17 V) selon la demande du calculateur → <b>16 V = normal</b>.</li>
<li>Le LIN sert à : <b>commander la tension de l’inducteur, envoyer la température, régler la tension de consigne</b>. Il ne gère pas le refroidissement. Signal <b>numérique</b>, contrôle à l’oscilloscope.</li>
<li><b>Avantages</b> : régulation adaptée à l’état de charge de la batterie, remontée d’informations et de diagnostic, meilleur rendement moteur.</li>
</ul>`,
      retenir: ['LIN = 1 maître + esclaves, monofilaire, lent.', 'Contact mis : ≈ 80 % de Ubat sur le fil LIN.', '16 V moteur tournant sur un alternateur LIN = normal.'],
      pieges: ['Alternateur LIN à 13,2 V moteur tournant = MODE SECOURS (bus LIN coupé), tension fixe. Ce n’est pas « correct ».'],
      memo: { cle: 'LIN = 1 MAÎTRE · CAN = MULTI-MAÎTRE', points: ['Contact mis : 80 % Ubat', 'Moteur tournant : jusqu’à 16–17 V = normal', '13,2 V fixe = mode secours', 'LIN : excitation + température + consigne'], astuce: '13,2 V pile et qui ne bouge plus ? Le LIN est coupé.' }
    },
    {
      id: 'diagnostic', title: 'Diagnostic : court-circuit, coupure, zone de diagnostic',
      html: `
<div class="tw"><table><tr><th></th><th>Court-circuit</th><th>Coupure</th></tr>
<tr><td>Définition</td><td>Contact entre un fil + et la masse</td><td>Rupture de la continuité</td></tr>
<tr><td>Signes / lieux</td><td>Fusible grillé · indicateur à valeur fausse · composant qui a pris feu</td><td>Fil, fusible, récepteur, relais, interrupteur</td></tr></table></div>
<ul>
<li>Indicateur à valeur fausse → ZD de l’indicateur jusqu’avant la masse.</li>
<li>Fusible qui saute <b>à l’appui</b> sur la commande → ZD du milieu de l’organe de commande jusqu’avant la masse.</li>
<li>Fusible qui saute <b>avant l’appui</b> → ZD après le fusible jusqu’au milieu de l’organe de commande.</li>
<li>Plusieurs composants HS → chercher le <b>point commun</b> (+ ou masse) : la ZD commence et finit à ce point.</li>
<li>Relais dans la partie défectueuse → <b>2 ZD</b> : commande et puissance.</li>
</ul>`,
      retenir: ['Aucun des 3 signes du court-circuit → c’est une coupure.', 'Une seule panne à la fois.', 'La masse ne fait JAMAIS partie de la zone de diagnostic (ZD).'],
      pieges: ['Inclure la masse dans la ZD.', 'Oublier la 2ᵉ ZD quand un relais est dans la partie défectueuse.'],
      memo: { cle: 'COURT-CIRCUIT = 3 SIGNES', points: ['Fusible grillé', 'Indicateur à valeur fausse', 'Composant qui a pris feu', 'Sinon → coupure'], astuce: 'La masse n’est jamais coupable dans la ZD.' }
    },
    {
      id: 'capteurs', title: 'Les capteurs',
      html: `
<ul>
<li><b>Actif</b> = produit son propre courant, se comporte comme un <b>générateur</b>, sans alimentation extérieure : <b>seul l’inductif</b>. <b>Passif</b> = tout capteur qui reçoit un courant (alimenté), 99 % en 5 V (CTN, CTP, potentiomètre, capacitif, piézo-électrique, piézo-résistif, effet Hall).</li>
<li>Passif 3 fils : 5 V · signal · 0 V. Résistance de pull-up ≈ 4,80–4,90 V : stabilise le signal et renseigne sur son état.</li>
<li>Ordre de contrôle : capteur → connecteur → faisceau. Signal analogique = peut prendre une multitude de valeurs.</li>
</ul>
<div class="tw"><table><tr><th>Capteur</th><th>Type</th><th>Signal / contrôle</th></tr>
<tr><td>Contacteur</td><td>—</td><td>Binaire 0/1</td></tr>
<tr><td>CTN</td><td>Passif</td><td>T° ↑ → R ↓ et tension ↓ (vérifier les deux)</td></tr>
<tr><td>CTP</td><td>Passif</td><td>T° ↑ → R ↑</td></tr>
<tr><td>Potentiomètre</td><td>Passif</td><td>Linéaire, souvent double piste (auto-vérification) ; pédale d’accélérateur</td></tr>
<tr><td>Capacitif</td><td>Passif</td><td>Pression ↑ → tension ↑</td></tr>
<tr><td>Piézo-résistif</td><td>Passif</td><td>Relevé de pression par déformation</td></tr>
<tr><td>Inductif</td><td>Actif</td><td>Sinusoïde : fréquence ET amplitude variables. Contrôle statique : sa résistance vs valeur constructeur</td></tr>
<tr><td>Effet Hall</td><td>Passif</td><td>Carré : fréquence variable, amplitude fixe (5 V). Contrôle : alim/signal/masse + test dynamique au voltmètre avec un aimant ; idéal : oscilloscope</td></tr>
<tr><td>Piézo-électrique</td><td>Passif</td><td>Pics de tension sur choc (cliquetis) ; oscilloscope</td></tr>
<tr><td>MAP (pression absolue)</td><td>Passif</td><td>Signal continu proportionnel à la pression ; 250 kPa ≈ 4,65 V ; 100 kPa = pression atmosphérique</td></tr>
<tr><td>MAF (film chaud)</td><td>—</td><td>Mesure le refroidissement d’un fil chauffé → masse d’air</td></tr></table></div>
<ul><li>Rotation : <b>inductif ou effet Hall</b>. Pression : <b>capacitif ou piézo-résistif</b>.</li>
<li>Actionneur en <b>PWM (RCO)</b> = signal modulé en largeur d’impulsion (rapport cyclique en %) ; le multimètre n’en voit que la moyenne. Injecteurs : PWM ou tout-ou-rien ; bobine d’allumage : tout-ou-rien.</li></ul>
<h3>Cours « Les capteurs dans l’automobile » : les 11 familles</h3>
<p>Les <b>capteurs</b> informent le <b>calculateur</b> qui, en fonction de ces données, commande les <b>actionneurs</b> (relais, électrovanne RCO, moteur électrique, moteur pas à pas, injecteurs, bobines d’allumage, témoin de diag).</p>
<div class="tw"><table><tr><th>Capteur</th><th>Signal délivré</th><th>Fonctionnement</th><th>Contrôle</th></tr>
<tr><td><b>Contacteur</b></td><td>Binaire 0 / 1 (créneau)</td><td>Style « interrupteur »</td><td>Ohmmètre entre 1 et 2 (ou voltmètre si branché)</td></tr>
<tr><td><b>CTN</b></td><td>R décroissante avec la T°</td><td>Coefficient de Température Négatif : T° ↑ → R ↓</td><td>Ohmmètre (ou voltmètre si branché) en chauffant</td></tr>
<tr><td><b>CTP</b></td><td>R croissante avec la T°</td><td>Coefficient de Température Positif : T° ↑ → R ↑</td><td>Ohmmètre (ou voltmètre si branché)</td></tr>
<tr><td><b>Potentiomètre</b></td><td>Tension linéaire croissante</td><td>Résistance variable (3 bornes, curseur) ; souvent <b>double piste</b> (auto-vérification) ; peut avoir un contacteur « pied levé » ou « pied à fond »</td><td>Ohmmètre entre curseur (3) et une extrémité ; voltmètre si branché</td></tr>
<tr><td><b>Capacitif</b></td><td>Tension linéaire</td><td>Plus la pression est élevée, plus le signal est élevé (action hydraulique ou pneumatique)</td><td>Voltmètre</td></tr>
<tr><td><b>Inductif</b></td><td>Sinusoïde : fréquence ET amplitude variables</td><td>Varie avec la vitesse de rotation de l’organe ; certains peuvent être alimentés</td><td>Ohmmètre (résistance + <b>isolement</b> / masse) ou voltmètre <b>alternatif</b> si branché</td></tr>
<tr><td><b>Effet Hall</b></td><td>Carré : fréquence variable, <b>amplitude fixe</b> (ex. 5 V)</td><td>Plaquette Hall ; 3 fils : 5 V · sortie · masse</td><td>Voltmètre sur les 3 fils ; <b>de préférence oscilloscope</b></td></tr>
<tr><td><b>Opto-électrique</b></td><td>Carré : fréquence variable, amplitude fixe (ex. 5 V) ; numérique 0101…</td><td>Roue phonique + capteur optique double ; rotation ou débattement</td><td>Voltmètre sur +12 V, 2 signaux, masse ; oscilloscope</td></tr>
<tr><td><b>Piézo-résistif</b></td><td>Tension proportionnelle à la pression</td><td>Au repos stable ; sous pression il se déséquilibre et génère une tension (pont de Wheatstone)</td><td>Voltmètre (Us, +, −)</td></tr>
<tr><td><b>Piézo-électrique</b></td><td>Pics de tension</td><td>Sous vibrations ou pressions (chocs, cliquetis) il génère une tension à ses bornes</td><td>Voltmètre en provoquant des chocs ; <b>de préférence oscilloscope</b></td></tr>
<tr><td><b>Débitmètre</b> (film chaud)</td><td>Tension croissante avec la masse d’air (jusqu’à 12 V)</td><td>Film à résistances refroidi par l’air → résistance et tension changent ; le calculateur en déduit la masse d’air et le carburant à injecter</td><td>Voltmètre : +12 V, signal, masse</td></tr>
<tr><td><b>Sonde lambda</b></td><td>0 à 1 000 mV : ≈ 900 mV mélange <b>riche</b> (λ &lt; 1), ≈ 100 mV <b>pauvre</b> (λ &gt; 1), bascule à λ = 1</td><td>Couche de <b>platine</b> : tension quand la teneur en oxygène diffère entre l’intérieur et l’extérieur ; efficace à <b>300 °C</b> → résistance chauffante</td><td>Voltmètre sur le signal (1 → masse) et sur la résistance chauffante (3 +12 V → 4 masse)</td></tr></table></div>
<h3>Les principes physiques</h3>
<ul>
<li><b>Inductif (loi de Lenz)</b> : un bobinage soumis à une <b>variation de flux magnétique</b> génère une tension induite. <b>Période</b> = temps que met un signal pour se reproduire à l’identique ; <b>fréquence</b> = nombre de périodes par seconde, en <b>hertz</b>.</li>
<li><b>Effet Hall</b> : une plaquette de <b>semi-conducteur (silicium)</b> parcourue par un courant, soumise à un champ magnétique, présente une faible ddp à ses bornes (amplifiée par un transistor → signal carré).</li>
<li><b>Piézo-résistivité</b> : certains corps <b>modifient leur résistance</b> sous une contrainte mécanique. <b>Piézo-électricité</b> : certains corps <b>produisent une ddp</b> sur leurs faces sous une contrainte mécanique.</li>
<li><b>Pont de Wheatstone</b> : il est à l’équilibre quand la ddp entre ses deux points milieux A et B est <b>nulle</b> ; la résistance sensible à la pression le déséquilibre.</li>
<li><b>Opto-électrique</b> : un émetteur et un récepteur <b>infrarouge</b> (invisible pour l’œil). Le récepteur (phototransistor) devient <b>conducteur</b> quand il reçoit l’onde, <b>isolant</b> quand elle disparaît.</li></ul>`,
      retenir: ['Seul l’inductif est actif ; tous les autres (CTN, CTP, effet Hall, piézo…) sont passifs.', 'Sonde lambda : riche ≈ 900 mV, pauvre ≈ 100 mV, efficace à 300 °C.', 'Hall et opto-électrique : carré à amplitude fixe → oscilloscope.', 'Inductif = sinus à amplitude variable ; Hall = carré à amplitude fixe.', 'Actif = se comporte comme un générateur, pas d’alimentation.'],
      pieges: ['Le capteur à effet Hall est PASSIF (convention du cours), même si une fiche mémoire dit actif.', 'CTN : vérifier que R ET la tension baissent quand la température monte.'],
      memo: { cle: 'ACTIF = GÉNÉRATEUR · PASSIF = ALIMENTÉ 5 V', points: ['Actif : l’inductif seulement', 'Passifs : CTN, CTP, Hall, potentiomètre, capacitif, piézo-résistif, piézo-électrique', 'Inductif → sinus ; Hall → carré 5 V', 'CTN : T° ↑ → R ↓'], astuce: 'CTN = Coefficient de Température Négatif : quand ça chauffe, la résistance descend.' }
    },
    {
      id: 'can', title: 'Multiplexage et réseau CAN',
      html: `
<ul>
<li><b>Multiplexage</b> : faire circuler une multitude d’informations sur une seule ligne (le bus, du latin omnibus).</li>
<li>CAN (1983) · VAN (1986). Bus CAN = <b>série, asynchrone, paire différentielle torsadée</b> CAN H / CAN L, <b>multi-maître</b>.</li>
<li>La torsade rejette les <b>perturbations électromagnétiques</b> (même parasite sur les 2 fils, le récepteur lit la différence) et limite le rayonnement.</li>
<li><b>CAN HS</b> (débit élevé) : moteur, BV, ABS, direction. <b>CAN LS / confort</b> : combiné, habitacle. <b>K-Line</b> : bus série bas débit, diagnostic, antidémarrage EWS. <b>PT-CAN / F-CAN</b> : bus dédiés (ex. module SZL). <b>BSI / gateway</b> : passerelle entre réseaux.</li>
<li>Bit = 1 caractère binaire · octet = 8 bits · trame = plusieurs octets.</li>
</ul>
<p>Chaque calculateur lit la <b>différence</b> entre CAN H et CAN L. Récessif : les deux à 2,5 V, écart 0 = <b>bit 1</b>. Dominant : H à 3,5 V, L à 1,5 V, écart 2 V = <b>bit 0</b>. Les 2 résistances de 120 Ω aux extrémités évitent les échos ; mesurées ensemble en parallèle, elles donnent <b>60 Ω</b>.</p>
<div class="tw"><table><tr><th>Caractéristique</th><th>Valeur</th></tr>
<tr><td>Débit</td><td>125 kb/s à 1 Mb/s</td></tr><tr><td>Nœuds</td><td>2 à 30</td></tr><tr><td>Alimentation</td><td>5 V</td></tr>
<tr><td>Terminaison</td><td>2 × 120 Ω en parallèle → ligne = 60 Ω (60 ± 5 Ω)</td></tr>
<tr><td>Dominant (0) — état logique</td><td>CAN H = 3,5 V · CAN L = 1,5 V</td></tr><tr><td>Récessif (1) — état logique</td><td>CAN H = CAN L = 2,5 V (somme toujours 5 V)</td></tr></table></div>
<div class="tw"><table><tr><th>Mesure à la prise OBD</th><th>Normal</th><th>Anomalie</th></tr>
<tr><td>Ohmmètre : broches 6-14 (batterie débranchée)</td><td>60 Ω</td><td>120 Ω = fil coupé ou terminaison HS · ≈ 0 Ω = H et L en court-circuit</td></tr>
<tr><td>Voltmètre : broches 14-6 (L/H)</td><td>0,5 à 0,7 / 0,9 V</td><td>≥ 1 V = réseau saturé (interface de ligne)</td></tr>
<tr><td>Voltmètre : broche 6 / broche 4 ou 5 (CAN H / masse)</td><td>2,4 à 3,2 V</td><td>Hors plage = interface de ligne H HS</td></tr>
<tr><td>Voltmètre : broche 14 / broche 4 ou 5 (CAN L / masse)</td><td>1,8 à 2,6 V</td><td>Hors plage = interface de ligne L HS</td></tr></table></div>
<ul>
<li>Calculateur défaillant : débrancher les calculateurs un par un jusqu’à retrouver 0,5 V entre 14 et 6.</li>
<li>Trame (7 champs) : initial 1 bit · statut 12 · contrôle 6 · données 0 à 64 · sécurité 16 · confirmation 2 · fin 7.</li>
<li>Calculateur : <b>étage d’entrée</b> (capteurs, convertisseur analogique/numérique) → micro-ordinateur → <b>étage de sortie</b> (actionneurs). Contrôleur de protocole : construit la trame, rejette une trame corrompue. Interface de ligne : traduit 0–5 V et se connecte au bus.</li>
<li>Recherche de panne réseau : 1. architecture · 2. outil de diagnostic · 3. point commun des réseaux · 4. plage de fonctionnement · 5. débrancher les calculateurs un par un.</li>
</ul>
<h3>Compléments du cours AGA 01</h3>
<ul>
<li>Pourquoi multiplexer : de plus en plus de calculateurs (45 à 70 sur une Audi A8) ; une porte conducteur en filaire classique demande 33 fils. Le multiplexage réduit longueur de câble, connexions et fusibles.</li>
<li>Le bus peut être filaire, optique ou hertzien (le plus souvent filaire). Protocoles : <b>CAN, VAN, LIN, MOST, FlexRay</b> ; les plus répandus : CAN puis VAN.</li>
<li>Un message (trame) est fait d’octets (1 octet = 8 bits) ; le protocole envoie le message au bon boîtier et écarte les messages incorrects.</li>
<li>CAN High Speed (états logiques) : 2,5 V &lt; CAN H &lt; 3,5 V et 1,5 V &lt; CAN L &lt; 2,5 V ; un message ne part que si le bus est libre depuis un certain temps (temps de latence).</li>
<li>Calculateur : l’étage d’entrée convertit les signaux (souvent analogiques) en numérique ; le micro-ordinateur ne comprend que le numérique ; l’étage de sortie renvoie des signaux analogiques (12 V, 0 V…) aux actionneurs ; le gestionnaire de protocole fait la conversion série ↔ parallèle et contrôle les trames. Le calculateur moteur <b>intègre</b> allumage, injection, refroidissement, dépollution.</li>
<li><b>Conversion décimal → binaire</b> : diviser par 2 jusqu’à un quotient de 1, puis lire du dernier quotient vers le premier reste. 13 = 1101 (8 + 4 + 0 + 1).</li>
</ul>
<h3>Schéma bloc d’un calculateur</h3>
<ul><li><b>Capteurs → étage d’entrée → micro-ordinateur → étage de sortie → actionneurs.</b></li>
<li>Capteurs (exemple d’un calculateur moteur diesel) : présence d’eau, débitmètre, températures (air d’admission, liquide de refroidissement, carburant, suralimentation, air ambiant), PMH, AAC (arbre à cames), pression de rampe, positions papillon / EGR / turbo, manocontact de pression d’huile, pédales (accélérateur, embrayage, frein), surveillance batterie.</li>
<li>Actionneurs : EV de dosage, module de préchauffage, injecteurs piézo-électriques, visco-coupleur de ventilateur, moteur de boîtier papillon, vanne EGR, turbo à géométrie variable, alternateur.</li>
<li>Entre le micro-ordinateur et le <b>contrôleur de protocole</b> (construit la trame, contrôle émissions et réceptions), puis entre celui-ci et l’<b>interface de ligne</b> (traduit électriquement entre 0 et 5 V) : bus interne <b>série/parallèle</b>. Entre l’interface de ligne et le bus CAN : liaison <b>série</b>.</li></ul>
<h3>Support de transmission</h3>
<ul><li>Les données circulent sur une <b>paire filaire différentielle torsadée</b> : CAN L et CAN H. La ligne se termine par des <b>résistances de terminaison</b> (120 Ω à chaque extrémité).</li>
<li>Chaque nœud : microcontrôleur → <b>contrôleur CAN</b> (Tx, Rx) → <b>émetteur/récepteur CAN</b> (TxD, RxD) → CAN H / CAN L.</li>
<li><b>Mode différentiel</b> : le récepteur (un amplificateur différentiel) lit CAN H − CAN L. Bit <b>1</b> : H = L = 2,5 V ; bit <b>0</b> : H = 3,5 V, L = 1,5 V. Exemple du fascicule : le message 101001.</li>
<li><b>Rôle de la torsade</b> : les champs magnétiques créés par le courant dans chaque fil s’annulent, l’inductance de la paire diminue, le câble résiste mieux aux signaux extérieurs, et un parasite touche les deux fils de la même façon — la différence reste juste.</li></ul>`,
      images: [{ src: 'can-niveaux.jpg', cap: 'États du bus CAN : récessif (2,5 V / 2,5 V) et dominant (CAN H 3,5 V / CAN L 1,5 V)' }, { src: 'can-transmission-bits.jpg', cap: 'Transmission du message 101001 en mode différentiel : bit 1 = 2,5 V / 2,5 V, bit 0 = 3,5 V / 1,5 V' }, { src: 'calculateur-schema-bloc.jpg', cap: 'Schéma bloc d’un calculateur : capteurs, étage d’entrée, micro-ordinateur, étage de sortie, contrôleur de protocole, interface de ligne' }, { src: 'can-support-transmission.jpg', cap: 'Support de transmission : paire torsadée CAN H / CAN L, résistances de terminaison de 120 Ω' }],
      retenir: ['Ligne = 60 Ω ; UNE résistance de terminaison = 120 Ω.', 'Dominant = 0 (H 3,5 V / L 1,5 V) ; récessif = 1 (2,5 V / 2,5 V).', 'CAN HS = moteur, BV, ABS, direction ; combiné = réseau confort.', 'Torsadé = contre les perturbations électromagnétiques.'],
      pieges: ['On écrit OBD, pas « ODB ».', 'Le 5 V de l’électronique embarquée n’est pas la tension batterie.', 'CAN H à 3,5 V = niveau logique 0 (dominant), pas 1 : le niveau 1 (récessif) est à 2,5 V / 2,5 V.'],
      memo: { cle: 'CAN : LE CALCULATEUR LIT LA DIFFÉRENCE', flow: ['Récessif : H 2,5 / L 2,5 → bit 1', 'Dominant : H 3,5 / L 1,5 → bit 0', 'Somme toujours 5 V'], points: ['6-14 = 60 Ω (120 Ω = coupure)', 'H/masse 2,4–3,2 V · L/masse 1,8–2,6 V', 'L/H 0,5–0,9 V (≥ 1 V = saturé)', 'CAN = série différentiel multi-maître'], astuce: 'Deux 120 Ω en parallèle = 60 Ω : si tu lis 120, il en manque une.' }
    },
    {
      id: 'schemas', title: 'Lecture de schéma électrique',
      html: `
<div class="tw"><table><tr><th>Repère</th><th>Signification</th></tr>
<tr><td>J ou P</td><td>Connecteur (JP43 broche 1, J4A broche 6)</td></tr>
<tr><td>KL30</td><td>+ permanent</td></tr><tr><td>KL15</td><td>+ après contact (APC)</td></tr>
<tr><td>KL31 / KL50 / KL58 / KL61</td><td>Masse / commande démarreur / feux de position / témoin de charge</td></tr>
<tr><td>Nombre sur un fil</td><td>Numéro de fil</td></tr><tr><td>F + n°</td><td>Fusible</td></tr>
<tr><td>≫</td><td>Renvoi sur un autre schéma</td></tr><tr><td>Pointillés</td><td>Limite entre deux faisceaux ou cartes</td></tr>
<tr><td>& / ≥1 / 1 avec rond</td><td>Portes ET / OU / NON</td></tr></table></div>
<div class="box methode"><b>✎ Méthode</b><p>1. Partir de l’alimentation (KL30 ou KL15) et du fusible. 2. Suivre les numéros de fils, noter connecteurs et broches. 3. Repérer l’organe de commande (commodo, interrupteur, relais). 4. Arriver au récepteur puis à la masse. 5. Chaque changement de faisceau ou de carte = point de mesure.</p></div>
<p><b>PVP</b> : équipements alimentés en <b>12 V et 24 V</b> ; connecteurs repérés <b>J et P</b>. Les recherches de panne s’arrêtent à la centrale électrique.</p>
<p>Exemple — avertisseur : KL30 24 V → J8 → F2 → carte centrale → commodo feux / BO → F42 → J1 → JP82 → avertisseurs → J115 → masse.</p>`,
      retenir: ['KL30 = + permanent ; KL15 = + après contact ; KL31 = masse ; KL50 = démarreur.', 'PVP : 12 V et 24 V, connecteurs J et P.'],
      pieges: ['Confondre KL30 et KL15.'],
      memo: { cle: '30 PERMANENT · 15 APRÈS CONTACT', flow: ['KL30 / KL15', 'Fusible', 'Commande', 'Récepteur', 'Masse (KL31)'], points: ['KL50 démarreur · KL58 position · KL61 témoin de charge', 'Changement de faisceau = point de mesure'], astuce: '30 est toujours là (permanent) ; 15 attend la clé.' }
    }
  ],
  questions: [
    { l: 'mesures', q: 'Comment se branche un voltmètre ?', c: ['En parallèle (dérivation)', 'En série', 'Composant débranché, hors tension', 'Avec une pince sur le câble'], e: 'Le voltmètre mesure une différence de potentiel entre deux points : il se branche en dérivation, circuit alimenté.', r: 'V en parallèle, A en série, Ω hors tension.' },
    { l: 'mesures', q: 'Pour mesurer une chute de tension sur un câble, le circuit doit être :', c: ['En charge (en fonctionnement)', 'Hors tension', 'Batterie débranchée', 'Contact coupé'], e: 'Sans courant, pas de chute de tension : un fil à moitié coupé peut afficher 0 V hors charge.', r: 'Chute de tension = circuit en charge.' },
    { l: 'mesures', q: 'Lors d’une intervention, dans quel ordre débrancher la batterie ?', c: ['Le − en premier (et le rebrancher en dernier)', 'Le + en premier', 'Peu importe', 'Moteur tournant pour éviter les pics'], e: 'Débrancher le − d’abord évite qu’une clé touchant la masse ne crée un court-circuit sur le +. Jamais batterie débranchée moteur tournant.', r: 'Le moins part le premier, revient le dernier.' },
    { l: 'symboles', q: 'Sur un schéma, deux fils qui se croisent AVEC un point signifient :', c: ['Une épissure (liaison réelle)', 'Aucune connexion', 'Un fusible', 'Un fil blindé'], e: 'Sans point = pas de connexion ; avec un point = épissure, liaison électrique réelle.', r: 'Un point, une liaison.' },
    { l: 'symboles', q: 'Un fusible grillé se remplace par :', c: ['Un fusible du même calibre', 'Un fusible de calibre supérieur', 'Un disjoncteur', 'Un shunt'], e: 'Le fusible est dimensionné pour protéger le câble : un calibre supérieur laisserait brûler le faisceau.', r: 'Fusible = usage unique, même calibre (10 A rouge, 15 A bleu, 20 A jaune…).' },
    { l: 'relais', q: 'Sur un relais, que sont les bornes 85 et 86 ?', c: ['Le circuit de commande (bobine)', 'Le circuit de puissance', 'Le contact normalement fermé', 'Le contact normalement ouvert'], e: '85 = + commande, 86 = 0 V commande : c’est la bobine. 30/87/87a = puissance.', r: '85-86 commande, 30-87 puissance.' },
    { l: 'relais', q: 'Relais excité : quelle liaison est fermée ?', c: ['30 – 87', '30 – 87a', '85 – 87', '86 – 87a'], e: '87 est normalement ouvert (se ferme excité) ; 87a est normalement fermé (s’ouvre excité).', r: '87 = NO ; 87a = NF.', w: '87 ≠ 87a.' },
    { l: 'batterie', q: 'Combien d’éléments dans une batterie au plomb de 12 V ?', c: ['6', '12', '4', '2'], e: '6 éléments d’environ 2 V montés en série.', r: '12 V = 6 × 2 V.', src: 'Test final Q47 (officiel)' },
    { l: 'batterie', q: 'La capacité d’une batterie, c’est :', c: ['Le courant maximal fourni pendant un temps donné', 'La tension à vide', 'Le courant de démarrage pendant 20 s', 'La résistance interne'], e: 'Capacité en Ah : quantité d’électricité (courant × temps) que la batterie peut fournir.', r: 'Une batterie 90 Ah = 90 A pendant 1 h.', src: 'Test final Q46 (officiel)' },
    { l: 'batterie', q: 'Une batterie est dimensionnée par rapport à :', c: ['La puissance du démarreur', 'La puissance de l’alternateur', 'Le nombre de calculateurs', 'La cylindrée seule'], e: 'Le démarreur est le plus gros consommateur : la batterie est choisie pour pouvoir le faire tourner.', src: 'Test final Q48 (officiel)' },
    { l: 'batterie', q: 'Comment recharger une batterie de 300 Ah ?', c: ['30 A pendant 10 h', '300 A pendant 1 h', '3 A pendant 10 h', '60 A pendant 5 h'], e: 'Recharge au 1/10 de la capacité : 30 A pendant 10 h (ou 15 A pendant 20 h).', r: 'Recharge = 1/10 de la capacité.', src: 'OVI114 étendu' },
    { l: 'batterie', q: 'Batterie 12 V au repos : 12,2 V. Son état de charge ?', c: ['≈ 50 %', '≈ 100 %', '≈ 75 %', 'Déchargée à 0 %'], e: '12,6–12,7 V chargée · 12,4 V ≈ 75 % · 12,2 V ≈ 50 % · < 12 V déchargée.', r: 'Recharger avant tout diagnostic de démarrage.' },
    { l: 'batterie', q: '12 V : 12,2 V à vide, 9,2 V en charge. Que faites-vous en premier ?', c: ['Recharger la batterie', 'Contrôler les lignes', 'Faire l’essai d’intensité', 'Remplacer le démarreur'], e: 'La batterie n’est qu’à moitié chargée : on la recharge d’abord, puis on fait l’essai d’intensité au démarrage.', r: 'On ne teste pas un démarreur avec une batterie à moitié vide.', w: 'Le test n°5 répondait « essai d’intensité » : c’est l’étape suivante, après recharge.', src: 'Corrigé UV2 Q44' },
    { l: 'batterie', q: 'Sur la prise OBD, quelles broches pour CAN H et CAN L ?', c: ['6 = CAN H, 14 = CAN L', '4 = CAN H, 5 = CAN L', '14 = CAN H, 6 = CAN L', '16 = CAN H, 4 = CAN L'], e: 'OBD : 16 = +BAT ; 4 et 5 = masse ; 6 = CAN H ; 14 = CAN L.', r: '6 H, 14 L.' },
    { l: 'demarreur', q: 'Quelle bobine du solénoïde est en série avec le moteur électrique ?', c: ['La bobine d’appel', 'La bobine de maintien', 'L’inducteur', 'Aucune'], e: 'La bobine d’appel (EXC → +DEM) est en série avec le moteur : faible résistance, gros courant pour attirer vite le noyau.', r: 'Appel : EXC ↔ +DEM ; maintien : EXC ↔ masse.', src: 'OVI114 Q11' },
    { l: 'demarreur', q: 'Bobine d’appel mesurée à 3 Ω. Valeur attendue pour la bobine de maintien ?', c: ['6 Ω', '1,5 Ω', '3 Ω', '9 Ω'], e: 'La bobine de maintien a une résistance d’environ 2 × celle d’appel.', r: 'Appel 2 Ω → maintien 4 Ω ; 3 Ω → 6 Ω.', src: 'OVI114 Q7' },
    { l: 'demarreur', q: 'Résistance normale du moteur électrique d’un démarreur ?', c: ['< 1 Ω', '≈ 7 Ω', '≈ 1,2 Ω', '> 100 Ω'], e: 'Il absorbe des centaines d’ampères sous faible tension : sa résistance doit être la plus proche de zéro. 7 Ω ou 1,2 Ω = HS.', r: 'Moteur de démarreur < 1 Ω.', src: 'OVI114 Q21/Q35, UV2 Q41' },
    { l: 'demarreur', q: 'Bobine de MAINTIEN coupée : quel symptôme ?', c: ['Le démarreur colle par intermittence (effet mitraillette)', 'Rien ne se passe', 'Le démarreur tourne sans engrener', 'Le démarreur reste collé'], e: 'Le noyau est attiré par l’appel, mais dès que celle-ci est court-circuitée plus rien ne le tient : il retombe, recolle… claquements.', r: 'Mitraillette = maintien HS ou batterie faible.', w: 'Une banque Uv1 disait « ne fonctionne pas » : la réponse retenue (OVI114, UV2) est « colle par intermittence ».', src: 'UV2 Q42' },
    { l: 'demarreur', q: 'Bobine d’APPEL coupée : quel symptôme ?', c: ['Rien ne se passe : le noyau n’est pas attiré', 'Effet mitraillette', 'Démarrage lent', 'Le pignon reste engrené'], e: 'Sans bobine d’appel, pas de force suffisante pour attirer le noyau plongeur.', r: 'Appel coupé = rien ; maintien coupé = mitraillette.', src: 'OVI114 étendu' },
    { l: 'demarreur', q: 'Réseau 24 V : 22 V aux batteries pendant le lancement, démarreur qui peine. Cause ?', c: ['Le démarreur (tension > 19,2 V)', 'Les batteries', 'La ligne positive', 'Le contacteur à clé'], e: 'Les batteries tiennent au-dessus du minimum de 19,2 V : elles ne sont pas en cause, c’est le démarreur.', r: '24 V : < 19,2 V = batteries ; > 19,2 V = démarreur.', src: 'OVI114 Q4' },
    { l: 'demarreur', q: 'Démarreur contrôlé bon (appel, maintien, moteur < 1 Ω) et batteries bonnes. Pendant le lancement, la tension des batteries s’effondre et le moteur tourne à peine. Cause probable ?', c: ['Le moteur thermique est grippé', 'La résistance du moteur du démarreur est trop élevée', 'Le câble positif est sectionné', 'La bobine d’appel est coupée'], e: 'Le démarreur doit fournir un effort énorme : il absorbe un très fort courant et la tension des batteries chute. Tout le circuit électrique étant bon, c’est le moteur thermique qui résiste.', r: 'Tension qui s’effondre, circuit bon → moteur thermique grippé.' },
    { l: 'demarreur', q: 'Au lancement, la tension des batteries reste trop élevée (elle ne chute presque pas) et le démarreur peine. Cause probable ?', c: ['La résistance du moteur du démarreur est trop élevée', 'Le moteur thermique est grippé', 'Les batteries sont déchargées', 'La bobine de maintien est coupée'], e: 'Si la résistance du moteur du démarreur est trop élevée, peu de courant passe : les batteries ne sont presque pas sollicitées (tension haute) mais le démarreur n’a pas de couple.', r: 'Tension trop haute au lancement → démarreur (résistance du moteur trop élevée).' },
    { l: 'demarreur', q: 'Pendant le lancement, on ne retrouve pas la même tension aux batteries qu’à la borne +DEM du démarreur. Conclusion ?', c: ['Perte en ligne : câble sectionné ou mauvaise connexion', 'Batteries déchargées', 'Moteur thermique grippé', 'Bobine d’appel coupée'], e: 'On doit retrouver Ubat à la borne +DEM. Un écart (plus de 1 V) = perte en ligne sur le câble ou les cosses.', r: 'Ubat ≠ U(+DEM) → perte en ligne.' },
    { l: 'demarreur', q: 'Réseau 24 V : 18 V aux batteries au démarrage. Cause ?', c: ['Les batteries', 'Le démarreur', 'La ligne négative', 'Le relais de démarrage'], e: '18 V < 19,2 V (80 % de 24 V) : les batteries s’effondrent, elles sont en cause.', r: 'Tension mini sous démarreur : 9,6 V en 12 V, 19,2 V en 24 V.', src: 'OVI114 Q27' },
    { l: 'demarreur', q: '25,3 V aux batteries et 24 V au +BAT du démarreur pendant le lancement. Diagnostic ?', c: ['Perte en ligne sur le câble positif', 'Batteries déchargées', 'Démarreur en court-circuit', 'Tout est normal'], e: 'Plus de 1 V d’écart sur un même potentiel = résistance parasite sur la ligne positive.', r: '> 1 V d’écart = ligne HS.', src: 'OVI114 Q40' },
    { l: 'demarreur', q: '24 V : 24,5 à 25,2 V à vide, 18,6 V sous démarreur, entraînement faible. Réponse retenue ?', c: ['Lignes + et/ou − du démarreur', 'Batteries déchargées', 'Démarreur en court-circuit', 'Régulateur HS'], e: 'À vide les batteries sont chargées (≈ 12,5 V chacune) : la forte chute vient d’une résistance parasite dans les câbles.', r: 'Batteries bonnes à vide + forte chute en charge = contrôler les lignes.', src: 'UV2 Q43, test n°5, OVI114 Q75' },
    { l: 'demarreur', q: 'Quel est le rôle des balais et porte-balais d’un démarreur ?', c: ['Assurer la continuité du circuit d’induit', 'Créer le champ magnétique', 'Engrener le pignon', 'Freiner l’induit au repos'], e: 'Les balais (charbons) frottent sur le collecteur et amènent le courant aux bobinages de l’induit qui tourne.', src: 'Test final Q42 (officiel)' },
    { l: 'demarreur', q: 'Dans le circuit de démarrage, quel élément constitue la force contre-électromotrice ?', c: ['Le démarreur', 'La batterie', 'Le solénoïde', 'Le câble de masse'], e: 'Le moteur électrique du démarreur, en tournant, génère une FCEM qui s’oppose à la tension d’alimentation.', src: 'Test final Q41 (officiel)' },
    { l: 'demarreur', q: 'À quel régime un démarreur doit-il entraîner un moteur diesel ?', c: ['≈ 200 tr/min', '≈ 50 tr/min', '≈ 800 tr/min', '≈ 1 500 tr/min'], e: 'Environ 200 tr/min pour obtenir une compression suffisante et l’auto-inflammation.', src: 'Test final Q49 (officiel)' },
    { l: 'demarreur', q: 'Quels sont les 4 composants du solénoïde ?', c: ['Noyau plongeur, bobine d’appel, bobine de maintien, ressort de rappel', 'Induit, inducteur, balais, collecteur', 'Fourchette, lanceur, pignon, roue libre', 'Bobine d’appel, régulateur, diode, balais'], e: 'Le solénoïde ferme le circuit de puissance et entraîne fourchette-lanceur grâce à ces 4 éléments.', src: 'OVI114 étendu' },
    { l: 'alternateur', q: 'Quel est le rôle du régulateur d’un alternateur ?', c: ['Limiter la tension de sortie', 'Produire le courant', 'Transformer l’alternatif en continu', 'Stocker l’énergie'], e: 'Le régulateur contrôle le courant d’excitation de l’inducteur afin de maintenir la tension de sortie dans une plage appropriée.', r: 'Régulateur = contrôle de la tension de charge.', w: 'Le régulateur ne redresse pas le courant : c’est le rôle du pont de diodes.', src: 'Test final Q43 (officiel)' },
    { l: 'alternateur', q: 'Dans un alternateur, qu’est-ce qui crée le champ magnétique ?', c: ['Le rotor (inducteur)', 'Le stator (induit)', 'Le pont de diodes', 'Le régulateur'], e: 'Le rotor est un électro-aimant tournant alimenté par les balais : c’est l’inducteur, il reçoit le courant d’excitation.', r: 'Rotor = inducteur ; stator = induit.', src: 'Test final Q44 (officiel)' },
    { l: 'alternateur', q: 'Où circule le courant d’excitation ?', c: ['Dans l’inducteur', 'Dans l’induit', 'Dans les diodes de puissance', 'Dans la batterie seulement'], e: 'Le courant d’excitation alimente l’inducteur (rotor) pour créer le champ magnétique.', src: 'Test final Q50 (officiel)' },
    { l: 'alternateur', q: 'Tension de régulation d’un réseau 24 V, moteur tournant ?', c: ['28 à 29,5 V', '24 à 25 V', '13,5 à 15 V', '30 à 32 V'], e: '24 V : 28–29,5 V ; 12 V : 13,5–15 V.', r: 'Au-dessus = surtension (régulateur).', src: 'OVI114 Q15' },
    { l: 'alternateur', q: 'Un alternateur possède 2 bornes L et + avec régulateur incorporé. Combien de diodes ?', c: ['6 ou 12 diodes', '9 diodes', '3 diodes', '15 diodes'], e: '2 bornes L et + ⇒ 6 ou 12 diodes, régulateur intégré — même refroidi par liquide.', r: '1 seule borne L ⇒ 9 diodes.', w: 'Une fiche mémoire disait l’inverse : la version validée par l’OVI114 est celle-ci.', src: 'OVI114 Q42/46' },
    { l: 'alternateur', q: 'Quelle est la différence entre un alternateur 6 diodes et un 12 diodes ?', c: ['12 diodes = 2 diodes de puissance par phase en parallèle au lieu d’une', '12 diodes = 6 diodes de puissance + 6 diodes d’excitation', '12 diodes = régulateur séparé', '12 diodes = une seule borne L'], e: 'Deux diodes en parallèle par demi-phase : le pont encaisse plus de courant et le rendement s’améliore.', r: 'Cours AGA 01 : 12 diodes = 6 × 2 en parallèle, pour les grosses puissances (plus de courant).', src: 'Devoir CT1 Q2/Q3' },
    { l: 'alternateur', q: 'Alternateur 9 diodes : UNE diode d’excitation (trio) HS. Symptôme ?', c: ['Surtension', 'Plus de charge du tout', 'Témoin qui ne s’allume plus', 'Aucun symptôme'], e: '1 diode trio HS = surtension ; 2 ou 3 HS = plus de débit (batterie qui se décharge dans l’induit).', r: '1 → surtension ; 2 ou 3 → plus de charge.', w: 'Ne pas inverser les deux cas.', src: 'Devoir CT1 Q6' },
    { l: 'alternateur', q: 'Alternateur 9 diodes : la lampe témoin est HS. Conséquence ?', c: ['L’alternateur ne charge plus (plus de pré-excitation)', 'Aucune conséquence', 'Surtension', 'Le témoin reste allumé'], e: 'Sur un 9 diodes, la pré-excitation de l’inducteur passe par la lampe témoin. Dépannage : shunter +BAT vers +L.', r: 'Lampe HS : 9 diodes = pas de charge.', src: 'UV2 Q45' },
    { l: 'alternateur', q: 'Alternateur 6 diodes à régulateur incorporé : la lampe témoin est HS. Conséquence ?', c: ['Pas de conséquence : il continue de charger', 'Il ne débite plus', 'Surtension', 'Le régulateur grille'], e: 'Le régulateur est excité par le + après contact, pas par la lampe. Seul le témoin ne s’allume plus.', r: 'C’est le 9 diodes qui ne charge plus quand la lampe est HS.', w: 'Une banque Uv1 disait « ne débitera pas » : la réponse retenue (OVI114 Q54, UV2 Q46) est « fonctionne correctement ».', src: 'UV2 Q46' },
    { l: 'alternateur', q: '12 V : 17 V aux batteries moteur tournant. Élément en cause ?', c: ['Le régulateur', 'La batterie', 'Le pont de diodes', 'Le démarreur'], e: 'Surtension (au-delà de 15 V) : régulateur HS, défaut du circuit d’excitation ou masse du régulateur.', r: '12 V : 13,5–15 V normal.', src: 'UV2 Q48' },
    { l: 'alternateur', q: 'Alternateur 9 diodes : témoin éteint à l’arrêt, contact mis. Élément en cause ?', c: ['L’inducteur (ou régulateur / balais)', 'Une diode de puissance', 'La batterie', 'Le fil W'], e: 'Le témoin est en série avec régulateur et inducteur : si ce circuit est ouvert (inducteur HS, régulateur HS, balais usés), le témoin reste éteint.', src: 'UV2 Q47, OVI114 Q20' },
    { l: 'alternateur', q: 'Alternateur 9 diodes : tension sur la borne L contact mis, moteur arrêté ?', c: ['2 à 3 V', '0 V', '12 V', '14 V'], e: 'Contact mis : 2 à 3 V (lampe témoin en série). Moteur tournant : tension de régulation.', src: 'OVI114 Q18/Q29' },
    { l: 'alternateur', q: 'Alternateur à régulateur séparé (+BAT, −BAT, EXC) : tension à EXC contact mis, moteur arrêté ?', c: ['La tension batterie', '0 V', 'La tension de régulation', '5 V'], e: 'Moteur arrêté : EXC = tension batterie. Moteur tournant : tension de régulation.', src: 'Test n°5' },
    { l: 'alternateur', q: 'Comment effectuer le test de charge d’un alternateur ?', c: ['Allumer un maximum de consommateurs', 'Débrancher la batterie moteur tournant', 'Mesurer au ralenti sans consommateur', 'Shunter le régulateur'], e: 'On met l’alternateur à contribution : pince sur B+, régime accéléré, consommateurs allumés, et on compare à l’étiquette.', src: 'OVI114 Q6' },
    { l: 'alternateur', q: 'Réseau 24 V, 9 diodes : 30,2 V moteur tournant. Est-ce correct ?', c: ['Non, c’est au-dessus de 29,5 V', 'Oui, c’est normal', 'Oui, sur un PL', 'Impossible à dire'], e: 'Régulation 24 V : 28 à 29,5 V. 30,2 V est une surtension.', src: 'Test n°5' },
    { l: 'lin', q: 'Tension sur le fil LIN, contact mis ?', c: ['≈ 80 % de Ubat', '5 V', '0 V', '100 % de Ubat'], e: 'Environ 80 % de la tension batterie, soit 9,6 à 10 V en 12 V.', src: 'OVI114 Q26, CT1 Q4' },
    { l: 'lin', q: 'Alternateur LIN : 13,2 V fixe moteur tournant. Diagnostic ?', c: ['Bus LIN coupé : mode secours à tension fixe', 'Tension correcte', 'Régulateur en surcharge', 'Batterie pleine'], e: 'Sans communication LIN, l’alternateur passe en mode par défaut à tension fixe.', r: 'Alternateur LIN débranché = mode secours.', w: '13,2 V n’est PAS une « tension correcte » ici.', src: 'OVI114 Q38' },
    { l: 'lin', q: 'Alternateur LIN : 16 V moteur tournant. C’est :', c: ['Normal (le calculateur module la charge)', 'Une surtension, régulateur HS', 'Le mode secours', 'Un bus LIN coupé'], e: 'Moteur tournant, la tension de charge varie de 10,7 à 16 V (jusqu’à 16–17 V) selon la demande du calculateur.', src: 'OVI114 Q23' },
    { l: 'lin', q: 'Laquelle de ces fonctions n’est PAS assurée par le bus LIN de l’alternateur ?', c: ['Gérer le refroidissement', 'Commander la tension de l’inducteur', 'Envoyer la température', 'Régler la tension de consigne'], e: 'Le LIN sert à l’excitation, à la température et à la consigne. Il ne gère pas le refroidissement.', src: 'OVI114 Q41' },
    { l: 'lin', q: 'Quelle est la nature du signal entre un alternateur LIN et son calculateur ?', c: ['Numérique', 'Analogique', 'Sinusoïdal', 'Alternatif triphasé'], e: 'Signal numérique, à contrôler à l’oscilloscope.', src: 'OVI114 étendu' },
    { l: 'lin', q: 'Où se trouve l’IBS (Intelligent Battery Sensor) ?', c: ['Sur la masse de la batterie, au plus près', 'Sur le B+ de l’alternateur', 'Dans le calculateur moteur', 'Sur le démarreur'], e: 'Le capteur de batterie intelligent mesure l’état de charge sur la borne de masse.' },
    { l: 'diagnostic', q: 'Aucun fusible grillé, aucun indicateur faux, rien n’a brûlé. De quel type de panne s’agit-il ?', c: ['Une coupure', 'Un court-circuit', 'Une surtension', 'Deux pannes simultanées'], e: 'Aucun des 3 signes du court-circuit → c’est une coupure.', r: 'Une seule panne à la fois.' },
    { l: 'diagnostic', q: 'La zone de diagnostic (ZD) peut-elle inclure la masse ?', c: ['Jamais', 'Toujours', 'Seulement en 24 V', 'Seulement si un relais est présent'], e: 'Règle du cours : la masse ne fait jamais partie de la ZD.' },
    { l: 'diagnostic', q: 'Le fusible saute dès l’appui sur la commande. Où se situe la ZD ?', c: ['Du milieu de l’organe de commande jusqu’avant la masse', 'Après le fusible jusqu’au milieu de la commande', 'Uniquement sur le récepteur', 'Sur la masse'], e: 'Le court-circuit n’apparaît qu’une fois la commande fermée : il est donc en aval de celle-ci.', r: 'Avant l’appui → après le fusible jusqu’au milieu de la commande.' },
    { l: 'diagnostic', q: 'Plusieurs composants sont HS en même temps. Que chercher ?', c: ['Leur point commun (+ ou masse)', 'Plusieurs pannes indépendantes', 'Le composant le plus cher', 'Le fusible général uniquement'], e: 'Une seule panne à la fois : on cherche le point commun, la ZD commence et finit à ce point.' },
    { l: 'capteurs', q: 'Parmi ces capteurs, lequel est ACTIF ?', c: ['Inductif', 'CTN', 'Effet Hall', 'Potentiomètre'], e: 'Seul l’inductif est actif : il produit son propre courant comme un générateur. CTN, Hall, potentiomètre sont passifs (alimentés en 5 V).', r: 'Actif = se comporte comme un générateur.', src: 'OVI114 Q14' },
    { l: 'capteurs', q: 'Le capteur à effet Hall est, selon ton cours :', c: ['Passif, alimenté en 5 V, signal carré', 'Actif, signal sinusoïdal', 'Actif, signal carré', 'Passif, signal sinusoïdal'], e: 'Hall : passif (alimenté), signal carré à fréquence variable et amplitude fixe (5 V).', w: 'Une fiche mémoire dit « actif » : la convention du cours (et de l’OVI114) est « passif ».', src: 'OVI114 Q3, CT1 Q16' },
    { l: 'capteurs', q: 'Comment contrôler un capteur INDUCTIF en statique ?', c: ['Mesurer sa résistance et la comparer à la valeur constructeur', 'Vérifier son alimentation 5 V', 'Test dynamique avec un aimant', 'Mesurer sa pression'], e: 'L’inductif n’est pas alimenté : en statique on contrôle sa résistance à l’ohmmètre.', r: 'Hall : alim/signal/masse + test dynamique.', src: 'OVI114 Q2' },
    { l: 'capteurs', q: 'CTN : quand la température augmente…', c: ['La résistance ET la tension diminuent', 'La résistance augmente', 'La résistance diminue mais la tension augmente', 'Rien ne change'], e: 'CTN = coefficient de température négatif : quand T° ↑, R ↓. Le courant augmente, mais la TENSION DU SIGNAL (mesurée aux bornes de la CTN, alimentée en 5 V par le calculateur à travers sa résistance interne) baisse : moins de résistance = moins de tension à ses bornes. Signal décroissant. Il faut vérifier les deux.', src: 'OVI114 Q31' },
    { l: 'capteurs', q: 'Un actionneur piloté en PWM (RCO) reçoit :', c: ['Un signal modulé en largeur d’impulsion', 'Un signal sinusoïdal', 'Une tension continue fixe', 'Un signal du bus LIN'], e: 'PWM = rapport cyclique variable ; le multimètre n’en voit que la moyenne.', src: 'OVI114 Q10, CT1 Q18' },
    { l: 'capteurs', q: 'Quels capteurs mesurent une vitesse de rotation ?', c: ['Inductif et effet Hall', 'Capacitif et piézo-résistif', 'CTN et CTP', 'MAP et MAF'], e: 'Rotation : inductif ou Hall. Pression : capacitif ou piézo-résistif.', src: 'OVI114 étendu' },
    { l: 'capteurs', q: 'Quel type de signal délivre un capteur de pression absolue (MAP) ?', c: ['Continu, proportionnel à la pression', 'Carré', 'Sinusoïdal', 'Numérique LIN'], e: 'Signal continu : 100 kPa = pression atmosphérique, 250 kPa ≈ 4,65 V.', src: 'OVI114 étendu' },
    { l: 'can', q: 'Résistance mesurée entre les broches 6 et 14 de la prise OBD (batterie débranchée) sur un réseau CAN HS sain ?', c: ['60 Ω (± 5 Ω)', '120 Ω', '0 Ω', '240 Ω'], e: 'Deux résistances de terminaison de 120 Ω en parallèle = 60 Ω. 120 Ω = fil coupé ou terminaison HS.', r: 'Ligne = 60 Ω ; une résistance = 120 Ω.', src: 'OVI114 Q1' },
    { l: 'can', q: 'Valeur d’UNE résistance de terminaison CAN HS ?', c: ['120 Ω', '60 Ω', '30 Ω', '240 Ω'], e: 'Chaque extrémité du bus porte 120 Ω pour éviter les échos du signal.', src: 'UV2 Q51, OVI114 Q19' },
    { l: 'can', q: 'État logique : au niveau DOMINANT, que valent CAN H et CAN L ?', c: ['H = 3,5 V ; L = 1,5 V', 'H = 2,5 V ; L = 2,5 V', 'H = 5 V ; L = 0 V', 'H = 3,2 V ; L = 1,8 V'], e: 'Dominant (bit 0) : écart de 2 V. Récessif (bit 1) : les deux à 2,5 V. La somme vaut toujours 5 V.', w: 'Une fiche indiquait 3,2 V : la valeur retenue est 3,5 V.' },
    { l: 'can', q: 'Pourquoi les fils CAN H et CAN L sont-ils torsadés ?', c: ['Pour rejeter les perturbations électromagnétiques', 'Pour augmenter le débit', 'Pour réduire la résistance', 'Pour économiser du cuivre'], e: 'Un parasite décale les deux fils de la même façon : la différence lue par le récepteur ne change pas.', src: 'UV2 Q52' },
    { l: 'can', q: 'Le protocole CAN est :', c: ['Série différentiel, multi-maître', 'Parallèle, maître-esclave', 'Monofilaire, 1 maître', 'Analogique'], e: 'Paire différentielle torsadée, série asynchrone, multi-maître (contrairement au LIN).', src: 'CT1 Q20, OVI114 Q25' },
    { l: 'can', q: 'Sur quel réseau sont les calculateurs moteur, boîte de vitesses, ABS et direction ?', c: ['CAN HS', 'CAN confort (LS)', 'LIN', 'K-Line'], e: 'Fonctions rapides et sécuritaires → CAN haute vitesse. Le combiné d’instruments est sur le réseau confort.', src: 'OVI114 Q32, CT1 Q21' },
    { l: 'can', q: 'Au voltmètre, tension normale entre CAN L et CAN H (broches 14 et 6 de la prise OBD) ?', c: ['0,5 à 0,9 V', '2,4 à 3,2 V', '1,8 à 2,6 V', '≥ 1 V'], e: '0,5–0,9 V normal ; ≥ 1 V = réseau saturé (interface de ligne).', r: 'H/masse 2,4–3,2 V · L/masse 1,8–2,6 V.', src: 'OVI114 Q16' },
    { l: 'can', q: 'Quel étage du calculateur reçoit les informations des capteurs ?', c: ['L’étage d’entrée', 'L’étage de sortie', 'L’interface de ligne', 'Le contrôleur de protocole'], e: 'Étage d’entrée (avec convertisseur analogique/numérique) → micro-ordinateur → étage de sortie (actionneurs).', src: 'UV2 Q49' },
    { l: 'can', q: 'Un calculateur multiplexé comporte :', c: ['Un étage d’entrée et un étage de sortie', 'Uniquement un étage de sortie', 'Un alternateur et un régulateur', 'Une seule résistance de 60 Ω'], e: 'Entrée (capteurs), traitement, sortie (actionneurs).', src: 'Test final Q45 (officiel)' },
    { l: 'can', q: 'Comment tester un réseau CAN au voltmètre ?', c: ['H/masse, L/masse et H/L', 'Uniquement H/L', 'Uniquement la résistance 6-14', 'Entre +BAT et CAN H'], e: 'Trois mesures : H/masse (2,4–3,2 V), L/masse (1,8–2,6 V), L/H (0,5–0,9 V).', src: 'CT1 Q22' },
    { l: 'schemas', q: 'Sur un schéma électrique, que désigne KL15 ?', c: ['Le + après contact (APC)', 'Le + permanent', 'La masse', 'La commande du démarreur'], e: 'KL30 = + permanent ; KL15 = + après contact ; KL31 = masse ; KL50 = démarreur.', src: 'CT1 Q10-12' },
    { l: 'schemas', q: 'Sur le PVP, les connecteurs sont repérés par les lettres :', c: ['J et P', 'X et Y', 'K et L', 'C et D'], e: 'PVP : équipements 12 V et 24 V ; connecteurs J et P.', src: 'CT1 Q10-12' },
    { l: 'schemas', q: 'Sur un schéma, des pointillés indiquent :', c: ['La limite entre deux faisceaux ou cartes', 'Un fil blindé', 'Un fil de masse', 'Un fusible'], e: 'Chaque changement de faisceau ou de carte est un point de mesure possible.' },
    { l: 'batterie', q: 'Tension de fin de décharge d’un élément de batterie au plomb ?', c: ['1,75 V', '2,1 V', '2,4 V', '1,2 V'], e: 'Il faut arrêter la décharge à 1,75 V par élément sous peine de détériorer la batterie. 2,1 V = élément chargé ; 2,4–2,5 V = dégagement gazeux.', src: 'Cours AGA 01' },
    { l: 'batterie', q: 'Densité de l’électrolyte d’un élément chargé (climat tempéré) ?', c: ['1,280', '1,120', '1,000', '1,500'], e: 'Chargé : 1 280 g/L ; déchargé : 1 120 g/L. Pays froids 1,290 ; pays chauds 1,230.', src: 'Cours AGA 01' },
    { l: 'batterie', q: 'Une batterie de 50 Ah doit pouvoir délivrer :', c: ['2,5 A pendant 20 h', '50 A pendant 20 h', '5 A pendant 1 h', '25 A pendant 20 h'], e: 'La capacité nominale se mesure en 20 h, au 1/20 de la capacité : 50 / 20 = 2,5 A.', src: 'Cours AGA 01' },
    { l: 'batterie', q: 'Comment reconnaître la borne positive d’une batterie ?', c: ['C’est la borne de plus gros diamètre', 'C’est la borne de plus petit diamètre', 'Elle est toujours à gauche', 'Elle est en acier'], e: 'Bornes en plomb : + gros diamètre, − petit diamètre (on ne peut pas inverser les cosses).', src: 'Cours AGA 01' },
    { l: 'batterie', q: 'Rôle premier de la batterie :', c: ['Fournir la puissance au démarreur (et alimenter les récepteurs à l’arrêt)', 'Réguler la tension de charge', 'Alimenter en permanence les récepteurs moteur tournant', 'Redresser le courant'], e: 'Moteur tournant, c’est l’alternateur qui alimente ; la batterie démarre, alimente à l’arrêt et complète si l’alternateur ne suffit pas.', src: 'Cours AGA 01' },
    { l: 'batterie-entretien', q: 'Comment compléter le niveau d’électrolyte d’une batterie ?', c: ['Avec de l’eau distillée uniquement, 10 à 15 mm au-dessus des plaques', 'Avec de l’acide sulfurique', 'Avec un mélange eau + acide', 'Avec de l’eau du robinet jusqu’au bord'], e: 'Seule l’eau s’évapore : on remet de l’eau pure. Ajouter de l’acide augmente fortement la résistance interne.', r: 'Jamais d’acide dans une batterie en service.' },
    { l: 'batterie-entretien', q: 'Pour préparer un électrolyte, on verse…', c: ['L’acide lentement dans l’eau', 'L’eau dans l’acide', 'Les deux en même temps', 'L’acide puis l’eau d’un coup'], e: 'Verser l’eau dans l’acide provoque des projections violentes : on verse l’acide dans l’eau, lentement, avec une baguette de verre.' },
    { l: 'batterie-entretien', q: 'Cause de la corrosion des grilles des plaques positives ?', c: ['La surcharge', 'La décharge prolongée', 'Le froid', 'Un niveau trop haut'], e: 'La surcharge fait chauffer, dissocie l’eau et oxyde les grilles positives.' },
    { l: 'batterie-entretien', q: 'Sulfatation anormale : cause typique ?', c: ['Batterie laissée longtemps déchargée ou recharge incomplète', 'Électrolyte trop faible en acide', 'Batterie trop souvent chargée', 'Bornes trop serrées'], e: 'Le sulfate de plomb cristallise et ne se réduit plus à la charge. Indices : plaques claires, gonflement, décharge rapide.' },
    { l: 'batterie-entretien', q: 'Test d’aptitude au démarrage d’une batterie 12 V de 55 Ah ?', c: ['Débit ≈ 165 A pendant 15 s, 3 fois ; > 9 V au 3ᵉ essai', 'Débit 5,5 A pendant 10 h', 'Mesure au pèse-acide seulement', 'Débit 55 A pendant 1 min, > 12 V'], e: 'On demande 3 × la capacité ; c’est le seul test qui juge vraiment l’état de la batterie.', src: 'Cours AGA 01' },
    { l: 'batterie-entretien', q: 'Pendant l’essai de décharge, la tension chute rapidement vers zéro. État ?', c: ['Batterie défectueuse (court-circuit)', 'Batterie bonne', 'Batterie juste déchargée', 'Chargeur défectueux'], e: 'Stabilisée > 9 V = bonne ; ne se stabilise pas = usagée ; intensité nulle = coupure.' },
    { l: 'batterie-entretien', q: 'Courant de fuite maximal admissible contact coupé ?', c: ['< 30 mA', '< 300 mA', '< 3 A', '0 mA exactement'], e: 'Contrôle à la pince ampèremétrique : moins de 30 mA (quelques dizaines de mA).' },
    { l: 'batterie-entretien', q: 'Recharge d’une batterie « sans entretien » :', c: ['Chargeur à tension constante 14 à 14,5 V, 30 A maxi, sans ébullition', 'Intensité constante élevée jusqu’à ébullition', 'Chargeur à impulsions', 'En parallèle avec d’autres batteries différentes'], e: 'L’ébullition est inacceptable : elle consomme l’eau et corrode les plaques.' },
    { l: 'batterie-entretien', q: 'Fin de charge : que faire en premier ?', c: ['Couper le chargeur, puis retirer les pinces', 'Retirer les pinces, puis couper le chargeur', 'Retirer d’abord la pince −', 'Laisser le chargeur branché'], e: 'Retirer une pince sous courant crée une étincelle près des gaz de charge : danger d’explosion.' },
    { l: 'batterie-entretien', q: 'MAT 2630 : une batterie marquée d’un rond BLEU est…', c: ['Déchargée sèche (charge au 1/20, stockage 10 ans)', 'Chargée humide (18 mois)', 'Chargée sèche (5 ans)', 'Hors service'], e: 'Rouge = chargée humide (18 mois) ; blanc = chargée sèche (5 ans) ; bleu = déchargée sèche (10 ans).', src: 'Cours AGA 01' },
    { l: 'batterie-entretien', q: '4 batteries 12 V 45 Ah en série à recharger : réglage ?', c: ['48 V et 4,5 A', '12 V et 18 A', '48 V et 18 A', '12 V et 4,5 A'], e: 'En série les tensions s’additionnent (48 V), la capacité reste 45 Ah → 1/10 = 4,5 A.' },
    { l: 'demarreur', q: 'Selon quelle loi le démarreur produit-il un couple ?', c: ['La loi de Laplace (F = B × I × L × sin α)', 'La loi de Lenz', 'La loi d’Ohm', 'La loi de Pascal'], e: 'Un conducteur parcouru par un courant dans un champ magnétique subit une force. La loi de Lenz explique au contraire l’alternateur.', src: 'Cours AGA 01' },
    { l: 'demarreur', q: 'Couple à fournir par le démarreur au démarrage :', c: ['1/3 à 1/2 du couple moteur', 'Le double du couple moteur', '1/10 du couple moteur', 'Le couple maxi du moteur'], e: 'Le démarreur est démultiplié 10 à 20 fois pour fournir ce couple.', src: 'Cours AGA 01' },
    { l: 'demarreur', q: 'Démarreur : quelle partie crée le champ magnétique ?', c: ['L’inducteur (bobinages et masses polaires sur la carcasse)', 'L’induit', 'Le collecteur', 'Le lanceur'], e: 'Dans le démarreur, l’inducteur est fixe (stator) et crée le champ ; l’induit tourne.' },
    { l: 'demarreur', q: 'Solénoïde déposé, + sur l’excitation : comment tester la bobine d’APPEL ?', c: ['Mettre le − sur DEM : le relais doit s’enclencher', 'Mettre le − sur la carcasse', 'Mettre le − sur BAT', 'Mesurer entre BAT et DEM'], e: 'Appel : − sur DEM. Maintien : − sur la carcasse, noyau poussé, il reste enclenché. Lame de contact : − sur BAT.', src: 'Cours AGA 01' },
    { l: 'demarreur', q: 'Usure maximale admise pour les balais du démarreur ?', c: ['60 % de la longueur initiale', '10 %', '90 %', '30 %'], e: 'Ils doivent aussi coulisser librement et ne pas être gras ou humides.' },
    { l: 'demarreur', q: 'Comment contrôler un court-circuit dans l’induit ?', c: ['Sur un grognard : la lame ne doit pas vibrer', 'À l’ohmmètre entre lame et masse', 'Au voltmètre sous tension', 'En mesurant le faux-rond'], e: 'L’isolement se contrôle à l’ohmmètre (infini par rapport à la masse).' },
    { l: 'demarreur', q: 'Les dents du lanceur sont usinées (abîmées). Cause possible ?', c: ['Le contacteur à clé ne revient pas au zéro (anti-redémarrage HS)', 'Batterie trop chargée', 'Balais neufs', 'Câble trop gros'], e: 'L’anti-redémarrage impose de revenir au repos : s’il ne fonctionne pas, on relance moteur tournant.' },
    { l: 'demarreur', q: 'Rôle d’un relais dans le circuit de démarrage ?', c: ['Limiter les chutes de tension dans les fils longs (faible courant qui commande un fort courant)', 'Redresser le courant', 'Freiner l’induit', 'Engrener le pignon'], e: 'Il évite de faire passer un fort courant dans de longs fils de forte section.' },
    { l: 'alternateur', q: 'Principe de l’alternateur :', c: ['Magnétisme + mouvement = électricité (loi de Lenz)', 'Loi de Laplace', 'Effet Hall', 'Réaction chimique'], e: 'Une variation de flux magnétique dans une bobine crée une tension alternative sinusoïdale.', src: 'Cours AGA 01' },
    { l: 'alternateur', q: 'Qui détermine le débit de l’alternateur ?', c: ['Les récepteurs (consommateurs)', 'Le régulateur seul', 'La courroie', 'La batterie seule'], e: 'Sans consommateur, l’alternateur ne débite aucun courant. Il est auto-limiteur d’intensité ; seule la tension est régulée.' },
    { l: 'alternateur', q: 'Comment le régulateur limite-t-il la tension ?', c: ['En coupant l’excitation (la masse) de l’inducteur', 'En limitant le courant de sortie B+', 'En débranchant la batterie', 'En freinant le rotor'], e: 'Au-dessus de 15 V, la masse de l’inducteur est coupée : plus de champ, la tension chute.' },
    { l: 'alternateur', q: 'Rôle du condensateur de l’alternateur ?', c: ['Éviter le clignotement de la lampe témoin et lisser le courant', 'Exciter le rotor', 'Redresser le courant', 'Protéger les balais'], e: 'Réponse du cours AGA 01.', src: 'Cours AGA 01' },
    { l: 'alternateur', q: 'Décalage des 3 bobinages du stator ?', c: ['120°', '90°', '180°', '60°'], e: 'Trois bobinages décalés de 120° = courant triphasé ; couplage étoile ou (le plus souvent) triangle.' },
    { l: 'alternateur', q: 'Pour souder à l’arc sur un véhicule, il faut :', c: ['Débrancher l’alternateur (pas seulement la batterie)', 'Débrancher seulement la batterie', 'Laisser le moteur tourner', 'Débrancher seulement le régulateur'], e: 'Une soudure à l’arc ou une inversion de polarité détruit le pont de diodes.' },
    { l: 'alternateur', q: 'Une diode du pont laisse passer le courant dans les deux sens. Elle est :', c: ['En court-circuit', 'Coupée', 'Correcte', 'Inversée mais bonne'], e: 'Correcte : un seul sens ; coupée : aucun sens ; court-circuit : les deux sens.' },
    { l: 'alternateur', q: 'Régulateur multifonction (6 diodes) : quand la lampe témoin s’allume-t-elle ?', c: ['En cas de décharge ET de surcharge', 'En cas de décharge seulement', 'Jamais', 'Seulement moteur arrêté'], e: 'Le monofonction (9 diodes) n’allume la lampe qu’en cas de décharge.' },
    { l: 'alternateur', q: 'Quelle part des pannes d’alternateur vient de son environnement (fuites d’huile, gasoil…) ?', c: ['47 %', '10 %', '90 %', '25 %'], e: 'Des bagues usées prématurément imposent de chercher et supprimer les fuites à proximité.' },
    { l: 'allumage', q: 'Rôle de la bobine d’allumage ?', c: ['Transformer la tension batterie en haute tension', 'Répartir la haute tension aux cylindres', 'Protéger les contacts du rupteur', 'Déterminer l’avance'], e: 'Primaire basse tension, secondaire haute tension (12 000 à 25 000 V), noyau de fer doux.', src: 'Cours AGA 01' },
    { l: 'allumage', q: 'À quel moment l’étincelle jaillit-elle à la bougie ?', c: ['À l’ouverture du rupteur', 'À la fermeture du rupteur', 'Pendant toute la fermeture', 'Quand le condensateur se charge seulement'], e: 'La coupure brutale du primaire fait varier le flux très vite. À la fermeture, la self-induction ralentit la variation : pas d’étincelle.' },
    { l: 'allumage', q: 'Rôle du condensateur dans l’allumage classique ?', c: ['Absorber l’extra-courant de rupture : protéger le rupteur et renforcer l’étincelle', 'Élever la tension', 'Répartir la haute tension', 'Donner de l’avance'], e: 'Sans lui, un arc se forme aux contacts : ils s’usent et la rupture est lente (étincelle faible).' },
    { l: 'allumage', q: 'Angle de came d’un 4 cylindres (allumage classique) ?', c: ['57° fermé et 33° ouvert', '33° fermé et 57° ouvert', '90° fermé', '45° fermé et 45° ouvert'], e: '63 % de dwell fermé : 0,63 × 90° ≈ 57°.' },
    { l: 'allumage', q: 'Angle de came trop PETIT : conséquence ?', c: ['Bobine mal remplie → ratés à haut régime', 'Étincelle trop forte', 'Bobine qui chauffe', 'Aucune'], e: 'Contacts trop écartés. Angle trop grand = rupture pas franche, étincelle faible, bobine qui chauffe.' },
    { l: 'allumage', q: 'Le correcteur d’avance CENTRIFUGE corrige l’avance en fonction…', c: ['Du régime moteur', 'De la charge (dépression)', 'De la température', 'De l’ordre d’allumage'], e: 'Masselottes et ressorts : plus le moteur tourne vite, plus on avance. La capsule à dépression corrige selon la charge.' },
    { l: 'allumage', q: 'Vitesse de l’arbre du rupteur (allumeur) par rapport au vilebrequin ?', c: ['Demi-vitesse', 'Même vitesse', 'Double vitesse', 'Quart de vitesse'], e: 'Une étincelle par cylindre tous les 2 tours de vilebrequin.' },
    { l: 'allumage', q: 'Moteur poussé et rapide : quel type de bougie ?', c: ['Une bougie froide', 'Une bougie très chaude', 'Une bougie chaude', 'N’importe laquelle'], e: 'Moteur lent → bougie chaude ; moteur poussé, rapide → bougie froide (qui évacue mieux la chaleur).' },
    { l: 'allumage', q: 'Dans l’allumage transistorisé, qu’est-ce qui remplace le rupteur ?', c: ['Le module transistorisé', 'Le générateur', 'Le condensateur', 'Le distributeur'], e: 'Le module remplace le rupteur, le générateur (inductif ou Hall) remplace la came.' },
    { l: 'allumage', q: 'Avantage de l’allumage transistorisé ?', c: ['Haute tension plus forte et constante, même à haut régime', 'Avances électroniques', 'Suppression de la bobine', 'Bobine interchangeable avec l’allumage classique'], e: 'Courant primaire 7–8 A au lieu de 4 A, ≈ 25 000 V, jusqu’à 21 000 étincelles/min. Les avances restent mécaniques.' },
    { l: 'allumage', q: 'Tension délivrée par un générateur d’impulsions inductif ?', c: ['Alternative, de 0,5 V à bas régime jusqu’à 100 V à haut régime', 'Carrée de 5 V', 'Continue 12 V', 'Toujours 0 V'], e: 'L’amplitude dépend de la vitesse. Le générateur Hall, lui, donne un signal carré de 5 V.' },
    { l: 'can', q: 'Combien de spires par mètre pour la torsade d’un bus CAN ?', c: ['30', '3', '120', '60'], e: 'La torsade (30 spires/m) annule les parasites entre deux boucles consécutives.', src: 'Cours AGA 01' },
    { l: 'can', q: 'Lequel n’est PAS un protocole de multiplexage automobile ?', c: ['OBD', 'CAN', 'VAN', 'FlexRay'], e: 'CAN, VAN, LIN, MOST et FlexRay sont des protocoles ; OBD est la prise de diagnostic.' },
    { l: 'can', q: 'Rôle de l’étage de sortie d’un calculateur ?', c: ['Transmettre les ordres aux actionneurs sous forme analogique', 'Convertir les signaux des capteurs en numérique', 'Construire la trame', 'Se connecter au bus'], e: 'Entrée : analogique → numérique ; micro-ordinateur : numérique ; sortie : numérique → analogique (12 V, 0 V…).' },
    { l: 'can', q: 'Quel élément du calculateur « traduit électriquement entre 0 et 5 V » ?', c: ['L’interface de ligne', 'Le contrôleur de protocole', 'Le micro-ordinateur', 'L’étage d’entrée'], e: 'Le contrôleur de protocole construit la trame et contrôle émissions et réceptions ; l’interface de ligne fait le lien électrique avec le bus.', img: 'calculateur-schema-bloc.jpg' },
    { l: 'can', q: 'Quel élément du calculateur construit la trame et contrôle les émissions et les réceptions ?', c: ['Le contrôleur de protocole', 'L’interface de ligne', 'L’étage de sortie', 'La résistance de terminaison'], e: 'Schéma bloc : micro-ordinateur ↔ contrôleur de protocole ↔ interface de ligne ↔ bus.' },
    { l: 'can', q: 'Type de liaison entre l’interface de ligne et le bus CAN ?', c: ['Série', 'Parallèle', 'Série/parallèle', 'Analogique'], e: 'À l’intérieur du calculateur, bus interne série/parallèle ; sur le réseau, liaison série.' },
    { l: 'can', q: 'Dans le calculateur moteur, le capteur de pression de rampe est relié à…', c: ['L’étage d’entrée', 'L’étage de sortie', 'L’interface de ligne', 'Le contrôleur de protocole'], e: 'Capteurs → étage d’entrée ; actionneurs (injecteurs, EGR, préchauffage…) ← étage de sortie.' },
    { l: 'can', q: 'Les injecteurs piézo-électriques et la vanne EGR sont pilotés par…', c: ['L’étage de sortie', 'L’étage d’entrée', 'Le contrôleur de protocole', 'L’interface de ligne'], e: 'Ce sont des actionneurs : ils reçoivent les ordres de l’étage de sortie.' },
    { l: 'can', q: 'Bus CAN : quel état représente un bit 1 ?', c: ['CAN H = CAN L = 2,5 V (récessif)', 'CAN H = 3,5 V et CAN L = 1,5 V', 'CAN H = 5 V et CAN L = 0 V', 'CAN H = 1,5 V et CAN L = 3,5 V'], e: 'Récessif = 1 (différence 0 V) ; dominant = 0 (différence 2 V).', img: 'can-transmission-bits.jpg' },
    { l: 'can', q: 'Comment le récepteur CAN lit-il un bit ?', c: ['Il mesure la différence CAN H − CAN L (mode différentiel)', 'Il lit seulement CAN H par rapport à la masse', 'Il lit seulement CAN L', 'Il compte les impulsions de CAN H'], e: 'Un amplificateur différentiel compare les deux fils : un parasite qui touche les deux fils ne change pas la différence.' },
    { l: 'can', q: 'Rôle de la paire torsadée en transmission différentielle ?', c: ['Annuler les champs magnétiques des deux fils et rendre le câble insensible aux parasites extérieurs', 'Augmenter la tension du bus', 'Remplacer les résistances de terminaison', 'Doubler le débit'], e: 'Elle réduit l’inductance de la paire ; un parasite touche les deux lignes de la même façon.' },
    { l: 'capteurs', q: 'Les capteurs informent le calculateur qui, en fonction de ces données, commande :', c: ['Les actionneurs (actuateurs)', 'Les autres capteurs', 'La batterie'], e: 'Chaîne capteurs → calculateur → actionneurs : relais, électrovanne RCO, moteurs, injecteurs, bobines d’allumage, témoin de diag.', r: 'Capteur = entrée, actionneur = sortie.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Lequel de ces éléments est un actionneur (sortie du calculateur) ?', c: ['Un moteur pas à pas', 'Une sonde lambda', 'Un capteur à effet Hall'], e: 'Moteur pas à pas, relais, électrovanne RCO, injecteurs, bobines d’allumage, témoin de diag sont commandés par le calculateur.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Principe physique du capteur inductif :', c: ['Une variation de flux magnétique dans un bobinage génère une tension induite (loi de Lenz)', 'Une plaquette de silicium parcourue par un courant dans un champ magnétique', 'Un corps qui change de résistance sous une contrainte'], e: 'Chaque dent de la cible fait varier le flux dans le bobinage : tension alternative sinusoïdale.', r: 'Inductif = loi de Lenz.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'La fréquence d’un signal, c’est :', c: ['Le nombre de périodes par seconde, en hertz', 'Le temps que met le signal à se reproduire', 'La tension maximale du signal'], e: 'La période est le temps d’un cycle ; la fréquence est son inverse, en Hz.', r: 'f = 1 / T.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Principe physique du capteur à effet Hall :', c: ['Une plaquette de semi-conducteur parcourue par un courant présente une faible ddp quand elle est soumise à un champ magnétique', 'Une variation de flux dans un bobinage crée une tension', 'Un corps comprimé produit une ddp sur ses faces'], e: 'La faible ddp de la plaquette est amplifiée par un transistor → signal carré d’amplitude fixe.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'La piézo-résistivité, c’est la propriété de certains corps à :', c: ['Modifier leur résistance sous une contrainte mécanique', 'Produire une ddp sous une contrainte mécanique', 'Conduire seulement sous infrarouge'], e: 'Piézo-RÉSISTIF = la RÉSISTANCE change. Piézo-ÉLECTRIQUE = une tension apparaît.', r: 'Le nom dit ce qui change.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Condition d’équilibre d’un pont de Wheatstone :', c: ['La ddp entre les points A et B est nulle', 'Les 4 résistances sont nulles', 'Le courant d’alimentation est nul'], e: 'La résistance sensible à la pression déséquilibre le pont : une tension apparaît entre A et B, image de la pression.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Le capteur piézo-électrique (cliquetis) délivre :', c: ['Des pics de tension lors des chocs ou vibrations', 'Un signal carré d’amplitude fixe', 'Une résistance qui baisse avec la température'], e: 'Au repos il est stable ; sous choc il génère une tension. Contrôle : de préférence à l’oscilloscope.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Principe du capteur opto-électrique :', c: ['Un émetteur et un récepteur infrarouge : le récepteur conduit quand il reçoit l’onde', 'Un bobinage et un aimant', 'Une couche de platine'], e: 'Une roue phonique coupe le faisceau : signal carré (numérique 0101…) de fréquence variable et d’amplitude fixe.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Le débitmètre à film chaud mesure :', c: ['La masse d’air, par le refroidissement d’un film résistif', 'La pression du carburant', 'La teneur en oxygène des gaz'], e: 'L’air refroidit le film, sa résistance et donc la tension changent ; le calculateur en déduit la quantité de carburant.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Sonde lambda : quelle tension pour un mélange riche (λ < 1) ?', c: ['≈ 900 mV', '≈ 100 mV', '≈ 450 mV constant'], e: 'Riche = peu d’oxygène dans les gaz → forte différence avec l’air extérieur → tension haute. Pauvre ≈ 100 mV. Bascule à λ = 1.', r: 'Riche = haut, pauvre = bas.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Pourquoi la sonde lambda a-t-elle une résistance chauffante ?', c: ['Elle ne mesure efficacement qu’à partir de 300 °C', 'Pour brûler les suies', 'Pour réchauffer l’air d’admission'], e: 'La couche de platine n’est efficace qu’à chaud : la résistance chauffante l’amène vite à 300 °C.', src: 'Cours « Les capteurs dans l’automobile »' },
    { l: 'capteurs', q: 'Comment contrôler un capteur inductif débranché ?', c: ['À l’ohmmètre : résistance du bobinage et isolement par rapport à la masse', 'Uniquement à l’oscilloscope', 'En l’alimentant en 5 V'], e: 'Branché, on mesure au voltmètre ALTERNATIF (signal sinusoïdal).', src: 'Cours « Les capteurs dans l’automobile »' },
  ]
});
