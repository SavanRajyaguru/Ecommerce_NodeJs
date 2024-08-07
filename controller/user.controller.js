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
            const isUserExist = await User.findOne({ 
                $or: [
                    {sEmail: sEmail},
                    {nMobile: nMobile}
                ]
            })
    
            if(isUserExist){
                return messaging(res, statuscode.statusSuccess, false, messages.alreadyRegisteredUser)
            }
            //* start transaction
            session.startTransaction()

            //* user create
            req.body.sPassword = createHash(req.body.sPassword)
            const [result] = await User.create([req.body], { session })
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
            await session.abortTransaction()
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        } finally {
            await session.endSession()
        }
    }
    
    async loginUser(req, res){
        try {
            // const { sEmail, sPassword } = req.body
            // const isUser = await User.findOne({ sEmail: sEmail, sPassword: createHash(sPassword) },{'__v': 0, sPassword: 0})
            // if(!isUser){
            //     return messaging(res, statuscode.statusSuccess, false, 'Email or password wrong!')
            // }
            const isUser = {
                'eRole': 'USER',
                nMobile: '9090787856',
                sEmail: 'devarsh333@gmail.com',
                sUserName: 'devarsh',
                _id: '66b3a883d8486e2358a7deaf',
                sToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNhODgzZDg0ODZlMjM1OGE3ZGVhZiIsImVSb2xlIjoiVVNFUiIsImlhdCI6MTcyMzA1MDExNX0.rDos2Dz72nmml_GcF6dPIRphHb-7aqblnNPDO5VY4F0'
            }
            return messaging(res, statuscode.statusSuccess, true, messages.loginSuccess, isUser)
    
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, messages.catch)
        }
    }

    async updateUser(req, res){
        try {
            const { id } = req.decoded
            const { sUsername, sPassword, sEmail, nMobile } = req.body
            
            //* check if the use email and mobile exist or not
            const isUserExist = await User.findOne({ 
                _id: { $nin: [id] }, //! most imp condition when update user data
                $or: [
                    {sEmail: req.body.sEmail},
                    {nMobile: req.body.nMobile}
                ]
            })
    
            if(isUserExist){
                if(isUserExist.sEmail === req.body.sEmail){
                    return messaging(res, statuscode.statusSuccess, false, 'Email all ready exist')
                } 
                if(isUserExist.nMobile === req.body.nMobile){
                    return messaging(res, statuscode.statusSuccess, false, 'Mobile number all ready exist')
                }
            }
            // TODO: working progress
            const isUpdate = await User.findOneAndUpdate(
                {_id: id}, 
                { sUsername, sPassword: createHash(sPassword), sEmail, nMobile },
                { new: true }
            ).lean()
            if(!isUpdate){
                return messaging(res, statuscode.statusSuccess, false, 'Profile not updated', {})
            }
            // const result = await User.updateOne({iUserId: id}, { })
            return messaging(res, statuscode.statusSuccess, true, 'Profile updated successfully', isUpdate)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }
}

module.exports = new UserController()