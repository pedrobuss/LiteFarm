/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (farm.test.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */


const chai = require('chai');
const chaiHttp = require('chai-http');
const moment =require('moment')
chai.use(chaiHttp);
const chai_assert = chai.assert;    // Using Assert style
const chai_expect = chai.expect;    // Using Expect style
const chai_should = chai.should();  // Using Should style
const server = require('./../src/server');
const dummy = require('./dummy');
const sinon = require('sinon')
const Knex = require('knex')
const environment = 'test';
const config = require('../knexfile')[environment];
const knex = Knex(config);
let checkJwt;
jest.mock('jsdom')
jest.mock('../src/middleware/acl/checkJwt')
const mocks  = require('./mock.factories');

const userModel = require('../src/models/userModel');
const farmModel = require('../src/models/farmModel');
const fieldModel = require('../src/models/fieldModel');
const cropModel = require('../src/models/cropModel');
const fieldCropModel = require('../src/models/fieldCropModel');

describe('FieldCrop Tests', () => {
  beforeAll(() => {
    token = global.token;
  });

  function getRequest( callback) {
    chai.request(server).get('/field_crop')
      .set('Content-Type', 'application/json')
      .end(callback)
  }

  const later = async (delay) =>
    new Promise(resolve => setTimeout(resolve, delay));

  beforeEach(async () => {

    // [newOwner] = await mocks.usersFactory();
    // [newManager] = await mocks.usersFactory();
    // [newWorker] = await mocks.usersFactory();
    // [newUnregisteredWorker] = await mocks.usersFactory();
    // [newUser] = await mocks.usersFactory();
    // [farm] = await mocks.farmFactory();
    // [farmNewUser] = await mocks.farmFactory();
    // const [ownerFarm] = await mocks.userFarmFactory({promisedUser:[newOwner], promisedFarm:[farm]},fakeUserFarm(1));
    // const [managerFarm] = await mocks.userFarmFactory({promisedUser:[newManager], promisedFarm:[farm]},fakeUserFarm(2));
    // const [workerFarm] = await mocks.userFarmFactory({promisedUser:[newWorker], promisedFarm:[farm]},fakeUserFarm(3));
    // const [unRegisteredWorkerFarm] = await mocks.userFarmFactory({promisedUser:[newUnregisteredWorker], promisedFarm:[farm]},fakeUserFarm(4));
    // const [ownerFarmNewUser] = await mocks.userFarmFactory({promisedUser:[newUser], promisedFarm:[farmNewUser]},fakeUserFarm(1));
    // [crop] = await mocks.cropFactory({promisedFarm:[farm]},{...mocks.fakeCrop(), crop_common_name: "crop", user_added: true});
    // [cropNotInUse] = await mocks.cropFactory({},{...mocks.fakeCrop(), crop_common_name: "cropNotInUse", user_added: true});
    // [field] = await mocks.fieldFactory({promisedFarm:[farm]});
    // [fieldCrop] = await mocks.fieldCropFactory({promisedField: [field], promisedCrop: [crop]});

    middleware = require('../src/middleware/acl/checkJwt');
    middleware.mockImplementation((req, res, next) => {
      req.user = {};
      req.user.sub = '|' + req.get('user_id');
      next()
    });
  })

  afterEach (async () => {
    await later(1000);
    await knex.raw(`
    DELETE FROM "fieldCrop";
    DELETE FROM "field";
    DELETE FROM "userFarm";
    DELETE FROM "crop";
    DELETE FROM "farm";
    DELETE FROM "users";
    DELETE FROM "weather_station";
    `);
    const test = 0;
  });

  describe('Post fieldCrop', async ()=>{
    test('1', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('2', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('3', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('4', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('5', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('6', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('7', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('8', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
    test('9', (done)=>{
      getRequest(async (err,res)=>{
        await later(1000);
        console.log(res.error,res.body);
        expect(res.status).toBe(200);
        expect(res.body).toBe({1:1});
        done();
      });
    })
  })
});
