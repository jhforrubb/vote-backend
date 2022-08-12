import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionService } from './option.service';
import { Option, OptionSchema } from './schema/option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }]),
  ],
  providers: [OptionService],
  exports: [
    OptionService,
    MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }]),
  ],
})
export class OptionModule {}
