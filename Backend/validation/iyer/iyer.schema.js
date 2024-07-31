const Joi = require('joi');

const schema = {
    iyerRegister : Joi.object({
        name: Joi.string().alphanum().min(3).max(100).required(),
        country: Joi.number().integer().min(1).max(999).required(),
        state: Joi.number().integer().min(1).max(999).required(),
        district: Joi.number().integer().min(1).max(999).required(),
        city: Joi.number().integer().min(1).max(999).required(),
        inside_temple: Joi.number().integer().min(1).max(999),
        outside_temple: Joi.number().integer().min(1).max(999),
        area: Joi.number().integer().min(1).max(999).required(),
        address: Joi.string().min(3).max(100).required(),
        pincode: Joi.number().integer().min(100000).max(999999).required(),
        phone: Joi.number().integer().min(1000000000).message('Invalid mobile number').max(9999999999).message('Invalid mobile number').required(),
        secondary_number: Joi.number().integer().min(1000000000).max(9999999999),
        whatsapp_number: Joi.number().integer().min(1000000000).max(9999999999),
        email: Joi.string().email(),
        password: Joi.string().alphanum().min(6).max(20).required()
    }),

    iyerLogin : Joi.object({
        phone: Joi.required(),
        password: Joi.required()
    }),

    insideTempleCreate : Joi.object({
        FunctionInsideTheTemple: Joi.required()
    }),
    
    insideTempleUpdate : Joi.object({
        FunctionInsideTheTempleID: Joi.required(),
        FunctionInsideTheTemple: Joi.required()
    })
};

module.exports = schema;

