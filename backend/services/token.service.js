const jwt = require("jsonwebtoken");
require("dotenv").config()

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = process.env.SECRET) => {
  
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
    iat:Date.now()/1000,
  };
  const jwtToken = jwt.sign(payload, secret);
  // console.log(jwtToken);
  return jwtToken;
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  const expires = Math.floor(Date.now()/1000) + process.env.ACCESSEXPIRATIONTIME * 60 ;
  const accessToken = generateToken(user.id, expires ,process.env.TOKENTYPE)
  return {
    access:{
      token:accessToken,
      expires:new Date(expires * 1000)
    }
  }
}



module.exports = {
  generateToken,
  generateAuthTokens,
};