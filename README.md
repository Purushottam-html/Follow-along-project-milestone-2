# Full Stack Authentication App - Milestone 2

## Project Structure
```
├── backend/
│   ├── config/
│   │   ├── db.js           # MongoDB connection setup
│   │   └── cloudinary.js   # Cloudinary configuration
│   ├── controllers/
│   │   ├── userController.js  # User & cart management logic
│   │   └── productController.js # Product management logic
│   ├── middleware/
│   │   ├── errorMiddleware.js  # Error handling middleware
│   │   └── uploadMiddleware.js # File upload handling
│   ├── models/
│   │   ├── userModel.js    # User & cart schema
│   │   └── productModel.js # Product schema
│   ├── routes/
│   │   ├── userRoutes.js   # User & cart API routes
│   │   └── productRoutes.js # Product API routes
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx         # Login form component
│   │   │   ├── SignUp.jsx        # Registration form component
│   │   │   ├── HomePage.jsx      # Homepage with products
│   │   │   ├── ProductCard.jsx   # Product display component
│   │   │   ├── ProductForm.jsx   # Product creation form
│   │   │   ├── EditProduct.jsx   # Product editing form
│   │   │   ├── ProductDetails.jsx # Product info page
│   │   │   ├── UserProducts.jsx  # User's products page
│   │   │   ├── Cart.jsx         # Shopping cart page
│   │   │   ├── Profile.jsx      # User profile page
│   │   │   ├── AddressForm.jsx  # Address input form
│   │   │   └── NavbarComponent.jsx # Navigation bar
│   │   ├── App.jsx         # Main component & routing
│   │   └── main.jsx        # Application entry
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
└── .gitignore             # Git ignore configuration
```

## Features Implemented
- [x] User Authentication & Profile
  - [x] Secure login and registration system
  - [x] Password encryption with bcrypt
  - [x] Profile image upload using Cloudinary
  - [x] User profile page with personal information
  - [x] Multiple address management system
  
- [x] Product Management
  - [x] Product creation with image upload
  - [x] Product editing and deletion
  - [x] User-specific product listing
  - [x] Detailed product view page
  - [x] Product search and filtering

- [x] Shopping Cart System
  - [x] Add to cart functionality
  - [x] Cart quantity management
  - [x] Real-time price updates
  - [x] Persistent cart storage

- [x] UI/UX Features
  - [x] Responsive navigation bar
  - [x] Form validation and error handling
  - [x] Toast notifications for user feedback
  - [x] Protected routes for authenticated users
  - [x] Responsive design for all screen sizes

- [x] Backend Infrastructure
  - [x] Express server with CORS enabled
  - [x] MongoDB integration with Mongoose
  - [x] Cloudinary integration for image storage
  - [x] Comprehensive error handling
  - [x] RESTful API endpoints

## Technologies Used
- **Backend**
  - Node.js
  - Express
  - MongoDB
  - CORS middleware
  - bcrypt

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
- POST `/api/users/login` - User login endpoint
- POST `/api/users/register` - User registration endpoint

## Next Steps
- Implement authentication logic in backend
- Add user registration functionality
- Implement protected routes
- Add session management
- Enhance error handling

---
### Milestone 3 Summary
In this milestone, we expanded on the initial backend setup by integrating MongoDB for database management. We introduced a user authentication system, including login and registration endpoints. Error handling middleware was added to improve robustness. The frontend remains integrated with the backend, ensuring smooth user interactions. Moving forward, we aim to implement protected routes and session management for enhanced security.

---
### Milestone 4 Summary
In this milestone, we enhanced the user authentication system with the following key achievements:

1. **User Model Enhancement**
   - Extended the user schema to include profile image storage
   - Added validation for file uploads

2. **User Controller Updates**
   - Implemented user registration with file upload support
   - Added profile image handling in the registration process
   - Enhanced error handling for file operations

