console.log('Conexion exitosa');

//Imports 
import { obtenerPaises } from './api/countriesApi.js';
import { 
    mostrarCargando, 
    mostrarError,
    mostrarFavoritosVacios,
    renderPaises, 
    actualizarContador,
    mostrarDetalle,
    cerrarDetalle
} from './ui/ui.js';

import { procesarPaises } from './utils/filters.js';

import {
    crearMapa,
    destruirMapa
} from "./ui/mapUI.js";

import {
    obtenerFavoritos,
    agregarFavorito,
    eliminarFavorito,
    esFavorito
} from "./services/favoritesService.js";

// Estado de la aplicación
let paises = [];

let vistaActual = "explorar";

//Referencias del DOM
const destinationContainer = document.querySelector('#destinations-container');
const resultCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');
const searchInput = document.querySelector('#search-input');
const continentFilter = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');
const detailModal = document.querySelector("#detail-modal");
const detailModalContent = document.querySelector("#detail-modal-content");
//Estos elementos cambiaran la interfaz
const btnExplorar = document.querySelector("#btn-explorar");
const btnFavoritos = document.querySelector("#btn-favoritos");
const sectionTitle = document.querySelector("#section-title");
const searchForm = document.querySelector("#search-form");


//Buscar país por código
function obtenerPaisPorCodigo(
    codigo
) {

    return paises.find(
        (pais) =>
            pais.codes?.alpha_3 === codigo
    );

}

//Actualizar navegación
function actualizarNavegacion(){

        const clasesActivas = [
        "bg-blue-600",
        "text-white"
    ];

    const clasesInactivas = [
        "bg-white",
        "text-slate-700",
        "border",
        "border-slate-300"
    ];

    if (vistaActual === "explorar") {

    btnExplorar.className = `
        px-4
        py-2
        bg-blue-600
        text-white
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-blue-700
        transition
    `;

    btnFavoritos.className = `
        px-4
        py-2
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-lg
        font-medium
        cursor-pointer
        hover:bg-slate-100
        transition
    `;

    } else {

        btnExplorar.className = `
            px-4
            py-2
            bg-white
            text-slate-700
            border
            border-slate-300
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-slate-100
            transition
        `;

        btnFavoritos.className = `
            px-4
            py-2
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            cursor-pointer
            hover:bg-blue-700
            transition
        `;

    }

}

function aplicarFiltros() {

    if (
        vistaActual !== "explorar"
    ) {
        return;
    }

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

//Mostrar vista explorar
function mostrarExplorar(){
    
    vistaActual = "explorar";

    sectionTitle.textContent = "Destinos";

    searchForm.classList.remove(
        "hidden"
    );

    actualizarNavegacion();

    aplicarFiltros();
}

//Mostrar vista de favoritos
function mostrarFavoritos(){

    vistaActual = "favoritos";

    sectionTitle.textContent = "Mis favoritos";

    searchForm.classList.add(
        "hidden"
    );

    actualizarNavegacion ();

    const favoritos = obtenerFavoritos();

    renderPaises(
        favoritos,
        destinationContainer,
        "favoritos"
    );

    actualizarContador(
        favoritos.length,
        resultCount
    );
}


//Agregar destino a favoritos
function manejarAgregarFavorito(codigo){

    const pais = obtenerPaisPorCodigo(codigo);

    if (!pais) {
        return;
    }

    if(esFavorito(codigo)){
        Swal.fire({
            icon: "info",
            title: "Ya está en favoritos",
            text: "Este destino ya había sido guardado."
        });

        return;
    }

    const agregado = agregarFavorito(pais);

    if (agregado) {

        Swal.fire({
            icon: "success",
            title: "Destino guardado",
            text:
                `${pais.names?.common ?? "El destino"} fue agregado a favoritos.`,
            timer: 1800,
            showConfirmButton: false
        });

    }

}


//Elimminar destino de favoritos
async function manejarEliminarFavorito(codigo) {

    const pais = obtenerPaisPorCodigo(codigo);

    if (!pais){
        return;
    }

    const resultado =
    await Swal.fire({
        icon: "warning",
        title: "Eliminar favorito",
        text:
            `¿Deseas eliminar ${pais.names?.common ?? "este destino"} de tus favoritos?`,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc2626"
    });

    if(!resultado.isConfirmed){
        return;
    }
    eliminarFavorito(codigo);

    mostrarFavoritos();

    Swal.fire({
    icon: "success",
    title: "Favorito eliminado",
    timer: 1500,
    showConfirmButton: false
    });
}

//Abrir detalle del destino
function abrirDetalle(
    codigo
) {
    const pais = obtenerPaisPorCodigo(codigo);
    if (!pais) {

    console.warn(
        "País no encontrado"
    );

    return;

    }
    const datosMapa =
    mostrarDetalle(
        pais,
        detailModal,
        detailModalContent
    );

    //Crear mapa del destino
    setTimeout(
    () => {
            crearMapa(
                datosMapa.latitud,
                datosMapa.longitud,
                datosMapa.nombre
            );

        },
        0
    );
}

function cerrarModalDetalle() {

    destruirMapa();

    cerrarDetalle(
        detailModal,
        detailModalContent
    );

}


//Registrar eventos
function registrarEventos(){

    searchForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();
        }
    );

    //creo mi primer evento
    searchInput.addEventListener("input", aplicarFiltros);

    //Evento del continente
    continentFilter.addEventListener("change", aplicarFiltros);

    //Aqui cambia de az y za
    sortFilter.addEventListener("change", aplicarFiltros);

    /* =====================================
       NAVEGACIÓN - EXPLORAR
    ===================================== */

    btnExplorar.addEventListener(
        "click",
        mostrarExplorar
    );

    /* =====================================
       NAVEGACIÓN - FAVORITOS
    ===================================== */

    btnFavoritos.addEventListener(
        "click",
        mostrarFavoritos
    );

    //Acciones de la tarjetas
    destinationContainer.addEventListener(
        "click",
        (event) => {

            const boton =
                event.target.closest(
                    "[data-action]"
                );

            if (!boton) {
                return;
            }

            const accion =
                boton.dataset.action;

            const codigo =
                boton.dataset.countryCode;

            if (accion === "detail") {
                abrirDetalle(
                    codigo
                );
            }

            if (accion === "favorite") {
                manejarAgregarFavorito(
                    codigo
                );
            }

            if (accion === "remove-favorite") {
                manejarEliminarFavorito(
                    codigo
                );
            }

        }
    );

    //Cerrar modal
    detailModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target.id ===
                "btn-close-detail"
            ) {

                cerrarModalDetalle();

            }

            if (event.target === detailModal) {
                cerrarModalDetalle();
            }

        }
    );

    //Cerrar con botón Esc
    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                !detailModal.classList.contains(
                    "hidden"
                )
            ) {

                cerrarModalDetalle();

            }

        }
    );

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

aplicarFiltros();

actualizarNavegacion();
