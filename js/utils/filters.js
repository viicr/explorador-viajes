//Filtros y ordenamientos
// Buscar paises por nombre

export function buscarPaises(paises, texto) {
    //Normalizar nuestro texto para que no sea sensible a mayúsculas y minúsculas
    const textoNormalizado = texto.trim().toLowerCase();

    //Validación si no hay busqueda con el texto normalizado
    if (!textoNormalizado) {
        return paises; //Si no hay texto de búsqueda, devolver todos los países, no me hagas la búsqueda
    }

    //Filtrar los países que coincidan con el texto de búsqueda
    //recorre un arreglo y conserva solamente los elementos cuya condición sea verdadera.
    return paises.filter((pais) => {
        const nombre = pais.names?.common?.toLowerCase() ?? "";
        return nombre.includes(textoNormalizado);
    });
} 

//Filtrar paises por continente
export function filtrarPorContinente(paises, continente) {
    if (continente === "all") {
        return paises; //Si el continente es "all", devolver todos los países
    }

    //Filtrado por región
    return paises.filter((pais) => {
        return pais.region === continente;
    });
}

//Ordenar paises por nombre, criterios az y za
export function ordenarPaises(paises, criterio) {
    // utilizar método spread operat or para crear una copia del arreglo de paises y no modificar el original
    const paisesOrdenados = [...paises];  

    //Ordenar a-z con local Compare
    if (criterio === "az") {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? '';
            const nombreB = b.names?.common ?? '';
            return nombreA.localeCompare(nombreB);
        })
    }
    //Ordenar z-a con local Compare
    if (criterio === "za") {
        //Aqui el retorno es el arreglo de paises ordenados de manera descendente
        return paisesOrdenados.sort((a, b) => {
            //Obtener el nombre de los paises a y b, si no tiene nombre, asignar un string vacío
            const nombreA = a.names?.common ?? '';
            const nombreB = b.names?.common ?? '';
            //Aqui el return compara el pais b con el a, y devuelve el ordenado
            return nombreB.localeCompare(nombreA);
        })
    }

    return paisesOrdenados; //Si no hay criterio de ordenamiento, devolver el arreglo original
}

// Función combinando procesamiento 

export function procesarPaises(paises, texto, continente, criterioOrden){
    let resultado = buscarPaises(paises, texto);

    resultado = filtrarPorContinente(resultado, continente);

    resultado = ordenarPaises(resultado, criterioOrden);

    return resultado;
}

