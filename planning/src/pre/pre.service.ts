import { Injectable } from '@nestjs/common';
import { CreatePreDto } from './dto/create-pre.dto';
import { UpdatePreDto } from './dto/update-pre.dto';

@Injectable()
export class PreService {
  hello() {
    console.log('Hello from pre service');
  }
  create(createPreDto: CreatePreDto) {
    return 'This action adds a new pre';
  }

  findAll() {
    return `This action returns all pre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pre`;
  }

  update(id: number, updatePreDto: UpdatePreDto) {
    return `This action updates a #${id} pre`;
  }

  remove(id: number) {
    return `This action removes a #${id} pre`;
  }
}
