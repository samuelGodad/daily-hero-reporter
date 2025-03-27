
# Reports Application

A full-stack application for creating, managing, and tracking reports.

## Project Overview

This Reports application allows users to:
- Create detailed reports with rich content
- Track report history and changes
- Manage user profiles and preferences
- View analytics and insights from report data

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- React Query for data fetching
- React Router for navigation

### Backend
- NestJS (Node.js framework)
- TypeORM for database operations
- PostgreSQL database
- JWT authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Running the Frontend
```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Running the Backend
```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

### Database Setup
The application uses PostgreSQL. You can run it locally or use the provided Docker Compose configuration:

```sh
# From the backend directory
docker-compose up -d
```

## Features

- **User Authentication**: Secure login and registration system
- **Report Creation**: Create detailed reports with structured data
- **Report History**: Track changes and view previous versions
- **User Profiles**: Manage personal information and preferences
- **Analytics**: Gain insights from report data

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Log in and get JWT token

### Reports
- GET /api/reports - Get all reports for the current user
- GET /api/reports/:id - Get a specific report
- POST /api/reports - Create a new report
- PATCH /api/reports/:id - Update a report
- DELETE /api/reports/:id - Delete a report

### Users
- GET /api/users/:id - Get user information
- PATCH /api/users/:id - Update user information

## Development

This project was created with [Lovable](https://lovable.dev).
