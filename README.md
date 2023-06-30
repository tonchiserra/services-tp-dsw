# Propuesta TP DSW

## Grupo
### Integrantes
* 47064 - Serra, Gonzalo
* 48937 - Bitti, Guido
* 48028 - Bertone, Valentin

### Repositorios
* [Frontend app](github.com/tonchiserra/services-dsw)
* [Backend app](github.com/tonchiserra/api-services-dsw)

## Tema
### Descripción
Red social de contratación de servicios.

### Modelo
![Imagen de Diagrama Entidad Relación](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=ModeloDSW.drawio#R3VrZcpswFP0aPyZjSWDjx8ZZ2pkm7YzbJnnqEKOCWkAeIbz06ytiiU0kJoltKX0y9yKMdHTuKgZomqyvmL%2BIrmmA4wEcBusBOh9AiEYTJH4KzWarGYHRVhEyEmxVoFLMyF8slUOpzUmAs8ZATmnMyaKpnNM0xXPe0PmM0VVz2C8aN9%2B68EOsKWZzP9a1tyTg0VYLEZpUNz5iEkby1QgN5cwTX42WiizyA7qqqdDFAE0ZpXx7laynOC7QU8Bsn7t84m45M4ZT3ucBMr2N0IhlxEuSD8s7fuPhkxMk92fpx7lcspwt3ygMVhHheLbw54W8Evs8QGcRT2IhAXHpxyRMxfVczAMzodAnJue6xIzjdU0lJ3qFaYI524gh8u4JkqBJ2iBXyqtqE1zFkaiGP1AP%2BnLjw%2FK%2FK2jEhUTnBUjBsYbU8PRaAwsHgj9SpIxHNKSpH19U2jNG8zTAxauGQqrGfKZ0ISH9jTnfSGPwc06bgD%2BJb0ZzNsfPrEFZkM9CzJ9bqzTSYjHPbhfDsc%2FJsmkse4fe6UHS%2FwJ3B1qFO9Bg%2F57lPiP0pS5iDx6htHbpEcBE9wgAdniE0aEcgmOLP8Brwu%2BKx09dKd3X7pyv5T8%2FChspvJ7LqC%2BZkVVcVnGhsV0378uNwL7ue2IV9FBD%2FivDGRfZEDPgSBBspRaeaUcy0vABp0BDxmpmop7MdK0iZo%2B0gkU0ecjFi88Oz8wWMd2hTkyvg5feoXjpavB8IwtaFHO4AAmzJZkfNxdQRaRj2mSB9%2F5tFvQ1WjC2ymqBbrbnhOG54GJqIJ54tuWlsCvTMZOYpmI9dyr9LIT7Kk0txCo3fZTenpwqqu7m9L4pLR%2F9SomYc0kOx22yAzqtXd9OVD7V2vhyGm%2BwFb1pYTTEld0xZS0dyddRYxzSk693VxaASU%2FSI7vSLzXvGvbTmBRdRANufOS1ywLXtB%2FX45whP55F%2FqK4E5P0z9sK2N4NSLsaYSWdaiUszbi2FwoovBaLO0vEKknRGUdCCGj%2B8DgM7Ha0h%2BioT0atSNRRXYBhB7%2FbEWt%2FoOp9AaOxaTx27YpNUC%2FADBUZZSJXCodO5KDT01PsPZF725bpTWGznG5XJx1RbdzB6fGhOO10FSdG8q0nipMdjC577bVOe9V333evXZ3DWVPOOC06weOWM1DP1mckzPV88Zg25rbOqjuaU8ctafS4%2Bu4OqmHvksYy%2F6%2BXNEa5CdpVzdg0OfVMemaukWz%2B7AdZ81XJ8XM81Y7YbeSWHSXrebnZAOS2jVxP8o5q5I5rlMA1zvZJ6V5PYPW5zu52hin%2Bbn5kyZ3Hb%2Bnlp2keXn4B65%2FeidkS0r7dUX1IS9yLmnf9fEvfsTgmiwwfx784zcYI7Iiabod%2FecWnmEKsPojdVg3Vd8Xo4h8%3D)

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Tipo de Servicio<br>3. CRUD Dirección|
|CRUD dependiente|1. CRUD Cliente {depende de} CRUD Usuario<br>2. CRUD Servicio {depende de} CRUD Tipo de Servicio|
|Listado<br>+<br>detalle| 1. Listado de calificaciones, muestra todos los puntajes de calificación que recibió un prestador => detalle muestra comentarios junto con los puntajes.<br> 2. Listado de posts filtrado por tipo de servicio, muestra nombre del prestador y contenido reducido del post => detalle muestra contenido completo del post con todos los datos.|
|CUU/Epic|1. Contratar un servicio<br>2. Prestar un servicio|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Tipo de Servicio<br>3. CRUD Dirección<br>4. CRUD Cliente<br>5. CRUD Prestador<br>6. CRUD Post<br>7. CRUD Servicio|
|CUU/Epic|1. Contratar un servicio<br>2. Prestar un servicio<br>3. Seguir a un usuario|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1. Listado de seguidores de un usuario|
|CUU/Epic|-|
|Otros|1. Notificaciones<br> 2. Like/repost en posts|
