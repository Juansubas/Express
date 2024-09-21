import { CreateTaskDto } from "../dtos/task/create-task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import TaskEntity from "../entities/task.entity";

export interface ITaskRepository {
    getTasks(userId : number): Promise<TaskEntity[]>;
    getTaskById(userId : number, id: number): Promise<TaskEntity | null>;
    createTask(idUser: number, user: CreateTaskDto): Promise<void>;
    updateTask(userId : number, id : number, userUpdate: UpdateTaskDto): Promise<void>;
    deleteTask(userId : number, id: number): Promise<void>;
}

