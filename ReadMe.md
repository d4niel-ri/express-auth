# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## How to Run
```
npm start
```

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

_Response (400 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

---

## RESTful endpoints

### Hello World

#### GET /

> Test an endpoint

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
Hello, express-auth's client!
```

### Public Images

#### GET /:uploadUrl

> Get an image

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
<image>
```

---

### User

#### POST /api/user/login

> Login (user or admin)

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <email>,
  "password": <password>
}
```

_Response 200_
```
{
  "token": <token>,
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"password\" is required"
}
```

_Response (400 - Invalid Username or Password)_
```
{
  "message": "Username or password is invalid"
}
```

---

#### POST /api/user/register

> Register (user only)

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": <username>,
  "email": <email>,
  "password": <password>
}
```

_Response (201)_
```
{
  "data": {
    "role": <role>,
    "id": <id>,
    "username": <username>,
    "email": <email>,
    "updatedAt": <updatedAt>,
    "createdAt": <createdAt>
  },
  "status": "Success"
}
```

_Response (400 - Validation Failed)_
```
{
  "status": "Validation Failed",
  "message": "\"role\" is not allowed"
}
```

_Response (400 - Username Exist)_
```
{
  "message": "Username already exist"
}
```

_Response (400 - Email Exist)_
```
{
  "message": "Email already exist"
}
```

---

#### POST /api/user/forgot-password

> Make the backend send an email form to reset password

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": <email>
}
```

_Response (200)_
```
{
  "message": "Reset password email sent successfully",
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"email\" is required"
}
```

_Response (404 - User Not Found)_
```
{
  "message": "User Not Found"
}
```

---

#### POST /api/user/reset-password

> Reset the password

_Request Header_
```
not needed
```

_Request Body_
```
{
  "resetToken": <resetToken>,
  "newPassword": <newPassword>
}
```

_Response (200)_
```
{
  "message": "Password reset successful",
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"newPassword\" is required"
}
```

_Response (400 - Token Is Invalid)_
```
{
  "message": "Reset token is invalid or expired"
}
```

---

#### GET /api/user

> Get all users (can be requested by admin only)

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_users>
  ],
  "status": "Success"
}
```

---

#### GET /api/user/:id

> Get user's data 

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "username": <username>,
    "email": <email>
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "User Not Found"
}
```

---

#### PUT /api/user

> Change user's own profile (username or email)

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "username": <username>, // optional (but not empty)
  "email": <email>,       // optional (but not empty)
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "username": <username>,
    "email": <email>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"role\" is not allowed"
}
```

_Response (400 - Username Exist)_
```
{
  "message": "Username already exist"
}
```

_Response (400 - Email Exist)_
```
{
  "message": "Email already exist"
}
```

---

#### PUT /api/user/change-password

> Change user's own password

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "oldPassword": <oldPassword>,
  "password": <password>
}
```

_Response (200)_
```
{
  "message": "Password succesfully changed",
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"oldPassword\" is required"
}
```

_Response (400 - Invalid Old Password)_
```
{
  "message": "Invalid Old Password"
}
```

---

#### POST /api/user/create-admin

> Create an admin (can be done by admin only)

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "username": <username>,
  "email": <email>,
  "password": <password>
}
```

_Response (201)_
```
{
  "data": {
      "id": <id>,
      "username": <username>,
      "email": <email>
      "role": <role>,
      "updatedAt": <createdAt>,
      "createdAt": <updatedAt>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"email\" is required"
}
```

_Response (400 - Username Exist)_
```
{
  "message": "Username already exist"
}
```

_Response (400 - Email Exist)_
```
{
  "message": "Email already exist"
}
```

---

#### DELETE /api/user/delete-user/:id

> Delete user or admin (can be done by admin only)

_Request Params_
```
/<id>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "confirmationPassword": <confirmationPassword>
}
```

_Response (200)_
```
{
  "message": "Success delete <username>",
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "User Not Found"
}
```

---

### Post

#### GET /api/post

> Get all posts (with its author's profile)

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_posts_with_its_user_profile>
  ],
  "status": "Success"
}
```

---

#### GET /api/post?id=

> Get a post (with its author's profile)

_Request Queries_
```
?id=<id>
```

_Request Header_
```
note needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "title": <title>,
    "content": <content>,
    "user_id": <user_id>,
    "imageUrl": <imageUrl>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "User": {
        "id": <id>,
        "username": <username>,
        "email": <email>
    }
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Post Not Found"
}
```

---

#### GET /api/post/my-posts

> Get all posts created by user

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_posts_with_its_user_profile>
  ],
  "status": "Success"
}
```

---

#### POST /api/post/

> Create a post

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "title": <title>,
  "content": <content>,
  "image": <image>, // optional, type: file 
}
```

_Response (201)_
```
{
  "data": {
    "id": <id>,
    "title": <title>,
    "content": <content>,
    "user_id": <user_id>,
    "imageUrl": <imageUrl>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>
  },
  "status": "Success"
}
```

_Response (400)_
```
{
  "status": "Validation Failed",
  "message": "\"content\" is required"
}
```

---

#### PUT /api/post/:id

> Update a post (can be done by admin or its author)

_Request Params_
```
/<id>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  "title": <title>,     // optional (but not empty)
  "content": <content>, // optional (but not empty)
  "image": <image>,     // optional, type: file 
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>,
    "title": <title>,
    "content": <content>,
    "user_id": <user_id>,
    "imageUrl": <imageUrl>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"content\" is not allowed to be empty"
}
```

_Response (404 - Post Not Found)_
```
{
  "message": "Post Not Found"
}
```

---

#### DELETE /api/post/:id

> Delete a post (can be done by admin or its author only)

_Request Params_
```
/<id>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "message": "Status delete <title>",
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Post Not Found"
}
```

---