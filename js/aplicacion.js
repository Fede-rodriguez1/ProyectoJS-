// Inicializar flujo de login mediante modal Bootstrap cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si ya está logueado (usando sessionStorage para que expire al cerrar pestaña)
    if (estaLogueado()) {
        // Si ya está logueado, inicializar directamente
        actualizarInterfazLogin();
        inicializarEventosCompra();
        return;
    }

    const modalElement = document.getElementById('loginModal');
    const form = document.getElementById('loginForm');
    const errorElement = document.getElementById('loginError');

    if (modalElement && form) {
        const loginModal = new bootstrap.Modal(modalElement, { backdrop: 'static', keyboard: false });
        loginModal.show();

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario').value.trim().toLowerCase();
            const pass = document.getElementById('contraseña').value;

            const mensaje = validarDatos(usuario, pass);
            if (mensaje === "") {
                if (errorElement) {
                    errorElement.textContent = "";
                }
                // Guardar login en sessionStorage (expira al cerrar pestaña)
                iniciarSesion(usuario);
                loginModal.hide();
                actualizarInterfazLogin();
                inicializarEventosCompra();
            } else {
                if (errorElement) {
                    errorElement.textContent = mensaje.replaceAll('\n', ' ');
                }
            }
        });
    }
});


function iniciarCarrito() {
}


function mostrarResumenCompra() {
   
    mostrarModalResumenCompra();
}
