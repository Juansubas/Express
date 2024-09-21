import { CreateTaskDto } from "../dtos/task/create-task.dto";
import TaskDto from "../dtos/task/task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";

export interface ITaskService {
    getTasks(userId : number): Promise<TaskDto[]>;
    getTaskById(userId : number, id: number): Promise<TaskDto | null>;
    createTask(idUser: number, user: CreateTaskDto): Promise<void>;
    updateTask(userId : number, id : number, userUpdate: UpdateTaskDto): Promise<void>;
    deleteTask(userId : number, id: number): Promise<void>;
}

