const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const User = require('../models/user')


//============= Authorize Seller ===========//
const isAuthorizedSeller = async (req, res, next) => {
    // const admin = jsonData.find(item => item.id === req.decoded.id)

    const result = await User.findOne({ _id: req.decoded.id })
    if (!result) {
        return messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
    }
    return req.decoded.eRole === 'SELLER'
        ? next()
        : messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
}


//=============== Authorize User ==========//
const isAuthorizedUser = async (req, res, next) => {
    const user = await User.findOne({ _id: req.decoded.id })

    if (!user) {
        return messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
    }

    return req.decoded.eRole === 'USER'
        ? next()
        : messaging(res, statuscode.unAuthorized, false, messages.unAuthorized)
}

module.exports = { isAuthorizedSeller, isAuthorizedUser }