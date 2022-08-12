import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from 'src/campaign/campaign.module';
import { OptionModule } from 'src/option/option.module';
import { Vote, VoteSchema } from './schema/vote.schema';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [
    forwardRef(() => CampaignModule),
    OptionModule,
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [
    VoteService,
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
})
export class VoteModule {}
