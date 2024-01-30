module.exports = {
  friendlyName: "Delete",

  description: "Delete category.",

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
      await Category.destroyOne({ id: this.req.params.id });
    } catch (err) {
      throw exits.notFound("Could not delete category");
    }
    // All done.
    return exits.success("Successfully deleted category");
  },
};
