const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
	"user_register",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_name: {
			type: Sequelize.STRING
		},
		pincode: {
			type: Sequelize.INTEGER
		},
		phone: {
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
		area_id: {
			type: Sequelize.INTEGER
		}
	},
	{ timestamps: false }
);
