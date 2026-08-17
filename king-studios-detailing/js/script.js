document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky header shrink + shadow, scroll progress bar, hero parallax */
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const hero = document.querySelector('.hero');
  const heroShine = document.querySelector('.hero__shine');
  const heroGrid = document.querySelector('.hero__grid');
  let ticking = false;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    backToTop.classList.toggle('is-visible', window.scrollY > 600);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;

    if (!prefersReducedMotion && hero && window.scrollY < hero.offsetHeight) {
      if (heroShine) heroShine.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      if (heroGrid) heroGrid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }

    updateActiveNav();
    ticking = false;
  };
  const onScrollThrottled = () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  };

  /* Mobile nav */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      header.classList.remove('nav-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  /* Active nav link tracks current section while scrolling */
  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  function updateActiveNav() {
    const fromTop = window.scrollY + header.offsetHeight + 40;
    let current = navSections[0];
    navSections.forEach((section) => {
      if (section.offsetTop <= fromTop) current = section;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', current && link.getAttribute('href') === `#${current.id}`);
    });
  }

  /* Back to top */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', onScrollThrottled);
  onScroll();

  /* Scroll reveal, with a staggered delay per grid so groups cascade in */
  document.querySelectorAll('.grid').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
      }
    });
  });
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));

  /* Count-up numbers (5.0★, 96 reviews, 14K+ followers, etc.) */
  const countEls = document.querySelectorAll('.count-up');
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      countIo.unobserve(el);

      if (prefersReducedMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  countEls.forEach((el) => countIo.observe(el));

  /* Spotlight hover glow that follows the cursor on cards */
  document.querySelectorAll('.card, .price-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  /* Draggable before/after sliders in the gallery */
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const range = slider.querySelector('.ba-slider__range');
    const setPos = (value) => slider.style.setProperty('--pos', `${value}%`);
    setPos(range.value);
    range.addEventListener('input', () => setPos(range.value));
  });

  /* Testimonial carousel */
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (track) {
    const slides = Array.from(track.children);
    let index = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to review ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      track.style.transition = 'transform .5s ease';
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      resetTimer();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    render();
    resetTimer();
  }

  /* FAQ accordion */
  document.querySelectorAll('.accordion__item').forEach((item) => {
    const head = item.querySelector('.accordion__head');
    const body = item.querySelector('.accordion__body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.accordion__item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.accordion__body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* Booking form (front-end only — wire up to a backend / email service to go live) */
  const form = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent('New booking enquiry — King Studios Detailing');
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\n` +
        `Phone: ${data.get('phone')}\n` +
        `Email: ${data.get('email')}\n` +
        `Vehicle: ${data.get('vehicle')}\n` +
        `Service: ${data.get('service')}\n\n` +
        `Message:\n${data.get('message')}`
      );
      window.location.href = `mailto:info@kingstudiosdetailing.co.uk?subject=${subject}&body=${body}`;
      formNote.textContent = "Opening your email client to send this enquiry — or call us directly on 07932 306633.";
    });
  }

});
