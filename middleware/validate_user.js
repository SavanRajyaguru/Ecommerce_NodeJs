const { statuscode } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')


class ValidateDetails{

    validateUserSignup(req, res, next){
        try { 
            const { sEmail, eRole, nMobile } = req.body

            const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')

            if(!emailRegex.test(sEmail)){
                return messaging(res, statuscode.statusNotFound, 'Please enter valid email')
            }
            
            const listEnum = ['USER', 'SELLER']
            if(listEnum.indexOf(eRole) == -1){
                return messaging(res, statuscode.statusNotFound, 'Please enter valid Role')
            }

            if(nMobile.length != 10){
                return messaging(res, statuscode.statusNotFound, 'Please enter valid mobile number')
            }
            next()
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, 'Validation on User sign up fail!')
        }
    }
}

module.exports = new ValidateDetails()