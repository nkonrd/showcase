const express = require('express')
const sqlite = require('sqlite3')
const ejs = require('ejs')

let port = 8080;
let db = new sqlite.Database("")
const app = express()

var movies = []
db.all('SELECT * FROM movies', (err, result) => {
     result.forEach(movie => {movies.push(movie)})
})
db.close()

app.use(express.static(__dirname))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {movies: movies})
})

app.get('/gallery', (req, res) => {
    res.render('gallery', {movies: movies})
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})