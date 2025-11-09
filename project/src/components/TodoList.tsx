import { TodoItem, Todo } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function TodoList({ todos, onToggle, onDelete, loading }: TodoListProps) {
  if (loading) {
    return (
      <div className="text-center py-8" data-testid="loading-indicator">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-gray-600">Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500" data-testid="empty-state">
        No todos yet. Add one above to get started!
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
