import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { carMock,carMockWithId,carsMockArray } from '../../mocks/car.mock';
import CarController from '../../../controllers/Car.controller';
import CarService from '../../../services/Car.service';
import CarModel from '../../../models/Car.model';


describe('Frame Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
		sinon.stub(carService, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carService, "read").resolves(carsMockArray)
    sinon.stub(carService, "delete")
      .onCall(0).resolves(carMock).onCall(1).resolves(null)
    sinon.stub(carService, "update")
      .onCall(0).resolves(carMock).onCall(1).resolves(null);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    });
  });

  describe('Read all Cars', () => {
		it('Success', async () => {
			await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(carsMockArray));
		});
	});
});