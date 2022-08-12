import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from '../../campaign/schema/campaign.schema';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaign_id: Campaign;

  @Prop({ required: true })
  name: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
