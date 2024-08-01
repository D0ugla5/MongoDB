
import {IsArray, IsNumber, IsString} from 'class-validator';
import { Driver } from '../schemas/driver.schema';


export class UpdateVehicleDto {
  //Vai apenas ler

  @IsString()
  readonly plate?: string;

  @IsString()
  readonly brand?: string;

  @IsNumber()
  readonly fuelSize?: number;
  
  @IsArray()
  readonly drivers?: Array<Driver>;
}
