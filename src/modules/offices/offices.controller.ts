import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfficeMapper } from 'src/common/mappers/office.mapper';
import { Office } from './entities/office.entity';
import { OfficeDto } from './dto/office.dto';
import { of } from 'rxjs';

@Controller('office')
@ApiTags('office')
export class OfficesController {
  constructor(private readonly officesService: OfficesService,
    private readonly officeMapper: OfficeMapper
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new office' })
  @ApiResponse({ status: 201, description: 'The office has been successfully created.' })
  create(@Body() createOfficeDto: CreateOfficeDto): Promise<void> {
    const office: Office = this.officeMapper.toDomain(createOfficeDto);
    return this.officesService.create(office);
  }

  @Get()
  @ApiOperation({ summary: 'Get all offices' })
  @ApiResponse({ status: 200, description: 'Return all offices.' })
  async findAll(): Promise<OfficeDto[]> {
    const offices = await this.officesService.findAll();
    let officesDto: OfficeDto[] = offices.map((office) => this.officeMapper.toDto(office))
    return officesDto;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(+id, updateOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officesService.remove(+id);
  }
}
