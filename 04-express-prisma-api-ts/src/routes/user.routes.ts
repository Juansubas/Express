import { Router, Response, Request } from "express";
import { UserRepository } from "../repositories/user.repository";
import prisma from "../config/prisma-client";
import { UserService } from "../services/user-service";
import UserController from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const authController = new AuthController(userService);

const userRouter = Router();

userRouter.post('/', (req: Request, res: Response) => userController.createUser(req, res));

userRouter.use(authenticateToken);

userRouter.get('/', (req: Request, res: Response) => userController.getUsers(req, res));
userRouter.get('/:id', (req: Request, res: Response) => userController.getUserById(req, res));
userRouter.put('/:id', (req: Request, res: Response) => userController.updateUser(req, res));
userRouter.delete('/:id', (req: Request, res: Response) => userController.deleteUser(req, res));


export default userRouter;