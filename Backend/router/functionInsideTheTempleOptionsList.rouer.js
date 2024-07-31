const express = require('express');
const router = express.Router();
const { insideFunctionCreateValidation, insideFunctionUpdateValidation } = require('./../validation/iyer/iyer.validation');
const insideFunction = require('../controller/functionInsideTheTempleOptionsList.controller');


// get inside temple

router.get('/getall', async (req,res,next)=>{
try{
let result = await insideFunction.getAll(req);
res.send(result)
}catch(err){
res.status(500).send(err);
}
});

// get single inside temple

router.get('/getsingleinsidefunction/:id', async (req,res,next)=>{
    try{
    let result = await insideFunction.getSingleInsideFuction(req);
    res.send(result)
    }catch(err){
    res.status(500).send(err);
    }
    });

// create
router.post('/create', async (req,res,next)=>{
try{
    let result = await insideFunction.create(req);
    res.send(result)
    }catch(err){
    res.status(500).send(err);
}
});

// Update

router.put('/update/:id', async (req,res,next)=>{
    try{
        let result = await insideFunction.update(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
    });

// Delete

router.delete('/delete/:id', async (req,res,next)=>{
    try{
        let result = await insideFunction.delete(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
    }
    });

    //getAll function name

    router.get('/getAllfunctionName/:id', async (req,res,next)=>{
        try{
        let result = await insideFunction.getAllfunctionName(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
        }
        });
    

module.exports = router;