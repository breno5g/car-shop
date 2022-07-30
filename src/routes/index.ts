import { Router } from 'express';
import CarRoute from './car.route';

const route = Router();

route.use('/cars', CarRoute);

export default route;