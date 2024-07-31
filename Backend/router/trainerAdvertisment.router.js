const express = require('express');
const router = express.Router();
var advertisementController = require('../controller/trainerAdvertisment.controller');

router.post('/upload',advertisementController.createnewAdvertisment);

router.get('/getAllTrainerAd',async(req,res)=>{
    try{
        let result = await advertisementController.gettraineerAdvertisement(req);
        res.status(200).send(result);
    }catch(err){
        res.status(500).send("error occured");
    }
})

module.exports = router;