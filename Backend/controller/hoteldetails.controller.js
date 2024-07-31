const isEmpty = require("lodash.isempty");
const dbConfig = require("../database/config");



exports.create = (req, res) => {
	console.log(req.body, "body");

	if (isEmpty(req.body)) {
	 console.log("Fill the details");
	 return	res.send({message:"Bad Request !.."});
	}
	var array_temple_distance = req.body.temple_distance;
	var temple_distance = array_temple_distance.replace(/"/g, "'");
	var room_details = req.body.room_details.replace(/"/g, "'");
	var vendor_id = req.body.vendor_id;
	var wifi = req.body.wifi === 'true' ? 1 : 0;
	var television = req.body.television === 'true' ? 1 : 0;
	var beverages = req.body.beverages === 'true' ? 1 : 0;
	var freeparking = req.body.freeparking === 'true' ? 1 : 0;
	var telephone = req.body.telephone === 'true' ? 1 : 0;
	var hairdryer = req.body.hairdryer === 'true' ? 1 : 0;
	var gym = req.body.gym === 'true' ? 1 : 0;
	var petswelcome = req.body.petswelcome === 'true' ? 1 : 0;
	var swimmingpool = req.body.swimmingpool === 'true' ? 1 : 0;
	var breakfast = req.body.breakfast === 'true' ? 1 : 0;
	var vendor_name = req.body.vendor_name;
	var phone_number = req.body.phone_number;
	var business_name = req.body.business_name;
	var address = req.body.address;
	var country_id = req.body.country_id;
	var state_id = req.body.state_id;
	var district_id = req.body.district_id;
	var city_id = req.body.city_id;
	var area_id = req.body.area_id;


	// main Images uploading
	if (req.files != undefined) {
		if (req.files.main_image) {
			const listItems = [];
			listItems.push("/public/hotel_image/" + req.files.main_image.name);
			var filename = req.files["main_image"]["name"];
			var mv = req.files["main_image"]["mv"];
			mv("./public/hotel_image/" + filename, function(err) {
				if (err) {
					console.log(err);
					res.send("Error occurd!");
				}
			});
			var main_image = listItems;
		} else if (req.body.main_image) {
			var main_image = req.body.main_image;
		} else {
			var main_image = "";
		}
	} else if (req.body.main_image) {
		var main_image = req.body.main_image;
	} else {
		var main_image = "";
	}
	var hoteldetails_subimages = req.body.hoteldetails_subimages;

	// Sub images
	if (req.files != undefined) {
		if (req.files["hoteldetails_subimages"]) {
			const listItems = [];
			console.log(req.files["hoteldetails_subimages"].length, "length");
			if (req.files["hoteldetails_subimages"].length == 1) {
				listItems.push(
					"/public/hotel_image/" + req.files.hoteldetails_subimages.name
				);
				var filename = req.files["hoteldetails_subimages"]["name"];
				var mv = req.files["hoteldetails_subimages"]["mv"];
				mv("./public/hotel_image/" + filename, function(err) {
					if (err) {
						console.log("mv function sub-image NOT ok!!!!!!!!!");
						console.log(err);
						res.send("Error occurd!");
					}
				});
			} else {
				for (var i = 0; i < req.files["hoteldetails_subimages"].length; i++) {
					listItems.push(
						"/public/hotel_image/" + req.files.hoteldetails_subimages[i].name
					);
					var filename = req.files["hoteldetails_subimages"][i]["name"];
					var mv = req.files["hoteldetails_subimages"][i]["mv"];
					mv("./public/hotel_image/" + filename, function(err) {
						if (err) {
							console.log("mv function sub-image NOT ok!!!!!!!!!");
							console.log(err);
							res.send("Error occurd!");
						}
					});
				}
			}
			var hoteldetails_subimages = listItems;
		} else if (req.body.hoteldetails_subimages) {
			var hoteldetails_subimages = req.body.hoteldetails_subimages;
		} else {
			var hoteldetails_subimages = "";
		}
	} else if (req.body.hoteldetails_subimages) {
		var hoteldetails_subimages = req.body.hoteldetails_subimages;
	} else {
		var hoteldetails_subimages = "";
	}
	try {
		var sql = `INSERT INTO hoteldetails (temple_distance,room_details,wifi,television,
		beverages,freeparking,telephone,hairdryer,gym,petswelcome,swimmingpool,breakfast,main_image, vendor_id,
		vendor_name, phone_number, business_name, address, country_id, state_id, district_id, city_id, area_id
		)
        VALUES(
			"${temple_distance}",
			"${room_details}",
            "${wifi}",
            "${television}",
            "${beverages}",
            "${freeparking}",
            "${telephone}",
            "${hairdryer}",
            "${gym}",
            "${petswelcome}",
            "${swimmingpool}",
            "${breakfast}",
			"${main_image}",
			"${vendor_id}",
			"${vendor_name}",
			"${phone_number}",
			"${business_name}",
			"${address}",
			"${country_id}",
			"${state_id}",
			"${district_id}",
			"${city_id}",
			"${area_id}"
			)`;
			dbConfig.query(sql, function(err, rows, result) {
			if (!err) {
				res.send(rows);

				//Main image insert
				if (req.files.main_image != undefined) {
					if (req.files.main_image) {
						var image_path = "/public/hotel_image/" + req.files.main_image.name;
						var image_name = req.files.main_image.name;
					}
					else {
						var image_path = "";
						var image_name = "";
					}
					var hotel_details_id = rows.insertId;
					var sql2 = `INSERT INTO hoteldetails_subimages
									(hotel_details_id,
									image_path,
									image_name
									)
									VALUES
									("${hotel_details_id}",
									"${image_path}",
									"${image_name}"
									);`;
					dbConfig.query(sql2, (err, rows, fields) => {
						if (!err) {
							console.log("temple_image Inserted!");
						} else {
							console.log(err);
						}
					});
				}

				//Sub images insert
				if (req.files["sub_images"] != undefined) {
					for (var i = 0; i < req.files["sub_images"].length; i++) {
						var image_path =
							"/public/hotel_image/" + req.files.sub_images[i].name;
						var image_name = req.files.sub_images[i].name;
						var hotel_details_id = rows.insertId;

						var sql2 = `INSERT INTO hoteldetails_subimages
										(hotel_details_id,
										image_path,
										image_name
										)
										VALUES
										("${hotel_details_id}",
										"${image_path}",
										"${image_name}"
										);`;
						console.log(sql2);
						dbConfig.query(sql2, (err, rows, fields) => {
							if (!err) {
								console.log("Inserted!");
							} else {
								console.log(err);
							}
						});
					}
				}
			} else {
				console.log(err, "createrror");
			}
		});
	} catch (e) {
		throw e;
	}
};

exports.details_update = (req, res) => {
	var nearesttemplename = req.body.nearesttemplename;
	var distance = req.body.distance;
	var roomtype = req.body.roomtype;
	var roominfo = req.body.roominfo;
	var noofroom = req.body.noofroom;
	var amount = req.body.amount;
	var wifi = req.body.wifi;
	var television = req.body.television;
	var beverages = req.body.beverages;
	var freeparking = req.body.freeparking;
	var telephone = req.body.telephone;
	var hairdryer = req.body.hairdryer;
	var gym = req.body.gym;
	var petswelcome = req.body.petswelcome;
	var swimmingpool = req.body.swimmingpool;
	var breakfast = req.body.breakfast;
	var vendor_id = req.body.vendor_id;

	var sql = `UPDATE hoteldetails SET 	nearesttemplename = "${nearesttemplename}",
										distance = "${distance}",
										roomtype = "${roomtype}",
										roominfo = "${roominfo}",
										noofroom = "${noofroom}",
										amount  = "${amount}",
										wifi = "${wifi}",
										television = "${television}",
										beverages = "${beverages}",
										freeparking = "${freeparking}",
										telephone = "${telephone}",
										hairdryer = "${hairdryer}",
										gym = "${gym}",
										petswelcome = "${petswelcome}",
										swimmingpool = "${swimmingpool}",
										breakfast = "${breakfast}",
										vendor_id = "${vendor_id}"
        WHERE id="${req.params.id}" `;
	dbConfig.query(sql, function(err, row, result) {
		if (err) throw err;
		res.send(row);
	});
};

exports.details_delete = (req, res) => {
	dbConfig.query(
		`DELETE FROM hoteldetails WHERE id= ${req.params.id}`,
		(err, row, fields) => {
			if (!err) res.send(row);
			else console.log(err);
		}
	);
};

exports.detailsGetOne = (req, res) => {
	dbConfig.query(
		`SELECT * FROM hoteldetails WHERE id = ${req.params.id}`,
		(err, row, fields) => {
			if (!err) res.send(row);
			else console.log(err);
		}
	);
};

exports.detailsGetAll = (req, res) => {
	// console.log(req.params.id, "id")
	dbConfig.query(
		`SELECT *, hoteldetails.id as hotel_id,
		    countries.country, states.state, districts.district, city.city,
			area.area_name
			FROM hoteldetails
			INNER JOIN
			countries
			ON
			hoteldetails.country_id = countries.id
			INNER JOIN
			states
			ON
			hoteldetails.state_id = states.id
			INNER JOIN
			districts
			ON
			hoteldetails.district_id = districts.id
			INNER JOIN
			city
			ON
			hoteldetails.city_id = city.id
			INNER JOIN
			area
			ON
			hoteldetails.area_id = area.area_id
			ORDER BY hoteldetails.created_date DESC;`,
		(err, row, field) => {
			if (!err) {
				res.send(row);
			} else console.log(err);
		}
	);
};

exports.hotelGet = function(req, res) {
	try {
		dbConfig.query(
			`SELECT temple_distance, id FROM hoteldetails`,
			(err, rows, fields) => {
				if (err) console.log(err);
				else console.log(rows);
				var temp_id = [];
				for (var i = 0; i < rows.length; i++) {
					let array = rows[i].temple_distance.replace(/'/g, '"');
					// console.log(array, "array");
					// console.log(JSON.parse(array)[0].temple_id, parseInt(req.params.id), "temp id");
					for(var j =0; j < JSON.parse(array).length; j++){
						if(JSON.parse(array)[j].temple_id === parseInt(req.params.id)){
							temp_id.push(rows[i].id);
						}
					}
				}
				dbConfig.query(
					`SELECT
						 *, hoteldetails.id as hotel_id,
					    countries.country, states.state, districts.district, city.city,
						area.area_name
						FROM hoteldetails
						INNER JOIN
						countries
						ON
						hoteldetails.country_id = countries.id
						INNER JOIN
						states
						ON
						hoteldetails.state_id = states.id
						INNER JOIN
						districts
						ON
						hoteldetails.district_id = districts.id
						INNER JOIN
						city
						ON
						hoteldetails.city_id = city.id
						INNER JOIN
						area
						ON
						hoteldetails.area_id = area.area_id
						WHERE hoteldetails.id  in (${temp_id})
						ORDER BY hoteldetails.created_date DESC`,
					(err, rows, fields) => {
						res.json(rows);
					})
			}
		);
	} catch (e) {
		throw e;
	}
};
