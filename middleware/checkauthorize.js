const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const User = require('../model/user')


//============= Authorize Seller ===========//
const isAuthorizedSeller = async (req, res, next) => {
    // const admin = jsonData.find(item => item.id === req.decoded.id)

    const result = await User.findOne({ _id: req.decoded.id })
    if (!result) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'SELLER'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}


//=============== Authorize User ==========//
const isAuthorizedUser = async (req, res, next) => {
    const user = await User.findOne({ _id: req.decoded.id })

    if (!user) {
        return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
    }

    return req.decoded.role === 'USER'
        ? next()
        : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
}

module.exports = { isAuthorizedSeller, isAuthorizedUser }