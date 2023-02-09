const Product = require("../models/products");

const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

const getProductsStatic = async (req, res) => {
  // sorting mongodb
  const products = await Product.find({}).sort("name price");
  res.status(200).json({ nbHits: products.length, products });
};

const getProducts = async (req, res) => {
  // get only the query params that we want to use

  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    // queryObject.name = name;
    // setting regex
    queryObject.name = { $regex: name, $options: "i" };
  }

  // console.log(queryObject);
  // querying products

  let result = Product.find(queryObject);

  // sort items
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  else{
    result = result.sort("createdAt");
  }

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  res.status(200).json({ productId });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  res.status(200).json({ productId });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  res.status(204).json({ productId });
};

module.exports = {
  createProducts,
  getProductsStatic,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
