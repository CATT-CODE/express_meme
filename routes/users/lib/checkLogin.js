const {checkIsEmpty, checkIsEmail} = require("./authMethods.js");

function checkLoginEmptyMiddleware(req, res, next) {
    let errorObj = {};
    const {email, password} = req.body;

    if(checkIsEmpty(email)) {
        errorObj.email = "Email can not be empty"
    }
    if (!checkIsEmail(email)) {
        errorObj.email = "It must be in email format!";
    }
    if(checkIsEmpty(password)) {
        errorObj.password = "Password can not be empty"
    }

    if (Object.keys(errorObj).length > 0) {
        res.render("login", {success: null, error: errorObj});
    } else {
        next();
    }
}

function checkEmailFormat(req, res, next) {
    let errorObj = {};
    
    const { email } = req.body;
    if (!checkIsEmail(email)) {
        errorObj.email = "It must be in email format!";
    }
    if (Object.keys(errorObj).length > 0) {
        res.status(500).json({
            message: "error",
            data: errorObj,
        });
    } else {
        next();
    }
}

module.exports = {
    checkLoginEmptyMiddleware,
    checkEmailFormat
}