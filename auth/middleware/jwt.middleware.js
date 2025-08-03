const { logger } = require('../../common/logger/logger');
const { jsonParse } = require('../../common/services/common.services');
const { throwError, error } = require('../../common/utils/errorHandler');
const { logoutUser } = require('../../users/controller/users.controller');
const {
  verifyToken,
  verifyRefreshToken,
  getAccessTokenPayload,
  getTokenValue
} = require('../services/auth.services');


class JwtMiddleware {

  async validRefreshNeeded(req, res, next) {
    const username = req?.user?.username

    const refreshToken = getTokenValue(req, 'rKey')
    const payload = verifyRefreshToken(refreshToken, username)

    if (!payload) {
      error('Invalid or expired refresh token')
      return logoutUser(req, res)
    }

    return next();

  }

  validJWTNeeded2(req, res, next) {
    let { user } = req.body
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader || !user) {
      logger.error(`validJWTNeeded: authorization header and req.body.user required`)
      return res.status(401).send({ error: { message: 'An error occured. Try again.' } });
    }

    user = jsonParse(user)

    if (user.error) {
      logger.error(`validJWTNeeded: 'user' must be JSON stringified. ${user.error}`)
      return res.status(401).send({ error: { message: 'An error occured. Try again.' } });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (
      !bearer || !token ||
      bearer !== 'Bearer' ||
      token == 'undefined'
    ) {
      logger.error(`validJWTNeeded: header authorization must contain valid 'Bearer' and 'token'`)
      return res.status(401).send({ error: { message: 'An error occured. Try again.' } });
    }

    const options = {
      audience: user.username
    }

    const decodedToken = verifyToken(
      token,
      options
    )

    if (decodedToken.error) {
      logger.error(`validJWTNeeded: ${decodedToken.error}`)
      return res.status(403).send({ error: { message: decodedToken.error } })
    }
    res.locals.jwt = decodedToken

    return next();


  }


  validJWTNeeded(req, res, next) {
    const tokenPayload = getAccessTokenPayload(req)
    throwError(
      tokenPayload, 
      401, 
      'User authentication failed', 'tokenExpired'
    )
    return next()
  }




}

module.exports = new JwtMiddleware();