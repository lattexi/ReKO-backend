# Backend API Documentation

## Overview

This API provides endpoints for managing users, items, orders, and featured items in an e-commerce application. The API supports the following functionalities:

- **Users**: Registration, login, retrieval, and deletion.
- **Items**: Listing, adding, updating, deleting, and managing featured items.
- **Orders**: Placing orders, retrieving orders, and deleting orders.

## Authentication

- **JWT (JSON Web Token) based authentication**.
- After logging in, users receive a Bearer token to be included in the Authorization header of protected requests.

### Header Format:

```
Authorization: Bearer <token>
```

- **Admin Access**: Certain endpoints require the user to have admin privileges (`is_admin: true`).

## API Endpoints

### 1. Users

#### 1.1. Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Description**: Creates a new user account.

**Request Body**:

```json
{
    "username": "username",
    "password": "password",
    "email": "email@example.com",
    "is_admin": false  // Optional, defaults to false
}
```

**Response**:

- **Success (201 Created)**:
    ```json
    {
        "message": "Käyttäjä rekisteröity onnistuneesti"
    }
    ```
- **Errors**:
    - `400 Bad Request`: Username already exists.
    - `500 Internal Server Error`: Server error.

#### 1.2. Login User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```json
{
    "username": "username",
    "password": "password"
}
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
    }
    ```
- **Errors**:
    - `400 Bad Request`: Invalid username or password.
    - `500 Internal Server Error`: Server error.

#### 1.3. Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users.
- **Authentication**: Optional. Requires admin privileges to access sensitive data.

**Response**:

```json
[
    {
        "id": 1,
        "username": "user1",
        "password": "hashed_password",
        "email": "user1@example.com",
        "is_admin": false,
        "created_at": "2023-10-10T12:34:56.000Z"
    }
    // ... other users
]
```

#### 1.4. Delete User

- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Description**: Deletes a user by ID.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Käyttäjä poistettu onnistuneesti"
    }
    ```
- **Errors**:
    - `403 Forbidden`: Access denied.
    - `500 Internal Server Error`: Server error.

### 2. Items

#### 2.1. Get All Items

- **URL**: `/api/items`
- **Method**: `GET`
- **Description**: Retrieves a list of all items.

**Response**:

```json
[
    {
        "id": 1,
        "name": "Item 1",
        "description": "Description of Item 1",
        "price": 19.99,
        "category_id": 2,
        "image_path": "uploads/image-1632764800000.jpg",
        "created_at": "2023-10-10T12:00:00.000Z"
    }
    // ... other items
]
```

#### 2.2. Add New Item

- **URL**: `/api/items`
- **Method**: `POST`
- **Description**: Adds a new item to the inventory.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data**:

- `name` (string): Item name.
- `description` (string): Item description.
- `price` (decimal): Item price.
- `category_id` (integer): Category ID.
- `image` (file): Item image (optional).

**Response**:

- **Success (201 Created)**:
    ```json
    {
        "message": "Tuote lisätty onnistuneesti",
        "itemId": 123
    }
    ```
- **Errors**:
    - `400 Bad Request`: Invalid input data.
    - `403 Forbidden`: Access denied.
    - `500 Internal Server Error`: Server error.

#### 2.3. Get Item by ID

- **URL**: `/api/items/:id`
- **Method**: `GET`
- **Description**: Retrieves an item by its ID.

**Response**:

```json
{
    "id": 1,
    "name": "Item 1",
    "description": "Description of Item 1",
    "price": 19.99,
    "category_id": 2,
    "image_path": "uploads/image-1632764800000.jpg",
    "created_at": "2023-10-10T12:00:00.000Z"
}
```

- **Errors**:
    - `404 Not Found`: Item not found.

#### 2.4. Update Item

- **URL**: `/api/items/:id`
- **Method**: `PUT`
- **Description**: Updates an existing item.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data**:

- `name` (string): Updated item name.
- `description` (string): Updated item description.
- `price` (decimal): Updated item price.
- `category_id` (integer): Updated category ID.
- `image` (file): Updated item image (optional).

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Tuote päivitetty onnistuneesti"
    }
    ```
- **Errors**:
    - `400 Bad Request`: Invalid input data.
    - `403 Forbidden`: Access denied.
    - `404 Not Found`: Item not found.
    - `500 Internal Server Error`: Server error.

#### 2.5. Delete Item

- **URL**: `/api/items/:id`
- **Method**: `DELETE`
- **Description**: Deletes an item by ID.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Tuote poistettu onnistuneesti"
    }
    ```
