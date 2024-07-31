const express = require('express');
const dbConfig = require('../database/config');
const router = express.Router();

const group = require('./../controller/grouptable.controller');

router.post('/create', async (req, res) => {
    try {
        let result = await group.create(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        dbConfig.query(`update grouptable set group_name="${req.body?.group_name}" where id=${req.params?.id}`, (err, rows) => {
            if (!err) {
                return res.json({ status: "Success", result: rows });
            }
            res.status(400).json({ status: "Failed", err });
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getall', async (req, res) => {
    try {
        let result = await group.getAll(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getsingleData/:id', async (req, res) => {
    try {
        let result = await group.getSingleData(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        let result = await group.delete(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;