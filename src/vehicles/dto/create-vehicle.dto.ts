import {IsArray, IsNotEmpty,IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Driver } from '../schemas/driver.schema';

export class CreateVehicleDto {
  //Same
  @IsNotEmpty()
  @IsString()
  readonly plate: string;

  @IsString()
  readonly brand: string;
  
  @IsNumber()
  readonly fuelSize: number;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers: Array<Driver>;
}