3. **Multer Configuration**
   - Configured Multer middleware for handling file uploads
   - Set up file storage and filtering for image uploads
   - Implemented file size and type restrictions
   - Added error handling for upload failures

---
### Milestone 5 Summary
In this milestone, we enhanced the user interface by implementing a complete user registration system with form validation:

1. **SignUp Component Implementation**
  - Created a new SignUp page with form fields for name, email, and password
  - Added client-side form validation for all input fields
  - Implemented password confirmation matching
  - Integrated with the backend registration API endpoint

2. **Form Validation Features**
  - Email format validation
  - Password strength requirements (minimum 6 characters)
  - Real-time validation feedback
  - Error message display for failed submissions

3. **Navigation Implementation**
  - Added React Router for page navigation
  - Implemented seamless switching between Login and SignUp pages
  - Added navigation links for better user experience
  - Redirect to login after successful registration

These enhancements provide a more robust and user-friendly authentication system, ensuring data validity before submission to the backend.

---
### Milestone 6 Summary
In this milestone, we enhanced the security of the application by implementing password encryption:

1. **Password Security Implementation**
   - Integrated bcrypt for secure password hashing
   - Implemented pre-save middleware for automatic password encryption
   - Added password comparison method for secure login verification

2. **User Authentication Enhancements**
   - Updated login system to use secure password comparison
   - Implemented proper error handling for authentication failures
   - Enhanced user data protection by not exposing sensitive information

3. **Data Security Improvements**
   - Passwords are now stored as encrypted hashes in the database
   - Implemented secure password comparison during login
   - Enhanced error messages for better security and user experience

These security enhancements ensure that user data is stored and handled securely, following industry best practices for password management and user authentication.

---
### Milestone 7 Summary
In this milestone, we implemented a complete login system with secure password verification:

1. **Login Endpoint Implementation**
   - Created secure login endpoint at `/api/users/login`
   - Added user verification against database records
   - Implemented proper error handling for non-existent users

2. **Password Verification System**
   - Integrated bcrypt for secure password comparison
   - Implemented password hash comparison with stored credentials
   - Added secure error messages to prevent user enumeration

3. **Login Response Handling**
   - Structured user data response excluding sensitive information
   - Added success messages for successful authentication
   - Implemented proper HTTP status codes for different scenarios

These enhancements complete our authentication system with secure login functionality, proper error handling, and secure password verification.

---
### Milestone 8 Summary
In this milestone, we implemented a reusable card component and homepage layout:

1. **Card Component Creation**
   - Created reusable ProductCard component for displaying product information
   - Implemented props for dynamic product data (name, image, price, etc.)
   - Added interactive features like hover effects and stock status indicators

2. **Homepage Layout Implementation**
   - Set up responsive grid layout using Tailwind CSS
   - Implemented array mapping to display multiple product cards
   - Created sample product data structure for testing

3. **Dynamic Data Handling**
   - Used React props for flexible data passing
   - Maintained consistent card design across all products
   - Added visual indicators for special statuses (New, Discount)

These implementations provide an organized and visually appealing way to showcase products while maintaining code reusability and consistency.

---
### Milestone 9 Summary
In this milestone, we implemented a product creation form with multi-image upload capability:

1. **Product Form Implementation**
   - Created a comprehensive form for product data entry
      - Implemented multiple image upload functionality
   - Added form validation for required fields
   - Integrated with existing routing system

2. **Form Field Features**
   - Product name and description inputs
   - Price input with number validation
   - Category selection dropdown
   - Multiple image upload with preview support

3. **User Interface Enhancements**
   - Responsive form layout using Tailwind CSS
   - Clear input labels and placeholders
   - Visual feedback for form validation
   - Consistent styling with existing components

This implementation provides a user-friendly interface for adding new products to the system, with support for multiple images and comprehensive product details.

---
### Milestone 10 Summary
In this milestone, we implemented the backend product schema and API endpoint for storing product details:

