/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (userFarmController.js) is part of LiteFarm.
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

class customSignUpController extends baseController {
    constructor() {
      super();
    }
  
    static getUserNameByUserID() {
      return async (req, res) => {
        try {
          const user_id = req.params.user_id;
          const rows = await userModel.query().select('first_name').where('users.user_id', user_id);
          if (!rows.length) {
            res.status(404).send('User does not exist');
          } else {
            res.status(200).send(rows);
          }
        } catch (error) {
          res.status(400).send(error);
        }
      };
    }
}

module.exports = customSignUpController;