const dbConfig= require("../database/config");

//Delete  ContactUS
exports.deleteContactUs = (req, res) => {
    try {
      dbConfig.query(
        `DELETE FROM contactus WHERE id = "${req.params.id}";`,
        (err, rows, fields) => {
          if (!err) res.send(rows);
          else console.log(err);
        }
      );
    } catch (e) {
      throw e;
    }
  };
  
  //Get all ContactUS
  exports.getAllContact = (req, res) => {
    try {
      dbConfig.query(`SELECT * FROM contactus;`, (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      });
    } catch (e) {
      throw e;
    }
  };

  //Create Contact
exports.createContact = (req, res) => {
    var name = req.body.name;
    var mobile = req.body.mobile;
    var email = req.body.email;
    // var email_id = req.body.email_id;
    var description = req.body.description;
    var location = req.body.location;
    // var is_active = req.body.is_active;
    try {
      dbConfig.query(
        `INSERT INTO contactus
          (name,mobile,email,description,location)
          VALUES
          ("${name}","${mobile}","${email}",
          "${description}","${location}");`,
        (err, rows, fields) => {
          if (!err) res.send(rows);
          else console.log(err);
        }
      );
    } catch (e) {
      throw e;
    }
  };