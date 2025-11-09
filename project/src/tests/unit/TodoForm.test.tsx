import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../../components/TodoForm';

describe('TodoForm Component', () => {
  it('renders input field and add button', () => {
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId('todo-input') as HTMLInputElement;
    await user.type(input, 'New Todo');

    expect(input.value).toBe('New Todo');
  });

  it('calls onAdd with trimmed title when form is submitted', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, '  Test Todo  ');
    await user.click(screen.getByTestId('add-todo-button'));

    expect(mockOnAdd).toHaveBeenCalledWith('Test Todo');
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('clears input after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId('todo-input') as HTMLInputElement;
    await user.type(input, 'Test Todo');
    await user.click(screen.getByTestId('add-todo-button'));

    expect(input.value).toBe('');
  });

  it('does not call onAdd when submitting empty input', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    await user.click(screen.getByTestId('add-todo-button'));

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('does not call onAdd when submitting whitespace-only input', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, '   ');
    await user.click(screen.getByTestId('add-todo-button'));

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('can submit form by pressing Enter key', async () => {
    const user = userEvent.setup();
    const mockOnAdd = vi.fn();
    render(<TodoForm onAdd={mockOnAdd} />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Test Todo{Enter}');

    expect(mockOnAdd).toHaveBeenCalledWith('Test Todo');
  });
});
