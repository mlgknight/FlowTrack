import 'dotenv/config';
import express from 'express';
import eventRouter from './routes/event.routes.ts';
import userRouter from './routes/user.routes.ts';
import loginRouter from './routes/login.routes.ts';
import resetDBRouter from './routes/restDB.routes.ts';
import connectDB from './utils/database.ts';
import { errorHandler } from './utils/middleware.ts';
import cors from 'cors';

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();
// middleware
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	app.use('/api/reset', resetDBRouter);
}
// Then error handling middleware
app.use(errorHandler);

export default app;
