import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicles, VehiclesSchema } from './schemas/vehicles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicles.name, schema: VehiclesSchema }])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService], // Exporta o serviço se precisar usá-lo em outros módulos
})
export class VehiclesModule {}

