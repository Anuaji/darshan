const express = require('express');
const router = express.Router();

const trainercontroller = require('../controller/trainer_register.controller');
const auth=require('../middleware/auth')
router.post('/trainerRegister', async (req,res)=>{
    try{
    let result = await trainercontroller.createRegister(req);
    res.send(result)
    }catch(err){
    res.status(500).send(err);
    }
    } );

    router.post('/login', async (req,res)=>{
        try{
        let result = await trainercontroller.login(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
        }
        } );
    
        router.get('/getSingleTrainer/:id', async (req, res) => {
            try {
              const trainer = await trainercontroller.getSingleTrainer(req);
              res.send(trainer);
            } catch (err) {
              res.status(err.status || 500).send(err.message);
            }
          });
          
router.put('/updateTrainer/:id',async(req,res)=>{
    try{
  let result = await trainercontroller.updateTrainer(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/getallTrainer',async(req,res)=>{
    try{
  let result = await trainercontroller.getallTrainer(req);
  res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})
router.delete('/deleteTrainer/:id',async(req,res)=>{
    try{
 let result = await trainercontroller.deleteTrainer(req);
 res.send(result);
    }catch(err){
        res.status(500).send(err);
    }
})

    module.exports = router