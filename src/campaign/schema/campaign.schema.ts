import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  start_time: string;

  @Prop({ required: true })
  end_time: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
