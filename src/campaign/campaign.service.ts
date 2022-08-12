import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schema/campaign.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(createCampaignDto) {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return await createdCampaign.save();
  }

  async findAll() {
    return await this.campaignModel.find().exec();
  }

  async findById(id) {
    return await this.campaignModel.findById(id);
  }

  async findCampaignVote() {
    return await this.campaignModel.aggregate([
      {
        $lookup: {
          from: 'options',
          localField: '_id',
          foreignField: 'campaign_id',
          as: 'options',
        },
      },
    ]);
  }
}
