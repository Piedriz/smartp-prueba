# SmartP Prueba Técnica

Este proyecto es una solución desarrollada para la prueba técnica de la empresa **SmartP**. El objetivo fue evaluar habilidades en desarrollo fullstack, integrando un frontend desarrollado con **React (v18)** y un backend utilizando **Laravel (v11)**, junto con una base de datos **MySQL**.

---

## Características del Proyecto

- **Autenticación**: La sesión se gestiona mediante un token de sesión.
- **Roles de Usuario**:
  - **Cliente**: Puede acceder a su carrito de compras, agregar productos y generar facturas.
  - **Administrador**: Acceso al módulo de administración para gestionar usuarios y productos, además de las funcionalidades disponibles para el cliente.
- **Carrito de Compras**: Disponible para ambos roles. Permite agregar productos y generar una factura.
- **Gestor de Productos y Usuarios**: Exclusivo para administradores desde el módulo de administración.

---

## Requisitos Previos

### Software Necesario

1. **WampServer** (versión 3.3.7 o compatible).
2. **Node.js** (v23.6.1 o compatible).
3. **PHP** (v8.4.0 o compatible).
4. **Composer** (versión más reciente).

---

## Instalación y Configuración

### Backend (Laravel)

1. Descomprime la carpeta `backend` del archivo ZIP.
2. Accede al directorio desde la terminal:
   ```bash
   cd backend
   ```
3. Instala las dependencias ejecutando:
   ```bash
   composer install
   ```
4. Configura el archivo `.env` con los datos de tu base de datos MySQL. A continuación, un ejemplo:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=backend_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```bash
   php artisan migrate
   ```
6. Dado que la base de datos estará vacía tras la migración, puedes agregar un usuario administrador utilizando **Tinker**:
   ```bash
   php artisan tinker
   ```
   Ejecuta el siguiente código en Tinker:
   ```php
   $user = new \App\Models\User;
   $user->name = 'Admin User';
   $user->email = 'admin@example.com';
   $user->password = bcrypt('password123'); // Asegúrate de encriptar la contraseña
   $user->role ='admin'; // Define el rol como 'admin'
   $user->save();
   ```

   ```php
   $cart = new \App\Models\Cart;
   $cart->user_id = 1; // Relaciona el carrito con el usuario recién creado
   $cart->save();

   ```
7. Inicia el servidor de desarrollo:
   ```bash
   php artisan serve
   ```
   Por defecto, el servidor estará disponible en [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Frontend (React)

1. Descomprime la carpeta `frontend` del archivo ZIP.
2. Accede al directorio desde la terminal:
   ```bash
   cd frontend
   ```
3. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Por defecto, el frontend estará disponible en [http://localhost:5173](http://localhost:5173) (o el puerto que indique en la terminal).

---

## Uso del Proyecto

1. Asegúrate de que el backend (Laravel) está corriendo antes de iniciar el frontend (React).
2. Accede al frontend mediante el enlace proporcionado en la terminal tras ejecutar `npm run dev`.
3. Para iniciar sesión como administrador, utiliza el usuario creado con **Tinker**:
   - **Correo**: `admin@example.com`
   - **Contraseña**: `password123`
4. Desde el módulo de administración, puedes:
   - Crear nuevos usuarios.
   - Agregar productos al inventario.

---

## Estructura del Proyecto

```
smartp/
├── backend/       # Carpeta con el código backend (Laravel)
│   └── .env       # Archivo de configuración de entorno
│   └── ...       # Otros archivos y carpetas de Laravel
├── frontend/      # Carpeta con el código frontend (React)
    └── src/        # Código fuente del frontend
        └── ...    # Componentes, servicios, etc.
```

---

## Notas Adicionales

- **Base de Datos**: Es importante que la base de datos **MySQL** esté corriendo antes de iniciar el backend.
- El nombre de la base de datos debe de coincidir con el indicado en el archivo .env de Laravel (backend\_db)
- **Configuración del Entorno**: Si se utiliza un servidor remoto o diferente a `localhost`, actualiza los valores en el archivo `.env`.
- **Pruebas del Sistema**: El proyecto ha sido probado en el entorno especificado (WampServer 3.3.7, Node.js 23.6.1 y PHP 8.4.0).

---

© 2024 SmartP Prueba Técnica. Todos los derechos reservados.

