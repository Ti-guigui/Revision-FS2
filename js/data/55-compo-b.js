/* Composante B (IA – B commune ECOMAT 2024-2025) : questionnaire recopié mot pour mot.
   Réponses cochées sur la copie ; celles qui ne se vérifient pas dans les documents fournis sont marquées « à confirmer ». */
REV.addExercises('tact', {
  lessons: [
    {
      id: 'compo-b', title: 'Questionnaire IA – B commune ECOMAT 2024-2025 (Composante B)',
      html: `
<h3>Énoncé</h3>
<p>QCM de 20 questions, <b>une seule bonne réponse par question</b>, recopié mot pour mot. Les réponses sont celles cochées sur la copie. Ces sujets ne figurent dans aucun des cours fournis : les réponses marquées <b>« à confirmer »</b> sont à vérifier avec le formateur.</p>
<h3>À retenir</h3>
<div class="tw"><table><tr><th>Thème</th><th>Réponse</th></tr>
<tr><td>VBCI</td><td>Canon de 25 mm</td></tr>
<tr><td>Cavalerie blindée</td><td>Protection, mobilité, puissance de feu</td></tr>
<tr><td>Obus de char Leclerc</td><td>Portée maxi 4 000 m</td></tr>
<tr><td>Défense antiaérienne très courte portée</td><td>Missile MISTRAL</td></tr>
<tr><td>LRU</td><td>70 à 84 km</td></tr>
<tr><td>EBG / SOUVIM</td><td>Engin blindé du génie / ouverture d’itinéraire en zone minée</td></tr>
<tr><td>Convention d’Ottawa (1997)</td><td>Interdiction totale des mines anti-personnel</td></tr>
<tr><td>4ᵉ BAC</td><td>3 régiments d’hélicoptères de combat</td></tr>
<tr><td>Tigre HAD</td><td>Missile Hellfire, roquettes 68 mm, canon 30 mm</td></tr>
<tr><td>LATTA : mesures actives</td><td>Guet aérien et riposte</td></tr>
<tr><td>SRM</td><td>1 CDS, 1 équipe RDC, 1 équipe ECM, 1 équipe APPRO, plusieurs équipes réparation</td></tr>
<tr><td>Capteur de renseignement</td><td>Couple détecteur + vecteur</td></tr>
<tr><td>61ᵉ RA</td><td>SDT Patroller (drone)</td></tr></table></div>`,
      retenir: ['VBCI : canon de 25 mm.', 'LRU : 70 à 84 km ; obus Leclerc : 4 000 m.', 'Ottawa 1997 : mines anti-personnel.', 'Tigre HAD : Hellfire, roquettes 68 mm, canon 30 mm.', 'Capteur de renseignement = détecteur + vecteur.'],
      pieges: ['Tigre HAD : deux cases cochées sur la copie ; la bonne est « Hellfire, roquettes 68 mm, canon 30 mm » (le HOT et le canon 20 mm équipaient la Gazelle).'],
      memo: { cle: 'COMPOSANTE B : CONNAÎTRE LES ARMES ET LES SIGLES', points: ['EBG = engin blindé du génie', 'SOUVIM = ouverture d’itinéraire miné', 'LATTA actif = guet + riposte'], astuce: 'Détecteur + vecteur = capteur.' }
    }
  ],
  questions: [
    { a: 2, q: '1. Quelle est la principale arme d’appui dont dispose une compagnie de combat d’infanterie en interne ?', c: ['Le lance grenades individuel', 'Le mortier de 120mm', 'Le mortier de 81mm', 'Le missile MISTRAL'], e: 'Réponse cochée sur la copie : le mortier de 81 mm.', w: 'À confirmer avec le formateur : non vérifiable dans les documents fournis.' },
    { a: 1, q: '2. Quel est l’armement principal du VBCI ?', c: ['Mitrailleuse de 12,7mm', 'Canon de 25mm', 'Canon de 40mm', 'Canon de 105mm'], e: 'Le VBCI est armé d’un canon de 25 mm.' },
    { a: 1, q: '3. Quelles sont les aptitudes principales des unités de cavalerie blindée ?', c: ['Endurance, discrétion, mobilité', 'Protection, mobilité, puissance de feu', 'Autonomie, protection, combat urbain', 'Masse, puissance de feu, lutte anti-aérienne'], e: 'Cavalerie blindée : protection, mobilité, puissance de feu.' },
    { a: 3, q: '4. Quelle est la portée maximale d’un obus de char Leclerc ?', c: ['400 mètres', '40 km', '40 000 mètres', '4 000 mètres'], e: 'Réponse cochée : 4 000 m.' },
    { a: 1, q: '5. Quel est le moyen de défense antiaérienne très courte portée mis en œuvre par l’armée de Terre ?', c: ['Le missile MMP', 'Le missile MISTRAL', 'La roquette AT4CS', 'La roquette unitaire'], e: 'Le MISTRAL est le missile sol-air très courte portée. Le MMP est un missile antichar.' },
    { a: 3, q: '6. Quelle est la portée maximum du LRU ?', c: ['8 à 13 km', '24 à 27 km', '38 à 42 km', '70 à 84 km'], e: 'LRU (lance-roquettes unitaire) : 70 à 84 km. À ne pas confondre avec le CAESAR (≈ 38 km).' },
    { a: 2, q: '7. Qu’est-ce qu’un EBG ?', c: ['Equipe de brouillage du génie', 'Elément de balisage du génie', 'Engin blindé du génie', 'Electronical Bridge Ground'], e: 'EBG = engin blindé du génie.' },
    { a: 0, q: '8. Qu’est-ce qu’un SOUVIM ?', c: ['Un engin permettant l’ouverture d’itinéraire en zone minée', 'Un drone tactique du génie', 'Un système de pont hydraulique', 'Un outil de production d’eau douce'], e: 'SOUVIM = système d’ouverture d’itinéraire miné.' },
    { a: 1, q: '9. Que prévoit la convention d’Ottawa adoptée en 1997 ?', c: ['L’interdiction totale des mines', 'L’interdiction totale des mines anti-personnel', 'L’interdiction totale des mines anti-char', 'L’interdiction partielle des sous-munitions'], e: 'Convention d’Ottawa (1997) : interdiction totale des mines anti-personnel.' },
    { a: 1, q: '10. Quelle est la réaction attendue face à une mine ou une zone minée ?', c: ['Renseigner, avertir, stopper, marquer, quitter', 'Stopper, avertir, renseigner, quitter, marquer', 'Avertir, marquer, quitter, stopper, renseigner', 'Stopper, renseigner, marquer, avertir, quitter'], e: 'Réponse cochée : stopper, avertir, renseigner, quitter, marquer.', w: 'À confirmer avec le formateur : l’ordre des actions n’est pas dans les documents fournis.' },
    { a: 1, q: '11. Combien de régiments d’hélicoptères de combat appartiennent à la 4ᵉ BAC ?', c: ['2', '3', '4', '5'], e: 'Réponse cochée : 3 régiments d’hélicoptères de combat.' },
    { a: 3, q: '12. Quel est l’armement du Tigre HAD ?', c: ['MMP, Canon 40mm, mitrailleuse 7,62mm', 'Missile HOT, canon 20mm', 'Mistral, roquettes 70mm, canon 25mm', 'Missile Hellfire, roquettes 68mm et canon 30mm'], e: 'Tigre HAD : missile Hellfire, roquettes de 68 mm et canon de 30 mm. (Deux cases cochées sur la copie : c’est celle-ci.)' },
    { a: 2, q: '13. Quelles sont les mesures actives de protection LADA / LATTA ?', c: ['Recherche et rendre compte', 'Se camoufler et décevoir', 'Guet aérien et riposte', 'L’arme individuel et l’arme collective'], e: 'Mesures actives : guet aérien et riposte. Se camoufler et décevoir = mesures passives.' },
    { a: 0, q: '14. Pour un tir d’accompagnement à correction constante sur un aéronef lent, quelle correction doit-on effectuer ?', c: ['Tirer trois à cinq longueurs devant', 'Pas de correction s’il est lent', 'Dix longueurs devant l’objectif', 'On utilise un brouilleur portatif'], e: 'Réponse cochée : tirer 3 à 5 longueurs devant.', w: 'À confirmer avec le formateur : non vérifiable dans les documents fournis.' },
    { a: 0, q: '15. Une SRM est composée de…', c: ['1 CDS, 1 équipe RDC, 1 équipe ECM, 1 équipe APPRO et plusieurs équipes réparation.', '1 CDS, plusieurs équipes RDC, 2 équipe ECM, 1 équipe APPRO et 1 équipe réparation.', '1 CDS, 1 équipe RDC, 2 équipes ECM, plusieurs équipes APPRO et plusieurs équipes réparation.'], e: 'Comme la SMR : un RDC, une ECM et un APPRO pour plusieurs équipes de réparation.' },
    { a: 0, q: '16. La zone d’implantation (ZI) de la SRM est située…', c: ['à environ 30km de l’unité soutenue. Sa superficie doit être favorable à l’installation des ateliers de réparation et aux mouvements entrant/sortant des matériels soutenus. Elle doit offrir des opportunités pour faciliter sa propre défense.', 'à environ 60km de l’unité soutenue. Sa superficie doit être favorable à l’installation des ateliers de réparation et à l’exfiltration immédiate en cas d’attaque. Elle doit offrir des opportunités pour faciliter le stockage des approvisionnements.', 'à environ 15km de l’unité soutenue. Sa superficie doit impérativement permettre de camoufler les matériels et de veiller à la discrétion des équipes de réparation. Elle doit offrir des opportunités pour faciliter sa défense par l’unité soutenue.'], e: 'Réponse cochée : environ 30 km, superficie favorable aux ateliers et aux mouvements, défense propre facilitée.', w: 'À confirmer avec le formateur : non vérifiable dans les documents fournis.' },
    { a: 1, q: '17. A partir de quel niveau de protection NRBC doit-on porter les chaussettes carbonées ?', c: ['Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4'], e: 'Réponse cochée : niveau 2.', w: 'À confirmer avec le formateur : les niveaux de protection NRBC ne sont pas dans les documents fournis.' },
    { a: 3, q: '18. Quel type d’agent chimique est employé par les FAR sur le territoire ukrainien ?', c: ['Phosgène', 'Sarin', 'Novitchok', 'Lacrymogène'], e: 'Réponse cochée : agents lacrymogènes.' },
    { a: 0, q: '19. Qu’est-ce qu’un capteur de renseignement ?', c: ['Un couple détecteur + vecteur', 'Une plate-forme mobile capable d’emporter un vecteur', 'Une plate-forme mobile capable d’emporter un détecteur', 'Un enregistreur'], e: 'Capteur = détecteur (ce qui voit) + vecteur (ce qui le porte).' },
    { a: 3, q: '20. Quel est l’équipement majeur du 61ᵉ régiment d’artillerie ?', c: ['Lance-roquette unitaire', 'AUF1', 'CAESAR', 'SDT Patroller'], e: 'Le 61ᵉ RA met en œuvre les drones : SDT Patroller.' }
  ].map(function (q) { q.l = 'compo-b'; q.fixed = true; q.src = 'Questionnaire IA – B commune ECOMAT 2024-2025 (copie cochée)'; return q; })
});
