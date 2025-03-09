# MiniTweet - Un clon simplificado de Twitter

MiniTweet es una aplicación fullstack que implementa las funcionalidades básicas de Twitter, incluyendo registro de usuarios, publicación de tweets y perfiles de usuarios.

## Tecnologías utilizadas

### Frontend

- React
- React Bootstrap
- React Query
- React Router
- Axios

### Backend

- NestJS
- Sequelize ORM
- MySQL
- JWT Authentication

## Requisitos

- Node.js v14 o superior
- MySQL 5.7 o superior
- Docker y Docker Compose (opcional, para despliegue)

## Instalación y ejecución

### Método 1: Instalación manual

1. Clonar el repositorio:

```
git clone <url-repositorio>
cd minitweet
```

2. Configurar la base de datos:

   - Crear una base de datos MySQL llamada minitweet
   - Actualizar la configuración en backend/.env con tus credenciales

3. Configurar el backend:

```
cd backend
npm install
npm run start:dev
```

4. Configurar el frontend:

```
cd ../frontend
npm install
npm run dev
```

5. Acceder a la aplicación:
   - Frontend: http://localhost:5173
   - API Backend: http://localhost:3000

## Variables de entorno

### Backend (.env)

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=minitweet
JWT_SECRET=your_jwt_secret_key
```

## Funcionalidades implementadas

- Registro e inicio de sesión de usuarios
- Crear, leer, actualizar y eliminar tweets
- Feed principal con tweets de todos los usuarios
- Perfil de usuario con sus tweets
- Edición de perfiles de usuario

## Estructura del proyecto

```
minitweet/
├── frontend/       # Aplicación React
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
│
└── backend/        # API NestJS
    ├── src/
    │   ├── users/
    │   ├── tweets/
    │   ├── auth/
    │   └── app.module.ts
    └── nest-cli.json
```
