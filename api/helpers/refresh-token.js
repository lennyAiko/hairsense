const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {


  friendlyName: 'Refresh token',


  description: '',


  inputs: {

    payload: {
      type: 'json',
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({payload}, exits) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {expiresIn: '1h'});

    return exits.success({ access: accessToken });
  }


};

