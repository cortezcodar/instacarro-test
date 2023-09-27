import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    exists(user: Pick<User, 'email'>): Promise<boolean>;
    findOne(user: Pick<User, 'email'>): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(user: User): Promise<User>;
}
