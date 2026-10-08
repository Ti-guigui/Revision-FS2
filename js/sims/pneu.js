/* Simulateurs : freinage pneumatique (cylindre Tristop, frein de service, frein de parc, VNAE) */
(function () {
  var F = SIMS.fmt, PRES = 8.5, PARC = 8, VOY = 6;
  function spring(x1, x2, y, h, n) {
    var d = 'M' + x1 + ' ' + y, s = (x2 - x1) / (n * 2);
    for (var i = 0; i < n * 2; i++) d += ' L' + (x1 + s * (i + 1)) + ' ' + (i % 2 ? y : y + (i % 4 === 0 ? -h : h));
    return d;
  }
  SIMS.add({
    id: 'pneu-tristop', subj: 'pneu', icon: '🛑', title: 'Cylindre Tristop : frein de service, frein de parc et VNAE',
    desc: 'Air dans la chambre de service = freinage ; air dans la chambre à ressort = défreinage. Sans air, le ressort freine.',
    lessons: ['pneu/circuits', 'pneu/schema', 'pneu/pannes-gbc'],
    viewBox: '0 0 820 430',
    note: 'Valeurs du cours : service 8,5 bar, stationnement 8 bar, voyant 6 ± 0,2 bar, régulateur 10,3 ± 0,2 bar. Couleurs du schéma GBC 180.',
    legend: [['par', 'Circuit AR : trait plein = pression constante'], ['pardel', 'Circuit AR : tirets = pression délivrée'], ['ppa', 'Circuit parc : trait plein = pression constante'],
      ['ppadel', 'Circuit parc : tirets = pression délivrée'], ['pilx', 'Pilotage (alterné avec le jaune)'], ['off', 'Mis à l’échappement']],
    svg:
      // réservoir AR (frein de service)
      '<rect class="ink-f" x="20" y="56" width="120" height="64" rx="28"/><rect id="resA" class="zone z-par" x="24" y="60" width="112" height="56" rx="25" style="opacity:.35"/>' +
      '<text x="80" y="84" text-anchor="middle" class="t-s">Réservoir AR</text><text id="tResA" x="80" y="104" text-anchor="middle" class="t-b">8,5 bar</text>' +
      // réservoir parc
      '<rect class="ink-f" x="20" y="296" width="120" height="64" rx="28"/><rect id="resP" class="zone z-ppa" x="24" y="300" width="112" height="56" rx="25" style="opacity:.35"/>' +
      '<text x="80" y="324" text-anchor="middle" class="t-s">Réservoir parc</text><text id="tResP" x="80" y="344" text-anchor="middle" class="t-b">8 bar</text>' +
      // voyant de pression parc
      '<circle id="voy" class="ink-f" cx="80" cy="398" r="11"/><text x="98" y="402" class="t-s">Voyant (&lt; 6 bar)<lt; 6 bar)</text><path class="ink" d="M80 360 V387" style="stroke-dasharray:3 3"/>' +
      // conduites
      '<path class="pipe" id="aS0" d="M140 88 H220"/>' +
      '<path class="pipe" id="aS1" d="M300 88 H500 V150"/>' +
      '<path class="pilbase" id="aVb" d="M420 88 V300"/><path class="pipe thin" id="aV" d="M420 88 V300"/>' +
      '<path class="pipe" id="aP0" d="M140 328 H220"/>' +
      '<path class="pipe" id="aP1" d="M300 328 H390"/>' +
      '<path class="pipe" id="aP2" d="M450 328 H660 V270"/>' +
      // robinet de frein (pédale)
      '<rect class="ink-f" x="220" y="58" width="80" height="60" rx="6"/><text x="260" y="84" text-anchor="middle" class="t-s">Robinet</text><text x="260" y="100" text-anchor="middle" class="t-s">de frein</text>' +
      '<g id="ped" style="transition:transform .3s;transform-origin:260px 38px"><path class="ink" d="M260 58 V38 L300 20" style="stroke-width:5"/></g><text x="310" y="24" class="t-s">pédale</text>' +
      // valve de frein de parc + VNAE
      '<rect class="ink-f" x="220" y="298" width="80" height="60" rx="6"/><text x="260" y="324" text-anchor="middle" class="t-s">Valve de</text><text x="260" y="340" text-anchor="middle" class="t-s">frein de parc</text>' +
      '<g id="lev" style="transition:transform .3s;transform-origin:260px 358px"><path class="ink" d="M260 358 V390 L232 402" style="stroke-width:5"/></g>' +
      '<rect class="ink-f" x="390" y="300" width="60" height="56" rx="5"/><text x="420" y="333" text-anchor="middle" class="t-s">VNAE</text>' +
      // Tristop
      '<rect id="zS" class="zone z-air0" x="472" y="154" width="64" height="112"/>' +
      '<rect id="zP" class="zone z-air0" x="542" y="154" width="40" height="112"/><rect id="prod" class="ink-f" x="540" y="204" width="60" height="12"/>' +
      '<path class="ink" d="M470 150 H770 V270 H470 Z M540 150 V270"/>' +
      '<path id="dia" class="ink" d="M536 152 Q520 210 536 268" style="stroke-width:3"/>' +
      '<path id="spr" class="ink" d="" style="stroke-width:2.6"/>' +
      '<rect id="pist" class="solid" x="596" y="156" width="10" height="108"/>' +
      '<g id="rod"><rect class="ink-f" x="380" y="202" width="160" height="16"/><rect class="ink-f" x="350" y="186" width="30" height="48" rx="4"/></g>' +
      '<text x="505" y="292" text-anchor="middle" class="t-s">Chambre de service</text><text x="720" y="292" text-anchor="middle" class="t-s">Chambre à ressort</text>' +
      '<text x="668" y="312" class="t-s t-m">orifice 12</text><text x="508" y="140" class="t-s t-m">orifice 11</text>' +
      '<text id="tEt" x="340" y="172" text-anchor="middle" class="t-b">DÉFREINÉ</text>',
    init: { ped: 0, parc: false, fuite: false },
    controls: [
      { key: 'ped', type: 'range', label: 'Pédale de frein (frein de service)', min: 0, max: 100, step: 10, unit: '%' },
      { key: 'parc', type: 'toggle', label: 'Frein de parc', on: 'Serré', off: 'Desserré' },
      { key: 'fuite', type: 'toggle', label: 'Panne : plus d’air (fuite)', on: 'Oui', off: 'Non' }
    ],
    compute: function (st) {
      var d = { ra: st.fuite ? 0 : PRES, rp: st.fuite ? 0 : PARC };
      d.ps = d.ra * st.ped / 100;
      d.vnae = st.parc && d.ps > 0 && !st.fuite;
      d.pv = st.fuite ? 0 : st.parc ? 0 : PARC;          // sortie de la valve de parc
      d.pp = d.vnae ? d.ps : d.pv;                       // chambre à ressort (orifice 12)
      d.fs = d.ps / PRES; d.fp = 1 - d.pp / PARC;
      d.stroke = Math.max(d.fs, Math.min(1, d.fp));
      d.voy = d.rp < VOY;
      d.et = d.stroke < 0.05 ? 'DÉFREINÉ' : d.fp >= d.fs ? (st.fuite ? 'FREINÉ (secours)' : 'FREINÉ (ressort)') : 'FREINÉ (service)';
      d.text = st.fuite ? 'Plus d’air : les réservoirs se vident, le <b>voyant s’allume sous 6 bar</b>. La chambre à ressort se vide, le <b>ressort serre le frein</b> tout seul : c’est la sécurité du Tristop (frein de secours).'
        : d.vnae ? 'Frein de parc serré <b>et</b> pédale enfoncée : la <b>VNAE</b>, pilotée par la pression de service (' + F(d.ps, 1) + ' bar), l’envoie dans la chambre à ressort (orifice 12). Le ressort est retenu d’autant : les deux efforts <b>ne s’additionnent pas</b> (on protège la timonerie).'
        : st.parc ? 'Frein de parc serré : la valve <b>met la chambre à ressort à l’échappement</b> (0 bar). Le ressort se détend et pousse la tige : <b>freiné par le ressort</b>.'
        : d.ps > 0 ? 'Pédale enfoncée : le robinet délivre <b>' + F(d.ps, 1) + ' bar</b> (sur 8,5 bar) dans la chambre de service (orifice 11). Le diaphragme pousse la tige : freinage proportionnel à la pédale.'
        : 'Roulage : la valve de parc délivre <b>8 bar</b> dans la chambre à ressort (orifice 12), le ressort est comprimé ; la chambre de service est à l’échappement. Le frein est desserré.';
      d.readouts = [['Réservoir AR', F(d.ra, 1) + ' bar', st.fuite ? 'hot' : ''], ['Réservoir parc', F(d.rp, 1) + ' bar', d.voy ? 'hot' : ''],
        ['Chambre de service (11)', F(d.ps, 1) + ' bar'], ['Chambre à ressort (12)', F(d.pp, 1) + ' bar'], ['État', d.et, d.stroke > 0.05 ? 'hot' : 'ok']];
      return d;
    },
    draw: function (a, st, d) {
      var B = function (p) { return F(p, p % 1 ? 1 : 0) + ' bar'; };
      a.line('aS0', st.fuite ? 'off' : 'par', 0); a.tag('aS0', B(d.ra));
      a.line('aP0', st.fuite ? 'off' : 'ppa', 0); a.tag('aP0', B(d.rp));
      a.line('aS1', d.ps > 0 ? 'par del' : 'off', 0); a.tag('aS1', B(d.ps), { at: 0.3 });
      a.line('aV', d.ps > 0 ? 'par pilx' : 'off', 0); a.show('aVb', d.ps > 0); if (st.parc) a.tag('aV', 'pilotage', { at: 0.86 });
      a.line('aP1', d.pv > 0 ? 'ppa del' : 'off', 0); a.tag('aP1', B(d.pv));
      a.line('aP2', d.pp > 0 ? (d.vnae ? 'par del' : 'ppa del') : 'off', 0); a.tag('aP2', B(d.pp), { at: 0.45 });
      a.q('resA').style.opacity = st.fuite ? 0.05 : 0.35; a.q('resP').style.opacity = st.fuite ? 0.05 : 0.35;
      a.text('tResA', B(d.ra)); a.text('tResP', B(d.rp));
      a.q('voy').style.fill = d.voy ? '#dc2626' : '';
      a.q('zS').setAttribute('class', 'zone ' + (d.ps > 0 ? 'z-par' : 'z-air0')); a.q('zS').style.opacity = d.ps > 0 ? 0.25 + 0.6 * d.fs : '';
      var px = 740 - 120 * Math.min(1, d.fp); // piston du ressort : 740 = ressort comprimé (défreiné)
      a.attr('pist', 'x', px);
      a.attr('zP', 'width', Math.max(0, px - 542)); a.attr('prod', 'width', Math.max(0, px - 540));
      a.q('zP').setAttribute('class', 'zone ' + (d.pp > 0 ? (d.vnae ? 'z-par' : 'z-ppa') : 'z-air0')); a.q('zP').style.opacity = d.pp > 0 ? 0.25 + 0.6 * Math.min(1, d.pp / PARC) : '';
      a.attr('spr', 'd', spring(px + 10, 768, 210, 44, 5));
      var push = d.stroke * 70;
      a.move('rod', -push, 0);
      a.attr('dia', 'd', 'M536 152 Q' + (536 - 16 - d.fs * 30) + ' 210 536 268');
      a.q('ped').style.transform = 'rotate(' + (st.ped * 0.35) + 'deg)';
      a.q('lev').style.transform = st.parc ? 'rotate(-40deg)' : '';
      a.text('tEt', d.et);
    },
    steps: [
      { title: 'Roulage', text: 'La valve de parc délivre <b>8 bar</b> dans la <b>chambre à ressort</b> : le ressort est comprimé. La chambre de service est vide : <b>défreiné</b>.', set: {} },
      { title: 'Freinage de service', text: 'On appuie sur la pédale : le robinet envoie de l’air dans la <b>chambre de service</b>, le diaphragme pousse la tige. Plus on appuie, plus la pression (et le freinage) augmente.', set: { ped: 60 } },
      { title: 'Stationnement', text: 'On serre le frein de parc : la valve <b>vide la chambre à ressort</b>, le ressort se détend et freine. <b>Pression = défreiné, vidange = freiné.</b>', set: { parc: true } },
      { title: 'Parc + pédale : VNAE', text: 'Frein de parc serré et pédale enfoncée : la <b>VNAE</b> réalimente la chambre à ressort avec la pression de service pour que les deux efforts ne s’additionnent pas.', set: { parc: true, ped: 70 } },
      { title: 'Panne d’air', text: 'Fuite : les réservoirs se vident (voyant allumé sous 6 bar), la chambre à ressort aussi. <b>Le ressort serre automatiquement</b> : le véhicule s’arrête en sécurité (frein de secours).', set: { fuite: true } }
    ]
  });
})();
