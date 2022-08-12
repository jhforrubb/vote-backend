import { ObjectId } from 'mongodb';

export class CreateVoteDto {
  campaign_id: ObjectId;
  option_id: ObjectId;
  hkid: string;
}
