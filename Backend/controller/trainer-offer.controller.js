const dbConfig = require('../database/config');

const create = async (req, res) => {
  let result;
  try {
    const trainer_id = req.body.trainer_id;
    const promoCode = req.body.promoCode;
    const category = req.body.category;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;

    // Main images
    if (req.files != undefined) {
      if (req.files["traineroffer_image"]) {
        const listItems = [];
        // before

        listItems.push("/public/trainerOffer/" + req.files.traineroffer_image.name);

        var filename = req.files["traineroffer_image"]["name"];
        var move = req.files["traineroffer_image"]["mv"];
        move("./public/trainerOffer" + Date.now() + "--" + filename, function (err) {
          if (err) {
            console.log(err);
            res.send("Error occurd!");
          }
        });

        var traineroffer_image = listItems;
      } else {
        var traineroffer_image = "";
      }
    } else {
      var traineroffer_image = "";
    }



    const sql = `INSERT INTO trainer_offer(trainer_id,photo,PromoCode,Category,StartDate,EndDate,Description)
    VALUES ("${trainer_id}","${traineroffer_image}","${promoCode}","${category}","${startDate}","${endDate}","${description}")`;
    // console.log(sql, "here");
    result = await dbConfig.query(sql, (err, result) => {
      if (!err) {
        res.status(201).send(result);
      }

      else {
        console.log(err);
      }

    });

  }
  catch (err) {
    if (err) console.log("Error!", err);
  }
};

const gettraineerOffer = async (req) => {
  return new Promise((resolve, reject) => {
    try {

      const sql = `SELECT * FROM trainer_offer;`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        }
        else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};





module.exports = { create, gettraineerOffer };
