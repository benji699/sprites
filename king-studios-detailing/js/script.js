document.addEventListener('DOMContentLoaded', () => {

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky header shrink + shadow */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
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

  /* Back to top */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Scroll reveal */
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
