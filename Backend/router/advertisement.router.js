const express = require('express');
const router = express.Router();
var advertisementController = require('../controller/advertisement.controller');

router.post('/upload',advertisementController.createAdvertisement);
router.get('/vendorAdvertisement/:vendorId',async(req,res)=>{
    try{
        let result = await advertisementController.getAdvertisement(req);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send("error occured");
    }
})

module.exports = router
