import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from 'src/campaign/schema/campaign.schema';
import { Option } from 'src/option/schema/option.schema';
import { ApiProperty } from '@nestjs/swagger';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @ApiProperty()
  @Prop({ required: true })
  hkid: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaign_id: Campaign;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Option' })
  option_id: Option;
}

const VoteSchema = SchemaFactory.createForClass(Vote);

VoteSchema.index({ campaign_id: 1, hkid: 1 });

export { VoteSchema };
