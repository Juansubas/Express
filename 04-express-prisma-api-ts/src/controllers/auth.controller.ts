import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { LoginUserDto } from "../dtos/user/login-user.dto";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../enums/response-status.enum";

export class AuthController {
  constructor(private userService: UserService) {}

  async login(
    req: Request,
    res: Response
  ): Promise<Response<ResponseDto<void>>> {
    try {
      const data: LoginUserDto = req.body;

      if (!data.email || !data.password) {
        return res
          .status(400)
          .json(
            new ResponseDto(
              null,
              "Username and password are required",
              ResponseStatus.Error
            )
          );
      }

      const token: string | null = await this.userService.validateUser(data);

      if (token) {
        return res.status(200).json(
          new ResponseDto(
            {
              message: "Login successful",
              token: token,
              email: data.email,
            },
            "Credentials",
            ResponseStatus.Success
          )
        );
      } else {
        return res
          .status(401)
          .json(
            new ResponseDto(null, "Invalid credentials", ResponseStatus.Error)
          );
      }
    } catch (error) {
      console.error("error", error);
      return res
        .status(401)
        .json(
          new ResponseDto(null, "Internal Server Error", ResponseStatus.Error)
        );
    }
  }
}
