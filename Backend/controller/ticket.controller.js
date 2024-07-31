const dbConfig = require("../database/config");

//get MaingodName for footer Lists
exports.getticketList = (req, res) => {
  try {
    dbConfig.query("SELECT * FROM entrance_Tick", (err, rows, fileds) => {
      if (!err) {
        console.log(rows);
        res.send(rows);
      }
    });
  } catch (e) {
    throw e;
  }
};
