# Movie API

API REST desarrollada con **Node.js**, conectada a una base de datos **PostgreSQL** mediante Sequelize, e integrada con **Redis** para cachear respuestas y optimizar el rendimiento.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- Sequelize (ORM)
- PostgreSQL
- Redis (cache)
- dotenv (variables de entorno)
- nodemon (entorno de desarrollo)

---

## Estructura del proyecto

```
movie-api/
├── controllers/
├── models/
├── routes/
├── services/
├── config/
├── .env
├── server.js
├── package.json
```

---

## Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/DIOR27/movie-api.git
cd movie-api
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Crea archivo `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=uem_user
DB_PASSWORD=Uem1234!
DB_NAME=movie_db
DB_PORT=5432

REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Ejecuta el servidor

```bash
npm run dev
```

---

## Endpoints disponibles

### `/movies`
- **GET**: Devuelve todas las películas (usa Redis como cache).
- **POST**: Crea una nueva película. Invalida el cache.

### `/movies/:id`
- **GET**: Devuelve una película por ID (usa Redis como cache).
- **PUT**: Actualiza una película existente. Invalida el cache.
- **DELETE**: Elimina una película. Invalida el cache.

---

## Ejemplos de prueba de la API

---

### POST http://localhost:3000/movies

```json
{
  "title": "Inception",
  "description": "Un viaje dentro de los sueños",
  "releaseDate": "2010-07-16",
  "rating": 9
}
```

---

### GET http://localhost:3000/movies

_(Devuelve la lista de todas las películas, usando Redis como cache si está disponible)_

---

### GET http://localhost:3000/movies/1

_(Devuelve los datos de la película con ID 1, usa Redis como cache)_

---

### PUT http://localhost:3000/movies/1

```json
{
  "rating": 10
}
```

_(Actualiza la película con ID 1 e invalida el cache)_

---

### DELETE http://localhost:3000/movies/1

_(Elimina la película con ID 1 e invalida el cache)_

---

## Autor

- **Desarrollado por:** Diego Orellana
- **Curso:** Desarrollo Avanzado de Backend y APIs
- **Universidad Europea**