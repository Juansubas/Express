import { Router, Request, Response } from "express";
import { TaskController  } from "../controllers/task.controller";
import { TaskService } from "../services/task-service";
import { TaskRepository } from "../repositories/task.repository";
import prisma from "../config/prisma-client";
import { authenticateToken } from "../middleware/auth.middleware";

const taskRouter = Router();

const taskRepository : TaskRepository = new TaskRepository(prisma);
const taskService : TaskService = new TaskService(taskRepository);
const taskController : TaskController = new TaskController(taskService);


taskRouter.use(authenticateToken);

taskRouter.get('/', (req : Request, res: Response) => taskController.getTasks(req, res));
taskRouter.get('/:id', (req : Request, res: Response) => taskController.getTaskById(req, res));
taskRouter.post('/', (req : Request, res: Response) => taskController.createTask(req, res));
taskRouter.put('/:id', (req : Request, res: Response) => taskController.updateTask(req, res));
taskRouter.delete('/:id', (req : Request, res: Response) => taskController.deleteTask(req, res));

export default taskRouter;