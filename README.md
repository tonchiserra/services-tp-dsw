# Propuesta TP DSW

## Grupo
### Integrantes
* 47064 - Serra, Gonzalo
* 48937 - Bitti, Guido

### Repositorios
* [Fullstack app](https://github.com/tonchiserra/services-tp-dsw)

## Tema
### Descripción
Red social de contratación de servicios.

### Modelo
![image](https://github.com/tonchiserra/services-tp-dsw/assets/103657441/612afb97-b15d-44c5-8ff4-aaf08102d6ca)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Dirección|
|CRUD dependiente|1. CRUD Servicio {depende de} CRUD Tipo de Servicio|
|Listado<br>+<br>detalle| 1. Listado de posts filtrado por contenido del post, muestra nombre del usuario y contenido reducido del post => detalle muestra contenido completo del post con todos los datos.|
|CUU/Epic|1. Contratar un servicio|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Tipo de Servicio<br>3. CRUD Dirección<br>4. CRUD Post<br>5. CRUD Servicio|
|CUU/Epic|1. Contratar un servicio<br>2. Prestar un servicio|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1. Listado de seguidores de un usuario|
|CUU/Epic|-|
|Otros|1. Notificaciones<br> 2. Like/repost en posts|

# Instruciones para la instalacion
## Descarga del proyecto e instalacion de dependencias.
Abrir una terminal y ejecuta el siguiente comando para clonar el repositorio:
```bash
git clone https://github.com/tonchiserra/services-tp-dsw.git
```

Abre una terminal en la carpeta services-tp-dsw/backend y ejecuta el siguiente comando:
```bash
npm install
```

Abre una terminal en la carpeta services-tp-dsw/frontend y ejecuta el siguiente comando:
```bash
npm install
```

## Inicio del servidor
En la terminal de la carpeta services-tp-dsw/frontend, ejecuta el siguiente comando para iniciar el servidor del frontend:
```bash
ng serve
```
Esto iniciará la aplicación Angular y podrás acceder a ella en tu navegador en http://localhost:4200/.

##Inicio del servidor
En la terminal de la carpeta services-tp-dsw/backend, ejecuta el siguiente comando para iniciar el servidor del backend:
```bash
npm run start:dev
```
Esto iniciará el servidor del backend en http://localhost:3000/.

#Link a los PR.
En el siguiente link se puede acceder a los link de los distintos PR.
https://github.com/tonchiserra/services-tp-dsw/pulls

# Doumentacion

## Resumen de Avance y Discusión

## Fecha: 16/06/2023

### Temas Discutidos

1. Progreso del Documento:
   - Creacion del repositorio.
   - Definicion del proyecto.
   - Definicion de los requerimientos a trabajar.
  
2. Próximos Pasos:
   - Creacion de las ramas personales.

## Fecha: 10/07/2023

### Temas Discutidos

1. Progreso del Documento:
   - Instalacion de Angular en el proyecto.
   - Modificacion de la propuesta.
   - Creacion de carpetas Frontend y Backend.
  
2. Próximos Pasos:
   - Empezar con el armado del frontend.

## Fecha: 15/08/2023

### Temas Discutidos

1. Progreso del Documento:
   - Actualizacion de la propuesta
   - Creacion de un boceto para las paginas version mobile de Home, Perfil y Post.
   - Armado del menu de opiones version mobile y Web.
  
2. Próximos Pasos:
   - Seguir con el frontend 
  
3. Problemas:
   - Un compañero se da de baja del grupo, quedamos dos integrantes.

## Fecha: 20/08/2023

### Temas Discutidos

1. Progreso del Documento:
   - Creacion de la pagina de busquedas y formulario para crear un Post.
  
2. Próximos Pasos:
   - Seguir on Frontend
  
## Fecha: 29/08/2023

### Temas Discutidos

1. Progreso del Documento:
   - Creacion del contenedro del Post.
   - Creacion de la pagina Perfil
  
2. Próximos Pasos:
   - Seguir on Frontend

## Fecha: 08/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Creacion de la pagina SingIn y SingUp con validaciones
   - Funcionalidad al boton de Publicar

2. Próximos Pasos:
   - Agregar media al post
   - Crear post-page
   - Acciones en boton post.
   - Enviar mail con los datos.
   - Editar perfil.
   - Select para elegir el servicio del post.
   - Crear create-service page.

## Fecha: 01/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Select para elegir el servicio del post.
   - Funcionalidad al boton de Publicar

2. Próximos Pasos:
   - Empezar con los ABM de las entidades.
  
## Fecha: 14/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Empezamos con los ABM de las entidades.

2. Problemas:
   - No funciona el Add de las direcciones.

## Fecha: 19/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Agregado de los eventos click al formulario del post (solo envia los datos por consola).

2. Próximos Pasos:
   - Conectar el envio de datos conel backend.
  
## Fecha: 22/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Creacion de la seccion para editar el perfil.

2. Próximos Pasos:
   - Creacion de la conexion a la BDD.
  
## Fecha: 28/09/2023

### Temas Discutidos

1. Progreso del Documento:
   - Validacion de los formularios con Zod.

2. Próximos Pasos:
   - Conectar los formularios al Backend.
  
## Fecha: 01/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Conexion a la base de datos.
   - Terminado los abm de las entidades.
   - Creacion del metodo para buscar un usuario por mail y password

2. Próximos Pasos:
   - Seguir conectando los formularios al backend.
  
## Fecha: 06/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Generar que un usuario se mantenga Loggeado por medio de token.

2. Próximos Pasos:
   - Creacion del formulario para crear servicio.
  
## Fecha: 06/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Generar que un usuario se mantenga Loggeado por medio de token.

2. Próximos Pasos:
   - Creacion del formulario para crear servicio.
   - Cargar la informacion del usuario loggeado en el perfil.
  
## Fecha: 07/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Cambiar la forma en que se guardan los Servicios de cada usuario (Arreglo de Ids de servicios).

2. Próximos Pasos:
   - Conectar el post-form al backend.
  
## Fecha: 10/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Mostrar posts en el perfil.
   - Poder vistar un perfil ajeno al usuario loggeado.

2. Próximos Pasos:
   - Dar funcionalidad a la elimminacion del usuario.
   - Poder seguir al usuario.
   - Mostrar los post en la home.
  
## Fecha: 22/11/2023

### Temas Discutidos

1. Progreso del Documento:
   - Funcionalidad a los botones like y delete del post.

2. Próximos Pasos:
   - Verificar usuario por mail y password.
   - Buscar userpage por Username.
  
## Fecha: 05/12/2023

### Temas Discutidos

1. Progreso del Documento:
   - Generar popup para confirmar eliminacion y logout del usuario.
   - Creacion del edit y delete page de los servicios.

# Seguimiento de Features, Bugs e Issues

