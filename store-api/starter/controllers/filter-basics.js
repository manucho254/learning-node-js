const Product = require("../models/products");

const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

const getProductsStatic = async (req, res) => {
  // filtering in .find nodejs
  const products = await Product.find({ featured: true });
  res.status(200).json({ nbHits: products.length, products });
};

const getProducts = async (req, res) => {
  console.log(req.query)
  // querying products
  const products = await Product.find(req.query);
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
