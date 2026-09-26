REV.add({
  id: 'tact', name: 'Culture tactique', icon: '🎯', color: '#15803d',
  desc: 'Topographie, ALAT, génie / IED, artillerie, arme blindée-cavalerie (tirés des photos de tests).',
  lessons: [
    {
      id: 'topo', title: 'Topographie',
      html: `
<ul><li><b>Échelle</b> : plus le dénominateur est petit, plus la carte est détaillée → le 1/25 000 est plus précis que le 1/200 000.</li>
<li><b>Distance sur carte</b> : 3 cm au 1/50 000 = 3 × 50 000 = 150 000 cm = <b>1,5 km</b>. Astuce : au 1/50 000, 1 cm = 500 m.</li>
<li><b>Équidistance</b> : différence d’altitude entre 2 courbes de niveau.</li>
<li><b>Fuseaux UTM</b> : 60 fuseaux de 6°.</li>
<li><b>Formule du millième</b> : <span class="formula">D (km) = L (m) / angle (millièmes)</span>. Char de 7 m vu sous 5 millièmes → 7/5 = <b>1,4 km</b>.</li></ul>`,
      retenir: ['Petit dénominateur = carte précise.', '1/50 000 : 1 cm = 500 m.', 'D (km) = L (m) / millièmes.', '60 fuseaux.'],
      memo: { cle: 'D = L / M', points: ['1/25 000 plus précis que 1/200 000', '3 cm au 1/50 000 = 1,5 km', 'Équidistance = écart d’altitude entre courbes', '60 fuseaux UTM de 6°'], astuce: 'Formule du millième : « Des Lunettes sur le Mètre » — D = L / M.' }
    },
    {
      id: 'alat', title: 'ALAT — appui-feu hélicoptère (AFH)',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>AFH</td><td>Appui-feu hélicoptère</td></tr>
<tr><td>Marquer sa position</td><td>Jour : PN2A, fumigènes, marques blanches au sol, héliographe · Nuit : strobe light, héliographe, cyalume au bout d’une ficelle</td></tr>
<tr><td>Armement du Tigre HAP</td><td>Canon de 30 mm + 22 roquettes de 68 mm</td></tr>
<tr><td>Distance minimale de l’ennemi pour un AFH</td><td>200 à 300 m</td></tr>
<tr><td>Qui autorise l’engagement ?</td><td>L’élément appuyé</td></tr></table></div>`,
      retenir: ['Tigre HAP : canon 30 mm + 22 roquettes de 68 mm.', 'AFH : 200 à 300 m de l’ennemi minimum.', 'L’élément appuyé autorise l’engagement.'],
      memo: { cle: 'AFH = APPUI-FEU HÉLICOPTÈRE', points: ['Jour : fumigènes, PN2A, héliographe', 'Nuit : strobe, cyalume', 'Tigre : 30 mm + 22 × 68 mm', '200–300 m mini'], astuce: 'C’est celui qu’on appuie qui dit « feu ».' }
    },
    {
      id: 'genie', title: 'Génie — IED et obstacles',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Les 5C</td><td>Confirmer – se Couvrir – Communiquer – Cordon (mise en place) – Contrôler la zone</td></tr>
<tr><td>Familles d’IED</td><td>VOIED, COIED, TIED</td></tr>
<tr><td>Méthodes du 5/25</td><td>Haricot, escargot</td></tr>
<tr><td>Quand faire un 5/25 ?</td><td>Sur ordre, et à tout arrêt de courte ou longue durée</td></tr>
<tr><td>IED, véhicule touché sans blessé</td><td>« GO GO » : s’extraire au plus vite, compte rendu immédiat, poursuite de l’itinéraire</td></tr>
<tr><td>SPRAT</td><td>Système de pose rapide de travure</td></tr>
<tr><td>Obstacle préliminaire / de manœuvre</td><td>Mis en œuvre dès la pose / activé sur ordre de l’autorité qualifiée</td></tr>
<tr><td>Obstacle efficace</td><td>Difficilement contournable, battu par les feux, découvert le plus tard possible</td></tr></table></div>`,
      retenir: ['5C : Confirmer, se Couvrir, Communiquer, Cordon, Contrôler.', '5/25 : haricot ou escargot, à chaque arrêt.', 'Touché sans blessé = GO GO.'],
      memo: { cle: '5C · 5/25 · GO GO', points: ['VOIED · COIED · TIED', 'Obstacle efficace : incontournable, battu par les feux, découvert tard', 'SPRAT = pose rapide de travure'], astuce: '5/25 : 5 m autour de moi à la loupe, 25 m aux jumelles.' }
    },
    {
      id: 'artillerie', title: 'Artillerie et arme blindée-cavalerie',
      html: `
<div class="tw"><table><tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Portée maxi du CAESAR</td><td>38 km (40 à 42 km selon munitions et versions : à vérifier)</td></tr>
<tr><td>Obus ACED</td><td>Anti-char à effet dirigé</td></tr>
<tr><td>ERI</td><td>Escadron de reconnaissance et d’intervention</td></tr>
<tr><td>Peloton Leclerc</td><td>Structure quaternaire : 4 Leclerc + 4 VBL</td></tr>
<tr><td>Régiments de combat léger blindé</td><td>1ᵉʳ RS, 1ᵉʳ RIMa, RICM, 1ᵉʳ RHP, 4ᵉ RCh, 3ᵉ RH, 1ᵉʳ REC</td></tr>
<tr><td>Remplaçant de l’AMX 10 RC (SCORPION)</td><td>EBRC Jaguar</td></tr></table></div>`,
      retenir: ['CAESAR ≈ 38 km.', 'Peloton Leclerc : 4 Leclerc + 4 VBL.', 'AMX 10 RC → EBRC Jaguar.'],
      memo: { cle: 'JAGUAR REMPLACE L’AMX 10 RC', points: ['ACED = anti-char à effet dirigé', 'ERI = escadron de reconnaissance et d’intervention', 'Peloton Leclerc quaternaire'], astuce: 'Un peloton Leclerc, c’est 4 + 4.' }
    }
  ],
  questions: [
    { l: 'topo', q: 'Quelle échelle est la plus précise ?', c: ['1/25 000', '1/200 000', '1/100 000', '1/50 000'], e: 'Plus le dénominateur est petit, plus la carte est détaillée.' },
    { l: 'topo', q: '3 cm sur une carte au 1/50 000 représentent :', c: ['1,5 km', '15 km', '150 m', '3 km'], e: '3 × 50 000 = 150 000 cm = 1,5 km. Au 1/50 000, 1 cm = 500 m.' },
    { l: 'topo', q: 'L’équidistance, c’est :', c: ['La différence d’altitude entre 2 courbes de niveau', 'La distance entre deux points cotés', 'L’écart entre deux fuseaux', 'La distance entre deux quadrillages'], e: 'Elle est indiquée dans la marge de la carte.' },
    { l: 'topo', q: 'Nombre de fuseaux UTM ?', c: ['60', '24', '36', '90'], e: '60 fuseaux de 6° font le tour de la Terre (360°).' },
    { l: 'topo', q: 'Un char de 7 m est vu sous 5 millièmes. À quelle distance est-il ?', c: ['1,4 km', '35 km', '0,7 km', '14 km'], e: 'D (km) = L (m) / angle (millièmes) = 7 / 5 = 1,4 km.' },
    { l: 'alat', q: 'Armement du Tigre HAP ?', c: ['Canon de 30 mm + 22 roquettes de 68 mm', 'Canon de 20 mm + 8 missiles HOT', 'Mitrailleuse 12,7 mm uniquement', 'Canon de 105 mm'], e: 'Réponse des tests.' },
    { l: 'alat', q: 'Distance minimale de l’ennemi pour un appui-feu hélicoptère ?', c: ['200 à 300 m', '50 m', '1 à 2 km', '10 m'], e: 'Réponse des tests.' },
    { l: 'alat', q: 'Qui autorise l’engagement d’un AFH ?', c: ['L’élément appuyé', 'Le pilote', 'Le chef de corps', 'L’état-major'], e: 'C’est l’unité appuyée qui autorise le tir.' },
    { l: 'alat', q: 'Moyen de marquer sa position de NUIT pour l’ALAT ?', c: ['Strobe light (ou cyalume au bout d’une ficelle)', 'Fumigènes', 'Marques blanches au sol', 'Panneau PN2A'], e: 'Jour : PN2A, fumigènes, marques au sol, héliographe. Nuit : strobe, héliographe, cyalume.' },
    { l: 'genie', q: 'Que signifient les 5C (IED) ?', c: ['Confirmer, se Couvrir, Communiquer, Cordon, Contrôler', 'Chercher, Creuser, Couper, Cacher, Courir', 'Contact, Compte rendu, Couverture, Contournement, Combat', 'Confirmer, Courir, Crier, Couvrir, Compter'], e: 'Réponse des tests génie.' },
    { l: 'genie', q: 'Quand faire un 5/25 ?', c: ['Sur ordre, et à tout arrêt de courte ou longue durée', 'Uniquement la nuit', 'Uniquement en convoi de plus de 10 véhicules', 'Seulement après une explosion'], e: 'Méthodes : haricot, escargot.' },
    { l: 'genie', q: 'IED : véhicule touché sans blessé. Réaction ?', c: ['« GO GO » : s’extraire, compte rendu immédiat, poursuivre l’itinéraire', 'S’arrêter et fouiller la zone', 'Faire demi-tour immédiatement', 'Attendre les secours sur place'], e: 'On ne reste pas dans la zone de l’embuscade.' },
    { l: 'genie', q: 'Un obstacle efficace est…', c: ['Difficilement contournable, battu par les feux, découvert le plus tard possible', 'Visible de loin pour dissuader', 'Posé sans surveillance', 'Toujours activé dès la pose'], e: 'Obstacle préliminaire = mis en œuvre dès la pose ; de manœuvre = activé sur ordre.' },
    { l: 'artillerie', q: 'Que remplace l’EBRC Jaguar (programme SCORPION) ?', c: ['L’AMX 10 RC', 'Le VBL', 'Le Leclerc', 'Le VAB'], e: 'Le VDAE remplace le VBL et le VB2L.' },
    { l: 'artillerie', q: 'Composition d’un peloton Leclerc ?', c: ['4 Leclerc + 4 VBL (structure quaternaire)', '3 Leclerc + 3 VBL', '4 Leclerc seuls', '6 Leclerc + 2 VAB'], e: 'Réponse des tests ABC.' },
    { l: 'artillerie', q: 'Que signifie ACED ?', c: ['Anti-char à effet dirigé', 'Artillerie de campagne à effet différé', 'Arme courte d’emploi défensif', 'Appui canon et engins divers'], e: 'Obus ACED : anti-char à effet dirigé.' },
    { l: 'artillerie', q: 'Portée maxi du CAESAR retenue dans tes tests ?', c: ['38 km', '8 km', '100 km', '18 km'], e: '38 km (40 à 42 km selon munitions et versions : à vérifier).' }
  ]
});
