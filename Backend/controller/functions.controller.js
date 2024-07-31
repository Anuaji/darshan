const dbConfig = require("../database/config");
const fs = require("fs");

let functions = {};
// ================================old==============================
// functions.create = async req => {
//   return new Promise((resolve, reject) => {
//     try {
//       let functionImage;
//       const listItems = [];
//       let filename;
//       let mv;
//       var functionType = req.body.FunctionType;
//       var functionName = req.body.FunctionName;
//       var languages = req.body.languages;
//       var description = req.body.Description;
//       var additionalInformation = req.body.AdditionalInformation;
//       var minPriceWithMaterial = req.body.MinPriceWithMaterial;
//       var maxPriceWithMaterial = req.body.MaxPriceWithMaterial;
//       var minPriceWithOutMaterial = req.body.MinPriceWithOutMaterial;
//       var maxPriceWithOutMaterial = req.body.MaxPriceWithOutMaterial;

//       //   if(req.files === undefined){
//       //     return reject({message:"Please Upload a photo"})
//       //   }
//       //   else if(req.files !== undefined){
//       //       console.log("files",req.files);
//       //     if(req.files['FunctionImage']){
//       //      filename =  Date.now()+"-"+req.files['FunctionImage']['name'];
//       //      mv = req.files['FunctionImage']['mv'];
//       //      listItems.push('/public/functionsImages/'+filename);
//       //     mv('./public/functionsImages/'+filename,err=>{
//       //       if (err){
//       //         return reject(err);
//       //       }

//       //     })
//       //     functionImage = listItems;
//       //     }else if (req.body.FunctionImage){
//       //         functionImage = req.body.FunctionImage;

//       //     }else{
//       //         functionImage = ''
//       //     }
//       //   }else if(req.body.FunctionImage){
//       //     functionImage =  req.body.FunctionImage;
//       //   } else {
//       //     functionImage = '';
//       //   }
//       // ============================new==========================
//       if (req.files != undefined) {
//         if (req.files.FunctionImage != undefined) {
//           var blogfile = req.files.FunctionImage;
//           var path = "./public/FunctionsImages/";
//           var imageName = blogfile.name;
//           var FunctionsImages = path + imageName;
//           console.log(req.files, "files");
//           blogfile.mv(FunctionsImages, function (err) {
//             if (err) {
//               console.log(err);
//             }
//           });
//         }
//       } else {
//         console.log("Please Upload Image !!!");
//       }

