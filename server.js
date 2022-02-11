const fs = require("fs");

const express = require('express');
const mustache = require('mustache-express');
const http = require('http');
const app = express();
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

const server = http.createServer(app);

//possible guesses
let wordBank = fs.readFileSync("./words.txt").toString();

//answers
let answers = fs.readFileSync("./answers.txt").toString();

app.get("/", (req, res) => {
    res.render('home',{
        wordBank: wordBank,
        answers: answers
    });

});

app.get("/filesystem", (req,res) => {
    res.json([answers,wordBank])
});

app.listen(3000, () => {
    console.log('nyoom');
});