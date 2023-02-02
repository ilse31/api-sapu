const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const route = require("express").Router();
const product = require("../controllers/productController");
const upload = require("../controllers/uploadController");
const cart = require("../controllers/cartController");
const order = require("../controllers/orderController");

route.get("/", auth.verifyToken, (req, res) => {
  res.json({
    status: "success",
  });
});

//! User
route.post("/auth/login", authController.login); // login
route.post("/auth/register", authController.create); //register
route.post("/auth/refresh", authController.getRefresh); //refresh token
route.get("/auth/me", auth.verifyToken, authController.getMe); //get user Login

//! Product
route.get("/product", product.getAllProducts); //get all product
route.get("/product/:id", product.getProductById); //get product by id
route.post("/product", product.createProduct); //create product
route.put("/product/:id", product.updateProduct); //update product
route.delete("/product/:id", product.deleteProduct); //delete product

//! Order
route.post("/order", order.checkOut); //checkout
route.get("/order", order.orderHistory); //order history
route.post("/orders", order.bulkCheckOut); //bulk checkout

//! Cart
route.get("/cart", cart.getCart); //get cart
route.post("/cart", cart.addToCart); //add to cart
route.put("/cart/:id", cart.updateCart); //update cart
route.delete("/cart/:id", cart.deleteCart); //delete cart

//! Upload
route.post("/upload", upload.uploadFile); //upload image

module.exports = route;
