import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from '../../campaign/schema/campaign.schema';
import { ApiProperty } from '@nestjs/swagger';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaign_id: Campaign;

  @ApiProperty()
  @Prop({ required: true })
  name: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
