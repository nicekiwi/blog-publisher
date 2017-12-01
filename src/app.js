import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import serve from 'koa-static';
import Router from 'koa-better-router';
import mount from 'koa-mount';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import posts from './controllers/posts';

import './auth';

const app = new Koa();
const route = new Router().loadMethods();
const port = process.env.PORT || 3000;

app.keys = [ process.env.SESSION_SECRET || 'secret' ]

// Logger
app.use(logger());
app.use(bodyParser());
app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

route.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));
route.get('/logout', ctx => { ctx.logout() });

// Routes
route.get('/', posts.fetch);

app.use(route.middleware());
app.use(serve(path.join(__dirname, 'public')));
app.use(compress());

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});