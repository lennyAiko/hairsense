const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {


  friendlyName: 'Verify token',


  description: '',


  inputs: {

    token: {
      type: 'string',
      required: true
    },

    cb: {
      type: 'ref',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({token, cb}, exits) {
    return exits.success(jwt.verify(token, accessTokenSecret, {}, cb));
  }


};

