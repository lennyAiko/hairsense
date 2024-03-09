/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // ACCOUNTS
  "POST /accounts/register": {
    action: "auth/register",
    swagger: {
      tag: ["accounts"],
      summary: "Register user",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  "POST /accounts/sign_in": {
    action: "auth/login",
    swagger: {
      tag: ["accounts"],
      summary: "Log in user",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  "POST /accounts/token_refresh": {
    action: "auth/refresh-token",
    swagger: {
      tag: ["accounts"],
      summary: "Refresh user token",
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  },

  // USER
  "GET /accounts/user": {
    action: "user/profile",
    swagger: {
      tag: ["user"],
      summary: "User profile",
      consumes: ["application/json"],
      produces: ["application/json"],
      security: [{ BearerAuth: [] }],
    },
  },

  "PATCH /accounts/user": "user/update",

  // STORE
  "POST /store/categories": "category/create",
  "GET /store/categories": "category/fetch",
  "GET /store/categories/:id/products": "category/products",
  "GET /store/categories/:id/sub": "category/sub",
  "GET /store/categories/:id": "category/view",
  "PATCH /store/categories/:id": "category/update",
  "DELETE /store/categories/:id": "category/delete",

  // SUB_CATEGORIES
  "POST /store/sub_categories": "subcategory/create",
  "GET /store/sub_categories": "subcategory/fetch",
  "GET /store/sub_categories/:id": "subcategory/view",
  "PATCH /store/sub_categories/:id": "subcategory/update",
  "DELETE /store/sub_categories/:id": "subcategory/delete",

  // PRODUCTS
  "POST /store/products": "product/create",
  "GET /store/products": "product/fetch",
  "GET /store/products/new": "product/new",
  "GET /store/products/trending": "product/trending",
  "GET /store/products/:id": "product/view",
  "PATCH /store/products/:id": "product/update",
  "DELETE /store/products/:id": "product/delete",

  // FAVOURITES
  "POST /store/favourite/items": "favourite/add",
  "GET /store/favourite/": "favourite/view",
  "DELETE /store/favourite/items/:id": "favourite/delete",

  // CART
  "POST /store/cart/": "cart/create",
  "GET /store/cart/": "cart/view",
  "DELETE /store/cart/": "cart/empty",

  // ORDER
  "POST /store/order": "orders/create",
  "POST /store57485487hfhdhdfhdf/webhook": "orders/webhook",
  "GET /store/order": "orders/fetch",
  "GET /store/order/:id": "orders/view",
  "PATCH /store/order/:id": "orders/update",
  "DELETE /store/order/:id": "orders/delete",

  // CONTACT
  "POST /contact": "contact/create",
  "DELETE /contact/:id": "contact/delete",
  "GET /contact": "contact/fetch",

  // CUSTOMERS
  "GET /customers": "user/customers",

  // TRANSACTIONS
  "GET /transactions": "transactions/fetch",

  // ADMIN
  "POST /admin": "admin/createAdmin",
};
