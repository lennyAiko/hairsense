require("dotenv").config();
const UPLOAD_URL = process.env.UPLOAD_URL;

function randomStrings(length, chars) {
  var length = 16;
  var result = "";
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

module.exports = {
  friendlyName: "Update",

  description: "Update product.",

  inputs: {
    name: {
      type: "string",
      required: true,
      unique: true,
    },
    actualPrice: {
      columnName: "actual_price",
      type: "number",
      required: true,
    },
    desc: {
      type: "string",
    },
    subcategory: {
      type: "string",
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

  fn: async function ({ name, actualPrice, desc, subcategory }, exits) {
    let product = await Product.updateOne({ id: this.req.params.id }).set({
      name,
      actualPrice,
      desc,
      subcategory,
    });

    if (!product) {
      return exits.badCombo("Could not update product");
    }

    this.req.file("productImg").upload(
      {
        maxBytes: 3000000, //2MB
        dirname: require("path").resolve(
          sails.config.appPath,
          ".tmp/public/products"
        ),
        saveAs: function (file, cb) {
          imgRandomName = `${randomStrings()}_${file.filename}`;
          cb(null, imgRandomName);
        },
      },
      async function whenDone(err, uploadedFiles) {
        if (err) {
          // return this.res.status(500).json({ message: "No file was uploaded" });
          return this.res.serverError(err);
        }

        let productImg = require("util").format(
          `${UPLOAD_URL}/products/${imgRandomName}`
        );

        if (uploadedFiles.length > 0) {
          await Product.updateOne({ id: product.id }).set({ productImg });
        }
      }
    );

    // All done.
    return exits.success("Successfully updated product");
  },
};
