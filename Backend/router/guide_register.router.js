const express = require('express');
const router = require("express").Router();

const Guide = require('../controller/guide_register.controller');
const auth=require('../middleware/auth')


router.post("/registerGuide",Guide.registerGuide)

    router.post("/guidelogin", Guide.login);

    router.get('/getOne/:id', Guide.getoneGuide);

    router.put("/update/:id", Guide.updateUser);


     

    
// router.get('/getSingleGuide/:id',async(req,res)=>{
//     try{
//   let result = await guidecontroller.getSingleGuide(req);
//   res.send(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// });
// router.put('/updateGuide/:id',async(req,res)=>{
//     try{
//   let result = await guidecontroller.updateGuide(req);
//   res.send(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })
// router.get('/getallGuide',async(req,res)=>{
//     try{
//   let result = await guidecontroller.getallGuide(req);
//   res.send(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })
// router.delete('/deleteGuide/:id',async(req,res)=>{
//     try{
//  let result = await guidecontroller.deleteGuide(req);
//  res.send(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

    module.exports = router