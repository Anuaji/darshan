const express = require('express');
const router = express.Router();
const functionTypeController = require('../controller/functiontype.controller');

router.post('/createfunctiontype', async (req,res,next)=>{
try{
let result = await functionTypeController.createFunctionType(req);
res.send(result)
}catch(err){
console.log(err);
res.status(500).send(err);
}
} );

router.get('/getfunctiontype', async (req,res,next)=>{
    try{
    let result = await functionTypeController.getFunctionType(req);
    res.send(result)
    }catch(err){
    console.log(err);
    res.status(500).send(err);
    }
    } );
    
    router.get('/getAllFunctionType', async (req,res,next)=>{
        try{
        let result = await functionTypeController.getAllFunctionType(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
        }
        } );



router.put('/updatefunctiontype/:id', async (req,res,next)=>{
    try{
    let result = await functionTypeController.editFunctionType(req);
    res.send(result)
    }catch(err){
    console.log(err);
    res.status(500).send(err);
    }
    } );

    router.delete('/deleteFunctionType/:id', async (req,res,next)=>{
        try{
        let result = await functionTypeController.deleteFunctionType(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
        }
        } );

// router.post('/login', async(req, res, next) => {
// try{
// let result = await iyerController.login(req);
// res.send(result);
// }catch(error){
//     res.status(500).send(error);
// }
// })

module.exports = router