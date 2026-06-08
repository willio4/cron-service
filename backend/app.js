import express from "express";
import endpointRouter from './src/routes/endpoints_router.js'
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(endpointRouter);

export default app;