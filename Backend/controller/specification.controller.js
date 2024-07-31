const dbConfig = require("../database/config");

exports.specGetAll = (req, res) => {
	try {
		dbConfig.query("SELECT * FROM specification", (err, rows, field) => {
			if (!err) {
				// console.log(rows, "here");
				res.send(rows);
			} else console.log(err);
		});
	} catch (e) {
		throw e;

	}
};

exports.specCreate = (req, res) => {
	// var id = req.body.id;
	var specification = req.body.specification;
	// var created_by = req.body.created_by;
	// var is_active = req.body.is_active;

	var sql = `INSERT INTO specification
      (specification) VALUES
        ("${specification}")`;
	console.log(sql, "here");
	dbConfig.query(sql, function (err, rows, result) {
		if (err) throw err;
		console.log("Record Inserted");
		res.send(rows);
	});
};
exports.getCount = (req, res) => {
	try {
		dbConfig.query(
			"SELECT COUNT(id) AS count FROM specification",
			(err, rows, fields) => {
				if (!err) res.send(rows);
				console.log(res, "COUNT VALUES");
			}
		);
	} catch (e) {
		throw e;
	}
};
exports.getOne = (req, res) => {
	console.log(req.params.id);
	dbConfig.query(
		`SELECT * FROM specification WHERE id = ${req.params.id}`,
		(err, rows, fields) => {
			if (!err) res.send(rows);
			else console.log(err);
		}
	);
};
exports.get_specList = (req, res) => {
	try {
		dbConfig.query(
			"SELECT DISTINCT specification FROM specification",
			(err, rows, fileds) => {
				if (!err) {
					res.send(rows);
				}
			}
		);
	} catch (e) {
		throw e;
	}
};
exports.specUpdate = (req, res) => {
	var id = req.params.id;
	var specification = req.body.specification;
	// var created_by = req.body.created_by;
	// var is_active = req.body.is_active;

	var sql = `UPDATE specification SET specification="${specification}"
	 WHERE id="${id}" `;
	dbConfig.query(sql, function (err, rows, result) {
		if (err) throw err;
		console.log("Record Inserted", sql);
		res.send(rows);
	});
};
exports.specDelete = (req, res) => {
	dbConfig.query(
		`DELETE FROM specification WHERE id = ${req.params.id}`,
		(err, rows, fields) => {
			if (!err) res.send(rows);
			else console.log(err);
		}
	);
};
