const dbConfig = require("../database/config");




const create = async (req, res) => {
  console.log(req.body,'xxxx')
    const vendor_id = req.body.x;
    const promoCode = req.body.promoCode;
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const startDate = req.body.startDate || "";
    const endDate = req.body.endDate || "";
    const description = req.body.description;

    console.log(req.files,"kjhhkjhkjh")
    // Offer images
    if (req.files != undefined) {
      if (req.files.Photo != undefined) {
        var offerfile = req.files.Photo;
        var path = "/public/offer_image/";
        var offer_imageName = offerfile.name;
        var Photo = path + offer_imageName;
        console.log(req.files, "files");
        offerfile.mv("./public/offer_image/" + offer_imageName, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      console.log("Please Upload Image !!!");
    }
  
    const sql = `INSERT INTO offer(PromoCode,Category,StartDate,EndDate,Description,Subcategory,vendor_id,photo)
    VALUES ("${promoCode}","${category}",
    "${startDate}","${endDate}","${description}","${subcategory}","${vendor_id}","${Photo}")`;   
    // const sql = `INSERT INTO offer(vendor_id,PromoCode,Category,Subcategory,StartDate,EndDate,Description)
    // VALUES ("${vendor_id}","${promoCode}","${category}","${subcategory}"
    // "${startDate}","${endDate}","${description}")`;
    console.log(sql, "here");
    try{
    result =  dbConfig.query(sql, (err,result ) => {
      if (!err) {
        res.status(201).send(result);
      } else {
        console.log(err,'ddddddddddd');
      }
    });
  } catch (err) {
    if (err) console.log("Error!", err);
  }
};


const updateOffer = async (req, res) => {
  try {
    const id = req.params.id; 

    const sanitizedId = parseInt(id, 10);
    if (isNaN(sanitizedId)) {
      return res.status(400).json({ error: "Invalid id parameter" });
    }

  const promoCode = req.body.promoCode;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const startDate = req.body.startDate || "";
  const endDate = req.body.endDate || "";
  const description = req.body.description;


    // Offer images
    let photo = "";
    if (req.files !== undefined && req.files.offer_image !== undefined) {
      const offerfile = req.files.offer_image; // Change this line to access the correct property
      const path = "/public/offer_image/";
      const offer_imageName = offerfile.name;
      photo = path + offer_imageName;

      offerfile.mv("./public/offer_image/" + offer_imageName, function (err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log("Please Upload Image !!!");
    }

    const sql = `UPDATE offer SET PromoCode="${promoCode}", Category="${category}", 
      Subcategory="${subcategory}", StartDate="${startDate}", EndDate="${endDate}", 
      Description="${description}", photo="${photo}" WHERE id=${sanitizedId}`;

    dbConfig.query(sql, (err, result) => {
      if (!err) {
        // Return the updated data along with a success message
        res.status(200).json({ message: "Update successful", updatedData: result });
      } else {
        console.log(err, 'ddddddddddd');
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (err) {
    console.log("Error!", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateOffer,
};



// const updateOffer = async (req, res) => {
  
//   const promoCode = req.body.promoCode;
//   const category = req.body.category;
//   const subcategory = req.body.subcategory;
//   const startDate = req.body.startDate || "";
//   const endDate = req.body.endDate || "";
//   const description = req.body.description;

//   // Offer images
//   if (req.files != undefined) {
//     if (req.files.offer_image != undefined) {
//       var offerfile = req.files.photo;
//       var path = "/public/offer_image/";
//       var offer_imageName = offerfile.name;
//       var photo = path + offer_imageName;
//       console.log(req.files, "files");
//       offerfile.mv("./public/offer_image/" + offer_imageName, function (err) {
//         if (err) {
//           console.log(err);
//         }
//       });
//     }
//   } else {
//     console.log("Please Upload Image !!!");
//   }

//   const sql = `UPDATE offer SET (PromoCode,Category,StartDate,EndDate,Description,Subcategory)
//   VALUES ("${promoCode}","${category}",
//   "${startDate}","${endDate}","${description}","${subcategory}")`;   
//   // const sql = `INSERT INTO offer(vendor_id,photo,PromoCode,Category,Subcategory,StartDate,EndDate,Description)
//   // VALUES ("${vendor_id}","${offer_image}","${promoCode}","${category}","${subcategory}"
//   // "${startDate}","${endDate}","${description}")`;
//   console.log(sql, "here");
//   try{
//   result =  dbConfig.query(sql, (err,result ) => {
//     if (!err) {
//       res.status(201).send(result);
//     } else {
//       console.log(err,'ddddddddddd');
//     }
//   });
// } catch (err) {
//   if (err) console.log("Error!", err);
// }
// };



// 
const getOffer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var vendor_id = req.params.vendorId;
      const sql = `SELECT * FROM offer WHERE vendor_id='${vendor_id}';`;
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

const getVendorOffer = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var id = req.params.Id;
      const sql = `SELECT * FROM offer WHERE id='${id}';`;
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

const getOfferAll = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT * FROM trainer_offer`;
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

const deleteOffer = async Id => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `DELETE FROM offer WHERE id="${Id}"`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("err!", err);
          return reject({ status: 404, message: "Not Found" });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = { create,updateOffer, getOffer, getOfferAll,getVendorOffer,deleteOffer };
