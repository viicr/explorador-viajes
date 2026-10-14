//User interface

//Funciones encargadas de actualizar el DOM

//Funcion de estado de carga
export function mostrarCargando(contenedor){

    //Mostrar estado de carga
    contenedor.innerHTML = /*html */`

        <div class="col-span-full bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
            <div class="text-5xl mb-4">
                🌎
            </div>

            <h3 class="text-xl font-semibold text-slate-800 mb-2">
                Cargando destinos
            </h3>

            <p>
                Estamos consultando información de páises alrededor del mundo...
            </p>
        </div>
    `;

}

export function mostrarError(contenedor) {

    contenedor.innerHTML = /*html*/ `
        <div
            class="
                col-span-full
                bg-red-50
                border
                border-red-200
                rounded-xl
                p-12
                text-center
            "
        >

            <div class="text-5xl mb-4">
                ⚠️
            </div>

            <h3
                class="
                    text-xl
                    font-semibold
                    text-red-700
                    mb-2
                "
            >
                No fue posible cargar los destinos
            </h3>

            <p class="text-red-600">
                Verifica tu conexión e intenta
                nuevamente.
            </p>

        </div>
    `;


}

//Actualiza el contador de resultados para mostrar la cantidad de destinos obtenidos
export function actualizarContador(total, elementoContador) {
    //Actualiza el contador 
    elementoContador.textContent = `${total} destinos`;
}
export function renderPaises(paises, contenedor){

    if(paises.length === 0){
        contenedor.innerHTML = /*html */`
        <div class="col-span-full bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">

            <div class="text-5xl mb-4">
                🔎
            </div>

            <h3
                class="text-xl font-semibold text-slate-800 mb-2">
                No encontramos destinos
            </h3>

            <p class="text-slate-500">
                Intenta cambiar los criterios
                de búsqueda.
            </p>

        </div>
    `;

    return; 
    }

    //Utilizar el map para el renderizado de los paises en el DOM
    const tarjetas = paises.map(pais => {

        //Obtener nombre
        const nombre = pais.names?.common ?? 'Nombre no disponible';

        //Obtener la region
        const region = pais.region?? 'Región no disponible';

        //Obtener ponlación 
        const poblacion = pais.population ?? 0;

        //Obtener bandera del pais
        const bandera = pais.flag?.url_png ?? '';

        //Obtener código
        const codigo = pais.codes?.alpha_3 ?? '';

        const poblacionFormateada = poblacion.toLocaleString('es-MX');

        return /*html */`
            <article class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">

            <!--Bandera-->

        <div class="h-48 bg-slate-100 overflow-hidden">

        <!--Imagen de bandera-->
            <img src="${bandera}" alt="Bandera de ${nombre}" class="w-full h-full object-cover">

        </div>

        <!--Información del destino-->

        <div class="p-5">

            <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h3 class="text-xl font-bold text-slate-900">
                        ${nombre}
                    </h3>

                    <p class="text-sm text-slate-500">
                        ${region}
                    </p>

                </div>

                <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    ${codigo}
                </span>

            </div>

            <!--Población-->

            <div class="mb-5">

                <p class="text-xs text-slate-500">
                    Población
                </p>

                <p class="text-lg font-semibold text-slate-800">
                    ${poblacionFormateada}
                </p>

            </div>


            <!--Acciones-->

            <div class="flex gap-3">

                <button
                    type="button"
                    data-action="detail"
                    data-country-code="${codigo}"
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition">
                    Ver más
                </button>


                <button
                    type="button"
                    data-action="favorite"
                    data-country-code="${codigo}"
                    aria-label="Agregar ${nombre} a favoritos"
                    class="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    ♡
                </button>

            </div>

        </div>
            </article>
        `;
    }).join('');

    contenedor.innerHTML = tarjetas;
}