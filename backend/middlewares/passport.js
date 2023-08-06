const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config()
const { User } = require("../models");

// TODO: CRIO_TASK_MODULE_AUTH - Set mechanism to retrieve Jwt token from user request
/**
 * These config options are required
 * Option 1: jwt secret environment variable set in ".env"
 * Option 2: mechanism to fetch jwt token from request Authentication header with the "bearer" auth scheme
 */
const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
};



const jwtVerify = async (payload, done) => {
  console.log(process.env.TOKENTYPE,"token")
  try{
    if(payload.type !== process.env.TOKENTYPE){
      return done(new Error("Invalid Token Type"), false);
    }

    if(payload.time > payload.expiry){
      return done(new Error("Token expired, please re-login"), false);
    }

    const user = await User.findById(payload.sub) //payload.user._id 
    if(!user){
      return done(null, false);
    }
    done(null, user);
  } catch(err) {
    return done(err, false);
  }
};
 

// TODO: CRIO_TASK_MODULE_AUTH - Uncomment below lines of code once the "jwtVerify" and "jwtOptions" are implemented
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};