import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoItem';
import { todoService } from './utils/todoService';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await todoService.createTodo(title);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updated = await todoService.toggleTodo(id, !todo.completed);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Testing Demo: Todo App
            </h1>
          </div>

          <div className="mb-6">
            <TodoForm onAdd={handleAddTodo} />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            loading={loading}
          />
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            This app demonstrates unit, integration, and end-to-end testing
            practices
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
