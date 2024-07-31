const dbConfig = require("../database/config");
const { beginTransaction } = require("../database/config");

// get all Temple Values
exports.HomeGetAll = (req, res) => {
  console.log(req.params.noItems, "prakash checking");
  try {
    dbConfig.query(
      `call homeLists(${req.params.noItems});`,
      (err, rows, fields) => {
        if (!err) res.send(rows[0]);
        else console.log(err);
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.templesGetAll = (req, res) => {
  try {
    const start = parseInt(req.query.start);
    const end = parseInt(req.query.end);

    const country_id = req.query?.country_id;
    const state_id = req.query?.state_id;
    const district_id = req.query?.district_id;
    const city_id = req.query?.city_id;
    const area_id = req.query?.area_id;
    const speciality_id = req.query?.speciality_id;
    const main_god_id = req.query?.main_god_id;
    const isMarriage = req.query?.isMarriage;
    const isAnnadhanam = req.query?.isAnnadhanam;
    const isTraining = req.query?.isTraining;
    const isHospital = req.query?.isHospital;
    const searchBy = req.query?.searchBy?.toString();
    const group_id = req.query?.group_id?.toString();
    const pariharam_id = req.query?.pariharam_id;
    const festival_id = req.query?.festival_id;

    const queries = [
      { key: "country_id", value: country_id },
      { key: "state_id", value: state_id },
      { key: "district_id", value: district_id },
      { key: "city_id", value: city_id },
      { key: "area_id", value: area_id },
      { key: "main_god_id", value: main_god_id },
      { key: "speciality_id", value: speciality_id },
      { key: "isHospital", value: isHospital },
      { key: "isMarriage", value: isMarriage },
      { key: "isAnnadhanam", value: isAnnadhanam },
      { key: "isTraining", value: isTraining },
      { key: "grouptable_id", value: group_id },
      { key: "pariharam", value: pariharam_id },
      { key: "festival_ids", value: festival_id },
    ];

    const filteredResult = queries.filter((item) => item.value);

    let filterQueryStr = filteredResult.length ? "WHERE " : "";

    filteredResult?.forEach((item, index) => {
      if (item.value) {
        filterQueryStr += `temple.${item.key}="${item.value}" ${filteredResult[index + 1]?.value ? "AND " : ""
          }`;
      }
    });

    let setLimit = end ? `LIMIT ${start},${end}` : '';
    const filterQuery = `${filterQueryStr} ORDER BY temple.id DESC ${setLimit}`;
    const searchByQuery = `WHERE temple.temple_name like "%${searchBy}%" OR city.city like "%${searchBy}%" OR main_god.god_name like "%${searchBy}%"`;

    let queryString = `SELECT temple.id,temple.temple_name, temple.TempleLatitude,temple.TempleLongitude,temple.poojaFields, temple.bookingFields, temple.country_id,temple.state_id,countries.country as Countryname,temple.state_id,states.state as Statename,temple.district_id,districts.district as Districtname,temple.city_id,city.city as Cityname,main_god.god_name as MainGodName,temple.area_id,temple.main_god_id,temple.othergod_id,area.area_name as Areaname,temple.temple_address,temple.speciality_id,temple.grouptable_id,temple.otherspec_id,temple.temple_history,temple.temple_year,temple.temple_amotime,temple.temple_amctime,temple.temple_pmotime,temple.temple_pmctime,temple.temple_prasadam,temple.temple_tree,temple.pariharam,temple.festival_ids,temple.start_date,temple.end_date,temple.training_ids,temple.incharge_name,temple.phone_number,temple.temple_mailid,temple.temple_website,temple.created_date,temple.created_by,temple.main_image,temple.sub_images,temple.main_video,temple.control_by,temple.temple_additional,temple.temple_bus_route,temple.ways_to_reach,temple.temple_map,temple.pooja_timings,temple.aminity,temple.functionsInsideTemple FROM temple LEFT JOIN countries ON temple.country_id=countries.id LEFT JOIN states ON temple.state_id=states.id LEFT JOIN districts ON temple.district_id=districts.id LEFT JOIN city ON temple.city_id=city.id LEFT JOIN main_god ON temple.main_god_id=main_god.main_god_id LEFT JOIN area ON temple.city_id=area.area_id ${searchBy ? searchByQuery : filterQuery
      };`

    dbConfig.query(
      queryString,
      (err, rows, field) => {
        if (!err) {
          let temples = [];

          if (req.query.userLatitude && req.query.userLongitude) {
            let userLatitude = req.query.userLatitude;
            let userLongitude = req.query.userLongitude;

            rows.forEach(temple => {
              let templeLatitude = temple.TempleLatitude;
              let templeLongitude = temple.TempleLongitude;

              let computedDistance = distance(userLatitude, templeLatitude, userLongitude, templeLongitude);

              if (computedDistance <= 30) {
                temples.push(temple)
              }

            })

          } else {
            temples = [...rows]
          }

          res.json({ result: temples, status: "Success", message: temples?.length ? "PUSH DATA" : "NO DATA" });
        } else {
          console.log(err);
          res.json({ error: err });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

function distance(lat1, lat2, lon1, lon2) {

  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;
  return (c * r);
}

// //Search Temple Values
// exports.searchLists = (req, res) => {
//   var countryId = req.body.countryId;
//   var stateId = req.body.stateId;
//   var districtId = req.body.districtId;
//   var cityId = req.body.cityId;
//   var maingodId = req.body.maingodId;
//   var specialityId = req.body.specialityId;
//   var pariharamId = req.body.pariharamId;
//   var festivalId = req.body.festivalId;
//   var trainingId = req.body.trainingId;
//   var controlById = req.body.controlById;
//   var marriageAllowId = req.body.marriageAllowId;
//   var AnadhanamId = req.body.AnadhanamId;
//   var centuryId = req.body.centuryId;

//   try {
//     dbConfig.query(
//       `call searchList("${countryId}", "${stateId}", "${districtId}", "${cityId}", "${maingodId}", "${specialityId}", "${pariharamId}", "${festivalId}", "${trainingId}", "${controlById}", "${marriageAllowId}", "${AnadhanamId}", "${centuryId}")`,
//       (err, rows, fields) => {
//         if (!err) {
//           console.log(rows, "Response");
//           res.send(rows[0]);
//         } else console.log(err);
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };

// Home GetTemple id with details
exports.HomegetTempleId = (req, res) => {
  console.log(req.params.id);
  dbConfig.query(
    `SELECT temple.id as templeId,temple.temple_name, 
    temple.country_id,temple.state_id,
    temple.district_id,temple.city_id,
    temple.temple_address,
    temple.temple_history,temple.temple_year,
    temple.temple_amotime,temple.temple_amctime,
    temple.temple_pmotime,temple.temple_pmctime,
    temple.temple_prasadam,
    temple.temple_tree,temple.ticket_id,
    temple.incharge_name,temple.phone_number,
    temple.temple_mailid,temple.temple_website,
    temple.control_by,
    temple.marriage_fee,temple.temple_additional,
    temple.ana_time,temple.temple_bus_route,
    temple.isTicket,temple.isMarriage,
    temple.isAnnadhanam,temple.temple_map,
    temple.pooja_timings,
    temple.sub_images,
    temple.main_image,
    temple.entryFee,
    temple.bestTimeToVisit,
    temple.description,
    countries.country, states.state,districts.district, city.city,
     main_godTable.god_name as MainGodName,
    temple.otherspec_id,other_specaility.other_spec_name as otherspecialityName,
    temple.aminity,
     GROUP_CONCAT(DISTINCT other_god.main_god_id) as otherGodIds,
    GROUP_CONCAT(DISTINCT other_god.god_name) as otherGodNames, 
    GROUP_CONCAT(DISTINCT pariharams.pariharam_id) as PariharamIds,
    GROUP_CONCAT(DISTINCT pariharams.pariharam_name) as PariharamNames, 
    GROUP_CONCAT(DISTINCT festival.festival_id) as FestivalIds,
    GROUP_CONCAT(DISTINCT festival.festival_name) as FestivalNames,
    GROUP_CONCAT(DISTINCT speciality.id)as speciality_id,
    GROUP_CONCAT(DISTINCT speciality.speciality_name)as SpecialityName,
    temple.functionsInsideTemple,functioninsidethetemple.FunctionInsideTheTemple as FunctionName
     FROM temple  LEFT JOIN other_specaility on temple.otherspec_id = other_specaility.other_specaility_id  LEFT JOIN functioninsidethetemple on temple.functionsInsideTemple = functioninsidethetemple.FunctionInsideTheTempleID 
    LEFT JOIN countries ON temple.country_id = countries.id
    LEFT JOIN states ON temple.state_id = states.id 
    LEFT JOIN city ON temple.city_id = city.id
    LEFT JOIN districts ON temple.district_id = districts.id
   LEFT JOIN main_god as main_godTable ON temple.main_god_id = main_godTable.main_god_id
    LEFT JOIN main_god as other_god ON  FIND_IN_SET(other_god.main_god_id,temple.othergod_id)
    LEFT JOIN pariharams ON FIND_IN_SET(pariharams.pariharam_id,temple.pariharam)
   LEFT JOIN speciality ON FIND_IN_SET(speciality.id,temple.speciality_id)
   LEFT JOIN festival ON FIND_IN_SET(festival.festival_id,temple.festival_ids)
    WHERE temple.id ="${req.params.id}"`,
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows, "Templedetailsresponse 143");
        res.send(rows);
      } else console.log(err);
    }
  );
};

//get One Image
exports.TempleImageGetOne = (req, res) => {
  dbConfig.query(
    `SELECT * FROM temple_images WHERE temple_id = "${req.params.id}";`,
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows, "response Line 156");
        res.send(rows);
      } else console.log(err);
    }
  );
};
// Home Special Id details
exports.HomegetSpecialId = (req, res) => {
  console.log(req.params.id);
  dbConfig.query(
    `SELECT
      temple.id,
     GROUP_CONCAT(DISTINCT speciality.speciality_name SEPARATOR ', ') AS speciality_name,
     GROUP_CONCAT(DISTINCT pariharams.pariharam_name SEPARATOR ', ') AS pariharam_name,
     GROUP_CONCAT(DISTINCT training.training_name SEPARATOR ', ') AS training_name,
     GROUP_CONCAT(DISTINCT other_specaility.other_spec_name SEPARATOR ',')AS other_spec_name,
     GROUP_CONCAT(DISTINCT festival.festival_name SEPARATOR ',')AS festival_name,
     GROUP_CONCAT(DISTINCT other_gods.other_god_name SEPARATOR ',') AS other_god_name
  FROM
   temple
   INNER JOIN
   speciality
   ON
   FIND_IN_SET(speciality.speciality_id,temple.speciality_id )
   INNER JOIN
   pariharams
   ON
   FIND_IN_SET(pariharams.pariharam_id,temple.pariharam)
   INNER JOIN
    training
    ON
    FIND_IN_SET(training.training_id,temple.training_ids)
    INNER JOIN
    other_specaility
    ON
    FIND_IN_SET(other_specaility.other_specaility_id,temple.otherspec_id)
    INNER JOIN
    festival
    ON
    FIND_IN_SET(festival.festival_id,temple.festival_ids)
    INNER JOIN
    other_gods
    ON
    FIND_IN_SET(other_gods.other_god_id,temple.othergod_id)
   WHERE
  temple.id ="${req.params.id}"
  GROUP BY id`,
    (err, rows, fields) => {
      if (!err) {
        console.log(res, "special");
        res.send(rows);
      } else console.log(err);
    }
  );
};
