import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from './campaign/campaign.module';
import { VoteModule } from './vote/vote.module';
import { OptionModule } from './option/option.module';
import config from './config';

const username = config.mongoDB.username;
const password = config.mongoDB.password;
const host = config.mongoDB.host;
const port = config.mongoDB.port;
const dbName = config.mongoDB.dbName;

@Module({
  imports: [
    CampaignModule,
    VoteModule,
    MongooseModule.forRoot(
      `mongodb://${username}:${password}@${host}:${port}/${dbName}`,
    ),
    OptionModule,
  ],
})
export class AppModule {}
