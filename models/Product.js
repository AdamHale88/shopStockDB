// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type:DECIMAL(10,2),
      allowNullL: false,
      validate :{
         isDecimal:true,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:10,
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references:{
        model:"category",
        key: "id",
      },
    },
  },
    {sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
    }
  
),



module.exports = Product;
