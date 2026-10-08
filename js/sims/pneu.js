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
    note: 'Valeurs du cours : service 8,5 bar, stationnement 8 bar, voyant 6 ± 0,2 bar, régulateur 10,3 ± 0,2 bar. Couleurs du schéma GBC 180.',
    legend: [['par', 'Circuit AR : trait plein = pression constante'], ['pardel', 'Circuit AR : tirets = pression délivrée'], ['ppa', 'Circuit parc : trait plein = pression constante'],
      ['ppadel', 'Circuit parc : tirets = pression délivrée'], ['pilx', 'Pilotage 41 / 42 (alterné avec le jaune)'], ['off', 'Mis à l’échappement']],
    viewBox: '0 0 820 440',
    svg:
      // réservoir AR (frein de service) → robinet de frein de service (symbole AGB 03 : 11/21 et 12/22, commande par pédale)
      '<rect class="ink-f" x="20" y="36" width="120" height="58" rx="26"/><rect id="resA" class="zone z-par" x="24" y="40" width="112" height="50" rx="23" style="opacity:.35"/>' +
      '<text x="80" y="60" text-anchor="middle" class="t-s">Réservoir AR</text><text id="tResA" x="80" y="80" text-anchor="middle" class="t-b">8,5 bar</text>' +
      '<path class="pipe" id="aS0" d="M140 65 H200"/>' +
      '<rect class="ink-f" x="200" y="40" width="70" height="50"/><rect class="ink-f" x="200" y="90" width="70" height="50"/>' +
      '<path class="ink" d="M190 115 H200 M270 115 H280"/><text x="186" y="60" text-anchor="end" class="t-s t-m">11</text><text x="276" y="58" class="t-s t-m">21</text>' +
      '<text x="186" y="110" text-anchor="end" class="t-s t-m">12</text><text x="284" y="110" class="t-s t-m">22</text>' +
      '<g id="ped" style="transition:transform .3s;transform-origin:235px 40px"><path class="ink" d="M235 40 V24 L272 8" style="stroke-width:3"/></g>' +
      '<text x="235" y="160" text-anchor="middle" class="t-s">Robinet de frein</text><text x="235" y="176" text-anchor="middle" class="t-s">(pédale)</text>' +
      // réservoir parc → valve de frein de parc (1, 21, 22, échappement 3, levier)
      '<rect class="ink-f" x="20" y="300" width="120" height="58" rx="26"/><rect id="resP" class="zone z-ppa" x="24" y="304" width="112" height="50" rx="23" style="opacity:.35"/>' +
      '<text x="80" y="324" text-anchor="middle" class="t-s">Réservoir parc</text><text id="tResP" x="80" y="344" text-anchor="middle" class="t-b">8 bar</text>' +
      '<circle id="voy" class="ink-f" cx="80" cy="392" r="10"/><path class="ink" d="M80 358 V382" style="stroke-dasharray:3 3"/><text x="80" y="420" text-anchor="middle" class="t-s">Voyant &lt; 6 bar</text>' +
      '<path class="pipe" id="aP0" d="M140 329 H200"/>' +
      '<path class="pipe" id="aP3" d="M170 329 V398 H315 V235 H330"/>' +
      '<rect class="ink-f" x="200" y="300" width="70" height="60"/><path class="ink" d="M235 360 V368 M227 368 h16 l-8 12 z" style="fill:none"/>' +
      '<path class="ink" d="M270 345 H284"/><text x="196" y="322" text-anchor="end" class="t-s t-m">1</text><text x="274" y="310" class="t-s t-m">21</text><text x="288" y="350" class="t-s t-m">22</text><text x="246" y="378" class="t-s t-m">3</text>' +
      '<g id="lev" style="transition:transform .3s;transform-origin:235px 300px"><path class="ink" d="M235 300 V284 L262 272" style="stroke-width:3"/><circle class="ink-f" cx="266" cy="270" r="5"/></g>' +
      '<text x="235" y="432" text-anchor="middle" class="t-s">Valve de frein de parc</text>' +
      // VNAE = valve relais double pilotage (1, 2, 3, pilotages 41 et 42)
      '<path class="pilbase" id="aP1b" d="M270 315 H300 V180 H345 V200"/><path class="pipe thin" id="aP1" d="M270 315 H300 V180 H345 V200"/>' +
      '<path class="pilbase" id="aVb" d="M395 65 V200"/><path class="pipe thin" id="aV" d="M395 65 V200"/>' +
      '<rect class="ink-f" x="330" y="200" width="80" height="70"/><text x="370" y="240" text-anchor="middle" class="t-b">VNAE</text>' +
      '<path class="ink" d="M370 270 V278 M362 278 h16 l-8 12 z" style="fill:none"/>' +
      '<text x="352" y="196" class="t-s t-m">41</text><text x="402" y="196" class="t-s t-m">42</text><text x="326" y="230" text-anchor="end" class="t-s t-m">1</text><text x="414" y="230" class="t-s t-m">2</text><text x="380" y="292" class="t-s t-m">3</text>' +
      // conduites vers le Tristop (12 = chambre à ressort, 11 = chambre de service)
      '<path class="pipe" id="aS1" d="M270 65 H626 V300"/>' +
      '<path class="pipe" id="aP2" d="M410 235 H478 V300"/>' +
      // Tristop (symbole AGB 03 : 12 à gauche, 11 à droite, tige à droite) — mécanisme animé
      '<g transform="translate(1030 180) scale(-0.8 0.8)">' +
        '<rect id="zS" class="zone z-air0" x="472" y="154" width="64" height="112"/>' +
        '<rect id="zP" class="zone z-air0" x="542" y="154" width="40" height="112"/><rect id="prod" class="ink-f" x="540" y="204" width="60" height="12"/>' +
        '<path class="ink" d="M470 150 H770 V270 H470 Z M540 150 V270"/>' +
        '<path id="dia" class="ink" d="M536 152 Q520 210 536 268" style="stroke-width:3"/>' +
        '<path id="spr" class="ink" d="" style="stroke-width:2.6"/>' +
        '<rect id="pist" class="solid" x="596" y="156" width="10" height="108"/>' +
        '<g id="rod"><rect class="ink-f" x="380" y="202" width="160" height="16"/><rect class="ink-f" x="350" y="186" width="30" height="48" rx="4"/></g>' +
      '</g>' +
      '<text x="470" y="294" text-anchor="end" class="t-s t-m">12</text><text x="636" y="294" class="t-s t-m">11</text>' +
      '<text x="520" y="414" text-anchor="middle" class="t-s">Chambre à ressort</text><text x="626" y="432" text-anchor="middle" class="t-s">Chambre de service</text>' +
      '<text x="560" y="250" text-anchor="middle" class="t-s">Cylindre Tristop</text>' +
      '<text id="tEt" x="728" y="200" text-anchor="middle" class="t-b">DÉFREINÉ</text>' +
      [[170, 329], [395, 65]].map(function (q) { return '<circle class="solid" cx="' + q[0] + '" cy="' + q[1] + '" r="3.5"/>'; }).join(''),
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
      d.pv = st.fuite ? 0 : st.parc ? 0 : PARC;          // sortie 21 de la valve de parc → pilotage 41
      d.pp = Math.min(d.rp, Math.max(d.pv, d.ps));       // VNAE : sortie 2 → orifice 12, air pris au réservoir parc (entrée 1)
      d.fs = d.ps / PRES; d.fp = 1 - d.pp / PARC;
      d.stroke = Math.max(d.fs, Math.min(1, d.fp));
      d.voy = d.rp < VOY;
      d.et = d.stroke < 0.05 ? 'DÉFREINÉ' : d.fp >= d.fs ? (st.fuite ? 'FREINÉ (secours)' : 'FREINÉ (ressort)') : 'FREINÉ (service)';
      d.text = st.fuite ? 'Plus d’air : les réservoirs se vident, le <b>voyant s’allume sous 6 bar</b>. La chambre à ressort se vide, le <b>ressort serre le frein</b> tout seul : c’est la sécurité du Tristop (frein de secours).'
        : d.vnae ? 'Frein de parc serré <b>et</b> pédale enfoncée : la <b>VNAE</b>, pilotée en <b>42</b> par la pression de service (' + F(d.ps, 1) + ' bar), délivre la même pression dans la chambre à ressort (orifice 12), avec l’air du réservoir parc (entrée 1). Le ressort est retenu d’autant : les deux efforts <b>ne s’additionnent pas</b> (on protège la timonerie).'
        : st.parc ? 'Frein de parc serré : la valve met le pilotage <b>41</b> de la VNAE à l’échappement ; la VNAE <b>vide la chambre à ressort</b> par son échappement 3 (0 bar). Le ressort se détend et pousse la tige : <b>freiné par le ressort</b>.'
        : d.ps > 0 ? 'Pédale enfoncée : le robinet délivre <b>' + F(d.ps, 1) + ' bar</b> (sur 8,5 bar) dans la chambre de service (orifice 11). Le diaphragme pousse la tige : freinage proportionnel à la pédale.'
        : 'Roulage : la valve de parc envoie <b>8 bar</b> au pilotage 41 de la VNAE, qui délivre 8 bar dans la chambre à ressort (orifice 12) : le ressort est comprimé ; la chambre de service est à l’échappement. Le frein est desserré.';
      d.readouts = [['Réservoir AR', F(d.ra, 1) + ' bar', st.fuite ? 'hot' : ''], ['Réservoir parc', F(d.rp, 1) + ' bar', d.voy ? 'hot' : ''],
        ['Chambre de service (11)', F(d.ps, 1) + ' bar'], ['Chambre à ressort (12)', F(d.pp, 1) + ' bar'], ['État', d.et, d.stroke > 0.05 ? 'hot' : 'ok']];
      return d;
    },
    draw: function (a, st, d) {
      var B = function (p) { return F(p, p % 1 ? 1 : 0) + ' bar'; };
      a.line('aS0', st.fuite ? 'off' : 'par', 0); a.tag('aS0', B(d.ra), { dy: -18 });
      a.line('aP0', st.fuite ? 'off' : 'ppa', 0); a.tag('aP0', B(d.rp), { dy: -18 });
      a.line('aP3', st.fuite ? 'off' : 'ppa', 0); a.tag('aP3', B(d.rp), { at: 0.45 });
      a.line('aS1', d.ps > 0 ? 'par del' : 'off', 0); a.tag('aS1', B(d.ps), { at: 0.3 });
      a.line('aV', d.ps > 0 ? 'par pilx' : 'off', 0); a.show('aVb', d.ps > 0); a.tag('aV', '42 : ' + B(d.ps), { at: 0.6 });
      a.line('aP1', d.pv > 0 ? 'ppa pilx' : 'off', 0); a.show('aP1b', d.pv > 0); a.tag('aP1', '41 : ' + B(d.pv), { at: 0.22 });
      a.line('aP2', d.pp > 0 ? 'ppa del' : 'off', 0); a.tag('aP2', B(d.pp), { at: 0.35 });
      a.q('resA').style.opacity = st.fuite ? 0.05 : 0.35; a.q('resP').style.opacity = st.fuite ? 0.05 : 0.35;
      a.text('tResA', B(d.ra)); a.text('tResP', B(d.rp));
      a.q('voy').style.fill = d.voy ? '#dc2626' : '';
      a.q('zS').setAttribute('class', 'zone ' + (d.ps > 0 ? 'z-par' : 'z-air0')); a.q('zS').style.opacity = d.ps > 0 ? 0.25 + 0.6 * d.fs : '';
      var px = 740 - 120 * Math.min(1, d.fp); // piston du ressort : 740 = ressort comprimé (défreiné)
      a.attr('pist', 'x', px);
      a.attr('zP', 'width', Math.max(0, px - 542)); a.attr('prod', 'width', Math.max(0, px - 540));
      a.q('zP').setAttribute('class', 'zone ' + (d.pp > 0 ? 'z-ppa' : 'z-air0')); a.q('zP').style.opacity = d.pp > 0 ? 0.25 + 0.6 * Math.min(1, d.pp / PARC) : '';
      a.attr('spr', 'd', spring(px + 10, 768, 210, 44, 5));
      var push = d.stroke * 70;
      a.move('rod', -push, 0);
      a.attr('dia', 'd', 'M536 152 Q' + (536 - 16 - d.fs * 30) + ' 210 536 268');
      a.q('ped').style.transform = 'rotate(' + (st.ped * 0.3) + 'deg)';
      a.q('lev').style.transform = st.parc ? 'rotate(-60deg)' : '';
      a.text('tEt', d.et);
    },
    steps: [
      { title: 'Roulage', text: 'La valve de parc pilote la VNAE (41) : la VNAE délivre <b>8 bar</b> dans la <b>chambre à ressort</b> (12) : le ressort est comprimé. La chambre de service est vide : <b>défreiné</b>.', set: {} },
      { title: 'Freinage de service', text: 'On appuie sur la pédale : le robinet envoie de l’air dans la <b>chambre de service</b>, le diaphragme pousse la tige. Plus on appuie, plus la pression (et le freinage) augmente.', set: { ped: 60 } },
      { title: 'Stationnement', text: 'On serre le frein de parc : la valve met le pilotage 41 à l’échappement, la VNAE <b>vide la chambre à ressort</b> ; le ressort se détend et freine. <b>Pression = défreiné, vidange = freiné.</b>', set: { parc: true } },
      { title: 'Parc + pédale : VNAE', text: 'Frein de parc serré et pédale enfoncée : pilotée en <b>42</b> par la pression de service, la <b>VNAE</b> réalimente la chambre à ressort avec la même pression : les deux efforts ne s’additionnent pas.', set: { parc: true, ped: 70 } },
      { title: 'Panne d’air', text: 'Fuite : les réservoirs se vident (voyant allumé sous 6 bar), la chambre à ressort aussi. <b>Le ressort serre automatiquement</b> : le véhicule s’arrête en sécurité (frein de secours).', set: { fuite: true } }
    ]
  });
})();
