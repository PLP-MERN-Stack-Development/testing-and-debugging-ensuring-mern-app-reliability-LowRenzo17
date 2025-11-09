# Testing Guide for MERN Stack Applications

This project demonstrates comprehensive testing strategies for modern web applications using React, TypeScript, and Supabase.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Testing Concepts](#testing-concepts)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [Running Tests](#running-tests)
6. [Code Coverage](#code-coverage)
7. [Best Practices](#best-practices)
8. [Debugging Tips](#debugging-tips)

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Supabase account (for integration tests)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Testing Concepts

### What is Testing?

Testing is the process of verifying that your code works as expected. There are different types of tests:

1. **Unit Tests**: Test individual components or functions in isolation
2. **Integration Tests**: Test how different parts of your application work together
3. **End-to-End Tests**: Test the entire application from a user's perspective

### Why Test?

- **Confidence**: Know your code works before deploying
- **Documentation**: Tests describe how your code should behave
- **Refactoring Safety**: Change code without fear of breaking things
- **Bug Prevention**: Catch errors before users do

---

## Unit Testing

Unit tests focus on testing individual components or functions in isolation.

### Testing React Components

#### Example: TodoItem Component Test

Location: `src/tests/unit/TodoItem.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from '../../components/TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
  };

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  it('renders todo item with title', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls onToggle when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const toggleButton = screen.getByTestId('toggle-todo-1');
    await user.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });
});
```

**Key Concepts:**

- `describe()`: Groups related tests together
- `it()`: Defines a single test case
- `expect()`: Makes assertions about your code
- `vi.fn()`: Creates mock functions to track calls
- `render()`: Renders a React component for testing
- `screen`: Provides methods to query the rendered component
- `userEvent`: Simulates user interactions

### Testing Forms

#### Example: TodoForm Component Test

Location: `src/tests/unit/TodoForm.test.tsx`

```typescript
it('clears input after successful submission', async () => {
  const user = userEvent.setup();
  const mockOnAdd = vi.fn();
  render(<TodoForm onAdd={mockOnAdd} />);

  const input = screen.getByTestId('todo-input') as HTMLInputElement;
  await user.type(input, 'Test Todo');
  await user.click(screen.getByTestId('add-todo-button'));

  expect(input.value).toBe('');
});
```

**Testing Forms Checklist:**

- ✅ Input fields accept user input
- ✅ Form validation works correctly
- ✅ Submit handlers are called with correct data
- ✅ Form clears after successful submission
- ✅ Error states are displayed correctly

### Testing Lists and Conditional Rendering

#### Example: TodoList Component Test

Location: `src/tests/unit/TodoList.test.tsx`

```typescript
it('renders loading state when loading prop is true', () => {
  render(
    <TodoList
      todos={[]}
      onToggle={mockOnToggle}
      onDelete={mockOnDelete}
      loading={true}
    />
  );

  expect(screen.getByText('Loading todos...')).toBeInTheDocument();
});

it('renders empty state when todos array is empty', () => {
  render(
    <TodoList
      todos={[]}
      onToggle={mockOnToggle}
      onDelete={mockOnDelete}
      loading={false}
    />
  );

  expect(screen.getByText(/No todos yet/i)).toBeInTheDocument();
});
```

**Testing Different States:**

- Empty state
- Loading state
- Error state
- Success state with data

---

## Integration Testing

Integration tests verify that different parts of your application work together correctly.

### Testing with Supabase

#### Example: TodoService Integration Test

Location: `src/tests/integration/todoService.integration.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { supabase } from '../../lib/supabase';
import { TodoService } from '../../utils/todoService';

describe('TodoService Integration Tests', () => {
  const service = new TodoService();

  beforeAll(async () => {
    // Setup: Verify connection to Supabase
    const { error } = await supabase.from('todos').select('id').limit(1);
    if (error) {
      throw new Error('Cannot connect to Supabase');
    }
  });

  afterAll(async () => {
    // Cleanup: Remove test data
    await supabase.from('todos').delete().in('id', testTodoIds);
  });

  it('should create a new todo in the database', async () => {
    const title = 'Integration Test Todo';
    const todo = await service.createTodo(title);

    expect(todo).toBeDefined();
    expect(todo.id).toBeDefined();
    expect(todo.title).toBe(title);
  });
});
```

**Integration Testing Best Practices:**

1. **Setup**: Use `beforeAll()` or `beforeEach()` to prepare test environment
2. **Cleanup**: Use `afterAll()` or `afterEach()` to clean up test data
3. **Isolation**: Tests should not depend on each other
4. **Real Services**: Use actual database/API connections
5. **Data Management**: Clean up test data to avoid pollution

---

## Running Tests

### Available Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run tests with UI interface
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Output

```
 ✓ src/tests/unit/TodoList.test.tsx (5 tests)
 ✓ src/tests/unit/TodoItem.test.tsx (6 tests)
 ✓ src/tests/unit/TodoForm.test.tsx (7 tests)

 Test Files  3 passed (3)
      Tests  18 passed (18)
   Duration  3.66s
```

---

## Code Coverage

Code coverage measures how much of your code is tested.

### Running Coverage Reports

```bash
npm run test:coverage
```

### Understanding Coverage Metrics

- **Statements**: Percentage of code statements executed
- **Branches**: Percentage of conditional branches tested
- **Functions**: Percentage of functions called
- **Lines**: Percentage of lines executed

### Example Coverage Output

```
File                  | % Stmts | % Branch | % Funcs | % Lines
----------------------|---------|----------|---------|--------
TodoItem.tsx          |   95.00 |    85.71 |  100.00 |   94.44
TodoForm.tsx          |  100.00 |   100.00 |  100.00 |  100.00
TodoList.tsx          |  100.00 |   100.00 |  100.00 |  100.00
```

### Coverage Goals

- **Good**: 70%+ coverage
- **Great**: 80%+ coverage
- **Excellent**: 90%+ coverage

---

## Best Practices

### 1. Write Testable Code

**Good Example:**
```typescript
// Easy to test - pure function
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

**Bad Example:**
```typescript
// Hard to test - uses global state
function updateTodo() {
  const todo = window.currentTodo;
  // ...
}
```

### 2. Use Test IDs

Add `data-testid` attributes to elements for reliable querying:

```typescript
<button data-testid="submit-button">Submit</button>
```

```typescript
const button = screen.getByTestId('submit-button');
```

### 3. Test User Behavior, Not Implementation

**Good:**
```typescript
it('adds a todo when form is submitted', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);

  await user.type(screen.getByRole('textbox'), 'New Todo');
  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText('New Todo')).toBeInTheDocument();
});
```

**Bad:**
```typescript
it('sets state correctly', () => {
  const { result } = renderHook(() => useState(''));
  // Testing implementation details
});
```

### 4. Keep Tests Independent

Each test should be able to run independently without relying on other tests.

### 5. Use Meaningful Test Names

```typescript
// Good
it('displays error message when email is invalid')

// Bad
it('test1')
```

### 6. Arrange-Act-Assert Pattern

```typescript
it('creates a todo', async () => {
  // Arrange: Set up test data
  const mockOnAdd = vi.fn();
  render(<TodoForm onAdd={mockOnAdd} />);

  // Act: Perform the action
  await user.type(screen.getByRole('textbox'), 'New Todo');
  await user.click(screen.getByRole('button'));

  // Assert: Verify the result
  expect(mockOnAdd).toHaveBeenCalledWith('New Todo');
});
```

---

## Debugging Tips

### 1. Use `screen.debug()`

```typescript
it('renders correctly', () => {
  render(<TodoItem {...props} />);
  screen.debug(); // Prints the current DOM
});
```

### 2. Check What Queries Are Available

```typescript
screen.logTestingPlaygroundURL(); // Opens testing playground
```

### 3. Use Verbose Error Messages

```typescript
expect(result).toBe(expected, 'Custom error message here');
```

### 4. Console Logging in Tests

```typescript
it('does something', () => {
  console.log('Debug info:', someVariable);
  // ... rest of test
});
```

### 5. Run Single Test File

```bash
npx vitest src/tests/unit/TodoItem.test.tsx
```

### 6. Run Single Test

```typescript
it.only('this test will run alone', () => {
  // ...
});
```

### Common Issues and Solutions

#### Issue: Test times out

**Solution:** Increase timeout or check for promises

```typescript
it('async test', async () => {
  // Use await for async operations
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
}, 10000); // Increase timeout to 10s
```

#### Issue: Element not found

**Solution:** Use `waitFor` for async rendering

```typescript
await waitFor(() => {
  expect(screen.getByText('Async content')).toBeInTheDocument();
});
```

#### Issue: Mock not being called

**Solution:** Ensure async operations complete

```typescript
await user.click(button);
await waitFor(() => {
  expect(mockFn).toHaveBeenCalled();
});
```

---

## Additional Resources

### Vitest Documentation
- [Getting Started](https://vitest.dev/guide/)
- [API Reference](https://vitest.dev/api/)

### Testing Library
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Queries](https://testing-library.com/docs/queries/about)
- [User Event](https://testing-library.com/docs/user-event/intro)

### Supabase Testing
- [Supabase Docs](https://supabase.com/docs)

---

## Summary

Testing is an essential skill for modern web development. Start with:

1. **Unit tests** for individual components
2. **Integration tests** for connected functionality
3. **Aim for 70%+ code coverage**
4. **Test user behavior**, not implementation
5. **Keep tests simple and readable**

Remember: Good tests give you confidence to refactor and add features without breaking existing functionality!
