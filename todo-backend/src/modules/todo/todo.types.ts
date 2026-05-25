import { Document } from 'mongoose';

export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface ITodoDocument extends ITodo, Document {
  createdAt: Date;
  updatedAt: Date;
}
