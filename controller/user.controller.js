const User = require('../model/user')
const createJwt = require('../utils/JWT_sign')
const createHash = require('../utils/createhash.utils')
const { statuscode } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')

const signUpUser = async (req, res) => {
    try {
        const { sEmail, nMobile } = req.body
        const isUserExist = await User.findOne({ $or: [ {sEmail}, {nMobile} ] })

        req.body.sPassword = createHash(req.body.sPassword)
        console.log(req.body)
        if(isUserExist){
            return messaging(res, statuscode.statusSuccess, 'Email pr Mobile number is already exists')
        }

        const result = await User.create(req.body)

        console.log('USER>>>',result)
        return messaging(res, statuscode.statusSuccess, 'Account created successfully')

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error.errors.nMobile.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { sEmail, sPassword } = req.body
        const isUser = await User.findOne({ sEmail: sEmail, sPassword: createHash(sPassword) })
        if(!isUser){
            return messaging(res, statuscode.statusSuccess, 'Username or password not match!')
        }

        const token = createJwt({ id: isUser._id, eRole: isUser.eRole })

        return messaging(res, statuscode.statusSuccess, token)

    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.statusNotFound, error)
    }
}

module.exports = {
    signUpUser,
    loginUser
}