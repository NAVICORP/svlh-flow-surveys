/* Environmental Flow Surveys · St. Vrain Creek, interactions & motion */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO  = 'IntersectionObserver' in window;

  /* ---------- Gallery data ---------- */
  var PHOTOS = [
    { file: 'gal-three-hill', w: 360, h: 480, alt: 'Shadia, Jessica and Meghan standing together on a hillside at sunset', cap: 'Shadia, Jessica and Meghan' },
    { file: 'gal-skull', w: 1200, h: 1600, alt: 'A team member holding a small animal skull found beside the creek', cap: 'A skull found streamside' },
    { file: 'gal-sunrise', w: 1600, h: 1200, alt: 'Sunrise over St. Vrain Creek with an orange sky reflected in the water', cap: 'Sunrise over the creek' },
    { file: 'gal-gear-packed', w: 768, h: 1024, alt: 'Survey equipment packed into the boot of a red Mini', cap: 'Gear packed for a field day' },
    { file: 'gal-early-start', w: 1200, h: 1600, alt: 'Two team members smiling at dawn before a survey day', cap: 'An early start' },
    { file: 'gal-field-team', w: 1348, h: 1802, alt: 'Two team members in the creek holding a survey rod', cap: 'Shadia and Jessica during a cross-section survey' },
    { file: 'gal-team-district', w: 1400, h: 994, alt: 'The project team standing with Scott Griebling', cap: 'The project team with Scott Griebling' },
    { file: 'gal-set-transect', w: 1600, h: 1200, alt: 'Two team members setting up a transect line across the creek', cap: 'Setting the transect' },
    { file: 'gal-level-pair', w: 1200, h: 1600, alt: 'Two team members working with a survey level on a tripod beside the creek', cap: 'Reading the level' },
    { file: 'gal-rod-waterline', w: 1600, h: 1200, alt: 'A team member standing mid-creek holding a stadia rod at the waterline', cap: 'Holding the rod at the waterline' },
    { file: 'gal-stadia-rod', w: 1600, h: 1200, alt: 'A surveyor standing mid-channel holding a stadia rod while a second team member reads the level from the bank', cap: 'Holding the stadia rod mid-channel' },
    { file: 'gal-rod-canyon', w: 1600, h: 1200, alt: 'A team member standing in the creek holding the stadia rod on a transect tape, with a second team member on the survey level upstream and a canyon wall behind', cap: 'Holding the rod on the transect' },
    { file: 'gal-level-yellow', w: 1200, h: 1600, alt: 'Close-up of the bubble level on the yellow survey instrument', cap: 'Levelling the instrument' },
    { file: 'gal-datasheet', w: 1200, h: 1600, alt: 'A hand holding a pen over a cross-section datasheet, with a team member working the tagline in the creek behind', cap: 'Logging measurements' },
    { file: 'gal-velocity', w: 1200, h: 1600, alt: 'A hand holding a flow meter over the water surface', cap: 'Recording velocity' },
    { file: 'gal-flow-meter', w: 837, h: 1125, alt: 'Hands holding a digital flow meter above the water', cap: 'Recording velocity with a flow meter' },
    { file: 'gal-tagline', w: 1200, h: 1600, alt: 'Three team members standing in the creek recording measurements along a tagline', cap: 'Recording measurements along the tagline' },
    { file: 'gal-summer-tagline', w: 1200, h: 1600, alt: 'A team member standing mid-creek at the tagline holding a flow meter, surrounded by summer willows', cap: 'On the tagline in late summer' },
    { file: 'gal-wading', w: 1600, h: 1200, alt: 'A team member wading upstream through a shallow reach', cap: 'Wading up to the next transect' },
    { file: 'gal-shallow-riffle', w: 1200, h: 1600, alt: 'A team member working a shallow riffle lined with cobbles', cap: 'Working a shallow riffle' },
    { file: 'gal-behind-rod', w: 1200, h: 1600, alt: 'A team member smiling from behind the stadia rod', cap: 'Behind the stadia rod' },
    { file: 'gal-willow-bank', w: 1200, h: 1600, alt: 'A stadia rod held against a willow-lined bank', cap: 'Rod and tape at a willow bank' },
    { file: 'gal-suited-up', w: 1200, h: 1600, alt: 'A team member in a high-visibility vest and sunglasses before a survey', cap: 'Suited up for a survey day' },
    { file: 'gal-field-notes', w: 1200, h: 1600, alt: 'A team member holding a clipboard of field notes beside the creek', cap: 'Field notes between transects' },
    { file: 'gal-above-valley', w: 1200, h: 1600, alt: 'Two team members on a hillside above the valley', cap: 'Above the valley' },
    { file: 'gal-drive-out', w: 1600, h: 1200, alt: 'View through a windscreen driving a dirt track out to a survey reach', cap: 'The drive out to a reach' },
    { file: 'gal-storm-light', w: 1200, h: 1600, alt: 'The creek running under a heavy storm sky', cap: 'Storm light over the study reach' },
    { file: 'gal-cottonwoods', w: 1600, h: 1200, alt: 'St. Vrain Creek running below a stand of cottonwoods', cap: 'Below the cottonwoods' },
    { file: 'gal-meander', w: 1200, h: 1600, alt: 'A meander in the lower reach with grassy banks', cap: 'A meander in the lower reach' },
    { file: 'gal-low-riffle', w: 1200, h: 1600, alt: 'A riffle running low over a cobble bed', cap: 'A riffle running low' },
    { file: 'gal-late-summer', w: 1600, h: 1200, alt: 'The creek at late-summer flow between grassy banks', cap: 'Late-summer flow' },
    { file: 'gal-goose', w: 1200, h: 1600, alt: 'A Canada goose on the bank of St. Vrain Creek', cap: 'The flow supports more than fish' }
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
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
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
    if (e.key === 'ArrowLeft') showPhoto(current - 1);
    if (e.key === 'ArrowRight') showPhoto(current + 1);
  });

  /* swipe on touch */
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null || current < 0) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var sheet = document.getElementById('navSheet');
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

  if (hasIO && sections.length) {
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
  if (!reduce && hasIO) {
    document.documentElement.classList.add('js-reveal');
    var targets = document.querySelectorAll(
      '.section__head, .eyebrow, .mapcard, .maprow > *, .ack, .people > li, .cards > li, .refs, .gallery, .foot__inner > *'
    );
    targets.forEach(function (t) { if (!t.classList.contains('eyebrow')) t.classList.add('reveal'); });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        var delay = el.parentElement && (el.parentElement.classList.contains('cards') || el.parentElement.classList.contains('people')) ? siblings * 90 : 0;
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        revealIO.unobserve(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    targets.forEach(function (t) { revealIO.observe(t); });
    setTimeout(function () { targets.forEach(function (t) { t.classList.add('is-in'); }); }, 3500);
  }

  /* ---------- Hero entrance ---------- */
  if (!reduce) {
    document.documentElement.classList.add('js-anim');
    window.addEventListener('load', function () {
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        var d = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, 90 + d * 110);
      });
    });
    /* safety: if load already fired or is slow */
    setTimeout(function () {
      document.querySelectorAll('[data-anim]').forEach(function (el) { el.classList.add('is-in'); });
    }, 2600);
  }

  /* ---------- Hero flow chart ---------- */
  var chart = document.querySelector('.fchart');
  if (chart) {
    var svg  = chart.querySelector('.fchart__svg');
    var tip  = document.getElementById('fchartTip');
    var tipV = tip.querySelector('strong');
    var tipL = tip.querySelector('span');
    /* keyed by reach, not by index - reaches 4, 6 and 8 have no bar */
    var bars = {};
    svg.querySelectorAll('.fchart__bar').forEach(function (b) {
      bars[b.getAttribute('data-reach')] = b;
    });
    var allBars = Object.keys(bars).map(function (k) { return bars[k]; });
    var hits = Array.prototype.slice.call(svg.querySelectorAll('.fchart__hit'));

    function show(hit) {
      var reach = hit.getAttribute('data-reach');
      chart.classList.add('is-active');
      allBars.forEach(function (b) {
        b.classList.toggle('is-hot', b.getAttribute('data-reach') === reach);
      });
      /* untrusted-ish labels: set as text, never markup */
      tipV.textContent = hit.getAttribute('data-value');
      tipL.textContent = 'Reach ' + hit.getAttribute('data-reach');
      tip.hidden = false;
      /* beside the bar, never over it - flips side near the right edge */
      var cr = chart.getBoundingClientRect(), hr = hit.getBoundingClientRect();
      var mark = bars[reach] ? bars[reach].getBoundingClientRect() : hr;
      var cxPx = hr.left - cr.left + hr.width / 2;
      var flip = cxPx + tip.offsetWidth + 26 > cr.width;
      tip.classList.toggle('fchart__tip--left', flip);
      tip.style.left = (cxPx + (flip ? -16 : 16)) + 'px';
      var ty = mark.top - cr.top + 20;
      ty = Math.max(tip.offsetHeight / 2 + 2, Math.min(ty, cr.height - tip.offsetHeight / 2 - 2));
      tip.style.top = ty + 'px';
    }
    function hide() {
      chart.classList.remove('is-active');
      allBars.forEach(function (b) { b.classList.remove('is-hot'); });
      tip.hidden = true;
    }

    hits.forEach(function (h) {
      h.addEventListener('pointerenter', function () { show(h); });
      h.addEventListener('focus', function () { show(h); });
      h.addEventListener('blur', hide);
    });
    chart.addEventListener('pointerleave', hide);

    /* bars rise once the card is on screen; failsafe so they never stay flat */
    /* let the scaleY(0) start state paint for a frame, else the
       browser jumps straight to the end and there is no motion */
    function runChart() {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { chart.classList.add('is-in'); });
      });
    }
    if (!reduce && hasIO) {
      var chartIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          runChart();
          chartIO.unobserve(e.target);
        });
      }, { threshold: 0.25 });
      chartIO.observe(chart);
      setTimeout(runChart, 2600);
    } else {
      runChart();
    }
  }

  /* ---------- Scroll-driven: progress bar, nav, parallax, back-to-top ---------- */
  var bar = document.querySelector('#progress span');
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('is-stuck', y > 12);
    if (toTop) toTop.classList.toggle('is-on', y > window.innerHeight * 0.9);

    if (!reduce) {
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var offset = (rect.top - window.innerHeight / 2) * -speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }
})();
