module.exports = {
  friendlyName: "Register",

  description: "Register auth.",

  inputs: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    firstName: {
      type: "string",
      required: true,
      minLength: 3,
    },
    lastName: {
      type: "string",
      required: true,
      minLength: 3,
    },
    phone: {
      type: "string",
      required: true,
      minLength: 11,
    },
    password: {
      type: "string",
      minLength: 8,
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },

    badCombo: {
      responseType: "badRequest",
    },
    invalidData: {
      responseType: "conflicted",
    },
  },

  fn: async function (inputs, exits) {
    const email = inputs.email.toLowerCase();

    const hashedPassword = await sails.helpers.passwords.hashPassword(
      inputs.password
    );

    let userRecord = await User.findOne({ email });

    if (userRecord) {
      throw { invalidData: "Email already exists" };
    }

    const newUser = await User.create({
      email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phone: inputs.phone,
      password: hashedPassword,
      role: "client",
    }).fetch();

    if (!newUser) {
      throw { badCombo: "Could not create user" };
    }

    // All done.
    return exits.success({ message: "User registration successful" });
  },
};
