import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { VoteService } from 'src/vote/vote.service';
import { OptionService } from 'src/option/option.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ObjectId } from 'mongodb';

describe('Campaign Controller', () => {
  let controller: CampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              title: 'dummy',
              start_time: '2020-12-09T16:00:00.000Z',
              end_time: '2021-09-29T16:00:00.000Z',
              _id: new ObjectId('62f5292dd2734c90fff193a6'),
              __v: 0,
            }),
            findCampaignVote: jest.fn().mockResolvedValue([
              {
                _id: new ObjectId('62f3f3468bccb866e399ff93'),
                title: 'Who is the best NBA player in history',
                start_time: '2021-12-09T16:00:00.000Z',
                end_time: '2021-12-10T16:00:00.000Z',
                __v: 0,
                options: [
                  {
                    _id: '62f3f3468bccb866e399ff97',
                    campaign_id: '62f3f3468bccb866e399ff93',
                    name: 'Michael Jordan',
                  },
                  {
                    _id: '62f3f3468bccb866e399ff98',
                    campaign_id: '62f3f3468bccb866e399ff93',
                    name: 'Kobe Bryant',
                  },
                  {
                    _id: '62f3f3468bccb866e399ff99',
                    campaign_id: '62f3f3468bccb866e399ff93',
                    name: 'Leborn James',
                  },
                ],
              },
              {
                _id: new ObjectId('62f3f3848bccb866e399ff9a'),
                title: 'Which HK CEO candidate you are preferred.',
                start_time: '2020-12-09T16:00:00.000Z',
                end_time: '2022-09-29T16:00:00.000Z',
                __v: 0,
                options: [
                  {
                    _id: '62f3f3848bccb866e399ff9e',
                    campaign_id: '62f3f3848bccb866e399ff9a',
                    name: 'Regina',
                  },
                  {
                    _id: '62f3f3848bccb866e399ff9f',
                    campaign_id: '62f3f3848bccb866e399ff9a',
                    name: '777',
                  },
                  {
                    _id: '62f3f3848bccb866e399ffa0',
                    campaign_id: '62f3f3848bccb866e399ff9a',
                    name: '689',
                  },
                ],
              },
            ]),
          },
        },
        {
          provide: VoteService,
          useValue: {
            aggregate: jest.fn().mockResolvedValue([
              {
                _id: '62f3f3468bccb866e399ff98',
                count: 1,
              },
              {
                _id: '62f3f3468bccb866e399ff97',
                count: 3,
              },
            ]),
          },
        },
        {
          provide: OptionService,
          useValue: {
            createMany: jest.fn().mockResolvedValue([
              {
                _id: '62f5292dd2734c90fff193aa',
                campaign_id: '62f5292dd2734c90fff193a6',
                name: 'asd',
              },
              {
                _id: '62f5292dd2734c90fff193ab',
                campaign_id: '62f5292dd2734c90fff193a6',
                name: 'dfg',
              },
              {
                _id: '62f5292dd2734c90fff193ac',
                campaign_id: '62f5292dd2734c90fff193a6',
                name: 'cvb',
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
  });

  describe('create', () => {
    it('should return a new campaign', async () => {
      const returnedCampaign = await controller.create({
        title: 'dummy',
        start_time: '2020-12-10',
        end_time: '2021-09-30',
        options: ['asd', 'dfg', 'cvb'],
      });
      expect(returnedCampaign.title).toBe('dummy');
      expect(returnedCampaign.id).toBe('62f5292dd2734c90fff193a6');
    });
  });
  describe('findAll', () => {
    it('should get the list of campaigns', async () => {
      const retCampaigns = await controller.findAll();
      expect(typeof retCampaigns).toBe('object');
      expect(retCampaigns[0].id).toBe('62f3f3468bccb866e399ff93');
      expect(retCampaigns[0].name).toBe(
        'Who is the best NBA player in history',
      );
      expect(retCampaigns.length).toBe(1);
      //toEqual()
    });
  });
});
