
# Reports Application Backend

This is a NestJS backend for the Reports Application, providing authentication, user management, and report functionality.

## Installation

```bash
# Install dependencies
npm install

# Set up your .env file
# Make sure to configure your database connection

# Start the development server
npm run start:dev
```

## Available Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Log in and get JWT token
- POST /api/auth/logout - Log out (client-side only)

### Users
- GET /api/users/:id - Get user by ID
- PATCH /api/users/:id - Update user

### Reports
- GET /api/reports - Get all reports for the current user
- GET /api/reports/:id - Get a specific report
- POST /api/reports - Create a new report
- PATCH /api/reports/:id - Update a report
- DELETE /api/reports/:id - Delete a report

## Database Setup

This application uses PostgreSQL. You need to create a database named `reports_app` (or whatever you configured in the .env file).

The tables will be automatically created when you start the application with `synchronize: true` in development mode.
