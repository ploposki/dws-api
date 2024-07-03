import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Logger,
  Query,
} from '@nestjs/common';
import { BandService } from '@app/modules/bands/services/bands.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { BandControllerInterface } from '@app/modules/bands/controllers/bands.controller.interface';
import { BandDto } from '@app/modules/bands/dtos/bands.dto';
import { ErrorDto } from '@app/modules/bands/dtos/error.dto';

@ApiTags('bands')
@Controller('bands')
export class BandController implements BandControllerInterface {
  constructor(private readonly bandService: BandService) {}

  @Get('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get bands info' })
  @ApiResponse({
    status: 200,
    description: 'ok',
    type: BandDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  @ApiQuery({
    name: 'sort_by_name',
    required: false,
    type: Boolean,
  })
  async getBandsInfo(@Query('search_by_name') searchByName: string, @Query('sort_by_name') sortByName: string, @Query('sort_by_plays') sortByPlays: string) {
    const logger = new Logger(BandController.name);

    try {
      logger.log('getBandsInfo()');
      return await this.bandService.getBandsInfo(searchByName, sortByName, sortByPlays);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
