const express = require('express');
const router = express.Router();

const categoriesListController = require('../controller/categoriesList.controller');
const selectCategoryVendor = require('../controller/templeservices.controller');

router.get('/getCategories', categoriesListController.getAllCategories);
router.post('/create', categoriesListController.createNewCategory);
router.get('/getroutes/:id', categoriesListController.getAllRoutes);
router.put('/update/:id', categoriesListController.categoriesUpdate);
router.delete('/delete/:id', categoriesListController.Deleteone);



router.get('/getSingleCategory/:categoryId', async (req, res, next) => {
  try {
    let result = await categoriesListController.getSingleCategoty(req);
    console.log("result", result);
    res.send(result);
  } catch (e) {
    console.log("Error!!", e);
    res.send({ status: 500, message: "error occured" });
  }
});
module.exports = router;
