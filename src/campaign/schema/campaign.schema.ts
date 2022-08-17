import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  start_time: string;

  @ApiProperty()
  @Prop({ required: true })
  end_time: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
