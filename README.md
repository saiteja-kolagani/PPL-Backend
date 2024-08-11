
# PPL Backend API

This repository contains the backend API for the PPL project. The API is deployed and accessible at [https://ppl-backend-dvf6.onrender.com](https://ppl-backend-dvf6.onrender.com). This API allows for user registration, login, and performing CRUD operations on assignments.

## API Endpoints

### Authentication

- **Register a new user**

  - **Endpoint:** `POST /api/auth/register`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/auth/register](https://ppl-backend-dvf6.onrender.com/api/auth/register)
  - **Description:** Register a new user by providing a username and password.

  - **Example Request (JSON Body):**
    ```json
    {
        "username": "your-username",
        "password": "your-password"
    }
    ```

  - **Example Response:**
    ```json
    {
        "success": true,
        "message": "Registration Successful",
        "token": "your-jwt-token"
    }
    ```

- **User login**

  - **Endpoint:** `POST /api/auth/login`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/auth/login](https://ppl-backend-dvf6.onrender.com/api/auth/login)
  - **Description:** Log in an existing user by providing a username and password. Returns a JWT token upon successful authentication.

  - **Example Request (JSON Body):**
    ```json
    {
        "username": "your-username",
        "password": "your-password"
    }
    ```

  - **Example Response:**
    ```json
    {
        "success": true,
        "message": "Login Successful",
        "token": "your-jwt-token"
    }
    ```

### Assignments CRUD Operations

- **Get all assignments**

  - **Endpoint:** `GET /api/assignments`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments](https://ppl-backend-dvf6.onrender.com/api/assignments)
  - **Description:** Retrieve all assignments.

  - **Example Response:**
    ```json
    {
        "assignments": [
            {
                "id": 1,
                "title": "Assignment 1",
                "description": "Description of Assignment 1"
            },
            {
                "id": 2,
                "title": "Assignment 2",
                "description": "Description of Assignment 2"
            }
        ]
    }
    ```

- **Add a new assignment**

  - **Endpoint:** `POST /api/assignments`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments](https://ppl-backend-dvf6.onrender.com/api/assignments)
  - **Description:** Add a new assignment by providing a title and description.

  - **Example Request (JSON Body):**
    ```json
    {
        "title": "New Assignment",
        "description": "Description of the new assignment"
    }
    ```

  - **Example Response:**
    ```json
    {
        "id": 3,
        "message": "Assignment Created"
    }
    ```

- **Update an assignment**

  - **Endpoint:** `PUT /api/assignments/:id`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments/:id](https://ppl-backend-dvf6.onrender.com/api/assignments/:id)
  - **Description:** Update an existing assignment by specifying the assignment ID in the URL and providing the new title and description.

  - **Example Request (JSON Body):**
    ```json
    {
        "title": "Updated Assignment Title",
        "description": "Updated description of the assignment"
    }
    ```

  - **Example URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments/2](https://ppl-backend-dvf6.onrender.com/api/assignments/2)

  - **Example Response:**
    ```json
    {
        "message": "Assignment Updated"
    }
    ```

- **Delete an assignment**

  - **Endpoint:** `DELETE /api/assignments/:id`
  - **URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments/:id](https://ppl-backend-dvf6.onrender.com/api/assignments/:id)
  - **Description:** Delete an existing assignment by specifying the assignment ID in the URL.

  - **Example URL:** [https://ppl-backend-dvf6.onrender.com/api/assignments/2](https://ppl-backend-dvf6.onrender.com/api/assignments/2)

  - **Example Response:**
    ```json
    {
        "message": "Assignment Deleted"
    }
    ```

## Authentication

All CRUD operations for assignments require authentication via a JWT token. The token should be included in the `Authorization` header as follows:

```
Authorization: Bearer your-jwt-token
```

Ensure you have registered and logged in to obtain the token before attempting to interact with the assignments endpoints.

## Setup and Installation

If you want to run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/saiteja-kolagani/PPL-Backend.git
   cd PPL-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root of the project and add your `SECRET_KEY`:

   ```
   SECRET_KEY=your-secret-key
   ```

4. Start the server:

   ```bash
   node app.js
   ```

5. The server should now be running locally on [http://localhost:4000](http://localhost:4000).

