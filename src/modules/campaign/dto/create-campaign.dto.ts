import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Sample question' })
  title: string;

  @ApiProperty({ example: '2022-8-20' })
  startTime: string;

  @ApiProperty({ example: '2022-9-20' })
  endTime: string;

  @ApiProperty({ type: [String], example: ['dummy', 'fake', 'sample'] })
  options: string[];
}
