# Chat App Backend

A Node.js/Express backend for a chat application, featuring user authentication and profile management. Built with MongoDB, JWT, and follows secure coding practices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Signup](#signup)
  - [Login](#login)
  - [Logout](#logout)
- [User Model](#user-model)
- [Security & Ethics](#security--ethics)
- [License](#license)

---

## Features

- User registration with validation
- Secure password hashing (bcrypt)
- JWT-based authentication
- Cookie-based session management
- User profile with avatar, bio, languages, location, and friends

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in `/backend` with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## Environment Variables

| Variable         | Description                       |
|------------------|-----------------------------------|
| PORT             | Server port                       |
| MONGO_URI        | MongoDB connection string         |
| JWT_SECRET_KEY   | JWT signing secret                |
| NODE_ENV         | `development` or `production`     |

---

## API Endpoints

Base URL: `/api/auth`

### Signup

- **POST** `/api/auth/signup`
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - `201 Created`
    ```json
    {
      "success": true,
      "user": {
        "_id": "...",
        "fullName": "John Doe",
        "email": "john@example.com",
        "profilePic": "https://avatar.iran.liara.run/public/XX.png",
        ...
      }
    }
    ```
  - `400 Bad Request` (missing fields, invalid email, short password, or email exists)
    ```json
    { "message": "Error message" }
    ```
  - `500 Internal Server Error`
    ```json
    { "message": "Internal Server Error" }
    ```

### Login

- **POST** `/api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**  
  *(To be implemented)*  
  Currently returns:  
  ```
  Login Route
  ```

### Logout

- **POST** `/api/auth/logout`
- **Response:**  
  *(To be implemented)*  
  Currently returns:  
  ```
  Logout Route
  ```

---

## User Model

```js
{
  fullName: String,
  email: String,
  password: String,
  bio: String,
  profilePic: String,
  nativeLanguage: String,
  learningLanguage: String,
  location: String,
  isOnBoarded: Boolean,
  friends: [User._id]
}
```

- Passwords are hashed before storage.
- Email is unique and validated.
- ProfilePic is auto-assigned on signup.

---

## Security & Ethics

- Passwords are never stored in plain text.
- JWT tokens are stored in HTTP-only cookies for security.
- Input validation prevents common vulnerabilities.
- No personal data is shared with third parties.
- Follows best practices for user privacy and data protection.

---

