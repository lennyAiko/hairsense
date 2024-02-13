module.exports = {
  friendlyName: "Delete",

  description: "Delete contact.",

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
    const contact = await Contacts.destroyOne({ id: this.req.params.id });

    if (contact) {
      throw { notFound: "Could not delete contact" };
    }

    // All done.
    return exits.success("Contact deleted successfully");
  },
};
