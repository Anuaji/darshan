const dbConfig = require("../database/config");

//trainer_ClassList getall
exports.getAllTrainerClassList = (req, res) => {
    try {
        dbConfig.query(`SELECT * fROM trainer_classlist;`, (err, rows, fields) => {
          if (!err) {
            console.log(rows, "rows");
            res.send(rows);
          } else {
            console.log(err);
          }
        });
      } catch (e) {
        throw e;
      }
};

// //getone_User trainer_ClassList 
exports.getoneUser = (req, res) => {
  try {
      dbConfig.query(`SELECT * FROM trainer_classlist WHERE id = "${req.params.id}"`, 
      (err, rows, fields) => {
          if (!err) {
              res.send(rows);
           
          } else {
              console.log(err);
          }
      });
  } catch (e) {
      throw e;
  }
};

//delete trainer_ClassList 
exports.deleteTrainerClassList = (req, res) => {
    try {
      let id = req.params.id;
      const sql = `DELETE FROM trainer_classlist WHERE id='${id}'`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      throw e;
    }
  };


// create trainer_ClassList 
exports.createTrainerClassList = (req, res) => {
    console.log("req.body :>> ", req.body);
    const class_name = req.body.name?.replace(/"/g, "'");
    const description = req.body.description?.replace(/"/g, "'");
    const images = req.body.images?.replace(/"/g, "'");
    var sql = `INSERT INTO trainer_classlist(class_name,description,images)
      VALUES("${class_name}",
              "${description}",
              "${images}")`;
              
              
    try {
      dbConfig.query(sql, (err, rows, fields) => {
        if (!err) {
         
          res.send(rows);
        } else {
          console.log(err);
        }
      });
    } catch (e) {
      throw e;
    }
  };