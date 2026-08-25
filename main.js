/* Environmental Flow Surveys · St. Vrain Creek — interactions */
(function () {
  'use strict';

  /* ---------- Gallery ---------- */
  var PHOTOS = [
    { file: 'gal-creek-survey',    w: 1400, h: 1048, alt: 'A surveyor standing mid-channel while measuring a riffle transect',      cap: 'Measuring a riffle transect mid-channel' },
    { file: 'gal-field-team',      w: 1348, h: 1802, alt: 'Two team members in the creek holding a survey rod',                      cap: 'Shadia and Jessica during a cross-section survey' },
    { file: 'gal-flow-meter',      w: 837,  h: 1125, alt: 'Hands holding a digital flow meter above the water',                      cap: 'Recording velocity with a flow meter' },
    { file: 'gal-creek-panorama',  w: 1600, h: 533,  alt: 'Wide view looking downstream along St. Vrain Creek',                      cap: 'Looking downstream along the study reach' },
    { file: 'gal-survey-level',    w: 678,  h: 900,  alt: 'A team member setting up a survey level on a tripod',                     cap: 'Setting up the survey level' },
    { file: 'gal-gear-truck',      w: 678,  h: 899,  alt: 'Loading survey equipment from the back of a truck',                       cap: 'Loading gear for a field day' },
    { file: 'gal-waders',          w: 679,  h: 899,  alt: 'A team member pulling on waders beside the road',                         cap: 'Suiting up before a transect' },
    { file: 'gal-st-vrain-creek',  w: 554,  h: 554,  alt: 'St. Vrain Creek running shallow over a cobble bar',                       cap: 'Low flow over a cobble bar' },
    { file: 'gal-team-district',   w: 1400, h: 994,  alt: 'The project team standing with District staff',                           cap: 'The project team with District staff' },
    { file: 'gal-recreation',      w: 1122, h: 1402, alt: 'People floating the creek in an inflatable tube',                         cap: 'Recreation depends on flow too' }
  ];

  var grid = document.getElementById('gallery-grid');
  if (grid) {
    PHOTOS.forEach(function (p, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-index', String(i));
      btn.setAttribute('aria-label', 'View photo: ' + p.cap);
      btn.innerHTML =
        '<img src="assets/' + p.file + '-sm.webp" alt="' + p.alt + '" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async">' +
        '<figcaption>' + p.cap + '</figcaption>';
      grid.appendChild(btn);
    });
  }

  /* ---------- Lightbox ---------- */
  var lb      = document.getElementById('lightbox');
  var lbImg   = document.getElementById('lbImg');
  var lbCap   = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  var lbPrev  = document.getElementById('lbPrev');
  var lbNext  = document.getElementById('lbNext');
  var current = -1;
  var lastFocus = null;

  function showPhoto(i) {
    if (i < 0) i = PHOTOS.length - 1;
    if (i >= PHOTOS.length) i = 0;
    current = i;
    var p = PHOTOS[i];
    lbImg.src = 'assets/' + p.file + '.webp';
    lbImg.alt = p.alt;
    lbCap.textContent = p.cap;
    lbPrev.hidden = false;
    lbNext.hidden = false;
  }

  function openSingle(src, caption) {
    current = -1;
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lbPrev.hidden = true;
    lbNext.hidden = true;
    openBox();
  }

  function openBox() {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeBox() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-index]');
      if (!btn) return;
      showPhoto(parseInt(btn.getAttribute('data-index'), 10));
      openBox();
    });
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      openSingle(el.getAttribute('data-lightbox'), el.getAttribute('data-caption'));
    });
  });

  lbClose.addEventListener('click', closeBox);
  lbPrev.addEventListener('click', function () { showPhoto(current - 1); });
  lbNext.addEventListener('click', function () { showPhoto(current + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lightbox__figure')) closeBox();
  });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeBox();
    if (current < 0) return;
    if (e.key === 'ArrowLeft')  showPhoto(current - 1);
    if (e.key === 'ArrowRight') showPhoto(current + 1);
  });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var sheet  = document.getElementById('navSheet');
  toggle.addEventListener('click', function () {
    var open = sheet.hidden;
    sheet.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  sheet.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      sheet.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Scroll spy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    var targets = document.querySelectorAll('.section__head, .mapcard, .maprow, .ack, .cards > li, .refs, .gallery');
    targets.forEach(function (t) { t.classList.add('reveal'); });
    // failsafe: never leave content hidden
    setTimeout(function () {
      targets.forEach(function (t) { t.classList.add('is-in'); });
    }, 2500);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add('is-in'); }, Math.min(i * 45, 180));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px 0px 0px', threshold: 0.01 });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
