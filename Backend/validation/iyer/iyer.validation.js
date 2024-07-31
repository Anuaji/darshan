const { iyerRegister, iyerLogin, insideTemple } = require('../iyer/iyer.schema');

module.exports = {
    iyerRegisterValidation : async(req, res, next) =>{
        const value = await iyerRegister.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    },

    iyerLoginValidation : async(req, res, next) =>{
        const value = await iyerLogin.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    },
    insideFunctionCreateValidation : async(req, res, next) =>{
        const value = await insideTempleCreate.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    },

    insideFunctionUpdateValidation : async(req, res, next) =>{
        const value = await insideTempleUpdate.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    }
}