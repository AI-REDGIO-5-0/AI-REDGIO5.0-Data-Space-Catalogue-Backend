import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  // ValidateNested,
} from 'class-validator';

export class UpdateMetadataDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  assetId!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  version!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  title!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  keywords!: [string];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  language!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  publisher!: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  filesize!: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  manufacturingDomain!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  downloadUrl!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  contractTerms!: string;
}
