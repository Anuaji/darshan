const express = require("express");
const router = express.Router();

const speciality = require('../controller/speciality.controller');

router.post('/create', async(req, res) =>{
    try{
        let result = await speciality.create(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
});

router.get('/get/:id', async(req, res) =>{
    try{
        let result = await speciality.get(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
});

router.get('/getall', async(req, res) =>{
    try{
        let result = await speciality.getAll(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
});

router.put('/update/:id', async(req, res) =>{
    try{
        let result = await speciality.update(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
});

router.delete('/delete/:id', async(req, res) =>{
    try{
        let result = await speciality.delete(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
});

router.get('/getSingleSpecality/:specalityId',async(req,res)=>{
    try{
      const result = await speciality.getSingleSpeciality(req);
      res.send(result);
    }catch(err){
      res.status(500).send(err);
    }
})

module.exports = router;

// // Require the controllers WHICH WE DID NOT CREATE YET!!
// const speciality_value_controller = require("../controller/speciality.controller");

// //Url for home page
// router.get("/getAll", speciality_value_controller.specialityGetAll);
// router.get("/getOne/:id", speciality_value_controller.specialityGetOne);
// router.post("/create", speciality_value_controller.specialityCreate);
// router.put("/update/:id", speciality_value_controller.specialityUpdate);
// router.delete("/delete/:id", speciality_value_controller.specialityDelete);

// //Router export
