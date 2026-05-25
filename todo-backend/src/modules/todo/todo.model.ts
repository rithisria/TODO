import mongoose, { Schema } from 'mongoose';
import { ITodoDocument } from './todo.types';

const todoSchema = new Schema<ITodoDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodoDocument>('Todo', todoSchema);
