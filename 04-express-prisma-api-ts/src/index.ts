import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes';

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', taskRouter);

const port : number = 3000; 

app.listen(port, () => {
    console.log('Hello World');
});