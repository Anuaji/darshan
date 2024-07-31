const express = require("express");
const dbConfig = require("../database/config");

const router = express.Router();

// Get all the Booking Fields
router.get("/getAll", (req, res) => {
    try {
        const query = `SELECT * FROM booking_fields`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status(400).json({ status: "Failed" });
            }

            res.json({ status: "Success", result: rows });
        });
    } catch (error) {
        res.status(500).json({ status: "Failed" });
    }
});

// Create Booking Fields
router.post("/create", (req, res) => {
    try {
        const name = req.body.name;

        const query = `INSERT INTO booking_fields(name) VALUES("${name}");`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status(400).json({ status: "Failed", err });
            }

            res.json({ status: "Success", result: rows });
        });
    } catch (error) {
        res.status(500).json({ status: "Failed" });
    }
});

// Update Booking field
router.put("/update/:id", (req, res) => {
    try {
        const name = req.body?.name;
        const id = req.params?.id;

        const query = `UPDATE booking_fields SET name = "${name}" WHERE id = ${id};`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status(400).json({ status: "Failed" });
            }

            res.json({ status: "Success", result: rows });
        });
    } catch (error) {
        res.status(500).json({ status: "Failed" });
    }
});

// Delete Booking Field
router.delete("/delete/:id", (req, res) => {
    try {
        const id = req.params.id;
        console.log("Id", id);
        const query = `DELETE FROM booking_fields WHERE id = '${id}'`;
        dbConfig.query(query, (err, rows) => {
            if (err) {
                return res.status(400).json({ status: "Failed" });
            }

            res.json({ status: "Success", result: rows });
        });
    } catch (error) {
        res.status(500).json({ status: "Failed" });
    }
});

module.exports = router;