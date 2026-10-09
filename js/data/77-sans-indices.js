/* Retire les indices qui trahissent la bonne réponse : quand seule(s) la (les) bonne(s) réponse(s) se termine(nt) par une
   parenthèse explicative, on enlève les parenthèses finales de toutes les propositions et on reporte le texte dans l'explication.
   Les questions recopiées mot pour mot des copies (fixed) ne sont pas modifiées. L'identifiant des questions ne change pas. */
(function () {
  var re = /\s*\(([^()]*)\)\s*$/;
  function txt(c) { return String(c).replace(/<[^>]+>/g, ''); }
  Object.keys(REV.qById).forEach(function (id) {
    var q = REV.qById[id];
    if (q.fixed || q.cimg) return;
    var goodP = q.good.some(function (i) { return re.test(txt(q.c[i])); });
    var wrongNo = q.c.some(function (c, i) { return q.good.indexOf(i) < 0 && !re.test(txt(c)); });
    if (!goodP || !wrongNo) return;
    var extra = [];
    q.c = q.c.map(function (c, i) {
      var m = String(c).match(re);
      if (!m) return c;
      // pas de « Précision : corrigé. » ni « ex. » : seulement un vrai complément
      if (q.good.indexOf(i) >= 0 && (q.e || '').indexOf(m[1]) < 0 && !/^(corrigé|ex\.?)$/i.test(m[1].trim())) extra.push(m[1]);
      return String(c).replace(re, '');
    });
    if (extra.length) q.e = (q.e ? q.e.replace(/\s*$/, '') + (/[.!?]$/.test(q.e.trim()) ? ' ' : '. ') : '') + 'Précision : ' + extra.join(' ; ') + '.';
  });
})();
