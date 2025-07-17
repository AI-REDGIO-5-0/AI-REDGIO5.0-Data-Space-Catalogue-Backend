import { Test, TestingModule } from '@nestjs/testing';
import { CloudCatalogService } from './cloud-catalog.service';

describe('CloudCatalogService', () => {
  let service: CloudCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudCatalogService],
    }).compile();

    service = module.get<CloudCatalogService>(CloudCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
