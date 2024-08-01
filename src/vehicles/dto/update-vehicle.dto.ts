
import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { Driver } from '../schemas/driver.schema';


export class UpdateVehicleDto {
  //Vai apenas ler
  @IsOptional()
  @IsString()
  readonly plate?: string;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsNumber()
  readonly fuelSize?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers?: Driver[];
}
