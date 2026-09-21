/* Fittr waitlist — interaction layer.
   The real signup flow is a separate app (see waitlist-app/); every CTA here
   is a link out to it, not an in-page form. */

(() => {
  'use strict';

  const doc = document.documentElement;
  doc.classList.add('js');

  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ── where the real flow lives ───────────────────────────────────
     Same-origin "/join" is correct once both apps are deployed together.
     Running them as two separate local dev servers? Point this at the
     Next app's origin instead, e.g. "http://localhost:3111/join". */
  const WAITLIST_URL = '/join';

  // Every CTA on the page points into the real app.
  $$('.js-join-link').forEach((a) => { a.href = WAITLIST_URL; });

  /* ── counters ────────────────────────────────────────────────── */

  function countTo(el) {
    const target = Number(el.dataset.to);
    const fmt = n => n.toLocaleString('en-US');
    // Markup ships the real number for no-JS/first-paint; only reset to 0
    // once JS is confirmed running and about to animate it back up.
    if (calm) { el.textContent = fmt(target); return; }
    el.textContent = '0';

    const dur = 1100, t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── scroll triggers ─────────────────────────────────────────── */

  function once(el, cb, threshold = 0.4) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.disconnect();
        cb();
      });
    }, { threshold });
    io.observe(el);
  }

  // Live count from the waitlist app, which serves this page on the same
  // origin. eligibleCount is the real number of eligible signups, never a
  // padded display figure. On the standalone landing deploy (or a slow
  // response) the request fails or times out and the markup fallback stands:
  // a count that is stale-low, rather than a fabricated number.
  const tallyN = $('#tally-n');
  const liveTally = Promise.race([
    fetch('/api/stats', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(s => {
        if (!s || !Number.isFinite(s.eligibleCount)) return;
        if (tallyN) tallyN.dataset.to = s.eligibleCount;
      }),
    new Promise(resolve => setTimeout(resolve, 1500)),
  ]).catch(() => {});

  once($('.tally'), () => liveTally.then(() => countTo(tallyN)), 0.6);

  // The lock-on: brackets snap to the body, reps tick, stamp lands.
  once($('#hud'), () => {
    const hud = $('#hud');
    hud.classList.add('is-locked');
    const num = $('#hud-num');
    setTimeout(() => countTo(num), calm ? 0 : 380);
  }, 0.45);

  // Same device in the hero, played on load so the first viewport is alive.
  const scene = $('.scene__svg');
  if (scene) requestAnimationFrame(() => scene.classList.add('is-locked'));

  /* ── mobile dock ─────────────────────────────────────────────── */
  // Appears once the hero's own CTA has scrolled out of view.

  const dock = $('#dock');
  const heroJoin = $('#join');

  if ('IntersectionObserver' in window && heroJoin) {
    dock.hidden = false;
    new IntersectionObserver(([e]) => {
      dock.classList.toggle('is-up', !e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(heroJoin);
  }

  $('#yr').textContent = new Date().getFullYear();
})();
