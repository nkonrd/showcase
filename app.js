const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs');
const sqlite = require('sqlite3');
const fs = require('fs');
const path = require('path');

const port = 8080;
const db = new sqlite.Database('movies.db');

const app = new Koa();
const router = new Router();

let movies = []
db.all('SELECT * FROM movies', (err, result) => {
     result.forEach(movie => {movies.push(movie)});
})
db.close();

app.use(require('koa-static')(__dirname));
render(app, {
	root: path.join(__dirname, 'views')
});

router.get('/', async ctx => {
    await ctx.render('index', {movies: movies})
})

router.get('/gallery', async ctx => {
    await ctx.render('gallery', {movies: movies})
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})