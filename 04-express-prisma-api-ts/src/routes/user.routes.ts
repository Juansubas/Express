import { Router, Response, Request } from "express";
import { UserRepository } from "../repositories/user.repository";
import prisma from "../config/prisma-client";
import { UserService } from "../services/user-service";
import UserController from "../controllers/user.controller";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();


router.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));
router.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.post('/users', (req: Request, res: Response) => userController.createUser(req, res));


export default router;