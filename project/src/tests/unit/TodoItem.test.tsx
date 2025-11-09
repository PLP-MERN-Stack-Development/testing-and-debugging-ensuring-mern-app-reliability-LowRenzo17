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

  it('displays uncompleted todo without strikethrough', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const title = screen.getByTestId('todo-title-1');
    expect(title).not.toHaveClass('line-through');
  });

  it('displays completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const title = screen.getByTestId('todo-title-1');
    expect(title).toHaveClass('line-through');
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
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTestId('delete-todo-1');
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('has accessible labels for buttons', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByLabelText('Mark as complete')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete todo')).toBeInTheDocument();
  });
});
