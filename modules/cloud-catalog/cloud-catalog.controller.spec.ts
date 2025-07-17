import { Test, TestingModule } from '@nestjs/testing';
import { CloudCatalogController } from './cloud-catalog.controller';
import { CloudCatalogService } from './cloud-catalog.service';

describe('CloudCatalogController', () => {
  let controller: CloudCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudCatalogController],
      providers: [CloudCatalogService],
    }).compile();

    controller = module.get<CloudCatalogController>(CloudCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
