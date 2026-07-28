function switchLoginTab(tab, e) {
  const evt = e || window.event;
  const target = evt?.currentTarget || evt?.target;
 
  document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
  if (target && target.classList) {
    target.classList.add('active');
  }
 
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
 
  if (loginForm) {
    loginForm.style.display = tab === 'login' ? 'block' : 'none';
  }
  if (registerForm) {
    registerForm.style.display = tab === 'register' ? 'block' : 'none';
  }
}
 
 
document.addEventListener('DOMContentLoaded', () => {
 
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email-login');
  const passwordInput = document.getElementById('password-login');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const globalMessage = document.getElementById('globalMessage');
 
  // Simulación de credenciales
  const USUARIO = 'admin@mindslaver.com';
  const PASSWORD = 'admin123';
  const nombreUsuario = 'Duelista Supremo';
 
  // Regla básica de validación de email (sin el espacio sobrante)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  // Mostrar error debajo del input
  const showError = (inputElement, errorElement, message) => {
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  };
 
  // Limpiar error de un input
  const clearError = (inputElement, errorElement) => {
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  };
 
  // Limpiar el mensaje global
  const clearGlobalMessage = () => {
    globalMessage.textContent = '';
    globalMessage.className = 'global-message';
    globalMessage.style.display = 'none';
  };
 
  // Mostrar el mensaje global (success | error)
  const showGlobalMessage = (message, tipo) => {
    globalMessage.textContent = message;
    globalMessage.className = 'global-message ' + tipo;
    globalMessage.style.display = 'block';
  };
 
  // Limpiar errores mientras el usuario escribe
  emailInput.addEventListener('input', () => {
    clearError(emailInput, emailError);
    clearGlobalMessage();
  });
 
  passwordInput.addEventListener('input', () => {
    clearError(passwordInput, passwordError);
    clearGlobalMessage();
  });
 
  // Submit del formulario de login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
 
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
 
    let isValid = true;
 
    // Validar email
    if (emailValue === '') {
      showError(emailInput, emailError, 'El correo electrónico es requerido.');
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailInput, emailError, 'Por favor ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }
 
    // Validar contraseña
    if (passwordValue === '') {
      showError(passwordInput, passwordError, 'La contraseña es requerida.');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }
 
    if (!isValid) {
      return;
    }
 
    // Simular autenticación
    if (emailValue === USUARIO && passwordValue === PASSWORD) {
      showGlobalMessage(`¡Bienvenido, ${nombreUsuario}!`, 'success');
 
      // Guardar el nombre para mostrarlo en el dashboard
      localStorage.setItem('nombreUsuario', nombreUsuario);
 
      setTimeout(() => { window.location.href = 'Dashboard.html'; }, 1500);
    } else {
      showGlobalMessage('Credenciales incorrectas. Por favor, intenta de nuevo.', 'error');
    }
  });
 
});
