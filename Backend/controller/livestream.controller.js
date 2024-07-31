//Import from database
const dbConfig = require("../database/config");
const fs = require("fs");

//getAll LiveStream
exports.getAllLiveStream = (req, res) => {
  try {
    dbConfig.query(`SELECT * fROM livestream;`, (err, rows, fields) => {
      if (!err) {
        console.log(rows, "rows");
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    throw e;
  }
};

//create livestream
exports.createLiveStream = (req, res) => {

    //image
        // const listItems = [];
        // var filename;
        // var livestream_image;
  const livestream_title = req.body.livestream_title?.replace(/"/g, "'");
  const livestream_description = req.body.livestream_description?.replace(/"/g, "'");
  const livestream_startdate = req.body.livestream_startdate?.replace(/"/g, "'");
  const livestream_enddate = req.body.livestream_enddate?.replace(/"/g, "'");
  const livestream_image = req.body.livestream_image;
  const livestream_url = req.body.livestream_url?.replace(/"/g, "'");
  const Country = req.body.Country;
  const State = req.body.State;
  const District = req.body.District;
  const City = req.body.City;
  const Area = req.body.Area;
  const temple_name = req.body.temple_name?.replace(/"/g, "'");
  const inside_or_outside = req.body.inside_or_outside?.replace(/"/g, "'");
  const start_time = req.body.start_time?.replace(/"/g, "'");
  const end_time = req.body.end_time?.replace(/"/g, "'");
  
//   if(req.files === undefined){
//     res.status(400).send("Please Upload a photo");
//   }
//   else if(req.files !== undefined){
//     if(req.files['livw']){
//      filename =  Date.now()+"-"+req.files['livestream_image']['name'];
//      mv = req.files['livestream_image']['mv'];
//      listItems.push('/public/livestream_images/'+filename);
//     mv('./public/livestream_images/'+filename,err=>{
//       if (err) res.status(500).send(err);

//     })
//     livestream_image =listItems;
//     }else if (req.body.livestream_image){
//       livestream_image = req.body.livestream_image;

//     }else{
//       livestream_image = ''
//     }
//   }else if(req.body.livestream_image){
//     livestream_image =  req.body.livestream_image;
//   } else {
//     livestream_image = '';
//   }

  var sql = `INSERT INTO livestream(livestream_title,livestream_description,livestream_startdate,livestream_enddate,livestream_image,livestream_url,Country,State,District,City,Area,temple_name,inside_or_outside,start_time,end_time)
    VALUES("${livestream_title}",
            "${livestream_description}",
            "${livestream_startdate}",
            "${livestream_enddate}",
            "${livestream_image}",
            "${livestream_url}",
            "${Country}",
            "${State}",
            "${District}",
            "${City}",
            "${Area}",
            "${temple_name}",
            "${inside_or_outside}",
            "${start_time}",    
            "${end_time}")`;

            try{
    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) {
        console.log("livestreamrows", rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    });
}
   catch (e) {
    throw e;
  }
};

//deletelivestream
exports.deleteLiveStream = (req, res) => {
  try {
    let id = req.params.id;
    const sql = `DELETE FROM livestream WHERE id='${id}'`;
    dbConfig.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    throw e;
  }
};

//updateLiveStream
exports.updateLiveStream = (req, res) => {
  try {
    const livestream_title = req.body?.livestream_title?.replace(/"/g, "'");
    const livestream_description = req.body?.livestream_description?.replace(/"/g, "'");
    const livestream_startdate = req.body?.livestream_startdate?.replace(/"/g, "'");
    const livestream_enddate = req.body?.livestream_enddate?.replace(/"/g, "'");
    const livestream_image = req.body.livestream_image;
    const livestream_url = req.body.livestream_url;
    const Country = req.body.country_id;
    const State = req.body.state_id;
    const District = req.body.district_id;
    const City = req.body.city_id;
    const Area = req.body.area_id;
    const temple_name = req.body?.temple_name?.replace(/"/g, "'");
    const inside_or_outside = req.body?.inside_or_outside?.replace(/"/g, "'");
    const start_time = req.body?.start_time?.replace(/"/g, "'");
    const end_time = req.body?.end_time?.replace(/"/g, "'");

   
    const sql = `UPDATE livestream SET livestream_title = "${livestream_title}",livestream_description = "${livestream_description}", livestream_startdate = "${livestream_startdate}",livestream_enddate = "${livestream_enddate}",livestream_image = "${livestream_image}", livestream_url = "${livestream_url}",Country = '${Country||0}',State = '${State||0}',District = '${District||0}',City = '${City||0}',Area = '${Area||0}',temple_name = "${temple_name}",inside_or_outside = "${inside_or_outside}",start_time = "${start_time}",end_time = "${end_time}" WHERE id = '${req.params?.id}';`;

    dbConfig.query(sql, (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.json(err);
    });
  } catch (e) {
    res.json(e);
  }
};
