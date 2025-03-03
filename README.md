# Full Stack Authentication App - Milestone 2

## Project Structure
```
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection setup
│   ├── controllers/
│   │   └── userController.js # User authentication logic
│   ├── middleware/
│   │   └── errorMiddleware.js # Error handling middleware
│   ├── models/
│   │   └── userModel.js    # User database model
│   ├── routes/
│   │   └── userRoutes.js   # User API routes
│   ├── server.js           # Express server with CORS and routes
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Login.jsx   # Login form component
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
└── .gitignore             # Git ignore configuration
```

## Features Implemented
- [x] Express backend server setup with CORS enabled
- [x] MongoDB database connection
- [x] User model and authentication routes
- [x] Error handling middleware
- [x] React frontend with Vite and Tailwind CSS
- [x] Login component with form handling
- [x] Frontend-backend integration
- [x] Git configuration for development

## Technologies Used
- **Backend**
  - Node.js
  - Express
  - MongoDB
  - CORS middleware

- **Frontend**
  - React
  - Vite
  - Tailwind CSS

## Setup Instructions
1. **Backend Setup**
   ```bash
   cd backend
   npm install
   node server.js    # Server runs on port 5002
   ```
   Server will run on http://localhost:5002

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Development server will start on http://localhost:5173

## API Endpoints
- GET `/api/test` - Test endpoint to verify server status
- POST `/api/users/login` - User login endpoint
- POST `/api/users/register` - User registration endpoint

## Next Steps
- Implement authentication logic in backend
- Add user registration functionality
- Implement protected routes
- Add session management
- Enhance error handling