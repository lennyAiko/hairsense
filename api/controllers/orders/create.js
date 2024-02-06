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
    { firstName, lastName, phone, address, state, city, method, amount },
    exits
  ) {
    const cart = await Cart.findOne({ user: this.req.user.id });

    if (!cart) {
      return exits.badCombo("Could not place order");
    }

    let order = await Order.create({
      firstName,
      lastName,
      phone,
      address,
      state,
      city,
      method,
      amount,
      status: "Order Placed",
      payment: "Pending",
      products: cart.products,
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

    sails.log(HYDROGEN_TEST_URL);

    let res = await fetch(HYDROGEN_TEST_URL, payload, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.HYDROGEN_API_KEY,
      },
    });

    res = await res.json();

    sails.log(res);

    // All done.
    return exits.success({
      message: "Successfully fetched payment URL",
      // url: res.data.url,
    });
  },
};
