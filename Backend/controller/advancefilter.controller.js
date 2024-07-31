const dbConfig = require("../database/config");
const fs = require("fs");

// get all Temple Values based on MainGod , pariharam, & Specality
// exports.searchGetAllMainGod = (req, res) => {
//     console.log(req.body.main_god_id);
//     try {
//       let dbquery = (`SELECT
//         distinct
//         Temple.id,
//         Temple.temple_name,
//         Temple.main_god_id,
//         Temple.othergod_id,
//         Temple.country_id,
//         Temple.state_id,
//         Temple.district_id,
//         Temple.area_id,
//         Temple.city_id,
//         Temple.temple_address,
//         Temple.speciality_id,
//         Temple.otherspec_id,
//         Temple.temple_history,
//         Temple.temple_year,
//         Temple.temple_amotime,
//         Temple.temple_amctime,
//         Temple.temple_pmotime,
//         Temple.temple_pmctime,
//         Temple.temple_prasadam,
//         Temple.temple_tree,
//         Temple.pariharam,
//         Temple.festival_ids,
//         Temple.start_date,
//         Temple.end_date,
//         Temple.training_ids,
//         Temple.incharge_name,
//         Temple.phone_number,
//         Temple.temple_mailid,
//         Temple.temple_website,
//         Temple.created_date,
//         Temple.created_by,
//         Temple.is_active,
//         Temple.main_image,
//         Temple.sub_images,
//         Temple.main_video,
//         Temple.ticket_id,
//         Temple.marriage_fee,
//         Temple.ana_time,
//         Temple.control_by,
//         Temple.temple_additional,
//         Temple.isTicket,
//         Temple.isMarriage,
//         Temple.isAnnadhanam,
//         Temple.temple_bus_route,
//         Temple.ways_to_reach,
//         Temple.temple_map,
//         Temple.pooja_timings,
//         Temple.isGhoshala,
//         Temple.ghoshala_details,
//         Temple.isEmergency,
//         Temple.emegency_details,
//         Temple.isVaganas,
//         Temple.vaganas_details,
//         Temple.isAnimal,
//         Temple.animals_details,
//         Temple.isTraining,
//         states.id,
//         states.state,
//         city.city,
//         city.id,
//         districts.id,
//         districts.district,
//         main_god.main_god_id,
//         main_god.god_name
//     FROM Temple
//     INNER JOIN states ON states.id = Temple.state_id
//     INNER JOIN city ON city.id = Temple.city_id
//     INNER JOIN districts ON districts.id = Temple.district_id
//     INNER JOIN main_god ON main_god.main_god_id = Temple.main_god_id
//     `);
//       let iswhere = false;
//       if(req.body.main_god_id !== null && req.body.main_god_id !== '' && typeof(req.body.main_god_id) !== 'undefined'){
//         dbquery += (iswhere? " ": " WHERE ")+ "Temple.main_god_id IN ("+req.body.main_god_id+") ";
//         // dbquery += (isWhere? " ": " WHERE ")+ "country_id = "+req.body.country_id+" ";
//         isWhere = true;
//       }
//       if(req.body.speciality_id !== null && req.body.speciality_id !== '' && typeof(req.body.speciality_id) !== 'undefined'){
//         dbquery += (!iswhere? " WHERE " : "  AND ") + "Temple.speciality_id  IN ( "+req.body.speciality_id+" )";
//         iswhere = true;
//       }
//       if(req.body.pariharam !== null && req.body.pariharam !== '' && typeof(req.body.pariharam) !== 'undefined'){
//         dbquery += (!iswhere? " WHERE " : "  AND ")+ "Temple.pariharam  IN ( "+req.body.pariharam+" )";
//         iswhere = true;
//       }
//       dbConfig.query(
//         dbquery,
//         (err, rows, fields) => {
//           if (!err) res.send(rows);
//           else console.log(err);
//         }
//       );
//     } catch (e) {
//       throw e;
//     }
// };

