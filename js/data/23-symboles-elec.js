/* Symboles des composants électriques / électroniques découpés dans le cours AGA 03 (Électricité générale) :
   désignation + rôle, pour réviser comme les symboles hydrauliques et pneumatiques. */
(function () {
  var SRC = 'AGA 03 — Électricité générale';
  var S = [
    // [image, désignation, rôle / fonctionnement, 2 mauvaises désignations, 2 mauvais rôles]
    ['continu', 'Générateur de tension continue (symbole « continu »)', 'Tension de valeur et de sens constants : batterie, accumulateur, pile, dynamo, alternateur + redressement.', ['Générateur de tension alternative', 'Masse'], ['Tension qui change de sens périodiquement (secteur EDF)', 'Relier un point au châssis']],
    ['alternatif', 'Générateur de tension alternative (symbole « alternatif »)', 'Tension qui change de sens périodiquement : alternateur (avant redressement), secteur EDF.', ['Générateur de tension continue', 'Bobine'], ['Tension de sens constant (batterie)', 'Stocker de l’énergie électrique']],
    ['rheostat', 'Rhéostat (résistance variable)', 'Résistance variable à 3 connexions montée en série avec le récepteur : elle fait varier le courant (montage rhéostatique).', ['Potentiomètre', 'Résistance ajustable'], ['Diviser une tension (curseur)', 'Réglage fait une seule fois en usine, 2 connexions']],
    ['potentiometre', 'Potentiomètre', 'Résistance variable à 3 connexions (2 extrémités + curseur) : sert de diviseur de tension (ex. capteur de position de pédale ou de papillon).', ['Rhéostat', 'Thermistance CTN'], ['Protéger un circuit contre les surintensités', 'Stocker des charges électriques']],
    ['ajustable', 'Résistance ajustable', 'Seulement 2 connexions ; sa valeur se règle en fonction du besoin (réglage ponctuel).', ['Potentiomètre', 'Rhéostat'], ['Diviser une tension en permanence avec un curseur', 'Redresser une tension alternative']],
    ['diode', 'Diode simple (diode à jonction)', 'Laisse passer le courant de l’anode vers la cathode (sens passant, VAK ≈ 0,4 à 0,8 V) et le bloque en sens inverse (interrupteur ouvert).', ['Diode Zéner', 'Diode électroluminescente (LED)'], ['Stabiliser une tension en inverse', 'Émettre de la lumière']],
    ['led', 'Diode électroluminescente (DEL / LED)', 'Émet une lumière visible (ou infrarouge) quand elle est polarisée en direct ; VAK ≈ 1,5 à 2 V ; toujours avec une résistance de protection en série.', ['Photodiode', 'Diode Zéner'], ['Stabiliser une tension', 'Redresser le courant de l’alternateur']],
    ['zener', 'Diode Zéner', 'En direct : comme une diode (≈ 0,6 V). En inverse : conduit dès que la tension atteint VZ (claquage réversible) et garde VZ à ses bornes → stabilise une tension (avec une résistance ballast).', ['Diode de roue libre', 'Thyristor'], ['Émettre de la lumière', 'Bloquer le courant dans les deux sens']],
    ['npn', 'Transistor bipolaire NPN', 'Un petit courant de base (Ib) commande un grand courant collecteur (Ic = β × Ib). Flèche sur l’émetteur vers l’EXTÉRIEUR. Saturé = interrupteur fermé, bloqué = ouvert.', ['Transistor PNP', 'Thyristor'], ['Redresser une tension alternative', 'Stocker de l’énergie']],
    ['pnp', 'Transistor bipolaire PNP', 'Même rôle que le NPN (commande / amplification) ; la flèche de l’émetteur est vers l’INTÉRIEUR (« PéNètre »).', ['Transistor NPN', 'Diode Zéner'], ['Stabiliser une tension', 'Élever une tension alternative']],
    ['cond-pol', 'Condensateur polarisé (chimique)', 'Capacité en général supérieure à 1 µF ; repères + et − à respecter. Rôles : réserve d’énergie, filtre, temporisation.', ['Condensateur non polarisé', 'Pile'], ['Élever ou abaisser une tension alternative', 'Mesurer un courant']],
    ['cond-np', 'Condensateur non polarisé', 'Capacité en général inférieure à 1 µF, pas de sens de branchement. Rôles : réserve d’énergie, filtre, temporisation.', ['Condensateur polarisé', 'Interrupteur ouvert'], ['Redresser une tension', 'Protéger une diode Zéner']],
    ['transfo', 'Transformateur (2 représentations)', 'Élève ou abaisse une tension ALTERNATIVE (magnétisme) : enroulement primaire + enroulement secondaire + circuit magnétique. Ne change pas la fréquence ; m = Us / Up.', ['Relais', 'Moteur électrique'], ['Redresser une tension alternative', 'Filtrer une tension redressée']],
    ['amperemetre', 'Ampèremètre (A) branché en SÉRIE', 'Mesure l’intensité : on ouvre le circuit (hors tension) et on insère l’appareil en série ; en continu, fil rouge côté + ; commencer par le calibre le plus élevé.', ['Voltmètre branché en parallèle', 'Ohmmètre'], ['Mesurer une tension en parallèle', 'Mesurer une résistance hors tension']],
    ['voltmetre', 'Voltmètre (V) branché en PARALLÈLE', 'Mesure une tension (différence de potentiels) : l’appareil se branche en parallèle, aux bornes du composant.', ['Ampèremètre branché en série', 'Ohmmètre branché hors tension'], ['Mesurer un courant en série', 'Mesurer une résistance']],
    ['ohmmetre', 'Ohmmètre (Ω)', 'Mesure une résistance, une continuité ou un isolement : circuit HORS TENSION et composant isolé (au moins une extrémité débranchée), en parallèle sur le composant.', ['Voltmètre', 'Ampèremètre'], ['Mesurer une tension circuit sous tension', 'Mesurer un courant en série']]
  ];
  var qs = [], n = 0;
  S.forEach(function (s) {
    n++;
    qs.push({ l: 'sym-composants', q: 'Q' + String(2 * n - 1).padStart(2, '0') + ' — Quel est ce symbole ?', img: 'sym/aga03-' + s[0] + '.png', c: [s[1]].concat(s[3]), e: s[1] + ' : ' + s[2], src: SRC });
    qs.push({ l: 'sym-composants', q: 'Q' + String(2 * n).padStart(2, '0') + ' — Quel est le rôle de ce composant ?', img: 'sym/aga03-' + s[0] + '.png', c: [s[2]].concat(s[4]), e: s[1] + '.', src: SRC });
  });
  qs.push({ l: 'sym-composants', q: 'Q' + String(2 * n + 1).padStart(2, '0') + ' — Dans l’alimentation stabilisée, dans quel ordre trouve-t-on les composants ?', img: 'sym/aga03-synoptique.png', c: ['Transformateur → pont de Graëtz → condensateur → diode Zéner + résistance', 'Pont de Graëtz → transformateur → diode Zéner → condensateur', 'Condensateur → transformateur → pont de Graëtz → diode Zéner'], e: 'Transformer l’amplitude → redresser → filtrer → stabiliser (AGA 03 §17.2).', src: SRC });

  REV.addExercises('elec', {
    lessons: [{
      id: 'sym-composants', title: 'Symboles des composants électriques (AGA 03)',
      images: S.map(function (s) { return { src: 'sym/aga03-' + s[0] + '.png', cap: s[1] }; }).concat([{ src: 'sym/aga03-synoptique.png', cap: 'Alimentation stabilisée : transformateur, pont de Graëtz, condensateur, Zéner + ballast' }]),
      html: '<h3>Désignation et rôle</h3><div class="tw"><table><tr><th>Symbole</th><th>Désignation</th><th>Rôle</th></tr>' +
        S.map(function (s) { return '<tr><td><img src="img/sym/aga03-' + s[0] + '.png" alt="" style="max-width:140px"></td><td><b>' + s[1] + '</b></td><td>' + s[2] + '</td></tr>'; }).join('') + '</table></div>',
      retenir: ['Diode : passe de l’anode vers la cathode (trait = cathode).', 'Zéner : en inverse, garde VZ.', 'NPN : flèche vers l’extérieur ; PNP : flèche vers l’intérieur.', 'Ampèremètre en série, voltmètre en parallèle, ohmmètre hors tension.'],
      pieges: ['Rhéostat (série, fait varier I) ≠ potentiomètre (diviseur de tension).', 'Condensateur polarisé : respecter + et −.'],
      memo: { cle: 'A en série · V en parallèle · Ω hors tension', flow: ['Transformateur', 'Pont de Graëtz', 'Condensateur', 'Zéner + ballast'], points: ['LED ≈ 2 V', 'Diode Si ≈ 0,6 V', 'β = Ic / Ib'], astuce: 'PNP = « PéNètre » : la flèche rentre.' }
    }],
    questions: qs
  });
})();
