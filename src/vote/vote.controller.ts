import {
  Body,
  Controller,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';
import * as hkid from 'hkid';
import { CampaignService } from 'src/campaign/campaign.service';
import { OptionService } from 'src/option/option.service';
import moment from 'moment';

@Controller('vote')
export class VoteController {
  constructor(
    @Inject(forwardRef(() => CampaignService))
    private campaignService: CampaignService,
    private voteService: VoteService,
    private optionService: OptionService,
  ) {}

  @Post()
  async create(@Body() createVoteDto: CreateVoteDto) {
    //validate hkid
    if (!hkid.validate(createVoteDto.hkid)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    //check campaign
    const campaign = await this.campaignService.findById(
      createVoteDto.campaign_id,
    );

    if (!campaign) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    //check end time
    if (new Date(campaign.end_time) < new Date()) {
      throw new HttpException('Vote ended', HttpStatus.BAD_REQUEST);
    }

    //check option
    const option = await this.optionService.findById(createVoteDto.option_id);

    if (!option) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    //check vote
    const checkVote = await this.voteService.findOne({
      campaign_id: createVoteDto.campaign_id,
      hkid: createVoteDto.hkid,
    });

    if (checkVote) {
      throw new HttpException('Duplicate vote', HttpStatus.BAD_REQUEST);
    }

    return this.voteService.create(createVoteDto);
  }
}
