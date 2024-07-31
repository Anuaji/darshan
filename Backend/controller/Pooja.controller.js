const dbConfig = require("../database/config");

exports.AddPooja = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var poojaName = req.body.poojaName;
      var description = req.body.description;
      var image = "";

      // Check if there are files uploaded
      if (req.files && req.files["Pooja_images"]) {
        var filename = req.files["Pooja_images"].name;
        var mv = req.files["Pooja_images"].mv;

        // Assuming you are storing the image in a specific directory
        var imagePath = "./public/Pooja_images/" + filename;

        mv(imagePath, function (err) {
          if (err) {
            console.log(err);
            reject({
              status: 500,
              message: "Error occurred while uploading image",
            });
          }
          image = "/public/Pooja_images/" + filename; // Set image path after successful upload
        });
      } else if (req.body.image) {
        image = req.body.image; // Use provided image path if available
      }

      const sql = `INSERT INTO pooja (poojaName, description, image) VALUES (?, ?, ?)`;
      const values = [poojaName, description, image];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("err!", err);
          reject({ status: 500, message: "Error occurred while adding pooja" });
        } else {
          resolve({ status: 200, message: "Pooja added successfully" });
        }
      });
    } catch (error) {
      console.log(error);
      reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

exports.poojaGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM pooja", (err, rows, field) => {
    if (!err) {
      console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

exports.poojaGetById = (req, res) => {
  const id = req.params.id;
  console.log("id :>> ", id);
  dbConfig.query(
    "SELECT * FROM pooja WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.send(rows[0]);
        } else {
          res.status(404).send("Record not found");
        }
      } else {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    }
  );
};
