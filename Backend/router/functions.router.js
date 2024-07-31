const express = require("express");
const router = express.Router();
const functionsController = require("../controller/functions.controller");
// router.post('/create',async(req,res) =>{
//     try{
//     let result = await functionsController.create(req);
//     res.send(result);
//     }catch(e){
//     res.status(500).send(e);
//     }
// })

// router.put("/updateFunctions/:functionId", async (req, res) => {
//     try {
//       let result = await functionsController.updateFunctions(req);
//       res.send(result);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });

router.post("/create", functionsController.createFunction);
router.put("/update/:id", functionsController.updateFunction);

router.get("/getAll", functionsController.getAllFunction);

router.get("/getOneFunction/:functionId", async (req, res) => {
  try {
    let result = await functionsController.getSingleFunction(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.delete("/deleteFunction/:functionId", async (req, res) => {
  try {
    let result = await functionsController.deleteFunction(req);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
