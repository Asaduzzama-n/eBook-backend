import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
