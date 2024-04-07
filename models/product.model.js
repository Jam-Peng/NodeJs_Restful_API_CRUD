const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "請輸入產品名稱"],
    },

    quantity: {
      type: Number,
      require: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    describe: {
      type: String,
      required: false,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    // timestamps: true, // 美國時區
    timestamps: {
      currentTime: () => new Date(Date.now() + 8 * 60 * 60 * 1000),
    }, // 亞洲 +8時區
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
