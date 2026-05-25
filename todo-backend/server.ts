import app from './src/app';
import { connectDB } from './src/config/db';
import { env } from './src/config/env';

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
