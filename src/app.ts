import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import ApiError from './errors/apiError';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
//testing
// app.get('/', (req: Request, res: Response) => {
//   throw new Error('my error');
//   // throw new ApiError(404, 'Not found');
// });
app.use(globalErrorHandler);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     res.status(400).json({ error: err.message, message: 'Api error' });
//   } else if (err instanceof Error) {
//     res.status(500).json({ error: err.message, message: 'Normal error' });
//   } else {
//     res.status(600).json({ error: 'Something went wrong!' });
//   }
// });

export default app;
