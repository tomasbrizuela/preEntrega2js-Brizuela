let buscarProductos = () => {
    let productoElegidos = prompt("Por favor, ingrese el nombre del producto o una parte del nombre del producto");

    if(productoElegidos == ""){
        buscarProductos();
    } else {
        let productoElegido = productoElegidos.toLocaleLowerCase();
        let productosDisponibles = productos.filter(item => item.nombre.toLowerCase().includes(productoElegido))
        let respuesta = [];
        respuesta.push({
            respuesta: productosDisponibles,
        })
        respuesta.push({
            respuesta: productoElegido
        })
        return respuesta;
    }
    
}

let mostrarDisponibles = () => {
    let encontradosArray = buscarProductos();
    let encontrados = encontradosArray[0].respuesta;
    let buscado = encontradosArray[1].respuesta;
    let disponibles = [];
    let noDisponbiles = [];

    encontrados.forEach((item) => {
        if(item.stock > 0){
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

    if(mostrarDisponibles.length > 2 && mostrarNoDisponibles.length > 2){
        alert("DISPONIBLES: "+ "\n" + mostrarDisponibles + "\n" + "\n" + "NO DISPONIBLES: " + "\n" + mostrarNoDisponibles);
    } if (mostrarDisponibles.length > 2 && mostrarNoDisponibles.length == 2){
        alert("DISPONIBLES: "+ "\n" + mostrarDisponibles);
    } if (mostrarDisponibles.length == 2 && mostrarNoDisponibles.length > 2){
        alert("NO DISPONIBLES: "+ "\n" + mostrarNoDisponibles);
    } if (mostrarDisponibles.length == 2 && mostrarNoDisponibles.length == 2) {
        alert("No hay productos que coincidan con el término: " + `"${buscado}"`)
        buscarProductos();
    }

    return mostrarDisponibles;
}

let elegirProducto = (x) => {
    let productoFinalLista = JSON.parse(x);
    console.log(productoFinalLista);
    let mostrarUser = [];

    productoFinalLista.forEach((item) => {
        mostrarUser.push(item.producto + " - " + item.precio);
    })

    let lista = JSON.stringify(mostrarUser);

    prompt("Elegí un producto de los disponibles: " + lista);
}


let procesoDeCompra = () => {
    let lista = mostrarDisponibles();
    elegirProducto(lista);
    // price();
}

procesoDeCompra();


