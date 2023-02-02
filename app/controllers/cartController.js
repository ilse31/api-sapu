const { Cart, Product, User, Order } = require("../../models");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ where: { userId, productId } });
    if (cart) {
      const newQuantity = cart.quantity + quantity;
      const updateCart = await Cart.update(
        { quantity: newQuantity },
        { where: { userId, productId } }
      );
      return res.status(200).json({
        updateCart,
        message: "success",
      });
    }
    const newCart = await Cart.create({
      userId,
      productId,
      quantity,
    });
    return res.status(200).json({
      newCart,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    const Carts = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        product: item.product,
      };
    });
    return res.status(200).json({
      Carts,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.destroy({ where: { userId, productId } });
    return res.status(200).json({
      cart,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.update(
      { quantity },
      { where: { userId, productId } }
    );
    return res.status(200).json({
      cart,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteCart,
  updateCart,
};
