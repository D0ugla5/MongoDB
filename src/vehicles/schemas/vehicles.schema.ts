// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Driver, DriverSchema } from './driver.schema';

export type VehiclesDocument = Vehicles & Document;

@Schema()
export class Vehicles {
  //'@Prop' é a validação se o objeto é aquilo que se pede, ele difine o objeto.
  @Prop({ required: true })
  plate: string;

  @Prop()
  brand: string;

  @Prop()
  fuelSize: number;

  @Prop({ type: [DriverSchema] })
  drivers: Array<Driver>;
  //Date.now é uma function que retorna o horário atual.
  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedDate?: Date;

  @Prop()
  updatedBy?: string;
}

export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);