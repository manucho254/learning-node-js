const products = require("./populate.json");
const connectDb = require("./db/connect");
const Product = require("./models/products");

const start = async () => {
  try {
    await connectDb();
    await Product.deleteMany();
    await Product.create(products);
    process.exit();
  } catch (error) {
    console.log(error)
  }
};

start();
