import { CreateTaskDto } from "../dtos/task/create-task.dto";
import TaskDto from "../dtos/task/task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import TaskEntity from "../entities/task.entity";
import { ITaskService } from "../interfaces/task-service.interface";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService implements ITaskService{

    constructor(
        private readonly taskRepository : TaskRepository,
    ){}

    async getTasks(): Promise<TaskDto[]> {
        const tasks : TaskEntity [] = await this.taskRepository.getTasks();
        const tasksDto : TaskDto[] = tasks.map(task => {
            return new TaskDto(
                task.id,
                task.userId,
                task.title,
                task.content,
                task.complete,
                task.date,
                task.dueDate,
            )
        })
        return tasksDto;
    }
    async getTaskById(id: number): Promise<TaskDto | null> {
        const task : TaskEntity | null = await this.taskRepository.getTaskById(id);
        if(task) {
            return new TaskDto(
                task.id,
                task.userId,
                task.title,
                task.content,
                task.complete,
                task.date,
                task.dueDate,
            )
        }
        return task;
    }

    async createTask(idUser: number, user: CreateTaskDto): Promise<void> {
        await this.taskRepository.createTask(idUser, user);
    }
    updateTask(userUpdate: UpdateTaskDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}