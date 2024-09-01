import express, {Request, Response} from 'express';
import { UserController } from './controllers/UserController';

const userController = new UserController();

const app = express();

app.use(express.json());

const port : number = 3000;


app.get('/api/users', (req: Request, res: Response) => userController.getUsers(req, res));
app.get('/api/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));
app.post('/api/users', (req: Request, res: Response) => userController.createUser(req, res));
app.put('/api/users/:id', (req: Request, res: Response) => userController.actualizarUser(req, res));
app.delete('/api/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));


app.listen(port, () => {
    console.log('Hello World');
});

