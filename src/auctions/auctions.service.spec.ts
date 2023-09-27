import { Test, TestingModule } from "@nestjs/testing";
import { AuctionsService } from "./auctions.service";
import { getModelToken } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { CarsService } from "src/cars/cars.service";
import { AuctionStatusEnum } from "./dto/auctionStatus.enum";

describe("AuctionsService", () => {
  let service: AuctionsService;
  const mockAuctionModel = {
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    count: jest.fn(),
  };
  const mockCarsService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuctionsService,
        {
          provide: getModelToken("Auction"),
          useValue: mockAuctionModel,
        },
        {
          provide: CarsService,
          useValue: mockCarsService,
        },
      ],
    }).compile();

    service = module.get<AuctionsService>(AuctionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create an auction", async () => {
      const CarId = "car123";
      const userId = "user456";

      const mockCarFromUser = {
        _id: "car123",
      };

      mockCarsService.findOne.mockResolvedValue(mockCarFromUser);
      mockAuctionModel.findOneAndUpdate.mockResolvedValue({
        _id: "auction123",
        status: AuctionStatusEnum.AWAITING,
      });

      const auctionDto = {
        status: AuctionStatusEnum.AWAITING,
      };

      const result = await service.create(auctionDto, CarId, userId);

      expect(result).toEqual(expect.objectContaining(auctionDto));
      expect(mockCarsService.findOne).toHaveBeenCalledWith(CarId, userId);
      expect(mockAuctionModel.findOneAndUpdate).toHaveBeenCalledWith(
        { Car: CarId },
        auctionDto,
        { upsert: true }
      );
      expect(mockCarsService.update).toHaveBeenCalledWith(
        CarId,
        { auction: expect.objectContaining(auctionDto) },
        userId
      );
    });

    it("should throw NotFoundException when Car not found", async () => {
      const CarId = "car123";
      const userId = "user456";

      mockCarsService.findOne.mockResolvedValue(null);

      await expect(service.create({}, CarId, userId)).rejects.toThrowError(
        NotFoundException
      );

      expect(mockCarsService.findOne).toHaveBeenCalledWith(CarId, userId);
      expect(mockAuctionModel.findOneAndUpdate).not.toHaveBeenCalled();
      expect(mockCarsService.update).not.toHaveBeenCalled();
    });
  });
});
