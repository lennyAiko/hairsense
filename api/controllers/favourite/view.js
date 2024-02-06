module.exports = {
  friendlyName: "View",

  description: "View favourite.",

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
    const favourite = await Favourite.findOne({
      user: this.req.user.id,
    }).populate("products");

    if (!favourite) {
      return exits.notFound("Could not find Favourite");
    }

    // All done.
    return exits.success(favourite);
  },
};
