// const dbConfig = require("../database/config");
// const isEmpty = require("lodash.isempty");

// exports.createRoomBooking = async (req, res) => {
//   try {
//     var rooBooking_id = req.body.rooBooking_id;
//     var id = req.body.id;

//     var fullName = req.body.fullName;
//     var contactNumber = req.body.contactNumber;
//     var email = req.body.email;
//     var address = req.body.address;
//     var gender = req.body.gender;
//     var emergencyContact = req.body.emergencyContact;
//     var numberOfTravels = req.body.numberOfTravels;
//     var numberOfRooms = req.body.numberOfRooms;
//     var country_id = req.body.country_id;
//     var state_id = req.body.state_id;
//     var district_id = req.body.district_id;
//     var city_id = req.body.city_id;
//     var area_id = req.body.area_id;
//     var medicalInfo = req.body.medicalInfo;
//     var checkIn_out = req.body.checkIn_out;

//     const sql = `
//       INSERT INTO room_Booking 
//       (rooBooking_id,id, fullName, contactNumber, email, address, gender, emergencyContact, numberOfTravels, numberOfRooms, country_id, state_id, district_id, city_id, area_id, medicalInfo, checkIn_out) 
//       VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const travelDatesJson = JSON.stringify(checkIn_out);

//     const values = [
//       rooBooking_id,
//       id,
//       fullName,
//       contactNumber,
//       email,
//       address,
//       gender,
//       emergencyContact,
//       numberOfTravels,
//       numberOfRooms,
//       country_id,
//       state_id,
//       district_id,
//       city_id,
//       area_id,
//       medicalInfo,
//       travelDatesJson,
//     ];

//     await new Promise((resolve, reject) => {
//       dbConfig.query(sql, values, (err, result) => {
//         if (err) {
//           console.error("Database error!", err);
//           return reject({ status: 500, message: "Error occurred" });
//         } else {
//           return resolve({
//             status: 200,
//             message: "Room booked successfully",
//             data: result,
//           });
//         }
//       });
//     })
//       .then((response) =>
//         res
//           .status(response.status)
//           .json({ message: response.message, data: response.data })
//       )
//       .catch((error) =>
//         res.status(error.status).json({ message: error.message })
//       );
//   } catch (error) {
//     console.error("Internal Server Error", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// exports.roomBookingGetAll = (req, res) => {
//   dbConfig.query("SELECT * FROM room_Booking", (err, rows, field) => {
//     if (!err) {
//       res.send(rows);
//     } else console.log(err);
//   });
// };

// exports.roomBookingGetAllbyid = (req, res) => {
//   const id = req.params.id;

//   const query = "SELECT * FROM room_Booking WHERE id = ?";

//   dbConfig.query(query, [id], (err, rows, fields) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res
//         .status(500)
//         .send("An error occurred while retrieving the booking.");
//     }

//     if (rows.length === 0) {
//       console.log("No booking found for ID:", id);
//       return res.status(404).send("Booking not found.");
//     }

//     res.send(rows);
//   });
// };
