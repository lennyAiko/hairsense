module.exports = {
  friendlyName: "Forgot password",

  description: "",

  inputs: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    oldPassword: {
      type: "string",
      required: true,
    },
    newPassword: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },

    notFound: {
      responseType: "notFound",
    },

    invalidData: {
      responseType: "badRequest",
    },
  },

  fn: async function ({ email, oldPassword, newPassword }, exits) {
    const user = await User.findOne({ email });

    if (!user) {
      throw { notFound: "User not found" };
    }

    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept("incorrect", () => {
        return exits.badCombo("Incorrect password");
      });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ email }).set({ password: hashedPassword });
    // All done.
    return;
  },
};
