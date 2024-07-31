const express = require('express');
const router = express.Router();
const iyerController = require('../controller/iyerlanguage.Controller');

router.post('/createlanguage', async (req,res,next)=>{
try{
let result = await iyerController.createLanguage(req);
res.send(result)
}catch(err){
console.log(err);
res.status(500).send(err);
}
});

router.get('/getlanguage', async (req,res,next)=>{
    try{
    let result = await iyerController.getLanguage(req);
    res.send(result)
    }catch(err){
    console.log(err);
    res.status(500).send(err);
    }
    });





module.exports = router