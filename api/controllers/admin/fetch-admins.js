module.exports = {
  friendlyName: "Fetch admins",

  description: "",

  inputs: {
    skip: {
      type: "number",
      required: true,
    },
    limit: {
      type: "number",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const users = await User.find({ role: "admin" })
      .sort([{ createdAt: "DESC" }])
      .skip(inputs.skip)
      .limit(inputs.limit);

    const total = await User.count({ role: "admin" });

    // All done.
    return exits.success({
      total,
      limit: inputs.limit,
      skip: inputs.skip,
      data: users,
      message: "Successfully fetched admins",
    });
  },
};
