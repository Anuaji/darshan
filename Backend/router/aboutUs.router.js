const express = require('express');

const router = express.Router();
const aboutController = require('../controller/aboutUs.controller');
const dbConfig = require("../database/config");
require("dotenv").config();



router.post("/update", async (req, res) => {
    try {
        const title = req.body?.title;
        const description = req.body?.description;

        const selectQuery = `SELECT id FROM about where id='1'`;
        const updateQuery = `UPDATE about SET aboutTitle = "${title}", AboutDescription = "${description}" WHERE id = 1`;
        const insertQuery = `INSERT INTO about (id,aboutTitle,AboutDescription) VALUES ('1',"${title}","${description}")`;

        dbConfig.query(selectQuery, (err, result) => {
            if (err) return res.status(400).json({ status: "Failed" });

            if (result?.length) {
                dbConfig.query(updateQuery, (err, result) => {
                    if (!err) {
                        return res.status(200).json({ status: "Success", result });
                    }
                });
            }

            dbConfig.query(insertQuery, (err, result) => {
                if (!err) return res.status(200).json({ status: "Success", result });
            });

        });
    } catch (error) {
        res.status(500).json({ status: "FAILED", error });
    }
});


router.get("/getOne", (req, res) => {
    try {
        const selectQuery = `SELECT aboutTitle as title,AboutDescription as description FROM about where id='1'`;
        dbConfig.query(selectQuery, (err, result) => {
            if (err) return res.status(401).json({ status: "FAILED" });

            res.json({ status: "Success", result });
        });

    } catch (error) {
        res.status(500).json({ status: "FAILED" });
    }
});


router.post('/create', async (req, res) => {
    try {
        let result = await aboutController.create(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/getAll', async (req, res) => {
    try {
        let result = await aboutController.getAll(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let result = await aboutController.deleteAboutus(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.get('/getOneAboutus/:id', async (req, res) => {
    try {
        let result = await aboutController.getSingleAbout(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;