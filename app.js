const express = require('express')
const app = express()
const sqlite = require('sqlite3')
const fs = require('fs')
const ejs = require('ejs')

let port = 8080;
let dbf = ""
let db = new sqlite.Database(dbf)

var movies = []
db.all('SELECT * FROM movies', async (err, result) => {
     result.forEach(async movie => {movies.push(movie)})
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