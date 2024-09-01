import express, {Request, Response} from 'express';
import { UserController } from './controllers/UserController';
import userRoutes from './routes/userRoutes';

const userController = new UserController();

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

const port : number = 3000;


//Rutas manuales
// app.get('/api/users', (req: Request, res: Response) => userController.getUsers(req, res));
// app.get('/api/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));
// app.post('/api/users', (req: Request, res: Response) => userController.createUser(req, res));
// app.put('/api/users/:id', (req: Request, res: Response) => userController.actualizarUser(req, res));
// app.delete('/api/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

//Rutas desde el archivo



app.listen(port, () => {
    console.log('Hello World');
});

