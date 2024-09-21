import { ResponseDto } from "../dtos/response.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserDto } from "../dtos/user/user.dto";
import { ResponseStatus } from "../enums/response-status.enum";
import { UserService } from "../services/user-service";
import { Request, Response } from "express";

export default class UserController {

    constructor(
        private userService : UserService 
    ) {
    }

    async getUsers(req : Request, res : Response) : Promise<Response<ResponseDto<UserDto[]>>> {
        try {
            const users : UserDto[] = await this.userService.getUsers();
            return res.status(200).json(new ResponseDto(users, 'Users Obtained Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async getUserById(req : Request, res : Response): Promise<Response<ResponseDto<UserDto>>> {
        try {
            const id : number = parseInt(req.params.id);
            const user : UserDto | null = await this.userService.getUserById(id)
            return res.status(200).json(new ResponseDto(user, 'User Obtained Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async createUser(req : Request, res : Response): Promise<Response<ResponseDto<void>>> {
        try {
            const user : CreateUserDto = req.body;
            await this.userService.createUser(user);
            return res.status(201).json(new ResponseDto(null, 'Created Task Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async updateUser(req: Request, res: Response): Promise<Response<ResponseDto<void>>> {
        try {
            const id : number = parseInt(req.params.id);
            const userUpdate : UpdateUserDto = req.body.id;
            await this.userService.updateUser(id, userUpdate);

            return res.status(200).json(new ResponseDto(null, 'Updating User Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async deleteUser(req : Request, res: Response): Promise<Response<ResponseDto<null>>> {
        try {
            const id : number = parseInt(req.params.id);
            await this.userService.deleteUser(id);
            return res.status(200).json(new ResponseDto(null, 'User Deleted Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
}