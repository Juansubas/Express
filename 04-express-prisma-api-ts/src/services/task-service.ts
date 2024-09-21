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

    async getTasks(userId : number): Promise<TaskDto[]> {
        try {
            const tasks : TaskEntity [] = await this.taskRepository.getTasks(userId);
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
        } catch (error: unknown) {
            throw new Error(`Error getting Tasks: ${error}`);
        }
    }
    async getTaskById(userId : number, id: number): Promise<TaskDto | null> {
        try {
            const task : TaskEntity | null = await this.taskRepository.getTaskById(userId, id);
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
        } catch (error: unknown) {
            throw new Error(`Error getting Task: ${error}`);
        }

    }

    async createTask(idUser: number, user: CreateTaskDto): Promise<void> {
        try {
            await this.taskRepository.createTask(idUser, user);
        } catch (error: unknown) {
            throw new Error(`Error creating task: ${error}`);
        }
    }
    async updateTask(userId : number, id : number, userUpdate: UpdateTaskDto): Promise<void> {
        try {
            const task = await this.taskRepository.getTaskById(userId, id);

            if(!task) {
                throw new Error(`Task with id ${id} does not exist`);
            }

            const updateTask = {
                ...userUpdate
            };

            await this.taskRepository.updateTask(userId, id, updateTask);
        } catch (error: unknown) {
            throw new Error(`Error updating Task : ${error}`);
          }
    }
    async deleteTask(userId : number, id: number): Promise<void> {
        try {
            const task = await this.taskRepository.getTaskById(userId, id);

            if(!task) {
                throw new Error(`Task with id ${id} does not exist`);
            }

            await this.taskRepository.deleteTask(userId, id);
        } catch (error: unknown) {
            throw new Error(`Error deleting task: ${error}`);
          }
    }

}