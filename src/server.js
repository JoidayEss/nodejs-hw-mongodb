import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(pino());

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  try {
    await initMongoConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};
