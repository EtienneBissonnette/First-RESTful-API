const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv").config()

//Setting up express server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Express server listening on: " + port)
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())

//Setting up MongooseDB
const uri = process.env.uri
mongoose.connect(uri)

const articleSchema = {
    title: String,
    body: String
}

Article = mongoose.model('Article', articleSchema)

//GET
app.get("/articles", (req, res) => {

    Article.find({}, (e, articles) => {
        if (e) {
            res.send(e);
        } else {
            res.send(articles);
        }
    })
})

//POST
app.post("/articles", (req, res) => {

    const post = req.body;

    if ("articles" in post) {
        Article.insertMany(post.articles, (e, articles) => {
            if (e) {
                res.send(e)
            } else {
                res.send("Posted all articles")
            }
        })
    } else {
        const newArticle = new Article({
            title: post.title,
            body: post.body
        });
        newArticle.save((e) => {
            if (e) {
                res.send(e);
            } else {
                res.send("New article posted!");
            }
        });
    }
})