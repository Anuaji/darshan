const dbConfig = require("../database/config");
const isEmpty = require("lodash.isempty");

exports.createYatraBooking = async (req, res) => {
  try {
    var yatra_id = req.body.yatra_id;
    var id = req.body.id;

    var fullName = req.body.fullName;
    var contactNumber = req.body.contactNumber;
    var email = req.body.email;
    var address = req.body.address;
    var dateOfBirth = req.body.dateOfBirth;
    var gender = req.body.gender;
    var emergencyContact = req.body.emergencyContact;
    var travelDates = req.body.travelDates;
    var mealPreference = req.body.mealPreference;
    var specialRequirement = req.body.specialRequirement;
    var numberOfTravels = req.body.numberOfTravels;

    const sql = `
      INSERT INTO yatra 
      (yatra_id,id, fullName, contactNumber, email, address, dateOfBirth, gender, emergencyContact, travelDates, mealPreference, specialRequirement, numberOfTravels) 
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const travelDatesJson = JSON.stringify(travelDates);

    const values = [yatra_id,id, fullName, contactNumber, email, address, dateOfBirth, gender, emergencyContact, travelDatesJson, mealPreference, specialRequirement, numberOfTravels];
console.log('step1', values)
    await new Promise((resolve, reject) => {
      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.error("Database error!", err);
          return reject({ status: 500, message: "Error occurred" });
        } else {
          return resolve({ status: 200, message: "Yatra booked successfully", data: result });
        }
      });
    })
    .then(response => res.status(response.status).json({ message: response.message, data: response.data }))
    .catch(error => res.status(error.status).json({ message: error.message }));

  } catch (error) {
    console.error("Internal Server Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.yatraGetAll = (req, res) => {
  dbConfig.query("SELECT * FROM yatra", (err, rows, field) => {
    if (!err) {
      res.send(rows);
    } else console.log(err);
  });
};


exports.yatraBookingGetAllbyid = (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM yatra WHERE id = ?';

  dbConfig.query(query, [id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('An error occurred while retrieving the booking.');
    }

    if (rows.length === 0) {
      console.log('No booking found for ID:', id);
      return res.status(404).send('Booking not found.');
    }

    res.send(rows);
  });
};
