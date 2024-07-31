const dbConfig = require("../database/config");

exports.createVendorBusiness = (req, res) => {
  try {
    var temple_id = req.body.temple_id;
    var hotel_name = req.body.hotel_name;
    var room_types = req.body.room_types;
    var total_rooms = req.body.total_rooms;
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
      if (req.files["hotel_image"]) {
        const listItems = [];
        // before

        listItems.push("/public/hotel_image/" + req.files.hotel_image.name);

        var filename = req.files["hotel_image"]["name"];
        var mv = req.files["hotel_image"]["mv"];
        mv("./public/hotel_image/" + filename, function (err) {
          if (err) {
            console.log(err);
            res.send("Error occurd!");
          }
        });

        var hotel_image = listItems;
      } else if (req.body.hotel_image) {
        var hotel_image = req.body.hotel_image;
      } else {
        var hotel_image = "";
      }
    } else if (req.body.hotel_image) {
      var hotel_image = req.body.hotel_image;
    } else {
      var hotel_image = "";
    }

    var sql = `INSERT INTO vendor_business
     (temple_id, hotel_name, room_types, total_rooms, country_id, state_id, district_id, city_id, area_id, address,pincode,phone,hotel_image,opening_time,closing_time,active_state) VALUES
     ("${temple_id}","${hotel_name}", "${room_types}", "${total_rooms}", "${country_id}", "${state_id}","${district_id}", "${city_id}", "${area_id}", "${address}",
      "${pincode}", "${phone}", "${hotel_image}", "${opening_time}", "${closing_time}", "${active_state}")`;

    // console.log(sql, "here");

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

exports.hotelGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM vendor_business", (err, rows, field) => {
    if (!err) {
      // console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

exports.changeStatus = (req, res) => {
  var business_id = req.body.business_id;
  var status = req.body.status;

  var sql = `UPDATE vendor_business SET status="${status}" WHERE business_id="${business_id}";`;

  dbConfig.query(sql, function (err, rows, result) {
    if (err) throw err;
    console.log("status updated Succesfully");
    console.log(req.body);
    res.send(rows);
  });
};
