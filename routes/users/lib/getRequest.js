function createUserGET(req, res, next) {
    if(req.session.user){
      res.redirect("/users/home")
    } else { 
      res.render("sign-up")
    }
}

function loginGET(req, res) {
    res.render("login");
}

function homeGet (req, res, next) {
    if (req.session.user) {
      res.render("home", {user: req.session.user.email});
    } else {
      res.render("message", {error: true})
    }
  }

  function logoutGet (req, res) {
    req.session.destroy();
  
    return res.redirect("/users/login");
  }

module.exports = {
    createUserGET,
    loginGET,
    homeGet,
    logoutGet
};