const express = require('express');
const router = express.Router();

const templeFilter = require('../controller/templeeventfilter.controller');

router.post('/filterevent', async (req,res, next)=>{
    try{
    let result = await templeFilter.filterEvents(req);
    res.send(result)
    }catch(err){
    res.status(500).send(err);
    }
    } );

    router.get('/categoryfilter/:id', async (req,res, next)=>{
        try{
        let result = await templeFilter.categoryFilter(req);
        res.send(result)
        }catch(err){
        res.status(500).send(err);
        }
        } );  

module.exports = router;