module.exports = {
  friendlyName: "Update",

  description: "Update subcategory.",

  inputs: {
    name: {
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
  },

  fn: async function ({ name }, exits) {
    let subcategory = await Subcategory.updateOne({
      id: this.req.params.id,
    }).set({
      name,
    });

    if (!subcategory) {
      throw exits.notFound("Could not update category");
    }
    // All done.
    return exits.success("Category updated successfully");
  },
};
