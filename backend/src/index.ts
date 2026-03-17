import express from 'express';
import cors from 'cors';
import { PORT, NODE_ENV } from './config';
import routes from './routes';
import { errorsMiddleware } from './middlewares/errorsMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LabRappi API is running...');
});

app.use('/api', routes);

app.use(errorsMiddleware);

if (NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

export default app;