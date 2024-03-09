require("dotenv").config();
const tokenIssuer = process.env.TOKEN_ISSUER;

module.exports = {
  friendlyName: "Login",

  description: "Login auth.",

  inputs: {
    email: {
      type: "string",
      isEmail: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "accepted",
    },

    badCombo: {
      responseType: "badRequest",
    },
  },

  fn: async function (inputs, exits) {
    const email = inputs.email.toLowerCase();

    let userRecord = await User.findOne({ email });

    if (!userRecord) {
      throw { badCombo: "Invalid credentials" };
    }

    try {
      await sails.helpers.passwords
        .checkPassword(inputs.password, userRecord.password)
        .intercept("incorrect", () => {
          return exits.badCombo("Incorrect password");
        });
    } catch (err) {
      return exits.badCombo("Incorrect password");
    }

    const token = await sails.helpers.signToken({
      user: {
        id: userRecord.id,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        email: userRecord.email,
        phone: userRecord.phone,
        role: userRecord.role,
        status: userRecord.status,
      },
      issuer: tokenIssuer,
    });
    // All done.
    return exits.success({
      role: userRecord.role,
      status: userRecord.status,
      access: token.access,
      refresh: token.refresh,
    });
  },
};
