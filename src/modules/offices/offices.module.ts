import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficeRepository } from 'src/repositories/offices/office.repository';
import { OfficeMapper } from 'src/common/mappers/office.mapper';
import { HttpService } from 'src/common/http/http.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OfficesController],
  providers: [
    OfficesService,
    OfficeRepository,
    OfficeMapper,
    HttpService,
    ConfigService
  ],
})
export class OfficesModule {}
