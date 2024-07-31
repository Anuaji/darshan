const dbConfig = require('../database/config');

const trainerSubCategoryList ={};

trainerSubCategoryList.createNewTrainerSubCategory = async (body)=>{
   return new Promise((resolve, reject)=>{
        try {
            const trainerCategoryId = body.trainerCategoryId;
            const trainerSubCategoryName = body.trainerSubCategoryName;
            const tag = body.tag;
            const sql = `INSERT INTO trainersubcategorylist (trainerCategoryId,trainerSubCategoryName,Tag) VALUES("${trainerCategoryId}","${trainerSubCategoryName}","${tag}")`;
    
            dbConfig.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve({status:200,message:"trainer subcategory created successfully"});
                }
            });
        } catch (err) {
                return reject(err);
        }
    })
    
};

trainerSubCategoryList.getAllTrainerSubCategoriesByUsingCategoryId = async (params)=>{
    return new Promise((resolve, reject)=>{
         try {
             const sql = `SELECT trainersubcategorylist.*, trainercategory.categoryId, trainercategory.categoryName 
             FROM trainersubcategorylist LEFT JOIN trainercategory ON trainercategory.categoryId = trainersubcategorylist .trainerCategoryId`;
     
             dbConfig.query(sql, (err, rows) => {
                 if (err) {
                     return reject(err);
                 } else {
                     return resolve(rows);
                 }
             });
         } catch (err) {
                 return reject(err);
         }
     })
     
 };

trainerSubCategoryList.getSingleTrainerSubCategoriesByUsingCategoryId = async (req)=>{
    return new Promise((resolve, reject)=>{
         try {
             const trainerCategoryId = req.params.trainerCategoryId;
             const sql = `SELECT trainersubcategorylist.*, trainercategory.categoryId, trainercategory.categoryName 
             FROM trainersubcategorylist LEFT JOIN trainercategory ON trainercategory.categoryId = trainersubcategorylist.trainerCategoryId
             WHERE trainersubcategorylist.Id="${trainerCategoryId}"`;
             dbConfig.query(sql, (err, rows) => {
                 if (err) {
                     return reject(err);
                 } else {
                     return resolve(rows);
                 }
             });
         } catch (err) {
                 return reject(err);
         }
     })
     
 };
 trainerSubCategoryList.deleteTrainerSubcategoreis = async(req,res)=>{
    return new Promise((resolve,reject)=>{
        try{
  var trainerSubcategoriesListid = req.params.id;
  const sql =`DELETE FROM trainersubcategorylist WHERE trainerCategoryId = "${trainerSubcategoriesListid}"`;
  dbConfig.query(sql,(err,result)=>{
      if (!err) {
          return resolve(result);
      }
      else{
          return reject(err);
      }
  })
        }catch(err){
            return reject(err);
        }
    })
 }
 trainerSubCategoryList.updateTrainerSubcategorieslist = async (req) => {
    return new Promise((resolve, reject) => {
        try {
   var trainerSubcategoriesListid = req.params.id;
   var trainerCategoryId = req.body.trainerCategoryId;
   var trainerSubCategoryName = req.body.trainerSubCategoryName;
   var tag = req.body.tag;
            const sql = `UPDATE trainersubcategorylist SET trainerCategoryId = "${trainerCategoryId}", trainerSubCategoryName = "${trainerSubCategoryName}", Tag="${tag}"
            WHERE Id ="${trainerSubcategoriesListid}"`;
            dbConfig.query(sql, (err, result) => {
                if (!err) {
                    return resolve(result);
                }
                else {
                    return reject(err);
                }
            })
        } catch (err) {
            return reject(err);
        }
    })
}

module.exports = trainerSubCategoryList;