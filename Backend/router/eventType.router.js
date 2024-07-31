const express = require('express');

const router = express.Router();

const eventTypeController = require('../controller/eventType.controller');


router.post('/createNewEventType',async(req,res) =>{
    try{
      const result = await eventTypeController.create(req);
      res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get('/getAllEventTypes',async(req,res) =>{
    try{
      const result = await eventTypeController.getAllEventTypes();
      res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get('/getSingleEventType/:eventTypeId',async(req,res) =>{
    try{
      const result = await eventTypeController.getSingleEventType(req);
      res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

router.put('/updateSingleEventType/:eventTypeId',async(req,res) =>{
    try{
      const result = await eventTypeController.updateEventType(req);
      console.log(result);
      res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

router.delete('/deleteSingleEventType/:eventTypeId',async(req,res) =>{
    try{
      const result = await eventTypeController.deleteEventType(req);
      res.send(result);
    }catch(error){
        res.status(500).send(error);
    }
})

module.exports = router;
