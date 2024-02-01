module.exports = {
  friendlyName: "Create",

  description: "Create favourite.",

  inputs: {
    product: {
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

  fn: async function ({ product }, exits) {
    let item = Favourite.findOrCreate(
      { user: this.req.user.id },
      { user: this.req.user.id, product }
    ).exec(async (err, favourite, wasCreated) => {
      if (err) {
        sails.log(err);
        return exits.badCombo("Could not create favourite");
      }
      if (wasCreated) {
        return favourite;
      } else {
        await Favourite.updateOne({ id: favourite.id }).set({ product });
        return favourite;
      }
    });

    // All done.
    return exits.success(item);
  },
};
