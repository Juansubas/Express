import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/user-repository.interface";
import UserEntity from "../entities/user.entity";


export class UserRepository implements IUserRepository {

    constructor(
        private readonly prisma : PrismaClient
    ){}

    async getUsers(): Promise<UserEntity[]> {
        try {
            const users : UserEntity[] = await this.prisma.user.findMany();
            return users;
        } catch (error : unknown) {
            console.error('Error getting users', error);
            throw new Error('Error fetching users from the database');
        }
    }

    async getUserById(id: number): Promise<UserEntity | null> {
        try {
            const user : UserEntity | null = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            return user;
        } catch (error : unknown) {
            console.error('Error get user', error);
            throw new Error('Error fetching user from the database');
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user : UserEntity | null = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            return user;
        } catch (error : unknown) {
            console.error('Error fetching user', error);
            throw new Error('Error fetching user from the database');
        }
    }
    async createUser(user: UserEntity): Promise<void> {
        try {
            await this.prisma.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    password: user.password,  // Suponiendo que el password se necesita
                    phoneNumber: user.phoneNumber,
                    age: user.age,
                    dateOfBirth: user.dateOfBirth,
                    country: user.country,
                    address: user.address
                    // No incluyas id, createdAt, updatedAt, o tasks
                }
            })
        } catch (error : unknown) {
            console.error('Error Creating User', error);
            throw new Error('Error creating user from the database')
        }
    }
    async updateUser(userUpdate: UserEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}