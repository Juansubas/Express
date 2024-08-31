import { responseDto } from "../dtos/responseDto";
import { UserDto } from "../dtos/userDto";

export interface IFileService <T> {

    getUsers(): Promise<responseDto<T>> ;
    getUserById(int : number): Promise<responseDto<T>> ;
    createUser(userDto: UserDto): Promise<responseDto<T>> ;
    updateUser(id : number, userDto: UserDto ): Promise<responseDto<T>> ;
    deleteUser(id: number) : Promise<responseDto<T>> ;

}
