import { BandDto } from '@app/modules/bands/dtos/bands.dto';

export interface BandServiceInterface {
  getBandsInfo(searchByName: string, sortByName: string, sortByPlays: string): Promise<BandDto[]>;
}
