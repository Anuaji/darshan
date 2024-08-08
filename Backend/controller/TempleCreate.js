const dbConfig = require("../database/config");

const templeCreate = {};

templeCreate.TempleNewCreate = async (req) => {
  console.log("req.body :>> ", req.body);

  return new Promise((resolve, reject) => {
    try {
      const {
        temple_name,
        temple_address,
        Latitude,
        Longitude,
        PadalPettrathu,
        aagamam,
        ambal_id,
        annathanam,
        area_id,
        centuryBelong,
        chariotTemple,
        city_id,
        control_by,
        country_id,
        district_id,
        donation,
        eveningTime,
        functionsInsideTemple,
        godGender,
        grouptable_id,
        heritage,
        historical,
        hollytank,
        inchargeName,
        kingPeriod,
        main_god_id,
        morningTime,
        phone,
        pincode,
        poetSaints,
        popular_id,
        prasadam,
        prayer,
        purathanam,
        sanctorum,
        speciality_id,
        state_id,
        temple_map,
        temple_year,
        thalavirutcham,
        tourist_id,
        verses,
        vimanaType,
        poojaField,
        youtubeUrl,
        subGodNames,
        tankInformation,
        Sculpturedetails,
        MuralDetail,
        routes,
        amenities,
        main_image,
        countryName,
        stateName,
        districtName,
        cityName,
      } = req.body;

      const getMaxTempleIdSQL =
        "SELECT MAX(temple_id) AS max_id FROM temple_data";
      dbConfig.query(getMaxTempleIdSQL, (err, result) => {
        if (err) {
          console.log("Error fetching max temple_id:", err);
          return reject({ status: 500, message: "Error occurred", error: err });
        }

        let nextId = 1;
        if (result[0].max_id) {
          const maxIdNum = parseInt(result[0].max_id.substring(2), 10);
          nextId = maxIdNum + 1;
        }
        const formattedTempleId = `TN${String(nextId).padStart(6, "0")}`;

        const sql = `
        INSERT INTO temple_data 
        (temple_id,temple_name, main_god_id, ambal_id, popular_id, godGender, grouptable_id, speciality_id, pincode, country_id, state_id, district_id, city_id, area_id, temple_address, temple_map, Latitude, Longitude, hollytank, purathanam, historical, prasadam,
         thalavirutcham, prayer, tourist_id, functionsInsideTemple, annathanam, chariotTemple, donation, 
         inchargeName, phone, temple_year, control_by, morningTime, eveningTime, aagamam, vimanaType, 
         PadalPettrathu, sanctorum, heritage, centuryBelong, verses, kingPeriod, 
         poetSaints, youtubeUrl,poojaField,subGodNames,tankInformation,Sculpturedetails,MuralDetail,routes,amenities,main_image,countryName,stateName,districtName,cityName )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)

      `;
        const values = [
          formattedTempleId,
          temple_name,
          main_god_id,
          JSON.stringify(ambal_id),
          JSON.stringify(popular_id),
          godGender,
          grouptable_id,
          JSON.stringify(speciality_id),
          pincode,
          country_id,
          state_id,
          district_id,
          city_id,
          area_id,
          temple_address,
          temple_map,
          Latitude,
          Longitude,
          hollytank,
          purathanam,
          historical,
          prasadam,
          thalavirutcham,
          prayer,
          tourist_id,
          JSON.stringify(functionsInsideTemple),
          annathanam,
          chariotTemple,
          donation,
          inchargeName,
          phone,
          temple_year,
          control_by,
          JSON.stringify(morningTime),
          JSON.stringify(eveningTime),
          aagamam,
          vimanaType,
          PadalPettrathu,
          sanctorum,
          heritage,
          centuryBelong,
          verses,
          kingPeriod,
          poetSaints,
          youtubeUrl,
          JSON.stringify(poojaField),
          JSON.stringify(subGodNames),
          JSON.stringify(tankInformation),
          JSON.stringify(Sculpturedetails),
          JSON.stringify(MuralDetail),
          JSON.stringify(routes),
          JSON.stringify(amenities),
          main_image,
          countryName,
          stateName,
          districtName,
          cityName,
          // JSON.stringify(req.body.subImages),
          // videoFile_path,
        ];

        console.log("Values:", values);

        dbConfig.query(sql, values, (err, result) => {
          if (err) {
            console.log("err!", err);
            return reject({
              status: 500,
              message: "Error occurred",
              error: err,
            });
          } else {
            return resolve({
              status: 200,
              message: "Temple data inserted successfully",
            });
          }
        });
      });
    } catch (e) {
      console.log(e);
      return reject({
        status: 500,
        message: "Internal Server Error",
        error: e,
      });
    }
  });
};

templeCreate.getAllTemple = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM temple_data`;

    dbConfig.query(sql, (err, results) => {
      if (err) {
        console.log("Database error:", err);
        return reject({ status: 500, message: "Error occurred" });
      } else {
        return resolve({ status: 200, data: results });
      }
    });
  });
};

templeCreate.getTempleById = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM temple_data WHERE temple_id = ?`;
    dbConfig.query(sql, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

module.exports = templeCreate;
