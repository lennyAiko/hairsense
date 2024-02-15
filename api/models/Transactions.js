/**
 * Transactions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    amount: {
      type: "number",
      required: true,
    },
    orderNo: {
      columnName: "order_no",
      type: "string",
      required: true,
    },
    reference: {
      type: "string",
      required: true,
    },
  },
};
