var express = require('express');
var router = express.Router();


const {
  getAllUsers,
  signup,
  login,
  deleteUserByEmail,
  deleteUserByID,
  updateUserByID,
  updateUserByEmail,
  home,
} = require("./controller/userController");

const { checkSignupInputIsEmpty } = require("./lib/checkSignupInput");
const { checkSignupDataType } = require("./lib/checkSignupDataType");

const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin")

const {createUserGET, loginGET, homeGet, logoutGet} = require("./lib/getRequest");

router.get('/create-user', createUserGET);

router.get("/login", loginGET);

// const User = require("./model/User");

/* GET users listing. */
router.get("/home", homeGet);

router.post("/home", home);

// V1
// router.post("/create-user", function (req, res) {
//   const createdUser = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//     });
//   createdUser.save(function (err, userCreated) {
//       if (err) {
//         res.status(400).json({
//           message: "ERROR",
//           errMessage: err.message,
//         });
//       } else {
//         res.status(200).json({
//           message: "User Created",
//           user: userCreated,
//         });
//       }
//   });
// });

// V2
// router.post("/create-user", function (req, res) {
  
//   userController.signup(req.body, function(err, createdUser) {
//     if (err) {
//       res.status(400).json({
//         message: "Error",
//         errMessage: err.message,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     }
//   });
// });


// V3
// router.post("/create-user", function( req, res){
//   userController
//     .signup(req.body)
//     .then(createdUser =>{   
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser
//       }) 
//     })
//     .catch(err =>{
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message
//       })
//     })
// })

router.get("/get-all-users", getAllUsers);

router.post("/create-user", checkSignupInputIsEmpty, checkSignupDataType, signup);

router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login)

router.delete("/delete-user-by-id/:id", deleteUserByID);

router.put("/update-user-by-id/:id", updateUserByID);

router.put("/update-user-by-email", updateUserByEmail);

router.get("/logout", logoutGet);

module.exports = router;
