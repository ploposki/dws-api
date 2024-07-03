import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BandController } from '@app/modules/bands/controllers/bands.controller';
import { BandService } from '@app/modules/bands/services/bands.service';
import { mockBandRes } from '../mocks/bands-mock';

describe('BandController', () => {
  let bandController: BandController;
  let bandService: BandService;

  let loggerInfo: jest.SpyInstance;
  let loggerError: jest.SpyInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [BandController],
      providers: [BandService],
    }).compile();

    bandController = moduleRef.get(BandController);
    bandService = moduleRef.get(BandService);

    loggerInfo = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    loggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  describe('getBandsInfo', () => {
    it('should return bands info', async () => {
      jest
        .spyOn(bandService, 'getBandsInfo')
        .mockResolvedValueOnce(mockBandRes);

      expect(await bandController.getBandsInfo(null, null, null)).toBe(mockBandRes);
      expect(loggerInfo).toHaveBeenCalledWith('getStatus()');
    });

    it('should throw an error', async () => {
      jest.spyOn(bandService, 'getBandsInfo').mockImplementationOnce(() => {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      });

      await expect(bandController.getBandsInfo(null, null, null)).rejects.toThrow(
        HttpException,
      );
      expect(loggerError).toBeCalledTimes(1);
    });
  });
});
