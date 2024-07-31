const express = require('express');

const router = express.Router();

const functionOutsideTheTempleOptionsController = require('../controller/functionOutsideTheTempleOptionsList.controller')


router.get('/getAll', async(req, res) => {
    try{
      const result = await functionOutsideTheTempleOptionsController.getAll();

      res.send(result);
    }catch(e){
       res.send(e);
    }
})


// get single outside temple function

router.get('/getsingleoutsidefunction/:id', async (req,res,next)=>{
  try{
  let result = await functionOutsideTheTempleOptionsController.getSingleOutsideFuction(req);
  res.send(result)
  }catch(err){
  res.status(500).send(err);
  }
  });

router.post('/create', async(req, res) => {
    try{
      const result = await functionOutsideTheTempleOptionsController.create(req);

      res.send(result);
    }catch(e){
       res.send(e);
    }
})

router.put('/updateOne/:id', async(req, res) => {
    try{
      const result = await functionOutsideTheTempleOptionsController.updateOne(req);

      res.send(result);
    }catch(e){
       res.send(e);
    }
})

router.delete('/deleteOne/:id', async(req, res) => {
    try{
      const result = await functionOutsideTheTempleOptionsController.deleteOne(req);

      res.send(result);
    }catch(e){
       res.send(e);
    }
})

module.exports = router;