import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CloudCatalogService } from './cloud-catalog.service';
import { ParseUserInfoPipe } from 'src/pipes/user-info.pipe';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthToken } from 'src/decorators';

@Controller('cloud-catalog')
export class CloudCatalogController {
  constructor(private readonly cloudCatalogService: CloudCatalogService) {}

  @Post()
  create(@Body() createMetadataDto: any) {
    return this.cloudCatalogService.create(createMetadataDto);
  }

  @Post('/organizations')
  createOrganization(@Body() createMetadataDto: any) {
    return this.cloudCatalogService.createOrganizations(createMetadataDto);
  }

  @Post('trust')
  async createTrustLevel(
    @AuthenticatedUser(new ParseUserInfoPipe()) user: any,
    @Body() dto: any,
  ) {
    return this.cloudCatalogService.createTrustLevel(user.organizationId, dto);
  }

  @Post('/transaction')
  createTransaction(
    @Body() data: any,
    @AuthenticatedUser(new ParseUserInfoPipe()) user: any,
  ) {
    return this.cloudCatalogService.createTransaction(data, user);
  }

  @Get('/transaction/:id')
  findTransactions(@Param('id') id: string) {
    return this.cloudCatalogService.findTransactionBySeller(id);
  }

  @Get()
  findAll(@AuthenticatedUser(new ParseUserInfoPipe()) user: any) {
    return this.cloudCatalogService.findByAccessPolicy(user);
  }

  @Get('/organizations')
  findAllOrganizations(@AuthenticatedUser(new ParseUserInfoPipe()) user: any) {
    return this.cloudCatalogService.findAllOrganizations(user.organizationId);
  }

  @Get('/accessPolicy')
  findByAccessPolicy(@AuthenticatedUser(new ParseUserInfoPipe()) user: any) {
    return this.cloudCatalogService.findByAccessPolicy(user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloudCatalogService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMetadataDto: any) {
    return this.cloudCatalogService.update(id, updateMetadataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudCatalogService.remove(id);
  }
}