- **Errors**:
    - `403 Forbidden`: Access denied.
    - `404 Not Found`: Item not found.
    - `500 Internal Server Error`: Server error.

#### 2.6. Featured Items

##### a. Set Featured Item

- **URL**: `/api/items/featured`
- **Method**: `POST`
- **Description**: Marks an item as featured within a specified date range.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body**:

```json
{
    "item_id": 123,
    "start_date": "2023-10-10",
    "end_date": "2023-10-20"
}
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Tuote asetettu nostetuksi"
    }
    ```
- **Errors**:
    - `400 Bad Request`: Invalid input data.
    - `403 Forbidden`: Access denied.
    - `500 Internal Server Error`: Server error.

##### b. Get Featured Items

- **URL**: `/api/items/featured`
- **Method**: `GET`
- **Description**: Retrieves the list of currently featured items.

**Response**:

```json
[
    {
        "id": 1,
        "name": "Featured Item 1",
        "description": "Description",
        "price": 29.99,
        "category_id": 2,
        "image_path": "uploads/featured-image-1632764800000.jpg",
        "created_at": "2023-10-10T12:00:00.000Z",
        "item_id": 1,
        "start_date": "2023-10-10",
        "end_date": "2023-10-20"
    }
    // ... other featured items
]
```

##### c. Delete Featured Item

- **URL**: `/api/items/featured/:id`
- **Method**: `DELETE`
- **Description**: Removes an item from the featured list.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Nosto poistettu"
    }
    ```
- **Errors**:
    - `403 Forbidden`: Access denied.
    - `404 Not Found`: Featured item not found.
    - `500 Internal Server Error`: Server error.

#### 2.7. Search Items

- **URL**: `/api/items/search/:query`
- **Method**: `GET`
- **Description**: Retrieves a list of items that match the search query in their name or description.

**Parameters**:

- `:query` (path parameter): The search term used to find matching items.

**Example Request**:

```
GET /api/items/search/laptop
```

**Response**:

- **Success (200 OK)**:

    ```json
    [
        {
            "id": 1,
            "name": "Gaming Laptop",
            "description": "High-end gaming laptop with powerful graphics card.",
            "price": 1499.99,
            "category_id": 2,
            "image_path": "uploads/laptop-image.jpg",
            "created_at": "2023-10-10T12:00:00.000Z"
        },
        {
            "id": 2,
            "name": "Ultrabook Laptop",
            "description": "Lightweight laptop for everyday use.",
            "price": 999.99,
            "category_id": 2,
            "image_path": "uploads/ultrabook-image.jpg",
            "created_at": "2023-10-11T08:30:00.000Z"
        }
        // ... other matching items
    ]
    ```

- **Errors**:
    - `500 Internal Server Error`: Server error.

**Notes**:

- The search is case-insensitive and matches items where the search term appears in either the name or the description.
- If no items match the search query, an empty array is returned.
- No authentication is required to access this endpoint.

#### 2.8. Get Items by Category

- **URL**: `/api/items/category/:categoryId`
- **Method**: `GET`
- **Description**: Retrieves a list of items that belong to a specific category.

**Parameters**:

- `:categoryId` (path parameter): The ID of the category for which items are being requested.

**Example Request**:

```
GET /api/items/category/2
```

**Response**:

- **Success (200 OK)**:

    ```json
    [
        {
            "id": 3,
            "name": "Smartphone",
            "description": "Latest model smartphone with advanced features.",
            "price": 699.99,
            "category_id": 2,
            "image_path": "uploads/smartphone-image.jpg",
            "created_at": "2023-10-11T09:15:00.000Z"
        },
        {
            "id": 4,
            "name": "Wireless Headphones",
            "description": "Noise-cancelling over-ear headphones.",
            "price": 199.99,
            "category_id": 2,
            "image_path": "uploads/headphones-image.jpg",
            "created_at": "2023-10-12T11:20:00.000Z"
        }
        // ... other items in category 2
    ]
    ```

- **Errors**:
    - `404 Not Found`: No items found for the specified category.
    - `500 Internal Server Error`: Server error.

**Notes**:

- This endpoint does not require authentication.
- If there are no items in the specified category, an empty array is returned.
- Ensure that the categoryId provided is a valid integer corresponding to an existing category in the database.

### 3. Orders

#### 3.1. Place Order

- **URL**: `/api/orders`
- **Method**: `POST`
- **Description**: Places a new order.

**Request Body**:

```json
{
    "customer_name": "Customer Name",
    "customer_email": "customer@example.com",
    "customer_address": "123 Street, City, Country",
    "items": [
        {
            "item_id": 1,
            "quantity": 2,
            "price_at_purchase": 19.99
        },
        {
            "item_id": 3,
            "quantity": 1,
            "price_at_purchase": 49.99
        }
    ]
}
```

**Notes**:

- **Authentication**: Optional. If the user is logged in, the order is associated with their account.

**Response**:

- **Success (201 Created)**:
    ```json
    {
        "message": "Tilaus tehty onnistuneesti",
        "orderId": 456
    }
    ```
- **Errors**:
    - `400 Bad Request`: Missing or invalid data.
    - `500 Internal Server Error`: Server error.

#### 3.2. Get All Orders

- **URL**: `/api/orders`
- **Method**: `GET`
- **Description**: Retrieves all orders.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
```

