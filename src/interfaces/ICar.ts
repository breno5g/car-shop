import { z } from 'zod';
import { IVehicle, vehicleZodSchema } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

const mergedCarSchema = carZodSchema.merge(vehicleZodSchema);

type ICar = z.infer<typeof mergedCarSchema> & IVehicle;
export { ICar, mergedCarSchema };
