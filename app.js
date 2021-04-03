const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs');
const sqlite = require('sqlite-async');
const fs = require('fs');
const path = require('path');

const port = 8080;
const app = new Koa();
const router = new Router();

app.use(require('koa-static')(__dirname));
render(app, {
	root: path.join(__dirname, 'views')
})

app.use(async (ctx, next) => {
	let db = await sqlite.open("movies.db")
	let result = await db.all('SELECT * FROM movies');
	this.movies = result
	await next();
})

router.get('/', async ctx => {
    await ctx.render('index', {movies: this.movies});
})

router.get('/gallery', async ctx => {
    await ctx.render('gallery', {movies: this.movies});
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log("Listening..."));