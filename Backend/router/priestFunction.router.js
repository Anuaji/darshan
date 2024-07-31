const express = require("express");
const router = express.Router();
const dbConfig = require("../database/config");

// Get all the functions, or all inside or outside function
router.get("/getAll", (req, res) => {
    try {
        dbConfig.query(`SELECT * FROM priest_function ${req.query?.searchBy ? `WHERE function_type=${req.query.searchBy}` : ""}`, (err, rows) => {
            if (err) {
                return res.status("500").json({ status: "Failed" });
            }

            return res.json({ status: "Success", result: rows });
        });

    } catch (error) {
        res.status("500").json({ status: "Failed", error });
    }
});

// Create function
router.post("/create", (req, res) => {
    try {
        const function_name = req.body?.function_name;
        const function_type = req.body?.function_type;

        const query = `INSERT INTO priest_function (function_name, function_type) VALUES("${function_name}", ${function_type});`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status("500").json({ status: "Failed" });
            }

            return res.json({ status: "Success", result: rows });
        });

    } catch (error) {
        res.status(500).json({ status: "Failed", error });
    }
});

// update function
router.put("/update/:id", (req, res) => {
    try {
        const function_name = req.body?.function_name;
        const id = req.params?.id;

        const query = `UPDATE priest_function SET function_name="${function_name}" WHERE id=${id};`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status("500").json({ status: "Failed", err });
            }

            return res.json({ status: "Success", result: rows });
        });

    } catch (error) {
        res.status(500).json({ status: "Failed", error });
    }
});


// delete function
router.delete("/delete/:id", (req, res) => {
    try {
        const id = req.params?.id;

        const query = `DELETE FROM priest_function WHERE id=${id}`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status("500").json({ status: "Failed", err });
            }

            return res.json({ status: "Success", result: rows });
        });

    } catch (error) {
        res.status(500).json({ status: "Failed", error });
    }
});


module.exports = router;