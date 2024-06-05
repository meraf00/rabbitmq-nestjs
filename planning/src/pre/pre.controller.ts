import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreService } from './pre.service';
import { CreatePreDto } from './dto/create-pre.dto';
import { UpdatePreDto } from './dto/update-pre.dto';

@Controller('pre')
export class PreController {
  constructor(private readonly preService: PreService) {}

  @Post()
  create(@Body() createPreDto: CreatePreDto) {
    return this.preService.create(createPreDto);
  }

  @Get()
  findAll() {
    return this.preService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreDto: UpdatePreDto) {
    return this.preService.update(+id, updatePreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preService.remove(+id);
  }
}
