import { Module } from '@nestjs/common';
import { BandController } from '@app/modules/bands/controllers/bands.controller';
import { BandService } from '@app/modules/bands/services/bands.service';
import { VercelApiModule } from '../vercel-api/vercel-api.module';

@Module({
  imports: [VercelApiModule],
  controllers: [BandController],
  providers: [BandService],
})
export class BandModule {}
