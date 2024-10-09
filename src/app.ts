import express, { Application } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './routes';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(
  cors({
    origin: 'https://versevoyage-91e8e-7ba99.web.app',
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: '',
        message: 'API not found',
      },
    ],
  });
});
export default app;
