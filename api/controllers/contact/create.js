module.exports = {
  friendlyName: "Create",

  description: "Create contact.",

  inputs: {
    fullName: {
      type: "string",
      required: true,
      maxLength: 120,
    },

    email: {
      type: "string",
      required: true,
      minLength: 3,
      isEmail: true,
    },

    message: {
      type: "string",
      required: true,
      minLength: 3,
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

  fn: async function ({ fullName, email, message }, exits) {
    const contact = await Contacts.create({ fullName, email, message }).fetch();

    if (!contact) {
      throw { badCombo: "Could not create contact" };
    }

    // All done.
    return exits.success("Contact received successfully");
  },
};