1. **Product Schema Implementation**
   - Created MongoDB schema for products with validation
   - Required fields: name, description, price, imageUrl
   - Added data type validation for each field
   - Implemented URL validation for image links
   - Added automatic timestamp for creation date

2. **Product API Endpoint Creation**
   - Implemented POST endpoint at `/api/products`
   - Added validation middleware for product data
   - Created error handling for validation failures
   - Integrated with MongoDB for data persistence

3. **Backend Integration**
   - Connected product routes with Express server
   - Implemented error handling for product operations
   - Added success/error response formatting
   - Ensured proper HTTP status codes for responses

This implementation establishes a robust backend foundation for product management, ensuring data integrity through validation and proper error handling.

---
### Milestone 11 Summary
In this milestone, we implemented dynamic product display by connecting the frontend to our product API:

1. **Backend API Enhancement**
   - Created a GET endpoint at `/api/products` to fetch all products
   - Implemented logic to retrieve products from MongoDB
   - Added proper error handling and response formatting

2. **Frontend Integration**
   - Updated HomePage component to fetch products from the API
   - Implemented useEffect hook for data fetching on component mount
   - Integrated error handling for failed API requests

3. **Dynamic Product Display**
   - Modified ProductCard component to match MongoDB data structure
   - Updated component props to use MongoDB field names
   - Implemented dynamic rendering of product data from the API

These implementations create a seamless flow of data from the database to the user interface, allowing for dynamic display of products that were added through the product creation form.

---
### Milestone 12 Summary
In this milestone, we implemented user-specific product filtering and display:

1. **Backend Enhancement**
   - Added userEmail field to Product schema
   - Created new endpoint `/api/products/user/:email` for filtering products by user
   - Updated product creation to include user association
   - Implemented proper data validation for user-product relationships

2. **Frontend Components**
   - Created UserProducts component for displaying user's products
   - Updated ProductForm to include user association
   - Modified navigation to show user-specific actions
   - Added protected routes for user-specific features

3. **User Experience Improvements**
   - Implemented conditional rendering based on user authentication
   - Added My Products section in navigation
   - Enhanced authentication state management
   - Added logout functionality with proper cleanup

These implementations enable users to manage their own products while maintaining a clear separation between personal and general product listings.


### Milestone 13 Summary  
In this milestone, we implemented the ability to edit and delete products, providing users with greater control over their listings.

#### 1. Backend Enhancements  
- Added an **update endpoint** to modify existing product details in MongoDB.  
- Implemented a **delete endpoint** to allow users to remove products.  
- Integrated **Cloudinary** for optional image updates.  
- Updated **product routes** to support edit and delete operations.  

#### 2. Frontend Enhancements  
- Created an **EditProduct** component with a **pre-filled form** for easy modifications.  
- Added an **edit button** to the **ProductCard** component, allowing users to modify their products.  
- Implemented a **delete button** with a **confirmation dialog** for safe product removal.  
- Updated the **UserProducts** component to manage edit and delete functionality.  
- Configured routing in **App.jsx** to include an **edit product page**.  

#### 3. User Experience Improvements  
- When editing a product, the form is **pre-filled** with existing details.  
- Users can modify **product name, description, price, and images**.  
- Image updates are **optional**; the previous image is retained if unchanged.  
- **Deleting a product requires confirmation**, ensuring accidental deletions are avoided.  

With these enhancements, users can now efficiently manage their product listings, improving overall usability and flexibility.



### Milestone 14 Summary  
In this milestone, we implemented the ability to delete products, allowing users to remove their listings efficiently.

#### 1. Backend Enhancements  
- Added a **delete endpoint** to remove products from MongoDB using their unique ID.  
- Implemented **proper error handling** for invalid or non-existent product IDs.  
- Updated **product routes** to include the delete operation.  

#### 2. Frontend Enhancements  
- Added a **delete button** to the **ProductCard** component.  
- Implemented a **confirmation dialog** before deletion to prevent accidental removals.  
- Updated the **UserProducts** component to handle delete requests dynamically.  

