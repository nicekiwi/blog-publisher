import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import serve from 'koa-static';
import Router from 'koa-better-router';
import mount from 'koa-mount';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import path from 'path';

import posts from './controllers/posts';
import lowdb from './services/db';
import './services/auth';

const app = new Koa();
const route = new Router({ prefix: '/api' }).loadMethods();
const port = process.env.PORT || 3000;

app.keys = [ process.env.SESSION_SECRET || 'secret' ]

// Logger
app.use(logger());
app.use(bodyParser());
app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

// Enforce Authentication on everything
app.use((ctx, next) => {
    if(ctx.isAuthenticated() || ctx.path === '/login') next();
    else ctx.body = 'fail';
})

// Auth Routes
route.post('/login', passport.authenticate('local'));
route.post('/logout', ctx => ctx.logout());

(async () => {

    const db = await lowdb;
    const dbData = await db.value();
    
    // Routes
    route.get('/posts', async ctx => ctx.body = await db.get('posts').value())
    route.get('/tags', async ctx => ctx.body = await db.get('tags').value())

    // init DB, but don't wipe existing data
    if(!dbData.hasOwnProperty('posts')) 
        await db.defaults({ posts: [], tags: [] }).write()

    // listen for routes
    app.use(route.middleware());
    app.use(serve(path.join(__dirname, 'public')));
    app.use(compress());

    // start the server
    app.listen(port, () => console.log(`Server listening on port: ${port}.`));
})()
