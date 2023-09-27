import { BidsService } from './bids.service';
import { RequestWithUser } from 'src/auth/dto/request.dto';
import { Response } from 'express';
import { CreateBidDto } from './dto/createBid.dto';
export declare class BidsController {
    private readonly bidsService;
    constructor(bidsService: BidsService);
    create(bid: CreateBidDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
