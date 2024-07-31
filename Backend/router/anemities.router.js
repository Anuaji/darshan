const express = require('express');

const router = express.Router();
var anemities = require('../controller/anemities.controller');

router.get('/getAll', async (req, res) => {
    try {
        let result = await anemities.getAll();
        // console.log(result);
        res.send(result);
    } catch (e) {
        console.log(e);
        res.send({ status: 500, message: e });
    }
});

router.get('/getOneAmenities/:AmenitiesId', async (req, res, next) => {
    try {
        let result = await anemities.getSingleAmenities(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/deleteAmenities/:id', async (req, res, next) => {
    try {
        let result = await anemities.delete(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/createAmenities', async (req, res, next) => {
    try {
        let result = await anemities.create(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



router.put('/updateAmenities/:AmenitiesId', async (req, res, next) => {
    try {
        let result = await anemities.updateanemeties(req);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



module.exports = router;