**Response**:

```json
[
    {
        "id": 456,
        "user_id": null,
        "customer_name": "Customer Name",
        "customer_email": "customer@example.com",
        "customer_address": "123 Street, City, Country",
        "order_date": "2023-10-10T14:00:00.000Z"
    }
    // ... other orders
]
```

#### 3.3. Get Order by ID

- **URL**: `/api/orders/:id`
- **Method**: `GET`
- **Description**: Retrieves an order by its ID.
- **Authentication**: Required. Users can view their own orders; admins can view all orders.

**Headers**:

```
Authorization: Bearer <token>
```

**Response**:

```json
{
    "id": 456,
    "user_id": null,
    "customer_name": "Customer Name",
    "customer_email": "customer@example.com",
    "customer_address": "123 Street, City, Country",
    "order_date": "2023-10-10T14:00:00.000Z",
    "items": [
        {
            "item_id": 1,
            "quantity": 2,
            "price_at_purchase": 19.99,
            "name": "Item 1",
            "description": "Description of Item 1"
        }
        // ... other items
    ]
}
```

- **Errors**:
    - `403 Forbidden`: Access denied.
    - `404 Not Found`: Order not found.
    - `500 Internal Server Error`: Server error.

#### 3.4. Delete Order

- **URL**: `/api/orders/:id`
- **Method**: `DELETE`
- **Description**: Deletes an order by ID.
- **Authentication**: Requires admin privileges.

**Headers**:

```
Authorization: Bearer <admin_token>
```

**Response**:

- **Success (200 OK)**:
    ```json
    {
        "message": "Tilaus poistettu onnistuneesti"
    }
    ```
- **Errors**:
    - `403 Forbidden`: Access denied.
    - `404 Not Found`: Order not found.
    - `500 Internal Server Error`: Server error.

## General Notes

- **Error Handling**: The API returns appropriate HTTP status codes (e.g., 200, 201, 400, 401, 403, 404, 500) along with error messages in JSON format.

**Example Error Response**:

```json
{
    "message": "Pääsy evätty"
}
```

### Authentication and Authorization:

- **Admin Privileges**: Required for certain endpoints, indicated in the documentation.
- **User Roles**: Users can perform basic operations; admins have elevated privileges.

### File Uploads:

- **Image Uploads**: Item images are uploaded using `multipart/form-data`.
- **Image Retrieval**: Images can be accessed via `http://localhost:3000/uploads/<image_filename>`.

### Date and Time:

- All dates and times are in ISO 8601 format (UTC).

## Database Schema

### Users:

```sql
CREATE TABLE Users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Categories:

```sql
CREATE TABLE Categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
```

### Items:

```sql
CREATE TABLE Items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);
```

### FeaturedItems:

```sql
CREATE TABLE FeaturedItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(id)
);
```

### Orders:

```sql
CREATE TABLE Orders (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_address TEXT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### OrderItems:

```sql
CREATE TABLE OrderItems (
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
);
```

## Example Requests

### Register a New User

- **POST** `/api/users/register`

**Request Body**:

```json
{
    "username": "new_user",
    "password": "password123",
    "email": "new_user@example.com"
}
```

### Login

- **POST** `/api/users/login`

**Request Body**:

```json
{
    "username": "new_user",
    "password": "password123"
}
```

**Response**:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### Get All Items

- **GET** `/api/items`

### Add a New Item (Admin)

- **POST** `/api/items`

**Headers**:

```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data**:

- `name`: "New Item"
- `description`: "Description of the new item"
- `price`: 49.99
- `category_id`: 2
- `image`: [Upload image file]

### Place an Order

- **POST** `/api/orders`

**Request Body**:

```json
{
    "customer_name": "Jane Doe",
    "customer_email": "jane.doe@example.com",
    "customer_address": "456 Avenue, City, Country",
    "items": [
        {
            "item_id": 5,
            "quantity": 1,
            "price_at_purchase": 99.99
        }
    ]
}
```
