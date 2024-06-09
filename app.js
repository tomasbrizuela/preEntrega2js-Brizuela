let buscarProductos = () => {
    let productoElegidos = prompt("Por favor, ingrese el nombre del producto o una parte del nombre del producto");

    if (productoElegidos == "") {
        procesoDeCompra();
    } else {
        let productoElegido = productoElegidos.toLocaleLowerCase();
        let productosDisponibles = productos.filter(item => item.nombre.toLowerCase().includes(productoElegido))
        let respuesta = [];
        if (productosDisponibles.length == 0) {
            procesoDeCompra();

        } else {
            respuesta.push({
                respuesta: productosDisponibles,
            })
            respuesta.push({
                respuesta: productoElegido
            })
            return respuesta;

        }
    }


}

let mostrarDisponibles = () => {
    let encontradosArray = buscarProductos();
    let encontrados = encontradosArray[0].respuesta;
    let buscado = encontradosArray[1].respuesta;
    let disponibles = [];
    let noDisponbiles = [];

    encontrados.forEach((item) => {
        if (item.stock > 0) {
            disponibles.push({
                producto: item.nombre,
                precio: item.precio,
                stock: item.stock
            })
        } else {
            noDisponbiles.push({
                producto: item.nombre,
                precio: item.precio,
                stock: item.stock
            })
        }
    })

    let mostrarDisponibles = JSON.stringify(disponibles);
    let mostrarNoDisponibles = JSON.stringify(noDisponbiles);

    if (mostrarDisponibles.length > 2 && mostrarNoDisponibles.length > 2) {
        alert("DISPONIBLES: " + "\n" + mostrarDisponibles + "\n" + "\n" + "NO DISPONIBLES: " + "\n" + mostrarNoDisponibles);
    }
    if (mostrarDisponibles.length > 2 && mostrarNoDisponibles.length == 2) {
        alert("DISPONIBLES: " + "\n" + mostrarDisponibles);
    }
    if (mostrarDisponibles.length == 2 && mostrarNoDisponibles.length > 2) {
        alert("NO DISPONIBLES: " + "\n" + mostrarNoDisponibles);
    }
    if (mostrarDisponibles.length == 2 && mostrarNoDisponibles.length == 2) {
        alert("No hay productos que coincidan con el término: " + `"${buscado}"`)
        procesoDeCompra();

    }

    return mostrarDisponibles;
}


let elegirProducto = (x) => {
    let productoFinalLista = JSON.parse(x);
    productoFinalLista.sort((a, b) => {
        let precioA = parseFloat(a.precio.replace(`$`, ``));
        let precioB = parseFloat(b.precio.replace(`$`, ``));

        return precioA - precioB;
    });

    let mostrarUser = [];
    let seguirComprando = true;
    productoFinalLista.forEach((item) => {
        mostrarUser.push(item.producto + " - " + item.precio);
    })

    let lista = JSON.stringify(mostrarUser);
    let carritoFinal = [];


    do {
        let carrito = prompt("Elegí un producto de los disponibles: (están ordenados por precio, del más barato al más caro): " + "\n" + lista);

        let producto = productoFinalLista.filter(item => item.producto === carrito)

        if ( producto.length > 0) {
            let productoMensaje = JSON.stringify(producto);
    
            let respuesta = confirm("Querés agregar este producto a la lista: " + productoMensaje);
    
            if (respuesta == true) {
    
                carritoFinal.push({
                    producto: producto[0].producto,
                    precio: producto[0].precio
                })
    
            }

            seguirComprando = confirm("Querés seguir agregando productos?");

        } else {
            alert(`El producto "${carrito}" no coincide con ninguno de la lista`);
        }
        


    } while (seguirComprando == true);


    return carritoFinal;
}

let precioFinal = (x) => {
    let listaProductos = "";
    let precioTotal = 0;

    x.forEach((item) => {
        listaProductos += item.producto + ", "
        let precioNum = parseFloat(item.precio.replace("$", ""));
        precioTotal += precioNum;
    })

    alert("PRODUCTOS: " + listaProductos + "\n" + "TOTAL: $" + Math.floor(precioTotal));
}

let procesoDeCompra = () => {
    let lista = mostrarDisponibles();
    let carritoDeCompras = elegirProducto(lista); 
    precioFinal(carritoDeCompras);   
}

procesoDeCompra();