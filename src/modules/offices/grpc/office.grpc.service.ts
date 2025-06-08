import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { UUID } from "crypto";
import { Observable } from "rxjs";

interface Office {
  id: UUID
  name: string
}

interface OfficeService {
  listenOffices(data: {}): Observable<Office>;
}

@Injectable()
export class OfficeClientGrpcService {

  private officeService: OfficeService;

  constructor(@Inject('OFFICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.officeService = this.client.getService<OfficeService>('OfficeService');
    this.listen();
  }

  listen() {
    const stream = this.officeService.listenOffices({});
    stream.subscribe({
      next: (office: Office) => {
        console.log('Received office:', office);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Completed');
      }
    });
    console.log('Listening for offices...');
  }
}

