import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpMethod } from "src/common/enum/http-methods.enum";
import { OfficeResources } from "src/common/enum/resources.enum";
import { HttpService } from "src/common/http/http.service";
import { OfficeMapper } from "src/common/mappers/office.mapper";
import { Office } from "src/domain/offices/office.domain";
import { OfficeRemoteDto } from "./dto/office-remote.dto";

@Injectable()
export class OfficeRepository {
  constructor(private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly officeMapper: OfficeMapper,
  ) {}

  async getOffices(): Promise<Office[]> {
    const url = this.configService.get('office.uri');
    const response = await this.httpService.fetch(
      HttpMethod.GET,
      `${url}/${OfficeResources.OFFICE}`,
    );
    const offices: Office[] = response.map((office) => this.officeMapper.toDomain(office));
    return offices;
  }

  async createOffice(office: Office): Promise<Office> {
    const url = this.configService.get('office.uri');
    const officeRemoteDto: OfficeRemoteDto = this.officeMapper.toRemoteDto(office); 
    const response = await this.httpService.fetch(
      HttpMethod.POST,
      `${url}/${OfficeResources.OFFICE}`,
      officeRemoteDto,
    );
    const officeResponse: Office = this.officeMapper.toDomain(response);
    return officeResponse;
  }
}
