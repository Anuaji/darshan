const Joi = require('joi');

const schema = {
    category : Joi.object({
        categoryName: Joi.string().min(3).max(100).required()
    }),
    deletecategory : Joi.object({
        id: Joi.required()
    }),
    updatecategory : Joi.object({
        id: Joi.required(),
        categoryName: Joi.string().min(3).max(100).required()
    })
};

module.exports = schema;

