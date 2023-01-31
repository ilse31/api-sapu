const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      products,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    return res.status(200).json({
      product,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const createProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productImage,
    productStock,
  } = req.body;
  try {
    const product = await Product.create({
      productName,
      productPrice,
      productDescription,
      productImage,
      productStock,
    });
    return res.status(201).json({
      product,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productPrice,
    productDescription,
    productImage,
    productStock,
  } = req.body;
  try {
    const product = await Product.update(
      {
        productName,
        productPrice,
        productDescription,
        productImage,
        productStock,
      },
      { where: { id } }
    );
    return res.status(200).json({
      product,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy({
      where: { id },
    });
    return res.status(200).json({
      product,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
