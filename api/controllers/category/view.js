module.exports = {
  friendlyName: "View",

  description: "View category.",

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
    const category = await Category.findOne({
      id: this.req.params.id,
    }).populate("subcategories");

    if (!category) {
      throw exits.notFound("Category not found");
    }

    // All done.
    return exits.success(category);
  },
};
