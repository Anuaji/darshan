const express = require('express');
const router = express.Router();
const astrologerBookingController = require('../controller/astrologerBooking.controller');

router.post('/create',async (req,res)=>{
    try{
    const result = await astrologerBookingController.create(req);

    res.send(result);
    }catch(error){
        console.log("Error!",error);
        res.status(500).send('internal server error');
    }
});


router.get('/getAllBooking',async (req,res) => {
    try{
        const result = await astrologerBookingController.getAllBooking();
        res.send(result);
    }catch(error){
        res.json({
            status:500,
            message:"Internal Server Error"
        })
    }
})


router.get('/getAllBookings',async (req,res) => {
    try{
        const result = await astrologerBookingController.getAllBookings();
        res.send(result);
    }catch(error){
        res.json({
            status:500,
            message:"Internal Server Error"
        })
    }
})

router.get('/getBookingDetails/:bookingID',async (req,res) => {
    try{
        const result = await astrologerBookingController.getBookingDeatils(req.params);
        res.send(result);
    }catch(error){
        res.json({
            status:500,
            message:"Internal Server Error"
        })
    }
})

router.put('/updateIsAdminApproveStatus/:id', async (req,res)=>{
    try{
        let result = await astrologerBookingController.updateIsAdminApproveStatus(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
  });
  
  router.put('/updateAstrologerApproveStatus/:id', async (req,res)=>{
    try{
        let result = await astrologerBookingController.updateAstrologerApproveStatus(req);
        res.send(result)
        }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
  });


module.exports = router;