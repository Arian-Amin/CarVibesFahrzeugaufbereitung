const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');
const miniLogo = document.getElementById('mini-logo');
const servicesLink = document.getElementById('services-link');
const scrollHint = document.getElementById('scroll-hint');
const about = document.getElementById('about');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}
function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

if (burger) burger.addEventListener('click', openSidebar);
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);
if (servicesLink) servicesLink.addEventListener('click', openSidebar);

if (scrollHint && about) {
  scrollHint.addEventListener('click', () => {
    about.scrollIntoView({ behavior: 'smooth' });
  });
}

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > window.innerHeight * 0.5;
  if (burger) burger.classList.toggle('hide', scrolled);
  if (miniLogo) miniLogo.classList.toggle('visible', scrolled);
});
