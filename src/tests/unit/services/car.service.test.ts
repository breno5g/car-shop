import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carMock, carMockWithId, carsMockArray } from '../../mocks/car.mock';

describe('Car Model', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel)

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, "read").resolves(carsMockArray)
    sinon.stub(carModel, "delete")
      .onCall(0).resolves(carMock).onCall(1).resolves(null)
    sinon.stub(carModel, "update")
      .onCall(0).resolves(carMock).onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore();
	});

  describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carService.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carService.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carService.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});
	});

  describe('Get all cars', () => {
    it('successfully found', async () => {
      const carsFound = await carService.read();
      expect(carsFound).to.be.deep.equal(carsMockArray)
    });
  });

  describe('delete a car', () => {
		it('successfully delete', async () => {
			const carDeleted = await carService.delete('4edd40c86762e0fb12000003');
			expect(carDeleted).to.be.deep.equal(carMock);
		});

		it('_id not found', async () => {
			try {
				await carService.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});
	});

  describe('update a car', () => {
		it('successfully update', async () => {
			const carUpdated = await carService.update('4edd40c86762e0fb12000003', carMock);
			expect(carUpdated).to.be.deep.equal(carMock);
		});

		it('_id not found', async () => {
			try {
				await carService.update('123ERRADO', carMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});
	});

});