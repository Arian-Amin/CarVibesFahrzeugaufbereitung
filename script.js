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

/* Video ohne Standard-Steuerleiste */
const aboutVideoPlayer =
  document.getElementById('about-video-player');

const videoPlayButton =
  document.getElementById('video-play-button');

const videoErrorMessage =
  document.getElementById('video-error-message');

if (aboutVideoPlayer && videoPlayButton && videoErrorMessage) {
  let startPending = false;

  aboutVideoPlayer.controls = false;
  aboutVideoPlayer.muted = true;
  aboutVideoPlayer.defaultMuted = true;

  function showVideoError() {
    videoPlayButton.hidden = true;
    videoErrorMessage.hidden = false;
  }

  async function startAboutVideo() {
    if (!aboutVideoPlayer.paused) {
      videoPlayButton.hidden = true;
      return;
    }

    if (startPending) return;

    startPending = true;
    videoErrorMessage.hidden = true;

    try {
      await aboutVideoPlayer.play();
      videoPlayButton.hidden = true;
    } catch (error) {
      if (!aboutVideoPlayer.paused) {
        videoPlayButton.hidden = true;
      } else if (error.name === 'NotAllowedError') {
        videoPlayButton.hidden = false;
      } else if (error.name !== 'AbortError') {
        showVideoError();
      }
    } finally {
      startPending = false;
    }
  }

  aboutVideoPlayer.addEventListener('playing', () => {
    videoPlayButton.hidden = true;
    videoErrorMessage.hidden = true;
  });

  aboutVideoPlayer.addEventListener('pause', () => {
    if (!aboutVideoPlayer.error) {
      videoPlayButton.hidden = false;
    }
  });

  aboutVideoPlayer.addEventListener('error', showVideoError);

  const videoSource = aboutVideoPlayer.querySelector('source');

  if (videoSource) {
    videoSource.addEventListener('error', showVideoError);
  }

  videoPlayButton.addEventListener('click', startAboutVideo);

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && videoPlayButton.hidden) {
        startAboutVideo();
      }
    });
  }, {
    threshold: 0.25
  });

  videoObserver.observe(aboutVideoPlayer);
}
