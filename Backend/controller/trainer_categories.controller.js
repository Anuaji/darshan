const dbConfig = require("../database/config");

const create = async (req, res) => {
  try {
    let result;
    const listItems = [];
    let filename;
    let mv;
    let businessPhoto;

    const trainer_id = req.body.trainerId;
    const companyName = req.body.companyName;
    const description = req.body.description;
    const categories = req.body.categories;
    const subCategories = req.body.subCategories;
    const emailId = req.body.emailId;
    const websiteLink = req.body.websiteLink;
    const regularPrice = req.body.regularPrice;
    const discountPrice = req.body.discountPrice;
    const country = req.body.country;
    const state = req.body.state;
    const district = req.body.district;
    const city = req.body.city;
    const area = req.body.area;
    const tags = req.body.tags;
    const address = req.body.address;
    var array_temple_distance = req.body.templedistance;
    const templeDistance = array_temple_distance.replace(/"/g, "'");

    if (req.files === undefined) {
      res.status(400).send("Please Upload a photo");
    } else if (req.files !== undefined) {
      if (req.files["businessPhoto"]) {
        filename = Date.now() + "-" + req.files["businessPhoto"]["name"];
        mv = req.files["businessPhoto"]["mv"];
        listItems.push("/public/trainerCategoriesImages/" + filename);
        mv("./public/trainerCategoriesImages/" + filename, err => {
          if (err) res.status(500).send(err);
        });
        businessPhoto = listItems;
      } else if (req.body.businessPhoto) {
        businessPhoto = req.body.businessPhoto;
      } else {
        businessPhoto = "";
      }
    } else if (req.body.businessPhoto) {
      businessPhoto = req.body.businessPhoto;
    } else {
      businessPhoto = "";
    }

    const sql = `INSERT INTO trainer_categories (trainer_id,CompanyName,Description,Categories,SubCategories,
    EmailId,WebsiteLink,RegularPrice,DiscountPrice,Country,State,District,
    City,Area,address,Tags,businessPhoto,TempleDistance) VALUES("${trainer_id}","${companyName}","${description}","${categories}","${subCategories}","${emailId}",
      "${websiteLink}","${regularPrice}","${discountPrice}","${country}","${state}","${district}",
      "${city}","${area}","${address}","${tags}","${businessPhoto}","${templeDistance}")`;
    console.log("sql", sql);
    dbConfig.query(sql, function (err, rows) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(rows);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
const getSingleTrainerCategories = async req => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `SELECT trainer_categories.id,trainer_categories.trainer_id,trainer_categories.CompanyName,
          trainer_categories.Categories,trainer_categories.Description,trainer_categories.SubCategories,
          trainer_categories.EmailId,trainer_categories.WebsiteLink,trainer_categories.RegularPrice,
          trainer_categories.DiscountPrice,trainer_categories.Country,countries.country as CountryName,
          trainer_categories.State,states.state as StateName,trainer_categories.District,districts.district as DistrictName,
          trainer_categories.City,city.city as CityName,trainer_categories.area,area.area_name as AreaName,
          trainer_categories.address,trainer_categories.Tags,trainer_categories.businessPhoto,
          trainer_categories.TempleDistance 
          FROM
          trainer_categories
          LEFT JOIN countries ON trainer_categories.Country = countries.id
          LEFT JOIN states ON trainer_categories.State = states.id
          LEFT JOIN districts ON trainer_categories.District = districts.id
          LEFT JOIN city on trainer_categories.City = city.id 
          LEFT JOIN area ON trainer_categories.area = area.area_id WHERE trainer_categories.id  = "${id}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const getallTrainerCategories = async req => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM trainer_categories`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const deleteTrainerCategories = async req => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.id;
      const sql = `DELETE FROM trainer_categories WHERE id = "${id}"`;
      dbConfig.query(sql, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(reject);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  create,
  getallTrainerCategories,
  deleteTrainerCategories,
  getSingleTrainerCategories,
};
