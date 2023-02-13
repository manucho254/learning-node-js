const Product = require("../models/products");

const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

const getProductsStatic = async (req, res) => {
  // sorting mongodb
  const products = await Product.find({ price: { $gt: 30, $lt: 300 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ nbHits: products.length, products });
};

const getProducts = async (req, res) => {
  // get only the query params that we want to use

  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // checking if we have feature query
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // checking if we have company query
  if (company) {
    queryObject.company = company;
  }

  // checking if we have name query
  if (name) {
    // queryObject.name = name;
    // setting regex
    queryObject.name = { $regex: name, $options: "i" };
  }

  // querying products

  // filtering using greater on less than
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "eq": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  // sort items
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // field to return in response
  if (fields) {
    const selectList = fields.split(",").join(" ");
    result = result.select(selectList);
  }

  // pagination using limit and skip
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.limit(limit).skip(skip);

  console.log(queryObject);

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
