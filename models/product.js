"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      // define association here
      this.hasMany(Order, {
        foreignKey: "productId",
        hooks: {
          this: this.beforeUpdate((product, options) => {
            if (product.productStock < 1) {
              product.productStatus = "Out of Stock";
            } else {
              product.productStatus = "Available";
            }
          }),
          this: this.beforeCreate((product, options) => {
            if (product.productStock < 1) {
              product.productStatus = "Out of Stock";
            } else {
              product.productStatus = "Available";
            }
          }),
        },
        as: "order",
      });
    }
  }
  Product.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
