const jwt = require('jsonwebtoken')
const { messaging } = require('../utils/messaging.utils')
const { messages, statuscode } = require('../utils/messages.utils')
const config = require('../config/config')

const authToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if (!token) {
            return messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
        }

        jwt.verify(token, config.app.secret_key, (err, decoded) => {
            if (err) {
                return messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
            }

            req.decoded = decoded

            next()
        })
    } catch (error) {
        console.log('Check token utils', error)
        return messaging(res, statuscode.pageNotFound, false, messages.catch)
    }
}

module.exports = { authToken }