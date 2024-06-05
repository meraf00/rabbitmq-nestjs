import { PartialType } from '@nestjs/mapped-types';
import { CreatePreDto } from './create-pre.dto';

export class UpdatePreDto extends PartialType(CreatePreDto) {}
