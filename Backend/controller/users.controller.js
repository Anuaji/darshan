const dbConfig = require("../database/config");

//templegetUser-login get all
exports.templeGetUser = (req, res) => {
  dbConfig.query(
    `SELECT Temple.*, main_god.god_name, districts.district, states.state, city.city FROM Temple 
    LEFT JOIN
    districts
    ON districts.id = Temple.district_id
    LEFT JOIN
    states 
    ON states.id = Temple.state_id
    LEFT JOIN
    city 
    ON city.id = Temple.city_id
    LEFT JOIN
    main_god 
    ON main_god.main_god_id = Temple.main_god_id
    WHERE Temple.district_id = "${req.body.district_id}" OR Temple.city_id ="${req.body.city_id}"
    ORDER BY Temple.id DESC;`,
    (err, rows, field) => {
      if (!err) {
        console.log(rows, "line-9");
        res.send(rows);
      } else console.log(err);
    }
  );
};

//templegetUser-login get all
exports.templefav_god = (req, res) => {
  console.log(req.params.id, "line-32");
  dbConfig.query(
    `SELECT Temple.*, main_god.god_name, districts.district, states.state, city.city FROM Temple 
    LEFT JOIN
    districts
    ON districts.id = Temple.district_id
    LEFT JOIN
    states 
    ON states.id = Temple.state_id
    LEFT JOIN
    city 
    ON city.id = Temple.city_id
    LEFT JOIN
    main_god 
    ON main_god.main_god_id = Temple.main_god_id
    WHERE Temple.main_god_id = "${req.params.id}"
    ORDER BY Temple.id DESC;`,
    (err, rows, field) => {
      if (!err) {
        console.log(rows, "line-50");
        res.send(rows);
      } else console.log(err);
    }
  );
};

exports.getSingleUser = (req, res) => {
  let id = req.params.id;
  dbConfig.query(
    `SELECT userregister.*, countries.country, districts.district, states.state, city.city, area.area_name 
    FROM site_user 
    LEFT JOIN
    countries
    ON countries.id = userregister.CountryId
    LEFT JOIN
    districts
    ON districts.id = userregister.DistrictId
    LEFT JOIN
    states 
    ON states.id = userregister.StateId
    LEFT JOIN
    city 
    ON city.id = userregister.CityId
    LEFT JOIN
    area
    ON area.area_id = userregister.AreaId
    WHERE userregister.id = ${id}`,
    (err, rows, field) => {
      if (!err) {
        console.log(rows, "line-9");
        res.send(rows);
      } else console.log(err);
    }
  );
};
