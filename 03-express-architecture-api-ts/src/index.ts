import express, {Request, Response} from 'express';
import { UserService } from './services/UserService';
import { UserDto } from './dtos/userDto';

const app = express();

app.use(express.json());

const port : number = 3000;

const userService: UserService = new UserService();

app.get('/users', async (req : Request, res: Response) => {
    try {
        res.status(200).json( await userService.getUsers() );
    } catch (error : unknown) {
        console.error('error', error);
        res.status(500).send({ message: 'Internal Server Error'});
    }
});

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id)) ;
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({message : ' Not Found User '});
        }
    } catch (error : unknown) {
        console.error('error', error);
        res.status(500).send({ message: 'Internal Server Error'});
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const user : UserDto = req.body;
        if( typeof user.name !== "string" || typeof user.email !== "string"
            || typeof user.age !== "number" || typeof user.active !== "boolean"
         ) {
            return res.status(404).send({message : 'Invalid user Data'});
         } 
         res.status(201).json(await userService.createUser(user));

    } catch (error : unknown) {
        console.error('Error', error);
        res.status(504).send({message : "Internal Server Error"});
    }
});

app.put('/users/:id', async (req :Request, res :Response) => {
    try {
        const user : UserDto = req.body;
        if( typeof user.name !== "string" || typeof user.email !== "string"
            || typeof user.age !== "number" || typeof user.active !== "boolean"
         ) {
            return res.status(404).send({message : 'Invalid user Data'});
         }

         const id : number = parseInt(req.params.id);
         await userService.updateUser(id, user);

        res.status(200).send({message: ' user updated succesfully '});
    } catch (error : unknown) {
        console.error('Error', error);
        res.status(504).send({message : "Internal Server Error"});
    }
});

app.delete('/users/:id', async (req : Request, res : Response ) => {
    try {
        res.status(200).json(await userService.deleteUser(parseInt(req.params.id)));

    } catch (error : unknown) {
        console.error('error', error);
        res.status(502).send({message: "Internal Server Error"});
    }
});

app.listen(port, () => {
    console.log('Hello World');
});

