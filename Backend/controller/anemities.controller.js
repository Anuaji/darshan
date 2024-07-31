const dbConfig = require("../database/config");

let anemeties = {};

anemeties.getAll = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from amenities`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

anemeties.getSingleAmenities = async req => {
  return new Promise((resolve, reject) => {
    try {
      var AmenitiesId = req.params.AmenitiesId;

      const sql = `SELECT * FROM amenities WHERE AmenitiesId = ${AmenitiesId}`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

anemeties.delete = async req => {
  return new Promise((resolve, reject) => {
    try {
      // var AmenitiesId = req.params.AmenitiesId;

      const sql = `DELETE FROM amenities WHERE AmenitiesId = ${req.params.id}`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve({ status: "Success" });
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

// exports.anemetiesDelete = (req, res) => {
//     dbConfig.query(
//       `DELETE FROM amenities WHERE AmenitiesId = ${req.params.id}`,
//       (err, rows, fields) => {
//         if (!err) res.send(rows);
//         else console.log(err);
//       }
//     );
//   };

anemeties.create = async req => {
  return new Promise((resolve, reject) => {
    try {
      var amenity_Name = req.body.amenityName;
      var amenity_Description = req.body.amenityDescription;

      const sql = `INSERT INTO amenities (amenityName,amenityDescription,isMandatory) VALUES("${amenity_Name}","${amenity_Description}",'0')`;

      // console.log(amenity_Name_updated, amenity_Description_update);

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {

          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

anemeties.updateanemeties = async req => {
  return new Promise((resolve, reject) => {
    try {
      var amenity_Name = req.body.amenityName;
      var amenity_Description = req.body.amenityDescription;

      const sql = `UPDATE amenities SET amenityName = "${amenity_Name}", amenityDescription="${amenity_Description}"  WHERE AmenitiesId = "${req.params.AmenitiesId}"`;

      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log(err, "err");
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = anemeties;
