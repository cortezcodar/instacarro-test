/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { Car } from "./entities/car.entity";
import { RequestWithUser } from "src/auth/dto/request.dto";
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Types } from "mongoose";
import { CreateCarDto } from "./dto/createCar.dto";
import { UpdateCarDto } from "./dto/updateProduct.dto";

@ApiTags("Cars")
@ApiCookieAuth(process.env.ACCESS_TOKEN_COOKIE_NAME)
@Controller("Cars")
export class CarsController {
  constructor(private readonly CarsService: CarsService) {}

  @Post()
  async create(
    @Body() Car: CreateCarDto,
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    const {
      model,
      version,
      brand,
      year,
      km,
      price,
      color,
      manufacture,
      plate,
      mileage,
      image,
    } = Car;
    const CarCreated = await this.CarsService.create(
      {
        model,
        version,
        brand,
        km,
        price,
        color,
        manufacture,
        plate,
        mileage,
        image,
        year,
      },
      req.user.id
    );
    return res.status(HttpStatus.CREATED).json(CarCreated);
  }

  @Get()
  async findAll(@Req() req: RequestWithUser, @Res() res: Response) {
    const Cars = await this.CarsService.findAll(req.user.id);
    return res.json(Cars);
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Car not found!");
    }
    const Cars = await this.CarsService.findOne(id, req.user.id);
    return res.json(Cars);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCarDto: UpdateCarDto,
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Car not found!");
    }
    const Car = await this.CarsService.update(id, updateCarDto, req.user.id);
    return res.json(Car);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException("Car not found!");
    }
    await this.CarsService.remove(id, req.user.id);
    return res.json({
      id,
      removed: true,
    });
  }
}
