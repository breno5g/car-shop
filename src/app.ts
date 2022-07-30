import express from 'express';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();
app.use(express.json());

// app.get('/', (_req: any, res: any) => res.status(200).json({ message: 'hoi' }));

app.use(routes);

app.use(errorHandler);

export default app;
