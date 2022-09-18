const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

//Setting up express server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Express server listening on: " + port)
})

//Setting up MongooseDB
const uri = process.env.uri
mongoose.connect(uri)

const articleSchema = {
    title: String,
    body: String
}

Article = mongoose.model('Article', articleSchema)




