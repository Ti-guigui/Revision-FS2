REV.add({
  id: 'hydro', name: 'Hydraulique', icon: '🛢️', color: '#0d9488',
  desc: 'Lois, composants, régulations, Load Sensing, transmission hydrostatique, diagnostic.',
  lessons: [
    {
      id: 'bases', title: 'Les bases : pression = force, débit = vitesse',
      html: `
<p>En hydraulique, la <b>PRESSION c’est la FORCE</b>, le <b>DÉBIT c’est la VITESSE</b>. La pompe crée le débit ; la pression est créée par <b>toutes les résistances qui s’opposent à l’écoulement de l’huile</b>.</p>
<div class="tw"><table><tr><th>Grandeur</th><th>Formule</th><th>Unités</th></tr>
<tr><td>Pression</td><td>P = F / S</td><td>bar, daN, cm² · 1 bar = 10⁵ Pa = 100 kPa = 0,1 MPa · 1 PSI = 0,07 bar</td></tr>
<tr><td>Débit d’une pompe</td><td>Q = V × N / 1000</td><td>L/min, cm³/tr, tr/min</td></tr>
<tr><td>Vitesse d’un vérin</td><td>v = Q / (6 × S)</td><td>m/s, L/min, cm²</td></tr>
<tr><td>Vitesse d’un moteur</td><td>N = Q × 1000 / V</td><td>tr/min, L/min, cm³/tr</td></tr>
<tr><td>Couple d’un moteur</td><td>C = P × V / 628</td><td>N·m, bar, cm³/tr</td></tr>
<tr><td>Puissance hydraulique</td><td>Pu = P × Q / 600</td><td>kW, bar, L/min</td></tr>
<tr><td>Bernoulli (orifice)</td><td>Q = K × S × √ΔP</td><td>S = section de passage, ΔP = écart de pression</td></tr></table></div>
<ul><li><b>Loi de Pascal</b> : circuit en équilibre = même pression partout, pas de circulation.</li>
<li><b>Étranglement</b> : section ↓ → vitesse ↑ et pression qui chute après (débit constant : S1·V1 = S2·V2).</li>
<li><b>Codes couleur</b> : rouge = pression principale · bleu = retour bâche · vert = commande, gavage.</li>
<li>Manomètre : choisir le calibre (0-40, 0-60, 0-100, 0-300) et le brancher en premier. Débitmètre : en série.</li></ul>
<div class="box explic"><b>+ Exemples corrigés</b><ul>
<li>Pompe 30 cm³ à 2 800 tr/min : Q = 30 × 2 800 / 1 000 = <b>84 L/min</b>.</li>
<li>Pompe 40 cm³ à 1 500 tr/min, LPS 200 b qui s’ouvre : Q = 60 L/min → Pu = 200 × 60 / 600 = <b>20 kW</b>.</li>
<li>Clapet freineur limitant la sortie côté tige (S = 5 cm²) à 30 L/min : v = 30 / (6 × 5) = <b>1 m/s</b>.</li></ul></div>`,
      retenir: ['Pression = force ; débit = vitesse.', 'Q = V × N / 1000 · v = Q / (6 × S) · Pu = P × Q / 600.', 'La vitesse d’un vérin dépend de la surface et du débit.'],
      pieges: ['La pompe ne crée pas la pression : elle crée le débit.', 'Toujours ramener à la bonne unité (cm², L/min, bar).'],
      memo: { cle: 'PRESSION = FORCE · DÉBIT = VITESSE', points: ['Q = V × N / 1000', 'v = Q / (6 × S)', 'Pu = P × Q / 600', 'C = P × V / 628', 'Rouge pression · bleu retour · vert commande'], astuce: '« 1000, 6, 600, 628 » : les quatre diviseurs magiques de l’hydraulique.' }
    },
    {
      id: 'fluides', title: 'Fluides et phénomènes',
      html: `
<ul><li><b>Rôles de l’huile</b> : transmettre l’énergie, lubrifier, protéger de la corrosion, transporter la chaleur et les impuretés. Les liquides sont incompressibles.</li>
<li><b>Viscosité</b> = résistance à l’écoulement : augmente si la température baisse ou la pression monte.</li>
<li>Densité (sans unité) ; point d’aniline (action sur les élastomères) ; point d’éclair ; point de feu.</li>
<li><b>Cavitation</b> : bulles de vide dues à une forte dépression, qui implosent. 99 % côté bâche → pompe (mise à l’air bouchée, filtre ou crépine colmatés, robinet fermé, huile trop visqueuse, tuyau écrasé).</li>
<li><b>Pente de charge</b> : perte de pression par frottement, changement de direction ou de section ; n’existe que s’il y a du débit → échauffement, lenteur, perte de force.</li>
<li><b>Coup de bélier</b> : onde de pression après un arrêt brutal. <b>Émulsion</b> : eau dans l’huile (condensation, lavage HP) → additif anti-émulsion.</li>
<li><b>Bâche</b> : absorber, décanter, tranquilliser, refroidir, contenir, compenser, filtrer. Filtre à l’aspiration (protège tout, pente de charge), au refoulement (maille fine), au retour (léger, pas cher). Ratio β = particules en entrée / en sortie.</li>
<li>Joints à chevrons (réglables), <b>joints oléiques</b> (équilibrage radial d’un composant, lubrification), joint tournant (tourelle).</li></ul>`,
      retenir: ['Cavitation = bulles de vide (forte dépression) qui implosent, côté aspiration.', 'Pente de charge = uniquement s’il y a du débit.', 'Joint oléique = équilibrage radial.'],
      pieges: ['La cavitation se cherche côté bâche → pompe, pas côté récepteur.'],
      memo: { cle: 'CAVITATION = DÉPRESSION À L’ASPIRATION', flow: ['Crépine colmatée / huile trop visqueuse', 'Forte dépression', 'Bulles de vide', 'Implosion → bruit, usure pompe'], points: ['Viscosité ↑ si T° ↓ ou P ↑', 'Coup de bélier = arrêt brutal', 'Émulsion = eau dans l’huile'], astuce: 'Pompe qui « graillonne » ? Regarde d’abord côté bâche.' }
    },
    {
      id: 'distributeurs', title: 'Distributeurs',
      html: `
<p>Désignation en 7 critères : <b>nombre d’orifices / nombre de positions / type de centre</b> (fermé, ouvert, en H, à suivre) / <b>commande / rappel</b> / maintien en position / progressivité. Exemple : 4/3 centre ouvert, commande électro-hydraulique, rappel par ressort.</p>
<div class="tw"><table><tr><th>Recouvrement</th><th>Pendant le déplacement du tiroir</th></tr>
<tr><td>Positif</td><td>Le retour pompe → bâche est coupé avant que pompe → récepteur s’ouvre</td></tr>
<tr><td>Nul</td><td>Les deux se font en même temps</td></tr>
<tr><td>Négatif (le plus courant)</td><td>Un instant, tous les orifices communiquent → clapet anti-dérive pour éviter l’effondrement d’une charge menante</td></tr></table></div>
<div class="tw"><table><tr><th>Montage</th><th>Avantage</th><th>Inconvénient</th></tr>
<tr><td>Série</td><td>Mouvements simultanés ; les vérins sortent en même temps à des vitesses différentes</td><td>Pressions qui s’additionnent ; un récepteur en butée arrête tout</td></tr>
<tr><td>Individuel (prioritaire)</td><td>Priorité au plus proche de la pompe</td><td>Un seul mouvement à la fois</td></tr>
<tr><td>Parallèle</td><td>Distributeurs indépendants</td><td>Le moins chargé part en premier ; débit partagé</td></tr></table></div>`,
      retenir: ['4/3 = 4 orifices, 3 positions.', 'Série : les vérins sortent en même temps à des vitesses différentes.', 'Parallèle : le moins chargé part en premier.'],
      pieges: ['Recouvrement négatif = tous les orifices communiquent un instant (charge menante qui peut chuter).'],
      memo: { cle: 'ORIFICES / POSITIONS / CENTRE / COMMANDE / RAPPEL', points: ['Série → pressions additionnées', 'Individuel → 1 mouvement à la fois', 'Parallèle → le moins chargé d’abord'], astuce: 'En parallèle, l’huile prend toujours le chemin le plus facile.' }
    },
    {
      id: 'pression', title: 'Appareils de pression',
      html: `
<div class="tw"><table><tr><th>Appareil</th><th>Au repos</th><th>Pilotage</th><th>Rôle</th></tr>
<tr><td>Limiteur de pression (direct ou piloté)</td><td>Fermé, en dérivation vers bâche</td><td>Amont</td><td>Protéger, limiter la force. Piloté = plus précis, plus souple, gros débits</td></tr>
<tr><td>LPP</td><td colspan="3">Entre pompe et distributeur : pression maxi de tout le circuit</td></tr>
<tr><td>LPS</td><td colspan="3">Entre distributeur et récepteur : protège une branche, taré plus bas</td></tr>
<tr><td>LPSAC</td><td colspan="3">Anti-choc, taré plus haut ; souvent avec clapet de réalimentation (anti-cavitation)</td></tr>
<tr><td>Réducteur 2 voies</td><td>Ouvert, en série</td><td>Aval</td><td>Pression de sortie plus faible (ex. commande 25 b). Rien ne le protège si l’aval monte</td></tr>
<tr><td>Réducteur 3 voies</td><td>Ouvert</td><td>Aval</td><td>Idem + retour bâche : protège le circuit de commande d’une surpression</td></tr>
<tr><td>Soupape de séquence</td><td>Fermée, en série</td><td>Amont</td><td>Priorité d’alimentation d’une partie du circuit (ex. vérin avant moteur)</td></tr>
<tr><td>Soupape d’équilibrage</td><td>Fermée</td><td>—</td><td>Maîtriser la descente d’une charge menante fixe</td></tr>
<tr><td>Soupape de freinage</td><td>Fermée</td><td>—</td><td>Charge menante variable, maintien en position ; bloc = 2 soupapes + clapets</td></tr></table></div>`,
      retenir: ['Limiteur : fermé au repos, pilotage AMONT.', 'Réducteur : ouvert au repos, pilotage AVAL.', 'Réducteur 3 voies : protège le circuit de commande d’une surpression.', 'Séquence = priorité ; équilibrage = charge menante fixe ; freinage = charge variable.'],
      pieges: ['Symbole P → A ouvert, pilotage pris en aval = RÉDUCTEUR, pas limiteur.'],
      memo: { cle: 'LIMITEUR FERMÉ/AMONT · RÉDUCTEUR OUVERT/AVAL', points: ['LPP : tout le circuit', 'LPS : une branche (plus bas)', 'LPSAC : anti-choc (plus haut)', 'Séquence : vérin avant moteur'], astuce: 'Le limiteur surveille ce qui arrive (amont), le réducteur surveille ce qui part (aval).' }
    },
    {
      id: 'debit', title: 'Débit, clapets, accumulateur',
      html: `
<ul><li><b>Limiteur de débit</b> (étranglement en série) : sensible ou non à la viscosité, simple ou double effet (clapet freineur), fixe ou réglable.</li>
<li><b>Régulateur de débit</b> : garde un ΔP constant sur l’étranglement → vitesse constante quelle que soit la charge. <b>2 voies</b> = balance en série (l’excédent part par le limiteur : pertes). <b>3 voies</b> = balance qui renvoie l’excédent à la bâche : <b>consomme moins</b>.</li>
<li><b>Diviseur de débit</b> à tiroir (vitesses identiques) ou à action prioritaire (CF = circuit prioritaire, ex. direction ; EF = excédent vers l’équipement ; LS).</li>
<li><b>Clapet anti-retour</b> (ressort &lt; 1,4 b) ; taré ; <b>piloté</b> : maintient un récepteur en l’absence de génération ; bloc de sécurité = 2 clapets pilotés. <b>Sélecteur de circuit</b> : choisit la plus forte pression de deux branches.</li>
<li><b>Accumulateur</b> (membrane, vessie, piston ; réglementation ESP) : réserve d’énergie de secours, amortisseur, maintien de pression. <b>Conjoncteur-disjoncteur</b> : charge l’accumulateur puis décharge la pompe.</li></ul>`,
      retenir: ['Régulateur 3 voies vs 2 voies : consomme moins.', 'Clapet anti-retour piloté : empêche le déplacement sans génération.', 'Sélecteur de circuit : la plus forte pression passe.'],
      pieges: ['Limiteur de débit (vitesse dépend de la charge) ≠ régulateur de débit (vitesse constante).'],
      memo: { cle: 'RÉGULATEUR = ΔP CONSTANT = VITESSE CONSTANTE', points: ['2 voies : balance en série (pertes)', '3 voies : excédent à la bâche (économe)', 'Clapet piloté = maintien sans génération'], astuce: '3 voies = 3ᵉ chemin vers la bâche = moins de pertes.' }
    },
    {
      id: 'recepteurs', title: 'Récepteurs et pompes',
      html: `
<ul><li><b>Vérins</b> : simple effet (rentrée par ressort) ; double effet (rentrée plus rapide, moins forte) ; <b>différentiel</b> (S1/S2 = 1/2 : rentrée 2× plus vite, avec 2× moins de force) ; équilibré (S1 = S2) ; télescopique ; de rotation.</li>
<li>Options : amortisseur de fin de course ; <b>débrayage de fin de course</b> (un vérin en butée, l’autre s’arrête).</li>
<li><b>Moteurs</b> : engrenages, palettes, pistons axiaux ; 1 ou 2 sens, cylindrée fixe ou variable (drainage externe).</li>
<li><b>Pompe</b> : transforme l’énergie mécanique en hydraulique, crée le débit. Cylindrée variable = débit réglable sans changer le régime. Réversible = sens du flux inversé sans changer le sens de rotation.</li>
<li><b>Régulations de pompe</b> : puissance constante (P↑ → Q↓, Q jamais nul ; Q = 400 L/min et Pu = 150 kW → P = 600 × 150 / 400 = 225 b) ; à équerre ; à pression constante.</li></ul>
<div class="box retenir"><b>★ Montage différentiel</b><p>En sortie de tige, l’huile côté tige est renvoyée côté fond. <b>Le débit de la pompe correspond au volume côté tige</b> : la tige sort à la même vitesse qu’elle rentre, mais avec moins de force. Avantages : vitesses égales, pompe plus petite, moins lourd et encombrant.</p></div>`,
      retenir: ['Vérin différentiel = double effet de rapport de surface 1/2.', 'Montage différentiel : débit pompe = débit côté tige.', 'Débrayage de fin de course : un vérin en butée, l’autre s’arrête.'],
      pieges: ['Différentiel : même vitesse sortie/rentrée, mais force divisée.'],
      memo: { cle: 'DIFFÉRENTIEL : S1/S2 = 1/2', flow: ['Sortie de tige', 'Huile côté tige renvoyée côté fond', 'Débit pompe = débit côté tige', 'Vitesse sortie = vitesse rentrée'], points: ['Puissance constante : P ↑ → Q ↓', 'Réversible = sens du flux inversé'], astuce: 'Le différentiel recycle son huile : plus vite, mais moins fort.' }
    },
    {
      id: 'direction', title: 'Direction hydrostatique',
      html: `
<ul><li><b>Direction assistée</b> = direction mécanique + aide hydraulique (valve rotative). Régulation de pression = force de braquage et protection en butée ; régulation de débit = même vitesse de braquage quel que soit le régime.</li>
<li><b>Direction hydrostatique</b> : simple, souple, pas de réaction au volant ; mais pas de rappel en ligne droite et difficile à manœuvrer sans génération.</li>
<li>Boîtiers (orbitrol) : centre ouvert (LPSAC avec clapet de réalimentation), centre fermé sans LS, centre fermé avec LS.</li>
<li>Montage différentiel du vérin de direction : vitesses égales, pompe plus petite (protection par LPSAC).</li></ul>`,
      retenir: ['Hydrostatique : pas de rappel en ligne droite, pas de réaction au volant.', 'Régulation de débit = même vitesse de braquage quel que soit le régime.'],
      memo: { cle: 'HYDROSTATIQUE = PAS DE LIAISON MÉCANIQUE', points: ['+ simple, souple', '− pas de rappel, difficile sans génération', 'Orbitrol centre ouvert / fermé / LS'], astuce: 'Sans moteur qui tourne, la direction hydrostatique devient lourde.' }
    },
    {
      id: 'ls', title: 'Load Sensing (LS)',
      html: `
<p>Sans LS, la pompe débite tout, tout le temps : grosse puissance perdue au neutre et en butée, vitesse qui dépend de la charge. Le LS <b>adapte en permanence le débit (et la pression) au juste besoin du récepteur le plus chargé</b>.</p>
<ul><li><b>Centre ouvert + balance d’entrée</b> (pompe fixe) : P pompe = P LS + tarage ; distributeur + balance d’entrée = régulateur de débit 3 voies.</li>
<li><b>Centre fermé</b> : <b>pompe à cylindrée variable</b> avec tiroir LS (P pompe = P LS max + marge), gicleur anti-pompage, servo-piston.</li>
<li><b>BIP</b> (balance individuelle de pression) avant chaque distributeur : garde ΔP constant, donc la vitesse du récepteur le moins chargé en simultané. BIP + distributeur = régulateur de débit 2 voies.</li>
<li><b>Tiroir d’annulation de débit (TAD)</b> : définit la pression maxi et annule le débit en butée → supprime la puissance de coin (P max × Q max).</li></ul>
<div class="tw"><table><tr><th>Valeur</th><th>Appareil</th><th>Signification</th></tr>
<tr><td>6 b</td><td>BIP</td><td>ΔP constant aux bornes de chaque distributeur</td></tr>
<tr><td>17 b</td><td>Tiroir LS de la pompe</td><td>P pompe = P LS max + 17 b</td></tr>
<tr><td>25 b</td><td>Réducteur 2 voies</td><td>Pression de commande</td></tr>
<tr><td>30 b</td><td>Limiteur</td><td>Maxi du circuit de commande</td></tr>
<tr><td>252 b</td><td>TAD</td><td>Pression maxi de service, annulation de débit</td></tr>
<tr><td>280 / 340 b</td><td>LPSAC</td><td>Anti-choc, taré au-dessus du TAD (normal et voulu)</td></tr></table></div>
<p>Exemple : ripper 150 b / 5 L/min + orientation 80 b / 15 L/min → LS max 150 b ; pompe 167 b ; entrée distributeur ripper 156 b ; orientation 86 b ; Pu = 167 × 21 / 600 ≈ 5,85 kW.</p>
<div class="tw"><table><tr><th>Symptôme</th><th>Déduction</th></tr>
<tr><td>Moteur qui cale en butée (récepteurs sans LPSAC), baisse de régime sur les autres</td><td>TAD sur-taré ou grippé</td></tr>
<tr><td>Descente OK (gravité), rien ne remonte, commande à 30 b au lieu de 25</td><td>Réducteur 2 voies bloqué ouvert</td></tr>
<tr><td>Orientation seule OK, accélère avec le ripper</td><td>BIP de l’orientation bloquée ouverte</td></tr>
<tr><td>Télescope qui accélère en combiné</td><td>Balance individuelle</td></tr></table></div>
<h3>Circuit des treuils TRM 700-100 (LS centre ouvert)</h3>
<p>Pompe fixe 40 cm³ à 2 000 tr/min = 80 L/min ; balance d’entrée 20 b ; treuils 140 b et 120 b. LS max = 140 b → pompe = 140 + 20 = <b>160 b</b>. Au neutre : <b>20 b</b> (tarage de la balance). Maxi : 170 (pilote) + 20 = 190 b. Pu = 160 × 80 / 600 ≈ 21,3 kW.</p>`,
      images: [{ src: 'pelle-emad1.jpg', cap: 'Schéma hydraulique de pelle EMAD 1 : tiroir LS 27 b, annulation de débit 240 b, limiteur de secours 280 b, balances individuelles 10 b' }],
      retenir: ['LS centre fermé = pompe à cylindrée variable.', 'BIP + distributeur = régulateur 2 voies ; balance d’entrée + distributeur = régulateur 3 voies.', 'TAD = pression maxi + annulation du débit en butée.', 'Pression au neutre = tarage du tiroir LS (ex. 27 b).'],
      pieges: ['LPSAC taré AU-DESSUS du TAD : c’est normal et voulu.'],
      memo: { cle: 'LS = JUSTE BESOIN DU PLUS CHARGÉ', flow: ['Récepteur le plus chargé (P LS max)', '+ marge du tiroir LS', '= pression pompe', 'BIP : ΔP constant par distributeur'], points: ['Centre fermé → pompe variable', 'TAD supprime la puissance de coin', 'Un seul récepteur qui accélère en combiné → sa BIP'], astuce: 'Le LS, c’est un serveur qui ne remplit que le verre le plus grand.' }
    },
    {
      id: 'hydrostatique', title: 'Transmission hydrostatique (circuit fermé)',
      html: `
<p>Boucle de puissance : pompe à cylindrée variable 2 sens de flux ↔ moteur hydraulique ↔ retour direct à la pompe, <b>sans passer par la bâche</b>. Gain de poids, couple, souplesse, infinité de vitesses.</p>
<ul><li><b>Gavage</b> (pompe fixe 1 sens + 2 clapets + limiteur de gavage) : compenser les fuites, plaquer les pistons, lubrifier, alimenter la servocommande, régénérer l’huile. La pression de gavage est maintenue par un <b>limiteur de pression</b>.</li>
<li><b>Soupapes HP</b> : protègent la boucle et le moteur hydraulique des chocs (tarées au-dessus de l’annulation de débit).</li>
<li><b>Servocommande</b> : servodistributeur + servopiston + rétroaction mécanique (progressivité).</li>
<li><b>Circuit d’échange / balayage</b> : tiroir piloté par la HP qui envoie la BP vers un limiteur taré <b>plus bas que le gavage</b> → l’huile chaude part au refroidisseur et le gavage la remplace.</li>
<li><b>Valve automotive (DA)</b> : gère la progression selon le régime du moteur thermique. <b>Inching</b> : ralentir voire stopper l’engin au régime nominal (pour donner la puissance à l’équipement).</li>
<li><b>Soupape d’annulation de débit</b> : annule le débit quand la pression atteint le tarage (roues bloquées) pour que le moteur ne cale pas, ET définit la pression maxi de service.</li>
<li><b>Moteur à régulation de puissance</b> : adapte sa cylindrée à la charge (charge ↑ → cylindrée ↑ → couple ↑, vitesse ↓).</li>
<li>Remorquage : robinet d’isolement (sans drainage = blocage hydrostatique).</li></ul>
<div class="tw"><table><tr><th>Symptôme / relevés</th><th>Déduction</th></tr>
<tr><td>AV plafonne à 50 b, AR monte à 280 b</td><td>Soupape HP de la boucle AV déréglée à 50 b (ou fuit)</td></tr>
<tr><td>320 b dans les deux sens, moteur thermique qui cale</td><td>Soupape d’annulation de débit grippée ou sur-tarée</td></tr>
<tr><td>5 b partout, véhicule immobile</td><td>Limiteur de gavage déréglé à 5 b (servocommande non alimentée)</td></tr>
<tr><td>Part puis s’arrête, pressions 20 → 4 → 20 b</td><td>Limiteur d’échange déréglé à 4 b (cavitation)</td></tr>
<tr><td>Vitesse maxi immédiate</td><td>Rétroaction mécanique cassée</td></tr></table></div>
<p>Schéma UV2 : gavage 30 b, balayage 27 b, annulation de débit 320 b, soupapes HP 360 b. En marche, la BP = 27 b (limiteur de balayage) ; pression de service maxi = <b>320 b</b> (360 b = sécurité).</p>`,
      images: [{ src: 'transmission-hydrostatique.jpg', cap: 'Transmission hydrostatique : pompe 90 cm³ (1), gavage 10 cm³ (2), valve DA (3), limiteur de gavage 30 b (4), soupapes HP 360 b (5), annulation 320 b (7), balayage (10) + limiteur 27 b (11), robinet (12)' }],
      retenir: ['Moteur de la boucle protégé par une soupape haute pression.', 'Gavage maintenu par un limiteur de pression.', 'Limiteur de balayage taré PLUS BAS que le gavage.', 'Valve DA = avancement selon le régime ; inching = ralentir au régime nominal.'],
      pieges: ['Si le balayage était taré au-dessus du gavage, l’huile de la boucle ne serait jamais renouvelée ni refroidie.', 'Roues bloquées : c’est l’annulation de débit qui travaille, pas les soupapes HP.'],
      memo: { cle: 'CIRCUIT FERMÉ : POMPE ↔ MOTEUR SANS BÂCHE', flow: ['Pompe variable 2 sens', 'Moteur hydraulique', 'Retour direct à la pompe', 'Gavage compense les fuites', 'Balayage évacue l’huile chaude'], points: ['Balayage (27 b) < gavage (30 b)', 'Annulation (320 b) < soupapes HP (360 b)', 'Régulation de puissance : cylindrée ↑ avec la charge'], astuce: 'Gavage = on remplit ; balayage = on vide l’huile chaude. Pour que ça circule, on vide plus bas qu’on remplit.' }
    },
    {
      id: 'diagnostic', title: 'Méthode de diagnostic et symboles',
      html: `
<div class="box methode"><b>✎ Méthode</b><p>1) <b>Combien de récepteurs ?</b> (tous → appareil commun : pompe, LPP, TAD, commande ; un seul → appareil de sa section). 2) <b>Combien de sens ?</b> (2 sens → en amont du distributeur : balance, tiroir ; 1 sens → sur une ligne : LPS, anti-cavitation, freinage). 3) <b>Problème de quoi ?</b> Vitesse = DÉBIT ; force = PRESSION ; moteur qui cale = PUISSANCE. 4) Quels appareils agissent sur cette grandeur ? 5) Leur rôle et tarage ? 6) Déduction + état (bloqué ouvert/fermé, grippé, sur-taré, déréglé).</p></div>
<div class="tw"><table><tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>Tous les récepteurs manquent de force</td><td>LPP détaré</td></tr>
<tr><td>Un récepteur manque de force dans un sens</td><td>LPS détaré ou bloqué ouvert</td></tr>
<tr><td>Manque de vitesse dans un sens (1 récepteur)</td><td>Soupape de freinage</td></tr>
<tr><td>Tous lents</td><td>Régime moteur, fuite interne pompe, entraînement qui patine, plage du LPP</td></tr>
<tr><td>Vérins de verrouillage sortent mais ne rentrent plus</td><td>Limiteur secondaire (2 vérins d’une fonction, 1 sens → appareil sur une ligne)</td></tr>
<tr><td>Châssis qui descend</td><td>LPSAC détaré ou vérin qui « barrique »</td></tr>
<tr><td>Réactions brusques, 290 b en butée (annulation prévue à 240 b)</td><td>Dispositif d’annulation de débit : c’est le limiteur de secours qui travaille</td></tr></table></div>
<h3>Symboles à reconnaître</h3>
<div class="tw"><table><tr><th>Symbole (description)</th><th>Désignation</th></tr>
<tr><td>P → T, pilotage amont, ressort réglable</td><td>Limiteur de pression réglable</td></tr>
<tr><td>Clapet principal + étage pilote + gicleur</td><td>Limiteur de pression à commande pilotée (détaillée)</td></tr>
<tr><td>P → A ouvert au repos, pilotage aval, drain</td><td>Réducteur de pression 2 voies</td></tr>
<tr><td>Idem avec retour bâche</td><td>Réducteur de pression 3 voies</td></tr>
<tr><td>Étrangleur + clapet en parallèle</td><td>Clapet freineur / limiteur de débit simple effet</td></tr>
<tr><td>Balance « LS 5 b »</td><td>Balance individuelle de pression</td></tr>
<tr><td>Tiroir EF / CF / LS</td><td>Diviseur de débit à action prioritaire</td></tr>
<tr><td>Soupape pilotée amont devant un moteur</td><td>Soupape de séquence</td></tr>
<tr><td>Soupape + clapet sous un vérin, pilotage côté tige</td><td>Soupape d’équilibrage</td></tr>
<tr><td>Soupape + clapet, pilotage croisé</td><td>Soupape de freinage</td></tr>
<tr><td>Ellipse avec triangle</td><td>Accumulateur</td></tr>
<tr><td>Deux clapets opposés</td><td>Sélecteur de circuit</td></tr>
<tr><td>Accumulateur + clapet + limiteur piloté</td><td>Conjoncteur-disjoncteur</td></tr></table></div>`,
      retenir: ['Vitesse = débit ; force = pression ; calage = puissance.', 'Tous les récepteurs → appareil commun ; un seul → sa section.', '2 sens → amont du distributeur ; 1 sens → sur une ligne.'],
      pieges: ['Chercher sur la ligne d’un seul vérin quand TOUS les récepteurs sont touchés.'],
      memo: { cle: 'COMBIEN ? QUEL SENS ? QUELLE GRANDEUR ?', flow: ['Combien de récepteurs ?', 'Combien de sens ?', 'Vitesse / force / puissance ?', 'Quels appareils ?', 'Tarage et rôle', 'Déduction + état'], points: ['Tous sans force → LPP', 'Un sens sans force → LPS', 'Moteur qui cale → TAD / annulation'], astuce: 'Vitesse = Débit, Force = Pression : « VD – FP ».' }
    }
  ],
  questions: [
    { l: 'bases', q: 'La pression dans un circuit hydraulique est créée par…', c: ['Toutes les résistances qui s’opposent à l’écoulement de l’huile', 'La pompe', 'Le réservoir', 'Le limiteur de pression uniquement'], e: 'La pompe crée le débit ; la pression naît des résistances (charge, étranglements, frottements).', r: 'Pression = force ; débit = vitesse.', src: 'Contrôle de départ I' },
    { l: 'bases', q: 'La vitesse d’un vérin dépend…', c: ['De la surface et du débit', 'De la pression et de la surface', 'De la pression seule', 'De la viscosité seule'], e: 'v = Q / (6 × S) : débit et surface.', src: 'Test final Q31 (officiel)' },
    { l: 'bases', q: 'Débit d’une pompe de 30 cm³/tr à 2 800 tr/min ?', c: ['84 L/min', '8,4 L/min', '840 L/min', '93 L/min'], e: 'Q = V × N / 1000 = 30 × 2 800 / 1 000 = 84 L/min.', r: 'Q = V × N / 1000.', src: 'Sujet pelle / tarière Q3' },
    { l: 'bases', q: 'Puissance hydraulique : P = 200 bar, Q = 60 L/min ?', c: ['20 kW', '12 kW', '2 kW', '200 kW'], e: 'Pu = P × Q / 600 = 200 × 60 / 600 = 20 kW.', r: 'Pu (kW) = P (bar) × Q (L/min) / 600.', src: 'Test intermédiaire I' },
    { l: 'bases', q: 'Clapet freineur limitant à 30 L/min l’huile qui sort côté tige (S1 = 5 cm²). Vitesse de sortie du vérin ?', c: ['1 m/s', '0,5 m/s', '3 m/s', '0,1 m/s'], e: 'v = Q / (6 × S) = 30 / (6 × 5) = 1 m/s. L’excédent de la pompe part par le limiteur.', src: 'Test intermédiaire I' },
    { l: 'bases', q: 'Pompe 40 cm³ à 1 500 tr/min, LPP 250 b, vérin maintenu en butée côté tige, LPS de la ligne 200 b. Puissance maxi ?', c: ['20 kW', '25 kW', '10 kW', '60 kW'], e: 'Q = 40 × 1 500 / 1 000 = 60 L/min. C’est le LPS (200 b), taré sous le LPP, qui s’ouvre : Pu = 200 × 60 / 600 = 20 kW.', w: 'Prendre la pression de l’appareil qui s’ouvre réellement, pas le LPP.', src: 'Test intermédiaire I' },
    { l: 'bases', q: 'Code couleur hydraulique : le vert représente…', c: ['La commande / le gavage', 'La pression principale', 'Le retour bâche', 'Le drain'], e: 'Rouge = pression principale · bleu = retour bâche · vert = commande, gavage.' },
    { l: 'bases', q: '1 bar est égal à :', c: ['10⁵ Pa (100 kPa)', '10³ Pa', '1 MPa', '14,5 kPa'], e: '1 bar = 10⁵ Pa = 100 kPa = 0,1 MPa. 1 PSI ≈ 0,07 bar.' },
    { l: 'fluides', q: 'La cavitation, c’est…', c: ['Des bulles de vide liées à une forte dépression, qui implosent', 'De l’eau dans l’huile', 'Une onde de pression après un arrêt brutal', 'Une perte de charge par frottement'], e: 'Forte dépression à l’aspiration → bulles de vide → implosion. 99 % des causes sont côté bâche → pompe.', r: 'Émulsion = eau ; coup de bélier = onde de pression.', src: 'Contrôle de départ I' },
    { l: 'fluides', q: 'La viscosité d’une huile augmente quand…', c: ['La température baisse ou la pression monte', 'La température monte', 'La pression baisse', 'Le débit augmente'], e: 'Froide ou comprimée, l’huile résiste davantage à l’écoulement.' },
    { l: 'fluides', q: 'Rôle d’un joint oléique ?', c: ['Créer un équilibrage radial du composant', 'Assurer l’étanchéité d’une tourelle', 'Être réglable en serrage', 'Filtrer l’huile'], e: 'Le joint oléique équilibre radialement le composant (et participe à sa lubrification).', src: 'Test final Q40 (officiel)' },
    { l: 'fluides', q: 'Une pente de charge (perte de pression) n’existe que…', c: ['S’il y a du débit', 'Si le circuit est à l’arrêt', 'Si l’huile est froide', 'En circuit fermé'], e: 'Elle vient des frottements et changements de direction/section de l’huile qui circule. Sans débit, loi de Pascal : même pression partout.' },
    { l: 'distributeurs', q: 'Distributeurs montés en SÉRIE, tous actionnés : que se passe-t-il ?', c: ['Les vérins sortent en même temps à des vitesses différentes', 'Seul le vérin le moins chargé sort', 'Seul le premier vérin sort', 'Aucun vérin ne sort'], e: 'En série, l’huile traverse chaque récepteur : mouvements simultanés, pressions qui s’additionnent.', src: 'Contrôle de départ I' },
    { l: 'distributeurs', q: 'Montage en PARALLÈLE : quel récepteur part en premier ?', c: ['Le moins chargé', 'Le plus chargé', 'Le plus proche de la pompe', 'Tous en même temps, à la même vitesse'], e: 'L’huile prend le chemin le plus facile : le débit va d’abord au récepteur le moins chargé.', r: 'Individuel (prioritaire) = priorité au plus proche de la pompe.' },
    { l: 'distributeurs', q: 'Recouvrement négatif d’un distributeur : qu’est-ce que cela implique ?', c: ['Un instant, tous les orifices communiquent → besoin d’un clapet anti-dérive', 'Le retour est coupé avant l’ouverture vers le récepteur', 'Les deux se font en même temps', 'Aucune fuite possible'], e: 'C’est le cas le plus courant ; une charge menante pourrait s’effondrer pendant la manœuvre.' },
    { l: 'pression', q: 'Avantage d’un réducteur de pression 3 voies sur un 2 voies ?', c: ['Il protège le circuit de commande d’une surpression', 'Il consomme moins', 'Il est fermé au repos', 'Il est piloté en amont'], e: 'Le 3ᵉ orifice (retour bâche) évacue une surpression venant de l’aval. Le 2 voies n’est pas protégé si l’aval monte.', src: 'Test final Q35 (officiel)' },
    { l: 'pression', q: 'Symbole : P → A ouvert au repos, pilotage pris en aval (côté A). De quel appareil s’agit-il ?', c: ['Un réducteur de pression', 'Un limiteur de pression', 'Une soupape de séquence', 'Un clapet anti-retour'], e: 'Ouvert au repos + pilotage aval = réducteur : il réduit la pression au tarage.', r: 'Limiteur : fermé, pilotage amont.', src: 'Corrigé UV2 Q25' },
    { l: 'pression', q: 'Quel appareil donne la priorité d’alimentation à un vérin avant un moteur ?', c: ['Une soupape de séquence', 'Une soupape d’équilibrage', 'Un réducteur 2 voies', 'Un LPSAC'], e: 'Fermée au repos, pilotage amont : elle n’ouvre vers le moteur que lorsque la pression du vérin atteint son tarage.', src: 'Test composants' },
    { l: 'pression', q: 'Quel appareil maîtrise la descente d’une charge menante FIXE ?', c: ['Une soupape d’équilibrage', 'Une soupape de séquence', 'Un limiteur de débit', 'Un sélecteur de circuit'], e: 'Soupape d’équilibrage = charge menante fixe. Soupape de freinage = charge menante variable.', src: 'Test composants' },
    { l: 'pression', q: 'Quel limiteur fixe la pression maxi de TOUT le circuit ?', c: ['Le LPP (limiteur de pression principal)', 'Le LPS', 'Le LPSAC', 'Le réducteur 3 voies'], e: 'Le LPP est entre pompe et distributeur. Le LPS protège une branche (plus bas), le LPSAC est anti-choc (plus haut).' },
    { l: 'debit', q: 'Avantage d’un régulateur de débit 3 voies sur un 2 voies ?', c: ['Il permet de consommer moins', 'Il protège le circuit de commande', 'Il est plus précis', 'Il supprime la cavitation'], e: 'L’excédent retourne à la bâche sous faible pression au lieu de passer par le limiteur : moins de pertes.', src: 'Test final Q34 (officiel)' },
    { l: 'debit', q: 'Quel appareil empêche le déplacement d’un récepteur en l’absence de génération ?', c: ['Un clapet anti-retour piloté', 'Un sélecteur de circuit', 'Un limiteur de débit', 'Un accumulateur'], e: 'Le clapet piloté verrouille le récepteur ; il ne s’ouvre que sur ordre de pilotage.', src: 'Test final Q37 (officiel)' },
    { l: 'debit', q: 'Un régulateur de débit permet :', c: ['Une vitesse constante quelle que soit la charge', 'Une pression constante', 'De maintenir un récepteur sans génération', 'De stocker de l’énergie'], e: 'Il maintient un ΔP constant sur l’étranglement, donc un débit et une vitesse constants.' },
    { l: 'debit', q: 'Deux clapets opposés sur un symbole, qui laissent passer la plus forte pression de deux branches :', c: ['Sélecteur de circuit', 'Bloc de sécurité', 'Conjoncteur-disjoncteur', 'Diviseur de débit'], e: 'Le sélecteur de circuit (« OU » hydraulique) transmet la plus forte des deux pressions.' },
    { l: 'recepteurs', q: 'Un vérin différentiel, c’est…', c: ['Un vérin double effet de rapport de surface 1/2', 'Un vérin simple effet', 'Un vérin à surfaces égales', 'Un vérin télescopique'], e: 'S1/S2 = 1/2 : la rentrée est 2× plus rapide, avec 2× moins de force.', src: 'Contrôle de départ I' },
    { l: 'recepteurs', q: 'Sortie de tige en montage différentiel : que vaut le débit pompe ?', c: ['Le débit côté tige', 'Le débit côté fond', 'Le double du débit côté fond', 'Zéro'], e: 'L’huile côté tige est renvoyée côté fond ; la pompe ne fournit que le volume côté tige → vitesse de sortie = vitesse de rentrée.', src: 'Test final Q38 (officiel)' },
    { l: 'recepteurs', q: 'Le débrayage de fin de course, c’est :', c: ['Quand un vérin arrive en butée, l’autre s’arrête', 'Un amortissement en fin de course', 'Un blocage de la tige', 'Une purge automatique'], e: 'Il limite la pression en butée : un vérin en butée, l’autre s’arrête aussi.', src: 'Test final Q39 (officiel)' },
    { l: 'recepteurs', q: 'Pompe à puissance constante : Q = 400 L/min et Pu = 150 kW. Pression ?', c: ['225 bar', '150 bar', '375 bar', '60 bar'], e: 'P = 600 × Pu / Q = 600 × 150 / 400 = 225 bar.' },
    { l: 'recepteurs', q: 'Une pompe « réversible » permet :', c: ['D’inverser le sens du flux sans changer le sens de rotation', 'De changer de cylindrée', 'De tourner dans les deux sens', 'De fonctionner en moteur'], e: 'Réversible = sens du flux inversé ; cylindrée variable = débit réglable sans changer le régime.' },
    { l: 'direction', q: 'Inconvénient de la direction hydrostatique ?', c: ['Pas de rappel en ligne droite, difficile sans génération', 'Réaction forte au volant', 'Complexe et lourde', 'Nécessite une liaison mécanique'], e: 'Elle est simple et souple, sans réaction au volant, mais ne rappelle pas les roues en ligne droite.' },
    { l: 'direction', q: 'En direction assistée, la régulation de débit permet :', c: ['La même vitesse de braquage quel que soit le régime', 'Une force de braquage plus grande', 'La protection en butée', 'Le rappel en ligne droite'], e: 'Régulation de pression = force et protection en butée ; régulation de débit = vitesse constante.' },
    { l: 'ls', q: 'Un circuit LS centre fermé est équipé…', c: ['D’une pompe à cylindrée variable', 'D’une pompe à cylindrée fixe', 'D’une balance d’entrée', 'D’un distributeur centre ouvert'], e: 'Le tiroir LS agit sur la cylindrée de la pompe pour ne fournir que le débit nécessaire.', src: 'Test final Q33 (officiel)' },
    { l: 'ls', q: 'BIP + distributeur forment ensemble :', c: ['Un régulateur de débit 2 voies', 'Un régulateur de débit 3 voies', 'Un diviseur de débit', 'Un limiteur piloté'], e: 'La BIP est en série avant le distributeur : ΔP constant → régulateur 2 voies. Balance d’entrée + distributeur = 3 voies.', src: 'Circuit des treuils TRM' },
    { l: 'ls', q: 'Rôle du tiroir (soupape) d’annulation de débit dans un circuit LS ?', c: ['Fixer la pression maxi et annuler le débit en butée', 'Donner la priorité à la direction', 'Maintenir la pression de commande', 'Refroidir l’huile'], e: 'Il supprime la « puissance de coin » (P max × Q max) quand un récepteur est en butée.', src: 'Test composants' },
    { l: 'ls', q: 'Pelle LS : un télescope accélère quand on le combine avec une autre fonction. Élément en cause ?', c: ['Sa balance individuelle de pression', 'Le LPP', 'Le tiroir LS de la pompe', 'Le limiteur de commande'], e: 'Un seul récepteur, vitesse qui dépend des autres : sa BIP ne garde plus un ΔP constant.', src: 'Corrigé UV2 Q21' },
    { l: 'ls', q: 'Pelle EMAD 1 (tiroir LS 27 b) : pression au neutre ?', c: ['27 b', '0 b', '240 b', '10 b'], e: 'Au neutre, la pompe maintient sa pression de veille = tarage du tiroir LS.', img: 'pelle-emad1.jpg', src: 'Corrigé UV2 Q22' },
    { l: 'ls', q: 'Réactions brusques et 290 b en butée alors que l’annulation de débit est prévue à 240 b. Cause ?', c: ['Le dispositif d’annulation de débit', 'La balance individuelle', 'Le limiteur secondaire', 'Le réducteur de commande'], e: 'Il devrait couper à 240 b : c’est le limiteur de secours (280 + 10) qui travaille à sa place.', src: 'Corrigé UV2 Q20' },
    { l: 'ls', q: 'LS centre ouvert (balance 20 b) : treuils à 140 b et 120 b en simultané. Pression pompe ?', c: ['160 b', '140 b', '260 b', '146 b'], e: 'LS max = 140 b → pompe = 140 + 20 (balance d’entrée) = 160 b.', src: 'Circuit des treuils TRM 700-100' },
    { l: 'ls', q: 'Dans un circuit LS, les LPSAC sont tarés au-dessus du TAD. C’est…', c: ['Normal et voulu', 'Une anomalie à corriger', 'Un risque de calage', 'Impossible'], e: 'Le TAD fixe la pression de service ; les LPSAC n’agissent que sur les chocs, au-dessus.' },
    { l: 'hydrostatique', q: 'Dans une boucle de puissance, le moteur hydraulique est protégé par…', c: ['Une soupape haute pression', 'Le limiteur de gavage', 'Le limiteur de balayage', 'Un réducteur 2 voies'], e: 'Les soupapes HP protègent la boucle et le moteur des chocs.', src: 'Test final Q32 (officiel)' },
    { l: 'hydrostatique', q: 'Quel appareil maintient la pression de gavage ?', c: ['Un limiteur de pression', 'Un réducteur de pression', 'Un clapet anti-retour', 'Une soupape de séquence'], e: 'Le limiteur de gavage fixe la pression basse de la boucle (ex. 30 b au neutre).', src: 'Test final Q36 (officiel)' },
    { l: 'hydrostatique', q: 'Pourquoi le limiteur de balayage (27 b) est-il taré plus bas que le gavage (30 b) ?', c: ['Pour que l’huile de la boucle soit renouvelée et refroidie', 'Pour protéger le moteur des chocs', 'Pour augmenter la vitesse', 'Pour éviter le calage'], e: 'L’huile chaude part par le balayage et le gavage la remplace ; si le balayage était plus haut, rien ne circulerait.', src: 'Corrigé UV2' },
    { l: 'hydrostatique', q: 'Rôle de la valve automotive (DA) ?', c: ['Adapter l’avancement au régime du moteur thermique', 'Protéger la boucle des chocs', 'Refroidir l’huile BP', 'Remorquer l’engin'], e: 'Elle gère la progressivité de l’engin selon le régime moteur. L’inching permet de ralentir l’engin au régime nominal.', src: 'Corrigé UV2 Q29' },
    { l: 'hydrostatique', q: 'Pression de service maxi HP (annulation 320 b, soupapes HP 360 b) ?', c: ['320 b', '360 b', '30 b', '27 b'], e: 'C’est l’annulation de débit qui fixe la pression maxi de service ; 360 b = sécurité.', src: 'Corrigé UV2 Q27' },
    { l: 'hydrostatique', q: 'Moteur hydraulique à régulation de puissance : comment réagit-il à une hausse de charge ?', c: ['Il augmente sa cylindrée (couple ↑, vitesse ↓)', 'Il diminue sa cylindrée', 'Il ouvre sa soupape HP', 'Il s’arrête'], e: 'Il adapte sa cylindrée à la charge pour conserver une puissance constante (P = C × ω).', src: 'Corrigé UV2 Q30' },
    { l: 'hydrostatique', q: 'Transmission : 5 b partout, véhicule immobile. Diagnostic ?', c: ['Limiteur de gavage déréglé à 5 b', 'Soupape HP déréglée', 'Rétroaction mécanique cassée', 'Annulation de débit grippée'], e: 'Sans pression de gavage, la servocommande n’est pas alimentée : la pompe reste à cylindrée nulle.' },
    { l: 'hydrostatique', q: 'Transmission : vitesse maxi immédiate dès qu’on touche la commande. Cause ?', c: ['Rétroaction mécanique cassée', 'Limiteur de gavage déréglé', 'Soupape d’annulation grippée', 'Valve d’échange bloquée'], e: 'La rétroaction assure la progressivité de la servocommande ; cassée, la pompe part en cylindrée maxi.' },
    { l: 'hydrostatique', q: 'Roues bloquées en marche avant : quel appareil ramène la cylindrée à zéro ?', c: ['La soupape d’annulation de débit', 'Les soupapes HP', 'Le limiteur de gavage', 'La valve d’échange'], e: 'L’annulation de débit (tarée sous les soupapes HP) annule le débit pour que le moteur thermique ne cale pas.' },
    { l: 'diagnostic', q: 'Tous les récepteurs manquent de force. Appareil probable ?', c: ['Le LPP détaré', 'Un LPS détaré', 'Une soupape de freinage', 'Un clapet anti-retour'], e: 'Tous touchés → appareil commun. Force = pression → LPP.', r: 'Méthode : combien ? quel sens ? quelle grandeur ?' },
    { l: 'diagnostic', q: 'Un seul récepteur manque de force dans UN sens. Appareil probable ?', c: ['Le LPS de cette ligne (détaré ou bloqué ouvert)', 'Le LPP', 'La pompe', 'Le tiroir LS'], e: 'Un seul récepteur, un seul sens → appareil sur une ligne ; force → pression → LPS.' },
    { l: 'diagnostic', q: 'Vérins de verrouillage : ils sortent mais ne rentrent plus. Appareil en cause ?', c: ['Le limiteur secondaire', 'La balance individuelle', 'Le tiroir LS', 'Le dispositif d’annulation de débit'], e: '2 vérins d’une même fonction, 1 seul sens → appareil sur une ligne.', src: 'Corrigé UV2 Q19' },
    { l: 'diagnostic', q: 'Symptôme « le moteur thermique cale ou perd du régime » : quelle grandeur est en cause ?', c: ['La puissance (pression et débit ensemble)', 'Le débit seul', 'La pression seule', 'La viscosité'], e: 'Vitesse = débit ; force = pression ; calage = puissance (trop de P et de Q en même temps).' },
    { l: 'diagnostic', q: 'Clapet principal + étage pilote + gicleur : quel symbole détaillé ?', c: ['Limiteur de pression à commande pilotée', 'Réducteur de pression 3 voies', 'Soupape de freinage', 'Conjoncteur-disjoncteur'], e: 'Le limiteur piloté est plus précis et plus souple, adapté aux gros débits.', src: 'Sujet pelle / tarière Q6' }
  ]
});
