const dbConfig = require("../database/config");

const yatraBooking = {};

yatraBooking.bookTrip = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        title,
        from_location,
        to_location,
        designation,
        days,
        dayslist,
        price,
        offerPrice,
        overview,
        whatIsIncluded,
        meetingPoint,
        endPoint,
        // mainImage and images will be processed separately
      } = req.body;

      let mainImage = "";
      let images = [];

      // Handle mainImage
      if (req.files && req.files.mainImage) {
        const mainImageObj = req.files.mainImage;
        const mainImagePath = "/public/yatra_main_images/";
        const mainImageName = mainImageObj.name;
        mainImage = mainImagePath + mainImageName;

        mainImageObj.mv("./public/yatra_main_images/" + mainImageName, function (err) {
          if (err) {
            console.log(err);
            return reject({ status: 500, message: "Main image upload error" });
          }
        });
      } else {
        console.log("No main image uploaded!");
      }

      // Handle images
      if (req.files && req.files.images) {
        const imagesObjs = req.files.images;
        const imagesPath = "/public/yatra_images/";
        images = imagesObjs.map(imgObj => {
          const imageName = imgObj.name;
          const imagePath = imagesPath + imageName;

          imgObj.mv("./public/yatra_images/" + imageName, function (err) {
            if (err) {
              console.log(err);
              return reject({ status: 500, message: "Images upload error" });
            }
          });

          return imagePath;
        });

        // Convert images array to JSON string
        images = JSON.stringify(images);
      } else {
        console.log("No images uploaded!");
        images = JSON.stringify([]); // Handle case with no images
      }

      const designationJson = JSON.stringify(designation);
      const dayslistJson = JSON.stringify(dayslist);

      const sql = `INSERT INTO yatra_booking (title, from_location, to_location, designation, days, dayslist, price, offerPrice, overview, what_is_included, meeting_point, end_point, mainImage, images) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        title,
        from_location,
        to_location,
        designationJson,
        days,
        dayslistJson,
        price,
        offerPrice,
        overview,
        whatIsIncluded,
        meetingPoint,
        endPoint,
        mainImage,
        images
      ];

      dbConfig.query(sql, values, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 500, message: "error occurred" });
        } else {
          return resolve({ status: 200, message: "trip booked successfully" });
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};


yatraBooking.getTrips = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM yatra_booking`;

      dbConfig.query(sql, (err, results) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 500, message: "error occurred" });
        } else {
          return resolve(results);
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

yatraBooking.getTripById = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM yatra_booking WHERE id = ?`;

      dbConfig.query(sql, [id], (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 500, message: "error occurred" });
        } else if (result.length === 0) {
          return reject({ status: 404, message: "Trip not found" });
        } else {
          return resolve(result[0]);
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

yatraBooking.getTripsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM yatra_booking WHERE userId = ?`;

      dbConfig.query(sql, [userId], (err, result) => {
        if (err) {
          console.log("Error:", err);
          return reject({ status: 500, message: "An error occurred" });
        } else if (result.length === 0) {
          return reject({
            status: 404,
            message: "No trips found for this user",
          });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      console.log(e);
      return reject({ status: 500, message: "Internal Server Error" });
    }
  });
};

module.exports = yatraBooking;
