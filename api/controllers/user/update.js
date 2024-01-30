module.exports = {
  friendlyName: "Update",

  description: "Update user.",

  inputs: {
    firstName: {
      type: "string",
      required: true,
    },

    lastName: {
      type: "string",
      required: true,
    },

    phone: {
      type: "string",
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
  },

  fn: async function ({ firstName, lastName, phone }, exits) {
    let user = await User.updateOne({ email: this.req.user.email }).set({
      firstName,
      lastName,
      phone,
    });

    if (!user) {
      return exits.badCombo("Could not update user");
    }

    // All done.
    return exits.success(user);
  },
};
