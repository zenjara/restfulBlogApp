var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user"),
    Post    = require("../models/post"),
    middleware  = require("../middleware")
    
    
//index page
router.get("/posts",function(req,res){
    Post.find({},function(err,allPosts){
        if(err){
            console.log(err);
        }else {
            res.render("post/index",{posts:allPosts});
        }
    });
});
// new route
router.get("/posts/new",middleware.isLoggedIn,function(req,res){
    res.render("post/new");
});
//create route
router.post("/posts",middleware.isLoggedIn,function(req,res){
    var newPost= {
        title: req.body.title,
        created: Date.now(),
        image: req.body.image,
        content: req.body.content,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Post.create(newPost,function(err,createdPost){
        if(err){
            console.log(err);
        }else{
            console.log(createdPost);
            res.redirect("/posts");
        }
    });
});
//show route
router.get("/posts/:id",function(req, res) {
    Post.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
        }else {
            res.render("post/show",{post:foundPost});
        }
    });
});
//edit route
router.get("/posts/:id/edit",middleware.isLoggedIn,function(req, res) {
    Post.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
        }else {
            res.render("post/edit",{post:foundPost});
        }
    });
});
//update route
router.put("/posts/:id",middleware.isLoggedIn,function(req,res){
    var updatedPost= {
        title: req.body.title,
        created: Date.now(),
        image: req.body.image,
        content: req.body.content,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Post.findByIdAndUpdate(req.params.id,updatedPost,function(err,postUpdated){
        if(err){
            console.log(err);
        }else{
            console.log(postUpdated);
            res.redirect("/posts/"+req.params.id);
        }
    });
});
//delete route
router.delete("/posts/:id",function(req,res){
    Post.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/posts");
        }
    });
});
module.exports=router;