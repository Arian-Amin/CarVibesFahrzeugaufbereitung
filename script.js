const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');
const miniLogo = document.getElementById('mini-logo');
const servicesLink = document.getElementById('services-link');
const scrollHint = document.getElementById('scroll-hint');
const about = document.getElementById('about');

function openSidebar() {
  if (sidebar) sidebar.classList.add('active');
  if (overlay) overlay.classList.add('active');
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

if (burger) {
  burger.addEventListener('click', openSidebar);
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeSidebar);
}

if (overlay) {
  overlay.addEventListener('click', closeSidebar);
}

if (servicesLink) {
  servicesLink.addEventListener('click', openSidebar);
}

if (scrollHint && about) {
  scrollHint.addEventListener('click', () => {
    about.scrollIntoView({
      behavior: 'smooth'
    });
  });
}

function updateScrollHeader() {
  const scrolled = window.scrollY > window.innerHeight * 0.5;

  if (burger) {
    burger.classList.toggle('hide', scrolled);
  }

  if (miniLogo) {
    miniLogo.classList.toggle('visible', scrolled);
  }
}

window.addEventListener('scroll', updateScrollHeader, {
  passive: true
});

window.addEventListener('resize', updateScrollHeader);

updateScrollHeader();

/* Video starten und Steuerung bei laufender Wiedergabe ausblenden */
const aboutVideoPlayer =
  document.getElementById('about-video-player');

if (aboutVideoPlayer) {
  aboutVideoPlayer.muted = true;
  aboutVideoPlayer.defaultMuted = true;

  let startPending = false;

  function tryStartAboutVideo() {
    if (!aboutVideoPlayer.paused || startPending) return;

    startPending = true;

    const playAttempt = aboutVideoPlayer.play();

    if (playAttempt !== undefined) {
      playAttempt
        .catch(() => {
          aboutVideoPlayer.controls = true;
        })
        .finally(() => {
          startPending = false;
        });
    } else {
      startPending = false;
    }
  }

  aboutVideoPlayer.addEventListener('playing', () => {
    aboutVideoPlayer.controls = false;
  });

  aboutVideoPlayer.addEventListener('pause', () => {
    aboutVideoPlayer.controls = true;
  });

  aboutVideoPlayer.addEventListener('error', () => {
    aboutVideoPlayer.controls = true;
  });

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tryStartAboutVideo();
      }
    });
  }, {
    threshold: 0.25
  });

  videoObserver.observe(aboutVideoPlayer);

  if (!aboutVideoPlayer.paused) {
    aboutVideoPlayer.controls = false;
  }
}
