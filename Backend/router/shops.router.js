const express = require('express');
const router = express.Router();

const shops_controller = require('../controller/shops.controller');

router.post('/create',shops_controller.createShop);
router.get("/getAll", shops_controller.shopsGetAll);
router.post("/changeStatus", shops_controller.changeStatus);

module.exports=router;
