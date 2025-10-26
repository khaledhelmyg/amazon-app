# Amazon App (Full Stack E-Commerce Project)

This repository contains a full-stack e-commerce application with separate frontend and backend projects.

## Project Structure

- **e-com-front/**: React.js frontend for the e-commerce store
- **e-commerce-back/**: Node.js/Express backend API with MongoDB

---

## Frontend (`e-com-front`)

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Main dependencies: React, React Router, Bootstrap, Axios, PayPal integration, MDB React UI Kit, React Toastify, and more
- Features:
  - Product listing, search, and details
  - Shopping cart and checkout flow
  - User authentication and profile management
  - Admin dashboard for managing products, orders, and users
  - Order history and payment integration

### Scripts

- `npm start` — Start the development server (http://localhost:3000)
- `npm run build` — Build for production
- `npm test` — Run tests

See `e-com-front/README.md` for more details.

---

## Backend (`e-commerce-back`)

- Built with Node.js, Express, and MongoDB
- Main dependencies: express, mongoose, bcryptjs, jsonwebtoken, multer, cloudinary, dotenv, slugify
- Features:
  - RESTful API for products, users, orders
  - Authentication and authorization (JWT)
  - File uploads (product images)
  - Admin routes for managing products, orders, and users

### Scripts

- `npm start` — Start the backend server (default: http://localhost:4000)

---

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   - Backend: `cd e-commerce-back && npm install`
   - Frontend: `cd ../e-com-front && npm install`
3. **Configure environment variables**
   - Create a `.env` file in `e-commerce-back` for MongoDB URI, JWT secret, etc.
4. **Run the backend**
   - `npm start` (from root or `e-commerce-back`)
5. **Run the frontend**
   - `cd e-com-front && npm start`

---

## Author

- Khaled Helmy

---

## License

This project is licensed under the ISC License.
