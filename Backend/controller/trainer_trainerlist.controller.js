const dbConfig = require("../database/config");

//trainer_trainerList getall
exports.getAlltrainer = (req, res) => {
    try {
        dbConfig.query(`SELECT * fROM trainer_trainerlist;`, (err, rows, fields) => {
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


// create trainer_trainerList 
exports.createtrainer = (req, res) => {
    console.log("req.body :>> ", req.body);
    const class_name = req.body.name?.replace(/"/g, "'");
    const description = req.body.description?.replace(/"/g, "'");
    const images = req.body.images?.replace(/"/g, "'");
    var sql = `INSERT INTO trainer_trainerlist(class_name,description,images)
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

  