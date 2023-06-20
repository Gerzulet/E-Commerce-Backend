# Administrador E-Commerce


![GitHub top language](https://img.shields.io/github/languages/top/Gerzulet/E-Commerce-Backend?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Gerzulet/E-Commerce-Backend?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Gerzulet/E-Commerce-Backend?style=for-the-badge)
![Website](https://img.shields.io/website?logo=Railway&style=for-the-badge&url=https%3A%2F%2Fe-commerce-backend-production-a1b2.up.railway.app%2Fapi%2F)

## E-Commerce, realizado en el lado del backend, en base a la entrega final de la plataforma CODERHOUSE. 


#### Deploy
  <a href="https://e-commerce-backend-production-a1b2.up.railway.app/api/">
    <img  src="https://railway.app/brand/logotype-light.png" >
  </a>




## Descripcion / Description


Backend para un e-commerce realizado con NodeJS, Express, Vanilla Javascript y MongoDB/Mongoose como base de datos, con arquitectura en capas.
Esta ideado para administrar  productos, usuarios y gestiones de compras desde un cliente.
Puede ser conectado el lado frontend de un e-commerce.
![Recording 2023-06-06 at 19 58 29](https://github.com/Gerzulet/E-Commerce-Backend/assets/92329156/c6898682-25af-4708-ab66-73afd43e20c9)

Este proyecto involucra fundamentos a la hora de realizar el backend de una aplicacion, ademas de consolidar el uso de un cliente para el backend al momento de realizar peticiones.

Espero poder seguir desarrollando mas aplicaciones como esta para administrar no solo productos y usuarios si no que tareas y elementos mas complejos.

## Caracteristicas / Features 

  -  Operaciones CRUD para productos, carritos y usuarios.
  -  Manejo de autenticaciones y autorizaciones con libreria passport.
  -  Sistema de logueo y registracion, ademas de sistema de restauracion de contraseña.
  -  Uso de patrones de diseño como Factory y Repository.
  -  Carga de archivos con Multer. 
  -  Documentacion realizada con Swagger.
  -  Persistencia de sesion con cookies, usando JWT.
  -  Sistema de loggers con libreria Winston logger.
  -  Uso de Socket.io para funcionalidad de chat (actualmente fuera de servicio en deploy)
  -  Sistema de mensajeria con Twilio y Nodemailer.
  -  Renderizado desde servidor con libreria handlebars, con respuestas en formato JSON (pasando parametro ?json=true)
  -  Testing unitarios e integrales con librerias como Mocha, Chai y Supertest.
  -  Sistema de toasts con libreria IziToasts para respuestas desde el servidor.
    
## Install 

Podes instalar este proyecto simplemente con "npm install" o con cualquier administrador de paquetes.


### Scripts

npm run prod/dev : Correr app en modo desarrollo/produccion, solo cambia el puerto

npm run test:products   : Testeos con productos
npm run test:carts      : Testeos con carritos  
npm run test:sessions   : Testeos con usuarios y sesiones       

### Uso 

Podes usar las funcionalidades del administrador con la cuenta: 

user: admin@gmail.com
password: 1234

## Agradecimientos

Agradezco considerablemente la asistencia de  Emiliano Perez, profesor de backend en CODERHOUSE, y  Iñaki Odriozola , tutor en  CODERHOUSE.

## Librerias utilizadas

 - Bcrypt (Para hasheo de contraseñas)
 - Handlebars (Para renderizado desde servidor)
 - Commander (para manejo de flags y modos de desarrollo y produccion)
 - Cookie-Parser
 - Cors
 - Express Mongoose (Para manejo de base de datos)
 - Multer (para carga de archivos)
 - Nodemailer (para enviar mails)
 - Passport (para estrategias de autenticacion y autorizacion)
 - Socket.io (para implementacion de funcionalidad de chat)
 - Superagent(Para testeos)
 - Swagger (Para documentacion)
 - Twilio (para sistema de mensajeria SMS)
 - Winston Logger (Para sistema de loggers)
 - Faker.js (para mocks de productos)
 - Mocha (para testeos)
 - Chai (para testeos)
 - DotEnv para uso de variables de entorno (no cargadas en este repositorio)

 ## TODO 

  - [X] Arreglar respuesta si se intenta crear un producto como usuario
  - [ ] Agretar estado de carrito
  - [X] Ocultar login y register si ya estas logueado


