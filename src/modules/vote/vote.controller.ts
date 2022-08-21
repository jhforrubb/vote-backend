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
import { CampaignService } from 'src/modules/campaign/campaign.service';
import { OptionService } from '../option/option.service';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'src/utils/createHash';
import config from 'src/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
      throw new HttpException('Invalid hkid', HttpStatus.BAD_REQUEST);
    }

    //check campaign
    const campaign = await this.campaignService.findById(
      createVoteDto.campaignId,
    );

    if (!campaign) {
      throw new HttpException('Invalid campaign', HttpStatus.BAD_REQUEST);
    }

    //check end time
    if (new Date(campaign.endTime) < new Date()) {
      throw new HttpException('Vote ended', HttpStatus.BAD_REQUEST);
    }

    //check option
    const option = await this.optionService.findById(createVoteDto.optionId);

    if (!option) {
      throw new HttpException('Invalid option', HttpStatus.BAD_REQUEST);
    }

    //check vote
    const hash = createHash(createVoteDto.hkid);

    const checkVote = await this.voteService.findOne({
      campaignId: createVoteDto.campaignId,
      hkid: hash,
    });

    if (checkVote) {
      throw new HttpException('Duplicate vote', HttpStatus.BAD_REQUEST);
    }

    const createParams = {
      campaignId: createVoteDto.campaignId,
      optionId: createVoteDto.optionId,
      hkid: hash,
    };

    return this.voteService.create(createParams);
  }
}
