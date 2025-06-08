import { Office } from "src/domain/offices/office.domain";
import { plainToClass } from 'class-transformer';
import { CreateOfficeDto } from "src/modules/offices/dto/create-office.dto";
import { OfficeDto } from "src/modules/offices/dto/office.dto";
import { OfficeRemoteDto } from "src/repositories/offices/dto/office-remote.dto";

export class OfficeMapper {
  
  toDomain(createOfficeDto: CreateOfficeDto): Office {
    return plainToClass(Office, createOfficeDto);
  }

  toDto(office: Office): OfficeDto {
    return plainToClass(OfficeDto, office);
  }

  toRemoteDto(office: Office): OfficeRemoteDto {
    return plainToClass(OfficeRemoteDto, office);
  }

}
