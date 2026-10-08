/* Simulateurs : freinage pneumatique (cylindre Tristop, frein de service, frein de parc, VNAE) */
(function () {
  var F = SIMS.fmt, PRES = 8.5;
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
    legend: [['air', 'Air sous pression'], ['air0', 'Mis à l’échappement']],
    svg:
      // réservoir
      '<rect class="ink-f" x="30" y="170" width="110" height="70" rx="30"/><rect id="resZ" class="zone z-air" x="34" y="174" width="102" height="62" rx="27" style="opacity:.35"/>' +
      '<text x="85" y="200" text-anchor="middle" class="t-s">Réservoir</text><text id="tRes" x="85" y="220" text-anchor="middle" class="t-s">8,5 bar</text>' +
      // conduites
      '<path class="pipe" id="aS0" d="M140 190 H170 V90 H220"/>' +
      '<path class="pipe" id="aP0" d="M140 220 H170 V330 H220"/>' +
      '<path class="pipe" id="aS1" d="M300 90 H500 V150"/>' +
      '<path class="pipe" id="aP1" d="M300 330 H660 V270"/>' +
      // robinet de frein (pédale)
      '<rect class="ink-f" x="220" y="60" width="80" height="60" rx="6"/><text x="260" y="86" text-anchor="middle" class="t-s">Robinet</text><text x="260" y="102" text-anchor="middle" class="t-s">de frein</text>' +
      '<g id="ped" style="transition:transform .3s;transform-origin:260px 40px"><path class="ink" d="M260 60 V40 L300 22" style="stroke-width:5"/></g><text x="310" y="26" class="t-s">pédale</text>' +
      // valve de frein de parc + VNAE
      '<rect class="ink-f" x="220" y="300" width="80" height="60" rx="6"/><text x="260" y="326" text-anchor="middle" class="t-s">Valve de</text><text x="260" y="342" text-anchor="middle" class="t-s">frein de parc</text>' +
      '<g id="lev" style="transition:transform .3s;transform-origin:260px 360px"><path class="ink" d="M260 360 V392 L232 404" style="stroke-width:5"/></g>' +
      '<rect class="ink-f" x="400" y="300" width="70" height="40" rx="5"/><text x="435" y="325" text-anchor="middle" class="t-s">VNAE</text>' +
      '<path class="pipe thin" id="aV" d="M435 300 V240 H500"/>' +
      // Tristop
      '<rect id="zS" class="zone z-air0" x="472" y="154" width="64" height="112"/>' +
      '<rect id="zP" class="zone z-air0" x="542" y="154" width="40" height="112"/><rect id="prod" class="ink-f" x="540" y="204" width="60" height="12"/>' +
      '<path class="ink" d="M470 150 H770 V270 H470 Z M540 150 V270"/>' +
      '<path id="dia" class="ink" d="M536 152 Q520 210 536 268" style="stroke-width:3"/>' +
      '<path id="spr" class="ink" d="" style="stroke-width:2.6"/>' +
      '<rect id="pist" class="solid" x="596" y="156" width="10" height="108"/>' +
      '<g id="rod"><rect class="ink-f" x="380" y="202" width="160" height="16"/><rect class="ink-f" x="350" y="186" width="30" height="48" rx="4"/></g>' +
      '<text x="505" y="292" text-anchor="middle" class="t-s">Chambre de service</text><text x="700" y="292" text-anchor="middle" class="t-s">Chambre à ressort (parc)</text>' +
      '<text x="668" y="318" class="t-s t-m">orifice 12</text><text x="508" y="120" class="t-s t-m">orifice 11</text>' +
      '<text id="tEt" x="340" y="160" text-anchor="middle" class="t-b">DÉFREINÉ</text>',
    init: { ped: 0, parc: false, fuite: false },
    controls: [
      { key: 'ped', type: 'range', label: 'Pédale de frein (frein de service)', min: 0, max: 100, step: 10, unit: '%' },
      { key: 'parc', type: 'toggle', label: 'Frein de parc', on: 'Serré', off: 'Desserré' },
      { key: 'fuite', type: 'toggle', label: 'Panne : plus d’air (fuite)', on: 'Oui', off: 'Non' }
    ],
    compute: function (st) {
      var d = { res: st.fuite ? 0 : PRES };
      d.ps = d.res * st.ped / 100;
      d.vnae = st.parc && d.ps > 0 && !st.fuite;
      d.pp = st.fuite ? 0 : st.parc ? (d.vnae ? d.ps : 0) : PRES;
      d.fs = d.ps / PRES; d.fp = 1 - d.pp / PRES;
      d.stroke = Math.max(d.fs, d.fp);
      d.et = d.stroke < 0.05 ? 'DÉFREINÉ' : d.fp >= d.fs ? (st.fuite ? 'FREINÉ (secours)' : 'FREINÉ (ressort)') : 'FREINÉ (service)';
      d.text = st.fuite ? 'Plus d’air : la chambre à ressort se vide, le <b>ressort serre le frein</b> tout seul. C’est la sécurité du Tristop : sans air, le véhicule est freiné (frein de secours).'
        : d.vnae ? 'Frein de parc serré <b>et</b> pédale enfoncée : la <b>VNAE</b> envoie la pression de service dans la chambre à ressort. Le ressort est retenu d’autant : les deux efforts <b>ne s’additionnent pas</b> (on protège la timonerie).'
        : st.parc ? 'Frein de parc serré : la valve <b>vide la chambre à ressort</b>. Le ressort se détend et pousse la tige : <b>freiné par le ressort</b>.'
        : d.ps > 0 ? 'Pédale enfoncée : le robinet envoie <b>' + F(d.ps, 1) + ' bar</b> dans la chambre de service. Le diaphragme pousse la tige : freinage proportionnel à la pédale.'
        : 'Roulage : chambre à ressort sous pression (<b>8,5 bar</b>), le ressort est comprimé ; chambre de service à l’échappement. Le frein est desserré.';
      d.readouts = [['Réservoir', F(d.res, 1) + ' bar', st.fuite ? 'hot' : ''], ['Chambre de service', F(d.ps, 1) + ' bar'], ['Chambre à ressort', F(d.pp, 1) + ' bar'], ['État', d.et, d.stroke > 0.05 ? 'hot' : 'ok']];
      return d;
    },
    draw: function (a, st, d) {
      a.line('aS0', st.fuite ? 'air0' : 'air', 0);
      a.line('aP0', st.fuite ? 'air0' : 'air', 0);
      a.line('aS1', d.ps > 0 ? 'air' : 'air0', 0);
      a.line('aP1', d.pp > 0 ? 'air' : 'air0', 0);
      a.line('aV', d.vnae ? 'air' : 'air0', 0);
      a.q('resZ').style.opacity = st.fuite ? 0.05 : 0.35;
      a.text('tRes', F(d.res, 1) + ' bar');
      a.q('zS').setAttribute('class', 'zone ' + (d.ps > 0 ? 'z-air' : 'z-air0')); a.q('zS').style.opacity = d.ps > 0 ? 0.25 + 0.6 * d.fs : '';
      var px = 740 - 120 * d.fp; // piston du ressort : 740 = ressort comprimé (défreiné)
      a.attr('pist', 'x', px);
      a.attr('zP', 'width', Math.max(0, px - 542)); a.attr('prod', 'width', Math.max(0, px - 540));
      a.q('zP').setAttribute('class', 'zone ' + (d.pp > 0 ? 'z-air' : 'z-air0')); a.q('zP').style.opacity = d.pp > 0 ? 0.25 + 0.6 * d.pp / PRES : '';
      a.attr('spr', 'd', spring(px + 10, 768, 210, 44, 5));
      var push = d.stroke * 70;
      a.move('rod', -push, 0);
      a.attr('dia', 'd', 'M536 152 Q' + (536 - 16 - d.fs * 30) + ' 210 536 268');
      a.q('ped').style.transform = 'rotate(' + (st.ped * 0.35) + 'deg)';
      a.q('lev').style.transform = st.parc ? 'rotate(-40deg)' : '';
      a.text('tEt', d.et);
    },
    steps: [
      { title: 'Roulage', text: 'Le réservoir alimente la <b>chambre à ressort</b> (8,5 bar) : le ressort est comprimé. La chambre de service est vide : <b>défreiné</b>.', set: {} },
      { title: 'Freinage de service', text: 'On appuie sur la pédale : le robinet envoie de l’air dans la <b>chambre de service</b>, le diaphragme pousse la tige. Plus on appuie, plus la pression (et le freinage) augmente.', set: { ped: 60 } },
      { title: 'Stationnement', text: 'On serre le frein de parc : la valve <b>vide la chambre à ressort</b>, le ressort se détend et freine. <b>Pression = défreiné, vidange = freiné.</b>', set: { parc: true } },
      { title: 'Parc + pédale : VNAE', text: 'Frein de parc serré et pédale enfoncée : la <b>VNAE</b> réalimente la chambre à ressort avec la pression de service pour que les deux efforts ne s’additionnent pas.', set: { parc: true, ped: 70 } },
      { title: 'Panne d’air', text: 'Fuite : le réservoir se vide, la chambre à ressort aussi. <b>Le ressort serre automatiquement</b> : le véhicule s’arrête en sécurité (frein de secours).', set: { fuite: true } }
    ]
  });
})();
