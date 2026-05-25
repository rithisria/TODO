import { useState, useEffect } from 'react';
import { ITodo } from '@/types';

export function useTodos() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todoData: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await response.json();
      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateTodo = async (id: string, updates: Partial<ITodo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}
