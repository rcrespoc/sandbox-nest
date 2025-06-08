import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { OfficeClientGrpcService } from './modules/offices/grpc/office.grpc.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const officeClient = app.get(OfficeClientGrpcService);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
