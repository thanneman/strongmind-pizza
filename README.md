# StrongMind Pizza Manager

A web application for managing pizzas and their toppings. Built with Next.js and Supabase.

## Application Overview

This application allows users to:
- Manage pizza toppings (create, edit, delete)
- Create custom pizzas using available toppings
- Edit existing pizzas
- Delete pizzas

## Technical Choices

- **Next.js**: Chosen for its built-in routing, server-side rendering capabilities, and excellent developer experience
- **Supabase**: Provides a robust backend with real-time capabilities and built-in authentication
- **TailwindCSS**: Enables rapid UI development with utility-first CSS
- **Jest & React Testing Library**: Ensures reliability through comprehensive testing

## Development Setup

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Supabase account and project

### Environment Variables
Create a `.env.local` file in the root directory with:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation
# Install dependencies
npm install

# Start development server
npm run dev
The application will be available at http://localhost:3000.

### Testing
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage