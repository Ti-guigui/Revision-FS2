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
<li><b>Tiroir d’annulation de débit (TAD)</b> : il définit la pression maxi du circuit et, quand un récepteur arrive en butée, il réduit le débit de la pompe pour neutraliser la <b>puissance de coin</b> (P max × Q max).</li></ul>
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
<h3>Fiche de révision : circuit LS centre fermé (lame orientable + ripper)</h3>
<p><b>Type de circuit</b> : circuit <b>ouvert</b>, régulation <b>LS à centre fermé</b>, pompe à <b>cylindrée variable, 1 sens de flux</b>.</p>
<ul><li><b>Récepteurs</b> (tous double effet) : ripper, 2 vérins de levage, 2 vérins d’orientation, 1 vérin d’inclinaison.</li>
<li><b>Distribution</b> : distributeurs 4/3 LS progressifs à centre fermé, commande hydraulique, rappel par ressort (× 3), <b>chacun avec sa BIP</b>. Levage : distributeur <b>4/4</b> LS progressif à centre fermé, <b>à recouvrement négatif</b>, avec son <b>clapet anti-dérive</b>.</li>
<li><b>Commande</b> : manipulateurs hydrauliques alimentés par un circuit de commande à <b>25 b</b>.</li>
<li><b>Sécurités</b> : LPSAC sur les chambres exposées aux chocs ; accumulateur pour reposer les équipements ; distributeur de dépannage 2/2 (retour à la bâche maîtrisé, avec un étranglement).</li></ul>
<div class="tw"><table><tr><th>Appareil</th><th>Rôle</th></tr>
<tr><td><b>Tiroir LS</b> (sur la pompe)</td><td>Adapter le débit et la pression au besoin du circuit (P pompe = P LS maxi + 17 b)</td></tr>
<tr><td><b>Tiroir d’annulation de débit (TAD)</b>, 252 b</td><td>Définir la pression maxi du circuit et réduire le débit de la pompe quand un récepteur est en butée → neutraliser la <b>puissance de coin</b></td></tr>
<tr><td><b>Manipulateurs hydrauliques</b></td><td>Piloter les distributeurs</td></tr>
<tr><td><b>Réducteur de pression 3 voies proportionnel</b></td><td>Transformer la pression de commande en pression de pilotage, proportionnellement à la demande de l’opérateur</td></tr>
<tr><td><b>Réducteur de pression 2 voies</b> (25 b)</td><td>Transformer la pression de service en pression de commande</td></tr>
<tr><td><b>Limiteur de pression de commande</b> (30 b, action directe)</td><td>Définir la pression maxi de commande</td></tr>
<tr><td><b>Accumulateur</b> (chargé à l’azote)</td><td>En cas de panne, permettre de reposer les équipements</td></tr>
<tr><td><b>Clapet anti-retour taré</b></td><td>Éviter la décharge de l’accumulateur en l’absence de génération</td></tr>
<tr><td><b>Clapet anti-dérive</b></td><td>Éviter l’effondrement de la charge pendant le déplacement du tiroir d’un distributeur à recouvrement négatif</td></tr>
<tr><td><b>BIP</b> (balance individuelle de pression), 6 b</td><td>Maintenir un ΔP constant aux bornes du distributeur, donc une vitesse constante du récepteur le moins chargé en utilisation simultanée</td></tr>
<tr><td><b>LPSAC avec clapet de réalimentation</b> (280 / 340 b)</td><td>Protéger le circuit des surpressions en cas de choc, et réalimenter le récepteur pour éviter la cavitation</td></tr>
<tr><td><b>Clapet anti-retour</b></td><td>Éviter la cavitation</td></tr>
<tr><td><b>Sélecteurs de circuit LS</b></td><td>Sélectionner la pression LS la plus forte pour piloter le tiroir LS</td></tr>
<tr><td><b>Distributeur de dépannage 2/2</b>, progressif, centre ouvert à suivre</td><td>Permettre un retour à la bâche maîtrisé → dépannage de l’engin</td></tr>
<tr><td><b>Vérin d’orientation</b> (double effet avec <b>débrayage de fin de course</b>)</td><td>Orienter les lames</td></tr></table></div>
<p><b>Calcul</b> (ripper 150 b / 5 L/min + orientation 80 b / 15 L/min + 1 L/min) : pompe = 150 + 17 = <b>167 b</b> ; Pu = 167 × 21 / 600 ≈ <b>5,85 kW</b>. Récepteur en butée : le TAD (252 b) ramène le débit à ≈ 1 L/min → 252 × 1 / 600 ≈ 0,42 kW seulement.</p>
<div class="box methode"><b>✎ Méthode (circuit ouvert)</b><p>1) Combien de récepteurs ? <b>Un seul</b> → appareil propre à ce récepteur (LPS, BIP) ; <b>tous</b> → appareil commun (LPP, TAD, tiroir LS…). 2) Dans quel sens ? 3) Symptôme : trop rapide, trop lent, pas assez de force, moteur qui cale ou baisse de régime. 4) Problème de quoi ? puissance / débit (vitesse) / pression (force). 5) Quels appareils de débit ou de pression ? 6) Leur rôle et tarage. 7) Appareil en cause + état : bloqué ouvert, bloqué fermé, grippé, sur-taré…</p></div>
<h3>Les 3 cas de pannes</h3>
<div class="tw"><table><tr><th>Cas</th><th>Symptôme</th><th>Analyse</th><th>Conclusion</th></tr>
<tr><td>1</td><td>En butée : orientation (2 sens) et levage en descente → baisse du régime moteur ; ripper, inclinaison et levage en montée → le moteur cale</td><td>Tous les récepteurs → appareil commun ; puissance trop élevée (trop de P et de Q). Là où il y a des LPSAC (340 / 280 b), la pression est limitée : le moteur « tire » (≈ 340 × Q / 600 ≈ 50 kW) sans caler. Ailleurs, rien ne limite la pression → le moteur cale. Le TAD (252 b), taré sous les LPSAC, devait réduire le débit en butée</td><td><b>TAD sur-taré ou grippé</b> : il ne neutralise plus la puissance de coin</td></tr>
<tr><td>2</td><td>Ripper et lame : la descente fonctionne, mais rien ne remonte ; les autres récepteurs ne bougent pas ; pression de commande 30 b au neutre comme en fonctionnement</td><td>Tous les récepteurs → appareil commun. La descente se fait par gravité et fonctionne : les distributeurs sont bien pilotés, donc la commande est bonne. Rien ne remonte ni ne force → problème de pression. 30 b = tarage du limiteur de commande, au lieu des 25 b du réducteur 2 voies, qui doit isoler la commande du circuit de service</td><td><b>Réducteur de pression 2 voies bloqué ouvert</b> : la pression de service communique avec la commande et se retrouve limitée à 30 b</td></tr>
<tr><td>3</td><td>L’orientation seule fonctionne dans les 2 sens ; avec le ripper en même temps, l’orientation accélère</td><td>Un seul récepteur ; problème de vitesse = débit. En amont de son distributeur, la BIP garde normalement ΔP = 6 b (Q = K × S × √ΔP). Ici ΔP = 167 − 80 = 87 b au lieu de 6 b → le débit augmente. BIP + distributeur = régulateur de débit 2 voies</td><td><b>BIP du distributeur d’orientation bloquée (grippée) ouverte</b></td></tr></table></div>
<h3>Circuit des treuils TRM 700-100 (LS centre ouvert)</h3>
<p>Pompe fixe 40 cm³ à 2 000 tr/min = 80 L/min ; balance d’entrée 20 b ; treuils 140 b et 120 b. LS max = 140 b → pompe = 140 + 20 = <b>160 b</b>. Au neutre : <b>20 b</b> (tarage de la balance). Maxi : 170 (pilote) + 20 = 190 b. Pu = 160 × 80 / 600 ≈ 21,3 kW.</p>`,
      images: [{ src: 'hydro-ls-centre-ferme.jpg', cap: 'Tes révisions : circuit LS centre fermé (lame orientable + ripper), pressions coloriées' }, { src: 'pelle-emad1.jpg', cap: 'Schéma hydraulique de pelle EMAD 1 : tiroir LS 27 b, annulation de débit 240 b, limiteur de secours 280 b, balances individuelles 10 b' }],
      retenir: ['LS centre fermé = pompe à cylindrée variable.', 'BIP + distributeur = régulateur 2 voies ; balance d’entrée + distributeur = régulateur de débit 3 voies réglable, sensible à la viscosité.', 'TAD : définir la pression maxi du circuit et, quand un récepteur arrive en butée, réduire le débit de la pompe pour neutraliser la puissance de coin.', 'Pression au neutre = tarage du tiroir LS (ex. 27 b).'],
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
<h3>Fiche de révision : chargeuse compacte (circuit fermé)</h3>
<p><b>Circuit fermé</b> : l’huile refoulée par la pompe revient <b>directement à la pompe</b> par la boucle de puissance, <b>sans repasser par la bâche</b>.</p>
<div class="tw"><table><tr><th>Caractéristique</th><th>Valeur</th></tr>
<tr><td>Régime du moteur thermique</td><td>2 800 tr/min</td></tr>
<tr><td>Pompe de gavage</td><td>10 cm³/tr → Q = 10 × 2 800 / 1 000 = <b>28 L/min</b></td></tr>
<tr><td>Pompe principale</td><td>25 cm³/tr → Q maxi = <b>70 L/min</b></td></tr>
<tr><td>Moteur hydraulique</td><td>32 cm³/tr</td></tr>
<tr><td>Fuites</td><td>pompe 2 L/min + moteur 2 L/min = <b>4 L/min</b></td></tr>
<tr><td>Sécurités / tarages</td><td>Soupapes HP <b>320 b</b> · annulation de débit <b>280 b</b> · limiteur de gavage <b>20 b</b> · limiteur d’échange <b>18 b</b></td></tr></table></div>
<h3>Les appareils et leur rôle</h3>
<div class="tw"><table><tr><th>Appareil</th><th>Rôle</th></tr>
<tr><td><b>Pompe principale</b> : cylindrée variable, 2 sens de flux, drainage externe</td><td>Créer le débit du système → alimenter la boucle de puissance</td></tr>
<tr><td><b>Pompe de gavage</b> : cylindrée fixe, 1 sens de flux</td><td>Compenser les fuites, lubrifier, plaquer les pistons, alimenter la servocommande, régénérer l’huile</td></tr>
<tr><td><b>Clapets anti-retour</b> (gavage)</td><td>Interdire à la HP de passer dans la BP (isoler HP et BP) et laisser le gavage réalimenter la BP</td></tr>
<tr><td><b>Limiteur de pression de gavage</b> (20 b, réglable)</td><td>Définir la pression maxi du gavage <b>au neutre</b> ; participe à la régénération</td></tr>
<tr><td><b>Servodistributeur</b> 4/3 progressif, centre fermé (A et B en Y vers T), commande mécanique, rappel par ressort</td><td>Orienter le flux selon le conducteur → commander le servopiston (marche AV / AR / neutre)</td></tr>
<tr><td><b>Servopiston</b></td><td>Commander la cylindrée de la pompe principale</td></tr>
<tr><td><b>Moteur hydraulique</b> : cylindrée fixe, 2 sens de rotation, drainage externe</td><td>Transformer l’énergie hydraulique en énergie mécanique de rotation → faire tourner les roues</td></tr>
<tr><td><b>Soupapes HP</b> (320 b)</td><td>Protéger le circuit en cas de <b>choc</b> (blocage des roues) → évacuer les surpressions</td></tr>
<tr><td><b>Tiroir d’échange</b> : distributeur 3/3 centre fermé, commande hydraulique, rappel par ressort</td><td>Piloté par la HP, il ouvre la <b>BP</b> vers le limiteur d’échange → régénération de l’huile <b>en fonctionnement</b></td></tr>
<tr><td><b>Limiteur d’échange</b> (18 b, réglable)</td><td>Limiter et maintenir la <b>BP en fonctionnement</b></td></tr>
<tr><td><b>Soupape d’annulation de débit</b> (280 b)</td><td>Définir la pression maxi du circuit et annuler le débit de la pompe en butée → neutraliser la <b>puissance de coin</b></td></tr>
<tr><td><b>Sélecteur de circuit</b></td><td>Choisir la boucle où la pression est la plus forte pour piloter la soupape d’annulation de débit</td></tr>
<tr><td><b>Flexibles de retour de fuite</b></td><td>Ramener l’huile de fuite entre les deux blocs vers la bâche</td></tr>
<tr><td><b>Filtre avec by-pass</b></td><td>Retenir les impuretés (régénération) ; colmaté, l’huile passe par le by-pass</td></tr></table></div>
<p><b>Relevés en marche avant, résistance maxi</b> : HP = 280 b (annulation de débit) ; BP = 18 b (limiteur d’échange) ; débit d’échange = 28 − 4 = <b>24 L/min</b>. Au neutre, la BP vaut <b>20 b</b> (limiteur de gavage) : en marche, c’est le limiteur d’échange (18 b), taré plus bas, qui tient la BP.</p>
<div class="box methode"><b>✎ Méthode de diagnostic en 7 questions</b><ol>
<li><b>Combien de récepteurs / quelles boucles ?</b> Les deux sens → <b>appareil commun</b> ; un seul sens → <b>appareil propre à la boucle</b>.</li>
<li><b>Dans quel sens ?</b> Marche AV, AR ou neutre.</li>
<li><b>Quel symptôme dans chaque sens ?</b></li>
<li><b>Problème de quoi ?</b> Puissance / débit (vitesse) / pression (force).</li>
<li><b>Qu’ai-je sur mon circuit ?</b> Les appareils de débit ou de pression concernés.</li>
<li><b>Qu’est-ce que je sais ?</b> Leur rôle et leur tarage.</li>
<li><b>Qu’est-ce que j’en déduis ?</b> L’appareil en cause et son état : déréglé, sur-taré, bloqué, cassé…</li></ol></div>
<h3>Les 5 cas de pannes</h3>
<div class="tw"><table><tr><th>Cas</th><th>Symptôme et relevés</th><th>Analyse</th><th>Conclusion</th></tr>
<tr><td>1</td><td>Avance normalement mais a du mal à progresser en charge. Marche AV : HP et pompe plafonnent à 50 b (le reste à 18 b) ; neutre 20 b normal ; marche AR : 280 b</td><td>En AR la pression monte bien à 280 b : pompe, sélecteur et annulation de débit sont bons. En AV : manque de force = problème de pression sur une seule boucle. Sur cette boucle, seule la soupape HP (320 b) peut limiter la pression</td><td><b>Soupape HP de la boucle marche avant détarée à 50 b</b></td></tr>
<tr><td>2</td><td>Le moteur thermique cale quand le pilote pousse pour charger. 320 b dans les deux sens ; neutre 20 b normal</td><td>Deux sens → appareil commun. La pression atteint le tarage des soupapes HP alors que la pompe débite toujours → problème de puissance : 320 × 70 / 600 = 37,3 kW, plus que le moteur ne peut fournir. L’annulation (280 b) aurait dû couper le débit avant</td><td><b>Soupape d’annulation de débit bloquée (grippée) ou sur-tarée</b> : elle ne neutralise plus la puissance de coin</td></tr>
<tr><td>3</td><td>Le véhicule ne bouge pas quand le pilote actionne la servocommande. 5 b partout (HP, BP, gavage) dans les 3 positions</td><td>Aucun mouvement dans les deux sens → appareil commun ; la pression ne dépasse jamais 5 b. Au neutre comme en marche, c’est le limiteur de gavage qui impose la pression (20 b attendus). À 5 b, le gavage ne plaque plus les pistons et n’alimente plus la servocommande : la pompe reste à cylindrée nulle</td><td><b>Limiteur de pression de gavage détaré à 5 b</b></td></tr>
<tr><td>4</td><td>Le véhicule part en avant ou en arrière puis s’arrête aussitôt. En marche, les pressions chutent de 20 b à 4 b puis remontent à 20 b, en oscillant</td><td>Deux sens → appareil commun ; pression instable et trop faible. Dès que le véhicule démarre, le tiroir d’échange s’ouvre et c’est le limiteur d’échange qui tient la BP (18 b attendus). À 4 b la BP s’effondre : pistons plus plaqués, la pompe cavite → arrêt, la pression remonte à 20 b, et le cycle recommence</td><td><b>Limiteur d’échange détaré à 4 b</b></td></tr>
<tr><td>5</td><td>Le véhicule atteint tout de suite sa vitesse maximum</td><td>La servocommande est à rétroaction mécanique : le servopiston renvoie sa position au servodistributeur, qui se referme quand la cylindrée atteint la demande → progressivité. Sans rétroaction, le servodistributeur reste ouvert en grand : cylindrée maxi dès la première sollicitation</td><td><b>Rétroaction mécanique cassée</b></td></tr></table></div>
<p>Schéma UV2 : gavage 30 b, balayage 27 b, annulation de débit 320 b, soupapes HP 360 b. En marche, la BP = 27 b (limiteur de balayage) ; pression de service maxi = <b>320 b</b> (360 b = sécurité).</p>`,
      images: [{ src: 'hydro-circuit-ferme-marche-avant.jpg', cap: 'Tes révisions : circuit fermé de la chargeuse compacte en marche avant, résistance maxi (rouge 280 b, vert 18 b, bleu 0 b)' }, { src: 'transmission-hydrostatique.jpg', cap: 'Transmission hydrostatique : pompe 90 cm³ (1), gavage 10 cm³ (2), valve DA (3), limiteur de gavage 30 b (4), soupapes HP 360 b (5), annulation 320 b (7), balayage (10) + limiteur 27 b (11), robinet (12)' }],
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
    { l: 'ls', q: 'Rôle du tiroir (soupape) d’annulation de débit dans un circuit LS ?', c: ['Définir la pression maxi du circuit et, quand un récepteur arrive en butée, réduire le débit de la pompe pour neutraliser la puissance de coin', 'Donner la priorité à la direction', 'Maintenir la pression de commande', 'Refroidir l’huile'], e: 'Il supprime la « puissance de coin » (P max × Q max) quand un récepteur est en butée.', src: 'Test composants' },
    { l: 'ls', q: 'Pelle LS : un télescope accélère quand on le combine avec une autre fonction. Élément en cause ?', c: ['Sa balance individuelle de pression', 'Le LPP', 'Le tiroir LS de la pompe', 'Le limiteur de commande'], e: 'Un seul récepteur, vitesse qui dépend des autres : sa BIP ne garde plus un ΔP constant.', src: 'Corrigé UV2 Q21' },
    { l: 'ls', q: 'Circuit LS centre fermé, moteur tournant, aucun distributeur actionné : quelle pression règne en sortie de pompe ?', c: ['La pression de veille = tarage du tiroir LS de la pompe', 'La pression maxi du limiteur principal', '0 bar', 'La pression d’annulation de débit'], e: 'Au neutre, aucun signal LS : le tiroir LS maintient seulement sa pression de veille (sa « marge », par ex. 27 b) et la pompe se met en débit minimum.', r: 'Au neutre, P pompe = tarage du tiroir LS.' },
    { l: 'ls', q: 'Réactions brusques et 290 b en butée alors que l’annulation de débit est prévue à 240 b. Cause ?', c: ['Le dispositif d’annulation de débit', 'La balance individuelle', 'Le limiteur secondaire', 'Le réducteur de commande'], e: 'Il devrait couper à 240 b : c’est le limiteur de secours (280 + 10) qui travaille à sa place.', src: 'Corrigé UV2 Q20' },
    { l: 'ls', q: 'LS centre ouvert (balance 20 b) : treuils à 140 b et 120 b en simultané. Pression pompe ?', c: ['160 b', '140 b', '260 b', '146 b'], e: 'LS max = 140 b → pompe = 140 + 20 (balance d’entrée) = 160 b.', src: 'Circuit des treuils TRM 700-100' },
    { l: 'ls', q: 'Dans un circuit LS, les LPSAC sont tarés au-dessus du TAD. C’est…', c: ['Normal et voulu', 'Une anomalie à corriger', 'Un risque de calage', 'Impossible'], e: 'Le TAD fixe la pression de service ; les LPSAC n’agissent que sur les chocs, au-dessus.' },
    { l: 'ls', q: 'Circuit de la lame orientable + ripper : type de circuit ?', c: ['Circuit ouvert, régulation LS à centre fermé, pompe à cylindrée variable 1 sens de flux', 'Circuit fermé, pompe à cylindrée variable 2 sens de flux', 'Circuit ouvert, LS centre ouvert, pompe à cylindrée fixe', 'Circuit fermé, pompe fixe'], e: 'LS centre fermé → pompe à cylindrée variable ; l’huile retourne à la bâche (circuit ouvert).' },
    { l: 'ls', q: 'Rôle du clapet anti-dérive sur le distributeur de levage ?', c: ['Éviter l’effondrement de la charge pendant le déplacement du tiroir (recouvrement négatif)', 'Éviter la cavitation', 'Définir la pression de commande', 'Réalimenter le vérin'], e: 'Avec un recouvrement négatif, tous les orifices communiquent un instant : la charge pourrait chuter.' },
    { l: 'ls', q: 'Rôle du réducteur de pression 3 voies proportionnel du manipulateur ?', c: ['Transformer la pression de commande en pression de pilotage, proportionnelle à la demande de l’opérateur', 'Transformer la pression de service en pression de commande', 'Définir la pression maxi du circuit', 'Protéger des chocs'], e: 'Le réducteur 2 voies (25 b) crée la pression de commande ; le 3 voies proportionnel dose le pilotage des distributeurs.' },
    { l: 'ls', q: 'Rôle du réducteur de pression 2 voies du circuit de commande ?', c: ['Transformer la pression de service en pression de commande (25 b)', 'Définir la pression maxi de commande (30 b)', 'Piloter les distributeurs', 'Maintenir un ΔP constant'], e: 'Le limiteur de commande (30 b) fixe le maxi ; le réducteur 2 voies abaisse la pression de service à 25 b.' },
    { l: 'ls', q: 'Rôle de l’accumulateur du circuit de commande ?', c: ['Permettre de reposer les équipements en cas de panne', 'Augmenter la vitesse des vérins', 'Refroidir l’huile', 'Remplacer la pompe en fonctionnement normal'], e: 'Accumulateur chargé à l’azote : réserve d’énergie de secours. Un clapet anti-retour taré évite qu’il se décharge sans génération.' },
    { l: 'ls', q: 'Rôle du clapet anti-retour taré placé avant l’accumulateur ?', c: ['Éviter la décharge de l’accumulateur en l’absence de génération', 'Limiter la pression de commande', 'Éviter la cavitation des vérins', 'Sélectionner la plus forte pression LS'], e: 'Moteur arrêté, l’accumulateur garde sa pression pour pouvoir reposer les équipements.' },
    { l: 'ls', q: 'Rôle du distributeur de dépannage 2/2 ?', c: ['Permettre un retour à la bâche maîtrisé pour dépanner l’engin', 'Donner la priorité à la direction', 'Annuler le débit en butée', 'Remplacer la BIP'], e: 'Distributeur 2/2 progressif, centre ouvert à suivre, avec un étranglement sur le retour à la bâche.' },
    { l: 'ls', q: 'Rôle d’un LPSAC avec clapet de réalimentation ?', c: ['Protéger des surpressions en cas de choc et réalimenter le récepteur pour éviter la cavitation', 'Définir la pression de service', 'Maintenir un ΔP constant', 'Piloter le tiroir LS'], e: 'Il est taré au-dessus du TAD (280 / 340 b > 252 b) : il n’agit que sur les chocs.' },
    { l: 'ls', q: 'Rôle des sélecteurs de circuit LS ?', c: ['Sélectionner la pression LS la plus forte pour piloter le tiroir LS de la pompe', 'Choisir le récepteur prioritaire', 'Isoler la commande du service', 'Réalimenter les vérins'], e: 'La pompe se règle sur le récepteur le plus chargé : P pompe = P LS maxi + marge du tiroir LS.' },
    { l: 'ls', q: 'Ripper à 150 b et orientation à 80 b en même temps ; marge du tiroir LS 17 b. Pression pompe ?', c: ['167 b', '97 b', '230 b', '150 b'], e: 'LS maxi = 150 b (le plus chargé) → pompe = 150 + 17 = 167 b.' },
    { l: 'ls', q: 'Pompe à 167 b débitant 21 L/min. Puissance hydraulique ?', c: ['≈ 5,85 kW', '≈ 58,5 kW', '≈ 3,5 kW', '≈ 0,58 kW'], e: 'Pu = P × Q / 600 = 167 × 21 / 600 ≈ 5,85 kW.' },
    { l: 'ls', q: 'En butée, le moteur thermique cale sur le ripper, l’inclinaison et le levage en montée, mais ne fait que baisser de régime sur l’orientation et la descente (équipées de LPSAC). Cause ?', c: ['Le tiroir d’annulation de débit (TAD) sur-taré ou grippé', 'Le réducteur 2 voies bloqué ouvert', 'La BIP de l’orientation', 'L’accumulateur vide'], e: 'Tous les récepteurs → appareil commun ; trop de puissance. Les LPSAC limitent la pression sur certains récepteurs, pas sur les autres. Le TAD aurait dû réduire le débit en butée.' },
    { l: 'ls', q: 'La descente fonctionne (gravité) mais rien ne remonte ni ne force ; pression de commande 30 b au neutre comme en fonctionnement, au lieu de 25 b. Cause ?', c: ['Le réducteur de pression 2 voies bloqué ouvert', 'Le limiteur de commande détaré', 'Le TAD grippé', 'Le tiroir LS bloqué'], e: 'Les distributeurs sont pilotés (la descente marche). La pression de service communique avec la commande et se retrouve limitée à 30 b par le limiteur de commande.' },
    { l: 'ls', q: 'L’orientation seule marche bien, mais elle accélère quand on actionne aussi le ripper (plus chargé). Cause ?', c: ['La BIP du distributeur d’orientation bloquée ouverte', 'Le TAD sur-taré', 'Le réducteur 2 voies', 'Le LPSAC de l’orientation'], e: 'ΔP aux bornes du distributeur d’orientation = 167 − 80 = 87 b au lieu de 6 b → plus de débit (Q = K × S × √ΔP) → le vérin accélère.' },
    { l: 'ls', q: 'Pourquoi un vérin accélère-t-il si le ΔP à ses bornes augmente ?', c: ['Parce que Q = K × S × √ΔP : le débit augmente avec le ΔP', 'Parce que la pression baisse', 'Parce que la pompe change de sens', 'Parce que le LPSAC s’ouvre'], e: 'À section d’ouverture constante, le débit augmente avec la racine du ΔP : la BIP garde ΔP constant pour garder la vitesse constante.' },
    { l: 'hydrostatique', q: 'Dans une boucle de puissance, le moteur hydraulique est protégé par…', c: ['Une soupape haute pression', 'Le limiteur de gavage', 'Le limiteur de balayage', 'Un réducteur 2 voies'], e: 'Les soupapes HP protègent la boucle et le moteur des chocs.', src: 'Test final Q32 (officiel)' },
    { l: 'hydrostatique', q: 'Quel appareil maintient la pression de gavage ?', c: ['Un limiteur de pression', 'Un réducteur de pression', 'Un clapet anti-retour', 'Une soupape de séquence'], e: 'Le limiteur de gavage fixe la pression basse de la boucle (ex. 30 b au neutre).', src: 'Test final Q36 (officiel)' },
    { l: 'hydrostatique', q: 'Pourquoi le limiteur de balayage (27 b) est-il taré plus bas que le gavage (30 b) ?', c: ['Pour que l’huile de la boucle soit renouvelée et refroidie', 'Pour protéger le moteur des chocs', 'Pour augmenter la vitesse', 'Pour éviter le calage'], e: 'L’huile chaude part par le balayage et le gavage la remplace ; si le balayage était plus haut, rien ne circulerait.', src: 'Corrigé UV2' },
    { l: 'hydrostatique', q: 'Rôle de la valve automotive (DA) ?', c: ['Adapter l’avancement au régime du moteur thermique', 'Protéger la boucle des chocs', 'Refroidir l’huile BP', 'Remorquer l’engin'], e: 'Elle gère la progressivité de l’engin selon le régime moteur. L’inching permet de ralentir l’engin au régime nominal.', src: 'Corrigé UV2 Q29' },
    { l: 'hydrostatique', q: 'Pression de service maxi HP (annulation 320 b, soupapes HP 360 b) ?', c: ['320 b', '360 b', '30 b', '27 b'], e: 'C’est l’annulation de débit qui fixe la pression maxi de service ; 360 b = sécurité.', src: 'Corrigé UV2 Q27' },
    { l: 'hydrostatique', q: 'Moteur hydraulique à régulation de puissance : comment réagit-il à une hausse de charge ?', c: ['Il augmente sa cylindrée (couple ↑, vitesse ↓)', 'Il diminue sa cylindrée', 'Il ouvre sa soupape HP', 'Il s’arrête'], e: 'Il adapte sa cylindrée à la charge pour conserver une puissance constante (P = C × ω).', src: 'Corrigé UV2 Q30' },
    { l: 'hydrostatique', q: 'Transmission : 5 b partout, véhicule immobile. Diagnostic ?', c: ['Limiteur de gavage déréglé à 5 b', 'Soupape HP déréglée', 'Rétroaction mécanique cassée', 'Annulation de débit grippée'], e: 'Sans pression de gavage, la servocommande n’est pas alimentée : la pompe reste à cylindrée nulle.' },
    { l: 'hydrostatique', q: 'Transmission : vitesse maxi immédiate dès qu’on touche la commande. Cause ?', c: ['Rétroaction mécanique cassée', 'Limiteur de gavage déréglé', 'Soupape d’annulation grippée', 'Valve d’échange bloquée'], e: 'La rétroaction assure la progressivité de la servocommande ; cassée, la pompe part en cylindrée maxi.' },
    { l: 'hydrostatique', q: 'Roues bloquées en marche avant : quel appareil ramène la cylindrée à zéro ?', c: ['La soupape d’annulation de débit', 'Les soupapes HP', 'Le limiteur de gavage', 'La valve d’échange'], e: 'L’annulation de débit (tarée sous les soupapes HP) annule le débit pour que le moteur thermique ne cale pas.' },
    { l: 'hydrostatique', q: 'Qu’est-ce qui caractérise une transmission hydrostatique en circuit fermé ?', c: ['L’huile refoulée par la pompe revient directement à la pompe par la boucle de puissance, sans repasser par la bâche', 'L’huile retourne à la bâche après chaque passage dans le moteur', 'La pompe ne tourne que dans un sens', 'Il n’y a pas de pompe de gavage'], e: 'Boucle de puissance pompe ↔ moteur : le gavage compense les fuites et l’échange renouvelle l’huile.' },
    { l: 'hydrostatique', q: 'Pompe principale d’une transmission en circuit fermé :', c: ['Cylindrée variable, 2 sens de flux, drainage externe', 'Cylindrée fixe, 1 sens de flux', 'Cylindrée fixe, 2 sens de flux, sans drainage', 'Cylindrée variable, 1 sens de flux, sans drainage'], e: 'Sa cylindrée variable règle la vitesse ; les 2 sens de flux donnent la marche AV et AR. La pompe de gavage, elle, est à cylindrée fixe, 1 sens de flux.' },
    { l: 'hydrostatique', q: 'Lequel n’est PAS un rôle de la pompe de gavage ?', c: ['Définir la pression maxi de la boucle HP', 'Compenser les fuites', 'Plaquer les pistons', 'Alimenter la servocommande'], e: 'Gavage : compenser les fuites, lubrifier, plaquer les pistons, alimenter la servocommande, régénérer l’huile. La pression maxi est fixée par l’annulation de débit.' },
    { l: 'hydrostatique', q: 'Rôle des clapets anti-retour du circuit de gavage ?', c: ['Interdire à la HP de passer dans la BP, et laisser le gavage réalimenter la BP', 'Protéger la boucle des chocs', 'Renvoyer l’huile chaude à la bâche', 'Piloter la soupape d’annulation de débit'], e: 'Ils isolent la HP de la BP : le gavage ne peut alimenter que la boucle en basse pression.' },
    { l: 'hydrostatique', q: 'Rôle du limiteur de pression de gavage ?', c: ['Définir la pression maxi du circuit de gavage au neutre', 'Maintenir la BP en fonctionnement', 'Protéger le moteur des chocs', 'Annuler le débit en butée'], e: 'Au neutre, la BP vaut le tarage du limiteur de gavage (20 b). En fonctionnement, c’est le limiteur d’échange (18 b) qui tient la BP.' },
    { l: 'hydrostatique', q: 'Rôle du limiteur d’échange ?', c: ['Limiter et maintenir la basse pression en fonctionnement', 'Définir la pression de gavage au neutre', 'Définir la pression maxi de service', 'Commander la cylindrée de la pompe'], e: 'Le tiroir d’échange envoie la BP vers ce limiteur, taré plus bas que le gavage (18 b < 20 b) pour que l’huile chaude soit évacuée.' },
    { l: 'hydrostatique', q: 'Qui pilote le tiroir d’échange, et vers où envoie-t-il l’huile ?', c: ['Il est piloté par la HP et ouvre la BP vers le limiteur d’échange', 'Il est piloté par la BP et ouvre la HP vers la bâche', 'Il est commandé par le conducteur', 'Il est piloté par le gavage et ouvre vers le moteur'], e: 'Distributeur 3/3 centre fermé, commande hydraulique, rappel par ressort : il participe à la régénération de l’huile en fonctionnement.' },
    { l: 'hydrostatique', q: 'Rôle du sélecteur de circuit dans la transmission ?', c: ['Choisir la boucle où la pression est la plus forte pour piloter la soupape d’annulation de débit', 'Choisir le sens de marche', 'Renvoyer les fuites à la bâche', 'Alimenter la servocommande'], e: 'Quel que soit le sens de marche, l’annulation de débit reçoit la plus forte des deux pressions.' },
    { l: 'hydrostatique', q: 'Rôle des soupapes HP de la boucle ?', c: ['Protéger le circuit en cas de choc (blocage des roues) en évacuant les surpressions', 'Définir la pression de service', 'Maintenir la BP', 'Commander la cylindrée'], e: 'Tarées au-dessus de l’annulation de débit (320 b > 280 b), elles n’interviennent que sur les pointes de pression.' },
    { l: 'hydrostatique', q: 'Rôle du servopiston ?', c: ['Commander la cylindrée de la pompe principale', 'Faire tourner les roues', 'Limiter la BP', 'Isoler la HP de la BP'], e: 'Le servodistributeur (4/3 progressif, commande mécanique) oriente le flux de gavage vers le servopiston, qui incline la pompe.' },
    { l: 'hydrostatique', q: 'Le filtre à huile du gavage est colmaté. Que se passe-t-il ?', c: ['L’huile passe par le by-pass (elle n’est plus filtrée)', 'Le véhicule s’arrête immédiatement', 'La HP monte à 320 b', 'Le limiteur d’échange s’ouvre'], e: 'Le by-pass évite de priver le gavage d’huile ; il faut changer le filtre.' },
    { l: 'hydrostatique', q: 'Pompe de gavage 10 cm³/tr, moteur thermique à 2 800 tr/min. Débit de gavage ?', c: ['28 L/min', '280 L/min', '2,8 L/min', '70 L/min'], e: 'Q = V × N / 1 000 = 10 × 2 800 / 1 000 = 28 L/min.' },
    { l: 'hydrostatique', q: 'Gavage 28 L/min, fuites pompe 2 L/min et moteur 2 L/min. Débit évacué par le limiteur d’échange en marche ?', c: ['24 L/min', '28 L/min', '32 L/min', '4 L/min'], e: 'Le gavage remplace les fuites (4 L/min) ; le reste, 28 − 4 = 24 L/min, part par le limiteur d’échange.' },
    { l: 'hydrostatique', q: 'Méthode de diagnostic : le défaut apparaît dans les DEUX sens de marche. Où chercher ?', c: ['Un appareil commun aux deux boucles', 'Un appareil propre à une seule boucle', 'Uniquement le moteur hydraulique', 'Uniquement la soupape HP marche avant'], e: 'Deux sens → appareil commun (gavage, échange, annulation de débit, servocommande…) ; un seul sens → appareil propre à la boucle (soupape HP de ce sens).' },
    { l: 'hydrostatique', q: 'Marche avant : la HP plafonne à 50 b ; marche arrière : elle monte bien à 280 b. Neutre normal. Cause ?', c: ['La soupape HP de la boucle marche avant, détarée à 50 b', 'La soupape d’annulation de débit', 'Le limiteur de gavage', 'Le sélecteur de circuit'], e: 'En arrière tout est bon (pompe, sélecteur, annulation). En avant, un seul sens manque de force : seul appareil propre à cette boucle qui limite la pression = sa soupape HP.' },
    { l: 'hydrostatique', q: 'Le moteur thermique cale quand le pilote pousse pour charger ; la HP atteint 320 b dans les deux sens. Cause ?', c: ['La soupape d’annulation de débit grippée ou sur-tarée', 'Une soupape HP détarée', 'Le limiteur d’échange détaré', 'La rétroaction mécanique cassée'], e: 'À 320 b avec la pompe qui débite toujours : 320 × 70 / 600 = 37,3 kW, trop pour le moteur. L’annulation (280 b) aurait dû couper le débit et neutraliser la puissance de coin.' },
    { l: 'hydrostatique', q: 'Pompe 70 L/min qui débite sous 320 b. Puissance absorbée ?', c: ['≈ 37,3 kW', '≈ 22,4 kW', '≈ 3,7 kW', '≈ 373 kW'], e: 'Pu = P × Q / 600 = 320 × 70 / 600 ≈ 37,3 kW.' },
    { l: 'hydrostatique', q: 'Le véhicule part puis s’arrête aussitôt ; en marche, la BP chute de 20 b à 4 b puis remonte, en oscillant. Cause ?', c: ['Le limiteur d’échange détaré à 4 b', 'Le limiteur de gavage détaré', 'La soupape HP marche avant', 'La soupape d’annulation de débit'], e: 'En marche, le limiteur d’échange tient la BP (18 b attendus). À 4 b, les pistons ne sont plus plaqués et la pompe cavite : arrêt, la pression remonte à 20 b (gavage), et le cycle recommence.' },
    { l: 'hydrostatique', q: 'Pourquoi, en marche, la BP vaut 18 b alors qu’au neutre elle vaut 20 b ?', c: ['En marche, le tiroir d’échange ouvre la BP vers le limiteur d’échange taré à 18 b', 'La pompe de gavage ralentit en marche', 'Les soupapes HP s’ouvrent', 'Le filtre se colmate'], e: 'Au neutre, seul le limiteur de gavage (20 b) agit ; en marche, le limiteur d’échange, taré plus bas, prend le relais pour renouveler l’huile.' },
    { l: 'diagnostic', q: 'Tous les récepteurs manquent de force. Appareil probable ?', c: ['Le LPP détaré', 'Un LPS détaré', 'Une soupape de freinage', 'Un clapet anti-retour'], e: 'Tous touchés → appareil commun. Force = pression → LPP.', r: 'Méthode : combien ? quel sens ? quelle grandeur ?' },
    { l: 'diagnostic', q: 'Un seul récepteur manque de force dans UN sens. Appareil probable ?', c: ['Le LPS de cette ligne (détaré ou bloqué ouvert)', 'Le LPP', 'La pompe', 'Le tiroir LS'], e: 'Un seul récepteur, un seul sens → appareil sur une ligne ; force → pression → LPS.' },
    { l: 'diagnostic', q: 'Vérins de verrouillage : ils sortent mais ne rentrent plus. Appareil en cause ?', c: ['Le limiteur secondaire', 'La balance individuelle', 'Le tiroir LS', 'Le dispositif d’annulation de débit'], e: '2 vérins d’une même fonction, 1 seul sens → appareil sur une ligne.', src: 'Corrigé UV2 Q19' },
    { l: 'diagnostic', q: 'Symptôme « le moteur thermique cale ou perd du régime » : quelle grandeur est en cause ?', c: ['La puissance (pression et débit ensemble)', 'Le débit seul', 'La pression seule', 'La viscosité'], e: 'Vitesse = débit ; force = pression ; calage = puissance (trop de P et de Q en même temps).' },
    { l: 'diagnostic', q: 'Clapet principal + étage pilote + gicleur : quel symbole détaillé ?', c: ['Limiteur de pression à commande pilotée', 'Réducteur de pression 3 voies', 'Soupape de freinage', 'Conjoncteur-disjoncteur'], e: 'Le limiteur piloté est plus précis et plus souple, adapté aux gros débits.', src: 'Sujet pelle / tarière Q6' }
  ]
});
