# Simple REST API

A simple RESTful API for user management, built with **Node.js** and **Express**. User data is stored persistently in a `users.json` file (no database required).

---

## Features
- Create a user (`POST /users`)
- Retrieve a user by ID (`GET /users/:id`)
- Persistent storage in `users.json`
- Well-documented code with comments
- Basic error handling

---

## Technology Stack
- **Language:** JavaScript (Node.js)
- **Framework:** Express
- **Unique ID Generation:** UUID

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Simple-Rest-API/backend
   ```

2. **Install dependencies:**
   This project uses Express (web framework) and UUID (for generating unique user IDs).
   ```bash
   npm install express uuid
   ```
   Or, if you want to install all dependencies from `package.json` (recommended):
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node index.js
   ```
   The server will start at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### 1. Create a User
- **Endpoint:** `POST /users`
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Success Response:**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    {
      "id": "generated-uuid",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Error Response:**
  - **Status:** `400 Bad Request`
  - **Body:**
    ```json
    { "error": "Missing required fields: name and email." }
    ```

#### Example cURL
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

---

### 2. Get a User by ID
- **Endpoint:** `GET /users/:id`
- **Success Response:**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Error Response:**
  - **Status:** `404 Not Found`
  - **Body:**
    ```json
    { "error": "User not found." }
    ```

#### Example cURL
```bash
curl http://localhost:3000/users/<user-id>
```
Replace `<user-id>` with the actual id returned from the POST request.

---

## Testing with Postman

### 1. Start the Server
Make sure your server is running:
```bash
cd backend
node index.js
```

### 2. Create a User
- Open Postman and create a new **POST** request.
- Set the URL to: `http://localhost:3000/users`
- Go to the **Body** tab, select **raw**, and choose **JSON**.
- Enter:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- Click **Send**. You should see a response with the new user and an `id`.

### 3. Get a User by ID
- Copy the `id` from the previous response.
- Create a new **GET** request in Postman.
- Set the URL to: `http://localhost:3000/users/<user-id>` (replace `<user-id>` with the actual id).
- Click **Send**. You should see the user data if the id exists.

### 4. Error Handling
- Try sending a POST request without a name or email to see a 400 error.
- Try a GET request with a non-existent id to see a 404 error.

---

## Notes
- User data is saved in `users.json` in the backend folder and will **not** be lost when the server restarts.
- All data is still stored in memory while the server is running, but changes are written to the file for persistence.
- Ensure Node.js is installed on your system. 