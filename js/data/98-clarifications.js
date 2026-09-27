/* Questions compréhensibles sans aucun document (demandé par l'élève) — appliqué après 99-perimetre.js :
   - aucune question ne renvoie au test, à une fiche, au cours, au livre ou à la copie ;
   - les points tranchés sont reformulés avec les conditions de la situation ;
   - les corrections ne citent plus les sources (livre, corrigé, fiche…) : seulement la réponse et l'explication. */
(function () {
  function subj(id) { return REV.subjects.find(function (s) { return s.id === id; }); }
  function each(fn) { REV.subjects.forEach(function (s) { s.questions.forEach(function (q) { fn(q, s); }); }); }
  function drop(id, fn) { var s = subj(id); s.questions = s.questions.filter(function (q) { return !fn(q); }); }
  // Modifie la (ou les) question(s) de la matière dont l'énoncé contient `sub`.
  function edit(id, sub, patch) {
    var n = 0;
    subj(id).questions.forEach(function (q) {
      if (q.q.indexOf(sub) < 0) return;
      n++;
      if (patch.q) q.q = typeof patch.q === 'function' ? patch.q(q.q) : patch.q;
      if (patch.c) Object.keys(patch.c).forEach(function (i) { q.c[i] = patch.c[i]; });
      if (patch.e) q.e = patch.e;
      if (patch.r) q.r = patch.r;
    });
    if (!n && window.console) console.warn('98-clarifications : question introuvable', id, sub);
  }

  /* ---------- Questions qui n'ont de sens qu'avec un document ---------- */
  drop('moteur', function (q) { return /demandée? au test final/.test(q.q); });

  /* ---------- Hors programme (pas vu en cours) ---------- */
  var HORS = /réduction pilotée/i;
  REV.subjects.forEach(function (s) {
    s.questions = s.questions.filter(function (q) {
      var good = (q.good || [q.a || 0]).map(function (i) { return q.c[i]; }).join(' ');
      if (HORS.test(q.q) || HORS.test(good)) return false;                 // valve de réduction pilotée
      if (q.img && /p71-12|valve-reduction/.test(q.img)) return false;      // son symbole
      if (/spires par mètre/.test(q.q)) return false;                       // torsade du bus CAN
      if (/niveau d’électrolyte/.test(q.q)) return false;                   // niveau des batteries
      if (/grognard|lame de scie/i.test(q.q + good + (q.img || ''))) return false;   // contrôle au grognard
      if (/retour partiel/i.test(q.q + good) && !q.fixed) return false;              // valve de barrage à retour partiel (hors dossier UV2)
      if (q.lkey === 'elec/uv2-elec' && /^\s*5[3-6]\)/.test(q.q)) return false; // portes logiques : barres illisibles
      return true;
    });
    s.questions.forEach(function (q) {
      q.c = q.c.map(function (c) {
        if (!HORS.test(c)) return c;
        return q.c.some(function (x) { return /^Valve relais simple pilotage$/.test(x); }) ? 'Valve de réduction' : 'Valve relais simple pilotage';
      });
    });
  });

  /* grognard et valve de barrage à retour partiel : pas vus en cours, retirés des leçons */
  REV.subjects.forEach(function (s) {
    s.lessons.forEach(function (l) {
      if (l.images) l.images = l.images.filter(function (im) { return !/grognard/.test(im.src); });
      if (l.html) l.html = l.html.replace(/Court-circuit de l’induit\s*:\s*sur un grognard, la lame ne doit pas vibrer\.?/g, '')
        .replace(/\s*court-circuit au grognard \(la lame ne doit pas vibrer\)\.?/g, '.')
        .replace(/<li>[^<]*(?:<b>)?Q11 — Valve de barrage à retour partiel[\s\S]*?<\/li>/g, '')
        .replace(/<li>[^<]*(?:<b>)?Q45 — Priorité de remplissage, avec retour partiel[\s\S]*?<\/li>/g, '');
      if (l.html) l.html = l.html.replace(/\s*Court-circuit de l’induit\s*:\s*sur un grognard[^.<]*\./g, '');
      if (l.retenir) l.retenir = l.retenir.filter(function (r) { return !/grognard/i.test(r); });
    });
  });

  REV.subjects.forEach(function (s) {
    s.questions.forEach(function (q) {
      if (q.fixed) return;
      q.c = q.c.map(function (c, i) {
        if (!/retour partiel/i.test(c) || q.good.indexOf(i) >= 0) return c;
        var alt = ['Valve de barrage sans retour', 'Clapet anti-retour ou valve de retenue', 'Double valve d’arrêt'].filter(function (x) { return q.c.indexOf(x) < 0; })[0];
        return alt || c;
      });
    });
  });

  /* pneumatique : le schéma transmis (GBC 180 ADR) pour les questions du dossier qui ne citent pas de numéro d’élément */
  subj('dsft').questions.forEach(function (q) {
    if (q.lkey === 'dsft/uv2-dsft' && /^1[5-8]\)/.test(q.q)) q.img = 'pneu/gbc180-freinage-couleurs.jpg';
  });

  /* ---------- Références retirées de l'énoncé ---------- */
  each(function (q) {
    q.q = q.q.replace(/\s*\(question à rédiger sur la copie\)/g, '')
      .replace(/\s*\(AQA 03\)/g, '')
      .replace(/\s*\(fiche « l’essentiel »\)/g, '')
      .replace(/Exercice 11 : /, '')
      .replace(/Démonstration du livre : /, '')
      .replace(/Exemple du livre : /, '');
  });
  edit('equip', 'Le capteur à effet Hall est, selon ton cours', { q: 'Le capteur à effet Hall est :' });
  edit('dsft', 'Angle de carrossage : définition retenue au test final', { q: 'Définition de l’angle de carrossage ?' });
  edit('tact', 'Portée maxi du CAESAR retenue dans tes tests', { q: 'Portée maxi du CAESAR ?' });
  edit('hydro', 'Q07 — Débit fourni par la pompe dans cette situation', { q: 'Q07 — Ripper (5 L/min) et orientation (15 L/min) en même temps, plus 1 L/min pour le pilotage LS. Débit fourni par la pompe ?' });
  edit('hydro', 'Q09 — Au neutre, ta fiche retient', { q: 'Q09 — Au neutre, la pompe LS reste à 50 b et débite 1 L/min. Puissance absorbée ?' });
  edit('mcot', 'Q10 — Pour effectué un COS', { c: { 0: 'Être titulaire du BM2 / BSTAT Mobter ou FS1 NG, avoir 2 ans d’atelier, la FA RDC/COS et être inscrit sur le DUO' },
    e: 'Pour tenir le poste au RDC, un militaire doit être titulaire du BM2 / BSTAT Mobter ou du FS1 NG, avoir 2 ans d’atelier, la FA RDC/COS et être inscrit sur le DUO. Un FS2 Mobter peut faire le COS si le besoin est urgent, ponctuel, local.' });
  edit('mcot', 'Q09 — Dans quelle circonstance je doit éffectuer un COS', {
    c: { 0: 'Sur ordre, annuellement (bus : tous les 6 mois), après un remisage de plus de 6 mois (sauf ENU)' }, e: 'COS : sur ordre, une fois par an (bus : 6 mois), après un remisage de plus de 6 mois (sauf ENU). Pas après une RIP : le prestataire rend le véhicule apte et conforme.' });
  edit('mcot', 'Q06 — Qui réparti les différents travaux', { e: 'Le RDC distribue les différents travaux aux ateliers (phase 2 du DIT).' });
  edit('mcot', 'Q07 — Dans tous les cas qui validera la partie 4 du DIT', { e: 'La CDM (ECM, équipe de conduite de la maintenance) ouvre et clôture le DIT (MAT 4486) : c’est elle qui valide la partie 4 dans tous les cas, pas le RDC.' });

  /* ---------- Questions qui dépendaient de la question précédente ou d'un schéma absent ---------- */
  subj('hydro').questions.forEach(function (q) { if (q.l === 'circuit-ferme' && !q.img) q.img = 'exo-hydro-ferme-schema.jpg'; });
  edit('hydro', 'Même pelle : vérin en butée', { q: 'Pelle Load-Sensing (tiroir LS 25 b, annulation de débit 260 b, limiteur principal 300 b) : vérin en butée, fonctionnement normal. Pression lue ?' });
  edit('hydro', 'Même transmission : pression BP au neutre', { q: 'Transmission hydrostatique (gavage 25 b, balayage 22 b, annulation 300 b, soupapes HP 350 b) : pression de la branche BP au neutre ?' });
  edit('hydro', 'Même transmission : pression de service maximale', { q: 'Transmission hydrostatique (gavage 25 b, balayage 22 b, annulation 300 b, soupapes HP 350 b) : pression de service maximale de la branche HP ?' });
  each(function (q) { q.q = q.q.replace(/— Même circuit \(/, '— Circuit (').replace(/— Même bras \(/, '— Bras hydraulique (').replace(/^Même tracteur \(/, 'Tracteur ('); });

  /* ---------- Points tranchés : conditions précisées dans la question ---------- */
  edit('equip', '12 V : 12,2 V à vide, 9,2 V en charge', {
    q: 'Batterie 12 V mesurée au repos (moteur arrêté depuis plus d’une heure) : 12,2 V. Pendant le démarrage : 9,2 V et entraînement faible. Que faites-vous en premier ?',
    e: '12,2 V au repos = batterie chargée seulement entre 20 et 60 %. On la recharge d’abord : l’essai d’aptitude au démarrage ne se fait que sur une batterie correctement rechargée.' });
  edit('equip', 'Batterie 12 V au repos : 12,2 V. Son état de charge', { q: 'Batterie 12 V au repos (stabilisée, sans charge depuis 1 h) : 12,2 V. Son état de charge ?' });
  edit('equip', '44) En actionnant le démarreur', { e: '12,2 V à vide = batterie chargée entre 20 et 60 % : on recharge d’abord. L’essai d’intensité au démarrage ne se fait que sur une batterie correctement rechargée.' });
  edit('equip', '24 V : 24,5 à 25,2 V à vide, 18,6 V sous démarreur', {
    q: 'Réseau 24 V : 24,5 V aux batteries à vide, 18,6 V pendant le démarrage, entraînement faible. Élément à incriminer ?',
    c: { 0: 'Les batteries (déchargées)', 1: 'Lignes + et/ou − du démarreur' },
    e: '18,6 V au démarrage < 19,2 V (80 % de 24 V) : les batteries s’effondrent. À vide, 24,5 V / 12 éléments = 2,04 V par élément (< 2,1 V) : pas complètement chargées. Corrigé du formateur : batteries déchargées.',
    r: 'Sous 19,2 V au démarrage (24 V) = batteries.' });
  edit('pneu', 'Temps de remplissage de toutes les bouteilles selon ton cours', {
    q: 'Norme européenne : moteur au ralenti, en combien de temps toutes les bouteilles doivent-elles atteindre la pression de régulation ?' });
  edit('elec', 'Ex 42 — Moteur de 3 ch', {
    q: 'Ex 42 — Moteur de 3 ch (1 ch = 736 W), rendement 80 %, cos φ = 0,82, en triphasé 380 V. Intensité par phase ? (puissance absorbée = puissance utile ÷ rendement)' });

  /* ---------- Corrections : sans renvoi aux sources ---------- */
  var REFS = /\b(?:AGA|AGB|AGD|GD|AQA|OVI)\s?\d|fiche PPLOG|fiche PMR|ta fiche|tes fiches|fiche mémoire|fiche de révision|du cours|le cours|au cours|ton cours|la copie|corrigé|correction|texte officiel|réponse officielle|test final|formateur|tes tests|du livre|le livre|cahier/i;
  function clean(t) {
    if (typeof t !== 'string') return t;
    t = t.replace(/\s*\(Le corrigé papier[^)]*\)/g, '')
      .replace(/Le cours \(AQA 03\) liste/g, 'Cas prévus')
      .replace(/\(corrigé ci-dessous\)/g, '(schéma ci-dessous)')
      .replace(/Correction du livre pour saturer/g, 'Pour saturer')
      .replace(/Le cours liste/g, 'Cas prévus')
      .replace(/Tableau corrigé\s*:/g, 'Tableau :')
      .replace(/\s*Si la copie[^.]*\./g, '')
      .replace(/\s+(?:du cours|de ton cours|de ta fiche|du livre)(?=\s*:)/g, '');
    // étiquettes de source en début de phrase : « Correction du cahier : », « Cours AGA 01 : »…
    t = t.replace(/(^|[.!?]\s+|<br>)((?:Cours|Texte officiel|Correction|Corrigé|Fiche|Définition|AQA|Réponse|Règle|Ta fiche)[^:.<«]{0,45}?)\s*:\s*/g, function (m, a, label) {
      return (REFS.test(label) || /^(Correction|Corrigé)/.test(label)) ? a : m;
    });
    // parenthèses qui ne font que citer une source
    t = t.replace(/\s*\(([^()<>]*)\)/g, function (m, inner) { return REFS.test(inner) ? '' : m; });
    // courtes phrases qui ne parlent que des sources
    t = t.replace(/(^|[.!?]\s+)([^.!?<>]{0,90}[.!?])(?=\s|$)/g, function (m, a, sent) { return REFS.test(sent) ? a : m; });
    t = t.replace(/\s{2,}/g, ' ').replace(/^\s*[.;:]\s*/, '').trim();
    t = t.replace(/([.!?]\s+)([a-zàâçéèêëîïôûùüÿ])/g, function (m, a, b) { return a + b.toUpperCase(); });
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  each(function (q) {
    var e = clean(q.e);
    q.e = e || ('Réponse : ' + q.good.map(function (i) { return q.c[i]; }).join(' + ') + '.');
    if (q.r) q.r = clean(q.r) || undefined;
    delete q.w;
  });
  // énoncés d'exercice affichés au-dessus des questions : sans renvoi aux sources
  REV.subjects.forEach(function (s) {
    s.lessons.forEach(function (l) {
      if (!l.exo || !l.html) return;
      l.html = l.html.replace(/(<h3>Énoncé<\/h3>)([\s\S]*?)(?=<h3>)/, function (m, h, body) {
        body = body.replace(/<p[^>]*>[\s\S]*?<\/p>/g, function (p) {
            return /recopi|Sujet de préparation|copie|corrigé|vérifiées|découpé|Figures de ton cours|Symboles du récapitulatif|remplacement|formateur/i.test(p.replace(/<[^>]+>/g, '')) ? '' : p;
          })
          .replace(/Formules du livre/g, 'Formules')
          .replace(/\s*\(([^()<>]*)\)/g, function (x, inner) { return REFS.test(inner) ? '' : x; });
        body = body.trim();
        return body ? h + body : '';
      });
    });
  });
  REV.subjects.forEach(function (s) { s.questions.forEach(function (q) { REV.qById[q.id] = q; }); });
})();
