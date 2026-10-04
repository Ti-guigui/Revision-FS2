/* UV2 — entraînement : les mêmes types de questions que le dossier d’évaluation, avec d’autres valeurs.
   Les méthodes sont celles des cours et du corrigé du dossier ; seules les valeurs changent. */
(function () {
  var SRC = 'Entraînement UV2 (mêmes méthodes, autres valeurs)';
  function lesson(id, title, retenir, cle, flow, points, astuce) {
    return { id: id, title: title, html: '<p>Mêmes types de questions que le dossier d’évaluation de l’UV2, <b>avec d’autres valeurs</b>. Applique la méthode, pas le chiffre appris par cœur.</p>', retenir: retenir, pieges: ['Barème + 1 / − 0,5 / 0 : laisse vide si tu hésites entre les 3 réponses.'], memo: { cle: cle, flow: flow, points: points, astuce: astuce } };
  }

  REV.addExercises('dsft', {
    lessons: [lesson('uv2-var-dsft', 'UV2 — valeurs différentes : DSFT', ['1° = 60′ : écrire mini–maxi avant de comparer.', 'Tire du côté du carrossage le plus positif.', 'Willis : Zp·Np + Zc·Nc = (Zp + Zc)·Nps.'], 'PLAGE mini–maxi · Willis', ['Valeur ± tolérance', 'Plage mini–maxi', 'Comparer le relevé'], ['Porte-satellites mené = démultiplié', 'Porte-satellites fixe = marche arrière'], 'Écris la plage AVANT de regarder le relevé.')],
    questions: [
      { l: 'uv2-var-dsft', q: 'Pivot constructeur 9°45′ ± 30′. Relevé côté droit : 10°20′. Le pivot droit est :', c: ['Hors tolérance (plage 9°15′ à 10°15′)', 'Dans la tolérance (plage 9°15′ à 10°45′)', 'Dans la tolérance (écart de 35′ seulement)'], e: '9°45′ − 30′ = 9°15′ ; 9°45′ + 30′ = 10°15′. 10°20′ dépasse 10°15′ → hors tolérance.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Carrossage constructeur −0°30′ ± 30′. Relevé gauche : +0°10′. Le carrossage gauche est :', c: ['Hors tolérance (plage −1°00′ à 0°00′)', 'Dans la tolérance (plage −0°30′ à +0°30′)', 'Dans la tolérance (écart de 40′ seulement)'], e: '−0°30′ − 30′ = −1°00′ ; −0°30′ + 30′ = 0°00′. +0°10′ est au-dessus de 0°00′ → hors tolérance.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Carrossage relevé : gauche −0°50′, droite −0°05′. Le véhicule a-t-il tendance à tirer ?', c: ['Oui, à droite', 'Oui, à gauche', 'Non'], e: 'Il tire du côté du carrossage le plus positif : −0°05′ (droite) est plus positif que −0°50′ (gauche).', r: 'Tire du côté du carrossage le plus positif.', src: SRC },
      { l: 'uv2-var-dsft', q: 'D’après ce relevé d’angles (valeurs constructeur, relevés gauche et droit), quelle pièce incriminer ?', c: ['Un triangle (ou le berceau, le châssis)', 'La fusée, le porte-fusée et/ou la jambe de force', 'Le boîtier de direction'], e: 'Plages : carrossage −0°45′ à +0°15′ ; pivot 10°00′ à 11°00′ ; chasse 1°30′ à 2°30′. Côté droit, carrossage (−1°00′) et pivot (11°20′) hors tolérance. Angle inclus G = −0°20′ + 10°40′ = 10°20′ ; D = −1°00′ + 11°20′ = 10°20′ → identiques : angle inclus bon → triangle, berceau ou châssis.', r: 'Angle inclus bon → triangle, berceau ou châssis ; pas bon → fusée, porte-fusée et/ou jambe de force.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Train épicycloïdal : couronne menante (Zc = 60 dents) à 900 tr/min, planétaire (Zp = 30 dents) fixe. Vitesse et rapport du porte-satellites ?', c: ['600 tr/min, marche avant démultipliée', '1 350 tr/min, marche avant multipliée', '450 tr/min, marche arrière'], e: 'Zp·Np + Zc·Nc = (Zp + Zc)·Nps → 30 × 0 + 60 × 900 = 90 × Nps → Nps = 600 tr/min : même sens, plus lent → démultiplié (porte-satellites mené).', src: SRC },
      { l: 'uv2-var-dsft', q: 'Planétaire menant (Zp = 20) à 1 200 tr/min, couronne (Zc = 60) fixe. Vitesse du porte-satellites ?', c: ['300 tr/min, démultiplié (grande réduction)', '400 tr/min, multiplié', '3 600 tr/min, multiplié'], e: '20 × 1 200 + 60 × 0 = 80 × Nps → Nps = 24 000 / 80 = 300 tr/min.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Porte-satellites fixe, planétaire menant (Zp = 30) à 900 tr/min, couronne (Zc = 90) menée. Résultat ?', c: ['Marche arrière démultipliée, 300 tr/min', 'Marche avant multipliée, 2 700 tr/min', 'Prise directe, 900 tr/min'], e: 'Nps = 0 → 30 × 900 + 90 × Nc = 0 → Nc = −300 tr/min : sens inverse (marche arrière) et plus lent.', r: 'Porte-satellites FIXE = marche arrière.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Usure lisse sur le côté intérieur de la bande de roulement : cause ?', c: ['Carrossage trop négatif', 'Trop de pincement', 'Amortisseurs HS'], e: 'Usure lisse = carrossage ; côté intérieur = roue trop inclinée vers l’intérieur (carrossage négatif). Rugueuse = parallélisme ; facettes = amortisseurs.', src: SRC },
      { l: 'uv2-var-dsft', q: 'Un pneu porte le marquage DOT 0519. Signification ?', c: ['Fabriqué la 5ᵉ semaine de 2019', 'Fabriqué en mai 2019', 'Fabriqué le 5 janvier 2019'], e: 'Les 2 premiers chiffres = semaine, les 2 derniers = année (DOT 4217 = 42ᵉ semaine 2017).', src: SRC }
    ]
  });

  REV.addExercises('hydro', {
    lessons: [lesson('uv2-var-hydro', 'UV2 — valeurs différentes : hydraulique', ['Neutre LS = tarage du tiroir LS.', 'Circuit fermé : BP au neutre = gavage ; BP en marche = limiteur de balayage (plus bas).', 'Service maxi = annulation de débit, sous les soupapes HP.'], 'VITESSE = débit · FORCE = pression', ['Symptôme', 'Nombre de récepteurs', 'Nombre de sens', 'Composant'], ['1 sens = une ligne', '2 sens = amont du distributeur'], 'Lis les tarages sur le schéma : la question change le chiffre, pas la logique.')],
    questions: [
      { l: 'uv2-var-hydro', q: 'Sur une pelle Load-Sensing, le tiroir LS est taré à 25 b, l’annulation de débit à 260 b et le limiteur principal à 300 b. Pression de service au neutre ?', c: ['25 bar', '260 bar', '300 bar'], e: 'Au neutre, la pompe LS se met en veille à la valeur du tiroir LS.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Même pelle : vérin en butée, fonctionnement normal. Pression lue ?', c: ['260 bar (annulation de débit)', '300 bar (limiteur principal)', '25 bar (tiroir LS)'], e: 'En butée, l’annulation de débit ramène la pompe à débit nul avant le limiteur principal (sécurité).', w: 'Si on lit la valeur du limiteur principal en butée → défaut de l’annulation de débit.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Transmission hydrostatique : limiteur de gavage 25 b, limiteur de balayage 22 b, annulation 300 b, soupapes HP 350 b. Pression de la branche BP en marche ?', c: ['22 bar', '25 bar', '0 bar'], e: 'En marche, le tiroir de balayage relie la BP au limiteur de balayage, taré plus bas que le gavage : 22 b.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Même transmission : pression BP au neutre ?', c: ['25 bar (limiteur de gavage)', '22 bar (limiteur de balayage)', '350 bar'], e: 'Au neutre le tiroir de balayage est fermé : c’est le limiteur de gavage qui fixe la BP.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Même transmission : pression de service maximale de la branche HP ?', c: ['300 bar', '350 bar', '25 bar'], e: 'L’annulation de débit (300 b) coupe avant les soupapes HP (350 b), qui ne servent que d’anti-choc.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Le bras de flèche descend normalement mais ne monte plus en charge (à vide il monte). Diagnostic ?', c: ['Problème de force → pression, 1 récepteur, 1 sens → limiteur secondaire de la ligne de montée', 'Problème de vitesse → débit, tous les récepteurs → pompe', 'Problème de force → pression, tous les récepteurs → limiteur principal'], e: 'Manque de force = pression ; un seul récepteur dans un seul sens → composant sur une seule ligne d’utilisation.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Tous les mouvements de la machine sont lents, la force est normale. Diagnostic ?', c: ['Problème de débit sur un composant commun (pompe, régulation)', 'Problème de pression sur une ligne', 'Balance individuelle d’un récepteur'], e: 'Vitesse = débit ; tous les récepteurs → composant commun.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Un vérin de 25 cm² doit soulever 5 000 daN. Pression nécessaire ?', c: ['200 bar', '125 bar', '2 000 bar'], e: 'P = F / S = 5 000 / 25 = 200 bar.', src: SRC },
      { l: 'uv2-var-hydro', q: 'Pompe de 20 cm³/tr à 2 000 tr/min, pression 150 bar. Débit et puissance ?', c: ['40 l/min et 10 kW', '40 l/min et 6 kW', '400 l/min et 100 kW'], e: 'Q = 20 × 2 000 / 1 000 = 40 l/min ; Pu = 150 × 40 / 600 = 10 kW.', src: SRC }
    ]
  });

  REV.addExercises('equip', {
    lessons: [lesson('uv2-var-equip', 'UV2 — valeurs différentes : équipement électrique', ['Démarrage lent : batterie correcte en charge → lignes ; batterie basse à vide → recharger.', 'Binaire : poids 8-4-2-1.', 'CAN HS : 60 Ω entre H et L (2 × 120 Ω).'], 'Batterie d’abord, lignes ensuite', ['Tension à vide', 'Tension en charge', 'Chute de tension des lignes'], ['12,6 V = chargée', '9,6 V / 19,2 V mini au démarrage'], 'On ne diagnostique jamais avec une batterie déchargée.')],
    questions: [
      { l: 'uv2-var-equip', q: 'Réseau 24 V : démarreur lent ; batteries à vide 25,2 V, pendant le démarrage 21 V. Que contrôlez-vous ?', c: ['Les lignes positive et/ou négative (chute de tension)', 'Un rechargement des batteries', 'Le remplacement des batteries'], e: 'Batteries bonnes à vide et tension en charge au-dessus du mini (19,2 V en 24 V) : la batterie tient, le défaut est dans les lignes.', src: SRC },
      { l: 'uv2-var-equip', q: 'Réseau 12 V : démarreur lent ; batterie à vide 11,9 V. Première action ?', c: ['Recharger la batterie avant tout autre contrôle', 'Contrôler les lignes', 'Remplacer le démarreur'], e: '12,6 V = chargée, 12,2 V = 50 %, moins de 12 V = déchargée : on recharge d’abord.', src: SRC },
      { l: 'uv2-var-equip', q: 'Quel nombre binaire correspond au nombre décimal 12 ?', c: ['1100', '1010', '0110'], e: '12 = 8 + 4 → 1·8 + 1·4 + 0·2 + 0·1 = 1100.', src: SRC },
      { l: 'uv2-var-equip', q: 'Quel nombre décimal correspond au nombre binaire 1010 ?', c: ['10', '5', '12'], e: '1·8 + 0·4 + 1·2 + 0·1 = 10.', src: SRC },
      { l: 'uv2-var-equip', q: 'Entre CAN-H et CAN-L, contact coupé, vous mesurez 120 Ω au lieu de 60 Ω. Conclusion ?', c: ['Une résistance de terminaison est absente ou coupée', 'Le réseau est normal', 'CAN-H et CAN-L sont en court-circuit'], e: 'Deux résistances de 120 Ω en parallèle donnent 60 Ω ; on n’en mesure plus qu’une.', src: SRC },
      { l: 'uv2-var-equip', q: 'Alternateur 12 V à régulateur incorporé, moteur tournant : 16,5 V aux bornes de la batterie. Élément incriminé ?', c: ['Le régulateur', 'Les diodes de puissance', 'La lampe témoin'], e: 'Régulation normale 13,5 à 15 V : au-dessus, le régulateur ne limite plus l’excitation.', src: SRC },
      { l: 'uv2-var-equip', q: 'Circuit de charge 12 V, alternateur 9 diodes, lampe témoin grillée. Conséquence ?', c: ['L’alternateur ne débite pas (pas de pré-excitation)', 'Aucune conséquence', 'Surcharge de la batterie'], e: 'Sur un 9 diodes, la pré-excitation passe par la lampe témoin.', src: SRC }
    ]
  });

  REV.addExercises('elec', {
    lessons: [lesson('uv2-var-elec', 'UV2 — valeurs différentes : électricité générale', ['R = U / I · Ib = Ic / β · UR = Ucommande − Vbe.', 'V = U / √3 · Ueff = Umax / √2 · f = 1 / T.', '2ⁿ combinaisons.'], 'Convertir mA → A et ms → s', ['Unités de base', 'Formule', 'Calcul', 'Vérifier l’ordre de grandeur'], ['√2 = 1,414', '√3 = 1,732'], 'Transistor saturé : toute la tension sur la charge.')],
    questions: [
      { l: 'uv2-var-elec', q: 'Un relais 12 V consomme 150 mA quand le transistor est saturé (Vce = 0 V). Résistance de sa bobine ?', c: ['80 Ω', '1,8 Ω', '800 Ω'], e: 'R = U / I = 12 / 0,15 = 80 Ω.', w: 'Convertir 150 mA = 0,15 A.', src: SRC },
      { l: 'uv2-var-elec', q: 'Ic = 300 mA et β = 150. Courant de base Ib ?', c: ['2 mA', '45 mA', '0,5 mA'], e: 'Ib = Ic / β = 300 / 150 = 2 mA.', src: SRC },
      { l: 'uv2-var-elec', q: 'Tension de commande 12 V, Vbe = 0,7 V. Tension aux bornes de la résistance de base UR1 ?', c: ['11,3 V', '12,7 V', '0,7 V'], e: 'UR1 = Ucommande − Vbe = 12 − 0,7 = 11,3 V.', src: SRC },
      { l: 'uv2-var-elec', q: 'Résistance R2 entre base et émetteur : Vbe = 0,7 V, IR2 = 35 mA. Valeur de R2 ?', c: ['20 Ω', '24,5 Ω', '50 Ω'], e: 'R2 = Vbe / IR2 = 0,7 / 0,035 = 20 Ω.', src: SRC },
      { l: 'uv2-var-elec', q: 'Réseau triphasé 400 V entre phases. Tension entre une phase et le neutre ?', c: ['231 V', '693 V', '283 V'], e: 'V = U / √3 = 400 / 1,732 ≈ 231 V.', src: SRC },
      { l: 'uv2-var-elec', q: 'Une tension sinusoïdale a une valeur maximale de 311 V. Valeur efficace ?', c: ['220 V', '440 V', '180 V'], e: 'Ueff = Umax / √2 = 311 / 1,414 ≈ 220 V.', src: SRC },
      { l: 'uv2-var-elec', q: 'À l’oscilloscope, la période d’un signal alternatif est T = 20 ms. Fréquence ?', c: ['50 Hz', '20 Hz', '500 Hz'], e: 'f = 1 / T = 1 / 0,020 = 50 Hz.', w: '20 ms = 0,020 s.', src: SRC },
      { l: 'uv2-var-elec', q: 'Nombre de combinaisons possibles d’une porte logique ET à 4 entrées ?', c: ['16', '8', '4'], e: '2⁴ = 16.', src: SRC },
      { l: 'uv2-var-elec', q: 'Porte ET à 3 entrées : A = 1, B = 1, C = 0. Sortie S ?', c: ['S = 0', 'S = 1', 'S = 2'], e: 'ET : S = 1 seulement si toutes les entrées sont à 1 ; un seul 0 suffit à donner 0.', src: SRC },
      { l: 'uv2-var-elec', q: 'Appliquez De Morgan : (A + B)‾ = ?', c: ['Ā · B̄', 'Ā + B̄', 'A · B'], e: 'Casser la barre et changer le signe : (A + B)‾ = Ā · B̄.', src: SRC }
    ]
  });
})();
