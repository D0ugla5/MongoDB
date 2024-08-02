
import {IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { vehicleDrivers} from '../dto/create-vehicle.dto';

export class Vehicle {
  @IsString()
  readonly plate: string;

  @IsString()
  readonly brand: string;
  
  @IsNumber()
  readonly fuelSize: number;
  
  @IsArray()
  /* @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly drivers: Array<Driver>; */
  readonly drivers: Array<vehicleDrivers>
}