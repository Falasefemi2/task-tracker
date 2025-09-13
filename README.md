# Task Tracker API

This is a simple, yet powerful Task Tracker API built with NestJS. It allows users to register, login, and manage their tasks.

## Features

- User registration and authentication (JWT-based)
- Create, read, update, and delete tasks
- Tasks are associated with users
- Validation and error handling

## Technologies Used

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/) - An ORM for TypeScript and JavaScript.
- [MySQL](https://www.mysql.com/) - A popular open-source relational database.
- [Passport](http://www.passportjs.org/) - An authentication middleware for Node.js.
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication.
- [Docker](https://www.docker.com/) - For containerization.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Falasefemi2/task-tracker.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the app

### Without Docker

1.  Make sure you have a MySQL instance running.
2.  Create a `.env` file in the root directory with the following content:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=task_tracker
    ```
3.  Start the application:
    ```bash
    npm run start:dev
    ```

### With Docker

1.  Make sure you have Docker and Docker Compose installed.
2.  Run the following command to start the application and the database:
    ```bash
    docker-compose up -d
    ```

The application will be available at `http://localhost:3000`.

## Running the tests

```bash
npm run test
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user.
  - **Request body:**
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password"
    }
    ```
- `POST /auth/login` - Login an existing user.
  - **Request body:**
    ```json
    {
      "email": "test@example.com",
      "password": "password"
    }
    ```

### Tasks

All task-related endpoints require authentication. You need to include the JWT in the `Authorization` header as a Bearer token.

- `POST /tasks` - Create a new task.
  - **Request body:**
    ```json
    {
      "title": "My new task",
      "description": "This is a description of my new task."
    }
    ```
- `GET /tasks` - Get all tasks for the authenticated user.
- `GET /tasks/:id` - Get a specific task by its ID.
- `PATCH /tasks/:id` - Update a task by its ID.
  - **Request body:**
    ```json
    {
      "title": "Updated title",
      "description": "Updated description",
      "status": "IN_PROGRESS"
    }
    ```
- `DELETE /tasks/:id` - Delete a task by its ID.

## Project Structure

```
.
├── src
│   ├── auth
│   │   ├── dto
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── tasks
│   │   ├── dto
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   ├── users
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
└── ...
```

## License

This project is licensed under the MIT License.
