const User = require('../models/user')
const createJwt = require('../utils/JWT_sign')
const createHash = require('../utils/createhash.utils')
const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')

class UserController{
    async signUpUser(req, res){
        try {
            const { sEmail, nMobile } = req.body
            const isUserExist = await User.findOne({ $or: [ {sEmail}, {nMobile} ] })
    
            if(isUserExist){
                return messaging(res, statuscode.statusSuccess, 'Email or Mobile number is already exists')
            }
            
            //* user create
            req.body.sPassword = createHash(req.body.sPassword)
            const result = await User.create(req.body)
    
            console.log('USER>>>',result)
            return messaging(res, statuscode.statusSuccess, messages.registeredSuccess)
    
        } catch (error) {
            console.log('>>>>>>>',error)
            return messaging(res, statuscode.statusNotFound, messages.catch)
        }
    }
    
    async loginUser(req, res){
        try {
            const { sEmail, sPassword } = req.body
            const isUser = await User.findOne({ sEmail: sEmail, sPassword: createHash(sPassword) })
            if(!isUser){
                return messaging(res, statuscode.statusNotFound, 'Email or password wrong!')
            }
    
            const token = createJwt({ id: isUser._id, eRole: isUser.eRole })
            
            return messaging(res, statuscode.statusSuccess, messages.loginSuccess, isUser, token)
    
        } catch (error) {
            console.log(error)
            return messaging(res, statuscode.statusNotFound, messages.catch)
        }
    }
}

module.exports = new UserController()