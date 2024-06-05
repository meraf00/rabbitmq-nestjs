import { Test, TestingModule } from '@nestjs/testing';
import { PreService } from './pre.service';

describe('PreService', () => {
  let service: PreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreService],
    }).compile();

    service = module.get<PreService>(PreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
