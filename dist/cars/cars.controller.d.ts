import { CarsService } from './cars.service';
import { RequestWithUser } from 'src/auth/dto/request.dto';
import { Response } from 'express';
import { CreateCarDto } from './dto/createCar.dto';
import { UpdateCarDto } from './dto/updateProduct.dto';
export declare class CarsController {
    private readonly CarsService;
    constructor(CarsService: CarsService);
    create(Car: CreateCarDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateCarDto: UpdateCarDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
