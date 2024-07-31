const dbConfig = require("../database/config");

//temple get all
exports.templeGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM temple_event", (err, rows, field) => {
    if (!err) {
      // console.log(rows, "here");
      res.send(rows);
    } else console.log(err);
  });
};

//temple name get One
exports.templeGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM temple_event WHERE temple_eventid = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Temple Create Schema
exports.templeCreate = (req, res) => {
  var event_name = req.body.event_name;
  var event_startdate = req.body.event_startdate;
  var event_enddate = req.body.event_enddate;
  var event_timing = req.body.event_timing;
  var description = req.body.description;
  var registration = req.body.registration;
  var temple_name = req.body.temple_name;
  var temple_country = req.body.temple_country;
  var temple_state = req.body.temple_state;
  var temple_district = req.body.temple_district;
  var temple_city = req.body.temple_city;
  var contact_details = req.body.contact_details;
  var event_tag = req.body.event_tag;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;
  var address = req.body.address;
  var event_type = req.body.event_type;
  var category = req.body.categories_name;
  var price = req.body?.price;

  // Main images
  if (req.files != undefined) {
    if (req.files["event_image"]) {
      const listItems = [];
      // before

      listItems.push("/public/event_images/" + req.files.event_image.name);

      var filename = req.files["event_image"]["name"];
      var mv = req.files["event_image"]["mv"];
      mv("./public/event_images/" + filename, function (err) {
        if (err) {
          console.log(err);
          res.send("Error occurd!");
        }
      });

      var event_image = listItems;
    } else if (req.body.event_image) {
      var event_image = req.body.event_image;
    } else {
      var event_image = "";
    }
  } else if (req.body.event_image) {
    var event_image = req.body.event_image;
  } else {
    var event_image = "";
  }

  var sql = `INSERT INTO temple_event
    ( event_name, event_startdate, event_enddate, event_timing,description,registration,temple_name,temple_country,temple_state,temple_district,
        temple_city,contact_details,event_image,address,event_tag,event_type,created_by, is_active,category,price) VALUES
      ("${event_name}", "${event_startdate}", "${event_enddate}", "${event_timing}","${description}",
      "${registration}","${temple_name}", "${temple_country}","${temple_state}","${temple_district}","${temple_city}", "${contact_details}",
      "${event_image}","${address}","${event_tag}","${event_type}","${created_by}", "${is_active}", "${category}","${price}")`;
  console.log(sql, "here");
  dbConfig.query(sql, function (err, rows, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(rows);
    }
  });
};

//Temple  update
exports.templeUpdate = (req, res) => {
  var id = req.params.id;
  var event_name = req.body.event_name;
  var event_startdate = req.body.event_startdate;
  var event_enddate = req.body.event_enddate;
  var event_timing = req.body.event_timing;
  var description = req.body.description;
  var registration = req.body.registration;
  var temple_name = req.body.temple_name;
  var temple_country = req.body.temple_country;
  var temple_state = req.body.temple_state;
  var temple_district = req.body.temple_district;
  var temple_city = req.body.temple_city;
  var contact_details = req.body.contact_details;
  var created_by = req.body.created_by;
  var is_active = req.body.is_active;
  var address = req.body.address;
  var event_tag = req.body.event_tag;
  var event_type = req.body.event_type;
  var category = req.body.categories_name;

  // Main images
  if (req.files != undefined) {
    if (req.files["event_image"]) {
      const listItems = [];
      // before

      listItems.push("/public/event_images/" + req.files.event_image.name);

      var filename = req.files["event_image"]["name"];
      var mv = req.files["event_image"]["mv"];
      mv("./public/event_images/" + filename, function (err) {
        if (err) {
          console.log(err);
          res.send("Error occurd!");
        }
      });

      var event_image = listItems;
    } else if (req.body.event_image) {
      var event_image = req.body.event_image;
    } else {
      var event_image = "";
    }
  } else if (req.body.event_image) {
    var event_image = req.body.event_image;
  } else {
    var event_image = "";
  }

  var sql = `UPDATE temple_event SET event_name="${event_name}",
       event_startdate="${event_startdate}",
       event_enddate="${event_enddate}",
       event_timing="${event_timing}",
       description="${description}",
       registration="${registration}",
       temple_name="${temple_name}",
       temple_country="${temple_country}",
       temple_state="${temple_state}",
       temple_district="${temple_district}",
       temple_city="${temple_city}",
       contact_details="${contact_details}",
       event_image="${event_image}",
       address="${address}",
       event_tag="${event_tag}",
       event_type="${event_type}",
       category = "${category}",
       created_by ="${created_by}",
       is_active ="${is_active}"
   WHERE temple_eventid="${id}" `;
  dbConfig.query(sql, function (err, rows, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(rows);
    }
  });
};

//Temple name Delete
exports.templeDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM temple_event WHERE temple_eventid = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      }
      else {
        console.log(err);
      }
    }
  );
};

// get all Temple Values
exports.EventGetAll = (req, res) => {
  try {
    dbConfig.query(
      `SELECT temple_event.*,countries.country, districts.district, states.state, city.city FROM temple_event 
      
      INNER JOIN
      districts
      ON districts.id = temple_district
      INNER JOIN
      states 
      ON states.id = temple_state
      INNER JOIN
      city 
      ON city.id = temple_city
      INNER JOIN
      countries
      ON 
      temple_country = countries.id
      ORDER BY temple_eventid DESC;`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

// get One details Temple Values
exports.EventGetOne = (req, res) => {
  try {
    dbConfig.query(
      `SELECT temple_event.temple_eventid,temple_event.event_name,
      temple_event.event_startdate,temple_event.event_enddate,temple_event.address,temple_event.description,temple_event.temple_city,
      city.city as cityName,temple_event.price,temple_event.temple_country,countries.country as CountryName,
      temple_event.temple_state,states.state as StateName,temple_event.temple_district,
      districts.district as DistrictName,temple_event.event_image FROM temple_event
       LEFT JOIN countries on temple_event.temple_country =countries.id 
       LEFT JOIN states on temple_event.temple_state = states.id
        LEFT JOIN districts on temple_event.temple_district = districts.id 
        LEFT JOIN city on temple_event.temple_city = city.id WHERE temple_event.temple_eventid = ${req.params.id}`,
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//temple name get One Type Search
exports.templeTypeOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM temple_event WHERE event_type = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};
