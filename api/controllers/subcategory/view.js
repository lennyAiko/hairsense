module.exports = {
  friendlyName: "View",

  description: "View subcategory.",

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
    const subcategory = await Subcategory.findOne({
      id: this.req.params.id,
    }).populate("products");

    if (!subcategory) {
      throw exits.notFound("Subcategory not found");
    }

    // All done.
    return exits.success(subcategory);
  },
};
