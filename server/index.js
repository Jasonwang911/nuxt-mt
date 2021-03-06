
// const Koa = require('koa')
import Koa from 'koa';
import cors from 'koa-cors';
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// 新加入内容
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import Redis from 'koa-redis';
import json from 'koa-json';
import dbConfig from './dbs/config';
import passport from './interface/utils/passport';
import users from './interface/users';
import geo from './interface/geo';
import search from './interface/search';

const app = new Koa()
app.use(cors())
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4000

// 添加公用的配置
// session
app.keys = ['mt', 'keyskeys'];
app.proxy = true;
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
// post处理
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json());
// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 添加路由
  app.use(users.routes()).use(users.allowedMethods());
  app.use(geo.routes()).use(geo.allowedMethods());
  app.use(search.routes()).use(search.allowedMethods());

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
