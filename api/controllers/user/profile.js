module.exports = {
  friendlyName: "Profile",

  description: "Profile user.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    if (!this.req.user) {
      throw exits.notFound("User not found");
    }

    const user = this.req.user;

    // All done.
    return exits.success({ user });
  },
};
