const express = require('express');
const router = express.Router();
const iyerController = require('../controller/functionname.Controller');

router.post('/createfunction', async (req, res, next) => {
    try {
        let result = await iyerController.createFunction(req);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/getfunction', async (req, res, next) => {
    try {
        let result = await iyerController.getFunction(req);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put('/langrelfunction', async (req, res, next) => {
    try {
        let result = await iyerController.getLangRelFunction(req);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put('/searchfunction', async (req, res, next) => {
    try {
        let result = await iyerController.searchLangRelFunction(req);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});






module.exports = router