const { statuscode } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')


class ValidateDetails{

    validateUserSignup(req, res, next){
        try { 
            const { sEmail, eRole, nMobile } = req.body

            const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$')

            if(!emailRegex.test(sEmail)){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter valid email')
            }
            
            const listEnum = ['USER', 'SELLER']
            if(listEnum.indexOf(eRole) == -1){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter valid Role')
            }

            if(nMobile.length != 10){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter valid mobile number')
            }
            next()
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, 'Validation on User sign up fail!')
        }
    }

    validateProduct(req, res, next){
        try {
            const {sName, sBrandName, nPrice, sDescription} = req.body
            if(!sName){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter name')
            }
            if(!sBrandName){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter brand name')
            }
            if(!nPrice){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter price')
            }
            if(!sDescription){
                return messaging(res, statuscode.statusNotFound, false, 'Please enter description')
            }
            console.log('TRUE>>>>')
            next()
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, false, 'Validation on product fail!')
        }
    }
}

module.exports = new ValidateDetails()