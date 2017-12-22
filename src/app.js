import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import Router from 'koa-router';
import path from 'path';

import posts from './controllers/posts';
import tags from './controllers/tags';
import lowdb from './services/db';
import './services/auth';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.keys = [ process.env.SESSION_SECRET || 'secret' ]

// Logger
app.use(logger());
app.use(bodyParser());
app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
router.post('/login', passport.authenticate('local'));
router.post('/logout', ctx => ctx.logout());

// Enforce Authentication on everything
// router.use(['/posts', '/tags'], async (ctx, next) => {
//   if(ctx.isAuthenticated() || ctx.path === '/login') next();
//   else {
//     ctx.status = 401
//     ctx.body = { success: false, response: 'Unauthorized.' }
//   }

//   await next()
// });

(async () => {
  const db = await lowdb;
  const dbData = await db.value();

  // init DB, but don't wipe existing data
  if(!dbData.hasOwnProperty('posts')) 
    await db.defaults({ posts: [], tags: [] }).write()

  // add db to ctx
  app.use(async (ctx, next) => { 
    ctx.state.db = db
    await next() 
  });

  // Warn errors
  app.use(async (ctx, next) => { 
    if(ctx.status === 400) console.error(ctx.body)
    await next() 
  });

  // Routes
  router.get('/posts', posts.all)
  router.get('/posts/:id', posts.fetch)
  router.post('/posts/create', posts.create)
  router.post('/posts/update/:id', posts.update)
  router.post('/posts/remove/:id', posts.remove)

  router.get('/tags', tags.all)

  // listen for routes
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(serve(path.join(__dirname, 'public')));
  app.use(compress());

  // start the server
  app.listen(port, () => console.log(`Server listening on port: ${port}.`));
})()
