import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { OfficesModule } from "./offices/offices.module";

export const modules = [
  OfficesModule,
  PrometheusModule.register()
];
