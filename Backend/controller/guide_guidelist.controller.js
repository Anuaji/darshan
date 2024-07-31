const dbConfig = require("../database/config");

//trainer_trainerList getall
exports.getAllguide = (req, res) => {
    try {
        dbConfig.query(`SELECT * fROM guide_guidelist;`, (err, rows, fields) => {
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
exports.createguide = (req, res) => {
    console.log("req.body :>> ", req.body);
    const class_name = req.body.name?.replace(/"/g, "'");
    const description = req.body.description?.replace(/"/g, "'");
    const images = req.body.images?.replace(/"/g, "'");
    var sql = `INSERT INTO guide_guidelist(class_name,description,images)
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

  