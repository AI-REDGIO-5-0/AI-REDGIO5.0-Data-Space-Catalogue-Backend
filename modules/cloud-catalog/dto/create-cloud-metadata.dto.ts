import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import {
  IsArray,
  // IsInt,
  IsNumber,
  IsString,
  // ValidateNested,
} from 'class-validator';

export class CreateMetadataDto {
  @IsString()
  @ApiProperty()
  assetId!: string;

  @IsString()
  @ApiProperty()
  version!: string;

  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  description!: string;

  @IsString()
  @ApiProperty()
  keywords!: [string];

  @IsArray()
  @ApiProperty()
  language!: string;

  @IsString()
  @ApiProperty()
  publisher!: string;

  @IsNumber()
  @ApiProperty()
  filesize!: number;

  @IsString()
  @ApiProperty()
  manufacturingDomain!: string;

  @IsString()
  @ApiProperty()
  downloadUrl!: string;

  @IsString()
  @ApiProperty()
  contractTerms!: string;
}
