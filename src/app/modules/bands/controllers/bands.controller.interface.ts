import { BandDto } from '@app/modules/bands/dtos/bands.dto';

export interface BandControllerInterface {
  getBandsInfo(searchByName: string, sortByName: string, sortByPlays: string): Promise<BandDto[]>;
}
