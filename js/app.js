console.log('Conexion exitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';
import { 
    mostrarCargando, 
    mostrarError, 
    renderPaises, 
    actualizarContador
} from './ui/ui.js';

// Estado de la aplicación
let paises = [];

//Referencias del DOM
const destinationContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');

//inicialización de la aplicación 
async function init(){
    console.log("Explorador de viajes iniciado");

    //Mostrar resultados de la carga
    mostrarCargando(destinationContainer);

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

    //Obtener los países desde la API
    paises = await obtenerPaises();
    //Impresión de los paises obtenidos en la consola para verificar que se han cargado correctamente
    console.log("Paises obtenidos:", paises);

    if(paises.length === 0) {
        mostrarError(destinationContainer);

        actualizarContador(0, resultCount);

        return;
    }

    //Renderizar los países obtenidos en el contenedor de destinos
    renderPaises(paises, destinationContainer);

    //Actualizar el contador de resultados para mostrar la cantidad de destinos obtenidos
    actualizarContador(paises.length, resultCount);
}

//Iniciar la aplicación
init();