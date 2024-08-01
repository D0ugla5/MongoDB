
import {IsNumber, IsString, ValidateNested } from 'class-validator';
import { stringify } from "querystring";
import { Type } from 'class-transformer';
import { Driver } from '../schemas/driver.schema';


export class Vehicle {
  @IsString()
  readonly plate: string;

  @IsString()
  readonly brand: string;
  
  @IsNumber()
  readonly fuelSize: number;
  
  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers: Array<Driver>;;
  }