// const dbConfig = require("../database/config");
// const { json } = require("body-parser");
// // const db = require("../database/db");
// const fs =require("fs");

// exports.subimagecreate = (req,res) =>{
//     var hoteldetails_subimages = req.body.hoteldetails_subimages;
 
//   if (req.files != undefined) {
//     if (req.files["hoteldetails_subimages"]) {
//       const listItems = [];
//       console.log(req.files["hoteldetails_subimages"].length,"length");
//       if(req.files["hoteldetails_subimages"].length == 1){
//         listItems.push("/public/hotel_image/" + req.files.hoteldetails_subimages.name);
//         var filename = req.files["hoteldetails_subimages"]["name"];
//         var mv = req.files["hoteldetails_subimages"]["mv"];
//         mv("./public/hotel_image/" + filename, function (err) {
//           if (err) {
//             console.log("mv function sub-image NOT ok!!!!!!!!!");
//             console.log(err);
//             res.send("Error occurd!");
//           }
//         });
//       }else{
//         for (var i = 0; i < req.files["hoteldetails_subimages"].length; i++) {
//           listItems.push("/public/hotel_image/" + req.files.hoteldetails_subimages[i].name);
//           var filename = req.files["hoteldetails_subimages"][i]["name"];
//           var mv = req.files["hoteldetails_subimages"][i]["mv"];
//           mv("./public/hotel_image/" + filename, function (err) {
//             if (err) {
//               console.log("mv function sub-image NOT ok!!!!!!!!!");
//               console.log(err);
//               res.send("Error occurd!");
//             }
//           });
//         }
//       }  
//     var hoteldetails_subimages = listItems;
//     } else if (req.body.hoteldetails_subimages) {
//       var hoteldetails_subimages = req.body.hoteldetails_subimages;
//     } else {
//       var hoteldetails_subimages = "";
//     }
//   } else if (req.body.hoteldetails_subimages) {
//     var hoteldetails_subimages = req.body.hoteldetails_subimages;
//   } else {
//     var hoteldetails_subimages = "";
//   }

//     var sql = `INSERT INTO hoteldetails_subimages (hoteldetails_subimages)
//     VALUES("${hoteldetails_subimages}")`;
//     console.log(sql,"here");
//     dbConfig.query(sql,function(err, rows, result){
//       if(err) throw err;
//       console.log("Sub image inserted");
//       res.send(rows);
//     });
//   };