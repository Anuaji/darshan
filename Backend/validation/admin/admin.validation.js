const { category, deletecategory, updatecategory } = require('../admin/admin.schema');

module.exports = {
    categoriesValidation : async(req, res, next) =>{
        const value = await category.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    },
    deleteCategoriesValidation : async(req, res, next) =>{
        const value = await deletecategory.validate(req.body);
        if(value.error){
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        }else{
                next();
            }
    },
    updateCategoriesValidation : async(req, res, next) =>{
        const value = await updatecategory.validate(req.body);
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