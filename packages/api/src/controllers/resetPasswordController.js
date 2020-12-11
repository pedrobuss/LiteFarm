/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (yieldController.js) is part of LiteFarm.
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

const baseController = require('../controllers/baseController');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


async function createHash(req, res, next) {
  const hash = crypto.createHmac('sha256', process.env.JWT_SECRET); // algo, key
  const { email } = req.body;
  const user = await userModel.query().select('*').where('email', email)
  if (user) {
    hash.update(user.user_id)
    req.token = hash.digest('hex');
    req.user_email = user.email;
    next();
  } else {
    res.status(404).send({ message: 'Not found' })
  }
}

function recordHashAndAttempt(req, res, next) {
  const {token, user_email} = req;
  const time = new Date();
  /*
  await hashModel.query().insert({token, user_email, time)
  * */
}


async function verifyHash(req, res, next) {
  const newHash = crypto.createHmac('sha256', process.env.JWT_SECRET); // algo, key
  const { email, hash } = req.body;
  const user = await userModel.query().select('*').where('email', email)
  newHash.update(user.user_id);
  if(newHash.digest('hex') === hash) { // The user sent the same hash it was provided. Now verifiy

  }
}


module.exports = {
  createHash,
  recordHashAndAttempt,
  verifyHash
};
