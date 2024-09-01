import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";

const router = Router() ;

const userController: UserController = new UserController();

router.get('/users', (req: Request, res: Response) => userController.getUsers(req, res));

router.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));

router.post('/users', (req: Request, res: Response) => userController.createUser(req, res));

router.put('/users/:id', (req: Request, res: Response) => userController.actualizarUser(req, res));

router.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

export default router;