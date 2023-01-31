const { Order, User, Product } = require("../../models");

const buyProduct = async (req, res) => {
  const { id, buyWithUser } = req.body;
  const stok = productStock - buyWithUser;
  try {
    const product = await Product.update(
      {
        productStock: stok,
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

const orderHistory = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "roleId",
              "email",
              "phoneNumber",
              "uuid",
            ],
          },
        },
        {
          model: Product,
          as: "product",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "productStock",
              "productImage",
              "productDescription",
              "productStatus",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({
      order,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const orderProduct = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const order = await Order.create({
      productId,
      userId,
    });
    return res.status(201).json({
      order,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  buyProduct,
  orderHistory,
  orderProduct,
};
