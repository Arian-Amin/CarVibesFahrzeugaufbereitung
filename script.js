const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

burger.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
