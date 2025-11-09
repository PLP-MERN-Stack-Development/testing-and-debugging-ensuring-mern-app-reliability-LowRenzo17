import { supabase } from '../lib/supabase';
import { Todo } from '../components/TodoItem';

export class TodoService {
  async fetchTodos(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createTodo(title: string): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .insert({ title, completed: false })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create todo');
    return data;
  }

  async toggleTodo(id: string, completed: boolean): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update todo');
    return data;
  }

  async deleteTodo(id: string): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) throw error;
  }
}

export const todoService = new TodoService();
