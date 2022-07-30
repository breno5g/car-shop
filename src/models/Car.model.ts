import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import GenericModel from './Generic.model';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
  status: Boolean,
});

class Lens extends GenericModel<ICar> {
  constructor(model = mongooseCreateModel('Lens', carMongooseSchema)) {
    super(model);
  }
}

export default Lens;