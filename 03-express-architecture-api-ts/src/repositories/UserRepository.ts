import { UserDto } from "../dtos/userDto";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserModel } from "../models/UserModel";
import { JsonUtils } from "../utils/jsonDataUtils";
import { responseDto } from "../dtos/responseDto";
import dotenv from 'dotenv'

export class UserRepository implements IUserRepository <UserModel | void>{

    constructor(
        private path: string = 'src/db/db.json'
    ) {}
    
    async getUsers(): Promise<responseDto<UserModel>> {

        let response : responseDto <UserModel> ;

        try {
            const users : UserModel[] =await JsonUtils.readData(this.path);

            response = {
                result :  users,
                message : 'Usuarios obtenidos',
                status : 'Exitosamente'
            }

            return response;
        } catch (error : unknown) {
            console.error('Error getting users', error);

            response = {
                result : [],
                message : `${error}`,
                status: 'Error al obtener Usuarios'
            }

            return response;
        }
    }

    async getUserById(id: number): Promise<responseDto<UserModel>> {

        let response : responseDto<UserModel>;

        try {
            const data : UserModel[] = await JsonUtils.readData(this.path);
            const user : UserModel | undefined = data.find( user => user.id === id);

            if(user) {
                response = {
                    result :  user,
                    message : 'Usuarios obtenido',
                    status : 'Exitosamente'
                }

                return response;
            } 

            response = {
                result : [],
                message : 'Usuario no encontrado',
                status: 'Exitoso'
            }

            return response;
        } catch (error : unknown) {
            console.error('Error getting users', error);

            response = {
                result : [],
                message : `${error}`,
                status: 'Error al obtener el usuario'
            }

            return response;
        }
    }

    async createUser(user: UserDto): Promise<responseDto<void>> {
        let response : responseDto<void>;
        try {

            const data : UserModel[] = await JsonUtils.readData(this.path);
            // Verificar que todos los campos requeridos estén presentes
            if (!user.name || !user.email || user.age === undefined || user.active === undefined) {
                throw new Error('Datos incompletos para crear un usuario');
            }
            const newUser : UserModel= {
                id : data.length + 1,
                ...user
            };

            data.push(newUser)

            await JsonUtils.writeData(this.path, data);

            response = {
                result : undefined,
                message : 'Usuario creado',
                status: 'Exitosamente'
            }

            return  response;

        } catch (error : unknown) {
            console.error('Error creating user', error);

            response = {
                result : [],
                message : `${error}`,
                status: 'Error al crear el usuario'
            }

            return response;
        }
    }
    async updateUser(id: number, user: UserDto): Promise<responseDto<UserModel>> {
        let response : responseDto<UserModel>;
        try {

            const users : UserModel[] = await JsonUtils.readData(this.path);
            const index = users.findIndex(user => user.id === id);
            const newUser : UserModel= {
                id, 
                ...user
            }

            users[index] = {...newUser}
            
            await JsonUtils.writeData(this.path, users);

            response = {
                result : newUser,
                message : "Usuario Actualizado",
                status : "Exitoso"
            }

            return response;

        }   catch (error : unknown) {
                console.error('Error Updating user', error);
    
                response = {
                    result : [],
                    message : `${error}`,
                    status: 'Error al actualizar el usuario'
                }
    
                return response;
            }

        } 

    async deleteUser(id: number): Promise<responseDto<void>> {
        let response : responseDto<void>;
        try {

            const users : UserModel[] = await JsonUtils.readData(this.path);

            const index: number = users.findIndex(user => user.id === id);

            if( index !== -1) {
                users.splice(index, 1);
                await JsonUtils.writeData(this.path, users);
                response = {
                    result: undefined,
                    message: 'Usuario eliminado',
                    status: 'Exitoso'
                };
                return response;
            }

            response = {
                result: undefined,
                message: 'Usuario no encontrado',
                status: 'Exitoso'
            };
            return response;


        } catch (error : unknown) {
            console.error('error deleting user', error);

            response = {
                result: undefined,
                message: `${error}`,
                status: 'Error al eliminar el usuario'
            };

            return response;
        }
    }

}