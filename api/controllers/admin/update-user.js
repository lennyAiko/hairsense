module.exports = {
  friendlyName: "Update admin",

  description: "",

  inputs: {
    id: {
      type: "string",
    },
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
    if (!inputs.id) {
      throw { invalidData: "Id is required" };
    }

    let updatedUser = await User.updateOne({ id: inputs.id }).set({
      email: inputs.email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      phone: inputs.phone,
      role: inputs.role,
      password: inputs.password,
    });

    if (!updatedUser) {
      throw { badCombo: "Could not update user" };
    }

    // All done.
    return exits.success({ message: "User updated successful" });
  },
};
