require("dotenv").config();
const UPLOAD_URL = process.env.UPLOAD_URL;
const S3_SECRET = process.env.S3_SECRET;
const S3_ACCESS = process.env.S3_ACCESS;

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
    this.req.file("productImg").upload(
      {
        adapter: require("skipper-s3"),
        key: S3_ACCESS,
        secret: S3_SECRET,
        bucket: "hairsense",
        ACL: "public-read",
      },
      async function whenDone(err, filesUploaded) {
        if (err) {
          console.log(err);
          return exits.badCombo(err);
        }

        let productImg = require("util").format(
          `https://hairsense.s3.us-west-1.amazonaws.com/${filesUploaded[0].fd}`
        );
        if (filesUploaded < 1) {
          return exits.badCombo("Could not create product");
        }
        try {
          await Product.create({
            name,
            actualPrice,
            desc,
            subcategory,
            productImg,
          });
          return exits.success("Successfully created product");
        } catch (err) {
          sails.log(err);
          return exits.badCombo("Could not create product");
        }
      }
    );

    // let imgRandomName;
    // this.req.file("productImg").upload(
    //   {
    //     maxByte: 3000000, //3MB
    //     dirname: require("path").resolve(
    //       sails.config.appPath,
    //       ".tmp/public/products"
    //     ),
    //     saveAs: function (file, cb) {
    //       imgRandomName = `${randomStrings()}_${file.filename}`;
    //       cb(null, imgRandomName);
    //     },
    //   },
    //   async function whenDone(err, uploadedFiles) {
    //     if (err) {
    //       return this.res.serverError(err);
    //     }

    //     // let productImg = require("util").format(
    //     //   `${UPLOAD_URL}/products/${randoms}_${uploadedFiles[0].filename}`
    //     // );

    //     let productImg = require("util").format(
    //       `${UPLOAD_URL}/products/${imgRandomName}`
    //     );

    //     if (uploadedFiles < 1) {
    //       return exits.badCombo("Could not create product");
    //     }
    //     try {
    //       await Product.create({
    //         name,
    //         actualPrice,
    //         desc,
    //         subcategory,
    //         productImg,
    //       });
    //       return exits.success("Successfully created product");
    //     } catch (err) {
    //       sails.log(err);
    //       return exits.badCombo("Could not create product");
    //     }
    //   }
    // );

    // All done.
    return "ok";
  },
};
