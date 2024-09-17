import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { LoginUserDto } from "../dtos/user/login-user.dto";

export class AuthController {
    constructor(private userService: UserService) {}

    async login(req: Request, res: Response) {
        try {
            const data : LoginUserDto = req.body;
            const isValid = await this.userService.validateUser(data);

            if (isValid) {
                res.status(200).send({ message: 'Login successful' });
            } else {
                res.status(401).send({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('error', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}