import { CreateTaskDto } from "../dtos/task/create-task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import TaskEntity from "../entities/task.entity";
import { ITaskRepository } from "../interfaces/task-repository.interface";
import { PrismaClient } from "@prisma/client";

export class TaskRepository implements ITaskRepository {

    constructor(
        private readonly prisma : PrismaClient
    ){}

    async getTasks(): Promise<TaskEntity[]> {
        try {
            const tasks : TaskEntity[] = await this.prisma.task.findMany();
            return tasks;
        } catch (error : unknown) {
            console.error('Error getting tasks', error);
            throw new Error('Error fetching tasks from the database');
        }
    }

    async getTaskById(id: number): Promise<TaskEntity | null> {
        try {
            const user : TaskEntity | null = await this.prisma.task.findUnique({
                where: {
                    id: id
                }
            })

            return user;
        } catch (error : unknown) {
            console.error('Error getting user', error);
            throw new Error('Error fetching user from database');
        }
    }

    async createTask(userId: number, task: CreateTaskDto): Promise<void> {
        try {
            await this.prisma.task.create({
                data: {
                    userId: userId,
                    title: task.title,
                    content: task.content,
                    dueDate: task.dueDate
                }
            });
        } catch (error : unknown) {
            console.error('Error Creating Task', error);
            throw new Error('Error Creating User from the database');
        }
    }
    updateTask(userUpdate: UpdateTaskDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}