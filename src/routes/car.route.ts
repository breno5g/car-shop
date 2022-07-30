import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import validateBody from '../middlewares/genericBodyValidate';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';
import { mergedCarSchema } from '../interfaces/ICar';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post(
  '/', 
  validateBody(mergedCarSchema),
  (req, res) => carController.create(req, res),
);
route.get('/', (req, res) => carController.read(req, res));

export default route;