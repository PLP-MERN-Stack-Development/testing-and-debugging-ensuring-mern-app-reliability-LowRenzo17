import { Trash2, Check } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
      data-testid={`todo-item-${todo.id}`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        data-testid={`toggle-todo-${todo.id}`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
        data-testid={`todo-title-${todo.id}`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
        aria-label="Delete todo"
        data-testid={`delete-todo-${todo.id}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
