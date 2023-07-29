const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret_key',
};

const verifyCallback = (jwtPayload, done)=>{
  console.log('CallBack Started');
  if(jwtPayload.email === 'paul@site.com')  return done(null, true);
  return done(null, false);
};

module.exports = new JwtStrategy(opts, verifyCallback);
