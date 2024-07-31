const dbConfig = require("../database/config");

module.exports.getSubCategories = async (req, res) => {
  try {
    var sql = `SELECT subCategoryId,subCategoryName,Tag FROM subcategorylist where categoryId ="${req.params.categoryId}";`;

    dbConfig.query(sql, (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(500).send(err);
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send(err.message);
    }
  }
};

module.exports.createNewCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const subCategoryName = req.body.subCategoryName;
    // const tag = req.body.tag;
    const sql = `INSERT INTO subcategorylist (categoryId,subCategoryName) VALUES("${categoryId}","${subCategoryName}")`;

    dbConfig.query(sql, (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(500).send(err);
      }
    });
  } catch (err) {
    if (err) {
      res.status(500).send(err);
    }
  }
};

module.exports.selectSubCategoriesWithCityId = async (req, res) => {
  try {
    const city_id = req.params.city_id;

    const sql = `SELECT * FROM subcategorylist WHERE city_id ="${city_id}"`;
    dbConfig.query(sql, (err, result) => {
      if (!err) res.status(200).send(result);
      else res.status(500).send(`failed to get sub-category List ${err}`);
    });
  } catch (err) {
    if (err) res.status(500).send(`error occured: ${err}`);
  }
};

// module.exports.getAllSubCategories = async ()=>{
// return new Promise((resolve, reject)=>{
//     try{
//       const sql=`SELECT * FROM subcategorylist`;
//       dbConfig.query(sql, (err,result)=>{
//           if(err){
//            return reject(err);
//           }else{
//               if(result.length == 0){
//                   reject({status:404,message:"No subcategories Found"})
//               }
//               else if(result.length != 0){
//                  resolve(result)
//               }
//           }
//       })
//     }catch(e){
//       reject(e)
//     }
// })
// }

module.exports.getAllSubCategories = async () => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT subcategorylist.subCategoryId,subcategorylist.subCategoryName,subcategorylist.Tag,subcategorylist.categoryId,subcategorylist.city_id,categorieslist.categoryName FROM subcategorylist LEFT JOIN categorieslist ON subcategorylist.categoryId = categorieslist.categoryId`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          if (result.length == 0) {
            reject({ status: 404, message: "No subcategories Found" });
          } else if (result.length != 0) {
            resolve(result);
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.getSingleSubcategory = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      const subCategoryId = req.params.subCategoryId;
      const sql = `SELECT * FROM subcategorylist WHERE subCategoryId="${subCategoryId}"`;
      dbConfig.query(sql, (err, result) => {
        if (err) {
          console.log("Error!", err);
          return reject({ status: 500, message: "Failed to get subCategory" });
        } else if (result.length == 0) {
          return reject({ status: 404, message: "No subCategory Found" });
        } else if (result.length != 0) {
          return resolve(result);
        }
      });
    } catch (e) {
      console.log("Error!!", e);
      return reject({ status: 500, message: "error occured" });
    }
  });
};

module.exports.deleteSubCategoriesList = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var subcategoryid = req.params.subCategoryId;
      const sql = `DELETE FROM subcategorylist WHERE subCategoryId  = "${subcategoryid}"`;
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

module.exports.updateSingleSubCategory = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      var categoryId = req.body.CategoryId;
      var subCategoryName = req.body.SubCategoryName;
      var tag = req.body.Tag;
      var subCategoryId = req.params.SubCategoryId;
      const sql = `UPDATE subcategorylist SET categoryId='${categoryId}',subCategoryName='${subCategoryName}',Tag='${tag}' WHERE subCategoryId='${subCategoryId}'`;

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