#### 3. User Experience Improvements  
- Users can now delete their products with a single click.  
- The product list updates **instantly** after deletion for a seamless experience.  
- Implemented **error handling** to notify users if the deletion fails.  

These updates provide users with greater control over their product listings, ensuring a smooth and secure deletion process.



### Milestone 15 Summary  
In this milestone, we implemented a **Navbar component** to improve navigation across the application.

#### 1. Frontend Enhancements  
- Created a **NavBar component** with links to key pages:  
  - **My Products**  
  - **Add Product**  
  - **Cart**  
- Integrated the **Navbar** into all pages for a consistent experience.  
- Implemented **responsive design** to ensure usability across all screen sizes.  

#### 2. User Experience Improvements  
- Users can now **easily navigate** between different sections.  
- The **Navbar remains visible** on all pages for quick access.  
- **Smooth transitions** between pages enhance usability.  

This milestone improves the overall accessibility and structure of the application, making navigation seamless and user-friendly.


### Milestone 16 Summary  
In this milestone, we implemented a **Product Info Page** to display detailed product information and allow users to add items to their cart.  

#### 1. Frontend Enhancements  
- Created a **Product Info Page** to show:  
  - **Product Image**  
  - **Name and Description**  
  - **Price**  
  - **Quantity Selector**  
  - **Add to Cart Button**  
- Ensured the page is **responsive** and accessible on all devices.  

#### 2. User Experience Improvements  
- Users can now view **detailed product information** before purchasing.  
- Added a **quantity selector** to allow users to choose the desired amount.  
- The **Add to Cart button** simplifies the shopping experience.  

This milestone enhances the product browsing experience, making it easier for users to view product details and add items to their cart. 🛒  


### Milestone 17 Summary  
In this milestone, we implemented the **Add to Cart functionality**, allowing users to store selected products in their cart.  

#### 1. Backend Enhancements  
- Updated the **User Schema** to include a **cart** field.  
- Created an **API endpoint** to:  
  - Receive product details from the frontend.  
  - Store the product in the user's cart in the database.  
- Ensured proper **data validation and security** for cart operations.  

#### 2. Frontend Enhancements  
- Integrated the **Add to Cart button** on the Product Info Page.  
- Sent product details to the backend when users add items to the cart.  
- Provided **real-time feedback** using toast notifications.  

#### 3. User Experience Improvements  
- Users can now **add products to their cart** and access them later.  
- The **cart persists in the database**, ensuring that items remain available even after page reloads.  
- **Visual feedback** helps users confirm successful additions to the cart.  

This milestone lays the foundation for a **fully functional shopping cart**, improving the e-commerce experience within the application. 🛍️  


### Milestone 18 Summary  
In this milestone, we implemented the **Cart Page Backend Integration**, enabling users to view their cart contents dynamically.  

#### 1. Backend Enhancements  
- Created an **API endpoint** to:  
  - Retrieve all cart items associated with a user’s email.  
  - Send cart data to the frontend for display.  
- Ensured **secure access** so only authenticated users can fetch their cart data.  

#### 2. Frontend Enhancements  
- Integrated the **Cart Page** to fetch and display cart items from the backend.  
- Displayed product details, including:  
  - **Images, names, prices, and selected quantities.**  
- Implemented **real-time updates**, ensuring changes reflect instantly.  

#### 3. User Experience Improvements  
- Users can now **view all items in their cart** with accurate details.  
- Ensured **seamless data retrieval**, making the cart experience smooth.  
- Improved usability by providing **a structured and clear cart display**.  

With this milestone, the cart system is now fully functional, allowing users to manage their shopping experience efficiently. 🛒✨  


### Milestone 19 Summary  
In this milestone, we implemented the **Cart Page UI** and added functionality to update product quantities dynamically.  

#### 1. Frontend Enhancements  
- Created a **Cart Page** to display all products inside the cart.  
- Added **+ and - buttons** to allow users to increase or decrease product quantity.  
- Implemented real-time updates to reflect changes in quantity.  

