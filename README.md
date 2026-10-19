# Explorador de Viajes y Lugares Turísticos

Proyecto integrador desarrollado con JavaScript puro, APIs y librerías para explorar información de países y destinos alrededor del mundo.

## Tecnologías

- HTML5
- JavaScript ES6+
- Tailwind CSS
- REST Countries API
- LocalStorage
- Leaflet
- SweetAlert2
- Git
- GitHub

## Características

El proyecto permitirá:

- Consultar destinos desde una API REST.
- Mostrar destinos dinámicamente.
- Buscar destinos.
- Filtrar destinos por continente.
- Ordenar resultados.
- Consultar información detallada.
- Visualizar la ubicación del destino en un mapa.
- Guardar destinos favoritos.
- Persistir favoritos mediante LocalStorage.

# countries.js
- fetch()
- async / await
- try / catch
- response.ok
- response.json()
- import / export


# ui.js
- map()
- template literals
- innerHTML
- optional chaining
- data-*
- DOM dinámico
- módulos JavaScript
- separación de responsabilidades

# filters.js
- filter()
- sort()
- includes()
- toLowerCase()
- localeCompare()
- spread operator [...]
- eventos input
- eventos change
- estado de la aplicación
- funciones reutilizables

# favoritesServices.js
- LocalStorage
- JSON.stringify()
- JSON.parse()
- find()
- some()
- filter()
- estado de la aplicación
- delegación de eventos
- renderizado condicional
- SweetAlert2

## Arquitectura

La aplicación utiliza una sola página HTML y divide progresivamente la lógica JavaScript en módulos según su responsabilidad.

Actualmente la aplicación separa:

- Comunicación con APIs.
- Coordinación principal.
- Renderizado de la interfaz.

## Versión actual

v0.6.0 - Renderizado dinámico de destinos obtenidos desde REST Countries.
