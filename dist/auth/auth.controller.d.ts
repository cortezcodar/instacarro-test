import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singup.dto';
import { RequestWithUser } from './dto/request.dto';
import { SignInDto } from './dto/singin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signIn(signInDto: SignInDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    signOut(res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: RequestWithUser): Promise<{
        name: string;
        email: string;
        Cars?: import("../cars/entities/car.entity").Car[];
    }>;
}
