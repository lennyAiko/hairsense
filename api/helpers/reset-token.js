const jwt = require('jsonwebtoken');
require('dotenv').config();

const resetTokenSecret = process.env.RESET_TOKEN_SECRET;

module.exports = {


  friendlyName: 'Reset token',


  description: '',


  inputs: {

    payload: {
      type: 'json',
      required: true
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({payload}, exits) {
    const resetToken = jwt.sign(payload, resetTokenSecret, {expiresIn: '5m'});

    return exits.success({reset: resetToken});
  }


};

