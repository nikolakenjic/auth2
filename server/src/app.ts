import express from 'express';
import errorHandler from './middleware/errorHandler';
import apiRoutes from './routes'
import {coreMiddleware} from "./middleware";

const app = express();

coreMiddleware(app)

app.use('/api/v1', apiRoutes)

// Error
app.use(errorHandler);

console.log('server')

export default app;
