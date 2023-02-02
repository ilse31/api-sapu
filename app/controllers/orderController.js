const { Order, User, Product } = require("../../models");

// const buyProduct = async (req, res) => {
//   try {
//     const product = await Product.update(
//       {
//         productStock: req.body.productStock,
//       },
//       { where: { id } }
//     );
//     return res.status(200).json({
//       product,
//       message: "success",
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

const checkOut = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = await orderProduct(userId, [
      {
        productId,
        quantity,
      },
    ]);
    return order;
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

const orderProduct = async (userId, items) => {
  let order, updateStock;
  for (const item of items) {
    const { productId, quantity } = item;
    const product = await Product.findOne({ where: { id: productId } });
    if (product) {
      if (product.productStock >= quantity) {
        order = await Order.create({
          userId,
          productId: productId,
          quantity: quantity,
          totalPrice: product.productPrice * quantity,
        });
        updateStock = await Product.update(
          {
            productStock: product.productStock - quantity,
          },
          { where: { id: productId } }
        );
      }
    }
    return res.status(200).json({
      order,
      updateStock,
      message: "success",
    });
  }
};

const bulkCheckOut = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await orderProduct(userId, items);
    return order;
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  orderHistory,
  checkOut,
  bulkCheckOut,
};
