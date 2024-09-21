import { CreateTaskDto } from "../dtos/task/create-task.dto";
import { UpdateTaskDto } from "../dtos/task/update-task.dto";
import TaskEntity from "../entities/task.entity";
import { ITaskRepository } from "../interfaces/task-repository.interface";
import { PrismaClient } from "@prisma/client";

export class TaskRepository implements ITaskRepository {

    constructor(
        private readonly prisma : PrismaClient
    ){}

    async getTasks(userId : number): Promise<TaskEntity[]> {
        try {
            const tasks : TaskEntity[] = await this.prisma.task.findMany({
                where: {
                    userId: userId
                }
            });
            return tasks;
        } catch (error : unknown) {
            console.error('Error getting tasks', error);
            throw new Error('Error fetching tasks from the database');
        }
    }

    async getTaskById(userId : number, id: number): Promise<TaskEntity | null> {
        try {
            const task : TaskEntity | null = await this.prisma.task.findUnique({
                where: {
                    id: id,
                    userId : userId
                }
            })

            return task;
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
        }
    }
    async updateTask(userId : number, id : number, taskUpdate: UpdateTaskDto): Promise<void> {
        try {
            await this.prisma.task.update({
                where: {
                    id: id,
                    userId: userId
                },
                data: {
                    title: taskUpdate.title,
                    content: taskUpdate.content,
                    dueDate: taskUpdate.dueDate
                }
            });
        } catch (error : unknown) {
            console.error('Error Updating Task', error);
            throw new Error('Error Updating Task');
        }
    }
    async deleteTask(userId : number, id: number): Promise<void> {
        try {
            await this.prisma.task.delete({
                where: {
                    id: id,
                    userId: userId
                }
            });

        } catch (error : unknown) {
            console.error('Error Deleting Task', error);
            throw new Error('Error Deleting Task');
        }
    }
}