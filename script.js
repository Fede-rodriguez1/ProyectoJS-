
// Se utiliza un array de objetos para manejar los productos.
// Esto es más escalable y cumple con el requisito de usar arrays.
const productos = [
    { id: "1", nombre: "Koson N°1", precio: 1590 },
    { id: "2", nombre: "Set x2 Van Gogh", precio: 2650 },
    { id: "3", nombre: "Set x2 Mark Rothko", precio: 2650 },
    { id: "4", nombre: "Picasso N°1", precio: 1590 },
    { id: "5", nombre: "Sekka N°1", precio: 1590 },
    { id: "6", nombre: "Matisse N°1", precio: 1590 },
    { id: "7", nombre: "Hokusai N°1", precio: 1590 },
    { id: "8", nombre: "Set x2 Banksy", precio: 2650 },
    { id: "9", nombre: "Kandinsky N°1", precio: 1590 },
    { id: "10", nombre: "Frida Kahlo N°1", precio: 1590 },
    { id: "11", nombre: "Basquiat N°1", precio: 1590 },
    { id: "12", nombre: "Monet N°1", precio: 1590 }
];

// Datos del usuario registrado.
const userRegistrado = "santiago";
const passwordRegistrada = "pass12345";
// El carrito de compras inicia como un array vacío.
const carrito = [];


// --------------------- FUNCIONES DE LA APLICACIÓN ---
// Inicializar flujo de login mediante modal Bootstrap cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si ya está logueado
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Si ya está logueado, inicializar directamente
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
                // Guardar login en localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userName', usuario);
                loginModal.hide();
                inicializarEventosCompra();
            } else {
                if (errorElement) {
                    errorElement.textContent = mensaje.replaceAll('\n', ' ');
                } else {
                    alert(mensaje);
                }
            }
        });
    }
});

function inicializarEventosCompra() {
    // Delegación: escuchar clicks en todos los botones .btn-comprar
    document.querySelectorAll('.btn-comprar').forEach(function (boton) {
        boton.addEventListener('click', function (e) {
            const id = e.currentTarget.getAttribute('data-product-id');
            const productoEncontrado = productos.find(p => p.id === id);
            if (productoEncontrado) {
                carrito.push(productoEncontrado);
                alert(`👍 Se agregó "${productoEncontrado.nombre}" a tu carrito.`);
            }
        });
    });
}

// en este caso los parametros usuario y pass son los datos ingresados por el usuario y dentro de la misma siempre deben llamarse igual
function validarDatos(usuario, pass) {
    let mensaje = ""; // en este caso mensaje esta vacio porque no hubo errores
    
    //!usuario es lo mismo que usuario == null || usuario == "" y es para saber si el usuario no ingreso nada
    if (!usuario) {
        mensaje = "Es necesario ingresar un usuario";
    }
    
    if (!pass) {
        mensaje += "\nEs necesario ingresar una contraseña";
    }
    
    // aca tambien puedo usar === en vez de != y seria lo mismo pero estaria diciendo que el usuario es igual a userRegistrado y la contraseña es igual a passwordRegistrada solo que tendria que usar && en vez de ||
    if (usuario != userRegistrado || pass != passwordRegistrada) {

        mensaje += "\nUsuario y/o contraseña incorrectos";
    }

    // En este caso si el mensaje sigue siendo cadena vacia es porque no hubo errores y por lo tanto el usuario y la contraseña son correctos
return mensaje;
}

// el flujo de login se inicia automáticamente con el modal en DOMContentLoaded

/**
 * Función principal que gestiona la lógica del carrito de compras.
 */
function iniciarCarrito() {
 // Flujo obsoleto: mantenido por compatibilidad si se llama en otra página
}

function mostrarResumenCompra() {
    let resumen = "RESUMEN DE SU COMPRA:\n\n";
    let totalCompra = 0;
    // Se itera sobre el array del carrito para construir el resumen.
    for (const item of carrito) {
        resumen += `- ${item.nombre}\n - ${item.precio}`;
        totalCompra += item.precio;
    }

    // Se muestra el resumen en un alert y en la consola.
    resumen += `\n---------------------\n`;
    resumen += `\nTOTAL: $${totalCompra}\n\n`;
    alert(resumen);
    console.log(resumen);
    alert("¡Gracias por su compra, vuelva pronto!");
}