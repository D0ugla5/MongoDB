import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles, VehiclesDocument } from './schemas/vehicles.schema';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicles.name) private vehiclesModel: Model<VehiclesDocument>) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    const currentDate = new Date(); 
    const createdBy = "Douglas"; 

    createVehicleDto.drivers.forEach(drivers => {
      if (!drivers.nome || !drivers.id) {
        throw new BadRequestException('Invalid driver data. Ensure all drivers have a name and ID.');
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
    // Verifica se os campos obrigatórios estão presentes!!
    const currentDate = new Date(); 
    const updatedBy = "Douglas"; 

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
