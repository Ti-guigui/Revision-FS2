/* Compléments tirés des notes manuscrites (vérifiés avec les livres) :
   électricité — les appareils de mesure. */
(function () {
  REV.extendLesson('elec/lois', {
    html: `
<h3>Les appareils de mesure</h3>
<div class="tw"><table><tr><th>Appareil</th><th>Branchement</th><th>À respecter</th></tr>
<tr><td><b>Ampèremètre</b> (A)</td><td><b>En série</b>, circuit ouvert pour l’insérer</td><td>Calibre, polarité, courant ~ ou ⎓</td></tr>
<tr><td><b>Voltmètre</b> (V)</td><td><b>En parallèle</b> (en dérivation)</td><td>Calibre, ~ ou ⎓, polarité ; il affiche une <b>différence de potentiel</b></td></tr>
<tr><td><b>Ohmmètre</b> (Ω)</td><td><b>En parallèle</b> sur la résistance <b>isolée</b></td><td><b>Hors tension</b> (ne jamais le mettre sous tension), calibre</td></tr></table></div>`,
    retenir: ['Ampèremètre en série · voltmètre en parallèle · ohmmètre en parallèle, hors tension, composant isolé.']
  });
  REV.addExercises('elec', { lessons: [], questions: [
    { l: 'lois', q: 'Comment branche-t-on un ampèremètre ?', c: ['En série dans le circuit', 'En parallèle sur le récepteur', 'Hors tension, sur le composant isolé'], e: 'L’ampèremètre doit être traversé par le courant à mesurer : en série. Respecter le calibre et la polarité.' },
    { l: 'lois', q: 'Comment branche-t-on un voltmètre ?', c: ['En parallèle (en dérivation)', 'En série', 'Hors tension'], e: 'Le voltmètre mesure une différence de potentiel entre deux points : il se branche en parallèle.' },
    { l: 'lois', q: 'Conditions pour mesurer une résistance à l’ohmmètre ?', c: ['Hors tension, résistance isolée du circuit, ohmmètre en parallèle', 'Sous tension, en série', 'Sous tension, en parallèle'], e: 'L’ohmmètre ne doit jamais être mis sous tension ; on isole la résistance pour ne pas mesurer le reste du circuit.' }
  ]});
})();
