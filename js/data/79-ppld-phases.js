/* PPLD : phases de fonctionnement (schémas du cours, colorés) — treuils + push-pull, RMU, stabilisateurs */
(function () {
  var I = 'ppld/';
  var L = {
    id: 'phases', title: 'Phases de fonctionnement : treuils + push-pull, RMU, stabilisateurs',
    images: [
      { src: I + 'phase-treuils-butee.jpg', cap: 'Treuils + push-pull en butée : la LS monte au DAD (320 b) → pression de service 350 b (rouge 350 b, vert 25 b, bleu 0 b)' },
      { src: I + 'phase-treuils-halage.jpg', cap: 'Treuil, halage : LS 180 b → pression de service 210 b, 28 L/min, ΔP 30 b (rouge 210 b, violet 180 b, vert 25 b, bleu 0 b)' },
      { src: I + 'phase-rmu.jpg', cap: 'RMU (corps de flèche) : LS 270 b → pression de service 300 b, 38 L/min (rouge 300 b, violet 270 b, vert 25 b, bleu 0 b)' },
      { src: I + 'phase-rmu-butee.jpg', cap: 'RMU en butée : limiteur secondaire 300 b → pression de service 330 b (vert 25 b, bleu 0 b)' },
      { src: I + 'phase-stabs-butee.jpg', cap: 'Stabilisateurs en butée : limiteur de pression à commande pilotée 220 b (tête pilote 200 b) → pression de service 250 b ; balance d’entrée, ΔP 30 b, 40 L/min' },
      { src: I + 'phase-stabs-extension.jpg', cap: 'Stabilisateurs, extension : LS 85 b → pression de service 115 b ; balance de pression : Q = K × S × √ΔP, ΔP constante = vitesse constante' }
    ],
    html: '<p>Tes schémas de cours colorés, phase par phase. Dans tous les cas, la <b>pression de service = pression LS + 30 b</b> (ressort de stand-by du tiroir LS de la pompe).</p>' +
      '<div class="tw"><table><tr><th>Circuit</th><th>Phase</th><th>LS</th><th>Pression de service</th><th>Débit</th></tr>' +
      '<tr><td>Treuils + push-pull</td><td>Halage</td><td>180 b</td><td>210 b</td><td>28 L/min</td></tr>' +
      '<tr><td>Treuils + push-pull</td><td>En butée (DAD)</td><td>320 b</td><td>350 b</td><td>≈ 0 (annulation de débit)</td></tr>' +
      '<tr><td>RMU</td><td>Corps de flèche</td><td>270 b</td><td>300 b</td><td>38 L/min</td></tr>' +
      '<tr><td>RMU</td><td>En butée (limiteur secondaire 300 b)</td><td>300 b</td><td>330 b</td><td>≈ 0</td></tr>' +
      '<tr><td>Stabilisateurs</td><td>Extension</td><td>85 b</td><td>115 b</td><td>40 L/min</td></tr>' +
      '<tr><td>Stabilisateurs</td><td>En butée (limiteur piloté 220 b)</td><td>220 b</td><td>250 b</td><td>≈ 0</td></tr></table></div>' +
      '<p>Couleurs : <b style="color:#dc2626">rouge</b> = pression de service, <b style="color:#7c3aed">violet</b> = pression LS (charge), <b style="color:#16a34a">vert</b> = pilotage 25 b, <b style="color:#2563eb">bleu</b> = retour 0 b. Pour voir le fonctionnement de la régulation de la pompe avec ces valeurs : simulateur « Régulation Load Sensing ».</p>',
    retenir: ['Pression de service = LS + 30 b (ressort de stand-by).', 'En butée, la pression est plafonnée par le limiteur secondaire de l’élément ou, à défaut, par le DAD (320 b → 350 b).', 'Balance d’entrée / de pression : ΔP constante (30 b) → débit, donc vitesse, constant : Q = K × S × √ΔP.']
  };
  REV.addLessons('ppld', 'fonctions', [L]);
})();
