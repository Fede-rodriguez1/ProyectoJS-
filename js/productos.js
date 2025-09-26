// Array de productos disponibles
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

/**
 * Busca un producto por su ID
 * @param {string} id 
 * @returns {Object|undefined} 
 */
function buscarProducto(id) {
    return productos.find(p => p.id === id);
}

/**
 * Obtiene todos los productos
 * @returns {Array} 
 */
function obtenerProductos() {
    return productos;
}

/**
 * Obtiene un producto por su nombre
 * @param {string} nombre 
 * @returns {Object|undefined} 
 */
function buscarProductoPorNombre(nombre) {
    return productos.find(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

/**
 * Obtiene productos por rango de precio
 * @param {number} precioMin 
 * @param {number} precioMax 
 * @returns {Array} 
 */
function filtrarProductosPorPrecio(precioMin, precioMax) {
    return productos.filter(p => p.precio >= precioMin && p.precio <= precioMax);
}

/**
 * Obtiene productos por categoría (basado en el nombre)
 * @param {string} categoria
 * @returns {Array} 
 */
function filtrarProductosPorCategoria(categoria) {
    return productos.filter(p => 
        p.nombre.toLowerCase().includes(categoria.toLowerCase())
    );
}
