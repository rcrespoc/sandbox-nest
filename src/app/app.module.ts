import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { modules } from 'src/modules/index.modules';
import { ConfigModule } from '@nestjs/config';
import officeConfiguration from 'src/common/configuration/office.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        officeConfiguration
      ]
    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
