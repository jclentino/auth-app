# Auth-app con Express y Passport-jwt  

Mini aplicacion en la que puedes registrar usuarios y generar tokens a partir de este, con manejo de rutas protegidas y encriptacion de contraseñas 

## Requisitos

- [Node.js](https://nodejs.org/)

## Configuración

1. Clona este repositorio:

    ```
    git clone https://github.com/jclentino/auth-app.git
    ```

2. Entra al proyecto 
    
    ```
    cd auth-app
    ```

3. Instala las dependencias 

    ```
    npm install
    ```

4. Crea un archivo ```.env``` y asigna los valores de uri de mongo y una clave secreta basandote en el  ```.env.example ```


5. Levanta la aplicacion 

    ```
    npm run dev 
    ```

## Estructura del Proyecto
  
- **`./tsconfig.json`**: Archivo de configuracion de Typescript 
- **`./package.json`**: Package con toda las caracteristicas del proyecto 
- **`./src/config`**: Configuraciones y variables globales  
- **`./src/middlewares`**: Middlewares de autenticacion  
- **`./src/models`**: Modelos de las entidades   
- **`./src/controllers`**: Controladores de las entidades    
- **`./src/routes`**: Routes de cada una de las entidades     
- **`./src/app.ts`**: Configuracion del servidor y su creacion      
- **`./src/database.ts`**: Conexion con la base de datos       
- **`./src/index.ts`**: Index principal donde arranca la aplicacion.


## Uso con Postman

Puedes probar las funcionalidades de la aplicación utilizando Postman o cualquier otra herramienta de prueba de API. Aquí hay ejemplos de las solicitudes que puedes realizar:

### 1. Registro de Usuario

**Endpoint:** `POST /signup`

**Cuerpo de la Solicitud:**
    
    {
        "cedula": 114300,
        "nombre": "juan",
        "telefono": 305,
        "email": "jc@gmail.com",
        "clave": "password"
    }

### 2. Inicio de Sesión

**Endpoint:** `POST /signin`

**Cuerpo de la Solicitud:**
    
    {
        "email": "jc@gmail.com",
        "clave": "password"
    }

El servidor responderá con un token de acceso JWT que puedes utilizar en solicitudes futuras.

### 3. Ruta Protegidas

Asegúrate de incluir el token de acceso en la cabecera de la solicitud utilizando el formato: \`Authorization: Bearer <tu-token>\`.

Ten en cuenta que para las rutas protegidas, deberás incluir el token de acceso en la cabecera de la solicitud para autenticarte correctamente.

**Endpoint:** `POST /docentes/add`

**Cuerpo de la Solicitud:**
    
    {
        "nombre": "Caceres",
        "apellidos": "Martinez Acevedo",
        "email": "ceceres@gmail.com",
        "telefono": 5555,
        "usuario_id": 114300
    }

**Endpoint:** `GET /docentes`

**Endpoint:** `PATCH /docentes/edit/id`

**Cuerpo de la Solicitud:**
    
    {
        "apellidos": "Martinez Narvaez",
    }

**Endpoint:** `GET /docentes/id`

**Endpoint:** `DELETE /docentes/delete`

**Cuerpo de la Solicitud:**
    
    {
        "id": "numeroID"
    }


