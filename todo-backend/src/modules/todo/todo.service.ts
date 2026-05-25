import { Todo } from './todo.model';
import { ITodo } from './todo.types';
import { ApiError } from '../../utils/apiError';

export const getAllTodos = async () => {
  return await Todo.find({}).sort({ createdAt: -1 });
};

export const getTodoById = async (id: string) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};

export const createTodo = async (todoData: Partial<ITodo>) => {
  return await Todo.create(todoData);
};

export const updateTodo = async (id: string, updateData: Partial<ITodo>) => {
  const todo = await Todo.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};

export const deleteTodo = async (id: string) => {
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) {
    throw new ApiError(404, 'Todo not found');
  }
  return todo;
};
