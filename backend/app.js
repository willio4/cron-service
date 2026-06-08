import express from "express";
import endpointRouter from './src/routes/endpoints_router.js';
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS platform security policy.'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(endpointRouter);

export default app;