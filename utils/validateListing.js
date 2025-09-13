const {listingSchema} = require("../scheme.js")
const CustomError = require("../utils/CustomError.js")
function validateListing(req, res, next){
    console.log("Erroring")
    console.log(req.body)
    let {error} = listingSchema.validate(req.body)
    console.log(error)
    if(error){
         errMsg = error.details.map((el)=> el.message).join(",");
        throw new CustomError(400, errMsg)
       
    }
    next()
}
module.exports = validateListing;