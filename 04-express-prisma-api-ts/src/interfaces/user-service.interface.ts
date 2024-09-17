import { CreateUserDto } from "../dtos/user/create-user.dto";
import { LoginUserDto } from "../dtos/user/login-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserDto } from "../dtos/user/user.dto";

export interface IUserService {
    getUsers(): Promise<UserDto[]>;
    getUserById(id: number): Promise<UserDto | null>;
    createUser(user: CreateUserDto): Promise<void>;
    updateUser(userUpdate: UpdateUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
    
    validateUser(userLoginDto: LoginUserDto) : Promise<boolean>;
}