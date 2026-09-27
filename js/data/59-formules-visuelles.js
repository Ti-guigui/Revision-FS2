/* Formulaire visuel : formules en triangles, règles de conversion en escalier, moyens mnémotechniques,
   cycles essence / diesel superposés. S’ajoute en tête de REV.formulaires (58-formulaires.js). */
(function () {
  var F = REV.formulaires;
  if (!F) return;

  /* Triangle : produit en haut, les deux facteurs en bas. Unités en bleu à l’extérieur. */
  function tri(o) {
    var tu = o.tu ? '<text class="tri-u" x="128" y="44">' + o.tu + '</text>' : '';
    var lu = o.lu ? '<text class="tri-u" x="34" y="136" text-anchor="middle">' + o.lu + '</text>' : '';
    var ru = o.ru ? '<text class="tri-u" x="126" y="136" text-anchor="middle">' + o.ru + '</text>' : '';
    return '<figure class="tri-card"><figcaption>' + o.t + '</figcaption>' +
      '<svg viewBox="0 0 160 145" role="img" aria-label="' + o.t + ' : ' + o.top + ' = ' + o.l + ' × ' + o.r + '">' +
      '<path class="tri-l" d="M80 8 L152 118 L8 118 Z M34 78 L126 78 M80 78 L80 118"/>' +
      '<text class="tri-v" x="80" y="66" text-anchor="middle">' + o.top + '</text>' +
      '<text class="tri-v" x="54" y="106" text-anchor="middle">' + o.l + '</text>' +
      '<text class="tri-v" x="106" y="106" text-anchor="middle">' + o.r + '</text>' + tu + lu + ru + '</svg>' +
      '<p class="tri-f">' + o.top + ' = ' + o.l + ' × ' + o.r + '<br>' + o.l + ' = ' + o.top + ' / ' + o.r + ' · ' + o.r + ' = ' + o.top + ' / ' + o.l + '</p>' +
      (o.m ? '<p class="tri-m">💡 ' + o.m + '</p>' : '') + '</figure>';
  }
  function tris(list) {
    return '<p class="muted small">On cache avec le doigt la valeur cherchée : si les deux autres sont côte à côte, on <b>multiplie</b> ; si l’une est au-dessus de l’autre, on <b>divise</b>.</p>' +
      '<div class="tri-grid">' + list.map(tri).join('') + '</div>';
  }
  /* Règle de conversion en escalier : une case par unité, le facteur entre deux cases au-dessus. */
  function ruler(o) {
    var head = o.cells.map(function (c, i) { return '<th>' + (i && o.step ? '<span class="rul-step">' + o.step + '</span>' : '') + c[0] + '</th>'; }).join('');
    var sym = o.cells.map(function (c) { return '<td class="rul-sym' + (c[2] ? ' base' : '') + '">' + c[1] + '</td>'; }).join('');
    return '<div class="ruler"><div class="tw"><table><tr>' + head + '</tr><tr>' + sym + '</tr></table></div>' +
      '<p class="rul-rule">➡️ Vers la droite : <b>× ' + o.factor + '</b> à chaque case · ⬅️ vers la gauche : <b>÷ ' + o.factor + '</b></p>' +
      (o.ex ? '<p class="small">Exemples : ' + o.ex + '</p>' : '') + '</div>';
  }
  function mnemo(list) {
    return '<ul class="mnemo">' + list.map(function (m) { return '<li><b>' + m[0] + '</b> — ' + m[1] + '</li>'; }).join('') + '</ul>';
  }
  function add(id, blocks) { if (F[id]) Array.prototype.unshift.apply(F[id], blocks); }

  var PREFIXES = ruler({ step: '× 10³', factor: '1 000', cells: [['Téra', 'T'], ['Giga', 'G'], ['Méga', 'M'], ['kilo', 'k'], ['unité', 'V A Ω W', 1], ['milli', 'm'], ['micro', 'µ'], ['nano', 'n'], ['pico', 'p']],
    ex: '35 kΩ = 35 000 Ω · 200 mA = 0,2 A · 500 µA = 0,000 5 A · 40 ms = 0,040 s · 3 kW = 3 000 W' });
  var LONGUEURS = ruler({ step: '× 10', factor: '10', cells: [['kilomètre', 'km'], ['hectomètre', 'hm'], ['décamètre', 'dam'], ['mètre', 'm', 1], ['décimètre', 'dm'], ['centimètre', 'cm'], ['millimètre', 'mm']],
    ex: '60 cm = 6 dm (diamètre d’un arbre) · 8 cm = 80 mm (alésage)' });
  var SURFACES = ruler({ step: '× 100', factor: '100', cells: [['m²', 'm²', 1], ['dm²', 'dm²'], ['cm²', 'cm²'], ['mm²', 'mm²']],
    ex: '1 mm² = 0,01 cm² = 10⁻⁶ m² · 5 cm² = 500 mm²' });
  var VOLUMES = ruler({ step: '× 1 000', factor: '1 000', cells: [['m³', 'm³', 1], ['dm³ = litre', 'dm³ / L'], ['cm³', 'cm³'], ['mm³', 'mm³']],
    ex: '30 cm³ × 2 800 tr/min = 84 000 cm³/min = 84 L/min · 2 500 cm³ = 2,5 L' });
  var TEMPS = ruler({ step: '× 60', factor: '60', cells: [['heure', 'h', 1], ['minute', 'min'], ['seconde', 's']],
    ex: '24 min = 24 / 60 = 0,4 h · 1 h = 3 600 s' });

  add('elec', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Loi d’Ohm', top: 'U', l: 'R', r: 'I', tu: 'V', lu: 'Ω', ru: 'A', m: '« Uri » : U en haut, R et I en bas.' },
      { t: 'Puissance', top: 'P', l: 'U', r: 'I', tu: 'W', lu: 'V', ru: 'A', m: '« Le PUIts » : P = U × I.' },
      { t: 'Quantité d’électricité', top: 'Q', l: 'I', r: 't', tu: 'Ah', lu: 'A', ru: 'h', m: '« QuITte » : Q = I × t.' },
      { t: 'Consommation (énergie)', top: 'W', l: 'P', r: 't', tu: 'J', lu: 'W', ru: 's' },
      { t: 'Fréquence', top: '1', l: 'f', r: 'T', lu: 'Hz', ru: 's', m: 'f = 1 / T : 20 ms → 50 Hz.' },
      { t: 'Tension crête à crête', top: 'Ucàc', l: 'Umax', r: '2', tu: 'V', lu: 'V' },
      { t: 'Tension monophasée', top: 'Umax', l: 'Ueff', r: '√2', tu: 'V', lu: 'V', m: 'L’efficace est plus petite : Ueff = Umax / √2.' },
      { t: 'Tension composée (triphasé)', top: 'U', l: 'V', r: '√3', tu: 'V', lu: 'V', m: '« Le grand U a bu 3 racines » : U = V × √3.' },
      { t: 'β du transistor', top: 'Ic', l: 'Ib', r: 'β', tu: 'A', lu: 'A', m: '« Le Chef (Ic) vaut β fois le Bébé (Ib). »' }
    ]) },
    { t: '📏 Tableau de conversion', html: PREFIXES + TEMPS },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['T G M k · unité · m µ n p', '« Tonton Gaston Mange des Kiwis — Un Melon Mûr, Non Pelé ».'],
      ['Série / parallèle', 'En SÉRIE, le courant est le même (une seule file) ; en PARALLÈLE, c’est la tension qui est la même.'],
      ['Transistor', 'Bloqué : Vbe = 0 V (Ib = 0) · Saturé : Vce = 0 V (interrupteur fermé).'],
      ['Logique', 'Un point « · » = ET = SÉRIE · un plus « + » = OU = PARALLÈLE · la barre = l’inverse.'],
      ['De Morgan', '« On casse la barre et on change le signe. »']
    ]) },
    { t: 'Générateurs, FEM et condensateur (tes notes de cours)', html: `
<div class="tw"><table><tr><th>Élément</th><th>Formule</th></tr>
<tr><td>Potentiel de référence</td><td>Ug = Ug+ − Ug−</td></tr>
<tr><td>Force électromotrice</td><td>Ug = E − (Rint × Ig) · Rint = (E − Ug) / Ig · Ig = (E − Ug) / Rint</td></tr>
<tr><td>Générateurs en série</td><td>Eeq = E1 + E2 · Req = Ri1 + Ri2 · Q = la plus petite</td></tr>
<tr><td>Générateurs en parallèle</td><td>Eeq = E1 = E2 · Qeq = Q1 + Q2</td></tr>
<tr><td>Condensateur (farad F)</td><td>Temps de charge (ou de décharge) = 5 × R × C (1 Ω × 1 F → 5 s) · série : C1 × C2 / (C1 + C2) · parallèle : C1 + C2</td></tr>
<tr><td>Puissance du générateur</td><td>PG = Ug × Ig = PL1 + PL2</td></tr></table></div>` }
  ]);

  add('hydro', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Pression', top: 'F', l: 'P', r: 'S', tu: 'daN', lu: 'bar', ru: 'cm²', m: '« La Pression, c’est la Force qui écrase la Surface » : P = F / S.' },
      { t: 'Débit d’une pompe', top: 'Q × 1 000', l: 'Cyl', r: 'N', tu: 'L/min', lu: 'cm³/tr', ru: 'tr/min', m: 'On divise par 1 000 pour passer des cm³ aux litres.' },
      { t: 'Vitesse d’un vérin', top: 'Q', l: '6 × S', r: 'v', tu: 'L/min', lu: 'cm²', ru: 'm/s', m: 'v = Q / (6 × S).' },
      { t: 'Puissance hydraulique', top: 'Pu × 600', l: 'P', r: 'Q', tu: 'kW', lu: 'bar', ru: 'L/min', m: '« Quand ça PUe, il faut du PQ pour 600 bonhommes » : Pu = P × Q / 600.' },
      { t: 'Puissance mécanique d’un vérin', top: 'Pu', l: 'F', r: 'v', tu: 'W', lu: 'N', ru: 'm/s' },
      { t: 'Puissance mécanique d’un moteur', top: 'Pu', l: 'C', r: 'ω', tu: 'W', lu: 'N·m', ru: 'rad/s' }
    ]) + '<p class="small">Vitesse d’un moteur hydraulique : N = Q × 1 000 / Cyl (même triangle que le débit) · Bernoulli : Q = K × S × √ΔP · Pascal : circuit en équilibre = même pression partout, l’huile ne circule pas.</p>' },
    { t: '📏 Tableaux de conversion', html: VOLUMES + SURFACES + '<p class="rul-rule">Pression : 1 bar = 100 kPa = 0,1 MPa = 10⁵ Pa · 1 PSI ≈ 0,07 bar</p>' },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['Pu = P × Q / 600', '« Quand ça PUe, il faut du PQ pour 600 bonhommes. »'],
      ['Diagnostic', '« Ça traîne ? → DÉBIT. Ça ne force pas ? → PRESSION. Le moteur cale ? → PUISSANCE. »'],
      ['Tous les récepteurs / un seul', 'Tous = appareil commun (génération) · un seul = appareil de ce récepteur · 2 sens = avant le distributeur · 1 sens = sur une ligne.'],
      ['Codes couleur', 'Rouge = pression · bleu = retour bâche · vert = commande / gavage.']
    ]) }
  ]);

  add('moteur', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Puissance', top: 'P', l: 'C', r: 'ω', tu: 'W', lu: 'N·m', ru: 'rad/s', m: 'ω = 2π × N / 60 → P = C × 2π × N / 60.' },
      { t: 'Cylindrée totale', top: 'Vtot', l: 'Vu', r: 'n', tu: 'cm³', lu: 'cm³', m: 'n = nombre de cylindres.' }
    ]) + '<p class="small">Cylindrée unitaire : Vu = π × A² / 4 × C (A = alésage, C = course, en cm) · rapport volumétrique : ρ = (Vu + v) / v → v = Vu / (ρ − 1) · 1 CV = 736 W · ρ : essence 7/1 à 12/1, diesel 13/1 à 24/1.</p>' },
    { t: '📈 Cycles essence et diesel superposés', html: `
<figure class="cycles"><svg viewBox="0 0 360 290" role="img" aria-label="Diagrammes pression-volume des cycles essence et diesel superposés">
<path class="cy-ax" d="M50 270 L50 18 M50 270 L340 270"/><text class="cy-t" x="40" y="20">P</text><text class="cy-t" x="334" y="286">V</text>
<path class="cy-ax dash" d="M70 270 L70 20 M310 270 L310 20"/><text class="cy-t" x="56" y="286">PMH</text><text class="cy-t" x="296" y="286">PMB</text>
<path class="cy-ess" d="M310 242 Q140 225 70 150 L70 70 Q150 170 310 215 L310 242"/>
<path class="cy-dsl" d="M310 242 Q130 215 70 45 L125 45 Q180 170 310 205 L310 242"/>
<path class="cy-ax" d="M70 242 L310 242"/>
<text class="cy-p" x="58" y="246">A</text><text class="cy-p" x="316" y="246">B</text>
<text class="cy-p ess" x="56" y="154">C</text><text class="cy-p ess" x="56" y="72">D</text><text class="cy-p ess" x="316" y="218">E</text>
<text class="cy-p dsl" x="56" y="42">C</text><text class="cy-p dsl" x="128" y="38">D</text><text class="cy-p dsl" x="316" y="204">E</text>
<text class="cy-l ess" x="150" y="120">essence</text><text class="cy-l dsl" x="170" y="80">diesel</text></svg></figure>
<div class="tw"><table><tr><th>Phase</th><th>Essence</th><th>Diesel (moteur lent)</th></tr>
<tr><td>AB : admission</td><td>Isobare</td><td>Isobare</td></tr>
<tr><td>BC : compression</td><td>Adiabatique</td><td>Adiabatique (plus haute : ρ 13 à 24)</td></tr>
<tr><td>CD : explosion / combustion</td><td><b>Isochore</b> (volume constant : trait vertical)</td><td><b>Isobare</b> (pression constante : trait horizontal)</td></tr>
<tr><td>DE : détente</td><td>Adiabatique</td><td>Adiabatique</td></tr>
<tr><td>EB puis BA : échappement</td><td>Isochore puis isobare</td><td>Isochore puis isobare</td></tr></table></div>
<p class="small">💡 La seule différence à retenir : le point <b>CD</b>. Essence = « ça explose d’un coup » (trait <b>vertical</b>) ; diesel = « ça brûle en poussant » (trait <b>horizontal</b>).</p>` },
    { t: '📏 Tableaux de conversion', html: LONGUEURS + VOLUMES },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['Les 4 temps', '« J’aspire, je serre, je brûle, je souffle » : admission, compression, combustion-détente, échappement.'],
      ['Méthode des 5 / des 7', 'La somme fait toujours 1 de plus que le nombre de cylindres : 4 cyl. → 5 ; 6 cyl. → 7.'],
      ['Diagramme de distribution', 'AOA et RFE autour du PMH (le croisement) ; AOE et RFA autour du PMB.'],
      ['720° / 360°', 'Le vilebrequin fait 2 tours quand l’arbre à cames en fait 1.']
    ]) }
  ]);

  add('equip', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Capacité de la batterie', top: 'Q', l: 'I', r: 't', tu: 'Ah', lu: 'A', ru: 'h', m: '80 Ah → recharge 8 A pendant 10 h.' },
      { t: 'Loi d’Ohm (mesures)', top: 'U', l: 'R', r: 'I', tu: 'V', lu: 'Ω', ru: 'A' },
      { t: 'Tension moyenne en RCO', top: 'U moy', l: 'RCO', r: 'U', tu: 'V', lu: '%', ru: 'V', m: '50 % sous 12 V → 6 V lus au multimètre.' }
    ]) },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['Tension mini au démarrage', '80 % de la tension : 12 V → 9,6 V ; 24 V → 19,2 V.'],
      ['Recharge', '« Un dixième pendant dix heures » : 1/10 de la capacité pendant 10 h.'],
      ['Aptitude', '« 3 fois la capacité, 15 secondes, 3 fois » (70 Ah → 210 A).'],
      ['CAN', 'H comme Haut : 3,5 V · L comme Low (bas) : 1,5 V · au repos tout le monde à 2,5 V · les deux ensemble font toujours 5 V.'],
      ['Alternateur', 'Rotor = inducteur (il crée le champ) · stator = induit (il produit le courant).']
    ]) }
  ]);

  add('dsft', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Distance de réaction', top: 'Dr', l: 'V', r: 't', tu: 'm', lu: 'm/s', ru: 's' },
      { t: 'Décélération', top: 'γ', l: 'g', r: 'c', tu: 'm/s²', lu: 'm/s²', m: 'c = coefficient d’adhérence.' },
      { t: 'Distance de freinage', top: 'V²', l: '2 × γ', r: 'DF', lu: 'm/s²', ru: 'm', m: 'DF = V² / (2 × γ).' }
    ]) },
    { t: '📏 Conversions', html: '<div class="ruler"><div class="tw"><table><tr><th>km/h</th><th></th><th>m/s</th></tr><tr><td class="rul-sym">72 · 108 · 144</td><td class="rul-sym">÷ 3,6 ➡️<br>⬅️ × 3,6</td><td class="rul-sym">20 · 30 · 40</td></tr></table></div>' +
      '<p class="rul-rule">1 h = 3 600 s et 1 km = 1 000 m → on divise par <b>3,6</b></p><p class="rul-rule">Angles : <b>1° = 60′</b> (10°35′ − 0°40′ = 9°55′)</p></div>' },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['Vitesse × 2', '« Deux fois plus vite, quatre fois plus loin pour s’arrêter » (V au carré).'],
      ['Ordre de réglage', '« H-C-P : Hop, C’est Parti ! » → Hauteur de caisse, Carrossage, Parallélisme (toujours en dernier).'],
      ['Usure des pneus', 'Rugueuse = paRallélisme · lisse = carrossage · facettes = amortisseurs.'],
      ['Angle inclus', 'Bon → le triangle (ou berceau, châssis) · faux → la fusée (porte-fusée, jambe de force).']
    ]) }
  ]);

  add('mdf', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Résistance au roulement', top: 'Rr', l: 'P', r: 'fr', tu: 'daN', lu: 'daN', m: 'Même triangle pour le glissement : Rg = P × fg.' },
      { t: 'Adhérence du tracteur', top: 'A', l: 'P', r: 'fa', tu: 'daN', lu: 'daN', m: 'Un seul pont moteur : 2/3 P × fa.' },
      { t: 'Résistance d’un arbre', top: 'Ra', l: 'Cm', r: 'd²', tu: 'daN', lu: 'daN/dm²', ru: 'dm²', m: 'd toujours en décimètres (60 cm = 6 dm).' },
      { t: 'Nombre de brins (avant les règles)', top: 'ΣR', l: 'Nb', r: 'EMD', tu: 'daN', ru: 'daN', m: 'Puis arrondi supérieur, +1 si < 4, +2 si ≥ 4.' },
      { t: 'Force à la jante', top: '270 × Pm', l: 'Fj', r: 'v', lu: 'daN', ru: 'km/h', m: 'Pm en kW (1 ch = 0,736 kW).' }
    ]) },
    { t: '📏 Conversions', html: LONGUEURS + '<p class="rul-rule">En manœuvre de force : 1 kg ≈ 1 daN · 1 t ≈ 1 000 daN · pente 100 % = 45°</p>' },
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['S E N S E S R D', '« Seuls Ensemble, Nous Soulevons En Sécurité, Rien ne Dérape » : Somme, EMD, Nombre de brins, Schéma, EMT, Sécurité, Résistance des PF, Distances.'],
      ['Brins', '« Moins de 4 → +1 ; 4 et plus → +2 » · plus de 5 brins → mouflage composé · 7 impossible.'],
      ['Sécurité', 'Entre 15 et 70 % : sous 15 → +1 brin, au-dessus de 70 → −1 brin.'],
      ['Poulies', 'Chaque poulie mange 10 % : 1 000 → 900 → 810.'],
      ['Arbres', '« Chez Henri, Ça Sent le sapin » : Chêne 500, Hêtre 400, Châtaignier 300, Sapin 200 (on descend de 100).'],
      ['Densités', 'Bois 1 · roche 2,5 · métal 8 t/m³.']
    ]) }
  ]);

  add('pneu', [
    { t: '🧠 Moyens mnémotechniques', html: mnemo([
      ['Normes', '« Le 6 partout » : remplissage 6 à 11 min, réponse 0,6 s.'],
      ['Frein de stationnement', '« 18 tout seul, 12 en famille » : véhicule seul 18 %, ensemble routier 12 %.'],
      ['Mains d’accouplement', 'Rouge = automatique (alimentation) · jaune = directe (commande).'],
      ['Tristop', '« Le ressort freine, l’air défreine. »']
    ]) }
  ]);

  add('ppld', [
    { t: '🔺 Les formules en triangles', html: tris([
      { t: 'Puissance hydraulique', top: 'Pu × 600', l: 'P', r: 'Q', tu: 'kW', lu: 'bar', ru: 'L/min', m: '« Quand ça PUe, il faut du PQ pour 600 bonhommes. »' }
    ]) + '<p class="formule">P service = P LS + 30 b (écart de stand-by) — ici on <b>additionne</b>, pas de triangle.</p>' }
  ]);
})();
