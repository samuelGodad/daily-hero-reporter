# Daily Hero Reporter

A full-stack application for managing daily reports, built with Vue.js, NestJS, and PostgreSQL.

## Project Overview

Daily Hero Reporter is a web application that allows users to:
- Register and login securely
- Create and manage daily reports
- View and track report history
- Manage user profiles

## Tech Stack

### Frontend
- Vue.js 3
- Vite
- Vuex for state management
- Tailwind CSS for styling
- TypeScript

### Backend
- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- Docker



## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/samuelGodad/daily-hero-reporter.git
cd daily-hero-reporter
```

2. **Start the database**
```bash
cd backend
docker compose up -d
```

3. **Start the backend server**
```bash
cd backend
npm install
npm run start:dev
```

4. **Start the frontend application**
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

## Detailed Setup Instructions

### Backend Setup
See [backend README](backend/README.md) for detailed backend setup instructions.

### Frontend Setup
See [frontend README](frontend/README.md) for detailed frontend setup instructions.

## Features

### User Management
- User registration and authentication
- JWT-based secure login
- User profile management

### Report Management
- Create new daily reports
- View report history
- Edit existing reports
- Delete reports
- Filter and search reports

### Security Features
- JWT authentication
- Password hashing
- Protected routes
- CORS configuration

## Development

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write unit tests for new features
- Follow Git commit conventions

### Testing
```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Deployment

### Production Build
```bash
# Build backend
cd backend
npm run build
npm run start:prod

# Build frontend
cd frontend
npm run build
```

### Docker Deployment
The application can be deployed using Docker:
```bash
docker compose -f docker-compose.yml up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues
1. **Database Connection Issues**
   - Ensure Docker is running
   - Check database container status
   - Verify environment variables

2. **API Connection Issues**
   - Verify backend service is running
   - Check CORS configuration
   - Validate API endpoints

3. **Frontend Issues**
   - Clear browser cache
   - Check console for errors
   - Verify environment variables

## Support

For support:
- Create an issue in the repository
- Contact the development team
- Check the documentation in each component's README

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NestJS team for the amazing framework
- Vue.js team for the frontend framework
- All contributors and maintainers
