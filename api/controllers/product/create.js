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
  friendlyName: "Create",

  description: "Create product.",

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
    try {
      this.req.file("productImg").upload(
        {
          maxByte: 3000000, //3MB
          dirname: require("path").resolve(
            sails.config.appPath,
            ".tmp/public/products"
          ),
          saveAs: function (file, cb) {
            let imgRandonName = `${randomStrings()}_${file.filename}`;
            cb(null, imgRandonName);
          },
        },
        async function whenDone(err, uploadedFiles) {
          if (err) {
            return this.res.serverError(err);
          }

          let productImg = require("util").format(
            `${UPLOAD_URL}/products/${imgRandomName}`
          );
          await Product.create({
            name,
            actualPrice,
            desc,
            subcategory,
            productImg,
          });
        }
      );
    } catch (err) {
      throw exits.badCombo("Could not create product");
    }
    // All done.
    return exits.success("Successfully created product");
  },
};
