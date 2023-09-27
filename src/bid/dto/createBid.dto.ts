import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBidDto {
  @IsString()
  @ApiProperty({
    description: 'Auction id',
  })
  auction?: string;

  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @ApiProperty()
  amount?: number;
}
