import express, { Application } from 'express';
import cors from 'cors';
import router from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', router);

// Handle 404
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
