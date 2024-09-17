import express from 'express';
import router from './routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api', router);

const port : number = 3000; 

app.listen(port, () => {
    console.log('Hello World');
});