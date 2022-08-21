import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote, VoteDocument } from './schema/vote.schema';

@Injectable()
export class VoteService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<VoteDocument>) {}

  async create(createVoteDto) {
    const createdVote = new this.voteModel(createVoteDto);
    return await createdVote.save();
  }

  async findOne(selector) {
    return await this.voteModel.findOne(selector);
  }

  async aggregate(pipeline) {
    return await this.voteModel.aggregate(pipeline);
  }
}
