import { responseDto } from "../dtos/responseDto";
import { UserDto } from "../dtos/userDto";
import { UserModel } from "../models/UserModel";


export interface IUserRepository <T>{
    getUsers(): Promise<responseDto<T>> ;
    getUserById(int : number): Promise<responseDto<T>> ;
    createUser(userDto: UserDto): Promise<responseDto<T>> ;
    updateUser(int : number, userDto: UserDto ): Promise<responseDto<T>> ;
    deleteUser(int: number) : Promise<responseDto<T>> ;
}