import express from "express";
import endpointRouter from './src/routes/endpoints_router.js'
import cors from 'cors';

const app = express();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(endpointRouter);

export default app;