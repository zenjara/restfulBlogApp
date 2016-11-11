var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    title: String,
    created: Date,
    image: String,
    content: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports= mongoose.model("Post",PostSchema);