import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request & { body: ICar }, 
    res: Response<ICar>,
  ) {
    const { buyValue, color, doorsQty,
      model, seatsQty, status, year } = req.body;
    const car = { buyValue, color, doorsQty, model, seatsQty, status, year };
    const response = await this._service.create(car);
    return res.status(201).json(response);
  }

  public async readOne(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const response = await this._service.readOne(req.params.id);
    return res.status(200).json(response);
  }

  public async read(_req: Request, res: Response<ICar[] | null>) {
    const allFrames = await this._service.read();
    return res.status(200).json(allFrames);
  }

  // public async delete(req:Request, res: Response<ICar | null>) {
  //   const deletedFrame = await this._service.delete(req.params.id);
  //   return res.status(200).json(deletedFrame);
  // }

  // public async update(_id: string, obj: ICar): Promise<ICar | null> {
  //   const updated = await this._service.update(_id, obj);
  //   return updated;
  // }
}