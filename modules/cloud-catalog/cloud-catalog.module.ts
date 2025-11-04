import { Module } from '@nestjs/common';
import { CloudCatalogService } from './cloud-catalog.service';
import { CloudCatalogController } from './cloud-catalog.controller';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Metadata } from './entities/metadata.entity';
import { Organizations, Transactions } from './entities';
import { TrustLevel } from './entities/trustLevel.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Metadata,
      Transactions,
      Organizations,
      TrustLevel,
    ]),
    HttpModule,
  ],
  controllers: [CloudCatalogController],
  providers: [CloudCatalogService],
  exports: [],
})
export class CloudCatalogModule {}
