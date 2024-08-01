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
    const { plate, brand, fuelSize, drivers } = createVehicleDto;

    // Verifica se os campos obrigatórios estão presentes
    if (!plate || !brand || !fuelSize || !drivers || drivers.length === 0) {
      throw new BadRequestException('Está faltando coisa ai meu ousado !');
    }

    const currentDate = new Date(); 
    const createdBy = "Douglas"; 

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
    const { brand, fuelSize, drivers } = updateVehicleDto;

    // Verifica se os campos obrigatórios estão presentes!!
    if (brand === undefined || fuelSize === undefined || drivers === undefined) {
      throw new BadRequestException('Missing required fields in UpdateVehicleDto');
    }

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
      throw new NotFoundException(`Vehicle with plate ${plate} not found. Try again.`);
    }
    console.log('Passando pelo Update');
    return vehicle;
  }

  async remove(plate: string): Promise<{ deletedAt: Date; deletedBy: string }> {
    const result = await this.vehiclesModel.findOneAndDelete({ plate }).exec();
    if (!result) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found. Try again.`);
    }
    console.log('Passando pelo Delete');
    return {
      deletedAt: new Date(),
      deletedBy: "Douglas"
    };
  }
}
