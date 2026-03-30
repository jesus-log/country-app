# Country App

Aplicacion en Angular para buscar paises por capital, nombre y region, ver el detalle del pais y ubicarlo en un mapa con Mapbox.

## Tecnologias

- Angular 21
- Tailwind CSS 4
- DaisyUI 5
- Mapbox GL JS
- dotenv

## Funcionalidades

- Busqueda de paises por capital.
- Busqueda de paises por nombre.
- Filtro de paises por region.
- Vista de detalle del pais.
- Vista en mapa con marcador.
- Menu responsive (desktop + menu desplegable en movil).
- Listado responsive: tabla en desktop y cards en movil.

## Requisitos

- Node.js 20 o superior recomendado.
- npm (el proyecto usa npm 11 en `packageManager`).

## Instalacion

```bash
npm install
```

## Configuracion de Mapbox

El proyecto genera los archivos de entorno desde la variable `MAPBOX_KEY`.

1. Crea un archivo `.env` en la raiz del proyecto.
2. Agrega tu token:

```env
MAPBOX_KEY=tu_token_de_mapbox
```

3. Genera los entornos:

```bash
npm run set-envs
```

Este script crea/actualiza:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

## Ejecutar en desarrollo

```bash
npm start
```

o

```bash
ng serve
```

Abrir en navegador:

- http://localhost:4200/

## Scripts disponibles

- `npm start`: levanta servidor de desarrollo.
- `npm run build`: build de produccion.
- `npm run watch`: build en modo watch para desarrollo.
- `npm test`: ejecuta tests.
- `npm run set-envs`: genera archivos de entorno desde `.env`.

## Estructura principal

- `src/app/country/`: modulo principal de paises.
- `src/app/country/pages/`: paginas (busquedas, detalle, mapa).
- `src/app/country/components/`: componentes reutilizables (menu, lista, buscador).
- `src/app/country/services/`: consumo de API.
- `src/app/country/mappers/`: transformacion de respuesta REST a modelo de app.
- `src/environments/`: configuraciones de entorno generadas.

## Rutas principales

- `/country/by-capital`
- `/country/by-country`
- `/country/by-region`
- `/country/by/:query`
- `/country/map/:lat/:lng`

## Notas

- Si cambias `MAPBOX_KEY`, vuelve a ejecutar `npm run set-envs`.
- Si el mapa se ve desalineado al abrir, recarga la vista y verifica que la URL tenga coordenadas validas.
