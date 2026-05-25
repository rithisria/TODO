'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';

export default function Home() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id, { completed });
    } catch (err) {
      console.error('Failed to toggle completion status', err);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">TaskFlow</h1>
        <p className="subtitle">Manage your day beautifully and productively.</p>
      </header>

      {error && <div style={{ color: 'var(--danger)', marginBottom: '2rem', textAlign: 'center' }}>Error: {error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your workspace...</p>
        </div>
      ) : (
        <div className="workspace-grid">
          <div className="sidebar-section">
            <TodoForm onSubmit={addTodo} />
          </div>
          <div className="main-section">
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        </div>
      )}
    </main>
  );
}
