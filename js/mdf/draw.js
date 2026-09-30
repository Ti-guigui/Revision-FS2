/* Manœuvre de force — dessin du mouflage (SVG), symboles du cours AGB 08 : fardeau (rectangle barré), point fixe (triangle),
   poulie (cercle), tracteur, treuil. Les efforts de chaque brin sont écrits sur le schéma. */
(function (root) {
  var MDF = root.MDF || require('./calc.js');
  var COL = ['#2563eb', '#dc2626', '#16a34a', '#9333ea'];
  var nf = function (x) { return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
  var df = function (x) { return String(Math.round(x * 100) / 100).replace('.', ','); };

  MDF.svg = function (out, tr) {
    var S = out.res.mouflage.stages, m = S.length, g = 36, r = g / 2 - 2, rev = !!tr.renverse, treuil = tr.type === 'treuil';
    var ag = out.ag, D = out.D, parts = [], y = 100, lanes = {}, stageTop = {}, stageBot = {};
    /* lanes : stage 1 en haut ; dans un stage, le dormant (k max) en haut et le garant (k = 0) en bas */
    S.forEach(function (st) { stageTop[st.s] = y; for (var k = st.E.length - 1; k >= 0; k--) { lanes[st.s + ':' + k] = y; y += g; } stageBot[st.s] = y - g; if (rev && st.s === m && m === 1) stageBot[st.s] = lanes[st.s + ':1']; y += 22; });
    var H = y + 150 + m * 34, W = 1060;
    var X0 = rev ? 150 : 0; W += X0;
    var bx = function (s) { return X0 + 250 + (s - 1) * 150; };
    var px = function (s) { return X0 + 680 + (s - 1) * 60; };
    var pRx = px(m) + 110;
    var ly = function (s, k) { return lanes[s + ':' + k]; };
    function line(x1, y1, x2, y2, c, w, dash) { parts.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + (w || 3) + '"' + (dash ? ' stroke-dasharray="6 5"' : '') + ' stroke-linecap="round"/>'); }
    function text(x, y2, t, o) { o = o || {}; parts.push('<text x="' + x + '" y="' + y2 + '" font-size="' + (o.s || 13) + '" font-weight="' + (o.b ? 700 : 500) + '" fill="' + (o.c || '#111827') + '" text-anchor="' + (o.a || 'middle') + '">' + t + '</text>'); }
    function circle(x, y2, rr, c, fill) { parts.push('<circle cx="' + x + '" cy="' + y2 + '" r="' + rr + '" fill="' + (fill || '#fff') + '" stroke="' + c + '" stroke-width="2.5"/>'); }
    function pf(x, y1, y2, lab, lab2, ok) {
      var cy = (y1 + y2) / 2, c = ok === false ? '#dc2626' : '#111827';
      line(x, y1, x, y2, '#111827', 3); line(x, cy, x + 22, cy, '#111827', 3);
      parts.push('<polygon points="' + (x + 22) + ',' + (cy - 20) + ' ' + (x + 60) + ',' + cy + ' ' + (x + 22) + ',' + (cy + 20) + '" fill="#fef3c7" stroke="#111827" stroke-width="2.5"/>');
      text(x + 64, cy - 2, lab, { b: 1, c: c, a: 'start', s: 12 }); if (lab2) text(x + 64, cy + 14, lab2, { s: 11, c: c, a: 'start' });
    }
    function truck(x, y2, dir, label) {
      parts.push('<g transform="translate(' + x + ',' + (y2 - 14) + ')' + (dir < 0 ? ' scale(-1,1)' : '') + '"><rect x="0" y="0" width="46" height="20" rx="3" fill="#e5e7eb" stroke="#111827" stroke-width="2"/><rect x="46" y="6" width="16" height="14" rx="2" fill="#e5e7eb" stroke="#111827" stroke-width="2"/><circle cx="12" cy="24" r="6" fill="#111827"/><circle cx="46" cy="24" r="6" fill="#111827"/></g>');
      text(x + (dir < 0 ? -31 : 31), y2 + 32, label, { s: 12, b: 1 });
      if (!dir) return; var ax = dir < 0 ? x - 70 : x + 70; line(ax, y2 - 26, ax + 26 * dir, y2 - 26, '#111827', 2.5);
      parts.push('<polygon points="' + (ax + 26 * dir) + ',' + (y2 - 32) + ' ' + (ax + 36 * dir) + ',' + (y2 - 26) + ' ' + (ax + 26 * dir) + ',' + (y2 - 20) + '" fill="#111827"/>');
    }
    parts.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    text(20, 30, 'Mouflage ' + (m === 1 ? 'simple' : 'composé ' + S.map(function (s) { return s.n; }).join(' × ')) + ' — ' + out.res.n + ' brins' + (rev ? ' — traction renversée' : ' — traction droite') + ' — ' + (treuil ? 'force au treuil' : 'force au crochet'), { a: 'start', b: 1, s: 16 });
    text(20, 50, 'R = ' + nf(out.R.R) + ' daN · EMD = ' + nf(out.E.EMD) + ' daN · EMT = ' + nf(out.res.mouflage.EMT) + ' daN · S = ' + df(out.res.S) + ' %', { a: 'start', s: 13 });
    /* Fardeau */
    var fy1 = stageTop[1] - 18, fy2 = stageBot[1] + 18;
    var FX = X0 + 40, FX2 = X0 + 150;
    parts.push('<rect x="' + FX + '" y="' + fy1 + '" width="110" height="' + (fy2 - fy1) + '" fill="#f3f4f6" stroke="#111827" stroke-width="3"/>');
    line(FX, fy1, FX2, fy2, '#111827', 2); line(FX2, fy1, FX, fy2, '#111827', 2);
    text(FX, fy1 - 8, 'FARDEAU · R = ' + nf(out.R.R) + ' daN' + (+tr.longueur ? ' · L = ' + df(+tr.longueur) + ' m' : ''), { b: 1, s: 12, a: 'start' });
    S.forEach(function (st) {
      var s = st.s, c = COL[(s - 1) % COL.length], last = st.E.length - 1, isM = s === m;
      var pfR = px(s) + r + 8;
      /* brins */
      for (var k = 0; k <= last; k++) {
        var yy = ly(s, k), x1 = bx(s), x2;
        if (rev && isM && k === 0) { x1 = 110; x2 = pRx; }
        else if (k === 0) { x2 = isM ? (treuil ? px(m) + 75 : bx(m) + 170) : bx(s + 1); }
        else x2 = (rev && isM && k === 1) ? pRx : px(s);
        line(x1, yy, x2, yy, c, 3, rev && isM && k === 0);
        var lab = nf(st.E[k]) + ' daN' + (rev && isM && k === 0 ? ' (brin de manœuvre)' : k === 0 ? ' (garant)' : k === last ? ' (dormant)' : '');
        text((Math.max(x1, bx(s)) + Math.min(x2, px(s))) / 2, yy - 6, lab, { s: 12, c: c, b: 1 });
        if (k === 0 && !isM) { var ty = (ly(s + 1, 0) + ly(s + 1, 1)) / 2; line(x2, yy, x2, ty, c, 3); }
      }
      /* bloc (fardeau ou moufle mobile) */
      var blocYs = [];
      st.poulies.forEach(function (p) {
        var x = p.side === 'bloc' ? bx(s) : p.side === 'pf' ? px(s) : pRx, cy = (ly(s, p.k) + ly(s, p.k + 1)) / 2;
        circle(x, cy, r, c); parts.push('<circle cx="' + x + '" cy="' + cy + '" r="3.5" fill="' + c + '"/>');
        text(x + (p.side === 'bloc' ? -r - 3 : -r - 6), p.side === 'bloc' ? cy - 5 : cy + 4, p.id + ' ≥ ' + nf(p.load), { s: 11, b: 1, c: c, a: 'end' });
        if (p.side === 'bloc') blocYs.push(cy);
      });
      var dy = ly(s, last), dSide = st.dormant.side;
      if (dSide === 'bloc') { parts.push('<circle cx="' + bx(s) + '" cy="' + dy + '" r="5" fill="' + c + '"/>'); blocYs.push(dy); }
      if (s === 1) blocYs.forEach(function (yy) { line(FX2, yy, bx(1), yy, '#111827', 2.5); });
      else if (blocYs.length) { var y1 = Math.min.apply(null, blocYs), y2 = Math.max.apply(null, blocYs); if (y2 > y1) line(bx(s), y1, bx(s), y2, '#111827', 3); text(bx(s), y2 + r + 30, 'moufle M' + (s - 1), { s: 11 }); }
      /* point fixe du mouflage */
      var pfYs = st.poulies.filter(function (p) { return p.side === 'pf'; }).map(function (p) { return (ly(s, p.k) + ly(s, p.k + 1)) / 2; });
      if (dSide === 'pf') { pfYs.push(dy); parts.push('<circle cx="' + px(s) + '" cy="' + dy + '" r="5" fill="' + c + '"/>'); line(px(s), dy, pfR, dy, c, 3); }
      if (pfYs.length) {
        var need = ag.pfs.filter(function (q) { return q.id === 'PF' + s; })[0] || {};
        pfYs.forEach(function (yy) { line(px(s) + (dSide === 'pf' && yy === dy ? 0 : r), yy, pfR, yy, '#111827', 2.5); });
        pf(pfR, Math.min.apply(null, pfYs), Math.max.apply(null, pfYs), 'PF' + s + ' ≥ ' + nf(st.pf) + ' daN', need.ok === false ? '⚠ à trouver' : (need.court || ''), need.ok);
      }
      if (st.renvoi) {
        var ry = (ly(s, 0) + ly(s, 1)) / 2, nR = ag.pfs.filter(function (q) { return q.id === 'PF renvoi'; })[0] || {};
        line(pRx + r, ry, pRx + r + 8, ry, '#111827', 2.5);
        pf(pRx + r + 8, ry - 4, ry + 4, 'PF renvoi ≥ ' + nf(st.renvoi) + ' daN', nR.ok === false ? '⚠ à trouver' : (nR.court || ''), nR.ok);
      }
      /* tracteur / treuil */
      if (isM) {
        var gy = ly(s, 0);
        if (rev) truck(110, gy + 6, -1, treuil ? 'Treuil' : 'Tracteur (crochet)');
        else if (treuil) { truck(px(m) + 75, gy + 6, 0, 'Treuil (à l’arrêt)'); }
        else truck(bx(m) + 170, gy + 6, 1, 'Tracteur (crochet)');
      }
    });
    /* distances */
    var dyy = y + 10;
    if (D && D.dpf) Object.keys(D.dpf).forEach(function (s, i) {
      var yy = dyy + i * 30, x2 = px(+s) + r + 8;
      line(FX2, yy, x2, yy, '#6b7280', 1.5); line(FX2, yy - 6, FX2, yy + 6, '#6b7280', 1.5); line(x2, yy - 6, x2, yy + 6, '#6b7280', 1.5);
      text((FX2 + x2) / 2, yy - 5, 'DPF' + (m > 1 ? s : '') + ' = ' + df(D.dpf[s]) + ' m', { s: 12, b: 1, c: '#374151' });
    });
    var ty2 = dyy + (D && D.dpf ? Object.keys(D.dpf).length : 0) * 30 + 16;
    if (D && D.D) text(20, ty2, 'Déplacement du fardeau par mouflage : ' + df(D.D) + ' m' + (D.DT ? ' · déplacement du tracteur : ' + df(D.DT) + ' m' : '') + (D.reprises > 1 ? ' · ' + D.reprises + ' reprises' : ''), { a: 'start', s: 13, b: 1 });
    text(20, ty2 + 20, 'Poulies P1… et manilles M1… : voir le tableau des agrès. Schéma de principe (non à l’échelle).', { a: 'start', s: 11, c: '#6b7280' });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + (ty2 + 34) + '" width="100%" role="img" aria-label="Schéma du mouflage" font-family="Inter, Arial, sans-serif">' + parts.join('') + '</svg>';
  };
  if (typeof module !== 'undefined') module.exports = MDF;
})(this);
