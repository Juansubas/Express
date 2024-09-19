import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

const port : number = 3000; 

app.listen(port, () => {
    console.log('Hello World');
});