//       const sql = `INSERT INTO functions (FunctionType,FunctionName,languages,Description,AdditionalInformation,
//             MinPriceWithMaterial,MaxPriceWithMaterial,MinPriceWithOutMaterial,MaxPriceWithOutMaterial,FunctionImage)
//              VALUES("${functionType}","${functionName}","${languages}","${description}","${additionalInformation}",
//              "${minPriceWithMaterial}","${maxPriceWithMaterial}","${minPriceWithOutMaterial}","${maxPriceWithOutMaterial}",
//              "${FunctionsImages}")`;
//       dbConfig.query(sql, (err, result) => {
//         if (!err) {
//           return resolve(result);
//         } else {
//           return reject(err);
//         }
//       });
//     } catch (e) {
//       return reject(e);
//     }
//   });
// };
// ==========================================================new========================
functions.createFunction = (req, res) => {
  var functionType = req.body.FunctionType;
  var functionName = req.body.FunctionName;
  var languages = req.body.languages;
  var description = req.body.Description;
  var additionalInformation = req.body.AdditionalInformation;
  var minPriceWithMaterial = req.body.MinPriceWithMaterial;
  var maxPriceWithMaterial = req.body.MaxPriceWithMaterial;
  var minPriceWithOutMaterial = req.body.MinPriceWithOutMaterial;
  var maxPriceWithOutMaterial = req.body.MaxPriceWithOutMaterial;

  //   console.log("Image", blog_image);

  if (req.files != undefined) {
    if (req.files.FunctionImage != undefined) {
      var blogfile = req.files.FunctionImage;
      var path = "/public/FunctionsImage/";
      var imageName = blogfile.name;
      var FunctionsImages = path + imageName;
      console.log(FunctionsImages, "files");
      blogfile.mv("./public/FunctionsImage/" + imageName, function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  } else {
    console.log("Please Upload Image !!!");
  }

  var sql = `INSERT INTO functions (FunctionType,FunctionName,languages,Description,AdditionalInformation,
                    MinPriceWithMaterial,MaxPriceWithMaterial,MinPriceWithOutMaterial,MaxPriceWithOutMaterial,FunctionImage)
                     VALUES("${functionType}","${functionName}","${languages}","${description}","${additionalInformation}",
                 "${minPriceWithMaterial}","${maxPriceWithMaterial}","${minPriceWithOutMaterial}","${maxPriceWithOutMaterial}",
                   "${FunctionsImages}")`;
  try {
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        // console.log("ggfgfgf", rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

// functions.getAllFunction = (req, res) => {
//   try {
//     dbConfig.query("SELECT * FROM functions", (err, rows) => {
//       if (!err) {
//         console.log(rows, "function");
//         res.send(rows);
//       } else console.log(err);
//     });
//   } catch (err) {
//     return reject(err);
//   }
// };

functions.getAllFunction = (req, res) => {
  try {
    dbConfig.query(
      ` SELECT   functions.FunctionID, functions.FunctionType,functions.FunctionName,functions.Description,functions.FunctionImage,functions.languages,functions.AdditionalInformation,functions.MinPriceWithMaterial,languages.language_name,functions.MaxPriceWithMaterial,functions.MinPriceWithOutMaterial,functions.MaxPriceWithOutMaterial FROM functions
        LEFT JOIN languages ON functions.languages=languages.language_id;`,
      (err, rows, fields) => {
        if (!err) {
          // console.log(rows, "rows");
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

functions.getSingleFunction = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var functionid = req.params.functionId;
      const sql = `SELECT * FROM functions WHERE FunctionID = '${functionid}'`;
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

// ========================old=======================
// functions.updateFunctions = async (req, res) => {
//   return new Promise((resolve, reject) => {
//     try {
//       let functionImage;
//       const listItems = [];
//       let filename;
//       let mv;
//       var functionId = req.params.functionId;
//       var functionType = req.body.FunctionType;
//       var functionName = req.body.FunctionName;
//       var languages = req.body.languages;
//       var description = req.body.Description;
//       var additionalInformation = req.body.AdditionalInformation;
//       var minPriceWithMaterial = req.body.MinPriceWithMaterial;
//       var maxPriceWithMaterial = req.body.MaxPriceWithMaterial;
//       var minPriceWithOutMaterial = req.body.MinPriceWithOutMaterial;
//       var maxPriceWithOutMaterial = req.body.MaxPriceWithOutMaterial;

//       if (req.files === undefined) {
//         return reject({ message: "Please Upload a photo" });
//       } else if (req.files !== undefined) {
//         console.log("files", req.files);
//         if (req.files["FunctionImage"]) {
//           filename = Date.now() + "-" + req.files["FunctionImage"]["name"];
//           mv = req.files["FunctionImage"]["mv"];
//           listItems.push("/public/functionsImages/" + filename);
//           mv("./public/functionsImages/" + filename, err => {
//             if (err) {
//               return reject(err);
//             }
//           });
//           functionImage = listItems;
//         } else if (req.body.FunctionImage) {
//           functionImage = req.body.FunctionImage;
//         } else {
//           functionImage = "";
//         }
//       } else if (req.body.FunctionImage) {
//         functionImage = req.body.FunctionImage;
//       } else {
//         functionImage = "";
//       }

//       const sql = `UPDATE functions SET FunctionType = '${functionType}', FunctionName = '${functionName}',
//          languages = '${languages}', Description = '${description}', AdditionalInformation = '${additionalInformation}', MinPriceWithMaterial = '${minPriceWithMaterial}',
//          MaxPriceWithMaterial = '${maxPriceWithMaterial}', MinPriceWithOutMaterial = '${minPriceWithOutMaterial}', MaxPriceWithOutMaterial = '${maxPriceWithOutMaterial}',FunctionImage='${functionImage}' WHERE FunctionID= '${functionId}'`;

//       dbConfig.query(sql, (err, result) => {
//         if (!err) {
//           return resolve(result);
//         } else {
//           return reject(err);
//         }
//       });
//     } catch (err) {
//       return reject(err);
//     }
//   });
// };
// =====================================new==================

functions.updateFunction = (req, res) => {
  console.log(req.params.id, "dfsdfs");
  try {
    var functionType = req.body.FunctionType;
    var functionName = req.body.FunctionName;
    var languages = req.body.languages;
    var description = req.body.Description;
    var additionalInformation = req.body.AdditionalInformation;
    var minPriceWithMaterial = req.body.MinPriceWithMaterial;
    var maxPriceWithMaterial = req.body.MaxPriceWithMaterial;
    var minPriceWithOutMaterial = req.body.MinPriceWithOutMaterial;
    var maxPriceWithOutMaterial = req.body.MaxPriceWithOutMaterial;

    if (req.files != undefined) {
      if (req.files.FunctionImage != undefined) {
        var blogfile = req.files.FunctionImage;
        var path = "/public/FunctionsImage/";
        var imageName = blogfile.name;
        var FunctionImage = path + imageName;
        blogfile.mv("./public/FunctionsImage/" + imageName, function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        var FunctionImage = "No image";
      }
    } else {
      var FunctionImage = req.body.FunctionImage;
      console.log("Please Upload Image !!!");
    }

    var sql = `UPDATE functions SET 
    FunctionType = '${functionType}', 
    FunctionName = '${functionName}',
              languages = '${languages}', 
              Description = '${description}',
               AdditionalInformation = '${additionalInformation}',
                MinPriceWithMaterial = '${minPriceWithMaterial}',
                MaxPriceWithMaterial = '${maxPriceWithMaterial}', 
                MinPriceWithOutMaterial = '${minPriceWithOutMaterial}', 
                MaxPriceWithOutMaterial = '${maxPriceWithOutMaterial}',
                FunctionImage='${FunctionImage}' 
                WHERE FunctionID= '${req.params.id}'`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};

// ======================================================
functions.deleteFunction = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      var functionId = req.params.functionId;
      const sql = `DELETE FROM functions WHERE FunctionID = "${functionId}"`;
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

module.exports = functions;
