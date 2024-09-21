import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import UserModel from "../entities/user.entity";

export interface IUserRepository{
    getUsers(): Promise<UserModel[]>;
    getUserById(id: number): Promise<UserModel | null>;
    getUserByEmail(email: string) : Promise<UserModel | null>
    createUser(user: CreateUserDto): Promise<void>;
    updateUser(id:number, userUpdate: UpdateUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
}