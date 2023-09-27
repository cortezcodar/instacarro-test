import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  version: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsArray()
  image: string[];

  @ApiProperty()
  @IsNumber()
  km: number;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  manufacture: string;

  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsString()
  mileage: string;
}
