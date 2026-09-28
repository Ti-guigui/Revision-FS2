/* Dépollution : essence ou diesel ? (Motorisation Tome 1, chapitre 12 « La pollution automobile »).
   Objectif : ne pas confondre les dispositifs du moteur essence et ceux du moteur diesel. */
(function () {
  var SRC = 'Motorisation Tome 1, ch. 12 La pollution automobile';

  REV.extendLesson('moteur/depollution', {
    html: `
<h3>Essence ou diesel : ne pas confondre</h3>
<div class="tw"><table class="cmp"><tr><th></th><th>⛽ ESSENCE</th><th>🛢️ DIESEL</th></tr>
<tr><td>Mélange</td><td>Richesse <b>1</b> (λ entre <b>0,97 et 1,03</b>)</td><td>Toujours <b>pauvre</b> : λ de 0,3 à 1,5 (dosage 1/20 à 1/30)</td></tr>
<tr><td>Polluants surtout</td><td>CO, HC, NOx (selon la richesse)</td><td><b>Particules (suies)</b> : 10 à 20 fois plus qu’un essence ; NOx</td></tr>
<tr><td>Catalyseur</td><td><b>3 voies (trifonctionnel)</b> : oxyde CO et HC, <b>réduit les NOx</b> ; amorçage ≈ 250 °C ; efficace seulement à richesse 1</td><td><b>D’oxydation</b> : CO et HC seulement</td></tr>
<tr><td>Sonde lambda</td><td>Régule la richesse (riche ≈ 0,8 V, pauvre ≈ 0,1 V) et surveille le catalyseur</td><td>Sonde <b>proportionnelle bicellulaire</b> (cellule de Nernst + cellule de pompage)</td></tr>
<tr><td>Particules</td><td>—</td><td><b>FAP</b> : piège puis brûle les suies (≈ 550 °C)</td></tr>
<tr><td>NOx</td><td>EGR</td><td>EGR + <b>SCR (AdBlue)</b> sur les véhicules industriels</td></tr>
<tr><td>Vapeurs de carburant</td><td><b>Canister</b> (charbon actif) + électrovanne de purge</td><td>—</td></tr>
<tr><td>Montée en température du catalyseur</td><td><b>Postcombustion thermique</b> : injection d’air (pulsair) à l’échappement, &gt; 600 °C</td><td><b>Post-injection</b> de gazole (régénération du FAP)</td></tr>
<tr><td>Contrôle technique</td><td>—</td><td><b>Opacité</b> des fumées : 2,5 m⁻¹ (atmo) / 3 m⁻¹ (turbo) de 1980 à 06/2008 ; 1,5 m⁻¹ depuis le 01/07/2008</td></tr></table></div>
<p><b>Commun aux deux</b> : EGR (RGE), coupure d’injection en décélération, surveillance OBD / EOBD.</p>
<h3>Les dispositifs, en détail</h3>
<ul>
<li><b>Catalyseur 3 voies</b> (essence, depuis 1993) : métaux précieux (platine, rhodium, palladium) ; transforme CO, HC, NOx en CO₂, H₂O et N₂. Mélange riche → CO et HC mal traités ; mélange pauvre → NOx mal traités.</li>
<li><b>EGR / RGE</b> (vers 1996, Euro II) : N₂ + O₂ → NOx quand la combustion dépasse <b>2 000 °C</b>. On réintroduit des gaz brûlés à l’admission (jusqu’à 25 %) : moins d’oxygène, combustion moins chaude, moins de NOx. Vanne tout ou rien (dépression) ou progressive (électrovanne en <b>RCO</b>). En diesel : grippage par les particules et l’humidité ; <b>vanne bloquée ouverte = grosse perte de puissance</b>.</li>
<li><b>FAP</b> (diesel) : monolithe en carbure de silicium, canaux bouchés un sur deux ; capteurs de pression en entrée et sortie → le calculateur décide la <b>régénération</b>. Il faut ≈ <b>550 °C</b> (gaz en ville : 150 à 250 °C) ; ne pas dépasser <b>1 000 °C</b> (casse). Stratégies : post-injection seule (la plus répandue), post-injection + additif (cérine / Eolys : régénération à 450 °C), 5ᵉ injecteur. Régénération forcée ≈ 800 °C.</li>
<li><b>SCR / AdBlue</b> (diesel, véhicules industriels, Euro 4 et 5) : réduit les NOx en azote et eau. Catalyseur, réservoir d’AdBlue, injecteur dans le silencieux, pompe, témoins. L’AdBlue <b>gèle à −11,5 °C</b> (réchauffeur). Niveau insuffisant → réduction de puissance d’au moins 40 %, sauf véhicules militaires d’intervention et tactiques.</li>
<li><b>Canister</b> (essence) : retient les vapeurs d’essence du réservoir et les renvoie à l’admission par une électrovanne pilotée par le calculateur.</li>
<li><b>OBD</b> : essence → ratés d’allumage, catalyseur, richesse, injection d’air, EGR ; diesel → catalyseur, <b>piège à particules</b>, pré/postchauffage, EGR, débit et avance.</li></ul>`,
    retenir: ['Essence = catalyseur 3 voies + sonde lambda (richesse 1) + canister.', 'Diesel = catalyseur d’oxydation (CO, HC) + FAP (suies) + SCR/AdBlue (NOx).', 'EGR : essence ET diesel, contre les NOx (combustion > 2 000 °C).'],
    pieges: ['Le FAP et l’AdBlue n’existent pas sur un moteur essence ; le canister n’existe pas sur un diesel.', 'Catalyseur d’oxydation (diesel) : pas de NOx. Seul le 3 voies (essence) réduit les NOx.', 'Le diesel fonctionne toujours en excès d’air : pas de régulation à richesse 1.']
  });

  var qs = [
    { q: 'Un catalyseur 3 voies (trifonctionnel) équipe :', c: ['Le moteur essence', 'Le moteur diesel', 'Les deux indifféremment'], e: 'Le 3 voies oxyde CO et HC et réduit les NOx ; il ne fonctionne bien qu’à richesse 1, donc sur l’essence. Le diesel (toujours pauvre) a un catalyseur d’oxydation.', r: 'Essence = 3 voies · diesel = oxydation.' },
    { q: 'Quels polluants traite le catalyseur 3 voies (essence) ?', c: ['CO, HC et NOx', 'CO et HC seulement', 'Les particules (suies)', 'Les NOx seulement'], e: 'Il oxyde CO et HC (en CO₂ et H₂O) et réduit les NOx (en N₂).' },
    { q: 'Quels polluants traite le catalyseur d’oxydation (diesel) ?', c: ['CO et HC', 'CO, HC et NOx', 'Les suies', 'Les NOx seulement'], e: 'En diesel il y a toujours de l’oxygène en excès : on ne peut pas réduire les NOx dans le catalyseur. Les NOx sont traités par l’EGR et la SCR.' },
    { q: 'Pourquoi le catalyseur 3 voies ne convient-il pas au diesel ?', c: ['Il ne fonctionne bien qu’à richesse 1, alors que le diesel fonctionne toujours en mélange pauvre', 'Parce que le diesel ne rejette pas de CO', 'Parce qu’il est trop cher', 'Parce qu’il bouche le FAP'], e: 'Mélange pauvre = excès d’oxygène : les NOx ne sont plus réduits. Diesel : λ de 0,3 à 1,5 (dosage 1/20 à 1/30).' },
    { q: 'À quelle température s’amorce un catalyseur ?', c: ['≈ 250 °C', '≈ 550 °C', '≈ 1 000 °C', '≈ 80 °C'], e: 'Température d’amorçage ≈ 250 °C. (550 °C = régénération du FAP.)' },
    { q: 'Sur un moteur essence, entre quelles valeurs doit rester le lambda pour que le catalyseur soit efficace ?', c: ['0,97 et 1,03', '0,3 et 1,5', '1/20 et 1/30', '0,5 et 0,8'], e: 'Moteur au ralenti accéléré : λ entre 0,97 et 1,03 (richesse 1). 0,3 à 1,5 = diesel.' },
    { q: 'Sonde lambda (essence) : tension en mélange riche ?', c: ['≈ 0,8 V', '≈ 0,1 V', '≈ 5 V', '≈ 12 V'], e: 'Riche : peu d’oxygène dans les gaz → tension élevée (≈ 0,8 V). Pauvre ≈ 0,1 V.' },
    { q: 'Rôle de la sonde lambda sur un moteur essence ?', c: ['Mesurer l’oxygène restant dans les gaz pour corriger la richesse à 1 et surveiller le catalyseur', 'Mesurer la température des gaz pour régénérer le FAP', 'Doser l’AdBlue', 'Commander la vanne EGR'], e: 'Le calculateur corrige immédiatement la quantité injectée pour revenir à R = 1 ; la sonde aval surveille l’efficacité du catalyseur.' },
    { q: 'Sonde à oxygène d’un moteur diesel ?', c: ['Sonde proportionnelle bicellulaire (cellule de Nernst + cellule de pompage)', 'La même sonde tout ou rien que l’essence, réglée à λ = 1', 'Il n’y a jamais de sonde sur un diesel', 'Un capteur de pression différentielle'], e: 'Le diesel travaille loin de λ = 1 : il faut une sonde proportionnelle qui mesure un large domaine.' },
    { q: 'Le filtre à particules (FAP) équipe :', c: ['Le moteur diesel', 'Le moteur essence', 'Les deux'], e: 'Le diesel rejette 10 à 20 fois plus de particules que l’essence.' },
    { q: 'Température nécessaire pour brûler les suies du FAP (régénération) ?', c: ['≈ 550 °C', '≈ 250 °C', '≈ 150 °C', '≈ 2 000 °C'], e: 'En ville les gaz ne sont qu’à 150 à 250 °C : il faut une stratégie de montée en température (post-injection).' },
    { q: 'Température maximale à ne pas dépasser pendant la régénération du FAP ?', c: ['1 000 °C', '550 °C', '250 °C', '2 000 °C'], e: 'Au-delà de 1 000 °C le FAP casse. La régénération forcée atteint ≈ 800 °C.' },
    { q: 'Comment le calculateur sait-il que le FAP est colmaté ?', c: ['Par les capteurs de pression en entrée et en sortie du FAP', 'Par la sonde lambda', 'Par le capteur de PMH', 'Par le niveau d’AdBlue'], e: 'La différence de pression renseigne sur le colmatage ; le calculateur décide alors la régénération.' },
    { q: 'Stratégie de régénération du FAP la plus répandue ?', c: ['La post-injection seule', 'L’injection d’air à l’échappement (pulsair)', 'Le canister', 'L’injection d’AdBlue'], e: 'Autres stratégies : post-injection + additif (cérine / Eolys, régénération à 450 °C) et 5ᵉ injecteur.' },
    { q: 'Rôle de l’additif (cérine / Eolys) sur certains FAP ?', c: ['Faire brûler les suies à 450 °C au lieu de 550 °C', 'Réduire les NOx', 'Augmenter l’indice de cétane', 'Éviter le gel du gazole'], e: 'Il est ajouté dans le gazole sans agir sur la combustion ; il abaisse la température de combustion des suies.' },
    { q: 'L’EGR (recyclage des gaz d’échappement) équipe :', c: ['Les moteurs essence ET diesel', 'Le diesel seulement', 'L’essence seulement'], e: 'Commun aux deux : il réduit les NOx en diminuant la température de combustion.' },
    { q: 'À partir de quelle température de combustion se forment les NOx (livre) ?', c: ['Plus de 2 000 °C', 'Plus de 250 °C', 'Plus de 550 °C', 'Plus de 1 000 °C'], e: 'N₂ + O₂ → NOx si la température de combustion dépasse 2 000 °C. L’EGR fait baisser cette température.' },
    { q: 'Quel pourcentage de gaz brûlés un moteur peut-il accepter dans son mélange (EGR) ?', c: ['Jusqu’à 25 %', 'Jusqu’à 5 %', 'Jusqu’à 50 %', 'Jusqu’à 90 %'], e: 'Au-delà, la combustion est perturbée ; le calculateur module la quantité selon les phases de fonctionnement.' },
    { q: 'Diesel : la vanne EGR reste bloquée ouverte. Conséquence ?', c: ['Grosse perte de puissance', 'Augmentation des NOx', 'Le FAP se régénère en permanence', 'Aucune conséquence'], e: 'Hors du champ de dépollution la vanne doit être fermée. Cause fréquente : grippage par les particules et l’humidité.' },
    { q: 'Comment est commandée une vanne EGR progressive (électrovanne intégrée) ?', c: ['Par le calculateur, avec un signal RCO', 'Par un câble relié à la pédale', 'Par la pression de rampe', 'Par la sonde lambda directement'], e: 'Tout ou rien : dépression + capteur différentiel ; progressif : électrovanne pilotée en RCO.' },
    { q: 'La SCR (AdBlue) équipe :', c: ['Les moteurs diesel (véhicules industriels)', 'Les moteurs essence', 'Les deux'], e: 'Elle réduit les NOx dans l’échappement (azote + eau) ; elle permet de respecter Euro 4 et Euro 5.' },
    { q: 'À quelle température gèle l’AdBlue ?', c: ['−11,5 °C', '0 °C', '−30 °C', '−5 °C'], e: 'C’est une solution à base d’eau : un réchauffeur évite le gel.' },
    { q: 'Niveau d’AdBlue insuffisant : que prévoit la législation ?', c: ['Une réduction d’au moins 40 % de la puissance (sauf véhicules militaires d’intervention et tactiques)', 'L’arrêt immédiat du moteur', 'Aucune conséquence', 'Le passage en mode essence'], e: 'Les véhicules d’intervention et tactiques ne sont pas soumis à cette réduction de couple.' },
    { q: 'Le canister équipe :', c: ['Le moteur essence', 'Le moteur diesel', 'Les deux'], e: 'Il retient les vapeurs d’essence (charbon actif) et les renvoie à l’admission par une électrovanne de purge pilotée par le calculateur.' },
    { q: 'La postcombustion thermique (injection d’air à l’échappement) sert à :', c: ['Chauffer plus vite le catalyseur d’un moteur essence', 'Régénérer le FAP d’un diesel', 'Réduire les NOx', 'Refroidir l’échappement'], e: 'Au-dessus de 600 °C, HC et CO brûlent avec l’air insufflé : le catalyseur chauffe plus vite et la régulation de richesse démarre plus tôt.' },
    { q: 'Contrôle de pollution d’un diesel au contrôle technique ?', c: ['La mesure d’opacité des fumées', 'La mesure du CO au ralenti', 'La mesure de la sonde lambda', 'La pesée du FAP'], e: 'Depuis le 01/07/2008 : 1,5 m⁻¹. Avant (1980 à 06/2008) : 2,5 m⁻¹ en atmosphérique, 3 m⁻¹ en suralimenté.' },
    { q: 'Quel dispositif est commun aux moteurs essence et diesel ?', c: ['L’EGR (recyclage des gaz d’échappement)', 'Le FAP', 'Le canister', 'La SCR (AdBlue)'], e: 'Essence : 3 voies, lambda, canister. Diesel : oxydation, FAP, SCR. Les deux : EGR, coupure d’injection en décélération, OBD.' },
    { q: 'Surveillance OBD : lequel est surveillé sur un diesel mais pas sur un essence ?', c: ['Le piège à particules', 'Les ratés d’allumage', 'Le contrôle automatique de richesse', 'Le catalyseur'], e: 'Diesel : catalyseur, piège à particules, pré/postchauffage, EGR, débit et avance. Essence : ratés d’allumage, catalyseur, richesse, injection d’air, EGR.' },
    { q: 'Moteur diesel : d’où viennent les polluants émis ?', c: ['75 % de l’échappement, 25 % du carter moteur (vapeurs d’huile)', '100 % de l’échappement', '50 % de l’échappement, 50 % du réservoir', '25 % de l’échappement, 75 % du carter'], e: 'Répartition globale des polluants d’un moteur diesel.' },
    { q: 'Moteur essence : un mélange riche augmente surtout…', c: ['Le CO et les HC', 'Les NOx', 'Les particules', 'Le SO₂'], e: 'Manque d’air : combustion incomplète. Un mélange pauvre augmente les NOx (excès d’oxygène, température élevée).' }
  ];
  REV.addExercises('moteur', { lessons: [], questions: qs.map(function (q) { q.l = 'depollution'; q.src = SRC; return q; }) });

  /* Formulaire : moyen mnémotechnique */
  var F = REV.formulaires;
  if (F && F.moteur) F.moteur.push({ t: '🌿 Dépollution : essence ou diesel ?', html: `
<div class="tw"><table><tr><th>⛽ Essence</th><th>🛢️ Diesel</th></tr>
<tr><td>Catalyseur <b>3 voies</b> (CO, HC, NOx)</td><td>Catalyseur d’<b>oxydation</b> (CO, HC)</td></tr>
<tr><td>Sonde lambda, richesse 1</td><td>Sonde proportionnelle, mélange pauvre</td></tr>
<tr><td>Canister, postcombustion (air)</td><td><b>FAP</b> 550 °C (max 1 000 °C), <b>SCR / AdBlue</b> (gèle à −11,5 °C)</td></tr>
<tr><td colspan="2" style="text-align:center">Les deux : <b>EGR</b> (NOx, combustion &gt; 2 000 °C), coupure en décélération, OBD</td></tr></table></div>
<p>💡 « L’essence a <b>3 voies et un canister</b> ; le diesel <b>s’encrasse</b> (FAP) et <b>boit de l’AdBlue</b>. L’EGR, tout le monde l’a. »</p>` });
})();
