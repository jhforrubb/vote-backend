import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from './campaign/campaign.module';
import { VoteModule } from './vote/vote.module';
import { OptionModule } from './option/option.module';

@Module({
  imports: [
    CampaignModule,
    VoteModule,
    MongooseModule.forRoot('mongodb://vote:vote123@localhost:27017/admin'),
    OptionModule,
  ],
})
export class AppModule {}
