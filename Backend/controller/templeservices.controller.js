const dbConfig = require("../database/config");

//createVendorAD
exports.createVendorAD = (req, res) => {
  const vendorId = req.body.vendorId;
  const name = req.body.name?.replace(/"/g, "'");
  const categoryid = req.body.catergories;
  const subCategoryid = req.body.subCatergories;
  const price = req.body.price;
  const offerPrice = req.body.offerPrice;
  const details = req.body.details;
  const address = req.body.address?.replace(/"/g, "'");
  const country = req.body.country;
  const state = req.body.state;
  const district = req.body.district;
  const city = req.body.city;
  const area = req.body.area;
  // Offer images
  if (req.files != undefined) {
    if (req.files.photo != undefined) {
      var vendorfile = req.files.photo;
      var path = "/public/vendorcategory_imges/";
      var offer_imageName = vendorfile.name;
      var Photo = path + offer_imageName;
      console.log(Photo, "Photo");
      vendorfile.mv(
        "./public/vendorcategory_imges/" + offer_imageName,
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  } else {
    console.log("Please Upload Image !!!");
  }

  var sql = `INSERT INTO ventor_categorylist (vendorId,name,categoryid,subCategoryid,price,offerPrice,details,address,country,state,district,city,area,photo)
  VALUES("${vendorId}",
         "${name}",
          "${categoryid}",
          "${subCategoryid}",
          "${price}",
          "${offerPrice}",
          "${details}",
          "${address}",
          "${country}",
          "${state}",
          "${district}",
          "${city}",
          "${area}",
          "${Photo}"
          )`;

  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        console.log("aaaaaaaaaaa", rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

exports.getAllVendorAD = (req, res) => {
  try {
    dbConfig.query(`SELECT * fROM ventor_categorylist`, (err, rows, fields) => {
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

exports.deleteVendorAD = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM ventor_categorylist  WHERE id='${id}'`;
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

exports.updateAd = (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name?.replace(/"/g, "'");
    const categoryid = req.body.catergories;
    const subCategoryid = req.body.subCatergories;
    const price = req.body.price;
    const offerPrice = req.body.offerPrice;
    const details = req.body.details;
    const address = req.body.address?.replace(/"/g, "'");

    const sql = `UPDATE ventor_categorylist SET name = "${name}",categoryid = "${categoryid}", subCategoryid = "${subCategoryid}",price = "${price}",offerPrice = "${offerPrice}", details = "${details}",address = "${address}" WHERE id= "${id}" ;`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.json(err);
    });
  } catch (e) {
    res.json(e);
  }
};

// Get User added Adveristement
exports.getAdBasedOnUserID = (req, res) => {
  const vendorId = req.params.id;
  dbConfig.query(
    `SELECT * FROM ventor_categorylist WHERE vendorId = ${vendorId}`,
    (err, rows, _field) => {
      if (!err) {
        res.send(rows);
      } else console.log(err);
    }
  );
};

exports.getVendor = (req, res) => {
  dbConfig.query(`SELECT * FROM ventor_categorylist `, (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

exports.getOneVendor = (req, res) => {
  console.log(req.params.categoryid);
  dbConfig.query(
    `SELECT * FROM ventor_categorylist WHERE categoryid = ${req.params.categoryid}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.getSpecificVendor = (req, res) => {
  dbConfig.query(
    `SELECT * FROM ventor_categorylist WHERE vendorId = "${req.params.id}"`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.getbasedlocation = (req, res) => {
  dbConfig.query(
    `SELECT * FROM ventor_categorylist WHERE categoryid = ${req.params.categoryid}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
