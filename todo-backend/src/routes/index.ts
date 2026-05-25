import { Router } from 'express';
import todoRoutes from '../modules/todo/todo.routes';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Mount module routes
router.use('/todos', todoRoutes);

export default router;
