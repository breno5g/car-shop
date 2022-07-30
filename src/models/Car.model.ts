import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import GenericModel from './Generic.model';

const carMongooseSchema = new Schema<ICar>({
  buyValue: Number,
  color: String,
  doorsQty: Number,
  model: String,
  seatsQty: Number,
  status: Boolean,
  year: Number,
});

class Lens extends GenericModel<ICar> {
  constructor(model = mongooseCreateModel('Lens', carMongooseSchema)) {
    super(model);
  }
}

export default Lens;