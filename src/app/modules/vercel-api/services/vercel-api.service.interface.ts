import { InfoDto } from '../dtos/info.dto';
import { AxiosResponse } from 'axios';

export interface VercelApiServiceInterface {
    getBandsInfo(): Promise<AxiosResponse<InfoDto[]>>;
}
