const { hasPageAccess, createAccessToken, getAccessTokenCookieOption } = require('../services/auth.services')
const { permissionFlags } = require('../config/auth.config')
const { info, throwError } = require('../../common/utils/errorHandler')
const { pageAccess } = require('../../common/constants/errors')
const { sendSuccessResponse } = require('../../common/utils/requestHandler')




class AuthController {

  async createNewJWT(req, res) {

    const user = req.user
    const token = createAccessToken(user)

    throwError(token, 500, 'Access token creation failed', 'createNewJWTError')
    info(`createNewJWT: Access token REFRESHED for ${user.username}`)

    res.cookie('aKey', token, getAccessTokenCookieOption(1))
    return sendSuccessResponse(res, 201, { tokenRefreshed:true })
    // return res
    //   .status(201)
    //   .send({ tokenRefreshed:true });
    
  }

  handlePageAccess(req, res) {
    const options = req.body.options
    // if (!options || typeof options !== 'object') {
    //   error('handlePageaccess: req.body.options must be an object')
    //   return res.status(400).send({ status: 'success', hasAccess: false })
    // }

    throwError(
      (options && typeof options == 'object'),
      pageAccess.status,
      'Request body options must be an object',
      pageAccess.code
    )

    const user = req.user 
    
    // if (!user || typeof user !== 'object') {
    //   error('handlePageaccess: req.user must be an object')
    //   return res.status(403).send({ status: 'success', hasAccess: false })
    // }

    throwError(
      (user && typeof user == 'object'),
      pageAccess.status,
      'Request user must be an object',
      pageAccess.code
    )

    const flag = user.permissionFlag
    let page = options.page

    // if (!page) {
    //   error('handlePageaccess: options.page must not be empty')
    //   return res.status(400).send({ status: 'success', hasAccess: false })
    // }

    throwError(
      page,
      pageAccess.status,
      'Request body options.page must not empty',
      pageAccess.code
    )
    
    const userPageAccess = hasPageAccess(flag, permissionFlags[page])

    throwError(
      userPageAccess,
      pageAccess.status,
      pageAccess.message,
      pageAccess.code
    )

    return sendSuccessResponse(res, 200)
  }

  isLoggedIn(req, res){
    res.send({isLoggedIn:true})
  }


}

module.exports = new AuthController();