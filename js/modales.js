
/**
 * Obtiene la ruta correcta para las imágenes según la página actual
 * @returns {string} 
 */
function obtenerRutaImagenes() {
    
    if (window.location.pathname.includes('Pages/')) {
        return '../images/';
    }
  
    return 'images/';
}

/**
 * Muestra el modal de confirmación cuando se agrega un producto al carrito
 * @param {Object} producto 
 */
function mostrarModalProductoAgregado(producto) {
    const modal = document.getElementById('productoAgregadoModal');
    const mensaje = document.getElementById('productoAgregadoMensaje');
    const imagen = document.getElementById('productoAgregadoImagen');
    
    if (modal && mensaje && imagen) {
       
        mensaje.textContent = `Se agregó "${producto.nombre}" a tu carrito.`;
        
        
        imagen.src = `${obtenerRutaImagenes()}artistas${producto.id}.jpg`;
        imagen.alt = producto.nombre;
        
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

/**
 * Muestra el modal de carrito vacío
 */
function mostrarModalCarritoVacio() {
    const modal = document.getElementById('carritoVacioModal');
    if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

/**
 * Muestra el modal de resumen de compra
 */
function mostrarModalResumenCompra() {
    const modal = document.getElementById('resumenCompraModal');
    const contenido = document.getElementById('resumenCompraContenido');
    
    if (modal && contenido) {
       
        let html = '<div class="resumen-productos">';
        
        let totalCompra = 0;
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            totalCompra += subtotal;
            
            html += `<div class="producto-resumen mb-3 p-3 border rounded">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${obtenerRutaImagenes()}artistas${item.id}.jpg" alt="${item.nombre}" class="img-fluid rounded producto-resumen-imagen">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-1">${item.nombre}</h6>
                        <small class="text-muted">Precio unitario: $${item.precio}</small>
                    </div>
                    <div class="col-md-2 text-center">
                        <span class="badge bg-primary fs-6">${item.cantidad}</span>
                    </div>
                    <div class="col-md-2 text-center">
                        <small class="text-muted">$${item.precio}</small>
                    </div>
                    <div class="col-md-2 text-end">
                        <strong>$${subtotal}</strong>
                    </div>
                </div>
            </div>`;
        });
        
        html += '</div>';
        html += `<div class="alert alert-info text-center mt-4">
            <h4 class="mb-0">Total: $${totalCompra}</h4>
        </div>`;
        
        contenido.innerHTML = html;
        
        // Configurar evento del botón de confirmación
        const confirmarBtn = document.getElementById('confirmarCompraBtn');
        if (confirmarBtn) {
            confirmarBtn.onclick = function() {
             
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
                
                
                setTimeout(() => {
                    mostrarModalAgradecimiento();
                }, 300);
            };
        }
        
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}

/**
 * Muestra el modal de agradecimiento después de la compra
 */
function mostrarModalAgradecimiento() {
    
    procesarCompra();
    
    const modal = document.getElementById('agradecimientoModal');
    if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }
}
