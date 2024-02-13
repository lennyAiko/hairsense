module.exports = {
  friendlyName: "Fetch",

  description: "Fetch contact.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const contacts = await Contact.find({});

    // All done.
    return exits.success(contacts);
  },
};
