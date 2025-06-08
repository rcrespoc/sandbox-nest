import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { modules } from 'src/modules/index.modules';
import { ConfigModule } from '@nestjs/config';
import officeConfiguration from 'src/common/configuration/office.configuration';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OfficeClientGrpcService } from 'src/modules/offices/grpc/office.grpc.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OFFICE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'office',
          protoPath: join(process.cwd(), 'src/proto/office.proto'),
          url: 'localhost:6565'
        }
      }
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        officeConfiguration
      ]
    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService, OfficeClientGrpcService],
})
export class AppModule {}
