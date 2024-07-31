const express = require("express");
const router = express.Router();
const trainerCategoriesList = require("../controller/trainercategoriesList.controller");
router.post('/create', async(req,res) => {
  try{
    const result = await trainerCategoriesList.categoriesListCreate(req);
   res.send(result);
  }catch(err){
     res.send(err);
  }
})
router.put('/update/:id',async(req,res)=>{
  try{
 const result = await trainerCategoriesList.updatecategoriesList(req);
 res.send(result);
  }catch(err){
    res.status(500).send(err);
  }
})
router.get('/getall',async(req,res)=>{
  try{
 const result = await trainerCategoriesList.getallCategoriesList(req);
 res.send(result);
  }catch(err){
    res.status(500).send(err);
  }
})
router.get('/getone/:id',async(req,res)=>{
  try{
const result = await trainerCategoriesList.getoneCategoriesList(req);
res.send(result);
  }catch(err){
    res.status(500).send(err);
  }
})
router.delete('/delete/:id',async(req,res)=>{
  try{
const result = await trainerCategoriesList.deleteCategoriesList(req);
res.send(result);
  }catch(err){
    res.status(500).send(err);
  }
})
// router.post('/create',async(req,res)=>{
//     try{
//   let result = await trainerCategoriesList.categoriesListCreate(req);
//   res.send(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })
module.exports = router;