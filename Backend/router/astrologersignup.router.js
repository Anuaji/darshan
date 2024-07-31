const express = require('express');
const router = express.Router();
const astrologercontroller = require('../controller/astrologersignup.controller');
const auth = require('../middleware/auth')
router.post('/astrologerregister', async (req, res, next) => {
    try {
        let result = await astrologercontroller.createRegister(req);
        res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let result = await astrologercontroller.login(req);
        res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/getSingleAstrologer/:id', async (req, res) => {
    try {
        let result = await astrologercontroller.getSingleAstrologer(req);
        res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
})
router.put('/updateAstrologer/:id', async (req, res) => {
    try {
        let result = await astrologercontroller.updateAstrologer(req);
        res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
})
router.get('/getallAstrologer', async (req, res) => {
    try {
        let result = await astrologercontroller.getallAstrologer(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.delete('/deleteAstrologer/:id', async (req, res) => {
    try {
        let result = await astrologercontroller.deleteAstrologer(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})
module.exports = router