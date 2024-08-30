import express, {Request, Response} from 'express'
import { promises as fs, read} from "fs";

const app = express();

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

const writeData = async () : Promise<void> => {
    try {
        await fs.writeFile('./db/db.sjon', 'utf-8');
    } catch (error) {
        console.error('Error Writing data', Error);
    }
}

app.get('/', async (req: Request, res: Response) => {
    try {
        const data : User[] = await readData();
        console.log(data)
        res.status(200).json(data);
    } catch (error: unknown) {
        console.error('Error :', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log('Server is running')
});