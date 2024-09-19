import { Router, Response, Request } from "express";
import { UserRepository } from "../repositories/user.repository";
import prisma from "../config/prisma-client";
import { UserService } from "../services/user-service";
import UserController from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const authController = new AuthController(userService);

const userRouter = Router();


userRouter.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));
userRouter.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));
userRouter.post('/users', (req: Request, res: Response) => userController.createUser(req, res));


export default userRouter;