import { ResponseDto } from "../dtos/response.dto";
import { CreateTaskDto } from "../dtos/task/create-task.dto";
import TaskDto from "../dtos/task/task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import { ResponseStatus } from "../enums/response-status.enum";
import { TaskService } from "../services/task-service";
import { Request, Response } from "express";

export class TaskController{

    constructor(
        private readonly taskService : TaskService
    ){}

    async getTasks(req: Request, res: Response): Promise<Response<ResponseDto<TaskDto[]>>>{
        try {
            const userId : number | undefined = req.user?.userId; // Obtener userId del claim del token aun pendiente
            console.log("userId", userId);

            if (!userId) {
                return res.status(401).json(new ResponseDto(null, 'User ID not found', ResponseStatus.Error));
            }

            const tasks : TaskDto[] = await this.taskService.getTasks(userId);

            return res.status(200).json(new ResponseDto(tasks, 'Tasks Obtaining Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async getTaskById(req: Request, res: Response): Promise<Response<ResponseDto<TaskDto>>>{
        try {

            const userId : number | undefined = req.user?.userId; // Obtener userId del claim del token aun pendiente

            if (!userId) {
                return res.status(401).json(new ResponseDto(null, 'User ID not found', ResponseStatus.Error));
            }

            const id : number = parseInt(req.params.id);
            const task : TaskDto | null = await this.taskService.getTaskById(userId,id);
            return res.status(200).json(new ResponseDto(task, 'Task Obtained Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }
    async createTask(req: Request, res: Response): Promise<Response<ResponseDto<null>>>{
        try {
            const task : CreateTaskDto = req.body;
            const userId : number | undefined = req.user?.userId;

            if (!userId) {
                return res.status(401).json(new ResponseDto(null, 'User ID not found', ResponseStatus.Error));
            }

            if (!task) {
                return res.status(404).json(new ResponseDto(null, 'Task not found', ResponseStatus.Error));
            }

            await this.taskService.createTask(userId, task)

            return res.status(200).json(new ResponseDto(null, 'Created Task Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }

    async updateTask(req : Request, res: Response): Promise<Response<ResponseDto<null>>> {
        try {

            const userId : number | undefined = req.user?.userId; // Obtener userId del claim del token aun pendiente

            if (!userId) {
                return res.status(401).json(new ResponseDto(null, 'User ID not found', ResponseStatus.Error));
            }

            const id : number = parseInt(req.params.id);
            const taskUpdate : UpdateTaskDto = { id, ...req.body};
            await this.taskService.updateTask(userId, taskUpdate);

            return res.status(200).json(new ResponseDto(null, 'Updating Task Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }

    async deleteTask(req : Request, res: Response): Promise<Response<ResponseDto<null>>> {
        try {
            const userId : number | undefined = req.user?.userId; // Obtener userId del claim del token aun pendiente

            if (!userId) {
                return res.status(401).json(new ResponseDto(null, 'User ID not found', ResponseStatus.Error));
            }
            const id : number = parseInt(req.params.id);
            await this.taskService.deleteTask(userId, id);
            return res.status(200).json(new ResponseDto(null, 'Task Deleted Successfully', ResponseStatus.Success));
        } catch (error : unknown) {
            console.error('error', error);
            return res.status(500).json(new ResponseDto(null, 'Internal Server Error', ResponseStatus.Error))
        }
    }

}