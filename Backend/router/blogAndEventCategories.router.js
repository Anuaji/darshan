const express = require('express');
const router = express.Router();
const categoryController = require('../controller/blogAndEventCategories.controller');
const { categoriesValidation, deleteCategoriesValidation, updateCategoriesValidation } = require('./../validation/admin/admin.validation');

router.get('/getcategories', async (req,res,next)=>{
    try{
    let result = await categoryController.getCategories(req);
    res.send(result)
    }catch(err){
    console.log(err);
    res.status(500).send(err);
    }
    });

router.get('/getsinglecategories/:id', async (req,res,next)=>{
        try{
        let result = await categoryController.getSingleCategories(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
        }
        });

router.post('/create', categoriesValidation, async (req,res,next)=>{
        try{
        let result = await categoryController.create(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
        }
        });

router.post('/delete', deleteCategoriesValidation, async (req,res,next)=>{
            try{
            let result = await categoryController.delete(req);
            res.send(result)
            }catch(err){
            console.log(err);
            res.status(500).send(err);
            }
            }); 
            
router.put('/update', updateCategoriesValidation, async (req,res,next)=>{
  try{
        let result = await categoryController.update(req);
        res.send(result)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}); 

module.exports = router;