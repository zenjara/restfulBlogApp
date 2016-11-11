var express = require("express"),
    app     = express(),
    mongoose= require("mongoose"),
    bodyParser=require("body-parser"),
    passport= require("passport"),
    LocalStrategy=require("passport-local"),
    User    = require("./models/user"),
    Post    =require("./models/post"),
    indexRoutes=require("./routes/index"),
    postRoutes=require("./routes/post"),
    methodOverride=require("method-override"),
    middleware  = require("./middleware")
    
mongoose.connect("mongodb://localhost/restBlog");

app.set("view engine","ejs");
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(require('express-session')({
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true 
    
}));
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/",postRoutes);



app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server started...");
});