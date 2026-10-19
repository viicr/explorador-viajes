//mapUI se encargará exclusivamente de Leaflet.

//Integración de Leaflet

//Instancia del mapa
let mapaActual = null;

//Se abrirá mapa al consultar país

//Destruir mapa actual
export function destruirMapa(){
    if(mapaActual){
        mapaActual.remove();

        mapaActual = null;
    }
}

//Creación del mapa, recibirá latirud, longitud y nombre del país
export function crearMapa(latitud, longitud, nombre){
    //Validaición de las coordenadas, la API proporciona coordenadas, es recomendable validar los datos
    if (
        typeof latitud !== "number" ||
        typeof longitud !== "number"
    ){
        console.warn(
            "Cordenadas no disponibles"
        );
        return;
    }
    //eliminar mapa anterior para no usar el mismo elemento
    destruirMapa();

    mapaActual = L.map(
        "destination-map"
    ).setView(
        [
            latitud,
            longitud
        ],
        4
    );

    //Agregar las imágenes del mapa
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            "&copy; OpenStreetMap contributors"
        }
    ).addTo(mapaActual);

    //Agregar marcador de las coordenadas
    L.marker(
        [
            latitud,
            longitud
        ]
    )
        .addTo(mapaActual)
        .bindPopup(
            `<strong>${nombre}</strong>`
        )
        .openPopup();

}