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

    // const existingUser = await User.findOne({ id: inputs.id });

    const hashedPassword = await sails.helpers.passwords.hashPassword(
      inputs.password
    );

    try {
      await User.updateOne({ id: this.req.params.id }).set({
        email: inputs.email,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phone: inputs.phone,
        role: inputs.role,
        password: hashedPassword,
        status: inputs.status,
      });
    } catch (err) {
      throw { badCombo: "Could not update user" };
    }

    // All done.
    return exits.success({ message: "User updated successfully" });
  },
};
