
//Guardar y recuperar favoritos

//Manejo de favoritos con LocalStorage, clave de LOCALSTORAGE

const FAVORITES_KEY = "explorador_viajes_favoritos";

//Obtener favoritos

export function obtenerFavoritos(){

    const favoritosGuardados = localStorage.getItem( 
        
        FAVORITES_KEY

    );

    //Si no tenemos nada guardado favoritosGuardados será nulo
    if (!favoritosGuardados) {
            return [];
    }

    try {

        return JSON.parse(
            favoritosGuardados
        );

    } catch (error) {

        console.error(
            "Error al leer favoritos:",
            error
        );

        return [];

    }
}

//Guardar favoritos
function guardarFavoritos(favoritos) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favoritos
        )
    );

}

//Verificar favorito
export function esFavorito(codigo){

    const favoritos = obtenerFavoritos();

    return favoritos.some((pais) => pais.codes?.alpha_3 === codigo);
}

//Agregar favorito
export function agregarFavorito(pais){

    const favoritos = obtenerFavoritos();
    
    const codigo = pais.codes?.alpha_3;

    if (!codigo) {
        return false;
    }

    const yaExiste = 
    favoritos.some((
        favorito) => favorito.codes?.alpha_3 === codigo
    );

    if (yaExiste) {
        return false;
    }

    favoritos.push(pais);

    guardarFavoritos(favoritos);

    return true;

}

//Eliminar favorito
export function eliminarFavorito(codigo){

    const favoritos = obtenerFavoritos();

    const favoritosActualizados = 
    favoritos.filter(
        (pais) =>
            pais.codes?.alpha_3 !== codigo
    );

    guardarFavoritos(favoritosActualizados);

    return favoritosActualizados;
}
