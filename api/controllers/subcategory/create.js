module.exports = {
  friendlyName: "Create",

  description: "Create subcategory.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    category: {
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

  fn: async function ({ name, category }, exits) {
    try {
      await Subcategory.create({ name, category });
    } catch (err) {
      sails.log(err);
      throw exits.badCombo(err);
    }
    // All done.
    return exits.success("Subcategory created successfully");
  },
};
