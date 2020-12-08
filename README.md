# WAREHOUSE

Ésta aplicación corresponde al cuarto proyecto de mi cursada en Acámica, en el cual tuve que construir tanto el frontend como el backend de la página de una empresa de marketing utilizada para administrar sus contactos.

## Instalación

A continuación se brindarán una serie de pasos para poder instalar las dependencias necesarias e iniciar tanto el servidor como la base de datos para comenzar a manipular la página.

### IMPORTANTE:

> Se debe tener instalado Mongo DB (https://www.mongodb.com/es) y Postman (https://www.postman.com/)

1. En Visual Studio Code (VSC) posicionarse dentro de la siguiente ruta: proyecto_warehouse/backend/src

2. Abrir la consola de VSC (ctrl + ñ) y escribir:

   ```bash
   npm install
   ```

   De esta forma se instalan todas las dependencias del archivo package.json necesarias.

3. Dentro de la carpeta "src", en VSC, abrir el archivo ".env.example". Eligir un password para la propiedad TKS y cambiar el nombre del archivo a ".env".

4. Ir a la carpeta donde se encuentra instalado Mongo DB, generalmente C:/Program Files/MongoDB/Server/4.4/bin, y abrir la consola de Windows dentro de ella. Luego escribir:
   ```bash
   mongod
   ```
5. Dentro de la misma carpeta, abrir otra consola de Windows dentro de ella y escribir:
   ```bash
   mongo
   ```
   ```bash
   use warehouse
   ```
   ```bash
   db.createCollection("usuarios")
   ```
   ```bash
   db.createCollection("regiones")
   ```
   ```bash
   db.createCollection("companias")
   ```
   ```bash
   db.createCollection("contactos")
   ```
6. En la consola de VSC, verificar que se esté DENTRO de la carpeta "src" y escribir lo siguiente para inicializar la aplicación:
   ```bash
   node app
   ```
7. Si todo sale bien debe aparecer en la consola del VSC lo siguiente:

   ```bash
   SERVER UP!!!
   Conectado a la base de datos!!
   ```

8. Ahora debemos crear un usuario que sea administrador, para que pueda crear a otros usuarios y a las demás colecciones. Para ello, abrimos Postman y le pegamos a la ruta "http://localhost:3000/usuarios/registro" con un "POST" y el siguiente objeto:

```bash
   {
	"nombre": "Tu nombre",
	"apellido": "Tu apellido",
	"email": "email@email.com",
	"password": "P3p¡to",
	"perfil": "Administrador"
   }
```

### IMPORTANTE:

> Las contraseñas requieren 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial (!, @, #, etc).

9. Si el usuario se insertó correctamente se nos devolverá el id del usuario.

10. Dentro de src/middlewares/globales.js, debemos comentar la siguiente línea de código:

![](/preview2.jpg)

11. Por último, dentro de src/modules/usuario/indexUsuarios.js debemos DESCOMENTAR en la línea 14 lo siguiente:

![](/preview3.jpg)
