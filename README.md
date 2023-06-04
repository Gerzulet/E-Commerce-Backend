# E-Commerce-Backend


E-Commerce, realizado en el lado del backend, en base a la entrega final de CODERHOUSE. 


Tareas a reaizar paralelamente. 

- [ ] Trabajar en estilos de renders

  - [X] Index
    - [X] Incluir user en pantalla principal
    - [X] Agregar boton para salir de sesion
      - [X] Crear endpoint


  - [X] Products
   - [X] Rediseñar carga de producto en carrito
   - [X] Manejar busqueda y errores al momento de buscar productos
   - [X] Estilar carga de productos (Probar con modal )
   - [X] Al eliminar productos recargar pagina
   - [X] Revisar permisos para eliminar productos
   - [X] Manejar respuestas con alertify o similar
   - [X] Habilitar render para modificacion de productos


  - [X] Carts
   - [X] Si agrego un producto, si se encuentra en el carrito debe sumarse
   - [X] Manejar respuestas con alertify o similar
   - [X] Estilar detalles de carritos
   - [X] Manejar casos en que intentamos solicitar mas productos de los que hay en stock
   - [X] Poder modificar cantidad de la tabla
   - [X] Agregar funcionalidad para borrar producto de carrito  desde cliente


  - [X] Users
   - [X] Manejar respuesta si se intenta acceder sin permisos
   - [X] Estilar
   - [X] Estilar carga de documentos


  - [X] Login
   - [X] Redireccionar a HOME tras hacer login exitoso
   - [X] Manejar respuesta en caso de usuario incorrecto

  - [X] Chat
   - [X] Manejar permisos 

  - [X] Restore
   - [X] Estilar
   - [X] Manejar respuestas ante informacion incorrecta

  - [X] Register
   - [X] Verificar creacion de usuario
       - [X] Manejar respuesta desde el front

- [X] Habilitar respuestas de servidor en json
- [ ] Refinar manejo de logs 
   - [X] Manejar errores
- [X] Manejar cambios en renderizados a traves del cliente y no desde el servidor
- [ ] Refinar testing
   - [ ] Agregar nuevas rutas jsons para pruebas integrales
- [X] Documentar 
   - [X] Agregar nueva ruta de jsons
- [X] Pasar a .env variables e informacion sensible (cookies secrets, etc..)

Desde el router de /api/users, crear tres rutas:


- [X] GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)

- [X] DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

- [X] Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce



- [X] Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.
Verificar en este caso modulo de delete producto, el usuario premium no puede eliminar producto de otros


- [X] Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.

No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)


- [ ] Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.


Objetivos generales

Completar el proyecto final 

Objetivos específicos

Conseguir una experiencia de compra completa
Cerrar detalles administrativos con los roles.

Formato

Link al repositorio sin node_modules
Link del proyecto desplegado..

Sugerencias

Presta especial atención al template del Proyecto final. ¡Es crucial para alcanzar la nota que esperas!
Debido a la complejidad de frontend requerida para poder aplicar una pasarela de pago, el PF no evalúa la pasarela de pago.

