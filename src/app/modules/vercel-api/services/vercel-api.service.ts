import { Injectable } from '@nestjs/common';
import { VercelApiServiceInterface } from './vercel-api.service.interface';
import { InfoDto } from '../dtos/info.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VercelApiService implements VercelApiServiceInterface {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getBandsInfo(): Promise<AxiosResponse<InfoDto[]>> {
        const url = this.configService.get('api.vercel');
        const info = await this.httpService.axiosRef.get<InfoDto[]>(url);
        return info;
    }
}
