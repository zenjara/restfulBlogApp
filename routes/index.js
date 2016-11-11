var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Post    = require("../models/post"),
    passport = require("passport"),
    middleware  = require("../middleware")

router.get("/",function(req, res) {
    res.redirect("/posts");
});
router.put("/:user_id",function(req,res){
    User.findByIdAndUpdate(req.params.user_id,req.body.username,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/account");
        }
    })
});
//account route
router.get("/account",middleware.isLoggedIn,function(req, res) {
    res.render("account");
});

//Register routes    
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req,res){
    User.register(new User({username: req.body.username}),req.body.password,function(err,registeredUser){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/account");
            });
        }
    });
});
//login routes
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",{ 
    successRedirect: "/account",
    failureRedirect: '/login' }),function(req,res){
});

//logout
router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/posts");
});
module.exports= router;