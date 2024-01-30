module.exports = {
  friendlyName: "Refresh token",

  description: "",

  inputs: {
    refresh: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: "ok",
    },
    invalidToken: {
      responseType: "badRequest",
    },
  },

  fn: async function (inputs, exits) {
    await sails.helpers.verifyRefreshToken(
      inputs.refresh,
      async (err, decode) => {
        if (err || !decode) {
          return exits.invalidToken({ message: "Send a valid refresh token" });
        }

        const payload = {
          id: decode.user.id,
          email: decode.user.email,
          firstName: decode.user.firstName,
          lastName: decode.user.lastName,
          phone: decode.user.phone,
        };
        const accessToken = await sails.helpers.refreshToken({
          user: payload,
          issuer: decode.issuer,
        });

        return exits.success({
          message: `${decode.user.email}'s token has been refreshed`,
          accessToken,
        });
      }
    );
  },
};
