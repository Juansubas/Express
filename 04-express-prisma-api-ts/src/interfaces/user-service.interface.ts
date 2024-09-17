import UserModel from "../entities/user.entity";

export interface IUserService {
    getUser(): Promise<UserModel[]>;
    getUserById(id: number): Promise<UserModel>;
    createUser(user: UserModel): Promise<void>;
    updateUser(userUpdate: UserModel): Promise<void>;
    deleteUser(id: number): Promise<void>;
}