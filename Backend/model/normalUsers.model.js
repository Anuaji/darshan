const Sequelize=require('sequelize');
const db=require("../database/db");

module.exports=db.sequelize.define(
  "normalUsers",
  {
      user_id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName:{
        type:Sequelize.STRING
      },
      lastName:{
        type:Sequelize.STRING
      },
      phone_number:{
        type:Sequelize.TEXT
      },
      address:{
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      password:{
        type:Sequelize.TEXT
      }

  },
  {timestamps:false}
);
