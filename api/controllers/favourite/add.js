module.exports = {
  friendlyName: "Create",

  description: "Create favourite.",

  inputs: {
    products: {
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

  fn: async function ({ products }, exits) {
    let item = await Favourite.findOrCreate(
      { user: this.req.user.id },
      { user: this.req.user.id, products }
    ).exec(async (err, favourite, wasCreated) => {
      if (err) {
        sails.log(err);
        return exits.badCombo("Could not create favourite");
      }
      if (wasCreated) {
        sails.log(wasCreated);
        return favourite;
      } else {
        sails.log(wasCreated);
        await Favourite.updateOne({ id: favourite.id }).set({ products });
        return favourite;
      }
    });

    // All done.
    return exits.success(item);
  },
};
