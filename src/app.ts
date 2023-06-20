
import express, { Express, Request, Response, json } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler, resourceNotFound } from './middleware';
import router from './controller';

const app: Express = express();


// Middleware setup
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(json())



//Route Setup

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Running.');
});

app.use('/api', router)

// Pre Route Setup Middleware
app.use(resourceNotFound)
app.use(errorHandler)

export default app;