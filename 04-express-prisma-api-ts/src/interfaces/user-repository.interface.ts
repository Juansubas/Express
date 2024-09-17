import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import UserModel from "../entities/user.entity";

export interface IUserRepository{
    getUser(): Promise<UserModel[]>;
    getUserById(id: number): Promise<UserModel | null>;
    createUser(user: CreateUserDto): Promise<void>;
    updateUser(userUpdate: UpdateUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
}