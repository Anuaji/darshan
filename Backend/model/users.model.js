const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    user_name: {
      type: Sequelize.STRING
    },
    role_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.TEXT
    },
    password: {
      type: Sequelize.TEXT
    },
    country_id: {
      type: Sequelize.INTEGER
    },
    state_id: {
      type: Sequelize.INTEGER
    },
    district_id: {
      type: Sequelize.INTEGER
    },
    city_id: {
      type: Sequelize.INTEGER
    },
    kuladeivam: {
      type: Sequelize.STRING
    },
    fav_god: {
      type: Sequelize.INTEGER
    },
    is_active: {
      type: Sequelize.BOOLEAN
    }
  },
  { timestamps: false }
);
