import { Module } from '@nestjs/common';
import { VercelApiService } from './services/vercel-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [VercelApiService],
    exports: [VercelApiService],
})
export class VercelApiModule {}
