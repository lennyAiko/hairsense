module.exports = {
  friendlyName: "Create admin",

  description: "",

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
    role: {
      type: "string",
      required: true,
      isIn: ["admin", "user", "superadmin"],
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
    }).fetch();

    if (!newUser) {
      throw { badCombo: "Could not create user" };
    }

    // All done.
    return exits.success({ message: "User registration successful" });
  },
};
