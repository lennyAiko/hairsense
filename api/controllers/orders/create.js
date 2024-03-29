require("dotenv").config();
const HYDROGEN_TEST_URL = process.env.HYDROGEN_TEST_URL;
const HYDROGEN_API_KEY = process.env.HYDROGEN_API_KEY;

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

    const payload = {
      email: this.req.user.email,
      CustomerName: firstName,
      amount,
      callback: "https://www.hairsenseretail.com/my_account",
      currency: "NGN",
      description: "Payment for Hairsense Retail",
      meta: "test meta",
    };

    let res = await fetch(HYDROGEN_TEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: HYDROGEN_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    sails.log(data);

    if (data.statusCode !== "90000") {
      return exits.badCombo("Could not place order");
    }

    let order = await Order.create({
      firstName,
      lastName,
      phone,
      customerEmail: this.req.user.email,
      address,
      state,
      city,
      method,
      amount,
      status: "Order Placed",
      payment: "Pending",
      products: cart.products,
      transactionRef: data.data.ref,
      user: this.req.user.id,
    }).fetch();

    if (!order) {
      return exits.badCombo("Could not create order");
    }

    // All done.
    return exits.success({
      message: "Successfully fetched payment URL",
      url: data.data.url,
    });
  },
};
