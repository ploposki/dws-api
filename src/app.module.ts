import { Module } from '@nestjs/common';
import { BandModule } from '@app/modules/bands/bands.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/configs/app.config';

@Module({
  imports: [
    BandModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
