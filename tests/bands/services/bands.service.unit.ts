import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { BandService } from '@app/modules/bands/services/bands.service';
import { mockBandRes } from '../mocks/bands-mock';
import { VercelApiService } from '@app/modules/vercel-api/services/vercel-api.service';

describe('BandService', () => {
  let bandService: BandService;
  let vercelApiService: VercelApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [VercelApiService, BandService],
    }).compile();

    bandService = moduleRef.get(BandService);
    vercelApiService = moduleRef.get(VercelApiService);
  });

  describe('status', () => {
    it('should return bands info', async () => {
      jest.spyOn(
        vercelApiService,
        'getBandsInfo',
      ).mockResolvedValueOnce({data: mockBandRes} as any);

      expect(bandService.getBandsInfo(null, null, null)).toEqual(mockBandRes);
    });
  });
});
