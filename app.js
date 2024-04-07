require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoute = require("./routes/product.route"); // 產品 api 路由

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api route
app.use("/api/v1", productRoute);

// 連接 MongoDB Atlas
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "連線 MongoDB Atlas 數據庫成功 / Connected to MongoDB database"
    );

    const listenPort = 4000;
    app.listen(listenPort, () => {
      console.log(`伺服器 ${listenPort} 已啟動`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.log("連線 MongoDB Atlas 數據庫失敗 / Connection Failed.");
  });

// 搬移到連線資料庫中 - 先連線資料庫再啟動 Port
// const listenPort = 4000;
// app.listen(listenPort, () => {
//   console.log(`伺服器 ${listenPort} 已啟動`);
// });
