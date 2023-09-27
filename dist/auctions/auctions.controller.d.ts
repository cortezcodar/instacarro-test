import { AuctionsService } from './auctions.service';
import { RequestWithUser } from 'src/auth/dto/request.dto';
import { Response } from 'express';
import { AuctionFilters } from './auctionFilters';
import { CreateAuctionDto } from './dto/createAuction.dto';
import { UpdateAuctionDto } from './dto/updateAuction.dto';
export declare class AuctionsController {
    private readonly auctionsService;
    constructor(auctionsService: AuctionsService);
    create(auction: CreateAuctionDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(params: AuctionFilters, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateAuctionDto: UpdateAuctionDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
