import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from 'src/modules/campaign/schema/campaign.schema';
import { Option } from '../../option/schema/option.schema';
import { ApiProperty } from '@nestjs/swagger';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @ApiProperty()
  @Prop({ required: true })
  hkid: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaignId: Campaign;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Option' })
  optionId: Option;
}

const VoteSchema = SchemaFactory.createForClass(Vote);

VoteSchema.index({ campaignId: 1, hkid: 1 });

export { VoteSchema };
