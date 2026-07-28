
function showDashSection(id, btn) {
  document.querySelectorAll('.dash-section').forEach((section) => {
    section.classList.remove('active');
  });
 
  document.querySelectorAll('.sidebar-item').forEach((item) => {
    item.classList.remove('active');
  });
 
  const section = document.getElementById('dash-' + id);
  if (section) {
    section.classList.add('active');
  }
 
  if (btn) {
    btn.classList.add('active');
  }
}
 
function showAlert(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = 'flex';
    window.clearTimeout(el._hideTimer);
    el._hideTimer = window.setTimeout(() => {
      el.style.display = 'none';
    }, 3500);
  }
}
 

function obtenerIniciales(nombre) {
  const palabras = nombre.trim().split(/\s+/);
  const iniciales = palabras.map((p) => p.charAt(0)).join('');
  return iniciales.slice(0, 2).toUpperCase();
}
 
function obtenerHandle(nombre) {
  const slug = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z0-9]/g, ''); 
  return '@' + slug;
}
 
function setText(selector, valor) {
  const el = document.querySelector(selector);
  if (el) {
    el.textContent = valor;
  }
}
 

function aplicarNombreUsuario(nombreUsuario) {
  const iniciales = obtenerIniciales(nombreUsuario);
  const handle = obtenerHandle(nombreUsuario);
 

  setText('#user-name', nombreUsuario);
 

  setText('#overview-username', nombreUsuario);
 

  setText('.avatar-name', nombreUsuario);
  setText('#user-handle', handle);
 

  setText('.nav-avatar', iniciales);
  setText('.avatar-preview', iniciales);
 

  const inputUsuario = document.getElementById('username-input');
  if (inputUsuario) {
    inputUsuario.value = nombreUsuario;
  }
}
 
function initDashboard() {

  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Duelista Supremo';
 
  aplicarNombreUsuario(nombreUsuario);
 

  const defaultSection = document.querySelector('.dash-section.active') || document.getElementById('dash-overview');
  const defaultButton = document.querySelector('.sidebar-item.active') || document.querySelector('.sidebar-item');
 
  if (defaultSection) {
    defaultSection.classList.add('active');
  }
  if (defaultButton) {
    defaultButton.classList.add('active');
  }
}
 

window.showDashSection = showDashSection;
window.showAlert = showAlert;
 

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard, { once: true });
} else {
  initDashboard();
}


function showDashSection(id, btn) {
  document.querySelectorAll('.dash-section').forEach((section) => {
    section.classList.remove('active');
  });
 
  document.querySelectorAll('.sidebar-item').forEach((item) => {
    item.classList.remove('active');
  });
 
  const section = document.getElementById('dash-' + id);
  if (section) {
    section.classList.add('active');
  }
 
  if (btn) {
    btn.classList.add('active');
  }
}
 