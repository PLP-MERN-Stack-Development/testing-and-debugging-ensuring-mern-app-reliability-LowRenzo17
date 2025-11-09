import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../../components/TodoList';

describe('TodoList Component', () => {
  const mockTodos = [
    { id: '1', title: 'First Todo', completed: false },
    { id: '2', title: 'Second Todo', completed: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

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
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
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
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders all todos when array has items', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });

  it('renders correct number of todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoItems = screen.getAllByTestId(/^todo-item-/);
    expect(todoItems).toHaveLength(2);
  });

  it('passes correct props to TodoItem components', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
  });
});
