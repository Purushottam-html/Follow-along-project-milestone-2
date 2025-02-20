# Full Stack Authentication App - Milestone 2

## Project Structure
```
├── backend/
│   ├── server.js          # Express server with CORS and basic routes
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Login.jsx  # Login form component
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # Frontend dependencies
└── .gitignore            # Git ignore configuration
```

## Features Implemented
- [x] Express backend server setup with CORS enabled
- [x] Basic API endpoint structure (/api/test, /api/login)
- [x] React frontend with Vite and Tailwind CSS
- [x] Login component with form handling
- [x] Frontend-backend integration
- [x] Git configuration for development

## Technologies Used
- **Backend**
  - Node.js
  - Express
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
   npm start
   ```
   Server will run on http://localhost:5000

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Development server will start on http://localhost:5173

## API Endpoints
- GET `/api/test` - Test endpoint to verify server status
- POST `/api/login` - Login endpoint (placeholder implemented)

## Next Steps
- Implement authentication logic in backend
- Add user registration functionality
- Implement protected routes
- Add session management
- Enhance error handling