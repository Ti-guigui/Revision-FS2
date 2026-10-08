/* Simulateurs animés : moteur commun.
   Chaque simulateur déclare :
     id, subj (matière), icon, title, desc, lessons (clés de leçons liées), falstad (lien facultatif),
     svg (contenu SVG, viewBox), legend [[type, texte]], init (état de départ),
     controls [{ key, type: 'seg' | 'range' | 'toggle', label, options | min/max/step/unit }],
     compute(st) → d (valeurs calculées, d.readouts [[libellé, valeur]], d.text explication),
     tick(st, dt, d) (facultatif : mouvement), draw(api, st, d) (met le schéma à jour),
     steps [{ title, text, set }] (mode « Regarder »).
   Les tuyaux / fils sont des <path class="pipe" id="…">. api.line(id, type, sens) les colore et anime le flux. */
(function () {
  var SIMS = window.SIMS = { list: [], byId: {}, cur: null };
  SIMS.add = function (s) { SIMS.list.push(s); SIMS.byId[s.id] = s; };
  SIMS.forLesson = function (key) { return SIMS.list.filter(function (s) { return (s.lessons || []).indexOf(key) >= 0; }); };

  var LEG = { hp: 'Pression (travail)', bp: 'Retour / basse pression', pil: 'Pilotage', gav: 'Gavage', ls: 'Signal LS', off: 'Sans débit',
    air: 'Air sous pression', air0: 'Air à l’échappement', cur: 'Courant', cur0: 'Pas de courant', sig: 'Signal de commande' };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  SIMS.fmt = function (n, d) { if (typeof n !== 'number' || !isFinite(n)) return '—'; var p = Math.pow(10, d || 0); return String(Math.round(n * p) / p).replace('.', ','); };

  SIMS.unmount = function () {
    var c = SIMS.cur;
    if (!c) return;
    c.dead = true;
    cancelAnimationFrame(c.raf); clearInterval(c.auto);
    SIMS.cur = null;
  };

  SIMS.mount = function (id, host) {
    SIMS.unmount();
    var sim = SIMS.byId[id];
    if (!sim || !host) return;
    var c = { sim: sim, host: host, mode: sim.steps && sim.steps.length ? 'watch' : 'play', step: 0, st: clone(sim.init), last: 0, dirty: true };
    SIMS.cur = c;
    host.innerHTML =
      '<div class="sim-tabs" role="tablist">' +
        (sim.steps && sim.steps.length ? '<button type="button" data-sim="mode" data-v="watch">▶️ Regarder</button>' : '') +
        '<button type="button" data-sim="mode" data-v="play">🕹️ Manipuler</button></div>' +
      '<div class="sim-stage"><svg viewBox="' + (sim.viewBox || '0 0 820 460') + '"' + (sim.minWidth ? ' style="--simw:' + sim.minWidth + 'px"' : '') + ' role="img" aria-label="' + esc(sim.title) + '">' + defs() + sim.svg + '</svg></div>' +
      (sim.reps ? '<div class="sim-info" hidden></div>' : '') +
      '<div class="sim-caption" aria-live="polite"></div>' +
      '<div class="sim-watch"><button type="button" class="btn small" data-sim="prev">◀ Étape précédente</button>' +
        '<span class="sim-stepn"></span><button type="button" class="btn small" data-sim="auto">⏵ Lecture auto</button>' +
        '<button type="button" class="btn small primary" data-sim="next">Étape suivante ▶</button></div>' +
      '<div class="sim-controls"></div>' +
      '<div class="sim-readouts"></div>' +
      (sim.panelHtml ? '<div class="sim-panel">' + sim.panelHtml + '</div>' : '') +
      '<div class="sim-legend">' + (sim.legend || []).map(function (l) {
        return '<span><i class="lg lg-' + l[0] + '"></i>' + esc(l[1] || LEG[l[0]] || l[0]) + '</span>';
      }).join('') + (sim.note && !sim.levels ? '<span class="sim-note">' + sim.note + '</span>' : '') + '</div>';
    c.svg = host.querySelector('svg');
    // Superposition animée sur chaque tuyau / fil : la « particule » qui montre le sens du flux
    c.svg.querySelectorAll('.pipe').forEach(function (p) {
      var f = p.cloneNode(false);
      f.removeAttribute('id'); f.setAttribute('class', 'flow'); f.setAttribute('data-for', p.id);
      p.parentNode.insertBefore(f, p.nextSibling);
      p._flow = f;
    });
    c.pq = []; c.tags = {};
    c.api = makeApi(c);
    c.tagLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g'); c.tagLayer.setAttribute('class', 'sim-tags'); c.svg.appendChild(c.tagLayer);
    buildControls(c);
    host.addEventListener('click', function (e) { onClick(c, e); });
    host.addEventListener('input', function (e) { onInput(c, e); });
    host.addEventListener('change', function (e) { if (e.target.matches('select[data-k]')) onInput(c, e); });
    setMode(c, c.mode);
    c.last = performance.now();
    loop(c);
  };

  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }

  function defs() {
    return '<defs><marker id="sim-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
      '<path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>';
  }

  function makeApi(c) {
    var cache = {};
    function q(id) { return cache[id] || (cache[id] = c.svg.getElementById ? c.svg.getElementById(id) : c.svg.querySelector('#' + id)); }
    return {
      q: q,
      // type : hp, bp, pil, gav, ls, off, air, air0, cur, cur0, sig · sens : 1 (sens du tracé), -1 (inverse), 0 (pas de débit)
      line: function (id, type, dir) {
        var p = q(id); if (!p) return;
        var cls = 'pipe pl-' + (type || 'off');
        if (p.getAttribute('class') !== cls) p.setAttribute('class', cls);
        var f = p._flow; if (!f) return;
        var fc = 'flow' + (dir > 0 ? ' fw' : dir < 0 ? ' rv' : '') + (type === 'cur' ? ' dots' : '');
        if (f.getAttribute('class') !== fc) f.setAttribute('class', fc);
      },
      fill: function (id, type) { var e = q(id); if (e) e.setAttribute('class', 'zone z-' + (type || 'off')); },
      text: function (id, s) { var e = q(id); if (e && e.textContent !== String(s)) e.textContent = s; },
      show: function (id, on) { var e = q(id); if (e) e.style.display = on ? '' : 'none'; },
      attr: function (id, k, v) { var e = q(id); if (e && e.getAttribute(k) !== String(v)) e.setAttribute(k, v); },
      move: function (id, x, y, rot, cx, cy) {
        var e = q(id); if (!e) return;
        e.setAttribute('transform', 'translate(' + (x || 0) + ' ' + (y || 0) + ')' + (rot ? ' rotate(' + rot + ' ' + (cx || 0) + ' ' + (cy || 0) + ')' : ''));
      },
      cls: function (id, name, on) { var e = q(id); if (e) e.classList.toggle(name, !!on); },
      // Hydraulique : couleur selon le niveau de pression (p en bar ; null = sans pression ; o.pil = ligne de pilotage)
      lineP: function (id, p, dir, o) { c.pq.push({ k: 'line', id: id, p: p, dir: dir || 0, o: o || {} }); },
      fillP: function (id, p, o) { c.pq.push({ k: 'fill', id: id, p: p, o: o || {} }); },
      // Étiquette de valeur posée sur une conduite / un fil (à la fraction o.at de sa longueur, 0,5 par défaut)
      tag: function (id, txt, o) { c.tags[id] = { txt: txt, o: o || {} }; }
    };
  }

  function buildControls(c) {
    var box = c.host.querySelector('.sim-controls');
    box.innerHTML = (c.sim.controls || []).map(function (k) {
      if (k.type === 'seg') {
        return '<div class="sim-ctl"><span class="sim-lbl">' + esc(k.label) + '</span><div class="seg sim-seg">' + k.options.map(function (o) {
          return '<button type="button" data-sim="set" data-k="' + k.key + '" data-v="' + esc(o[0]) + '">' + esc(o[1]) + '</button>';
        }).join('') + '</div></div>';
      }
      if (k.type === 'select') {
        return '<label class="sim-ctl"><span class="sim-lbl">' + esc(k.label) + '</span><select class="sim-sel" data-k="' + k.key + '">' + k.options.map(function (o) {
          return '<option value="' + esc(o[0]) + '">' + esc(o[1]) + '</option>';
        }).join('') + '</select></label>';
      }
      if (k.type === 'toggle') {
        return '<div class="sim-ctl"><span class="sim-lbl">' + esc(k.label) + '</span><button type="button" class="sim-tog" data-sim="tog" data-k="' + k.key + '"></button></div>';
      }
      return '<label class="sim-ctl"><span class="sim-lbl">' + esc(k.label) + ' : <b data-val="' + k.key + '"></b></span>' +
        '<input type="range" data-k="' + k.key + '" min="' + k.min + '" max="' + k.max + '" step="' + (k.step || 1) + '"></label>';
    }).join('');
  }

  function syncControls(c) {
    (c.sim.controls || []).forEach(function (k) {
      var v = c.st[k.key];
      if (k.type === 'seg') {
        c.host.querySelectorAll('[data-sim="set"][data-k="' + k.key + '"]').forEach(function (b) {
          var on = String(b.getAttribute('data-v')) === String(v);
          b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
        });
      } else if (k.type === 'select') {
        var sl = c.host.querySelector('select[data-k="' + k.key + '"]');
        if (sl && sl.value !== String(v)) sl.value = v;
      } else if (k.type === 'toggle') {
        var b = c.host.querySelector('[data-sim="tog"][data-k="' + k.key + '"]');
        if (b) { b.textContent = v ? (k.on || 'Oui') : (k.off || 'Non'); b.classList.toggle('on', !!v); b.setAttribute('aria-pressed', !!v); }
      } else {
        var r = c.host.querySelector('input[data-k="' + k.key + '"]');
        if (r && document.activeElement !== r) r.value = v;
        var o = c.host.querySelector('[data-val="' + k.key + '"]');
        if (o) o.textContent = SIMS.fmt(+v, k.dec || 0) + (k.unit ? ' ' + k.unit : '');
      }
    });
  }

  function setMode(c, m) {
    c.mode = m;
    clearInterval(c.auto); c.auto = null;
    c.host.querySelectorAll('[data-sim="mode"]').forEach(function (b) { var on = b.getAttribute('data-v') === m; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
    c.host.querySelector('.sim-watch').style.display = m === 'watch' ? '' : 'none';
    c.host.querySelector('.sim-controls').style.display = m === 'play' ? '' : 'none';
    if (m === 'watch') goStep(c, c.step);
    else {
      var keep = {};
      (c.sim.keep || []).forEach(function (k) { keep[k] = c.st[k]; });
      if (c.started) c.st = Object.assign(clone(c.sim.init), keep);
      syncControls(c); c.dirty = true;
    }
    c.started = true;
    updAuto(c);
  }

  function goStep(c, i) {
    var steps = c.sim.steps || [];
    c.step = Math.max(0, Math.min(steps.length - 1, i));
    var s = steps[c.step];
    var keep = {};
    (c.sim.keep || []).forEach(function (k) { keep[k] = c.st[k]; });
    c.st = Object.assign(clone(c.sim.init), keep, clone(s.set));
    c.host.querySelector('.sim-stepn').textContent = 'Étape ' + (c.step + 1) + ' / ' + steps.length;
    c.host.querySelector('[data-sim="prev"]').disabled = c.step === 0;
    c.host.querySelector('[data-sim="next"]').disabled = c.step === steps.length - 1;
    syncControls(c);
    c.dirty = true;
  }

  function updAuto(c) {
    var b = c.host.querySelector('[data-sim="auto"]');
    if (b) b.textContent = c.auto ? '⏸ Pause' : '⏵ Lecture auto';
  }

  function onClick(c, e) {
    var rp = e.target.closest('[data-rep]');
    if (rp && c.sim.reps && !c.dead) { showRep(c, rp.getAttribute('data-rep')); return; }
    if (c.sim.panelClick && e.target.closest('.sim-panel') && !c.dead) { c.sim.panelClick(e, c); return; }
    var b = e.target.closest('[data-sim]');
    if (!b || c.dead) return;
    var a = b.getAttribute('data-sim');
    if (a === 'mode') setMode(c, b.getAttribute('data-v'));
    else if (a === 'next') goStep(c, c.step + 1);
    else if (a === 'prev') goStep(c, c.step - 1);
    else if (a === 'auto') {
      if (c.auto) { clearInterval(c.auto); c.auto = null; }
      else {
        if (c.step >= c.sim.steps.length - 1) goStep(c, 0);
        c.auto = setInterval(function () {
          if (c.step >= c.sim.steps.length - 1) { clearInterval(c.auto); c.auto = null; updAuto(c); return; }
          goStep(c, c.step + 1);
        }, c.sim.stepMs || 5000);
      }
      updAuto(c);
    } else if (a === 'set') {
      var k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
      c.st[k] = isNaN(+v) || v === '' ? v : +v;
      syncControls(c); c.dirty = true;
    } else if (a === 'tog') {
      var kk = b.getAttribute('data-k');
      c.st[kk] = !c.st[kk];
      syncControls(c); c.dirty = true;
    }
  }

  // Repère cliqué : désignation et rôle sous le schéma
  function showRep(c, n) {
    var r = c.sim.reps[n], box = c.host.querySelector('.sim-info');
    if (!r || !box) return;
    c.host.querySelectorAll('[data-rep]').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-rep') === n); });
    box.hidden = false;
    box.innerHTML = '<button type="button" class="sim-info-x" aria-label="Fermer" onclick="this.parentNode.hidden=true">✕</button><b>Repère ' + esc(n) + ' — ' + r[0] + '</b><br>' + r[1];
  }

  function onInput(c, e) {
    var r = e.target;
    if (c.dead) return;
    if (r.matches('select[data-k]')) { c.st[r.getAttribute('data-k')] = r.value; syncControls(c); c.dirty = true; return; }
    if (c.sim.panelInput && r.closest('.sim-panel')) { c.sim.panelInput(e, c); return; }
    if (!r.matches('input[type="range"][data-k]')) return;
    c.st[r.getAttribute('data-k')] = +r.value;
    syncControls(c); c.dirty = true;
  }

  function loop(c) {
    if (c.dead) return;
    var now = performance.now(), dt = Math.min(0.1, (now - c.last) / 1000);
    c.last = now;
    var sim = c.sim;
    if (!c.host.isConnected) { SIMS.unmount(); return; }
    var d = sim.compute(c.st);
    if (sim.tick) { if (sim.tick(c.st, dt, d)) { d = sim.compute(c.st); c.dirty = true; } else if (sim.alwaysDraw) c.dirty = true; }
    if (c.dirty) {
      c.dirty = false;
      c.pq = []; c.tags = {};
      sim.draw(c.api, c.st, d);
      resolve(c);
      var cap = c.mode === 'watch' ? '<b>' + esc(sim.steps[c.step].title) + '</b> — ' + sim.steps[c.step].text : (d.text || '');
      var capEl = c.host.querySelector('.sim-caption');
      if (capEl._h !== cap) { capEl.innerHTML = cap; capEl._h = cap; }
      var ro = (d.readouts || []).map(function (r) {
        return '<div class="sim-ro' + (r[2] ? ' ' + r[2] : '') + '"><span>' + esc(r[0]) + '</span><b>' + r[1] + '</b></div>';
      }).join('');
      var roEl = c.host.querySelector('.sim-readouts');
      if (roEl._h !== ro) { roEl.innerHTML = ro; roEl._h = ro; }
      if (sim.panelDraw) sim.panelDraw(c.host.querySelector('.sim-panel'), c.st, d, c);
    }
    c.raf = requestAnimationFrame(function () { loop(c); });
  }

  // Couleurs du cours : rouge = pression, vert = pilotage / commande / gavage, bleu = retour bâche (ou BP avec o.ret)
  function resolve(c) {
    var api = c.api, sim = c.sim;
    var hasHp = false, hasZero = false, hasPil = false, hasOff = false;
    function col(it) {
      if (it.p == null) { hasOff = true; return null; }
      if (it.o.pil) { hasPil = true; return 'var(--sim-pil)'; }
      if (it.o.ret || it.p <= 0.05) { hasZero = true; return 'var(--sim-bp)'; }
      hasHp = true; return 'var(--sim-hp)';
    }
    c.pq.forEach(function (it) {
      var e = api.q(it.id); if (!e) return;
      var cc = col(it);
      if (it.k === 'line') {
        var cls = 'pipe' + (cc ? '' : ' pl-off') + (e.classList.contains('thin') ? ' thin' : '');
        if (e.getAttribute('class') !== cls) e.setAttribute('class', cls);
        e.style.stroke = cc || '';
        var f = e._flow;
        if (f) { var fc = 'flow' + (it.dir > 0 ? ' fw' : it.dir < 0 ? ' rv' : ''); if (f.getAttribute('class') !== fc) f.setAttribute('class', fc); }
        if (sim.tags !== false && it.o.tag !== false && it.p != null) c.tags[it.id] = c.tags[it.id] || { txt: SIMS.fmt(it.p, it.p < 10 && it.p % 1 ? 1 : 0) + ' ' + (sim.unit || 'b'), o: it.o };
      } else {
        e.setAttribute('class', 'zone' + (cc ? '' : ' z-off'));
        e.style.fill = cc || ''; e.style.opacity = cc ? (it.o.op || 0.85) : '';
      }
    });
    // étiquettes
    var seen = {};
    Object.keys(c.tags).forEach(function (id) {
      var tg = c.tags[id], path = api.q(id); if (!path || !path.getTotalLength) return;
      seen[id] = true;
      var g = c.tagLayer.querySelector('[data-t="' + id + '"]');
      if (!g) {
        g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('data-t', id);
        g.innerHTML = '<rect rx="5" ry="5" height="18"/><text text-anchor="middle" y="13"></text>';
        c.tagLayer.appendChild(g);
      }
      var key = path.getAttribute('d') + '|' + (tg.o.at || 0.5) + '|' + (tg.o.dx || 0) + '|' + (tg.o.dy || 0);
      if (g._k !== key) {
        var L = path.getTotalLength(), pt = path.getPointAtLength(L * (tg.o.at || 0.5));
        g.setAttribute('transform', 'translate(' + (pt.x + (tg.o.dx || 0)) + ' ' + (pt.y - 9 + (tg.o.dy || 0)) + ')'); g._k = key;
      }
      g.style.display = '';
      var tx = g.querySelector('text');
      if (tx.textContent !== tg.txt) {
        tx.textContent = tg.txt;
        var w = Math.max(30, tg.txt.length * 7.4 + 10), r = g.querySelector('rect');
        r.setAttribute('x', -w / 2); r.setAttribute('width', w);
      }
    });
    c.tagLayer.querySelectorAll('[data-t]').forEach(function (g) { if (!seen[g.getAttribute('data-t')]) g.style.display = 'none'; });
    // légende : rouge / vert / bleu (les valeurs sont écrites sur les conduites)
    if (sim.levels) {
      var h = (hasHp ? '<span><i class="lg lg-hp"></i>' + (sim.hpLabel || 'Pression') + '</span>' : '') +
        (hasPil ? '<span><i class="lg lg-pil"></i>' + (sim.pilLabel || 'Pilotage / commande') + '</span>' : '') +
        (hasZero ? '<span><i class="lg lg-bp"></i>' + (sim.bpLabel || 'Retour bâche') + '</span>' : '') +
        (hasOff ? '<span><i class="lg"></i>Sans pression</span>' : '') +
        (sim.note ? '<span class="sim-note">' + sim.note + '</span>' : '');
      var le = c.host.querySelector('.sim-legend');
      if (le._h !== h) { le.innerHTML = h; le._h = h; }
    }
  }
  function r1(p) { return Math.round(p * 10) / 10; }

  // Lien vers le simulateur Falstad (circuit texte, ouvert tout prêt)
  SIMS.falstadUrl = function (cct) {
    if (/^[\w-]+\.txt$/.test(cct)) return 'https://www.falstad.com/circuit/circuitjs.html?startCircuit=' + cct;
    return 'https://www.falstad.com/circuit/circuitjs.html?cct=' + encodeURIComponent(cct.trim().split('\n').map(function (l) { return l.trim(); }).join('\n'));
  };
})();
