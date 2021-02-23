const { isLength } = require('validator');


const checkSignupInputIsEmpty = (req, res, next) => {
    let errorObj = {};

    const {firstName, lastName, email, password} = req.body;

    if (!isLength(firstName, {min: 2, max: 20})) {
        errorObj.firstName = "first name must be between 2 and 20 characters";
        
    }
    if (!isLength(lastName, {min: 2, max: 20})) {
        errorObj.lastName = "last name must be between 2 and 20 characters";
    }
    if (password.length === 0) {
        errorObj.password = "Password can not be blank";
    }

    if (Object.keys(errorObj).length > 0) {
        res.render("sign-up", {success: null, error: errorObj});
        
        // res.status(500).json({
        //     message: "error",
        //     data: errorObj,
        // })
    } else {
        next();
    }
}

module.exports = {
    checkSignupInputIsEmpty,
};