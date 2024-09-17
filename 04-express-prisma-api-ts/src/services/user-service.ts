import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import UserEntity from "../entities/user.entity";
import { IUserService } from "../interfaces/user-service.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserService implements IUserService {

    constructor(
        private readonly userRepository : UserRepository
    ){}

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.getUsers();
    }
    async getUserById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.getUserById(id);
    }
    async createUser(user: CreateUserDto): Promise<void> {
        const userEntity : UserEntity = new UserEntity(
            0, // ID autogenerado por la base de datos
            user.firstName,
            user.lastName,
            user.userName,
            user.email,
            user.password,
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

}