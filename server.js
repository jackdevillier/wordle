const express = require('express');
const mustache = require('mustache-express');
const http = require('http');
const app = express();
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + "/views");
app.set('view engine', 'mustache');
app.engine('mustache', mustache());

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views');
});

app.get("/", (req, res) => {
    res.render('home');
});



server.listen(3000, () => {
    console.log('nyoom');
});