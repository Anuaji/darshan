const express = require('express');
const router = express.Router();
const subcategorylistController = require('../controller/subCategoriesList.controller');

router.get('/getSubCategories/:categoryId',subcategorylistController.getSubCategories);

router.post('/create',subcategorylistController.createNewCategory);
router.get('/getSubCategoriesWithCityID/:city_id',subcategorylistController.selectSubCategoriesWithCityId);

router.get('/getAllSubcategories',async(req,res,next) => {
try{
let result = await subcategorylistController.getAllSubCategories();
res.send(result);
}catch(e){
    res.status(500).send(err)
}
})

router.get('/getSingleSubCategory/:subCategoryId', async(req,res,next) => {
    try{
      let result = await subcategorylistController.getSingleSubcategory(req);
      console.log("result",result);
      res.send(result);
    }catch(e){
        console.log("Error!!",e);
        res.send({status:500, message:"error occured"});
    }
})
router.delete('/deleteSubcategoriesList/:subCategoryId',async(req,res)=>{
    try{
   let result = await subcategorylistController.deleteSubCategoriesList(req);
   res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})
router.put('/update/:SubCategoryId',async(req,res)=>{
    try{
      let result = await subcategorylistController.updateSingleSubCategory(req);
      res.send(result);
    }catch(err){
      res.status(500).send(err);
    }
})
module.exports = router;
