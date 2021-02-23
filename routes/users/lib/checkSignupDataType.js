const { isAlpha } = require('validator');
const { checkIsEmail } = require('./authMethods');

function checkSignupDataType(req, res, next) {
    let errorObj = {};

    const {firstName, lastName, email, password} = req.body;

    if (!isAlpha(firstName)) {
        errorObj.firstName = "first name must contain only alpha characters";
        
    }
    if (!isAlpha(lastName)) {
        errorObj.lastName = "last name must contain only alpha characters";
    }
    if (!checkIsEmail(email)) {
        errorObj.email = "Email must be in email format"
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
};

module.exports = {
    checkSignupDataType
};