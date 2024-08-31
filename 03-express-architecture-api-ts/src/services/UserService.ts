import { responseDto } from "../dtos/responseDto";
import { UserDto } from "../dtos/userDto";
import { IFileService } from "../interfaces/IFileService";
import { UserModel } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";

export class UserService implements IFileService<UserModel | void> {

    constructor(
        private userRepository : UserRepository = new UserRepository()
    ) {        
    }

    async getUsers(): Promise<responseDto<UserModel>> {
        return await this.userRepository.getUsers();
    }
    async getUserById(id: number): Promise<responseDto<UserModel>> {
        return await this.userRepository.getUserById(id);
    }
    async createUser(userDto: UserDto): Promise<responseDto<void>> {
        return await this.userRepository.createUser(userDto);
    }
    async updateUser(id: number, userDto: UserDto): Promise<responseDto<UserModel>> {
        return await this.userRepository.updateUser(id, userDto);
    }
    async deleteUser(id: number): Promise<responseDto<void>> {
        return await this.userRepository.deleteUser(id);
    }

}