// get all Temple Values Based on Cuntry , State , District , City , Area
exports.searchGetAllCity = (req, res) => {
  console.log(req.body);
  try {
    let dbquery = `SELECT 
    distinct
    temple.id,
    temple.temple_name,
    temple.main_god_id,
    temple.othergod_id,
    temple.country_id,
    temple.state_id,
    temple.district_id,
    temple.area_id,
    temple.city_id,
    temple.temple_address,
    temple.speciality_id,
    temple.otherspec_id,
    temple.temple_history,
    temple.temple_year,
    temple.temple_amotime,
    temple.temple_amctime,
    temple.temple_pmotime,
    temple.temple_pmctime,
    temple.temple_prasadam,
    temple.temple_tree,
    temple.pariharam,
    temple.festival_ids,
    temple.start_date,
    temple.end_date,
    temple.training_ids,
    temple.incharge_name,
    temple.phone_number,
    temple.temple_mailid,
    temple.temple_website,
    temple.created_date,
    temple.created_by,
    temple.is_active,
    temple.main_image,
    temple.sub_images,
    temple.main_video,
    temple.ticket_id,
    temple.marriage_fee,
    temple.ana_time,
    temple.control_by,
    temple.temple_additional,
    temple.isTicket,
    temple.isMarriage,
    temple.isAnnadhanam,
    temple.temple_bus_route,
    temple.ways_to_reach,
    temple.temple_map,
    temple.pooja_timings,
   states.state,
    city.city,
    districts.district,
    main_god.god_name
FROM temple
INNER JOIN states ON states.id = temple.state_id
INNER JOIN city ON city.id = temple.city_id
INNER JOIN districts ON districts.id = temple.district_id
INNER JOIN main_god ON main_god.main_god_id = temple.main_god_id
`;
    let isWhere = false;

    if (
      req.body.country_id !== null &&
      req.body.country_id !== "" &&
      typeof req.body.country_id !== "undefined"
    ) {
      dbquery +=
        (isWhere ? "  " : " WHERE ") +
        "temple.country_id = " +
        req.body.country_id +
        " ";
      isWhere = true;
    }

    if (
      req.body.state_id !== null &&
      req.body.state_id !== "" &&
      typeof req.body.state_id !== "undefined"
    ) {
      console.log(req.body.state_id, "State");
      dbquery +=
        (!isWhere ? " WHERE " : " AND ") +
        "temple.state_id = " +
        req.body.state_id +
        " ";
      isWhere = true;
    }

    if (
      req.body.district_id !== null &&
      req.body.district_id !== "" &&
      typeof req.body.district_id !== "undefined"
    ) {
      console.log(req.body.district_id, "District");
      dbquery +=
        (!isWhere ? " WHERE " : " AND ") +
        "temple.district_id = " +
        req.body.district_id +
        " ";
      isWhere = true;
    }

    if (
      req.body.city_id !== null &&
      req.body.city_id !== "" &&
      typeof req.body.city_id !== "undefined"
    ) {
      console.log(req.body.city_id, "City");
      dbquery +=
        (!isWhere ? " WHERE " : " AND ") +
        "temple.city_id  = " +
        req.body.city_id +
        " ";
      isWhere = true;
    }

    if (
      req.body.area_id !== null &&
      req.body.area_id !== "" &&
      typeof req.body.area_id !== "undefined"
    ) {
      console.log(req.body.area_id, "area");
      dbquery +=
        (!isWhere ? " WHERE " : " AND ") +
        "temple.area_id = " +
        req.body.area_id +
        " ";
      isWhere = true;
    }

    if (
      req.body.main_god !== null &&
      req.body.main_god !== "" &&
      typeof req.body.main_god !== "undefined"
    ) {
      dbquery +=
        (!isWhere ? " WHERE  " : " AND ") +
        "temple.main_god_id IN (" +
        req.body.main_god +
        ") ";
      isWhere = true;
    }
    if (
      req.body.Specialty_id !== null &&
      req.body.Specialty_id !== "" &&
      typeof req.body.Specialty_id !== "undefined"
    ) {
      dbquery +=
        (!isWhere ? " WHERE " : "  AND ") +
        "temple.speciality_id  IN ( " +
        req.body.Specialty_id +
        " )";
      isWhere = true;
    }
    if (
      req.body.group_id !== null &&
      req.body.group_id !== "" &&
      typeof req.body.group_id !== "undefined"
    ) {
      dbquery +=
        (!isWhere ? " WHERE " : "  AND ") +
        "temple.grouptable_id IN ( " +
        req.body.group_id +
        " )";
      isWhere = true;
    }

    if (
      req.body.pariharam !== null &&
      req.body.pariharam !== "" &&
      typeof req.body.pariharam !== "undefined"
    ) {
      dbquery +=
        (!isWhere ? " WHERE " : "  AND ") +
        "FIND_IN_SET (" +
        req.body.pariharam +
        ", temple.pariharam)";
      isWhere = true;
    }
    if (
      req.body.festival !== null &&
      req.body.festival !== "" &&
      typeof req.body.festival !== "undefined"
    ) {
      dbquery +=
        (!isWhere ? " WHERE " : " AND ") +
        "FIND_IN_SET (" +
        req.body.festival +
        ", temple.festival_ids)";
      isWhere = true;
    }
    console.log(dbquery);
    dbConfig.query(dbquery, (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    });
  } catch (e) {
    throw e;
  }
};
