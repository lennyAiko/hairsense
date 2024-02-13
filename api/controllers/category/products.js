module.exports = {
  friendlyName: "Products",

  description: "Products category.",

  inputs: {},

  exits: {
    success: {
      responseType: "ok",
    },
    notFound: {
      responseType: "notFound",
    },
  },

  fn: async function (inputs, exits) {
    const subs = await Category.findOne({ id: this.req.params.id }).populate(
      "subcategories"
    );

    if (!subs) {
      return exits.notFound("Category not found");
    }

    const products = [];

    subs.subcategories.forEach(async (sub) => {
      const subCat = await Subcategory.findOne({
        id: sub.id,
      }).populate("products");
      // console.log(subCat.products);
      subCat.products.map((product) => {
        products.push(product);
      });
    });

    let categoryProducts = products;

    console.log(categoryProducts);
    // All done.
    return exits.success(categoryProducts, "done");
  },
};
