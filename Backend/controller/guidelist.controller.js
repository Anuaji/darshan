const dbConfig = require("../database/config");

//GuideList getall
exports.getAllGuideList = (req, res) => {
    try {
        dbConfig.query(`SELECT * FROM guidelist;`, (err, rows, fields) => {
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

// //getone_User GuideList 
exports.getoneUser = (req, res) => {
  try {
      dbConfig.query(`SELECT * FROM guidelist WHERE id = "${req.params.id}"`, 
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

//delete GuideList 
exports.deleteGuideList = (req, res) => {
    try {
      let id = req.params.id;
      const sql = `DELETE FROM guidelist WHERE id='${id}'`;
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


// create GuideList 
exports.createGuideList = (req, res) => {
    console.log("req.body :>> ", req.body);
    const class_name = req.body.name?.replace(/"/g, "'");
    const description = req.body.description?.replace(/"/g, "'");
    const images = req.body.images?.replace(/"/g, "'");
    var sql = `INSERT INTO guidelist(class_name,description,images)
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