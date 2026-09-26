REV.add({
  id: 'pplog', name: 'PPLOG — cas pratiques', icon: '🚛', color: '#4d7c0f',
  desc: 'Direction hydraulique, turbo, dépollution, alimentation gasoil, électricité (le freinage PPLOG est en pneumatique).',
  lessons: [
    {
      id: 'direction', title: 'Direction assistée et ASR',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Moteur tournant, véhicule roulant : témoin 6 allumé, 3 éteint</td><td>Plus de pression sur le 1ᵉʳ circuit (pompe ou circuit HS). L’assistance reste à l’essieu AV par la direction assistée ; le 2ᵉ essieu est mené par la tringlerie → direction dure.</td></tr>
<tr><td>Défaillance du circuit principal : états des témoins</td><td>Moteur éteint contact mis : T1 éteint (anormal), T2 allumé · moteur en marche à l’arrêt : T1 allumé, T2 allumé · en roulant : T1 allumé, T2 éteint</td></tr>
<tr><td>Contrôler le limiteur n°14</td><td>Braquer à fond à droite avec une <b>cale entre la butée mécanique et la barre de direction</b> : la cale empêche la butée mécanique, c’est le limiteur qui travaille.</td></tr>
<tr><td>Composant n°12</td><td>Soupape de limitation de braquage</td></tr>
<tr><td>Fonctionnement de l’ASR</td><td>Capteurs ABS → début de patinage → électrovanne ASR → pression de commande à la valve relais → vases de frein AR. Limite l’accélération des roues motrices.</td></tr></table></div>`,
      retenir: ['Contrôle d’un limiteur de direction : cale entre butée mécanique et barre.', 'ASR : capteurs ABS → électrovanne ASR → valve relais → vases AR.'],
      memo: { cle: 'ASR = FREINER LA ROUE QUI PATINE', flow: ['Capteurs ABS', 'Début de patinage', 'Électrovanne ASR', 'Valve relais', 'Vases de frein AR'], points: ['Cale contre la butée → le limiteur travaille'], astuce: 'Pour tester un limiteur, empêche la butée mécanique de faire son travail.' }
    },
    {
      id: 'turbo', title: 'Turbo à géométrie variable et frein moteur',
      html: `
<ul><li><b>Turbo à géométrie variable (P62)</b> : air à l’électrovanne d’arrêt → filtre → au contact, électrovanne VGT ouverte à 60 % → actionneur turbine → info au calculateur. Contact coupé : l’électrovanne d’arrêt vide le circuit pour protéger l’électrovanne VGT.</li>
<li><b>Utilité</b> : meilleur rendement, moins de consommation, moins de pollution (Euro 5).</li>
<li><b>Manque de puissance + ralentisseur peu efficace</b> → <b>turbo HS</b> : le frein moteur passe par le turbo à géométrie variable.</li>
<li><b>Frein moteur</b> : injection coupée pendant son action, réactivation sous 600 tr/min, électrovanne VGT alimentée par la centrale.</li>
<li>Composants du frein moteur : IBC, VCM (calculateur maître), tableau de bord, pédales accélérateur et frein, interrupteur frein moteur, ECM, électrovanne frein moteur. Bornes du bus : VDB et ECB.</li>
<li><b>Blow-by</b> : le filtre sépare l’huile (renvoyée au carter) des gaz (réinjectés à l’admission).</li></ul>`,
      retenir: ['Manque de puissance + ralentisseur faible = turbo HS.', 'Frein moteur : injection coupée, réactivée sous 600 tr/min.', 'VGT ouverte à 60 % au contact.'],
      memo: { cle: 'FREIN MOTEUR = TURBO VGT', points: ['Turbo HS → puissance ET ralentisseur en baisse', 'Injection coupée, reprise < 600 tr/min', 'Blow-by : huile au carter, gaz à l’admission'], astuce: 'Si le moteur ne pousse plus ET ne retient plus, regarde le turbo.' }
    },
    {
      id: 'gasoil', title: 'Alimentation gasoil',
      html: `
<ul><li><b>Soupape de pression résiduelle 0,3 bar</b> : empêche la culasse de se vider moteur arrêté.</li>
<li><b>Démarrage anormalement long à 20 °C</b> : clapet de pression résiduelle 0,3 bar resté ouvert → le circuit se désamorce.</li>
<li><b>Démarre après purge, difficile le lendemain</b> : finir la purge par la culasse (petit purgeur côté ventilateur) ; vérifier la pompe manuelle du préfiltre et le clapet 0,3 bar.</li>
<li>Remplacer un injecteur-pompe : programmer dans la centrale le code gravé sur l’injecteur.</li></ul>`,
      retenir: ['Clapet 0,3 bar = garde la culasse pleine moteur arrêté.', 'Démarrage long à chaud = clapet 0,3 bar resté ouvert.'],
      memo: { cle: '0,3 BAR = CULASSE PLEINE', points: ['Clapet ouvert → désamorçage → démarrage long', 'Purge : finir par la culasse', 'Injecteur-pompe neuf → programmer son code'], astuce: 'Démarre bien après purge, mal le lendemain ? Le gasoil redescend la nuit.' }
    },
    {
      id: 'adblue', title: 'AdBlue, OPEX et divers',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Circuit d’air à la pression de régulation (10,5 bar)</td><td>L’APU commande l’économie d’énergie du compresseur : plus de compression, décharge vers l’alimentation</td></tr>
<tr><td>Vanne multivoies 4/2</td><td>Vidange et remplissage de l’AdBlue</td></tr>
<tr><td>Conditions d’activation de l’AdBlue</td><td>T° moteur &gt; 40 °C · T° catalyseur &gt; 180 °C · régime &gt; 400 tr/min · couple &gt; 5 %</td></tr>
<tr><td>Procédure OPEX (neutralisation)</td><td>Neutraliser l’AdBlue ; désactiver le coupe-circuit extérieur</td></tr>
<tr><td>Télérupteurs en OPEX</td><td>2 ; les neutraliser en débranchant le connecteur derrière la console de commande de la BV</td></tr>
<tr><td>Changer la pile du chronotachygraphe</td><td>Le retirer sans le débrancher (il reste alimenté)</td></tr>
<tr><td>Remplacer un injecteur-pompe</td><td>Programmer dans la centrale le code gravé sur l’injecteur</td></tr></table></div>`,
      retenir: ['AdBlue : 40 °C moteur, 180 °C cata, 400 tr/min, 5 % de couple.', 'Vanne 4/2 = vidange/remplissage AdBlue.', 'OPEX : neutraliser l’AdBlue + désactiver le coupe-circuit extérieur.'],
      memo: { cle: 'ADBLUE : 40 · 180 · 400 · 5 %', points: ['OPEX : 2 télérupteurs à neutraliser', 'Pile du chrono : retirer sans débrancher', 'APU : économie d’énergie du compresseur à 10,5 bar'], astuce: 'En OPEX, on coupe l’AdBlue : pas de station AdBlue dans le désert.' }
    }
  ],
  questions: [
    { l: 'direction', q: 'PPLOG roulant : témoin 6 allumé, témoin 3 éteint. Diagnostic ?', c: ['Plus de pression sur le 1ᵉʳ circuit (pompe ou circuit HS)', 'Défaut de l’ASR', 'Turbo HS', 'Clapet 0,3 bar ouvert'], e: 'L’assistance reste à l’essieu AV ; le 2ᵉ essieu est mené par la tringlerie → direction dure.' },
    { l: 'direction', q: 'Comment contrôler le limiteur de pression n°14 de la direction ?', c: ['Braquer à fond avec une cale entre la butée mécanique et la barre de direction', 'Débrancher la pompe', 'Mesurer au ralenti sans braquer', 'Déposer le limiteur'], e: 'La cale empêche la butée mécanique : c’est alors le limiteur qui travaille et on lit son tarage.' },
    { l: 'direction', q: 'Composant n°12 du circuit de direction PPLOG ?', c: ['Soupape de limitation de braquage', 'Limiteur de gavage', 'Électrovanne ASR', 'Valve VGT'], e: 'Réponse de la fiche cas pratiques PPLOG.' },
    { l: 'direction', q: 'Rôle de l’ASR sur le PPLOG ?', c: ['Limiter l’accélération (patinage) des roues motrices', 'Empêcher le blocage des roues au freinage', 'Corriger le sous-virage', 'Réguler la pression de direction'], e: 'Capteurs ABS → début de patinage → électrovanne ASR → valve relais → vases de frein AR.' },
    { l: 'turbo', q: 'Manque de puissance ET ralentisseur peu efficace. Cause ?', c: ['Turbo HS', 'Clapet 0,3 bar ouvert', 'Injecteur-pompe non programmé', 'AdBlue vide'], e: 'Le frein moteur passe par le turbo à géométrie variable : un turbo HS affecte les deux.' },
    { l: 'turbo', q: 'Utilité du turbo à géométrie variable ?', c: ['Meilleur rendement, moins de consommation, moins de pollution', 'Augmenter la cylindrée', 'Refroidir les gaz d’échappement', 'Supprimer l’EGR'], e: 'Il adapte la section de la turbine au régime (Euro 5).' },
    { l: 'turbo', q: 'Pendant l’action du frein moteur, l’injection…', c: ['Est coupée, puis réactivée sous 600 tr/min', 'Reste au ralenti', 'Est augmentée', 'Passe en pré-injection'], e: 'L’injection est coupée et reprend sous 600 tr/min ; l’électrovanne VGT est alimentée par la centrale.' },
    { l: 'turbo', q: 'Système blow-by : que devient l’huile séparée par le filtre ?', c: ['Elle est renvoyée au carter', 'Elle est réinjectée à l’admission', 'Elle est brûlée dans le FAP', 'Elle est stockée dans un bocal'], e: 'L’huile retourne au carter ; les gaz sont réinjectés à l’admission.' },
    { l: 'gasoil', q: 'Rôle de la soupape de pression résiduelle 0,3 bar ?', c: ['Empêcher la culasse de se vider moteur arrêté', 'Limiter la pression de rampe', 'Protéger le préfiltre', 'Régler le débit d’injection'], e: 'Elle garde du gasoil sous légère pression dans la culasse pour un démarrage immédiat.' },
    { l: 'gasoil', q: 'Démarrage anormalement long à 20 °C. Cause probable ?', c: ['Clapet de pression résiduelle 0,3 bar resté ouvert', 'Gasoil figé', 'Bougies de préchauffage HS', 'Turbo HS'], e: 'Le circuit se désamorce à l’arrêt : il faut réamorcer à chaque démarrage.' },
    { l: 'gasoil', q: 'Le moteur démarre après une purge, mais difficilement le lendemain. Que faire ?', c: ['Finir la purge par la culasse et vérifier la pompe du préfiltre et le clapet 0,3 bar', 'Changer le turbo', 'Programmer les injecteurs', 'Neutraliser l’AdBlue'], e: 'De l’air reste dans la culasse ou le gasoil redescend : purgeur côté ventilateur, pompe manuelle, clapet 0,3 bar.' },
    { l: 'adblue', q: 'Rôle de la vanne multivoies 4/2 sur le PPLOG ?', c: ['Vidange et remplissage de l’AdBlue', 'Commander la remorque', 'Piloter le turbo', 'Isoler la direction'], e: 'Réponse de la fiche PPLOG.' },
    { l: 'adblue', q: 'Procédure OPEX (neutralisation) :', c: ['Neutraliser l’AdBlue et désactiver le coupe-circuit extérieur', 'Déposer le FAP', 'Couper l’ABS', 'Débrancher le chronotachygraphe'], e: 'En opération, l’AdBlue est neutralisé et le coupe-circuit extérieur désactivé.' },
    { l: 'adblue', q: 'Changement de la pile du chronotachygraphe :', c: ['Le retirer sans le débrancher (il reste alimenté)', 'Débrancher la batterie', 'Débrancher le chronotachygraphe', 'Le faire en atelier agréé uniquement'], e: 'Il doit rester alimenté pendant l’opération.' },
    { l: 'adblue', q: 'Combien de télérupteurs à neutraliser en OPEX, et comment ?', c: ['2, en débranchant le connecteur derrière la console de commande de la BV', '1, en retirant son fusible', '4, en coupant la batterie', 'Aucun'], e: 'Réponse de la fiche PPLOG.' },
    { l: 'adblue', q: 'À la pression de régulation (10,5 bar), que commande l’APU ?', c: ['L’économie d’énergie du compresseur (décharge)', 'Le remplissage d’AdBlue', 'Le turbo VGT', 'L’ASR'], e: 'Plus de compression : le compresseur décharge vers l’alimentation.' }
  ]
});