#### 2. Backend Enhancements  
- Created a **new backend endpoint** to handle quantity updates for cart items.  
- Integrated the frontend with the backend to send update requests when quantity changes.  
- Ensured database consistency by updating the cart collection accordingly.  

#### 3. User Experience Improvements  
- Users can now **modify product quantities** directly from the cart.  
- The total price updates dynamically as quantity changes.  
- Implemented **error handling** for edge cases like exceeding available stock.  

This milestone improves the cart functionality, making it more interactive and user-friendly.


### Milestone 20 Summary  
In this milestone, we implemented the **Profile Page** and created a backend endpoint to fetch user details.  

#### 1. Backend Enhancements  
- Created a **new endpoint** to retrieve user data based on their email.  
- Fetched and returned **profile details** such as name, email, profile picture, and addresses.  

#### 2. Frontend Enhancements  
- Developed a **Profile Page UI** to display user information.  
- Displayed **profile photo, name, and email** in a structured layout.  
- Added a section for **addresses**, with an **"Add Address"** button for new entries.  
- If no address exists, displayed **"No address found"** for better user feedback.  

#### 3. User Experience Improvements  
- Users can now **view their profile details** in a dedicated section.  
- Profile information is fetched dynamically from the backend.  
- The **"Add Address"** button allows seamless navigation to the address form.  

This milestone enhances the user experience by providing a structured **profile management system**.  


### Milestone 21 Summary  
In this milestone, we implemented the **Address Form Page**, allowing users to input and manage their addresses.  

#### 1. Frontend Enhancements  
- Created a **new Address Form page** for users to input their address details.  
- Included form fields for:  
  - **Country**  
  - **City**  
  - **Address Line 1 & 2**  
  - **ZIP Code**  
  - **Address Type (Home/Work/Other)**  
- Implemented a **state management system** to store user input.  

#### 2. Navigation & Integration  
- Clicking the **"Add Address"** button in the **Profile Page** now redirects to the Address Form.  
- Users can **submit** or **cancel** address entry seamlessly.  

#### 3. User Experience Improvements  
- Ensured **form validation** for proper address input.  
- Smooth **navigation back to the profile page** after submission.  
- **Responsive UI** for usability across different screen sizes.  

This milestone enables users to **easily input and manage addresses**, preparing for future database integration.  



### Milestone 22 Summary  
In this milestone, we implemented the **backend functionality** for storing user addresses in the database.  

#### 1. Backend Enhancements  
- Created a **new POST endpoint (`/api/users/address`)** to receive and store addresses.  
- Updated the **User Schema** to include an **address array** for storing multiple addresses.  
- Implemented **error handling** and validation for address submissions.  

#### 2. Frontend Integration  
- The **Address Form** now sends data to the backend upon submission.  
- Added functionality to **store addresses inside the user profile**.  
- Integrated automatic **navigation back to the profile page** after saving an address.  

#### 3. User Experience Improvements  
- Users can now **add multiple addresses** to their profile.  
- Address details are **persisted in the database**, ensuring data retention.  
- **Smooth and seamless process** for managing addresses.  

This milestone completes the **address management system**, enabling users to store their addresses efficiently.  

### Milestone 23 Summary  
In this milestone, we began implementing the **order placement functionality** by adding address selection and preparing the database schema for orders.  

#### 1. Frontend Enhancements  
- Added a **"Place Order" button** inside the cart page.  
- Created a **Select Address page**, displaying all saved addresses.  
- Implemented an option to **choose a delivery address** before placing an order.  

#### 2. Backend Enhancements  
- Created a **new backend endpoint** to fetch and return all user addresses.  
- Updated **navigation flow**, allowing users to proceed from the cart to address selection.  
- Designed the **Order Schema** to store order details in MongoDB.  

