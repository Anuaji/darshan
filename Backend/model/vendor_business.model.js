const Sequelize=require('sequelize');
const db=require("../database/db");

module.exports=db.sequelize.define(
  "vendor_business",
  {
    id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    temple_id:{
      type: Sequelize.INTEGER,
    },
    hotel_name:{
      type:Sequelize.STRING
    },
    room_types:{
      type:Sequelize.STRING
    },
    total_rooms:{
      type:Sequelize.INTEGER
    },
    country_id:{
      type:Sequelize.INTEGER
    },
    state_id:{
      type:Sequelize.INTEGER
    },
    district_id:{
      type:Sequelize.INTEGER
    },
    city_id:{
      type:Sequelize.INTEGER
    },
    area_id:{
      type:Sequelize.INTEGER
    },
    address:{
      type:Sequelize.STRING
    },
    pincode: {
			type: Sequelize.INTEGER
		},
		phone: {
			type: Sequelize.TEXT
		},
  },
  {
    timestamps: false
  }
);
