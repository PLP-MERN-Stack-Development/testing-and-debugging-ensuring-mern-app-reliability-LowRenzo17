# MERN Stack Testing Demo Application

A comprehensive demonstration of testing strategies for modern web applications, featuring React, TypeScript, Vite, and Supabase.

## Overview

This project demonstrates beginner-friendly testing practices including:

- ✅ **Unit Testing** with Vitest and React Testing Library
- ✅ **Integration Testing** with Supabase
- ✅ **Code Coverage** reporting
- ✅ **Best Practices** for writing maintainable tests

## Features

- 📝 Todo application with full CRUD operations
- 🧪 18+ test cases covering components and services
- 📊 Test coverage reporting
- 🎨 Modern UI with Tailwind CSS
- 🔒 Supabase backend with RLS policies

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Supabase account

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database migration has been applied automatically. Your Supabase instance should have a `todos` table ready to use.

### 4. Run Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Generate coverage report
npm run test:coverage

# Open test UI
npm run test:ui
```

### 5. Start Development Server

```bash
npm run dev
```

## Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   └── TodoList.tsx
│   ├── lib/                 # Utilities and configs
│   │   └── supabase.ts
│   ├── utils/               # Helper functions
│   │   └── todoService.ts
│   ├── tests/               # Test files
│   │   ├── unit/            # Unit tests
│   │   │   ├── TodoItem.test.tsx
│   │   │   ├── TodoForm.test.tsx
│   │   │   └── TodoList.test.tsx
│   │   ├── integration/     # Integration tests
│   │   │   └── todoService.integration.test.ts
│   │   └── setup.ts         # Test configuration
│   └── App.tsx              # Main application
├── vitest.config.ts         # Vitest configuration
├── TESTING_GUIDE.md         # Comprehensive testing guide
└── README.md
```

## Testing Strategy

### Unit Tests (18 tests)

Located in `src/tests/unit/`:

- **TodoItem.test.tsx**: Tests individual todo item rendering and interactions
- **TodoForm.test.tsx**: Tests form input, validation, and submission
- **TodoList.test.tsx**: Tests list rendering and different states

### Integration Tests

Located in `src/tests/integration/`:

- **todoService.integration.test.ts**: Tests real database operations with Supabase

### Test Coverage Goals

- ✅ **70%+** overall coverage
- ✅ All critical user flows tested
- ✅ Edge cases and error handling covered

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript compiler check
npm test                 # Run tests in watch mode
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests only
```

## Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database

### Testing
- **Vitest** - Test framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers

## Learning Resources

### For Beginners

1. Start with the **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - comprehensive guide with examples
2. Read through the test files to understand patterns
3. Try writing your own tests for new features
4. Run tests frequently to see immediate feedback

### Key Testing Concepts

- **Arrange-Act-Assert**: Organize your tests clearly
- **Test Behavior, Not Implementation**: Focus on what users see
- **Keep Tests Independent**: Each test should run standalone
- **Use Meaningful Names**: Describe what the test verifies

## Common Commands

```bash
# Run all tests once
npm run test:unit

# Watch mode (auto-rerun on changes)
npm test

# See which code is tested
npm run test:coverage

# Debug with UI
npm run test:ui

# Run specific test file
npx vitest src/tests/unit/TodoItem.test.tsx

# Run tests matching pattern
npx vitest --grep "renders todo"
```

## Debugging Tests

### View rendered output
```typescript
import { screen } from '@testing-library/react';
screen.debug(); // Prints current DOM
```

### Run single test
```typescript
it.only('this test runs alone', () => {
  // ...
});
```

### Check available queries
```typescript
screen.logTestingPlaygroundURL();
```

## Best Practices Demonstrated

1. ✅ **Test IDs**: Using `data-testid` for reliable element selection
2. ✅ **User Events**: Simulating real user interactions
3. ✅ **Async Testing**: Properly handling async operations
4. ✅ **Mock Functions**: Testing callbacks with `vi.fn()`
5. ✅ **Accessibility**: Using semantic queries like `getByRole`
6. ✅ **Clean Up**: Properly cleaning test data
7. ✅ **Error Handling**: Testing error states

## Database Schema

### `todos` table

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | uuid      | Primary key                    |
| title      | text      | Todo item text                 |
| completed  | boolean   | Completion status              |
| created_at | timestamp | Creation timestamp             |
| user_id    | uuid      | Optional user association      |

## Security

The application uses Row Level Security (RLS) with public access policies for demonstration purposes. In production, you should:

- Implement authentication
- Restrict policies to authenticated users
- Add user_id checks in policies

## Contributing

This is an educational project. Feel free to:

1. Add more test cases
2. Implement new features with tests
3. Improve test coverage
4. Add end-to-end tests

## Troubleshooting

### Tests fail with "Cannot connect to Supabase"

Make sure your `.env` file has correct credentials:
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Integration tests fail

Check that:
- Your Supabase project is running
- The `todos` table exists
- RLS policies are correctly set up

### Tests timeout

Increase the timeout in your test:
```typescript
it('slow test', async () => {
  // ...
}, 10000); // 10 second timeout
```

## License

MIT

## Support

For detailed testing guidance, see **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**
