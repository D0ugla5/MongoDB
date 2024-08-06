import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto, vehicleDrivers } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles, VehiclesDocument } from './schemas/vehicles.schema';
import { IsEmpty } from 'class-validator';

@Injectable()
export class VehiclesService {
  //constructor pesquisar sobre ->
  constructor(@InjectModel(Vehicles.name) private vehiclesModel: Model<VehiclesDocument>) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    const currentDate = new Date(); 
    const createdBy = "Douglas"; 

    // Validar drivers
    createVehicleDto.drivers.forEach(vehicleDrivers => {
      if (!vehicleDrivers.name || !vehicleDrivers.id) {
        throw new BadRequestException('Está faltando o ID ou o Nome!');
      }
    });
    
    const newVehicle = new this.vehiclesModel({
      ...createVehicleDto,
      createdDate: currentDate,
      createdBy: createdBy,
    });
    console.log('Passando pelo Insert');
    return newVehicle.save();
  }

  async findAll(): Promise<Vehicles[]> {
    console.log('Passando pelo Find'); 
    return this.vehiclesModel.find().exec(); // Execute a Query e retorna os vehicles
  }

  async findOne(plate: string): Promise<Vehicles> {
    const vehicle = await this.vehiclesModel.findOne({ plate }).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} deleted, changed or does not exist. Try again.`);
    }
    console.log('Passando pelo FindOne');
    return vehicle;
  }

  async update(plate: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicles> {
    const currentDate = new Date(); 
    const updatedBy = "Douglas"; 

    // Validar drivers se existir no update
    if (updateVehicleDto.drivers) {
      updateVehicleDto.drivers.forEach(driver => {
        if (!driver.name || !driver.id) {
          throw new BadRequestException('Está faltando o ID ou o Name!');
        }
      });
    }

    // Validar fuelSize se existir no update
    if (updateVehicleDto.fuelSize != null && typeof updateVehicleDto.fuelSize !== 'number') {
      throw new BadRequestException('O campo fuelSize deve ser um número.');
    }

    const vehicle = await this.vehiclesModel.findOneAndUpdate(
      { plate },
      {
        ...updateVehicleDto,
        updatedDate: currentDate,
        updatedBy,
      },
      { new: true, runValidators: true } // Valida os dados
    );
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found. Try again Boy!`);
    }
    console.log('Passando pelo Update');
    return vehicle;
  }

  async remove(plate: string): Promise<{ deletedAt: Date; deletedBy: string }> {
    const result = await this.vehiclesModel.findOneAndDelete({ plate }).exec();
    if (!result) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found. Try again Boy!`);
    }
    console.log('Passando pelo Delete');
    return {
      deletedAt: new Date(),
      deletedBy: "Douglas"
    };
  }
}