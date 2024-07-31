const dbConfig = require("../database/config");
const fs = require("fs");

// Get All temple name and ID
exports.TempleNameID = (_req, res) => {
  dbConfig.query(
    "SELECT temple.id,temple.temple_name FROM temple",
    (err, rows, _field) => {
      if (!err) {
        // console.log(rows, "here");
        res.send(rows);
      } else console.log(err);
    }
  );
};

exports.TempleGetAddress = (req, _res) => {
  dbConfig.query(
    `SELECT * FROM temple WHERE  id = "${req.params.id}"`,
    (err, _rows, _fields) => {
      if (!err) console.log("Get..");
      else console.log(err);
    }
  );
};

//Temple list
exports.TempleGetAll = (_req, res) => {
  try {
    dbConfig.query(
      `SELECT  temple.id, temple.country_id,temple.created_date,temple.state_id, temple.district_id,temple.city_id, temple.temple_name, countries.country, districts.district,temple.bookingFields
       FROM temple
       INNER JOIN
       countries
       ON
       countries.id = temple.country_id
       INNER JOIN
       states
       ON
       states.id = temple.state_id
       INNER JOIN
       districts
       ON
       districts.id = temple.district_id
       INNER JOIN
       city
       ON
       city.id = temple.city_id;`,
      (err, rows, _fields) => {
        if (!err) {
          // console.log(rows, "line 28");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

//temple list
exports.TempleGetAllName = (req, res) => {
  try {
    var country_id = req.params.country_id;
    var state_id = req.params.state_id;
    var district_id = req.params.district_id;
    var city_id = req.params.city_id;

    dbConfig.query(
      `SELECT  temple.id, temple.temple_name FROM temple INNER JOIN countries ON countries.id = temple.country_id INNER JOIN states on states.id = temple.state_id INNER JOIN districts ON districts.id = temple.district_id INNER JOIN city ON city.id = temple.city_id  WHERE temple.country_id ="${country_id}" AND
      temple.state_id ="${state_id}" AND temple.district_id = "${district_id}" AND temple.city_id="${city_id}"`,
      (err, rows, _fields) => {
        if (!err) {
          // console.log(rows, "line 28");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.TempleGetAllBasedCity = (req, res) => {
  try {
    var city_id = req.params.city_id;

    dbConfig.query(
      `SELECT  temple.id, temple.temple_name FROM temple   WHERE  temple.city_id="${city_id}"`,
      (err, rows, _fields) => {
        if (!err) {
          // console.log(rows, "line 28");
          res.send(rows);
        } else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.RelatedTempleAll = (req, res) => {
  try {
    const grouptable_id = req.query.grouptable_id || 0;
    const speciality_id = req.query.speciality_id || 0;
    const city_id = req.query?.city_id;
    const id = req.query?.id;

    if (
      !grouptable_id &&
      (speciality_id == null ||
        speciality_id == 0 ||
        speciality_id == undefined) &&
      (id == null || id == undefined)
    )
      return res.json({ status: "Failed", speciality_id });

    let Query;
    let commonFields = `SELECT temple.id,
    temple.temple_name,
    temple.country_id,
    temple.state_id,
    countries.country as Countryname,
    temple.state_id,
    states.state as Statename,
    temple.district_id,
    districts.district as Districtname,
    temple.city_id,
    city.city as Cityname,
    main_god.god_name as MainGodName,
    temple.area_id,
    temple.main_god_id,
    temple.othergod_id,
    area.area_name as Areaname,
    temple.temple_address,
    temple.starTemple,
    temple.speciality_id,
    temple.grouptable_id,
    temple.starTemple,
    temple.tourist_id,
    temple.otherspec_id,
    temple.temple_history,
    temple.temple_year,
    temple.temple_amotime,
    temple.temple_amctime,
    temple.temple_pmotime,
    temple.temple_pmctime,
    temple.temple_prasadam,
    temple.temple_tree,
    temple.pariharam,
    temple.festival_ids,
    temple.start_date,
    temple.end_date,
    temple.training_ids,
    temple.incharge_name,
    temple.phone_number,
    temple.temple_mailid,
    temple.temple_website,
    temple.created_date,
    temple.created_by,
    temple.main_image,
    temple.sub_images,
    temple.main_video,
    temple.control_by,
    temple.temple_additional,
    temple.temple_bus_route,
    temple.ways_to_reach,
    temple.temple_map,
    temple.pooja_timings,
    temple.aminity,
    temple.functionsInsideTemple,
    temple.bookingFields
    FROM temple
    LEFT JOIN countries ON temple.country_id = countries.id
    LEFT JOIN states ON temple.state_id = states.id
    LEFT JOIN districts ON temple.district_id = districts.id
    LEFT JOIN city ON temple.city_id = city.id
    LEFT JOIN main_god ON temple.main_god_id = main_god.main_god_id
    LEFT JOIN area ON temple.city_id = area.area_id`;

    // console.log(
    //   `grouptable_id=${grouptable_id},speciality_id=${speciality_id},city_id=${city_id}`
    // );

    // if (grouptable_id && grouptable_id != 0) {
    //   Query = `${commonFields} WHERE temple.grouptable_id='${parseInt(grouptable_id)}'`;
    //   // console.log("GROUPTABLE QUERY ID", grouptable_id);
    // } else if (speciality_id && speciality_id != 0) {
    //   Query = `${commonFields} WHERE temple.speciality_id like "%${speciality_id}%";`;
    //   console.log("SPECIALITY QUERY ID", speciality_id);
    // } else {
    //   Query = `${commonFields} WHERE temple.city_id=${parseInt(city_id)}`;
    //   console.log("CITY ID QUERY", city_id);
    // }

    Query = `${commonFields} WHERE temple.grouptable_id='${parseInt(
      grouptable_id
    )}' OR temple.speciality_id like "%${speciality_id}%" OR temple.city_id='${parseInt(
      city_id
    )}'`;

    console.log("Query", Query);

    dbConfig.query(Query, (err, rows, _fields) => {
      if (!err) {
        const result = rows.filter((item) => item.id != id);
        res.json({ status: "Success", data: result });
      } else {
        res.json({ status: "Failed", err });
      }
    });
  } catch (error) {
    res.json(error);
  }
};

//Constant name get all
exports.TempleAllList = (req, res) => {
  var role = req.params.role;
  dbConfig.query(
    // `SELECT * FROM temple WHERE role="${role}" order by created_date DESC`,
    `SELECT * FROM temple`,
    (err, rows, _fields) => {
      if (!err) {
        return res.json(rows);
      }

      return res.json({ status: "Failed", err });
    }
  );
};

//Constant name get One
exports.TempleGetOne = (req, res) => {
  dbConfig.query(
    `SELECT temple.id, temple.user_id , temple.temple_name,temple.role, temple.country_id,temple.state_id,countries.country as Countryname,temple.state_id,states.state as Statename,temple.district_id,districts.district as Districtname,temple.city_id,city.city as Cityname,temple.area_id,temple.main_god_id,temple.othergod_id,area.area_name as Areaname,temple.temple_address,temple.speciality_id,temple.grouptable_id,temple.starTemple,temple.tourist_id,temple.otherspec_id,
    temple.temple_history,temple.temple_year,temple.starTemple,temple.temple_amotime,temple.temple_amctime,temple.temple_pmotime,temple.TempleLongitude,temple.TempleLatitude,
    temple.temple_pmctime,temple.temple_prasadam,temple.temple_tree,temple.pariharam,temple.festival_ids,
    temple.start_date,temple.end_date,temple.training_ids,temple.incharge_name,temple.phone_number,temple.temple_mailid,temple.temple_website,
    temple.created_date,temple.created_by,temple.is_active,
    temple.main_image,temple.sub_images,temple.main_video,temple.ticket_id,temple.marriage_fee,temple.ana_time,
    temple.control_by,temple.temple_additional,temple.isTicket,temple.isMarriage,temple.isAnnadhanam,
    temple.temple_bus_route,temple.ways_to_reach,temple.temple_map,temple.pooja_timings,temple.aminity,
    temple.templeApproveStatus,temple.templeRejectionReason,temple.functionsInsideTemple FROM temple
       LEFT JOIN countries ON temple.country_id=countries.id
       LEFT JOIN states ON temple.state_id=states.id
       LEFT JOIN districts ON temple.district_id=districts.id
       LEFT JOIN city ON temple.city_id=city.id
       LEFT JOIN area ON temple.area_id=area.area_id WHERE temple.id = ${req.params.id}`,
    (err, rows, _fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

//Constant name get One by user
exports.TempleGetAllByUser = (req, res) => {
  var sql = `SELECT * FROM temple WHERE user_id = ${req.params.user_id}`;
  if (req.params.status) {
    sql += ` and templeApproveStatus = ${req.params.status}`;
  }
  dbConfig.query(sql, (err, rows, _fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

//Temples Create Schema
exports.TempleCreate = (req, res) => {
  console.log(req.body);
  var starTemple = req.body.starTemple || 5;
  if (typeof starTemple === 'undefined') {
    console.error('starTemple is missing in the request body');
    res.status(400).send({ error: 'starTemple is required' });
    return;
  }
  // var starTemple = req.body.starTemple;
  // Ensure starTemple is not undefined
  
  var user_id = req.body.user_id || 0;
  var role = req.body.role || "admin";
  var temple_name = req.body.temple_name?.replace(/"/g, "'");
  var main_god_id = req.body.main_god_id;
  var othergod_id = req.body.othergod_id || "";
  var country_id = req.body.country_id;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city_id = req.body.city_id;
  var area_id = req.body.area_id;
  var pincode = req.body.pincode;
  var godGender = req.body.godGender;

  var youtubeUrl = req.body.youtubeUrl?.replace(/"/g, "'");
  // var temple_address = `${req.body.temple_address || ""}`;
  var grouptable_id = req.body.grouptable_id || 0;
  var speciality_id = req.body.speciality_id || 0;
  var tourist_id = req.body.tourist_id || 0;
  var godGender = req.body.godGender || 0;

  // var temple_history = `${req.body.temple_history || ""}`;
  var temple_year = req.body.temple_year || "";
  var ticket_id = req.body.ticket_id || "";
  var temple_amotime = req.body.temple_amotime || "";
  var temple_amctime = req.body.temple_amctime || "";
  var temple_pmotime = req.body.temple_pmotime || "";
  var temple_pmctime = req.body.temple_pmctime || "";
  // var temple_prasadam = `${req.body.temple_prasadam || ""}`;
  var temple_address = `${req.body?.temple_address?.replace(/"/g, "'") || ""}`;
  var temple_history = `${req.body?.temple_history?.replace(/"/g, "'")}`;
  var temple_prasadam = `${req.body?.temple_prasadam?.replace(/"/g, "'")}`;
  var temple_tree = `${req.body?.temple_tree?.replace(/"/g, "'")}`;

  // var temple_tree = req.body.temple_tree || null;
  var pariharam = req.body.pariharam || 0;
  var festival_ids = req.body.festival_ids || 0;
  var start_date = req.body.start_date || "";
  var end_date = req.body.end_date || "";
  var training_ids = req.body.training_ids || "";
  var incharge_name = req.body.incharge_name || "";
  var phone_number = req.body.phone_number || "";
  var temple_mailid = req.body.temple_mailid || "";
  var temple_website = req.body.temple_website || "";
  var TempleLatitude = req.body.Latitude || "";
  var TempleLongitude = req.body.Longitude || "";
  var created_by = req.body.created_by || 0;
  var is_active = req.body.is_active || 1;
  var functionsInsideTemple = req.body?.FunctionsInsideTemple || 0;
  var templeApproveStatus = req.body?.templeApproveStatus || 0;
  var templeRejectionReason = req.body?.templeRejectionReason || null;
   const parsedAmenities = JSON.parse(req.body.aminity)?.amenity;
  let bookingFields = req.body?.bookingFields?.replace(/"/g, "'");
  let poojaFields = req.body?.poojaFields?.replace(/"/g, "'");

  let aminity = JSON.stringify(parsedAmenities || {})?.replace(/"/g, "'");

  const isAnnadhanam = parsedAmenities.find(
    ({ AmenitiesId }) => AmenitiesId == 24
  )?.amenityStatus
    ? 1
    : 0;
  const isMarriage = parsedAmenities.find(
    ({ AmenitiesId }) => AmenitiesId == 26
  )?.amenityStatus
    ? 1
    : 0;
  const isTraining = parsedAmenities.find(
    ({ AmenitiesId }) => AmenitiesId == 25
  )?.amenityStatus
    ? 1
    : 0;
  const isHospital = parsedAmenities.find(
    ({ AmenitiesId }) => AmenitiesId == 27
  )?.amenityStatus
    ? 1
    : 0;

  var ana_time = req.body.ana_time;
  var main_video = req.body.main_video;
  var temple_additional =
    req.body?.temple_additional?.replace(/"/g, "'") || null;
  var control_by = req.body.control_by || null;
  let array1 = req.body.temple_bus_route?.replace(/"/g, "'");
  var temple_bus_route = array1 || null;
  var ways_to_reach = req.body?.ways_to_reach?.replace(/"/g, "'") || null;
  var temple_map = req.body.temple_map?.replace(/"/g, "'") || null;
  var pooja_timings = req.body.pooja_timings || null;
  // var aminity = req.body.aminity?.replace(/"/g, "'");

  if (req.files != undefined && req.files?.sub_images != undefined) {
    if (req.files["sub_images"]) {
      const listItems = [];
      if (req.files["sub_images"].length == 1) {
        listItems.push("/public/temple_images/" + req.files.sub_images.name);
        var filename = req.files["sub_images"]["name"];
        var mv = req.files["sub_images"]["mv"];
        mv("./public/temple_images/" + filename, function (err) {
          if (err) {
            console.log(err);
            return res.send("Error occurd!");
          }
        });
      } else {
        for (var i = 0; i < req.files["sub_images"].length; i++) {
          listItems.push(
            "/public/temple_images/" + req.files.sub_images[i].name
          );
          var filename = req.files["sub_images"][i]["name"];
          var mv = req.files["sub_images"][i]["mv"];
          mv("./public/temple_images/" + filename, function (err) {
            if (err) {
              console.log(err);
              return res.json({ status: "Failed", err });
            }
          });
        }
      }

      // before
      var sub_images = listItems;
    } else if (req.body.sub_images) {
      var sub_images = req.body.sub_images;
    } else {
      var sub_images = "";
    }
  } else if (req.body.sub_images) {
    var sub_images = req.body.sub_images;
  } else {
    var sub_images = "";
  }

  // Main Photo
  if (req.files != undefined && req.files?.main_image != undefined) {
    if (req.files["main_image"]) {
      const listItems = [];
      // before

      listItems.push("/public/temple_images/" + req.files.main_image.name);

      var filename = req.files["main_image"]["name"];
      var mv = req.files["main_image"]["mv"];
      mv("./public/temple_images/" + filename, function (err) {
        if (err) {
          console.log(err);
          return res.json({ status: "Failed", err });
        }
      });

      var main_image = listItems;
    } else if (req.body.main_image) {
      var main_image = req.body.main_image;
    } else {
      var main_image = "";
    }
  } else if (req.body.main_image) {
    var main_image = req.body?.main_image;
  } else if (req.files.main_image == null) {
    var main_image = "";
  }
  let videoFile = "";
  if (req.files != undefined) {
    if (req.files.videoFile != undefined) {
      var videoFileObj = req.files.videoFile;
      var path = "/public/temple_videos/";
      var temple_videoName = videoFileObj.name;
      videoFile = path + temple_videoName;
      console.log(videoFile, "video");
      videoFileObj.mv("./public/temple_videos/" + temple_videoName, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });
    } else {
      console.log("Please upload video !!!");
    }
  } else {
    console.log("Please upload video !!!");
  }

  try {
    var sql = `INSERT INTO temple(user_id,role,temple_name,main_god_id,othergod_id,country_id,state_id,district_id, area_id,city_id,pincode,godGender,temple_address,speciality_id, grouptable_id,starTemple,tourist_id,temple_history,temple_year,temple_amotime,temple_amctime,temple_pmotime,temple_pmctime,temple_prasadam,temple_tree,pariharam,festival_ids,start_date, end_date,training_ids,incharge_name,phone_number,temple_mailid,temple_website,TempleLatitude,TempleLongitude,created_by,is_active,main_image,sub_images,main_video,ana_time,ticket_id,isMarriage,isAnnadhanam,isTicket,temple_additional,marriage_fee,control_by,functionsInsideTemple,temple_bus_route, ways_to_reach,temple_map, pooja_timings, aminity,templeApproveStatus,templeRejectionReason,isTraining,isHospital,bookingFields,poojaFields,youtubeUrl,videoFile) 
    VALUES("${user_id}","${role}","${temple_name}","${main_god_id}","${othergod_id}","${country_id}","${state_id}","${district_id}","${area_id}","${city_id}","${pincode}","${godGender}","${temple_address}","${speciality_id}","${grouptable_id}","${starTemple}","${tourist_id}","${temple_history}","${temple_year}","${temple_amotime}","${temple_amctime}","${temple_pmotime}","${temple_pmctime}","${temple_prasadam}","${temple_tree}","${pariharam}","${festival_ids}","${start_date}","${end_date}","${training_ids}","${incharge_name}","${phone_number}","${temple_mailid}","${temple_website}","${TempleLatitude}",
    "${TempleLongitude}","${created_by}","${is_active}","${main_image}","${sub_images}","${main_video}","${ana_time}","${ticket_id}","${isMarriage}","${isAnnadhanam}","${0}","${temple_additional}","${0}","${control_by}","${functionsInsideTemple}","${temple_bus_route}","${ways_to_reach}","${temple_map}","${pooja_timings}", "${aminity}","${templeApproveStatus}","${templeRejectionReason}","${isTraining}","${isHospital}","${bookingFields}","${poojaFields}","${youtubeUrl}","${videoFile}")`;

    dbConfig.query(sql, function (err, rows, _result) {
      if (!err) {
        // const url = req.protocol + "://" + req.get("host");
        if (req.files?.main_image != undefined) {
          if (req.files.main_image) {
            var image_path =
              "/public/temple_images/" + req.files.main_image.name;
            var image_name = req.files.main_image.name;
          }
          // else if (req.body.main_image) {
          //   var image_path = "/public/temple_images/" + req.body.main_image;
          //   var image_name = req.body.main_image.name;
          //   console.log("main_image from req.body");
          // }
          else {
            var image_path = "";
            var image_name = "";
          }

          var temple_id = rows.insertId;
          var is_active = 1;
          var country_id = req.body.country_id;
          var state_id = req.body.state_id;
          var district_id = req.body.district_id;
          var city_id = req.body.city_id;
          var created_by = req.body.created_by;
          var sql2 = `INSERT INTO temple_images
            (temple_id,
            country_id,
            image_path,
            image_name,
            state_id,
            district_id,
            city_id,
            created_by,
            is_active)
            VALUES
            ("${temple_id}",
            "${country_id}",
            "${image_path}",
            "${image_name}",
            "${state_id}",
            "${district_id}",
            "${city_id}",
            "${created_by}",
            "${is_active}");`;
          dbConfig.query(sql2, (err, _rows, _fields) => {
            if (!err) {
              console.log("temple_image Inserted!");
            } else {
              console.log(err);
            }
          });
        }

        if (req.files?.sub_images != undefined && req.files["sub_images"]) {
          for (var i = 0; i < req.files["sub_images"].length; i++) {
            var image_path =
              "/public/temple_images/" + req.files.sub_images[i].name;
            var image_name = req.files.sub_images[i].name;

            var temple_id = rows.insertId;
            var image_name = req.files.sub_images[i].name;
            var is_active = 1;
            var country_id = req.body.country_id;
            var state_id = req.body.state_id;
            var district_id = req.body.district_id;
            var city_id = req.body.city_id;
            var created_by = req.body.created_by;
            var sql2 = `INSERT INTO temple_images
                (temple_id,
                  country_id,
                image_path,
                image_name,
                state_id,
                district_id,
                city_id,
                created_by,
                is_active)
                VALUES
                ("${temple_id}",
                "${country_id}",
                "${image_path}",
                "${image_name}",
                "${state_id}",
                "${district_id}",
                "${city_id}",
                "${created_by}",
                "${is_active}");`;
            dbConfig.query(sql2, (err, rows, _fields) => {
              if (!err) {
                return res.json({ status: "Success", rows });
              } else {
                console.log(err);
                return res.json({ status: "Failed", err });
              }
            });
            // }
            // else if (req.body.sub_images) {
            //   var image_path = req.body.sub_images;
            //   var image_name = req.body.sub_images[i].name;
            // }
            //  else {
            //   var image_path = "";
            //   var image_name = "";
            // }
          }
        }
        return res.json({ rows, status: "Success" });
      } else {
        return res.json({ status: "Failed", err });
      }
    });
  } catch (e) {
    return res.json({ status: "Failed", error: e });
  }
   console.log("Received data:", req.body);
};

//Update Temple
exports.updateTemple = (req, res) => {
  // Helper function to safely replace double quotes with single quotes
  const replaceQuotes = (str) => (str ? str.replace(/"/g, "'") : "");

  // Parsing and sanitizing input fields
  const temple_name = replaceQuotes(req.body.temple_name);
  const main_god_id = req.body.main_god_id;
  const othergod_id = req.body.othergod_id;
  const country_id = req.body.country_id;
  const state_id = req.body.state_id;
  const district_id = req.body.district_id;
  const city_id = req.body.city_id;
  const area_id = req.body.area_id;
  const temple_address = replaceQuotes(req.body.temple_address || "");
  const temple_history = replaceQuotes(req.body.temple_history);
  const temple_prasadam = replaceQuotes(req.body.temple_prasadam);
  const temple_tree = replaceQuotes(req.body.temple_tree);
  const pariharam = req.body.pariharam;
  const festival_ids = req.body.festival_ids;
  const temple_year = req.body.temple_year;
  const tourist_id = req.body.tourist_id;
  const starTemple = req.body.starTemple;
  const otherspec_id = req.body.otherspec_id;
  const temple_amotime = req.body.temple_amotime;
  const temple_amctime = req.body.temple_amctime;
  const temple_pmotime = req.body.temple_pmotime;
  const temple_pmctime = req.body.temple_pmctime;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const training_ids = req.body.training_ids;
  const incharge_name = replaceQuotes(req.body.incharge_name);
  const phone_number = req.body.phone_number;
  const temple_mailid = replaceQuotes(req.body.temple_mailid);
  const temple_website = replaceQuotes(req.body.temple_website);
  const TempleLatitude = replaceQuotes(req.body.Latitude);
  const TempleLongitude = replaceQuotes(req.body.Longitude);
  const created_by = req.body.created_by || 0;
  const is_active = req.body.is_active || 0;
  const parsedAmenities = JSON.parse(req.body.aminity)?.amenity || [];
  const functionsInsideTemple = req.body?.FunctionsInsideTemple || "";
  const grouptable_id = req.body.grouptable_id || 0;
  const speciality_id = req.body.speciality_id || 0;
  const aminity = JSON.stringify(parsedAmenities)?.replace(/"/g, "'");
  const bookingFields = replaceQuotes(req.body?.bookingFields);
  const poojaFields = replaceQuotes(req.body?.poojaFields);

  const isAnnadhanam = parsedAmenities.find(({ AmenitiesId }) => AmenitiesId == 24)?.amenityStatus ? 1 : 0;
  const isMarriage = parsedAmenities.find(({ AmenitiesId }) => AmenitiesId == 26)?.amenityStatus ? 1 : 0;
  const isTraining = parsedAmenities.find(({ AmenitiesId }) => AmenitiesId == 25)?.amenityStatus ? 1 : 0;
  const isHospital = parsedAmenities.find(({ AmenitiesId }) => AmenitiesId == 27)?.amenityStatus ? 1 : 0;

  const ana_time = req.body.ana_time;
  const main_video = req.body.main_video;
  const temple_additional = req.body.temple_additional;
  const control_by = req.body.control_by;
  const temple_bus_route = replaceQuotes(req.body.temple_bus_route);
  const ways_to_reach = req.body.ways_to_reach;
  const temple_map = replaceQuotes(req.body.temple_map);
  const pooja_timings = req.body.pooja_timings;

  console.log("**************UPDATE*************************");
  console.log(`Annadhanam: ${isAnnadhanam}, Marriage: ${isMarriage}, Training: ${isTraining}, Hospital: ${isHospital}`);
  console.log("******************UPDATE*********************");

  // Handle sub_images
  let sub_images = "";
  if (req.files && req.files.sub_images && req.files.sub_images.length) {
    sub_images = req.files.sub_images.map(file => "/public/temple_images/" + file.name);
    req.files.sub_images.forEach(file => {
      file.mv("./public/temple_images/" + file.name, err => {
        if (err) {
          return res.json({ status: "Failed", err });
        }
      });
    });
  } else if (req.body.sub_images) {
    sub_images = req.body.sub_images;
  }

  // Handle main_image
  let main_image = "";
  if (req.files && req.files.main_image) {
    main_image = "/public/temple_images/" + req.files.main_image.name;
    req.files.main_image.mv("./public/temple_images/" + req.files.main_image.name, err => {
      if (err) {
        return res.json({ status: "Failed", err });
      }
    });
  } else if (req.body.main_image) {
    main_image = req.body.main_image;
  }

  try {
    dbConfig.query(
      `UPDATE temple SET
        temple_name="${temple_name}",
        main_god_id="${main_god_id}",
        othergod_id="${othergod_id}",
        country_id="${country_id}",
        temple_address="${temple_address}",
        speciality_id="${speciality_id}",
        otherspec_id="${otherspec_id}",
        temple_history="${temple_history}",
        state_id="${state_id}",
        district_id="${district_id}",
        city_id="${city_id}",
        area_id="${area_id}",
        temple_year="${temple_year}",
        temple_amotime="${temple_amotime}",
        temple_amctime="${temple_amctime}",
        temple_pmotime="${temple_pmotime}",
        temple_pmctime="${temple_pmctime}",
        temple_tree="${temple_tree}",
        pariharam="${pariharam}",
        festival_ids="${festival_ids}",
        start_date="${start_date}",
        end_date="${end_date}",
        training_ids="${training_ids}",
        incharge_name="${incharge_name}",
        phone_number="${phone_number}",
        temple_mailid="${temple_mailid}",
        temple_website="${temple_website}",
        TempleLatitude="${TempleLatitude}",
        TempleLongitude="${TempleLongitude}",
        temple_prasadam="${temple_prasadam}",
        main_video="${main_video}",
        main_image="${main_image}",
        sub_images="${sub_images}",
        created_by="${created_by}",
        is_active="${is_active}",
        ana_time="${ana_time}",
        isAnnadhanam="${isAnnadhanam}",
        isMarriage="${isMarriage}",
        isTraining="${isTraining}",
        isHospital="${isHospital}",
        temple_additional="${temple_additional}",
        control_by="${control_by}",
        temple_bus_route="${temple_bus_route}",
        ways_to_reach="${ways_to_reach}",
        temple_map="${temple_map}",
        pooja_timings="${pooja_timings}",
        grouptable_id="${grouptable_id}",
        tourist_id="${tourist_id}",
        starTemple="${starTemple}",
        functionsInsideTemple="${functionsInsideTemple}",
        bookingFields="${bookingFields}",
        aminity="${aminity}",
        poojaFields="${poojaFields}"
      WHERE id="${req.params.id}";`,
      (err, _rows, _fields) => {
        if (err) {
          return res.json({ status: "Failed", err });
        }

        // Handle image insertion for main_image
        if (main_image) {
          const sql2 = `INSERT INTO temple_images (temple_id, image_path, image_name, state_id, district_id, city_id, created_by, is_active) VALUES ("${req.params.id}", "${main_image}", "${req.files?.main_image?.name || req.body.main_image}", "${state_id}", "${district_id}", "${city_id}", "${created_by}", "1");`;
          dbConfig.query(sql2, (err, _rows, _fields) => {
            if (err) {
              return res.json({ status: "Failed", err });
            }
          });
        }

        // Handle image insertion for sub_images
        if (sub_images && sub_images.length) {
          sub_images.forEach((imagePath, index) => {
            const image_name = req.files?.sub_images[index]?.name || req.body.sub_images[index];
            const sql2 = `INSERT INTO temple_images (temple_id, image_path, image_name, state_id, district_id, city_id, created_by, is_active) VALUES ("${req.params.id}", "${imagePath}", "${image_name}", "${state_id}", "${district_id}", "${city_id}", "${created_by}", "1");`;
            dbConfig.query(sql2, (err, _rows, _fields) => {
              if (err) {
                return res.json({ status: "Failed", err });
              }
            });
          });
        }

        res.json({ status: "Success" });
      }
    );
  } catch (e) {
    return res.json({ status: "Failed", error: e.message });
  }
};

// Temple images get
exports.TempleImagesget = (_req, res) => {
  dbConfig.query(`SELECT * FROM temple_images`, (err, rows, _fields) => {
    if (!err) {
      console.log(rows, "gettemple_imagesline 670");
      res.send(rows);
    } else console.log(err);
  });
};

// Temple images get one
exports.TempleImagesgetOne = (req, _res) => {
  dbConfig.query(
    `SELECT * FROM temple_images WHERE temple_id = "${req.params.id}"`,
    (err, _rows, _fields) => {
      if (!err) console.log("GetImageOne!..");
      else console.log(err);
    }
  );
};

exports.TempleImagesDelete = (req, _res) => {
  dbConfig.query(
    `DELETE FROM temple_images WHERE temple_id = "${req.params.id}";`,
    (err, _rows, _fields) => {
      if (!err) console.log("Deleted successfully!..");
      else console.log(err);
    }
  );
};
exports.TempleImagesByDelete = (req, _res) => {
  dbConfig.query(
    `DELETE FROM temple_images WHERE image_name = "${req.params.id}";`,
    (err, _rows, _fields) => {
      if (!err) console.log("Deleted successfully!..");
      else console.log(err);
    }
  );
};
// Delete
exports.TempleDelete = (req, res) => {
  dbConfig.query(
    `DELETE FROM temple WHERE id = ${req.params.id}`,
    (err, rows, _fields, _results) => {
      if (!err) {
        console.log("TempleRow Deleted successfully!.... Line-699");
        res.send(rows);
        //delete temple_images
        console.log(req.params.id, "line--703.......");
        dbConfig.query(
          `DELETE FROM temple_images WHERE temple_id = "${req.params.id}";`,
          (err, _rows, _fields) => {
            if (!err) console.log("Deleted successfully!..Line-706");
            else console.log(err);
          }
        );
      } else console.log(err);
    }
  );
};
//get temples based on city id
exports.templeGet = function (req, res) {
  try {
    dbConfig.query(
      `SELECT * FROM temple WHERE city_id = "${req.params.id}" `,
      (err, rows, _fields) => {
        if (err) console.log(err);
        else res.send(rows);
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.updateActive = (req, _res) => {
  dbConfig.query(
    `UPDATE temple SET is_active = 1 WHERE id = "${req.params.id}";`,
    (err, _rows, _fields) => {
      if (!err) console.log("Approved successfully!..");
      else console.log(err);
    }
  );
};
exports.updateStatus = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;
    var templeApproveStatus = req.body.templeApproveStatus;
    var reason = req.body.reason;

    try {
      var sql;
      if (templeApproveStatus == 2) {
        sql = `UPDATE temple SET templeApproveStatus = '${templeApproveStatus}', templeRejectionReason = '${reason}' where id  = '${id}' `;
      } else {
        sql = `UPDATE temple SET templeApproveStatus = '${templeApproveStatus}' where id  = '${id}' `;
      }

      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

// exports.RelatedTemple = (req, res) => {
//   // var cityid = req.params.cityid;
//   // var specid = req.params.specid;
//   var groupid = req.params.groupid;
//   console.log(groupid);
//   if(groupid){
//     const sql = `SELECT * FROM grouptable where id = '${groupid}'`;
//     dbConfig.query(sql, (err, rows, fields) => {
//         if (!err) console.log("Approved successfully!..");
//         else console.log(err);
//       }
//     );
//   }

//   // const sql = `SELECT * FROM `
//   // dbConfig.query(sql, (err, rows, fields) => {
//   //     if (!err) console.log("Approved successfully!..");
//   //     else console.log(err);
//   //   }
//   // );
// };

exports.templeStatusCount = async (req) => {
  return new Promise((resolve, reject) => {
    var id = req.params.id;

    try {
      var sqlforapprove = `select * FROM temple where role = 'user' and user_id = '${id}' and templeApproveStatus=1;select * FROM temple where role = 'user' and user_id = '${id}' and templeApproveStatus=2;select * FROM temple where role = 'user' and user_id = '${id}' and templeApproveStatus=0`;

      dbConfig.query(sqlforapprove, [1, 2, 3], (err, result) => {
        var approved = result[0].length;
        var rejected = result[1].length;
        var pending = result[2].length;
        var status = {
          approved: approved,
          rejected: rejected,
          pending: pending,
        };
        if (err) {
          return reject(err);
        } else {
          // return resolve({status:200,message:"updated successfully"});
          return resolve(status);
        }
      });

      // const sql = `UPDATE temple SET templeApproveStatus = '${status}' where user_id  = '${id}' `;

      //     dbConfig.query(sql, (err, result)=>{
      //         if(err){
      //             return reject(err);
      //         }
      //         else{
      //             return resolve({status:200,message:"updated successfully"});
      //             // return resolve(result);
      //         }
      //     });
    } catch (err) {
      return reject(err);
    }
  });
};

//Get temple based on inactive
exports.getTempleBasedOnUserINactive = (req, res) => {
  const userId = req.params.id;
  dbConfig.query(
    `SELECT * FROM temple WHERE user_id = ${userId} && templeApproveStatus = 1`,
    (err, rows, _field) => {
      if (!err) {
        // console.log(rows, "here");
        res.send(rows);
      } else console.log(err);
    }
  );
};

// Get User added Temples
exports.getTempleBasedOnUserID = (req, res) => {
  const userId = req.params.id;
  console.log("userId :>> ", userId);
  dbConfig.query(
    `SELECT * FROM temple WHERE user_id = ${userId}`,
    (err, rows, _field) => {
      if (!err) {
        // console.log(rows, "here");
        res.send(rows);
      } else console.log(err);
    }
  );
};

// //getApprove temple api

exports.getInActive = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `temple` WHERE `templeApproveStatus` = 1",
    (err, rows, _field) => {
      if (!err) {
        res.status(200).json({
          status: "Success",
          message: "Required Approved Temple is fetched ",
          results: rows,
        });
      } else {
        res.status(500).json({
          status: "Failed",
          message: "Something wrong happened ",
        });
      }
    }
  );
};

exports.getOnlyFamousTemple = (_req, res) => {
  dbConfig.query(
    "SELECT * FROM `temple` WHERE `showTemple` = 1",
    (err, rows, _field) => {
      if (!err) {
        res.status(200).json({
          status: "Success",
          message: "Famous Temple is fetched ",
          results: rows,
        });
      } else {
        res.status(500).json({
          status: "Failed",
          message: "Cannot fetch famous temple ",
        });
      }
    }
  );
};
