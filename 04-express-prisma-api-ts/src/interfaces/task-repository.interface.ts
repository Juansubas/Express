import { CreateTaskDto } from "../dtos/task/create-task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import TaskEntity from "../entities/task.entity";

export interface ITaskRepository {
    getTasks(): Promise<TaskEntity[]>;
    getTaskById(id: number): Promise<TaskEntity | null>;
    createTask(idUser: number, user: CreateTaskDto): Promise<void>;
    updateTask(userUpdate: UpdateTaskDto): Promise<void>;
    deleteTask(id: number): Promise<void>;
}

