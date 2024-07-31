const dbConfig=require("../database/config");

const bcrypt=require("bcryptjs");


exports.createNewUser=(req,res)=>{
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var phone_number=req.body.phone_number;
  var address=req.body.address;
  var email=req.body.email;
  var password=req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
	password = hash;
}
