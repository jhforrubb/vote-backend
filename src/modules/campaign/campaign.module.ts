import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionModule } from '../option/option.module';
import { VoteModule } from '../vote/vote.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { OptionService } from '../option/option.service';
import { VoteService } from '../vote/vote.service';
import { Campaign, CampaignSchema } from './schema/campaign.schema';

@Module({
  imports: [
    forwardRef(() => VoteModule),
    OptionModule,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, VoteService, OptionService],
  exports: [
    CampaignService,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
})
export class CampaignModule {}
