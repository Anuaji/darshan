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
        main_god_name,
        speciality_name,
        grouptable_name,
        pariharam_id,
        pariharam_name,
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
         poetSaints, youtubeUrl,poojaField,subGodNames,tankInformation,Sculpturedetails,MuralDetail,routes,amenities,main_image,countryName,stateName,districtName,cityName,main_god_name,speciality_name,grouptable_name,pariharam_id,pariharam_name )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)

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
          main_god_name,
          JSON.stringify(speciality_name),
          grouptable_name,
          JSON.stringify(pariharam_id),
          JSON.stringify(pariharam_name),
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

templeCreate.filterTempleData = async (req) => {
  console.log("req.query :>> ", req.query);

  return new Promise((resolve, reject) => {
    try {
      const {
        country_id,
        state_id,
        district_id,
        city_id,
        areaName,
        main_god_id,
        speciality_id,
        grouptable_id,pariharam_id
      } = req.query;

      const conditions = [];
      const params = [];

      if (country_id) {
        conditions.push("country_id = ?");
        params.push(country_id);
      }
      if (state_id) {
        conditions.push("state_id = ?");
        params.push(state_id);
      }
      if (district_id) {
        conditions.push("district_id = ?");
        params.push(district_id);
      }
      if (city_id) {
        conditions.push("city_id = ?");
        params.push(city_id);
      }
      if (areaName) {
        conditions.push("area_id = ?");
        params.push(areaName);
      }
      if (main_god_id) {
        conditions.push("main_god_id = ?");
        params.push(main_god_id);
      }

      if (speciality_id) {
        let specialityIds;
        try {
          specialityIds = JSON.parse(speciality_id);
        } catch (e) {
          return reject({
            status: 400,
            message: "Invalid speciality_id format",
            error: e,
          });
        }

        if (!Array.isArray(specialityIds)) {
          specialityIds = [specialityIds];
        }

        const specialityConditions = specialityIds.map(
          (id) => `JSON_CONTAINS(speciality_id, CAST(? AS JSON), '$')`
        );
        conditions.push(`(${specialityConditions.join(" OR ")})`);
        params.push(...specialityIds.map((id) => JSON.stringify(id)));
      }

      if (grouptable_id) {
        conditions.push("grouptable_id = ?");
        params.push(grouptable_id);
      }
      if (pariharam_id) {
        let pariharamIds;
        try {
          pariharamIds = JSON.parse(pariharam_id);
        } catch (e) {
          return reject({
            status: 400,
            message: "Invalid pariharam_id format",
            error: e,
          });
        }

        if (!Array.isArray(pariharamIds)) {
          pariharamIds = [pariharamIds];
        }

        const pariharamConditions = pariharamIds.map(
          (id) => `JSON_CONTAINS(pariharam_id, CAST(? AS JSON), '$')`
        );
        conditions.push(`(${pariharamConditions.join(" OR ")})`);
        params.push(...pariharamIds.map((id) => JSON.stringify(id)));
      }

      let sql = "SELECT * FROM temple_data";

      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }

      dbConfig.query(sql, params, (err, result) => {
        if (err) {
          console.log("Error fetching temple data:", err);
          return reject({
            status: 500,
            message: "Error occurred",
            error: err,
          });
        } else {
          return resolve(result);
        }
      });
    } catch (e) {
      console.log("Error in filterTempleData:", e);
      return reject({
        status: 500,
        message: "Internal Server Error",
        error: e,
      });
    }
  });
};

module.exports = templeCreate;
