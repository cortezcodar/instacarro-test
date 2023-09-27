import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/singup.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        name: string;
        email: string;
        Cars?: import("../cars/entities/car.entity").Car[];
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    signIn(user: any): Promise<{
        [x: string]: string;
    }>;
    getProfile(user: any): Promise<{
        name: string;
        email: string;
        Cars?: import("../cars/entities/car.entity").Car[];
    }>;
    bcrypt(password: string): Promise<string>;
}
