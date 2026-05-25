'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TodoFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }) => Promise<any>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form card">
      <h3 className="form-title" style={{ marginBottom: '1.5rem' }}>Create New Task</h3>
      {error && <div className="form-error" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      
      <div className="form-group">
        <label htmlFor="todo-title">Task Title</label>
        <Input
          id="todo-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="todo-desc">Description (Optional)</label>
        <textarea
          id="todo-desc"
          className="textarea"
          placeholder="Add details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group col-half">
          <label htmlFor="todo-priority">Priority</label>
          <select
            id="todo-priority"
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group col-half">
          <label htmlFor="todo-duedate">Due Date (Optional)</label>
          <Input
            id="todo-duedate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting || !title.trim()} className="submit-btn">
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </Button>
    </form>
  );
};
