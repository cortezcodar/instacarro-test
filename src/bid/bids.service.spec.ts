import { Test, TestingModule } from "@nestjs/testing";
import { BidsService } from "./bids.service";
import { getModelToken } from "@nestjs/mongoose";
import { BadRequestException } from "@nestjs/common";
import { AuctionsService } from "src/auctions/auctions.service";

describe("BidsService", () => {
  let service: BidsService;
  let auctionsService: AuctionsService;

  const mockBidModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidsService,
        AuctionsService,
        {
          provide: getModelToken("Bid"),
          useValue: mockBidModel,
        },
      ],
    }).compile();

    service = module.get<BidsService>(BidsService);
    auctionsService = module.get<AuctionsService>(AuctionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a bid", async () => {
    const auctionId = "auction123";
    const userId = "user456";
    const bidData = {
      auction: auctionId,
      amount: 100.0,
    };

    jest.spyOn(auctionsService, "isAcceptBids").mockResolvedValue(true);

    const createdBid = {
      ...bidData,
      _id: "mockBidId",
    };
    mockBidModel.create.mockResolvedValue(createdBid);

    const result = await service.create(bidData, auctionId, userId);

    expect(result).toEqual(createdBid);
    expect(mockBidModel.create).toHaveBeenCalledWith({
      ...bidData,
      auction: auctionId,
      user: userId,
    });
    expect(auctionsService.isAcceptBids).toHaveBeenCalledWith(auctionId);
  });

  it("should throw BadRequestException when auction is not accepting bids", async () => {
    const auctionId = "auction123";
    const userId = "user456";
    const bidData = {
      auction: auctionId,
      amount: 100.0,
    };

    jest.spyOn(auctionsService, "isAcceptBids").mockResolvedValue(false);

    await expect(service.create(bidData, auctionId, userId)).rejects.toThrow(
      BadRequestException
    );

    expect(auctionsService.isAcceptBids).toHaveBeenCalledWith(auctionId);
  });
});
