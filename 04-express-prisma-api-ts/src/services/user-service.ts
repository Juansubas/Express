import { CreateUserDto } from "../dtos/user/create-user.dto";
import { LoginUserDto } from "../dtos/user/login-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserDto } from "../dtos/user/user.dto";
import UserEntity from "../entities/user.entity";
import { IUserService } from "../interfaces/user-service.interface";
import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    try {
        const users: UserEntity[] = await this.userRepository.getUsers();
        const usersDtos: UserDto[] = users.map((user) => {
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
          );
        });
        return usersDtos;
    } catch (error: unknown) {
        throw new Error(`Error getting users: ${error}`);
    }
  }
  async getUserById(id: number): Promise<UserDto | null> {
    try {
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
          );
        }
        return user;
    } catch (error: unknown) {
        throw new Error(`Error getting user: ${error}`);
    }

  }

  async createUser(user: CreateUserDto): Promise<void> {
    try {
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser) {
          throw new Error("Email already in use");
        }
    
        const hashedPassword: string = await bcrypt.hash(user.password, 10);
    
        const userEntity: UserEntity = new UserEntity(
          0,
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
    } catch (error: unknown) {
        throw new Error(`Error creating user: ${error}`);
    }

  }

  async updateUser(id: number, userUpdate: UpdateUserDto): Promise<void> {
    try {
      const currentUser = await this.userRepository.getUserById(id);
      if (!currentUser) {
        throw new Error("User not found");
      }

      let updatedPassword = currentUser.password;
      if (userUpdate.password) {
        updatedPassword = await bcrypt.hash(userUpdate.password, 10);
      }

      const updatedUser = {
        ...userUpdate,
        password: updatedPassword,
      };

      await this.userRepository.updateUser(id, updatedUser);
    } catch (error: unknown) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        throw new Error(`User with id ${id} does not exist`);
      }
      await this.userRepository.deleteUser(id);
    } catch (error: unknown) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

  async validateUser(userLoginDto: LoginUserDto): Promise<string | null> {
    try {
        const user: UserEntity | null = await this.userRepository.getUserByEmail(
            userLoginDto.email
          );
          if (user) {
            // Verifica que la contraseña sea correcta
            const isPasswordValid = await bcrypt.compare(
              userLoginDto.password,
              user.password
            );
      
            if (isPasswordValid) {
              // Si la contraseña es correcta, generar un token JWT
              const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || "defaultSecretKey",
                { expiresIn: "1h" }
              );
              return token;
            }
          }
      
          return null;
    } catch (error: unknown) {
        throw new Error(`Error validating user: ${error}`);
      }
  }
}
