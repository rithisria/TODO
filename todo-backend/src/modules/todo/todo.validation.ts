import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(1, 'Title cannot be empty').trim(),
    description: z.string().trim().optional(),
    completed: z.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
  body: z.object({
    title: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    completed: z.boolean().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  }),
});

export const getTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
});
