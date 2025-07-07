# E-commerce API

A simple e-commerce API built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **User Roles**: Customer and Admin roles with different permissions
- **Product Management**: CRUD operations for products (Admin only)
- **Cart Management**: Add, update, remove items from cart
- **Order Management**: Create orders from cart, view order history
- **Search & Pagination**: Product search by name/category with pagination
- **Basic Frontend**: HTML interface for testing the API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EcommerceAPI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce-api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`
The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Products

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/products` | Get all products with pagination/search | No | - |
| GET | `/api/products/:id` | Get single product | No | - |
| POST | `/api/products` | Create new product | Yes | Admin |
| PUT | `/api/products/:id` | Update product | Yes | Admin |
| DELETE | `/api/products/:id` | Delete product | Yes | Admin |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | Yes |
| POST | `/api/cart/add` | Add item to cart | Yes |
| PUT | `/api/cart/item/:productId` | Update cart item quantity | Yes |
| DELETE | `/api/cart/item/:productId` | Remove item from cart | Yes |
| DELETE | `/api/cart/clear` | Clear cart | Yes |

### Orders

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| POST | `/api/orders` | Create order from cart | Yes | - |
| GET | `/api/orders/my-orders` | Get user's orders | Yes | - |
| GET | `/api/orders/:id` | Get single order | Yes | - |
| GET | `/api/orders` | Get all orders (with pagination) | Yes | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Yes | Admin |

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Products with Search
```bash
GET /api/products?search=laptop&category=electronics&page=1&limit=10
```

### Add to Cart
```bash
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 2
}
```

### Create Order
```bash
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

## Database Models

### User
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: ['customer', 'admin'], default: 'customer')
- `createdAt` (Date)

### Product
- `name` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `category` (String, required)
- `stock` (Number, required, default: 0)
- `image` (String, optional)
- `createdAt` (Date)
- `updatedAt` (Date)

### Cart
- `user` (ObjectId, ref: User, required)
- `items` (Array of cart items)
- `total` (Number, calculated)
- `updatedAt` (Date)

### Order
- `user` (ObjectId, ref: User, required)
- `items` (Array of order items)
- `total` (Number, required)
- `status` (String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
- `shippingAddress` (Object)
- `createdAt` (Date)
- `updatedAt` (Date)

## Features Implemented

✅ **Product Listings**: Public endpoint to fetch products with pagination and search
✅ **Cart Management**: Add, update, remove items from cart
✅ **Order Creation**: Create orders from cart with stock validation
✅ **User Authentication**: JWT-based authentication with register/login
✅ **User Roles**: Customer and Admin roles with different permissions
✅ **JWT Security**: Token-based route protection
✅ **Pagination**: Product listing with page/limit parameters
✅ **Search**: Product search by name and category
✅ **Basic Frontend**: HTML interface for testing API endpoints

## Testing the API

1. Start the server: `npm run dev`
2. Open your browser and go to `http://localhost:3000`
3. Use the frontend interface to test all API endpoints
4. Or use tools like Postman/Insomnia for API testing

## Sample Data

You can create sample products using the admin interface or directly via API:

```bash
# Login as admin first, then create products
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 10,
  "image": "https://example.com/laptop.jpg"
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS enabled for frontend integration

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## License

ISC

# Connect to MongoDB
mongosh

# Switch to your database
use ecommerce-api

# View all collections
show collections

# View all users
db.users.find()

# View all products
db.products.find()

# View all orders
db.orders.find()

# View all carts
db.carts.find()
