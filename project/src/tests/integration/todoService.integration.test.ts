import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { supabase } from '../../lib/supabase';
import { TodoService } from '../../utils/todoService';

describe('TodoService Integration Tests', () => {
  const service = new TodoService();
  const testTodoIds: string[] = [];

  beforeAll(async () => {
    const { error } = await supabase.from('todos').select('id').limit(1);
    if (error) {
      throw new Error(
        'Cannot connect to Supabase. Make sure environment variables are set correctly.'
      );
    }
  });

  beforeEach(async () => {
    const { data } = await supabase
      .from('todos')
      .select('id')
      .in('title', ['Integration Test Todo', 'Updated Integration Test Todo']);

    if (data && data.length > 0) {
      await supabase
        .from('todos')
        .delete()
        .in('id', data.map((t) => t.id));
    }
  });

  afterAll(async () => {
    if (testTodoIds.length > 0) {
      await supabase.from('todos').delete().in('id', testTodoIds);
    }
  });

  it('should create a new todo in the database', async () => {
    const title = 'Integration Test Todo';
    const todo = await service.createTodo(title);

    expect(todo).toBeDefined();
    expect(todo.id).toBeDefined();
    expect(todo.title).toBe(title);
    expect(todo.completed).toBe(false);

    testTodoIds.push(todo.id);
  });

  it('should fetch all todos from the database', async () => {
    const title = 'Integration Test Todo';
    const created = await service.createTodo(title);
    testTodoIds.push(created.id);

    const todos = await service.fetchTodos();

    expect(Array.isArray(todos)).toBe(true);
    expect(todos.some((t) => t.id === created.id)).toBe(true);
  });

  it('should toggle todo completion status', async () => {
    const created = await service.createTodo('Integration Test Todo');
    testTodoIds.push(created.id);

    expect(created.completed).toBe(false);

    const toggled = await service.toggleTodo(created.id, true);

    expect(toggled.completed).toBe(true);
    expect(toggled.id).toBe(created.id);
  });

  it('should delete a todo from the database', async () => {
    const created = await service.createTodo('Integration Test Todo');
    const todoId = created.id;

    await service.deleteTodo(todoId);

    const todos = await service.fetchTodos();
    expect(todos.find((t) => t.id === todoId)).toBeUndefined();
  });

  it('should handle errors when creating todo with empty title', async () => {
    await expect(service.createTodo('')).rejects.toThrow();
  });
});
