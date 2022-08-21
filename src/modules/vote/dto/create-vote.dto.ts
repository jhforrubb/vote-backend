import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty({ example: '62f4e07c31cb93b5f116ee09' })
  campaignId: string;
  @ApiProperty({ example: '62f4e07c31cb93b5f116ee0d' })
  optionId: string;
  @ApiProperty({ example: 'X3236272' })
  hkid: string;
}
