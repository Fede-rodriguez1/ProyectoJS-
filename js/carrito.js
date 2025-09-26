// El carrito de compras se inicializa desde localStorage o como array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/**
 * Agrega un producto al carrito
 * @param {Object} producto - Producto a agregar
 */
function agregarAlCarrito(producto) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
       
        productoExistente.cantidad += 1;
    } else {
        
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    
    mostrarModalProductoAgregado(producto);
    
    
    actualizarContadorCarrito();
}

/**
 * Cambia la cantidad de un producto en el carrito
 * @param {string} productoId 
 * @param {number} cambio 
 */
function cambiarCantidad(productoId, cambio) {
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
        producto.cantidad += cambio;
        
        // Si la cantidad llega a 0, eliminar el producto
        if (producto.cantidad <= 0) {
            eliminarProducto(productoId);
            return;
        }
        
       
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
       
        mostrarProductosCarrito();
        actualizarContadorCarrito();
    }
}

/**
 * Elimina un producto del carrito
 * @param {string} productoId 
 */
function eliminarProducto(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    
    if (carrito.length > 0) {
        mostrarProductosCarrito();
    } else {
        mostrarCarritoVacio();
    }
    actualizarContadorCarrito();
}

/**
 * Actualiza el contador del carrito en el header
 */
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const carritoLink = document.querySelector('a[href*="Carritodecompras.html"], a[href*="carrito"]');
    
    if (carritoLink) {
        const icono = carritoLink.querySelector('i');
        if (icono && totalItems > 0) {
            
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

/**
 * Finaliza la compra
 */
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarModalCarritoVacio();
        return;
    }
    
    
    mostrarModalResumenCompra();
}

/**
 * Procesa la compra después de confirmar
 */
function procesarCompra() {
    
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    
    mostrarCarritoVacio();
    actualizarContadorCarrito();
}

/**
 * Actualiza los totales del carrito
 */
function actualizarTotales() {
    const subtotal = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    const total = subtotal;
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal}`;
    if (totalElement) totalElement.textContent = `$${total}`;
}
