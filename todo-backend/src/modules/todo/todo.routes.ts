import { Router } from 'express';
import * as todoController from './todo.controller';
import { validate } from '../../middleware/validate';
import { createTodoSchema, updateTodoSchema, getTodoSchema } from './todo.validation';

const router = Router();

router.route('/')
  .get(todoController.getTodos)
  .post(validate(createTodoSchema), todoController.createTodo);

router.route('/:id')
  .get(validate(getTodoSchema), todoController.getTodo)
  .put(validate(updateTodoSchema), todoController.updateTodo)
  .delete(validate(getTodoSchema), todoController.deleteTodo);

export default router;
