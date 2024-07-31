const express = require('express');
const router = express.Router();

const trainersubcategorylistController = require('../controller/trainerSubCategoryList.controller');

router.post('/create',async (req,res) =>{
    try{
       const result = await trainersubcategorylistController.createNewTrainerSubCategory(req.body);
       res.send(result);
    }catch(error){
        console.log("Error!",error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getAllTrainerSubCategoriesByUsingCategoryId',async (req,res) =>{
    try{
       const result = await trainersubcategorylistController.getAllTrainerSubCategoriesByUsingCategoryId(req.params);
       res.send(result);
    }catch(error){
        console.log("Error!",error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/getSingleTrainerSubCategoriesByUsingCategoryId/:trainerCategoryId',async (req,res) =>{
    try{
       const result = await trainersubcategorylistController.getSingleTrainerSubCategoriesByUsingCategoryId(req);
       res.send(result);
    }catch(error){
        console.log("Error!",error);
        res.status(500).send("Internal Server Error");
    }
});
router.delete('/deleteTrainerCategoriesList/:id',async(req,res)=>{
    try{
  const result = await trainersubcategorylistController.deleteTrainerSubcategoreis(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
});
router.put('/update/:id',async(req,res)=>{
    try{
  const result = await trainersubcategorylistController.updateTrainerSubcategorieslist(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;