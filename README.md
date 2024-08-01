# CRUD Application with User Management

This project is a simple CRUD application for managing user records. It consists of a backend built with PHP and a frontend application built with React. The application allows users to create, read, update, and delete user records. Additionally, it includes features to view and copy passwords in a modal.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [API Endpoints](#api-endpoints)
4. [Frontend Overview](#frontend-overview)
5. [How to Run](#how-to-run)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before running the project, ensure you have the following installed:

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js and npm

## Database Setup

1. **Create the Database**:
   - Log in to your MySQL server.
   - Create a new database named `crud-task`.

2. **Import the Database Schema**:
   - Use the following SQL commands to create the required `users` table:

   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       dob DATE NOT NULL
   );

3. **Update Database Credentials**:
    -In `backend/api/DbConnect.php`, update the database connection credentials if needed.

## API Endpoints

### Base URL
- Update port in Urls
- `http://{your-php-port}/backend/api/`

### Endpoints

- **GET /users**
  - **Description**: Retrieve all users.
  - **Response**: JSON array of user objects.

- **GET /user/{id}**
  - **Description**: Retrieve a user by ID.
  - **Response**: JSON object of the user.

- **POST /user/save**
  - **Description**: Create a new user.
  - **Request Body**: JSON object with `name`, `email`, `password`, and `dob`.

- **PUT /user/{id}/edit**
  - **Description**: Update an existing user by ID.
  - **Request Body**: JSON object with `name`, `email`, `password`, and `dob`.

- **DELETE /user/{id}/delete**
  - **Description**: Delete a user by ID.
  - **Response**: JSON object with status message.

## Frontend Overview

The frontend is a React application that interacts with the backend API. It includes components for listing users, creating new users, and editing existing users.

### Components

- **ListUsers.js**: Displays a list of users with options to edit, delete, or view passwords.
  - **Features**:
    - View password with a confirmation modal.
    - Toggle password visibility using eye icons.
    - Copy password to clipboard.

- **CreateUser.js**: Form for creating a new user.
  - **Features**:
    - Input fields for user data.
    - Submit button to create a new user.

- **EditUser.js**: Form for editing an existing user.
  - **Features**:
    - Input fields pre-filled with current user data.
    - Submit button to save changes.
    - Eye icon functionality for toggling password visibility.

## Running the Frontend

1. **Navigate to the Frontend Directory:**

    ```bash
    cd frontend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start the Development Server:**

    ```bash
    npm start
    ```

   The application will be available at `http://localhost:3000`.

## Running the Backend

1. **Navigate to the Backend Directory:**

    ```bash
    cd backend
    ```

2. **Start the PHP Server:**

    ```bash
    php -S localhost:<your-port-number>
    ```

   The backend API will be available at `http://localhost:<your-port-number>/backend/api/`.

3. **Setting Up with XAMPP/LAMP:**

    - **Move the Backend Files:**
      - Place the `backend` folder in the `htdocs` directory of your XAMPP/LAMP installation.

    - **Start Apache Server:**
      - Open XAMPP/LAMP control panel and start the Apache server.

## Troubleshooting

### Database Connection Error:

- Ensure that your MySQL server is running.
- Verify that the credentials in `DbConnect.php` are correct.

### API Not Responding:

- Check if the PHP server is running and accessible at the specified port.
