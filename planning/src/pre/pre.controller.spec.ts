import { Test, TestingModule } from '@nestjs/testing';
import { PreController } from './pre.controller';
import { PreService } from './pre.service';

describe('PreController', () => {
  let controller: PreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreController],
      providers: [PreService],
    }).compile();

    controller = module.get<PreController>(PreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
