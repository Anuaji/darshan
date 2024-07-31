const dbConfig = require("../database/config");
const nodemailer = require("nodemailer");

exports.resetpassword =async (req, res) => {
  console.log("req.body :>> ", req.body);
  console.log('first', req.body.emailId)
  const email = req.body.emailId?.replace(/"/g, "'");
  var otp = Math.floor(Math.random() * 9000 + 1000);
  console.log("otp",otp);

  try {
   await dbConfig.query(
      `SELECT * FROM all_users WHERE email_id = "${email}"`,
      (err, rows, fields) => {
        console.log(rows, "rows");
        if (!err) {
          var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "a.rajanraj2000@gmail.com",
              pass: "fzwhauecwqersfcz",
            },
          });

          var mailOptions = {
            from: "a.rajanraj2000@gmail.com",
            to: email,
            subject: "verifcation code",
            text: `${otp}`,
          };

          transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(rows,"rows.id")
           console.log(rows[0].email_id,"rows.id")
           console.log("passss",otp)
              const sql = `UPDATE all_users SET password_code = ${otp} WHERE email_id = "${
                rows[0].email_id
              }";`;
              const userid=rows[0].id
            dbConfig.query(sql, (err, rows, fields) => {
                 res.status(200).json({
                  message: "code send successfully",
                  id: email,
                  userid:userid
                });
              });
            }
          });

        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};




exports.checkcode = (req, res) => {
  try{
    const code = req.body.password_code
    
    dbConfig.query(
      `SELECT * FROM all_users WHERE email_id = "${req.body.email}"`,
      (err, rows, fields) => {
        // console.log("ssssssss", rows);
        if (!err) {
          console.log("rows.password_code",rows[0].password_code)
console.log("object",code)
          const matchVerificationCode =rows[0].password_code == code;
          if(matchVerificationCode){
            res.status(200).json({
                      message: "verification code matched",
                    });
          }
          else{
            res.status(400).json({
                     message: "verification code mismatched",
                    });
          }
        } else {
          console.log(err);
        }
      }
    );
  
  }
  catch(err){

  }
}


  exports.updatepassword = (req, res) => {
  console.log('first', req.body)

  
try{
  const id = req.params.id;
  const password=req.body.password

  const sql = `UPDATE all_users SET password = ${password} WHERE id = "${
  id
  }";`; 
  console.log("qqqqqqqqqqqqqq")
  dbConfig.query(sql, (err, rows, fields) => {  
  res.status(200).json({
    message: "password change successfully",
    // id: email,
  });    
  })
  }
  catch(err){

    res.send(err)
  }
}