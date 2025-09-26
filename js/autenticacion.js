
// Datos del usuario registrado
const userRegistrado = "santiago";
const passwordRegistrada = "pass12345";

/**
 * Verifica si el usuario está logueado
 * @returns {boolean} 
 */
function estaLogueado() {
    return sessionStorage.getItem('userLoggedIn') === 'true';
}

/**
 * Obtiene el nombre del usuario logueado
 * @returns {string|null} - Nombre del usuario o null si no está logueado
 */
function obtenerUsuarioLogueado() {
    return sessionStorage.getItem('userName');
}

/**
 * Valida las credenciales del usuario
 * @param {string} usuario - Nombre de usuario
 * @param {string} pass - Contraseña
 * @returns {string} - Mensaje de error vacío si es válido, mensaje de error si no
 */
function validarDatos(usuario, pass) {
    let mensaje = "";
    
    if (!usuario) {
        mensaje = "Es necesario ingresar un usuario";
    }
    
    if (!pass) {
        mensaje += "\nEs necesario ingresar una contraseña";
    }
    
    if (usuario != userRegistrado || pass != passwordRegistrada) {
        mensaje += "\nUsuario y/o contraseña incorrectos";
    }

    return mensaje;
}

/**
 * Inicia sesión del usuario
 * @param {string} usuario - Nombre de usuario
 */
function iniciarSesion(usuario) {
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userName', usuario);
}


function cerrarSesion() {
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userName');
    mostrarModalSesionCerrada();
}


function mostrarModalSesionCerrada() {
    const modal = document.getElementById('sesionCerradaModal');
    if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal, {
            backdrop: 'static',
            keyboard: false
        });
        bootstrapModal.show();
        
        setTimeout(() => {
            bootstrapModal.hide();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }, 1000);
    }
}
