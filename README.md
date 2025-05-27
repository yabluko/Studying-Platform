# Studying Platform

A modern web application for online learning and course management.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/studying-platform.git
cd studying-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/studying_platform"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

### `/src` Directory Structure

- `/actions` - Server actions for data mutations and API calls
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/config` - Configuration files and constants
- `/helpers` - Utility functions and helper methods
- `/lib` - Core libraries and shared functionality
- `/models` - TypeScript interfaces and type definitions
- `middleware.ts` - Next.js middleware for authentication and routing

### Key Components

- `HomeContent` - Main dashboard component showing enrolled courses and progress
- `Card` - Course card component for displaying course information
- `CourseTable` - Table component for displaying instructor courses
- `ProfileContent` - User profile management component

### Authentication

The application uses NextAuth.js for authentication. The authentication flow includes:
- Email/password login
- Session management
- Protected routes
- Role-based access control

### API Routes

API routes are organized under `/app/api` and include:
- User management
- Course enrollment
- Progress tracking
- File uploads

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Update database schema

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
