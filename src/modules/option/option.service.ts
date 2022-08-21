import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Option, OptionDocument } from './schema/option.schema';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name) private optionModel: Model<OptionDocument>,
  ) {}

  async createMany(createOptionDto) {
    const createdOption = new this.optionModel(createOptionDto);
    await createdOption.collection.insertMany(createOptionDto);

    return await this.optionModel
      .find({ campaignId: createOptionDto[0].campaignId })
      .exec();
  }

  async findById(id) {
    return await this.optionModel.findById(id);
  }

  async find(selector) {
    return await this.optionModel.find(selector).exec();
  }
}
