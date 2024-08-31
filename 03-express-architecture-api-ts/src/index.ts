import express, {Request, Response} from 'express';
import { promises as fs, read } from 'fs';

const app = express();

app.use(express.json());

const port : number = 3000;

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    active: boolean;
}

const readData = async () : Promise<User[]> => {
    try {
        const data = await fs.readFile('src/db/db.json', 'utf-8');
        const dataJson : User[] = JSON.parse(data);
        return dataJson;
    } catch (error : unknown) {
        console.error('error', error);
        return [];
    }
}

const writeData = async (data : User[]) : Promise<void> => {
    try {
        await fs.writeFile('src/db/db.json', JSON.stringify(data));
    } catch (error : unknown) {
        console.error('error', error);
    }
}

app.get('/users', async (req : Request, res: Response) => {
    try {
        const users : User[] = await readData();
        res.status(200).json(users);
    } catch (error : unknown) {
        console.error('error', error);
        res.status(500).send({ message: 'Internal Server Error'});
    }
});

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        const id : number = parseInt(req.params.id);
        const user : User | undefined = data.find( user => user.id === id);
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
        const user : Omit<User, 'id'> = req.body;
        if( typeof user.name !== "string" || typeof user.email !== "string"
            || typeof user.age !== "number" || typeof user.active !== "boolean"
         ) {
            return res.status(404).send({message : 'Invalid user Data'});
         }
         const data: User[] = await readData();
         const newUser : User = {
             id : data.length + 1,
             ...user
         };
         data.push(newUser);
         await writeData(data);
         res.status(201).json(user);

    } catch (error : unknown) {
        console.error('Error', error);
        res.status(504).send({message : "Internal Server Error"});
    }
});

app.put('/users/:id', async (req :Request, res :Response) => {
    try {
        const user : Omit<User, 'id'> = req.body;
        if( typeof user.name !== "string" || typeof user.email !== "string"
            || typeof user.age !== "number" || typeof user.active !== "boolean"
         ) {
            return res.status(404).send({message : 'Invalid user Data'});
         }

         const id : number = parseInt(req.params.id);
         const data : User[] = await readData();
         const index: number = data.findIndex( user => user.id === id);

         if( index != -1) {
            data[index] = {
                id,
                ...user
            };

            await writeData(data);

            res.status(200).send({message: ' user updated succesfully '});
         }else {
            res.status(404).send({message: 'User not found'});
         }
    } catch (error : unknown) {
        console.error('Error', error);
        res.status(504).send({message : "Internal Server Error"});
    }
});

app.delete('/users/:id', async (req : Request, res : Response ) => {
    try {
        const id : number = parseInt(req.params.id);
        const data : User[] = await readData();
        const index: number =  data.findIndex( user => user.id === id);
        if (index !== -1) {
            data.splice(index, 1);
            await writeData(data);
            res.status(200).send({Message : 'Deleted User Succesfully'});
        } else {
            res.status(404).send({message : 'User not found'});
        }

    } catch (error : unknown) {
        console.error('error', error);
        res.status(502).send({message: "Internal Server Error"});
    }
});

app.listen(port, () => {
    console.log('Hello World');
});

