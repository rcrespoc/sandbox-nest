import { Injectable } from '@nestjs/common';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office } from './entities/office.entity';
import { OfficeRepository } from 'src/repositories/offices/office.repository';

@Injectable()
export class OfficesService {

  constructor(private readonly officeRepository: OfficeRepository) {}

  async create(office: Office): Promise<void> {
    await this.officeRepository.createOffice(office);
  }

  async findAll(): Promise<Office[]> {
    return await this.officeRepository.getOffices();
  }

  findOne(id: number) {
    return `This action returns a #${id} office`;
  }

  update(id: number, updateOfficeDto: UpdateOfficeDto) {
    return `This action updates a #${id} office`;
  }

  remove(id: number) {
    return `This action removes a #${id} office`;
  }
}
