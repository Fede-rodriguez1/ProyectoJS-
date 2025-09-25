
// Se utiliza un array de objetos para manejar los productos.
// Esto es más escalable y cumple con el requisito de usar arrays.
const productos = [
    { id: "1", nombre: "Cuadro Basquiat", precio: 3450 },
    { id: "2", nombre: "Cuadro Frida Kahlo", precio: 4380 },
    { id: "3", nombre: "Cuadro Van Gogh", precio: 1195 },
    { id: "4", nombre: "Cuadro Picasso", precio: 3120 },
    { id: "5", nombre: "Cuadro Monet", precio: 3285 }
];

// Datos del usuario registrado.
const userRegistrado = "santiago";
const passwordRegistrada = "pass12345";
// El carrito de compras inicia como un array vacío.
const carrito = [];


// --------------------- FUNCIONES DE LA APLICACIÓN ---
/**
 * Función de ENTRADA: Inicia el proceso solicitando datos al usuario para el login.
 */
function solicitarDatosUsuario() {
    let usuario = prompt('Ingrese su usuario:');
    let pass = prompt('Ingrese su contraseña:');


      
    // Si la validación es exitosa, se inicia el carrito.
    let mensaje = validarDatos(usuario, pass);
    if (mensaje == "") {
//invocamos la funcion iniciar carrito
        iniciarCarrito();
       
}else{
    console.log(mensaje);
    alert(mensaje);
}
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

//invocamos la funcion
solicitarDatosUsuario();

/**
 * Función principal que gestiona la lógica del carrito de compras.
 */
function iniciarCarrito() {
 let finalizarCarrito = false;

 let listadoProductos = " ingrese el codigo del producto que desea comprar:\n\n";

 for (const producto of productos) {
    listadoProductos += `Cod ${producto.id} - ${producto.nombre} - $${producto.precio}\n`;
 }

 listadoProductos += "\nPresione cancelar para finalizar la compra.";   

 alert("Bienvenido al carrito de compras, los productos disponibles son: \n" + listadoProductos);

 while (!finalizarCarrito) {
    let codigo = prompt(listadoProductos);
    const productoEncontrado = productos.find(p => p.id === codigo);

        if (productoEncontrado) {
            // Si se encuentra, se agrega al carrito.
            carrito.push(productoEncontrado);
            alert(`👍 Se agregó "${productoEncontrado.nombre}" a tu carrito.`);
        } else {
            // Si el código no es válido o el usuario presiona "Cancelar".
            if (codigo === null) {
                finalizarCarrito = true; // Termina el bucle.
            } else {
                alert("Código no válido. Por favor, ingrese un código de la lista.");
            }
 }

}
// Al finalizar, solo se muestra el resumen si se agregaron productos.
    if (carrito.length > 0) {
        mostrarResumenCompra();
    } else {
        alert("Tu carrito está vacío. ¡Gracias por tu visita!");
    }
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