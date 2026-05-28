'use client';

import React, { useState } from 'react';
import { ITodo } from '@/types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string, completed: boolean) => void;
  
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ITodo>) => Promise<any>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? todo.dueDate.split('T')[0] : ''
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsUpdating(true);
    try {
      await onUpdate(todo._id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || undefined,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setPriority(todo.priority);
    setDueDate(todo.dueDate ? todo.dueDate.split('T')[0] : '');
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <div className="todo-item card">
        <div style={{ flex: 1 }}>
          <div className="form-group">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              disabled={isUpdating}
            />
          </div>
          <div className="form-group">
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              disabled={isUpdating}
              rows={2}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-half">
              <select
                className="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                disabled={isUpdating}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group col-half">
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isUpdating}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="success" size="sm" onClick={handleSave} disabled={isUpdating || !title.trim()}>
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isUpdating}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-checkbox-container">
        <input
          type="checkbox"
          id={`todo-${todo._id}`}
          className="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
        />
      </div>
      
      <div className="todo-item-content">
        <div className="todo-item-header">
          <h4 className="todo-item-title">{todo.title}</h4>
          <div className="todo-item-badges">
            <Badge variant={todo.priority}>{todo.priority}</Badge>
            {todo.completed ? (
              <Badge variant="completed">Completed</Badge>
            ) : (
              <Badge variant="pending">Active</Badge>
            )}
          </div>
        </div>

        {todo.description && (
          <p className="todo-item-description">{todo.description}</p>
        )}

        {todo.dueDate && (
          <div className={`todo-item-due ${isOverdue ? 'overdue' : ''}`}>
            <span>Due: {formatDate(todo.dueDate)}</span>
            {isOverdue && <span style={{ color: 'var(--danger)' }}> (Overdue)</span>}
          </div>
        )}
      </div>

      <div className="todo-item-actions">
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(todo._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
