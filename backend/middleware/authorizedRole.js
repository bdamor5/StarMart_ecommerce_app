const ErrorHandler = require("../utils/ErrorHandler");

exports.authorizedRole = (...roles) => {

    return (req,res,next) =>{

        if(roles.includes(req.user.role)){
            next();
        }else{
            return next(new ErrorHandler(`This User is not authorized to access this resource`,403))
        } 
               
    }    
}