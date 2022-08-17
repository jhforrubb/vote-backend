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
import * as bcrypt from 'bcryptjs';
import { signKey } from 'src/utils/signKey';
import config from 'src/config';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('votes')
@Controller('vote')
export class VoteController {
  constructor(
    @Inject(forwardRef(() => CampaignService))
    private campaignService: CampaignService,
    private voteService: VoteService,
    private optionService: OptionService,
  ) {}

  @ApiOperation({ summary: 'Create vote' })
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
    const hash = signKey(config.hash.hashSaltKey, createVoteDto.hkid);

    const checkVote = await this.voteService.findOne({
      campaign_id: createVoteDto.campaign_id,
      hkid: hash,
    });

    if (checkVote) {
      throw new HttpException('Duplicate vote', HttpStatus.BAD_REQUEST);
    }

    const createParams = {
      campaign_id: createVoteDto.campaign_id,
      option_id: createVoteDto.option_id,
      hkid: hash,
    };

    return this.voteService.create(createParams);
  }
}
