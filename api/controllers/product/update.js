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
      required: true,
    },
    category: {
      type: "string",
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
    { name, actualPrice, desc, subcategory, category },
    exits
  ) {
    let product = await Product.updateOne({ id: this.req.params.id }).set({
      name,
      actualPrice,
      desc,
      subcategory,
      category,
    });

    if (!product) {
      return exits.badCombo("Could not update product");
    }

    this.req.file("productImg").upload(
      {
        adapter: require("skipper-s3"),
        key: S3_ACCESS,
        secret: S3_SECRET,
        bucket: "hairsense",
        ACL: "public-read",
        maxBytes: 3000000,
      },
      async function whenDone(err, uploadedFiles) {
        if (err) {
          // return this.res.status(500).json({ message: "No file was uploaded" });
          return this.res.serverError(err);
        }

        let productImg = require("util").format(
          `https://hairsense.s3.us-west-1.amazonaws.com/${filesUploaded[0].fd}`
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
