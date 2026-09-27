/* Freinage pneumatique : schémas complets transmis (GBC 180 ADR et porteur), coloriés en phase
   « véhicule qui roule, conducteur qui freine », et versions vierges pour s’entraîner à colorier. */
(function () {
  var P = 'pneu/';
  var GBC = P + 'gbc180-freinage-couleurs.jpg', POR = P + 'porteur-freinage-legende.jpg';
  REV.addLessons('pneu', 'remorque', [{
    id: 'schemas-complets', title: 'Schémas complets : GBC 180 ADR et porteur',
    images: [
      { src: GBC, cap: 'GBC 180 ADR : véhicule qui roule, conducteur qui freine' },
      { src: P + 'gbc180-vierge.jpg', cap: 'GBC 180 ADR : schéma vierge à colorier' },
      { src: POR, cap: 'Porteur (cylindre à verrou, VCR rupture) : véhicule qui roule, conducteur qui freine, avec légende' },
      { src: P + 'porteur-freinage-couleurs.jpg', cap: 'Porteur : même phase, sans légende' },
      { src: P + 'porteur-vierge.jpg', cap: 'Porteur : schéma vierge à colorier' }],
    html: `
<h3>La phase coloriée</h3>
<p><b>Le véhicule roule et le conducteur freine</b> : les réservoirs AV, AR, parc et remorque sont sous pression, le robinet de frein de service envoie la pression de freinage vers l’avant et l’arrière, et <b>il y a de l’air piloté après le robinet de frein de parc</b> (frein de parc desserré : les chambres à ressort restent alimentées, le véhicule est défreiné côté parc).</p>
<p>Code : une couleur par circuit (AV, AR, parc, remorque, servitudes). Trait plein = pression constante ; tirets = pression délivrée ; alterné avec du jaune = pression de pilotage.</p>
<h3>Repères du GBC 180 ADR</h3>
<div class="tw"><table><tr><th>N°</th><th>Désignation</th><th>N°</th><th>Désignation</th></tr>
<tr><td>1</td><td>Compresseur</td><td>13</td><td>Valve relais simple pilotage</td></tr>
<tr><td>2</td><td>Serpentin</td><td>14</td><td>Valve relais simple pilotage négatif</td></tr>
<tr><td>3</td><td>Régulateur</td><td>15</td><td>Robinet de frein de parc</td></tr>
<tr><td>4</td><td>Dessiccateur</td><td>16</td><td>Connecteur de freinage + valve relais simple pilotage intégrée</td></tr>
<tr><td>5</td><td>Double valve d’arrêt</td><td>17</td><td>VCR avec rupture</td></tr>
<tr><td>6</td><td>Valve de protection</td><td>18</td><td>Vase à diaphragme</td></tr>
<tr><td>7</td><td>Réservoir AV</td><td>19</td><td>VNAE (valve de non-addition des efforts)</td></tr>
<tr><td>8</td><td>Réservoirs AR (et intermédiaire AR)</td><td>20</td><td>Tristop</td></tr>
<tr><td>9</td><td>Réservoir parc / remorque</td><td>21</td><td>Valve de desserrage rapide</td></tr>
<tr><td>10</td><td>Détendeur</td><td>22</td><td>Mains d’accouplement à clapet : rouge = automatique, jaune = directe</td></tr>
<tr><td>11</td><td>Purgeur automatique</td><td>23</td><td>Mains d’accouplement sans clapet</td></tr>
<tr><td>12</td><td>Robinet de frein de service</td><td></td><td></td></tr></table></div>`,
    retenir: ['Véhicule qui roule + conducteur qui freine : air piloté après le robinet de frein de parc.', 'GBC 180 : 17 = VCR avec rupture · 19 = VNAE · 20 = Tristop · 21 = valve de desserrage rapide.'],
    memo: { cle: 'ROULE + FREINE = AIR PILOTÉ APRÈS LE ROBINET DE PARC', points: ['Chambres à ressort alimentées = défreiné côté parc', 'Rouge = automatique · jaune = directe', 'Colorier : une couleur par circuit'], astuce: 'Le ressort freine, l’air défreine.' }
  }]);

  var q = function (x) { x.l = 'schemas-complets'; x.img = x.img || GBC; return x; };
  REV.addExercises('pneu', { lessons: [], questions: [
    q({ q: 'Sur ce schéma (véhicule qui roule, conducteur qui freine), où trouve-t-on de l’air piloté ?', c: ['Après le robinet de frein de parc', 'Uniquement dans le réservoir AV', 'Nulle part : tout est à l’échappement'], e: 'Frein de parc desserré : les chambres à ressort restent alimentées (défreiné côté parc).' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 17.', c: ['VCR avec rupture', 'Valve relais simple pilotage', 'Robinet de frein de parc'], e: '17 = valve de commande de remorque avec rupture.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 19.', c: ['VNAE (valve de non-addition des efforts)', 'Valve de desserrage rapide', 'Détendeur'], e: 'Elle évite d’additionner l’effort du frein de service et celui du ressort sur les Tristop (20).' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 20.', c: ['Tristop (cylindre à ressort)', 'Vase à diaphragme', 'Cylindre à verrou'], e: 'Les vases à diaphragme sont repérés 18.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 21.', c: ['Valve de desserrage rapide', 'Valve de protection', 'Double valve d’arrêt'], e: 'Elle facilite l’échappement de l’air pour accélérer le défreinage.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 6.', c: ['Valve de protection', 'Dessiccateur', 'Régulateur'], e: 'Elle alimente les circuits dans un ordre précis et isole un circuit défaillant.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 16.', c: ['Connecteur de freinage + valve relais simple pilotage intégrée', 'VCR avec rupture', 'Valve relais simple pilotage négatif'], e: 'Il adapte l’effort de freinage arrière à la charge.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, donnez le nom de l’élément 5.', c: ['Double valve d’arrêt', 'Clapet anti-retour', 'Purgeur automatique'], e: 'Elle alimente un circuit à partir de la plus forte de deux pressions.' }),
    q({ q: 'Sur le schéma du GBC 180 ADR, les mains d’accouplement 22 rouge et jaune sont :', c: ['Rouge = automatique (alimentation) ; jaune = directe (commande)', 'Rouge = directe ; jaune = automatique', 'Les deux commandent le frein de parc'], e: 'Mains à clapet (22) ; mains sans clapet repérées 23.' }),
    q({ img: POR, q: 'Sur ce schéma de porteur, quel élément transmet le freinage à la remorque par les mains automatique et directe ?', c: ['La VCR rupture', 'La valve de desserrage rapide', 'Le détendeur'], e: 'La VCR commande la remorque à partir des informations AV et AR ; la rupture fait chuter l’automatique en cas de fuite sur la directe.' })
  ] });

  /* questions types UV2 : le schéma transmis remplace le schéma théorique quand la question ne dépend pas de ses numéros */
  var OLD = 'dsft/schema-pneu-theorique.jpg';
  var s = REV.subjects.find(function (x) { return x.id === 'pneu'; });
  s.questions = s.questions.filter(function (x) { return !(x.lkey === 'pneu/uv2-banque' && x.img === OLD && /élément 7|élément 12/.test(x.q)); });
  s.questions.forEach(function (x) { if (x.lkey === 'pneu/uv2-banque' && x.img === OLD) x.img = GBC; });

  if (REV.systemes && REV.systemes.pneu) REV.systemes.pneu.unshift({ t: 'Schéma complet : véhicule qui roule, conducteur qui freine', img: [[GBC, 'GBC 180 ADR colorié'], [POR, 'Porteur colorié avec légende'], [P + 'gbc180-vierge.jpg', 'Schéma vierge à colorier']],
    role: 'Lire un schéma complet et savoir où il y a de l’air dans chaque phase.',
    phases: [['Production', 'Compresseur → serpentin → régulateur → dessiccateur → valve de protection → réservoirs AV, AR, parc / remorque.'], ['Véhicule qui roule', 'Frein de parc desserré : air piloté après le robinet de frein de parc, chambres à ressort alimentées.'], ['Conducteur qui freine', 'Le robinet de frein de service délivre la pression vers l’AV et l’AR ; la VCR commande la remorque par la main directe.']],
    pannes: [] });
  if (REV.uv2Fiches && REV.uv2Fiches.pneu) REV.uv2Fiches.pneu.blocs.splice(1, 0, { t: 'Schémas complets : véhicule qui roule, conducteur qui freine',
    img: [[GBC, 'GBC 180 ADR'], [POR, 'Porteur avec légende']],
    pts: ['Air piloté après le robinet de frein de parc (frein de parc desserré).', 'GBC 180 : 17 = VCR rupture · 19 = VNAE · 20 = Tristop · 21 = desserrage rapide · 22 = mains à clapet.', 'Rouge = automatique ; jaune = directe.'],
    qr: [['Élément 19 (GBC)', 'VNAE'], ['Élément 17 (GBC)', 'VCR avec rupture']] });
})();
