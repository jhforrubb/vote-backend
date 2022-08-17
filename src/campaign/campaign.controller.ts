import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import * as moment from 'moment';
import * as _ from 'lodash';
import { OptionService } from 'src/option/option.service';
import { VoteService } from 'src/vote/vote.service';
import { Request } from 'express';
import {
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('campaigns')
@Controller('campaign')
export class CampaignController {
  constructor(
    @Inject(forwardRef(() => VoteService))
    private voteService: VoteService,
    private campaignService: CampaignService,
    private optionService: OptionService,
  ) {}

  @ApiOperation({ summary: 'Create campaign' })
  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    const start = moment(createCampaignDto.start_time).toISOString();
    const end = moment(createCampaignDto.end_time).toISOString();

    if (!(end > start)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    const campaignParams = {
      title: createCampaignDto.title,
      start_time: start,
      end_time: end,
    };

    const campaign = await this.campaignService.create(campaignParams);

    const optionsParams = _.map(createCampaignDto.options, (item) => {
      return {
        campaign_id: campaign._id,
        name: item,
      };
    });

    const options = await this.optionService.createMany(optionsParams);

    return { ...campaign.toObject(), options };
  }

  @ApiOperation({ summary: 'Get all campaign' })
  @ApiHeader({ name: 'hkid' })
  @Get()
  async findAll(@Req() req: Request) {
    const hkid = req.headers.hkid;

    // if (!hkid) {
    //   throw new HttpException('Invalid hkid', HttpStatus.BAD_REQUEST);
    // }

    const campaigns = await this.campaignService.findCampaignVote();
    const res = Promise.all(
      _.map(campaigns, async (campaign) => {
        const count = await this.voteService.aggregate([
          { $match: { campaign_id: campaign._id } },
          { $group: { _id: '$option_id', count: { $count: {} } } },
        ]);
        if (hkid) {
          const hkidVoted = await this.voteService.findOne({
            hkid: hkid,
            campaign_id: campaign._id,
          });

          return { ...campaign, count: count, voted: hkidVoted };
        }
        return { ...campaign, count: count };
      }),
    );

    return res;
  }
}
