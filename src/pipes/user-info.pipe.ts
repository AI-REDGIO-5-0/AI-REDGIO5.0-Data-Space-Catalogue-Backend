import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUserInfoPipe implements PipeTransform {
  async transform(value: any) {
    return {
      id: value.sub,
      organizationId: value.organisationId,
      country: value.organisationCountry,
      size: value.organisationSize,
      domain: value.organisationDomain,
      category: value.organizationCategory,
    };
  }
}
