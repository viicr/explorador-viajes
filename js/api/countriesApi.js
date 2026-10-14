//Comunicación con la API de países

const API_URL = "https://juancognitus.github.io/explorador-viajes-api/paises.json";

//Export permite exportar 
export async function obtenerPaises(){
    try{
        //Variable que espera la petición
        const response = await fetch(API_URL);
        //Validación de la respuesta ok
        if(!response.ok){
            throw new Error(`Error al obtener los países: ${response.status} ${response.statusText}`);
        }
        //Variable que espera la respuesta en formato JSON
        const result = await response.json();
        //Variable que almacena los paises obtenidos
        const paises = result;
        //Impresión de los paises en la consola
        console.log(paises);
        //Retorno de los paises obtenidos
        return paises;
        //Retorno de los paises obtenidos
    }catch(error){
        console.log("Error al obtener los paises:", error);
        return [];
    }
}
//Llamada a la función obtenerPaises para obtener los países
obtenerPaises();