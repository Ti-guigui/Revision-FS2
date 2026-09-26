/* Électricité générale : pages « Électronique » et « Alimentation stabilisée » du livre AGA 03 (diode, Del, Zéner,
   transistor NPN, condensateur, transformateur, redressement, filtrage, stabilisation) + QCM de fonctionnement. */
(function () {
  var A = 'aga03/', SRC = 'AGA 03 — Électricité générale';
  function im(p, cap) { return { src: A + 'p' + p + '.jpg', cap: cap }; }
  REV.extendLesson('elec/composants', {
    images: [im('086', 'Diode simple : symbole, boîtiers (l’anneau indique la cathode), sens passant (0,4 à 0,8 V) et sens bloqué'),
      im('087', 'Rôles de la diode : redressement mono-alternance, double alternance (pont de Graëtz), triphasé'),
      im('088', 'Montage à 2 allures, protection contre les inversions de polarité, diode de roue libre (bobine, relais)'),
      im('089', 'Fonctions OU et ET réalisées avec des diodes ; la Del (symbole)'),
      im('090', 'Del : boîtier, repérage de la cathode ; vérification des diodes au multimètre (test diode)'),
      im('093', 'Diode Zéner : symbole, boîtiers, sens passant (0,6 V) et sens inverse (claquage réversible à VZ)'),
      im('094', 'Zéner : cas 1 (Ug ≤ VZ, elle ne conduit pas) et cas 2 (Ug > VZ, elle garde VZ, R1 = résistance ballast)'),
      im('095', 'Zéner : cas 3, rôles (stabilisation, protection des circuits électroniques)'),
      im('096', 'Vérification d’une Zéner au multimètre ; ce qu’il faut retenir'),
      im('098', 'Le transistor bipolaire NPN : collecteur, base, émetteur'),
      im('099', 'Boîtiers de transistors ; principe du NPN : circuit de commande (base) et circuit de puissance (collecteur-émetteur)'),
      im('100', 'NPN bloqué (Ib = 0 → Ic = 0, interrupteur ouvert) et saturé (Vce ≈ 0, interrupteur fermé) ; Ie = Ic + Ib ; Ib = Ic / β'),
      im('104', 'Condensateur : types, symboles, constitution (armatures + diélectrique), capacité en farad, tension de service'),
      im('107', 'Transformateur : m = Us / Up = Ip / Is ; abaisseur (m < 1), élévateur (m > 1), isolateur (m = 1)'),
      im('108', 'Redressement par pont de Graëtz : sens du courant à chaque alternance'),
      im('109', 'Filtrage par condensateur : plus la capacité est grande, plus la tension est lisse'),
      im('110', 'Stabilisation par diode Zéner + résistance ballast ; ce qu’il faut retenir')],
    html: `
<h3>Fonctionnement des composants (livre AGA 03)</h3>
<div class="tw"><table><tr><th>Composant</th><th>Fonctionnement</th><th>Rôles</th></tr>
<tr><td>Diode simple</td><td>Passante de l’anode vers la cathode, VAK ≈ 0,6 V (0,4 à 0,8 V) quel que soit le courant ; bloquée en inverse (interrupteur ouvert)</td><td>Redressement mono / double alternance / triphasé, protection contre l’inversion de polarité, roue libre, fonctions OU / ET</td></tr>
<tr><td>Del (LED)</td><td>Émet de la lumière en sens passant ; ≈ 2 V pour ≈ 10 mA ; toujours avec une résistance série</td><td>Signalisation (faible consommation, longue durée de vie)</td></tr>
<tr><td>Diode Zéner</td><td>En direct : comme une diode (0,6 V). En inverse : si Ug ≤ VZ elle ne conduit pas ; si Ug &gt; VZ elle conduit et garde VZ à ses bornes (claquage réversible)</td><td>Stabiliser une tension (avec une résistance ballast qui absorbe Ug − VZ), protéger un circuit électronique</td></tr>
<tr><td>Transistor NPN</td><td>Circuit de commande (base-émetteur, Ib) et circuit de puissance (collecteur-émetteur, Ic). Ie = Ic + Ib ; Ic = β × Ib (β ≈ 80 à 300). Bloqué : Ib = 0, Ic = 0 → interrupteur ouvert. Saturé : Vbe ≈ 0,6 V, Vce ≈ 0 → interrupteur fermé</td><td>Commutation (commander un relais, une lampe) avec un petit courant</td></tr>
<tr><td>Condensateur</td><td>Deux armatures séparées par un diélectrique ; capacité en farad (µF) ; tension de service ; polarisé ou non</td><td>Réserve d’énergie, filtrage, temporisation</td></tr>
<tr><td>Transformateur</td><td>Ne fonctionne qu’en alternatif ; m = Us / Up ; ne change pas la fréquence</td><td>Abaisser (m &lt; 1), élever (m &gt; 1) ou isoler (m = 1)</td></tr></table></div>
<p><b>Vérification au multimètre (position test diode)</b> : diode simple 0,4 à 0,8 V en direct, infini (OL) en inverse ; Del 1,6 à 2 V en direct. Transistor NPN : on teste chaque jonction base-émetteur et base-collecteur comme une diode.</p>`,
    retenir: ['Zéner : Ug ≤ VZ → rien ; Ug > VZ → elle garde VZ, la ballast prend le reste.', 'NPN : bloqué = ouvert ; saturé = fermé (Vce ≈ 0).', 'Diode de roue libre : protège le transistor ou le contact qui commande une bobine.']
  });

  var Q = [
    ['086', 'Sur un boîtier de diode, l’anneau indique :', 'La cathode', 'L’anode', 'La tension de claquage'],
    ['086', 'Tension aux bornes d’une diode simple passante :', 'Environ 0,6 V (0,4 à 0,8 V) quel que soit le courant', 'Environ 2 V', 'La tension du générateur'],
    ['087', 'Un pont de Graëtz réalise un redressement :', 'Double alternance', 'Mono-alternance', 'Triphasé'],
    ['088', 'Diode montée en parallèle sur une bobine de relais :', 'Diode de roue libre : protège l’organe de commande à l’ouverture', 'Diode Zéner de stabilisation', 'Diode de redressement du courant de la bobine'],
    ['090', 'Au multimètre (test diode), une diode simple en sens inverse affiche :', 'L’infini (OL)', '0,6 V', '2 V'],
    ['090', 'Au multimètre (test diode), une Del en sens direct affiche environ :', '1,6 à 2 V', '0,6 V', '12 V'],
    ['094', 'Zéner VZ = 6 V en inverse avec Ug = 4 V :', 'Elle ne conduit pas (interrupteur ouvert)', 'Elle garde 6 V', 'Elle est détruite'],
    ['094', 'Zéner VZ = 6 V en inverse avec Ug = 12 V et une résistance ballast :', 'Elle garde 6 V, la ballast a 6 V à ses bornes', 'Elle a 12 V à ses bornes', 'Elle ne conduit pas'],
    ['095', 'Rôle de la résistance ballast avec une Zéner :', 'Limiter le courant et absorber la différence Ug − VZ', 'Augmenter la tension de sortie', 'Redresser la tension'],
    ['099', 'Dans un transistor NPN, le circuit de commande est :', 'Entre la base et l’émetteur (courant Ib)', 'Entre le collecteur et l’émetteur', 'Entre le collecteur et la base'],
    ['100', 'Transistor NPN bloqué :', 'Ib = 0, Ic = 0 : interrupteur ouvert entre collecteur et émetteur', 'Vce ≈ 0 : interrupteur fermé', 'Ic = β × Ib maximal'],
    ['100', 'Relation entre les courants d’un transistor :', 'Ie = Ic + Ib', 'Ic = Ie + Ib', 'Ib = Ic + Ie'],
    ['104', 'L’unité de capacité d’un condensateur est :', 'Le farad (F)', 'Le henry (H)', 'L’ohm (Ω)'],
    ['107', 'Transformateur avec m = Us / Up = 0,1 :', 'Abaisseur de tension', 'Élévateur de tension', 'Isolateur'],
    ['107', 'Un transformateur fonctionne :', 'Uniquement en alternatif et ne change pas la fréquence', 'En continu', 'En alternatif et double la fréquence'],
    ['109', 'Effet d’un condensateur de grande capacité après le pont de diodes :', 'Tension plus lisse (moins d’ondulation)', 'Tension plus ondulée', 'Tension alternative'],
    ['110', 'Ordre de l’alimentation stabilisée :', 'Transformateur → pont de Graëtz → condensateur → Zéner + ballast', 'Pont → transformateur → Zéner → condensateur', 'Condensateur → pont → transformateur → Zéner']
  ];
  REV.addExercises('elec', { lessons: [], questions: Q.map(function (x) {
    return { l: 'composants', img: A + 'p' + x[0] + '.jpg', q: x[1], c: [x[2], x[3], x[4]], e: x[2] + '. (' + SRC + ')', src: SRC };
  }) });
})();
