module.exports = {
  friendlyName: "Delete",

  description: "Delete favourite.",

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
    try {
      await Favourite.destroyOne({ id: this.req.params.id });
    } catch (err) {
      sails.log(err);
      return exits.notFound("Could not find favourite");
    }

    // All done.
    return exits.success("Successfully delete Favourite");
  },
};
