const dbConfig = require('../database/config');
exports.languageGetAll = (req, res) => {
  try {
    dbConfig.query(
      "SELECT * FROM languages",
      (err, rows, field) => {
        if (!err) {
          // console.log(rows,"here");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};