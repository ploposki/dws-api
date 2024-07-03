import { BandDto } from '@app/modules/bands/dtos/bands.dto';
import { BandServiceInterface } from '@app/modules/bands/services/bands.service.interface';
import { VercelApiService } from '../../vercel-api/services/vercel-api.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BandService implements BandServiceInterface {
  constructor(
    private readonly vercelApiService: VercelApiService,
  ) {}

  async getBandsInfo(searchByName: string, sortByName: string, sortByPlays: string): Promise<BandDto[]> {
    const info = await this.vercelApiService.getBandsInfo();
    let bands = info.data;

    if(sortByPlays === 'true') {
      bands = info.data.sort((a, b) => b.numPlays - a.numPlays);
    }

    if(sortByName === 'true') {
      bands = info.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    if(searchByName) {
      bands = info.data.filter(band => band.name.toLowerCase().includes(searchByName.toLowerCase()));
    }

    return bands.map(band => ({
      name: band.name.toUpperCase(),
      numPlays: `${band.numPlays} PLAYS`,
      image: band.image,
    }))
  }
}
