## Gestión de Productos con Subida de Imágenes

#### Este proyecto es una API para gestionar productos que permite subir imágenes a un servidor local o a Cloudinary

#### Utiliza Express.js como servidor backend y Multer para manejar la subida de archivos. Las imágenes se almacenan localmente o en Cloudinary, y los detalles de los productos se pueden agregar mediante un POST request.

## Decisiones Tomadas

### 1. Manejo de la subida de imágenes

- Se decidió usar Multer para manejar la subida de archivos. Multer nos permite gestionar la recepción de archivos, validarlos (tipo, tamaño) y almacenarlos en diferentes destinos (local o Cloudinary).

- Las imágenes se pueden almacenar localmente en la carpeta uploads/ o en Cloudinary, dependiendo de la configuración.

### 2. Formato de imágenes permitidas

- Se permiten los formatos jpeg, jpg, png, gif y webp. La validación de estos formatos se hace en el middleware de Multer para asegurar que solo se suban imágenes de estos tipos.

### 3. Configuración de Cloudinary

- Se añadió Cloudinary como opción de almacenamiento en la nube para manejar la subida de archivos de forma escalable.

- Las imágenes subidas a Cloudinary se guardan en una carpeta llamada uploads, y el archivo mantiene su formato original.

## Configuraciones Aplicadas

### 1. Multer para Almacenamiento Local

- Se utiliza multer.diskStorage para definir la ubicación de los archivos subidos y asignar un nombre único basado en UUID.

### 2. Multer para Cloudinary

- Usamos CloudinaryStorage de multer-storage-cloudinary para manejar la subida de archivos a Cloudinary, almacenando cada archivo con un UUID único en la carpeta uploads.

### 3. Protección de Rutas

- Se implementó un middleware de autenticación con JWT para proteger las rutas que permiten la creación de productos, garantizando que solo usuarios autenticados puedan acceder a estas funcionalidades.

## Requisitos Previos

#### Antes de ejecutar el proyecto, asegúrate de tener:

- Una cuenta en Cloudinary

- Node.js

## Instalación

#### 1. Clona el repositorio
    git clone 
#### 2. Instala las dependencias
    npm install
#### 3. Configura las variables
    cloud_name: 'your_cloud_name'
    api_key: 'your_api_key'
    api_secret: 'your_api_secret'
    token: 'your_secret'
#### 4. Ejecuta el servidor
    npm run dev

## Funcionalidades

#### 1. Agregar Producto con Imagen
##### Endpoint: POST /products para local
##### Endpoint: POST /products?storage=cloudinary para cloudinary

##### Puedes agregar un producto proporcionando name, description, price y una imagen. El archivo de imagen debe ser enviado en un campo llamado image.

- Si configuras Multer para almacenar en Cloudinary, la imagen se subirá a Cloudinary y el endpoint devolverá la URL de la imagen subida.

- Si se utiliza almacenamiento local, la imagen se guardará en la carpeta uploads/.

#### Ejemplo de Solicitud con Postman
##### Método: POST
##### URL: http://localhost:3000/products
##### URL: http://localhost:3000/products?storage=cloudinary
##### Headers:
- Content-Type: multipart/form-data
##### Body:
- name: Nombre del producto
- description: Descripción del producto
- price: Precio del producto
- image: [Archivo de imagen]

## 2. Autenticación con JWT

#### Las rutas para agregar productos están protegidas por un token JWT. Debes incluir el token en la cabecera Authorization de las solicitudes.

## Pruebas de Subida de Archivos

##### Subida Local: Si no has configurado Cloudinary, las imágenes se subirán al directorio uploads/.

##### Subida a Cloudinary: Si has configurado Cloudinary, las imágenes se almacenarán en tu cuenta de Cloudinary, y se devolverá una URL que apunta a la imagen subida.