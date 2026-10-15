console.log('Conexion exitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';
import { 
    mostrarCargando, 
    mostrarError, 
    renderPaises, 
    actualizarContador
} from './ui/ui.js';

import { procesarPaises } from './utils/filters.js';

// Estado de la aplicación
let paises = [];

//Referencias del DOM
const destinationContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');
const searchInput = document.querySelector('#search-input');
const continentFilter = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');

function aplicarFiltros() {
    // OBTENER VALORES
    
    // Valor del input
    const texto = searchInput.value;

    // Valor del continente
    const continente = continentFilter.value;

    // Valor del criterio de orden
    const criterioOrden = sortFilter.value;

    // Procesar los datos
    const resultados = procesarPaises(paises, texto, continente, criterioOrden)

    // RENDERIZAR. Mostrar el código con HTML
    renderPaises(resultados, destinationContainer);

    // ACTUALIZAR CONTADOR
    actualizarContador(resultados.length, resultCount)
}

//Registrar eventos
function registrarEventos(){
    //creo mi primer evento
    searchInput.addEventListener("input", aplicarFiltros);

    //Evento del continente
    continentFilter.addEventListener("change", aplicarFiltros);

    //Aqui cambia de az y za
    sortFilter.addEventListener("change", aplicarFiltros);
}


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

    aplicarFiltros();

    //registrar eventos
    registrarEventos();
}

//Iniciar la aplicación
init();
