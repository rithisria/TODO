import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodoDocument extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodoDocument>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
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

const Todo: Model<ITodoDocument> =
  mongoose.models.Todo || mongoose.model<ITodoDocument>('Todo', TodoSchema);

export default Todo;
