const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { request } = require("express");
require("dotenv").config()

//Setting up express server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Express server listening on: " + port)
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())

//Setting up MongoDB with Mongoose
const uri = process.env.uri
mongoose.connect(uri)

const articleSchema = {
    title: String,
    body: String
}

Article = mongoose.model('Article', articleSchema)

//REQUEST FOR ALL ARTICLES//
app.route("/articles")
    .get((req, res) => {

        Article.find({}, (e, articles) => {
            if (e) {
                res.send(e);
            } else {
                res.send(articles);
            }
        })
    })

    .post((req, res) => {

        const post = req.body;

        if ("articles" in post) { // For multiple articles Post request
            Article.insertMany(post.articles, (e, articles) => {
                if (e) {
                    res.send(e)
                } else {
                    res.send("Posted all articles!")
                }
            })
        } else { // For single article Post request
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

    .delete((req, res) => {
        Article.deleteMany((e) => {
            if (e) {
                res.send(e);
            } else {
                res.send("Article deleted!");
            }
        })
    })

//REQUEST FOR SPECIFIC ARTICLE//
app.route('/articles/:articleTitle')
    .get((req, res) => {
        Article.findOne({
            title: req.params.articleTitle
        }, (e, article) => {
            if (e) {
                res.send(e)
            } else {
                res.send(article)
            }
        })
    })

    .put((req, res) => {

        const article = req.body;
        const articleTitle = req.params.articleTitle;

        Article.replaceOne({
            title: articleTitle
        }, article, (e) => {
            if (e) {
                res.send(e);
            } else {
                res.send(`Article:${articleTitle} was replaced successfully with Article: ${article.title}!`);
            }
        })
    })

    .patch((req, res) => {

        const article = req.body;
        const articleTitle = req.params.articleTitle;
 
        Article.updateOne({
            title: articleTitle
        }, article, (e) => {
            if (e) {
                res.send(e);
            } else {
                res.send(`Article:${articleTitle} was updated!`)
            }
        })
    })

    .delete((req,res)=>{

        const articleTitle = req.params.articleTitle;

        Article.deleteOne({title: articleTitle}, (e)=>{
            if(e){
                res.send(e);
            } else {
                res.send(`Article:${articleTitle} was deleted!`);
            }
        })
    })