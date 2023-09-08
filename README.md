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
![Modelo-DSW.jpg](https://i.postimg.cc/W1m7pkTS/Modelo-DSW.jpg)

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
