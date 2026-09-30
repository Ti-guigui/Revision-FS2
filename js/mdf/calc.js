/* Manœuvre de force — calculs selon le cours AGB 08 ind. e (méthode S E N S E S R D).
   Tout est en daN et en mètres. Aucune valeur n’est inventée : les règles et coefficients sont ceux du cours ;
   quand le cours ne donne pas de formule (ex. distance des PF en traction renversée), le résultat l’indique. */
(function (root) {
  var MDF = {};
  var r2 = function (x) { return Math.round(x * 100) / 100; };
  var r0 = function (x) { return Math.round(x); };

  /* §13 Coefficients selon la nature du sol */
  MDF.SOLS = {
    macadam: { nom: 'Macadam', fa: 0.7, fr: 0.03 },
    route: { nom: 'Route sèche / chemin dur', fa: 0.5, fr: 0.06 },
    humide: { nom: 'Terrain humide / gravier', fa: 0.4, fr: 0.15 },
    meuble: { nom: 'Terrain meuble', fa: 0.35, fr: 0.3 },
    boue: { nom: 'Boue profonde', fa: 0.3, fr: 0.5 },
    enlise: { nom: 'Enlisé', fa: 2, fr: 2 }
  };
  /* §9.2 Coefficients de matière des arbres (daN/dm²) */
  MDF.ARBRES = { chene: ['Chêne', 500], hetre: ['Hêtre', 400], chataignier: ['Châtaignier', 300], sapin: ['Sapin', 200], bouleau: ['Bouleau', 200], platane: ['Platane', 200] };
  /* §9.1 Points fixes artificiels */
  MDF.PF_TYPES = {
    holmes1: ['Lot Holmès : 1 chevalet', 2000, 4000], holmes2: ['Lot Holmès : 2 chevalets', 4000, 8000], holmes3: ['Lot Holmès : 3 chevalets', 8000, 15000],
    holmesV: ['2 lots Holmès en V (élingue de répartition + poulie d’équilibrage)', 15000, 30000],
    roue5: ['Roue de secours + 5 piquets', 5000, 5000], roue8: ['Roue de secours + 8 piquets', 8000, 8000], piquets4: ['4 piquets en ligne (cordage uniquement)', 4000, 4000]
  };

  /* §4.2.2 Coefficient de pente : ≤ 50 % → p ; 50-100 % → sinus (table §14) ; ≥ 100 % → R = P */
  MDF.penteCoef = function (p) {
    p = +p || 0;
    if (p <= 50) return { c: p / 100, txt: p + ' % ≤ 50 % → Rp = P × ' + r2(p / 100) };
    if (p < 100) { var s = r2(Math.sin(Math.atan(p / 100))); return { c: s, txt: p + ' % entre 50 et 100 % → Rp = P × sinus correspondant (' + s + ', table trigonométrique)' }; }
    return { c: 1, total: true, txt: p + ' % ≥ 100 % → R = P' };
  };

  /* S — Somme des résistances du fardeau */
  MDF.resistance = function (f) {
    var P = +f.poids, sol = MDF.SOLS[f.sol] || MDF.SOLS.route, st = [];
    if (!(P > 0)) return { err: 'Entre le poids du fardeau.' };
    if (f.mode === 'retournement') { st.push('Retournement : R = 2/3 × P = 2/3 × ' + P); return { R: r0(2 * P / 3), steps: st }; }
    if (f.mode === 'enlise') { st.push('Enlisement jusqu’aux essieux : R = 2 × P = 2 × ' + P); return { R: 2 * P, steps: st }; }
    var coef = f.mode === 'glisse' ? sol.fa : sol.fr, base = P * coef;
    st.push((f.mode === 'glisse' ? 'Rg = P × fg = ' : 'Rr = P × fr = ') + P + ' × ' + coef + ' = ' + r0(base) + ' daN (' + sol.nom + ')');
    var p = f.sens === 'plat' ? 0 : +f.pente || 0, R = base;
    if (p > 0) {
      var pc = MDF.penteCoef(p);
      if (pc.total) { st.push(pc.txt + ' = ' + P + ' daN'); return { R: P, steps: st }; }
      var Rp = P * pc.c; st.push(pc.txt + ' = ' + r0(Rp) + ' daN');
      if (f.sens === 'descend') { R = base - Rp; st.push('Descente : R = Rr − Rp = ' + r0(base) + ' − ' + r0(Rp) + ' = ' + r0(R) + ' daN'); }
      else { R = base + Rp; st.push('Montée : R = ' + r0(base) + ' + ' + r0(Rp) + ' = ' + r0(R) + ' daN'); }
    }
    if (R < 0) { st.push('R négatif : le fardeau descend seul. Il faut une force de retenue de ' + r0(-R) + ' daN : on dimensionne le mouflage de retenue avec cette valeur.'); return { R: r0(-R), retenue: true, steps: st }; }
    return { R: r0(R), steps: st };
  };

  /* E — Effort moteur disponible */
  MDF.emd = function (t) {
    var P = +t.poids, sol = MDF.SOLS[t.sol] || MDF.SOLS.route, st = [];
    if (!(P > 0)) return { err: 'Entre le poids du tracteur.' };
    if (t.type === 'treuil') {
      var FT = +t.ft; if (!(FT > 0)) return { err: 'Entre la force du treuil (valeur mini constructeur, câble enroulé).' };
      var A = P * sol.fa; st.push('A = P × fa = ' + P + ' × ' + sol.fa + ' = ' + r0(A) + ' daN');
      if (t.beches) { A += FT; st.push('Avec bêches / socs d’ancrage : A = P × fa + FT = ' + r0(A) + ' daN'); }
      if (A >= FT) { st.push('A ≥ FT → EMD = FT = ' + FT + ' daN'); return { EMD: FT, steps: st }; }
      st.push('A < FT → la force du treuil est limitée par l’adhérence : EMD = A = ' + r0(A) + ' daN (augmenter l’adhérence si possible : bêches, socs)');
      return { EMD: r0(A), steps: st, limite: true };
    }
    var pm = +t.pm; if (!(pm > 0)) return { err: 'Entre la puissance moteur du tracteur.' };
    if (t.pmUnit === 'ch') { st.push('Puissance : ' + pm + ' ch × 0,736 = ' + r2(pm * 0.736) + ' kW'); pm = pm * 0.736; }
    var v = +t.v || 5, Fj = 270 * pm / v; st.push('Fj = 270 × Pm / v = 270 × ' + r2(pm) + ' / ' + v + ' = ' + r0(Fj) + ' daN');
    var A2 = t.ponts === 'un' ? 2 * P * sol.fa / 3 : P * sol.fa;
    st.push((t.ponts === 'un' ? 'Un seul pont moteur : A = 2/3 × P × fa = ' : 'Tous les ponts moteurs : A = P × fa = ') + r0(A2) + ' daN');
    var base = Math.min(Fj, A2); st.push('On retient la plus petite des deux : ' + r0(base) + ' daN (' + (A2 < Fj ? 'adhérence' : 'force à la jante') + ')');
    var Rr = P * sol.fr, p = t.sensT === 'plat' ? 0 : +t.penteT || 0, Rp = 0, pc = null;
    if (p > 0) { pc = MDF.penteCoef(p); Rp = P * (pc.total ? 1 : pc.c); }
    var RT = t.sensT === 'descend' ? Rr - Rp : Rr + Rp;
    st.push(p ? 'ΣRT = Rr ' + (t.sensT === 'descend' ? '−' : '+') + ' Rp = ' + r0(Rr) + (t.sensT === 'descend' ? ' − ' : ' + ') + r0(Rp) + ' = ' + r0(RT) + ' daN' : 'ΣRT = Rr = P × fr = ' + P + ' × ' + sol.fr + ' = ' + r0(RT) + ' daN');
    var FC = base - RT; st.push('EMD = FC = ' + r0(base) + ' − ' + r0(RT) + ' = ' + r0(FC) + ' daN');
    if (FC <= 0) return { err: 'La force au crochet est nulle ou négative : ce tracteur ne peut pas tirer dans ces conditions.', steps: st };
    return { EMD: r0(FC), steps: st };
  };

  /* N — Nombre de brins (§5) */
  MDF.nbRegles = function (R, EMD) {
    var raw = R / EMD, n1 = Math.ceil(raw - 1e-9), n2 = n1 < 4 ? n1 + 1 : n1 + 2;
    return { raw: r2(raw), n1: n1, n2: n2, steps: ['Nb = R / EMD = ' + R + ' / ' + EMD + ' = ' + r2(raw), '1ʳᵉ règle (entier supérieur) : ' + n1, '2ᵉ règle : ' + n1 + (n1 < 4 ? ' < 4 → + 1 brin' : ' ≥ 4 → + 2 brins') + ' = ' + n2 + ' brins'] };
  };
  /* Décomposition : ≤ 5 brins en liaison directe (§6.4.1), sinon mouflage composé = produit de mouflages de 2 à 5 brins */
  function decomp(n) {
    if (n <= 5) return [n];
    var best = null;
    (function rec(rest, max, acc) {
      if (rest === 1) { if (!best || acc.length < best.length || (acc.length === best.length && acc[0] < best[0])) best = acc.slice(); return; }
      for (var f = Math.min(5, max); f >= 2; f--) if (rest % f === 0) { acc.push(f); rec(rest / f, f, acc); acc.pop(); }
    })(n, 5, []);
    return best;
  }
  MDF.decomp = decomp;
  function feasible(n) { return n >= 1 && !!decomp(n); }

  /* Calcul d’un mouflage : stages ordonnés du fardeau (1) vers le tracteur (m). */
  MDF.mouflage = function (factors, EMD, renverse, trou) {
    var m = factors.length, S = [], F = EMD;
    for (var s = m; s >= 1; s--) {
      var n = factors[s - 1], rev = renverse && s === m, E = [];
      E.push(F); /* k = 0 : garant (ou brin de manœuvre en traction renversée) */
      for (var k = 1; k <= (rev ? n : n - 1); k++) E.push(F * Math.pow(0.9, k));
      var act = rev ? E.slice(1) : E, out = act.reduce(function (a, b) { return a + b; }, 0);
      var pul = [], dorm, pfLoad = 0, renvoi = null;
      var last = E.length - 1;
      for (k = 0; k < last; k++) {
        var side = rev ? (k === 0 ? 'renvoi' : (k % 2 ? 'bloc' : 'pf')) : (k % 2 ? 'pf' : 'bloc');
        pul.push({ k: k, side: side, load: E[k] + E[k + 1] });
      }
      var lastPoulieSide = last > 0 ? pul[pul.length - 1].side : null;
      var dormSide = last === 0 ? 'bloc' : (lastPoulieSide === 'bloc' ? 'pf' : 'bloc');
      if (rev && last > 0 && lastPoulieSide === 'renvoi') dormSide = 'bloc';
      dorm = { side: dormSide, load: E[last] };
      for (k = rev ? 2 : 1; k <= last; k++) pfLoad += E[k];
      if (rev) renvoi = E[0] + E[1];
      S[s - 1] = { s: s, n: n, rev: rev, input: F, E: E, active: act, out: out, poulies: pul, dormant: dorm, pf: pfLoad, renvoi: renvoi };
      F = out;
    }
    var EMT = F, steps = [];
    for (s = m; s >= 1; s--) {
      var st = S[s - 1];
      steps.push((m > 1 ? 'Mouflage ' + s + ' (' + st.n + ' brins' + (st.rev ? ', traction renversée' : '') + ') : ' : '') + (st.rev ? 'brin de manœuvre ' + r0(st.E[0]) + ' daN (non compté) ; ' : '') + st.active.map(function (x) { return r0(x); }).join(' + ') + ' = ' + r0(st.out) + ' daN' + (s > 1 ? ' → reporté sur le garant du mouflage ' + (s - 1) : ''));
    }
    if (trou) { steps.push('Frottement en sommet de pente : EMT × 0,9 = ' + r0(EMT) + ' × 0,9 = ' + r0(EMT * 0.9) + ' daN'); EMT *= 0.9; }
    return { stages: S, EMT: r0(EMT), steps: steps };
  };

  function secu(EMT, R) { return (EMT - R) / R * 100; }

  /* Choix du nombre de brins : 2 règles, puis faisabilité du schéma, puis contrôle de la sécurité (15 % ≤ S ≤ 70 %) */
  MDF.choisir = function (R, EMD, renverse, trou) {
    var nb = MDF.nbRegles(R, EMD), steps = nb.steps.slice(), n = nb.n2, seen = {}, hist = [];
    if (!feasible(n)) { var n0 = n; while (!feasible(n)) n++; steps.push(n0 + ' brins ne se décompose pas en mouflages de 2 à 5 brins → ' + n + ' brins (' + decomp(n).join(' × ') + ')'); }
    for (var it = 0; it < 40; it++) {
      var f = decomp(n), mf = MDF.mouflage(f, EMD, renverse, trou), S = secu(mf.EMT, R);
      hist.push({ n: n, EMT: mf.EMT, S: r2(S) }); seen[n] = S;
      if (S < 15) {
        var up = n + 1; while (!feasible(up)) up++;
        if (seen[up] !== undefined && seen[up] > 70) { steps.push('Aucun nombre de brins ne donne 15 % ≤ S ≤ 70 % : on garde ' + up + ' brins (S > 70 %, sécurité conservée).'); n = up; break; }
        steps.push('S = ' + r2(S) + ' % < 15 % → on ajoute 1 brin : ' + up + ' brins, on reprend à l’étape du schéma'); n = up; continue;
      }
      if (S > 70 && n > 1) {
        var dn = n - 1; while (dn > 1 && !feasible(dn)) dn--;
        if (seen[dn] !== undefined && seen[dn] < 15) { steps.push('En enlevant 1 brin, S passe sous 15 % : on garde ' + n + ' brins (S = ' + r2(S) + ' %).'); break; }
        var mfd = MDF.mouflage(decomp(dn), EMD, renverse, trou), Sd = secu(mfd.EMT, R);
        if (Sd < 15) { seen[dn] = Sd; steps.push('S = ' + r2(S) + ' % > 70 %, mais avec ' + dn + ' brins S = ' + r2(Sd) + ' % < 15 % : on garde ' + n + ' brins (la sécurité passe avant).'); break; }
        steps.push('S = ' + r2(S) + ' % > 70 % → on enlève 1 brin : ' + dn + ' brins, on reprend à l’étape du schéma'); n = dn; continue;
      }
      steps.push('S = (EMT − R) / R × 100 = (' + mf.EMT + ' − ' + R + ') / ' + R + ' × 100 = ' + r2(S) + ' % → compris entre 15 et 70 % : correct.');
      break;
    }
    var fin = decomp(n), res = MDF.mouflage(fin, EMD, renverse, trou);
    return { nb: nb, n: n, factors: fin, mouflage: res, S: r2(secu(res.EMT, R)), steps: steps, hist: hist };
  };

  /* R — Résistance des points fixes et agrès : besoins et affectation du matériel disponible */
  MDF.pfResistance = function (pf) {
    if (pf.type === 'arbre') { var a = MDF.ARBRES[pf.essence] || MDF.ARBRES.sapin, d = (+pf.d || 0) / 10; return { r: r0(a[1] * d * d), nom: a[0] + ' Ø ' + (+pf.d || 0) + ' cm', calc: a[1] + ' × ' + r2(d) + '² = ' + r0(a[1] * d * d) + ' daN' }; }
    if (MDF.PF_TYPES[pf.type]) { var t = MDF.PF_TYPES[pf.type], v = pf.solDur ? t[2] : t[1]; return { r: v, nom: t[0], calc: (t[1] === t[2] ? '' : (pf.solDur ? 'valeur maxi (sol dur)' : 'valeur mini (sol meuble ou douteux)') + ' : ') + v + ' daN' }; }
    return { r: +pf.r || 0, nom: pf.nom || 'Point fixe', calc: (+pf.r || 0) + ' daN (valeur saisie)' };
  };
  function assign(needs, stock, label) {
    /* stock : [{cmu, n, nom}] → affectation du plus petit élément suffisant, besoins triés du plus chargé au moins chargé */
    var pool = []; (stock || []).forEach(function (it, i) { for (var j = 0; j < (+it.n || 1); j++) pool.push({ i: i, cmu: +it.cmu || 0, nom: it.nom || '', used: false }); });
    pool.sort(function (a, b) { return a.cmu - b.cmu; });
    needs.slice().sort(function (a, b) { return b.load - a.load; }).forEach(function (nd) {
      var ok = pool.filter(function (p) { return !p.used && p.cmu >= nd.load; })[0];
      if (ok) { ok.used = true; nd.item = (ok.nom ? ok.nom + ' — ' : '') + 'CMU ' + ok.cmu + ' daN'; nd.ok = true; } else { nd.ok = false; nd.item = 'Aucun ' + label + ' disponible de CMU ≥ ' + r0(nd.load) + ' daN'; }
    });
    return needs;
  }

  MDF.agres = function (res, tr, stock) {
    var S = res.mouflage.stages, m = S.length, pul = [], man = [], pfs = [], cab = [], pc = 0, mc = 0;
    function lieu(st, side) { return side === 'bloc' ? (st.s === 1 ? 'sur le fardeau' : 'moufle mobile M' + (st.s - 1)) : side === 'renvoi' ? 'PF de renvoi' : 'PF' + st.s; }
    S.forEach(function (st) {
      st.poulies.forEach(function (p) { p.id = 'P' + (++pc); pul.push({ id: p.id, load: r0(p.load), lieu: lieu(st, p.side), stage: st.s }); man.push({ id: 'M' + (++mc), load: r0(p.load), lieu: 'attache de la poulie ' + p.id + ' (' + lieu(st, p.side) + ')' }); });
      st.dormant.id = 'M' + (++mc); man.push({ id: st.dormant.id, load: r0(st.dormant.load), lieu: 'dormant du mouflage ' + st.s + ' (' + lieu(st, st.dormant.side) + ')' });
      if (st.s > 1) man.push({ id: 'M' + (++mc), load: r0(st.out), lieu: 'liaison moufle M' + (st.s - 1) + ' ↔ garant du mouflage ' + (st.s - 1) });
      if (st.pf > 0) pfs.push({ id: 'PF' + st.s, load: r0(st.pf), detail: 'somme des brins arrivant au PF' + st.s });
      if (st.renvoi) pfs.push({ id: 'PF renvoi', load: r0(st.renvoi), detail: 'brin de manœuvre + 1ᵉʳ brin actif' });
      var isTreuil = tr.type === 'treuil' && st.s === m;
      cab.push({ id: 'Câble ' + st.s, stage: st.s, load: r0(Math.max.apply(null, st.E)), treuil: isTreuil });
    });
    assign(pul, stock.poulies, 'poulie'); assign(man, stock.manilles, 'manille');
    /* Points fixes */
    var pool = (stock.pf || []).map(function (p, i) { var x = MDF.pfResistance(p); x.i = i; x.used = false; x.type = p.type; return x; }).sort(function (a, b) { return a.r - b.r; });
    pfs.slice().sort(function (a, b) { return b.load - a.load; }).forEach(function (nd) {
      var ok = pool.filter(function (p) { return !p.used && p.r >= nd.load; })[0];
      if (ok) { ok.used = true; nd.ok = true; nd.item = ok.nom + ' (' + ok.calc + ')'; nd.court = ok.nom; nd.type = ok.type; } else { nd.ok = false; nd.item = 'Aucun point fixe disponible ≥ ' + nd.load + ' daN'; }
    });
    /* Câbles : le treuil utilise son câble ; les autres mouflages prennent le plus long câble de CMU suffisante */
    var cpool = []; (stock.cables || []).forEach(function (c) { for (var j = 0; j < (+c.n || 1); j++) cpool.push({ lc: +c.lc || 0, cmu: +c.cmu || 0, nom: c.nom || '', used: false }); });
    cpool.sort(function (a, b) { return b.lc - a.lc; });
    cab.slice().sort(function (a, b) { return b.load - a.load; }).forEach(function (c) {
      if (c.treuil) { c.lc = +tr.lc || 0; c.cmu = +tr.cmuCable || 0; c.ok = c.cmu ? c.cmu >= c.load : null; c.item = 'Câble du treuil ' + (c.lc ? c.lc + ' m' : '(longueur ?)') + (c.cmu ? ', CMU ' + c.cmu + ' daN' : ', CMU non saisie'); return; }
      var ok = cpool.filter(function (p) { return !p.used && p.cmu >= c.load; })[0];
      if (ok) { ok.used = true; c.lc = ok.lc; c.cmu = ok.cmu; c.ok = true; c.item = (ok.nom ? ok.nom + ' — ' : '') + ok.lc + ' m, CMU ' + ok.cmu + ' daN'; } else { c.ok = false; c.item = 'Aucun câble de CMU ≥ ' + c.load + ' daN'; }
    });
    /* Élingues / sangles : autour des points fixes naturels ou de la roue de secours, et points d’accrochage sur le fardeau */
    var eli = [], ec = 0;
    pfs.forEach(function (q) { if (q.ok && !/^holmes/.test(q.type || '')) eli.push({ id: 'E' + (++ec), load: q.load, lieu: 'autour du point fixe ' + q.id + ' (' + (q.court || '') + ')' }); });
    var s1 = S[0]; s1.poulies.forEach(function (p) { if (p.side === 'bloc') eli.push({ id: 'E' + (++ec), load: r0(p.load), lieu: 'accrochage de la poulie ' + p.id + ' sur le fardeau (ou anneau de remorquage de CMU suffisante)' }); });
    if (s1.dormant.side === 'bloc') eli.push({ id: 'E' + (++ec), load: r0(s1.dormant.load), lieu: 'accrochage du dormant sur le fardeau (ou anneau de remorquage)' });
    assign(eli, stock.elingues, 'élingue');
    return { poulies: pul, manilles: man, pfs: pfs, cables: cab, elingues: eli };
  };

  /* D — Distances (§10 à §12) */
  MDF.distances = function (res, ag, tr, f) {
    var S = res.mouflage.stages, m = S.length, Nb = res.n, st = [], out = { dpf: {} }, lg = +tr.lg || 5, ls = +tr.ls || 0, lbm = +tr.lbm || 5;
    var L = function (s) { var c = ag.cables.filter(function (x) { return x.stage === s; })[0]; return c && c.lc ? c.lc : 0; };
    var rev = !!tr.renverse, treuil = tr.type === 'treuil';
    for (var q = 1; q <= m; q++) if (!L(q)) { out.err = 'Pas de câble utilisable pour le ' + (m > 1 ? 'mouflage ' + q : 'mouflage') + ' (longueur ou CMU insuffisante) : distances non calculables.'; st.push(out.err); out.steps = st; return out; }
    if (rev) {
      st.push('Traction renversée : le cours ne donne pas de formule de distance des points fixes → implanter les PF sur le terrain (brin de manœuvre ≈ ' + lbm + ' m).');
      if (!treuil) { var DT = L(m) - lbm; out.DT = r2(DT); st.push('DT = Lc − brin de manœuvre = ' + L(m) + ' − ' + lbm + ' = ' + r2(DT) + ' m'); out.D = r2(DT / Nb); st.push('D fardeau = DT / Nb total = ' + r2(DT) + ' / ' + Nb + ' = ' + out.D + ' m'); }
      else st.push('Traction renversée au treuil : pas de formule de déplacement dans le cours.');
      return finish();
    }
    var sumLg = 0;
    for (var s = 1; s <= m; s++) {
      var n = S[s - 1].n, lc = L(s), d;
      if (s === m && treuil) { d = (lc - ls) / n + sumLg; st.push('DPF' + (m > 1 ? s : '') + ' = (Lc − Ls) / Nb' + (m > 1 ? s : '') + (sumLg ? ' + ΣLg' : '') + ' = (' + lc + ' − ' + ls + ') / ' + n + (sumLg ? ' + ' + sumLg : '') + ' = ' + r2(d) + ' m'); }
      else { d = (lc - lg) / (n - 1) + sumLg; st.push('DPF' + (m > 1 ? s : '') + ' = (Lc' + (m > 1 ? s : '') + ' − Lg) / (Nb' + (m > 1 ? s : '') + ' − 1)' + (sumLg ? ' + ΣLg' : '') + ' = (' + lc + ' − ' + lg + ') / ' + (n - 1) + (sumLg ? ' + ' + sumLg : '') + ' = ' + r2(d) + ' m'); }
      out.dpf[s] = r2(d); if (!(d > 0)) out.err = 'Câble trop court pour le mouflage ' + s + '.';
      sumLg += lg;
    }
    if (m > 2) st.push('(3 mouflages ou plus : formules du cours étendues, « etc. »)');
    if (treuil) { var lcT = L(m); out.D = r2((lcT - ls) / Nb); st.push('Traction au treuil : D fardeau = (Lc − Ls) / Nb total = (' + lcT + ' − ' + ls + ') / ' + Nb + ' = ' + out.D + ' m'); }
    else {
      var DT2 = out.dpf[m] - (m === 1 ? lg : lg * m) + L(m); out.DT = r2(DT2);
      st.push('DT = DPF' + (m > 1 ? m : '') + ' − ' + (m === 1 ? 'Lg' : 'ΣLg') + ' + Lc' + (m > 1 ? m : '') + ' = ' + out.dpf[m] + ' − ' + (m === 1 ? lg : lg * m) + ' + ' + L(m) + ' = ' + out.DT + ' m');
      out.D = r2(DT2 / Nb); st.push('D fardeau = DT / Nb total = ' + out.DT + ' / ' + Nb + ' = ' + out.D + ' m');
    }
    return finish();
    function finish() {
      if (out.D > 0 && +f.deplacement > 0) { out.reprises = Math.ceil(+f.deplacement / out.D - 1e-9); st.push('Déplacement demandé ' + f.deplacement + ' m → ' + (out.reprises <= 1 ? 'réalisable en une seule fois.' : out.reprises + ' reprises (reculer les PF / reprendre le mouflage entre chaque).')); }
      out.steps = st; return out;
    }
  };

  /* Ambiance locale et terrain (§1.2, §3) : précautions, zone à évacuer */
  MDF.ambiance = function (d, D) {
    var f = d.fardeau, a = [], w = [];
    if (f.nuit) a.push('Nuit : éclairer la zone, transmettre les commandements par moyens visuels (phares, projecteurs) et doubler les moyens de transmission ; le chef de manœuvre doit voir et être vu.');
    if (f.meteo === 'pluie') { a.push('Pluie : sol glissant et moins porteur.'); if (f.sol === 'macadam' || f.sol === 'route') w.push('Il pleut mais le sol choisi est sec : prends plutôt « terrain humide » ou « meuble » (coefficients plus défavorables).'); }
    if (f.meteo === 'gel' || f.meteo === 'neige') { a.push('Gel / neige : adhérence du tracteur réduite, sol parfois dur en surface mais meuble dessous ; câbles et agrès raides, gants obligatoires.'); w.push('Le cours ne donne pas de coefficient pour la neige ou le verglas : prends le coefficient d’adhérence le plus défavorable (boue profonde, fa 0,3) et les valeurs mini des points fixes.'); }
    if (f.meteo === 'vent') a.push('Vent fort : attention aux fardeaux suspendus ou instables.');
    if (f.blesses) a.push('Présence de blessés : précautions particulières, ne pas déplacer brutalement le fardeau.');
    if (f.bulle) a.push('Contexte opérationnel : bulle de sécurité autour de la manœuvre.');
    if ((d.stock.pf || []).some(function (p) { return /^holmes/.test(p.type) && p.solDur; }) && (f.meteo === 'pluie' || f.sol === 'meuble' || f.sol === 'boue' || f.sol === 'humide')) w.push('Tu as pris la valeur MAXI d’un lot Holmès alors que le sol est humide ou meuble : prends la valeur mini.');
    var L = +f.longueur || 0, zone = null;
    if (D && D.dpf) { var mx = Math.max.apply(null, Object.keys(D.dpf).map(function (k) { return D.dpf[k]; }).concat([D.DT || 0])); if (mx > 0) zone = r2(mx + L); }
    if (zone) a.push('Zone à évacuer (polygone câbles – points fixes – tracteur – fardeau) : au moins ' + zone + ' m de long' + (L ? ' (longueur du véhicule ' + L + ' m comprise)' : '') + ', plus le prolongement des câbles.');
    if (L && D && D.dpf) a.push('Longueur du véhicule à dépanner : ' + L + ' m. Les distances DPF sont mesurées à partir du point d’accrochage sur le fardeau.');
    return { a: a, w: w, zone: zone };
  };

  MDF.calculer = function (d) {
    var R = MDF.resistance(d.fardeau); if (R.err) return { err: R.err };
    var E = MDF.emd(d.tracteur); if (E.err) return { err: E.err, R: R, E: E };
    var t = d.tracteur, res = MDF.choisir(R.R, E.EMD, !!t.renverse, !!d.fardeau.trou);
    var ag = MDF.agres(res, t, d.stock || {}), D = MDF.distances(res, ag, t, d.fardeau);
    var ok = ag.poulies.concat(ag.manilles, ag.pfs, ag.cables, ag.elingues).every(function (x) { return x.ok !== false; }) && !D.err && res.S >= 15;
    return { R: R, E: E, res: res, ag: ag, D: D, ok: ok, amb: MDF.ambiance(d, D) };
  };

  if (typeof module !== 'undefined') module.exports = MDF; else root.MDF = MDF;
})(this);