#### 3. User Experience Improvements  
- Users can now **select an address** for order delivery.  
- Orders will be structured properly with a **dedicated order schema**.  
- Improved checkout process by ensuring address selection before order confirmation.  

This milestone lays the foundation for the **order placement system**, ensuring a smooth and structured checkout experience.  


### Milestone 24 Summary  
In this milestone, we implemented the **Order Confirmation Page**, allowing users to review their order details before placing it.  

#### 1. Frontend Enhancements  
- Created an **Order Confirmation page** displaying:  
  - **List of products** being ordered.  
  - **Selected delivery address** for the order.  
  - **Total price calculation** for the cart.  
- Added a **"Place Order" button** to confirm the purchase.  

#### 2. User Experience Improvements  
- Users can now **review their order** before finalizing it.  
- Ensures **accuracy in order details** (products, address, and pricing).  
- Provides a **clear and structured checkout flow**.  

This milestone improves the **user's checkout experience**, ensuring clarity and confidence before placing an order.  


### Milestone 25 Summary  
In this milestone, we implemented the **Place Order backend functionality**, allowing users to finalize their orders and store them in the database.  

#### 1. Backend Enhancements  
- Created a **new API endpoint** to handle order placement:  
  - Receives **products, user details, and selected address**.  
  - Retrieves the **user’s ID** using their email.  
  - Stores **each product as a separate order** with the same address.  
  - Saves order details in the **MongoDB order collection** using the **Order schema**.  

#### 2. Order Processing Logic  
- Ensures that **each order entry is linked to a specific user**.  
- Stores **multiple products as separate orders** for better tracking.  
- Validates and processes the request to prevent errors.  

This milestone enables the **order placement feature**, ensuring that user purchases are properly stored and managed.  


### Milestone 26 Summary  
In this milestone, we implemented a **backend endpoint to retrieve all user orders**, enabling users to view their past purchases.  

#### 1. Backend Enhancements  
- Created a **new API endpoint** to fetch user orders:  
  - Accepts the **user’s email** as a parameter.  
  - Retrieves the **user’s ID** from the database.  
  - Fetches all orders associated with that user from the **orders collection**.  
  - Returns the list of orders in the response.  

#### 2. Order Retrieval Logic  
- Ensures that **orders are linked to the correct user**.  
- Fetches **all orders placed by the user** in one request.  
- Provides structured order data, including **products, address, and order status**.  

This milestone enables users to **view their order history**, improving the shopping experience and allowing better order management.  



### Milestone 27 Summary  
In this milestone, we implemented a **frontend page for My Orders**, allowing users to view their order history.  

#### 1. Frontend Enhancements  
- Created a **My Orders page** to display all past orders.  
- Integrated with the **backend order retrieval endpoint** to fetch user orders.  
- Sent a **GET request with the user’s email** to retrieve their order details.  
- Displayed **all user orders**, including product details, order status, and delivery address.  

#### 2. Navigation Improvements  
- Added a **"My Orders" link** in the Navbar for easy access.  
- Ensured the page is accessible only to **authenticated users**.  

This milestone enhances the user experience by providing a **dedicated section to track order history**, improving order management and transparency.  


### Milestone 28 Summary  
In this milestone, we implemented the **order cancellation feature**, allowing users to cancel their placed orders.  

#### 1. Frontend Enhancements  
- Added a **"Cancel Order" button** for each order in the **My Orders** page.  
- Ensured that the **cancel button is only visible for pending orders**.  
- Updated the order status dynamically after cancellation.  

#### 2. Backend Enhancements  
- Created a **backend endpoint** to handle order cancellations.  
- Received the **order ID** from the frontend and updated the status to **"Canceled"** in the database.  
- Ensured proper validation to prevent cancellation of already processed orders.  

#### 3. User Experience Improvements  
- Users can now **cancel pending orders** with a single click.  
- Improved order tracking with **status updates** for each order.  

This milestone enhances order management by giving users the flexibility to **cancel orders when necessary**, ensuring a smooth and user-friendly experience.  
