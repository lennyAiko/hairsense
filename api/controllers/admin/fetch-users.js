module.exports = {
  friendlyName: "Fetch users",

  description: "",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const users = await User.find({ role: "client" })
      .sort([{ createdAt: "DESC" }])
      .skip(inputs.skip)
      .limit(inputs.limit);

    const total = await User.count({ role: "client" });

    // All done.
    return exits.success({
      total,
      limit: inputs.limit,
      skip: inputs.skip,
      data: users,
      message: "Successfully fetched users",
    });
  },
};
