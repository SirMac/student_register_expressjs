const jwt = require('jsonwebtoken')
const { jwtAccessTokenSecret, jwtRefreshTokenSecret } = require('../../common/constants/constants');
const { error } = require('../../common/utils/errorHandler');


class AuthServices {

  hasPageAccess(flag, accessright) {
    if (flag && accessright) {
      return true
    }
    return false
  }


  createToken(payload, jwtSecret, options) {
    try {
      const token = jwt.sign(payload, jwtSecret, options);
      return token
    }
    catch (err) {
      error('createToken error: ' + err.message);
      return ''
    }
  }

  verifyToken(token, jwtSecret, options) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret, options);
      return decodedToken
    }
    catch (err) {
      error('verifyToken error: ' + err.message);
      return null
    }
  }


  defaultTokenOptions = (username) => {
    return {
      audience: username
    }
  }


  accessTokenOptions = (user, minutes) => {
    if (!user || !user.username || !minutes) {
      error('accessTokenOptions: user or minutes cannot be null')
      return null
    }
    return {
      ...this.defaultTokenOptions(user.username),
      expiresIn: `${minutes}m`
    }
  }


  refreshTokenOptions = (user, hours) => {
    if (!user || !user.username || !hours) {
      error('refreshTokenOptions: user or hour cannot be null')
      return null
    }
    return {
      ...this.defaultTokenOptions(user.username),
      expiresIn: `${hours}h`
    }
  }


  createAccessToken = (user) => {
    const options = this.accessTokenOptions(user, 1)
    return this.createToken(user, jwtAccessTokenSecret, options)
  }


  createRefreshToken = (user) => {
    const options = this.refreshTokenOptions(user, 1)
    const payload = {
      username: user.username
    }
    return this.createToken(payload, jwtRefreshTokenSecret, options)
  }


  verifyRefreshToken = (refreshToken, username) => {
    return this.verifyToken(
      refreshToken,
      jwtRefreshTokenSecret,
      this.defaultTokenOptions(username)
    )
  }

  verifyAccessToken = (accessToken, username) => {
    return this.verifyToken(
      accessToken,
      jwtAccessTokenSecret,
      this.defaultTokenOptions(username)
    )
  }

  defaultCookieOption = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    partitioned: true
  }

  getAccessTokenCookieOption = (minutes) => {
    return {
      ...this.defaultCookieOption,
      maxAge: 1000 * 60 * minutes
    }
  }

  getRefreshTokenCookieOption = (hours) => {
    return {
      ...this.defaultCookieOption,
      maxAge: 1000 * 60 * 60 * hours
    }
  }


  getCookieValue(cookies, searchKey) {
    if (!cookies || !searchKey) {
      error('getCookie: cookies or search key undefined')
      return null
    }

    const cookieList = cookies.trim().split(';')

    for (const cookie of cookieList) {
      const [key, value] = cookie.trim().split('=')
      if (key.trim() === searchKey) return value.trim()
    }

    return null;
  }


  getTokenValue = (req, searchKey) => {
    const cookies = req.cookies
    return this.getCookieValue(cookies, searchKey)
  }


  getAccessTokenPayloadFromCookies = (cookies) => {
    if (!cookies) {
      error(`getTokenPayloadFromCookies: cookies required`)
      return null
    }

    const username = this.getCookieValue(cookies, 'username')

    if (!username) {
      error(`getTokenPayloadFromCookies: username not found in cookies`)
      return null
    }

    const accessToken = this.getCookieValue(cookies, 'aKey')
    if (!accessToken) {
      error(`getTokenPayloadFromCookies: Access token not found in cookies`)
      return null
    }

    const tokenPayload = this.verifyAccessToken(accessToken, username)

    if (tokenPayload.error) return null

    return tokenPayload
  }


  getAccessTokenPayload = (req) => {
    const cookies = req.cookies
    return this.getAccessTokenPayloadFromCookies(cookies)
  }

}

module.exports = new AuthServices()