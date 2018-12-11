import Router from 'koa-router';
import Redis from 'koa-redis';
// 邮件服务
import nodeMailer from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import Email from '../dbs/config';
import axios from './utils/axios';


let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client;

// 注册
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
  //
  if(code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire= await Store.hget(`nodemail:${username}`, 'expire');
    if(code === saveCode) {
      if(new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false;
      }
    }else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  // 用户名和密码
  let user = await User.find({
    username
  })
  if(user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户名已被注册'
    }
    return false;
  }
  let nuser = await User.create({
    username,
    password,
    email
  })
  if(nuser) {
    let res = await axios.post('/user/sginin', {
      username,
      password
    })
    if(res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '您已注册成功',
        user: res.data.user
      }
    }else {
      ctx.body = {
        code: -1,
        msg: '登录服务错误'
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '注册失败，数据库写入错误'
    }
  }
})

// 登录
router.post('/signin', async (ctx,next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    }else {
      if(user) {
        ctx.body = {
          code: 0,
          msg: '登录成功'
        }
        return ctx.login(user)
      }else {
        ctx.body = {
          code: -1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    }
  }
  // 邮件发送
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    auth: {
      user:Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 邮件中显示的内容
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '涞水装修在线注册码',
    html: `尊敬的"${decodeURIComponent(ko.user)}",欢迎您在《涞水装修在线》中注册，您的验证码是${ko.code}`
  }
  // 发送邮件
  await transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      // 报警信息
      return console.log(error)
    }else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email);
    }
  })
  ctx.body = {
    code: 0,
    msg: '邮件已发送，可能会有延迟，验证码过期时间一分钟'
  }
})

// 退出登录
router.post('/exit',async (ctx, next) => {
  await ctx.logout();
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
    }
  }else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户名
router.get('/getUser', async (ctx) => {
  if(ctx.isUnauthenticated()) {
    const {username, email} = ctx.session.passport.user;
    ctx.body = {
      code: 0,
      email
    }
  }else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router;
