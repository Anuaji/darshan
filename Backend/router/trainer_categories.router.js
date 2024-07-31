const express = require('express');
const router = express.Router();

const trainercategories = require('../controller/trainer_categories.controller');
router.post('/create',async(req,res)=>{
    try{
 let result = await trainercategories.create(req);
 res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/getSingleTrainerCategories/:id',async(req,res)=>{
    try{
  let result = await trainercategories.getSingleTrainerCategories(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/getAll',async(req,res)=>{
    try{
  let result = await trainercategories.getallTrainerCategories(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try{
 let result = await trainercategories.deleteTrainerCategories(req);
 res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router