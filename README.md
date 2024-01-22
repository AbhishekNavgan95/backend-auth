# Authorization and Authentication Demo

This project serves as a demonstration of authorization and authentication implementation in a Node.js backend using Express, MongoDB, and JSON Web Tokens (JWT). It showcases the creation of protected routes with role-based access control.

## Introduction

This project demonstrates the essentials of user registration, login, and the creation of protected routes with role-based access control in a Node.js backend. It aims to showcase best practices for securing routes and managing user roles.

## Features

- User registration with hashed password storage
- User login with JWT token generation
- Authorization middleware for creating protected routes
- Role-based access control for different routes

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt

## Project Structure

- `index.js`: Entry point for the application, sets up the Express app, connects to the database, and defines routes.
- `config/`: Contains configuration files, such as database connection.
- `controllers/`: Handles the business logic for user registration and login.
- `middlewares/`: Contains middleware functions, including authentication and role verification.
- `models/`: Defines the data schema for the User model.
- `routes/`: Contains route handlers for different API endpoints.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables by creating a `.env` file.
   - Example `.env` file:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/auth_demo
     JWT_SECRET=your_secret_key
     ```
4. Start the application with `npm start`.

## Usage

Once the application is running, you can test the authentication and authorization features by using the provided routes.

## Endpoints

- `POST /api/v1/signup`: Register a new user.
- `POST /api/v1/login`: Log in with existing credentials.
- `GET /api/v1/test`: A protected route for testing authentication.
- `GET /api/v1/student`: A protected route accessible only to users with the "Student" role.
- `GET /api/v1/admin`: A protected route accessible only to users with the "Admin" role.

## Middleware

- `auth`: Authentication middleware to verify the JWT token.
- `isStudent`: Middleware to check if the user has the "Student" role.
- `isAdmin`: Middleware to check if the user has the "Admin" role.

## Models

### User

- `name`: String (required, trimmed)
- `email`: String (required, trimmed)
- `password`: String (required)
- `role`: String (enum: ["Admin", "Student", "Visitor"])

## Controllers

### signup

Handles user registration. Checks for existing users and hashes the password before storing it in the database.

### login

Handles user login. Verifies user existence, compares passwords, and generates a JWT token for authentication.

## Database Connection

### connectToDB

Handles the connection to the MongoDB database. Logs success or failure and exits the process in case of connection issues.

