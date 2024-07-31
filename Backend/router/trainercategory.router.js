const express = require('express');
const router = express.Router();

const trainerCategoryController = require('../controller/trainercategory.controller');

router.post('/create', async (req, res, next) => {
    try {
        let result = await trainerCategoryController.create(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getalltrainercategory', async (req, res) =>{
    try {
        let result = await trainerCategoryController.getAll(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/deletetrainercategory/:categoryId', async (req, res) =>{
    try {
        let result = await trainerCategoryController.delete(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.put('/updatetrainercategory/:categoryId', async (req, res) =>{
    try {
        let result = await trainerCategoryController.update(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/getonetrainercategory/:categoryId', async (req, res) =>{
    try {
        let result = await trainerCategoryController.getOne(req);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})



module.exports = router

