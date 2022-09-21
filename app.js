const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const {
    request
} = require("express");
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

//Setting up MongoDB with Mongoose
const uri = process.env.uri
mongoose.connect(uri)

const articleSchema = {
    title: String,
    body: String
}

Article = mongoose.model('Article', articleSchema)

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
                    res.send("Posted all articles")
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


// //GET
// app.get("/articles", (req, res) => {

//     Article.find({}, (e, articles) => {
//         if (e) {
//             res.send(e);
//         } else {
//             res.send(articles);
//         }
//     })
// })

// //POST
// app.post("/articles", (req, res) => {

//     const post = req.body;

//     if ("articles" in post) { // For multiple articles Post request
//         Article.insertMany(post.articles, (e, articles) => {
//             if (e) {
//                 res.send(e)
//             } else {
//                 res.send("Posted all articles")
//             }
//         })
//     } else { // For single article Post request
//         const newArticle = new Article({
//             title: post.title,
//             body: post.body
//         });
//         newArticle.save((e) => {
//             if (e) {
//                 res.send(e);
//             } else {
//                 res.send("New article posted!");
//             }
//         });
//     }
// })

// app.delete("/articles", (req, res) => {
//     Article.deleteMany((e) => {
//         if (e) {
//             res.send(e);
//         } else {
//             res.send("Article deleted!");
//         }
//     })
// })