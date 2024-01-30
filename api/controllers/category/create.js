module.exports = {
  friendlyName: "Create",

  description: "Create category.",

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
    badCombo: {
      responseType: "badRequest",
    },
  },

  fn: async function ({ name }, exits) {
    try {
      await Category.create({ name });
    } catch (err) {
      throw exits.badCombo(err);
    }
    // All done.
    return exits.success("Category created successfully");
  },
};
