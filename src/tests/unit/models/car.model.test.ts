import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carsMockArray } from '../../mocks/car.mock';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, "find").resolves(carsMockArray)
    sinon.stub(Model, "findByIdAndDelete").resolves(carMock)
    sinon.stub(Model, "findByIdAndUpdate").resolves(carMock)
	});

	after(() => {
		sinon.restore();
	});

  describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

  describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('Get all cars', () => {
    it('successfully found', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.deep.equal(carsMockArray)
    });
  });

  describe('delete a car', () => {
		it('successfully delete', async () => {
			const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
			expect(carDeleted).to.be.deep.equal(carMock);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('update a car', () => {
		it('successfully update', async () => {
			const carUpdated = await carModel.update('4edd40c86762e0fb12000003', carMock);
			expect(carUpdated).to.be.deep.equal(carMock);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});