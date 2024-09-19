import { CreateTaskDto } from "../dtos/task/create-task.dto";
import TaskDto from "../dtos/task/task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";

export interface ITaskService {
    getTasks(): Promise<TaskDto[]>;
    getTaskById(id: number): Promise<TaskDto | null>;
    createTask(idUser: number, user: CreateTaskDto): Promise<void>;
    updateTask(userUpdate: UpdateTaskDto): Promise<void>;
    deleteTask(id: number): Promise<void>;
}

