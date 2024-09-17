import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserService } from "../services/user-service";
import { Request, Response } from "express";

export default class UserController {

    constructor(
        private userService : UserService 
    ) {
    }

    async getUsers(req : Request, res : Response): Promise<void> {
        try {
            res.status(200).json(await this.userService.getUsers())
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    async getUserById(req : Request, res : Response): Promise<void> {
        try {
            const id : number = parseInt(req.params.id);
            res.status(200).json(await this.userService.getUserById(id))
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    async createUser(req : Request, res : Response): Promise<void> {
        try {
            const user : CreateUserDto = req.body;
            res.status(200).json(await this.userService.createUser(user))
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    async updateUser(userUpdate: UpdateUserDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}