/**
 * Actualiza la interfaz según el estado de login
 */
function actualizarInterfazLogin() {
    const logoutSection = document.getElementById('logoutSection');
    
    if (estaLogueado()) {
     
        if (logoutSection) {
            logoutSection.style.display = 'block';
        }
    } else {
       
        if (logoutSection) {
            logoutSection.style.display = 'none';
        }
    }
}

/**
 * Inicializa los eventos de compra
 */
function inicializarEventosCompra() {
    document.querySelectorAll('.btn-comprar').forEach(function (boton) {
        boton.addEventListener('click', function (e) {
            const id = e.currentTarget.getAttribute('data-product-id');
            const productoEncontrado = buscarProducto(id);
            if (productoEncontrado) {
                agregarAlCarrito(productoEncontrado);
            }
        });
    });
    
    if (document.getElementById('mainCarrito')) {
        inicializarPaginaCarrito();
    }
}

/**
 * Inicializa la página de carrito
 */
function inicializarPaginaCarrito() {
    const mainCarrito = document.getElementById('mainCarrito');
    if (!mainCarrito) return;
    
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    if (carritoVacio) {
        carritoVacio.style.display = 'none';
    }
    
    crearSeccionProductosCarrito();
    
    if (carrito.length > 0) {
        mostrarProductosCarrito();
    } else {
        mostrarCarritoVacio();
    }
}

/**
 * Crea la estructura HTML de productos del carrito
 */
function crearSeccionProductosCarrito() {
    const mainCarrito = document.getElementById('mainCarrito');
    
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
    
    const recomendaciones = document.querySelector('.mainCarritoRecomendacion');
    if (recomendaciones) {
        mainCarrito.insertBefore(carritoContainer, recomendaciones);
    } else {
        mainCarrito.appendChild(carritoContainer);
    }
    
    document.getElementById('btnFinalizarCompra').addEventListener('click', finalizarCompra);
}

/**
 * Muestra los productos en el carrito
 */
function mostrarProductosCarrito() {
    const listaProductos = document.getElementById('listaProductos');
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    const carritoProductos = document.querySelector('.mainCarritoProductos');
    
    if (!listaProductos) return;
    
   
    if (carritoVacio) carritoVacio.style.display = 'none';
    if (carritoProductos) carritoProductos.style.display = 'block';
    
    
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
    
    actualizarTotales();
}

/**
 * Muestra carrito vacío
 */
function mostrarCarritoVacio() {
    const carritoVacio = document.querySelector('.mainCarritoVacio');
    const carritoProductos = document.querySelector('.mainCarritoProductos');
    
    if (carritoVacio) carritoVacio.style.display = 'block';
    if (carritoProductos) carritoProductos.style.display = 'none';
}
