const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = {


  friendlyName: 'Sign token',


  description: 'This is the helper for signing your token',


  inputs: {

    payload: {
      type: 'json',
      isNotEmptyString: true,
      description: 'This is the payload to be signed.'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({payload}, exits) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {expiresIn: '2d'});

    return exits.success({ access: accessToken, refresh: refreshToken });

  }


};
