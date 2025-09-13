const { reviewSchema} = require("../scheme.js")
const CustomError = require("../utils/CustomError.js");


function validateReview(req, res, next){
    console.log("Erroring")
    console.log(req.body)
    let {error} = reviewSchema.validate(req.body)
    
    if(error){
         errMsg = error.details.map((el)=> el.message).join(",");
        console.log("error: ", error)

        throw new CustomError(400, errMsg)
    }
    next()
}
module.exports = validateReview;