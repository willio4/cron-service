import express from "express";
import endpointRouter from './src/routes/endpoints_router.js';
import cors from 'cors';

const app = express();

const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(endpointRouter);

export default app;