const express = require('express')
const cors = require('cors')
const { cookieParser, parseSystemUser } = require("../middleware/common.middleware")
const { urlWhiteList } = require('../constants/constants')
const { handleAsyncFnxError } = require('../utils/errorHandler')


class CommonRoute {
    constructor(app) {
        this.app = app
        this.configureRoute()
    }

    configureRoute() {

        this.app.use(cors({
            origin: urlWhiteList,
            credentials: true,
        }))

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(__dirname + '/public'))

        this.app.use(cookieParser)
        this.app.use(handleAsyncFnxError(parseSystemUser))


        return this.app
    }

}

module.exports = CommonRoute