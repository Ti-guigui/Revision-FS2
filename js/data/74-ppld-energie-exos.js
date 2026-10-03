/* PPLD — analyse énergétique : exercices à compléter, phase par phase (schéma coloré au-dessus, calculs à remplir
   en dessous, correction expliquée). Phases du stagiaire (PDF « Phase de fonctionnement ») et phases du cahier de cours.
   Formule : Pu (kW) = p (bar) × Q (L/min) / 600. Abréviations : voir ABR. */
(function () {
  var I = 'ppld/';
  var COL = { rouge: '#dc2626', violet: '#7c3aed', magenta: '#c026d3', bordeaux: '#9f1239', vert: '#16a34a', bleu: '#2563eb', jaune: '#f59e0b', noir: '#111827', orange: '#ea580c' };
  var ABR = [['GAP', 'Gicleur anti-pompage'], ['Rd', 'Régulateur de débit 3 voies'], ['GD', 'Gicleur de déséquilibre'], ['Tp', 'Tête pilote'], ['Be', 'Balance d’entrée'],
    ['GDAD', 'Gicleur du dispositif d’annulation de débit'], ['DAD', 'Dispositif d’annulation de débit'], ['Dis', 'Distributeur'], ['GLF', 'Gicleur low flow (gicleur LS)'],
    ['LPS', 'Limiteur de pression secondaire'], ['H', 'Moteur de halage'], ['CF', 'Vérins de corps de flèche']];

  /* Une phase : t (titre), img, src, leg [[couleur, texte]], data (énoncé), rows [{lab, t: [[p, q], …], r (résultat affiché), why}], sum (vérification), note */
  var PH = [
    { grp: 'Stabilisateurs (bloc CETOP, système débit)' },
    { id: 'stab-neutre', t: 'Stabilisateurs au neutre', img: 'stabs-neutre', src: 'cahier', leg: [['rouge', '30 b'], ['bleu', '0 b'], ['jaune', 'pression de maintien']],
      data: 'Distributeurs au neutre. La pompe est en stand-by.',
      rows: [{ lab: 'Pu-pompe', t: [[30, 1]], r: '0,05', why: 'Stand-by = 30 b (ressort du tiroir LS). Le plateau est presque à zéro : la pompe ne fournit que le 1 L/min du gicleur anti-pompage.' }],
      sum: 'Puissance très faible : pas de chaleur inutile au neutre.' },
    { id: 'stab-fonct', t: 'Stabilisateurs en fonctionnement (vérin à 100 b)', img: 'stabs-fonctionnement', src: 'cahier', leg: [['rouge', '130 b'], ['violet', '100 b'], ['bleu', '0 b'], ['jaune', 'pression de maintien']],
      data: 'Un vérin de stabilisateur sort à 100 b. Le régulateur de débit 3 voies donne 40 L/min.',
      rows: [{ lab: 'Pu-vérin', t: [[100, 40]], r: '6,66', why: 'Le vérin travaille à 100 b avec les 40 L/min du régulateur.' },
        { lab: 'Pu-Rd', t: [[30, 40]], r: '2', why: 'Le régulateur de débit 3 voies garde une ΔP constante de 30 b sur les 40 L/min : c’est ce qui donne la vitesse constante.' },
        { lab: 'Pu-GAP', t: [[130, 1]], r: '0,21', why: 'Pompe à 100 + 30 = 130 b ; le gicleur anti-pompage laisse fuir 1 L/min à cette pression.' }],
      sum: 'Pu-vérin + Pu-Rd + Pu-GAP = 8,87 kW (cahier). La pompe débite 40 + 1 = 41 L/min.' },
    { id: 'stab-85', t: 'Sortie d’un stabilisateur à 85 b', img: 'ph-stab-85b', src: 'tes phases', leg: [['rouge', '115 b'], ['noir', '85 b'], ['bleu', '0 b']],
      data: 'Le vérin sort à 85 b. Régulateur de débit 3 voies : 40 L/min, ΔP 30 b. Gicleur anti-pompage : 1 L/min.',
      rows: [{ lab: 'Pu-total (pompe)', t: [[115, 41]], r: '7,858', why: 'Pression pompe = 85 b (vérin) + 30 b (ΔP du régulateur) = 115 b. Débit pompe = 40 L/min (régulateur) + 1 L/min (GAP) = 41 L/min.' },
        { lab: 'Pu-GAP', t: [[115, 1]], r: '0,192', why: 'Le gicleur anti-pompage est sous la pression de la pompe (115 b) et laisse passer 1 L/min.' },
        { lab: 'Pu-vérin', t: [[85, 40]], r: '5,667', why: 'Le vérin reçoit les 40 L/min à 85 b.' },
        { lab: 'Pu-Rd', t: [[30, 40]], r: '2', why: 'Le régulateur « mange » 30 b sur les 40 L/min pour garder la vitesse constante.' }],
      sum: 'Pu-GAP + Pu-vérin + Pu-Rd = 0,192 + 5,667 + 2 = 7,858 kW = Pu-total ✔', note: 'Dans tes notes, le total est écrit « 115 × 41 / 60 = 78,583 » : il faut bien diviser par <b>600</b>, soit <b>7,858 kW</b>.' },
    { id: 'stab-butee', t: 'Sortie d’un stabilisateur en butée', img: 'stabs-butee', src: 'cahier', leg: [['rouge', '250 b'], ['violet', '220 b'], ['magenta', '200 b'], ['bleu', '0 b'], ['jaune', 'pression de maintien']],
      data: 'Le vérin est en butée. Limiteur de pression à commande pilotée du CETOP : tête pilote 200 b + balance d’entrée 20 b = 220 b. Le régulateur donne toujours 40 L/min.',
      rows: [{ lab: 'Pu-total (pompe)', t: [[250, 41]], r: '17,083', why: 'Pression pompe = 220 b (limiteur piloté) + 30 b (ΔP du régulateur) = 250 b. Le DAD (320 b) n’est pas atteint : la pompe débite toujours 41 L/min.' },
        { lab: 'Pu-GD', t: [[20, 0.5]], r: '0,0167', why: 'Un petit débit de 0,5 L/min passe par le gicleur de déséquilibre : il chute de 220 b à 200 b, soit ΔP = 20 b.' },
        { lab: 'Pu-Tp', t: [[200, 0.5]], r: '0,167', why: 'Ces 0,5 L/min traversent ensuite la tête pilote tarée à 200 b.' },
        { lab: 'Pu-Be', t: [[220, 39.5]], r: '14,483', why: 'Le reste du débit (40 − 0,5 = 39,5 L/min) part à la bâche par la balance d’entrée, à 220 b : c’est presque toute la puissance, transformée en chaleur.' },
        { lab: 'Pu-Rd', t: [[30, 40]], r: '2', why: 'Le régulateur garde sa ΔP de 30 b sur 40 L/min.' },
        { lab: 'Pu-GAP', t: [[250, 1]], r: '0,417', why: 'Le gicleur anti-pompage est sous 250 b et laisse passer 1 L/min.' }],
      sum: 'Pu-GD + Pu-Tp + Pu-Be + Pu-Rd + Pu-GAP = 17,083 kW = Pu-total ✔ (le cahier regroupe GD + Tp + Be en « LP à action pilotée » : 220 × 40 / 600 = 14,66 kW, total 17,07 kW).' },

    { grp: 'RMU (RSQ 240, système débit / pression)' },
    { id: 'rmu-neutre', t: 'RMU au neutre', img: 'rmu-neutre', src: 'cahier', leg: [['rouge', '30 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Distributeurs au neutre.',
      rows: [{ lab: 'Pu-pompe', t: [[30, 2]], r: '0,1', why: 'Stand-by 30 b. La pompe ne donne que 2 L/min : 1 L/min pour le gicleur anti-pompage et 1 L/min pour le gicleur LS du bloc d’entrée.' }],
      sum: 'Puissance très faible au neutre.' },
    { id: 'rmu-fonct', t: 'RMU en fonctionnement (télescopage à 100 b)', img: 'rmu-fonctionnement', src: 'cahier', leg: [['rouge', '140 b'], ['violet', '110 b'], ['bordeaux', '100 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Les vérins jumelés de télescopage sortent (40 L/min, 20 L/min par vérin). Limiteur de débit : ΔP 10 b.',
      rows: [{ lab: 'Pu-vérins', t: [[100, 20], [110, 20]], r: '6,99', why: 'Deux vérins jumelés de 20 L/min chacun : l’un à 100 b, l’autre à 110 b (avant son limiteur de débit).' },
        { lab: 'Pu-limiteur de débit', t: [[10, 20]], r: '0,33', why: 'Le limiteur de débit crée une ΔP de 10 b sur 20 L/min.' },
        { lab: 'Pu-Dis', t: [[30, 40]], r: '2', why: 'ΔP de 30 b à travers le distributeur (tarage du tiroir LS) sur les 40 L/min.' },
        { lab: 'Pu-GLF', t: [[30, 1]], r: '0,05', why: 'Le gicleur LS laisse passer 1 L/min avec la même ΔP de 30 b.' },
        { lab: 'Pu-GAP', t: [[140, 1]], r: '0,23', why: 'Pompe à 110 + 30 = 140 b ; gicleur anti-pompage : 1 L/min.' }],
      sum: 'Total du cahier : 6,99 + 0,33 + 2 + 0,05 + 0,23 = 9,60 kW.' },
    { id: 'rmu-cf', t: 'Sortie du corps de flèche (300 b au manomètre)', img: 'ph-rmu-corps-fleche', src: 'tes phases', leg: [['rouge', '300 b'], ['violet', '270 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Manomètre de pression : 300 b. La pompe débite 38 L/min pour les vérins, + 1 L/min pour le gicleur anti-pompage.',
      rows: [{ lab: 'Pu-total (pompe)', t: [[300, 39]], r: '19,5', why: 'Pression pompe lue au manomètre : 300 b. Débit pompe = 38 + 1 (GAP) = 39 L/min.' },
        { lab: 'Pu-CF', t: [[270, 38]], r: '17,1', why: 'Les vérins de corps de flèche travaillent à 300 − 30 = 270 b (la pompe garde 30 b au-dessus de la charge).' },
        { lab: 'Pu-Dis', t: [[30, 37]], r: '1,85', why: 'Le full flow (38 − 1 = 37 L/min) traverse le distributeur avec une ΔP de 30 b.' },
        { lab: 'Pu-GLF', t: [[30, 1]], r: '0,05', why: 'Le low flow (1 L/min) passe par le gicleur LS, aussi avec 30 b de ΔP.' },
        { lab: 'Pu-GAP', t: [[300, 1]], r: '0,5', why: 'Gicleur anti-pompage sous 300 b, 1 L/min.' }],
      sum: 'Pu-CF + Pu-Dis + Pu-GLF + Pu-GAP = 17,1 + 1,85 + 0,05 + 0,5 = 19,5 kW = Pu-total ✔' },
    { id: 'rmu-butee', t: 'RMU en butée (télescopage, LPS 200 b)', img: 'rmu-butee', src: 'cahier', leg: [['rouge', '230 b'], ['magenta', '200 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Les vérins de télescopage arrivent en butée : la pression monte jusqu’au limiteur de pression secondaire taré à 200 b.',
      rows: [{ lab: 'Pu-pompe', t: [[230, 41]], r: '15,71', why: 'Le signal LS recopie 200 b : la pompe se règle à 200 + 30 = 230 b. Le DAD (320 b) n’est pas atteint, donc la pompe débite toujours 40 L/min (par le LPS) + 1 L/min (GAP).' }],
      sum: 'Toute cette puissance part en chaleur dans le LPS.' },
    { id: 'rmu-cf-butee', t: 'Sortie du corps de flèche en butée', img: 'ph-rmu-corps-fleche-butee', src: 'tes phases', leg: [['rouge', '330 b'], ['violet', '300 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Les vérins de corps de flèche sont en butée : la pression monte au LPS taré à 300 b. La pompe débite toujours 38 + 1 L/min.',
      rows: [{ lab: 'Pu-total (pompe)', t: [[330, 39]], r: '21,45', why: 'Pression pompe = 300 b (LPS) + 30 b = 330 b. Le DAD (320 b) n’est pas atteint par le signal LS (300 b), donc le débit ne s’annule pas : 39 L/min.' },
        { lab: 'Pu-LPS', t: [[300, 38]], r: '19', why: 'Les 38 L/min partent à la bâche par le LPS à 300 b : c’est de la chaleur.' },
        { lab: 'Pu-Dis', t: [[30, 37]], r: '1,85', why: 'Full flow 37 L/min à travers le distributeur, ΔP 30 b.' },
        { lab: 'Pu-GLF', t: [[30, 1]], r: '0,05', why: 'Low flow 1 L/min par le gicleur LS, ΔP 30 b.' },
        { lab: 'Pu-GAP', t: [[330, 1]], r: '0,55', why: 'Gicleur anti-pompage sous 330 b, 1 L/min.' }],
      sum: 'Pu-LPS + Pu-Dis + Pu-GLF + Pu-GAP = 19 + 1,85 + 0,05 + 0,55 = 21,45 kW = Pu-total ✔' },

    { grp: 'Grue (RSQ 240)' },
    { id: 'grue-neutre', t: 'Grue au neutre', img: 'grue-neutre', src: 'cahier', leg: [['rouge', '30 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Distributeurs au neutre.',
      rows: [{ lab: 'Pu-pompe', t: [[30, 2]], r: '0,1', why: 'Stand-by 30 b ; 2 L/min : gicleur anti-pompage (1) + gicleur LS du bloc d’entrée (1).' }], sum: 'Puissance très faible au neutre.' },
    { id: 'grue-fonct', t: 'Grue en fonctionnement (moteur de rotation à 100 b)', img: 'grue-fonctionnement', src: 'cahier', leg: [['rouge', '130 b'], ['magenta', '100 b'], ['orange', 'pression de freinage'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Le moteur de rotation tourne à 100 b avec 40 L/min.',
      rows: [{ lab: 'Pu-moteur', t: [[100, 40]], r: '6,66', why: 'Le moteur travaille à 100 b avec 40 L/min.' },
        { lab: 'Pu-Dis', t: [[30, 40]], r: '2', why: 'ΔP de 30 b à travers le distributeur.' },
        { lab: 'Pu-GLF', t: [[30, 1]], r: '0,05', why: 'Gicleur LS : 1 L/min, ΔP 30 b.' },
        { lab: 'Pu-GAP', t: [[130, 1]], r: '0,21', why: 'Pompe à 100 + 30 = 130 b ; gicleur anti-pompage 1 L/min.' }],
      sum: 'Total du cahier : 6,66 + 2 + 0,05 + 0,21 = 8,92 kW.' },
    { id: 'grue-fdc', t: 'Grue en fin de course (LPS 210 b)', img: 'grue-fin-de-course', src: 'cahier', leg: [['rouge', '240 b'], ['bordeaux', '210 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Le moteur arrive en butée sur la vanne inverseur : la pression monte jusqu’au limiteur de pression secondaire taré à 210 b.',
      rows: [{ lab: 'Pu-pompe', t: [[240, 41]], r: '16,4', why: 'Pompe = 210 + 30 = 240 b. Le DAD n’est pas atteint : 40 L/min passent par le LPS + 1 L/min pour le GAP.' }], sum: 'Toute la puissance part en chaleur dans le LPS.' },

    { grp: 'Treuils (RSQ 240)' },
    { id: 'treuil-fdc', t: 'Électrovanne de fin de course pilotée (fermée) sur le treuil de halage', img: 'ph-treuil-fin-de-course', src: 'tes phases', leg: [['rouge', '350 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'On commande le halage, mais l’électrovanne de fin de course est fermée : l’huile ne peut pas aller au moteur. La ligne LS monte jusqu’au DAD (320 b).',
      rows: [{ lab: 'Pu-total (pompe)', t: [[350, 1.5]], r: '0,875', why: 'Le DAD est atteint : pression pompe = 320 + 30 = 350 b, et le débit s’annule. Il ne reste que 1 L/min (GAP) + 0,5 L/min (gicleur du DAD) = 1,5 L/min.' },
        { lab: 'Pu-GDAD', t: [[30, 0.5]], r: '0,025', why: 'Le gicleur du DAD (0,5 L/min) chute de 350 b à 320 b : ΔP = 30 b.' },
        { lab: 'Pu-DAD', t: [[320, 0.5]], r: '0,267', why: 'Ces 0,5 L/min passent ensuite dans le DAD taré à 320 b.' },
        { lab: 'Pu-GAP', t: [[350, 1]], r: '0,583', why: 'Gicleur anti-pompage sous 350 b, 1 L/min.' }],
      sum: 'Pu-GDAD + Pu-DAD + Pu-GAP = 0,025 + 0,267 + 0,583 = 0,875 kW = Pu-total ✔ : pression maxi mais presque pas de puissance, c’est le rôle du DAD.',
      note: 'Dans tes notes, Pu-GDAD est écrit « 350 × 1 / 600 = 0,583 » : la somme ne tombe alors pas juste (1,433 ≠ 0,875). Le gicleur du DAD voit seulement <b>ΔP = 30 b</b> sur <b>0,5 L/min</b> : 30 × 0,5 / 600 = <b>0,025 kW</b>.' },
    { id: 'treuil-halage', t: 'Treuil de halage en fonctionnement (180 b, 28 L/min)', img: 'ph-treuil-halage', src: 'tes phases', leg: [['rouge', '210 b'], ['violet', '180 b'], ['vert', '25 b'], ['bleu', '0 b']],
      data: 'Le moteur de halage tourne à 180 b avec 28 L/min. ΔP du distributeur : 30 b.',
      rows: [{ lab: 'Pu-total (pompe)', t: [[210, 29]], r: '10,15', why: 'Pression pompe = 180 + 30 = 210 b. Débit pompe = 28 (moteur) + 1 (GAP) = 29 L/min.' },
        { lab: 'Pu-H', t: [[180, 28]], r: '8,4', why: 'Le moteur de halage reçoit 28 L/min à 180 b.' },
        { lab: 'Pu-Dis', t: [[30, 27]], r: '1,35', why: 'Full flow : 28 − 1 = 27 L/min à travers le distributeur, ΔP 30 b.' },
        { lab: 'Pu-GLF', t: [[30, 1]], r: '0,05', why: 'Low flow : 1 L/min par le gicleur LS, ΔP 30 b.' },
        { lab: 'Pu-GAP', t: [[210, 1]], r: '0,35', why: 'Gicleur anti-pompage sous 210 b, 1 L/min.' }],
      sum: 'Pu-H + Pu-Dis + Pu-GLF + Pu-GAP = 8,4 + 1,35 + 0,05 + 0,35 = 10,15 kW = Pu-total ✔' }
  ];

  function num(n) { return String(n).replace('.', ','); }
  function inp(v, show) { return '<input class="cx-in" inputmode="decimal" autocomplete="off" aria-label="valeur à trouver" data-v="' + v + '"' + (show ? ' data-show="' + show + '"' : '') + '>'; }
  function given(v) { return '<span class="cx-giv">' + num(v) + '</span>'; }
  // Élément utile (le récepteur qui travaille) : tout le reste est transformé en chaleur
  function useful(r) { return /vérin|moteur|^Pu-H$|^Pu-CF$/i.test(r.lab); }
  function phase(p) {
    var exact = function (r) { return r.t.reduce(function (s, x) { return s + x[0] * x[1]; }, 0) / 600; };
    var tot = /total|pompe/i.test(p.rows[0].lab) ? exact(p.rows[0]) : null;
    var parts = p.rows.filter(function (r) { return !/total|pompe/i.test(r.lab); });
    var util = parts.filter(useful).reduce(function (s, r) { return s + exact(r); }, 0);
    var sumParts = parts.reduce(function (s, r) { return s + exact(r); }, 0);
    var f2 = function (x) { return (Math.round(x * 1000) / 1000).toString().replace('.', ','); };
    return '<div class="calc-ex" id="cx-' + p.id + '"><h3>' + p.t + '</h3>' +
      '<figure><a href="img/' + I + p.img + '.jpg" target="_blank" rel="noopener"><img loading="lazy" src="img/' + I + p.img + '.jpg" alt="Phase colorée : ' + p.t + '"></a>' +
      '<figcaption>' + (p.src === 'cahier' ? '📘 Phase colorée du cahier' : '✏️ Ta phase colorée') + ' <span class="muted">(toucher pour agrandir)</span></figcaption></figure>' +
      '<p class="cx-leg">' + p.leg.map(function (l) { return '<span><i style="background:' + COL[l[0]] + '"></i>' + l[1] + '</span>'; }).join('') + '</p>' +
      '<p class="muted small">Lis les pressions (couleurs, tarages) et les débits sur le schéma, puis complète les cases vides.</p>' +
      '<div class="cx-rows">' + p.rows.map(function (r, ri) {
        var isTot = ri === 0 && /total|pompe/i.test(r.lab);
        return '<div class="cx-row"><b class="cx-lab">' + r.lab + '</b><span class="cx-f">= ' +
          r.t.map(function (x, k) {
            // ligne pompe : tout est à trouver ; autres lignes : une valeur donnée sur deux, l'autre à lire sur le schéma
            var giveP = !isTot && (ri + k) % 2 === 1, giveQ = !isTot && !giveP && p.rows.length > 1;
            return (giveP ? given(x[0]) : inp(x[0])) + ' × ' + (giveQ ? given(x[1]) : inp(x[1])) + ' / 600';
          }).join(' + ') + ' = ' + inp(exact(r), r.r) + ' kW</span></div>';
      }).join('') + '</div>' +
      '<details class="cx-hint"><summary>💡 Indice (si tu bloques)</summary><p>' + p.data + '</p></details>' +
      '<div class="row-actions cx-btns"><button class="btn primary" data-action="calc-check">✔ Vérifier</button><button class="btn" data-action="calc-show">📖 Correction</button><button class="btn ghost" data-action="calc-reset">↺ Recommencer</button></div>' +
      '<p class="cx-res" role="status"></p>' +
      '<div class="cx-sol" hidden><b>💡 Pourquoi chaque calcul</b><ol class="steps">' + p.rows.map(function (r) {
        return '<li><b>' + r.lab + ' = ' + r.t.map(function (x) { return num(x[0]) + ' × ' + num(x[1]) + ' / 600'; }).join(' + ') + ' = ' + r.r + ' kW</b><span>' + r.why + '</span></li>';
      }).join('') + '</ol><p class="cx-sum">🧮 ' + p.sum + '</p>' +
      (parts.length ? '<div class="cx-bilan"><b>⚖️ Pourquoi l’addition donne la puissance totale</b><ul>' +
        '<li>La <b>pompe</b> fournit toute la puissance du circuit' + (tot !== null ? ' : ' + f2(tot) + ' kW' : '') + '.</li>' +
        '<li>Cette puissance ne disparaît pas : elle se <b>partage</b> entre tous les éléments que l’huile traverse. Chacun prend <b>sa chute de pression × le débit qui le traverse</b>.</li>' +
        (util ? '<li>Le <b>récepteur</b> en garde ' + f2(util) + ' kW : c’est le <b>travail utile</b> (le mouvement).</li><li>Le reste, ' + f2(sumParts - util) + ' kW, part en <b>chaleur</b> dans les gicleurs, le régulateur, le distributeur ou les limiteurs.</li>'
          : '<li>Aucun récepteur ne bouge : <b>toute</b> la puissance part en <b>chaleur</b> (limiteurs, gicleurs).</li>') +
        '<li>Donc <b>somme des éléments = puissance de la pompe</b> (rien ne se perd, tout se transforme). Si ta somme ne tombe pas juste, tu as oublié un élément ou mal lu une pression ou un débit.</li></ul></div>' : '') +
      (p.note ? '<p class="cx-note">⚠️ ' + p.note + '</p>' : '') + '</div></div>';
  }
  function lesson(id) {
    return { id: id, title: 'Analyse énergétique : exercices à compléter (phases colorées)',
      html: '<p>Pour chaque phase : regarde le <b>schéma coloré</b> et sa légende. Dans les calculs, certaines valeurs sont données, les autres sont <b>à trouver sur le schéma</b> (pression en bar, débit en L/min), puis tu calcules la puissance en kW. Un <b>indice</b> est caché sous chaque exercice si tu bloques. Appuie sur <b>Vérifier</b> : les cases justes passent en vert, les fausses en rouge. L’explication de chaque calcul s’affiche quand tout est rempli (ou avec <b>Correction</b>).</p>' +
        '<div class="box retenir"><b>★ La méthode</b><ol class="steps"><li>Pu (kW) = p (bar) × Q (L/min) / <b>600</b>.</li><li>Pression pompe = pression du récepteur (ou du limiteur) + <b>30 b</b> (stand-by / ΔP du tiroir LS ou du régulateur).</li><li>Débit pompe = débit du récepteur + <b>1 L/min</b> du gicleur anti-pompage (+ 1 L/min de gicleur LS au neutre du RSQ 240).</li><li>Chaque élément traversé consomme <b>sa ΔP × son débit</b>. La somme des éléments = puissance de la pompe : c’est ta vérification.</li></ol></div>' +
        '<div class="box"><b>⚖️ Pourquoi on additionne tous ces calculs</b><p>La pompe est la seule source d’énergie du circuit. Tout ce qu’elle fournit (pression pompe × débit pompe / 600) est forcément « dépensé » quelque part : une partie fait bouger le récepteur (puissance utile), le reste se transforme en <b>chaleur</b> à chaque endroit où la pression chute (gicleurs, régulateur, distributeur, limiteurs). En additionnant la puissance de chaque élément, on retrouve donc exactement la puissance de la pompe. C’est ce qui permet de vérifier ses calculs et de voir où part l’énergie, donc où l’huile chauffe.</p></div>' +
        '<details class="cx-abr"><summary>🔤 Abréviations</summary><ul>' + ABR.map(function (a) { return '<li><b>' + a[0] + '</b> = ' + a[1] + '</li>'; }).join('') + '</ul></details>' +
        PH.map(function (p) { return p.grp ? '<h2 class="h2">' + p.grp + '</h2>' : phase(p); }).join(''),
      retenir: ['Pu (kW) = p × Q / 600 ; pompe = récepteur + 30 b ; débit pompe = récepteur + 1 L/min (GAP).', 'Somme des puissances des éléments = puissance de la pompe.', 'Butée sous le DAD : tout le débit passe par le limiteur → chaleur. DAD atteint (350 b) : débit annulé, presque pas de puissance.'] };
  }
  REV.addLessons('ppld', 'energie', [lesson('energie-exos')]);
  REV.addLessons('uv3', 'ppld-reperes', [lesson('ppld-energie-exos')]);

  /* Quelques QCM tirés des mêmes phases */
  var Q = [
    ['Sortie d’un stabilisateur à 85 b : puissance fournie par la pompe ?', ['115 × 41 / 600 = 7,858 kW', '115 × 41 / 60 = 78,58 kW', '85 × 40 / 600 = 5,667 kW', '220 × 41 / 600 = 15,03 kW'], 'ph-stab-85b'],
    ['Stabilisateur en butée : pourquoi la pompe est-elle à 250 b ?', ['220 b du limiteur piloté du CETOP + 30 b du régulateur de débit', '320 b du DAD − 70 b', '200 b de la tête pilote + 50 b', '350 b moins les pertes'], 'stabs-butee'],
    ['Électrovanne de fin de course fermée sur le halage : puissance de la pompe ?', ['350 × 1,5 / 600 = 0,875 kW (DAD atteint, débit annulé)', '350 × 41 / 600 = 23,9 kW', '320 × 1 / 600 = 0,53 kW', '0 kW'], 'ph-treuil-fin-de-course'],
    ['Gicleur du DAD (0,5 L/min) quand la pompe est à 350 b : puissance ?', ['30 × 0,5 / 600 = 0,025 kW (ΔP 350 − 320 = 30 b)', '350 × 1 / 600 = 0,583 kW', '320 × 0,5 / 600 = 0,267 kW', '350 × 0,5 / 600 = 0,292 kW'], 'ph-treuil-fin-de-course'],
    ['Halage à 180 b et 28 L/min : pression et débit de la pompe ?', ['210 b et 29 L/min', '180 b et 28 L/min', '210 b et 28 L/min', '350 b et 1,5 L/min'], 'ph-treuil-halage'],
    ['Halage à 180 b et 28 L/min : débit qui traverse le distributeur (full flow) ?', ['27 L/min (le low flow de 1 L/min passe par le gicleur LS)', '28 L/min', '29 L/min', '40 L/min'], 'ph-treuil-halage'],
    ['Corps de flèche, 300 b au manomètre : pression dans les vérins ?', ['270 b (300 − 30)', '300 b', '330 b', '240 b'], 'ph-rmu-corps-fleche'],
    ['Corps de flèche en butée (LPS 300 b) : pression de la pompe ?', ['330 b (LPS 300 + 30), le débit ne s’annule pas', '350 b, débit annulé', '300 b', '320 b'], 'ph-rmu-corps-fleche-butee']
  ];
  function qs(l) { return Q.map(function (q) { return { l: l, img: I + q[2] + '.jpg', q: q[0], c: q[1], src: 'Phases de fonctionnement colorées (PPLD)' }; }); }
  REV.addExercises('ppld', { lessons: [], questions: qs('energie-exos') });
  REV.addExercises('uv3', { lessons: [], questions: qs('ppld-energie-exos') });
})();
