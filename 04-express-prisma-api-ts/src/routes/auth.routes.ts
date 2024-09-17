//Auth
import { Router, Response, Request } from "express";
import { UserRepository } from "../repositories/user.repository";
import prisma from "../config/prisma-client";
import { UserService } from "../services/user-service";
import { AuthController } from "../controllers/auth.controller";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => authController.login(req, res));


export default authRouter;