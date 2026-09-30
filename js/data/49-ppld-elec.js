/* PPLD : partie électrique de l'équipement (sélecteur 3 voies, relais d'auto-maintien, arrêt d'urgence) + notes de cours. */
(function () {
  var I = 'ppld/';
  function im(src, cap) { return { src: I + src + '.jpg', cap: cap }; }

  REV.addLessons('ppld', 'diagnostic', [{
    id: 'electrique', title: 'Partie électrique : modes et arrêt d’urgence',
    images: [im('schema-auto-maintien', 'Schéma de principe : batterie, fusibles 40 A / 5 A / 20 A, interrupteur PTO cabine, relais R6, relais d’auto-maintien, réarmement, arrêt d’urgence, sélecteur 3 voies'),
      im('elec-auto-maintien', 'Façade (A) et sélecteur Auto/Manu/Stab (B) : alimentation par le relais d’auto-maintien'),
      im('elec-mode-radio', 'Mode Radio : le boîtier de radiocommande (C) est alimenté'),
      im('elec-mode-manu', 'Mode Manu (secours) : la vanne by-pass RSQ 240 (C) est alimentée'),
      im('elec-mode-stabs', 'Mode Stabilisateurs : seuls les coffrets de stabs gauches (C) et droits (D) sont alimentés'),
      im('elec-arret-urgence', 'Arrêt d’urgence : coups de poing (A), réarmement (B), sélecteur (C), relais d’auto-maintien (D)'),
      im('elec-schema-complet', 'Schéma électrique complet de l’équipement')],
    html: `
<h3>Alimentation</h3>
<ul><li>Batterie → fusible <b>40 A</b> → <b>interrupteur PTO</b> en cabine → fusible <b>5 A</b> → <b>relais R6</b> ; par le contact de R6 et le fusible <b>20 A</b>, on alimente la façade (+PTO).</li>
<li>Façade éclairée = le relais R6 fonctionne, la ligne électrique est correcte.</li>
<li>Bouton poussoir de <b>réarmement</b> → <b>relais d’auto-maintien</b> (il reste collé seul une fois excité) → contact de l’arrêt d’urgence (NC) → <b>sélecteur 3 voies</b> Stab / Manu / Radio.</li>
<li>Les électrovannes <b>by-pass CETOP</b> et <b>RSQ 240</b> : c’est nous qui les pilotons, par le sélecteur 3 voies.</li></ul>
<h3>Les 3 modes du sélecteur</h3>
<div class="tw"><table><tr><th>Mode</th><th>Ce qui est alimenté</th><th>Inopérant</th></tr>
<tr><td><b>Radio</b> (mode normal)</td><td>Le boîtier de la radiocommande : mise en œuvre normale depuis la radiocommande</td><td>—</td></tr>
<tr><td><b>Manu</b> (mode secours)</td><td>Les sélecteurs et boutons poussoirs de la façade (coffre n° 6) ; la <b>vanne by-pass RSQ 240</b> est alimentée dès la sélection du mode Manu</td><td>La radiocommande</td></tr>
<tr><td><b>Stab</b></td><td>Seulement les coffrets des stabilisateurs droits et gauches : coffrets éclairés, joysticks et sélecteurs 3 positions alimentés ; électrovanne <b>by-pass CETOP</b></td><td>Le panneau et la radiocommande</td></tr></table></div>
<h3>Arrêt d’urgence</h3>
<ul><li><b>3 coups de poing</b> : coffre n° 6, coffre n° 1 et radiocommande.</li>
<li>Coup de poing enclenché → le <b>relais d’auto-maintien est désexcité</b> → le sélecteur 3 positions n’est plus alimenté : le système est isolé. Le voyant du bouton <b>réarmement</b> s’éclaire.</li>
<li>Pour réalimenter : <b>désenclencher</b> le coup de poing <b>et réarmer</b> depuis le panneau du coffre n° 6.</li>
<li>Le voyant « réarmement » s’éclaire dès qu’une action sur le bouton réarmement est nécessaire. Voyant resté allumé = pas d’alimentation sur le sélecteur.</li></ul>`,
    retenir: ['L’arrêt d’urgence coupe l’alimentation du relais d’auto-maintien.', 'Manu = secours : radiocommande inopérante, by-pass RSQ 240 alimentée.', 'Stab = seuls les coffrets de stabs : by-pass CETOP.', 'Façade éclairée = relais R6 correct.'],
    memo: { cle: 'RÉARMEMENT → AUTO-MAINTIEN → SÉLECTEUR 3 VOIES', flow: ['PTO (fusibles 40 A, 5 A)', 'Relais R6 (20 A) → façade', 'Réarmement → auto-maintien', 'AU (NC) → sélecteur Stab / Manu / Radio'], points: ['3 coups de poing : coffre 6, coffre 1, radio', 'Voyant réarmement allumé = sélecteur non alimenté'], astuce: 'Après un coup de poing : désenclencher PUIS réarmer.' }
  }]);

  REV.extendLesson('ppld/generation', {
    images: [im('notes-pompe', 'Notes de cours : pompe et régulation'), im('notes-cours', 'Notes de cours : capacités, système débit / système débit-pression')],
    html: `
<h3>Notes de cours</h3>
<div class="tw"><table><tr><th>Situation</th><th>Pression de service</th></tr>
<tr><td>Neutre</td><td>30 b de stand-by, 1 L/min</td></tr>
<tr><td>Distributeur ouvert à fond</td><td>Ps = P LS : débit maxi 100 L/min</td></tr>
<tr><td>Fonctionnement</td><td>Ps = P LS + 30 b = pression de régulation</td></tr>
<tr><td>Récepteur en butée</td><td>320 b (DAD) + 30 b (stand-by) = <b>350 b</b> : pression maxi du circuit</td></tr></table></div>
<ul><li>Gicleur anti-pompage : retour bâche, évite les variations du plateau de la pompe.</li>
<li>Solénoïde de décharge LS (stabs) : au repos il décharge la ligne LS au neutre ; à l’action des stabs il fait monter en pression la ligne LS.</li>
<li><b>Système débit</b> (stabilisateurs) : pas de ressenti de charge, la vitesse est constante. <b>Système débit/pression</b> (équipement RSQ 240) : ressenti de charge, un changement de vitesse est visible.</li>
<li>Le régulateur de débit 3 voies maintient une <b>ΔP constante</b> (30 b) pour une vitesse constante : Q = K × S × √ΔP.</li></ul>`,
    retenir: ['Pression maxi du circuit : 320 + 30 = 350 b.', 'Système débit : pas de ressenti de charge ; système débit/pression : ressenti de charge.']
  });

  REV.extendLesson('ppld/energie', {
    images: [im('stabs-exemple-85b', 'Exemple : stabilisateur à 85 b (P service 115 b)'), im('stabs-schema-vierge', 'Schéma des stabilisateurs à colorier')],
    html: `
<h3>Exemple : stabilisateur à 85 b</h3>
<ul><li>Récepteur à 85 b → pression de service 85 + 30 = <b>115 b</b> ; débit pompe 40 + 1 = <b>41 L/min</b>.</li>
<li>Pompe : 115 × 41 / 600 = <b>7,86 kW</b> · vérin : 85 × 40 / 600 = <b>5,67 kW</b> · régulateur de débit 3 voies : 30 × 40 / 600 = <b>2 kW</b> · gicleur anti-pompage : 115 × 1 / 600 = <b>0,19 kW</b>.</li></ul>`,
    retenir: ['Vérin à 85 b : P service 115 b, pompe 7,86 kW.']
  });

  var ex = function (l, q) { q.l = l; return q; };
  REV.addExercises('ppld', { lessons: [], questions: [
    ex('electrique', { img: I + 'schema-auto-maintien.jpg', q: 'Qu’est-ce que coupe l’arrêt d’urgence du camion ?', c: ['L’alimentation du relais d’auto-maintien', 'L’alimentation de la pompe', 'Le moteur du porteur'], e: 'Le sélecteur 3 positions n’est plus alimenté : le système est isolé.' }),
    ex('electrique', { img: I + 'schema-auto-maintien.jpg', q: 'Qui pilote les électrovannes by-pass CETOP et RSQ 240 ?', c: ['Nous, via le sélecteur 3 voies', 'Le CEC', 'La pompe'], e: 'Stab → by-pass CETOP ; Manu ou Radio → by-pass RSQ 240.' }),
    ex('electrique', { img: I + 'elec-arret-urgence.jpg', q: 'Combien de coups de poing d’arrêt d’urgence, et où ?', c: ['3 : coffre n° 6, coffre n° 1 et radiocommande', '1 : sur la façade', '2 : en cabine et sur la radiocommande'], e: 'Un coup de poing enclenché désexcite le relais d’auto-maintien.' }),
    ex('electrique', { img: I + 'elec-arret-urgence.jpg', q: 'Après un arrêt d’urgence, comment réalimenter la dépanneuse ?', c: ['Désenclencher le coup de poing et réarmer depuis le panneau du coffre n° 6', 'Couper et remettre le contact', 'Changer de mode au sélecteur'], e: 'Le voyant réarmement s’éclaire tant qu’une action sur le bouton est nécessaire.' }),
    ex('electrique', { img: I + 'elec-mode-manu.jpg', q: 'Mode Manu : que se passe-t-il ?', c: ['La radiocommande est inopérante, on commande depuis la façade du coffre n° 6 et la vanne by-pass RSQ 240 est alimentée', 'Seuls les coffrets des stabilisateurs sont alimentés', 'La radiocommande commande la grue'], e: 'C’est le mode de secours.' }),
    ex('electrique', { img: I + 'elec-mode-stabs.jpg', q: 'Mode Stabilisateurs : que se passe-t-il ?', c: ['Seuls les coffrets des stabs droits et gauches sont alimentés ; panneau et radiocommande inopérants', 'Tout l’équipement est alimenté', 'Seule la radiocommande fonctionne'], e: 'Coffrets éclairés, joysticks et sélecteurs 3 positions alimentés.' }),
    ex('electrique', { img: I + 'elec-mode-radio.jpg', q: 'Quel est le mode de fonctionnement normal de la dépanneuse ?', c: ['Le mode Radio', 'Le mode Manu', 'Le mode Stab'], e: 'Le mode Manu est le mode de secours.' }),
    ex('electrique', { img: I + 'schema-auto-maintien.jpg', q: 'La façade de commande est éclairée. Que peut-on en déduire ?', c: ['Le relais R6 est correct : la ligne électrique arrive à la façade', 'Le relais d’auto-maintien est collé', 'La pompe débite'], e: 'Batterie → 40 A → PTO → 5 A → R6 → 20 A → façade.' }),
    ex('electrique', { img: I + 'elec-auto-maintien.jpg', q: 'Rôle du relais d’auto-maintien ?', c: ['Rester alimenté après l’appui sur le réarmement et alimenter le sélecteur 3 voies', 'Commander la pompe', 'Allumer l’éclairage des coffres'], e: 'L’arrêt d’urgence coupe son alimentation.' }),
    ex('generation', { img: I + 'notes-pompe.jpg', q: 'Pression maxi du circuit ?', c: ['350 b (DAD 320 b + stand-by 30 b)', '320 b', '220 b'], e: 'Récepteur en butée : 320 + 30 = 350 b.' }),
    ex('generation', { img: I + 'notes-pompe.jpg', q: 'Distributeur ouvert à fond : que vaut la pression de service ?', c: ['Ps = P LS, débit maxi 100 L/min', 'Ps = P LS + 30 b', 'Ps = 350 b'], e: 'En fonctionnement partiel : Ps = P LS + 30 b.' }),
    ex('generation', { img: I + 'notes-cours.jpg', q: 'Système débit (stabilisateurs) : que ressent l’opérateur ?', c: ['Pas de ressenti de charge, la vitesse est constante', 'Un ressenti de charge, la vitesse change', 'Des à-coups'], e: 'Système débit/pression (RSQ 240) : ressenti de charge, changement de vitesse visible.' }),
    ex('generation', { img: I + 'notes-cours.jpg', q: 'Système débit/pression (équipement RSQ 240) : que ressent l’opérateur ?', c: ['Un ressenti de charge, un changement de vitesse est visible', 'Aucun ressenti de charge', 'Une vitesse toujours constante'], e: 'Les stabilisateurs (système débit) gardent une vitesse constante.' }),
    ex('energie', { img: I + 'stabs-exemple-85b.jpg', q: 'Stabilisateur à 85 b : pression de service ?', c: ['115 b', '85 b', '220 b'], e: '85 + 30 (tiroir LS) = 115 b.' }),
    ex('energie', { img: I + 'stabs-exemple-85b.jpg', q: 'Stabilisateur à 85 b (40 L/min) : puissance fournie par la pompe ?', c: ['7,86 kW (115 × 41 / 600)', '5,67 kW', '2 kW'], e: 'Vérin 5,67 kW ; régulateur 2 kW ; gicleur 0,19 kW.' }),
    ex('energie', { img: I + 'stabs-exemple-85b.jpg', q: 'Rôle de la balance de pression du régulateur de débit 3 voies ?', c: ['Maintenir une ΔP constante pour une vitesse constante', 'Limiter la pression maxi', 'Décharger la ligne LS'], e: 'Q = K × S × √ΔP : ΔP constante (30 b) → débit constant.' })
  ] });
})();
