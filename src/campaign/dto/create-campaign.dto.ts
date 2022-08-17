import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Sample question' })
  title: string;

  @ApiProperty({ example: '2022-8-20' })
  start_time: string;

  @ApiProperty({ example: '2022-9-20' })
  end_time: string;

  @ApiProperty({ type: [String], example: ['dummy', 'fake', 'sample'] })
  options: string[];
}
