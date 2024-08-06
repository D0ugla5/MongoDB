import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles } from './schemas/vehicles.schema';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()                        //HABILITA O WHITE LIST  - - O QUE É WHITE LIST
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll(): Promise<Vehicles[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':plate')
  async findOne(@Param('plate') plate: string): Promise<Vehicles> {
    return this.vehiclesService.findOne(plate);
  }

  @Put(':plate')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('plate') plate: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicles> {
    return this.vehiclesService.update(plate, updateVehicleDto);
  }

  @Delete(':plate')
  async remove(@Param('plate') plate: string): Promise<{ deletedAt: Date; deletedBy: string }> {
    return this.vehiclesService.remove(plate);
  }
}
