const bcrypt = require("bcryptjs");

const User = require("../model/User");

var axios = require("axios");

module.exports = {
    // signup: (body, callback) => {
    //     bcrypt.genSalt(10, function(err, salt) {
    //         if(err) {
    //             return callback(err, null);
    //         } else {
    //             bcrypt.hash(body.password, salt, function(err, hash) {
    //                 if(err) {
    //                     return callback(err, null);
    //                 } else { 
    //                     const createdUser = new User({
    //                         firstName: body.firstName,
    //                         lastName: body.lastName,
    //                         email: body.email,
    //                         password: hash
    //                     });
    //                     createdUser.save(function(err, userCreatedInfo) {
    //                         if(err) {
    //                             return callback(err, null)
    //                         } else {
    //                             return callback(null, userCreatedInfo)
    //                         }
    //                     });
    //                 }
    //             })
    //         }
    //     })
    
    // },

    // V3 Promises
    // signup: (body) => {
    //     return new Promise((resolve, reject) => {
    //         bcrypt
    //         .genSalt(10)
    //         .then((salt) => {
    //             bcrypt
    //             .hash(body.password, salt)
    //             .then((hashedPassword) => {
    //                 const createdUser = new User({
    //                 firstName: body.firstName,
    //                 lastName: body.lastName,
    //                 email: body.email,
    //                 password: hashedPassword,
    //                 });              
    //                 createdUser
    //                 .save()
    //                 .then((savedUser) => {
    //                     resolve(savedUser);
    //                 })
    //                 .catch((error) => {
    //                     reject(error);
    //                 });
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });
    //     },

    getAllUsers: async (req, res) => {
        try {
            const foundAllUsers = await User.find({});      
            res.status(200).json({
                message: "success",
                users: foundAllUsers,
            });
        } catch (error) {
            res.status(500).json({
                message: "failure",
                errorMessage: error.message,
            });
        }
    },
    signup: async (req, res) => {req.body.firstName
        const {firstName, lastName, email, password} = req.body
        try{
            const salted= await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salted)
    
            const createdUser = new User({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: hashedPassword
            })
            let savedUser = await createdUser.save()


            res.render("sign-up", {success: savedUser, error: null});

            res.status(200).json({
                message: "success",
                user: savedUser
            })
    
        } catch(error){
            res.status(500).json({
                message: "error",
                errorMessage: error.message
            })
    
        }
    },
    deleteUserByID: async (req, res) => {
        try {
            let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });      
            res.status(200).json({
                message: "successfully deleted",
                deletedUser: deletedUser,
            });
        } catch (error) {
            res.status(500).json({
                message: "error",
                errorMessage: error.message,
            });
        }
    },
    deleteUserByEmail: async (req, res) => {
        try{
            let deletedUser = await User.findOneAndDelete({email: req.body.email});
            res.status(200).json({
                message: "successfully deleted",
                deletedUser: deletedUser,
            });
        } catch (error) {
            res.status(500).json({
                message: "error",
                errorMessage: error.message
            });
        }
    },
    updateUserByID: async (req, res) => {
        try{
            let updatedUser = await User.findByIdAndUpdate(
                {_id: req.params.id},
                req.body,
                {new: true}
            );
            res.status(200).json({
                message: "successfully updated",
                updatedUser: updatedUser,
            });
        } catch (error) {
            res.status(500).json({
                message: "erroriz",
                errorMessage: error.message
            });
        }
    },
    updateUserByEmail: async (req, res) => {
        try{
            let updatedUser = await User.findOneAndUpdate(
                {email: req.params.email},
                req.body,
                {new: true}
            );

            res.status(200).json({
                message: "successfully updated",
                updatedUser: updatedUser,
            })
        } catch {
            res.status(500).json({
                message: "errora",
                errorMessage: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            let foundUser = await User.findOne({email: req.body.email});

            if (!foundUser) {
                res.render("login", {success: null, error: true});
            } else {
                let isPasswordTrue = await bcrypt.compare(
                    req.body.password,
                    foundUser.password
                );
                if (isPasswordTrue) {
                    req.session.user = {
                        _id: foundUser._id,
                        email: foundUser.email,
                    };
                    res.redirect("/users/home")
                    // console.log(req.session);
                    // res.render("home", {user: foundUser.email});
                } else {
                    res.render("login", {success: null, error: true});
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "erroz",
                errorMessage: error.message,
            });
        }
    },
    home: async (req, res) => {
        if (req.session.user) {
          try {
            let result = await axios.get(
              `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.search}`
            );
            console.log(result.data);
            res.render("home", { data: result.data, user: req.session.user.email });
          } catch (e) {
            res.status(500).json({
              message: "failure",
              data: e.message,
            });
          }
        } else {
          res.render("message", { error: true });
        }
      }
};