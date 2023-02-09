const Product = require("../models/products");

const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

const getProductsStatic = async (req, res) => {
  const products = await Product.find({nbHits:products.length})
  console.log(products.length)
  res.status(200).json({ products: products });
};

const getProducts = async (req, res) => {
  const products = await Product.find({})
  console.log(products)
  res.status(200).json({ products: products });
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
