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

    async updateUser(req, res){
        try {
            const { id } = req.decoded
            console.log(req.decoded)
            const { sUsername, sPassword, sEmail, nMobile } = req.body
            
            //* check if the use email and mobile exist or not
            const isUserExist = await User.findOne({ 
                _id: { $nin: id }, //! most imp condition when update user data
                $or: [
                    {sEmail: req.body.sEmail},
                    {nMobile: req.body.nMobile}
                ]
            })
            // TODO: work on the error
            // const data = await User.findOneAndUpdate({ 
            //     _id: { $nin: '64a2fb192e8bea5752b06c22' }, //! most imp condition when update user data
            //     $or: [
            //         {sEmail: req.body.sEmail},
            //         {nMobile: req.body.nMobile}
            //     ]
            // }, { sUsername: 'XYZ' }, {new: true})
            // console.log('UPDATE',data)
            // if(!data) console.log('null')
            console.log(isUserExist)
    
            if(isUserExist){
                if(isUserExist.sEmail === req.body.sEmail){
                    return messaging(res, statuscode.statusSuccess, false, 'Email all ready exist')
                } 
                if(isUserExist.nMobile === req.body.nMobile){
                    return messaging(res, statuscode.statusSuccess, false, 'Mobile number all ready exist')
                }
                // return messaging(res, statuscode.statusSuccess, false, 'Email or Mobile number number all ready exist')
            }
            // TODO: working progress
            const isUpdate = await User.updateOne(
                {_id: id}, 
                { sUsername, sPassword, sEmail, nMobile }
            )
            if(!isUpdate){
                return messaging(res, statuscode.statusSuccess, false, 'Profile not updated', {})
            }
            // const result = await User.updateOne({iUserId: id}, { })
            return messaging(res, statuscode.statusSuccess, true, 'Profile updated successfully', isUpdate)
        } catch (error) {
            console.log(error)
            return messaging(res, statuscode.statusNotFound, false, messages.catch)
        }
    }
}

module.exports = new UserController()