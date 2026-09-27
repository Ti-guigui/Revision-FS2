/* Tri des illustrations : on garde en priorité les pages SCANNÉES du cours.
   Les photos (pages photographiées, fiches manuscrites) qui ont un équivalent scanné sont remplacées
   partout : leçons, questions, aides-mémoires. */
(function () {
  var F = 'fiches/';
  var MAP = {
    'can-niveaux.jpg': [F + 'can-ls-hs-niveaux.jpg', 'CAN LS et CAN HS : bit récessif et bit dominant'],
    'can-transmission-bits.jpg': [F + 'can-hs-trame-oscillo.jpg', 'Lecture d’une trame : CAN H NL0 = 3,5 V / NL1 = 2,5 V ; CAN L NL0 = 1,5 V / NL1 = 2,5 V'],
    'can-support-transmission.jpg': [F + 'can-support-transmission-scan.jpg', 'Support de transmission : paire torsadée CAN H / CAN L, résistances de terminaison 120 Ω'],
    'fiches/eq-can-ligne.jpg': [F + 'can-hs-diag-resistance.jpg', 'Résistance du bus : 2 × 120 Ω en parallèle = 60 Ω (véhicule hors tension)'],
    'fiches/eq-can-signaux.jpg': [F + 'can-hs-trame-oscillo.jpg'],
    'fiches/eq-can-ampli.jpg': [F + 'can-interface-nl0.jpg', 'Interface CAN : 3,5 − 1,5 = 2 V, amplifié × 2,5 = 5 V'],
    'fiches/eq-calculateur.jpg': ['calculateur-schema-bloc.jpg', 'Schéma bloc d’un calculateur'],
    'fiches/eq-cap-ctn.jpg': [F + 'cap-ctn.jpg'],
    'fiches/eq-cap-potentiometre.jpg': [F + 'cap-potentiometre.jpg'],
    'fiches/eq-cap-capacitif.jpg': [F + 'cap-capacitif.jpg'],
    'fiches/eq-cap-inductif.jpg': [F + 'cap-inductif-slide.jpg'],
    'fiches/eq-cap-hall.jpg': [F + 'cap-hall-slide.jpg'],
    'fiches/eq-cap-piezo-resistif.jpg': [F + 'cap-piezo-resistif.jpg'],
    'fiches/eq-cap-piezo-electrique.jpg': [F + 'cap-piezo-electrique.jpg'],
    'fiches/eq-alt-9d.jpg': ['aga01/alt-9d.jpg', 'Alternateur 9 diodes à régulateur incorporé'],
    'fiches/eq-alt-6d.jpg': ['aga01/alt-6d-regulateur-incorpore.jpg', 'Alternateur 6 diodes à régulateur incorporé'],
    'fiches/eq-demarreur.jpg': ['aga01/dem-schema-principe.jpg', 'Schéma de principe du démarreur']
  };
  function to(src) { return MAP[src] ? MAP[src][0] : src; }
  REV.subjects.forEach(function (s) {
    s.lessons.forEach(function (l) {
      if (!l.images) return;
      var seen = {}, out = [];
      l.images.forEach(function (im) {
        var m = MAP[im.src], src = to(im.src);
        if (seen[src]) return;
        seen[src] = 1;
        out.push(m ? { src: src, cap: m[1] || im.cap } : im);
      });
      // une image scannée déjà présente plus loin ne doit pas apparaître deux fois
      l.images = out.filter(function (im, i) { return out.findIndex(function (x) { return x.src === im.src; }) === i; });
    });
    s.questions.forEach(function (q) { if (q.img) q.img = to(q.img); });
  });
  Object.keys(REV.systemes || {}).forEach(function (k) {
    REV.systemes[k].forEach(function (x) {
      var seen = {};
      x.img = x.img.map(function (i) { return [to(i[0]), MAP[i[0]] && MAP[i[0]][1] || i[1]]; }).filter(function (i) { return seen[i[0]] ? false : (seen[i[0]] = 1); });
    });
  });
  if (REV.uv2Fiches) Object.keys(REV.uv2Fiches).forEach(function (k) {
    REV.uv2Fiches[k].blocs.forEach(function (b) { if (b.img) b.img = b.img.map(function (i) { return [to(i[0]), i[1]]; }); });
  });
})();
