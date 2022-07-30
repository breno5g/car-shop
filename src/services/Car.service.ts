import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    return this._car.create(obj);
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error('EntityNotFound');
    return car;
  }

  public async read(): Promise<ICar[] | null> {
    const allCars = await this._car.read();
    if (!allCars) throw new Error('EntityNotFound');
    return allCars;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const deleted = await this._car.delete(_id);
    if (!deleted) throw new Error('EntityNotFound');
    return deleted;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const updated = await this._car.update(_id, obj);
    if (!updated) throw new Error('EntityNotFound');
    return updated;
  }
}

export default CarService;