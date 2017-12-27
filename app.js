import Koa from 'koa'
import compress from 'koa-compress'
import logger from 'koa-logger'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import path from 'path'

import { createReadStream } from 'fs'

import passport from './services/auth'
import router from './services/routes'
import lowdb from './services/db'

const app = new Koa()
const port = process.env.PORT || 3000

const init = async () => {
  
  const db = await lowdb
  const dbData = await db.value()
  
  // init DB, but don't wipe existing data
  if(!dbData.hasOwnProperty('posts')) 
    await db.defaults({ posts: [], tags: [] }).write()

  // Logger
  app.use(logger())
  app.use(bodyParser())

  // Passport
  app.use(passport.initialize())
  app.use(serve(path.join(__dirname, 'public')))
  app.use(views(path.join(__dirname, 'public'), { extension: 'pug' }))

  // add db to ctx and choose to render index
  app.use(async (ctx, next) => { 
    ctx.state.db = db
    ctx.state.xhr = ctx.request.get('X-Requested-With') === 'XMLHttpRequest'
    ctx.state.xhr ? await next(): await ctx.render('index')
  })

  app.use(router.middleware())
  app.use(compress())

  // start the server
  app.listen(port, () => console.log(`Server listening on port: ${port}.`))
}

init()
