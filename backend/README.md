# Daily Hero Reporter - Backend

This is the backend service for the Daily Hero Reporter application, built with NestJS and PostgreSQL.

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Project Setup

1. **Clone the repository**
```bash
git clone https://github.com/samuelGodad/daily-hero-reporter.git
cd daily-hero-reporter/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the backend directory with the following content:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=reports_app
NODE_ENV=development
```

4. **Start the database**
```bash
docker compose up -d
```
This will start a PostgreSQL container with the following configuration:
- Database name: reports_app
- Username: postgres
- Password: postgres
- Port: 5432

5. **Start the backend server**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected route)

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create a new report
- `GET /api/reports/:id` - Get a specific report
- `PUT /api/reports/:id` - Update a report
- `DELETE /api/reports/:id` - Delete a report

## Database Management

To access the PostgreSQL database directly:
```bash
docker exec -it reports_db psql -U postgres -d reports_app
```

Common PostgreSQL commands:
- `\dt` - List all tables
- `SELECT * FROM users;` - View all users
- `SELECT * FROM reports;` - View all reports

## Troubleshooting

If you encounter issues:

1. **Database Connection Issues**
   - Ensure Docker is running
   - Check if the PostgreSQL container is running: `docker ps`
   - Verify environment variables in `.env` file

2. **Server Issues**
   - Check if the backend server is running
   - Look for error messages in the console
   - Ensure all dependencies are installed

3. **Common Problems**
   - If registration/login stops working, check if the database container is running
   - If you get "connection refused" errors, ensure the database is running
   - If you get "module not found" errors, run `npm install` again

## Development Guidelines

- The backend uses TypeScript and follows NestJS best practices
- All new features should include appropriate tests
- Follow the existing code structure and patterns
- Use proper error handling and validation

## Support

For any issues or questions, please contact the development team or create an issue in the repository.
