const dbConfig = require('../database/config');

exports.createShop = (req, res) => {
  try {
    var temple_id = req.body.temple_id;
    var shop_name = req.body.shop_name;
    var kind_of_shop = req.body.kind_of_shop;
    var country_id = req.body.country_id;
    var state_id = req.body.state_id;
    var district_id = req.body.district_id;
    var city_id = req.body.city_id;
    var area_id = req.body.area_id;
    var address = req.body.address;
    var pincode = req.body.pincode;
    var phone = req.body.phone;
    var opening_time = req.body.opening_time;
    var closing_time = req.body.closing_time;
    var active_state = req.body.active_state;


    // Main images
    if (req.files != undefined) {
      if (req.files["shop_image"]) {
        const listItems = [];
        // before

        listItems.push("/public/shop_image/" + req.files.shop_image.name);

        var filename = req.files["shop_image"]["name"];
        var mv = req.files["shop_image"]["mv"];
        mv("./public/shop_image/" + filename, function (err) {
          if (err) {
            console.log(err);
            res.send("Error occurd!");
          }
        });

        var shop_image = listItems;
      } else if (req.body.shop_image) {
        var shop_image = req.body.shop_image;
      } else {
        var shop_image = "";
      }
    } else if (req.body.shop_image) {
      var shop_image = req.body.shop_image;
    } else {
      var shop_image = "";
    }


    var sql = `INSERT INTO shops
     (temple_id, shop_name, kind_of_shop, country_id, state_id, district_id, city_id, area_id, address,pincode,phone,shop_image,opening_time,closing_time,active_state) VALUES
     ("${temple_id}","${shop_name}", "${kind_of_shop}", "${country_id}", "${state_id}","${district_id}", "${city_id}", "${area_id}", "${address}",
      "${pincode}", "${phone}", "${shop_image}", "${opening_time}", "${closing_time}", "${active_state}")`;

    //  console.log(sql, "here");

    dbConfig.query(sql, function (err, rows, result) {
      if (err) throw err;
      console.log("Record Inserted Succesfully");
      console.log(req.body);
      res.send(rows);

    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


exports.shopsGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM shops", (err, rows, field) => {
    if (!err) {
      console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};


exports.changeStatus = (req, res) => {
  var shops_id = req.body.shops_id;
  var status = req.body.status;
  // console.log("body",req.body);

  var sql = `UPDATE shops SET status="${status}" WHERE shops_id ="${shops_id}";`;

  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("status updated Succesfully");
    console.log(req.body);
    res.send(rows);

  });
};
