exports.TempleCreate = (req, res) => {
    var user_id = req.body.user_id || 0;
    var role = req.body.role || "admin";
    var temple_name = req.body.temple_name;
    var main_god_id = req.body.main_god_id;
    var othergod_id = req.body.othergod_id || "";
    var country_id = req.body.country_id;
    var state_id = req.body.state_id;
    var district_id = req.body.district_id;
    var city_id = req.body.city_id;
    var area_id = req.body.area_id;
    var temple_address = req.body.temple_address || "";
    var grouptable_id = req.body?.grouptable_id || 0;
    var speciality_id = req.body?.speciality_id || 0;
    var temple_history = req.body.temple_history || null;
    var temple_year = req.body.temple_year || "";
    var ticket_id = req.body.ticket_id || "";
    var temple_amotime = req.body.temple_amotime || "";
    var temple_amctime = req.body.temple_amctime || "";
    var temple_pmotime = req.body.temple_pmotime || "";
    var temple_pmctime = req.body.temple_pmctime || "";
    var temple_prasadam = req.body.temple_prasadam || null;
    var temple_tree = req.body.temple_tree || null;
    var pariharam = req.body.pariharam || 0;
    var festival_ids = req.body.festival_ids || 0;
    var start_date = req.body.start_date || "";
    var end_date = req.body.end_date || "";
    var training_ids = req.body.training_ids || "";
    var incharge_name = req.body.incharge_name || "";
    var phone_number = req.body.phone_number || "";
    var temple_mailid = req.body.temple_mailid || "";
    var temple_website = req.body.temple_website || "";
    var created_by = req.body.created_by || 0;
    var is_active = req.body.is_active || 1;
    var functionsInsideTemple = req.body?.FunctionsInsideTemple || 0;
    var templeApproveStatus = req.body?.templeApproveStatus || 0;
    var templeRejectionReason = req.body?.templeRejectionReason || null;
    const parsedAmenities = JSON.parse(req.body.aminity)?.amenity;
    let bookingFields = req.body?.bookingFields?.replace(/"/g, "'");

    let aminity = JSON.stringify(parsedAmenities || {})?.replace(/"/g, "'");

    // console.log("parsed ameniies", parsedAmenities);
    console.log("Amintit", aminity, typeof aminity);

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

    console.log("******************SAVE*********************");
    console.log(
        `Anndanam:- ${typeof parsedAmenities.find(
            ({ AmenitiesId }) => AmenitiesId == 24
        )
            .isMandatory},Marriage ${isMarriage}, Training :- ${isTraining}, Hospital :-${isHospital}`
    );
    console.log("******************SAVE*********************");

    var ana_time = req.body.ana_time;
    var main_video = req.body.main_video;
    var temple_additional = req.body.temple_additional || null;
    var control_by = req.body.control_by || null;
    let array1 = req.body.temple_bus_route?.replace(/"/g, "'");
    var temple_bus_route = array1 || null;
    var ways_to_reach = req.body?.ways_to_reach || null;
    var temple_map = req.body.temple_map?.replace(/"/g, "'") || null;
    var pooja_timings = req.body.pooja_timings || null;
    // var aminity = req.body.aminity?.replace(/"/g, "'");

    if (req.files != undefined && req.files?.sub_images != undefined) {
        if (req.files["sub_images"]) {
            const listItems = [];
            console.log(req.files["sub_images"].length, "length");
            if (req.files["sub_images"].length == 1) {
                listItems.push("/public/temple_images/" + req.files.sub_images.name);
                var filename = req.files["sub_images"]["name"];
                var mv = req.files["sub_images"]["mv"];
                mv("./public/temple_images/" + filename, function (err) {
                    if (err) {
                        console.log("mv function sub-image NOT ok!!!!!!!!!");
                        console.log(err);
                        res.send("Error occurd!");
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
                            console.log("mv function sub-image NOT ok!!!!!!!!!");
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
                    console.log("mv function mainimage NOT ok!!!!!!!!!");
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

    try {
        var sql = `INSERT INTO temple
      ( user_id,role,temple_name,main_god_id,othergod_id,country_id,state_id,district_id,city_id, area_id,temple_address,speciality_id,
        temple_history,temple_year,temple_amotime,temple_amctime,temple_pmotime,temple_pmctime,temple_prasadam,temple_tree,pariharam,
        festival_ids,start_date, end_date,training_ids,incharge_name,phone_number,temple_mailid,
        temple_website,created_by,is_active,main_image,sub_images,main_video,ana_time,
        ticket_id,isMarriage,isAnnadhanam,isTicket,temple_additional,marriage_fee,control_by,functionsInsideTemple,
        temple_bus_route, ways_to_reach,temple_map, pooja_timings, grouptable_id, aminity,templeApproveStatus,templeRejectionReason,isTraining,isHospital,bookingFields) VALUES
        ("${user_id}","${role}","${temple_name}", "${main_god_id}", "${othergod_id}", "${country_id}", "${state_id}", "${district_id}", "${city_id}", "${area_id}",
        "${temple_address}", "${speciality_id}", "${temple_history}", "${temple_year}",
        "${temple_amotime}","${temple_amctime}","${temple_pmotime}","${temple_pmctime}","${temple_prasadam}","${temple_tree}",
         "${pariharam}", "${festival_ids}", "${start_date}", "${end_date}", "${training_ids}", "${incharge_name}",
        "${phone_number}", "${temple_mailid}", "${temple_website}","${created_by}",
        "${is_active}","${main_image}","${sub_images}","${main_video}","${ana_time}",
       "${ticket_id}","${isMarriage}","${isAnnadhanam}","${0}","${temple_additional}","${0}","${control_by}","${functionsInsideTemple}",
       "${temple_bus_route}", "${ways_to_reach}", "${temple_map}", "${pooja_timings}",
       "${grouptable_id}", "${aminity}","${templeApproveStatus}","${templeRejectionReason}","${isTraining}","${isHospital}","${bookingFields}")`;

        dbConfig.query(sql, function (err, rows, result) {
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
                    console.log(sql2);
                    dbConfig.query(sql2, (err, rows, fields) => {
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
                        console.log(sql2);
                        dbConfig.query(sql2, (err, rows, fields) => {
                            if (!err) {
                                console.log("Inserted!");
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
                res.json({ rows, status: "Success" });
            } else {
                console.error("Error", err);
                res.json({ status: "Failed", err });
            }
        });
    } catch (e) {
        console.log("Error", e);
        res.json({ status: "Failed", error: e });
    }
};
