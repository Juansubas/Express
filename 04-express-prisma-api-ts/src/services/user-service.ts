import { CreateUserDto } from "../dtos/user/create-user.dto";
import { LoginUserDto } from "../dtos/user/login-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserDto } from "../dtos/user/user.dto";
import UserEntity from "../entities/user.entity";
import { IUserService } from "../interfaces/user-service.interface";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt';

export class UserService implements IUserService {

    constructor(
        private readonly userRepository : UserRepository,
    ){}

    async getUsers(): Promise<UserDto[]> {
        const users: UserEntity[] = await this.userRepository.getUsers();
        const usersDtos : UserDto[] = users.map(user => {
            return new UserDto(
                user.id,
                user.firstName,
                user.lastName,
                user.userName,
                user.email,
                user.phoneNumber,
                user.age,
                user.dateOfBirth,
                user.country,
                user.address,
                user.createdAt,
                user.updatedAt
            )
        })
        return usersDtos;
    }
    async getUserById(id: number): Promise<UserDto | null> {
        const user: UserEntity | null = await this.userRepository.getUserById(id);
        if (user) {
            return new UserDto(
                user.id,
                user.firstName,
                user.lastName,
                user.userName,
                user.email,
                user.phoneNumber,
                user.age,
                user.dateOfBirth,
                user.country,
                user.address,
                user.createdAt,
                user.updatedAt
            )
        }
        return user;
    }
    async createUser(user: CreateUserDto): Promise<void> {

        //Encriptar Password
        const hashedPassword : string = await bcrypt.hash(user.password, 10);

        const userEntity : UserEntity = new UserEntity(
            0, // ID autogenerado por la base de datos
            user.firstName,
            user.lastName,
            user.userName,
            user.email,
            hashedPassword,
            user.phoneNumber,
            user.age,
            user.dateOfBirth,
            user.country,
            user.address
        );
        
        await this.userRepository.createUser(userEntity);
    }
    async updateUser(userUpdate: UpdateUserDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async validateUser(userLoginDto: LoginUserDto): Promise<boolean> {
        const user : UserEntity | null  = await this.userRepository.getUserByEmail(userLoginDto.email);
        if(!user) {
            return false;
        }

        //Comparacion passwords
        const isMatch  = await bcrypt.compare(userLoginDto.password, user.password);

        return isMatch ;
        
    }

}