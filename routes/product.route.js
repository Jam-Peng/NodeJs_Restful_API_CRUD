const Product = require("../models/product.model");
const router = require("express").Router();

// 取得所有產品
// app.get("/api/v1/get-products", async (req, res) => {
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find({});
    // res.status(200).send(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("無法取得所有產品資訊");
  }
});

// 取得一筆產品資料
router.get("/get-product/:id", async (req, res) => {
  // const { id } = req.params;
  // const product = await Product.findOne({ _id: id });

  // if (!product) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "查無此產品",
  //   });
  // }

  try {
    // const product = await Product.find({ _id: id });
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("無法取得產品資訊");
  }
});

// 新增一筆產品
router.post("/create-product", async (req, res) => {
  // const { title, quantity, price, describe, image } = req.body;

  // const newProduct = new Product({
  //   title,
  //   quantity,
  //   price,
  //   describe,
  //   image,
  // });

  try {
    // await newProduct.save();
    // res.status(201).send({
    //   newProduct,
    //   success: true,
    //   message: "新增成功",
    // });
    const product = await Product.create(req.body);
    res.status(201).json({ product, message: "新增成功" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "新增產品失敗",
    });

    // res.status(500).json({ message: error.message });
  }
});

// 更新特定產品全部資料(方法二)
// app.put("/update-product/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const product = await Product.findOne({ _id });
//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "查無此產品",
//     });
//   }

//   try {
//     const updateProduct = await Product.findOneAndUpdate({ _id }, req.body, {
//       new: true,
//       runValidators: true,
//     })
//       .then((updateProduct) => {
//         res
//           .status(200)
//           .send({ updateProduct, seccess: true, message: "產品更新成功" });
//       })
//       .catch((err) => {
//         res.status(400).send({
//           seccess: false,
//           message: `產品更新失敗 ${err.message}`,
//         });
//       });
//   } catch (error) {
//     res.status(400).send({ message: "格式錯誤，產品更新失敗" });
//   }
// });

// 更新特定產品全部資料(方法一)
router.put("/update-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "查無此產品",
      });
    }

    const updateProduct = await Product.findById(id);

    res
      .status(200)
      .send({ updateProduct, seccess: true, message: "產品更新成功" });
  } catch (error) {
    res.status(400).send({
      seccess: false,
      message: `產品更新失敗 ${error.message}`,
    });
  }
});

// 刪除一筆資料
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "查無此產品",
      });
    }

    res.send({ seccess: true, message: "刪除成功" });
  } catch (error) {
    res.status(400).send({
      seccess: false,
      message: `產品刪除失敗 ${error.message}`,
    });
  }
});

// 刪除全部資料
router.delete("/destroy-products", async (req, res) => {
  await Product.deleteMany({})
    .then(() => {
      res.status(200).send({ message: "刪除全部資料成功" });
    })
    .catch((err) => {
      res.send({ message: `刪除全部資料失敗${err.message}` });
    });
});

module.exports = router;
