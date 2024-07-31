const dbConfig = require("../database/config");

exports.InauspiciouseGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM inauspiciousevent", (err, rows, field) => {
    if (!err) {
      console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};
