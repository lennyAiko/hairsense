module.exports = {
  friendlyName: "Update admin",

  description: "",

  inputs: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
      isEmail: true,
    },
    firstName: {
      type: "string",
      minLength: 3,
    },
    lastName: {
      type: "string",
      minLength: 3,
    },
    phone: {
      type: "string",
      minLength: 11,
    },
    role: {
      type: "string",
      isIn: ["admin", "user", "superadmin"],
    },
    password: {
      type: "string",
      minLength: 8,
    },
    status: {
      type: "boolean",
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

    const existingUser = await User.findOne({ id: inputs.id });

    let updatedUser = await User.updateOne({ id: inputs.id }).set({
      email: inputs.email || existingUser.email,
      firstName: inputs.firstName || existingUser.firstName,
      lastName: inputs.lastName || existingUser.lastName,
      phone: inputs.phone || existingUser.phone,
      role: inputs.role || existingUser.role,
      password: inputs.password || existingUser.password,
      status: inputs.status || existingUser.status,
    });

    if (!updatedUser) {
      throw { badCombo: "Could not update user" };
    }

    // All done.
    return exits.success({ message: "User updated successful" });
  },
};
