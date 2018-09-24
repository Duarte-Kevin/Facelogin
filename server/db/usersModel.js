const Sequelize = require("sequelize");
const db = require("./db");

const UserModels = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = UserModels;
