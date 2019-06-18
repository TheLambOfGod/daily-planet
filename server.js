const express = require('express');
const layouts = require('express-ejs-layouts');
const fs = require('fs');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(layouts);
app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
    res.send("you hit the 💩 route");
});

app.get("/articles", function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    res.render('articles/index', {articleData});
});

//GET /articles/new - serve up our NEW dino form
app.get('/articles/new', function(req, res) {
    res.render('articles/new');
})
app.get("/articles/:id", function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    var articleData = JSON.parse(articles);
    var id = parseInt(req.params.id);
    res.render('articles/show', {article: articleData[id]});
});

app.post('/articles', function(req, res) {
    //read in our JSON file
    var articles = fs.readFileSync("./articles.json");
    //convert it to an array
    let articleData = JSON.parse(articles);
    //push our new data into the array
    let newArticle = {
        title: req.body.articleTitle,
        body: req.body.articleBody
    }
    articleData.push(newArticle);
    //write the array back to the file
    fs.writeFileSync('./articles.json', JSON.stringify(articleData));
    
    res.redirect('/articles');
})
app.listen( PORT || 3000 );
console.log("you hit the 💩 route");