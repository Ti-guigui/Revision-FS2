/* Contrôle des connaissances n°1 « Sensibilisation au contrôle RDC », copie en 12 questions (Q1 à Q12).
   Réponses : AQA 03 indice R (référence), quiz RDC corrigé par le formateur et cours RDC du site.
   Q11 (passer d’une VP à une VP + OS) : réponse non trouvée dans les documents, pas publiée. */
(function () {
  var html = '<h3>Énoncé</h3><p>Copie de 12 questions : Q1 à Q10 en QCM (A / B / C, dans l’ordre de la copie), Q11 et Q12 à rédiger.</p>' +
    '<h3>Correction question par question</h3><ul class="corr">' +
    '<li><b>Q1 — C : attendre que le RDC soit ouvert.</b> Seul le RDC contrôle et fait sortir le véhicule. Ni le chef d’atelier ni un BSTAT d’un autre atelier ne le remplacent.</li>' +
    '<li><b>Q2 — A : le potentiel cumulé inférieur au relevé du compteur.</b> Le potentiel cumulé est toujours supérieur ou égal au relevé (il dépasse le relevé après un changement de compteur).</li>' +
    '<li><b>Q3 — C : la phase 4 du MAT 4486.</b> Le COS (MAT 4485) a 4 mois : il est encore valable (1 an). En sortie d’atelier, on fait seulement le contrôle après maintenance = phase 4 « contrôle » du DIT (MAT 4486).</li>' +
    '<li><b>Q4 — B : en sortie de remisage (supérieur à 6 mois).</b> Pas de COS au retour de RIP (le prestataire rend le véhicule apte) ni en sortie de station ou d’atelier (on contrôle les réparations).</li>' +
    '<li><b>Q5 — A : le prestataire.</b> En RIP, le prestataire rend le véhicule apte et conforme et renseigne les documents (MAT 10004) : on ne repasse jamais derrière.</li>' +
    '<li><b>Q6 — B : le RDC.</b> Le RDC distribue les différents travaux aux ateliers (phase 2 du DIT).</li>' +
    '<li><b>Q7 — A : la CDM.</b> La CDM (ECM, équipe de conduite de la maintenance) ouvre, valide et clôture le DIT (MAT 4486).</li>' +
    '<li><b>Q8 — A : la CDM.</b> Au niveau du BML, c’est la conduite de la maintenance qui pilote la maintenance.</li>' +
    '<li><b>Q9 — C : visite NTI1, station et COS.</b> On remet d’abord le véhicule en état (NTI1), puis la station ; le COS vient en dernier sur un véhicule en état.</li>' +
    '<li><b>Q10 — B : le RDC.</b> La visite périodique valant COS (VP + OS) est enregistrée au MAT 10004 par le RDC.</li>' +
    '<li><b>Q12 — Le COS (contrôle des organes de sécurité, MAT 4485) :</b><ul>' +
    '<li><b>Où :</b> à la cellule <b>RDC</b> (réception, diagnostic, contrôle) de la SMR.</li>' +
    '<li><b>Par qui, militaire :</b> détenteur de la <b>FS2 MOT</b> ; à défaut, sous-officier <b>FS1 NG MOT</b> avec <b>2 ans</b> minimum d’atelier et la <b>FA CTRL RDC COS</b> ; inscrit sur le <b>DUO</b> et nommément désigné au RDC.</li>' +
    '<li><b>Par qui, civil :</b> détenteur de la <b>FS2 MOT</b> ; à défaut, <b>OE G6</b> minimum, <b>FS1 ou FS1 NG</b>, <b>2 ans</b> minimum d’atelier militaire et la <b>FA CTRL RDC COS</b> ; inscrit sur le <b>DUO</b>.</li>' +
    '<li><b>Quand :</b> <b>tous les ans</b> (bus : tous les 6 mois), lors d’une <b>VP + OS</b>, <b>sur ordre</b>, en sortie de <b>remisage de plus de 6 mois</b> (sauf ENU). Pas après une RIP.</li>' +
    '<li><b>Pourquoi :</b> mettre le véhicule <b>en conformité avec le code de la route</b> (sécurité). Celui qui signe engage sa responsabilité.</li></ul></li></ul>';
  var lesson = { id: 'controle-rdc-2', title: 'Contrôle des connaissances n°1 RDC (copie en 12 questions)', html: html,
    retenir: ['RDC fermé → attendre. Potentiel cumulé ≥ relevé.', 'COS encore valable → phase 4 du MAT 4486 seulement.', 'RIP : le prestataire renseigne, on ne repasse pas derrière.', 'RDC répartit les travaux ; CDM pilote et valide la partie 4 du DIT ; VP + OS enregistrée au MAT 10004 par le RDC.', 'COS : RDC ; FS2 MOT (à défaut FS1 NG + 2 ans + FA CTRL RDC COS) ; tous les ans, VP + OS, sur ordre, remisage > 6 mois ; conformité au code de la route.'] };
  var S = 'Contrôle des connaissances n°1 RDC (copie en 12 questions)';
  var QCM = [
    { a: 2, q: 'Q1 — Je suis chef d’atelier poids lourd, le RDC est fermé pour 2 semaines je peux :', c: ['Faire contrôler le VHL par un BSTAT d’un autre atelier', 'Sortir le VHL et valider la partie 4 du DIT (Mat 4486)', 'Attendre que le RDC soit ouvert'], e: 'Seul le RDC contrôle et fait sortir le véhicule : on attend qu’il soit ouvert.' },
    { a: 0, q: 'Q2 — Sur une feuille de visite NTI1 je ne peux pas avoir :', c: ['Le potentiel cumulé inférieur au relevé du compteur', 'Le potentiel cumulé identique au relevé du compteur', 'Le potentiel cumulé supérieur au relevé du compteur'], e: 'Le potentiel cumulé est toujours supérieur ou égal au relevé du compteur.' },
    { a: 2, q: 'Q3 — Je suis au RDC un VHL sort de l’atelier PL (réparation électrique), le dernier COS remonte à 4 mois, j’effectue sur ce VHL :', c: ['Un 4485 et la phase 4 du MAT 4486', 'Un COS et le contrôle des réparations', 'La phase 4 du MAT 4486'], e: 'Le COS (MAT 4485) est valable 1 an : à 4 mois, pas de nouveau COS. On fait le contrôle après maintenance = phase 4 « contrôle » du MAT 4486.' },
    { a: 1, q: 'Q4 — Dans lequel de ces cas je dois effectuer un COS ?', c: ['Au retour d’un VHL débordé en RIP', 'En sortie de remisage (supérieur à 6 mois)', 'En sortie de station service ou d’atelier'], e: 'COS : tous les ans, lors d’une VP + OS, sur ordre, après un remisage de plus de 6 mois. Pas après une RIP, ni en sortie de station ou d’atelier.' },
    { a: 0, q: 'Q5 — Dans le cas d’une RIP, la partie contrôle du DIT est renseignée par ?', c: ['Le prestataire', 'Le RDC', 'Le prestataire et le RDC'], e: 'En RIP, le prestataire rend le véhicule apte et conforme et renseigne les documents : on ne repasse pas derrière.' },
    { a: 1, q: 'Q6 — Qui répartit les différents travaux à effectuer sur un VHL (phase 2 du DIT) ?', c: ['La CDM', 'Le RDC', 'L’Off Maint'], e: 'Le RDC distribue les travaux aux ateliers.' },
    { a: 0, q: 'Q7 — Dans tous les cas, qui validera la partie 4 du DIT ?', c: ['Le CDM', 'La RDC', 'L’Off Maint'], e: 'La CDM (ECM) ouvre, valide et clôture le DIT.' },
    { a: 0, q: 'Q8 — Au niveau du BML qui pilote la maintenance ?', c: ['Le CDM', 'La RDC', 'L’Off Maint'], e: 'La conduite de la maintenance (CDM) pilote la maintenance.' },
    { a: 2, q: 'Q9 — Un GBC 180 doit rentrer en atelier pour effectuer un COS, une visite station et une visite NTI1. Dans quel ordre logique sont effectuées les visites ?', c: ['Visite station, NTI1 et COS', 'Visite NTI1, COS et station', 'Visite NTI1, station et COS'], e: 'NTI1, puis station, puis COS : le COS se fait sur un véhicule en état.' },
    { a: 1, q: 'Q10 — Lors d’une VP + OS, qui enregistre le contrôle dans le MAT 10 004 ?', c: ['Le CDM', 'La RDC', 'L’atelier ayant réalisé la visite'], e: 'La visite périodique valant COS est enregistrée au MAT 10004 par le RDC.' }
  ].map(function (q) { q.l = 'controle-rdc-2'; q.fixed = true; q.src = S; return q; });
  var COS = [
    { q: 'Q12 — Le COS : où (cellule) ?', c: ['À la cellule RDC (réception, diagnostic, contrôle)', 'À la CDM', 'À la station-service', 'À l’atelier qui a réparé'], e: 'Le COS est fait au RDC.' },
    { q: 'Q12 — Le COS : qui peut le faire (militaire) ?', c: ['FS2 MOT ; à défaut sous-officier FS1 NG MOT, 2 ans d’atelier mini, FA CTRL RDC COS', 'N’importe quel chef d’atelier', 'Un BSTAT de n’importe quelle spécialité', 'Le conducteur du véhicule'], e: 'AQA 03 : FS2 MOT ; à défaut FS1 NG MOT + 2 ans d’atelier + FA CTRL RDC COS ; inscrit sur le DUO, nommément désigné au RDC.' },
    { q: 'Q12 — Le COS : qui peut le faire (civil) ?', c: ['FS2 MOT ; à défaut OE G6 mini, FS1 ou FS1 NG, 2 ans d’atelier militaire, FA CTRL RDC COS', 'Tout personnel civil de l’atelier', 'Un prestataire RIP', 'Le chef de BML'], e: 'AQA 03 : FS2 MOT ; à défaut OE G6 mini, FS1 ou FS1 NG, 2 ans d’atelier militaire, FA CTRL RDC COS ; inscrit sur le DUO.' },
    { q: 'Q12 — Le COS : quand ?', c: ['Tous les ans (bus 6 mois), lors d’une VP + OS, sur ordre, après un remisage de plus de 6 mois (sauf ENU)', 'Après chaque RIP', 'À chaque sortie d’atelier', 'Tous les 3 mois'], e: 'Pas de COS après une RIP ni en sortie d’atelier si le COS est encore valable.' },
    { q: 'Q12 — Le COS : pourquoi ?', c: ['Mettre le véhicule en conformité avec le code de la route', 'Mettre le véhicule en conformité avec le règlement militaire', 'Augmenter la DTO', 'Remplacer la visite NTI1'], e: 'Le COS (contrôle des organes de sécurité) garantit la conformité au code de la route.' }
  ].map(function (q) { q.l = 'controle-rdc-2'; q.src = S; return q; });
  REV.addExercises('mcot', { lessons: [lesson], questions: QCM.concat(COS) });
  REV.addExercises('uv3', { lessons: [], questions: QCM.concat(COS).map(function (q) { var o = {}; for (var k in q) o[k] = q[k]; o.l = 'rdc'; o.c = q.c.slice(); delete o.fixed; delete o.a; o.c = q.a !== undefined ? [q.c[q.a]].concat(q.c.filter(function (x, i) { return i !== q.a; })) : o.c; return o; }) });
})();
