import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ProductsRouter } from './routes/products.routes.js';
import { errorHandler, authenticateToken } from './middlewares/errors.middleware.js';


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use("/products", ProductsRouter, authenticateToken);

// Error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server on port 3000'));