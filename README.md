## Project Overview

This React application integrates with the Reqres API to perform user management functions. It includes authentication, user listing with pagination, and CRUD operations.

### Features Implemented

1. **Authentication**

1. Login screen with email and password fields
2. Token storage in localStorage
3. Protected routes for authenticated users



2. **User Management**

1. Paginated list of users with avatars
2. Search functionality to filter users by name or email
3. Edit user information
4. Delete user with confirmation dialog



3. **UI/UX**

1. Responsive design that works on mobile and desktop
2. Loading states for better user experience
3. Error handling with appropriate messages
4. Toast notifications for success/error feedback





### Technical Implementation

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for authentication
- **Routing**: Next.js App Router
- **API Communication**: Fetch API with proper error handling


## How to Run the Project

1. Clone the repository
2. Install dependencies:

```plaintext
npm install
```


3. Start the development server:

```plaintext
npm run dev
```


4. Open your browser to [http://localhost:3000](http://localhost:3000)


## Login Credentials

- Email: [eve.holt@reqres.in](mailto:eve.holt@reqres.in)
- Password: cityslicka


## Project Structure

- `/app`: Next.js app router pages
- `/components`: UI components
- `/lib`: Utility functions, API calls, and context providers


## Additional Notes

- The application uses the Reqres API which is a mock REST API
- All CRUD operations are simulated (the API doesn't actually update or delete users)
- The search functionality works client-side for better user experience
- The application includes proper error handling and loading states


This implementation satisfies all the requirements in the assignment, including the bonus points for search functionality and routing.
