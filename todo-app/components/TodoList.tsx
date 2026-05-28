'use client';

import React, { useState } from 'react';
import { ITodo } from '@/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: ITodo[];
  onToggle: (id: string, completed: boolean) => void;
  
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ITodo>) => Promise<any>;
}

type FilterStatus = 'all' | 'active' | 'completed';
type FilterPriority = 'all' | 'low' | 'medium' | 'high';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'dueDate' | 'priority'>('createdAt');

  // Filters
  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed);

    const matchesPriority =
      priorityFilter === 'all' || todo.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  // Sorting
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const priorityWeights = { high: 3, medium: 2, low: 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    }
    // default: createdAt descending (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="todo-list-container">
      {/* Quick Stats Panel */}
      <div className="stats-panel card">
        <div className="stat-card">
          <span className="stat-value">{totalCount}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-active">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-completed">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar card">
        <div className="filter-group" style={{ marginBottom: 0 }}>
          <label>Status</label>
          <div className="btn-toggle">
            {(['all', 'active', 'completed'] as FilterStatus[]).map((status) => (
              <button
                key={status}
                className={`btn-toggle-item ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group col-half" style={{ marginBottom: 0 }}>
            <label htmlFor="priority-filter">Priority</label>
            <select
              id="priority-filter"
              className="select"
              style={{ padding: '0.5rem' }}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="filter-group col-half" style={{ marginBottom: 0 }}>
            <label htmlFor="sort-by">Sort By</label>
            <select
              id="sort-by"
              className="select"
              style={{ padding: '0.5rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="createdAt">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* List of Items */}
      <div className="todo-items-list">
        {sortedTodos.length > 0 ? (
          sortedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <div className="empty-state card">
            <p>No tasks match the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
