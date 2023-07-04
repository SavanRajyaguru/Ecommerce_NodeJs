const User = require('../models/user')
const createJwt = require('../utils/JWT_sign')
const createHash = require('../utils/createhash.utils')
const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const mongoose = require('mongoose')

class UserController{
    async signUpUser(req, res){
        const session = await mongoose.startSession()
        try {
            const { sEmail, nMobile } = req.body
            const isUserExist = await User.findOne({ sEmail: sEmail, nMobile: nMobile })
            console.log(isUserExist)
    
            if(isUserExist){
                return messaging(res, statuscode.statusSuccess, false, messages.alreadyRegisteredUser)
            }
            //* start transaction
            session.startTransaction()

            //* user create
            req.body.sPassword = createHash(req.body.sPassword)
            const [result] = await User.create([req.body], { session })
            console.log(result)
            if(!result){
                return messaging(res, statuscode.statusSuccess, false, messages.catch)
            }

            const token =  createJwt({id: result._id, eRole: result.eRole})

            const isUpdate = await User.updateOne({_id: result._id}, {sToken: token}, { session })
            
            if(!isUpdate.matchedCount){
                return messaging(res, statuscode.statusSuccess, false, messages.tokenError)
            }

            //* commit transaction
            await session.commitTransaction()
            return messaging(res, statuscode.statusSuccess, true, messages.registeredSuccess, {id: result._id})
    
        } catch (error) {
            console.log('>>>>>>>',error)
            await session.abortTransaction()
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        } finally {
            await session.endSession()
        }
    }
    
    async loginUser(req, res){
        try {
            const { sEmail, sPassword } = req.body
            const isUser = await User.findOne({ sEmail: sEmail, sPassword: createHash(sPassword) },{'__v': 0, sPassword: 0})
            if(!isUser){
                return messaging(res, statuscode.statusSuccess, false, 'Email or password wrong!')
            }
            
            return messaging(res, statuscode.statusSuccess, true, messages.loginSuccess, isUser)
    
        } catch (error) {
            console.log(error)
            return messaging(res, statuscode.statusNotFound, messages.catch)
        }
    }
}

module.exports = new UserController()