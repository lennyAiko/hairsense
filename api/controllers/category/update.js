module.exports = {
  friendlyName: "Update",

  description: "Update category.",

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
    let category = await Category.updateOne({ id: this.req.params.id }).set({
      name,
    });

    if (!category) {
      throw exits.notFound("Could not update category");
    }
    // All done.
    return exits.success("Category updated successfully");
  },
};
