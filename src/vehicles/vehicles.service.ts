import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto, vehicleDrivers } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles, VehiclesDocument } from './schemas/vehicles.schema';

@Injectable()
export class VehiclesService {
  //constructor pesquisar sobre ->
  //Injetar dependências na classe, permitindo que os serviços, controladores e outros componentes utilizem essas dependências.  
  // Decorator que indica ao framework que ele deve injetar um modelo Mongoose específico nesta propriedade.
  //This module uses the forFeature() method to define which models are registered in the current scope. With that in place, we can inject the UserModel into the UsersService using the @InjectModel() decorator:
                                                                 //LE e cria para o MDB
  //Constructors essentially allow the creation of objects from classes.
  //Permite criar objetos de classes
  constructor(@InjectModel(Vehicles.name) private vehiclesModel: Model<VehiclesDocument>) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    const currentDate = new Date(); 
    const createdBy = "Douglas"; 

    // Validar drivers
    //Funcional
    createVehicleDto.drivers.forEach(vehicleDrivers => {
      if (!vehicleDrivers.name || !vehicleDrivers.id) {
        throw new BadRequestException("You're missing the name or ID from driver!");
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
    return this.vehiclesModel.find().exec(); // Executa a Query e retorna os vehicles
  }

  async findOne(plate: string): Promise<Vehicles> {
    const vehicle = await this.vehiclesModel.findOne({ plate }).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} deleted, modified or does not exist. Try again Boy!`);
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
          throw new BadRequestException('Did u miss something? i did, name or ID please!');
        }
      });
    }

                    //NÂO NECESSÁRIO
   /*  // Validar fuelSize se existir no update
    if (updateVehicleDto.fuelSize != null && typeof updateVehicleDto.fuelSize !== 'number') {
      throw new BadRequestException('O campo fuelSize deve ser um número.');
    } */

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