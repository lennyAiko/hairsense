module.exports = {
  friendlyName: "Dashboard",

  description: "Dashboard admin.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
  },

  fn: async function (inputs, exits) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const dateFilter = currentDate.getTime();
    const totalAmount = await Order.sum("amount", {
      where: {
        createdAt: {
          ">=": dateFilter,
        },
        status: "Order Placed",
      },
    });

    const totalOrders = await Order.count();
    const totalProducts = await Product.count();

    // All done.
    return exits.success({
      data: { totalOrders, totalProducts, totalAmount },
      message: "Successfully feteched ",
    });
  },
};
