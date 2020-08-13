/* 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>   
 *  This file (endToEnd.test.js) is part of LiteFarm.
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
chai.use(chaiHttp);
const chai_assert = chai.assert;    // Using Assert style
const chai_expect = chai.expect;    // Using Expect style
const chai_should = chai.should();  // Using Should style
const server = 'http://localhost:5000';
const dummy = require('./dummy');
const dummySignUp = require('./dummySignUp')
const authConfig = require ('../src/auth0Config')

beforeAll(() => {
  // beforeAll is set before each test
  // global.token is set in testEnvironment.js
  token = global.token;
  // console.log(token);
});

describe('This is an end to end test for all API calls', () => {
  let farm_id = null, crop_id, field_id;

  const uid = dummy.mockUser.user_id;

  let testSignUpToken = null;
  let oauth_user_id = null;

  //SIGNUP FLOW

    // post to get token for signup tests
    test('POST to signup with oauth', (done) => {
        chai.request(authConfig.token_url).post('/')
            .set(authConfig.token_headers)
            .send(authConfig.token_body)
            .end((err, res) => {
                chai_expect(res.status).to.equal(200)
                testSignUpToken = res.body.access_token;
                done();
            }
            )
        }
    )
    // TODO: determine why 404 posting like in createusercontroller
//post valid signup user
//     test('POST valid signup user', (done) => {
//         chai.request(authConfig.user_url).post('/')
//             .set('content-type', 'application/json')
//             .set('Authorization', 'Bearer ' + testSignUpToken)
//             .send(dummy.validSignupUser)
//             .end((err, res) => {
//                 // console.log(err)
//                 console.log(dummy.validSignupUser)
//                 console.log(res.error)
//                 // console.log(res)
//                 chai_expect(res.status).to.equal(201)
//                 done();
//             })
//
//     })

    test('POST invalid password signup user gives 400', (done) => {
        chai.request('https://litefarm-dev.auth0.com').post('/dbconnections/signup')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .send(dummySignUp.passwordInvalidUser)
            .end((err, res) => {
                chai_expect(res.error).to.be.not.null
                chai_expect(res.status).to.equal(400)
                done();
            })
    })

    test('POST blank password signup user gives 400', (done) => {
        chai.request('https://litefarm-dev.auth0.com').post('/dbconnections/signup')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .send(dummySignUp.passwordBlankUser)
            .end((err, res) => {
                chai_expect(res.error).to.be.not.null
                chai_expect(res.status).to.equal(400)
                done();
            })
    })


    test('POST invalid email signup user gives 400', (done) => {
        chai.request('https://litefarm-dev.auth0.com').post('/dbconnections/signup')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .send(dummySignUp.emailInvalidUser)
            .end((err, res) => {
                chai_expect(res.error).to.be.not.null
                chai_expect(res.status).to.equal(400)
                done();
            })
    })

    test('POST blank email signup user gives 400', (done) => {
        chai.request('https://litefarm-dev.auth0.com').post('/dbconnections/signup')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .send(dummySignUp.emailBlankUser)
            .end((err, res) => {
                chai_expect(res.error).to.be.not.null
                chai_expect(res.status).to.equal(400)
                done();
            })
    })


    //Auth0api
    test('POST valid signup user', (done) => {
        chai.request('https://litefarm-dev.auth0.com').post('/dbconnections/signup')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .send(dummySignUp.validSignupUser)
            .end((err, res) => {
                // chai_expect(res.error).to.be.null
                console.log(res.error)
                chai_expect(res.status).to.equal(200)
                done();
            })
    })


    test('GET user by email from oauth', (done) => {
        let email = dummySignUp.validSignupUser.email.replace('@', '%40')
        chai.request(authConfig.token_body.audience).get('users-by-email?email='+ email)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .end((err, res) => {
                chai_expect(res.body[0]).to.be.not.null
                oauth_user_id = res.body[0].user_id
                chai_expect(res.status).to.equal(200)
                done();
            })
    })

    test('DELETE valid signup user', (done) => {
        chai.request(authConfig.user_url).delete('/' + oauth_user_id)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .end((err, res) => {
                chai_expect(res.status).to.equal(204)
                done();
            })

    })

    test('GET user by email from oauth should give ', (done) => {
        let email = dummySignUp.validSignupUser.email.replace('@', '%40')
        chai.request(authConfig.token_body.audience).get('users-by-email?email='+ email)
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer ' + testSignUpToken)
            .end((err, res) => {
                chai_expect(res.body).to.deep.equal([])
                chai_expect(res.status).to.equal(200)
                done();
            })
    })

    /**
   * USER ENDPOINT
  **/
  test('POST user to DB', (done) => {
    chai.request(server).post('/user')
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send(dummy.mockUser)
      .end((err, res) => {
          chai_expect(err).to.be.null;
        chai_expect(res.status).to.equal(201);

        done();
      });
  });

  test('GET user 123 from DB', (done) => {
    chai.request(server).get('/user/' + uid)
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .end((err, res) => {
          console.log(err)

          chai_expect(err).to.be.null;
        chai_expect(res.status).to.equal(200);
        done();
      });
  });

  test('POST user 256 to DB with same email as user 123', (done) => {
    let mockUser = Object.assign({}, dummy.mockUser);
    mockUser.user_id = dummy.mockUserDuplicateEmail.user_id;
    chai.request(server).post('/user')
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send(mockUser)
      .end((err, res) => {
          console.log(err)

          chai_expect(err).to.be.null;
        chai_expect(res.status).to.equal(400);
        done();
      });
  });


    test('PUT user (does not exist) should get 404', (done) => {
      chai.request(server).put('/user/1c42b718-83cd-11e8-b158-e0accb890fd7/')
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send(dummy.notExistUser)
        .end((err, res) => {
          chai_expect(err).to.be.null;
          chai_expect(res.status).to.equal(404);
          done();
        });
    });

  //ONBOARDING TESTS (add_farm flow)
    //blank FarmName, Farm Address (default should be metric, currency and sandbox)
    //expect default units to be metric, default currency to be USD, default Sandbox is deafult false
    // Ensure Farm Name is blank, Farm Address is blank, Units default to metric, currency to USD, Sandbox default false, "Next" is disabled

    test('POST farm for user 123 to DB - defaults not filled', (done) => {
        let farm = dummy.testAddFarmDataDefaults
        chai.request(server).post('/farm')
            .set('content-type', 'application/json')
            // .set('Authorization', 'Bearer '+'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFqTkZPVEpCUVVGRE9EUkNPRGcwTXpVeFEwSkJSREE0UkRSRVF6WkZPRE5CTWtNek9UQTNNdyJ9.eyJodHRwczovL2xpdGVmYXJtLnJ1bGVzLmNvbS9wZXJtaXNzaW9ucyI6W10sIm5pY2tuYW1lIjoiYWxpeWFtb2hhbWVkMTMrOTAxMzhlIiwibmFtZSI6ImFsaXlhbW9oYW1lZDEzKzkwMTM4ZUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1ZWVmMzkwYzE3MmE5YzY4YjljN2U3ZTlhZDUxNWI_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhbC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wOC0xM1QxNzoxNToyOC43MzdaIiwiaXNzIjoiaHR0cHM6Ly9saXRlZmFybS1kZXYuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVmMzU3NTJlODgxNzAxMDAzNzAxYmI5NiIsImF1ZCI6InlEN3ExZGx4djFQTmZxeWEzdjB0SzJNT3plc3hHVzVCIiwiaWF0IjoxNTk3MzM4OTM4LCJleHAiOjE1OTczNzQ5MzgsImF0X2hhc2giOiJicUUzTHhoOE9sc2Q1VkxmbnN3QXd3Iiwibm9uY2UiOiJhLmN1NEZ5Q0w3TXNDLkp0NHlTbS1NM21iT1VYSE5BbCJ9.TW9E05utp3EcxKpZ82OxKsIfk80hISiSOUAgF8sdiaa-ktvRGkdpqbQ1h-dhknu2SWAgsrqMzRqlzP57SsYW2Asy9wCJ2oSWev8fLds4AXFae3kbBFs-N5uXBZaWuxLz0Y1eKOP4sbE4UulIabmahX8uVEGvnabgc45c1uSAXMKe0xAhZGchHVRugH7pKqRIYVtAdxqpiUt-_um2NlJVWdZVbCzEKhYlwG6zBMPLtDbeZu468l2TXZ7axmQIR_6xpvjsNzLgx5EXBIijVhsrxZjYH29e84OGNrdoraeesUqikRU4uK9Om7rPaz_06hJnD4W-3OeVsQGqLBb6TktRjw')
            .set('Authorization', 'Bearer '+ token)
            .set('user_id', '1c42b718-83cd-11e8-b158-e0accb890fd2')
            .send({...dummy.testAddFarmDataDefaults, farm_name:'AliyaFarm'})
            .end((err, res) => {
                console.log(farm)
                console.log(res.error)
                chai_expect(err).to.be.null;
                chai_expect(res.status).to.equal(201);
                console.log(res.body)
                chai_expect(res.body.units.currency).to.equal('CAD');
                chai_expect(res.body.units.measurement).to.equal('metric');
                chai_expect(res.body.sandbox_bool).to.equal(false);
                chai_expect(res.body.farm_name).to.equal(farm.farm_name);
                chai_expect(res.body.address).to.equal(farm.address);
                chai_expect(res.body.grid_points).to.deep.equal(farm.grid_points);
                chai.expect(res.body).to.have.property('farm_id');
                farm_id = res.body.farm_id
                done();
            });
    });


    test('GET farm from DB to verify post', (done) => {
      chai.request(server).get('/farm/' + farm_id)
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .end((err, res) => {
          chai_expect(err).to.be.null;
          chai_expect(res.status).to.equal(200);
          done();
        });
    });

    // Farm Name is blank,
        test('POST farm name blank', (done) => {
        chai.request(server).post('/farm')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .set('user_id', dummy.mockUser.user_id)
            .send(dummy.testEmptyFarmName)
            .end((err, res) => {
                console.log(res.error)
                chai_expect(err).to.be.null;
                chai_expect(res.status).to.equal(400);
                done();
            });
    });

    // Farm Address is blank
    test('POST farm address blank', (done) => {
        chai.request(server).post('/farm')
            .set('content-type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .set('user_id', dummy.mockUser.user_id)
            .send(dummy.testFarm)
            .end((err, res) => {
                console.log(err)
                console.log(res.error)
                chai_expect(err).to.be.null;
                chai_expect(res.status).to.equal(400);
                done();
            });
    });

// CONSENT FLOW:
//    consent version

    //disagree consent

    //agree consent

  //
  // /**
  //  * POST FARM
  //  **/
  // test('POST farm to set up tests', (done) => {
  //   chai.request(server).post('/farm')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(dummy.mockFarm)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('farm_id');
  //       farm_id = res.body.farm_id;
  //       done();
  //     });
  // });
  //
  // test('GET farm from DB to verify post', (done) => {
  //   chai.request(server).get('/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('PUT farm happy land with new name', (done) => {
  //   chai.request(server).put('/farm/' + farm_id)
  //     .set('Authorization', 'Bearer '+token)
  //     .set('content-type', 'application/json')
  //     .send(dummy.mockFarmPut)
  //     .end((err, res) => {
  //       chai_expect(res.status).to.equal(200);
  //       chai_expect(res.body[0].farm_name).to.equal('sad land');
  //       done();
  //     });
  // });
  //
  // test('PUT farm baa15588-4ddb-4ab1-b33e-f3e0a66966ea(does not exist)', (done) => {
  //   chai.request(server).put('/farm/baa15588-4ddb-4ab1-b33e-f3e0a66966ea')
  //     .set('Authorization', 'Bearer '+token)
  //     .set('content-type', 'application/json')
  //     .send(dummy.notExistFarm)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(404);
  //       done();
  //     });
  // });
  //
  // /**
  //  * TEST USER WITH FARM
  //  **/
  // test('PUT user with farm_id', (done) => {
  //   let user = dummy.mockUser;
  //   user.farm_id = farm_id;
  //   chai.request(server).put('/user/' + uid)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(user)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('PUT user with NOT EXISTING farm_id', (done) => {
  //   let user = dummy.mockUser;
  //   user.farm_id = 'e0867a9a-41b3-4d50-9816-1a9410ad9073';
  //   chai.request(server).put('/user/' + uid)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(user)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(400);
  //       done();
  //     });
  // });
  //
  // test('DELETE user should get 200' , (done) => {
  //   chai.request(server).del('/user/' + uid)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('GET user 123 should get 404' , (done) => {
  //   chai.request(server).get('/user/' + uid)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(404);
  //       done();
  //     });
  // });
  // /**
  //  * TEST FIELD AND CROPS
  //  **/
  // test('POST a field to DB', (done) => {
  //   let field = dummy.mockField;
  //   field.farm_id = farm_id;
  //   chai.request(server).post('/field')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(field)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('field_id');
  //       field_id = res.body.field_id;
  //       done();
  //     });
  // });
  //
  // test('GET fields associated with farm id from DB', (done) => {
  //   chai.request(server).get('/field/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       chai_expect(res.body.length).to.equal(1);
  //       chai_expect(res.body[0].field_id).to.equal(field_id);
  //       done();
  //     });
  // });
  //
  // test('GET crop #20 from DB', (done) => {
  //   chai.request(server).get('/crop/20')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(res.status).to.equal(200);
  //       //TODO: deep equal not working
  //       //chai_expect(res.body[0]).to.deep.equal(dummy.cropResponse);
  //       done();
  //     });
  // });
  //
  // test('POST a new crop with farm id', (done) => {
  //   let crop = dummy.mockCrop;
  //   crop.farm_id = farm_id;
  //   chai.request(server).post('/crop')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(crop)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('crop_common_name');
  //       chai.expect(res.body).to.have.property('crop_id');
  //       chai.expect(res.body.crop_common_name).to.equal('Tide pods');
  //       crop_id = parseInt(res.body.crop_id);
  //       done();
  //     });
  // });
  //
  // test('PUT update a field(fe) in the new crop Tide pods', (done) => {
  //   let crop = dummy.mockCrop;
  //   crop.farm_id = farm_id;
  //   crop.fe = 9.11;
  //   chai.request(server).put('/crop/' + crop_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(crop)
  //     .end((err, res) => {
  //       chai_expect(res.status).to.equal(200);
  //       chai.expect(res.body[0]).to.have.property('fe');
  //       chai.expect(res.body[0].fe).to.equal(9.11);
  //       done();
  //     });
  // });
  //
  // test('PUT field baa15588-4ddb-4ab1-b33e-f3e0a66966ea(does not exist)', (done) => {
  //   let field = dummy.mockField;
  //   field.farm_id = farm_id;
  //   chai.request(server).put('/field/baa15588-4ddb-4ab1-b33e-f3e0a66966ea')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(field)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(401);
  //       done();
  //     });
  // });
  // /**
  //  * TEST PLAN
  //  **/
  // test('POST plan 123 to DB', (done) => {
  //   let plan = dummy.mockPlan;
  //   plan.farm_id = farm_id;
  //   chai.request(server).post('/plan')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(plan)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('plan_id');
  //       plan_id = res.body.plan_id;
  //       done();
  //     });
  // });
  //
  // test('GET plan with farm_id from DB', (done) => {
  //   chai.request(server).get('/plan/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       chai_expect(res.body.length).to.equal(1);
  //       chai_expect(res.body[0].plan_id).to.equal(plan_id);
  //       done();
  //     });
  // });
  //
  // test('DELETE plan should get 200' , (done) => {
  //   chai.request(server).del('/plan/' + plan_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('GET plan with farm id should get 404' , (done) => {
  //   chai.request(server).get('/plan/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(404);
  //       done();
  //     });
  // });
  //
  // /**
  //  * TEST SALE
  //  **/
  // test('POST fieldCrop to DB to setup test', (done) => {
  //   chai.request(server).post('/field_crop')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send({ field_id, crop_id })
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('field_crop_id');
  //       field_crop_id = res.body.field_crop_id;
  //       done();
  //     });
  // });
  //
  // test('POST sale and cropSale', (done) => {
  //   const mockSaleAndCropSale = Object.assign(dummy.mockSaleAndCropSale, { farm_id, cropSale: { crop_id }});
  //   chai.request(server).post('/sale')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(mockSaleAndCropSale)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(201);
  //       chai.expect(res.body).to.have.property('sale_id');
  //       sale_id = res.body.sale_id;
  //       done();
  //     });
  // });
  //
  // test('GET sale with farm_id from DB', (done) => {
  //   chai.request(server).get('/sale/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       chai_expect(res.body.length).to.equal(1);
  //       chai_expect(res.body[0].sale_id).to.equal(sale_id);
  //       done();
  //     });
  // });
  //
  // /************* delete stuff that was created in this test *************/
  // test('DELETE sale should get 200' , (done) => {
  //   chai.request(server).del('/sale/' + sale_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('GET sale with farm id should get 200' , (done) => {
  //   chai.request(server).get('/sale/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('DELETE fieldCrop should get 200' , (done) => {
  //   chai.request(server).del('/field_crop/' + field_crop_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('DELETE crop should get 200' , (done) => {
  //   chai.request(server).del('/crop/' + crop_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('DELETE field should get 200' , (done) => {
  //   chai.request(server).del('/field/' + field_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('DELETE default crop should get 404' , (done) => {
  //   chai.request(server).del('/crop/20')
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(404);
  //       done();
  //     });
  // });
  //
  // test('GET field should get 404' , (done) => {
  //   chai.request(server).get('/field/' + field_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(404);
  //       done();
  //     });
  // });
  //
  // test('UPDATE test users farm_id to null', (done) => {
  //   chai.request(server).put('/user/' + dummy.testUser.user_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .send(dummy.testUser)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('DELETE farm should get 200' , (done) => {
  //   chai.request(server).del('/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(200);
  //       done();
  //     });
  // });
  //
  // test('GET farm should get 401' , (done) => {
  //   chai.request(server).get('/farm/' + farm_id)
  //     .set('content-type', 'application/json')
  //     .set('Authorization', 'Bearer '+token)
  //     .end((err, res) => {
  //       chai_expect(err).to.be.null;
  //       chai_expect(res.status).to.equal(401);
  //       done();
  //     });
  // });

});
