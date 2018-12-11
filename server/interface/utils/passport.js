import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import UserModel from '../../dbs/models/users';

// 策略  koa-passport 是对passport的继承， passport-local是本地的一个策略
passport.use(new LocalStrategy(async function(username, password, done) {
  let where = {
    username
  };
  let result =  await UserModel.findOne(where);
  if(result != null) {
    if(result.password === password) {
      return done(null, result);
    }else {
      return done(null, false, '密码错误');
    }
  }else {
    return done(null, false, '用户不存在');
  }
}))

// 序列化session
passport.serializeUser( function(user, done) {
  return done(null, user);
})

// 反序列化session
passport.deserializeUser( function(user, done) {
  return done(null, user);
})

export default passport;
