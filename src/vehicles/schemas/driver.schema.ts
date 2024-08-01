import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Driver extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);