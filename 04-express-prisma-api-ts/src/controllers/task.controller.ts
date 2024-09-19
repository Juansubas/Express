import { CreateTaskDto } from "../dtos/task/create-task.dto";
import TaskDto from "../dtos/task/task.dto";
import { TaskService } from "../services/task-service";
import { Request, Response } from "express";

export class TaskController{

    constructor(
        private readonly taskService : TaskService
    ){}

    async getTasks(req: Request, res: Response): Promise<void>{
        try {
            const tasks : TaskDto[] = await this.taskService.getTasks();

            res.status(200).json(tasks);
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    async getTaskById(req: Request, res: Response): Promise<void>{
        try {
            const id : number = parseInt(req.params.id);
            const task : TaskDto | null = await this.taskService.getTaskById(id);
            res.status(200).json(task);
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    async createTask(req: Request, res: Response): Promise<void>{
        try {
            const task : CreateTaskDto = req.body;
            const idUser : number = 2;
            res.status(200).json(await this.taskService.createTask(idUser, task));
        } catch (error : unknown) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    }
    // async getTaskById(id: number): Promise<void>;
    // async createTask(idUser: number, user: CreateTaskDto): Promise<void>;
    // updateTask(userUpdate: UpdateTaskDto): Promise<void>;
    // deleteTask(id: number): Promise<void>;
}