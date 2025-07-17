import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Metadata } from './entities/metadata.entity';
import { HttpService } from '@nestjs/axios';
import { Organizations, Transactions } from './entities';
import { TrustLevel } from './entities/trustLevel.entity';

@Injectable()
export class CloudCatalogService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Metadata)
    private readonly metadataRepo: EntityRepository<Metadata>,
    @InjectRepository(Transactions)
    private readonly repo: EntityRepository<Transactions>,
    @InjectRepository(Organizations)
    private readonly organizationsRepo: EntityRepository<Organizations>,
    @InjectRepository(TrustLevel)
    private readonly trustLevelRepo: EntityRepository<TrustLevel>,
  ) {}

  async create(createMetadataDto: any) {
    const metadata = {
      assetId: createMetadataDto.assetId,
      version: createMetadataDto.version,
      title: createMetadataDto.title,
      description: createMetadataDto.description,
      keywords: createMetadataDto.keywords,
      language: createMetadataDto.language,
      publisher: createMetadataDto.publisher,
      filesize: createMetadataDto.filesize,
      manufacturingDomain: createMetadataDto.manufacturingDomain,
      downloadUrl: createMetadataDto.downloadUrl,
      contractTerms: createMetadataDto.contractTerms,
      accessPolicy: createMetadataDto.accessPolicy,
      price: createMetadataDto.price,
      license: createMetadataDto.license,
      fileExt: createMetadataDto.fileExt,
    };

    await this.metadataRepo.create(metadata);
    return await this.metadataRepo.getEntityManager().flush();
  }

  async createTransaction(data: any, user: any) {
    const transaction = {
      assetTitle: data.assetTitle,
      assetId: data.assetId,
      version: data.version,
      title: data.title,
      seller: data.seller,
      buyer: data.buyer,
      price: data.price,
      sector: data.sector,
      organization: user.organizationId,
      type: data.seller !== user.id ? 'Outbound' : 'Inbound',
    };
    await this.repo.create(transaction);
    return await this.repo.getEntityManager().flush();
  }

  async findTransactionBySeller(id: any) {
    const transactions = await this.repo.find({ seller: id });
    const organizations = await this.organizationsRepo.findAll();
    transactions.map((item) => {
      const organization = organizations.find(
        (org) => org.id === item.organization,
      );
      if (organization) {
        item.organization = organization.name;
      }
    });
    return transactions;
  }

  async findAll() {
    return await this.metadataRepo.findAll();
  }

  async findOne(id: string) {
    return await this.metadataRepo.findOneOrFail({ id: id });
  }

  private getUsercategory(user: any) {
    const allCategories = [
      { id: 1, name: 'Non-Governmental Organization (NGO)' },
      { id: 2, name: 'For-Profit Organization' },
      { id: 3, name: 'Academic Institution / University' },
      { id: 4, name: 'Research Institution' },
      { id: 5, name: 'Government Agency / Public Institution' },
      { id: 6, name: 'Didactic Factory / Training Organization / Living Lab' },
      { id: 7, name: 'Industry Association / Consortium' },
    ];

    return allCategories.find((category) => category.name === user.category)
      ?.id;
  }

  async findByAccessPolicy(user: any) {
    const allAssets = await this.metadataRepo.findAll();

    // Load all trust levels the user's organization has toward other orgs
    const trustLevels = await this.trustLevelRepo.find({
      target: user.organizationId,
    });

    // Convert to a map for quick lookup: { [targetOrgId]: level }
    const trustMap = Object.fromEntries(
      trustLevels.map((tl) => [tl.target.id, tl.level]),
    );

    const userOrganization = await this.organizationsRepo.findOneOrFail({
      id: user.organizationId,
    });

    const accessibleAssets = allAssets.filter((asset) => {
      const policy = asset.accessPolicy?.policyData;

      if (String(user.id) === String(asset.publisher)) return true;
      // Allow if no policy exists
      if (!policy) return true;

      // Allow if all rules are empty (public)
      const isPublic =
        (!policy.sizes || policy.sizes.length === 0) &&
        (!policy.domains || policy.domains.length === 0) &&
        (!policy.countries || policy.countries.length === 0) &&
        (!policy.organizationIds || policy.organizationIds.length === 0) &&
        (!policy.categories || policy.categories.length === 0) &&
        // asset.publisher !== user.id &&
        policy.trustLevel === null;

      if (isPublic) return true;

      // Check access rules
      const isOrgAllowed =
        policy.organizationIds === undefined ||
        !policy.organizationIds.includes(user.organizationId) ||
        asset.publisher === user.organizationId;

      const category = this.getUsercategory(user);
      const isOrgCategoryAllowed =
        policy.categories.length === 0 ||
        !policy.categories.includes(category.toString());

      const isSizeAllowed =
        policy.sizes.length === 0 ||
        !policy.sizes.includes(userOrganization.size.toString());

      const isDomainAllowed =
        policy.domains.length === 0 ||
        !policy.domains.includes(userOrganization.sector);

      const isCountryAllowed =
        policy.countries.length === 0 ||
        !policy.countries.includes(userOrganization.country.toString());

      // 💡 Trust Level Check
      const requiredTrust = policy.trustLevel;
      const ownerOrgId = user.organizationId;

      const hasRequiredTrust =
        requiredTrust === undefined ||
        (trustMap[ownerOrgId] !== undefined &&
          trustMap[ownerOrgId] <= requiredTrust);

      return (
        isOrgAllowed &&
        isOrgCategoryAllowed &&
        isSizeAllowed &&
        isDomainAllowed &&
        isCountryAllowed &&
        hasRequiredTrust
        // &&
        // asset.publisher !== user.id
      );
    });

    return accessibleAssets;
  }

  async update(id: string, updateMetadataDto: any) {
    const metadata = await this.metadataRepo.findOneOrFail({ assetId: id });
    metadata.contractTerms = updateMetadataDto.contractTerms;
    metadata.filesize = updateMetadataDto.filesize;
    metadata.language = updateMetadataDto.language;
    metadata.publisher = updateMetadataDto.publisher;
    metadata.assetId = updateMetadataDto.assetId;
    metadata.version = updateMetadataDto.version;
    metadata.title = updateMetadataDto.title;
    metadata.manufacturingDomain = updateMetadataDto.manufacturingDomain;
    metadata.downloadUrl = updateMetadataDto.downloadUrl;
    metadata.price = updateMetadataDto.price;
    metadata.license = updateMetadataDto.license;
    metadata.fileExt = updateMetadataDto.fileExt;
    metadata.accessPolicy = updateMetadataDto.accessPolicy;
    metadata.description = updateMetadataDto.description;
    metadata.keywords = [updateMetadataDto.keywords];
    return await this.metadataRepo.getEntityManager().persistAndFlush(metadata);
  }

  async remove(id: string) {
    const metadata = await this.metadataRepo.findOneOrFail({ id: id });
    return this.metadataRepo.getEntityManager().removeAndFlush(metadata);
  }

  async createOrganizations(data: any) {
    await this.organizationsRepo.create(data);
    return await this.organizationsRepo.getEntityManager().flush();
  }

  async createTrustLevel(sourceOrgId: string, dto: any) {
    const existing = await this.trustLevelRepo.findOne({
      source: sourceOrgId,
      target: dto.targetOrgId,
    });

    if (existing) {
      existing.level = dto.level;
      return await this.trustLevelRepo
        .getEntityManager()
        .persistAndFlush(existing);
    } else {
      const source = await this.organizationsRepo.findOneOrFail({
        id: sourceOrgId,
      });
      const target = await this.organizationsRepo.findOneOrFail({
        id: dto.targetOrgId,
      });

      const newTrust = this.trustLevelRepo.create({
        source,
        target,
        level: dto.level,
      });

      return await this.trustLevelRepo.getEntityManager().flush();
    }
  }

  async findAllOrganizations(userOrgId: string) {
    const organizations = await this.organizationsRepo.find(
      {
        active: true,
        id: { $ne: userOrgId },
      },
      {
        populate: ['receivedTrustLevels'], // only if needed for efficiency
      },
    );

    return organizations.map((org) => {
      const trustLevel = org.receivedTrustLevels
        .getItems()
        .find((t) => t.source.id === userOrgId)?.level;

      return {
        id: org.id,
        name: org.name,
        country: org.country,
        size: org.size,
        sector: org.sector,
        active: org.active,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
        trustLevel: trustLevel ?? null,
        category: org.category,
      };
    });
  }
}
