
    // const login = require("../controller/vendor-login.controller");

    // var router = require("express").Router();

    // router.get("/:id", login.findOne);

    // app.use("/api/login", router);


    // module.exports = router;




const express = require("express")
const router = express.Router();


const vendors = require("../controller/vendor-login.controller");

router.get("/get/:id", vendors.findOne);
// router.post("/create", vendors.vendors_insert);

module.exports = router;