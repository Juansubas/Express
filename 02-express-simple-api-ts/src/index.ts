import express, {Request, Response} from 'express'
import { promises as fs, read, write} from "fs";

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
        const data = await fs.readFile('./db/db.json', 'utf-8');
        const dataJson: User[] = JSON.parse(data);
        return dataJson;
    } catch (error: unknown) {
        console.error('Error reading or parsing data:', error);
        return [];
    }
    
}

const writeData = async (data : User[]) : Promise<void> => {
    try {
        await fs.writeFile('./db/db.json', JSON.stringify(data));
    } catch (error : unknown) {
        console.error('Error Writing data', error);
    }
}

app.get('/users', async (req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        res.status(200).json(data);
    } catch (error: unknown) {
        console.error('Error :', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        const id : number = parseInt(req.params.id);
        const user : User | undefined = data.find((user) => {
           return user.id === id;
        });

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error : unknown) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');

    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        const user : Omit<User, 'id'>= req.body;

        //validacion data
        if ( typeof user.name !== 'string' ||
            typeof user.email !== 'string' ||
            typeof user.age !== 'number' ||
            typeof user.active !== 'boolean' 
         ) return res.status(400).send('Invalid user data');

        const newUser : User = {
            id: data.length + 1,
            ...user
        }
        data.push(newUser);
        await writeData(data);
        res.status(201).json(user);
    } catch (error : unknown) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/users/:id', async(req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        const id : number = parseInt(req.params.id);
        const updateUser : Omit<User, 'id'> = req.body;

        //validacion data
        if ( typeof updateUser.name !== 'string' ||
            typeof updateUser.email !== 'string' ||
            typeof updateUser.age !== 'number' ||
            typeof updateUser.active !== 'boolean' 
            ) return res.status(400).send('Invalid user data');

        const index : number = data.findIndex( user => user.id === id);
        if(index !==-1) {
            //data.splice(index, 1, {id , ...updateUser});
            data[index] = {
                id,
                ...updateUser
            };
            await writeData(data);
            res.status(200).json({ message: 'User Updated Successfully' });
        }else {
            res.status(404).send('User not found');
        }


    } catch (error : unknown) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/users/:id', async(req: Request, res: Response) => {
    try {
        const id : number = parseInt(req.params.id);
        const data = await readData();
        const index : number = data.findIndex( user => user.id === id);
        if (index !== -1) {
            data.splice(index, 1);
            await writeData(data);
            res.status(200).json( {message: 'User deleted succesfully'});
        }else {
            res.status(404).send('User not found');
        }

    } catch (error : unknown) {
        console.error('Error', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log('Server is running')
});