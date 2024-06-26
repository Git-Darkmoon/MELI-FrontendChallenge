# MELI Frontend Challenge

[![image](https://github.com/Git-Darkmoon/MELI-FrontendChallenge/assets/80002392/f9d98306-f9e7-4863-8840-ab23f54839a4)](https://meli-tech-interview.vercel.app/)


## Descripción del Challenge

La aplicación consta de tres componentes principales: la caja de búsqueda, la visualización de resultados, y la descripción del detalle del producto. En la vista de caja de búsqueda, debería poder ingresar el producto a buscar y al enviar el formulario navegar a la vista de Resultados de búsqueda, visualizando solo 4 productos. Luego, al hacer clic sobre uno de ellos, debería navegar a la vista de Detalle de Producto. Dado un id de producto, debería poder ingresar directamente a la vista de detalle de producto.

## Tech Stack

El proyecto se desarrolló con las siguientes tecnologías:

[![Tech Stack for Comfy Store Redesign](https://skillicons.dev/icons?i=react,ts,sass,nodejs,express,pnpm&perline=6&theme=dark)](https://nextjs.org/)

- **React Query**: Una librería para obtener, almacenar en caché y actualizar datos asíncronos en React.
- **Axios**: Un cliente HTTP basado en promesas para el navegador y Node.js.


## Getting Started

Sigue los siguientes pasos para obtener una copia del proyecto:

> [!Important]
> Debes tener instalado:
> - Node.js (v16.x o superior)
> - pnpm ( v8.x or superior ) o npm (v6.x or later) o yarn (v1.x o superior)


### Installation

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Git-Darkmoon/MELI-FrontendChallenge
   cd MELI-FrontChallenge
   ```

## API Reference
Base url: `https://meli-challenge-api.vercel.app/`

#### Get all items of the search

```http
  GET /api/items?q=:query
```

| Parameter | Type   | Description                  | Required |
|-----------|--------|------------------------------|----------|
| q         | string | The product to search        | Yes      |

#### Get single item

```http
  GET /api/items/:productID
```
| Parameter | Type   | Description                  | Required |
|-----------|--------|------------------------------|----------|
| productID | string | Id of product to fetch       | Yes      |
