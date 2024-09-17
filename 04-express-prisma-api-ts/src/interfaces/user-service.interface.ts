import UserModel from "../entities/user.entity";

export interface IUserService {
    getUsers(): Promise<UserModel[]>;
    getUserById(id: number): Promise<UserModel | null>;
    createUser(user: UserModel): Promise<void>;
    updateUser(userUpdate: UserModel): Promise<void>;
    deleteUser(id: number): Promise<void>;
}