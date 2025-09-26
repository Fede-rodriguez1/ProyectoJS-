
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
// El carrito de compras se inicializa desde localStorage o como array vacío.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


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
                agregarAlCarrito(productoEncontrado);
            }
        });
    });
    
    // Inicializar página de carrito si estamos en ella
    if (document.getElementById('mainCarrito')) {
        inicializarPaginaCarrito();
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si ya existe, incrementar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregarlo con cantidad 1
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar mensaje de confirmación
    alert(`👍 Se agregó "${producto.nombre}" a tu carrito.`);
    
    // Actualizar contador del carrito si existe
    actualizarContadorCarrito();
}

// Función para inicializar la página de carrito
function inicializarPaginaCarrito() {
    const mainCarrito = document.getElementById('mainCarrito');
    if (!mainCarrito) return;
    
    // Ocultar sección de carrito vacío por defecto
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    if (carritoVacio) {
        carritoVacio.style.display = 'none';
    }
    
    // Crear sección de productos del carrito
    crearSeccionProductosCarrito();
    
    // Mostrar productos si hay alguno en el carrito
    if (carrito.length > 0) {
        mostrarProductosCarrito();
    } else {
        mostrarCarritoVacio();
    }
}

// Función para crear la estructura HTML de productos del carrito
function crearSeccionProductosCarrito() {
    const mainCarrito = document.getElementById('mainCarrito');
    
    // Crear contenedor principal del carrito
    const carritoContainer = document.createElement('section');
    carritoContainer.className = 'mainCarritoProductos';
    carritoContainer.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h2>Tu carrito</h2>
                    <div id="listaProductos" class="lista-productos">
                        <!-- Los productos se cargarán aquí -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="resumen-carrito">
                        <h3>Resumen de compra</h3>
                        <div class="resumen-detalle">
                            <div class="subtotal">
                                <span>Subtotal:</span>
                                <span id="subtotal">$0</span>
                            </div>
                            <div class="total">
                                <span>Total:</span>
                                <span id="total">$0</span>
                            </div>
                        </div>
                        <button id="btnFinalizarCompra" class="btn btn-primary btn-lg w-100 mt-3">
                            Finalizar Compra
                        </button>
                        <a href="../index.html" class="btn btn-outline-secondary w-100 mt-2">
                            Seguir Comprando
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insertar antes de las recomendaciones
    const recomendaciones = document.querySelector('.mainCarritoRecomendacion');
    if (recomendaciones) {
        mainCarrito.insertBefore(carritoContainer, recomendaciones);
    } else {
        mainCarrito.appendChild(carritoContainer);
    }
    
    // Agregar event listeners
    document.getElementById('btnFinalizarCompra').addEventListener('click', finalizarCompra);
}

// Función para mostrar los productos en el carrito
function mostrarProductosCarrito() {
    const listaProductos = document.getElementById('listaProductos');
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    const carritoProductos = document.querySelector('.mainCarritoProductos');
    
    if (!listaProductos) return;
    
    // Ocultar carrito vacío y mostrar productos
    if (carritoVacio) carritoVacio.style.display = 'none';
    if (carritoProductos) carritoProductos.style.display = 'block';
    
    // Limpiar lista actual
    listaProductos.innerHTML = '';
    
    // Crear elementos para cada producto
    carrito.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto-carrito';
        productoElement.innerHTML = `
            <div class="row align-items-center mb-3 p-3 border rounded">
                <div class="col-md-2">
                    <img src="../images/artistas${producto.id}.jpg" alt="${producto.nombre}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h5>${producto.nombre}</h5>
                    <p class="text-muted">Precio unitario: $${producto.precio}</p>
                </div>
                <div class="col-md-3">
                    <div class="cantidad-controls">
                        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${producto.id}', -1)">-</button>
                        <span class="mx-2">${producto.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${producto.id}', 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <p class="fw-bold">$${producto.precio * producto.cantidad}</p>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        listaProductos.appendChild(productoElement);
    });
    
    // Actualizar totales
    actualizarTotales();
}

// Función para mostrar carrito vacío
function mostrarCarritoVacio() {
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    const carritoProductos = document.querySelector('.mainCarritoProductos');
    
    if (carritoVacio) carritoVacio.style.display = 'block';
    if (carritoProductos) carritoProductos.style.display = 'none';
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(productoId, cambio) {
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
        producto.cantidad += cambio;
        
        // Si la cantidad llega a 0, eliminar el producto
        if (producto.cantidad <= 0) {
            eliminarProducto(productoId);
            return;
        }
        
        // Guardar cambios en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Actualizar la vista
        mostrarProductosCarrito();
        actualizarContadorCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    
    // Guardar cambios en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar la vista
    if (carrito.length > 0) {
        mostrarProductosCarrito();
    } else {
        mostrarCarritoVacio();
    }
    actualizarContadorCarrito();
}

// Función para actualizar los totales
function actualizarTotales() {
    const subtotal = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    const total = subtotal; // Aquí podrías agregar impuestos, descuentos, etc.
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal}`;
    if (totalElement) totalElement.textContent = `$${total}`;
}

// Función para actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const carritoLink = document.querySelector('a[href*="Carritodecompras.html"], a[href*="carrito"]');
    
    if (carritoLink) {
        const icono = carritoLink.querySelector('i');
        if (icono && totalItems > 0) {
            // Crear o actualizar badge
            let badge = carritoLink.querySelector('.badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge bg-danger position-absolute top-0 start-100 translate-middle';
                carritoLink.style.position = 'relative';
                carritoLink.appendChild(badge);
            }
            badge.textContent = totalItems;
        } else if (badge) {
            badge.remove();
        }
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    
    let resumen = "RESUMEN DE SU COMPRA:\n\n";
    carrito.forEach(item => {
        resumen += `- ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
    });
    resumen += `\n---------------------\n`;
    resumen += `TOTAL: $${total}\n\n`;
    
    alert(resumen);
    
    // Limpiar carrito después de la compra
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar vista
    mostrarCarritoVacio();
    actualizarContadorCarrito();
    
    alert("¡Gracias por su compra, vuelva pronto!");
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