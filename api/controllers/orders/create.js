require("dotenv").config();
const HYDROGEN_TEST_URL = process.env.HYDROGEN_TEST_URL;

module.exports = {
  friendlyName: "Create",

  description: "Create orders.",

  inputs: {
    firstName: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    phone: {
      type: "string",
      maxLength: 11,
      required: true,
    },
    address: {
      type: "string",
      required: true,
    },
    state: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    city: {
      type: "string",
      maxLength: 50,
      required: true,
    },
    method: {
      type: "string",
      isIn: ["Cash On Delivery", "Pickup"],
      maxLength: 32,
      required: true,
    },
    amount: {
      type: "number",
      required: true,
    },
    status: {
      type: "string",
      isIn: ["Order Placed", "Out for Delivery", "Order Delivered"],
      maxLength: 32,
      required: true,
    },
    payment: {
      type: "string",
      isIn: ["Failed", "Pending", "Successful"],
      maxLength: 32,
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

  fn: async function (
    {
      firstName,
      lastName,
      phone,
      address,
      state,
      city,
      method,
      amount,
      status,
      payment,
    },
    exits
  ) {
    const products = await Cart.findOne({ user: this.req.user.id });

    let order = await Order.create({
      firstName,
      lastName,
      phone,
      address,
      state,
      city,
      method,
      amount,
      status,
      payment,
      products: products.products,
    }).fetch();

    if (!order) {
      return exits.badCombo("Could not create order");
    }

    const payload = {
      email: this.req.user.email,
      amount,
      callback: "https://www.hairsenseretail.com/my_account",
      currency: "NGN",
      description: "Payment for Hairsense Retail",
      meta: "test meta",
    };

    let res = await fetch(
      `${HYDROGEN_TEST_URL}/merchant/initiate-payment`,
      payload
    );

    res = await res.json();

    sails.log(res);

    // All done.
    return exits.success({
      message: "Successfully fetched payment URL",
      url: res.data.url,
    });
  },
};
