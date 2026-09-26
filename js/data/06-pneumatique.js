REV.add({
  id: 'pneu', name: 'Équipement pneumatique', icon: '💨', color: '#0891b2',
  desc: 'Freinage à air comprimé tracteur / remorque : normes, repères, valves, essais.',
  lessons: [
    {
      id: 'normes', title: 'Directive et normes européennes',
      html: `
<ul><li><b>Objectifs de la directive</b> : harmoniser les réglementations, améliorer la sécurité du freinage, uniformiser dispositifs et attelages, faciliter les homologations, introduire des notions de performance (temps de réponse).</li>
<li><b>Remplissage de toutes les bouteilles</b> : entre <b>6 et 11 minutes</b>. <b>Temps de réponse</b> : ≤ <b>0,6 s</b>.</li>
<li><b>Frein de stationnement</b>, moyens purement mécaniques : véhicule seul en charge sur <b>18 %</b> ; ensemble routier en charge sur <b>12 %</b> (seul le tracteur freiné).</li></ul>`,
      retenir: ['Remplissage : 6 à 11 min.', 'Temps de réponse : 0,6 s.', 'Stationnement : 18 % seul, 12 % en ensemble.'],
      pieges: ['Ne pas confondre temps de remplissage (6–11 min) et temps de réponse (0,6 s), ni 18 % (seul) et 12 % (ensemble).', 'Un corrigé Word disait 6 à 10 min : retiens le cours, 6 à 11 min.'],
      memo: { cle: '6–11 MIN · 0,6 S · 18 % / 12 %', points: ['Remplir les bouteilles : 6 à 11 min', 'Réagir : 0,6 s', 'Tenir seul : 18 % ; en ensemble : 12 %'], astuce: '« Six-onze pour remplir, zéro-six pour répondre. »' }
    },
    {
      id: 'schema', title: 'Lire un schéma : repères',
      html: `
<div class="tw"><table><tr><th>Repère</th><th>Fonction</th></tr>
<tr><td>0</td><td>Aspiration</td></tr>
<tr><td>1</td><td>Alimentation (entrée) ; plusieurs : 11, 12</td></tr>
<tr><td>2</td><td>Utilisation (sortie) ; plusieurs : 21, 22</td></tr>
<tr><td>3</td><td>Mise à la pression atmosphérique (échappement)</td></tr>
<tr><td>4</td><td>Commande (pilotage) ; plusieurs : 41, 42, 44</td></tr>
<tr><td>43</td><td>Pilotage par absence d’air (pilotage négatif)</td></tr>
<tr><td>7</td><td>Antigel</td></tr>
<tr><td>81/82 · 91/92</td><td>Huile arrivée/retour · eau arrivée/retour</td></tr></table></div>
<p><b>Code couleur</b> : une couleur par circuit — frein de service avant, frein de service arrière, frein de stationnement, frein de remorque, alimentation / servitudes. Dans chaque couleur : trait plein = pression constante, tirets = pression délivrée, alterné avec du jaune = pression de pilotage.</p>
<h3>Symboles du test final</h3>
<ul><li>Croix, orifices 1-2-3 et pilotage 4 → <b>valve de réduction pilotée</b> (Q29).</li>
<li>Croix, entrées 11-12, sortie 2, échappement 3, pilotages 41-42-43 → <b>VCR avec rupture</b> (triple pilotage) (Q30).</li></ul>`,
      images: [{ src: 'symbole-valve-reduction.png', cap: 'Q29 : valve de réduction pilotée (1-2-3 + pilotage 4)' }, { src: 'symbole-vcr-rupture.png', cap: 'Q30 : valve de commande de remorque avec rupture (11-12, 2, 3, 41-42-43)' }],
      retenir: ['1 = entrée · 2 = sortie · 3 = échappement · 4 = pilotage.', '43 = pilotage par absence d’air.', '7 = antigel.'],
      pieges: ['Repère 3 = échappement à l’atmosphère, pas 7 (antigel).'],
      memo: { cle: '1 ENTRE · 2 SORT · 3 ÉCHAPPE · 4 PILOTE', points: ['11/12 = plusieurs entrées', '41/42 = plusieurs pilotages', '43 = pilotage négatif', '7 = antigel'], astuce: 'Suis l’air : il entre (1), il sort (2), il s’échappe (3), on le commande (4).' }
    },
    {
      id: 'production', title: 'Production et stockage de l’air',
      html: `
<p>Compresseur → régulateur (conjoncteur-disjoncteur) → dessiccateur → valve de protection (4 circuits) → réservoirs.</p>
<ul><li><b>Valve de protection</b> : alimente les circuits dans un ordre précis, isole les circuits valides les uns des autres, réalimente en permanence les circuits à la pression de tarage du clapet du circuit défaillant.</li>
<li><b>Dessiccateur</b> (dessiccation – régénération – absorption) : dessèche l’air, supprime la condensation, accroît la sécurité, prolonge la vie des équipements, dispense d’antigel, évite les purges fastidieuses.</li>
<li><b>Clapet anti-retour</b> : l’air ne passe que dans un sens ; <b>conserve la réserve en aval si fuite en amont</b>.</li>
<li><b>Valve de barrage</b> : n’alimente un circuit qu’une fois la pression amont atteinte (priorité de remplissage) ; retour total, partiel ou sans retour.</li></ul>`,
      images: [{ src: 'pneumatique-dsft-theorique.jpg', cap: 'Schéma « DSFT théorique » du dossier UV2 (repères 7 = clapet anti-retour, 13 = valve relais double pilotage inversé, 17 = valve de barrage à retour partiel)' }],
      retenir: ['Valve de protection : isole les circuits valides.', 'Dessiccateur : air sec, plus besoin d’antigel.', 'Clapet anti-retour : garde la pression en aval si fuite en amont.'],
      memo: { cle: 'COMPRESSEUR → RÉGULATEUR → DESSICCATEUR → PROTECTION → RÉSERVOIRS', flow: ['Compresseur', 'Régulateur', 'Dessiccateur', 'Valve de protection 4 circuits', 'Réservoirs'], points: ['Clapet anti-retour = garde la réserve', 'Valve de barrage = priorité de remplissage'], astuce: 'Air sec = pas d’eau = pas de gel = pas d’antigel.' }
    },
    {
      id: 'circuits', title: 'Circuits, Tristop et VNAE',
      html: `
<div class="tw"><table><tr><th>Circuit avant</th><th>Circuit arrière</th><th>Circuit remorque</th></tr>
<tr><td>Robinet de frein de service · valve de desserrage rapide · cylindre simple effet (ou vase à diaphragme)</td><td>Robinet de frein · valve de desserrage rapide · valve relais simple pilotage · correcteur · cylindre à verrou ou Tristop + VNAE</td><td>VCR avec/sans rupture · robinet de frein de remorque · mains d’accouplement · VRU · valve de desserrage · vases · valve de barrage</td></tr></table></div>
<ul><li><b>Cylindre à verrou</b> : 2 entrées (11, 12), 1 pilotage (4).</li>
<li><b>Tristop</b> : vase à diaphragme (service) + ressort (parc/secours) : <b>pression = défreiné, vidange = freiné</b>.</li>
<li><b>VNAE</b> (valve de non-addition des efforts) = valve relais double pilotage : évite d’additionner l’effort du frein de service et celui du ressort sur un Tristop.</li></ul>
<p>Sur un Tristop, c’est un <b>ressort puissant qui serre le frein</b> ; l’air comprimé le comprime pour DÉFREINER. Si l’air disparaît (fuite, réservoir vide), le ressort freine tout seul : c’est une sécurité.</p>
<div class="box methode"><b>✎ Test VNAE (GBC ADR)</b><p>Frein de parc mis → voyant frein de parc allumé. Frein de parc mis + appui sur la pédale → le voyant s’éteint (la VNAE réalimente la chambre à ressort). Sans appuyer sur la pédale, il reste allumé.</p></div>`,
      retenir: ['Tristop : air = défreiné ; plus d’air = freiné par le ressort.', 'VNAE = ne pas additionner service + ressort.'],
      pieges: ['Le ressort freine, l’air défreine (et pas l’inverse).'],
      memo: { cle: 'TRISTOP : AIR = DÉFREINÉ · VIDE = FREINÉ', flow: ['Réservoir vide ou fuite', 'Plus d’air dans la chambre à ressort', 'Le ressort se détend', 'Le véhicule freine tout seul'], points: ['VNAE = valve relais double pilotage', 'Test : parc + pédale → voyant s’éteint'], astuce: 'Pas d’air, pas de route : le ressort gagne toujours.' }
    },
    {
      id: 'remorque', title: 'Commande de la remorque (VCR, VRU)',
      html: `
<ul><li><b>VCR</b> (valve de commande de remorque) : commande la remorque à partir des infos AV et AR, harmonise le freinage tracteur/remorque, diminue le temps de réponse, peut intégrer la rupture. Pilotages 41/42 = service, 43 = parc (négatif).</li>
<li>Symboles : sans rupture = entrée 1 ; avec rupture = entrées 11 et 12 ; sortie 2, échappement 3 ; double pilotage 41-42, triple 41-42-43.</li>
<li><b>Mains d’accouplement</b> : <b>rouge = automatique</b> = pression constante (alimentation) ; <b>jaune = directe</b> = pression délivrée (commande).</li>
<li><b>VRU</b> (valve relais d’urgence, sur la remorque) : commande le freinage à partir de la main jaune, <b>freine automatiquement si la main rouge est rompue</b>, diminue le temps de réponse.</li>
<li><b>Robinet de frein de remorque / d’alignement</b> : freine la remorque seule, proportionnellement au levier.</li></ul>
<h3>Fonction rupture de la VCR</h3>
<p>Conditions : le conducteur freine ET il y a une fuite sur le circuit direct (main jaune). Un piston coupe 95 % du passage de l’air d’alimentation, met en communication automatique et direct → la pression chute dans l’automatique → la VRU déclenche le freinage d’urgence de la remorque.</p>
<div class="box methode"><b>✎ Test VCR (rupture)</b><p>Manomètre sur la main <b>AUTOMATIQUE</b> (rouge), le conducteur appuie sur la pédale, on crée une fuite sur la main <b>DIRECTE</b> (jaune) → le manomètre doit tomber à 0 bar. <b>Test VRU</b> : débrancher la main automatique → la remorque freine seule.</p></div>
<div class="box retenir"><b>★ Air en permanence à la main directe</b><p>Causes possibles : frein d’alignement enclenché, frein de parc serré (pilotage 43 vidé), défaut du pilotage 43, VCR grippée. <b>Jamais le correcteur de freinage</b> (il n’agit que sur le porteur).</p></div>`,
      retenir: ['Rouge = automatique = alimentation ; jaune = directe = commande.', 'Test rupture : mano sur l’automatique, fuite sur la directe.', 'VRU : freine la remorque si la main rouge casse.'],
      pieges: ['Manomètre sur l’automatique, fuite sur la directe — jamais l’inverse.', '« Aucun contrôle car pas de rupture » est aussi une mauvaise réponse.', 'Le correcteur ne cause jamais d’air permanent à la main directe.'],
      memo: { cle: 'ROUGE = AUTOMATIQUE · JAUNE = DIRECTE', flow: ['Conducteur freine', 'Fuite sur la main jaune (directe)', 'VCR coupe 95 % de l’alimentation', 'Pression chute sur la rouge (automatique)', 'VRU freine la remorque'], points: ['43 = pilotage frein de parc (négatif)', 'Débrancher la rouge → la remorque freine seule'], astuce: 'Rouge comme « alarme » : si elle casse, la remorque s’arrête.' }
    },
    {
      id: 'cas', title: 'Cas pratiques (PPLOG, GBC 180)',
      html: `
<div class="tw"><table><tr><th>Situation</th><th>Réponse</th><th>Pourquoi</th></tr>
<tr><td>Ensemble routier qui louvoie au freinage</td><td>Contrôler la prédominance de la VCR</td><td>La remorque doit freiner légèrement avant le tracteur pour rester tendue</td></tr>
<tr><td>Remorque non alignée avec ce PPLOG, alignée avec un autre tracteur</td><td>Pas de prédominance sur la VCR</td><td>Manomètres sur le direct et sur le circuit AR : il faut 0,5 bar de plus sur le direct</td></tr>
<tr><td>Frein de parc qui s’enclenche tout seul en essai dynamique</td><td>L’élément L : la valve de retenue libère l’air de la chambre de parc</td><td></td></tr>
<tr><td>GBC 180 : quand contrôler le circuit pneumatique ?</td><td>En cas de panne ou lors d’une visite périodique</td><td></td></tr>
<tr><td>GBC 180 : contrôle de la valve de secours</td><td>Créer une fuite franche sur le circuit AR : au freinage de service, le cylindre de frein de parc doit freiner les roues AR</td><td></td></tr>
<tr><td>Voyant de pression allumé, 8,6 bar au manomètre</td><td>Piste : manocontact ou son câblage</td><td>La pression est normale</td></tr></table></div>
<p>Défreinage noté dans ta fiche : <b>0,6 s sur GBC 180</b>, <b>0,3 s sur PPLOG</b>. Pilotage des valves : par présence d’air ou par absence d’air.</p>`,
      retenir: ['Louvoiement = prédominance de la VCR.', 'La remorque doit freiner un peu AVANT le tracteur (≈ 0,5 bar de plus sur le direct).'],
      memo: { cle: 'LA REMORQUE FREINE EN PREMIER', points: ['Louvoie → prédominance VCR', '+0,5 bar sur le direct', 'Valve de secours : fuite franche AR → le parc freine'], astuce: 'Une remorque tendue ne pousse pas le tracteur.' }
    }
  ],
  questions: [
    { l: 'normes', q: 'Temps de remplissage de toutes les bouteilles selon ton cours ?', c: ['6 à 11 minutes', '0,6 seconde', '1 à 3 minutes', '15 à 20 minutes'], e: 'Directive européenne : remplissage entre 6 et 11 min.', w: 'Un corrigé Word disait 6 à 10 min : le QCM propose « 6 à 11 min », valeur du cours.', src: 'UV2 Q16' },
    { l: 'normes', q: 'Temps de réponse maximal du freinage pneumatique ?', c: ['0,6 s', '6 s', '11 s', '1,6 s'], e: 'Temps de réponse ≤ 0,6 s ; ne pas confondre avec le temps de remplissage.' },
    { l: 'normes', q: 'Un ensemble routier en charge doit tenir au frein de stationnement (tracteur seul freiné) sur une pente de :', c: ['12 %', '18 %', '6 %', '25 %'], e: 'Véhicule seul : 18 % ; ensemble routier : 12 %.' },
    { l: 'schema', q: 'Sur un appareil pneumatique, que désigne l’orifice 3 ?', c: ['La mise à l’atmosphère (échappement)', 'L’alimentation', 'Le pilotage', 'L’antigel'], e: '1 = entrée, 2 = sortie, 3 = échappement, 4 = pilotage, 7 = antigel.' },
    { l: 'schema', q: 'Que signifie un pilotage repéré 43 ?', c: ['Un pilotage par absence d’air (négatif)', 'Une troisième alimentation', 'Un orifice d’antigel', 'Une sortie vers la remorque'], e: 'La valve agit quand l’air disparaît : typiquement le pilotage du frein de parc sur la VCR.' },
    { l: 'schema', q: 'Symbole : croix, orifices 1-2-3 et un pilotage 4. De quoi s’agit-il ?', img: 'symbole-valve-reduction.png', c: ['Une valve de réduction pilotée', 'Une VCR avec rupture', 'Un clapet anti-retour', 'Une valve de protection 4 circuits'], e: 'Réponse officielle du test final.', src: 'Test final Q29 (officiel)' },
    { l: 'schema', q: 'Symbole : croix, entrées 11-12, sortie 2, échappement 3, pilotages 41-42-43. De quoi s’agit-il ?', img: 'symbole-vcr-rupture.png', c: ['Une valve de commande de remorque avec rupture (triple pilotage)', 'Une VCR sans rupture', 'Une valve relais d’urgence', 'Une VNAE'], e: 'Deux entrées 11/12 = avec rupture ; 41-42-43 = triple pilotage.', src: 'Test final Q30 (officiel)' },
    { l: 'production', q: 'Circuit de freinage pneumatique : rôle d’un clapet anti-retour placé avant un réservoir ?', c: ['Garder la pression en aval s’il y a une fuite en amont', 'Échapper l’air à l’atmosphère', 'Donner la priorité de remplissage', 'Assécher l’air'], e: 'L’air ne passe que dans un sens : la réserve en aval est conservée si une fuite apparaît en amont.' },
    { l: 'production', q: 'Quelle valve n’alimente un circuit secondaire qu’une fois une pression de seuil atteinte en amont ?', c: ['Une valve de barrage', 'Un clapet anti-retour', 'Une valve de desserrage rapide', 'Une VRU'], e: 'La valve de barrage donne une priorité de remplissage ; selon le modèle, le retour est total, partiel ou nul.' },
    { l: 'production', q: 'Lequel n’est PAS un avantage du dessiccateur ?', c: ['Augmenter la pression de régulation', 'Supprimer la condensation', 'Dispenser d’antigel', 'Éviter les purges fastidieuses'], e: 'Le dessiccateur sèche l’air ; il ne change pas la pression.' },
    { l: 'production', q: 'La valve de protection 4 circuits…', c: ['Isole les circuits valides les uns des autres', 'Assèche l’air', 'Commande la remorque', 'Limite la pression à 0,6 bar'], e: 'Elle remplit les circuits dans un ordre précis et isole un circuit défaillant.' },
    { l: 'circuits', q: 'Sur un cylindre Tristop, que provoque une vidange de la chambre à ressort ?', c: ['Le freinage (le ressort serre)', 'Le défreinage', 'Rien', 'Le blocage de la pédale'], e: 'Pression = défreiné ; vidange = freiné par le ressort. C’est une sécurité en cas de fuite.' },
    { l: 'circuits', q: 'Rôle de la VNAE ?', c: ['Éviter d’additionner l’effort du frein de service et celui du ressort', 'Commander la remorque', 'Assécher l’air', 'Donner la priorité de remplissage'], e: 'Valve de non-addition des efforts = valve relais double pilotage.' },
    { l: 'circuits', q: 'Quelle valve commande le frein de parc des cylindres Tristop, en vidant la chambre à ressort quand on serre le frein de parc ?', c: ['Une valve relais à double pilotage inversé', 'Une valve de barrage', 'Un clapet anti-retour', 'Un robinet de frein de remorque'], e: 'Pilotage inversé : quand l’ordre de pilotage disparaît (frein de parc serré), la valve vide la chambre à ressort → le ressort freine.' },
    { l: 'remorque', q: 'Comment contrôler la fonction rupture de la VCR ?', c: ['Manomètre sur la main automatique, fuite sur la main directe, en freinant', 'Manomètre sur la main directe, fuite sur l’automatique', 'Débrancher la main automatique', 'Aucun contrôle possible'], e: 'La pression de l’automatique (rouge) doit tomber à 0 bar quand on freine avec une fuite sur la directe (jaune).', w: 'Jamais l’inverse ; et « aucun contrôle » est faux.', src: 'UV2 Q18' },
    { l: 'remorque', q: 'Couleur et rôle de la main d’accouplement AUTOMATIQUE ?', c: ['Rouge : alimentation, pression constante', 'Jaune : commande, pression délivrée', 'Rouge : commande', 'Jaune : alimentation'], e: 'Rouge = automatique = alimentation ; jaune = directe = commande.' },
    { l: 'remorque', q: 'Comment tester la VRU de la remorque ?', c: ['Débrancher la main automatique : la remorque doit freiner seule', 'Débrancher la main directe', 'Mettre le frein de parc', 'Actionner le robinet d’alignement'], e: 'La VRU freine automatiquement la remorque si la main rouge est rompue.' },
    { l: 'remorque', q: 'Air en permanence à la main directe : quelle affirmation est FAUSSE ?', c: ['Mauvais réglage du correcteur de freinage', 'Frein d’alignement enclenché', 'Frein de parc serré (pilotage 43 vidé)', 'VCR grippée'], e: 'Le correcteur n’agit que sur le porteur : il ne peut pas envoyer d’air à la main directe.', src: 'UV2 Q17' },
    { l: 'remorque', q: 'Conditions de déclenchement de la fonction rupture de la VCR ?', c: ['Le conducteur freine ET il y a une fuite sur la main directe', 'Le frein de parc est serré', 'La main automatique est débranchée', 'La pression dépasse 10 bar'], e: 'Un piston coupe alors 95 % de l’alimentation → la pression chute dans l’automatique → la VRU freine la remorque.' },
    { l: 'cas', q: 'Ensemble routier qui louvoie au freinage. Que contrôler ?', c: ['La prédominance de la VCR', 'Le dessiccateur', 'La valve de protection', 'Le compresseur'], e: 'La remorque doit freiner légèrement avant le tracteur pour rester tendue.', src: 'Cas PPLOG' },
    { l: 'cas', q: 'Prédominance correcte : quel écart entre circuit direct et circuit AR du tracteur ?', c: ['≈ 0,5 bar de plus sur le direct', '≈ 0,5 bar de plus sur le circuit AR', 'Aucun écart', '≈ 5 bar de plus sur le direct'], e: 'La remorque reçoit un peu plus de pression que l’arrière du tracteur.' },
    { l: 'cas', q: 'GBC 180 : comment contrôler la valve de secours ?', c: ['Créer une fuite franche sur le circuit AR : au freinage de service, le cylindre de parc doit freiner les roues AR', 'Débrancher la main rouge', 'Vider tous les réservoirs', 'Mesurer la pression au compresseur'], e: 'En cas de perte du circuit AR, c’est le ressort (frein de parc) qui prend le relais au freinage.', src: 'Cas GBC 180' }
  ]
});
