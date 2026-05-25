import { Request, Response } from 'express';
import * as todoService from './todo.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos = await todoService.getAllTodos();
  res.status(200).json(new ApiResponse(200, todos, 'Todos fetched successfully'));
});

export const getTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await todoService.getTodoById(req.params.id);
  res.status(200).json(new ApiResponse(200, todo, 'Todo fetched successfully'));
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await todoService.createTodo(req.body);
  res.status(201).json(new ApiResponse(201, todo, 'Todo created successfully'));
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await todoService.updateTodo(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, todo, 'Todo updated successfully'));
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  await todoService.deleteTodo(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Todo deleted successfully'));
});
