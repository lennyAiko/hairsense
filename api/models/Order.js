/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: "string",
      maxLength: 50,
      columnName: "first_name",
      required: true,
    },
    lastName: {
      type: "string",
      maxLength: 50,
      columnName: "last_name",
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
      isIn: ["Failed", "Pending", "Paid"],
      maxLength: 32,
      required: true,
    },
    products: {
      type: "ref",
    },
    transactionRef: {
      type: "string",
      columnName: "transaction_ref",
    },
    customerEmail: {
      columnName: "customer_email",
      type: "string",
      isEmail: true,
    },
    chargedAmount: {
      type: "number",
      columnName: "charged_amount",
    },
    // associations
    user: {
      model: "user",
    },
  },
};
