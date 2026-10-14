console.log('Conexion exitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';

// Estado de la aplicación
let paises = [];

//Referencias del DOM
const destinarionContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');

//inicialización de la aplicación 
async function init(){
    console.log("Explorador de viajes iniciado");

    resultCount.textContent = '1 destino';

    //Mostrar estado de carga
    initialMessage.innerHTML = /*html*/`
    <div class="text-5xl mb-4"> 
    🌎
    </div>
    <h3 class="
            text-xl
            font-semibold
            text-slate-800
            mb-2
        ">

    </h3>
    <p>
    Estamos consultando información alrededor del mundo...</p>
    `;

    //Obtener los países
    paises = await obtenerPaises();
    //Impresión de los paises obtenidos en la consola para verificar que se han cargado correctamente
    console.log("Paises obtenidos:", paises);

    //actualizar el contador de resultados para mostrar la cantidad de destinos obtenidos
    resultCount.textContent = `${paises.length} destinos`;

    //Mostrar resultados de la carga
    if(paises.length > 0) {
        initialMessage.innerHTML = /*html*/`
        <div class="text-5xl mb-4">
            ✅
        </div>
        <h3>
            Destinos cargados
        </h3>
        <p>
            Se obtuvieron ${paises.length}
            destinos correctamente.
        </p>
    `;
} else {

    initialMessage.innerHTML = /*html*/`
        <div class="text-5xl mb-4">
            ⚠️
        </div>

        <h3
            class="
                text-xl
                font-semibold
                text-slate-800
                mb-2
            "
        >
            No fue posible cargar los destinos
        </h3>

        <p class="text-slate-500">
            Verifica tu conexión e intenta
            nuevamente.
        </p>
    `;

}

}

//Iniciar la aplicación
init();