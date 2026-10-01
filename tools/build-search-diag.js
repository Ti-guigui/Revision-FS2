/* Génère js/search-diag.js : index de recherche du Coin diagnostic (modules, éléments, marques),
   utilisé par la barre de recherche du site. À relancer après modification de js/diag/ :
   node tools/build-search-diag.js */
var fs = require('fs'), vm = require('vm'), path = require('path');
var root = path.join(__dirname, '..');
var ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
['catalogue', 'marques', 'modules', 'modules2', 'modules3', 'modules4', 'modules5', 'modules6', 'modules7', 'modules8'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(root, 'js/diag/' + f + '.js'), 'utf8'), ctx);
});
var D = ctx.window.DIAG, out = [];
function txt(s) { return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
Object.keys(D.MODULES).forEach(function (k) {
  var m = D.MODULES[k], steps = Object.keys(m.steps || {}).map(function (s) { return txt(m.steps[s].title); }).filter(Boolean).join(' · ');
  out.push(['mod/' + k, m.icon + ' ' + txt(m.titre), 'Coin diagnostic · ' + txt(m.sous), steps.slice(0, 1500)]);
});
(D.ELEMENTS || []).forEach(function (e) {
  var m = D.MODULES[e[3]];
  out.push(['el/' + e[1], txt(e[2]), 'Coin diagnostic · ' + txt(e[0]) + (m ? ' · ' + txt(m.titre) : ''), txt(e[5])]);
});
(D.MARQUES || []).forEach(function (m) {
  out.push(['marque/' + m.id, '🏷️ ' + txt(m.nom), 'Coin diagnostic · Marques · ' + txt(m.pays), txt(m.groupe + ' ' + m.modeles)]);
});
fs.writeFileSync(path.join(root, 'js/search-diag.js'), '/* Généré par tools/build-search-diag.js : index de recherche du Coin diagnostic [route, titre, contexte, texte]. */\nwindow.SEARCH_DIAG = ' + JSON.stringify(out) + ';\n');
console.log(out.length + ' entrées');
