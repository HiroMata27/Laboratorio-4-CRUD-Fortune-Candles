
# Fortune Candles - Laboratorio IV CRUD
Jonathan Estiben Fonseca Cardenas
## Descripción del proyecto

Fortune Candles es una aplicación web desarrollada con React
para administrar el inventario de una tienda de velas artesanales.

El sistema permite consultar, registrar, actualizar y eliminar
productos mediante operaciones CRUD, utilizando una API REST
simulada con JSON Server.

La interfaz fue diseñada con Bootstrap y estilos CSS
personalizados en tonos crema, café y dorado.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap
- JSON Server
- GitHub Codespaces

## Funcionalidades

### CREATE - Registrar productos
Permite agregar productos indicando nombre, categoría,
precio y cantidad disponible.

### READ - Consultar productos
Muestra los productos registrados en una tabla con
su información y disponibilidad.

### UPDATE - Actualizar productos
Permite modificar los datos de los productos existentes.

### DELETE - Eliminar productos
Permite eliminar productos mediante una ventana
de confirmación.

## Estructura del proyecto

- src/Negocio.jsx: componente principal del CRUD.
- src/App.jsx: componente principal de React.
- src/main.jsx: punto de entrada de la aplicación.
- src/helpers/helpFetch.js: peticiones HTTP a la API.
- src/App.css: estilos personalizados.
- src/index.css: estilos generales.
- db.json: almacenamiento de productos.
- vite.config.js: configuración de Vite y proxy.

## React Hooks

Se utiliza useState para administrar los productos,
el formulario y los estados de la interfaz.

Se utiliza useEffect para cargar los productos
cuando se inicia el componente.

## Ejecución del proyecto

1. Instalar las dependencias:

   npm install

2. Iniciar JSON Server:

   npx json-server db.json --port 3000

3. En otra terminal, iniciar React:

   npm run dev

4. Abrir la aplicación en el puerto 5173.

## Pruebas realizadas

Se realizaron pruebas de las cuatro operaciones CRUD:

- Registro de Vela Conejo.
- Consulta del inventario.
- Actualización de la categoría de Vela Gato.
- Eliminación de Vela Conejo.

Las pruebas mostraron el funcionamiento de las
operaciones CRUD en la interfaz web.

## Repositorio

https://github.com/HiroMata27/Laboratorio-4-CRUD-Fortune-Candles

## Asignatura

Programación Web

Laboratorio IV - CRUD con React

Universidad Libre
