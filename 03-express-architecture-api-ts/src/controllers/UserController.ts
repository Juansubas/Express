import {Request, Response} from 'express';
import { UserService } from '../services/UserService';
import { UserDto } from '../dtos/userDto';
export class UserController {

    constructor(
        private userService : UserService = new UserService()
    ) {
    }


    async getUsers(req : Request, res: Response): Promise<void> {
        try {
            res.status(200).json( await this.userService.getUsers() );
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    };

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUserById(parseInt(req.params.id)) ;
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).send({message : ' Not Found User '});
            }
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    };
    
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user : UserDto = req.body;
            if( typeof user.name !== "string" || typeof user.email !== "string"
                || typeof user.age !== "number" || typeof user.active !== "boolean"
             ) {
                res.status(404).send({message : 'Invalid user Data'});
             } 
             res.status(201).json(await this.userService.createUser(user));
    
        } catch (error : unknown) {
            console.error('Error', error);
            res.status(504).send({message : "Internal Server Error"});
        }
    };
    
    async actualizarUser(req :Request, res :Response): Promise<void> {
        try {
            const user : UserDto = req.body;
            if( typeof user.name !== "string" || typeof user.email !== "string"
                || typeof user.age !== "number" || typeof user.active !== "boolean"
             ) {
                res.status(404).send({message : 'Invalid user Data'});
             }
    
             const id : number = parseInt(req.params.id);
             await this.userService.updateUser(id, user);
    
            res.status(200).send({message: ' user updated succesfully '});
        } catch (error : unknown) {
            console.error('Error', error);
            res.status(504).send({message : "Internal Server Error"});
        }
    };
    
    async deleteUser (req : Request, res : Response ): Promise<void> {
        try {
            res.status(200).json(await this.userService.deleteUser(parseInt(req.params.id)));
    
        } catch (error : unknown) {
            console.error('error', error);
            res.status(502).send({message: "Internal Server Error"});
        }
    };
    
}